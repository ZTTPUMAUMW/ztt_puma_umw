"use client";

import type { MarketingLogo } from "@/lib/cms-marketing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/components/grant-logos.module.scss";

export default function GrantLogos({ items: grantLogos }: { items: MarketingLogo[] }) {
  const t = useTranslations("home.grantLogos");
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={`${styles["grant-logos__section"]} animate-on-scroll${inView ? " in-view" : ""}`}
    >
      <div className={styles["grant-logos__container"]}>
        <h2 className={styles["grant-logos__title"]}>{t("title")}</h2>
        <div className={styles["grant-logos__track-wrapper"]}>
          <div className={styles["grant-logos__track"]}>
            {grantLogos.map((logo) => (
              <a
                key={logo.id}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["grant-logos__item"]}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  style={{ height: "auto" }}
                  className={styles["grant-logos__image"]}
                />
              </a>
            ))}
            {grantLogos.map((logo, index) => (
              <a
                key={`${logo.src}-clone-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden="true"
                tabIndex={-1}
                className={styles["grant-logos__item"]}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  style={{ height: "auto" }}
                  className={styles["grant-logos__image"]}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
