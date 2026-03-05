import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal, Rule, CtaLink, ScrollProgress } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createProjectSchema,
} from "@/lib/schemas";
import {
  getAllRealisations,
  getRealisationBySlug,
  formatDate,
} from "@/lib/realisations";
import { MdxContent } from "@/components/mdx";
import { Toc } from "@/components/mdx/toc";

interface RealisationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RealisationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getRealisationBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/realisations/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: `https://julestoussenel.com/realisations/${project.slug}`,
      locale: "fr_FR",
      siteName: "Jules Toussenel",
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllRealisations().map((r) => ({ slug: r.slug }));
}

export default async function RealisationPage({
  params,
}: RealisationPageProps) {
  const { slug } = await params;
  const project = getRealisationBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <ScrollProgress />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
          { name: project.title, path: `/realisations/${project.slug}` },
        ])}
      />
      <JsonLd
        data={createProjectSchema({
          title: project.title,
          description: project.description,
          slug: project.slug,
          date: project.date,
          tags: project.tags,
        })}
      />

      <div className="mx-auto max-w-3xl px-6 md:px-12">
        {/* Header */}
        <header className="pt-32 md:pt-48">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
                {project.category}
              </p>
              {project.status === "en-cours" && (
                <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-camel">
                  en cours
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="mt-6 font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-taupe">
              <time dateTime={project.date}>{formatDate(project.date)}</time>
              {project.client && (
                <>
                  <span aria-hidden="true">.</span>
                  <span>{project.client}</span>
                </>
              )}
              <span aria-hidden="true">.</span>
              <span>{project.metadata.readingTime} min de lecture</span>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] text-taupe/70">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {project.url && (
            <Reveal delay={300}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-sans text-sm text-camel transition-colors duration-300 hover:text-dark-chocolate"
              >
                Voir le site en production
                <span aria-hidden="true" className="text-xs">&#8599;</span>
              </a>
            </Reveal>
          )}

          <Reveal delay={350}>
            <div className="mt-10 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>
        </header>

        {/* Article */}
        <article className="pb-16 pt-8">
          {project.toc && project.toc.length > 0 && (
            <Toc items={project.toc} />
          )}
          <MdxContent code={project.content} />
        </article>

        {/* Footer CTA */}
        <section className="pb-32">
          <Rule />
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <CtaLink href="/realisations">Toutes les réalisations</CtaLink>
            <CtaLink href="/contact">Me contacter</CtaLink>
          </div>
        </section>
      </div>
    </>
  );
}
