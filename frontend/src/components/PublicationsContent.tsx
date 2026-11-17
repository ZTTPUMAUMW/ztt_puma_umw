"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "@/styles/pages/publications.module.scss";
import layoutStyles from "@/styles/layout.module.scss";
import Hero from "@/components/Hero";
import PublicationItem from "@/components/PublicationItem";
import { publicationYears } from "@/lib/cms-collections";
import type { Publication } from "@/components/PublicationItem";

export default function PublicationsContent({
  publicationsData,
}: {
  publicationsData: Publication[];
}) {
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
                >
                  <button
                    type="button"
                    onClick={() => setSelectedYear(null)}
                    aria-pressed={selectedYear === null}
                  >
                    {t("filters.all")}
                  </button>
                </li>
                {publicationYears(publicationsData).map((year) => (
                  <li
                    key={year}
                    className={
                      styles["section-publications__filters-item"] +
                      (selectedYear === year
                        ? " " + styles["section-publications__filters-item--active"]
                        : "")
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedYear(year)}
                      aria-pressed={selectedYear === year}
                    >
                      {year}
                    </button>
                  </li>
                ))}
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
                      title: publication.title,
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
