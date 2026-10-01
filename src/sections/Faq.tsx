import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { Halftone } from '../components/Halftone';
import { Appear, EASE } from '../components/motion';
import { Button, SectionHead } from '../components/ui';
import { CONTACT_MAILTO } from '../lib/links';

/* ── FAQ ──────────────────────────────────────────────────────────
   Question cards that open on hover: resting the pointer on a card
   unfolds its answer, moving off folds it away. Only the hovered card
   is open, and answers unfold downward, so the card under the pointer
   never moves. Touch screens have no hover, so a tap toggles instead,
   and keyboard focus opens a card the same way the pointer does.
   Answers restate what the catalogue already says; no new claims. */

const faqs = [
  {
    q: 'Will our client know you’re involved?',
    a: 'Only if you want them to. We work in your repo, your tools and your process. Your client sees your team, and the work carries your name.',
  },
  {
    q: 'What’s the smallest way to start?',
    a: 'A codebase audit, one automated workflow or a one-week pilot. You get a real deliverable before committing to anything ongoing.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'It depends on the service: a technical audit runs 1–2 weeks, AI and automation builds 1–8 weeks, a SaaS MVP 6–10 weeks and a vertical platform 6–14 weeks.',
  },
  {
    q: 'Can you work on an existing codebase?',
    a: 'Yes. For ongoing feature work we join your sprint cadence in your existing stack, with no lengthy scoping exercise. For a codebase you are about to take over, start with an audit.',
  },
  {
    q: 'How are engagements billed?',
    a: 'Pods and staff augmentation run on your sprint cadence. Fixed-price white-label projects are scoped up front and paid against milestones rather than hours.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section">
      <div className="wrap-narrow">
        <SectionHead title="Answers to what you’re wondering about." />

        <div className="mt-14 space-y-3 md:mt-20">
          {faqs.map((f, i) => (
            <Appear key={f.q} delay={i * 0.08} y={20}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={open === i}
                onOpen={() => setOpen(i)}
                onClose={() => setOpen((o) => (o === i ? null : o))}
              />
            </Appear>
          ))}
        </div>

        <Appear delay={0.15} y={30} className="mt-8">
          <Halftone preset="ember" className="rounded-[16px]">
            <div className="flex flex-col items-start justify-between gap-6 p-7 md:flex-row md:items-center md:p-9">
              <div>
                <h3 className="text-[clamp(1.7rem,2.8vw,2.2rem)] tracking-[-0.025em]">Still have a question?</h3>
                <p className="mt-2 max-w-[42ch] text-[16px] text-white/75">
                  Send it over. You will hear back from the people who would do the work.
                </p>
              </div>
              <Button href={CONTACT_MAILTO}>Email us</Button>
            </div>
          </Halftone>
        </Appear>
      </div>
    </section>
  );
}

interface FaqItemProps {
  q: string;
  a: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function FaqItem({ q, a, open, onOpen, onClose }: FaqItemProps) {
  const id = useId();
  /* The pointer type of the last press, so a tap toggles while a mouse
     click on an already hover-opened card does not snap it shut. */
  const pressedWith = useRef<string>('mouse');
  const isMouse = (e: PointerEvent) => e.pointerType === 'mouse';

  return (
    <div
      className={`rounded-[16px] transition-colors duration-500 ${open ? 'bg-surface-2' : 'bg-surface'}`}
      onPointerEnter={(e) => isMouse(e) && onOpen()}
      onPointerLeave={(e) => isMouse(e) && onClose()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onPointerDown={(e) => {
          pressedWith.current = e.pointerType;
        }}
        onClick={() => {
          if (pressedWith.current === 'mouse') onOpen();
          else if (open) onClose();
          else onOpen();
        }}
        onFocus={(e) => e.currentTarget.matches(':focus-visible') && onOpen()}
        onBlur={onClose}
        className="flex w-full items-center gap-5 px-6 py-6 text-left md:px-8 md:py-7"
      >
        <span className="flex-1 text-[17px] font-medium tracking-[-0.025em] text-white md:text-[19px]">{q}</span>
        <motion.span
          className="grid h-8 w-8 shrink-0 place-items-center text-white"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          aria-hidden
        >
          <Plus size={24} strokeWidth={1.6} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              className="max-w-[64ch] px-6 pb-7 text-[16px] leading-[1.55] md:px-8"
              initial={{ y: -6, filter: 'blur(6px)' }}
              animate={{ y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {a}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
