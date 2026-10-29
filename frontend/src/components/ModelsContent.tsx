"use client";

import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import RichText from "@/components/RichText";
import type { MarketingAction } from "@/lib/cms-marketing";
import type { ModelEntry } from "@/lib/cms-collections";
import ModelItem from "@/components/ModelItem";
import styles from "@/styles/pages/models.module.scss";

export default function ModelsContent({
  modelsToRender,
  ctaButtons,
}: {
  modelsToRender: ModelEntry[];
  ctaButtons: MarketingAction[];
}) {
  const t = useTranslations("models");

  return (
    <>
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Section>
        <div className="container-content">
          <div className={styles["models--list"]}>
            {modelsToRender.map((model, index) => (
              <ModelItem
                key={model.id}
                image={model.image}
                title={model.title}
                alt={model.alt}
                description={<RichText blocks={model.description} />}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </Section>

      <CTASection buttons={ctaButtons} />
    </>
  );
}
