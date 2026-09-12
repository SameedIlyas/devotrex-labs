import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

/* ── word-by-word reveal ───────────────────────────────────────────
   Mirrored from devotrex.com (website/src/components/agencee/AgWords.tsx).
   Every display heading splits into one span per word and staggers in
   (~40ms). Each word rises from its own overflow-hidden clip box, and the
   in-view trigger lives on the always-visible wrapper — a clipped word
   reports zero visible area and would never count as "in view".

   `highlight` is the trailing phrase that sits in the frosted pill. */

const EASE = [0.16, 1, 0.3, 1] as const;

const wordVariants: Variants = {
  hidden: { y: '115%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: EASE } },
};

const highlightVariants: Variants = {
  hidden: { y: '18%', opacity: 0, filter: 'blur(6px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
};

interface AgWordsProps {
  text: string;
  highlight?: ReactNode;
  delay?: number;
  className?: string;
}

export function AgWords({ text, highlight, delay = 0, className }: AgWordsProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return (
      <span className={className}>
        {text}
        {highlight ? <> {highlight}</> : null}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The clip box is taller than the line (pb + matching -mb) so
              descenders survive the overflow clip. Change one, change both. */}
          <span className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 || highlight ? ' ' : null}
        </Fragment>
      ))}
      {highlight ? (
        <motion.span className="inline-block" variants={highlightVariants}>
          {highlight}
        </motion.span>
      ) : null}
    </motion.span>
  );
}
