import type { Metadata } from "next";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "\u00c0 propos",
  description:
    "D\u00e9veloppeur web freelance bas\u00e9 \u00e0 Aix-en-Provence. Applications web sur-mesure, CRM m\u00e9tier, SaaS, automatisation. Code propre, performances optimis\u00e9es.",
  alternates: { canonical: "/a-propos" },
};

const milestones = [
  {
    year: "2020",
    title: "L1 MIASHS \u00b7 Fac d\u2019\u00e9co, Aix-en-Provence",
    description:
      "Premi\u00e8re ann\u00e9e en math\u00e9matiques et informatique appliqu\u00e9es aux sciences humaines et sociales. D\u00e9couverte des statistiques et de la mod\u00e9lisation.",
  },
  {
    year: "2021\u20132024",
    title: "Bachelor \u00b7 ESI Business School",
    description:
      "Trois ann\u00e9es entre Paris, Lyon et Aix-en-Provence. Formation \u00e0 l\u2019intersection du business, du digital et du d\u00e9veloppement durable.",
  },
  {
    year: "2024\u20132027",
    title: "EPITECH Marseille \u00b7 Pr\u00e9-MSc puis MSc Data & IA",
    description:
      "Machine Learning, Deep Learning, NLP. P\u00e9dagogie par projets, immersion totale. L\u2019intersection entre math\u00e9matiques, donn\u00e9es et syst\u00e8mes complexes.",
  },
];

