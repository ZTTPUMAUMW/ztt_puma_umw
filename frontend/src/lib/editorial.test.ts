import { beforeEach, describe, expect, it, vi } from "vitest";
import { imageSource } from "./cms-collections";
import { editorialPath } from "./editorial-path";
const state = vi.hoisted(() => ({
  enabled: false,
  valid: false,
  enable: vi.fn(),
  config: vi.fn(() => ({})),
}));
vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({
  draftMode: async () => ({ isEnabled: state.enabled, enable: state.enable }),
}));
vi.mock("../../sanityClient", () => ({ client: { withConfig: state.config } }));
vi.mock("@sanity/preview-url-secret", () => ({
  validatePreviewUrl: async () => ({ isValid: state.valid, redirectTo: "/en/team" }),
}));
import { GET } from "../app/api/editorial/enter/route";
import { contentClient, isEditorialReview } from "./editorial-session";
describe("editorial sessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SANITY_API_READ_TOKEN", "test-viewer");
    vi.stubEnv("VERCEL_ENV", "production");
    state.enabled = false;
    state.valid = false;
  });
  it("keeps the read token out of ordinary published reads", async () => {
    await contentClient();
    expect(state.config).toHaveBeenCalledWith(
      expect.objectContaining({ perspective: "published", token: undefined })
    );
  });
  it("uses draft overlay and blocks form delivery in a production draft session", async () => {
    state.enabled = true;
    await contentClient();
    expect(state.config).toHaveBeenCalledWith(
      expect.objectContaining({ perspective: "drafts", token: "test-viewer" })
    );
    expect(await isEditorialReview()).toBe(true);
  });
  it("requires a valid Studio grant", async () => {
    const req = new Request("https://example.org/api/editorial/enter?sanity-preview-secret=test");
    expect((await GET(req)).status).toBe(401);
    expect(state.enable).not.toHaveBeenCalled();
    state.valid = true;
    const response = await GET(req);
    expect(response.headers.get("Location")).toBe("/en/team");
    expect(response.headers.get("Cache-Control")).toContain("no-store");
    expect(state.enable).toHaveBeenCalledOnce();
  });
  it("restricts redirect destinations to actual website pages", () => {
    for (const path of ["//example.org", "/api/cooperation", "/en/team?token=value"])
      expect(editorialPath(path)).toBe("/");
    expect(editorialPath("/zespol")).toBe("/zespol");
  });
  it("uses the uploaded photo crop and hotspot for a square card", () => {
    const photo = {
      asset: { url: "https://cdn.sanity.io/images/s2jrzn3b/production/abcdef-1000x500.jpg" },
      crop: { left: 0, right: 0, top: 0, bottom: 0 },
      hotspot: { x: 0.75, y: 0.5, width: 0.1, height: 0.1 },
    };
    expect(new URL(imageSource(photo, null, "s2jrzn3b", [800, 800])).searchParams.get("rect")).toBe(
      "500,0,500,500"
    );
  });
});
