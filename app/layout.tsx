import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Geist_Mono, Inter } from "next/font/google";
import { Navbar, Footer, SmoothScroll } from "@/components/ui";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteSchema } from "@/lib/schemas";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#F0E6D9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://julestoussenel.com"),
  title: {
    default:
      "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence",
    template: "%s | Jules Toussenel",
  },
  description:
    "AI-Augmented Software Engineer à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation.",
  keywords: [
    "développeur web freelance",
    "Aix-en-Provence",
    "développeur Next.js",
    "développeur React",
    "création site web",
    "application web sur-mesure",
    "SaaS",
    "CRM métier",
    "automatisation",
    "intelligence artificielle",
    "freelance développeur",
    "ingénieur logiciel",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Jules Toussenel",
    title: "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence",
    description:
      "AI-Augmented Software Engineer à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation.",
    url: "https://julestoussenel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence",
    description:
      "AI-Augmented Software Engineer à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://julestoussenel.com",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  verification: {
    // TODO: remplacer par le code de verification Google Search Console
    google: "REMPLACER_PAR_CODE_GSC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Script
        defer
        src="https://analytics.julestoussenel.com/t.js"
        data-site="7e752673"
        strategy="afterInteractive"
      />
      <body
        className={`${inter.variable} ${cormorant.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only fixed left-4 top-4 z-[100] bg-parchment px-4 py-2 font-sans text-sm text-espresso shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-camel"
          >
            Aller au contenu principal
          </a>
          <JsonLd data={siteSchema} />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
