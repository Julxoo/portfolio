interface WebsiteJsonLdProps {
  locale: string;
}

export function WebsiteJsonLd({ locale }: WebsiteJsonLdProps) {
  const isEn = locale === "en";
  const baseUrl = "https://julestoussenel.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: isEn
      ? "Jules Toussenel - Full-Stack Developer Portfolio"
      : "Jules Toussenel - Portfolio Développeur Full-Stack",
    alternateName: ["Jules Toussenel", "julestoussenel.com"],
    description: isEn
      ? "Portfolio of Jules Toussenel, full-stack developer specialized in Next.js, Node.js and Supabase. Master Data & AI student at EPITECH Marseille."
      : "Portfolio de Jules Toussenel, développeur full-stack spécialisé en Next.js, Node.js et Supabase. Étudiant Master Data & IA à EPITECH Marseille.",
    url: baseUrl,
    inLanguage: [
      {
        "@type": "Language",
        name: "French",
        alternateName: "fr",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Jules Toussenel",
    },
    // SearchAction for Google Sitelinks Search Box
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    // Copyrights
    copyrightHolder: {
      "@type": "Person",
      name: "Jules Toussenel",
    },
    copyrightYear: 2024,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
