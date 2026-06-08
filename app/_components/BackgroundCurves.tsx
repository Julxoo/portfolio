"use client";

import { useLenis } from "lenis/react";
import { useTempus } from "tempus/react";
import { useEffect, useRef, useSyncExternalStore } from "react";

// =====================================================================
// BackgroundCurves — canvas 2D fixé en fond de page.
//
// Quatre courbes de Bézier kaki très pâles (opacité 6.5%) qui ondulent
// lentement. L'amplitude des ondulations est modulée par la vélocité du
// scroll — immobile, les courbes respirent à peine ; scroll rapide, elles
// gonflent puis se lissent. Jamais au-dessus de 180 px d'amplitude.
//
// Perf : canvas redrawn chaque frame via useTempus (rAF partagée), clear
// complet + 4 tracés. Coût ≈ 0.1 ms sur M-series. DPR clampé à 2.
// Désactivé complètement en prefers-reduced-motion.
// =====================================================================

const STROKE = "rgba(83, 80, 64, 0.065)";
const LINE_WIDTH = 1;
const CURVE_COUNT = 4;
const VELOCITY_CLAMP = 50;
const VELOCITY_LERP = 0.08;

function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function BackgroundCurves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const velocityRawRef = useRef(0);
  const velocityLerpedRef = useRef(0);
  const reduced = useReducedMotion();

  // Capte la vélocité Lenis sans re-render React.
  useLenis((lenis) => {
    velocityRawRef.current =
      Math.min(Math.abs(lenis.velocity), VELOCITY_CLAMP) / VELOCITY_CLAMP;
  });

  // Resize handling — ajuste la résolution canvas selon DPR.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [reduced]);

  // Boucle de tracé partagée avec Lenis via Tempus.
  useTempus((time) => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    if (w === 0) return;

    // Damping exponentiel pour lisser les à-coups de vélocité.
    velocityLerpedRef.current +=
      (velocityRawRef.current - velocityLerpedRef.current) * VELOCITY_LERP;
    const vel = velocityLerpedRef.current;

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = STROKE;
    ctx.lineWidth = LINE_WIDTH;

    const t = time * 0.00008; // phase très lente

    for (let i = 0; i < CURVE_COUNT; i++) {
      const y0 = (h / (CURVE_COUNT + 1)) * (i + 1);
      const phase = i * 0.9 + t;
      // Amplitude de base + amplification par la vélocité, clampée à 180px.
      const ampBase = 32 + (h / CURVE_COUNT) * 0.08;
      const amp = Math.min(180, ampBase + vel * 120);

      ctx.beginPath();
      ctx.moveTo(0, y0 + Math.sin(phase - 1) * amp * 0.3);
      ctx.bezierCurveTo(
        w * 0.3,
        y0 + Math.sin(phase) * amp,
        w * 0.7,
        y0 + Math.cos(phase + 1.3) * amp,
        w,
        y0 + Math.sin(phase + 2.1) * amp * 0.4,
      );
      ctx.stroke();
    }
  });

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
  );
}
