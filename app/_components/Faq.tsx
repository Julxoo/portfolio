// FAQ — objections + longue-traîne SEO. Accordéon natif <details> (accessible,
// sans JS, contenu indexable) + JSON-LD FAQPage. Questions/réponses curatées
// (cf. recherche : prix, propriété, délai, sur-mesure, autonomie, solo, SEO).

const FAQ: { q: string; a: string }[] = [
  {
    q: "Combien coûte un site avec vous ?",
    a: "Un projet démarre dès 500 €, mise en ligne comprise : conception sur-mesure, nom de domaine, hébergement et déploiement inclus. Au-dessus, le tarif dépend du nombre de pages et des fonctions, toujours sur devis gratuit. Vous savez à quoi vous attendre avant de signer.",
  },
  {
    q: "En combien de temps mon site est-il en ligne ?",
    a: "Comptez environ trois semaines pour une mise en route, un peu plus pour un site plus large. On avance par étapes sur la vraie version, donc vous voyez le site grandir au lieu d'attendre une livraison surprise à la fin.",
  },
  {
    q: "C'est du sur-mesure ou un template ?",
    a: "Du sur-mesure. Chaque site est dessiné depuis zéro, à partir de votre métier et de vos clients, jamais posé sur un thème tout fait. C'est ce qui fait qu'il ne ressemble à aucun autre.",
  },
  {
    q: "Le site m'appartient vraiment ?",
    a: "Oui, entièrement. Le nom de domaine est déposé à votre nom, l'hébergement n'est verrouillé sur aucune plateforme, et le code vous revient. Vous n'êtes jamais prisonnier d'un prestataire : c'est votre site, pas le mien.",
  },
  {
    q: "Puis-je le modifier moi-même ensuite ?",
    a: "Oui. Vous changez vos textes, vos photos, votre carte ou vos tarifs quand vous voulez, sans avoir à me rappeler. Je vous montre comment faire à la livraison, et je reste là si une question se pose.",
  },
  {
    q: "Dois-je fournir les textes et les photos ?",
    a: "L'idéal, c'est que vous apportiez la matière : vous connaissez votre métier mieux que personne. Je vous aide à la structurer et à la mettre en valeur, et on trouve une solution si certaines photos ou certains textes manquent.",
  },
  {
    q: "Vous travaillez seul : que se passe-t-il après la livraison ?",
    a: "Vous avez un seul interlocuteur du premier échange jusqu'à la mise en ligne, et je reste joignable ensuite pour les évolutions. Comme le domaine est à votre nom et le code chez vous, votre site continue de tourner quoi qu'il arrive.",
  },
  {
    q: "Mon site va-t-il remonter sur Google ?",
    a: "Il part avec des bases solides : structure propre, vitesse, balises et référencement local soignés. La visibilité se construit sur quelques mois ; je ne promets pas la première place du jour au lendemain, mais le terrain est préparé.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      {/* Données structurées pour les résultats enrichis Google. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">FAQ</div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[18ch] mb-10 md:mb-14">
          Les questions qu&apos;on me pose.
        </h2>

        <div className="border-t border-rule-strong">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq-item border-b border-rule">
              <summary className="flex items-start justify-between gap-8 py-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep">
                <span className="font-display text-[clamp(1.1rem,1.7vw,1.4rem)] leading-snug text-ink">
                  {q}
                </span>
                {/* Marqueur + qui pivote en × à l'ouverture. */}
                <span
                  aria-hidden
                  className="faq-icon relative mt-1.5 block h-4 w-4 shrink-0 text-accent-deep"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                </span>
              </summary>
              <div className="faq-answer font-sans text-body text-ink/65 leading-[1.65] max-w-[64ch] pb-7">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
