interface JsonLdProps {
  locale?: string;
}

export function JsonLd({ locale = "fr" }: JsonLdProps) {
  const isEn = locale === "en";
  const baseUrl = "https://www.julestoussenel.com";

  // Person schema - enriched with awards and achievements
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Jules Toussenel",
    givenName: "Jules",
    familyName: "Toussenel",
    url: baseUrl,
    email: "toussenelj@gmail.com",
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://github.com/Julxoo",
      "https://www.linkedin.com/in/julestoussenel/",
    ],
    jobTitle: isEn ? "Full-Stack Developer" : "Développeur Full-Stack",
    description: isEn
      ? "Master Data & AI student at EPITECH Marseille, working at ATC Immobilier. Full-stack developer specialized in Next.js, Node.js and Supabase."
      : "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase.",
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "EPITECH Marseille",
        url: "https://www.epitech.eu/ecole-informatique-marseille/",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marseille",
          addressRegion: "Provence-Alpes-Côte d'Azur",
          addressCountry: "FR",
        },
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "ATC Immobilier",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aix-en-Provence",
        addressCountry: "FR",
      },
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: isEn ? "Full-Stack Developer" : "Développeur Full-Stack",
        occupationLocation: {
          "@type": "City",
          name: "Aix-en-Provence",
          containedInPlace: {
            "@type": "Country",
            name: "France",
          },
        },
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
          "AI-Assisted Development",
        ],
        responsibilities: isEn
          ? [
              "Full-stack web application development",
              "CRM system development",
              "Process automation",
              "AI integration",
            ]
          : [
              "Développement d'applications web full-stack",
              "Développement de systèmes CRM",
              "Automatisation des processus",
              "Intégration de l'IA",
            ],
      },
      {
        "@type": "Occupation",
        name: isEn ? "Master Data & AI Student" : "Étudiant Master Data & IA",
        occupationLocation: {
          "@type": "City",
          name: "Marseille",
        },
      },
    ],
    // Awards and achievements
    award: [
      isEn
        ? "1st Place - Le Match'Up Hackathon (Coding Battle 2025)"
        : "1ère place - Hackathon Le Match'Up (Coding Battle 2025)",
    ],
    // Professional credentials
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: isEn
          ? "Master Data & Artificial Intelligence (in progress)"
          : "Master Data & Intelligence Artificielle (en cours)",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "EPITECH",
        },
      },
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Web Development",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Development",
      "Claude Code",
      "AI-Assisted Development",
      "CRM Development",
      "Process Automation",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Français",
        alternateName: "fr",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aix-en-Provence",
      addressRegion: "Provence-Alpes-Côte d'Azur",
      addressCountry: "FR",
    },
    // Contact points
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional",
      email: "toussenelj@gmail.com",
      availableLanguage: ["French", "English"],
    },
    // Nationality
    nationality: {
      "@type": "Country",
      name: "France",
    },
  };

  // WebSite schema
  const websiteSchema = {
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
    inLanguage: ["fr-FR", "en-US"],
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/projects?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    copyrightHolder: {
      "@id": `${baseUrl}/#person`,
    },
    copyrightYear: 2024,
  };

  // Organization schema - personal brand
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Jules Toussenel",
    alternateName: "JT Dev",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/icons/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description: isEn
      ? "Full-stack development services specializing in Next.js, Node.js and Supabase. Custom CRM solutions and process automation."
      : "Services de développement full-stack spécialisés en Next.js, Node.js et Supabase. Solutions CRM sur mesure et automatisation des processus.",
    sameAs: [
      "https://github.com/Julxoo",
      "https://www.linkedin.com/in/julestoussenel/",
    ],
    founder: {
      "@id": `${baseUrl}/#person`,
    },
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "CRM Development",
      "Process Automation",
      "AI Integration",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: isEn ? "customer service" : "service client",
      email: "toussenelj@gmail.com",
      availableLanguage: ["French", "English"],
    },
  };

  // ProfilePage schema for the homepage
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/${locale}/#profilepage`,
    name: isEn
      ? "Jules Toussenel - Full-Stack Developer"
      : "Jules Toussenel - Développeur Full-Stack",
    description: isEn
      ? "Professional portfolio of Jules Toussenel showcasing projects, experience, and blog articles."
      : "Portfolio professionnel de Jules Toussenel présentant projets, expériences et articles de blog.",
    url: `${baseUrl}/${locale}`,
    mainEntity: {
      "@id": `${baseUrl}/#person`,
    },
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
