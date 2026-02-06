import Image from "next/image";
import { ReactNode } from "react";
import styles from '@/styles/pages/models.module.scss';

interface ModelItemProps {
  image: string;
  title: string;
  description: string | ReactNode;
  reverse?: boolean;
}

export default function ModelItem({ image, title, description, reverse = false }: ModelItemProps) {
  const classNames = [styles['models__item']];
  if (reverse) classNames.push(styles['models__item--reverse']);

  return (
    <div className={classNames.join(' ')}>
      <div className={styles['models__item-image']}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles['models__item-content']}>
        <h3 
          className={styles['models__item-title']}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className={styles['models__item-description']}>
          {typeof description === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
}
