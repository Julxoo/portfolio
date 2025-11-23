import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 block"
    >
      <h3 className="text-xs sm:text-sm group-hover:text-muted-foreground transition-colors">
        {post.title}
      </h3>
      <span className="text-xs text-muted-foreground sm:shrink-0">
        {new Date(post.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "short",
        })}
      </span>
    </Link>
  );
}
