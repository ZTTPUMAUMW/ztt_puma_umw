"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "../styles/components/research-areas.module.scss";
import { italicizeLatinWords } from "@/lib/utils";

type AreaKey = "biofilm" | "biomaterials" | "translational" | "efficacy" | "ai";

interface MindmapItem {
  id: string;
  key: AreaKey;
}

const mindmapData: MindmapItem[] = [
  { id: "box1", key: "biofilm" },
  { id: "box2", key: "biomaterials" },
  { id: "box3", key: "translational" },
  { id: "box4", key: "efficacy" },
  { id: "box5", key: "ai" },
];

export default function ResearchAreas() {
  const t = useTranslations("home.researchAreas");
  const [activeId, setActiveId] = useState("box1");
  const activeItem = mindmapData.find((item) => item.id === activeId);

  return (
    <section className={styles["research-areas"]} aria-labelledby="research-areas-heading">
      <div className={styles["research-areas__header"]}>
        <h2 id="research-areas-heading">{t("heading")}</h2>
      </div>

      <div className={styles["research-areas__container"]}>
        <nav className={styles["research-areas__nav"]} aria-label="Obszary badawcze">
          {mindmapData.map((item, index) => (
            <button
              key={item.id}
              className={`${styles["research-areas__nav-item"]} ${activeId === item.id ? styles.active : ""}`}
              onClick={() => setActiveId(item.id)}
              aria-pressed={activeId === item.id}
              aria-label={`${t(`areas.${item.key}.title`)} - obszar ${index + 1}`}
              type="button"
            >
              <span className={styles["research-areas__nav-number"]} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles["research-areas__nav-title"]}>
                {t(`areas.${item.key}.title`)}
              </span>
            </button>
          ))}
        </nav>

        <div
          className={styles["research-areas__content"]}
          role="region"
          aria-live="polite"
          aria-label="Szczegóły obszaru badawczego"
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
                <h3 className={styles["research-areas__card-title"]}>
                  {t(`areas.${activeItem.key}.title`)}
                </h3>
              </div>
              <p
                className={styles["research-areas__card-description"]}
                dangerouslySetInnerHTML={{
                  __html: italicizeLatinWords(t(`areas.${activeItem.key}.description`)),
                }}
              />
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
