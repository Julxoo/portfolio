import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");

  return (
    <footer className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-border">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("navigation")}
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                {tNav("projects")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                {tNav("blog")}
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-foreground transition-colors">
                {tNav("contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Stack */}
        <div>
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("stack")}
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>Next.js 16</li>
            <li>TypeScript</li>
            <li>Supabase</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("contact")}
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <a
                href={SITE_CONFIG.links.email}
                className="hover:text-foreground transition-colors"
              >
                {t("email")}
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                github
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                linkedin
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Location */}
      <div className="pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} • {t("location")}
          </p>
          <p className="text-muted-foreground/70">
            {t("builtWith")} Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
