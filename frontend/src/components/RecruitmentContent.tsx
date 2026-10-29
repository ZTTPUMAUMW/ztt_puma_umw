"use client";

import { useState } from "react";
import type { MarketingPage } from "@/lib/cms-marketing";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/pages/recruitment.module.scss";
import layoutStyles from "@/styles/layout.module.scss";

export default function RecruitmentContent({ page }: { page: MarketingPage }) {
  const t = useTranslations("recruitment");
  const [activeTab, setActiveTab] = useState(page.tracks[0]?.id ?? "");
  const selectedTrack = page.tracks.find((track) => track.id === activeTab) ?? page.tracks[0];
  const [confirmed, setConfirmed] = useState(false);
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    rootMargin: "0px 0px -40px 0px",
  });
  const { ref: tabsRef, inView: tabsInView } = useInView();
  const { ref: preapplyRef, inView: preapplyInView } = useInView();

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles["recruitment__benefits-section"]}>
        <div className={layoutStyles["container-content"]}>
          <h2 className={styles["recruitment__benefits-header"]}>{t("benefits.heading")}</h2>
          <div
            ref={benefitsRef}
            className={`${styles["recruitment__benefits-grid"]} animate-stagger${benefitsInView ? " in-view" : ""}`}
          >
            {page.benefits.map((item, index) => (
              <div
                key={item.id}
                className={styles["recruitment__benefit"]}
                style={{ ["--i" as string]: index }}
              >
                <h3 className={styles["recruitment__benefit-title"]}>{item.title}</h3>
                <p className={styles["recruitment__benefit-desc"]}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={[
          layoutStyles["container-content"],
          layoutStyles["section-component"],
          styles["recruitment-section"],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={tabsRef}
          className={`${styles["recruitment__tabs-card"]} animate-on-scroll${tabsInView ? " in-view" : ""}`}
        >
          <h2 className={styles["recruitment__tabs-title"]}>{t("tabs.heading")}</h2>
          <p className={styles["recruitment__tabs-desc"]}>{t("tabs.description")}</p>
          <div className={styles["recruitment__tabs-list"]}>
            {page.tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                aria-pressed={selectedTrack?.id === track.id}
                className={`${styles["recruitment__tab-button"]} ${selectedTrack?.id === track.id ? styles.active : ""}`}
                onClick={() => setActiveTab(track.id)}
              >
                {track.label}
              </button>
            ))}
          </div>
          <div className={styles["recruitment__tabs-content"]}>
            {selectedTrack && (
              <div className={`${styles["recruitment-panel"]} ${styles.active}`}>
                <p>{selectedTrack.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        ref={preapplyRef}
        className={`${styles["recruitment__preapply"]} animate-on-scroll${preapplyInView ? " in-view" : ""}`}
      >
        <h3>{t("preapply.heading")}</h3>
        <ul className={styles["recruitment__preapply-list"]}>
          {page.tracks.map((track) => (
            <li key={track.id}>
              <strong>{track.label}:</strong> {track.requirements}
            </li>
          ))}
        </ul>

        <label className={styles["recruitment__checkbox-confirm"]}>
          <input
            type="checkbox"
            id="confirmRequirements"
            disabled={page.tracks.length === 0}
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span>{t("preapply.confirmLabel")}</span>
        </label>
      </section>

      {confirmed && page.tracks.length > 0 && (
        <section
          className={[
            layoutStyles["section-component"],
            styles["contact-section"],
            styles["recruitment__form-section"],
          ]
            .filter(Boolean)
            .join(" ")}
          id="recruitmentFormSection"
        >
          <div className={styles["recruitment__form-container"]}>
            <h2>{t("form.title")}</h2>
            <ContactForm
              submitEndpoint="/api/recruitment"
              attachmentLabel={t("form.attachmentLabel")}
              subjectOptions={page.tracks.map((track) => track.label)}
            />
          </div>
        </section>
      )}
    </>
  );
}
