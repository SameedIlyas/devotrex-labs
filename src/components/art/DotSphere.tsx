import { useEffect, useRef } from 'react';

/* ── dot sphere ───────────────────────────────────────────────────
   A globe of evenly spread points (a Fibonacci lattice) turning slowly
   on a tilted axis. Points facing the viewer are larger and brighter,
   points round the back fade to navy, so it reads as a halftone ball
   of light. Same rules as the dot wave: ~30 fps, pauses off screen,
   one still frame under reduced motion. */

const POINTS = 1100;
const TILT = 0.42;

const lattice = Array.from({ length: POINTS }, (_, i) => {
  const y = 1 - (i / (POINTS - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const a = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(a) * r, y, Math.sin(a) * r] as const;
});

export function DotSphere({ className = '', scale = 0.38 }: { className?: string; scale?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    const start = performance.now();
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const spin = reduced ? 0.6 : ((now - start) / 1000) * 0.18;
      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const R = Math.min(w, h) * scale;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);
      for (const [x0, y0, z0] of lattice) {
        const x1 = x0 * cs + z0 * sn;
        const z1 = -x0 * sn + z0 * cs;
        const y2 = y0 * cosT - z1 * sinT;
        const z2 = y0 * sinT + z1 * cosT; /* -1 back .. 1 front */
        const lit = (z2 + 1) / 2;
        const size = 0.7 + lit * 2.1;
        const r = Math.round(53 + 161 * lit);
        const g = Math.round(84 + 139 * lit);
        const b = Math.round(143 + 100 * lit);
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.15 + 0.85 * lit * lit).toFixed(3)})`;
        ctx.fillRect(cx + x1 * R - size / 2, cy + y2 * R - size / 2, size, size);
      }
    };

    const loop = (now: number) => {
      if (now - last >= 32) {
        last = now;
        draw(now);
      }
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [scale]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden />;
}
