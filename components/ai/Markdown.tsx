import { Fragment, type ReactNode } from "react";

const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="px-1 rounded bg-slate-100 dark:bg-slate-700/60 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

function withBreaks(lines: string[]): ReactNode[] {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {renderInline(line)}
    </Fragment>
  ));
}

type Block =
  | { type: "p" | "quote"; lines: string[] }
  | { type: "h"; text: string }
  | { type: "ul" | "ol"; items: string[] };

const BULLET = /^\s*[-*•]\s+/;
const NUMBERED = /^\s*\d+[.)]\s+/;

function parse(source: string): Block[] {
  const blocks: Block[] = [];
  const last = () => blocks[blocks.length - 1];

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      blocks.push({ type: "p", lines: [] });
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      blocks.push({ type: "h", text: line.replace(/^#{1,6}\s+/, "") });
    } else if (/^\s*-{3,}\s*$/.test(line)) {
      blocks.push({ type: "p", lines: [] });
    } else if (BULLET.test(line) || NUMBERED.test(line)) {
      const type = BULLET.test(line) ? "ul" : "ol";
      const text = line.replace(type === "ul" ? BULLET : NUMBERED, "");
      const prev = last();
      if (prev?.type === type) prev.items.push(text);
      else blocks.push({ type, items: [text] });
    } else if (/^\s*>/.test(line)) {
      const text = line.replace(/^\s*>\s?/, "");
      const prev = last();
      if (prev?.type === "quote") prev.lines.push(text);
      else blocks.push({ type: "quote", lines: [text] });
    } else {
      const prev = last();
      if (prev?.type === "p") prev.lines.push(line.trim());
      else blocks.push({ type: "p", lines: [line.trim()] });
    }
  }
  return blocks.filter((b) => !("lines" in b) || b.lines.length > 0);
}

export default function Markdown({ text }: { text: string }) {
  return (
    <div className="space-y-3 leading-relaxed">
      {parse(text).map((block, i) => {
        switch (block.type) {
          case "h":
            return (
              <p key={i} dir="auto" className="font-semibold text-slate-900 dark:text-white">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List
                key={i}
                dir="auto"
                className={`${block.type === "ul" ? "list-disc" : "list-decimal"} ps-5 space-y-1`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote
                key={i}
                dir="auto"
                className="border-s-4 border-emerald-400/70 ps-3 text-slate-700 dark:text-slate-300"
              >
                {withBreaks(block.lines)}
              </blockquote>
            );
          default:
            return (
              <p key={i} dir="auto">
                {withBreaks(block.lines)}
              </p>
            );
        }
      })}
    </div>
  );
}
