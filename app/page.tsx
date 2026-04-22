import type { Metadata } from "next";
import Link from "next/link";
import { Logo, Reveal, Rule, CtaLink, TextReveal, ScrollHint } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createItemListSchema,
  createWebPageSchema,
} from "@/lib/schemas";

const PAGE_TITLE =
  "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence";

const PAGE_DESCRIPTION =
  "Développeur web freelance à Aix-en-Provence. Applications sur-mesure, sites vitrine, référencement SEO et GEO, maintenance de sites code ou WordPress.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const services = [
  {
    id: "sur-mesure",
    eyebrow: "01",
    title: "Projets sur-mesure, de A à Z",
    capsule:
      "Conception, architecture, développement, déploiement, maintenance. Un seul interlocuteur qui prend en charge l'ensemble du cycle, du brief à la mise en production.",
    body: "CRM métier, plateforme SaaS, application multi-utilisateurs, intégrations d'API complexes. Les besoins spécifiques demandent des outils taillés exactement pour eux. Stack Next.js, TypeScript, Postgres, infrastructure cloud. Je prends la responsabilité de l'architecture jusqu'au monitoring post-production.",
    proof: {
      href: "/realisations/crm-atc-immobilier",
      label: "Voir le CRM ATC Immobilier",
    },
  },
  {
    id: "site-vitrine",
    eyebrow: "02",
    title: "Sites vitrine pour commerces et indépendants",
    capsule:
      "Site sur-mesure, pas un template. Design adapté, référencement local, analytics inclus. Performance Lighthouse maximale, prêt à recevoir vos premiers clients dès le lancement.",
    body: "Pour les artisans, restaurateurs, commerces de quartier et professions libérales. Un site qui reflète l'identité du lieu, qui charge en moins d'une seconde et qui remonte sur Google pour les recherches locales. Contenu rédigé, référencement local et hébergement inclus.",
    proof: {
      href: "/realisations/le-vieux-tonneau",
      label: "Voir Le Vieux Tonneau",
    },
  },
  {
    id: "seo-geo",
    eyebrow: "03",
    title: "Optimisation SEO et GEO",
    capsule:
      "Référencement Google local, plus visibilité dans ChatGPT, Perplexity et Google AI Overviews. Données structurées, answer capsules, performance Core Web Vitals, contenu sourcé.",
    body: "46% des recherches Google sont locales. Depuis 2025, les moteurs génératifs captent une part croissante des découvertes. Travail sur les données structurées schema.org, les FAQ, la performance technique et le maillage sémantique. Pour rester trouvé sur Google et dans les réponses IA.",
    proof: {
      href: "/realisations",
      label: "Voir les résultats clients",
    },
  },
  {
    id: "maintenance",
    eyebrow: "04",
    title: "Maintenance et reprise de site · code ou WordPress",
    capsule:
      "Reprise de site existant, correctifs, mises à jour, migrations, refonte partielle. Code sur-mesure ou WordPress, je prends les deux sans tout reconstruire inutilement.",
    body: "Votre site existe et tourne, mais il a besoin d'évoluer. Bug à corriger, plugin qui casse, refonte partielle, migration vers un meilleur hébergement, sécurité, montée de version. Pas besoin de tout refaire si l'existant peut encore servir. J'interviens sur du code que je n'ai pas écrit.",
    proof: null,
  },
];

const convictions = [
  {
    title: "Pas de templates",
    body: "Chaque projet part d'une page blanche et d'une conversation. C'est ce qui fait la différence entre un site qui ressemble et un site qui vous ressemble.",
  },
  {
    title: "Livrer, pas promettre",
    body: "Une solution en production vaut mieux que dix roadmaps. Je travaille court, je valide à chaque étape, et ce qui est livré tourne.",
  },
  {
    title: "Un interlocuteur unique",
    body: "Je conçois, je code, je déploie, je maintiens. Pas de chef de projet, pas de sous-traitance invisible. Les décisions se prennent vite et les coûts restent clairs.",
  },
];

