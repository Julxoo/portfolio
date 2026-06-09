// PLACEHOLDER — section « Tarifs » (prix → qualification).
// Décision en attente : A (entrée 500 € + vitrine sur-mesure « à partir de X »),
// B (devis gratuit + fourchette), C (500 € partout). Plat : à retravailler.

export function Tarifs() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div className="text-eyebrow uppercase text-ink/60">Tarifs</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink/30">
            Placeholder · prix à définir (A/B/C)
          </span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[18ch] mb-10">
          Combien, combien de temps.
        </h2>
        <div className="border-t border-rule-strong pt-8 max-w-[52ch]">
          <p className="font-sans text-body text-ink/65">
            [Grille tarifaire à définir. Selon le choix A/B/C : offre
            d&apos;entrée, site vitrine sur-mesure « à partir de… », et délai
            type (3 semaines). Devis gratuit.]
          </p>
        </div>
      </div>
    </section>
  );
}
