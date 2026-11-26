import "server-only";
import { draftMode } from "next/headers";
import { isReviewMode } from "./review-mode";

export async function isEditorialReview() {
  return isReviewMode() || (await draftMode()).isEnabled;
}
export async function contentClient() {
  const { client } = await import("../../sanityClient");
  const drafts = (await draftMode()).isEnabled;
  const token = drafts ? process.env.SANITY_API_READ_TOKEN : undefined;
  if (drafts && !token) throw new Error("Draft preview requires a server-side Viewer token.");
  return client.withConfig({
    useCdn: false,
    timeout: 5000,
    maxRetries: 0,
    perspective: drafts ? "drafts" : "published",
    token,
  });
}
