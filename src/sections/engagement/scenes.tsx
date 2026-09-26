import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useTicker } from '../../components/useTicker';

/* ── engagement scenes ────────────────────────────────────────────
   One looping scene per engagement model, drawn on a dark panel at
   the top of each card. Decorative (aria-hidden); reduced motion
   holds the completed frame. */

const spring = { type: 'spring', stiffness: 380, damping: 24 } as const;
const glass = 'border border-white/12 bg-white/[0.07]';

/* Dedicated pod: the team assembles inside your workflow. */
const POD = [
  { r: 'Dev', c: '#9DB1E0' },
  { r: 'Dev', c: '#6F8CCB' },
  { r: 'QA', c: '#D6DFF3' },
  { r: 'PM', c: '#FFFFFF' },
];

export function PodScene() {
  const step = useTicker(POD.length + 2, 750, POD.length + 1);
  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-3" aria-hidden>
      <div className="flex items-center">
        {POD.map((m, i) => (
          <motion.span
            key={i}
            className="-ml-2 grid h-12 w-12 place-items-center rounded-full border-2 border-navy text-[12px] font-semibold text-navy first:ml-0"
            style={{ background: m.c }}
            animate={{ scale: step > i ? 1 : 0.4, opacity: step > i ? 1 : 0.15, y: step > i ? 0 : 8 }}
            transition={spring}
          >
            {m.r}
          </motion.span>
        ))}
      </div>
      <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] text-white/80 ${glass}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${step > POD.length ? 'bg-sheen-1' : 'bg-white/30'}`} />
        {step > POD.length ? 'Pod embedded in your workflow' : `Assembling · ${Math.min(step, POD.length)}/${POD.length}`}
      </div>
    </div>
  );
}

/* Staff augmentation: one engineer joins your board and moves work. */
const COLS = ['To do', 'Doing', 'Done'];

export function AugScene() {
  const step = useTicker(4, 1000, 3); /* 0 board · 1 joins · 2 picks up · 3 ships */
  const cardCol = step >= 3 ? 2 : step >= 2 ? 1 : 0;
  return (
    <div className="relative z-10 grid w-full max-w-[280px] grid-cols-3 gap-1.5" aria-hidden>
      {COLS.map((c, ci) => (
        <div key={c} className={`flex min-h-[112px] flex-col gap-1.5 rounded-[12px] p-1.5 ${glass}`}>
          <span className="px-1 text-[10px] font-medium text-white/50">{c}</span>
          <span className="h-5 rounded-[6px] bg-white/10" />
          {cardCol === ci ? (
            <motion.span
              layoutId="aug-card"
              className="flex h-7 items-center gap-1 rounded-[7px] bg-white px-1.5 text-[10px] font-medium text-ink"
              transition={spring}
            >
              {step >= 1 ? <span className="sheen-bg h-3.5 w-3.5 shrink-0 rounded-full" /> : null}
              {ci === 2 ? <Check size={11} className="text-accent" strokeWidth={3} /> : 'Task'}
            </motion.span>
          ) : null}
        </div>
      ))}
      <AnimatePresence>
        {step === 1 ? (
          <motion.span
            className="sheen-bg absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-navy shadow-lg"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={spring}
          >
            <Plus size={11} strokeWidth={3} />1 engineer
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* Fixed-price: milestones complete in order along a track. */
const MILESTONES = ['Scope', 'Build', 'QA', 'Launch'];

export function MilestoneScene() {
  const step = useTicker(MILESTONES.length + 1, 800, MILESTONES.length);
  return (
    <div className="relative z-10 w-full max-w-[280px] px-2" aria-hidden>
      <div className="relative flex justify-between">
        <span className="absolute top-[15px] right-4 left-4 h-[2px] bg-white/15" />
        <motion.span
          className="sheen-bg absolute top-[15px] left-4 h-[2px]"
          animate={{ width: `calc(${(Math.max(step - 1, 0) / (MILESTONES.length - 1)) * 100}% - ${step > 1 ? 32 * (Math.max(step - 1, 0) / (MILESTONES.length - 1)) : 0}px)` }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        />
        {MILESTONES.map((m, i) => {
          const done = step > i;
          return (
            <div key={m} className="relative flex w-8 flex-col items-center">
              <motion.span
                className="grid h-8 w-8 place-items-center rounded-full border-2"
                animate={{
                  backgroundColor: done ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
                  borderColor: done ? '#9DB1E0' : 'rgba(255,255,255,0.2)',
                  scale: step === i + 1 ? 1.15 : 1,
                }}
                transition={spring}
              >
                {done ? <Check size={14} className="text-accent" strokeWidth={3} /> : null}
              </motion.span>
              <span className={`mt-2 text-[11px] font-medium whitespace-nowrap ${done ? 'text-white' : 'text-white/45'}`}>{m}</span>
              <span className={`text-[10px] whitespace-nowrap ${done ? 'text-sheen-1' : 'text-transparent'}`}>paid</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
