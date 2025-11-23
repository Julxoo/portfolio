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
          href: "https://www.epitech.eu/2025/11/21/un-etudiant-depitech-marseille-triomphe-au-hackathon-coding-battle-2025/",
        }}
        description={
          locale === "fr" ? (
            <>
              Étudiant en Master Data & IA à{" "}
              <a
                href="https://www.epitech.eu/ecole-informatique-marseille/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Epitech Marseille
              </a>
              , alternant chez ATC Immobilier. Développeur full-stack maîtrisant
              l&apos;IA générative via CLI modernes (
              <a
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Claude Code
              </a>
              ,{" "}
              <a
                href="https://developers.openai.com/codex/cli/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Codex
              </a>
              ,{" "}
              <a
                href="https://github.com/google-gemini/gemini-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Gemini
              </a>
              ) pour automatiser les workflows, optimiser les architectures et
              accélérer le développement. Spécialisé en{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Node.js
              </a>{" "}
              et{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Supabase
              </a>
              .
            </>
          ) : (
            <>
              Master Data & AI student at{" "}
              <a
                href="https://www.epitech.eu/ecole-informatique-marseille/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Epitech Marseille
              </a>
              , working at ATC Immobilier. Full-stack developer mastering
              generative AI via modern CLI tools (
              <a
                href="https://claude.com/product/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Claude Code
              </a>
              ,{" "}
              <a
                href="https://developers.openai.com/codex/cli/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Codex
              </a>
              ,{" "}
              <a
                href="https://github.com/google-gemini/gemini-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Gemini
              </a>
              ) to automate workflows, optimize architectures and accelerate
              development. Specialized in{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Node.js
              </a>{" "}
              and{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Supabase
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
      <Footer />
    </div>
  );
}
