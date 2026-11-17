import { scientificParts } from "@/lib/scientific-text";
export default function ScientificText({ text }: { text: string }) {
  return (
    <>
      {scientificParts(text).map((part, index) =>
        part.italic ? <i key={index}>{part.text}</i> : part.text
      )}
    </>
  );
}
