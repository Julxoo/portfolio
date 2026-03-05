import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { FloatingDevis } from "@/components/ui/floating-devis";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schemas";
import { getPostsByCategory } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Site d'annonces sur mesure avec back-office",
  description:
    "Site d'annonces avec back-office intégré. Gérez vos véhicules, biens immobiliers ou produits en autonomie. À partir de 1 500 €, livraison 2 à 4 semaines.",
  alternates: { canonical: "/services/site-annonces" },
};

const includes: React.ReactNode[] = [
  "Design sur-mesure, aucun template",
  "1 type d'annonce configuré (véhicules, biens, offres…)",
  "Back-office admin complet : ajout, modification, suppression",
  "Gestion des statuts : disponible, réservé, vendu",
  "Upload photos avec galerie intégrée",
  "Page listing avec filtres (catégorie, prix, statut)",
  "Page détail par annonce, optimisée SEO",
  "Responsive : mobile, tablette, desktop",
  "Optimisation SEO complète : balises, sitemap, données structurées",
  <>
    <Link
      href="/realisations/tracker-analytics"
      className="text-dark-chocolate underline decoration-rule-light underline-offset-4 transition-colors duration-300 hover:text-camel hover:decoration-camel"
    >
      Tracker Analytics
    </Link>{" "}
    : accès complet, tableau de bord, rapports
  </>,
  "Optimisation performance (Core Web Vitals)",
  "Hébergement inclus",
  "1 tour de révision après livraison (contenu et design)",
];

const options = [
  {
    title: "Type d'annonce supplémentaire",
    description:
      "Ajoutez un second catalogue : véhicules + pièces détachées, biens à vendre + locations, offres d'emploi + stages. Même back-office, même qualité.",
    price: "300",
    note: "par type",
  },
  {
    title: "Filtres avancés",
    description:
      "Recherche par localisation, fourchette de prix, caractéristiques techniques, année, surface. Vos visiteurs trouvent ce qu'ils cherchent en deux clics.",
    price: "200",
  },
  {
    title: "Multi-utilisateurs",
    description:
      "Plusieurs comptes avec des rôles et permissions distincts : admin, éditeur, commercial. Chacun acc\u00e8de uniquement \u00e0 ce qui le concerne, vous gardez le contr\u00f4le total.",
    price: "500",
    note: "selon le nombre de r\u00f4les",
  },
  {
    title: "Identité visuelle complète",
    description:
      "Palette, typographie, composants, animations. Votre système visuel complet, livré sous forme de page design system en ligne. Inclut 1 tour de révision.",
    price: "offert",
    note: "inclus avec votre site d\u2019annonces",
    href: "/services/identite-visuelle",
  },
  {
    title: "Fiche Google My Business",
    description:
      "Création et optimisation de votre fiche : photos, description, catégories, horaires. Visibilité locale immédiate.",
    price: "80",
  },
  {
    title: "Synchronisation plateforme externe",
    description:
      "Connexion avec SeLoger, La Centrale, LeBonCoin ou toute autre plateforme. Vos annonces se mettent à jour automatiquement.",
    price: "sur devis",
    note: "selon la plateforme",
  },
];

const steps = [
  {
    number: "01",
    title: "Échange",
    description:
      "On parle de votre activité, de vos annonces, de vos besoins. Je vous envoie un devis clair sous 24h.",
  },
  {
    number: "02",
    title: "Structure",
    description:
      "On définit ensemble les champs de vos annonces : photos, prix, caractéristiques, statuts. Je configure le back-office.",
  },
  {
    number: "03",
    title: "Conception",
    description:
      "Je crée le design et développe votre site. Vous voyez l\u2019avancée et validez avant de continuer.",
  },
  {
    number: "04",
    title: "Formation",
    description:
      "Je vous montre comment utiliser le back-office. Ajout d\u2019annonce, modification, suppression : vous êtes autonome.",
  },
  {
    number: "05",
    title: "Livraison",
    description: (
      <>
        Mise en ligne, nom de domaine configuré,{" "}
        <Link
          href="/realisations/tracker-analytics"
          className="text-dark-chocolate underline decoration-rule-light underline-offset-4 transition-colors duration-300 hover:text-camel hover:decoration-camel"
        >
          Tracker Analytics
        </Link>{" "}
        activé, SEO en place. Votre site est prêt.
      </>
    ),
  },
  {
    number: "06",
    title: "Révision",
    description:
      "Vous testez, vous publiez vos premières annonces. Un tour de révision complet est inclus pour ajuster contenu et design.",
  },
];

