"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const LOCALE_LABELS: Record<string, string> = {
  fr: "Français",
  en: "English",
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (locale: string) => {
    // If we're on a blog post (which may have different slugs per locale),
    // redirect to the blog index page instead
    const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";

    if (isBlogPost) {
      router.replace("/blog", { locale });
    } else {
      router.replace(pathname, { locale });
    }

    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{currentLocale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 border border-border bg-background shadow-lg min-w-[120px]">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full px-3 py-2 text-xs text-left transition-colors ${
                currentLocale === locale
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              aria-label={`Switch to ${LOCALE_LABELS[locale] || locale}`}
            >
              <span className="font-medium">{locale.toUpperCase()}</span>
              {LOCALE_LABELS[locale] && (
                <span className="ml-2 opacity-60">
                  {LOCALE_LABELS[locale]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
