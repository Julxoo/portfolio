// PLACEHOLDER — section « Pour qui » (positionnement + SEO + auto-identification).
// Plat volontairement : à retravailler ensemble.

const AUDIENCES = [
  { titre: "Artisans", note: "Métiers de bouche, ateliers, savoir-faire local." },
  { titre: "Commerces premium", note: "Boutiques, hôtellerie, lieux de réception." },
  { titre: "PME & marques", note: "Structures qui veulent un site tenu, pas bricolé." },
];

export function PourQui() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div className="text-eyebrow uppercase text-ink/60">Pour qui</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink/30">
            Placeholder
          </span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[22ch] mb-10">
          Pour celles et ceux qui veulent un site{" "}
          <span className="text-surface">dessiné</span>, pas un template.
        </h2>
        <ul className="grid md:grid-cols-3 gap-8">
          {AUDIENCES.map((a) => (
            <li key={a.titre}>
              <h3 className="font-display text-[1.25rem] text-ink mb-2">
                {a.titre}
              </h3>
              <p className="font-sans text-body text-ink/65 max-w-[34ch]">
                {a.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
