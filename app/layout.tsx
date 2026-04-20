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

const SITE_TITLE =
  "Jules Toussenel · Développeur Web Freelance à Aix-en-Provence";

const SITE_DESCRIPTION =
  "Développeur web freelance à Aix-en-Provence. Création de sites vitrine sur-mesure, CRM métier, applications SaaS, référencement SEO et GEO, maintenance de sites existants code ou WordPress.";

export const metadata: Metadata = {
  metadataBase: new URL("https://julestoussenel.com"),
  title: {
    default: SITE_TITLE,
    template: "%s | Jules Toussenel",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Jules Toussenel",
  authors: [{ name: "Jules Toussenel", url: "https://julestoussenel.com" }],
  creator: "Jules Toussenel",
  publisher: "Jules Toussenel",
  category: "technology",
  keywords: [
    "développeur web freelance",
    "développeur freelance Aix-en-Provence",
    "création site web Aix-en-Provence",
    "développeur Next.js",
    "développeur React",
    "site vitrine sur-mesure",
    "application web sur-mesure",
    "SaaS",
    "CRM métier",
    "automatisation",
    "référencement SEO local",
    "GEO ChatGPT Perplexity",
    "maintenance site web",
    "TypeScript",
    "Node.js",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Jules Toussenel",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://julestoussenel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@julestoussenel",
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
  },
  appleWebApp: {
    capable: true,
    title: "Jules Toussenel",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": [process.env.BING_SITE_VERIFICATION] }
      : undefined,
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
