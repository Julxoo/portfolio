"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

// =====================================================================
// CustomScrollbar — thumb kaki draggable pilotée par Lenis.
//
// Pattern repris de darkroomengineering/satus : on masque la scrollbar
// native via CSS, on dessine un thumb de hauteur fixe qui suit
// `scroll / limit`. Au drag, pointer-events capturés et scrollTo avec
// lerp:0.2 pour ne pas téléporter.
//
// Desktop only. Sur mobile, la scrollbar native est réactivée via
// globals.css (voir règles `html` en fin de fichier).
// =====================================================================

const THUMB_HEIGHT = 80;

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const startOffsetRef = useRef<number | null>(null);
  const lenis = useLenis();

  useLenis(({ scroll, limit }) => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;
    const usable = track.clientHeight - THUMB_HEIGHT;
    const progress = limit > 0 ? scroll / limit : 0;
    thumb.style.transform = `translate3d(0, ${progress * usable}px, 0)`;
  });

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track || !lenis) return;

    const onPointerDown = (e: PointerEvent) => {
      const thumbRect = thumb.getBoundingClientRect();
      startOffsetRef.current = e.clientY - thumbRect.top;
      thumb.setPointerCapture(e.pointerId);
      document.documentElement.classList.add("scrollbar-grabbing");
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (startOffsetRef.current === null) return;
      const trackRect = track.getBoundingClientRect();
      const usable = track.clientHeight - THUMB_HEIGHT;
      const y = e.clientY - trackRect.top - startOffsetRef.current;
      const progress = Math.max(0, Math.min(1, y / usable));
      lenis.scrollTo(progress * lenis.limit, { immediate: false, lerp: 0.2 });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (startOffsetRef.current === null) return;
      startOffsetRef.current = null;
      try {
        thumb.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — capture may have been lost
      }
      document.documentElement.classList.remove("scrollbar-grabbing");
    };

    thumb.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      thumb.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [lenis]);

  return (
    <div
      ref={trackRef}
      aria-hidden
      className="fixed top-0 right-0 bottom-0 w-[3px] z-20 hidden md:block"
    >
      <div
        ref={thumbRef}
        className="w-full cursor-grab touch-none hover:w-[5px] transition-[width] duration-quick ease-out-quint"
        style={{
          height: `${THUMB_HEIGHT}px`,
          backgroundColor: "var(--color-surface)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
