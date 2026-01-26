import { getBlogPosts } from "./blog";
import { SITE_CONFIG } from "../constants";

export interface FeedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  locale: string;
}

/**
 * Get all published blog posts from all locales, sorted by date (newest first)
 */
export async function getPublishedPostsForFeeds(): Promise<FeedPost[]> {
  const [frPosts, enPosts] = await Promise.all([
    getBlogPosts("fr"),
    getBlogPosts("en"),
  ]);

  return [
    ...frPosts.filter((p) => p.published).map((p) => ({ ...p, locale: "fr" })),
    ...enPosts.filter((p) => p.published).map((p) => ({ ...p, locale: "en" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get the latest post date for feed metadata
 */
export function getLatestPostDate(posts: FeedPost[]): string {
  return posts.length > 0 ? posts[0].date : new Date().toISOString();
}

export { SITE_CONFIG };
