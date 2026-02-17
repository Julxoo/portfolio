import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createBlogPostSchema,
  createFaqSchema,
} from "@/lib/schemas";
import {
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { MdxContent } from "@/components/mdx";
import { Toc } from "@/components/mdx/toc";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;

  return {
    title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url: `https://julestoussenel.com/blog/${post.slug}`,
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: ["Jules Toussenel"],
      tags: post.tags,
      locale: "fr_FR",
      siteName: "Jules Toussenel",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <JsonLd
        data={createBlogPostSchema({
          title: post.seoTitle ?? post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
          updated: post.updated,
          category: post.category,
          tags: post.tags,
          wordCount: post.metadata.wordCount,
        })}
      />
      {post.faq.length > 0 && <JsonLd data={createFaqSchema(post.faq)} />}

      <main className="mx-auto max-w-3xl px-6 md:px-12">
        {/* Header */}
        <header className="pt-32 md:pt-48">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              {post.category}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-taupe">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  <span aria-hidden="true">.</span>
                  <span>mis a jour le <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
                </>
              )}
              <span aria-hidden="true">.</span>
              <span>{post.metadata.readingTime} min de lecture</span>
            </div>
            <address className="mt-2 font-sans text-xs not-italic text-taupe/70">
              Par Jules Toussenel
            </address>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article className="pb-16 pt-8">
          {post.toc && post.toc.length > 0 && <Toc items={post.toc} />}
          <MdxContent code={post.content} />
        </article>

        {/* FAQ Section */}
        {post.faq.length > 0 && (
          <section className="pb-16" aria-labelledby="faq-heading">
            <Rule />
            <h2
              id="faq-heading"
              className="mb-8 mt-10 font-normal"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Questions frequentes
            </h2>
            <dl className="border-t border-rule-light">
              {post.faq.map((item, i) => (
                <div key={i} className="border-b border-rule-light py-5">
                  <dt className="font-sans text-sm font-medium text-dark-chocolate">
                    {item.question}
                  </dt>
                  <dd className="mt-2 font-sans text-sm leading-[1.7] text-dark-chocolate/70">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="pb-16" aria-label="Articles lies">
            <Rule />
            <p className="mb-6 mt-10 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Articles lies
            </p>
            <ul className="border-t border-rule-light">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={rel.permalink}
                    className="group flex items-baseline justify-between border-b border-rule-light py-5 transition-colors duration-300"
                  >
                    <span
                      className="font-normal transition-colors duration-300 group-hover:text-camel"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.15rem)",
                      }}
                    >
                      {rel.title}
                    </span>
                    <time dateTime={rel.date} className="ml-4 shrink-0 font-mono text-xs text-taupe">
                      {formatDate(rel.date)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer CTA */}
        <section className="pb-32">
          <Rule />
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <CtaLink href="/blog">Tous les articles</CtaLink>
            <CtaLink href="/contact">Me contacter</CtaLink>
          </div>
        </section>
      </main>
    </>
  );
}
