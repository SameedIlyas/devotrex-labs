import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { PointerEvent, ReactNode } from 'react';

/* ── tilt card ────────────────────────────────────────────────────
   Hover treatment shared by every card: a few degrees of 3D tilt
   toward the pointer, a 6px lift, and a soft accent spotlight that
   follows the cursor. `className` must carry the card's radius so
   the spotlight is clipped to the same shape. */

interface TiltProps {
  className?: string;
  max?: number;
  children: ReactNode;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

export function Tilt({ className = '', max = 5, children }: TiltProps) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useMotionValue(-999);
  const sy = useMotionValue(-999);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(111, 140, 203, 0.22), transparent 60%)`;

  if (reduced) return <div className={className}>{children}</div>;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    sx.set(e.clientX - r.left);
    sy.set(e.clientY - r.top);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    sx.set(-999);
    sy.set(-999);
  };

  return (
    <motion.div
      className={`group relative h-full ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
    </motion.div>
  );
}
