import { settings, type MarketStat } from "@/content";
import type { BusinessMetric } from "@/content/types";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/utils/cn";

type MetricFormat = "text" | "compact" | "currency" | "number" | "percent";

function fmt(format: MetricFormat | undefined): MetricFormat {
  return format ?? "text";
}

/**
 * A single metric. Numeric values animate 0→value on scroll via
 * AnimatedNumber; strings render verbatim.
 */
export function StatFigure({
  value,
  label,
  format = "text",
  prefix,
  suffix,
  dark,
  className,
  animate = true,
  symbol,
}: {
  value: string | number;
  label: string;
  format?: MetricFormat;
  prefix?: string;
  suffix?: string;
  dark?: boolean;
  className?: string;
  animate?: boolean;
  symbol?: string;
}) {
  const display =
    typeof value === "number" && animate && format !== "text" ? (
      <AnimatedNumber
        value={value}
        format={format}
        prefix={prefix}
        suffix={suffix}
        symbol={symbol ?? settings.currencySymbol}
      />
    ) : typeof value === "number" ? (
      value.toLocaleString("en-US")
    ) : (
      value
    );

  return (
    <div className={className}>
      <p className={cn("text-h2 tabular", dark ? "text-chalk" : "text-ink")}>{display}</p>
      <p className={cn("text-mono-sm mt-2 uppercase tracking-[0.08em]", dark ? "text-chalk-2" : "text-ink-3")}>{label}</p>
    </div>
  );
}

/**
 * Markets overview metrics — each gated by its own privacy flag and
 * skipped entirely if the flag is off (or, for "number", always allowed
 * when the label is non-financial — handled by the caller).
 */
export function MarketOverview({
  stats,
  investmentsCount,
  dark,
}: {
  stats: MarketStat[];
  investmentsCount: number;
  dark?: boolean;
}) {
  const visible = stats.filter((s) => settings.finance[s.privacy] === true);
  if (visible.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
      {visible.map((s) => {
        // "Active investments" is a count — fill from data when left at 0.
        const val =
          s.label.toLowerCase().includes("investment") && investmentsCount > 0 ? investmentsCount : s.value;
        return (
          <StatFigure
            key={s.label}
            value={val}
            label={s.label}
            format={fmt(s.format)}
            prefix={s.prefix}
            suffix={s.suffix}
            animate={s.animate !== false}
            dark={dark}
          />
        );
      })}
    </div>
  );
}

/**
 * Business metrics — shown verbatim (they're facts the owner publishes).
 * Numeric values animate on scroll.
 */
export function BusinessMetrics({
  metrics,
  dark,
}: {
  metrics: BusinessMetric[];
  dark?: boolean;
}) {
  const clean = metrics.filter((m) => !(typeof m.value === "string" && m.value.trim().startsWith("[ADD")));
  if (clean.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
      {clean.map((m) => (
        <StatFigure
          key={m.label}
          value={m.value}
          label={m.label}
          format={fmt(m.format)}
          prefix={m.prefix}
          suffix={m.suffix}
          dark={dark}
        />
      ))}
    </div>
  );
}

/** Up/down performance delta. Positive green, negative muted red, neutral grey. */
export function Delta({
  value,
  amount,
  currency,
  dark,
  className,
  show = true,
}: {
  value?: number;
  amount?: number;
  currency?: string;
  dark?: boolean;
  className?: string;
  show?: boolean;
}) {
  if (!show || (value == null && amount == null)) return <span className="text-ink-3">—</span>;
  const positive = (amount ?? value ?? 0) >= 0;
  const neutral = (amount ?? value ?? 0) === 0;
  const sym = currency ?? settings.currencySymbol;
  const color = neutral
    ? dark
      ? "text-chalk-2"
      : "text-ink-3"
    : positive
      ? dark
        ? "text-up-bright"
        : "text-up"
      : dark
        ? "text-down-bright"
        : "text-down";
  const arrow = neutral ? "—" : positive ? "↑" : "↓";
  const sign = positive && !neutral ? "+" : amount != null && amount < 0 ? "−" : "";
  const amountText = amount != null ? `${sign}${sym}${compact(amount)}` : "";
  const pctText = value != null ? `${sign}${Math.abs(value).toFixed(1)}%` : "";
  return (
    <span className={cn("inline-flex items-center gap-1.5 tabular", color, className)}>
      <span aria-hidden>{arrow}</span>
      <span>
        {amountText}
        {amountText && pctText ? " · " : ""}
        {pctText}
      </span>
    </span>
  );
}

function compact(n: number): string {
  const abs = Math.abs(n);
  const units = [
    { v: 1e12, s: "T" },
    { v: 1e9, s: "B" },
    { v: 1e6, s: "M" },
    { v: 1e3, s: "K" },
  ];
  for (const { v, s } of units) {
    if (abs >= v) return (abs / v).toFixed(1).replace(/\.0$/, "") + s;
  }
  return abs.toLocaleString("en-US");
}

