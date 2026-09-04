import { Link, Navigate, useParams } from "react-router-dom";
import type { Project, ProjectSection } from "@/content/types";
import { getProject, nextProject, projectNumber, projects } from "@/content";
import { DOMAINS, projectDomain } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { Figure, Gallery } from "@/components/Figure";
import { Container, Eyebrow, Rule, Tag } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

/**
 * CASE STUDY PAGE
 * Sections render only when the project provides content for them.
 */
export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/work" replace />;

  const next = nextProject(project.slug);
  const number = projectNumber(project.slug);
  const links = collectLinks(project);
  const domain = projectDomain(project.category);

  const sections: ProjectSection[] = [
    { heading: "Overview", body: project.overview ?? [] },
    { heading: "Problem", body: project.problem ?? [] },
    { heading: "What I built", body: project.solution ?? [] },
    { heading: "Approach", body: project.approach ?? [] },
    { heading: "Architecture", body: project.architecture ?? [] },
    { heading: "Engineering decisions", body: project.details ?? [] },
    ...(project.extraSections ?? []),
  ].filter((s) => s.body.length > 0);

  const outcomes = project.outcomes?.filter(Boolean) ?? [];

  return (
    <article>
      <Meta
        title={project.title}
        path={`/work/${project.slug}`}
        description={project.description}
      />
      {/* Header ------------------------------------------------------- */}
      <section className="pt-10 lg:pt-20">
        <Container>
          <Reveal className="flex items-center justify-between text-label text-ink-3">
            <Link to="/work" className="link-line inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <span aria-hidden>←</span> Work
            </Link>
            <span className="tabular">
              {number} / {String(projects.length).padStart(2, "0")}
            </span>
          </Reveal>

          <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-14 pt-14 lg:pb-20 lg:pt-24">
            <Reveal className="col-span-12 lg:col-span-9">
              <div className="mb-6 flex items-center gap-3 text-label text-ink-3">
                <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span className="tabular">{project.year}</span>
              </div>
              <h1 className="text-display max-w-[14ch] text-ink">{project.title}</h1>
            </Reveal>

            <Reveal delay={100} className="col-span-12 lg:col-span-7">
              <p className="text-lead max-w-[52ch] text-ink-2">{project.description}</p>
            </Reveal>

            <Reveal delay={160} className="col-span-12 lg:col-span-4 lg:col-start-9">
              <dl className="divide-y divide-line border-y border-line">
                <Row label="Role">{project.role}</Row>
                <Row label="Status">
                  <span className="inline-flex items-center gap-2">
                    <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                    {project.status}
                  </span>
                </Row>
                <Row label="Stack">{project.technologies.join(", ")}</Row>
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

      {/* Hero image --------------------------------------------------- */}
      <section>
        <Container>
          <Figure
            media={project.cover}
            aspect="16/9"
            priority
            placeholderLabel={project.title}
            placeholderNote="Hero screenshot to be added"
            showCaption
          />
        </Container>
      </section>

      {/* Narrative sections ------------------------------------------ */}
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

      {/* Metrics ------------------------------------------------------ */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
              {project.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 70}>
                  <p className="text-h2 tabular text-ink">{m.value}</p>
                  <p className="text-mono-sm mt-3 text-ink-3">{m.label}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Gallery ------------------------------------------------------ */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <Eyebrow className="mb-8">Screens</Eyebrow>
          {project.gallery && project.gallery.length > 0 ? (
            <Gallery items={project.gallery} />
          ) : (
            <Figure
              aspect="16/9"
              placeholderLabel={project.title}
              placeholderNote="Screenshots to be added — see projects.ts → gallery[]"
            />
          )}
        </Container>
      </section>

      {/* Outcomes + technology --------------------------------------- */}
      <section className="bg-carbon py-20 text-chalk lg:py-28">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-14">
            <Reveal className="col-span-12 lg:col-span-6">
              <Eyebrow dark className="mb-8">
                Outcomes
              </Eyebrow>
              {outcomes.length > 0 ? (
                <ul className="space-y-4">
                  {outcomes.map((o, i) => (
                    <li key={i} className="flex gap-4 border-t border-carbon-line pt-4 text-[17px] leading-relaxed text-chalk">
                      <span className="text-label tabular mt-1.5 text-chalk-2">{String(i + 1).padStart(2, "0")}</span>
                      {o}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-[40ch] text-[17px] leading-relaxed text-chalk-2">
                  Results for this project will be published here once they're documented.
                </p>
              )}
            </Reveal>

            <Reveal delay={80} className="col-span-12 lg:col-span-5 lg:col-start-8">
              <Eyebrow dark className="mb-8">
                Technology
              </Eyebrow>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Tag key={t} dark>
                    {t}
                  </Tag>
                ))}
              </div>

              {links.length > 0 && (
                <>
                  <Eyebrow dark className="mb-6 mt-14">
                    Links
                  </Eyebrow>
                  <ul className="divide-y divide-carbon-line border-y border-carbon-line">
                    {links.map((l) => (
                      <li key={l.href + l.label}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group flex items-center justify-between py-3.5 text-[15px] text-chalk transition-colors hover:text-white"
                        >
                          {l.label}
                          <span className="arrow-shift text-chalk-2" aria-hidden>
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Next project ------------------------------------------------- */}
      {next && (
        <section aria-labelledby="next-heading">
          <Container>
            <Link
              to={`/work/${next.slug}`}
              className="group grid grid-cols-12 items-end gap-x-6 gap-y-6 py-16 lg:py-24"
            >
              <div className="col-span-12 lg:col-span-3">
                <Eyebrow>
                  <span id="next-heading">Next project</span>
                </Eyebrow>
                <p className="text-label tabular mt-2 text-ink-3">{projectNumber(next.slug)}</p>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <p className="text-h2 text-ink">{next.title}</p>
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

/** Flattens the project's link fields into a single list. */
function collectLinks(p: Project): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  if (p.links?.live) out.push({ label: "Live site", href: p.links.live });
  if (p.links?.github) out.push({ label: "GitHub", href: p.links.github });
  if (p.links?.caseStudy) out.push({ label: "Case study", href: p.links.caseStudy });
  if (p.links?.external) out.push({ label: "View project", href: p.links.external });
  for (const l of p.links?.other ?? []) out.push({ label: l.label, href: l.href });
  return out;
}
