"use client";

import type { MarketingQuickLink } from "@/lib/cms-marketing";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import styles from "../styles/components/quick-links.module.scss";

type CSSVars = React.CSSProperties & {
  ["--link-color"]?: string;
};

export default function QuickLinks({ items: links }: { items: MarketingQuickLink[] }) {
  const t = useTranslations("home.quickLinks");
  const { ref: headerRef, inView: headerInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView({ rootMargin: "0px 0px -40px 0px" });

  return (
    <section className={styles["quick-links"]}>
      <div className={styles["quick-links__container"]}>
        <h2
          ref={headerRef}
          className={`${styles["quick-links__header"]} animate-on-scroll${headerInView ? " in-view" : ""}`}
        >
          {t("heading")}
        </h2>
        <div
          ref={gridRef}
          className={`${styles["quick-links__grid"]} animate-stagger${gridInView ? " in-view" : ""}`}
        >
          {links.map((link, index) => {
            const varStyle: CSSVars = {
              "--link-color": ["#1C3D5A", "#E8751A", "#2a5a7d", "#C83F12"][index % 4],
              ["--i" as string]: index,
            };
            return (
              <Link
                key={link.id}
                href={link.route}
                className={styles["quick-links__item"]}
                style={varStyle}
              >
                <h3 className={styles["quick-links__item-title"]}>{link.title}</h3>
                <p className={styles["quick-links__item-description"]}>{link.description}</p>
                <span className={styles["quick-links__item-arrow"]}>→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