const convictions = [
  {
    title: "Chaque projet m\u00e9rite d\u2019\u00eatre pens\u00e9",
    description:
      "Pas de templates, pas de raccourcis. Je pars de votre besoin r\u00e9el et je construis quelque chose qui vous ressemble.",
  },
  {
    title: "Le code est un mat\u00e9riau",
    description:
      "Comme l\u2019architecture ou le design, il se travaille avec intention. Chaque d\u00e9cision technique a un impact sur l\u2019exp\u00e9rience finale.",
  },
  {
    title: "Livrer, pas promettre",
    description:
      "Quatre projets en production, des utilisateurs r\u00e9els au quotidien. Ce qui compte, c\u2019est ce qui tourne, pas ce qui est pr\u00e9vu.",
  },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "\u00c0 propos", path: "/a-propos" },
        ])}
      />
      <JsonLd
        data={createWebPageSchema({
          type: "AboutPage",
          url: "/a-propos",
          name: "\u00c0 propos \u00b7 Jules Toussenel",
          description:
            "D\u00e9veloppeur web freelance bas\u00e9 \u00e0 Aix-en-Provence.",
        })}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
        {/* ── Hero ── */}
        <section className="pt-32 md:pt-48" aria-labelledby="apropos-heading">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              &Agrave; propos
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              id="apropos-heading"
              className="max-w-4xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              23 ans, curieux de tout, obstin&eacute; sur les d&eacute;tails.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Je m&rsquo;appelle Jules, n&eacute; un
              8&nbsp;mars&nbsp;2002, bas&eacute; &agrave; Aix-en-Provence.
              Je con&ccedil;ois et d&eacute;veloppe des applications web
              sur-mesure. CRM m&eacute;tier, plateformes SaaS, bots
              intelligents, outils d&rsquo;automatisation. De
              l&rsquo;architecture au d&eacute;ploiement, je prends en charge
              l&rsquo;int&eacute;gralit&eacute; du projet.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 flex flex-wrap gap-10 md:gap-16">
              <div>
                <p
                  className="font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  1er
                </p>
                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                  / 850 &middot; Winter Is Coding
                </p>
              </div>
              <div>
                <p
                  className="font-normal"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}
                >
                  1er
                </p>
                <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
                  / 1000 &middot; Le Match&rsquo;Up
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-12 w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>
        </section>

        {/* ── Ce qui me drive ── */}
        <section className="py-16" aria-labelledby="beyond-code-heading">
          <Reveal>
            <h2 id="beyond-code-heading" className="mb-6 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Au-del&agrave; du code
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-2xl">
              <p className="font-sans text-sm leading-[1.7] text-dark-chocolate/70">
                Je suis quelqu&rsquo;un d&rsquo;hyper curieux. Le genre
                &agrave; creuser un sujet pendant des heures juste parce
                qu&rsquo;il m&rsquo;intrigue. C&rsquo;est ce qui m&rsquo;a
                amen&eacute; au d&eacute;veloppement, et c&rsquo;est ce qui me
                pousse &agrave; aller plus loin chaque jour.
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/70">
                J&rsquo;adore l&rsquo;architecture. La grandeur des
                b&acirc;timents, la pr&eacute;cision des proportions, ce que
                chaque structure raconte sur ceux qui l&rsquo;ont pens&eacute;e.
                L&rsquo;art aussi, m&ecirc;me si je manque encore de culture
                &agrave; ce niveau. J&rsquo;appr&eacute;cie les choses &agrave;
                ma mani&egrave;re, sans pr&eacute;tention, avec sinc&eacute;rit&eacute;.
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/70">
                Les math&eacute;matiques, c&rsquo;est l&rsquo;autre fil rouge.
                Les statistiques, l&rsquo;analytique, la mod&eacute;lisation.
                Comprendre ce que les donn&eacute;es racontent, trouver des
                patterns, optimiser. C&rsquo;est ce qui m&rsquo;a orient&eacute;
                vers la Data et l&rsquo;IA, et ce qui nourrit ma fa&ccedil;on
                de construire des produits.
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/70">
                La musique m&rsquo;accompagne partout. 61&thinsp;391 minutes
                d&rsquo;&eacute;coute rien que sur Spotify. Quand je ne code
                pas, je regarde des s&eacute;ries et des films en tout genre.
                C&rsquo;est aussi l&agrave; que je trouve de
                l&rsquo;inspiration.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Parcours ── */}
        <section className="py-16" aria-labelledby="parcours-heading">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 id="parcours-heading" className="mb-10 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Parcours
            </h2>
          </Reveal>

          <ul className="border-t border-rule-light">
            {milestones.map((m, i) => (
              <Reveal key={i} delay={150 + i * 60}>
                <li className="border-b border-rule-light py-6 md:flex md:gap-12">
                  <p className="shrink-0 font-mono text-xs text-taupe md:w-20 md:pt-1">
                    {m.year}
                  </p>
                  <div>
                    <h3
                      className="font-normal"
                      style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.15rem)" }}
                    >
                      {m.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                      {m.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ── Chiffres ── */}
        <section className="py-16" aria-labelledby="chiffres-heading">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 id="chiffres-heading" className="mb-10 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              En quelques chiffres
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <p
                  className="font-normal text-dark-chocolate"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                >
                  10+
                </p>
                <p className="mt-1 font-sans text-xs text-taupe">
                  projets en production
                </p>
              </div>
              <div>
                <p
                  className="font-normal text-dark-chocolate"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                >
                  2
                </p>
                <p className="mt-1 font-sans text-xs text-taupe">
                  hackathons remport&eacute;s
                </p>
              </div>
              <div>
                <p
                  className="font-normal text-dark-chocolate"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                >
                  61k
                </p>
                <p className="mt-1 font-sans text-xs text-taupe">
                  minutes de musique par an
                </p>
              </div>
              <div>
                <p
                  className="font-normal text-dark-chocolate"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                >
                  24h
                </p>
                <p className="mt-1 font-sans text-xs text-taupe">
                  d&eacute;lai de r&eacute;ponse max
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Convictions ── */}
        <section className="py-16" aria-labelledby="convictions-heading">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 id="convictions-heading" className="mb-10 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Convictions
            </h2>
          </Reveal>

          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {convictions.map((c, i) => (
              <Reveal key={i} delay={150 + i * 80}>
                <div>
                  <h3
                    className="font-normal"
                    style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pb-32 pt-8" aria-labelledby="cta-heading">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="cta-heading"
              className="mt-12 max-w-2xl font-normal"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
            >
              Envie de travailler ensemble&thinsp;?
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 font-sans text-sm text-dark-chocolate/60">
              Un projet en t&ecirc;te, une question, ou juste
              l&rsquo;envie d&rsquo;&eacute;changer. Je r&eacute;ponds
              sous 24h.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Me contacter</CtaLink>
              <CtaLink href="/services">Voir mes services</CtaLink>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
