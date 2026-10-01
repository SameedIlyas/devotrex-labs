import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { ColumnsArt, ContoursArt, LayersArt, NetworkArt } from '../components/art/LineArt';
import { Halftone } from '../components/Halftone';
import type { HalftonePreset } from '../components/Halftone';
import { SectionHead, Button } from '../components/ui';
import { pillars } from '../data/services';
import type { Pillar } from '../data/services';

/* ── services ─────────────────────────────────────────────────────
   The four pillars as full-width ruled rows. The list pins to the
   screen while the page scrolls through a runway behind it, and each
   stretch of that runway opens the next pillar, so scrolling alone
   walks through all four; nothing needs a click. Pinning matters: a
   row opening in normal flow would push the rows below it past the
   reader and open them too.
   The open/close motion matches the template: the row being opened
   and the row being closed resize together on one stiff, critically
   damped spring (most of the way in ~0.25s, settled by ~0.7s), and
   the panel is uncovered by the growing row rather than faded in. The
   open row lifts onto a card and its toggle turns white and becomes a
   cross. Clicking a row scrolls the runway to it. The pinned list has
   to fit one screen, so the per-service list only shows on tall ones. */

const TOPICS: Record<string, readonly string[]> = {
  ai: ['RAG agents', 'Workflows', 'OCR & vision'],
  web: ['SaaS MVPs', 'APIs', 'Audits & QA'],
  enterprise: ['Legacy SQL', 'Data migration', 'ETL'],
  vertical: ['Legal', 'Real estate', 'LIMS'],
};

const ART: Record<string, { preset: HalftonePreset; Art: ComponentType }> = {
  ai: { preset: 'dawn', Art: NetworkArt },
  web: { preset: 'tide', Art: LayersArt },
  enterprise: { preset: 'ember', Art: ColumnsArt },
  vertical: { preset: 'mist', Art: ContoursArt },
};

const SPRING = { type: 'spring', stiffness: 400, damping: 40, mass: 1 } as const;
const RUNWAY_PER_ROW = 60; /* svh of scrolling per pillar */

export function Services() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const count = pillars.length;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  /* Clicking a row moves the page to the middle of that row's stretch. */
  const jumpTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const runway = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (runway / count) * (i + 0.5), behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative pt-[clamp(88px,10vw,150px)]">
      <div className="px-[clamp(16px,4vw,40px)]">
        <SectionHead title="From a gap in your team to a shipped build." />
      </div>

      <div
        ref={trackRef}
        className="relative mt-12 md:mt-16"
        style={{ height: `calc(100svh + ${count * RUNWAY_PER_ROW}svh)` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center pt-[76px] md:pt-[88px]">
          <div className="border-b border-line">
            {pillars.map((p, i) => (
              <ServiceRow key={p.id} pillar={p} open={active === i} onSelect={() => jumpTo(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface RowProps {
  pillar: Pillar;
  open: boolean;
  onSelect: () => void;
}

function ServiceRow({ pillar, open, onSelect }: RowProps) {
  const id = useId();
  const Icon = pillar.icon;
  const { preset, Art } = ART[pillar.id];

  return (
    <div className={`border-t border-line transition-colors duration-500 ${open ? 'bg-surface' : ''}`}>
      <div className="wrap px-[clamp(16px,4vw,40px)]">
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-center gap-4 py-3.5 text-left md:gap-6 md:py-4"
        >
          <Icon
            size={30}
            strokeWidth={1.6}
            className={`shrink-0 transition-colors duration-500 ${open ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}
            aria-hidden
          />
          <span className="flex flex-1 items-start gap-2">
            <span
              className={`font-serif text-[clamp(1.8rem,3.5vw,2.9rem)] leading-none tracking-[-0.025em] transition-colors duration-500 ${
                open ? 'text-white' : 'text-white/55 group-hover:text-white/85'
              }`}
            >
              {pillar.short}
            </span>
            <span className="mt-0.5 text-[13px] font-medium text-ink-mute md:text-[15px]">{pillar.index}</span>
          </span>
          <span className="hidden gap-2 lg:flex" aria-hidden>
            {TOPICS[pillar.id]?.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </span>
          <motion.span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-300 md:h-[52px] md:w-[52px] ${
              open ? 'bg-white text-bg' : 'bg-white/12 text-white group-hover:bg-white/20'
            }`}
            animate={{ rotate: open ? 45 : 0 }}
            transition={SPRING}
            aria-hidden
          >
            <Plus size={22} strokeWidth={2} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={id}
              key="panel"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={SPRING}
              className="overflow-hidden"
            >
              <div className="grid gap-6 pb-5 md:pb-6 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
                <Halftone preset={preset} className="h-[clamp(180px,32svh,360px)] rounded-[16px]">
                  <Art />
                  <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 lg:hidden">
                    {TOPICS[pillar.id]?.map((t) => (
                      <span key={t} className="chip chip--sm bg-bg/60 text-white/85 backdrop-blur-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </Halftone>

                <div className="hidden flex-col justify-end gap-5 lg:flex">
                  <p className="max-w-[40ch] text-[17px] leading-[1.5] text-ink-soft">{pillar.blurb}</p>
                  <ul className="m-0 hidden list-none space-y-1.5 p-0 [@media(min-height:880px)]:block">
                    {pillar.services.map((s) => (
                      <li key={s.id} className="flex items-baseline justify-between gap-4 border-t border-line pt-1.5 text-[14.5px]">
                        <span className="text-white/85">{s.name}</span>
                        <span className="shrink-0 text-ink-mute">{s.timeline.split(',')[0]}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="#contact" className="w-full">
                    Discuss {pillar.short}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
