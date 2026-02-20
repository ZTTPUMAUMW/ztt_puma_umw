"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import styles from "../styles/components/quick-links.module.scss";

type CSSVars = React.CSSProperties & {
  ["--link-color"]?: string;
};

interface QuickLink {
  key: "publications" | "projects" | "models" | "recruitment";
  href: "/publications" | "/projects" | "/models" | "/recruitment";
  color: string;
}

const links: QuickLink[] = [
  {
    key: "publications",
    href: "/publications",
    color: "#1C3D5A",
  },
  {
    key: "projects",
    href: "/projects",
    color: "#E8751A",
  },
  {
    key: "models",
    href: "/models",
    color: "#2a5a7d",
  },
  {
    key: "recruitment",
    href: "/recruitment",
    color: "#C83F12",
  },
];

export default function QuickLinks() {
  const t = useTranslations("home.quickLinks");

  return (
    <section className={styles["quick-links"]}>
      <div className={styles["quick-links__container"]}>
        <h2 className={styles["quick-links__header"]}>{t("heading")}</h2>
        <div className={styles["quick-links__grid"]}>
          {links.map((link, index) => {
            const varStyle: CSSVars = { "--link-color": link.color };
            return (
              <Link
                key={index}
                href={link.href}
                className={styles["quick-links__item"]}
                style={varStyle}
              >
                <h3 className={styles["quick-links__item-title"]}>
                  {t(`links.${link.key}.title`)}
                </h3>
                <p className={styles["quick-links__item-description"]}>
                  {t(`links.${link.key}.description`)}
                </p>
                <span className={styles["quick-links__item-arrow"]}>→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
