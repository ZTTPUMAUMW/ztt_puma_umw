import { describe, it, expect } from "vitest";
import { resolveMarketingPage, validMessage } from "./cms-marketing";
import seeds from "./cms-marketing-defaults.json";
import studioSeeds from "../../../studio/marketingInitialValues.json";
describe("editable marketing pages", () => {
  it("keeps the Studio and website migration seeds identical", () =>
    expect(seeds).toEqual(studioSeeds));
  it("preserves all existing content in both languages", () => {
    for (const locale of ["pl", "en"]) {
      const home = resolveMarketingPage("home", null, locale);
      expect(home.banners).toHaveLength(3);
      expect(home.heroButtons).toHaveLength(3);
      expect(home.infoCards).toHaveLength(3);
      expect(home.researchAreas).toHaveLength(5);
      expect(home.features).toHaveLength(4);
      expect(home.quickLinks).toHaveLength(4);
      expect(home.grantLogos).toHaveLength(3);
      expect(home.ctaButtons).toHaveLength(2);
      expect(resolveMarketingPage("recruitment", null, locale).benefits).toHaveLength(6);
      expect(resolveMarketingPage("recruitment", null, locale).tracks).toHaveLength(3);
      expect(resolveMarketingPage("cooperation", null, locale).offers).toHaveLength(6);
      expect(resolveMarketingPage("cooperation", null, locale).scope).toHaveLength(5);
    }
  });
  it("keeps intentionally empty lists empty", () => {
    expect(resolveMarketingPage("home", { banners: [], researchAreas: [] }, "en").banners).toEqual(
      []
    );
    expect(resolveMarketingPage("home", {}, "en").researchAreas).toEqual([]);
    expect(resolveMarketingPage("recruitment", { tracks: [] }, "pl").tracks).toEqual([]);
  });
  it("retains independent bilingual text", () => {
    expect(resolveMarketingPage("home", null, "en").infoCards[0].title).not.toBe(
      resolveMarketingPage("home", null, "pl").infoCards[0].title
    );
  });
  it("rejects unsafe links and unrecognized internal routes", () => {
    const banner = seeds.home.banners[0];
    const page = resolveMarketingPage(
      "home",
      {
        banners: [{ ...banner, url: { en: "javascript:alert(1)" } }],
        heroButtons: [{ label: { en: "Test" }, route: "https://example.org" }],
      },
      "en"
    );
    expect(page.banners).toEqual([]);
    expect(page.heroButtons).toEqual([]);
  });
  it("accepts reordered new recruitment paths and enforces form subject length", () => {
    const page = resolveMarketingPage(
      "recruitment",
      {
        tracks: [
          {
            _key: "new",
            label: { en: "New opportunity" },
            description: { en: "New role" },
            requirements: { en: "Send your CV" },
          },
          { label: { en: "bad" } },
        ],
      },
      "en"
    );
    expect(page.tracks).toEqual([
      {
        id: "new",
        label: "New opportunity",
        description: "New role",
        requirements: "Send your CV",
      },
    ]);
  });
  it("preserves required interpolation placeholders and rejects malformed messages", () => {
    expect(validMessage("Slide {number}", "Go to slide {number}")).toBe(true);
    for (const value of [
      "Slide",
      "Slide {other}",
      "<b>Slide {number}</b>",
      "Slide {number, plural, one {one} other {many}}",
    ])
      expect(validMessage(value, "Go to slide {number}")).toBe(false);
    const page = resolveMarketingPage(
      "home",
      { copy: { featuredBanner: { goToSlide: { en: "Broken {wrong}" } } } },
      "en"
    );
    expect(page.copy.featuredBanner.goToSlide).toBe("Go to slide {number}");
  });
});
