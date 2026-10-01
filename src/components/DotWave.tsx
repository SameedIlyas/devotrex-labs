import { useEffect, useRef } from 'react';

/* ── dot wave ─────────────────────────────────────────────────────
   A field of points over rolling hills, seen in perspective and drawn
   on a canvas: the brand-blue version of the template's particle
   landscape, but alive. Rows run from the horizon to the camera and
   each row is wide enough to reach the screen edges at its depth, so
   the field never shows a border. Points are laid out by their spacing
   on screen (tight at the horizon, opening up toward the camera), and
   crests catch more light than troughs. Points are binned by
   brightness so a frame costs one fill per bin, not one per point.
   - redraws at ~30 fps and pauses while off screen
   - draws one still frame under reduced motion */

const Z_NEAR = 1.15;
const Z_FAR = 9;
const CAM_H = 1.2;      /* camera height above the mean surface */
const BINS = 18;

/* navy trough → accent → pale crest */
const STOPS = [
  [22, 34, 63],
  [53, 84, 143],
  [111, 140, 203],
  [214, 223, 243],
] as const;

function ramp(v: number) {
  const p = v * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(p));
  const f = p - i;
  return STOPS[i].map((c, k) => Math.round(c + (STOPS[i + 1][k] - c) * f));
}

const FILLS = Array.from({ length: BINS }, (_, b) => {
  const v = (b + 0.5) / BINS;
  const [r, g, bl] = ramp(v);
  return `rgba(${r},${g},${bl},${(0.3 + 0.7 * v).toFixed(3)})`;
});

function height(x: number, z: number, t: number) {
  return (
    0.5 * Math.sin(x * 0.5 + t * 0.3) * Math.cos(z * 0.55 - t * 0.22) +
    0.24 * Math.sin(x * 1.25 - z * 0.85 + t * 0.5) +
    0.09 * Math.sin((x + z) * 2.7 + t * 0.85)
  );
}

interface DotWaveProps {
  className?: string;
  /* where the horizon sits, as a fraction of the canvas height */
  horizon?: number;
}

export function DotWave({ className = '', horizon = 0.14 }: DotWaveProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const bins: number[][] = Array.from({ length: BINS }, () => []);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = reduced ? 6 : (now - start) / 1000;
      const focal = Math.max(h * 0.95, w * 0.42);
      const cx = w / 2;
      const hy = h * horizon;
      const gap = w < 640 ? 5.5 : 4.8; /* px between points at the horizon */
      for (const b of bins) b.length = 0;

      let z = Z_FAR;
      while (z >= Z_NEAR) {
        const near = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR); /* 0 horizon .. 1 camera */
        const spacing = gap + near * near * 8;            /* px on screen */
        const step = (spacing * z) / focal;                /* world units */
        const xMax = (w / 2 / focal) * z * 1.05;
        const size = 1 + near * 1.6;
        const fade = 0.35 + 0.65 * Math.min(1, near * 2.2);

        for (let x = -xMax; x <= xMax; x += step) {
          const y = height(x, z, t);
          const sy = hy + ((CAM_H - y) / z) * focal;
          if (sy > h + 2 || sy < -2) continue;
          const light = Math.min(1, Math.max(0, (y + 0.6) / 1.2));
          const v = Math.pow(light, 1.6) * fade;
          if (v < 0.03) continue;
          const bin = bins[Math.min(BINS - 1, Math.floor(v * BINS))];
          bin.push(cx + (x / z) * focal, sy, size);
        }
        z -= (spacing * z * z) / (focal * CAM_H) * 0.9;
      }

      ctx.clearRect(0, 0, w, h);
      for (let b = 0; b < BINS; b++) {
        const pts = bins[b];
        if (!pts.length) continue;
        ctx.fillStyle = FILLS[b];
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 3) ctx.rect(pts[i], pts[i + 1], pts[i + 2], pts[i + 2]);
        ctx.fill();
      }
    };

    /* The hills move slowly, so ~30 frames a second reads as smooth
       and halves the cost. */
    let last = 0;
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
  }, [horizon]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden />;
}
