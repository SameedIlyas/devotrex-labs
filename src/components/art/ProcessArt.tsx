import { motion } from 'framer-motion';
import { Board, useLoop } from './LineArt';

/* ── process scenes ───────────────────────────────────────────────
   One small looping scene per step of working with us, drawn on the
   same 400×300 board as the other line art:
   01 the gap      an empty slot sending out a signal
   02 the pilot    the first block of a row filling in and checking off
   03 shipping     a product window assembling under your badge
   04 scaling      one node becoming a growing network */

const PALE = '#D6DFF3';
const SOFT = '#9DB1E0';
const BLUE = '#6F8CCB';

export function GapScene() {
  const loop = useLoop();
  return (
    <Board>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={200}
          cy={150}
          r={30}
          stroke={SOFT}
          strokeWidth={1.5}
          {...loop({ r: [30, 140], opacity: [0.8, 0] }, { duration: 3, repeat: Infinity, delay: i, ease: 'easeOut' })}
        />
      ))}
      {[[110, 90], [290, 90], [110, 210], [290, 210]].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x - 16} y={y - 16} width={32} height={32} rx={8} fill={BLUE} fillOpacity={0.35} stroke={SOFT} strokeOpacity={0.4} />
      ))}
      <motion.rect
        x={176}
        y={126}
        width={48}
        height={48}
        rx={12}
        stroke={PALE}
        strokeWidth={2}
        strokeDasharray="6 6"
        filter="url(#art-glow)"
        {...loop({ strokeDashoffset: [0, -24] }, { duration: 1.2, repeat: Infinity, ease: 'linear' })}
      />
    </Board>
  );
}

export function PilotScene() {
  const loop = useLoop();
  return (
    <Board>
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 70 + i * 56;
        return i === 0 ? (
          <g key={i}>
            <motion.rect
              x={x}
              y={122}
              width={44}
              height={56}
              rx={10}
              fill={SOFT}
              filter="url(#art-glow)"
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
              {...loop({ scaleY: [0, 1, 1, 0] }, { duration: 4, repeat: Infinity, times: [0, 0.3, 0.85, 1], ease: 'easeOut' })}
            />
            <motion.path
              d={`M${x + 12} 150 l8 8 l14 -16`}
              stroke="#0B1328"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              {...loop({ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }, { duration: 4, repeat: Infinity, times: [0, 0.3, 0.45, 0.85, 1] })}
            />
            <rect x={x} y={122} width={44} height={56} rx={10} stroke={PALE} strokeWidth={1.5} />
          </g>
        ) : (
          <rect key={i} x={x} y={122} width={44} height={56} rx={10} stroke={SOFT} strokeOpacity={0.35} strokeDasharray="4 5" />
        );
      })}
      <line x1={70} x2={334} y1={200} y2={200} stroke={BLUE} strokeOpacity={0.3} />
    </Board>
  );
}

export function ShipScene() {
  const loop = useLoop();
  const LINES = [[130, 150, 160], [130, 172, 120], [130, 194, 140]] as const;
  return (
    <Board>
      <rect x={90} y={70} width={220} height={160} rx={14} fill="#0B1328" fillOpacity={0.8} stroke={SOFT} strokeOpacity={0.6} />
      <line x1={90} x2={310} y1={96} y2={96} stroke={SOFT} strokeOpacity={0.3} />
      {[106, 118, 130].map((x) => (
        <circle key={x} cx={x} cy={83} r={3.5} fill={SOFT} fillOpacity={0.6} />
      ))}
      <motion.rect
        x={130}
        y={112}
        width={90}
        height={22}
        rx={5}
        fill={BLUE}
        fillOpacity={0.6}
        style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
        {...loop({ scaleX: [0, 1, 1, 0] }, { duration: 4.5, repeat: Infinity, times: [0, 0.2, 0.9, 1] })}
      />
      {LINES.map(([x, y, w], i) => (
        <motion.rect
          key={y}
          x={x}
          y={y}
          width={w}
          height={7}
          rx={3.5}
          fill={SOFT}
          fillOpacity={0.45}
          style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
          {...loop({ scaleX: [0, 0, 1, 1, 0] }, { duration: 4.5, repeat: Infinity, times: [0, 0.15 + i * 0.08, 0.3 + i * 0.08, 0.9, 1] })}
        />
      ))}
      <motion.g
        style={{ transformOrigin: '300px 210px' }}
        {...loop({ scale: [1.6, 1.6, 1, 1, 1.6], opacity: [0, 0, 1, 1, 0] }, { duration: 4.5, repeat: Infinity, times: [0, 0.5, 0.6, 0.9, 1], ease: 'backOut' })}
      >
        <circle cx={300} cy={210} r={26} fill={PALE} filter="url(#art-glow)" />
        <path d="M289 210 l8 8 l15 -16" stroke="#0B1328" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </Board>
  );
}

/* Rings of nodes around one origin, each ring lighting a beat after
   the one inside it, joined back toward the centre. */
const RINGS = [
  { r: 0, n: 1 },
  { r: 52, n: 5 },
  { r: 100, n: 10 },
  { r: 145, n: 16 },
];
const SCALE_NODES = RINGS.flatMap(({ r, n }, ring) =>
  Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2 + ring * 0.4;
    return { ring, x: 200 + Math.cos(a) * r, y: 150 + Math.sin(a) * r * 0.62 };
  }),
);

export function ScaleScene() {
  const loop = useLoop();
  return (
    <Board>
      {SCALE_NODES.filter((p) => p.ring > 0).map((p, i) => {
        const inner = RINGS[p.ring - 1].r;
        const a = Math.atan2((p.y - 150) / 0.62, p.x - 200);
        return (
          <motion.line
            key={`l${i}`}
            x1={200 + Math.cos(a) * inner}
            y1={150 + Math.sin(a) * inner * 0.62}
            x2={p.x}
            y2={p.y}
            stroke={BLUE}
            strokeOpacity={0.4}
            {...loop({ opacity: [0, 0, 1, 1, 0] }, { duration: 5, repeat: Infinity, times: [0, p.ring * 0.18, p.ring * 0.18 + 0.08, 0.9, 1] })}
          />
        );
      })}
      {SCALE_NODES.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.ring === 0 ? 10 : 5}
          fill={p.ring === 0 ? PALE : SOFT}
          filter={p.ring === 0 ? 'url(#art-glow)' : undefined}
          {...(p.ring === 0
            ? {}
            : loop({ opacity: [0, 0, 1, 1, 0] }, { duration: 5, repeat: Infinity, times: [0, p.ring * 0.18, p.ring * 0.18 + 0.06, 0.9, 1] }))}
        />
      ))}
    </Board>
  );
}
