import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from '@/styles/components/grant-logos.module.scss';

const grantLogos = [
  { src: '/images/grant_logo/abm.svg', alt: 'Agencja Badań Medycznych', url: 'https://abm.gov.pl/pl/' },
  { src: '/images/grant_logo/ncbr.svg', alt: 'Narodowe Centrum Badań i Rozwoju', url: 'https://www.gov.pl/web/ncbr' },
  { src: '/images/grant_logo/ncn.svg', alt: 'Narodowe Centrum Nauki', url: 'https://ncn.gov.pl' },
];

export default function GrantLogos() {
  const t = useTranslations('home.grantLogos');
  
  return (
    <section className={styles['grant-logos__section']}>
      <div className={styles['grant-logos__container']}>
        <h2 className={styles['grant-logos__title']}>{t('title')}</h2>
        <div className={styles['grant-logos__track-wrapper']}>
          <div className={styles['grant-logos__track']}>
            {grantLogos.map((logo) => (
              <a
                key={logo.src}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['grant-logos__item']}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className={styles['grant-logos__image']}
                />
              </a>
            ))}
            {grantLogos.map((logo, index) => (
              <a
                key={`${logo.src}-clone-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                tabIndex={-1}
                className={styles['grant-logos__item']}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className={styles['grant-logos__image']}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
