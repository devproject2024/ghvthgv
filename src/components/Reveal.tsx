import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Milliseconds. Use to stagger siblings. */
  delay?: number;
  /** "fade" (opacity + small rise) or "clip" (reveals top-to-bottom, good for images). */
  variant?: "fade" | "clip";
  as?: ElementType;
  style?: CSSProperties;
}

/**
 * Reveals its children once they enter the viewport.
 * Respects prefers-reduced-motion via CSS (see index.css).
 */
export function Reveal({ children, className, delay = 0, variant = "fade", as: Tag = "div", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(variant === "clip" ? "reveal-clip" : "reveal", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
