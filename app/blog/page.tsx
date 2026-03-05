import type { Metadata } from "next";
import { Reveal, Rule } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";
import { getPublishedPosts } from "@/lib/blog";
import type { PostSummary } from "@/lib/blog";
import { BlogSearchView } from "@/components/blog/blog-search-view";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur le développement web, Next.js, TypeScript, IA et freelancing. Retours d'expérience et guides techniques.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  const summaries: PostSummary[] = posts.map(
    ({ title, description, keyword, category, tags, date, slug, permalink, metadata }) => ({
      title,
      description,
      keyword,
      category,
      tags,
      date,
      slug,
      permalink,
      metadata,
    })
  );

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <JsonLd
        data={createWebPageSchema({
          type: "CollectionPage",
          url: "/blog",
          name: "Blog",
          description:
            "Articles sur le développement web, Next.js, TypeScript, IA et freelancing.",
        })}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section className="pb-32 pt-32 md:pt-48" aria-labelledby="blog-page-heading">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Blog
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="blog-page-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Notes, retours d&apos;expérience et réflexions techniques.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-12">
              <BlogSearchView posts={summaries} categories={categories} />
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
