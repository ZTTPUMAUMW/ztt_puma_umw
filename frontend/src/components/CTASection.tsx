'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import styles from '../styles/components/cta-section.module.scss';

export default function CTASection() {
  const t = useTranslations('home.cta');
  
  return (
    <section className={styles['cta-section']} aria-labelledby="cta-heading">
      <div className={styles['cta-section__container']}>
        <div className={styles['cta-section__content']}>
          <h2 id="cta-heading" className={styles['cta-section__title']}>{t('heading')}</h2>
          <p className={styles['cta-section__description']}>
            {t('description')}
          </p>
          <div className={styles['cta-section__buttons']}>
            <Link 
              href="/cooperation" as="/cooperation"
              className={`${styles['cta-section__button']} ${styles['cta-section__button--primary']}`}
              aria-label={t('ariaCooperation')}
            >
              {t('ctaCooperation')}
            </Link>
            <Link 
              href="/contact" as="/contact"
              className={`${styles['cta-section__button']} ${styles['cta-section__button--secondary']}`}
              aria-label={t('ariaContact')}
            >
              {t('ctaContact')}
            </Link>
          </div>
        </div>
        <div className={styles['cta-section__visual']} aria-hidden="true">
          <div className={`${styles['cta-section__circle']} ${styles['cta-section__circle--1']}`}></div>
          <div className={`${styles['cta-section__circle']} ${styles['cta-section__circle--2']}`}></div>
          <div className={`${styles['cta-section__circle']} ${styles['cta-section__circle--3']}`}></div>
        </div>
      </div>
    </section>
  );
}
