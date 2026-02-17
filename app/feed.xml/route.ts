import { getPublishedPosts } from "@/lib/blog";

const BASE_URL = "https://julestoussenel.com";

export function GET() {
  const posts = getPublishedPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>toussenelj@gmail.com (Jules Toussenel)</author>${post.category ? `
      <category>${post.category}</category>` : ""}${post.tags?.map((tag) => `
      <category>${tag}</category>`).join("") ?? ""}
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jules Toussenel</title>
    <link>${BASE_URL}</link>
    <description>Articles sur le developpement web, Next.js, TypeScript, IA et freelancing.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
