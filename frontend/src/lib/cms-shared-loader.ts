import "server-only";
import { cache } from "react";
import { resolveSharedContent } from "./cms-shared";
export const getSharedContent = cache(async (name: "shell" | "research", locale: string) => {
  let doc: unknown = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET) {
    try {
      const { client } = await import("../../sanityClient");
      doc = await client
        .withConfig({ useCdn: false, timeout: 5000, maxRetries: 0 })
        .fetch(
          "*[_id==$id && _type==$id][0]{...,logo{...,asset->{url}},universityLogo{...,asset->{url}},tableImage{...,asset->{url}},attachmentFile{...,asset->{url}},parameters[]{...,clips[]{...,file{...,asset->{url}},poster{...,asset->{url}}}}}",
          { id: name === "shell" ? "siteChrome" : "researchPage" },
          { cache: "no-store" }
        );
    } catch {
      console.warn("CMS page unavailable; using website defaults.");
    }
  }
  return resolveSharedContent(name, doc, locale, process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
});
