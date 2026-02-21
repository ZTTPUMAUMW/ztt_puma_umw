"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
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
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView({ rootMargin: "0px 0px -40px 0px" });

  return (
    <section className={styles["info-cards"]}>
      <div className={styles["info-cards__container"]}>
        <div ref={headerRef} className={`animate-on-scroll${headerInView ? " in-view" : ""}`}>
          <h2 className={styles["info-cards__header"]}>{t("heading")}</h2>
          <p className={styles["info-cards__intro"]}>{t("intro")}</p>
        </div>
        <div
          ref={gridRef}
          className={`${styles["info-cards__grid"]} animate-stagger${gridInView ? " in-view" : ""}`}
        >
          {cards.map((card, index) => {
            const isFeatured = index === cards.length - 1;
            const cardClass = [
              styles["info-cards__card"],
              isFeatured ? styles["info-cards__card--featured"] : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={index} className={cardClass} style={{ ["--i" as string]: index }}>
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
