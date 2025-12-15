import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { blogPostSchema } from "@/lib/schemas/blog.schema";
import type { BlogPost, BlogPostWithContent } from "@/types";
import { MDXComponents } from "@/components/blog/mdx-components";

export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const blogDir = path.join(process.cwd(), `content/blog/${locale}`);
    const files = await fs.readdir(blogDir);

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(blogDir, file), "utf-8");
          const { data } = matter(content);

          const slug = file.replace(".mdx", "");
          const postData = blogPostSchema.parse({
            slug,
            ...data,
          });

          return postData;
        })
    );

    // Trier par date (plus récent en premier)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Erreur lors de la lecture des articles:", error);
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostWithContent | null> {
  try {
    const blogDir = path.join(process.cwd(), `content/blog/${locale}`);
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const source = await fs.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
      components: MDXComponents,
    });

    const postData = blogPostSchema.parse({
      slug,
      ...frontmatter,
    });

    return {
      ...postData,
      content,
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture de l'article ${slug}:`, error);
    return null;
  }
}

export async function getPublishedBlogPosts(locale: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.published);
}

export async function getBlogSlugs(locale: string): Promise<string[]> {
  try {
    const blogDir = path.join(process.cwd(), `content/blog/${locale}`);
    const files = await fs.readdir(blogDir);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  } catch (error) {
    console.error("Erreur lors de la lecture des slugs blog:", error);
    return [];
  }
}

/**
 * Get related blog posts based on shared tags
 * Uses a scoring algorithm: more shared tags = higher relevance
 */
export async function getRelatedBlogPosts(
  currentSlug: string,
  currentTags: string[],
  locale: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getPublishedBlogPosts(locale);

  // Filter out current post and score by shared tags
  const scored = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) =>
        currentTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      ).length,
    }));

  // Sort by score (highest first), then by date (newest first)
  return scored
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    )
    .slice(0, limit)
    .map((item) => item.post);
}
