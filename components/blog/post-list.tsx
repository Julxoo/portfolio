import Link from "next/link";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogPostListProps {
  posts: PostSummary[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) return null;

  return (
    <ul className="border-t border-rule-light">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={post.permalink}
            className="group flex flex-col gap-1 border-b border-rule-light py-6 transition-colors duration-300 md:flex-row md:items-baseline md:justify-between md:gap-8"
          >
            <div>
              <h3
                className="font-normal transition-colors duration-300 group-hover:text-camel"
                style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.35rem)" }}
              >
                {post.title}
              </h3>
              <p className="mt-2 max-w-xl font-sans text-sm leading-[1.6] text-dark-chocolate/60">
                {post.description}
              </p>
            </div>
            <div className="mt-2 shrink-0 md:mt-0 md:text-right">
              <time dateTime={post.date} className="block font-mono text-xs text-taupe">
                {formatDate(post.date)}
              </time>
              <p className="font-sans text-[10px] text-taupe/60">
                {post.metadata.readingTime} min
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
