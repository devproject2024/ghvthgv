import { Link, Navigate, useParams } from "react-router-dom";
import type { ProjectSection } from "@/content/types";
import { businesses, getBusiness, businessNumber, nextBusiness } from "@/content";
import { DOMAINS } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { Figure, Gallery } from "@/components/Figure";
import { Container, Eyebrow, Rule } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { StatFigure } from "@/components/Stats";
import { cn } from "@/utils/cn";

export default function VentureDetail() {
  const { slug = "" } = useParams();
  const business = getBusiness(slug);

  if (!business) return <Navigate to="/ventures" replace />;

  const next = nextBusiness(business.slug);
  const number = businessNumber(business.slug);
  const domain = business.domain ?? "ventures";

  const sections: ProjectSection[] = [
    { heading: "Overview", body: business.overview ?? [] },
    { heading: "Story", body: business.story ?? [] },
    { heading: "Operations", body: business.operations ?? [] },
    ...(business.extraSections ?? []),
  ].filter((s) => s.body.length > 0);

  const links: { label: string; href: string }[] = [];
  if (business.website) links.push({ label: "Visit website", href: business.website });
  for (const l of business.links ?? []) links.push({ label: l.label, href: l.href });

  const visibleMetrics = (business.metrics ?? []).filter(
    (m) => !(typeof m.value === "string" && m.value.startsWith("[ADD"))
  );

  return (
    <article>
      <Meta title={business.name} path={`/ventures/${business.slug}`} description={business.description} />

      {/* Header */}
      <section className="pt-10 lg:pt-20">
        <Container>
          <Reveal className="flex items-center justify-between text-label text-ink-3">
            <Link to="/ventures" className="link-line inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <span aria-hidden>←</span> Ventures
            </Link>
            <span className="tabular">
              {number} / {String(businesses.length).padStart(2, "0")}
            </span>
          </Reveal>

          <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-14 pt-14 lg:pb-20 lg:pt-24">
            <Reveal className="col-span-12 lg:col-span-9">
              <div className="mb-6 flex items-center gap-3 text-label text-ink-3">
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                <span>{business.category}</span>
                <span aria-hidden>·</span>
                <span className="tabular">{business.year}</span>
              </div>
              <h1 className="text-display max-w-[14ch] text-ink">{business.name}</h1>
            </Reveal>

            <Reveal delay={100} className="col-span-12 lg:col-span-7">
              <p className="text-lead max-w-[52ch] text-ink-2">{business.description}</p>
            </Reveal>

            <Reveal delay={160} className="col-span-12 lg:col-span-4 lg:col-start-9">
              <dl className="divide-y divide-line border-y border-line">
                <Row label="Role">{business.role}</Row>
                <Row label="Status">
                  <span className="inline-flex items-center gap-2">
                    <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                    {business.status}
                  </span>
                </Row>
                {business.location && <Row label="Based">{business.location}</Row>}
                {links.length > 0 && (
                  <Row label="Links">
                    <span className="flex flex-wrap gap-x-4 gap-y-1">
                      {links.map((l) => (
                        <a
                          key={l.href + l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-line inline-flex items-center gap-1 text-ink"
                        >
                          {l.label} <span aria-hidden>↗</span>
                        </a>
                      ))}
                    </span>
                  </Row>
                )}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Hero image */}
      <section>
        <Container>
          <Figure
            media={business.cover ?? business.logo}
            aspect="16/9"
            priority
            placeholderLabel={business.name}
            placeholderNote="Photograph to be added"
            showCaption
          />
        </Container>
      </section>

      {/* Narrative */}
      {sections.length > 0 && (
        <section className="py-20 lg:py-32">
          <Container>
            <div className="space-y-16 lg:space-y-24">
              {sections.map((s, i) => (
                <Reveal key={s.heading} className="grid grid-cols-12 gap-x-6 gap-y-4">
                  <div className="col-span-12 flex items-baseline gap-4 lg:col-span-3">
                    <span className="text-label tabular text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-label text-ink-3">{s.heading}</h2>
                  </div>
                  <div className="col-span-12 space-y-5 lg:col-span-7 lg:col-start-4">
                    {s.body.map((p, j) => (
                      <p
                        key={j}
                        className={cn(
                          "max-w-[62ch] text-ink-2",
                          j === 0 && i === 0 ? "text-lead text-ink" : "text-[17px] leading-[1.65]"
                        )}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <Eyebrow className="mb-8">Photographs</Eyebrow>
          {business.gallery && business.gallery.length > 0 ? (
            <Gallery items={business.gallery} />
          ) : (
            <Figure
              aspect="16/9"
              placeholderLabel={business.name}
              placeholderNote="Photographs to be added — see businesses.ts → gallery[]"
            />
          )}
        </Container>
      </section>

      {/* Metrics + team (only when explicitly provided) */}
      {(visibleMetrics.length > 0 || business.team) && (
        <section className="bg-carbon py-20 text-chalk lg:py-28">
          <Container>
            <div className="grid grid-cols-12 gap-x-6 gap-y-14">
              {visibleMetrics.length > 0 && (
                <Reveal className="col-span-12 lg:col-span-7">
                  <Eyebrow dark className="mb-8">
                    Figures
                  </Eyebrow>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                    {visibleMetrics.map((m) => (
                      <StatFigure key={m.label} value={m.value} label={m.label} format={m.format} dark />
                    ))}
                  </div>
                </Reveal>
              )}
              {business.team && (
                <Reveal delay={80} className="col-span-12 lg:col-span-4 lg:col-start-9">
                  <Eyebrow dark className="mb-6">
                    Team
                  </Eyebrow>
                  <p className="max-w-[40ch] text-[17px] leading-relaxed text-chalk-2">{business.team}</p>
                </Reveal>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Next venture */}
      {next && (
        <section aria-labelledby="next-heading">
          <Container>
            <Link
              to={`/ventures/${next.slug}`}
              className="group grid grid-cols-12 items-end gap-x-6 gap-y-6 py-16 lg:py-24"
            >
              <div className="col-span-12 lg:col-span-3">
                <Eyebrow>
                  <span id="next-heading">Next venture</span>
                </Eyebrow>
                <p className="text-label tabular mt-2 text-ink-3">{businessNumber(next.slug)}</p>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <p className="text-h2 text-ink">{next.name}</p>
                <p className="mt-3 max-w-[50ch] text-[15px] text-ink-2">{next.summary}</p>
              </div>
              <div className="col-span-12 lg:col-span-2 lg:text-right">
                <span className="text-h2 arrow-shift-x inline-block text-ink" aria-hidden>
                  →
                </span>
              </div>
            </Link>
            <Rule />
          </Container>
        </section>
      )}
    </article>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <dt className="text-mono-sm text-ink-3">{label}</dt>
      <dd className="col-span-2 text-[14px] leading-snug text-ink">{children}</dd>
    </div>
  );
}
