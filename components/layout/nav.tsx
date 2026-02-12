import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./language-switcher";

export async function Nav() {
  const t = await getTranslations("Navigation");

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-sm hover:text-primary transition-colors">
          Portfolio
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/projects"
              className="hover:text-primary transition-colors"
            >
              {t("projects")}
            </Link>
            <Link
              href="/realisations"
              className="hover:text-primary transition-colors"
            >
              {t("realisations")}
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary transition-colors"
            >
              {t("blog")}
            </Link>
            <Link
              href="/#footer"
              className="hover:text-primary transition-colors"
            >
              {t("contact")}
            </Link>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
