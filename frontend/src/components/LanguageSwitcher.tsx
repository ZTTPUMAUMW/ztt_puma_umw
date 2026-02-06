'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { localeLabels, type Locale } from '@/i18n/config';
import styles from '../styles/components/lang-switcher.module.scss';

interface LanguageSwitcherProps {
  isMobile?: boolean;
}

export default function LanguageSwitcher({ isMobile = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const containerClass = isMobile 
    ? styles['lang-switcher--mobile']
    : styles['lang-switcher'];

  return (
    <div className={containerClass}>
      <button
        onClick={() => switchLanguage('pl')}
        className={`${styles['lang-switcher__button']} ${locale === 'pl' ? styles['lang-switcher__button--active'] : ''}`}
        aria-label="Przełącz na język polski"
        aria-current={locale === 'pl' ? 'true' : 'false'}
      >
        {localeLabels.pl}
      </button>
      <span className={styles['lang-switcher__separator']} aria-hidden="true">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`${styles['lang-switcher__button']} ${locale === 'en' ? styles['lang-switcher__button--active'] : ''}`}
        aria-label="Switch to English"
        aria-current={locale === 'en' ? 'true' : 'false'}
      >
        {localeLabels.en}
      </button>
    </div>
  );
}
