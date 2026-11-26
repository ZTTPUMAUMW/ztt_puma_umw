const paths = new Set([
  "/",
  "/en",
  ...[
    "zespol",
    "modele",
    "projekty",
    "publikacje",
    "kontakt",
    "badania",
    "wspolpraca",
    "rekrutacja",
    "en/team",
    "en/models",
    "en/projects",
    "en/publications",
    "en/contact",
    "en/research",
    "en/cooperation",
    "en/recruitment",
  ].map((p) => "/" + p),
]);
export function editorialPath(value?: string) {
  return value && paths.has(value) ? value : "/";
}
