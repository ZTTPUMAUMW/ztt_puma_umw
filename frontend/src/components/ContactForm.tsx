"use client";

import styles from '@/styles/pages/recruitment.module.scss';
import { useState, FormEvent, useEffect } from 'react';
import { useTranslations } from 'next-intl';

declare global {
  interface Window {
    grecaptcha: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface ContactFormProps {
  submitEndpoint?: string;
  attachmentLabel?: string;
  maxTotalFileSize?: number;
  onSuccess?: () => void;
  subjectOptions?: string[];
  showCompanyField?: boolean;
}

const FIELD_LIMITS = {
  first_name: { min: 2, max: 50 },
  last_name: { min: 2, max: 50 },
  company_name: { min: 2, max: 100 },
  email: { min: 5, max: 100 },
  subject: { min: 5, max: 200 },
  message: { min: 20, max: 2000 },
};

const SUBMISSION_LIMIT = 3;
const SUBMISSION_WINDOW = 60 * 60 * 1000;

export default function ContactForm({
  submitEndpoint = '/api/contact',
  attachmentLabel,
  maxTotalFileSize = 20 * 1024 * 1024,
  onSuccess,
  subjectOptions,
  showCompanyField = false
}: ContactFormProps) {
  const t = useTranslations('contact.form');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formStartTime, setFormStartTime] = useState<number>(0);
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState<boolean>(false);

  useEffect(() => {
    setFormStartTime(Date.now());
    setCsrfToken(Math.random().toString(36).substring(2) + Date.now().toString(36));


    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    let script: HTMLScriptElement | null = null;
    
    if (siteKey && !window.grecaptcha) {
      script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaLoaded(true);
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setRecaptchaLoaded(true);
    }

    return () => {
      if (script) {
        script.remove();
      }
      
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge) {
        badge.remove();
      }
      
      if (window.grecaptcha) {
        delete (window as { grecaptcha?: unknown }).grecaptcha;
      }
    };
  }, []);

  const checkSubmissionLimit = (): boolean => {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]') as number[];
    const now = Date.now();
    
    const recentSubmissions = submissions.filter(timestamp => now - timestamp < SUBMISSION_WINDOW);
    
    if (recentSubmissions.length >= SUBMISSION_LIMIT) {
      return false;
    }
    
    return true;
  };

  const recordSubmission = () => {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]') as number[];
    const now = Date.now();
    
    const updatedSubmissions = [...submissions, now].filter(
      timestamp => now - timestamp < SUBMISSION_WINDOW
    );
    
    localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'honeypot') {
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    const limits = FIELD_LIMITS[name as keyof typeof FIELD_LIMITS];
    if (limits) {
      if (value.length > 0 && value.length < limits.min) {
        setValidationErrors(prev => ({
          ...prev,
          [name]: t('minLength', { min: limits.min })
        }));
      } else if (value.length > limits.max) {
        setValidationErrors(prev => ({
          ...prev,
          [name]: t('maxLength', { max: limits.max })
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const nonPdfFiles = selectedFiles.filter(file => file.type !== 'application/pdf');
    if (nonPdfFiles.length > 0) {
      setMessage({ type: 'error', text: t('onlyPdf') });
      e.target.value = '';
      return;
    }

    const currentTotalSize = files.reduce((sum, file) => sum + file.size, 0);
    const newTotalSize = currentTotalSize + selectedFiles.reduce((sum, file) => sum + file.size, 0);
    
    if (newTotalSize > maxTotalFileSize) {
      setMessage({ 
        type: 'error', 
        text: t('fileSizeExceeded', { max: maxTotalFileSize / 1024 / 1024 })
      });
      e.target.value = '';
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
    setMessage(null);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalFileSize = () => {
    return files.reduce((sum, file) => sum + file.size, 0);
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    Object.entries(FIELD_LIMITS).forEach(([field, limits]) => {
      if (field === 'company_name' && !showCompanyField) {
        return;
      }
      
      const value = formData[field as keyof typeof formData];
      if (!value || value.trim().length === 0) {
        errors[field] = t('fieldRequired');
      } else if (value.length < limits.min) {
        errors[field] = t('minLength', { min: limits.min });
      } else if (value.length > limits.max) {
        errors[field] = t('maxLength', { max: limits.max });
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Nieprawidłowy adres email';
    }

    if (files.length === 0) {
      errors.files = 'Załączenie co najmniej jednego pliku PDF jest wymagane';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      setMessage({ type: 'success', text: 'Dziękujemy! Twoje zgłoszenie zostało wysłane.' });
      return;
    }

    const timeSpent = Date.now() - formStartTime;
    if (timeSpent < 3000) {
      console.log('Bot detected via time-based protection');
      setMessage({ type: 'error', text: 'Formularz został wysłany zbyt szybko. Proszę spróbować ponownie.' });
      return;
    }

    if (timeSpent > 15 * 60 * 1000) {
      setMessage({ type: 'error', text: 'Sesja wygasła. Odśwież stronę i wypełnij formularz ponownie.' });
      return;
    }

    if (!checkSubmissionLimit()) {
      setMessage({ 
        type: 'error', 
        text: 'Osiągnięto limit zgłoszeń (3 na godzinę). Spróbuj ponownie później.' 
      });
      return;
    }

    if (!validateForm()) {
      setMessage({ type: 'error', text: t('errorMessage') });
      return;
    }

    if (!recaptchaLoaded) {
      setMessage({ type: 'error', text: t('recaptchaNotLoaded') });
      return;
    }

    setIsSubmitting(true);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        setMessage({ type: 'error', text: t('recaptchaConfigError') });
        return;
      }
      
      const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' });

      const data = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'honeypot') {
          data.append(key, value);
        }
      });
      
      data.append('csrf_token', csrfToken);
      data.append('form_timestamp', formStartTime.toString());
      data.append('recaptcha_token', recaptchaToken);
      
      files.forEach((file) => {
        data.append('attachments', file);
      });

      const response = await fetch(submitEndpoint, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: t('successMessage') });
        
        recordSubmission();
        
        setFormData({
          first_name: '',
          last_name: '',
          company_name: '',
          email: '',
          subject: '',
          message: '',
          honeypot: '',
        });
        setFiles([]);
        setValidationErrors({});
        setFormStartTime(Date.now());
        setCsrfToken(Math.random().toString(36).substring(2) + Date.now().toString(36));
        
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || t('errorMessage') });
      }
    } catch {
      setMessage({ type: 'error', text: t('errorMessageRetry') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles['contact-form-wrapper']}>
      {message && (
        <div className={styles['alert'] + ' ' + (message.type ? styles[message.type] : '')}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles['contact-form']} noValidate>
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            type="text"
            id="honeypot"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles['form-row']}>
          <div className={styles['form-group']}>
            <label htmlFor="first_name">{t('firstName')}</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              minLength={FIELD_LIMITS.first_name.min}
              maxLength={FIELD_LIMITS.first_name.max}
              required
              disabled={isSubmitting}
              className={validationErrors.first_name ? styles['error'] : ''}
            />
            {validationErrors.first_name && (
              <span className={styles['error-message']}>{validationErrors.first_name}</span>
            )}
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="last_name">{t('lastName')}</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              minLength={FIELD_LIMITS.last_name.min}
              maxLength={FIELD_LIMITS.last_name.max}
              required
              disabled={isSubmitting}
              className={validationErrors.last_name ? styles['error'] : ''}
            />
            {validationErrors.last_name && (
              <span className={styles['error-message']}>{validationErrors.last_name}</span>
            )}
          </div>
        </div>

        {showCompanyField && (
          <div className={styles['form-group']}>
            <label htmlFor="company_name">{t('companyName')}</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              minLength={FIELD_LIMITS.company_name.min}
              maxLength={FIELD_LIMITS.company_name.max}
              required
              disabled={isSubmitting}
              className={validationErrors.company_name ? styles['error'] : ''}
            />
            {validationErrors.company_name && (
              <span className={styles['error-message']}>{validationErrors.company_name}</span>
            )}
          </div>
        )}

        <div className={styles['form-group']}>
          <label htmlFor="email">{t('email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            minLength={FIELD_LIMITS.email.min}
            maxLength={FIELD_LIMITS.email.max}
            required
            disabled={isSubmitting}
            className={validationErrors.email ? styles['error'] : ''}
          />
          {validationErrors.email && (
            <span className={styles['error-message']}>{validationErrors.email}</span>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="subject">{t('subject')}</label>
          {subjectOptions ? (
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className={validationErrors.subject ? styles['error'] : ''}
            >
              <option value="">{t('subjectPlaceholder')}</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              minLength={FIELD_LIMITS.subject.min}
              maxLength={FIELD_LIMITS.subject.max}
              required
              disabled={isSubmitting}
              className={validationErrors.subject ? styles['error'] : ''}
            />
          )}
          {validationErrors.subject && (
            <span className={styles['error-message']}>{validationErrors.subject}</span>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="message">{t('message')}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            minLength={FIELD_LIMITS.message.min}
            maxLength={FIELD_LIMITS.message.max}
            required
            disabled={isSubmitting}
            className={validationErrors.message ? styles['error'] : ''}
          />
          <div className={styles['text-muted'] + ' ' + styles['small']}>
            {t('charactersCount', { current: formData.message.length, max: FIELD_LIMITS.message.max })}
          </div>
          {validationErrors.message && (
            <span className={styles['error-message']}>{validationErrors.message}</span>
          )}
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="attachment">{attachmentLabel || t('attachment')}</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleFileChange}
            accept="application/pdf"
            multiple
            required
            disabled={isSubmitting}
            className={validationErrors.files ? styles['error'] : ''}
          />
          <div className={styles['text-muted'] + ' ' + styles['small']}>
            {t('attachmentHint', { size: maxTotalFileSize / 1024 / 1024 })}
          </div>
          {files.length > 0 && (
            <div className={styles['text-muted'] + ' ' + styles['small']}>
              {t('totalSize', { current: formatFileSize(getTotalFileSize()), max: maxTotalFileSize / 1024 / 1024 })}
            </div>
          )}
          {validationErrors.files && (
            <span className={styles['error-message']}>{validationErrors.files}</span>
          )}
        </div>

        {files.length > 0 && (
          <div className={styles['files-list']}>
            <h3>{t('attachedFiles')}</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <span className={styles['file-name']}>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className={styles['btn-remove-file']}
                    disabled={isSubmitting}
                    aria-label={t('removeFile')}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className={styles['btn'] + ' ' + styles['btn-submit']} disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </button>

        <p className={styles['form-note']}>{t('allFieldsRequired')}</p>
      </form>
    </div>
  );
}
