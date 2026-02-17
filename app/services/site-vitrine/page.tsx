import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { FloatingDevis } from "@/components/ui/floating-devis";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schemas";
import { getPostsByCategory } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Création de site vitrine sur mesure",
  description:
    "Site vitrine sur mesure, optimisé SEO, hébergement inclus. À partir de 500 €, livraison 1 à 3 semaines. Devis gratuit sous 24h.",
  alternates: { canonical: "/services/site-vitrine" },
};

const includes: React.ReactNode[] = [
  "Design sur-mesure, aucun template",
  "Site mono-page, rapide et efficace",
  "Responsive : mobile, tablette, desktop",
  "Animations et transitions modernes",
  "Optimisation SEO compl\u00e8te : balises, sitemap, donn\u00e9es structur\u00e9es",
  <><Link href="/realisations/tracker-analytics" className="text-dark-chocolate underline decoration-rule-light underline-offset-4 transition-colors duration-300 hover:text-camel hover:decoration-camel">Tracker Analytics</Link> : acc&egrave;s complet, tableau de bord, rapports</>,
  "Optimisation performance (Core Web Vitals)",
  "CTA directs : t\u00e9l\u00e9phone, email, r\u00e9seaux sociaux",
  "Favicon et Open Graph sur-mesure",
  "Mentions l\u00e9gales et politique de confidentialit\u00e9",
  "R\u00e9daction de contenu incluse",
  "H\u00e9bergement inclus",
  "1 tour de r\u00e9vision apr\u00e8s livraison (contenu et design)",
];

const options = [
  {
    title: "Identit\u00e9 visuelle compl\u00e8te",
    description:
      "Palette, typographie, composants, animations. Votre syst\u00e8me visuel complet, livr\u00e9 sous forme de page design system en ligne. Inclut 1 tour de r\u00e9vision.",
    price: "100",
    note: "au lieu de 150\u202f\u20ac \u00b7 \u00e9conomisez 50\u202f\u20ac",
    href: "/services/identite-visuelle",
  },
  {
    title: "Pages suppl\u00e9mentaires",
    description:
      "Ajoutez autant de pages que n\u00e9cessaire : \u00e0 propos, services d\u00e9taill\u00e9s, galerie, t\u00e9moignages, FAQ. M\u00eame design, m\u00eame qualit\u00e9.",
    price: "sur devis",
    note: "selon vos besoins",
  },
  {
    title: "Fiche Google My Business",
    description:
      "Cr\u00e9ation et optimisation de votre fiche : photos, description, cat\u00e9gories, horaires. Visibilit\u00e9 locale imm\u00e9diate.",
    price: "80",
  },
  {
    title: "Traduction du site",
    description:
      "Version compl\u00e8te de votre site dans une langue suppl\u00e9mentaire. M\u00eame design, m\u00eame qualit\u00e9, navigation bilingue int\u00e9gr\u00e9e.",
    price: "100",
    note: "par langue",
  },
];

const steps = [
  {
    number: "01",
    title: "\u00c9change",
    description:
      "On parle de votre activit\u00e9, vos clients, vos objectifs. Je vous envoie un devis clair sous 24h.",
  },
  {
    number: "02",
    title: "Contenu",
    description:
      "Vous me transmettez vos textes, photos et r\u00e9f\u00e9rences. Je r\u00e9dige ou ajuste le contenu si besoin.",
  },
  {
    number: "03",
    title: "Conception",
    description:
      "Je cr\u00e9e le design et d\u00e9veloppe votre site. Vous voyez l\u2019avanc\u00e9e et validez avant de continuer.",
  },
  {
    number: "04",
    title: "Livraison",
    description:
      <>Mise en ligne, nom de domaine configur&eacute;, <Link href="/realisations/tracker-analytics" className="text-dark-chocolate underline decoration-rule-light underline-offset-4 transition-colors duration-300 hover:text-camel hover:decoration-camel">Tracker Analytics</Link> activ&eacute;, SEO en place. Votre site est pr&ecirc;t.</>,
  },
  {
    number: "05",
    title: "R\u00e9vision",
    description:
      "Vous testez, vous utilisez. Un tour de r\u00e9vision complet est inclus pour ajuster contenu et design.",
  },
];

