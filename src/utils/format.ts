/**
 * NUMBER FORMATTING
 * -----------------------------------------------------------------
 * Compact, reusable, no hard-coded display strings.
 *
 *   compactNumber(10_000)        -> "10K"
 *   compactNumber(1_000_000)     -> "1M"
 *   compactNumber(1_500_000)     -> "1.5M"
 *   compactNumber(1_000_000_000) -> "1B"
 *   compactNumber(1_500_000_000) -> "1.5B"
 *   compactNumber(2_000_000_000_000) -> "2T"
 *
 * Values below 1,000 are formatted with thousands separators.
 */
const UNITS: { value: number; suffix: string }[] = [
  { value: 1_000_000_000_000, suffix: "T" },
  { value: 1_000_000_000, suffix: "B" },
  { value: 1_000_000, suffix: "M" },
  { value: 1_000, suffix: "K" },
];

/** 1_500_000 -> "1.5M" ; 1_000_000 -> "1M" ; 950 -> "950". */
export function compactNumber(input: number, digits = 1): string {
  const abs = Math.abs(input);
  const negative = input < 0;

  for (const { value, suffix } of UNITS) {
    if (abs >= value) {
      const scaled = abs / value;
      // Round to `digits` decimals, then drop a trailing ".0".
      const rounded = scaled >= 100 ? Math.round(scaled).toString() : scaled.toFixed(digits).replace(/\.0$/, "");
      return `${negative ? "-" : ""}${rounded}${suffix}`;
    }
  }

  return `${negative ? "-" : ""}${abs.toLocaleString("en-US")}`;
}

/** "1.5M" prefixed by a currency symbol. Use only when privacy flags allow. */
export function compactCurrency(
  amount: number,
  symbol: string,
  digits = 1
): string {
  return `${symbol}${compactNumber(amount, digits)}`;
}

/** Always show a trailing percent sign, e.g. 12.5 -> "12.5%". */
export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits).replace(/\.0$/, "")}%`;
}

