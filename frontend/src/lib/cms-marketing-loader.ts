import "server-only";
import { contentClient } from "./editorial-session";
import { draftMode } from "next/headers";
import { cache } from "react";
import { resolveMarketingPage, type MarketingName } from "./cms-marketing";
export const getMarketingPage = cache(async (name: MarketingName, locale: string) => {
  let doc: unknown = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
    try {
      const client = await contentClient();
      doc = await client.fetch(
        "*[_id==$id && _type==$id][0]{...,banners[]{...,image{...,asset->{url}}},grantLogos[]{...,image{...,asset->{url}}}}",
        { id: name + "Page" },
        { cache: "no-store" }
      );
    } catch (error) {
      if ((await draftMode()).isEnabled) throw error;
      console.warn("CMS page unavailable; using the current website copy.");
    }
  }
  return resolveMarketingPage(name, doc, locale, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
});
