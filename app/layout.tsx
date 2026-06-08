import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import { LenisProvider } from "./_lib/motion/LenisProvider";
import { ChapterProvider } from "./_lib/motion/ChapterContext";
import { ChapterMarker } from "./_components/ChapterMarker";
import { Folio } from "./_components/Folio";
import { SkipLink } from "./_components/SkipLink";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { BackgroundCurves } from "./_components/BackgroundCurves";
import { BackgroundGrain } from "./_components/BackgroundGrain";
import { CustomScrollbar } from "./_components/CustomScrollbar";

// Clash Display (Fontshare · ITF Free, usage commercial) — woff2 VARIABLE
// (wght 200→700), self-host. Sert à la fois de fonte d'affichage ET de
// signature : le morph de poids du hero (ProximityText) lit son axe 'wght'.
const clashDisplay = localFont({
  src: "./_fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-clash",
});

// Cabinet Grotesk (Fontshare · ITF Free) — woff2 VARIABLE (wght 100→900),
// self-host. Fonte de corps (texte courant + UI).
const cabinetGrotesk = localFont({
  src: "./_fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-cabinet",
});

const SITE_URL = "https://julestoussenel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Jules Toussenel",
    default:
      "Jules Toussenel — Sites sur-mesure pour artisans et commerces premium",
  },
  description:
    "Développeur freelance. Sites sur-mesure pour artisans, commerces et PME qui veulent un site à la hauteur de leur savoir-faire. Next.js, Vercel, Aix-en-Provence.",
  applicationName: "Jules Toussenel",
  authors: [{ name: "Jules Toussenel", url: SITE_URL }],
  creator: "Jules Toussenel",
  publisher: "Jules Toussenel",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Jules Toussenel",
    title: "Jules Toussenel — Sites sur-mesure",
    description:
      "Développeur freelance. Sites sur-mesure pour artisans, commerces et PME.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jules Toussenel — Sites sur-mesure",
    description:
      "Développeur freelance. Sites sur-mesure pour artisans, commerces et PME.",
  },
  robots: {
    index: process.env.VERCEL_ENV === "production",
    follow: process.env.VERCEL_ENV === "production",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
};

// Palette Pinède sur toile — light-only assumé. La toile de lin est la DA,
// on ne propose pas de dark mode. Meta `color-scheme: light` pour que le
// navigateur n'essaie pas d'auto-darkifier les scrollbars et form controls.
export const viewport: Viewport = {
  colorScheme: "light",
  // theme-color : encore lu par Chrome Android / anciens Safari. Safari 26
  // (Liquid Glass) l'ignore et dérive sa barre du background-color du body /
  // des éléments sticky aux bords → ici, body crème = barre flottante crème.
  themeColor: "#F4F1E8",
  width: "device-width",
  initialScale: 1,
  // Edge-to-edge : indispensable pour que env(safe-area-inset-*) fonctionne.
  viewportFit: "cover",
  // Le clavier virtuel redimensionne le contenu (formulaire contact lisible).
  interactiveWidget: "resizes-content",
};

// JSON-LD — identité Person pour les SERP Google. Injecté dans <body>
// car Next.js metadata ne gère pas le script type=application/ld+json.
const JSON_LD_PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jules Toussenel",
  jobTitle: "Développeur freelance",
  url: SITE_URL,
  sameAs: [
    "https://instagram.com/julestoussenel",
    "https://linkedin.com/in/julestoussenel",
    "https://are.na/jules-toussenel",
  ],
  knowsAbout: ["Next.js", "TypeScript", "React", "Design éditorial", "Tailwind CSS"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aix-en-Provence",
    streetAddress: "29 rue de Cuques",
    postalCode: "13100",
    addressCountry: "FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${cabinetGrotesk.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_PERSON) }}
        />
        <LenisProvider>
          <ChapterProvider>
            <BackgroundGrain />
            <BackgroundCurves />
            <SkipLink />
            <Header />
            <main
              id="main"
              tabIndex={-1}
              className="flex-1 flex flex-col focus-visible:outline-none relative z-[1]"
            >
              {children}
            </main>
            <Footer />
            <ChapterMarker />
            <Folio />
            <CustomScrollbar />
          </ChapterProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
