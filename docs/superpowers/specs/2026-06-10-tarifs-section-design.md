# Section Tarifs — « Le prix qui s'ouvre »

Date : 2026-06-10
Statut : design validé, prêt pour plan d'implémentation

## Intention

Refondre la section Tarifs de la home (`app/_components/Tarifs.tsx`, aujourd'hui
placeholder) en un hameçon **purement font-driven** construit autour d'un seul
chiffre — « dès 500 € » — qui pousse vers une future page `/tarifs`.

Modèle tarifaire retenu : **ancre d'entrée + renvoi**. Pas de grille de cartes sur
la home. Un seul message honnête : « Réalisez votre projet **dès 500 €, mise en
ligne comprise\*** », l'astérisque renvoyant au détail sur `/tarifs`.

## Concept d'interaction — « Le prix qui s'ouvre »

Le « 500 € » est géant. Le geste tient en une idée : **le prix s'ouvre pour
montrer ce qu'il contient.** La liste des inclus n'est pas une checklist — elle
vit *dans* le chiffre.

Cinématique (pilotée par la progression de scroll, lissée Tempus, comme Services) :

- **Arrivée** : le « 500 € » est massif, **plein, encre pleine** (axe `wght` haut,
  ~620). Une affirmation.
- **Repos** (plan de lecture) : la graisse retombe et le chiffre passe en
  **contour / outline** (poids très light + `-webkit-text-stroke` kaki, fill quasi
  transparent) — les contre-formes s'ouvrent comme des fenêtres.
- Dans ces ouvertures, **3 mots d'inclus** s'encrent (ink-in `wght`, mécanique
  Services/Manifeste) : **« nom de domaine »**, **« hébergement »**,
  **« mise en ligne »** — posés sur 3 slots calés (un par creux visuel : bol du 5,
  rond des deux 0).
- En dessous, calme : **« dès 500 €, mise en ligne comprise\* »** + note
  astérisque + lien **« Voir les tarifs → »**.

Codes du pricing volontairement cassés : aucune carte, aucun prix barré, aucun
« /mois », aucune checklist. Le prix *est* la liste de ce qu'il comprend.

## Robustesse — pourquoi ça ne casse pas

L'illusion « dedans » **ne dépend pas** de la vraie géométrie des glyphes Clash
(non exposée, variable selon l'axe de graisse et le breakpoint — source de casse
iOS connue). Mécanisme :

- Le chiffre géant est rendu en **outline** au repos → tout élément qui le
  chevauche se lit comme niché, sans calcul de counter réel.
- Les 3 mots sont positionnés sur **3 ancres en % calées à la main** (clamp pour
  l'échelle), pas sur les contre-formes réelles. Un léger décalage reste lisible.

## Sémantique & accessibilité

- **Base DOM = texte réel** : le prix, la liste des 3 inclus et le lien sont du
  texte sémantique présent dans le DOM (SEO, lecteurs d'écran, copier-coller).
- Le **chiffre géant décoratif** est `aria-hidden`.
- L'astérisque : `mise en ligne comprise` suivi d'un `*`, et une note courte
  « \* Détail des prestations sur la page Tarifs » liée à `/tarifs`.

## Replis

- **SSR / sans JS / `prefers-reduced-motion: reduce`** : état calme stable —
  grand « 500 € » figé au repos (lisible) + les 3 inclus en **petite liste propre
  dessous**, **zéro chevauchement**. Pas de cinématique.
- Boucle Tempus **coupée hors écran** (IntersectionObserver), comme les autres
  sections.
- Drapeau `data-*="play"` posé au montage si le moteur tourne (cf. Services).

## Responsive

- **≥ md** : nichage des 3 mots dans le chiffre (bonus desktop).
- **< md** : **pas de nichage** (trop étroit, risque iOS). Grand « 500 € » + les
  3 inclus en liste propre dessous. Même rendu que le repli reduced-motion.

## Page `/tarifs` (stub pour cette itération)

La page détaillée est **différée**. Pour que l'astérisque et le lien « Voir les
tarifs » ne tombent pas sur un 404, créer un **stub minimal** : `app/tarifs/page.tsx`
avec titre + eyebrow + filet dans la charte, métadonnées de base, et un paragraphe
court annonçant le détail à venir. Structure de la grille (Mise en route / Site
sur-mesure / Sur-mesure +) et montants seront traités dans une itération
ultérieure.

## Périmètre de cette itération

1. Réécriture de `app/_components/Tarifs.tsx` → composant client font-driven
   (Tempus, axe variable Clash, calque sémantique + décor, replis).
2. Styles associés dans `app/globals.css` si besoin (à la manière de `svt-*` /
   `pq-*`).
3. Stub `app/tarifs/page.tsx` + entrée éventuelle dans la navigation si pertinent.

Hors périmètre : grille tarifaire détaillée, FAQ prix, contenu complet de `/tarifs`.

## Critères de réussite

- La section lit « dès 500 €, mise en ligne comprise\* » avec les 3 inclus nichés
  dans le chiffre au repos (desktop), animation fluide sur iOS.
- Replis corrects : sans JS / reduced-motion / mobile → liste propre, lisible,
  aucun chevauchement.
- `bun lint` et `bun run build` passent.
- Le lien « Voir les tarifs » et l'astérisque résolvent vers `/tarifs` (stub).
