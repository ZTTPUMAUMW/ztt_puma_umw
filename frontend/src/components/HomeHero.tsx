"use client";

import type { MarketingAction } from "@/lib/cms-marketing";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import styles from "@/styles/components/home-hero.module.scss";

export default function HomeHero({ buttons }: { buttons?: MarketingAction[] }) {
  const t = useTranslations("home.hero");
  const actions: MarketingAction[] = buttons ?? [
    { id: "projects", route: "/projects", label: t("ctaProjects"), aria: t("ariaProjects") },
    { id: "team", route: "/team", label: t("ctaTeam"), aria: t("ariaTeam") },
    {
      id: "cooperation",
      route: "/cooperation",
      label: t("ctaCooperation"),
      aria: t("ariaCooperation"),
    },
  ];

  return (
    <section className={styles["home-hero"]} aria-labelledby="hero-heading">
      <div className={styles["home-hero__pattern"]} aria-hidden="true"></div>
      <div className={styles["home-hero__content"]}>
        <h1 id="hero-heading" className={styles["home-hero__title"]}>
          {t("title")}
        </h1>
        <p className={styles["home-hero__subtitle"]}>{t("subtitle")}</p>
        <div className={styles["home-hero__cta"]}>
          {actions.map((button, index) => (
            <Link
              key={button.id}
              href={button.route}
              aria-label={button.aria}
              className={`${styles["home-hero__button"]} ${styles["home-hero__button--" + ["primary", "secondary", "outline"][index % 3]]}`}
            >
              {button.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
