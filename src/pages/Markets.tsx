import { investments, markets, portfolioStats, profile, settings } from "@/content";
import { DOMAINS } from "@/content/domains";
import { compactCurrency } from "@/utils/format";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Figure } from "@/components/Figure";
import { ArrowLink, Container, Eyebrow, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { PrivacyStats } from "@/components/Stats";
import { cn } from "@/utils/cn";

export default function Markets() {
  const hasHoldings = investments.length > 0;

  return (
    <>
      <Meta
        title="Investing & markets"
        path="/markets"
        description="How Daiwik Rankawat approaches investing, trading and early-stage venture — research-led and private by default."
      />

      {/* Intro */}
      <section className="pt-12 lg:pt-24">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 flex items-center gap-2 lg:col-span-3">
              <span className={cn("inline-block h-2 w-2 rounded-full", DOMAINS.markets.dot)} />
              <Eyebrow>{markets.eyebrow}</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline
                as="h1"
                text={"Capital allocation,\ntreated like research."}
                className="text-h1 max-w-[16ch] text-ink"
              />
              <div className="mt-8 max-w-[56ch] space-y-5">
                {markets.intro.map((p, i) => (
                  <Reveal key={i} delay={200 + i * 80}>
                    <p className={i === 0 ? "text-lead text-ink-2" : "text-[17px] leading-[1.65] text-ink-2"}>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Privacy note */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal className="flex flex-col gap-3 border border-line bg-paper-2/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-mono-sm text-ink-3">
              Portfolio figures are private by default. Amounts, allocation and performance are never published unless
              explicitly enabled.
            </p>
            <span className="text-label text-ink-3 tabular">
              {settings.finance.showInvestmentAmounts ? "Figures public" : "Figures private"}
            </span>
          </Reveal>
        </Container>
      </section>

      {/* Approach */}
      <section className="py-24 lg:py-32" aria-labelledby="approach-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Approach"
              title={<span id="approach-heading">The same discipline as the engineering, applied to capital.</span>}
              className="mb-14 lg:mb-20"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {markets.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 70} className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-label tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-h3 text-ink">{a.title}</h3>
                </div>
                <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">{a.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section className="border-t border-line py-24 lg:py-32" aria-labelledby="portfolio-heading">
        <Container>
          <Reveal className="mb-12 grid grid-cols-12 gap-x-6 gap-y-6 lg:mb-16">
            <div className="col-span-12 flex items-baseline gap-4 lg:col-span-3">
              <span className="text-label tabular text-ink-3">02</span>
              <Eyebrow>
                <span id="portfolio-heading">{markets.portfolioHeading}</span>
              </Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-4">
              <h2 className="text-h2 text-ink">Holdings, when they're made public.</h2>
            </div>
          </Reveal>

          <div className="mb-14">
            <PrivacyStats stats={portfolioStats} />
          </div>

          {hasHoldings ? (
            <ul className="border-t border-line">
              {investments.map((inv, i) => (
                <Reveal as="li" key={inv.slug} delay={i * 50} className="grid grid-cols-12 items-start gap-x-6 gap-y-4 border-b border-line py-7">
                  <div className="col-span-12 flex items-start gap-4 sm:col-span-5">
                    <div className="h-12 w-12 shrink-0">
                      <Figure
                        media={inv.logo}
                        aspect="1/1"
                        placeholderLabel={inv.name}
                        placeholderNote="Logo"
                        reveal={false}
                        className="h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-[1.125rem] font-medium tracking-[-0.015em] text-ink">
                        {inv.website ? (
                          <a href={inv.website} target="_blank" rel="noreferrer noopener" className="link-line">
                            {inv.name}
                          </a>
                        ) : (
                          inv.name
                        )}
                      </h3>
                      <p className="text-mono-sm mt-1 text-ink-3">
                        {inv.category} · {inv.type}
                        {inv.date ? ` · ${inv.date}` : ""}
                      </p>
                    </div>
                  </div>
                  <p className="col-span-12 text-[15px] leading-relaxed text-ink-2 sm:col-span-5">{inv.thesis}</p>
                  <div className="col-span-12 flex flex-wrap items-center gap-x-5 gap-y-2 sm:col-span-2 sm:justify-end">
                    {settings.finance.showInvestmentAmounts && inv.amount != null && (
                      <span className="text-mono-sm tabular text-ink">
                        {compactCurrency(inv.amount, settings.currencySymbol)}
                      </span>
                    )}
                    {settings.finance.showInvestmentAmounts && inv.ownership && (
                      <span className="text-mono-sm text-ink-3">{inv.ownership}</span>
                    )}
                    {inv.website && <ArrowLink href={inv.website} size="sm">Visit</ArrowLink>}
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal>
              <div className="border border-line px-6 py-12 text-center lg:px-12 lg:py-16">
                <span className={cn("mx-auto mb-6 block h-2 w-2 rounded-full", DOMAINS.markets.dot)} />
                <p className="mx-auto max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{markets.portfolioNote}</p>
                <p className="text-mono-sm mt-6 text-ink-3">
                  Positions are added in <code className="font-mono">src/content/investments.ts</code> when public.
                </p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Closing */}
      <section className="border-t border-line py-24 lg:py-32">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-h2 max-w-[20ch] text-ink">
                Building or funding something serious in this space?
              </h2>
            </div>
            <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-3 lg:col-start-10 lg:justify-end">
              <ArrowLink to="/contact" size="lg">Get in touch</ArrowLink>
              <a href={`mailto:${profile.email}`} className="link-line text-[14px] text-ink-3 break-all">
                {profile.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
