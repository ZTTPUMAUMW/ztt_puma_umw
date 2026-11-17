import seeds from "./cms-marketing-defaults.json";
import { record, imageSource, safeHttpsUrl, type Messages } from "./cms-collections";
export type MarketingName = "home" | "recruitment" | "cooperation";
export const internalRoutes = [
  "/",
  "/team",
  "/projects",
  "/publications",
  "/models",
  "/research",
  "/recruitment",
  "/cooperation",
  "/contact",
] as const;
export type InternalRoute = (typeof internalRoutes)[number];
export type MarketingCard = { id: string; title: string; description: string };
export type MarketingAction = { id: string; label: string; aria: string; route: InternalRoute };
export type MarketingQuickLink = MarketingCard & { route: InternalRoute };
export type MarketingBanner = MarketingCard & { image: string; alt: string; link: string };
export type MarketingLogo = { id: string; src: string; alt: string; url: string };
export type RecruitmentTrack = {
  id: string;
  label: string;
  description: string;
  requirements: string;
};
const string = (v: unknown, max = 3000) => (typeof v === "string" && v.length <= max ? v : "");
const local = (v: unknown, locale: string) => string(record(v)[locale]);
const list = (v: unknown) => (Array.isArray(v) ? v.slice(0, 100) : []);
export function validMessage(value: unknown, template: string): boolean {
  if (typeof value !== "string" || !value.trim() || value.length > 3000) return false;
  const tokens = (s: string) =>
    [...new Set(s.match(/\{[A-Za-z][A-Za-z0-9]*\}/g) || [])].sort().join(",");
  return (
    !/[{}<>]/.test(value.replace(/\{[A-Za-z][A-Za-z0-9]*\}/g, "")) &&
    tokens(value) === tokens(template)
  );
}
function messages(template: unknown, value: unknown, locale: string): Messages {
  const raw = record(value);
  return Object.fromEntries(
    Object.entries(record(template)).map(([k, v]) => {
      if (record(v)._type === "localizedText") {
        const fallback = local(v, locale),
          candidate = local(raw[k], locale);
        return [k, validMessage(candidate, fallback) ? candidate : fallback];
      }
      return [k, messages(v, raw[k], locale)];
    })
  );
}
const route = (v: unknown): InternalRoute | undefined => internalRoutes.find((x) => x === v);
export function resolveMarketingPage(
  name: MarketingName,
  raw: unknown,
  language: string,
  projectId = "s2jrzn3b"
) {
  const locale = language === "en" ? "en" : "pl",
    seed = record(seeds[name]);
  const doc = raw !== null && typeof raw === "object" && !Array.isArray(raw) ? record(raw) : seed;
  const rows = (key: string): (Record<string, unknown> & { id: string })[] =>
    list(doc[key]).map((v, i) => ({ ...record(v), id: string(record(v)._key, 100) || key + i }));
  const cards = (key: string): MarketingCard[] =>
    rows(key).flatMap((v) => {
      const title = local(v.title, locale);
      return title.trim() ? [{ id: v.id, title, description: local(v.description, locale) }] : [];
    });
  const actions = (key: string): MarketingAction[] =>
    rows(key).flatMap((v) => {
      const label = local(v.label, locale),
        destination = route(v.route);
      return label.trim() && destination
        ? [{ id: v.id, label, aria: local(v.aria, locale) || label, route: destination }]
        : [];
    });
  const copy = messages(seed.copy, doc.copy, locale) as Record<string, Messages>;
  const banners: MarketingBanner[] = rows("banners").flatMap((v) => {
    const title = local(v.title, locale),
      link = safeHttpsUrl(local(v.url, locale));
    return title.trim() && link
      ? [
          {
            id: v.id,
            title,
            description: local(v.description, locale),
            link,
            image: imageSource(v.image, v.legacyImage, projectId),
            alt: local(v.alt, locale) || title,
          },
        ]
      : [];
  });
  const quickLinks: MarketingQuickLink[] = rows("quickLinks").flatMap((v) => {
    const title = local(v.title, locale),
      destination = route(v.route);
    return title.trim() && destination
      ? [{ id: v.id, title, description: local(v.description, locale), route: destination }]
      : [];
  });
  const grantLogos: MarketingLogo[] = rows("grantLogos").flatMap((v) => {
    const alt = local(v.alt, locale),
      url = safeHttpsUrl(v.url);
    return alt.trim() && url
      ? [{ id: v.id, alt, url, src: imageSource(v.image, v.legacyImage, projectId) }]
      : [];
  });
  const tracks: RecruitmentTrack[] = rows("tracks").flatMap((v) => {
    const label = local(v.label, locale);
    return label.trim().length >= 5 && label.length <= 200
      ? [
          {
            id: v.id,
            label,
            description: local(v.description, locale),
            requirements: local(v.requirements, locale),
          },
        ]
      : [];
  });
  const scope = rows("scope").flatMap((v) => {
    const text = local(v.text, locale);
    return text.trim() ? [{ id: v.id, text }] : [];
  });
  return {
    copy,
    seoTitle: local(doc.seoTitle, locale) || local(seed.seoTitle, locale),
    seoDescription: local(doc.seoDescription, locale) || local(seed.seoDescription, locale),
    heroButtons: actions("heroButtons"),
    ctaButtons: actions("ctaButtons"),
    banners,
    infoCards: cards("infoCards"),
    researchAreas: cards("researchAreas"),
    features: cards("features"),
    quickLinks,
    grantLogos,
    benefits: cards("benefits"),
    tracks,
    offers: cards("offers"),
    scope,
  };
}
export type MarketingPage = ReturnType<typeof resolveMarketingPage>;
