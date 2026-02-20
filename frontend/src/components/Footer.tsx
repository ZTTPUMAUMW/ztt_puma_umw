"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import styles from "../styles/components/footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("navigation");
  const tFooter = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["site-footer__pattern"]}></div>
      <div className={styles["site-footer__container"]}>
        <div className={styles["site-footer__content"]}>
          <div
            className={`${styles["site-footer__section"]} ${styles["site-footer__section--main"]}`}
          >
            <a
              href={`https://www.umw.edu.pl/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UMW"
            >
              <Image
                src="/umw-logo.svg"
                alt="Logo Uniwersytetu Medycznego we Wrocławiu"
                width={180}
                height={60}
                className={styles["site-footer__main-logo"]}
              />
            </a>
            <p>{tFooter("department")}</p>
            <p>{tFooter("lab")}</p>
            <p className={styles["site-footer__main-description"]}>{tFooter("description")}</p>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("site")}</h3>
            <ul>
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link href="/projects">{t("projects")}</Link>
              </li>
              <li>
                <Link href="/publications">{t("publications")}</Link>
              </li>
              <li>
                <Link href="/models">{t("models")}</Link>
              </li>
              <li>
                <Link href="/team">{t("team")}</Link>
              </li>
            </ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("contact")}</h3>
            <ul>
              <li>
                <Link href="/recruitment">{t("recruitment")}</Link>
              </li>
              <li>
                <Link href="/cooperation">{t("cooperation")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("contact")}</Link>
              </li>
            </ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("links")}</h3>
            <ul>
              <li>
                <a href="https://www.umw.edu.pl" target="_blank" rel="noopener noreferrer">
                  {tFooter("externalLinks.university")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.umw.edu.pl/pl/jednostki/zaklad-technologii-translacyjnych"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tFooter("externalLinks.department")}
                </a>
              </li>
              <li>
                <a
                  href="https://ppm.umw.edu.pl/info/affiliation/UMW49ae3cc953a04e37bf652c1f8ab5791a?r=publication&tab=publications&title=Profil%2Bjednostki%2B%25E2%2580%2593%2BZak%25C5%2582ad%2BTechnologii%2BTranslacyjnych%2B%25E2%2580%2593%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tFooter("externalLinks.platform")}
                </a>
              </li>
              <li>
                <a href="https://plum.umw.edu.pl" target="_blank" rel="noopener noreferrer">
                  {tFooter("externalLinks.plum")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["site-footer__bottom"]}>
          <p>
            &copy; {currentYear} P.U.M.A. - Pracownia Unikalnych Modeli Aplikacyjnych.{" "}
            {tFooter("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
