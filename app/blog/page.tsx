import type { Metadata } from "next";
import { Reveal, Rule } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";
import { getPublishedPosts } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur le developpement web, Next.js, TypeScript, IA et freelancing. Retours d'experience et guides techniques.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

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
            "Articles sur le developpement web, Next.js, TypeScript, IA et freelancing.",
        })}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
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
              Notes, retours d&apos;experience et reflexions techniques.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          {posts.length > 0 ? (
            <Reveal delay={250}>
              <div className="mt-12">
                <BlogPostList posts={posts} />
              </div>
            </Reveal>
          ) : (
            <Reveal delay={250}>
              <p className="mt-12 font-sans text-lg text-dark-chocolate/60">
                Aucun article pour le moment. Revenez bientot.
              </p>
            </Reveal>
          )}
        </section>
      </main>
    </>
  );
}
