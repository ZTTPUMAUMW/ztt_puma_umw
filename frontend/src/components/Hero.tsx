'use client';

import styles from '../styles/components/hero.module.scss';

interface HeroProps {
  title: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles['hero__pattern']}></div>
      <div className={styles['hero__content']}>
        <h1 className={styles['hero__title']}>{title}</h1>
        {subtitle && <p className={styles['hero__subtitle']}>{subtitle}</p>}
        <div className={styles['hero__accent-line']}></div>
      </div>
    </section>
  );
}
