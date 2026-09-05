import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Use to stagger siblings. */
  delay?: number;
  /** "fade" (opacity + small rise), "fade-only" (opacity; for table rows where
   *  transforms are unreliable), or "clip" (images). */
  variant?: "fade" | "fade-only" | "clip";
  as?: ElementType;
  style?: CSSProperties;
}

/**
 * Reveals its children once they enter the viewport.
 * Robust against elements that mount already-visible (hero, featured area,
 * metric figures): we check intersection immediately and also run a short
 * safety timeout so content can never stay permanently hidden. Respects
 * prefers-reduced-motion via CSS (see index.css).
 */
export function Reveal({ children, className, delay = 0, variant = "fade", as: Tag = "div", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const reveal = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    
    // Safety net: regardless of observer edge cases (zero-size clip box,
    // nested reveals, StrictMode remounts), never leave content hidden.
    const fallback = window.setTimeout(reveal, 1200);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            window.clearTimeout(fallback);
            io.disconnect();
          }
        }
      },
      // A small positive bottom margin fires slightly before the element
      // enters, so above-the-fold and just-below-fold content reliably shows.
      { rootMargin: "0px 0px 40px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variant === "clip" ? "reveal-clip" : variant === "fade-only" ? "reveal-fade" : "reveal", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
