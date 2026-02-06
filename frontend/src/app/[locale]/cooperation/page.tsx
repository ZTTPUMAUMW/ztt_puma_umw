'use client';

import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import styles from '@/styles/pages/cooperation.module.scss';

export default function CooperationPage() {
  const t = useTranslations('cooperation');
  
  return (
    <>
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className={styles['cooperation-offers-section']}>
        <div className={styles['container-content']}>
          <h2 className={styles['cooperation-offers-title']}>
            {t('offers.heading')}
          </h2>
          <div className={styles['cooperation-offers-grid']}>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.expertise.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.expertise.description')}
              </p>
            </div>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.equipment.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.equipment.description')}
              </p>
            </div>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.dataAnalysis.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.dataAnalysis.description')}
              </p>
            </div>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.microbiology.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.microbiology.description')}
              </p>
            </div>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.flexibility.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.flexibility.description')}
              </p>
            </div>
            <div className={styles['cooperation-offer-card']}>
              <h3 className={styles['cooperation-offer-title']}>
                {t('offers.comprehensive.title')}
              </h3>
              <p className={styles['cooperation-offer-description']}>
                {t('offers.comprehensive.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles['section-component'] + ' ' + styles['cooperation-section']}>
        <div className={styles['cooperation-container']}>
          <div className={styles['cooperation-info']}>
            <div className={styles['cooperation-intro']}>
              <h2>{t('intro.heading')}</h2>
              <p>
                {t('intro.paragraph1')}
              </p>

              <p>
                {t('intro.paragraph2')}
              </p>
            </div>

            <div className={styles['cooperation-scope']}>
              <h3>{t('scope.heading')}</h3>
              <ul>
                <li>{t('scope.items.0')}</li>
                <li>{t('scope.items.1')}</li>
                <li>{t('scope.items.2')}</li>
                <li>{t('scope.items.3')}</li>
                <li>{t('scope.items.4')}</li>
              </ul>
            </div>

            <p className={styles['cooperation-note']}>
              {t('note')}
            </p>
          </div>

          <div className={styles['cooperation-form']}>
            <h2>{t('form.title')}</h2>
            <ContactForm
              submitEndpoint="/api/cooperation"
              attachmentLabel={t('form.attachmentLabel')}
              showCompanyField={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
