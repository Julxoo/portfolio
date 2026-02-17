import type { Metadata } from "next";
import { Reveal, Rule } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Jules Toussenel pour votre projet web. Devis gratuit, sans engagement, r\u00e9ponse sous 24h. Aix-en-Provence et toute la France.",
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
          name: "Contact \u00b7 Jules Toussenel",
          description:
            "Contactez Jules Toussenel pour votre projet web.",
        })}
      />
      <main className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 md:px-12">
        <Reveal>
          <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
            Contact
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1
            id="contact-heading"
            className="max-w-3xl font-normal"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Un projet en t&ecirc;te&thinsp;? Parlons-en.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 font-sans text-sm text-dark-chocolate/60">
            Devis gratuit, sans engagement. R&eacute;ponse sous 24h.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 space-y-4">
            <a
              href="mailto:toussenelj@gmail.com?subject=Prise%20de%20contact&amp;body=Salut%20Jules%20!%0A%0AJ%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%0A%0A%C3%80%20bient%C3%B4t%20!"
              className="block transition-colors duration-300 hover:text-camel"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              toussenelj@gmail.com
            </a>
            <a
              href="sms:0614533229?body=Salut%20Jules%20!%20J%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%20%C3%80%20bient%C3%B4t%20!"
              className="block font-sans text-sm text-dark-chocolate/60 transition-colors duration-300 hover:text-camel"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              06 14 53 32 29
            </a>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-sans text-sm">
            <a
              href="https://github.com/Julxoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-taupe transition-colors duration-300 hover:text-camel"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/julestoussenel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-taupe transition-colors duration-300 hover:text-camel"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              LinkedIn
            </a>
            <span className="text-taupe/40">
              Aix-en-Provence &middot; disponible partout en France
            </span>
          </div>
        </Reveal>
      </main>
    </>
  );
}
