import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, CtaLink } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createItemListSchema,
  createWebPageSchema,
} from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Découvrez mes services : sites vitrine, sites d'annonces avec back-office, identité visuelle et bots Telegram. Prix transparents, livraison rapide.",
  alternates: { canonical: "/services" },
};

const services = [
  { slug: "identite-visuelle", title: "Identit\u00e9 visuelle", price: "150", label: "prix fixe" },
  { slug: "site-vitrine", title: "Site vitrine", price: "500", label: "\u00e0 partir de" },
  { slug: "site-annonces", title: "Site d\u2019annonces", price: "1\u2009500", label: "\u00e0 partir de" },
  { slug: "bot-affiliation", title: "Bot d\u2019affiliation", price: "350", label: "\u00e0 partir de" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={createWebPageSchema({
          url: "/services",
          name: "Services",
          description:
            "Découvrez mes services : sites vitrine, sites d'annonces avec back-office, identité visuelle et bots Telegram. Prix transparents, livraison rapide.",
        })}
      />
      <JsonLd
        data={createItemListSchema(
          services.map((s) => ({
            name: s.title,
            url: `https://julestoussenel.com/services/${s.slug}`,
          }))
        )}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <section className="pb-32 pt-32 md:pt-48" aria-labelledby="services-heading">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Services
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="services-heading"
              className="font-normal max-w-3xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Des solutions sur-mesure pour les ind&eacute;pendants et les entreprises.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-12 border-t border-rule-light">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between border-b border-rule-light py-5 transition-colors duration-300 hover:text-camel"
                  >
                    <span
                      className="font-normal"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                    >
                      {service.title}
                    </span>
                    <span className="ml-4 text-right">
                      <span className="block font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                        {service.label}
                      </span>
                      <span className="font-serif text-2xl text-dark-chocolate transition-colors duration-300 group-hover:text-camel">
                        {service.price}&thinsp;€
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12">
              <CtaLink href="/contact">Parlons-en</CtaLink>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