const useCases = [
  {
    title: "Concessions auto et moto",
    description: "Stock de véhicules, fiches techniques, prix, kilométrage, photos. Mise à jour quotidienne.",
  },
  {
    title: "Agences immobilières",
    description: "Biens à vendre ou louer, surfaces, DPE, localisation, visites. Gestion des mandats.",
  },
  {
    title: "Locations saisonnières",
    description: "Gîtes, chambres d\u2019hôtes, disponibilités, tarifs par saison, réservation.",
  },
  {
    title: "Recrutement",
    description: "Offres d\u2019emploi, profils recherchés, localisation, type de contrat, candidature en ligne.",
  },
  {
    title: "Commerce et occasion",
    description: "Catalogue produits, matériel BTP, bateaux, antiquités. Stock en temps réel.",
  },
];

export default function SiteAnnoncesPage() {
  const relatedPosts = getPostsByCategory("Développement web", 3);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Site d'annonces", path: "/services/site-annonces" },
        ])}
      />
      <JsonLd
        data={createServiceSchema({
          name: "Site d'annonces sur mesure avec back-office",
          description:
            "Site d'annonces avec back-office intégré. Gérez vos véhicules, biens immobiliers ou produits en autonomie.",
          slug: "site-annonces",
          price: "1500",
          priceLabel: "À partir de",
        })}
      />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <FloatingDevis
          messageTemplate={
            "Bonjour Jules !\n\nJe suis {prenom} {nom} et j\u2019aimerais créer un site d\u2019annonces pour mon activité.\n\nMon activité : {activite}\nType d\u2019annonces : (véhicules, biens immobiliers, produits…)\n\nQuand seriez-vous disponible pour en parler ?\n\nMerci !"
          }
        />

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-48">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Site d&rsquo;annonces
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="max-w-4xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Publiez vos annonces. Sans nous rappeler.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Votre propre plateforme d&rsquo;annonces, avec un back-office
              sur-mesure. Vous g&eacute;rez vos v&eacute;hicules, biens ou
              produits en toute autonomie. Design soign&eacute;, SEO
              int&eacute;gr&eacute;, performance optimale.
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
                  1&thinsp;500&thinsp;&euro;
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
                  2 &agrave; 4 sem.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Identité visuelle offerte ── */}
          <Reveal delay={400}>
            <Link
              href="/services/identite-visuelle"
              className="group mt-10 block border border-rule-light p-6 transition-colors duration-300 hover:border-camel md:max-w-lg"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
                  Inclus
                </p>
                <p className="font-sans text-xs text-camel">
                  offert
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
                Palette, typographie, composants, animations.
                Offert avec chaque site d&rsquo;annonces.
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

        {/* ── Pour qui ── */}
        <section className="py-16">
          <Reveal>
            <h2 className="mb-8 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Pour qui
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-10 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Tout professionnel qui publie r&eacute;guli&egrave;rement des
              annonces et veut arr&ecirc;ter de d&eacute;pendre uniquement des
              plateformes tierces.
            </p>
          </Reveal>

          <ul className="border-t border-rule-light">
            {useCases.map((useCase, i) => (
              <Reveal key={i} delay={150 + i * 60}>
                <li className="border-b border-rule-light py-6 md:flex md:items-baseline md:gap-8">
                  <h3
                    className="shrink-0 font-normal md:w-64"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                  >
                    {useCase.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-[1.6] text-dark-chocolate/60 md:mt-0">
                    {useCase.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ── Tout est inclus ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-8 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
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
              Co&ucirc;t du nom de domaine et de l&rsquo;h&eacute;bergement
              base de donn&eacute;es &agrave; charge du client (renouvelable
              chaque ann&eacute;e).
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
                        <span className="font-sans text-sm uppercase tracking-[0.05em]">
                          sur devis
                        </span>
                      ) : option.price === "offert" ? (
                        <span className="font-sans text-sm uppercase tracking-[0.05em] text-camel">
                          offert
                        </span>
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

          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6 md:gap-12">
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

        {/* ── Articles associés ── */}
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
              R&eacute;ponse sous 24h. Un site en ligne en 2 &agrave; 4
              semaines.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Demander un devis</CtaLink>
              <CtaLink href="/services">Tous les services</CtaLink>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
