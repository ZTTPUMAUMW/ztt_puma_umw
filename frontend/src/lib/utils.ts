const LATIN_WORDS = [
  "in vitro",
  "in vivo",
  "in silico",
  "ex vivo",
  "et al.",
  "et al",
  "vs.",

  "Pseudomonas aeruginosa",
  "Staphylococcus aureus",
  "Salmonella Enteritidis",
  "Helicobacter pylori",

  "Pleurotus pulmonarius",
  "Pleurotus citrinopileatus",
  "Pleurotus djamor",

  "Physarum polycephalum",

  "Galleria mellonella",

  "Pseudomonas",
  "Staphylococcus",
  "Salmonella",
  "Helicobacter",
  "Galleria",
  "Pleurotus",
];

export function italicizeLatinWords(text: string): string {
  let result = text;

  const sortedWords = [...LATIN_WORDS].sort((a, b) => b.length - a.length);

  sortedWords.forEach((phrase) => {
    const regex = new RegExp(`\\b(${phrase})\\b`, "gi");
    result = result.replace(regex, "<i>$1</i>");
  });

  return result;
}
