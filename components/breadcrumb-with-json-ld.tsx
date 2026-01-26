import React from "react";
import { Link } from "@/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_CONFIG } from "@/lib/constants";

interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BreadcrumbWithJsonLdProps {
  items: BreadcrumbItemData[];
}

export function BreadcrumbWithJsonLd({ items }: BreadcrumbWithJsonLdProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `${SITE_CONFIG.url}${item.href}`,
      }),
    })),
  };

  return (
    <>
      {/* JSON-LD pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb visuel - style minimaliste terminal */}
      <Breadcrumb className="mb-6 sm:mb-8">
        <BreadcrumbList className="text-xs">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="inline-flex items-center gap-1.5">
                  {isLast ? (
                    <BreadcrumbPage className="text-foreground">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href!}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {/* Séparateur style terminal : / au lieu de › */}
                {!isLast && (
                  <BreadcrumbSeparator className="text-muted-foreground/50">
                    <span>/</span>
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
