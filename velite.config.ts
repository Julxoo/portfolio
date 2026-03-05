import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: false,
        },
      ],
    ],
  },
  collections: {
    realisations: defineCollection({
      name: "Realisation",
      pattern: "realisations/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(120),
          slug: s.slug("realisations"),
          description: s.string().max(260),
          date: s.isodate(),
          status: s.enum(["en-cours", "termine"]),
          tags: s.array(s.string()),
          category: s.string(),
          client: s.string().optional(),
          url: s.string().url().optional(),
          metadata: s.metadata(),
          toc: s.toc(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/realisations/${data.slug}`,
        })),
    }),
    posts: defineCollection({
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(120),
          seoTitle: s.string().max(70).optional(),
          slug: s.slug("posts"),
          description: s.string().max(260),
          keyword: s.string(),
          date: s.isodate(),
          updated: s.isodate().optional(),
          published: s.boolean().default(true),
          category: s.string(),
          tags: s.array(s.string()).default([]),
          faq: s
            .array(
              s.object({
                question: s.string(),
                answer: s.string(),
              })
            )
            .default([]),
          cover: s.image().optional(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          toc: s.toc(),
          content: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/blog/${data.slug}`,
        })),
    }),
  },
});
