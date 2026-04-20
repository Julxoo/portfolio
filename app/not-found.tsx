import { Reveal, Rule, CtaLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="pb-24 pt-32 md:pt-48">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            404
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1
            className="font-light"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Page introuvable
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-16">
            <Rule />
          </div>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-12 max-w-2xl font-sans text-lg leading-[1.7] text-dark-chocolate/80">
            La page que vous recherchez n&rsquo;existe pas ou a
            &eacute;t&eacute; d&eacute;plac&eacute;e.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <CtaLink href="/">Retour &agrave; l&rsquo;accueil</CtaLink>
            <CtaLink href="/realisations">Voir les r&eacute;alisations</CtaLink>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
