import type { Metadata } from "next";
import { Reveal, Rule, CtaLink } from "@/components/ui";
import { FloatingDevis } from "@/components/ui/floating-devis";
import { JsonLd } from "@/components/seo/JsonLd";
import { createBreadcrumbSchema, createServiceSchema } from "@/lib/schemas";
import { getPostsByCategory } from "@/lib/blog";
import { BlogPostList } from "@/components/blog/post-list";

export const metadata: Metadata = {
  title: "Bot Telegram d'affiliation sur mesure",
  description:
    "Bot Telegram d'affiliation sur mesure. Parcours utilisateurs, dashboard de gestion, modules personnalisés. À partir de 350 €.",
  alternates: { canonical: "/services/bot-affiliation" },
};

const capabilities = [
  {
    title: "Accueil et parcours utilisateur",
    description:
      "Message de bienvenue, menus interactifs, navigation par boutons. Chaque utilisateur est guid\u00e9 vers le bon contenu d\u00e8s la premi\u00e8re interaction.",
  },
  {
    title: "Int\u00e9gration de vos liens",
    description:
      "Liens d\u2019affiliation, redirections, tracking. Vos liens sont int\u00e9gr\u00e9s naturellement dans le parcours, sans friction.",
  },
  {
    title: "Communication cibl\u00e9e",
    description:
      "Envoi de messages \u00e0 tous vos utilisateurs ou \u00e0 des segments pr\u00e9cis. Texte, images, liens. Vous gardez le contact avec votre audience.",
  },
  {
    title: "Gestion des participants",
    description:
      "Inscription, suivi, historique. Vous savez exactement qui interagit avec votre bot et comment.",
  },
  {
    title: "Modules sur mesure",
    description:
      "Syst\u00e8me de loterie, quizz, collecte de donn\u00e9es, multi-langue, notifications programm\u00e9es. Si vous pouvez l\u2019imaginer, je peux le construire.",
  },
  {
    title: "Dashboard de gestion",
    description:
      "Interface web compl\u00e8te pour piloter vos bots sans toucher au code. Participants, messages, statistiques, configuration. Tout au m\u00eame endroit.",
  },
];

const steps = [
  {
    number: "01",
    title: "\u00c9change",
    description:
      "On d\u00e9finit ensemble votre strat\u00e9gie. Niche, audience, parcours utilisateur, objectifs. Je vous envoie un devis clair sous 24h.",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Je construis votre bot. Menus, messages, parcours, int\u00e9grations. Vous validez chaque \u00e9tape avant de passer \u00e0 la suivante.",
  },
  {
    number: "03",
    title: "Tests",
    description:
      "Le bot est test\u00e9 en conditions r\u00e9elles. Vous v\u00e9rifiez les parcours, les messages, les redirections. On ajuste jusqu\u2019\u00e0 ce que tout soit parfait.",
  },
  {
    number: "04",
    title: "Lancement",
    description:
      "D\u00e9ploiement, h\u00e9bergement, mise en ligne. Vos premiers utilisateurs peuvent interagir imm\u00e9diatement.",
  },
];

export default function BotAffiliationPage() {
  const relatedPosts = getPostsByCategory("Automatisation", 3);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Bot d\u2019affiliation", path: "/services/bot-affiliation" },
        ])}
      />
      <JsonLd
        data={createServiceSchema({
          name: "Bot Telegram d'affiliation sur mesure",
          description:
            "Bot Telegram d'affiliation sur mesure. Parcours utilisateurs, dashboard de gestion, modules personnalisés.",
          slug: "bot-affiliation",
          price: "350",
          priceLabel: "À partir de",
        })}
      />
      <main className="mx-auto max-w-7xl px-6 md:px-12">
        <FloatingDevis
          messageTemplate={
            "Bonjour Jules !\n\nJe suis {prenom} {nom} et je cherche \u00e0 cr\u00e9er un bot T\u00e9l\u00e9gram pour mon activit\u00e9 d\u2019affiliation.\n\nMon activit\u00e9 : {activite}\n\nJ\u2019aimerais en discuter avec vous pour voir ce qui est possible.\n\nMerci !"
          }
        />

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-48">
          <Reveal>
            <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Bot d&rsquo;affiliation T&eacute;l&eacute;gram
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1
              className="max-w-4xl font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Transformez T&eacute;l&eacute;gram en machine &agrave; convertir.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
              Un bot qui accueille votre audience, la guide &agrave; travers des
              parcours personnalis&eacute;s et la redirige vers vos offres.
              Enti&egrave;rement con&ccedil;u autour de votre strat&eacute;gie,
              pas un template.
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
                  350&thinsp;&euro;
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
                  7 jours
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

        {/* ── Approche ── */}
        <section className="py-16">
          <Reveal>
            <h2 className="mb-6 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              L&rsquo;approche
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="max-w-2xl">
              <h3
                className="font-normal"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
              >
                Chaque bot est pens&eacute; pour votre activit&eacute;.
              </h3>
              <p className="mt-6 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                Pas de solution g&eacute;n&eacute;rique. Je pars de votre niche,
                votre audience, vos objectifs de conversion. Le r&eacute;sultat
                est un bot qui refl&egrave;te votre strat&eacute;gie, avec des
                parcours utilisateurs pens&eacute;s pour engager et rediriger
                efficacement.
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                Qu&rsquo;il s&rsquo;agisse d&rsquo;un premier bot ou
                d&rsquo;un &eacute;cosyst&egrave;me complet avec dashboard
                de gestion, la solution s&rsquo;adapte &agrave; vos besoins
                r&eacute;els.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Ce que je construis ── */}
        <section className="py-16">
          <Reveal>
            <div className="w-16 md:w-24">
              <Rule />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mb-6 mt-12 font-sans text-[13px] font-normal uppercase tracking-[0.15em] leading-normal text-taupe">
              Ce que je construis
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mb-10 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Quelques exemples de fonctionnalit&eacute;s
              r&eacute;alis&eacute;es pour mes clients. Chaque projet est
              diff&eacute;rent, cette liste n&rsquo;est qu&rsquo;un aper&ccedil;u.
            </p>
          </Reveal>

          <ul className="border-t border-rule-light">
            {capabilities.map((cap, i) => (
              <Reveal key={i} delay={180 + i * 60}>
                <li className="border-b border-rule-light py-6 md:flex md:gap-12">
                  <h3
                    className="shrink-0 font-normal md:w-64"
                    style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.15rem)" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-[1.7] text-dark-chocolate/60 md:mt-0">
                    {cap.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={550}>
            <p className="mt-8 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              Vous avez un besoin sp&eacute;cifique qui n&rsquo;appara&icirc;t
              pas ici ? Parlons-en, chaque fonctionnalit&eacute; peut &ecirc;tre
              construite sur mesure.
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
              D&eacute;crivez votre projet, je vous envoie un devis sous 24h.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 font-sans text-sm text-dark-chocolate/60">
              Gratuit, sans engagement. On commence par en parler.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <CtaLink href="/contact">Discutons de votre projet</CtaLink>
              <CtaLink href="/services">Tous les services</CtaLink>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
