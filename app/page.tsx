import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";
import { getLatestPosts } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: {
    absolute:
      "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence",
  },
  description:
    "Développeur web freelance à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation augmentés par l'IA.",
  alternates: {
    canonical: "/",
  },
};

const homePageSchema = createWebPageSchema({
  url: "/",
  name: "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence",
  description:
    "Développeur web freelance à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation augmentés par l'IA.",
});

const homeBreadcrumbSchema = createBreadcrumbSchema([
  { name: "Accueil", path: "/" },
]);

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <JsonLd data={homePageSchema} />
      <JsonLd data={homeBreadcrumbSchema} />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
      {/* ── Hero ── */}
      <section className="flex min-h-[100svh] flex-col pb-12 pt-40 md:pt-48" aria-labelledby="hero-heading">
        <div className="flex flex-1 items-center">
          <div>
            <Reveal>
              <h1
                id="hero-heading"
                className="font-normal"
                style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
              >
                Jules
                <br />
                Toussenel
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 w-16 md:w-24">
                <Rule />
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-8 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
                AI-Augmented Software Engineer
              </p>
              <p className="mt-1.5 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe/60">
                Aix-en-Provence
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={450}>
          <div className="mb-8">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 border border-rule-light px-6 py-3.5 font-sans text-[12px] uppercase tracking-[0.1em] text-dark-chocolate transition-all duration-400 hover:border-camel hover:text-camel"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              D&eacute;couvrir mes services
              <span className="text-camel transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <nav className="flex flex-col gap-3 md:flex-row md:gap-10">
            <CtaLink href="/realisations">R&eacute;alisations</CtaLink>
            <CtaLink href="/a-propos">Me d&eacute;couvrir</CtaLink>
            <CtaLink href="/contact">Contact</CtaLink>
          </nav>
        </Reveal>
      </section>

      {/* ── Derniers articles ── */}
      {latestPosts.length > 0 && (
        <section className="pb-32" aria-labelledby="blog-heading">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-6 mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Blog
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="blog-heading"
              className="mb-10 max-w-2xl font-normal"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Derniers articles
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <BlogPostList posts={latestPosts} />
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8">
              <CtaLink href="/blog">Tous les articles</CtaLink>
            </div>
          </Reveal>
        </section>
      )}
    </main>
    </>
  );
}
