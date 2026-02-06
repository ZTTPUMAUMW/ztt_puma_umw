'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from '@/styles/pages/projects.module.scss';

export interface Project {
  title: string;
  funding_body: string;
  funding_body_number?: string;
  funding_shortcut: string;
  description: string;
  roles: {
    academicTitle?: string;
    name: string;
    universityTitle?: string;
    role: string;
  }[];
  funding_amount: string;
  funding_logo?: string;
  link?: string;
}

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const t = useTranslations('projects.labels');
  
  const Wrapper = project.link ? 'a' : 'div';
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: styles['project-component-link'],
        'aria-label': `${t('learnMore')}: ${project.title}`
      }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <div className={styles['project-component']}>
        <div className={styles['project-component__content']}>
          <div className={styles['project-component__wrapper-head']}>
            {project.funding_logo && (
              <Image
                src={project.funding_logo}
                alt={project.funding_body}
                className={[
                  styles['project-component__logo'],
                  project.funding_logo.includes('umw-logo.svg') && styles['project-component__logo--umw']
                ].filter(Boolean).join(' ')}
                width={60}
                height={60}
              />
            )}
            <h3
              className={styles['project-component__title']}
              dangerouslySetInnerHTML={{ __html: project.title }}
            />
          </div>
          <div className={styles['project-component__wrapper']}>
            <div className={styles['project-component__wrapper-separator']}></div>
          </div>

          <div className={styles['project-component__description']}>
            {project.description && (
              <div
                className={styles['project-component__copy']}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            )}
          </div>

          {project.roles && project.roles.length > 0 && (
            <div className={styles['project-component__roles']}>
              <strong>{t('team')}:</strong>
              <ul className={styles['project-component__roles-list']}>
                {project.roles.map((person, index) => (
                  <li key={index}>
                    {person.academicTitle && `${person.academicTitle} `}
                    {person.name}
                    {person.universityTitle && `, ${person.universityTitle}`}
                    {' \u2013 '}
                    {person.role}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles['project-component__bottom']}>
            <div className={styles['project-component__funding-info']}>
              <span className={styles['project-component__funding-body']}>{project.funding_body}</span>
              {project.funding_body_number && (
                <span className={styles['project-component__funding-body-number']}>{project.funding_body_number}</span>
              )}
            </div>
            <span className={styles['project-component__funding-amount']}>{project.funding_amount}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
