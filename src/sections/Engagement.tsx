import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import { useRef } from 'react';
import { JoinArt, MilestonesArt, OrbitArt } from '../components/art/LineArt';
import { Halftone } from '../components/Halftone';
import type { HalftonePreset } from '../components/Halftone';
import { Appear, RollingNumber, WordsIn } from '../components/motion';
import { Button } from '../components/ui';
import { engagementModels } from '../data/company';
import type { EngagementModel } from '../data/company';
import { CONTACT_MAILTO } from '../lib/links';

/* ── engagement ───────────────────────────────────────────────────
   The template's stacked case-study cards, carrying the three ways to
   work with us. Each card pins under the navbar; the next slides up
   over it while the one beneath shrinks back and dims, so the stack
   reads as a deck. A blurred wash of the card's light fills the frame
   and a sharp inner panel carries the model. Where a case study would
   show a result, each model shows its shape. No prices, by design. */

const SHAPE: Record<string, { big: string; unit: string; points: readonly string[] }> = {
  'Dedicated Pod': {
    big: '2–4',
    unit: 'people per pod',
    points: ['Developer, QA and PM as needed', 'Embedded in your workflow', 'Full or part time'],
  },
  'Staff Augmentation': {
    big: '1',
    unit: 'engineer, on your project',
    points: ['Placed on one active client project', 'Works in your tools', 'Follows your process'],
  },
  'Fixed-Price White-Label': {
    big: 'Fixed',
    unit: 'scope, paid by milestone',
    points: ['Scoped project, delivered end to end', 'Shipped under your brand', 'Paid against milestones, not hours'],
  },
};

const ART: readonly HalftonePreset[] = ['dawn', 'tide', 'ember'];
/* a pod orbiting one core, one engineer joining the grid, milestones */
const SCENES = [OrbitArt, JoinArt, MilestonesArt] as const;

export function Engagement() {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ['start start', 'end end'] });
  const total = engagementModels.length;

  return (
    <section id="engagement" className="section">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="h-display max-w-[14ch]">
              <WordsIn text="Three ways to work with us." />
            </h2>
          </div>
          <Appear delay={0.3}>
            <Button href={CONTACT_MAILTO}>Discuss a model</Button>
          </Appear>
        </div>

        <div ref={deckRef} className="mt-14 md:mt-20">
          {engagementModels.map((m, i) => (
            <DeckCard key={m.name} model={m} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface DeckCardProps {
  model: EngagementModel;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function DeckCard({ model, index, total, progress }: DeckCardProps) {
  const reduced = useReducedMotion();
  const shape = SHAPE[model.name];
  const art = ART[index % ART.length];
  const Scene = SCENES[index % SCENES.length];
  /* Once the deck has scrolled past this card's slot, push it back. */
  const from = index / total;
  const scale = useTransform(progress, [from, 1], [1, 1 - (total - index - 1) * 0.05]);
  const dim = useTransform(progress, [from, 1], [0, (total - index - 1) * 0.22]);
  const n = String(index + 1).padStart(2, '0');

  return (
    <div className="sticky top-[96px] pb-8 md:top-[110px]" style={{ zIndex: index }}>
      <motion.article
        className="relative origin-top overflow-hidden rounded-[20px]"
        style={reduced ? undefined : { scale }}
      >
        <div className="absolute inset-0 scale-110 blur-2xl" aria-hidden>
          <Halftone preset={art} shade={false} className="h-full" />
        </div>
        <div className="relative grid grid-cols-1 items-stretch gap-4 p-3 md:grid-cols-[110px_1fr_110px] md:p-6 lg:grid-cols-[180px_1fr_180px]">
          <span className="hidden self-center text-center font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none text-white md:block">
            {n}
          </span>

          <Halftone preset={art} className="rounded-[14px] md:min-h-[540px]">
            <div
              className="absolute inset-y-0 right-0 w-full opacity-60 md:w-[62%] md:opacity-100 [mask-image:linear-gradient(90deg,transparent,#000_35%)]"
              aria-hidden
            >
              <Scene />
            </div>
            <div className="relative flex h-full flex-col justify-between gap-10 p-6 md:min-h-[540px] md:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/12 backdrop-blur-md">
                    <model.icon size={18} aria-hidden />
                  </span>
                  <span className="chip chip--sm bg-bg/40 text-white/80 backdrop-blur-md">Best for: {model.fit}</span>
                </div>
                <h3 className="mt-6 text-[clamp(2.2rem,4vw,3.4rem)] tracking-[-0.03em]">{model.name}</h3>
                <p className="mt-3 max-w-[46ch] text-[16.5px] leading-[1.5] text-white/75">{model.body}</p>
              </div>

              <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                <ul className="m-0 list-none space-y-2 p-0">
                  {shape.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[15px] text-white/80">
                      <Check size={15} className="text-blue-soft" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="sm:text-right">
                  <div className="font-serif text-[clamp(3.6rem,7vw,5.5rem)] leading-none tracking-[-0.04em]">
                    <RollingNumber value={shape.big} />
                  </div>
                  <div className="mt-2 text-[16px] text-white/70">{shape.unit}</div>
                </div>
              </div>
            </div>
          </Halftone>

          <span className="hidden self-center text-center font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none text-white/45 md:block">
            {String(total).padStart(2, '0')}
          </span>
        </div>
        {reduced ? null : (
          <motion.span className="pointer-events-none absolute inset-0 bg-bg" style={{ opacity: dim }} aria-hidden />
        )}
      </motion.article>
    </div>
  );
}
