import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createWebPageSchema,
} from "@/lib/schemas";
import { getAllRealisations, formatDate } from "@/lib/realisations";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Portfolio de Jules Toussenel : sites vitrine, CRM sur mesure, plateformes SaaS, bots Telegram et solutions analytics. Projets livrés et en cours.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  const realisations = getAllRealisations();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/realisations" },
        ])}
      />
      <JsonLd
        data={createWebPageSchema({
          type: "CollectionPage",
          url: "/realisations",
          name: "Réalisations",
          description:
            "Portfolio de projets web réalisés par Jules Toussenel.",
        })}
      />
      <JsonLd
        data={createItemListSchema(
          realisations.map((project) => ({
            name: project.title,
            url: `https://julestoussenel.com${project.permalink}`,
          }))
        )}
      />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section
          className="pb-32 pt-32 md:pt-48"
          aria-labelledby="realisations-heading"
        >
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
              Portfolio
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="realisations-heading"
              className="mt-8 max-w-3xl font-serif font-light leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
            >
              Projets livr&eacute;s et en cours de d&eacute;veloppement.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-14 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={250}>
            <ul className="mt-14 border-t border-mist">
              {realisations.map((project, i) => (
                <li key={project.slug}>
                  <Link
                    href={project.permalink}
                    className="group block border-b border-mist py-10 transition-colors duration-500 hover:bg-chalk/50 md:py-12"
                    style={{
                      transitionTimingFunction: "var(--ease-luxury)",
                    }}
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs tabular-nums text-stone md:text-sm">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <h2
                              className="font-serif font-normal leading-[1.1] tracking-[-0.015em] transition-colors duration-500 group-hover:text-ochre"
                              style={{
                                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                                transitionTimingFunction: "var(--ease-luxury)",
                              }}
                            >
                              {project.title}
                            </h2>
                            {project.status === "en-cours" && (
                              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ochre">
                                <span className="relative inline-flex h-1.5 w-1.5">
                                  <span className="absolute inset-0 animate-ping rounded-full bg-ochre opacity-60" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ochre" />
                                </span>
                                en cours
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="mt-4 max-w-xl pl-0 font-sans text-sm leading-[1.75] text-ink/70 md:pl-12">
                          {project.description}
                        </p>
                        {project.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 md:pl-12">
                            {project.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] uppercase tracking-[0.1em] text-stone"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 pl-12 md:pl-0 md:text-right">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone/80">
                          {project.category}
                        </p>
                        <time
                          dateTime={project.date}
                          className="mt-2 block font-mono text-xs tabular-nums text-stone"
                        >
                          {formatDate(project.date)}
                        </time>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Discutons de votre projet</CtaLink>
              <CtaLink href="/">Retour &agrave; l&rsquo;accueil</CtaLink>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
