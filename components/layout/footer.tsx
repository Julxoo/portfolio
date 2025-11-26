import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SITE_CONFIG } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Navigation");

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 border-t border-border"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Navigation */}
        <nav aria-label="Footer navigation">
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("navigation")}
          </h3>
          <ul className="space-y-2 text-xs text-muted-foreground" role="list">
            <li>
              <Link
                href="/"
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
              >
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
              >
                {tNav("projects")}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
              >
                {tNav("blog")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold mb-3 text-foreground">
            {t("contact")}
          </h3>
          <ul
            className="space-y-2 text-xs text-muted-foreground"
            role="list"
            aria-label="Contact links"
          >
            <li>
              <a
                href={SITE_CONFIG.links.email}
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
                aria-label="Send email"
              >
                {t("email")}
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
                aria-label="Visit GitHub profile (opens in new tab)"
              >
                GitHub
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors focus:outline-none focus:text-primary"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                LinkedIn
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Location */}
      <div className="pt-6 border-t border-border">
        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground text-center">
          <p>
            <span itemScope itemType="https://schema.org/Organization">
              <span itemProp="copyrightYear">{currentYear}</span> ©{" "}
              <span itemProp="name">{SITE_CONFIG.name}</span>
            </span>{" "}
            •{" "}
            <span
              itemScope
              itemType="https://schema.org/PostalAddress"
              itemProp="address"
            >
              <span itemProp="addressLocality">{t("location")}</span>
            </span>
          </p>
          <p className="text-muted-foreground/70">
            {t("builtWith")}{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