const process = [
  {
    number: "01",
    title: "Échange",
    body: "On cadre votre besoin, votre audience, vos contraintes. Devis clair sous 24h, sans engagement.",
  },
  {
    number: "02",
    title: "Conception",
    body: "Architecture, design, itération. Vous validez chaque étape avant la suivante. Zéro mauvaise surprise à l'arrivée.",
  },
  {
    number: "03",
    title: "Livraison",
    body: "Déploiement, nom de domaine, référencement technique, analytics. Votre projet tourne en production.",
  },
  {
    number: "04",
    title: "Suivi",
    body: "Un tour de révision inclus. Correctifs, évolutions, maintenance : la relation continue autant que nécessaire.",
  },
];

const faqs = [
  {
    question: "Comment se passe un projet avec toi ?",
    answer:
      "Premier échange gratuit pour cadrer le besoin, le périmètre et le délai. Devis clair sous 24h. Le projet démarre sur validation, avec des points réguliers et une validation à chaque étape. Livraison en production avec un tour de révision inclus, puis suivi selon vos besoins.",
  },
  {
    question: "Tu peux reprendre un site WordPress existant ?",
    answer:
      "Oui. Correctifs, mises à jour, migrations, refonte partielle, sécurisation, optimisation des performances. Pas besoin de tout reconstruire si le site actuel peut être sauvé. Je propose aussi une migration vers une stack plus rapide si la performance devient un frein business.",
  },
  {
    question: "Quelle différence entre un développeur freelance et une agence web ?",
    answer:
      "Un seul interlocuteur qui conçoit, code et livre. Pas de chef de projet intermédiaire, pas de sous-traitance, pas de marge cumulée. Les décisions se prennent directement, la communication est sans filtre, et les coûts restent maîtrisés sur toute la durée du projet.",
  },
  {
    question: "Tu interviens uniquement à Aix-en-Provence ?",
    answer:
      "Je suis basé à Aix-en-Provence mais je travaille avec des clients dans toute la France. Les échanges se font en visio, par téléphone ou par SMS. Je me déplace sur site pour les projets locaux qui le justifient, en particulier dans la région Provence-Alpes-Côte d'Azur.",
  },
  {
    question: "Qu'est-ce que le GEO et pourquoi c'est important en 2026 ?",
    answer:
      "Le GEO, pour Generative Engine Optimization, est le référencement auprès des moteurs génératifs comme ChatGPT, Perplexity et Google AI Overviews. Ces réponses captent une part croissante des recherches. Travailler le GEO, c'est rester visible quand les utilisateurs arrêtent de cliquer sur les liens bleus.",
  },
  {
    question: "Pourquoi aucun tarif n'est affiché sur le site ?",
    answer:
      "Chaque projet est unique. Un site vitrine pour une boulangerie, la reprise d'un WordPress et un CRM sur-mesure n'ont rien à voir en périmètre ni en temps. Le devis est gratuit et arrive sous 24h après un premier échange. Vous payez pour ce dont vous avez vraiment besoin.",
  },
];

