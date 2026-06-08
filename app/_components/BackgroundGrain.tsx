"use client";

import { useLenis } from "lenis/react";
import { useTempus } from "tempus/react";
import { useEffect, useRef, useSyncExternalStore } from "react";

// =====================================================================
// BackgroundGrain — grain analogique en WebGL2, piloté par scroll.
//
// Pattern Codrops Jan 2026 (Bayer dithering) + FBM. Rendu < 0.3 ms à
// 1.5× DPR, shader ~3 Ko. Un plan fullscreen en WebGL2 avec un fragment
// shader qui combine :
//   - FBM noise 4 octaves, drift lent par u_time
//   - Dither Bayer 8×8 (matrice ordonnée) pour casser les bandes
//   - Tint kaki (surface color de la DA), alpha 0.02 à 0.18
// Alpha modulée par la vélocité Lenis — scroll rapide = grain légèrement
// plus dense, évoque un film qui "respire".
//
// Fallback : si WebGL2 indisponible, le canvas reste vide (body bg de la
// DA prend le relais). prefers-reduced-motion = pas de mount.
// =====================================================================

const VERTEX = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 o_color;

uniform float u_time;
uniform float u_velocity;

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  float t = u_time * 0.0001;

  // Low-freq drift FBM
  float n = fbm(v_uv * 3.2 + vec2(t * 0.4, -t * 0.3));

  // Per-pixel ordered dither
  float b = bayer8(px * 0.5) - 0.5;

  // Combined grain field
  float grain = n * 0.65 + b * 0.6 + 0.18;

  // Kaki tint (matches --color-surface #535040)
  vec3 kaki = vec3(0.325, 0.314, 0.251);

  // Alpha modulée par velocity
  float alpha = clamp(grain * 0.08 + u_velocity * 0.04, 0.02, 0.18);

  o_color = vec4(kaki, alpha);
}
`;

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type GLRefs = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uTime: WebGLUniformLocation | null;
  uVelocity: WebGLUniformLocation | null;
};

export function BackgroundGrain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glRefs = useRef<GLRefs | null>(null);
  const velocityRawRef = useRef(0);
  const velocityLerpedRef = useRef(0);
  const reduced = useReducedMotion();

  useLenis((lenis) => {
    velocityRawRef.current = Math.min(Math.abs(lenis.velocity), 50) / 50;
  });

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const err = gl.getShaderInfoLog(shader);
        console.error("Shader compile error:", err);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    // Quad fullscreen en triangle strip
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uVelocity = gl.getUniformLocation(program, "u_velocity");

    glRefs.current = { gl, program, uTime, uVelocity };

    // DPR capped à 1.5 pour perf mobile.
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Blending standard — grain s'additionne par-dessus le body bg.
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return () => {
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(vbo);
      glRefs.current = null;
    };
  }, [reduced]);

  useTempus((time) => {
    if (reduced) return;
    const refs = glRefs.current;
    if (!refs) return;
    const { gl, program, uTime, uVelocity } = refs;

    // Lerp la vélocité pour éviter les à-coups.
    velocityLerpedRef.current +=
      (velocityRawRef.current - velocityLerpedRef.current) * 0.08;

    gl.useProgram(program);
    if (uTime) gl.uniform1f(uTime, time);
    if (uVelocity) gl.uniform1f(uVelocity, velocityLerpedRef.current);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
