import { resolveResearchMedia } from "./cms-research";
import seeds from "./cms-shared-defaults.json";
import { record, imageSource, safeHttpsUrl } from "./cms-collections";
import { internalRoutes, type InternalRoute } from "./cms-marketing";
const text = (v: unknown) => (typeof v === "string" && v.trim() && v.length <= 3000 ? v : "");
const localized = (v: unknown, l: string) => text(record(v)[l]);
const copy = (template: Record<string, unknown>, raw: unknown, l: string) =>
  Object.fromEntries(
    Object.entries(template).map(([k, v]) => [k, localized(record(raw)[k], l) || localized(v, l)])
  ) as Record<string, string>;
export type WebsiteLink = { id: string; label: string; route?: InternalRoute; url?: string };
export function resolveSharedContent(
  name: "shell" | "research",
  raw: unknown,
  language: string,
  projectId = "s2jrzn3b"
) {
  const locale = language === "en" ? "en" : "pl",
    seed = seeds[name],
    doc =
      raw !== null && typeof raw === "object" && !Array.isArray(raw) ? record(raw) : record(seed);
  const rows = (key: string, fallback: unknown[] = []) => {
    const source = doc[key] === undefined ? fallback : doc[key];
    return (Array.isArray(source) ? source.slice(0, 30) : []).map(record);
  };
  const links = (key: "header" | "footerSite" | "footerContact" | "externalLinks"): WebsiteLink[] =>
    rows(key, name === "shell" ? seeds.shell[key] : []).flatMap((v, i) => {
      const label = localized(v.label, locale),
        route = internalRoutes.find((r) => r === v.route),
        url = safeHttpsUrl(localized(v.url, locale));
      return label && (route || url)
        ? [{ id: text(v._key) || key + i, label, route, url: route ? undefined : url }]
        : [];
    });
  return {
    copy: copy(seed.copy, doc.copy, locale),
    research: name === "research" ? resolveResearchMedia(doc, locale, projectId) : undefined,
    header: links("header"),
    footerSite: links("footerSite"),
    footerContact: links("footerContact"),
    externalLinks: links("externalLinks"),
    logo: imageSource(doc.logo, "/logo.svg", projectId),
    universityLogo: doc.universityLogo
      ? imageSource(doc.universityLogo, undefined, projectId)
      : "/umw-logo.svg",
    universityUrl:
      safeHttpsUrl(localized(doc.universityUrl, locale)) || "https://www.umw.edu.pl/" + locale,
    clips: rows("clips").flatMap((v, i) => {
      const label = localized(v.label, locale);
      return label
        ? [{ id: text(v._key) || "clip" + i, label, description: localized(v.description, locale) }]
        : [];
    }),
    seoTitle: localized(doc.seoTitle, locale) || localized(record(seed).seoTitle, locale),
    seoDescription:
      localized(doc.seoDescription, locale) || localized(record(seed).seoDescription, locale),
  };
}
export type SharedContent = ReturnType<typeof resolveSharedContent>;
