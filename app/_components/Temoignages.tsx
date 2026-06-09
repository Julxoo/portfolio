// PLACEHOLDER — section « Témoignages » (preuve sociale + signal local).
// Verbatims à fournir par Jules (citation + prénom + activité + ville).
// Plat volontairement : à retravailler ensemble.

const TEMOIGNAGES = [
  { citation: "[Témoignage à venir — 2 à 3 phrases d'un client réel.]", auteur: "Prénom", role: "Activité", ville: "Ville" },
  { citation: "[Témoignage à venir.]", auteur: "Prénom", role: "Activité", ville: "Ville" },
];

export function Temoignages() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div className="text-eyebrow uppercase text-ink/60">Témoignages</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink/30">
            Placeholder
          </span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[18ch] mb-10">
          Ce qu&apos;on en dit.
        </h2>
        <div className="grid md:grid-cols-2 gap-12 border-t border-rule-strong pt-10">
          {TEMOIGNAGES.map((t, i) => (
            <figure key={i}>
              <blockquote className="font-display text-[clamp(1.2rem,2vw,1.6rem)] leading-snug text-ink/85 max-w-[40ch]">
                « {t.citation} »
              </blockquote>
              <figcaption className="mt-4 font-sans text-body text-ink/55">
                {t.auteur} — {t.role}, {t.ville}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
