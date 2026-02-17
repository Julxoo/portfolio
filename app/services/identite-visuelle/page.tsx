import type { Metadata } from "next";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { FloatingDevis } from "@/components/ui/floating-devis";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schemas";
import { getPostsByCategory } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Identité visuelle sur mesure",
  description:
    "Identité visuelle complète : palette, typographie, composants, animations. 150 € tout compris, livrée en 48h. Freelance à Aix-en-Provence.",
  alternates: { canonical: "/services/identite-visuelle" },
};

const includes = [
  "Analyse de votre marque, votre vision, votre positionnement",
  "Recherche d\u2019inspirations et moodboard sur-mesure",
  "Palette de couleurs compl\u00e8te : principales, accents, fonctionnelles",
  "Syst\u00e8me typographique : polices, \u00e9chelle, hi\u00e9rarchie",
  "Direction artistique des composants : navigation, sections, liens, s\u00e9parateurs",
  "Courbes d\u2019animation et micro-interactions",
  "Grille d\u2019espacement coh\u00e9rente",
  "Page design system en ligne, consultable \u00e0 tout moment",
];

const steps = [
  {
    number: "01",
    title: "\u00c9change",
    description:
      "On parle de vous. Votre activit\u00e9, votre vision, vos r\u00e9f\u00e9rences. Je comprends qui vous \u00eates et \u00e0 qui vous vous adressez.",
  },
  {
    number: "02",
    title: "Exploration",
    description:
      "Moodboard, typographies, couleurs. J\u2019explore plusieurs directions et vous propose celle qui vous ressemble.",
  },
  {
    number: "03",
    title: "Cr\u00e9ation",
    description:
      "Palette, typographies, composants, animations. Tout prend forme. Vous validez chaque d\u00e9cision.",
  },
  {
    number: "04",
    title: "Livraison",
    description:
      "Votre design system est en ligne. Une page vivante, consultable \u00e0 tout moment, pr\u00eate \u00e0 guider la suite.",
  },
];

export default function IdentiteVisuellePage() {
  const relatedPosts = getPostsByCategory("Design", 3);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Identité visuelle", path: "/services/identite-visuelle" },
        ])}
      />
      <JsonLd
        data={createServiceSchema({
          name: "Identité visuelle sur mesure",
          description:
            "Création d'identité visuelle complète : palette, typographie, composants, animations.",
          slug: "identite-visuelle",
          price: "150",
          priceLabel: "Prix fixe, tout compris",
        })}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
        <FloatingDevis
          messageTemplate={
            "Bonjour Jules !\n\nJe suis {prenom} {nom} et j\u2019aimerais faire cr\u00e9er l\u2019identit\u00e9 visuelle de mon activit\u00e9.\n\nMon activit\u00e9 : {activite}\n\nEst-ce possible d\u2019en discuter ?\n\nMerci !"
          }
        />

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-48">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Identit&eacute; visuelle
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="max-w-4xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              L&rsquo;image que votre travail m&eacute;rite.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Vous faites un travail de qualit&eacute;. Votre image devrait le
              montrer. Je cr&eacute;e votre syst&egrave;me visuel complet&nbsp;:
              palette, typographie, composants, animations. Pour que chaque
              support parle d&rsquo;une seule voix&nbsp;: la v&ocirc;tre.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-12 md:gap-16">
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                  prix fixe &middot; tout compris
                </p>
                <p
                  className="font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  150&thinsp;&euro;
                </p>
              </div>
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                  livraison
                </p>
                <p
                  className="font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  48h
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-10">
              <CtaLink href="/design-system">Voir un exemple concret</CtaLink>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>
        </section>

        {/* ── Tout est inclus ── */}
        <section className="pb-16 pt-16">
          <Reveal>
            <h2 className="mb-8 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Tout est inclus
            </h2>
          </Reveal>

          <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
            {includes.map((item, i) => (
              <Reveal key={i} delay={60 + i * 40}>
                <p className="font-sans text-sm leading-[1.6] text-dark-chocolate/70">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <p className="mt-8 max-w-2xl font-sans text-xs text-taupe">
              Logo non inclus. Ce service se concentre sur le syst&egrave;me
              visuel complet qui entoure et porte votre marque.
            </p>
          </Reveal>
        </section>

        {/* ── Le livrable ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-6 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Le livrable
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="max-w-2xl">
              <h3
                className="font-normal"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
              >
                Pas un PDF. Une page vivante.
              </h3>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                Votre design system prend la forme d&rsquo;une page web en ligne,
                consultable &agrave; tout moment. Chaque d&eacute;cision visuelle
                y est document&eacute;e&nbsp;: couleurs avec leurs codes,
                typographies avec leur &eacute;chelle, composants avec leurs
                &eacute;tats, animations avec leurs courbes. La r&eacute;f&eacute;rence
                unique pour votre site, vos supports, vos collaborateurs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8">
              <CtaLink href="/design-system">Voir un exemple concret</CtaLink>
            </div>
          </Reveal>
        </section>

        {/* ── Pour qui ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-6 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Pour qui
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Ind&eacute;pendants, artisans, commerces, professions
              lib&eacute;rales. Vous avez une activit&eacute; de
              qualit&eacute; et vous voulez une image &agrave; la hauteur. Vous
              &ecirc;tes pr&ecirc;t &agrave; poser les fondations visuelles de
              votre marque, une bonne fois pour toutes.
            </p>
          </Reveal>
        </section>

        {/* ── Déroulement ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-10 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              D&eacute;roulement
            </h2>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={150 + i * 80}>
                <div>
                  <p className="font-mono text-xs text-taupe">{step.number}</p>
                  <h3
                    className="mt-3 font-normal"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Articles associes ── */}
        {relatedPosts.length > 0 && (
          <section className="py-16">
            <Reveal>
              <div className="w-16 md:w-24">
                <Rule />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="mb-6 mt-10 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
                Ressources
              </p>
            </Reveal>
            <Reveal delay={150}>
              <BlogPostList posts={relatedPosts} />
            </Reveal>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="pb-32 pt-8">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              className="mt-12 max-w-2xl font-normal"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              150&thinsp;&euro;, tout compris, sans surprise.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 font-sans text-sm text-dark-chocolate/60">
              R&eacute;ponse sous 24h. Livraison en 48h.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Parlons de votre identit&eacute;</CtaLink>
              <CtaLink href="/services">Tous les services</CtaLink>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
