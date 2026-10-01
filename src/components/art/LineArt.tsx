import { motion, useReducedMotion } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';
import type { ReactNode } from 'react';

/* ── line art ─────────────────────────────────────────────────────
   Small looping abstract scenes, one motif per idea, drawn in the
   brand blues on a 400×300 board, centred whole in its frame. They
   sit on halftone light where the template uses photography. All are
   decorative (aria-hidden) and hold still under reduced motion. */

const PALE = '#D6DFF3';
const SOFT = '#9DB1E0';
const BLUE = '#6F8CCB';

export function Board({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/* Shared glow filter and dot fill, defined once per page so the many
   boards never repeat an id. Rendered once, in App. */
export function ArtDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="art-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="art-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1" fill={SOFT} fillOpacity="0.5" />
        </pattern>
      </defs>
    </svg>
  );
}

export function useLoop() {
  const reduced = useReducedMotion();
  return (animate: TargetAndTransition, transition: Transition) => (reduced ? {} : { animate, transition });
}

/* AI: a neural net. Signals run node to node along the wires. */
const NODES = [
  [70, 80], [70, 150], [70, 220],
  [170, 60], [170, 125], [170, 190], [170, 250],
  [270, 95], [270, 170], [270, 235],
  [345, 150],
] as const;
const LAYERS = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9], [10]];
const WIRES = LAYERS.slice(1).flatMap((layer, l) => LAYERS[l].flatMap((a) => layer.map((b) => [a, b] as const)));
const FIRING = [0, 7, 13, 20, 26, 31, 35];

export function NetworkArt() {
  const loop = useLoop();
  return (
    <Board>
      {WIRES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke={BLUE} strokeOpacity={0.28} />
      ))}
      {FIRING.map((w, i) => {
        const [a, b] = WIRES[w % WIRES.length];
        return (
          <motion.circle
            key={w}
            r={3}
            fill={PALE}
            filter="url(#art-glow)"
            cx={NODES[a][0]}
            cy={NODES[a][1]}
            {...loop(
              { cx: [NODES[a][0], NODES[b][0]], cy: [NODES[a][1], NODES[b][1]], opacity: [0, 1, 1, 0] },
              { duration: 1.6, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut', repeatDelay: 1.2 },
            )}
          />
        );
      })}
      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i === 10 ? 9 : 6}
          fill="#0B1328"
          stroke={i === 10 ? PALE : SOFT}
          strokeWidth={1.5}
          {...loop({ strokeOpacity: [0.5, 1, 0.5] }, { duration: 2.4, repeat: Infinity, delay: (i % 4) * 0.5 })}
        />
      ))}
    </Board>
  );
}

/* Full-stack: isometric layers (data, API, UI) floating apart and back. */
const plate = (y: number) => `M200 ${y} L320 ${y + 50} L200 ${y + 100} L80 ${y + 50} Z`;

export function LayersArt() {
  const loop = useLoop();
  return (
    <Board>
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          {...loop({ y: [0, -14 + i * 7, 0] }, { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 })}
        >
          <path d={plate(150 - i * 55)} fill="#0B1328" fillOpacity={0.85} />
          <path d={plate(150 - i * 55)} fill="url(#art-dots)" stroke={i === 2 ? PALE : SOFT} strokeOpacity={i === 2 ? 0.9 : 0.5} />
        </motion.g>
      ))}
    </Board>
  );
}

/* Enterprise: rows of records on a ruled floor, columns rising and
   settling as data moves through. */
const COLS = [70, 115, 160, 205, 250, 295, 340];

export function ColumnsArt() {
  const loop = useLoop();
  return (
    <Board>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={40} x2={370} y1={250 - i * 40} y2={250 - i * 40} stroke={BLUE} strokeOpacity={0.18} strokeDasharray="2 6" />
      ))}
      {COLS.map((x, i) => {
        const h = 60 + ((i * 37) % 110);
        return (
          <motion.rect
            key={x}
            x={x - 13}
            width={26}
            rx={4}
            y={250 - h}
            height={h}
            fill={i === 3 ? SOFT : BLUE}
            fillOpacity={i === 3 ? 0.9 : 0.35}
            stroke={PALE}
            strokeOpacity={0.4}
            style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
            {...loop({ scaleY: [1, 0.55 + (i % 3) * 0.15, 1] }, { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.22 })}
          />
        );
      })}
      <line x1={40} x2={370} y1={250} y2={250} stroke={SOFT} strokeOpacity={0.6} />
    </Board>
  );
}

/* Vertical platforms: contour lines of a terrain, rings turning
   against each other. */
