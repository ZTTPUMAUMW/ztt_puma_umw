import "server-only";
import { cache } from "react";
import { resolveWebsiteContent } from "./cms-content";

// Fixed published IDs exclude draft documents even if a caller changes perspective.
export const websiteContentQuery =
  '{"contact": *[_type == "contactPage" && _id == "contactPage"][0], "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]}';

const loadPublishedContent = cache(async (): Promise<unknown> => {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET)
    return {};
  try {
    const { client } = await import("../../sanityClient");
    return await client
      .withConfig({ useCdn: false, timeout: 5000, maxRetries: 0 })
      .fetch(websiteContentQuery, {}, { cache: "no-store" });
  } catch {
    // Transitional fallback while migration is incomplete; never log secrets or response bodies.
    console.warn("CMS content unavailable; using the existing website copy.");
    return {};
  }
});

export async function getWebsiteContent(locale: string) {
  return resolveWebsiteContent(await loadPublishedContent(), locale);
}
