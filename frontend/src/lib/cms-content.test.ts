import { describe, expect, it } from "vitest";
import { resolveWebsiteContent } from "./cms-content";

describe("bilingual CMS content boundary", () => {
  it("uses existing local content for absent documents in each language", () => {
    expect(resolveWebsiteContent(null, "pl").contact.title).toBe("Kontakt");
    expect(resolveWebsiteContent({}, "en").contact.title).toBe("Contact");
  });
  it("selects the requested manual translation without leaking the other language", () => {
    const raw = {
      contact: {
        title: { pl: "Nowy kontakt", en: "New contact" },
        subtitle: { pl: "Tylko po polsku" },
      },
    };
    expect(resolveWebsiteContent(raw, "pl").contact.title).toBe("Nowy kontakt");
    expect(resolveWebsiteContent(raw, "en").contact.title).toBe("New contact");
    expect(resolveWebsiteContent(raw, "en").contact.subtitle).toBe("Contact the P.U.M.A. team.");
  });
  it("rejects malformed or empty data rather than crashing the public page", () => {
    const result = resolveWebsiteContent(
      {
        contact: { title: { pl: "   " }, subtitle: [] },
        settings: { phoneNumber: "javascript:alert(1)", email: "a@b.com?subject=injected" },
      },
      "pl"
    );
    expect(result.contact.title).toBe("Kontakt");
    expect(result.settings.phoneNumber).toBe("+48717840471");
    expect(result.settings.email).toBe("WF-30@umw.edu.pl");
  });
  it("builds the map from an encoded address on a fixed Google origin", () => {
    const result = resolveWebsiteContent(
      { settings: { mapAddress: "x&output=bad#<script>" } },
      "en"
    );
    const url = new URL(result.mapUrl);
    expect(url.origin).toBe("https://www.google.com");
    expect(url.searchParams.get("q")).toBe("x&output=bad#<script>");
    expect(url.searchParams.get("output")).toBe("embed");
    expect(url.searchParams.get("hl")).toBe("en");
  });
  it("caps text length and keeps settings consistent across contact and footer", () => {
    const result = resolveWebsiteContent(
      {
        contact: { title: { en: "x".repeat(3001) } },
        settings: { footerLab: { pl: "Nowa nazwa", en: "New name" } },
      },
      "en"
    );
    expect(result.contact.title).toBe("Contact");
    expect(result.settings.footerLab).toBe("New name");
  });
});
