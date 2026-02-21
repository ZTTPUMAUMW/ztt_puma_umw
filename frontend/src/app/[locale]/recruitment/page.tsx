"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/pages/recruitment.module.scss";
import layoutStyles from "@/styles/layout.module.scss";

export default function RecruitmentPage() {
  const t = useTranslations("recruitment");
  const [activeTab, setActiveTab] = useState<"etat" | "staz" | "phd">("etat");
  const [confirmed, setConfirmed] = useState(false);
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    rootMargin: "0px 0px -40px 0px",
  });
  const { ref: tabsRef, inView: tabsInView } = useInView();
  const { ref: preapplyRef, inView: preapplyInView } = useInView();

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles["recruitment-benefits-section"]}>
        <div className={styles["container-content"]}>
          <h2 className={styles["recruitment-benefits-header"]}>{t("benefits.heading")}</h2>
          <div
            ref={benefitsRef}
            className={`${styles["recruitment-benefits-grid"]} animate-stagger${benefitsInView ? " in-view" : ""}`}
          >
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 0 }}>
              <h3 className={styles["recruitment-benefit__title"]}>{t("benefits.career.title")}</h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.career.description")}
              </p>
            </div>
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 1 }}>
              <h3 className={styles["recruitment-benefit__title"]}>
                {t("benefits.publications.title")}
              </h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.publications.description")}
              </p>
            </div>
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 2 }}>
              <h3 className={styles["recruitment-benefit__title"]}>{t("benefits.team.title")}</h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.team.description")}
              </p>
            </div>
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 3 }}>
              <h3 className={styles["recruitment-benefit__title"]}>
                {t("benefits.equipment.title")}
              </h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.equipment.description")}
              </p>
            </div>
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 4 }}>
              <h3 className={styles["recruitment-benefit__title"]}>
                {t("benefits.stability.title")}
              </h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.stability.description")}
              </p>
            </div>
            <div className={styles["recruitment-benefit"]} style={{ ["--i" as string]: 5 }}>
              <h3 className={styles["recruitment-benefit__title"]}>
                {t("benefits.networking.title")}
              </h3>
              <p className={styles["recruitment-benefit__desc"]}>
                {t("benefits.networking.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={[
          styles["container-content"],
          layoutStyles["section-component"],
          styles["recruitment-section"],
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={tabsRef}
          className={`${styles["recruitment-tabs-card"]} animate-on-scroll${tabsInView ? " in-view" : ""}`}
        >
          <h2 className={styles["recruitment-tabs-title"]}>{t("tabs.heading")}</h2>
          <p className={styles["recruitment-tabs-desc"]}>{t("tabs.description")}</p>
          <div className={styles["recruitment-tabs-list"]}>
            <button
              className={[styles["tab-button"], activeTab === "etat" ? styles["active"] : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveTab("etat")}
              type="button"
            >
              {t("tabs.payroll")}
            </button>
            <button
              className={[styles["tab-button"], activeTab === "staz" ? styles["active"] : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveTab("staz")}
              type="button"
            >
              {t("tabs.internship")}
            </button>
            <button
              className={[styles["tab-button"], activeTab === "phd" ? styles["active"] : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveTab("phd")}
              type="button"
            >
              {t("tabs.phd")}
            </button>
          </div>
          <div className={styles["recruitment-tabs-content"]}>
            {activeTab === "etat" && (
              <div
                className={[styles["recruitment-panel"], styles["active"]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>{t("tabs.payrollContent")}</p>
              </div>
            )}
            {activeTab === "staz" && (
              <div
                className={[styles["recruitment-panel"], styles["active"]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>{t("tabs.internshipContent")}</p>
              </div>
            )}
            {activeTab === "phd" && (
              <div
                className={[styles["recruitment-panel"], styles["active"]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p>{t("tabs.phdContent")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        ref={preapplyRef}
        className={`${styles["recruitment-preapply"]} animate-on-scroll${preapplyInView ? " in-view" : ""}`}
      >
        <h3>{t("preapply.heading")}</h3>
        <ul className={styles["preapply-list"]}>
          <li>
            <strong>{t("tabs.payroll")}:</strong> {t("preapply.payroll")}
          </li>
          <li>
            <strong>{t("tabs.internship")}:</strong> {t("preapply.internship")}
          </li>
          <li>
            <strong>{t("tabs.phd")}:</strong> {t("preapply.phd")}
          </li>
        </ul>

        <label className={styles["checkbox-confirm"]}>
          <input
            type="checkbox"
            id="confirmRequirements"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          <span>{t("preapply.confirmLabel")}</span>
        </label>
      </section>

      {confirmed && (
        <section
          className={[
            layoutStyles["section-component"],
            styles["contact-section"],
            styles["recruitment-form-section"],
          ]
            .filter(Boolean)
            .join(" ")}
          id="recruitmentFormSection"
        >
          <div className={styles["recruitment-form-container"]}>
            <h1>{t("form.title")}</h1>
            <ContactForm
              submitEndpoint="/api/recruitment"
              attachmentLabel={t("form.attachmentLabel")}
              subjectOptions={[t("tabs.payroll"), t("tabs.internship"), t("tabs.phd")]}
            />
          </div>
        </section>
      )}
    </>
  );
}
