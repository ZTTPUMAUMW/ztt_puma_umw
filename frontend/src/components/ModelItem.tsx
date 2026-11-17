"use client";

import ScientificText from "./ScientificText";

import Image from "next/image";
import { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import styles from "@/styles/pages/models.module.scss";

interface ModelItemProps {
  image: string;
  title: string;
  description: string | ReactNode;
  reverse?: boolean;
  alt?: string;
}

export default function ModelItem({
  image,
  title,
  description,
  alt,
  reverse = false,
}: ModelItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const animClass = reverse ? "animate-from-right" : "animate-from-left";
  const classNames = [
    styles["models__item"],
    animClass,
    inView ? "in-view" : "",
    reverse ? styles["models__item--reverse"] : "",
  ].filter(Boolean);

  return (
    <div ref={ref} className={classNames.join(" ")}>
      <div className={styles["models__item-image"]}>
        <Image
          src={image}
          alt={alt || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles["models__item-content"]}>
        <h3 className={styles["models__item-title"]}>
          <ScientificText text={title} />
        </h3>
        <div className={styles["models__item-description"]}>
          {typeof description === "string" ? (
            <div>
              <ScientificText text={description} />
            </div>
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
}