function ring(r: number, k: number) {
  const pts = Array.from({ length: 49 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const rr = r * (1 + 0.08 * Math.sin(a * 3 + k) + 0.05 * Math.cos(a * 5 - k));
    return `${(200 + Math.cos(a) * rr).toFixed(1)},${(150 + Math.sin(a) * rr * 0.8).toFixed(1)}`;
  });
  return `M${pts.join('L')}Z`;
}

export function ContoursArt() {
  const loop = useLoop();
  return (
    <Board>
      {[22, 44, 66, 88, 110, 132, 154].map((r, i) => (
        <motion.path
          key={r}
          d={ring(r, i)}
          stroke={i === 2 ? PALE : SOFT}
          strokeOpacity={i === 2 ? 0.9 : 0.25 + (6 - i) * 0.06}
          style={{ transformOrigin: '200px 150px' }}
          {...loop({ rotate: i % 2 ? -360 : 360 }, { duration: 60 + i * 12, repeat: Infinity, ease: 'linear' })}
        />
      ))}
      <circle cx={200} cy={150} r={4} fill={PALE} filter="url(#art-glow)" />
    </Board>
  );
}

/* Dedicated pod: a small team orbiting one core. */
export function OrbitArt() {
  const loop = useLoop();
  return (
    <Board>
      <circle cx={200} cy={150} r={26} fill={BLUE} fillOpacity={0.35} filter="url(#art-glow)" />
      <circle cx={200} cy={150} r={12} fill={PALE} />
      {[70, 105, 140].map((r, i) => (
        <g key={r} transform={`translate(200 150) scale(1 0.42) rotate(${i * 25 - 20})`}>
          <circle r={r} stroke={SOFT} strokeOpacity={0.35} vectorEffect="non-scaling-stroke" />
          <motion.g {...loop({ rotate: 360 }, { duration: 9 + i * 4, repeat: Infinity, ease: 'linear' })}>
            <circle cx={r} r={6} fill={PALE} filter="url(#art-glow)" />
          </motion.g>
        </g>
      ))}
    </Board>
  );
}

/* Staff augmentation: one bright point travelling in to fill the gap
   in a working grid; its neighbours light as it lands. */
const GRID = Array.from({ length: 7 * 5 }, (_, i) => [80 + (i % 7) * 40, 70 + Math.floor(i / 7) * 40] as const);
const SLOT = 17;

export function JoinArt() {
  const loop = useLoop();
  return (
    <Board>
      {GRID.map(([x, y], i) =>
        i === SLOT ? (
          <circle key={i} cx={x} cy={y} r={9} stroke={SOFT} strokeOpacity={0.6} strokeDasharray="3 3" />
        ) : (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill={SOFT}
            fillOpacity={0.3}
            {...([10, 16, 18, 24].includes(i)
              ? loop({ fillOpacity: [0.3, 0.3, 1, 0.3] }, { duration: 4, repeat: Infinity, times: [0, 0.55, 0.65, 1] })
              : {})}
          />
        ),
      )}
      <motion.circle
        r={7}
        fill={PALE}
        filter="url(#art-glow)"
        cx={GRID[SLOT][0]}
        cy={GRID[SLOT][1]}
        {...loop(
          { cx: [-20, 120, GRID[SLOT][0], GRID[SLOT][0]], cy: [40, 30, GRID[SLOT][1], GRID[SLOT][1]], opacity: [0, 1, 1, 0] },
          { duration: 4, repeat: Infinity, times: [0, 0.3, 0.6, 1], ease: 'easeInOut' },
        )}
      />
    </Board>
  );
}

/* Fixed price: a route drawn milestone to milestone, each lighting as
   the line reaches it. */
const ROUTE = 'M40 230 C110 230 110 160 170 160 S230 90 290 90 S350 50 370 50';
const STOPS = [[40, 230], [170, 160], [290, 90], [370, 50]] as const;

export function MilestonesArt() {
  const loop = useLoop();
  const reduced = useReducedMotion();
  return (
    <Board>
      <path d={ROUTE} stroke={BLUE} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="4 6" />
      <motion.path
        d={ROUTE}
        stroke={PALE}
        strokeWidth={2.5}
        filter="url(#art-glow)"
        initial={reduced ? false : { pathLength: 0 }}
        {...loop({ pathLength: [0, 1, 1] }, { duration: 5, repeat: Infinity, times: [0, 0.75, 1], ease: 'easeInOut' })}
      />
      {STOPS.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={8}
          fill="#0B1328"
          stroke={PALE}
          strokeWidth={2}
          {...loop(
            { fill: ['#0B1328', '#0B1328', SOFT, SOFT, '#0B1328'] },
            { duration: 5, repeat: Infinity, times: [0, i * 0.24, i * 0.24 + 0.03, 0.95, 1] },
          )}
        />
      ))}
    </Board>
  );
}
