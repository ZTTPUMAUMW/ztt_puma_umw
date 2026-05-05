import { describe, expect, it } from "vitest";
import { buildAlternates, buildPageMetadata, pageUrl } from "./seo";

describe("seo helpers", () => {
  it("builds localized URLs for PL and EN", () => {
    expect(pageUrl("pl", "/projects")).toBe("https://pumadott.com/projekty");
    expect(pageUrl("en", "/projects")).toBe("https://pumadott.com/en/projects");
  });

  it("creates canonical and hreflang alternates", () => {
    const alternates = buildAlternates("en", "/contact");

    expect(alternates?.canonical).toBe("https://pumadott.com/en/contact");
    expect(alternates?.languages?.pl).toBe("https://pumadott.com/kontakt");
    expect(alternates?.languages?.en).toBe("https://pumadott.com/en/contact");
    expect(alternates?.languages?.["x-default"]).toBe("https://pumadott.com/kontakt");
  });

  it("builds metadata object with expected locale", () => {
    const metadata = buildPageMetadata({
      locale: "pl",
      route: "/team",
      title: "Zespół",
      description: "Opis strony zespołu",
    });

    expect(metadata.openGraph?.locale).toBe("pl_PL");
    expect(metadata.openGraph?.url).toBe("https://pumadott.com/zespol");
    expect(metadata.alternates?.canonical).toBe("https://pumadott.com/zespol");
  });
});
