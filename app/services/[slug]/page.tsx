import { Reveal, Rule, CtaLink } from "@/components/ui";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const includes = [
  "Design sur-mesure",
  "Responsive (mobile, tablette, desktop)",
  "CTA directs (téléphone, email, réseaux sociaux)",
  "Tracker Analytics intégré",
  "Optimisation performance",
  "Favicon sur-mesure",
  "Mentions légales + politique de confidentialité",
  "Hébergement inclus",
];

const options = [
  {
    title: "Identité visuelle complète",
    description:
      "Analyse de votre marque, de votre vision et de votre positionnement. Création d\u2019une identité visuelle cohérente : palette de couleurs, typographies, direction artistique.",
    price: "100",
  },
];

const steps = [
  {
    number: "01",
    title: "Échange",
    description:
      "On discute de votre projet, vos besoins, vos objectifs. Devis gratuit sous 24h.",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Design sur-mesure, développement, intégration de votre contenu. Vous validez à chaque étape.",
  },
  {
    number: "03",
    title: "Livraison",
    description:
      "Mise en ligne, configuration DNS, Tracker Analytics activé. Votre site est prêt.",
  },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      {/* ── Header + prix ── */}
      <section className="pt-32 md:pt-48">
        <Reveal>
          <p className="mb-6 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
            Services
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1
            className="font-normal"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {title}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/70">
            Votre site sur-mesure, hébergé, avec analytics intégré.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10">
            <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">
              à partir de
            </p>
            <p
              className="font-normal"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              300&thinsp;€
            </p>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-12 w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>
      </section>

      {/* ── Inclus ── */}
      <section className="pt-16 pb-16">
        <Reveal>
          <p className="mb-8 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
            Inclus
          </p>
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
          <p className="mt-8 font-sans text-xs text-taupe">
            Coût du nom de domaine à charge du client (renouvelable 1/2/3 ans).
          </p>
        </Reveal>
      </section>

      {/* ── Options ── */}
      <section className="py-16">
        <Reveal>
          <div className="w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-12 mb-8 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
            Sur mesure
          </p>
        </Reveal>

        <Reveal delay={150}>
          <p className="mb-8 max-w-2xl font-sans text-sm leading-[1.7] text-dark-chocolate/60">
            Chaque projet est unique. Ajoutez ce dont vous avez besoin, le devis
            s&apos;adapte.
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
                </div>
                <p className="mt-3 md:mt-0 shrink-0 font-serif text-lg text-dark-chocolate">
                  +&thinsp;{option.price}&thinsp;€
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Déroulement ── */}
      <section className="py-16">
        <Reveal>
          <div className="w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-12 mb-10 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
            Déroulement
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
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

      {/* ── CTA ── */}
      <section className="pb-32 pt-8">
        <Reveal>
          <div className="w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-12 font-sans text-lg text-dark-chocolate/70">
            Devis gratuit, sans engagement. Réponse sous 24h.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            <CtaLink href="/contact">Parlons-en</CtaLink>
            <CtaLink href="/services">Tous les services</CtaLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
