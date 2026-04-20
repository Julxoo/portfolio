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
              className="mr-[-30%] text-camel/[0.22] md:mr-[-5%] lg:mr-[0%]"
            />
          </div>

          <div className="relative flex md:flex-1 md:items-center">
            <div className="w-full">
              <Reveal delay={50}>
                <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.15em] text-taupe md:mb-6 md:text-[13px]">
                  D&eacute;veloppeur web freelance &middot; Aix-en-Provence
                </p>
              </Reveal>

              <TextReveal>
                <h1
                  id="hero-heading"
                  className="font-normal"
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
                <p className="mt-6 max-w-2xl font-sans text-base leading-[1.7] text-dark-chocolate/70 md:mt-8 md:text-lg">
                  AI-Augmented Software Engineer. Je con&ccedil;ois,
                  d&eacute;veloppe et fais vivre des applications web sur-mesure :
                  du site vitrine pour un commerce au CRM m&eacute;tier complet,
                  en passant par le r&eacute;f&eacute;rencement SEO et GEO et la
                  maintenance de sites existants.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-5 md:mt-10 md:gap-x-10 md:gap-y-4">
                  <li>
                    <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                      Winter Is Coding
                    </p>
                    <p className="mt-1 font-serif text-2xl text-dark-chocolate">
                      1<sup className="text-sm">er</sup>
                      <span className="ml-2 font-sans text-xs text-taupe">
                        / 850
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                      Le Match&rsquo;Up
                    </p>
                    <p className="mt-1 font-serif text-2xl text-dark-chocolate">
                      1<sup className="text-sm">er</sup>
                      <span className="ml-2 font-sans text-xs text-taupe">
                        / 1000
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                      En production
                    </p>
                    <p className="mt-1 font-serif text-2xl text-dark-chocolate">
                      10+
                      <span className="ml-2 font-sans text-xs text-taupe">
                        projets
                      </span>
                    </p>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal delay={500} direction="left">
            <div className="mt-10 mb-6 md:mt-0 md:mb-8">
              <Link
                href="/contact"
                data-track="cta"
                data-track-label="Hero CTA"
                className="group inline-flex w-full items-center justify-between gap-3 border border-rule-light px-6 py-4 font-sans text-[12px] uppercase tracking-[0.1em] text-dark-chocolate transition-all duration-400 hover:border-camel hover:text-camel sm:w-auto sm:justify-start sm:py-3.5"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                Discutons de votre projet
                <span className="text-camel transition-transform duration-300 group-hover:translate-x-1">
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

        {/* Scroll hint · desktop only, fixed to viewport so it's always visible
            while at the top, fades out as soon as the user starts scrolling */}
        <ScrollHint targetId="approche-heading" />

        {/* ── Approche ── */}
        <section className="py-20 md:py-28 lg:py-32" aria-labelledby="approche-heading">
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Approche
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="approche-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Je construis des produits pens&eacute;s pour durer, pas des
              livrables qui vieillissent mal.
            </h2>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 grid max-w-3xl gap-6 font-sans text-base leading-[1.75] text-dark-chocolate/70">
              <p>
                Depuis Aix-en-Provence, je travaille avec des ind&eacute;pendants,
                des commerces et des entreprises qui veulent un outil web qui
                leur ressemble. Pas un site qu&rsquo;on reconna&icirc;t avant
                m&ecirc;me d&rsquo;avoir lu le contenu, pas un CRM g&eacute;n&eacute;rique
                qu&rsquo;il faut plier &agrave; son m&eacute;tier.
              </p>
              <p>
                J&rsquo;ai livr&eacute; plus de dix projets en production. CRM
                commercial qui a remplac&eacute; Salesforce, site vitrine qui a
                multipli&eacute; le trafic d&rsquo;un restaurant, plateforme SaaS
                d&rsquo;affiliation, bots conversationnels. Chaque projet est
                diff&eacute;rent. La constante : du code propre, mesur&eacute; et
                maintenable.
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
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Ce que je fais
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="services-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Quatre fa&ccedil;ons de travailler ensemble, selon l&rsquo;&eacute;tat
              de votre projet.
            </h2>
          </Reveal>

          <div className="mt-12 md:mt-16 border-t border-rule-light">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={100 + i * 60}>
                <article
                  id={service.id}
                  className="grid gap-6 border-b border-rule-light py-10 scroll-mt-20 md:scroll-mt-24 md:grid-cols-[auto_1fr] md:gap-16 md:py-12"
                >
                  <p className="shrink-0 font-mono text-xs text-taupe md:w-12 md:pt-2">
                    {service.eyebrow}
                  </p>
                  <div className="max-w-3xl">
                    <h3
                      className="font-normal"
                      style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-5 font-sans text-base leading-[1.7] text-dark-chocolate">
                      {service.capsule}
                    </p>
                    <p className="mt-4 font-sans text-sm leading-[1.75] text-dark-chocolate/65">
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
            <p className="mt-10 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Votre besoin n&rsquo;entre dans aucune de ces cases ? On en parle
              quand m&ecirc;me. Un bon cadrage vaut souvent mieux
              qu&rsquo;une cat&eacute;gorie pr&eacute;d&eacute;finie.
            </p>
          </Reveal>
        </section>

        {/* ── Résultats ── */}
        <section className="py-20 md:py-28 lg:py-32" aria-labelledby="resultats-heading">
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              R&eacute;sultats
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="resultats-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Des chiffres, pas des slogans.
            </h2>
          </Reveal>

          <div className="mt-10 md:mt-14 grid gap-10 border-t border-rule-light pt-8 md:grid-cols-3 md:pt-10">
            <Reveal delay={200}>
              <Link
                href="/realisations/le-vieux-tonneau"
                className="group block"
              >
                <p
                  className="font-normal text-dark-chocolate transition-colors duration-300 group-hover:text-camel"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                >
                  +694%
                </p>
                <p className="mt-2 font-sans text-sm leading-[1.6] text-dark-chocolate/70">
                  trafic organique apr&egrave;s la mise en ligne
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-taupe">
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
                  className="font-normal text-dark-chocolate transition-colors duration-300 group-hover:text-camel"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                >
                  5
                </p>
                <p className="mt-2 font-sans text-sm leading-[1.6] text-dark-chocolate/70">
                  utilisateurs quotidiens sur un CRM rempla&ccedil;ant Salesforce
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-taupe">
                  CRM ATC Immobilier
                </p>
              </Link>
            </Reveal>

            <Reveal delay={400}>
              <Link href="/realisations" className="group block">
                <p
                  className="font-normal text-dark-chocolate transition-colors duration-300 group-hover:text-camel"
                  style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                >
                  100
                </p>
                <p className="mt-2 font-sans text-sm leading-[1.6] text-dark-chocolate/70">
                  sur 100 en performance, accessibilit&eacute; et SEO Lighthouse
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-taupe">
                  Sur les sites livr&eacute;s en 2025
                </p>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={500}>
            <div className="mt-10">
              <CtaLink href="/realisations">
                Voir toutes les r&eacute;alisations
              </CtaLink>
            </div>
          </Reveal>
        </section>

        {/* ── Comment on travaille ── */}
        <section className="py-20 md:py-28 lg:py-32" aria-labelledby="process-heading">
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Comment on travaille
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="process-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Quatre &eacute;tapes, pas une de plus.
            </h2>
          </Reveal>

          <div className="mt-10 md:mt-14 grid gap-10 md:grid-cols-2 md:gap-14 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.number} delay={200 + i * 80}>
                <div>
                  <p className="font-mono text-xs text-taupe">{step.number}</p>
                  <h3
                    className="mt-3 font-normal"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-dark-chocolate/65">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Convictions ── */}
        <section className="py-20 md:py-28 lg:py-32" aria-labelledby="convictions-heading">
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Convictions
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="convictions-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Pourquoi travailler avec moi plut&ocirc;t qu&rsquo;avec un autre.
            </h2>
          </Reveal>

          <div className="mt-10 md:mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {convictions.map((c, i) => (
              <Reveal key={c.title} delay={200 + i * 80}>
                <div>
                  <h3
                    className="font-normal"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-[1.75] text-dark-chocolate/65">
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
            <p className="mb-5 mt-10 md:mb-6 md:mt-12 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Questions fr&eacute;quentes
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h2
              id="faq-heading"
              className="max-w-3xl font-normal"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Les r&eacute;ponses avant que vous n&rsquo;ayez &agrave; les poser.
            </h2>
          </Reveal>

          <div className="mt-10 md:mt-14 border-t border-rule-light">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={180 + i * 50}>
                <details className="group border-b border-rule-light py-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 list-none [&::-webkit-details-marker]:hidden">
                    <h3
                      className="font-normal text-dark-chocolate transition-colors duration-300 group-hover:text-camel"
                      style={{
                        fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                        transitionTimingFunction: "var(--ease-hover)",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-1 font-serif text-xl text-camel transition-transform duration-300 group-open:rotate-45"
                      style={{ transitionTimingFunction: "var(--ease-hover)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-5 max-w-3xl font-sans text-sm leading-[1.75] text-dark-chocolate/70">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="pb-20 pt-10 md:pb-32 md:pt-16" aria-labelledby="cta-heading">
          <Reveal direction="wipe">
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="cta-heading"
              className="mt-10 md:mt-12 max-w-3xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Un projet en t&ecirc;te&thinsp;? Parlons-en.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 max-w-xl font-sans text-base leading-[1.7] text-dark-chocolate/65">
              Premier &eacute;change gratuit, sans engagement. Devis clair sous
              24h. Aix-en-Provence et toute la France.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 space-y-3">
              <a
                href="mailto:toussenelj@gmail.com?subject=Prise%20de%20contact&amp;body=Salut%20Jules%20!%0A%0AJ%E2%80%99aimerais%20discuter%20d%E2%80%99un%20projet%20avec%20toi.%0A%0A%C3%80%20bient%C3%B4t%20!"
                data-track="cta"
                data-track-label="Home CTA Email"
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
                data-track="cta"
                data-track-label="Home CTA SMS"
                className="block font-sans text-sm text-dark-chocolate/60 transition-colors duration-300 hover:text-camel"
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
