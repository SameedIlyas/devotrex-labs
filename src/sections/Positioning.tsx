import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { DotSphere } from '../components/art/DotSphere';
import { ContoursArt, LayersArt } from '../components/art/LineArt';
import { Halftone } from '../components/Halftone';
import type { HalftonePreset } from '../components/Halftone';
import { Appear, EASE } from '../components/motion';
import { positioning } from '../data/company';

/* ── positioning ──────────────────────────────────────────────────
   The template's testimonial slot, carrying where we sit instead of a
   quote: a card with a large serif statement and arrows, beside a
   halftone panel playing an abstract scene for the point. Slides cross-fade through blur and advance on their
   own every few seconds while in view, unless the pointer rests on them. */

const ART: readonly HalftonePreset[] = ['tide', 'ember', 'mist'];
/* depth, range, discretion */
const SCENES = [() => <DotSphere scale={0.36} />, LayersArt, ContoursArt] as const;
const ADVANCE_MS = 7000;

export function Positioning() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const count = positioning.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  useEffect(() => {
    if (paused || reduced || !inView) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, inView, count]);

  const point = positioning[index];
  const Scene = SCENES[index % SCENES.length];
  const swap = {
    initial: { opacity: 0, y: 16, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -16, filter: 'blur(10px)' },
    transition: { duration: 0.6, ease: EASE },
  };

  return (
    <section id="why" ref={ref} className="section" aria-roledescription="carousel" aria-label="Where Devotrex sits">
      <div className="wrap">
        <Appear y={40}>
          <div
            className="grid gap-4 lg:grid-cols-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="card flex min-h-[460px] flex-col p-7 md:min-h-[560px] md:p-10">
              <span className="font-serif text-[88px] leading-[0.6] text-blue-soft select-none" aria-hidden>
                &ldquo;
              </span>

              <div className="flex flex-1 items-center py-10" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div key={point.n} {...swap}>
                    <p className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.025em] text-white">
                      {point.title}.
                    </p>
                    <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.5]">{point.body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[17px] font-medium text-white">Where we sit</div>
                  <div className="text-[15px] text-ink-mute">
                    {point.n} / {String(count).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous point"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next point"
                    className="grid h-11 w-11 place-items-center rounded-full bg-white text-bg transition-colors hover:bg-blue-pale"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative min-h-[340px] overflow-hidden rounded-[20px] lg:min-h-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={point.n}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: EASE }}
                >
                  <Halftone preset={ART[index % ART.length]} className="h-full">
                    <Scene />
                    <div className="relative flex h-full items-end justify-end p-8">
                      <span className="font-serif text-[clamp(6rem,14vw,11rem)] leading-[0.8] tracking-[-0.05em] text-white/85">
                        {point.n}
                      </span>
                    </div>
                  </Halftone>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Appear>
      </div>
    </section>
  );
}
