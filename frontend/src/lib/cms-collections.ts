import seedData from "./cms-collection-defaults.json";
import type { TeamMember } from "@/components/TeamCard";
import type { Project } from "@/components/ProjectItem";
import type { Publication } from "@/components/PublicationItem";

export type CollectionName = "team" | "projects" | "publications" | "models";
export type Messages = { [key: string]: string | Messages };
export type RichBlock = {
  _key: string;
  listItem?: "number" | "bullet";
  children: { text: string; marks: string[] }[];
};
export type ModelEntry = {
  id: string;
  title: string;
  image: string;
  alt: string;
  description: RichBlock[];
};
export type ProjectEntry = Project & { id: string; fundingValue: number; currency: string };
export const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
const text = (value: unknown, max = 10000) =>
  typeof value === "string" && value.length <= max ? value : "";
const list = (value: unknown) => (Array.isArray(value) ? value : []);
const local = (value: unknown, locale: string) => text(record(value)[locale]);
export function safeHttpsUrl(value: unknown): string {
  try {
    const url = new URL(text(value, 2000));
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch {
    return "";
  }
}
export function imageSource(value: unknown, legacy: unknown, projectId: string): string {
  const url = safeHttpsUrl(record(record(value).asset).url);
  if (url) {
    const parsed = new URL(url);
    if (
      parsed.hostname === "cdn.sanity.io" &&
      parsed.pathname.startsWith("/images/" + projectId + "/")
    )
      return url;
  }
  const path = text(legacy, 500);
  return path.startsWith("/images/") && !path.includes("..") && !/[\\?#]/.test(path)
    ? path
    : "/logo.svg";
}
function copyMessages(template: unknown, value: unknown, locale: string): Messages {
  const raw = record(value);
  return Object.fromEntries(
    Object.entries(record(template)).map(([key, item]) => [
      key,
      record(item)._type === "localizedText"
        ? local(raw[key], locale) || local(item, locale)
        : copyMessages(item, raw[key], locale),
    ])
  );
}
export function normalizeRichText(value: unknown): RichBlock[] {
  return list(value)
    .slice(0, 100)
    .flatMap((raw, index) => {
      const block = record(raw);
      if (block._type !== "block") return [];
      const children = list(block.children)
        .slice(0, 500)
        .map((raw) => {
          const span = record(raw);
          return {
            text: text(span.text),
            marks: list(span.marks).filter((m): m is string => m === "em" || m === "strong"),
          };
        });
      return [
        {
          _key: text(block._key) || "block" + index,
          ...(block.listItem === "number" || block.listItem === "bullet"
            ? { listItem: block.listItem }
            : {}),
          children,
        },
      ];
    });
}
export function resolveCollectionPage(
  name: CollectionName,
  raw: unknown,
  language: string,
  projectId = "s2jrzn3b"
) {
  const locale = language === "en" ? "en" : "pl";
  const seed = record(seedData[name]);
  const doc = raw !== null && typeof raw === "object" && !Array.isArray(raw) ? record(raw) : seed;
  // An existing page with an empty/deleted list stays empty; do not resurrect removed seed entries.
  const entries = list(doc.items).slice(0, 1000);
  const common = {
    copy: copyMessages(seed.copy, doc.copy, locale),
    seoTitle: local(doc.seoTitle, locale) || local(seed.seoTitle, locale),
    seoDescription: local(doc.seoDescription, locale) || local(seed.seoDescription, locale),
  };
  const team: Record<"pracownicy" | "doktoranci" | "studenci", TeamMember[]> = {
    pracownicy: [],
    doktoranci: [],
    studenci: [],
  };
  const projects: ProjectEntry[] = [],
    publications: Publication[] = [],
    models: ModelEntry[] = [];
  for (const [index, value] of entries.entries()) {
    const item = record(value),
      id = text(item._key, 100) || name + index;
    if (name === "team") {
      const category = item.category;
      if (category !== "pracownicy" && category !== "doktoranci" && category !== "studenci")
        continue;
      const memberName = text(item.name, 500),
        position = local(item.position, locale);
      if (!memberName.trim() || !position.trim()) continue;
      const image = imageSource(item.image, item.legacyImage, projectId);
      team[category].push({
        id,
        name: memberName,
        position,
        copy: local(item.copy, locale),
        academicTitle: local(item.academicTitle, locale),
        universityTitle: local(item.universityTitle, locale),
        image,
        image_2x: image,
        alt: local(item.alt, locale) || memberName,
        links: list(item.links)
          .slice(0, 20)
          .flatMap((v) => {
            const l = record(v),
              url = safeHttpsUrl(l.url),
              title = local(l.title, locale);
            return url && title ? [{ title, url }] : [];
          }),
      });
    }
    if (name === "projects") {
      const title = local(item.title, locale),
        amount = item.fundingAmount,
        currency = text(item.currency, 3);
      if (
        !title.trim() ||
        typeof amount !== "number" ||
        !Number.isFinite(amount) ||
        amount < 0 ||
        amount > 1e12 ||
        !/^[A-Z]{3}$/.test(currency)
      )
        continue;
      projects.push({
        id,
        title,
        description: local(item.description, locale),
        funding_body: local(item.fundingBody, locale),
        funding_body_number: text(item.fundingNumber, 500),
        funding_shortcut: text(item.funderCode, 500),
        fundingValue: amount,
        currency,
        funding_amount:
          new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(amount) +
          " " +
          currency,
        funding_logo: imageSource(item.image, item.legacyImage, projectId),
        link: safeHttpsUrl(item.url) || undefined,
        roles: list(item.roles)
          .slice(0, 100)
          .flatMap((v) => {
            const r = record(v),
              name = text(r.name, 500);
            return name
              ? [
                  {
                    name,
                    academicTitle: local(r.academicTitle, locale),
                    universityTitle: local(r.universityTitle, locale),
                    role: local(r.role, locale),
                  },
                ]
              : [];
          }),
      });
    }
    if (name === "publications") {
      const title = text(item.title, 3000),
        year = item.year,
        month = item.month,
        url = safeHttpsUrl(item.url);
      if (
        !title.trim() ||
        !url ||
        typeof year !== "number" ||
        !Number.isInteger(year) ||
        year < 1800 ||
        year > 3000 ||
        typeof month !== "number" ||
        !Number.isInteger(month) ||
        month < 1 ||
        month > 12
      )
        continue;
      publications.push({
        title,
        year,
        month,
        url,
        authors: text(item.authors),
        journal: text(item.journal, 500),
        doi: text(item.doi, 500),
      });
    }
    if (name === "models") {
      const title = local(item.title, locale);
      if (!title.trim()) continue;
      models.push({
        id,
        title,
        image: imageSource(item.image, item.legacyImage, projectId),
        alt: local(item.alt, locale) || title,
        description: normalizeRichText(record(item.description)[locale]),
      });
    }
  }
  return { ...common, team, projects, publications, models };
}
export function publicationYears(publications: Publication[]): number[] {
  return [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
}
export function fundingTotals(projects: ProjectEntry[]): [string, number][] {
  const totals = new Map<string, number>();
  for (const p of projects) totals.set(p.currency, (totals.get(p.currency) || 0) + p.fundingValue);
  return [...totals.entries()];
}
