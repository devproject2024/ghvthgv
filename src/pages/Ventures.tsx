import { businesses, venturesIntro } from "@/content";
import { DOMAINS } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Figure } from "@/components/Figure";
import { Container, Eyebrow, ArrowLink } from "@/components/primitives";
import { BusinessIndex } from "@/components/BusinessIndex";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export default function Ventures() {
  const feature = businesses.find((b) => b.featured) ?? businesses[0];

  return (
    <>
      <Meta
        title="Ventures"
        path="/ventures"
        description="Businesses and ventures Daiwik Rankawat operates and is involved with — including a restaurant venture."
      />

      <section className="pt-12 lg:pt-24">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 flex items-center gap-2 lg:col-span-3">
              <span className={cn("inline-block h-2 w-2 rounded-full", DOMAINS.ventures.dot)} />
              <Eyebrow>Ventures &amp; business</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline
                as="h1"
                text={"Businesses I operate\nand help build."}
                className="text-h1 max-w-[16ch] text-ink"
              />
              <Reveal delay={300}>
                <p className="text-lead mt-6 max-w-[52ch] text-ink-2">
                  {venturesIntro.body} Software products live under{" "}
                  <Link to="/work" className="link-line text-ink">
                    Work
                  </Link>
                  ; these are the operating businesses.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Featured venture — image-led */}
      {feature && (
        <section className="pt-14 lg:pt-20" aria-label="Featured venture">
          <Container>
            <Reveal>
              <Link
                to={`/ventures/${feature.slug}`}
                className="group grid grid-cols-12 items-end gap-x-6 gap-y-8 border-t border-line pt-8 lg:pt-12"
              >
                <div className="col-span-12 order-2 lg:order-1 lg:col-span-7">
                  <Figure
                    media={feature.cover ?? feature.logo}
                    aspect="16/10"
                    hover
                    placeholderLabel={feature.name}
                    placeholderNote="Photograph to be added"
                  />
                </div>
                <div className="col-span-12 order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
                  <div className="flex items-center gap-3 text-label text-ink-3">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("h-1.5 w-1.5 rounded-full", DOMAINS.ventures.dot)} />
                      Featured
                    </span>
                    <span aria-hidden>·</span>
                    <span>{feature.status}</span>
                  </div>
                  <h2 className="text-h2 mt-6 text-ink">{feature.name}</h2>
                  <p className="text-mono-sm mt-2 text-ink-3">{feature.category}</p>
                  <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink-2">{feature.description}</p>
                  <div className="mt-7">
                    <ArrowLink to={`/ventures/${feature.slug}`}>View venture</ArrowLink>
                  </div>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Index */}
      <section className="pb-24 pt-16 lg:pb-36 lg:pt-24" aria-label="All ventures">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
            <Eyebrow>All ventures</Eyebrow>
            <span className="text-label tabular text-ink-3">
              {String(businesses.length).padStart(2, "0")} venture{businesses.length === 1 ? "" : "s"}
            </span>
          </div>
          <BusinessIndex businesses={businesses} />
        </Container>
      </section>
    </>
  );
}
