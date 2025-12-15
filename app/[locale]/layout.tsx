import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/components/json-ld";
import { GoogleAnalytics } from "@/components/google-analytics";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // SEO: Optimize font loading
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://julestoussenel.com";
  const isEn = locale === "en";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isEn
        ? "Jules Toussenel - Full-Stack Developer • EPITECH Student"
        : "Jules Toussenel - Développeur Full-Stack • Étudiant EPITECH",
      template: "%s | Jules Toussenel",
    },
    description: isEn
      ? "Master Data & AI student at EPITECH Marseille, working at ATC Immobilier. Full-stack developer specialized in Next.js, Node.js and Supabase. Passionate about custom solutions and automation."
      : "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase. Passionné par les solutions sur mesure et l'automatisation.",
    keywords: [
      "Jules Toussenel",
      isEn ? "full-stack developer" : "développeur full-stack",
      "EPITECH",
      "Data & AI",
      "Next.js",
      "Node.js",
      "Supabase",
      "TypeScript",
      "React",
      "Aix-en-Provence",
      "Marseille",
      isEn ? "work-study" : "alternance",
      "CRM",
      isEn ? "automation" : "automatisation",
      isEn ? "portfolio" : "portfolio",
      isEn ? "web developer" : "développeur web",
      isEn ? "software engineer" : "ingénieur logiciel",
    ],
    authors: [{ name: "Jules Toussenel", url: baseUrl }],
    creator: "Jules Toussenel",
    publisher: "Jules Toussenel",
    category: "Technology",
    classification: isEn ? "Portfolio Website" : "Site Portfolio",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      alternateLocale: isEn ? "fr_FR" : "en_US",
      url: `${baseUrl}/${locale}`,
      title: isEn
        ? "Jules Toussenel - Full-Stack Developer • EPITECH Student"
        : "Jules Toussenel - Développeur Full-Stack • Étudiant EPITECH",
      description: isEn
        ? "Master Data & AI student at EPITECH Marseille, working at ATC Immobilier. Full-stack developer specialized in Next.js, Node.js and Supabase."
        : "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase.",
      siteName: "Jules Toussenel",
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: isEn
            ? "Jules Toussenel - Full-Stack Developer"
            : "Jules Toussenel - Développeur Full-Stack",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Jules Toussenel - Full-Stack Developer • EPITECH Student"
        : "Jules Toussenel - Développeur Full-Stack • Étudiant EPITECH",
      description: isEn
        ? "Master Data & AI student at EPITECH Marseille, working at ATC Immobilier. Full-stack developer specialized in Next.js, Node.js and Supabase."
        : "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase.",
      images: [`/${locale}/opengraph-image`],
      creator: "@julestoussenel",
      site: "@julestoussenel",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
      },
      types: {
        "application/rss+xml": `${baseUrl}/feed.xml`,
        "application/atom+xml": `${baseUrl}/atom.xml`,
      },
    },
    verification: {
      // Add your verification codes here
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Jules Toussenel",
    },
    applicationName: "Jules Toussenel Portfolio",
    generator: "Next.js",
    referrer: "strict-origin-when-cross-origin",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      ],
    },
    manifest: "/manifest.webmanifest",
    other: {
      "msapplication-TileColor": "#222428",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#222428" },
    { media: "(prefers-color-scheme: dark)", color: "#222428" },
  ],
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validation de la locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />

        {/* RSS/Atom feed links */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jules Toussenel - Blog RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Jules Toussenel - Blog Atom Feed"
          href="/atom.xml"
        />

        {/* Humans.txt for fun */}
        <link rel="author" href="/humans.txt" />

        {/* JSON-LD Structured Data */}
        <JsonLd locale={locale} />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-background"
        >
          {locale === "en" ? "Skip to main content" : "Aller au contenu principal"}
        </a>

        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <div id="main-content">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
