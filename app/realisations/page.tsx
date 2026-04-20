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
        <section className="pb-32 pt-32 md:pt-48" aria-labelledby="realisations-heading">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Portfolio
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="realisations-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Projets livr&eacute;s et en cours de d&eacute;veloppement.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={250}>
            <ul className="mt-12 border-t border-rule-light">
              {realisations.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={project.permalink}
                    className="group block border-b border-rule-light py-8 transition-colors duration-300"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h2
                            className="font-normal transition-colors duration-300 group-hover:text-camel"
                            style={{
                              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                            }}
                          >
                            {project.title}
                          </h2>
                          {project.status === "en-cours" && (
                            <span className="font-sans text-[10px] uppercase tracking-[0.1em] text-camel">
                              en cours
                            </span>
                          )}
                        </div>
                        <p className="mt-2 max-w-xl font-sans text-sm leading-[1.6] text-dark-chocolate/60">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] text-taupe"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0 md:text-right">
                        <p className="font-sans text-[11px] uppercase tracking-[0.1em] text-taupe/60">
                          {project.category}
                        </p>
                        <time dateTime={project.date} className="mt-1 block font-mono text-xs text-taupe">
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
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Discutons de votre projet</CtaLink>
              <CtaLink href="/">Retour &agrave; l&rsquo;accueil</CtaLink>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
