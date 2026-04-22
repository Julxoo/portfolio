import type { Metadata } from "next";
import { Reveal, Rule } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Jules Toussenel pour votre projet web. Devis gratuit, sans engagement, réponse sous 24h. Aix-en-Provence et toute la France.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={createWebPageSchema({
          type: "ContactPage",
          url: "/contact",
          name: "Contact · Jules Toussenel",
          description:
            "Contactez Jules Toussenel pour votre projet web.",
        })}
      />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 md:px-12">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Contact
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1
            id="contact-heading"
            className="mt-8 max-w-3xl font-serif font-light leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)" }}
          >
            Un projet en t&ecirc;te&thinsp;? Parlons-en.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 font-sans text-sm text-ink/65">
            Devis gratuit, sans engagement. R&eacute;ponse sous 24h.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-12 w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-12 space-y-4">
            <a
              href="mailto:toussenelj@gmail.com?subject=Prise%20de%20contact&amp;body=Salut%20Jules%20!%0A%0AJ%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%0A%0A%C3%80%20bient%C3%B4t%20!"
              data-track="cta"
              data-track-label="Contact Email"
              className="group inline-flex items-baseline gap-3 font-serif font-light tracking-[-0.02em] text-ink transition-colors duration-300 hover:text-ochre"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              toussenelj@gmail.com
              <span
                aria-hidden="true"
                className="text-ochre transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <a
              href="sms:0614533229?body=Salut%20Jules%20!%20J%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%20%C3%80%20bient%C3%B4t%20!"
              data-track="cta"
              data-track-label="Contact SMS"
              className="block font-sans text-sm text-ink/60 transition-colors duration-300 hover:text-ochre"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              06 14 53 32 29
            </a>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-mist pt-6 font-sans text-sm">
            <a
              href="https://github.com/Julxoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone transition-colors duration-300 hover:text-ochre"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/julestoussenel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone transition-colors duration-300 hover:text-ochre"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              LinkedIn
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone/70">
              Aix-en-Provence &middot; disponible partout en France
            </span>
          </div>
        </Reveal>
      </div>
    </>
  );
}
