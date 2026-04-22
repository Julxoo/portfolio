import { Reveal, Rule, CtaLink } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="pb-24 pt-32 md:pt-48">
        <Reveal>
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            404
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1
            className="font-serif font-light leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Page introuvable
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-16 w-16 md:w-24">
            <Rule />
          </div>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-12 max-w-2xl font-sans text-lg leading-[1.75] text-ink/75">
            La page que vous recherchez n&rsquo;existe pas ou a
            &eacute;t&eacute; d&eacute;plac&eacute;e.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <CtaLink href="/">Retour &agrave; l&rsquo;accueil</CtaLink>
            <CtaLink href="/realisations">Voir les r&eacute;alisations</CtaLink>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
