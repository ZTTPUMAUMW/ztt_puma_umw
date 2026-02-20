"use client";

import { useTranslations } from "next-intl";
import styles from "../styles/components/feature-boxes.module.scss";

interface Feature {
  key: "fast" | "flexible" | "complete" | "interdisciplinary";
}

const features: Feature[] = [
  { key: "fast" },
  { key: "flexible" },
  { key: "complete" },
  { key: "interdisciplinary" },
];

export default function FeatureBoxes() {
  const t = useTranslations("home.features");

  return (
    <section className={styles["feature-boxes"]}>
      <div className={styles["feature-boxes__container"]}>
        <h2 className={styles["feature-boxes__header"]}>{t("heading")}</h2>
        <p className={styles["feature-boxes__subtitle"]}>{t("subtitle")}</p>
        <div className={styles["feature-boxes__grid"]}>
          {features.map((feature, index) => (
            <div key={index} className={styles["feature-boxes__box"]}>
              <h3 className={styles["feature-boxes__box-title"]}>
                {t(`items.${feature.key}.title`)}
              </h3>
              <p className={styles["feature-boxes__box-description"]}>
                {t(`items.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <p className={styles["feature-boxes__closing"]}>{t("closing")}</p>
      </div>
    </section>
  );
}
