import type { ChartSpec } from "@/content/types";
import { compactNumber } from "@/utils/format";

/* Solid accent hex values (must match the @theme tokens in index.css). */
const ACCENT_HEX: Record<string, string> = {
  tech: "#33506b",
  markets: "#3d5c45",
  ventures: "#9c4a2b",
  editorial: "#151412",
};
const MUTED_HEX = "#86827a";
const GRID_HEX = "#d8d3ca";

function useColors(spec: ChartSpec) {
  const accent = ACCENT_HEX[spec.accent ?? "tech"];
  // A single series uses the accent; a second uses a muted tone so charts
  // stay restrained rather than rainbow.
  return [accent, MUTED_HEX, ACCENT_HEX.ventures];
}

/**
 * Lightweight, dependency-free SVG charts for research articles.
 * Responsive via viewBox; scales fluidly and stays crisp. Charts use the
 * site's solid accent colours only — no gradients.
 */
export function Chart({ spec, dark }: { spec: ChartSpec; dark?: boolean }) {
  return (
    <figure className="my-8">
      <div
        className={
          dark
            ? "border border-carbon-line bg-carbon-2 p-4 sm:p-6"
            : "border border-line bg-paper-2/40 p-4 sm:p-6"
        }
      >
        {spec.title && (
          <figcaption className="mb-4 flex items-baseline justify-between gap-4">
            <span className={dark ? "text-mono-sm text-chalk" : "text-mono-sm text-ink"}>{spec.title}</span>
            {spec.unit && (
              <span className={dark ? "text-mono-sm text-chalk-2" : "text-mono-sm text-ink-3"}>{spec.unit}</span>
            )}
          </figcaption>
        )}
        {spec.type === "line" ? <LineChart spec={spec} dark={dark} /> : <BarChart spec={spec} dark={dark} />}
        <ChartLegend spec={spec} dark={dark} />
      </div>
      {(spec.caption || spec.source) && (
        <p className={dark ? "text-mono-sm mt-3 text-chalk-2" : "text-mono-sm mt-3 text-ink-3"}>
          {spec.caption}
          {spec.caption && spec.source ? " " : ""}
          {spec.source && <span>— {spec.source}</span>}
        </p>
      )}
    </figure>
  );
}

const W = 640;
const H = 300;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 32;

function ChartLegend({ spec, dark }: { spec: ChartSpec; dark?: boolean }) {
  const colors = useColors(spec);
  if (spec.series.length < 2) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
      {spec.series.map((s, i) => (
        <span key={s.name} className={dark ? "text-mono-sm text-chalk-2" : "text-mono-sm text-ink-3"}>
          <span
            className="mr-2 inline-block h-2 w-2 align-middle"
            style={{ backgroundColor: colors[i % colors.length] }}
          />
          {s.name}
        </span>
      ))}
    </div>
  );
}

function niceMax(v: number) {
  const pow = Math.pow(10, Math.floor(Math.log10(Math.max(v, 1))));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function LineChart({ spec, dark }: { spec: ChartSpec; dark?: boolean }) {
  const colors = useColors(spec);
  const all = spec.series.flatMap((s) => s.data);
  const max = niceMax(Math.max(...all, 1));
  const n = spec.labels.length;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const x = (i: number) => PAD_L + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (v: number) => PAD_T + plotH - (v / max) * plotH;
  const ticks = 4;
  const axis = dark ? MUTED_HEX : GRID_HEX;
  const text = dark ? "#a7a39b" : "#86827a";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={spec.title ?? "Line chart"}>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const yy = PAD_T + (plotH / ticks) * i;
        const val = Math.round(max - (max / ticks) * i);
        return (
          <g key={i}>
            <line x1={PAD_L} y1={yy} x2={W - PAD_R} y2={yy} stroke={axis} strokeWidth={1} />
            <text x={PAD_L - 8} y={yy + 4} textAnchor="end" fontSize={10} fill={text} fontFamily="monospace">
              {compactNumber(val)}
            </text>
          </g>
        );
      })}
      {spec.labels.map((lab, i) => (
        <text key={lab + i} x={x(i)} y={H - 10} textAnchor="middle" fontSize={10} fill={text} fontFamily="monospace">
          {lab}
        </text>
      ))}
      {spec.series.map((s, si) => {
        const color = colors[si % colors.length];
        const d = s.data
          .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
          .join(" ");
        return (
          <g key={s.name}>
            <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            {s.data.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={2.6} fill={color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function BarChart({ spec, dark }: { spec: ChartSpec; dark?: boolean }) {
  const colors = useColors(spec);
  const all = spec.series.flatMap((s) => s.data);
  const max = niceMax(Math.max(...all, 1));
  const n = spec.labels.length;
  const seriesCount = spec.series.length;
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const groupW = plotW / n;
  const barGap = 6;
  const barW = Math.min(46, (groupW - barGap * 2) / seriesCount);
  const y = (v: number) => PAD_T + plotH - (v / max) * plotH;
  const ticks = 4;
  const axis = dark ? "#2b2a27" : GRID_HEX;
  const text = dark ? "#a7a39b" : "#86827a";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={spec.title ?? "Bar chart"}>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const yy = PAD_T + (plotH / ticks) * i;
        const val = Math.round(max - (max / ticks) * i);
        return (
          <g key={i}>
            <line x1={PAD_L} y1={yy} x2={W - PAD_R} y2={yy} stroke={axis} strokeWidth={1} />
            <text x={PAD_L - 8} y={yy + 4} textAnchor="end" fontSize={10} fill={text} fontFamily="monospace">
              {compactNumber(val)}
            </text>
          </g>
        );
      })}
      {spec.labels.map((lab, i) => {
        const groupX = PAD_L + i * groupW + groupW / 2;
        return (
          <g key={lab + i}>
            {spec.series.map((s, si) => {
              const v = s.data[i] ?? 0;
              const totalW = barW * seriesCount + barGap * (seriesCount - 1);
              const bx = groupX - totalW / 2 + si * (barW + barGap);
              const by = y(v);
              return (
                <rect
                  key={s.name}
                  x={bx}
                  y={by}
                  width={barW}
                  height={Math.max(0, PAD_T + plotH - by)}
                  fill={colors[si % colors.length]}
                  rx={1}
                >
                  <title>{`${s.name}: ${compactNumber(v)}`}</title>
                </rect>
              );
            })}
            <text x={groupX} y={H - 10} textAnchor="middle" fontSize={10} fill={text} fontFamily="monospace">
              {lab}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

