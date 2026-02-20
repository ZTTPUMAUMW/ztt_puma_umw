"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import styles from "@/styles/components/featured-banner.module.scss";

interface FeaturedBannerProps {
  image: string;
  title: string;
  description: string;
  link: string;
  alt?: string;
}

export default function FeaturedBanner({
  image,
  title,
  description,
  link,
  alt,
}: FeaturedBannerProps) {
  const locale = useLocale();
  const t = useTranslations("featuredBanner");
  const tabText = locale === "en" ? "NEWS & UPDATES" : "AKTUALNOŚCI";
  const imageAlt = alt || title;

  return (
    <section className={styles.banner}>
      <div className={styles.banner__container}>
        <div className={styles.banner__card}>
          <div className={styles.banner__tab}>
            <span>{tabText}</span>
          </div>

          <div className={styles.banner__content}>
            <h2 className={styles.banner__title}>{title}</h2>
            <p className={styles.banner__description}>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.banner__cta}>
              {t("readMore")}
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1L19 6L14 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M1 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          <div className={styles.banner__image_wrapper}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className={styles.banner__image}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
