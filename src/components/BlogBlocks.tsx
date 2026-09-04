import type { BlogBlock, BlogTable } from "@/content/types";
import { cn } from "@/utils/cn";
import { Figure } from "./Figure";
import { Chart } from "./Charts";
import { Reveal } from "./Reveal";

/** Formats an ISO date to e.g. "Aug 14, 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** Renders a single article body block. Used by the blog detail page. */
export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <>
          {block.paragraphs.map((p, j) => (
            <p key={j} className={cn("max-w-[68ch] text-[17px] leading-[1.7] text-ink-2", j === 0 && "text-ink")}>
              {p}
            </p>
          ))}
        </>
      );

    case "heading":
      return <h2 className="text-h3 pt-4 tracking-[-0.02em] text-ink">{block.text}</h2>;

    case "subheading":
      return <h3 className="pt-2 text-[1.125rem] font-medium tracking-[-0.015em] text-ink">{block.text}</h3>;

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="max-w-[64ch] space-y-2.5 pl-1">
          {block.items.map((it, j) => (
            <li key={j} className="flex gap-3 text-[16px] leading-[1.65] text-ink-2">
              <span className="text-label mt-2 shrink-0 text-ink-3">{String(j + 1).padStart(2, "0")}</span>
              <span>{it}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote className="border-l-2 border-ink pl-5">
          <p className="text-lead max-w-[56ch] text-ink">{block.text}</p>
          {block.cite && <cite className="text-mono-sm mt-3 block not-italic text-ink-3">{block.cite}</cite>}
        </blockquote>
      );

    case "code":
      return (
        <pre className="overflow-x-auto border border-carbon-line bg-carbon p-5 text-mono-sm leading-relaxed text-chalk">
          <code>{block.code}</code>
        </pre>
      );

    case "image":
      return <Figure media={block.media} aspect={block.media.aspect ?? (block.full ? "16/9" : "4/3")} placeholderNote="Research figure to be added" />;

    case "metrics":
      return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-8 md:grid-cols-4">
          {block.items.map((m) => (
            <div key={m.label}>
              <p className="text-h2 tabular text-ink">{m.value}</p>
              <p className="text-mono-sm mt-2 text-ink-3">{m.label}</p>
            </div>
          ))}
        </div>
      );

    case "chart":
      return (
        <Reveal variant="fade-only">
          <Chart spec={block.chart} />
        </Reveal>
      );

    case "table":
      return <DataTable table={block.table} />;

    default:
      return null;
  }
}

function DataTable({ table }: { table: BlogTable }) {
  return (
    <figure className="my-8">
      {table.title && <p className="text-mono-sm mb-3 text-ink">{table.title}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line text-left">
              {table.headers.map((h) => (
                <th key={h} className="py-3 pr-4 text-label font-normal text-ink-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-line/60">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "py-3 pr-4 text-[14px] tabular",
                      ci === 0 ? "font-medium text-ink" : "text-ink-2"
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(table.caption || table.source) && (
        <figcaption className="text-mono-sm mt-3 text-ink-3">
          {table.caption}
          {table.caption && table.source ? " " : ""}
          {table.source && <span>— {table.source}</span>}
        </figcaption>
      )}
    </figure>
  );
}

