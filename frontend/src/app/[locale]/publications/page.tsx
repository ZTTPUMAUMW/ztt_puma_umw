"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/pages/publications.module.scss";
import layoutStyles from "@/styles/layout.module.scss";
import Hero from "@/components/Hero";
import PublicationItem from "@/components/PublicationItem";
import { publicationsData } from "@/data/publications";
import { italicizeLatinWords } from "@/lib/utils";

// TODO: Refactor to fetch publications from API instead of static data, and implement pagination or infinite scroll for better performance with large number of publications.
export default function PublicationsPage() {
  const t = useTranslations("publications");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles["section-publications"]}>
        <div className={layoutStyles["container-content"]}>
          <div className={styles["section-publications__container"]}>
            <aside className={styles["section-publications__filters"]}>
              <ul className={styles["section-publications__filters-list"]}>
                <li
                  className={`${styles["section-publications__filters-item"]} ${selectedYear === null ? styles["section-publications__filters-item--active"] : ""}`}
                  onClick={() => setSelectedYear(null)}
                >
                  {t("filters.all")}
                </li>
                <li
                  className={`${styles["section-publications__filters-item"]} ${selectedYear === 2026 ? styles["section-publications__filters-item--active"] : ""}`}
                  onClick={() => setSelectedYear(2026)}
                >
                  2026
                </li>
                <li
                  className={`${styles["section-publications__filters-item"]} ${selectedYear === 2025 ? styles["section-publications__filters-item--active"] : ""}`}
                  onClick={() => setSelectedYear(2025)}
                >
                  2025
                </li>
                <li
                  className={`${styles["section-publications__filters-item"]} ${selectedYear === 2024 ? styles["section-publications__filters-item--active"] : ""}`}
                  onClick={() => setSelectedYear(2024)}
                >
                  2024
                </li>
                <li
                  className={`${styles["section-publications__filters-item"]} ${selectedYear === 2023 ? styles["section-publications__filters-item--active"] : ""}`}
                  onClick={() => setSelectedYear(2023)}
                >
                  2023
                </li>
              </ul>
            </aside>

            <div className={styles["section-publications__list"]}>
              {publicationsData
                .filter((pub) => selectedYear === null || pub.year === selectedYear)
                .sort((a, b) => {
                  if (b.year !== a.year) return b.year - a.year;
                  return b.month - a.month;
                })
                .map((publication, index) => (
                  <PublicationItem
                    key={index}
                    publication={{
                      ...publication,
                      title: italicizeLatinWords(publication.title),
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
