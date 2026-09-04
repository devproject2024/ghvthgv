import { Link } from "react-router-dom";
import {
  achievements,
  businesses,
  featuredProjects,
  profile,
  projects,
  ventures,
  venturesIntro,
} from "@/content";
import { DOMAINS } from "@/content/domains";
import { Figure } from "@/components/Figure";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { ArrowLink, Container, Eyebrow, Rule, SectionHeader } from "@/components/primitives";
import { ProjectIndex } from "@/components/ProjectIndex";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

export default function Home() {
  const heroPhoto = profile.photos.find((p) => p.placement === "hero") ?? profile.photos.find((p) => p.cutout);
  const featured = featuredProjects();

  return (
    <>
      <Meta />

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
                <SplitHeadline
                  text={profile.headline}
                  id="hero-heading"
                  className="text-display max-w-[16ch] text-ink"
                />
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
              <Reveal delay={200} className="col-span-12 md:col-span-6 lg:col-span-5">
                <p className="text-lead max-w-[46ch] text-ink-2">{profile.subheadline}</p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  <ArrowLink to="/work">Selected work</ArrowLink>
                  <ArrowLink to="/markets">Markets</ArrowLink>
                  <ArrowLink to="/about">About</ArrowLink>
                </div>
              </Reveal>

              <Reveal delay={280} className="col-span-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
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
              title={<span id="work-heading">Software and machine-learning systems, built end to end.</span>}
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
      {/* CURRENTLY (dark band) — what I'm doing now                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-carbon py-24 text-chalk lg:py-36" aria-labelledby="now-heading">
        <Container>
          <Reveal>
            <SectionHeader
              dark
              index="02"
              eyebrow="Currently"
              title={<span id="now-heading">Studying data science, building systems, operating ventures.</span>}
              lead="What I'm working on right now. This section is intentionally short and kept up to date."
              className="mb-16 lg:mb-20"
            />
          </Reveal>

          <dl className="grid grid-cols-1 gap-x-10 gap-y-0 border-t border-carbon-line sm:grid-cols-2">
            {profile.currently.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 70}
                className="flex flex-col gap-2 border-b border-carbon-line py-8 sm:px-2"
              >
                <dt className="text-label text-chalk-2">{c.label}</dt>
                <dd className="text-h3 text-chalk">{c.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* BEYOND SOFTWARE — split into Markets / Ventures                  */}
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

          {/* Two editorial gateways */}
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            <Gateway
              domain="markets"
              to="/markets"
              title="Investing & markets"
              body="Research-led public investing, systematic trading and early-stage venture. Holdings stay private by default — the framework is public."
              items={["Investing", "Trading", "Venture"]}
            />
            <Gateway
              domain="ventures"
              to="/ventures"
              title="Ventures & business"
              body="Businesses I operate and help build — including a restaurant venture run as a serious commercial operation, not a side project."
              items={businesses.map((b) => b.category.split("·")[0].trim()).slice(0, 3)}
            />
          </div>

          {/* Compact pursuits list */}
          <ol className="mt-14 border-t border-line">
            {ventures.map((v, i) => (
              <Reveal
                key={v.name}
                as="li"
                delay={i * 40}
                className="grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-5"
              >
                <span className="text-label tabular col-span-2 text-ink-3 lg:col-span-1">0{i + 1}</span>
                <h3 className="col-span-10 flex items-center gap-2.5 text-[1.0625rem] font-medium tracking-[-0.015em] text-ink lg:col-span-3">
                  <span className={cn("inline-block h-1.5 w-1.5 rounded-full", DOMAINS[v.domain ?? "editorial"].dot)} />
                  {v.name}
                </h3>
                <p className="col-span-10 col-start-3 text-[15px] leading-relaxed text-ink-2 lg:col-span-5 lg:col-start-5">
                  {v.description}
                </p>
                <p className="col-span-10 col-start-3 text-mono-sm text-ink-3 lg:col-span-3 lg:col-start-10 lg:text-right">
                  {v.role}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink to="/markets">Open markets</ArrowLink>
            <ArrowLink to="/ventures">Open ventures</ArrowLink>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* EVIDENCE — achievements                                           */}
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
                    {a.detail && <p className="text-mono-sm mt-1 text-ink-3">{a.detail}</p>}
                    {a.description && <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-ink-2">{a.description}</p>}
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="mt-10">
              <ArrowLink to="/experience">Full experience & education</ArrowLink>
            </Reveal>
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
              <a href={`mailto:${profile.email}`} className="link-line text-lead self-start break-all text-ink">
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

function Gateway({
  domain,
  to,
  title,
  body,
  items,
}: {
  domain: "markets" | "ventures";
  to: string;
  title: string;
  body: string;
  items: string[];
}) {
  const meta = DOMAINS[domain];
  return (
    <Link to={to} className="group relative flex flex-col bg-paper p-8 transition-colors hover:bg-paper-2 lg:p-10">
      <div className="flex items-center gap-2">
        <span className={cn("inline-block h-2 w-2 rounded-full", meta.dot)} />
        <span className="text-label text-ink-3">{meta.label}</span>
      </div>
      <h3 className="text-h2 mt-10 text-ink">{title}</h3>
      <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">{body}</p>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
        {items.map((it) => (
          <span key={it} className="text-mono-sm text-ink-3">
            {it}
          </span>
        ))}
      </div>
      <span className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-ink">
        <span className="link-line">Enter</span>
        <span className="arrow-shift-x" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}
