import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getRealisations } from "@/lib/data/realisations";
import { RealisationCard } from "@/components/features/realisation-card";
import { Section } from "@/components/layout/section";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbWithJsonLd } from "@/components/breadcrumb-with-json-ld";
import { CollectionPageJsonLd } from "@/components/collection-page-json-ld";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const baseUrl = SITE_CONFIG.url;

  return {
    title: isEn ? "Websites" : "Réalisations",
    description: isEn
      ? "Showcase websites designed and developed for businesses: restaurants, shops, professionals and more."
      : "Sites vitrines conçus et développés pour des entreprises : restaurants, commerces, professionnels et plus encore.",
    alternates: {
      canonical: `${baseUrl}/${locale}/realisations`,
      languages: {
        fr: `${baseUrl}/fr/realisations`,
        en: `${baseUrl}/en/realisations`,
      },
    },
    openGraph: {
      title: isEn
        ? "Websites | Jules Toussenel"
        : "Réalisations | Jules Toussenel",
      description: isEn
        ? "Showcase websites designed and developed for businesses"
        : "Sites vitrines conçus et développés pour des entreprises",
      url: `${baseUrl}/${locale}/realisations`,
      type: "website",
    },
  };
}

export default async function RealisationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("RealisationsPage");
  const tNav = await getTranslations("Navigation");
  const realisations = await getRealisations(locale);
  const baseUrl = SITE_CONFIG.url;

  const count = realisations.length;
  const description =
    count > 1
      ? `${count} ${t("sitesDeliveredPlural")}`
      : `${count} ${t("sitesDelivered")}`;

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("realisations") },
  ];

  const collectionItems = realisations.map((r) => ({
    name: r.name,
    description: r.description,
    url: r.url,
  }));

  return (
    <>
      <CollectionPageJsonLd
        name={t("title")}
        description={
          locale === "en"
            ? "Showcase websites by Jules Toussenel"
            : "Sites vitrines par Jules Toussenel"
        }
        url={`/${locale}/realisations`}
        locale={locale}
        items={collectionItems}
        type="projects"
      />

      <div className="min-h-screen">
        <Nav />
        <main>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
            <BreadcrumbWithJsonLd items={breadcrumbItems} />
          </div>
          <Section
            title={t("title")}
            description={description}
            className="border-t-0 pt-0"
            aria-label={
              locale === "en" ? "All websites" : "Toutes les réalisations"
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {realisations.map((realisation) => (
                <RealisationCard
                  key={realisation.id}
                  realisation={realisation}
                />
              ))}
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
}
