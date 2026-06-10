# Section Tarifs « Le prix qui s'ouvre » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le placeholder `app/_components/Tarifs.tsx` par un hameçon font-driven où le chiffre « 500 € » s'ouvre (graisse → contour) et laisse voir les inclus nichés dedans, + créer un stub `/tarifs`.

**Architecture:** Composant client piloté par Tempus (rAF partagé) depuis une progression de scroll lissée (lerp, anti-saut), exactement comme `Services.tsx`/`PourQui.tsx`. Le JS écrit graisse/remplissage/contour du chiffre et l'encrage des mots en inline ; `globals.css` (bloc `.prix-*`) pose la mise en scène et les replis. Calque sémantique réel (prix + inclus + lien) toujours dans le DOM ; le chiffre géant est décor `aria-hidden`. Nichage des mots réservé à ≥ md ; mobile/reduced-motion/SSR = état calme, liste en flux, zéro chevauchement.

**Tech Stack:** Next 16 (App Router) · React 19 · TypeScript · Tempus · Tailwind v4 · Clash Display (axe variable `wght` 200→700).

**Note sur la vérification (TDD adapté) :** le projet n'a **aucun runner de test** (`package.json` → `eslint` seul) et les sections motion existantes (`Services`, `PourQui`, `Temoignages`) shippent vérifiées par lint + build + contrôle visuel. Ajouter Vitest/Jest = nouvelle dépendance, interdit par les règles globales sans accord. On suit donc le pattern maison : chaque tâche se vérifie par `bun lint` + `bun run build` + contrôle visuel Playwright. Pas de tests unitaires inventés.

---

### Task 1: Section home — composant + styles

