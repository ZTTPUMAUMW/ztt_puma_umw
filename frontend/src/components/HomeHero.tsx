"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import styles from "@/styles/components/home-hero.module.scss";

export default function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <section className={styles["home-hero"]} aria-labelledby="hero-heading">
      <div className={styles["home-hero__pattern"]} aria-hidden="true"></div>
      <div className={styles["home-hero__content"]}>
        <h1 id="hero-heading" className={styles["home-hero__title"]}>
          {t("title")}
        </h1>
        <p className={styles["home-hero__subtitle"]}>{t("subtitle")}</p>
        <div className={styles["home-hero__cta"]}>
          <Link
            href="/projects"
            as="/projects"
            className={`${styles["home-hero__button"]} ${styles["home-hero__button--primary"]}`}
            aria-label={t("ariaProjects")}
          >
            {t("ctaProjects")}
          </Link>
          <Link
            href="/team"
            as="/team"
            className={`${styles["home-hero__button"]} ${styles["home-hero__button--secondary"]}`}
            aria-label={t("ariaTeam")}
          >
            {t("ctaTeam")}
          </Link>
          <Link
            href="/cooperation"
            as="/cooperation"
            className={`${styles["home-hero__button"]} ${styles["home-hero__button--outline"]}`}
            aria-label={t("ariaCooperation")}
          >
            {t("ctaCooperation")}
          </Link>
        </div>
      </div>
    </section>
  );
}
