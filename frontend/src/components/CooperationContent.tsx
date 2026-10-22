"use client";

import type { MarketingPage } from "@/lib/cms-marketing";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/pages/cooperation.module.scss";

export default function CooperationContent({ page }: { page: MarketingPage }) {
  const t = useTranslations("cooperation");
  const { ref: offersRef, inView: offersInView } = useInView({ rootMargin: "0px 0px -40px 0px" });
  const { ref: infoRef, inView: infoInView } = useInView();

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles["cooperation__offers-section"]}>
        <div className={styles["container-content"]}>
          <h2 className={styles["cooperation__offers-title"]}>{t("offers.heading")}</h2>
          <div
            ref={offersRef}
            className={`${styles["cooperation__offers-grid"]} animate-stagger${offersInView ? " in-view" : ""}`}
          >
            {page.offers.map((item, index) => (
              <div
                key={item.id}
                className={styles["cooperation__offer-card"]}
                style={{ ["--i" as string]: index }}
              >
                <h3 className={styles["cooperation__offer-title"]}>{item.title}</h3>
                <p className={styles["cooperation__offer-description"]}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles["section-component"]} ${styles["cooperation__section"]}`}>
        <div className={styles["cooperation__container"]}>
          <div
            ref={infoRef}
            className={`${styles["cooperation__info"]} animate-on-scroll${infoInView ? " in-view" : ""}`}
          >
            <div className={styles["cooperation__intro"]}>
              <h2>{t("intro.heading")}</h2>
              <p>{t("intro.paragraph1")}</p>

              <p>{t("intro.paragraph2")}</p>
            </div>

            <div className={styles["cooperation__scope"]}>
              <h3>{t("scope.heading")}</h3>
              <ul>
                {page.scope.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>

            <p className={styles["cooperation__note"]}>{t("note")}</p>
          </div>

          <div className={styles["cooperation__form"]}>
            <h2>{t("form.title")}</h2>
            <ContactForm
              submitEndpoint="/api/cooperation"
              attachmentLabel={t("form.attachmentLabel")}
              showCompanyField={true}
            />
          </div>
        </div>
      </section>
    </>
  );
}
