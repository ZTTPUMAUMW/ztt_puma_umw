'use client';

import { useTranslations, useLocale } from 'next-intl';
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import ModelItem from "@/components/ModelItem";
import { italicizeLatinWords } from "@/lib/utils";
import { modelsData as modelsDataPl } from "@/data/models.pl";
import { modelsData as modelsDataEn } from "@/data/models.en";
import styles from "@/styles/pages/models.module.scss";

const models = (locale: string) => {
  const modelsData = locale === 'en' ? modelsDataEn : modelsDataPl;
  
  return modelsData.map((model) => ({
    ...model,
    title: italicizeLatinWords(model.title),
    description: typeof model.description === 'string' 
      ? italicizeLatinWords(model.description) 
      : model.description
  }));
};

export default function ModelsPage() {
  const t = useTranslations('models');
  const locale = useLocale();
  const modelsToRender = models(locale);
  
  return (
    <>
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <div className="container-content">
          <div className={styles['models--list']}>
            {modelsToRender.map((model, index) => (
              <ModelItem
                key={index}
                image={model.image}
                title={model.title}
                description={model.description}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
