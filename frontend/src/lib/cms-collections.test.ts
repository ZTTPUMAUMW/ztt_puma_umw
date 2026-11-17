import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  resolveCollectionPage,
  publicationYears,
  fundingTotals,
  safeHttpsUrl,
  imageSource,
  normalizeRichText,
} from "./cms-collections";
import { scientificParts } from "./scientific-text";
import ScientificText from "@/components/ScientificText";
import RichText from "@/components/RichText";

describe("collection content migration", () => {
  it("retains every existing entry and bilingual model formatting", () => {
    for (const locale of ["pl", "en"]) {
      const team = resolveCollectionPage("team", null, locale).team;
      expect(Object.values(team).flat()).toHaveLength(10);
      expect(resolveCollectionPage("projects", null, locale).projects).toHaveLength(3);
      expect(resolveCollectionPage("publications", null, locale).publications).toHaveLength(44);
      const models = resolveCollectionPage("models", null, locale).models;
      expect(models).toHaveLength(7);
      expect(models[0].description.filter((b) => b.listItem === "number")).toHaveLength(2);
      expect(
        models[0].description
          .flatMap((b) => b.children)
          .some((s) => s.marks.includes("em") && s.text === "in vivo")
      ).toBe(true);
    }
  });
  it("does not resurrect removed entries when a published list is empty or deleted", () => {
    expect(resolveCollectionPage("publications", { items: [] }, "en").publications).toEqual([]);
    expect(resolveCollectionPage("team", {}, "pl").team.pracownicy).toEqual([]);
  });
  it("keeps localized labels and metadata independent", () => {
    const pl = resolveCollectionPage("team", null, "pl"),
      en = resolveCollectionPage("team", null, "en");
    expect(pl.team.pracownicy[0].name).toBe(en.team.pracownicy[0].name);
    expect(pl.team.pracownicy[0].position).not.toBe(en.team.pracownicy[0].position);
    expect(pl.seoTitle).not.toBe(en.seoTitle);
  });
  it("generates filters for new years and rejects malformed dates and links", () => {
    const valid = {
      title: "Example",
      year: 2029,
      month: 5,
      url: "https://example.org/paper",
      authors: "A",
      journal: "Journal",
    };
    const entries = resolveCollectionPage(
      "publications",
      { items: [valid, { ...valid, month: 13 }, { ...valid, url: "javascript:alert(1)" }] },
      "en"
    ).publications;
    expect(entries).toHaveLength(1);
    expect(publicationYears([...entries, { ...entries[0], year: 2030 }, entries[0]])).toEqual([
      2030, 2029,
    ]);
  });
  it("uses numeric funding and keeps different currencies separate", () => {
    const page = resolveCollectionPage("projects", null, "en");
    expect(fundingTotals(page.projects)).toEqual([["PLN", 14854919.54]]);
    const mixed = [page.projects[0], { ...page.projects[1], currency: "EUR", fundingValue: 250 }];
    expect(fundingTotals(mixed)).toEqual([
      ["PLN", 13215433.04],
      ["EUR", 250],
    ]);
  });
  it("rejects unsafe links and images outside the configured media origin", () => {
    expect(safeHttpsUrl("javascript:alert(1)")).toBe("");
    expect(safeHttpsUrl("https://user:pass@example.org")).toBe("");
    expect(
      imageSource(
        { asset: { url: "https://evil.example/image.png" } },
        "//evil.example/image",
        "s2jrzn3b"
      )
    ).toBe("/logo.svg");
    expect(
      imageSource(
        { asset: { url: "https://cdn.sanity.io/images/s2jrzn3b/development/a-10x10.png" } },
        null,
        "s2jrzn3b"
      )
    ).toContain("/images/s2jrzn3b/");
    expect(imageSource(null, "/images/../secret", "s2jrzn3b")).toBe("/logo.svg");
  });
  it("renders script-like content as text while preserving scientific italics", () => {
    const text = "<script>alert(1)</script> Galleria mellonella in vivo";
    const html = renderToStaticMarkup(createElement(ScientificText, { text }));
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("<i>Galleria mellonella</i>");
    expect(html).toContain("<i>in vivo</i>");
    expect(scientificParts("Galleria mellonella").filter((p) => p.italic)).toHaveLength(1);
  });
  it("renders structured lists and ignores unsupported rich-text payloads", () => {
    const blocks = normalizeRichText([
      { _type: "script", children: [] },
      {
        _type: "block",
        listItem: "number",
        children: [{ text: "<img src=x onerror=alert(1)>", marks: ["evil", "strong"] }],
      },
    ]);
    const html = renderToStaticMarkup(createElement(RichText, { blocks }));
    expect(blocks).toHaveLength(1);
    expect(html).toContain("<ol>");
    expect(html).toContain("<strong>");
    expect(html).not.toContain("<img");
  });
});
