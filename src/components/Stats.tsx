import { settings, type PortfolioStat } from "@/content";
import { compactNumber, formatPercent } from "@/utils/format";
import { cn } from "@/utils/cn";

/**
 * Renders an optional metric/stat only when it is meaningful.
 * Metrics on businesses are shown verbatim (business metrics are facts the
 * owner publishes, not personal financials).
 */
export function StatFigure({
  value,
  label,
  format = "text",
  dark,
  className,
}: {
  value: string | number;
  label: string;
  format?: "text" | "compact" | "percent";
  dark?: boolean;
  className?: string;
}) {
  const display =
    typeof value === "number"
      ? format === "compact"
        ? compactNumber(value)
        : format === "percent"
          ? formatPercent(value)
          : value.toLocaleString("en-US")
      : value;

  return (
    <div className={className}>
      <p className={cn("text-h3 tabular", dark ? "text-chalk" : "text-ink")}>{display}</p>
      <p className={cn("text-mono-sm mt-2", dark ? "text-chalk-2" : "text-ink-3")}>{label}</p>
    </div>
  );
}

/**
 * Portfolio summary stats — each gated by its own privacy flag.
 * Returns nothing at all when no stat is permitted to render.
 */
export function PrivacyStats({ stats, dark }: { stats: PortfolioStat[]; dark?: boolean }) {
  const visible = stats.filter((s) => settings.finance[s.privacy] === true);
  if (visible.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
      {visible.map((s) => (
        <StatFigure key={s.label} value={s.value} label={s.label} format={s.format} dark={dark} />
      ))}
    </div>
  );
}
