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

  const isEn = locale === "en";

  return {
    metadataBase: new URL("https://julestoussenel.com"),
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
    ],
    authors: [{ name: "Jules Toussenel" }],
    creator: "Jules Toussenel",
    publisher: "Jules Toussenel",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "fr_FR",
      url: `https://julestoussenel.com/${locale}`,
      title: isEn
        ? "Jules Toussenel - Full-Stack Developer • EPITECH Student"
        : "Jules Toussenel - Développeur Full-Stack • Étudiant EPITECH",
      description: isEn
        ? "Master Data & AI student at EPITECH Marseille, working at ATC Immobilier. Full-stack developer specialized in Next.js, Node.js and Supabase."
        : "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase.",
      siteName: "Jules Toussenel",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Jules Toussenel - Full-Stack Developer"
            : "Jules Toussenel - Développeur Full-Stack",
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
      images: ["/og-image.png"],
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
      canonical: `https://julestoussenel.com/${locale}`,
      languages: {
        fr: "https://julestoussenel.com/fr",
        en: "https://julestoussenel.com/en",
        "x-default": "https://julestoussenel.com/fr",
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#222428",
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
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
