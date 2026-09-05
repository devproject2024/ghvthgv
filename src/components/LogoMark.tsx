import { useState } from "react";
import type { Logo as LogoType } from "@/content/types";
import { cn } from "@/utils/cn";

interface LogoMarkProps {
  logo?: LogoType;
  /** Square size in px (the box is always square). */
  size?: number;
  dark?: boolean;
  className?: string;
  /** Rounded radius class; defaults to a subtle square. */
  rounded?: string;
}

/**
 * Reusable logo mark. Renders the image when a src is present (and loads),
 * otherwise a tasteful text monogram derived from `name`. Never shows a
 * broken image — a failed load falls back to the monogram.
 *
 * Put image files in /public/images/logos/… and point `logo.src` at them.
 */
export function LogoMark({ logo, size = 44, dark = false, className, rounded = "rounded-[3px]" }: LogoMarkProps) {
  const [failed, setFailed] = useState(false);
  const src = dark && logo?.srcDark ? logo.srcDark : logo?.src;
  const showImg = src && !failed;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden border",
        rounded,
        showImg
          ? "border-line bg-paper"
          : dark
            ? "border-carbon-line bg-carbon-2"
            : "border-line bg-paper-2",
        className
      )}
      style={{ width: size, height: size }}
    >
      {showImg ? (
        <img
          src={src}
          alt={logo?.alt ?? logo?.name ?? ""}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-[18%]"
        />
      ) : (
        <span
          className={cn("font-mono font-medium leading-none tracking-tight", dark ? "text-chalk-2" : "text-ink-2")}
          style={{ fontSize: size * 0.3 }}
        >
          {monogram(logo?.name ?? "")}
        </span>
      )}
    </span>
  );
}

/** Up to two leading characters, upper-cased — "State Bank of India" → "SB". */
function monogram(name: string): string {
  const cleaned = name.replace(/[\[\]()]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

