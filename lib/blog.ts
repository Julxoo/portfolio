import { posts } from "#site/content";
import type { Post } from "#site/content";

export type { Post };

/** Lightweight post shape for client components (no content/toc/excerpt). */
export type PostSummary = Pick<
  Post,
  | "title"
  | "description"
  | "keyword"
  | "category"
  | "tags"
  | "date"
  | "slug"
  | "permalink"
  | "metadata"
>;

/** Published posts sorted by date (newest first). */
export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single published post by slug, or undefined. */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug && post.published);
}

/** Get N most recent published posts. */
export function getLatestPosts(count: number): Post[] {
  return getPublishedPosts().slice(0, count);
}

/** Get related posts by category + tag overlap, excluding the current post. */
export function getRelatedPosts(current: Post, count: number = 3): Post[] {
  return getPublishedPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      for (const tag of post.tags) {
        if (current.tags.includes(tag)) score += 1;
      }
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ post }) => post);
}

/** Get published posts filtered by category. */
export function getPostsByCategory(category: string, count?: number): Post[] {
  const filtered = getPublishedPosts().filter(
    (post) => post.category === category
  );
  return count ? filtered.slice(0, count) : filtered;
}

/** Format ISO date to French readable format. */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
