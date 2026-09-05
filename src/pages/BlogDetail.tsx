import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getBlog, relatedBlogs, blogs, type Domain } from "@/content";
import { DOMAINS } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { Figure } from "@/components/Figure";
import { Container, Eyebrow, Rule } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { BlogBlocks, formatDate } from "@/components/BlogBlocks";
import { cn } from "@/utils/cn";

const CATEGORY_DOMAIN: Record<string, Domain> = {
  Research: "tech",
  "AI / ML": "tech",
  Software: "tech",
  Markets: "markets",
  Business: "ventures",
  Notes: "editorial",
  Personal: "editorial",
};

export default function BlogDetail() {
  const { slug = "" } = useParams();
  const post = getBlog(slug);

  useEffect(() => {
    if (post?.externalUrl) window.location.href = post.externalUrl;
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const domain = CATEGORY_DOMAIN[post.category] ?? "editorial";
  const related = relatedBlogs(post.slug);
  const number = String(blogs.findIndex((b) => b.slug === post.slug) + 1).padStart(2, "0");

  return (
    <article>
      <Meta title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} />

      {/* Header */}
      <section className="pt-10 lg:pt-20">
        <Container>
          <Reveal className="flex items-center justify-between text-label text-ink-3">
            <Link to="/blog" className="link-line inline-flex items-center gap-2 text-ink-2 hover:text-ink">
              <span aria-hidden>←</span> Blog
            </Link>
            <span className="tabular">{number}</span>
          </Reveal>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-12 pt-12 lg:pb-16 lg:pt-20">
            <div className="col-span-12 lg:col-span-9">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 text-label text-ink-3">
                  <span className="inline-flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
                    {post.category}
                  </span>
                  {post.demo && <span className="border border-line px-1.5 py-0.5">Demo research</span>}
                  <span aria-hidden>·</span>
                  <span className="tabular">{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span className="tabular">{post.readTime} min read</span>
                </div>
                <h1 className="text-h1 mt-6 max-w-[20ch] text-ink">{post.title}</h1>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-lead mt-6 max-w-[56ch] text-ink-2">{post.excerpt}</p>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-mono-sm mt-6 text-ink-3">
                  {post.author ?? "Daiwik Rankawat"}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Cover */}
      {post.cover && (
        <section>
          <Container>
            <Figure
              media={post.cover}
              aspect="16/8"
              priority
              placeholderLabel={post.title}
              placeholderNote="Cover image to be added"
            />
          </Container>
        </section>
      )}

      {/* Body */}
      {post.content && (
        <section className="py-20 lg:py-28">
          <Container>
            <Reveal>
              <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                  <BlogBlocks blocks={post.content} />
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="pb-16">
          <Container>
            <Rule />
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <Eyebrow className="mr-2">Tags</Eyebrow>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-mono-sm inline-flex h-7 items-center border border-line px-2.5 text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line py-20 lg:py-28">
          <Container>
            <Eyebrow className="mb-10">Continue reading</Eyebrow>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
              {related.map((r) => (
                <Reveal key={r.slug}>
                  <Link to={`/blog/${r.slug}`} className="group block">
                    <div className="flex items-center gap-3 text-label text-ink-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", DOMAINS[CATEGORY_DOMAIN[r.category] ?? "editorial"].dot)}
                        />
                        {r.category}
                      </span>
                      <span aria-hidden>·</span>
                      <span className="tabular">{formatDate(r.date)}</span>
                    </div>
                    <h3 className="text-h3 mt-3 max-w-[30ch] text-ink">{r.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{r.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

