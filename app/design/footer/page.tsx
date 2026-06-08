import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Footer — Design",
  description:
    "Ni sitemap SaaS à 9 colonnes, ni silence total. Trois colonnes éditoriales + colophon magazine + barre basse. Signature intellectuelle du site.",
};

type Block = {
  title: string;
  rows: string[];
};

const BLOCKS: Block[] = [
  {
    title: "Sommaire",
    rows: [
      "Projets · Carnet · Méthode · À propos · Contact",
      "Secondaire : Design system (filet séparateur)",
      "Flux RSS à ajouter quand le carnet publiera",
    ],
  },
  {
    title: "Contact",
    rows: [
      "toussenelj@gmail.com (concaténation JS, anti-scrape naïf)",
      "Ville : Aix-en-Provence (lieu revendiqué)",
      "Lang switcher : Français — English (EN désactivé tant qu'absent)",
      "Réseaux : Instagram, LinkedIn, Are.na (en toutes lettres, jamais logos)",
    ],
  },
  {
    title: "Colophon",
    rows: [
      "Fontes : Instrument Serif + Instrument Sans (Google Fonts)",
      "Tech : Next.js, Tailwind, Vercel, Lenis",
      "Photos : de l'auteur, sauf mention",
      "Licence : code source sous MIT",
    ],
  },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_FOOTER: Banned[] = [
  { n: "01", title: "Sitemap géant 8+ colonnes", reason: "Vercel, Stripe : illisible pour une cible non-tech. Signe SaaS B2B." },
  { n: "02", title: "Bouton « NEWSLETTER ! » tape-à-l'œil", reason: "Ressource Peintures : « 3 échantillons offerts ! ». Rompt le ton éditorial." },
  { n: "03", title: "Logos des réseaux en couleurs d'origine", reason: "Gradient Instagram, bleu LinkedIn — incohérents avec palette kaki/lin." },
  { n: "04", title: "Fond criard (fuchsia, vert pétrole)", reason: "Rupture visuelle indue. On reste sur bg-bg continu." },
  { n: "05", title: "Trust badges / « Verified » / étoiles", reason: "Registre e-commerce. Hors-sujet pour un freelance solo." },
  { n: "06", title: "« 100 % satisfait ou remboursé »", reason: "Vocabulaire marketplace. Disqualifiant auprès de PME premium." },
  { n: "07", title: "Carte Google Maps intégrée", reason: "Buci Hotel s'en abstient — pour un solo, poids inutile et désuet." },
  { n: "08", title: "Logos clients en grille monochrome", reason: "« As seen in… » : registre agency-SaaS qu'on refuse explicitement." },
  { n: "09", title: "Watermark « Built with Next.js » visible", reason: "Signe de starter non fini. Ici Next.js vit dans le colophon, nommé élégamment." },
  { n: "10", title: "Bouton « Back to top » flottant", reason: "Kitsch. Le scroll Lenis tient la charge. Le footer se replie par scroll haut." },
];

type Spec = {
  bloc: string;
  fond: string;
  hauteur: string;
  typo: string;
};

const SPECS: Spec[] = [
  { bloc: "Conteneur footer", fond: "bg-bg continu", hauteur: "py-section-lg (96–128 px desktop)", typo: "—" },
  { bloc: "Filet top", fond: "—", hauteur: "1 px border-rule pleine largeur", typo: "—" },
  { bloc: "Titre colonne", fond: "—", hauteur: "mb-6", typo: "Instrument Sans 11 px uppercase, tracking +0.1em, ink/60" },
  { bloc: "Liens sommaire", fond: "—", hauteur: "gap-2.5", typo: "Instrument Sans 15 px, SlideLink (underline anim)" },
  { bloc: "Email", fond: "—", hauteur: "inline", typo: "Instrument Sans 15 px, underline permanent ink/40" },
  { bloc: "Colophon", fond: "—", hauteur: "max-w-[42ch]", typo: "Instrument Sans 13 px, leading-relaxed, ink/80" },
  { bloc: "Barre basse", fond: "—", hauteur: "mt-16, filet top border-rule, pt-6", typo: "Instrument Sans 12 px, ink/70" },
  { bloc: "Signature géo", fond: "—", hauteur: "dans la barre basse", typo: "Instrument Serif italique 12 px" },
];

export default function FooterPage() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Footer" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            La signature intellectuelle du site.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Un footer qui <em className="italic text-surface">signe</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Ni sitemap SaaS à neuf colonnes (Vercel, Stripe), ni silence
            mutique (Dirand). La tradition du colophon magazine transposée
            à un site freelance solo&nbsp;: un objet qui signe, qui
            renseigne, qui explique ses choix. Trois colonnes — sommaire,
            contact, colophon — closes par une barre basse sobre.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>3 colonnes éditoriales</span>
            <span>Colophon magazine</span>
            <span>Réseaux en toutes lettres</span>
            <span>Zéro newsletter prématurée</span>
          </div>
        </div>
      </section>

      {/* 01 — STRUCTURE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Trois colonnes — sommaire, contact, colophon" />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Référence : <strong>Pentagram</strong> — trois blocs New
                Business / About / Navigation, barre basse discrète. Pour
                un solo, on adapte le rythme&nbsp;: sommaire, contact,
                colophon.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                L&apos;option mutique (Dirand : juste un bandeau cookies)
                est trop silencieuse pour un freelance qui doit aider le
                prospect à se repérer. L&apos;option dense à quatre
                colonnes avec newsletter dédiée fragmente trop
                l&apos;espace.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Sur mobile, les trois colonnes s&apos;empilent
                verticalement. Pas de collapsible accordion façon SaaS —
                le contenu reste court et la lecture linéaire.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {BLOCKS.map((b) => (
                <div
                  key={b.title}
                  className="py-6 border-b border-rule last:border-b-0"
                >
                  <Eyebrow>{b.title}</Eyebrow>
                  <ul className="mt-4 flex flex-col gap-2">
                    {b.rows.map((r) => (
                      <li
                        key={r}
                        className="text-body text-ink/75 leading-relaxed max-w-[58ch]"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — COLOPHON */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Colophon — l'écrit qui explique ses choix" />
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Le colophon est un{" "}
                <em className="italic">objet hérité du livre imprimé</em>{" "}
                — dernière page qui documente fontes, papier, imprimeur,
                tirage. Apartamento glisse son adresse et son VAT, Cabana
                affiche son identité légale, Kinfolk crédite son agence{" "}
                <em className="italic">« Made by Six »</em>.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Transposé au web, le colophon documente ce qui fait
                tourner le site — fontes, framework, hébergement,
                licence. Ce n&apos;est pas un crédit technique, c&apos;est
                une <em className="italic">signature intellectuelle</em>&nbsp;:
                on revendique les choix.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Cohérent avec la voix&nbsp;:{" "}
                <em className="italic">
                  « cette voix passe le test du papier »
                </em>
                . Le colophon est ce qu&apos;on imprimerait au verso.
              </p>
            </div>

            <div className="bg-bg p-8 border border-rule">
              <Eyebrow>Texte retenu (extrait du footer live)</Eyebrow>
              <div className="mt-6 flex flex-col gap-4">
                <p className="font-sans text-[13px] leading-relaxed text-ink/85 max-w-[42ch]">
                  Composé en{" "}
                  <em className="italic">Instrument Serif</em> et{" "}
                  <em className="italic">Instrument Sans</em>, dessinés par
                  Instrument et distribués par Google Fonts.
                </p>
                <p className="font-sans text-[13px] leading-relaxed text-ink/85 max-w-[42ch]">
                  Bâti avec Next.js, mis en page avec Tailwind, hébergé sur
                  Vercel. Scroll par Lenis.
                </p>
                <p className="font-sans text-[13px] leading-relaxed text-ink/85 max-w-[42ch]">
                  Photographies de l&apos;auteur, sauf mention contraire.
                  Code source sous licence MIT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — DÉCISIONS QU'ON N'A PAS PRISES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Newsletter, CGV, Back to top — ce qu'on n'a pas inclus" />
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Newsletter — absente du footer</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-6">
                Pour un freelance solo sans carnet publié, un champ email
                inerte au footer sonne creux. On l&apos;intégrera{" "}
                <strong>en flux dans /carnet</strong>, à la fin d&apos;un
                article, avec un wording sobre — pas au footer.
              </p>
              <p className="text-caption text-ink/60 max-w-[42ch]">
                Kinfolk met son CTA abonnement en haut du footer ; c&apos;est
                lisible mais commercial. Gentlewoman écrit en prose
                simple. On fera pareil, plus tard.
              </p>
            </div>
            <div>
              <Eyebrow>CGV — pas dans le footer</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-6">
                Un freelance contracte par devis&nbsp;: les CGV sont
                annexées en PDF au moment du devis signé, pas exposées en
                vitrine. La barre basse se limite aux{" "}
                <em className="italic">Mentions légales</em> et à la{" "}
                <em className="italic">Politique de confidentialité</em> —
                obligations légales FR.
              </p>
            </div>
            <div>
              <Eyebrow>Bouton « Back to top » — jamais</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-6">
                Le scroll Lenis tient la charge. Un bouton flottant
                bas-droite pollue la lecture et signale un design
                paresseux. Le footer lui-même invite au scroll haut par
                sa densité.
              </p>
            </div>
            <div>
              <Eyebrow>Google Maps — jamais</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4 mb-6">
                Poids inutile, désuet. Buci Hôtel — qui a pignon sur rue —
                s&apos;en abstient. La ville (« Aix-en-Provence ») en toutes
                lettres suffit. Si on veut aller plus loin, une carte
                Mapbox vectorielle monochrome dans{" "}
                <code className="font-mono text-accent-deep">/contact</code>
                , pas dans le footer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — BARRE BASSE */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Barre basse — copyright, mentions, signature géo" onSurface />
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[42ch] mb-6">
                Filet{" "}
                <code className="font-mono text-accent-warm">border-rule</code>{" "}
                1 px en haut, typographie Instrument Sans 12 px. Un bloc à
                gauche (légal), un bloc à droite (signature géographique).
              </p>
              <p className="text-body opacity-75 max-w-[42ch]">
                Em-dash{" "}
                <code className="font-mono text-accent-warm">—</code> entre
                l&apos;année et le nom (Hermès virgule, Pentagram tiret
                demi-cadratin — on garde l&apos;em-dash FR entouré
                d&apos;espaces normales). Middle dot{" "}
                <code className="font-mono text-accent-warm">·</code> comme
                séparateur entre liens.
              </p>
            </div>

            <div className="bg-bg text-ink p-6 border border-surface-foreground/20">
              <Eyebrow>Composition retenue</Eyebrow>
              <div className="mt-6 flex flex-col gap-4 font-sans text-[12px] text-ink/75">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <span>© 2026 — Jules Toussenel</span>
                  <span className="opacity-40">·</span>
                  <span className="underline decoration-1 decoration-ink/40 underline-offset-[3px]">
                    Mentions légales
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="underline decoration-1 decoration-ink/40 underline-offset-[3px]">
                    Politique de confidentialité
                  </span>
                </div>
                <div className="font-display italic text-ink/70">
                  Conçu et écrit à Aix-en-Provence
                </div>
              </div>
              <p className="text-caption text-ink/60 mt-6 max-w-[42ch] border-t border-rule pt-4">
                <em className="italic">« Conçu et écrit »</em> revendique
                l&apos;artisanat intellectuel — écriture + conception —
                sans glisser dans le patriotisme du{" "}
                <em className="italic">« Fait en France »</em> ni le
                précieux du{" "}
                <em className="italic">« en souffrance lente »</em>.
                Référence implicite : la tradition{" "}
                <em className="italic">Printed in Italy</em> des
                magazines premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — SPÉCIFICATIONS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Spécifications" />
          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1fr_1fr_1.3fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Bloc</div>
              <div>Fond</div>
              <div>Hauteur / layout</div>
              <div>Typographie</div>
            </div>
            {SPECS.map((s) => (
              <div
                key={s.bloc}
                className="grid md:grid-cols-[1fr_1fr_1.3fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink">
                  {s.bloc}
                </div>
                <div className="text-caption text-ink/75">{s.fond}</div>
                <div className="text-caption text-ink/75">{s.hauteur}</div>
                <div className="text-caption text-ink/75">{s.typo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque interdit vient d&apos;une observation réelle — sites
            SaaS qui en font trop (Vercel, Stripe), ou patterns datés
            (Google Maps intégrée, bouton back-to-top flottant).
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_FOOTER.map((b) => (
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
        prev={{ label: "Relire — Navigation", href: "/design/navigation" }}
        next={{ label: "Lire ensuite — Formulaires", href: "/design/formulaires" }}
      />
    </div>
  );
}
