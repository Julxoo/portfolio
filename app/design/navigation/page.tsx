import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Navigation — Design",
  description:
    "Header fin, typographique, silencieux. Cinq liens top-level, scroll-direction aware, overlay mobile éditorial plein écran. Pattern Aesop / Joseph Dirand / Van Duysen.",
};

type Route = {
  path: string;
  label: string;
  rationale: string;
};

const ROUTES: Route[] = [
  { path: "/projets", label: "Projets", rationale: "Études de cas — le portefeuille. Pluriel FR sobre, pas « Réalisations » ni « Work »." },
  { path: "/carnet", label: "Carnet", rationale: "Blog / journal. « Carnet » sonne artisan — plus juste qu'un « Journal » qui ressemble à de la presse." },
  { path: "/methode", label: "Méthode", rationale: "Comment je travaille — réponse commerciale, séparée du « je ». Phases, livrables, délais." },
  { path: "/a-propos", label: "À propos", rationale: "Qui suis-je — réponse humaine. Van Duysen sépare aussi « Info » de ses pages métier." },
  { path: "/contact", label: "Contact", rationale: "Le 5e lien, pas un bouton. Différenciation nette studio premium vs SaaS." },
];

type HiddenRoute = {
  path: string;
  reason: string;
};

const HIDDEN: HiddenRoute[] = [
  { path: "/design", reason: "Interne / technique. Accessible par URL directe. Les clients non-tech n'ont rien à y faire — pattern Vercel qui cache aussi son design system." },
  { path: "/projets/[slug]", reason: "Atteignable depuis l'index projets uniquement. Breadcrumb sous le hero." },
  { path: "/carnet/[slug]", reason: "Même logique — les articles se rejoignent depuis le carnet." },
  { path: "/archive", reason: "Projets antérieurs. Accessible depuis un lien en bas de /projets, pas dans la nav principale." },
];

type Spec = {
  prop: string;
  value: string;
};

const SPECS_DESKTOP: Spec[] = [
  { prop: "Hauteur", value: "64 px" },
  { prop: "Position", value: "sticky top-0, z-40" },
  { prop: "Fond", value: "bg-bg (lin)" },
  { prop: "Filet bottom", value: "border-rule 1 px, apparaît quand scrollY > 8" },
  { prop: "Logo", value: "Instrument Serif italique 18 px, gauche" },
  { prop: "Liens", value: "Instrument Sans 14 px, regular, bas de casse, gap 28 px" },
  { prop: "État actif", value: "border-bottom 1 px border-rule-strong, aria-current=page" },
  { prop: "Hover lien", value: "couleur passe à accent-deep, 180 ms" },
  { prop: "CTA", value: "Aucun bouton — Contact est le 5e lien, point" },
];

