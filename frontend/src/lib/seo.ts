/**
 * Central SEO helpers.
 *
 * Single source of truth for:
 * - production base URL
 * - locale → path-segment mapping (mirrors next-intl routing)
 * - per-page `generateMetadata` factory
 */

import type { Metadata } from "next";

export const BASE_URL = "https://pumadott.com";

/** Internal route key → localised path segment */
const ROUTE_PATHS: Record<string, { pl: string; en: string }> = {
  "/": { pl: "/", en: "/" },
  "/projects": { pl: "/projekty", en: "/projects" },
  "/publications": { pl: "/publikacje", en: "/publications" },
  "/models": { pl: "/modele", en: "/models" },
  "/team": { pl: "/zespol", en: "/team" },
  "/recruitment": { pl: "/rekrutacja", en: "/recruitment" },
  "/cooperation": { pl: "/wspolpraca", en: "/cooperation" },
  "/contact": { pl: "/kontakt", en: "/contact" },
};

type RouteKey = keyof typeof ROUTE_PATHS;

/**
 * Returns the full canonical URL for a given locale and internal route key.
 *
 * Example:
 *   pageUrl("pl", "/projects")  → "https://pumadott.com/projekty"
 *   pageUrl("en", "/projects")  → "https://pumadott.com/en/projects"
 */
export function pageUrl(locale: string, route: RouteKey): string {
  const paths = ROUTE_PATHS[route] ?? { pl: route, en: route };
  const localPath = locale === "pl" ? paths.pl : paths.en;
  // PL is the default locale → no prefix, EN gets /en prefix
  const prefixed = locale === "pl" ? localPath : `/en${localPath}`;
  // Avoid double slash for root
  return `${BASE_URL}${prefixed === "/en/" ? "/en" : prefixed}`;
}

/**
 * Builds the `alternates` block for a page.
 * Produces a correct `canonical` (this locale's URL) plus
 * `languages` hreflang entries for both locales.
 */
export function buildAlternates(locale: string, route: RouteKey): Metadata["alternates"] {
  const plUrl = pageUrl("pl", route);
  const enUrl = pageUrl("en", route);
  const canonical = locale === "pl" ? plUrl : enUrl;

  return {
    canonical,
    languages: {
      pl: plUrl,
      en: enUrl,
      "x-default": plUrl, // Google shows this when no locale matches
    },
  };
}

interface PageSeoOptions {
  locale: string;
  route: RouteKey;
  title: string;
  description: string;
  ogType?: "website" | "article" | "profile";
}

/**
 * Builds a complete Metadata object for a page.
 */
export function buildPageMetadata({
  locale,
  route,
  title,
  description,
  ogType = "website",
}: PageSeoOptions): Metadata {
  const url = pageUrl(locale, route);

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ZTT P.U.M.A.",
      images: [
        {
          url: "/images/meta/og_image.png",
          width: 1200,
          height: 630,
          alt: "ZTT P.U.M.A.",
        },
      ],
      locale: locale === "en" ? "en_US" : "pl_PL",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/meta/og_image.png"],
    },
    alternates: buildAlternates(locale, route),
  };
}
