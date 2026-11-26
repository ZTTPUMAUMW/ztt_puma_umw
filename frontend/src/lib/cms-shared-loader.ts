import "server-only";
import { contentClient } from "./editorial-session";
import { draftMode } from "next/headers";
import { cache } from "react";
import { resolveSharedContent } from "./cms-shared";
export const getSharedContent = cache(async (name: "shell" | "research", locale: string) => {
  let doc: unknown = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
    try {
      const client = await contentClient();
      doc = await client.fetch(
        "*[_id==$id && _type==$id][0]{...,socialImage{...,asset->{url}},logo{...,asset->{url}},universityLogo{...,asset->{url}},tableImage{...,asset->{url}},parameters[]{...,images[]{...,image{...,asset->{url,metadata{dimensions}}}},clips[]{...,file{...,asset->{url}},poster{...,asset->{url}}}}}",
        { id: name === "shell" ? "siteChrome" : "researchPage" },
        { cache: "no-store" }
      );
    } catch (error) {
      if ((await draftMode()).isEnabled) throw error;
      console.warn("CMS page unavailable; using website defaults.");
    }
  }
  return resolveSharedContent(name, doc, locale, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
});