export default function SiteVitrinePage() {
  const relatedPosts = getPostsByCategory("Developpement web", 3);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Site vitrine", path: "/services/site-vitrine" },
        ])}
      />
      <JsonLd
        data={createServiceSchema({
          name: "Création de site vitrine sur mesure",
          description:
            "Site vitrine sur mesure, optimisé SEO, hébergement inclus. Livraison 1 à 3 semaines.",
          slug: "site-vitrine",
          price: "500",
          priceLabel: "À partir de",
        })}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
        <FloatingDevis
          messageTemplate={
            "Bonjour Jules !\n\nJe suis {prenom} {nom} et j\u2019aimerais cr\u00e9er un site vitrine pour mon activit\u00e9.\n\nMon activit\u00e9 : {activite}\n\nQuand seriez-vous disponible pour en parler ?\n\nMerci !"
          }
        />
        {/* ── Hero ── */}
        <section className="pt-32 md:pt-48">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Site vitrine
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="max-w-4xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Un site qui travaille pour vous.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Votre vitrine en ligne, con&ccedil;ue sur-mesure, optimis&eacute;e
              pour convertir. Design soign&eacute;, r&eacute;f&eacute;rencement
              int&eacute;gr&eacute;, analytics inclus. Pr&ecirc;t &agrave;
              recevoir vos premiers clients.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-12 md:gap-16">
              <div>
                <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                  &agrave; partir de
                </p>
                <p
                  className="font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  500&thinsp;&euro;
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
                  1 &agrave; 3 sem.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Offre groupée identité visuelle ── */}
          <Reveal delay={400}>
            <Link
              href="/services/identite-visuelle"
              className="group mt-10 block border border-rule-light p-6 transition-colors duration-300 hover:border-camel md:max-w-lg"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
                  Offre group&eacute;e
                </p>
                <p className="font-sans text-xs text-camel">
                  &minus;50&thinsp;&euro;
                </p>
              </div>
              <p
                className="mt-3 font-normal transition-colors duration-300 group-hover:text-camel"
                style={{
                  fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
                  transitionTimingFunction: "var(--ease-hover)",
                }}
              >
                + Identit&eacute; visuelle compl&egrave;te
              </p>
              <p className="mt-2 font-sans text-sm text-dark-chocolate/60">
                100&thinsp;&euro; au lieu de 150&thinsp;&euro;.
                Palette, typographie, composants, animations.
              </p>
              <p className="mt-3 font-sans text-xs text-camel transition-colors duration-300 group-hover:text-matte-gold">
                D&eacute;couvrir ce service &rarr;
              </p>
            </Link>
          </Reveal>

          <Reveal delay={450}>
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
              Co&ucirc;t du nom de domaine &agrave; charge du client
              (renouvelable chaque ann&eacute;e).
            </p>
          </Reveal>
        </section>

        {/* ── Sur mesure ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-6 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Sur mesure
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mb-8 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Chaque projet est unique. Ajoutez ce dont vous avez besoin, le
              devis s&rsquo;adapte.
            </p>
          </Reveal>

          <ul className="border-t border-rule-light">
            {options.map((option, i) => (
              <Reveal key={i} delay={180 + i * 60}>
                <li className="border-b border-rule-light py-6 md:flex md:items-baseline md:justify-between md:gap-8">
                  <div className="md:max-w-lg">
                    <h3
                      className="font-normal"
                      style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                    >
                      {option.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-[1.6] text-dark-chocolate/60">
                      {option.description}
                    </p>
                    {option.href && (
                      <p className="mt-2">
                        <CtaLink href={option.href}>En savoir plus</CtaLink>
                      </p>
                    )}
                  </div>
                  <div className="mt-3 shrink-0 text-right md:mt-0">
                    <p className="font-serif text-lg text-dark-chocolate">
                      {option.price === "sur devis" ? (
                        <span className="font-sans text-sm uppercase tracking-[0.05em]">sur devis</span>
                      ) : (
                        <>+&thinsp;{option.price}&thinsp;&euro;</>
                      )}
                    </p>
                    {option.note && (
                      <p className="mt-0.5 font-sans text-[11px] text-camel">
                        {option.note}
                      </p>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={400}>
            <p className="mt-8 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Cette liste n&rsquo;est pas exhaustive. Chaque besoin peut
              &ecirc;tre satisfait, il suffit d&rsquo;en discuter.
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

          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5 md:gap-12">
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
              Devis gratuit, sans engagement.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 font-sans text-sm text-dark-chocolate/60">
              R&eacute;ponse sous 24h. Un site en ligne en 1 &agrave; 3 semaines.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Demander un devis</CtaLink>
              <CtaLink href="/services">Tous les services</CtaLink>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
