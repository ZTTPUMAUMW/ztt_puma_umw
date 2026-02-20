"use client";

import { useTranslations } from "next-intl";
import styles from "../styles/components/info-cards.module.scss";

interface InfoCard {
  number: string;
  key: "basicScience" | "translational" | "innovation";
}

const cards: InfoCard[] = [
  { number: "01", key: "basicScience" },
  { number: "02", key: "translational" },
  { number: "03", key: "innovation" },
];

export default function InfoCards() {
  const t = useTranslations("home.infoCards");

  return (
    <section className={styles["info-cards"]}>
      <div className={styles["info-cards__container"]}>
        <h2 className={styles["info-cards__header"]}>{t("heading")}</h2>
        <p className={styles["info-cards__intro"]}>{t("intro")}</p>
        <div className={styles["info-cards__grid"]}>
          {cards.map((card, index) => {
            const isFeatured = index === cards.length - 1;
            const cardClass = [
              styles["info-cards__card"],
              isFeatured ? styles["info-cards__card--featured"] : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={index} className={cardClass}>
                <div className={styles["info-card__number"]}>{card.number}</div>
                <h3 className={styles["info-card__title"]}>{t(`cards.${card.key}.title`)}</h3>
                <p className={styles["info-card__description"]}>
                  {t(`cards.${card.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
