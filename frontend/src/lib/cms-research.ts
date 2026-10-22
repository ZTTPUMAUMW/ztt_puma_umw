import { record, safeHttpsUrl } from "./cms-collections";
import seeds from "./cms-shared-defaults.json";
const text = (v: unknown) => (typeof v === "string" && v.length <= 3000 ? v : "");
const local = (v: unknown, locale: string) => text(record(v)[locale]);
const rows = (v: unknown, max: number) => (Array.isArray(v) ? v.slice(0, max).map(record) : []);
export function researchAsset(
  upload: unknown,
  legacy: unknown,
  kind: "video" | "image",
  projectId: string
): string {
  const url = safeHttpsUrl(record(record(upload).asset).url);
  if (url) {
    const parsed = new URL(url);
    if (
      parsed.hostname === "cdn.sanity.io" &&
      parsed.pathname.startsWith(
        "/" + (kind === "video" ? "files" : "images") + "/" + projectId + "/"
      ) &&
      (kind !== "video" || parsed.pathname.endsWith(".mp4"))
    )
      return url;
  }
  const path = text(legacy),
    extension = kind === "video" ? "mp4" : "(?:png|jpe?g|webp|avif)";
  return new RegExp("^/research/vitality/[a-z0-9-]+\\." + extension + "$").test(path) ? path : "";
}
export function resolveResearchMedia(raw: unknown, locale: string, projectId: string) {
  const doc = record(raw);
  const parameters = rows(
    doc.parameters === undefined ? seeds.research.parameters : doc.parameters,
    20
  )
    .map((p, i) => {
      const grades = rows(p.grades, 10)
        .flatMap((g) =>
          typeof g.score === "number" && Number.isInteger(g.score) && g.score >= 0 && g.score <= 100
            ? [{ score: g.score, description: local(g.description, locale) }]
            : []
        )
        .sort((a, b) => a.score - b.score);
      const seen = new Set<number>();
      const clips = rows(p.clips, 20)
        .flatMap((v) => {
          const src = researchAsset(v.file, v.legacyVideo, "video", projectId),
            score = v.score;
          if (
            !src ||
            typeof score !== "number" ||
            !Number.isInteger(score) ||
            score < 0 ||
            score > 100 ||
            seen.has(score)
          )
            return [];
          seen.add(score);
          return [
            {
              id: text(v._key) || "score" + score,
              score,
              caption:
                local(v.caption, locale) ||
                grades.find((g) => g.score === score)?.description ||
                "",
              src,
              poster: researchAsset(v.poster, v.legacyPoster, "image", projectId) || undefined,
            },
          ];
        })
        .sort((a, b) => a.score - b.score);
      return {
        id: text(p._key) || "parameter" + i,
        title: local(p.title, locale),
        note: local(p.note, locale),
        grades,
        clips,
      };
    })
    .filter((p) => p.title.trim());
  return {
    table: researchAsset(
      doc.tableImage,
      doc.legacyTable === undefined ? seeds.research.legacyTable : doc.legacyTable,
      "image",
      projectId
    ),
    parameters,
  };
}
export type ResearchMedia = ReturnType<typeof resolveResearchMedia>;
