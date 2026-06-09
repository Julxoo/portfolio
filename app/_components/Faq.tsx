// PLACEHOLDER — section « FAQ » (SEO longue-traîne + levée d'objections).
// Réponses à écrire ensemble ; pensera au JSON-LD FAQPage ensuite.
// Plat volontairement : à retravailler.

const QUESTIONS = [
  "Combien coûte un site vitrine ?",
  "En combien de temps est-il livré ?",
  "Puis-je modifier le site moi-même ensuite ?",
  "À qui appartient le code une fois livré ?",
  "Travaillez-vous à distance, partout en France ?",
  "Et l'hébergement, le nom de domaine ?",
];

export function Faq() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <div className="text-eyebrow uppercase text-ink/60">FAQ</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink/30">
            Placeholder
          </span>
        </div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[18ch] mb-10">
          Les questions qu&apos;on me pose.
        </h2>
        <dl className="border-t border-rule-strong">
          {QUESTIONS.map((q) => (
            <div key={q} className="py-6 border-b border-rule">
              <dt className="font-display text-[1.2rem] text-ink mb-2">{q}</dt>
              <dd className="font-sans text-body text-ink/55 max-w-[60ch]">
                [Réponse à rédiger.]
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
