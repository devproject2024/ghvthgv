import { Link } from "react-router-dom";
import {
  achievements,
  featuredProjects,
  profile,
  projects,
  skillGroups,
  ventures,
  venturesIntro,
} from "@/content";
import { Figure } from "@/components/Figure";
import { usePageTitle } from "@/components/Layout";
import { ArrowLink, Container, Eyebrow, Rule, SectionHeader } from "@/components/primitives";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

export default function Home() {
  usePageTitle();
  const heroPhoto = profile.photos.find((p) => p.placement === "hero") ?? profile.photos.find((p) => p.cutout);
  const featured = featuredProjects();

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative" aria-labelledby="hero-heading">
        <Container>
          <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-between pb-10 pt-10 lg:min-h-[calc(100svh-72px)] lg:pb-14 lg:pt-16">
            <Reveal className="flex items-center justify-between text-label text-ink-3">
              <span>{profile.name}</span>
              <span className="hidden sm:inline">Portfolio · {new Date().getFullYear()}</span>
              {profile.location && <span>{profile.location}</span>}
            </Reveal>

            <div className={cn("grid grid-cols-12 gap-x-6 gap-y-12 py-16 lg:py-20", heroPhoto && "items-end")}>
              <div className={cn("col-span-12", heroPhoto ? "lg:col-span-8" : "lg:col-span-11")}>
                <Reveal delay={80}>
                  <h1 id="hero-heading" className="text-display max-w-[15ch] whitespace-pre-line text-ink">
                    {profile.headline}
                  </h1>
                </Reveal>
              </div>

              {heroPhoto && (
                <div className="col-span-8 col-start-3 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-10">
                  <Figure
                    media={heroPhoto}
                    aspect="4/5"
                    cutout={heroPhoto.cutout}
                    priority
                    placeholderLabel={profile.name}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-12 gap-x-6 gap-y-10 border-t border-line pt-8">
              <Reveal delay={160} className="col-span-12 md:col-span-6 lg:col-span-5">
                <p className="text-lead max-w-[44ch] text-ink-2">{profile.subheadline}</p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <ArrowLink to="/work">Selected work</ArrowLink>
                  <ArrowLink to="/about">About</ArrowLink>
                  <ArrowLink to="/contact">Contact</ArrowLink>
                </div>
              </Reveal>

              <Reveal delay={240} className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
                <Eyebrow className="mb-4">Currently</Eyebrow>
                <dl className="divide-y divide-line border-y border-line">
                  {profile.currently.map((c) => (
                    <div key={c.label} className="grid grid-cols-3 gap-4 py-3">
                      <dt className="text-mono-sm text-ink-3">{c.label}</dt>
                      <dd className="col-span-2 text-[14px] leading-snug text-ink">{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SELECTED WORK                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 lg:py-36" aria-labelledby="work-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Selected work"
              title={<span id="work-heading">Things I've built, from data pipelines to the interfaces on top of them.</span>}
              className="mb-14 lg:mb-20"
            />
          </Reveal>
          <ProjectIndex projects={featured} />
          <Reveal className="mt-10 flex items-center justify-between">
            <ArrowLink to="/work">All work</ArrowLink>
            <span className="text-label tabular text-ink-3">
              {String(featured.length).padStart(2, "0")} of {String(projects.length).padStart(2, "0")}
            </span>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHAT I BUILD (dark band)                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-carbon py-24 text-chalk lg:py-36" aria-labelledby="build-heading">
        <Container>
          <Reveal>
            <SectionHeader
              dark
              index="02"
              eyebrow="What I build"
              title={<span id="build-heading">Systems that hold together end to end — the model, the service and the interface.</span>}
              lead="The tools change; the shape of the work doesn't. These are the three kinds of things I build, and the technologies I use to build them."
              className="mb-16 lg:mb-24"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-10">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 80} className="border-t border-carbon-line pt-6">
                <span className="text-label tabular text-chalk-2">0{i + 1}</span>
                <h3 className="text-h3 mt-6 text-chalk">{g.title}</h3>
                <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-chalk-2">{g.description}</p>
                <p className="text-mono-sm mt-8 leading-relaxed text-chalk-2/80">{g.technologies.join(" · ")}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* BEYOND SOFTWARE                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-24 lg:py-36" aria-labelledby="beyond-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow={venturesIntro.eyebrow}
              title={<span id="beyond-heading">{venturesIntro.title}</span>}
              lead={venturesIntro.body}
              className="mb-14 lg:mb-20"
            />
          </Reveal>

          <ol className="border-t border-line">
            {ventures.map((v, i) => (
              <Reveal key={v.name} as="li" delay={i * 40} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-line py-6 lg:py-7">
                <span className="text-label tabular col-span-2 text-ink-3 lg:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 text-[1.125rem] font-medium tracking-[-0.015em] text-ink lg:col-span-3">
                  {v.name}
                </h3>
                <p className="col-span-10 col-start-3 text-[15px] leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-5">
                  {v.description}
                </p>
                <p className="col-span-10 col-start-3 text-mono-sm text-ink-3 lg:col-span-2 lg:col-start-11 lg:text-right">
                  {v.role}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <ArrowLink to="/about">More about how these fit together</ArrowLink>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* EVIDENCE                                                          */}
      {/* ---------------------------------------------------------------- */}
      {achievements.length > 0 && (
        <section className="pb-24 lg:pb-36" aria-labelledby="evidence-heading">
          <Container>
            <Rule className="mb-10" />
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-3">
                <Eyebrow>
                  <span id="evidence-heading">04 &nbsp; Evidence</span>
                </Eyebrow>
              </div>
              <div className="col-span-12 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:col-span-9">
                {achievements.map((a, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <p className="flex items-baseline gap-2 text-ink">
                      {a.prefix && <span className="text-label text-ink-3">{a.prefix}</span>}
                      <span className="text-h1 tabular">{a.figure}</span>
                      {a.suffix && <span className="text-mono-sm text-ink-3">{a.suffix}</span>}
                    </p>
                    <p className="mt-3 text-[15px] text-ink">{a.label}</p>
                    {a.detail && <p className="text-mono-sm text-ink-3">{a.detail}</p>}
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* CLOSING                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-line py-24 lg:py-36" aria-labelledby="closing-heading">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-8">
              <h2 id="closing-heading" className="text-h1 max-w-[16ch] text-ink">
                {profile.contactStatement}
              </h2>
            </Reveal>
            <Reveal delay={100} className="col-span-12 flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10">
              <a
                href={`mailto:${profile.email}`}
                className="link-line text-lead self-start break-all text-ink"
              >
                {profile.email}
              </a>
              <Link to="/contact" className="text-[14px] text-ink-3 hover:text-ink">
                All contact options →
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
