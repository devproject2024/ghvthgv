import { useEffect, useRef, useState } from "react";
import { compactNumber } from "@/utils/format";
import { cn } from "@/utils/cn";

type NumberFormat = "text" | "compact" | "currency" | "number" | "percent";

interface AnimatedNumberProps {
  /** Target numeric value. */
  value: number;
  /** How to render the value at each step. */
  format?: NumberFormat;
  /** Currency symbol for "currency" format. */
  symbol?: string;
  prefix?: string;
  suffix?: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
}

/**
 * Smoothly counts from 0 → value when scrolled into view.
 * - "compact"/"currency": the displayed figure compacts (10K, 1M) as it grows.
 * - "number"/"percent": integer count up (percent adds "%").
 * Respects prefers-reduced-motion and IntersectionObserver gating.
 */
export function AnimatedNumber({
  value,
  format = "compact",
  symbol = "₹",
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;
          animate(value, duration, setDisplay);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const text = render(display, format, symbol, prefix, suffix);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {text}
    </span>
  );
}

function render(n: number, format: NumberFormat, symbol: string, prefix: string, suffix: string): string {
  const pre = prefix || (format === "currency" ? symbol : "");
  const suf = suffix;
  if (format === "percent") return `${pre}${Math.round(n)}${suf || "%"}`;
  if (format === "number") return `${pre}${Math.round(n).toLocaleString("en-US")}${suf}`;
  // compact & currency both compact; currency already has the symbol prefix.
  return `${pre}${compactNumber(n)}${suf}`;
}

/** rAF ease-out tween from 0 → target. */
function animate(target: number, duration: number, onFrame: (v: number) => void) {
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    // expo ease-out — fast, then settles.
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    onFrame(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else onFrame(target);
  };
  requestAnimationFrame(tick);
}

