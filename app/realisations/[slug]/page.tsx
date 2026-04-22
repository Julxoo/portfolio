import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, Rule, CtaLink, ScrollProgress } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createProjectSchema,
} from "@/lib/schemas";
import {
  getAllRealisations,
  getNextRealisation,
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

  const nextProject = getNextRealisation(slug);

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

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Hero ── */}
        <header className="pt-28 md:pt-40 lg:pt-48">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                {project.category}
              </p>
              {project.status === "en-cours" && (
                <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ochre">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-ochre opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ochre" />
                  </span>
                  En cours
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="mt-8 max-w-4xl font-serif font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-[1.8] text-ink/75 md:mt-10 md:text-lg">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-mist pt-10 md:mt-16 md:grid-cols-4 md:gap-10">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                  Livr&eacute;
                </dt>
                <dd className="mt-3 font-serif text-xl font-normal tracking-[-0.015em] text-ink">
                  <time dateTime={project.date}>
                    {formatDate(project.date)}
                  </time>
                </dd>
              </div>
              {project.client && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                    Client
                  </dt>
                  <dd className="mt-3 font-serif text-xl font-normal tracking-[-0.015em] text-ink">
                    {project.client}
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                  Cat&eacute;gorie
                </dt>
                <dd className="mt-3 font-serif text-xl font-normal tracking-[-0.015em] text-ink">
                  {project.category}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                  Lecture
                </dt>
                <dd className="mt-3 font-serif text-xl font-normal tracking-[-0.015em] text-ink">
                  {project.metadata.readingTime}&nbsp;min
                </dd>
              </div>
            </dl>
          </Reveal>

          {project.tags.length > 0 && (
            <Reveal delay={400}>
              <div className="mt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                  Stack
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-mist px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/75 transition-colors duration-300 hover:border-ochre hover:text-ochre"
                      style={{ transitionTimingFunction: "var(--ease-hover)" }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {project.url && (
            <Reveal delay={500} direction="left">
              <div className="mt-12">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="realisation-external"
                  className="group inline-flex items-center gap-3 bg-ochre px-7 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-bone transition-all duration-300 hover:bg-ink active:scale-[0.98]"
                  style={{ transitionTimingFunction: "var(--ease-hover)" }}
                >
                  Voir le site en production
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    &#8599;
                  </span>
                </a>
              </div>
            </Reveal>
          )}

          <Reveal delay={600} direction="wipe">
            <div className="mt-16 w-16 md:mt-24 md:w-24">
              <Rule />
            </div>
          </Reveal>
        </header>

        {/* ── Content with sticky TOC on desktop ── */}
        <div className="pb-20 pt-12 md:grid md:grid-cols-[220px_1fr] md:gap-16 md:pb-28 md:pt-16 lg:grid-cols-[240px_1fr] lg:gap-20">
          {project.toc && project.toc.length > 0 && (
            <aside className="mb-8 md:mb-0">
              <div className="md:sticky md:top-28">
                <Toc items={project.toc} />
              </div>
            </aside>
          )}

          <article className="min-w-0 max-w-3xl">
            <Reveal delay={100}>
              <MdxContent code={project.content} />
            </Reveal>
          </article>
        </div>

        {/* ── Next project ── */}
        {nextProject && (
          <Reveal direction="wipe">
            <Link
              href={nextProject.permalink}
              data-track="realisation-next"
              className="group relative block border-y border-mist py-12 transition-colors duration-500 hover:bg-chalk/50 md:py-16"
              style={{ transitionTimingFunction: "var(--ease-luxury)" }}
            >
              <div className="flex items-baseline justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                    Projet suivant
                  </p>
                  <h2
                    className="mt-4 font-serif font-normal leading-[1.1] tracking-[-0.02em] transition-colors duration-500 group-hover:text-ochre"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                      transitionTimingFunction: "var(--ease-luxury)",
                    }}
                  >
                    {nextProject.title}
                  </h2>
                  <p className="mt-4 max-w-2xl font-sans text-sm leading-[1.75] text-ink/65">
                    {nextProject.description}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif text-3xl text-ochre transition-transform duration-500 group-hover:translate-x-2 md:text-4xl"
                  style={{ transitionTimingFunction: "var(--ease-luxury)" }}
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* ── CTA final ── */}
        <section
          className="pb-20 pt-16 md:pb-32 md:pt-24"
          aria-labelledby="realisation-cta-heading"
        >
          <Reveal delay={100}>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
              Et vous&thinsp;?
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="realisation-cta-heading"
              className="max-w-3xl font-serif font-light leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Un projet dans le m&ecirc;me esprit&thinsp;? Parlons-en.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-ink/70">
              Premier &eacute;change gratuit, sans engagement. Devis clair sous
              24h.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-12 space-y-3">
              <a
                href="mailto:toussenelj@gmail.com?subject=Prise%20de%20contact&amp;body=Salut%20Jules%20!%0A%0AJ%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%0A%0A%C3%80%20bient%C3%B4t%20!"
                data-track="cta"
                data-track-label="Realisation CTA Email"
                className="block font-serif font-light tracking-[-0.02em] text-ink transition-colors duration-300 hover:text-ochre"
                style={{
                  fontSize: "clamp(1.35rem, 2.8vw, 2.25rem)",
                  transitionTimingFunction: "var(--ease-hover)",
                }}
              >
                toussenelj@gmail.com
              </a>
              <a
                href="sms:0614533229?body=Salut%20Jules%20!%20J%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%20%C3%80%20bient%C3%B4t%20!"
                data-track="cta"
                data-track-label="Realisation CTA SMS"
                className="block font-sans text-sm text-ink/60 transition-colors duration-300 hover:text-ochre"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                06 14 53 32 29
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/realisations">
                Toutes les r&eacute;alisations
              </CtaLink>
              <CtaLink href="/">Retour &agrave; l&rsquo;accueil</CtaLink>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
