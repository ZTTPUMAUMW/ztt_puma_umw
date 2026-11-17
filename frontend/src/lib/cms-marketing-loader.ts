import "server-only";
import { cache } from "react";
import { resolveMarketingPage, type MarketingName } from "./cms-marketing";
export const getMarketingPage = cache(async (name: MarketingName, locale: string) => {
  let doc: unknown = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
    try {
      const { client } = await import("../../sanityClient");
      doc = await client
        .withConfig({ useCdn: false, timeout: 5000, maxRetries: 0 })
        .fetch(
          "*[_id==$id && _type==$id][0]{...,banners[]{...,image{...,asset->{url}}},grantLogos[]{...,image{...,asset->{url}}}}",
          { id: name + "Page" },
          { cache: "no-store" }
        );
    } catch {
      console.warn("CMS page unavailable; using the current website copy.");
    }
  }
  return resolveMarketingPage(name, doc, locale, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
});
