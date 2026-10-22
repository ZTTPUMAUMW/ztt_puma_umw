import { describe, it, expect } from "vitest";
import { isReviewMode } from "./review-mode";
describe("review email isolation", () => {
  it("blocks delivery on every Vercel Preview even without a UI flag", () =>
    expect(isReviewMode({ VERCEL_ENV: "preview" })).toBe(true));
  it("supports a separately hosted review project", () =>
    expect(isReviewMode({ NEXT_PUBLIC_REVIEW_MODE: "true" })).toBe(true));
  it("leaves production and ordinary local development unchanged", () => {
    expect(isReviewMode({ VERCEL_ENV: "production" })).toBe(false);
    expect(isReviewMode({})).toBe(false);
  });
});