const homePageSchema = createWebPageSchema({
  url: "/",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const homeBreadcrumbSchema = createBreadcrumbSchema([
  { name: "Accueil", path: "/" },
]);

const servicesListSchema = createItemListSchema(
  services.map((s) => ({
    name: s.title,
    url: `https://julestoussenel.com/#${s.id}`,
  }))
);

const faqSchema = createFaqSchema(faqs);

/* ─── Primitives éditoriales locales ───────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
      {children}
    </p>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="max-w-3xl font-serif font-normal leading-[1.05] tracking-[-0.015em]"
      style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd data={homePageSchema} />
      <JsonLd data={homeBreadcrumbSchema} />
      <JsonLd data={servicesListSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Hero ── */}
        <section
          className="relative flex flex-col pb-10 pt-28 md:min-h-[100svh] md:pb-12 md:pt-40 lg:pt-48"
          aria-labelledby="hero-heading"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden">
            <Logo
              size={820}
              className="mr-[-30%] text-stone/20 md:mr-[-5%] lg:mr-[0%]"
            />
          </div>

          <div className="relative flex md:flex-1 md:items-center">
            <div className="w-full">
              <Reveal delay={50}>
                <Eyebrow>
                  Développeur web freelance &middot; Aix-en-Provence
                </Eyebrow>
              </Reveal>

              <TextReveal>
                <h1
                  id="hero-heading"
                  className="mt-5 font-serif font-light leading-[0.95] tracking-[-0.025em] md:mt-6"
                  style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
                >
                  Jules
                  <br />
                  Toussenel
                </h1>
              </TextReveal>

              <Reveal delay={200} direction="wipe">
                <div className="mt-6 w-16 md:mt-8 md:w-24">
                  <Rule />
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-ink/75 md:mt-8 md:text-lg">
                  AI-Augmented Software Engineer. Je con&ccedil;ois,
                  d&eacute;veloppe et fais vivre des applications web sur-mesure :
                  du site vitrine pour un commerce au CRM m&eacute;tier complet,
                  en passant par le r&eacute;f&eacute;rencement SEO et GEO et la
                  maintenance de sites existants.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-5 md:mt-12">
                  <li>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                      Winter Is Coding
                    </p>
                    <p
                      className="mt-2 font-serif font-normal leading-none tracking-[-0.02em] text-ink"
                      style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
                    >
                      1<sup className="text-sm">er</sup>
                      <span className="ml-2 font-sans text-xs font-normal text-stone">
                        / 850
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                      Le Match&rsquo;Up
                    </p>
                    <p
                      className="mt-2 font-serif font-normal leading-none tracking-[-0.02em] text-ink"
                      style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
                    >
                      1<sup className="text-sm">er</sup>
                      <span className="ml-2 font-sans text-xs font-normal text-stone">
                        / 1000
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
                      En production
                    </p>
                    <p
                      className="mt-2 font-serif font-normal leading-none tracking-[-0.02em] text-ink"
                      style={{ fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
                    >
                      10+
                      <span className="ml-2 font-sans text-xs font-normal text-stone">
                        projets
                      </span>
                    </p>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal delay={500} direction="left">
            <div className="mb-6 mt-10 md:mb-8 md:mt-0">
              <Link
                href="/contact"
                data-track="cta"
                data-track-label="Hero CTA"
                className="group inline-flex w-full items-center justify-between gap-3 bg-ochre px-7 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-bone transition-all duration-300 hover:bg-ink active:scale-[0.98] sm:w-auto sm:justify-start sm:py-3.5"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                Discutons de votre projet
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <nav className="flex flex-col gap-3 md:flex-row md:gap-10">
              <CtaLink href="#services">Ce que je fais</CtaLink>
              <CtaLink href="/realisations">R&eacute;alisations</CtaLink>
              <CtaLink href="#faq">Questions fr&eacute;quentes</CtaLink>
            </nav>
          </Reveal>
        </section>

        <ScrollHint targetId="approche-heading" />

        {/* ── Approche ── */}
        <section
          className="py-20 md:py-28 lg:py-32"
          aria-labelledby="approche-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>Approche</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="approche-heading">
              Je construis des produits pens&eacute;s pour durer, pas des
              livrables qui vieillissent mal.
            </SectionHeading>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 grid max-w-3xl gap-6 font-sans text-base leading-[1.8] text-ink/75">
              <p>
                Depuis Aix-en-Provence, je travaille avec des
                ind&eacute;pendants, des commerces et des entreprises qui veulent
                un outil web qui leur ressemble. Pas un site qu&rsquo;on
                reconna&icirc;t avant m&ecirc;me d&rsquo;avoir lu le contenu, pas
                un CRM g&eacute;n&eacute;rique qu&rsquo;il faut plier &agrave;
                son m&eacute;tier.
              </p>
              <p>
                J&rsquo;ai livr&eacute; plus de dix projets en production. CRM
                commercial qui a remplac&eacute; Salesforce, site vitrine qui a
                multipli&eacute; le trafic d&rsquo;un restaurant, plateforme
                SaaS d&rsquo;affiliation, bots conversationnels. Chaque projet
                est diff&eacute;rent. La constante : du code propre,
                mesur&eacute; et maintenable.
              </p>
              <p>
                J&rsquo;utilise l&rsquo;IA au quotidien comme outil, pas comme
                promesse. Elle acc&eacute;l&egrave;re la conception, le code et
                la documentation. Le reste, c&rsquo;est de
                l&rsquo;ing&eacute;nierie classique : comprendre le probl&egrave;me
                avant de coder, choisir la bonne abstraction, et livrer.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Services ── */}
        <section
          id="services"
          className="py-20 md:py-28 lg:py-32 scroll-mt-20 md:scroll-mt-24"
          aria-labelledby="services-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>Ce que je fais</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="services-heading">
              Quatre fa&ccedil;ons de travailler ensemble, selon
              l&rsquo;&eacute;tat de votre projet.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 border-t border-mist md:mt-16">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={100 + i * 60}>
                <article
                  id={service.id}
                  className="grid gap-6 border-b border-mist py-10 scroll-mt-20 md:scroll-mt-24 md:grid-cols-[auto_1fr] md:gap-16 md:py-12"
                >
                  <p className="shrink-0 font-mono text-xs tabular-nums text-stone md:w-12 md:pt-3">
                    {service.eyebrow}
                  </p>
                  <div className="max-w-3xl">
                    <h3
                      className="font-serif font-normal leading-[1.15] tracking-[-0.015em]"
                      style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-5 font-sans text-base leading-[1.7] text-ink">
                      {service.capsule}
                    </p>
                    <p className="mt-4 font-sans text-sm leading-[1.75] text-ink/65">
                      {service.body}
                    </p>
                    {service.proof && (
                      <div className="mt-6">
                        <CtaLink href={service.proof.href}>
                          {service.proof.label}
                        </CtaLink>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 max-w-2xl font-sans text-sm leading-[1.75] text-ink/60">
              Votre besoin n&rsquo;entre dans aucune de ces cases ? On en parle
              quand m&ecirc;me. Un bon cadrage vaut souvent mieux qu&rsquo;une
              cat&eacute;gorie pr&eacute;d&eacute;finie.
            </p>
          </Reveal>
        </section>

        {/* ── Résultats ── */}
        <section
          className="py-20 md:py-28 lg:py-32"
          aria-labelledby="resultats-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>R&eacute;sultats</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="resultats-heading">
              Des chiffres, pas des slogans.
            </SectionHeading>
          </Reveal>

          <div className="mt-10 grid gap-10 border-t border-mist pt-8 md:mt-14 md:grid-cols-3 md:pt-10">
            <Reveal delay={200}>
              <Link
                href="/realisations/le-vieux-tonneau"
                className="group block"
              >
                <p
                  className="font-serif font-light leading-none tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-ochre"
                  style={{
                    fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                    transitionTimingFunction: "var(--ease-luxury)",
                  }}
                >
                  +694%
                </p>
                <p className="mt-3 font-sans text-sm leading-[1.65] text-ink/75">
                  trafic organique apr&egrave;s la mise en ligne
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                  Le Vieux Tonneau &middot; Aix
                </p>
              </Link>
            </Reveal>

            <Reveal delay={300}>
              <Link
                href="/realisations/crm-atc-immobilier"
                className="group block"
              >
                <p
                  className="font-serif font-light leading-none tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-ochre"
                  style={{
                    fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                    transitionTimingFunction: "var(--ease-luxury)",
                  }}
                >
                  5
                </p>
                <p className="mt-3 font-sans text-sm leading-[1.65] text-ink/75">
                  utilisateurs quotidiens sur un CRM rempla&ccedil;ant Salesforce
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                  CRM ATC Immobilier
                </p>
              </Link>
            </Reveal>

            <Reveal delay={400}>
              <Link href="/realisations" className="group block">
                <p
                  className="font-serif font-light leading-none tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-ochre"
                  style={{
                    fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                    transitionTimingFunction: "var(--ease-luxury)",
                  }}
                >
                  100
                </p>
                <p className="mt-3 font-sans text-sm leading-[1.65] text-ink/75">
                  sur 100 en performance, accessibilit&eacute; et SEO Lighthouse
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
                  Sur les sites livr&eacute;s en 2025
                </p>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={500}>
            <div className="mt-12">
              <CtaLink href="/realisations">
                Voir toutes les r&eacute;alisations
              </CtaLink>
            </div>
          </Reveal>
        </section>

        {/* ── Comment on travaille ── */}
        <section
          className="py-20 md:py-28 lg:py-32"
          aria-labelledby="process-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>Comment on travaille</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="process-heading">
              Quatre &eacute;tapes, pas une de plus.
            </SectionHeading>
          </Reveal>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-14 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.number} delay={200 + i * 80}>
                <div>
                  <p className="font-mono text-xs tabular-nums text-stone">
                    {step.number}
                  </p>
                  <h3
                    className="mt-3 font-serif font-normal leading-[1.15] tracking-[-0.015em]"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.75] text-ink/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Convictions ── */}
        <section
          className="py-20 md:py-28 lg:py-32"
          aria-labelledby="convictions-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>Convictions</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="convictions-heading">
              Pourquoi travailler avec moi plut&ocirc;t qu&rsquo;avec un autre.
            </SectionHeading>
          </Reveal>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-12">
            {convictions.map((c, i) => (
              <Reveal key={c.title} delay={200 + i * 80}>
                <div className="border-t border-mist pt-6">
                  <h3
                    className="font-serif font-normal leading-[1.2] tracking-[-0.015em]"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-[1.8] text-ink/70">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          id="faq"
          className="py-20 md:py-28 lg:py-32 scroll-mt-20 md:scroll-mt-24"
          aria-labelledby="faq-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mb-5 mt-10 md:mb-6 md:mt-12">
              <Eyebrow>Questions fr&eacute;quentes</Eyebrow>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SectionHeading id="faq-heading">
              Les r&eacute;ponses avant que vous n&rsquo;ayez &agrave; les
              poser.
            </SectionHeading>
          </Reveal>

          <div className="mt-10 border-t border-mist md:mt-14">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={180 + i * 50}>
                <details className="group border-b border-mist py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3
                      className="font-serif font-normal leading-[1.3] text-ink transition-colors duration-300 group-hover:text-ochre"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        transitionTimingFunction: "var(--ease-hover)",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-1 font-mono text-lg text-ochre transition-transform duration-300 group-open:rotate-45"
                      style={{ transitionTimingFunction: "var(--ease-hover)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-3xl font-sans text-sm leading-[1.8] text-ink/70">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section
          className="pb-20 pt-10 md:pb-32 md:pt-16"
          aria-labelledby="cta-heading"
        >
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="cta-heading"
              className="mt-10 max-w-3xl font-serif font-light leading-[1.05] tracking-[-0.02em] md:mt-12"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Un projet en t&ecirc;te&thinsp;? Parlons-en.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-ink/70">
              Premier &eacute;change gratuit, sans engagement. Devis clair sous
              24h. Aix-en-Provence et toute la France.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-12 space-y-3">
              <a
                href="mailto:toussenelj@gmail.com?subject=Prise%20de%20contact&amp;body=Salut%20Jules%20!%0A%0AJ%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%0A%0A%C3%80%20bient%C3%B4t%20!"
                data-track="cta"
                data-track-label="Home CTA Email"
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
                data-track-label="Home CTA SMS"
                className="block font-sans text-sm text-ink/60 transition-colors duration-300 hover:text-ochre"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                06 14 53 32 29
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
