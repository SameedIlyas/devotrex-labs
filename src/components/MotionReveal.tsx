import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const SPRING = { type: 'spring', stiffness: 260, damping: 30 } as const;

interface MotionRevealProps {
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function MotionReveal({ delay = 0, className, children }: MotionRevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}
