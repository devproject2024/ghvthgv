import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projectCategories, projects, workFeatures, type ProjectCategory } from "@/content";
import { DOMAINS, projectDomain } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Figure } from "@/components/Figure";
import { Container, Eyebrow, ArrowLink } from "@/components/primitives";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

/** Filters only appear once there are enough projects for them to be useful. */
const FILTER_THRESHOLD = 5;

export default function Work() {
  const categories = projectCategories();
  const showFilters = projects.length >= FILTER_THRESHOLD && categories.length > 1;
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const feature = workFeatures()[0];

  return (
    <>
      <Meta
        title="Work"
        path="/work"
        description="Selected work by Daiwik Rankawat — full-stack platforms and machine-learning systems, with case studies."
      />

      <section className="pt-12 lg:pt-24" aria-labelledby="work-heading">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>Work</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline
                as="h1"
                id="work-heading"
                text={"Projects across software,\ndata and machine learning."}
                className="text-h1 max-w-[16ch] text-ink"
              />
              <Reveal delay={300}>
                <p className="text-lead mt-6 max-w-[50ch] text-ink-2">
                  An archive of things I've built. Each opens as a case study — the problem, what I built, and how it's
                  put together.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Large featured project — image-led editorial block */}
      {feature && (
        <section className="pt-14 lg:pt-20" aria-label="Featured project">
          <Container>
            <Reveal>
              <Link
                to={`/work/${feature.slug}`}
                className="group grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-line pt-8 lg:pt-12"
              >
                <div className="col-span-12 order-2 lg:order-1 lg:col-span-7">
                  <Figure
                    media={feature.cover}
                    aspect="16/10"
                    hover
                    placeholderLabel={feature.title}
                    placeholderNote="Featured screenshot to be added"
                  />
                </div>
                <div className="col-span-12 order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
                  <div className="flex items-center gap-3 text-label text-ink-3">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("h-1.5 w-1.5 rounded-full", DOMAINS[projectDomain(feature.category)].dot)} />
                      Featured
                    </span>
                    <span aria-hidden>·</span>
                    <span>{feature.category}</span>
                    <span aria-hidden>·</span>
                    <span className="tabular">{feature.year}</span>
                  </div>
                  <h2 className="text-h2 mt-6 text-ink">{feature.title}</h2>
                  <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">{feature.description}</p>
                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                    <ArrowLink to={`/work/${feature.slug}`}>View case study</ArrowLink>
                    {feature.links?.github && <ArrowLink href={feature.links.github}>GitHub</ArrowLink>}
                  </div>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Archive */}
      <section className="pb-24 pt-16 lg:pb-36 lg:pt-24" aria-label="All projects">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
            <Eyebrow>
              {showFilters ? "Filter" : "All projects"}
            </Eyebrow>
            <span className="text-label tabular text-ink-3">
              {String(visible.length).padStart(2, "0")} project{visible.length === 1 ? "" : "s"}
            </span>
          </div>

          {showFilters && (
            <div
              className="no-scrollbar -mx-5 mb-10 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0"
              role="tablist"
              aria-label="Filter projects"
            >
              {["All", ...categories].map((c) => {
                const isAll = c === "All";
                const active = filter === c;
                const domain = isAll ? "editorial" : projectDomain(c as ProjectCategory);
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "inline-flex h-8 items-center gap-2 whitespace-nowrap px-3 text-[13px] font-medium tracking-[-0.01em] transition-colors rounded-[2px]",
                      active ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full", active ? DOMAINS[domain].bright : DOMAINS[domain].dot)} />
                    {c}
                  </button>
                );
              })}
            </div>
          )}

          <ProjectIndex key={filter} projects={visible} />
        </Container>
      </section>
    </>
  );
}
