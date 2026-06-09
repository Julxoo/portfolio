// Services — « L'encre qui remplit ».
//
// Signature : chaque discipline est tracée en contour kaki (text-stroke) puis
// l'encre la remplit de gauche à droite au scroll — le mot se « dessine ».
// Pur CSS scroll-driven (.sv-* dans globals.css), zéro JS. Repli = mot plein.
//
// Section calme et verticale, à dessein : elle contraste avec le balayage
// horizontal des Projets qui suit, et enchaîne le récit « ce que je dessine »
// → « ce qui sort de l'atelier ».
//
const SERVICES = [
  { nom: "Sites vitrines", desc: "Sur-mesure, dessinés depuis zéro. Le cœur de l'atelier." },
  { nom: "Boutiques en ligne", desc: "E-commerce léger, sans usine à gaz." },
  { nom: "MCP", desc: "Serveurs Model Context Protocol — vos outils branchés à l'IA." },
  { nom: "Logiciels sur-mesure", desc: "Outils internes, dashboards, automatisations." },
];

export function Services() {
  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Services</div>
        <p className="font-sans text-body text-ink/55 max-w-[46ch] mb-14 md:mb-20">
          Sur-mesure, depuis Aix-en-Provence — du site vitrine au logiciel.
        </p>

        <div className="flex flex-col gap-12 md:gap-16">
          {SERVICES.map((s) => (
            <div key={s.nom}>
              <h3 className="sv-line font-display text-[clamp(2.6rem,8.5vw,7rem)]">
                {s.nom}
              </h3>
              <p className="mt-4 font-sans text-body text-ink/60 max-w-[42ch]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
