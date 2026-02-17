import { realisations } from "#site/content";
import type { Realisation } from "#site/content";

export type { Realisation };

/** All realisations sorted by date (newest first). */
export function getAllRealisations(): Realisation[] {
  return [...realisations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Get a single realisation by slug, or undefined. */
export function getRealisationBySlug(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug);
}

/** Format ISO date to French readable format. */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
