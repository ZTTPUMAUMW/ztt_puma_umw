import Hero from "@/components/Hero";
import { getSharedContent } from "@/lib/cms-shared-loader";
import { buildPageMetadata } from "@/lib/seo";
import styles from "@/styles/pages/research.module.scss";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getSharedContent("research", locale);
  return buildPageMetadata({
    locale,
    route: "/research",
    title: page.seoTitle,
    description: page.seoDescription,
  });
}
export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getSharedContent("research", locale),
    t = page.copy;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
      <div className={styles.content}>
        <section>
          <h2>{t.descriptionHeading}</h2>
          <p>{t.description}</p>
        </section>
        <section>
          <h2>{t.attachmentsHeading}</h2>
          <div className={styles.placeholder}>
            <h3>{t.spreadsheet}</h3>
            <p>{t.pending}</p>
          </div>
        </section>
        <section>
          <h2>{t.vitalityHeading}</h2>
          <p>{t.vitalityDescription}</p>
          <figure className={styles.table}>
            <div aria-hidden="true">▦</div>
            <figcaption>{t.tableCaption}</figcaption>
            <p>{t.pending}</p>
          </figure>
          <h3>{t.videosHeading}</h3>
          <div className={styles.clips}>
            {page.clips.map((clip) => (
              <article key={clip.id} className={styles.placeholder}>
                <span aria-hidden="true">▷</span>
                <h4>{clip.label}</h4>
                <p>{clip.description}</p>
                <p>{t.pending}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
