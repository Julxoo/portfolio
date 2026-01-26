import { Section } from "@/components/layout/section";
import { BlogCard } from "@/components/features/blog-card";
import type { BlogPost } from "@/types";

interface RelatedPostsProps {
  posts: BlogPost[];
  locale: string;
}

export function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <Section
      title={locale === "fr" ? "Articles similaires" : "Related posts"}
      id="related-posts"
      aria-label={
        locale === "fr" ? "Articles de blog similaires" : "Related blog posts"
      }
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
