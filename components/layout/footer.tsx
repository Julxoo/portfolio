import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");

  return (
    <footer id="footer" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-border">
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("navigation")}
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary transition-colors">
                {tNav("projects")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                {tNav("blog")}
              </Link>
            </li>
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
                className="hover:text-primary transition-colors"
              >
                {t("email")}
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Location */}
      <div className="pt-6 border-t border-border">
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground text-center">
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
