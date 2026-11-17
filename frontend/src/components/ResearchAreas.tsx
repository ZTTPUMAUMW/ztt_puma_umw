"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "../styles/components/research-areas.module.scss";
import ScientificText from "./ScientificText";
import type { MarketingCard } from "@/lib/cms-marketing";

export default function ResearchAreas({ items: mindmapData }: { items: MarketingCard[] }) {
  const t = useTranslations("home.researchAreas");
  const [activeId, setActiveId] = useState(mindmapData[0]?.id ?? "");
  const activeItem = mindmapData.find((item) => item.id === activeId) ?? mindmapData[0];

  return (
    <section className={styles["research-areas"]} aria-labelledby="research-areas-heading">
      <div className={styles["research-areas__header"]}>
        <h2 id="research-areas-heading">{t("heading")}</h2>
      </div>

      <div className={styles["research-areas__container"]}>
        <nav className={styles["research-areas__nav"]} aria-label={t("navigationLabel")}>
          {mindmapData.map((item, index) => (
            <button
              key={item.id}
              className={`${styles["research-areas__nav-item"]} ${activeItem?.id === item.id ? styles.active : ""}`}
              onClick={() => setActiveId(item.id)}
              aria-pressed={activeItem?.id === item.id}
              aria-label={item.title}
              type="button"
            >
              <span className={styles["research-areas__nav-number"]} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles["research-areas__nav-title"]}>{item.title}</span>
            </button>
          ))}
        </nav>

        <div
          className={styles["research-areas__content"]}
          role="region"
          aria-live="polite"
          aria-label={t("detailsLabel")}
        >
          {activeItem && (
            <article className={styles["research-areas__card"]}>
              <div className={styles["research-areas__card-header"]}>
                <div className={styles["research-areas__card-icon"]} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <h3 className={styles["research-areas__card-title"]}>{activeItem.title}</h3>
              </div>
              <p className={styles["research-areas__card-description"]}>
                <ScientificText text={activeItem.description} />
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
