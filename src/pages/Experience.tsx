import {
  achievements,
  certifications,
  education,
  experience,
  leadership,
  profile,
  skillGroups,
} from "@/content";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { ArrowLink, Button, Container, Eyebrow, Rule, Tag } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export default function Experience() {
  return (
    <>
      <Meta
        title="Experience"
        path="/experience"
        description="Experience, education, competitive achievements and skills of Daiwik Rankawat — AI/ML research, product analytics and full-stack engineering."
      />

      {/* Header --------------------------------------------------------- */}
      <section className="pt-12 lg:pt-24">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <Reveal className="col-span-12 lg:col-span-3">
              <Eyebrow>Experience</Eyebrow>
            </Reveal>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline
                as="h1"
                text={"Where I've worked,\nwhat I've studied, the results."}
                className="text-h1 max-w-[16ch] text-ink"
              />
              <Reveal delay={300}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button href={profile.resume.href}>
                    {profile.resume.label} <span aria-hidden>↗</span>
                  </Button>
                  {profile.resume.note && <span className="text-mono-sm text-ink-3">{profile.resume.note}</span>}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline ------------------------------------------------------- */}
      <section className="pt-20 lg:pt-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>01 &nbsp; Work</Eyebrow>
            </div>
            <ol className="col-span-12 border-t border-line lg:col-span-9">
              {experience.map((e, i) => (
                <Reveal
                  key={e.organisation + e.start}
                  as="li"
                  delay={i * 60}
                  className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line py-8 lg:py-10"
                >
                  <div className="col-span-12 sm:col-span-3">
                    <p className="text-mono-sm tabular text-ink">
                      {e.start} — {e.end}
                    </p>
                    {e.type && <p className="text-mono-sm mt-1 text-ink-3">{e.type}</p>}
                    {e.location && <p className="text-mono-sm text-ink-3">{e.location}</p>}
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="text-h3 text-ink">{e.role}</h3>
                    <p className="mt-1 text-[15px] text-ink-2">
                      {e.url ? (
                        <a href={e.url} target="_blank" rel="noreferrer noopener" className="link-line">
                          {e.organisation}
                        </a>
                      ) : (
                        e.organisation
                      )}
                    </p>
                    <div className="mt-5 max-w-[62ch] space-y-3">
                      {e.summary.map((s, j) => (
                        <p key={j} className="text-[15px] leading-relaxed text-ink-2">
                          {s}
                        </p>
                      ))}
                    </div>
                    {e.technologies && e.technologies.length > 0 && (
                      <p className="text-mono-sm mt-6 text-ink-3">{e.technologies.join(" · ")}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Education ------------------------------------------------------ */}
      <section className="pt-20 lg:pt-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>02 &nbsp; Education</Eyebrow>
            </div>
            <ol className="col-span-12 border-t border-line lg:col-span-9">
              {education.map((e, i) => (
                <Reveal key={e.institution} as="li" delay={i * 60} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-line py-8">
                  <div className="col-span-12 sm:col-span-3">
                    <p className="text-mono-sm tabular text-ink">
                      {e.start} — {e.end}
                    </p>
                    {e.endNote && <p className="text-mono-sm mt-1 text-ink-3">{e.endNote}</p>}
                    {e.location && <p className="text-mono-sm text-ink-3">{e.location}</p>}
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="text-[1.125rem] font-medium tracking-[-0.015em] text-ink">{e.institution}</h3>
                    <p className="mt-1 text-[15px] text-ink-2">
                      {e.degree}
                      {e.field && ` in ${e.field}`}
                    </p>
                    {e.credentials?.map((c) => (
                      <p key={c.title} className="mt-3 text-[14px] text-ink-2">
                        <span className="text-ink-3">Credential — </span>
                        {c.title}, {c.year}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Achievements --------------------------------------------------- */}
      {achievements.length > 0 && (
        <section className="pt-20 lg:pt-32">
          <Container>
            <div className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-3">
                <Eyebrow>03 &nbsp; Achievements</Eyebrow>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <ol className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
                  {achievements.map((a, i) => (
                    <Reveal
                      key={i}
                      as="li"
                      delay={i * 80}
                      className="border-b border-line py-8 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:nth-child(n+2)]:pl-6"
                    >
                      <p className="text-mono-sm tabular text-ink-3">{a.date}</p>
                      <p className="mt-4 flex items-baseline gap-2 text-ink">
                        {a.prefix && <span className="text-label text-ink-3">{a.prefix}</span>}
                        <span className="text-h1 tabular">{a.figure}</span>
                        {a.suffix && <span className="text-mono-sm text-ink-3">{a.suffix}</span>}
                      </p>
                      <p className="mt-4 text-[15px] text-ink">{a.label}</p>
                      {a.detail && <p className="text-mono-sm text-ink-3">{a.detail}</p>}
                      {a.description && (
                        <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{a.description}</p>
                      )}
                      {a.url && (
                        <div className="mt-3">
                          <ArrowLink href={a.url} size="sm">
                            View
                          </ArrowLink>
                        </div>
                      )}
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Leadership & certifications ------------------------------------ */}
      <section className="pt-20 lg:pt-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>04 &nbsp; Leadership</Eyebrow>
            </div>
            <ol className="col-span-12 border-t border-line lg:col-span-9">
              {leadership.map((l, i) => (
                <Reveal
                  key={l.title}
                  as="li"
                  delay={i * 60}
                  className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-line py-7"
                >
                  <p className="text-mono-sm tabular col-span-12 text-ink-3 sm:col-span-3">{l.year}</p>
                  <div className="col-span-12 sm:col-span-9">
                    <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">{l.title}</h3>
                    <p className="mt-1 text-[15px] text-ink-2">{l.organisation}</p>
                    {l.detail && <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-ink-2">{l.detail}</p>}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>05 &nbsp; Certifications</Eyebrow>
            </div>
            <ul className="col-span-12 divide-y divide-line border-y border-line lg:col-span-9">
              {certifications.map((c, i) => (
                <Reveal key={c.title + i} as="li" delay={i * 50} className="grid grid-cols-12 gap-x-6 items-baseline py-5">
                  <span className="text-mono-sm tabular col-span-3 text-ink-3 sm:col-span-2">{c.year}</span>
                  <span className="col-span-7 text-[15px] text-ink">{c.title}</span>
                  <span className="col-span-2 text-mono-sm text-ink-3 sm:text-right">{c.issuer}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Skills --------------------------------------------------------- */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>06 &nbsp; What I build</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <ul className="divide-y divide-line border-y border-line">
                {skillGroups.map((g, i) => (
                  <Reveal key={g.title} as="li" delay={i * 60} className="grid grid-cols-12 gap-x-6 gap-y-4 py-8">
                    <div className="col-span-12 md:col-span-5">
                      <h3 className="text-h3 text-ink">{g.title}</h3>
                      <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ink-2">{g.description}</p>
                    </div>
                    <div className="col-span-12 flex flex-wrap content-start gap-2 md:col-span-7">
                      {g.technologies.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          <Rule className="mt-24 lg:mt-32" />
          <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-[15px] text-ink-2">
              The résumé is the concise, job-oriented version. The rest of this site is the broader one — the markets
              and operating work live on their own pages.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <ArrowLink href={profile.resume.href}>Open {profile.resume.label.toLowerCase()}</ArrowLink>
              <ArrowLink to="/markets">Markets</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
