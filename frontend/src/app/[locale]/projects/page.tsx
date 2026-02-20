'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectItem from "@/components/ProjectItem";
import { italicizeLatinWords } from "@/lib/utils";
import styles from '@/styles/pages/projects.module.scss';
import { projectsData as projectsDataPl } from '@/data/projects.pl';
import { projectsData as projectsDataEn } from '@/data/projects.en';


// TODO: Refactor to fetch projects from SanityCMS instead of static data, and move stats calculation to backend for better performance and accuracy.
export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  
  const projectsData = locale === 'en' ? projectsDataEn : projectsDataPl;
  
  const projects = projectsData.map((project) => ({
    ...project,
    title: italicizeLatinWords(project.title),
    description: italicizeLatinWords(project.description),
  }));

  const totalValue = projects.reduce((sum, project) => {
    const amount = parseFloat(project.funding_amount.replace(/[^\d.,]/g, '').replace(',', '.'));
    return sum + amount;
  }, 0);

  const totalProjects = projects.length;

  const uniqueGrants = Array.from(
    new Set(projects.map((project) => project.funding_shortcut))
  ).join(' / ');

  const formattedValue = (totalValue / 1_000_000).toFixed(1).replace('.', ',');
  
  return (
    <div>
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className={styles['projects-stats-section']}>
        <div className="container-content">
          <div className={styles['projects-stats']}>
            <div className={styles['stat-card']}>
              <div className={styles['stat-number']}>
                ~{formattedValue} {locale === 'en' ? 'million' : 'mln'}
              </div>
              <div className={styles['stat-label']}>{t('stats.totalValue')}</div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-number']}>
                {totalProjects}
              </div>
              <div className={styles['stat-label']}>{t('stats.activeProjects')}</div>
            </div>
            <div className={styles['stat-card']}>
              <div className={styles['stat-number']}>
                {uniqueGrants}
              </div>
              <div className={styles['stat-label']}>{t('stats.partners')}</div>
            </div>
          </div>
        </div>
      </section>

      <Section className="container-content">
        <div className={styles['projects-list']}>
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </div>
      </Section>
    </div>
  );
}
