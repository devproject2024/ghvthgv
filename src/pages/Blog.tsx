import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { blogCategories, blogs, sortedBlogs, type Domain } from "@/content";
import { DOMAINS } from "@/content/domains";
import { Meta } from "@/components/Meta";
import { SplitHeadline } from "@/components/SplitHeadline";
import { Figure } from "@/components/Figure";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { formatDate } from "@/components/BlogBlocks";
import { cn } from "@/utils/cn";

/** Blog categories share the four-domain colour language. */
const CATEGORY_DOMAIN: Record<string, Domain> = {
  Research: "tech",
  "AI / ML": "tech",
  Software: "tech",
  Markets: "markets",
  Business: "ventures",
  Notes: "editorial",
  Personal: "editorial",
};

export default function Blog() {
  const cats = blogCategories();
  const [filter, setFilter] = useState<string>("All");
  const posts = useMemo(
    () => (filter === "All" ? sortedBlogs() : sortedBlogs().filter((b) => b.category === filter)),
    [filter]
  );
  const [feature, ...rest] = posts;

  return (
    <>
      <Meta
        title="Blog & research"
        path="/blog"
        description="Writing and research by Daiwik Rankawat — machine learning, time-series, software, markets and business observations."
      />

      <section className="pt-12 lg:pt-24">
        <Container>
          <Reveal className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>Blog &amp; research</Eyebrow>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <SplitHeadline
                as="h1"
                text={"Notes on what I'm\nbuilding and learning."}
                className="text-h1 max-w-[18ch] text-ink"
              />
              <Reveal delay={300}>
                <p className="text-lead mt-6 max-w-[52ch] text-ink-2">
                  Research, technical notes and observations on machine learning, software, markets and operating
                  businesses. New writing appears here as it's ready.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Featured article */}
      {feature && filter === "All" && (
        <section className="pt-14 lg:pt-20" aria-label="Featured writing">
          <Container>
            <Reveal>
              <PostCard post={feature} featured />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Filters + list */}
      <section className="pb-24 pt-16 lg:pb-36 lg:pt-20" aria-label="All articles">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-6 lg:mb-14">
            <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              {["All", ...cats].map((c) => {
                const active = filter === c;
                const domain = c === "All" ? "editorial" : (CATEGORY_DOMAIN[c] ?? "editorial");
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={active}
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
            <span className="text-label tabular text-ink-3">
              {String(posts.length).padStart(2, "0")} article{posts.length === 1 ? "" : "s"}
            </span>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {(filter === "All" ? rest : posts).map((post, i) => (
                <Reveal key={post.slug} delay={(i % 2) * 70}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-line px-6 py-14 text-center">
              <p className="mx-auto max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
                Writing is coming together. Research, notes and long-form ideas in this category will appear here.
              </p>
            </div>
          )}

          {blogs.length === 0 && (
            <p className="text-mono-sm mt-8 text-center text-ink-3">
              Add articles in <code className="font-mono">src/content/blogs.ts</code>.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

function PostCard({
  post,
  featured,
}: {
  post: (typeof blogs)[number];
  featured?: boolean;
}) {
  const domain = CATEGORY_DOMAIN[post.category] ?? "editorial";
  const target = post.externalUrl ?? `/blog/${post.slug}`;
  const inner = (
    <>
      <div className={cn("overflow-hidden border border-line", featured ? "aspect-[16/8]" : "aspect-[16/10]")}>
        <Figure
          media={post.cover}
          aspect={featured ? "16/8" : "16/10"}
          hover
          reveal={false}
          placeholderLabel={post.title}
          placeholderNote="Cover image to be added"
        />
      </div>

      <div className={cn(featured ? "mt-8 grid grid-cols-12 gap-x-6" : "mt-5")}>
        <div className={cn(featured && "col-span-12 lg:col-span-8")}>
          <div className="flex items-center gap-3 text-label text-ink-3">
            <span className="inline-flex items-center gap-2">
              <span className={cn("h-1.5 w-1.5 rounded-full", DOMAINS[domain].dot)} />
              {post.category}
            </span>
            {post.demo && <span className="border border-line px-1.5 py-0.5">demo</span>}
            <span aria-hidden>·</span>
            <span className="tabular">{formatDate(post.date)}</span>
          </div>
          <h2
            className={cn(
              "mt-3 font-medium tracking-[-0.02em] text-ink transition-colors group-hover:text-ink-2",
              featured ? "text-h2 max-w-[22ch]" : "text-h3 max-w-[28ch]"
            )}
          >
            {post.title}
          </h2>
          <p className={cn("mt-3 leading-relaxed text-ink-2", featured ? "text-lead max-w-[54ch]" : "text-[15px] max-w-[48ch]")}>
            {post.excerpt}
          </p>
          <p className="text-mono-sm mt-5 flex items-center gap-2 text-ink-3">
            <span className="tabular">{post.readTime} min read</span>
            {post.externalUrl && (
              <>
                <span aria-hidden>·</span>
                <span>external</span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );

  if (post.externalUrl) {
    return (
      <a
        href={post.externalUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={target} className="group block">
      {inner}
    </Link>
  );
}

