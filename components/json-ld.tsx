export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jules Toussenel",
    url: "https://julestoussenel.com",
    email: "toussenelj@gmail.com",
    sameAs: [
      "https://github.com/Julxoo",
      "https://www.linkedin.com/in/julestoussenel/",
    ],
    jobTitle: "Développeur Full-Stack",
    description: "Étudiant en Master Data & IA à EPITECH Marseille, alternant chez ATC Immobilier. Développeur full-stack spécialisé en Next.js, Node.js et Supabase.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "EPITECH Marseille",
      url: "https://www.epitech.eu/ecole-informatique-marseille/",
    },
    worksFor: {
      "@type": "Organization",
      name: "ATC Immobilier",
    },
    hasOccupation: [
      {
        "@type": "Occupation",
        name: "Développeur Full-Stack",
        occupationLocation: {
          "@type": "City",
          name: "Aix-en-Provence",
        },
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
        ],
      },
      {
        "@type": "Occupation",
        name: "Étudiant Master Data & IA",
        occupationLocation: {
          "@type": "City",
          name: "Marseille",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
