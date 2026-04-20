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

/** Return the next realisation after the given slug (wraps around). */
export function getNextRealisation(slug: string): Realisation | undefined {
  const list = getAllRealisations();
  if (list.length < 2) return undefined;
  const i = list.findIndex((r) => r.slug === slug);
  if (i === -1) return undefined;
  return list[(i + 1) % list.length];
}

/** Format ISO date to French readable format. */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
