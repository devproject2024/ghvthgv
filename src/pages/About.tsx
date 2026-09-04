import { education, profile, ventures, venturesIntro } from "@/content";
import { Figure } from "@/components/Figure";
import { usePageTitle } from "@/components/Layout";
import { ArrowLink, Container, Eyebrow, Rule, SectionHeader } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export default function About() {
  usePageTitle("About");
  const aboutPhotos = profile.photos.filter((p) => p.placement === "about" || p.placement === "any");
  const primary = aboutPhotos[0];
  const secondary = aboutPhotos[1];

  return (
    <>
      {/* Intro ---------------------------------------------------------- */}
      <section className="pt-12 lg:pt-24">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>About</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 className="text-h1 max-w-[22ch] text-ink">{profile.aboutIntro}</h1>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Photographs ---------------------------------------------------- */}
      <section className="pt-16 lg:pt-24">
        <Container>
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-8">
              <Figure
                media={primary}
                aspect="3/2"
                cutout={primary?.cutout}
                priority
                placeholderLabel={profile.name}
                placeholderNote="Photograph to be added"
                showCaption
              />
            </div>
            <div className="col-span-8 col-start-5 md:col-span-4 md:col-start-9">
              <Figure
                media={secondary}
                aspect="4/5"
                cutout={secondary?.cutout}
                placeholderLabel={profile.name}
                placeholderNote="Photograph to be added"
                showCaption
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Biography ------------------------------------------------------ */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-12">
            <Reveal className="col-span-12 lg:col-span-3">
              <Eyebrow className="mb-6">In short</Eyebrow>
              <dl className="divide-y divide-line border-y border-line">
                {profile.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-3 gap-3 py-3">
                    <dt className="text-mono-sm text-ink-3">{f.label}</dt>
                    <dd className="col-span-2 text-[14px] leading-snug text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={80} className="col-span-12 lg:col-span-7 lg:col-start-5">
              <div className="space-y-6">
                {profile.bio.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-lead max-w-[56ch] text-ink" : "max-w-[62ch] text-[17px] leading-[1.65] text-ink-2"}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                <div>
                  <Eyebrow className="mb-4">Currently</Eyebrow>
                  <ul className="space-y-2.5">
                    {profile.currently.map((c) => (
                      <li key={c.label} className="text-[15px] leading-snug text-ink">
                        <span className="text-ink-3">{c.label} — </span>
                        {c.value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Eyebrow className="mb-4">Interested in</Eyebrow>
                  <ul className="space-y-2.5">
                    {profile.interests.map((it) => (
                      <li key={it} className="text-[15px] leading-snug text-ink">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Beyond software ------------------------------------------------ */}
      <section className="bg-carbon py-24 text-chalk lg:py-36">
        <Container>
          <Reveal>
            <SectionHeader
              dark
              eyebrow={venturesIntro.eyebrow}
              title={venturesIntro.title}
              lead={venturesIntro.body}
              className="mb-16 lg:mb-24"
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {ventures.map((v, i) => (
              <Reveal key={v.name} delay={(i % 3) * 70} className="border-t border-carbon-line pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-label tabular text-chalk-2">0{i + 1}</span>
                  {v.status && <span className="text-label text-chalk-2">{v.status}</span>}
                </div>
                <h3 className="text-h3 mt-6 text-chalk">{v.name}</h3>
                <p className="text-mono-sm mt-1 text-chalk-2">{v.role}</p>
                <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-chalk-2">{v.description}</p>
                {v.detail?.map((d, j) => (
                  <p key={j} className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-chalk-2">
                    {d}
                  </p>
                ))}
                {v.url && (
                  <div className="mt-6">
                    <ArrowLink href={v.url} dark size="sm">
                      Visit
                    </ArrowLink>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Education ------------------------------------------------------ */}
      <section className="py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-3">
              <Eyebrow>Education</Eyebrow>
            </Reveal>
            <div className="col-span-12 lg:col-span-9">
              <ul className="divide-y divide-line border-y border-line">
                {education.map((e, i) => (
                  <Reveal key={e.institution} as="li" delay={i * 60} className="grid grid-cols-12 gap-x-6 gap-y-2 py-6">
                    <p className="text-mono-sm tabular col-span-12 text-ink-3 sm:col-span-3">
                      {e.start} — {e.end}
                      {e.endNote && <span className="block text-ink-3/80">{e.endNote}</span>}
                    </p>
                    <div className="col-span-12 sm:col-span-9">
                      <h3 className="text-[1.125rem] font-medium tracking-[-0.015em] text-ink">{e.institution}</h3>
                      <p className="mt-1 text-[15px] text-ink-2">
                        {e.degree}
                        {e.field && `, ${e.field}`}
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
              </ul>
              <div className="mt-8">
                <ArrowLink to="/experience">Experience, achievements and skills</ArrowLink>
              </div>
            </div>
          </div>
          <Rule className="mt-24 lg:mt-32" />
        </Container>
      </section>

      {/* Closing -------------------------------------------------------- */}
      <section className="pb-24 lg:pb-36">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="text-h2 max-w-[20ch] text-ink">
                The short version: I like building things that work, and understanding why they do.
              </h2>
            </div>
            <div className="col-span-12 flex items-end lg:col-span-3 lg:col-start-10">
              <ArrowLink to="/contact" size="lg">
                Get in touch
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
