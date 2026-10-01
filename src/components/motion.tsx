import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/* ── motion primitives ────────────────────────────────────────────
   The motion vocabulary of the reference layout, in one place:
   - entrances:     fade + rise + de-blur, fired once as a block enters
   - hero title:    letters de-blur and rise one after another on load
   - headings:      words de-blur and rise one after another in view
   - figures:       each digit rolls through the reel to its value
   - marquees:      constant px/s, seamless loop */

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: 'spring', stiffness: 260, damping: 40, mass: 1 } as const;
/* Fire when the element's top clears the bottom 12% of the viewport. A
   fraction-visible threshold never fires for blocks taller than the
   screen. */
const IN_VIEW = { once: true, amount: 'some', margin: '0px 0px -12% 0px' } as const;

interface AppearProps {
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  children?: ReactNode;
}

/* Fade, rise and (optionally) de-blur on first view. */
export function Appear({ delay = 0, y = 24, blur = true, className, children }: AppearProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={IN_VIEW}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface SplitProps {
  text: string;
  className?: string;
  delay?: number;
}

/* Hero title: each letter de-blurs and rises in turn as the page loads. */
export function LettersBlurIn({ text, className, delay = 0.2 }: SplitProps) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  return (
    <motion.span
      className={`inline-block whitespace-nowrap ${className ?? ''}`}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(14px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* Headings: words de-blur and rise one after another once in view. */
export function WordsIn({ text, className, delay = 0.1 }: SplitProps) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
              show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/* ── rolling figure ───────────────────────────────────────────────
   Each digit is a reel that spins once through 0–9 and settles on its
   value; reels to the right start a beat later. Anything that is not a
   digit (+, %, –, letters) stays put. */

const CELL = 1.1; /* em; one reel cell, a little taller than the glyph */

export function RollingNumber({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, IN_VIEW);
  const reduced = useReducedMotion();

  if (reduced) return <span className={className}>{value}</span>;

  let reel = 0;
  return (
    <span ref={ref} className={`inline-flex items-start tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <Reel key={i} digit={Number(ch)} play={inView} delay={0.12 * reel++} />
        ) : (
          <span key={i} aria-hidden style={{ height: `${CELL}em`, lineHeight: CELL, whiteSpace: 'pre' }}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function Reel({ digit, play, delay }: { digit: number; play: boolean; delay: number }) {
  const cells = [...Array(10).keys(), ...Array(digit + 1).keys()];
  return (
    <span aria-hidden className="relative inline-block overflow-hidden" style={{ height: `${CELL}em`, lineHeight: CELL }}>
      <span className="invisible">{digit}</span>
      <motion.span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={{ y: '0em' }}
        animate={{ y: play ? `${-(cells.length - 1) * CELL}em` : '0em' }}
        transition={{ duration: 2, delay, ease: EASE }}
      >
        {cells.map((d, k) => (
          <span key={k} style={{ height: `${CELL}em` }}>
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/* ── marquee ──────────────────────────────────────────────────────
   Two copies of the track side by side; x wraps at one copy's width,
   so the loop is seamless at a constant speed in px per second. */

interface MarqueeProps {
  speed?: number;
  gap?: number;
  className?: string;
  children: ReactNode;
}

export function Marquee({ speed = 60, gap = 0, className = '', children }: MarqueeProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth + gap));
    ro.observe(el);
    return () => ro.disconnect();
  }, [gap]);

  useAnimationFrame((_, delta) => {
    if (reduced || width === 0) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -width) next += width;
    x.set(next);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max" style={{ x, gap }}>
        <div ref={trackRef} className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap }} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
