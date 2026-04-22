const EMAIL = "toussenelj@gmail.com";
const WHATSAPP_NUMBER = "33614533229";

const buttonBaseClass =
  "group pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-rule-dark/80 bg-dark-chocolate text-parchment shadow-[0_6px_20px_-8px_rgba(26,23,20,0.55)] backdrop-blur-sm transition-all duration-300 hover:bg-camel hover:text-espresso hover:border-camel focus-visible:bg-camel focus-visible:text-espresso md:h-14 md:w-14";

const buttonStyle = { transitionTimingFunction: "var(--ease-hover)" } as const;

export function FloatingContact() {
  return (
    <div
      aria-label="Contact rapide"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end px-5 pb-5 md:px-8 md:pb-8"
    >
      <div className="flex flex-col items-center gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Envoyer un message WhatsApp à Jules Toussenel"
          className={buttonBaseClass}
          style={buttonStyle}
        >
          <WhatsAppIcon />
        </a>
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Envoyer un e-mail à Jules Toussenel"
          className={buttonBaseClass}
          style={buttonStyle}
        >
          <MailIcon />
        </a>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 md:h-[22px] md:w-[22px]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.571-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.892 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 md:h-[22px] md:w-[22px]"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
