"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";

import styles from "../styles/components/footer.module.scss";

import type { SharedContent, WebsiteLink } from "@/lib/cms-shared";
import type { WebsiteContent } from "@/lib/cms-content";

export default function Footer({
  settings,
  chrome,
}: {
  settings: WebsiteContent["settings"];
  chrome: SharedContent;
}) {
  const currentYear = new Date().getFullYear();
  const renderLinks = (items: WebsiteLink[]) =>
    items.map((item) => (
      <li key={item.id}>
        {item.route ? (
          <Link href={item.route}>{item.label}</Link>
        ) : (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        )}
      </li>
    ));

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["site-footer__pattern"]}></div>
      <div className={styles["site-footer__container"]}>
        <div className={styles["site-footer__content"]}>
          <div
            className={`${styles["site-footer__section"]} ${styles["site-footer__section--main"]}`}
          >
            <a
              href={chrome.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={chrome.copy.universityAlt}
            >
              <Image
                src={chrome.universityLogo}
                alt={chrome.copy.universityAlt}
                width={180}
                height={60}
                style={{ height: "auto" }}
                className={styles["site-footer__main-logo"]}
              />
            </a>
            <p>{settings.footerDepartment}</p>
            <p>{settings.footerLab}</p>
            <p className={styles["site-footer__main-description"]}>{settings.footerDescription}</p>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{chrome.copy.site}</h3>
            <ul>{renderLinks(chrome.footerSite)}</ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{chrome.copy.contact}</h3>
            <ul>{renderLinks(chrome.footerContact)}</ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{chrome.copy.links}</h3>
            <ul>{renderLinks(chrome.externalLinks)}</ul>
          </div>
        </div>

        <div className={styles["site-footer__bottom"]}>
          <p>
            &copy; {currentYear} {settings.copyrightName}. {chrome.copy.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
