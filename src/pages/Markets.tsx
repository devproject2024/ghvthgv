import { investments, investmentStartYear, marketStats, markets, profile, settings } from "@/content";
import { DOMAINS } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { ArrowLink, Container, Eyebrow, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { MarketOverview } from "@/components/Stats";
import { PortfolioTable } from "@/components/PortfolioTable";
import { cn } from "@/utils/cn";

export default function Markets() {
  const hasHoldings = investments.length > 0;
  const hasDemo = investments.some((i) => i.demo);
  const fin = settings.finance;
  const yearsExperience = new Date().getFullYear() - investmentStartYear;

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
              <SplitHeadline as="h1" text={"Capital allocation,\ntreated like research."} className="text-h1 max-w-[16ch] text-ink" />
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

      {/* Overview metrics */}
      <section className="pt-16 lg:pt-24">
        <Container>
          <Reveal>
            <div className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-line pt-10">
              <div className="col-span-12 mb-2 flex flex-wrap items-baseline justify-between gap-4">
                <Eyebrow>Overview</Eyebrow>
                <span className="text-mono-sm text-ink-3">
                  Investing since {investmentStartYear}
                  {yearsExperience >= 1 && ` · ${yearsExperience}+ year${yearsExperience === 1 ? "" : "s"}`}
                </span>
              </div>
              <div className="col-span-12">
                <MarketOverview stats={marketStats} investmentsCount={investments.filter((i) => !i.demo).length} />
                {/* When privacy hides everything, show an honest note rather than an empty band. */}
                {!marketStats.some((s) => fin[s.privacy]) && (
                  <p className="text-mono-sm max-w-[52ch] text-ink-3">
                    Net worth, totals and returns are private by default. Enable them in
                    <code className="mx-1 font-mono">src/content/settings.ts</code> and set real figures in
                    <code className="ml-1 font-mono">markets-portfolio.ts</code>.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Privacy / sample notice */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal className="flex flex-col gap-3 border border-line bg-paper-2/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-mono-sm text-ink-3">
              {hasDemo
                ? "⚠ The holdings below are SAMPLE rows that demonstrate the layout — they are not real positions. Replace them in src/content/markets-portfolio.ts."
                : "Portfolio figures are private by default. Amounts and returns only appear when enabled."}
            </p>
            <span className="text-label text-ink-3 tabular whitespace-nowrap">
              {fin.showProfitLoss ? "Returns visible" : "Figures private"}
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

          {hasHoldings ? (
            <Reveal>
              <PortfolioTable investments={investments} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="border border-line px-6 py-12 text-center lg:px-12 lg:py-16">
                <span className={cn("mx-auto mb-6 block h-2 w-2 rounded-full", DOMAINS.markets.dot)} />
                <p className="mx-auto max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{markets.portfolioNote}</p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Pitch / opportunities — future-ready CTA (no form yet) */}
      {markets.pitch.enabled && (
        <section className="border-t border-line py-24 lg:py-32" aria-labelledby="pitch-heading">
          <Container>
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 flex items-center gap-2 lg:col-span-3">
                <span className={cn("inline-block h-2 w-2 rounded-full", DOMAINS.ventures.dot)} />
                <Eyebrow>{markets.pitch.eyebrow}</Eyebrow>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <h2 id="pitch-heading" className="text-h2 max-w-[22ch] text-ink">
                  {markets.pitch.title}
                </h2>
                <p className="text-lead mt-6 max-w-[54ch] text-ink-2">{markets.pitch.body}</p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={markets.pitch.ctaHref}
                    className="group inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-ink"
                  >
                    <span className="link-line">{markets.pitch.ctaLabel}</span>
                    <span className="arrow-shift" aria-hidden>
                      ↗
                    </span>
                  </a>
                  {markets.pitch.note && <span className="text-mono-sm text-ink-3">{markets.pitch.note}</span>}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Closing */}
      <section className="border-t border-line py-24 lg:py-32">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-h2 max-w-[20ch] text-ink">Building or funding something serious in this space?</h2>
            </div>
            <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-3 lg:col-start-10 lg:justify-end">
              <ArrowLink to="/contact" size="lg">
                Get in touch
              </ArrowLink>
              <a href={`mailto:${profile.email}`} className="link-line break-all text-[14px] text-ink-3">
                {profile.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

