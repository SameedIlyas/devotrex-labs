import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/* ── motion primitives ────────────────────────────────────────────
   Every value here is lifted from the reference template's Framer
   effects, so timings stay identical across sections:
   - section/card entrances: spring 320 / 70, fired once at 50% in view
   - heading words:          0.8s tween [.44,0,.56,1], 75ms stagger
   - hero heading words:     blur 10px, spring 400 / 100, 50ms stagger
   - reveal paragraph:       per-character colour tied to scroll
   - marquees:               constant px/s, seamless loop */

export const SPRING = { type: 'spring', stiffness: 320, damping: 70, mass: 1 } as const;
export const TWEEN_EASE = [0.44, 0, 0.56, 1] as const;
/* Fire when the element's top clears the bottom 15% of the viewport. A
   fraction-visible threshold never fires for blocks taller than the
   screen (the stacked engagement cards on phones). */
const IN_VIEW = { once: true, amount: 'some', margin: '0px 0px -15% 0px' } as const;

interface AppearProps {
  delay?: number;
  y?: number;
  className?: string;
  children?: ReactNode;
}

/* Fade (and optional rise) on first view. */
export function Appear({ delay = 0, y = 0, className, children }: AppearProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

interface WordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/* Section headings: words fade up 10px one after another once in view. */
export function WordsIn({ text, className, wordClassName }: WordsProps) {
  return (
    <Words
      text={text}
      className={className}
      wordClassName={wordClassName}
      hidden={{ opacity: 0, y: 10 }}
      stagger={0.075}
      delay={0.2}
      transition={{ duration: 0.8, ease: TWEEN_EASE }}
      trigger="view"
    />
  );
}

/* Hero heading: words de-blur and rise as the page loads. */
export function WordsBlurIn({ text, className, wordClassName }: WordsProps) {
  return (
    <Words
      text={text}
      className={className}
      wordClassName={wordClassName}
      hidden={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
      stagger={0.05}
      delay={0.5}
      transition={{ type: 'spring', stiffness: 400, damping: 100, mass: 1 }}
      trigger="mount"
    />
  );
}

interface WordsImplProps extends WordsProps {
  hidden: Record<string, number | string>;
  stagger: number;
  delay: number;
  transition: object;
  trigger: 'view' | 'mount';
}

function Words({ text, className, wordClassName = '', hidden, stagger, delay, transition, trigger }: WordsImplProps) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(' ');
  const shown = { opacity: 1, y: 0, filter: 'blur(0px)', transition };
  const play = trigger === 'view' ? { whileInView: 'show', viewport: IN_VIEW } : { animate: 'show' };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...play}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <motion.span
            aria-hidden
            className={`inline-block ${wordClassName}`}
            variants={{ hidden, show: shown }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

/* ── scroll reveal paragraph ──────────────────────────────────────
   Each character darkens from 10% to full ink as the paragraph moves
   from 75% to 15% of the viewport height. The first `leadIn`
   characters start dark, so the sentence opens already legible. */

const FAINT = 'rgba(7, 12, 22, 0.12)';
const INK = '#070C16';

interface ScrollRevealProps {
  text: string;
  leadIn?: number;
  className?: string;
}

export function ScrollReveal({ text, leadIn = 22, className }: ScrollRevealProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'start 0.15'] });

  if (reduced) return <p ref={ref} className={className} style={{ color: INK }}>{text}</p>;

  const words = text.split(' ');
  const total = words.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, w) => {
        const start = w / total;
        const step = 1 / total / word.length;
        const first = charIndex;
        charIndex += word.length + 1;
        return (
          <Fragment key={`${word}-${w}`}>
            <span aria-hidden className="inline-block whitespace-nowrap">
              {word.split('').map((ch, c) => (
                <RevealChar
                  key={c}
                  ch={ch}
                  progress={scrollYProgress}
                  from={start + step * c}
                  to={start + step * (c + 1)}
                  lit={first + c < leadIn}
                />
              ))}
            </span>{' '}
          </Fragment>
        );
      })}
    </p>
  );
}

interface RevealCharProps {
  ch: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  lit: boolean;
}

function RevealChar({ ch, progress, from, to, lit }: RevealCharProps) {
  const color = useTransform(progress, [from, to], [FAINT, INK]);
  return <motion.span style={{ color: lit ? INK : color }}>{ch}</motion.span>;
}

/* ── marquee ──────────────────────────────────────────────────────
   Two copies of the track side by side; x wraps at one copy's width,
   so the loop is seamless at a constant speed in px per second. */

interface MarqueeProps {
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
  className?: string;
  children: ReactNode;
}

export function Marquee({ speed = 100, direction = 'left', gap = 0, className = '', children }: MarqueeProps) {
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
    const moved = (speed * delta) / 1000;
    const sign = direction === 'left' ? -1 : 1;
    let next = x.get() + sign * moved;
    if (next <= -width) next += width;
    if (next > 0) next -= width;
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
