import {
  getPublishedPostsForFeeds,
  getLatestPostDate,
  SITE_CONFIG,
} from "@/lib/data/feeds";

export async function GET() {
  const { url: baseUrl, author } = SITE_CONFIG;
  const allPosts = await getPublishedPostsForFeeds();
  const latestPostDate = getLatestPostDate(allPosts);

  const atomEntries = allPosts
    .slice(0, 20)
    .map(
      (post) => `
  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${baseUrl}/${post.locale}/blog/${post.slug}" rel="alternate"/>
    <id>${baseUrl}/${post.locale}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <summary type="html"><![CDATA[${post.description}]]></summary>
    <author>
      <name>${author.name}</name>
      <email>${author.email}</email>
      <uri>${baseUrl}</uri>
    </author>
    ${post.tags.map((tag) => `<category term="${tag}"/>`).join("\n    ")}
    <content type="html" xml:lang="${post.locale}"><![CDATA[${post.description}]]></content>
  </entry>`
    )
    .join("\n");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="fr">
  <title>${author.name} - Blog</title>
  <subtitle>Articles, tutoriels et réflexions sur le développement web</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${baseUrl}" rel="alternate" type="text/html"/>
  <id>${baseUrl}/</id>
  <updated>${new Date(latestPostDate).toISOString()}</updated>
  <author>
    <name>${author.name}</name>
    <email>${author.email}</email>
    <uri>${baseUrl}</uri>
  </author>
  <rights>© ${new Date().getFullYear()} ${author.name}. Tous droits réservés.</rights>
  <icon>${baseUrl}/favicon.ico</icon>
  <logo>${baseUrl}/og-image.png</logo>
  <generator uri="https://nextjs.org/">Next.js</generator>
  ${atomEntries}
</feed>`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
