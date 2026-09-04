import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SplitHeadlineProps {
  /** Text. Use "\n" to force a line break; otherwise lines wrap naturally. */
  text: string;
  className?: string;
  /** Delay in ms before the FIRST line animates; later lines stagger. */
  delay?: number;
  /** Stagger between lines in ms. */
  stagger?: number;
  as?: ElementType;
  id?: string;
}

/**
 * SIGNATURE TYPOGRAPHIC ENTRANCE
 * Each line of the headline sits in an overflow mask and rises in from
 * below on mount, staggered. Respects prefers-reduced-motion via CSS.
 *
 * Explicit "\n" characters become forced line breaks; long lines wrap
 * naturally on small screens (the mask animates per forced line).
 */
export function SplitHeadline({
  text,
  className,
  delay = 60,
  stagger = 90,
  as: Tag = "h1",
  id,
}: SplitHeadlineProps) {
  const lines = text.split("\n");

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask-wrap">
          <span
            className="line-mask"
            style={{ "--line-delay": `${delay + i * stagger}ms` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Lightweight wrapper for plain (non-split) headings that should still
 * rise on mount — useful where markup inside the heading prevents splitting.
 */
export function RiseIn({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn("line-mask", className)}
      style={{ "--line-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
