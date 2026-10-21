import { LATIN_WORDS } from "./utils";
const escapeRegex = (text: string) => text.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&");
export function scientificParts(text: string): { text: string; italic: boolean }[] {
  const phrases = [...LATIN_WORDS].sort((a, b) => b.length - a.length).map(escapeRegex);
  const regex = new RegExp("\\b(" + phrases.join("|") + ")\\b", "gi");
  const result: { text: string; italic: boolean }[] = [];
  let start = 0;
  for (const match of text.matchAll(regex)) {
    const index = match.index!;
    if (index > start) result.push({ text: text.slice(start, index), italic: false });
    result.push({ text: match[0], italic: true });
    start = index + match[0].length;
  }
  if (start < text.length) result.push({ text: text.slice(start), italic: false });
  return result;
}
