import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import type { ComponentType, CSSProperties, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { GapScene, PilotScene, ScaleScene, ShipScene } from '../components/art/ProcessArt';
import { Halftone } from '../components/Halftone';
import type { HalftonePreset } from '../components/Halftone';
import { Appear, EASE } from '../components/motion';
import { SectionHead } from '../components/ui';
import { processSteps } from '../data/company';
import type { ProcessStep } from '../data/company';

/* ── process ──────────────────────────────────────────────────────
   Four steps on a rail that fills as the section scrolls past: across
   the top of the cards on wide screens, down their left edge on narrow
   ones. Each step lights up when the rail reaches it (its node glows,
   its number brightens, its scene comes up to full strength), so the
   reader is walked through the order. Every card plays its own scene
   (the gap, the pilot, shipping, scaling) and carries a light that
   follows the pointer, rimming the card's edge nearest to it. */

const SCENES: readonly { Scene: ComponentType; preset: HalftonePreset }[] = [
  { Scene: GapScene, preset: 'tide' },
  { Scene: PilotScene, preset: 'dawn' },
  { Scene: ShipScene, preset: 'mist' },
  { Scene: ScaleScene, preset: 'ember' },
];

export function Process() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const reduced = useReducedMotion();
  const count = processSteps.length;
  const [reached, setReached] = useState(reduced ? count : 0);
  /* Wide: the row of cards is on screen at once, so the rail runs its
     length while the row's top moves up the screen. Narrow: the cards
     stack, so the rail follows the whole column. */
  const wide = useMedia('(min-width: 1280px)');
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: wide ? ['start 0.85', 'start 0.3'] : ['start 0.8', 'end 0.6'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) return;
    setReached(Math.min(count, Math.floor(v * (count - 1) + 0.02) + 1));
  });

  const fill = reduced ? undefined : { scaleX: scrollYProgress };
  const fillY = reduced ? undefined : { scaleY: scrollYProgress };

  return (
    <section id="process" className="section">
      <div className="wrap">
        <SectionHead title="Real delivery, without the guesswork." />
        <Appear delay={0.2} className="mx-auto mt-6 max-w-[520px] text-center">
          <p className="lede">Four steps from the first conversation to a standing team, each one earning the next.</p>
        </Appear>

        <div className="relative mt-16 md:mt-24">
          {/* horizontal rail, wide screens */}
          <div className="relative mb-8 hidden h-6 xl:block" aria-hidden>
            <span className="absolute top-1/2 right-[12.5%] left-[12.5%] h-px -translate-y-1/2 bg-white/10" />
            <motion.span
              className="absolute top-1/2 right-[12.5%] left-[12.5%] h-[2px] origin-left -translate-y-1/2 bg-gradient-to-r from-accent via-blue to-blue-pale shadow-[0_0_12px_rgba(157,177,224,0.7)]"
              style={fill}
            />
            {processSteps.map((s, i) => (
              <RailNode key={s.n} lit={i < reached} className="top-1/2" style={{ left: `${12.5 + i * 25}%` }} />
            ))}
          </div>

          {/* vertical rail, narrow screens */}
          <div className="absolute top-2 bottom-2 left-[11px] w-px xl:hidden" aria-hidden>
            <span className="absolute inset-0 bg-white/10" />
            <motion.span
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-blue to-blue-pale shadow-[0_0_12px_rgba(157,177,224,0.7)]"
              style={fillY}
            />
          </div>

          <ol ref={listRef} className="m-0 grid list-none gap-5 p-0 xl:grid-cols-4 xl:gap-4">
            {processSteps.map((s, i) => (
              <li key={s.n} className="relative pl-10 xl:pl-0">
                <RailNode lit={i < reached} className="top-11 left-[11px] xl:hidden" />
                <Appear delay={i * 0.1} y={40} className="h-full">
                  <StepCard step={s} index={i} lit={i < reached} />
                </Appear>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return match;
}

function RailNode({ lit, className = '', style }: { lit: boolean; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`absolute z-10 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-500 ${
        lit ? 'border-blue-soft bg-navy' : 'border-white/15 bg-bg'
      } ${className}`}
      style={style}
      aria-hidden
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-blue-pale"
        animate={{ scale: lit ? 1 : 0, boxShadow: lit ? '0 0 12px 3px rgba(157,177,224,0.8)' : '0 0 0 0 rgba(0,0,0,0)' }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </span>
  );
}

interface StepCardProps {
  step: ProcessStep;
  index: number;
  lit: boolean;
}

function StepCard({ step, index, lit }: StepCardProps) {
  const { Scene, preset } = SCENES[index % SCENES.length];

  /* Feed the pointer position to the CSS spotlight. */
  const track = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article
      onMouseMove={track}
      className={`spot card group relative flex h-full flex-col p-3 transition-[box-shadow,transform] duration-700 hover:-translate-y-1 ${
        lit ? 'shadow-[inset_0_0_0_1px_rgba(157,177,224,0.22),0_30px_60px_-30px_rgba(53,84,143,0.6)]' : ''
      }`}
    >
      <div className="flex items-center justify-between px-3 pt-3 pb-4">
        <span
          className={`font-serif text-[44px] leading-none tracking-[-0.03em] transition-colors duration-700 ${
            lit ? 'text-white' : 'text-white/20'
          }`}
        >
          {step.n}
        </span>
        <span className="chip chip--sm">{step.kicker}</span>
      </div>

      <Halftone
        preset={preset}
        className={`aspect-[4/3] rounded-[14px] transition-opacity duration-700 ${lit ? 'opacity-100' : 'opacity-45'}`}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
          <Scene />
        </div>
      </Halftone>

      <div className="flex flex-1 flex-col px-3 pt-6 pb-4">
        <h3 className="font-sans text-[20px] leading-tight font-medium tracking-[-0.03em]">{step.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.5]">{step.body}</p>
      </div>
    </article>
  );
}
