import type { RichBlock } from "@/lib/cms-collections";
import ScientificText from "./ScientificText";
export default function RichText({ blocks }: { blocks: RichBlock[] }) {
  const inline = (block: RichBlock) =>
    block.children.map((span, index) => {
      const content = span.marks.includes("em") ? (
        <i>{span.text}</i>
      ) : (
        <ScientificText text={span.text} />
      );
      return (
        <span key={index}>
          {span.marks.includes("strong") ? <strong>{content}</strong> : content}
        </span>
      );
    });
  const nodes = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (!block.listItem) {
      nodes.push(<p key={block._key}>{inline(block)}</p>);
      continue;
    }
    const type = block.listItem,
      items = [];
    let next = index;
    while (next < blocks.length && blocks[next].listItem === type) {
      items.push(<li key={blocks[next]._key}>{inline(blocks[next])}</li>);
      next++;
    }
    nodes.push(
      type === "number" ? <ol key={block._key}>{items}</ol> : <ul key={block._key}>{items}</ul>
    );
    index = next - 1;
  }
  return <>{nodes}</>;
}
