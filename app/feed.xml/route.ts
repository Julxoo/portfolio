import {
  getPublishedPostsForFeeds,
  getLatestPostDate,
  SITE_CONFIG,
} from "@/lib/data/feeds";

export async function GET() {
  const { url: baseUrl, author } = SITE_CONFIG;
  const allPosts = await getPublishedPostsForFeeds();
  const latestPostDate = getLatestPostDate(allPosts);

  const rssItems = allPosts
    .slice(0, 20)
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.locale}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${author.email} (${author.name})</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
      <language>${post.locale}</language>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${author.name} - Blog</title>
    <link>${baseUrl}</link>
    <description>Articles, tutoriels et réflexions sur le développement web par ${author.name}, développeur full-stack spécialisé en Next.js, Node.js et Supabase.</description>
    <language>fr</language>
    <lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>
    <pubDate>${new Date(latestPostDate).toUTCString()}</pubDate>
    <ttl>60</ttl>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>${author.name} - Blog</title>
      <link>${baseUrl}</link>
      <width>1200</width>
      <height>630</height>
    </image>
    <managingEditor>${author.email} (${author.name})</managingEditor>
    <webMaster>${author.email} (${author.name})</webMaster>
    <copyright>© ${new Date().getFullYear()} ${author.name}. Tous droits réservés.</copyright>
    <category>Technology</category>
    <category>Web Development</category>
    <category>Programming</category>
    <generator>Next.js</generator>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
