"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FloatingDevisProps {
  /** Use {prenom}, {nom}, {activite} as placeholders */
  messageTemplate: string;
}

export function FloatingDevis({ messageTemplate }: FloatingDevisProps) {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [activite, setActivite] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const buildSmsUrl = () => {
    const body = messageTemplate
      .replace("{prenom}", prenom)
      .replace("{nom}", nom)
      .replace("{activite}", activite || "\u00e0 pr\u00e9ciser");
    return `sms:0614533229?body=${encodeURIComponent(body)}`;
  };

  const canSubmit = nom.trim() && prenom.trim();

  const closeModal = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on ESC and focus trap
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;

        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  // Auto-focus first input when opening
  useEffect(() => {
    if (open) {
      const panel = panelRef.current;
      if (!panel) return;
      const firstInput = panel.querySelector<HTMLElement>("input, textarea");
      firstInput?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-dark-chocolate/20 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={closeModal}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Formulaire de demande de devis"
        className="fixed bottom-8 right-8 z-50 w-[calc(100vw-4rem)] max-w-sm transition-all duration-500"
        style={{
          transitionTimingFunction: "var(--ease-luxury)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(12px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="border border-rule-light bg-parchment p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Demander un devis
            </p>
            <button
              onClick={closeModal}
              aria-label="Fermer le formulaire"
              className="font-sans text-sm text-taupe transition-colors duration-300 hover:text-dark-chocolate"
            >
              &times;
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <label>
                <span className="sr-only">Pr&eacute;nom</span>
                <input
                  type="text"
                  placeholder="Pr&eacute;nom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full border-0 border-b border-rule-light bg-transparent pb-2 font-sans text-sm transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none"
                />
              </label>
              <label>
                <span className="sr-only">Nom</span>
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full border-0 border-b border-rule-light bg-transparent pb-2 font-sans text-sm transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none"
                />
              </label>
            </div>
            <label>
              <span className="sr-only">D&eacute;crivez votre activit&eacute;</span>
              <textarea
                placeholder="D&eacute;crivez votre activit&eacute; en quelques mots"
                value={activite}
                onChange={(e) => setActivite(e.target.value)}
                rows={3}
                className="w-full resize-none border-0 border-b border-rule-light bg-transparent pb-2 font-sans text-sm leading-[1.7] transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none"
              />
            </label>
          </div>

          <a
            href={canSubmit ? buildSmsUrl() : undefined}
            onClick={(e) => {
              if (!canSubmit) e.preventDefault();
            }}
            aria-disabled={!canSubmit}
            data-track="cta"
            data-track-label="Devis SMS Submit"
            className={`mt-6 flex w-full items-center justify-center gap-2.5 border px-5 py-3 font-sans text-[12px] uppercase tracking-[0.1em] transition-all duration-300 ${
              canSubmit
                ? "border-dark-chocolate bg-dark-chocolate text-parchment hover:bg-espresso"
                : "cursor-not-allowed border-rule-light text-taupe/40"
            }`}
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            Envoyer un message
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-label="Demander un devis"
        data-track="cta"
        data-track-label="Floating Devis Open"
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2.5 border border-rule-light bg-parchment/90 px-5 py-3 font-sans text-[12px] uppercase tracking-[0.1em] text-dark-chocolate shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-camel hover:text-camel"
        style={{
          transitionTimingFunction: "var(--ease-luxury)",
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
      >
        Demander un devis
        <span className="text-camel">&rarr;</span>
      </button>
    </>
  );
}
