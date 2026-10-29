"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { fundingTotals, type ProjectEntry } from "@/lib/cms-collections";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import styles from "@/styles/pages/projects.module.scss";

export default function ProjectsContent({ projects }: { projects: ProjectEntry[] }) {
  const t = useTranslations("projects");
  const locale = useLocale();

  const totals = fundingTotals(projects);

  const totalProjects = projects.length;

  const uniqueGrants = Array.from(
    new Set(projects.map((project) => project.funding_shortcut))
  ).join(" / ");

  return (
    <div>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles["projects-stats-section"]}>
        <div className="container-content">
          <div className={styles["projects-stats"]}>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-number"]}>
                {totals
                  .map(
                    ([currency, amount]) =>
                      new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
                        amount / 1_000_000
                      ) +
                      " " +
                      t("stats.million") +
                      " " +
                      currency
                  )
                  .join(" / ") || "0"}
              </div>
              <div className={styles["stat-label"]}>{t("stats.totalValue")}</div>
            </div>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-number"]}>{totalProjects}</div>
              <div className={styles["stat-label"]}>{t("stats.activeProjects")}</div>
            </div>
            <div className={styles["stat-card"]}>
              <div className={styles["stat-number"]}>{uniqueGrants}</div>
              <div className={styles["stat-label"]}>{t("stats.partners")}</div>
            </div>
          </div>
        </div>
      </section>

      <Section className="container-content">
        <div className={styles["projects-list"]}>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