const SPECS_MOBILE: Spec[] = [
  { prop: "Hauteur", value: "56 px" },
  { prop: "Position", value: "sticky top-0, pas de scroll-hide" },
  { prop: "Items visibles", value: "Logo + burger, rien d'autre" },
  { prop: "Burger icône", value: "IconMenu 22 px, stroke 1, linecap square" },
  { prop: "Overlay", value: "fixed inset-0, bg-bg 100%, translateY(-100% → 0) en 280 ms" },
  { prop: "Items menu", value: "Instrument Serif italique clamp(2rem, 9vw, 3rem), un par ligne" },
  { prop: "Séparateurs", value: "border-t border-rule entre chaque item (sommaire de livre)" },
  { prop: "Fermeture", value: "« Fermer » en toutes lettres (pas ×), Escape aussi" },
  { prop: "Lock", value: "body overflow: hidden + lenis.stop() à l'ouverture" },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_NAV: Banned[] = [
  { n: "01", title: "Méga-menus multicolonnes", reason: "6 colonnes avec images (Sezane, Ressource). Détruit la DA éditoriale, complexe mobile." },
  { n: "02", title: "Méga-menus avec images produit", reason: "Tonalité shop e-commerce, pas portfolio éditorial. Cabana le fait, on ne copie pas." },
  { n: "03", title: "Header qui change de couleur au scroll", reason: "Rupture chromatique violente. Casse la toile de lin. Pattern agences 2020." },
  { n: "04", title: "Progress bar arc-en-ciel", reason: "Pattern Medium. Incompatible avec palette kaki monochrome." },
  { n: "05", title: "Lang switcher avec drapeaux", reason: "Cliché. Studio KO, Van Duysen, Buci utilisent texte simple « FR / EN »." },
  { n: "06", title: "« CONTACT US » tout en majuscules", reason: "Interdit par la voix — pas de majuscules SaaS." },
  { n: "07", title: "Burger qui spin en X", reason: "Micro-animation superflue. Remplacé par swap IconMenu → texte « Fermer »." },
  { n: "08", title: "Tiroir latéral Android Material", reason: "Pattern app mobile. On veut un sommaire éditorial plein écran, pas un drawer." },
  { n: "09", title: "Sticky CTA bubble flottant bas-droite", reason: "Pollue la lecture, casse la DA silencieuse. Aucun site premium observé n'en a." },
  { n: "10", title: "Search bar au milieu du header", reason: "Pour un freelance avec ~20 projets : jamais. Pentagram le fait sur 4000 projets — hors-échelle." },
];

export default function Navigation() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Navigation" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un service, pas un meuble d&apos;accueil.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            La nav s&apos;<em className="italic text-surface">efface</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Le lecteur arrive pour voir du travail — pas pour admirer une
            barre de menu. Le header est fin, typographique, silencieux. Il
            s&apos;efface pendant la lecture et revient quand on en a
            besoin. Pattern observé chez Aesop, Joseph Dirand, Vincent Van
            Duysen. Jamais chez Vercel ou Stripe.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>5 liens top-level</span>
            <span>Scroll-direction aware</span>
            <span>Zéro bouton CTA</span>
            <span>Overlay mobile plein écran</span>
          </div>
        </div>
      </section>

      {/* 01 — ARCHITECTURE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Architecture — cinq liens, pas un de plus" />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Joseph Dirand tient à cinq liens. Pentagram aussi. Au-delà
                de sept (Van Duysen), la nav devient un sommaire de site.
                Pour un freelance solo, cinq, c&apos;est juste — pas un
                forum étudiant, pas une marketplace.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Pas de bouton CTA « Prendre rendez-vous », pas de
                switcher langue avec drapeaux, pas de search bar au
                milieu. Le Contact est le 5<sup>e</sup> lien — même
                typographie, même poids, point.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {ROUTES.map((r) => (
                <div
                  key={r.path}
                  className="grid md:grid-cols-[8rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-rule"
                >
                  <div className="flex flex-col gap-1">
                    <code className="font-mono text-caption text-accent-deep">
                      {r.path}
                    </code>
                    <span className="font-display italic text-[1.15rem] text-ink leading-tight">
                      {r.label}
                    </span>
                  </div>
                  <p className="text-body text-ink/75 max-w-[52ch]">
                    {r.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-rule-strong pt-10">
            <Eyebrow>Hors nav — accessible par URL directe</Eyebrow>
            <div className="mt-6 grid md:grid-cols-2 gap-x-16 gap-y-6">
              {HIDDEN.map((h) => (
                <div key={h.path}>
                  <code className="font-mono text-caption text-accent-deep block mb-2">
                    {h.path}
                  </code>
                  <p className="text-caption text-ink/70 max-w-[48ch]">
                    {h.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — COMPORTEMENT SCROLL */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Scroll-direction aware — le header qui s'efface" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <Eyebrow>Au repos (top de page)</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Header visible, fond{" "}
                <code className="font-mono text-accent-deep">bg-bg</code>{" "}
                sans filet bottom. La nav se fond dans la toile de lin.
              </p>
              <div className="h-16 border-b border-transparent bg-bg flex items-center px-5">
                <span className="font-display italic text-[14px] text-ink">
                  Jules Toussenel
                </span>
              </div>
            </div>

            <div>
              <Eyebrow>Au scroll (down ou up)</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Filet{" "}
                <code className="font-mono text-accent-deep">
                  border-rule
                </code>{" "}
                1 px apparaît sous le header dès qu&apos;on a quitté le
                top (scrollY &gt; 8).
              </p>
              <div className="h-16 border-b border-rule bg-bg flex items-center px-5">
                <span className="font-display italic text-[14px] text-ink">
                  Jules Toussenel
                </span>
              </div>
            </div>

            <div>
              <Eyebrow>Scroll down — caché</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Header se rétracte vers le haut{" "}
                <code className="font-mono text-accent-deep">
                  -translate-y-full
                </code>{" "}
                en 180 ms. Au scroll up, il revient immédiatement.
              </p>
              <div className="relative h-16 border-b border-rule bg-bg overflow-hidden">
                <div className="absolute inset-0 flex items-center px-5 -translate-y-full">
                  <span className="font-display italic text-[14px] text-ink">
                    Jules Toussenel
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-rule-strong pt-10">
            <Eyebrow>Implémentation — on consomme Lenis, pas du JS scroll</Eyebrow>
            <p className="text-body text-ink/75 max-w-[58ch] mt-4 mb-6">
              Le header observe les propriétés{" "}
              <code className="font-mono text-accent-deep">
                lenis.scroll
              </code>{" "}
              et{" "}
              <code className="font-mono text-accent-deep">
                lenis.direction
              </code>{" "}
              via le hook{" "}
              <code className="font-mono text-accent-deep">
                useLenis
              </code>
              . Avec{" "}
              <code className="font-mono text-accent-deep">
                prefers-reduced-motion
              </code>{" "}
              ou sans Lenis monté, le header reste sticky visible en
              permanence — scroll natif honnête, zéro animation.
            </p>
            <p className="text-body text-ink/75 max-w-[58ch]">
              Sur mobile, le scroll-hide est désactivé. NN/g&nbsp;: sur
              petit écran, une barre qui apparaît/disparaît ajoute du
              bruit cinétique. On garde compact et fixe.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — DESKTOP LAYOUT */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Desktop — logo gauche, liens droite, zéro bouton" />

          <div className="mb-16 border-t border-rule-strong pt-10">
            <Eyebrow>Aperçu layout</Eyebrow>
            <div className="mt-6 border border-rule bg-bg h-16 flex items-center justify-between px-8">
              <span className="font-display italic text-[18px] leading-none text-ink">
                Jules Toussenel
              </span>
              <div className="flex items-center gap-x-7 font-sans text-[14px] text-ink">
                <span className="text-ink">Projets</span>
                <span className="text-ink pb-1 border-b border-rule-strong">
                  Carnet
                </span>
                <span className="text-ink">Méthode</span>
                <span className="text-ink">À propos</span>
                <span className="text-ink">Contact</span>
              </div>
            </div>
            <p className="text-caption text-ink/60 mt-4">
              Le lien <em className="italic">Carnet</em> est en état actif —
              filet 1 px <code className="font-mono">border-rule-strong</code>{" "}
              persistant sous le texte (aria-current=&quot;page&quot;).
            </p>
          </div>

          <div className="border-t border-rule-strong pt-10">
            <Eyebrow>Spécifications desktop</Eyebrow>
            <div className="mt-6 flex flex-col border-t border-rule">
              {SPECS_DESKTOP.map((s) => (
                <div
                  key={s.prop}
                  className="grid md:grid-cols-[14rem_1fr] gap-6 py-4 border-b border-rule last:border-b-0 items-baseline"
                >
                  <div className="font-display italic text-[1.05rem] text-ink">
                    {s.prop}
                  </div>
                  <div className="text-body text-ink/80 font-mono text-caption">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — MOBILE */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Mobile — sommaire éditorial plein écran" onSurface />
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[48ch] mb-6">
                Le burger ouvre un overlay plein écran, pas un tiroir. Les
                items sont en grands caractères Instrument Serif italique,
                un par ligne, séparés par un filet — on lit ça comme un
                sommaire de livre, pas comme un menu d&apos;app.
              </p>
              <p className="text-body opacity-75 max-w-[48ch] mb-6">
                Transition{" "}
                <code className="font-mono text-accent-warm">
                  translateY(-100% → 0)
                </code>{" "}
                en 280 ms, aligné sur{" "}
                <code className="font-mono text-accent-warm">
                  duration-standard
                </code>
                . Pas de fade, pas de blur, pas de scale — le bloc entier
                glisse.
              </p>
              <p className="text-body opacity-70 max-w-[48ch]">
                Fermeture par{" "}
                <em className="italic">« Fermer »</em> en toutes lettres
                (pas ×, qui est un pattern app mobile). Touche Escape
                ferme aussi. Body scroll locké et Lenis pausé pendant
                l&apos;ouverture.
              </p>
            </div>

            <div className="border border-surface-foreground/20 bg-bg text-ink flex flex-col min-h-[420px]">
              <div className="flex items-center justify-between h-14 px-5 border-b border-rule">
                <span className="font-display italic text-[18px] leading-none text-ink">
                  Jules Toussenel
                </span>
                <span className="font-sans text-[14px] text-ink">Fermer</span>
              </div>
              <nav className="px-5 pt-8 flex-1">
                <ul className="flex flex-col">
                  {ROUTES.map((r) => (
                    <li key={r.path} className="border-t border-rule last:border-b">
                      <div className="py-4 font-display italic text-[clamp(1.5rem,4vw,2rem)] leading-tight text-ink">
                        {r.label}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="mt-16 border-t border-surface-foreground/25 pt-10">
            <Eyebrow>
              <span className="text-accent-warm">Spécifications mobile</span>
            </Eyebrow>
            <div className="mt-6 flex flex-col border-t border-surface-foreground/15">
              {SPECS_MOBILE.map((s) => (
                <div
                  key={s.prop}
                  className="grid md:grid-cols-[14rem_1fr] gap-6 py-4 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
                >
                  <div className="font-display italic text-[1.05rem]">
                    {s.prop}
                  </div>
                  <div className="text-body opacity-80 font-mono text-caption">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — ACCESSIBILITÉ */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Accessibilité — skip link, aria, focus" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Skip to content</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Lien{" "}
                <code className="font-mono text-accent-deep">
                  &lt;a href=&quot;#main&quot;&gt;
                </code>{" "}
                invisible par défaut via{" "}
                <code className="font-mono text-accent-deep">sr-only</code>
                . Apparaît en haut-gauche dès la première touche Tab.
                Destination :{" "}
                <code className="font-mono text-accent-deep">
                  &lt;main id=&quot;main&quot;&gt;
                </code>
                . WCAG 2.4.1.
              </p>
              <p className="text-caption text-ink/60">
                Essayez&nbsp;: rechargez la page et appuyez sur Tab.
              </p>
            </div>
            <div>
              <Eyebrow>aria-current</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Le lien de la page courante porte{" "}
                <code className="font-mono text-accent-deep">
                  aria-current=&quot;page&quot;
                </code>
                . Le filet 1 px sous le lien est le marqueur visuel (WCAG
                1.4.1 — ne pas reposer sur la couleur seule).
              </p>
            </div>
            <div>
              <Eyebrow>Focus visible</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Chaque lien / bouton reçoit{" "}
                <code className="font-mono text-accent-deep">
                  outline-2 outline-accent-deep outline-offset-[3px]
                </code>{" "}
                au focus clavier. Jamais{" "}
                <code className="font-mono text-accent-deep">
                  outline: none
                </code>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque interdit vient d&apos;une observation réelle&nbsp;: soit
            absent des sites premium visités (Studio KO, Dirand,
            Yovanovitch, Van Duysen, Aesop, Cabana), soit cliché
            identifié comme signal SaaS / e-commerce / agence 2020.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_NAV.map((b) => (
              <div
                key={b.n}
                className="grid md:grid-cols-[60px_1.2fr_1.8fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">{b.n}</div>
                <div className="font-display italic text-[1.15rem] text-ink leading-snug">
                  {b.title}
                </div>
                <div className="text-body text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Cartes", href: "/design/cartes" }}
        next={{ label: "Lire ensuite — Footer", href: "/design/footer" }}
      />
    </div>
  );
}
