"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../Button";

type SubmitButtonProps = {
  /** Libellé au repos. Défaut : « Envoyer ». */
  label?: string;
  /** Libellé pendant l'envoi. Défaut : « Envoi… ». */
  pendingLabel?: string;
  /** Taille du bouton. Défaut : default. */
  size?: "default" | "sm";
  className?: string;
};

/**
 * SubmitButton — bouton primary qui utilise `useFormStatus` (React 19)
 * pour afficher un état pending sans contrôle manuel.
 *
 * À placer dans un `<form action={serverAction}>`. Le hook lit le statut
 * du form parent via context — aucune prop à câbler.
 */
export function SubmitButton({
  label = "Envoyer",
  pendingLabel = "Envoi…",
  size = "default",
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={size}
      trailingArrow={!pending}
      disabled={pending}
      aria-disabled={pending}
      className={className}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
