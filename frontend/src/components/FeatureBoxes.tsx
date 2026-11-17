"use client";

import type { MarketingCard } from "@/lib/cms-marketing";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import styles from "../styles/components/feature-boxes.module.scss";

export default function FeatureBoxes({ items: features }: { items: MarketingCard[] }) {
  const t = useTranslations("home.features");
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView({ rootMargin: "0px 0px -40px 0px" });
  const { ref: closingRef, inView: closingInView } = useInView();

  return (
    <section className={styles["feature-boxes"]}>
      <div className={styles["feature-boxes__container"]}>
        <div ref={headerRef} className={`animate-on-scroll${headerInView ? " in-view" : ""}`}>
          <h2 className={styles["feature-boxes__header"]}>{t("heading")}</h2>
          <p className={styles["feature-boxes__subtitle"]}>{t("subtitle")}</p>
        </div>
        <div
          ref={gridRef}
          className={`${styles["feature-boxes__grid"]} animate-stagger${gridInView ? " in-view" : ""}`}
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={styles["feature-boxes__box"]}
              style={{ ["--i" as string]: index }}
            >
              <h3 className={styles["feature-boxes__box-title"]}>{feature.title}</h3>
              <p className={styles["feature-boxes__box-description"]}>{feature.description}</p>
            </div>
          ))}
        </div>
        <p
          ref={closingRef}
          className={`${styles["feature-boxes__closing"]} animate-on-scroll${closingInView ? " in-view" : ""}`}
        >
          {t("closing")}
        </p>
      </div>
    </section>
  );
}
