import type { Investment } from "@/content/types";
import { settings } from "@/content";
import { compactNumber } from "@/utils/format";

import { LogoMark } from "./LogoMark";
import { Delta } from "./Stats";
import { Reveal } from "./Reveal";

const money = (n: number, sym: string) => `${sym}${compactNumber(n)}`;

/**
 * Editorial portfolio table on desktop; stacks into clean cards on mobile.
 * Financial columns respect the privacy flags in settings.ts.
 * Demo rows are clearly labelled by the caller.
 */
export function PortfolioTable({ investments }: { investments: Investment[] }) {
  const fin = settings.finance;
  const sym = settings.currencySymbol;

  if (investments.length === 0) return null;

  return (
    <div>
      {/* ---------- Desktop table ---------- */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-4 pr-4 text-label font-normal text-ink-3">Company</th>
              <th className="py-4 pr-4 text-label font-normal text-ink-3">Holding</th>
              {fin.showInvestedAmount && <th className="py-4 pr-4 text-label font-normal text-ink-3">Invested</th>}
              {fin.showCurrentValue && <th className="py-4 pr-4 text-label font-normal text-ink-3">Current</th>}
              <th className="py-4 text-right text-label font-normal text-ink-3">Return</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((inv, i) => (
              <Reveal
                as="tr"
                variant="fade-only"
                key={inv.slug}
                delay={i * 40}
                className="group border-b border-line align-middle transition-colors hover:bg-paper-2/60"
              >
                <td className="py-5 pr-4">
                  <div className="flex items-center gap-4">
                    <LogoMark logo={inv.logo ?? { name: inv.ticker || inv.name }} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium tracking-[-0.01em] text-ink">
                        {inv.website ? (
                          <a
                            href={inv.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="link-line"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {inv.name}
                          </a>
                        ) : (
                          inv.name
                        )}
                      </p>
                      <p className="text-mono-sm mt-0.5 text-ink-3">
                        {[inv.ticker, inv.category].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    {inv.demo && (
                      <span className="ml-1 border border-line px-1.5 py-0.5 text-mono-sm text-ink-3">sample</span>
                    )}
                  </div>
                </td>

                <td className="py-5 pr-4 text-[14px] text-ink-2">
                  {inv.shares != null ? (
                    <>
                      <span className="tabular text-ink">{compactNumber(inv.shares)}</span>{" "}
                      {inv.unitsLabel ?? "shares"}
                    </>
                  ) : inv.ownershipPercentage != null && fin.showOwnership ? (
                    <span className="tabular">{inv.ownershipPercentage}%</span>
                  ) : (
                    <span className="text-ink-3">{inv.assetType}</span>
                  )}
                </td>

                {fin.showInvestedAmount && (
                  <td className="py-5 pr-4 text-[14px] tabular text-ink-2">
                    {inv.investedAmount != null ? money(inv.investedAmount, inv.currency ?? sym) : "—"}
                  </td>
                )}
                {fin.showCurrentValue && (
                  <td className="py-5 pr-4 text-[14px] tabular text-ink-2">
                    {inv.currentValue != null ? money(inv.currentValue, inv.currency ?? sym) : "—"}
                  </td>
                )}

                <td className="py-5 text-right">
                  <Delta
                    value={fin.showProfitLoss ? inv.profitLossPercentage : undefined}
                    amount={fin.showProfitLoss ? inv.profitLoss : undefined}
                    currency={inv.currency ?? sym}
                    show={fin.showProfitLoss}
                    className="justify-end text-[14px]"
                  />
                </td>
              </Reveal>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile cards ---------- */}
      <ul className="border-t border-line md:hidden">
        {investments.map((inv, i) => (
          <Reveal as="li" key={inv.slug} delay={i * 40} className="border-b border-line py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <LogoMark logo={inv.logo ?? { name: inv.ticker || inv.name }} size={40} />
                <div>
                  <p className="text-[15px] font-medium tracking-[-0.01em] text-ink">{inv.name}</p>
                  <p className="text-mono-sm mt-0.5 text-ink-3">
                    {[inv.ticker, inv.category].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
              <Delta
                value={fin.showProfitLoss ? inv.profitLossPercentage : undefined}
                amount={fin.showProfitLoss ? inv.profitLoss : undefined}
                currency={inv.currency ?? sym}
                show={fin.showProfitLoss}
                className="text-[13px]"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <Cell label="Holding">
                {inv.shares != null ? (
                  <>
                    <span className="tabular">{compactNumber(inv.shares)}</span> {inv.unitsLabel ?? "shares"}
                  </>
                ) : (
                  inv.assetType
                )}
              </Cell>
              {fin.showInvestedAmount && (
                <Cell label="Invested">{inv.investedAmount != null ? money(inv.investedAmount, inv.currency ?? sym) : "—"}</Cell>
              )}
              {fin.showCurrentValue && (
                <Cell label="Current">{inv.currentValue != null ? money(inv.currentValue, inv.currency ?? sym) : "—"}</Cell>
              )}
            </div>

            {inv.website && (
              <a
                href={inv.website}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink"
              >
                <span className="link-line">View company</span>
                <span aria-hidden>↗</span>
              </a>
            )}
            {inv.demo && (
              <p className="mt-3 text-mono-sm text-ink-3">Sample data — not a real holding.</p>
            )}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-label text-ink-3">{label}</p>
      <p className="mt-1 text-[13px] tabular text-ink-2">{children}</p>
    </div>
  );
}

