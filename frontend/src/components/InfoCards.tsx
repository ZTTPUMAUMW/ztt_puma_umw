"use client";

import type { MarketingCard } from "@/lib/cms-marketing";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import styles from "../styles/components/info-cards.module.scss";

export default function InfoCards({ items: cards }: { items: MarketingCard[] }) {
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
            const isFeatured = index === 0;
            const cardClass = [
              styles["info-cards__card"],
              isFeatured ? styles["info-cards__card--featured"] : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={card.id} className={cardClass} style={{ ["--i" as string]: index }}>
                <div className={styles["info-cards__card-number"]}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className={styles["info-cards__card-title"]}>{card.title}</h3>
                <p className={styles["info-cards__card-description"]}>{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
