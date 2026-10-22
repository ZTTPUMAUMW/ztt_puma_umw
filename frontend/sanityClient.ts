import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (process.env.VERCEL_ENV === "preview" && dataset !== "development")
  throw new Error("Review deployments must use the development dataset.");

if (!projectId || !dataset) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET before using the CMS client."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-12-02",
  useCdn: true,
  perspective: "published",
});
