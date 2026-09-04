import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/content";
import { usePageTitle } from "@/components/Layout";
import { Container, Eyebrow } from "@/components/primitives";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

/** Filters only appear once there are enough projects for them to be useful. */
const FILTER_THRESHOLD = 5;

export default function Work() {
  usePageTitle("Work");
  const categories = projectCategories();
  const showFilters = projects.length >= FILTER_THRESHOLD && categories.length > 1;
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <>
      <section className="pt-12 lg:pt-24" aria-labelledby="work-heading">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>Work</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 id="work-heading" className="text-h1 max-w-[16ch] text-ink">
                Projects across software, data and machine learning.
              </h1>
              <p className="text-lead mt-6 max-w-[50ch] text-ink-2">
                An index of things I've built. Each opens as a case study — what the problem was, what I built, and how
                it's put together.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 flex items-end justify-between gap-6 lg:mt-20">
            {showFilters ? (
              <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter projects">
                {["All", ...categories].map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={filter === c}
                    onClick={() => setFilter(c)}
                    className={cn(
                      "h-8 whitespace-nowrap px-3 text-[13px] font-medium tracking-[-0.01em] transition-colors rounded-[2px]",
                      filter === c ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}
            <span className="text-label tabular text-ink-3">
              {String(visible.length).padStart(2, "0")} project{visible.length === 1 ? "" : "s"}
            </span>
          </div>
        </Container>
      </section>

      <section className="pb-24 pt-6 lg:pb-36">
        <Container>
          <ProjectIndex key={filter} projects={visible} />
        </Container>
      </section>
    </>
  );
}
