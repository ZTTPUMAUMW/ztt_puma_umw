'use client';

import { useTranslations } from 'next-intl';
import styles from "../styles/pages/publications.module.scss";

export interface Publication {
  title: string;
  authors: string;
  year: number;
  month: number;
  journal: string;
  doi: string;
  url: string;
}

interface PublicationItemProps {
  publication: Publication;
}

function formatAuthors(authors: string): string {
  const authorArray = authors.split(" and ");
  
  if (authorArray.length === 1) {
    return authors;
  }
  
  if (authorArray.length === 2) {
    return authorArray.join(" and ");
  }
  
  const allButLast = authorArray.slice(0, -1).join(", ");
  const lastAuthor = authorArray[authorArray.length - 1];
  
  return `${allButLast} and ${lastAuthor}`;
}

export default function PublicationItem({ publication }: PublicationItemProps) {
  const t = useTranslations('publications');
  const { title, authors, year, month, journal, doi, url } = publication;
  
  const monthKeys = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const monthName = t(`months.${monthKeys[month - 1]}`);
  const formattedAuthors = formatAuthors(authors);






  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles['publication']}
    >
      <div className={styles['publication__content']}>
        <div className={styles['publication__wrapper']}>
          <div className={styles['publication__meta']}>
            <span className={styles['publication__date']}>{monthName} {year}</span>
          </div>

          <h3 
            className={styles['publication__title']}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <div className={styles['publication__info']}>
            <p className={styles['publication__authors']}>{formattedAuthors}</p>
            <div className={styles['publication__meta-row']}>
              <span className={styles['publication__journal']}>{journal}</span>
              {doi && (
                <span className={styles['publication__doi']}>
                  DOI: {doi}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
