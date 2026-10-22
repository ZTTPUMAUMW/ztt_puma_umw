import { describe, it, expect } from "vitest";
import { resolveResearchMedia, researchAsset } from "./cms-research";
import seeds from "./cms-shared-defaults.json";
describe("Research media and scoring", () => {
  it("keeps all supplied clips grouped and ordered numerically", () => {
    for (const locale of ["pl", "en"]) {
      const media = resolveResearchMedia(seeds.research, locale, "s2jrzn3b");
      expect(media.parameters.map((p) => p.id)).toEqual([
        "mobility",
        "melanization",
        "turgor",
        "reaction",
      ]);
      expect(media.parameters.map((p) => p.clips.map((v) => v.score))).toEqual([
        [0, 1, 2, 3],
        [],
        [0, 1, 2],
        [0, 1],
      ]);
      expect(media.parameters.flatMap((p) => p.grades)).toHaveLength(13);
      expect(media.parameters.flatMap((p) => p.clips).every((c) => c.poster && c.caption)).toBe(
        true
      );
    }
  });
  it("uses media defaults only for absent fields and respects editor removal", () => {
    expect(resolveResearchMedia({}, "en", "s2jrzn3b").parameters).toHaveLength(4);
    expect(resolveResearchMedia({ parameters: [], legacyTable: "" }, "en", "s2jrzn3b")).toEqual({
      parameters: [],
      attachment: seeds.research.legacyAttachment,
      table: "",
    });
  });
  it("rejects traversal, arbitrary origins, wrong project files and wrong video formats", () => {
    for (const src of [
      "/research/vitality/../secret.mp4",
      "/research/vitality/test.mp4?x=1",
      "https://example.org/movie.mp4",
      "/images/movie.mp4",
    ])
      expect(researchAsset(null, src, "video", "s2jrzn3b")).toBe("");
    for (const url of [
      "https://cdn.sanity.io/files/other/development/test.mp4",
      "https://cdn.sanity.io/files/s2jrzn3b/development/test.mov",
      "javascript:alert(1)",
    ])
      expect(researchAsset({ asset: { url } }, null, "video", "s2jrzn3b")).toBe("");
    expect(
      researchAsset(
        { asset: { url: "https://cdn.sanity.io/files/s2jrzn3b/development/test.mp4" } },
        null,
        "video",
        "s2jrzn3b"
      )
    ).toBe("https://cdn.sanity.io/files/s2jrzn3b/development/test.mp4");
  });
  it("allows only workbook downloads from approved paths and respects hiding", () => {
    expect(resolveResearchMedia({ showAttachment: false }, "en", "s2jrzn3b").attachment).toBe("");
    expect(
      researchAsset(null, "/research/downloads/../secret.xlsx", "spreadsheet", "s2jrzn3b")
    ).toBe("");
    expect(
      researchAsset(
        { asset: { url: "https://cdn.sanity.io/files/s2jrzn3b/development/mock.exe" } },
        null,
        "spreadsheet",
        "s2jrzn3b"
      )
    ).toBe("");
    expect(
      researchAsset(
        { asset: { url: "https://cdn.sanity.io/files/s2jrzn3b/development/mock.xlsx" } },
        null,
        "spreadsheet",
        "s2jrzn3b"
      )
    ).toBe("https://cdn.sanity.io/files/s2jrzn3b/development/mock.xlsx");
  });
  it("sorts CMS clips and drops duplicate or malformed scores", () => {
    const base = seeds.research.parameters[0];
    const clip = base.clips[0];
    const media = resolveResearchMedia(
      {
        parameters: [
          {
            ...base,
            clips: [
              { ...clip, score: 2, _key: "two" },
              clip,
              { ...clip, _key: "duplicate" },
              { ...clip, score: -1 },
              { ...clip, score: 1.5 },
            ],
          },
        ],
      },
      "en",
      "s2jrzn3b"
    );
    expect(media.parameters[0].clips.map((c) => c.score)).toEqual([0, 2]);
  });
});
