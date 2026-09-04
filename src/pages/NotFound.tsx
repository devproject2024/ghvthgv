import { Meta } from "@/components/Meta";
import { ArrowLink, Container, Eyebrow } from "@/components/primitives";

export default function NotFound() {
  return (
    <>
      <Meta title="Not found" path="/404" description="Page not found." />
      <section className="pt-12 lg:pt-24">
        <Container>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-40">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>404</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 className="text-h1 max-w-[16ch] text-ink">This page doesn't exist — or hasn't been built yet.</h1>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <ArrowLink to="/">Home</ArrowLink>
                <ArrowLink to="/work">Work</ArrowLink>
                <ArrowLink to="/markets">Markets</ArrowLink>
                <ArrowLink to="/ventures">Ventures</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
