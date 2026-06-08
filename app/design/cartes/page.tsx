import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";
import {
  CardProject,
  CardArticle,
  CardTestimonial,
} from "../../_lib/ui/Card";

export const metadata: Metadata = {
  title: "Cartes — Design",
  description:
    "Pas de boîte. Bloc typographique sur toile de lin, séparé par de l'air jamais par un cadre. Trois variantes : projet, article, témoignage. Deux modes pour le projet.",
};

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_CARDS: Banned[] = [
  { n: "01", title: "Cadres 1px fermés autour de la card", reason: "Signature CRM / Notion. Tue le minéralisme Dirand." },
  { n: "02", title: "Ombres au repos ou au hover", reason: "Dette Material Design. Incohérent avec « toile de lin plate »." },
  { n: "03", title: "Radius arrondi rounded-xl ou rounded-lg", reason: "SaaS shadcn générique. On est radius 0 partout." },
  { n: "04", title: "Zoom image scale(1.05) au hover", reason: "Tic d'agence 2018. Trop démonstratif pour la haute retenue." },
  { n: "05", title: "Gradient overlay sur image", reason: "Réduit la lisibilité photo, ajoute un filtre marketing." },
  { n: "06", title: "« En savoir plus → » en texte complet", reason: "Cliché commercial. On utilise la flèche → Instrument Serif seule." },
  { n: "07", title: "Crossfade image A → B au hover", reason: "Pattern agence 2020-2022 (Basic, Locomotive). Daté." },
  { n: "08", title: "Carousels / sliders avec flèches latérales", reason: "Volés du e-commerce. Cassent le scroll, baissent l'accessibilité clavier." },
  { n: "09", title: "Isotope / masonry animé au filtrage", reason: "Ingénierie visible, tic jQuery, contre-productif sur site éditorial." },
  { n: "10", title: "Badges colorés vifs au coin (NEW, FEATURED)", reason: "E-commerce bas de gamme. Si mise en avant, on joue le layout, pas un sticker." },
];

