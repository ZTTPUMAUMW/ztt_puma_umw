import { describe, it, expect } from "vitest";
import { resolveSharedContent } from "./cms-shared";
import seeds from "./cms-shared-defaults.json";
import studioSeeds from "../../../studio/sharedInitialValues.json";
describe("shared navigation and Research content", () => {
  it("keeps migration seeds consistent", () => expect(seeds).toEqual(studioSeeds));
  it("retains existing links and adds Research in both languages", () => {
    for (const locale of ["pl", "en"]) {
      const page = resolveSharedContent("shell", null, locale);
      expect(page.header).toHaveLength(8);
      expect(page.header.some((v) => v.route === "/research")).toBe(true);
      expect(page.externalLinks).toHaveLength(4);
      expect(page.externalLinks.every((v) => v.url?.startsWith("https://"))).toBe(true);
      expect(page.logo).toBe("/logo.svg");
      expect(page.universityLogo).toBe("/umw-logo.svg");
    }
    expect(resolveSharedContent("shell", null, "pl").header[4].label).toBe("Badania");
    expect(resolveSharedContent("shell", null, "en").header[4].label).toBe("Research");
  });
  it("respects deliberately empty menus and keeps reordered labels", () => {
    expect(resolveSharedContent("shell", { header: [] }, "en").header).toEqual([]);
    const page = resolveSharedContent(
      "shell",
      { header: [{ _key: "research", label: { en: "Our research" }, route: "/research" }] },
      "en"
    );
    expect(page.header.map((v) => v.label)).toEqual(["Our research"]);
  });
  it("rejects unsafe external destinations and unknown internal routes", () => {
    const label = { en: "Link" };
    const page = resolveSharedContent(
      "shell",
      {
        header: [
          { label, url: { en: "javascript:alert(1)" } },
          { label, route: "/unknown" },
          { label, url: { en: "https://user:pass@example.org" } },
        ],
      },
      "en"
    );
    expect(page.header).toEqual([]);
  });
  it("exposes no actual download or media URL in Research placeholders", () => {
    const page = resolveSharedContent("research", null, "en");
    expect(page.clips).toHaveLength(3);
    expect(page.copy.vitalityHeading).toBe("Larva vitality scale");
    expect(JSON.stringify(seeds.research)).not.toContain("https://");
    expect(resolveSharedContent("research", { clips: [] }, "en").clips).toEqual([]);
  });
});
