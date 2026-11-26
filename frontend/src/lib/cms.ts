import "server-only";
import { contentClient } from "./editorial-session";
import { draftMode } from "next/headers";
import { cache } from "react";
import { resolveWebsiteContent } from "./cms-content";

// Draft perspective overlays drafts at their canonical singleton IDs.
export const websiteContentQuery =
  '{"contact": *[_type == "contactPage" && _id == "contactPage"][0], "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]}';

const loadPublishedContent = cache(async (): Promise<unknown> => {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET)
    return {};
  try {
    const client = await contentClient();
    return await client.fetch(websiteContentQuery, {}, { cache: "no-store" });
  } catch (error) {
    if ((await draftMode()).isEnabled) throw error;
    // Transitional fallback while migration is incomplete; never log secrets or response bodies.
    console.warn("CMS content unavailable; using the existing website copy.");
    return {};
  }
});

export async function getWebsiteContent(locale: string) {
  return resolveWebsiteContent(await loadPublishedContent(), locale);
}
