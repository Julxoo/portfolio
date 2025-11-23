import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/features/hero-section";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/features/project-card";
import { ExperienceItem } from "@/components/features/experience-item";
import { BlogCard } from "@/components/features/blog-card";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getExperiences } from "@/lib/data/experiences";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { SITE_CONFIG } from "@/lib/constants";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  const tProjects = await getTranslations("ProjectsSection");
  const tExperience = await getTranslations("ExperienceSection");
  const tBlog = await getTranslations("BlogSection");
  const tContact = await getTranslations("ContactSection");

  const [featuredProjects, experiences, blogPosts] = await Promise.all([
    getFeaturedProjects(locale),
    getExperiences(locale),
    getPublishedBlogPosts(locale),
  ]);

  return (
    <div className="min-h-screen">
      <Nav />

      <HeroSection
        name={t("name")}
        title={t("title")}
        badge={{
          text: t("badge"),
          href: "https://www.linkedin.com/posts/epitech-marseille_performance-remarquable-lors-du-hackathon-activity-7384620093026062337-i2Y2?utm_source=share&utm_medium=member_desktop",
        }}
        description={
          locale === "fr" ? (
            <>
              étudiant en master data & ia à{" "}
              <a
                href="https://www.epitech.eu/ecole-informatique-marseille/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                epitech marseille
              </a>
              , alternant chez atc immobilier. développeur full-stack maîtrisant
              l&apos;ia générative via cli modernes (
              <a
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                claude code
              </a>
              ,{" "}
              <a
                href="https://developers.openai.com/codex/cli/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                codex
              </a>
              ,{" "}
              <a
                href="https://github.com/google-gemini/gemini-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                gemini
              </a>
              ) pour automatiser les workflows, optimiser les architectures et
              accélérer le développement. spécialisé en{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                next.js
              </a>
              ,{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                node.js
              </a>{" "}
              et{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                supabase
              </a>
              .
            </>
          ) : (
            <>
              master data & ai student at{" "}
              <a
                href="https://www.epitech.eu/ecole-informatique-marseille/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                epitech marseille
              </a>
              , working at atc immobilier. full-stack developer mastering
              generative ai via modern cli tools (
              <a
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                claude code
              </a>
              ,{" "}
              <a
                href="https://developers.openai.com/codex/cli/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                codex
              </a>
              ,{" "}
              <a
                href="https://github.com/google-gemini/gemini-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                gemini
              </a>
              ) to automate workflows, optimize architectures and accelerate
              development. specialized in{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                next.js
              </a>
              ,{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                node.js
              </a>{" "}
              and{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                supabase
              </a>
              .
            </>
          )
        }
      />

      <Section title={tProjects("title")} id="projects">
        <div className="space-y-6 sm:space-y-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {tProjects("empty")}
            </p>
          )}
        </div>
      </Section>

      <Section title={tExperience("title")} id="experience">
        <div className="space-y-6">
          {experiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </Section>

      <Section title={tBlog("title")} id="blog">
        <div className="space-y-4">
          {blogPosts.length > 0 ? (
            blogPosts
              .slice(0, 3)
              .map((post) => <BlogCard key={post.slug} post={post} />)
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {tBlog("empty")}
            </p>
          )}
        </div>
      </Section>

      <Section title={tContact("title")} id="contact">
        <div className="space-y-2 text-xs sm:text-sm">
          <a
            href={SITE_CONFIG.links.email}
            className="block hover:text-muted-foreground transition-colors"
          >
            {SITE_CONFIG.author.email}
          </a>
          {SITE_CONFIG.links.github && (
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-muted-foreground transition-colors"
            >
              {tContact("github")}
            </a>
          )}
          {SITE_CONFIG.links.linkedin && (
            <a
              href={SITE_CONFIG.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-muted-foreground transition-colors"
            >
              {tContact("linkedin")}
            </a>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
}
