import Image from "next/image";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import { getSharedContent } from "@/lib/cms-shared-loader";
import { buildPageMetadata } from "@/lib/seo";
import intro from "@/styles/components/team-stats.module.scss";
import tabs from "@/styles/pages/publications.module.scss";
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
    t = page.copy,
    media = page.research;
  if (!media) return null;
  return (
    <>
      <Hero title={t.title} subtitle={t.subtitle} />
      <section className={intro["team-intro__section"]}>
        <Container width="content">
          <p className={intro["team-intro__text"]}>{t.description}</p>
        </Container>
      </section>
      <section className={styles.section}>
        <Container width="content">
          <div className={tabs["section-publications__container"]}>
            <aside className={tabs["section-publications__filters"] + " " + styles.sidebar}>
              <ul
                className={tabs["section-publications__filters-list"]}
                role="tablist"
                aria-label={t.title}
              >
                <li
                  role="presentation"
                  className={
                    tabs["section-publications__filters-item"] +
                    " " +
                    tabs["section-publications__filters-item--active"]
                  }
                >
                  <button
                    role="tab"
                    aria-selected="true"
                    aria-controls="vitality-panel"
                    id="vitality-tab"
                    type="button"
                  >
                    {t.vitalityHeading}
                  </button>
                </li>
              </ul>
            </aside>
            <div
              className={styles.panel}
              role="tabpanel"
              id="vitality-panel"
              aria-labelledby="vitality-tab"
            >
              <h2>{t.vitalityHeading}</h2>
              {media.table && (
                <figure className={styles.table}>
                  <a
                    href={media.table}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.openTable}
                  >
                    <Image
                      src={media.table}
                      alt={t.tableAlt}
                      width={1920}
                      height={1080}
                      unoptimized
                      sizes="(max-width:1023px) 100vw, 1000px"
                    />
                  </a>
                </figure>
              )}
              <details className={styles.tableText}>
                <summary>{t.tableText}</summary>
                <div className={styles.tableScroll}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">{t.parameterLabel}</th>
                        <th scope="col">{t.scoreLabel}</th>
                        <th scope="col">{t.descriptionLabel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {media.parameters.flatMap((p) =>
                        p.grades.map((g) => (
                          <tr key={p.id + g.score}>
                            <th scope="row">{p.title}</th>
                            <td>{g.score}</td>
                            <td>{g.description}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </details>
              {media.attachment && (
                <section className={styles.downloads} aria-labelledby="research-downloads">
                  <h2 id="research-downloads">{t.downloadsHeading}</h2>
                  <p>{t.downloadDescription}</p>
                  <a href={media.attachment} download>
                    {t.downloadLabel}
                  </a>
                </section>
              )}
              <section aria-labelledby="vitality-parameters">
                <h2 id="vitality-parameters">{t.videosHeading}</h2>
                <div className={styles.parameters}>
                  {media.parameters.map((p) => (
                    <section
                      key={p.id}
                      className={styles.parameter}
                      aria-labelledby={"parameter-" + p.id}
                    >
                      <h3 id={"parameter-" + p.id}>{p.title}</h3>
                      {p.note && <p>{p.note}</p>}
                      {p.clips.map((clip) => (
                        <figure key={clip.id} className={styles.clip}>
                          <video
                            controls
                            playsInline
                            preload="none"
                            poster={clip.poster}
                            aria-label={p.title + " — " + t.scoreLabel + " " + clip.score}
                          >
                            <source src={clip.src} type="video/mp4" />
                          </video>
                          <figcaption>
                            <h4>
                              {t.scoreLabel} {clip.score}
                            </h4>
                            <p>{clip.caption}</p>
                          </figcaption>
                        </figure>
                      ))}
                    </section>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