export default function Cartes() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Cartes" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Pas une boîte — un bloc typographique.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Séparées par <em className="italic text-surface">de l&apos;air.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Les cartes du site ne s&apos;enferment jamais dans un cadre.
            Elles s&apos;empilent sur la toile de lin, séparées par du blanc
            et — si nécessaire — un filet 1&nbsp;px. La hiérarchie vient
            du serif italique, des small-caps et de la grille, pas d&apos;une
            boîte arrondie avec un fond gris-bleu.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>3 variantes</span>
            <span>2 modes pour le projet (image · silence)</span>
            <span>Zéro bordure fermée</span>
            <span>Hover = -2&nbsp;px + filet</span>
          </div>
        </div>
      </section>

      {/* 01 — CARDPROJECT MODE IMAGE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="CardProject — mode image" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[36ch] mb-6">
                Le format dominant pour la grille{" "}
                <code className="font-mono text-accent-deep">/projets</code>.
                Empruntée à Kinfolk et Cabana, hiérarchie{" "}
                <em className="italic">eyebrow → image → titre → teaser → métadonnées</em>.
              </p>
              <p className="text-body text-ink/75 max-w-[36ch] mb-6">
                L&apos;eyebrow fait{" "}
                <strong>année + lieu</strong> en small-caps. Le titre est
                en Instrument Serif italique, 24-28&nbsp;px. Le teaser reste
                sur 1-2 lignes — une description longue noie la vignette.
              </p>
              <p className="text-body text-ink/75 max-w-[36ch]">
                La zone cliquable couvre{" "}
                <em className="italic">toute la card</em> via{" "}
                <code className="font-mono text-accent-deep">::after</code>{" "}
                sur le lien du titre — pattern Kitty Giraudel pour une
                lecture propre au lecteur d&apos;écran.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-16">
              <CardProject
                ratio="3/2"
                eyebrow="2026 · Marseille"
                title="Panaille — table méditerranéenne"
                teaser="Refonte du site et du carnet de saison. Carte imprimable, réservations en ligne."
                tags={["Restaurant", "Next.js"]}
                href="#"
              />
              <CardProject
                ratio="4/5"
                eyebrow="2025 · Béziers"
                title="Domaine des Pins"
                teaser="Domaine viticole familial. Site éditorial sobre, portail de vente directe."
                tags={["Viticulture", "E-commerce"]}
                href="#"
              />
              <CardProject
                ratio="3/2"
                eyebrow="2025 · Lyon"
                title="Atelier Vert — céramique"
                teaser="Vitrine d'un atelier de poterie émaillée."
                tags={["Artisanat"]}
                href="#"
              />
              <CardProject
                ratio="4/5"
                eyebrow="2024 · Paris"
                title="Cabinet Lefebvre — architecte"
                teaser="Portfolio d'une architecte d'intérieur indépendante."
                tags={["Architecture"]}
                href="#"
              />
            </div>
          </div>

          <div className="border-t border-rule-strong pt-10">
            <Eyebrow>Ratio 3:2 vs 4:5 — alternance rythmique</Eyebrow>
            <p className="text-body text-ink/75 max-w-[58ch] mt-4">
              Les deux ratios cohabitent dans la grille pour casser la monotonie
              d&apos;un masonry homogène. L&apos;ordre recommandé&nbsp;:{" "}
              <strong>3:2 · 4:5 · 3:2 · 4:5</strong>, ou par paires
              (3:2 + 3:2, puis 4:5 + 4:5 tous les 4 cards). Jamais de masonry JS.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — CARDPROJECT MODE SILENCE */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="CardProject — mode silence (archive)" />
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[36ch] mb-6">
                Sur <code className="font-mono text-accent-deep">/projets/archive</code>{" "}
                ou en bas d&apos;une grille featured, la carte se transforme
                en ligne typographique — à la Joseph Dirand. Plus d&apos;image.
              </p>
              <p className="text-body text-ink/75 max-w-[36ch] mb-6">
                Chaque projet devient une ligne{" "}
                <em className="italic">année · lieu / titre / type /</em>{" "}
                flèche. Séparée par un filet{" "}
                <code className="font-mono text-accent-deep">border-t border-rule</code>.
                Zéro bordure fermée, zéro fond.
              </p>
              <p className="text-body text-ink/75 max-w-[36ch]">
                Prop unique pour basculer&nbsp;:{" "}
                <code className="font-mono text-accent-deep">mode=&quot;silence&quot;</code>
                . Le titre et le lieu suffisent — c&apos;est un sommaire
                de livre relié, pas un catalogue.
              </p>
            </div>

            <div className="flex flex-col border-b border-rule">
              <CardProject
                mode="silence"
                eyebrow="2023 · Paris"
                title="Alboni"
                typeLabel="Restaurant"
                href="#"
              />
              <CardProject
                mode="silence"
                eyebrow="2023 · Nîmes"
                title="Galerie du Carré"
                typeLabel="Galerie d&apos;art"
                href="#"
              />
              <CardProject
                mode="silence"
                eyebrow="2022 · Lyon"
                title="Maison Bouffard"
                typeLabel="Traiteur"
                href="#"
              />
              <CardProject
                mode="silence"
                eyebrow="2022 · Aix"
                title="Cabinet Orange"
                typeLabel="Architecte"
                href="#"
              />
              <CardProject
                mode="silence"
                eyebrow="2021 · Toulouse"
                title="Librairie Borel"
                typeLabel="Librairie"
                href="#"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — CARDARTICLE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="CardArticle — journal et blog" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[36ch] mb-6">
                Structure proche de CardProject — mais{" "}
                <em className="italic">image optionnelle</em> (un article
                peut vivre sans photo), catégorie dans l&apos;eyebrow,
                date à la fin.
              </p>
              <p className="text-body text-ink/75 max-w-[36ch]">
                Format d&apos;eyebrow retenu&nbsp;:{" "}
                <em className="italic">Catégorie · X min</em>. Le temps de
                lecture est une convention éditoriale reprise de Medium et
                The Gentlewoman — plus utile qu&apos;une date seule en tête.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-16 border-t border-rule-strong pt-10">
              <CardArticle
                eyebrow="Carnet · 7 min"
                title="Pourquoi j&apos;ai refusé Fraunces"
                excerpt="Après avoir installé la police sur trois projets consécutifs, j&apos;ai réalisé que ce n&apos;était pas l&apos;outil qui ne me plaisait pas — c&apos;était son signal."
                date="12 mars 2026"
                href="#"
              />
              <CardArticle
                eyebrow="Méthode · 4 min"
                title="Une étude de cas ne se raconte pas en bullet points"
                excerpt="La tentation est grande de lister « le problème / la solution / le résultat ». C&apos;est exactement la structure qui tue la lecture."
                date="28 février 2026"
                href="#"
              />
              <CardArticle
                eyebrow="Terrain · 12 min"
                title="Ce que trois semaines chez un viticulteur m&apos;ont appris"
                excerpt="Je suis allé tailler de la vigne avec Claire M. du Domaine des Pins avant d&apos;écrire une ligne. Ce n&apos;est pas une option."
                date="15 février 2026"
                href="#"
              />
              <CardArticle
                eyebrow="Outil · 5 min"
                title="Pourquoi je garde mes outils à trois"
                excerpt="Figma, Next.js, Vercel. Rien d&apos;autre. Et pourquoi ajouter un CMS ou une base de données est souvent une erreur pour un site vitrine."
                date="3 février 2026"
                href="#"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — CARDTESTIMONIAL */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="CardTestimonial — la parole du client" onSurface />
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[36ch] mb-6">
                Pas une grille de logos. Une{" "}
                <em className="italic">seule</em> citation forte par page,
                posée en{" "}
                <code className="font-mono text-accent-warm">
                  &lt;blockquote&gt;
                </code>{" "}
                Instrument Serif italique. Attribution sobre&nbsp;:
                prénom, rôle, lien vers le projet.
              </p>
              <p className="text-body opacity-75 max-w-[36ch]">
                Sans photo client, sans logo, sans étoiles. Le poids vient
                du mot, pas du badge « verified » — on respecte l&apos;intelligence
                du lecteur.
              </p>
            </div>

            <div className="flex flex-col gap-16 border-t border-surface-foreground/25 pt-10">
              <div className="text-bg">
                <CardTestimonial
                  quote="Jules a saisi l'âme du domaine dès la première visite. Il est reparti avec un carnet de notes, nous a renvoyé une direction en deux semaines, et le site a été publié avant les vendanges."
                  author="Claire M."
                  role="Domaine des Pins, Béziers"
                  projectHref="#"
                  projectLabel="Voir le projet"
                />
              </div>
              <div className="text-bg border-t border-surface-foreground/15 pt-12">
                <CardTestimonial
                  quote="Le plus rare, c'est qu'il dit non. Il a refusé trois idées qui nous semblaient bonnes, et chacune aurait été une erreur. Le résultat se lit comme un magazine — pas comme un site d'agence."
                  author="Étienne D."
                  role="Panaille, restaurant méditerranéen"
                  projectHref="#"
                  projectLabel="Voir le projet"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — ANATOMIE DÉTAILLÉE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Anatomie — hover, focus, zone cliquable" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Hover — strict</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                La card tout entière translate de{" "}
                <code className="font-mono text-accent-deep">-2px</code>{" "}
                vertical. Un filet 1&nbsp;px apparaît sous le titre. La
                flèche → glisse de 2&nbsp;px à droite. Rien de plus.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                <em className="italic">Pas de zoom image</em>, pas de
                crossfade, pas d&apos;ombre qui grandit.
              </p>
            </div>
            <div>
              <Eyebrow>Focus-visible</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Outline{" "}
                <code className="font-mono text-accent-deep">2px</code>{" "}
                <code className="font-mono text-accent-deep">
                  accent-deep
                </code>{" "}
                avec offset{" "}
                <code className="font-mono text-accent-deep">3px</code> sur
                le lien du titre — donc sur toute la card-area (grâce au{" "}
                <code className="font-mono text-accent-deep">::after</code>).
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Testez au clavier&nbsp;: Tab vous emmène de card en card,
                Entrée ouvre le projet.
              </p>
            </div>
            <div>
              <Eyebrow>Zone cliquable</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-6">
                Pattern W3C / Kitty Giraudel&nbsp;:{" "}
                <code className="font-mono text-accent-deep">&lt;a&gt;</code>{" "}
                autour du titre seul, étendu à toute la card via{" "}
                <code className="font-mono text-accent-deep">
                  ::after {"{ inset: 0 }"}
                </code>
                .
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Les screen readers n&apos;annoncent que le titre, jamais
                toute la prose. Les tags cliquables restent accessibles via{" "}
                <code className="font-mono text-accent-deep">
                  z-index: 2
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
            Chacun des dix interdits vient d&apos;une observation réelle&nbsp;:
            soit absent de tous les sites premium visités (Studio KO,
            Dirand, Yovanovitch, Kinfolk, Cabana), soit cliché identifié
            comme signal SaaS, agence 2020-2022, ou e-commerce bas de
            gamme.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_CARDS.map((b) => (
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
        prev={{ label: "Relire — Composants", href: "/design/composants" }}
        next={{ label: "Lire ensuite — Navigation", href: "/design/navigation" }}
      />
    </div>
  );
}