**Files:**
- Modify (remplacement complet) : `app/_components/Tarifs.tsx`
- Modify (ajout d'un bloc) : `app/globals.css` (insérer après le bloc Témoignages `.tm-*`, avant les `@media (prefers-reduced-motion …)` de fin)

- [ ] **Step 1: Remplacer entièrement `app/_components/Tarifs.tsx` par ce composant**

```tsx
"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useTempus } from "tempus/react";
import { SlideLink, InlineLink } from "../_lib/ui/Link";

// =====================================================================
// Tarifs — « Le prix qui s'ouvre ».
//
// Le chiffre « 500 € » arrive PLEIN (encre kaki, graisse haute). À mesure
// que la section se pose, sa graisse retombe et il passe en CONTOUR : ses
// contre-formes s'ouvrent comme des fenêtres. Trois inclus s'y encrent en
// cascade (nom de domaine / hébergement / mise en ligne). Le prix CONTIENT
// ce qu'il comprend — aucune carte, aucun prix barré, aucune checklist.
//
// SCROLL DÉCOUPLÉ : la progression n'est pas collée 1:1 au scroll — un lerp
// Tempus la lisse vers la cible. Même lancé vite, le chiffre ouvre/ferme
// sans saut (même principe que Services/ProjectScene).
//
// Sémantique : le contenu réel (prix + inclus + lien) vit en flux sous la
// figure, lisible. La figure géante est décor (aria-hidden). Repli sans JS /
// reduced-motion ET mobile (< md) : pas de nichage — chiffre plein lisible,
// inclus en liste dessous, zéro chevauchement. data-prix="play" posé au
// montage hors reduced-motion.
// =====================================================================

const INCLUS = [
  { mot: "nom de domaine", x: "16%", y: "58%" },
  { mot: "hébergement", x: "45%", y: "47%" },
  { mot: "mise en ligne", x: "73%", y: "47%" },
];

const SURFACE = "83, 80, 64"; // --color-surface #535040, en RGB (l'encre kaki)

// Géométrie de l'ouverture (progression locale 0..1, lissée).
const OPEN_START = 0.18; // le chiffre commence à s'ouvrir
const OPEN_END = 0.62; // contour atteint
const WORD_START = 0.4; // le premier mot s'encre
const WORD_STAGGER = 0.12; // décalage entre mots
const WORD_DUR = 0.26; // durée d'encrage d'un mot

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// lerp indépendant du frame-rate (même formule que Services/PourQui).
const fri = (cur: number, target: number, dt: number, diss = 0.8) =>
  cur + (target - cur) * (1 - Math.pow(diss, dt * 60));

// Le moteur tourne hors reduced-motion. Snapshot serveur = false → le SSR
// rend le repli (état calme) ; le client bascule "play" à l'hydratation.
function useShouldPlay() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function Tarifs() {
  const play = useShouldPlay();
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progRef = useRef(0); // progression LISSÉE (ce qu'on affiche)
  const visibleRef = useRef(false);
  const desktopRef = useRef(false);

  // Le nichage n'a lieu qu'au-dessus de md (≥ 768px). En dessous, le JS ne
  // touche à rien : le CSS de base affiche l'état calme.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      desktopRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Coupe la boucle quand la section est hors champ.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "10% 0px 10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useTempus((_time: number, deltaMs: number) => {
    const section = sectionRef.current;
    const number = numberRef.current;
    if (!play || !section || !number || !visibleRef.current) return;
    if (!desktopRef.current) return; // mobile = état calme (CSS only)

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 quand la section entre par le bas ; 1 quand elle s'est posée (haut
    // remonté à ~30% du viewport). Lissé ensuite pour interdire tout saut.
    const target = clamp01((vh - rect.top) / (vh * 0.7));
    const dt = Math.min(0.05, (deltaMs || 16) / 1000);
    progRef.current = fri(progRef.current, target, dt);
    const p = progRef.current;

    // Le chiffre s'ouvre : graisse retombe, le plein se vide, le contour monte.
    const open = clamp01((p - OPEN_START) / (OPEN_END - OPEN_START));
    const e = easeOutCubic(open);
    const wght = 640 - e * (640 - 240);
    const fill = 1 - e; // alpha du remplissage : plein → contour
    const stroke = e * 0.55; // alpha du contour : 0 → visible
    number.style.fontVariationSettings = `"wght" ${Math.round(wght)}`;
    number.style.color = `rgba(${SURFACE}, ${fill.toFixed(3)})`;
    number.style.webkitTextStrokeColor = `rgba(${SURFACE}, ${stroke.toFixed(3)})`;

    // Les inclus s'encrent dans les ouvertures, en cascade.
    for (let i = 0; i < INCLUS.length; i++) {
      const el = wordRefs.current[i];
      if (!el) continue;
      const localP = clamp01((p - (WORD_START + i * WORD_STAGGER)) / WORD_DUR);
      const ease = easeOutCubic(localP);
      el.style.opacity = ease.toFixed(3);
      el.style.fontVariationSettings = `"wght" ${Math.round(
        200 + ease * (560 - 200),
      )}`;
      el.style.transform = `translate(-50%, calc(-50% + ${(
        (1 - ease) *
        0.5
      ).toFixed(3)}rem))`;
    }
  });

  return (
    <section
      ref={sectionRef}
      data-prix={play ? "play" : undefined}
      className="prix-section px-gutter py-section-lg border-t border-rule overflow-clip"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Tarifs</div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[20ch]">
          Combien ça coûte.
        </h2>

        {/* La figure — décor : le chiffre qui s'ouvre et laisse voir ce qu'il
            contient. Masquée aux lecteurs d'écran ; le contenu réel vit en
            dessous (prix + inclus + lien), lisible et en flux. */}
        <div className="prix-figure" aria-hidden="true">
          <span ref={numberRef} className="prix-number font-display">
            500&nbsp;€
          </span>
          <ul className="prix-inclus">
            {INCLUS.map((it, i) => (
              <li
                key={it.mot}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                style={{ "--sx": it.x, "--sy": it.y } as CSSProperties}
                className="prix-inclus-item font-display"
              >
                {it.mot}
              </li>
            ))}
          </ul>
        </div>

        {/* Contenu réel — la ligne calme, sémantique, toujours lisible. */}
        <div className="prix-line max-w-[44ch]">
          <p className="font-display text-lead text-ink">
            Dès <strong>500 €</strong>, mise en ligne comprise
            <sup className="align-super text-[0.7em] text-accent-deep">*</sup>.
          </p>
          <p className="font-sans text-[13px] text-ink/55 mt-3">
            <span aria-hidden="true">* </span>Ce que comprend chaque projet —
            nom de domaine, hébergement, mise en ligne — en détail sur la{" "}
            <InlineLink href="/tarifs">page Tarifs</InlineLink>.
          </p>
          <div className="mt-8">
            <SlideLink href="/tarifs">Voir les tarifs</SlideLink>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ajouter le bloc `.prix-*` à `app/globals.css`**

Insérer ce bloc après la fin du bloc Témoignages (`.tm-*`) et AVANT les `@media (prefers-reduced-motion …)` de fin de fichier :

```css
/* =============================================================================
 * Tarifs (.prix-*) — « Le prix qui s'ouvre ».
 *
 * Le chiffre « 500 € » arrive plein (encre, graisse haute) puis, à mesure que
 * la section se pose, sa graisse retombe et il passe en CONTOUR : ses
 * contre-formes s'ouvrent. Trois inclus s'y encrent (nom de domaine /
 * hébergement / mise en ligne). Le prix CONTIENT ce qu'il comprend.
 *
 * Piloté en JS (Tempus) depuis une progression LISSÉE — voir Tarifs.tsx. Le JS
 * écrit graisse + remplissage + contour du chiffre et l'encrage des mots, en
 * inline. Le CSS ne pose que la mise en scène et les replis.
 *
 * Repli (sans JS / reduced-motion) ET mobile (< md) : pas de nichage. Le
 * chiffre reste en encre pleine lisible, les inclus en liste sous lui.
 * ============================================================================= */
.prix-figure {
  position: relative;
  margin: clamp(2.5rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
}
.prix-number {
  display: block;
  font-size: clamp(5rem, 22vw, 16rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  font-variation-settings: "wght" 560;
  -webkit-text-stroke: 2px transparent;
}
/* Repli / mobile : les inclus en liste propre sous le chiffre. */
.prix-inclus {
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.75rem;
}
.prix-inclus-item {
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  color: var(--color-surface);
  font-variation-settings: "wght" 520;
}
.prix-inclus-item::before {
  content: "— ";
  color: var(--color-accent-deep);
}
.prix-line strong {
  font-variation-settings: "wght" 640;
}

/* ≥ md ET moteur actif : le nichage. Les inclus se posent DANS le chiffre, sur
   leurs ancres (--sx/--sy) ; le JS les encre. État initial du chiffre = arrivée
   (plein) pour éviter tout flash avant la 1re frame. */
@media (min-width: 768px) {
  .prix-section[data-prix="play"] .prix-number {
    font-variation-settings: "wght" 640;
    will-change: font-variation-settings, color;
  }
  .prix-section[data-prix="play"] .prix-inclus {
    position: absolute;
    inset: 0;
    margin: 0;
    pointer-events: none;
  }
  .prix-section[data-prix="play"] .prix-inclus-item {
    position: absolute;
    left: var(--sx);
    top: var(--sy);
    transform: translate(-50%, -50%);
    opacity: 0;
    white-space: nowrap;
    font-size: clamp(0.9rem, 1.5vw, 1.25rem);
    will-change: opacity, transform, font-variation-settings;
  }
  .prix-section[data-prix="play"] .prix-inclus-item::before {
    content: none;
  }
}
```

- [ ] **Step 3: Lint**

Run: `bun lint`
Expected: PASS, aucune erreur/warning sur `Tarifs.tsx`.

- [ ] **Step 4: Build (type-check)**

Run: `bun run build`
Expected: build OK, aucune erreur TypeScript (vérifie notamment le typage de `{ "--sx": … } as CSSProperties` et de `useTempus`).

- [ ] **Step 5: Contrôle visuel desktop + calibrage des ancres**

Lancer le dev server en arrière-plan : `bun dev` (port par défaut 3000).
Avec Playwright (MCP) : `browser_navigate` vers `http://localhost:3000/`, `browser_resize` 1440×900, scroller jusqu'à la section Tarifs, `browser_take_screenshot`.
Attendu : à l'arrivée le « 500 € » est plein/lourd ; posé, il passe en contour et les 3 mots apparaissent encrés, chacun lisible dans une ouverture du chiffre (bol du 5, rond de chaque 0).
Si un mot tombe à côté de son creux, ajuster les `x`/`y` du tableau `INCLUS` (Step 1) — valeurs de départ : 16/58, 45/47, 73/47. Réajuster jusqu'à lecture « niché ».

- [ ] **Step 6: Contrôle visuel mobile + reduced-motion (repli)**

`browser_resize` 390×844 → la figure montre le chiffre plein + les 3 inclus en liste sous lui, **sans chevauchement**, le bloc « Dès 500 €… » lisible, le lien « Voir les tarifs » présent.
Reduced-motion : `browser_emulate_media` (ou via devtools) `prefers-reduced-motion: reduce`, recharger → même état calme, pas d'animation, `data-prix` absent.

- [ ] **Step 7: Commit**

```bash
git add app/_components/Tarifs.tsx app/globals.css
git commit -m "feat(tarifs): section « Le prix qui s'ouvre » — chiffre font-driven"
```

---

### Task 2: Stub page `/tarifs`

**Files:**
- Create: `app/tarifs/page.tsx`

- [ ] **Step 1: Créer `app/tarifs/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SlideLink } from "../_lib/ui/Link";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Réalisez votre projet dès 500 €, mise en ligne comprise. Le détail des formules sur-mesure arrive bientôt.",
  alternates: { canonical: "/tarifs" },
};

export default function Tarifs() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un prix d'entrée clair, le sur-mesure au-dessus.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Tarifs.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[52ch]">
            Réalisez votre projet <strong>dès 500 €</strong>, mise en ligne
            comprise — nom de domaine, hébergement et déploiement inclus.
            Au-dessus, chaque site est dessiné depuis zéro, chiffré sur devis.
          </p>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-section-md">
          <div className="flex flex-col gap-4 max-w-[52ch]">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
              La grille détaillée arrive bientôt
            </h2>
            <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
              Formules, ce qui est compris ligne à ligne et délais types
              seront publiés ici. En attendant, le plus simple reste d'en
              parler de vive voix — un devis gratuit, une réponse sous deux
              jours.
            </p>
            <div className="mt-4">
              <SlideLink href="/contact">Demander un devis gratuit</SlideLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Lint + build**

Run: `bun lint && bun run build`
Expected: PASS ; la route `/tarifs` apparaît dans la sortie de build de Next.

- [ ] **Step 3: Contrôle visuel + lien**

Playwright : `browser_navigate` vers `http://localhost:3000/tarifs` → la page s'affiche dans la charte (titre, lead, filet). Puis depuis la home, cliquer « Voir les tarifs » et l'`InlineLink` « page Tarifs » → arrivent bien sur `/tarifs` (plus de 404).

- [ ] **Step 4: Commit**

```bash
git add app/tarifs/page.tsx
git commit -m "feat(tarifs): stub page /tarifs (détail à venir)"
```

---

### Task 3: Entrée de navigation (si la nav énumère les routes)

**Files:**
- Inspect: `app/_components/Header.tsx`, `app/_components/MobileMenu.tsx`

- [ ] **Step 1: Vérifier si la nav liste les routes principales**

Lire `app/_components/Header.tsx` et `app/_components/MobileMenu.tsx`. Chercher un tableau de liens (ex. `{ href: "/projets", label: "Projets" }`).
- Si **un tel tableau existe** et liste les pages publiques (Projets, Méthode, À propos, Carnet…), ajouter `{ href: "/tarifs", label: "Tarifs" }` à la **même** structure, à une place cohérente (après Méthode ou avant Contact), en suivant le format exact des entrées voisines.
- Si **la nav ne liste pas ces routes** (nav minimale, ou liens en dur sans structure commune), **ne rien ajouter** : `/tarifs` reste atteignable par l'ancre de la home. Noter « nav inchangée (pas de liste de routes à étendre) » et passer au Step 3.

- [ ] **Step 2: Lint + build (si une entrée a été ajoutée)**

Run: `bun lint && bun run build`
Expected: PASS ; vérifier visuellement (Playwright) que « Tarifs » apparaît dans le header et le menu mobile et pointe vers `/tarifs`.

- [ ] **Step 3: Commit (si modifié)**

```bash
git add app/_components/Header.tsx app/_components/MobileMenu.tsx
git commit -m "feat(nav): lien Tarifs dans la navigation"
```

---

## Vérification finale

- [ ] `bun lint` — PASS sur tout le diff.
- [ ] `bun run build` — PASS, routes `/` et `/tarifs` présentes.
- [ ] Desktop : le « 500 € » s'ouvre, les 3 inclus se nichent et restent lisibles.
- [ ] Mobile + reduced-motion : état calme, liste propre, zéro chevauchement.
- [ ] Aucun 404 sur « Voir les tarifs » / « page Tarifs ».
- [ ] Arrêter le dev server lancé en arrière-plan.
