"use client";

import type { MarketingAction } from "@/lib/cms-marketing";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import styles from "../styles/components/cta-section.module.scss";

export default function CTASection({ buttons }: { buttons?: MarketingAction[] }) {
  const t = useTranslations("home.cta");
  const actions: MarketingAction[] = buttons ?? [
    {
      id: "cooperation",
      route: "/cooperation",
      label: t("ctaCooperation"),
      aria: t("ariaCooperation"),
    },
    { id: "contact", route: "/contact", label: t("ctaContact"), aria: t("ariaContact") },
  ];
  const { ref, inView } = useInView();

  return (
    <section className={styles["cta-section"]} aria-labelledby="cta-heading">
      <div className={styles["cta-section__container"]}>
        <div
          ref={ref}
          className={`${styles["cta-section__content"]} animate-on-scroll${inView ? " in-view" : ""}`}
        >
          <h2 id="cta-heading" className={styles["cta-section__title"]}>
            {t("heading")}
          </h2>
          <p className={styles["cta-section__description"]}>{t("description")}</p>
          <div className={styles["cta-section__buttons"]}>
            {actions.map((button, index) => (
              <Link
                key={button.id}
                href={button.route}
                aria-label={button.aria}
                className={`${styles["cta-section__button"]} ${styles["cta-section__button--" + ["primary", "secondary", "outline"][index % 2]]}`}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
        <div className={styles["cta-section__visual"]} aria-hidden="true">
          <div
            className={`${styles["cta-section__circle"]} ${styles["cta-section__circle--1"]}`}
          ></div>
          <div
            className={`${styles["cta-section__circle"]} ${styles["cta-section__circle--2"]}`}
          ></div>
          <div
            className={`${styles["cta-section__circle"]} ${styles["cta-section__circle--3"]}`}
          ></div>
        </div>
      </div>
    </section>
  );
}
