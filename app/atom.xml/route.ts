import { getBlogPosts } from "@/lib/data/blog";

export async function GET() {
  const baseUrl = "https://www.julestoussenel.com";

  // Get blog posts for both locales
  const [frPosts, enPosts] = await Promise.all([
    getBlogPosts("fr"),
    getBlogPosts("en"),
  ]);

  // Combine and sort by date
  const allPosts = [
    ...frPosts.filter((p) => p.published).map((p) => ({ ...p, locale: "fr" })),
    ...enPosts.filter((p) => p.published).map((p) => ({ ...p, locale: "en" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestPostDate =
    allPosts.length > 0 ? allPosts[0].date : new Date().toISOString();

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
      <name>Jules Toussenel</name>
      <email>toussenelj@gmail.com</email>
      <uri>${baseUrl}</uri>
    </author>
    ${post.tags.map((tag) => `<category term="${tag}"/>`).join("\n    ")}
    <content type="html" xml:lang="${post.locale}"><![CDATA[${post.description}]]></content>
  </entry>`
    )
    .join("\n");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="fr">
  <title>Jules Toussenel - Blog</title>
  <subtitle>Articles, tutoriels et réflexions sur le développement web</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${baseUrl}" rel="alternate" type="text/html"/>
  <id>${baseUrl}/</id>
  <updated>${new Date(latestPostDate).toISOString()}</updated>
  <author>
    <name>Jules Toussenel</name>
    <email>toussenelj@gmail.com</email>
    <uri>${baseUrl}</uri>
  </author>
  <rights>© ${new Date().getFullYear()} Jules Toussenel. Tous droits réservés.</rights>
  <icon>${baseUrl}/favicon.ico</icon>
  <logo>${baseUrl}/og-image.png</logo>
  <generator uri="https://nextjs.org/">Next.js</generator>
  ${atomEntries}
</feed>`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}





