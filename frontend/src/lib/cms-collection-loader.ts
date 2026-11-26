import "server-only";
import { contentClient } from "./editorial-session";
import { draftMode } from "next/headers";
import { cache } from "react";
import { resolveCollectionPage, type CollectionName } from "./cms-collections";
export const getCollectionPage = cache(async (name: CollectionName, locale: string) => {
  let doc: unknown = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
    try {
      const client = await contentClient();
      doc = await client.fetch(
        "*[_id == $id && _type == $id][0]{...,items[]{...,image{...,asset->{url}}}}",
        { id: name + "Page" },
        { cache: "no-store" }
      );
    } catch (error) {
      if ((await draftMode()).isEnabled) throw error;
      console.warn("CMS collection unavailable; using the current website copy.");
    }
  }
  return resolveCollectionPage(name, doc, locale, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
});
