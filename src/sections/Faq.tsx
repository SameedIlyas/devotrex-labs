import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { Appear } from '../components/motion';
import { ArrowLink, SectionHeader } from '../components/ui';
import { CONTACT_MAILTO } from '../lib/links';

/* ── 008 · FAQs ───────────────────────────────────────────────────
   Numbered capsules; the round dark button turns its plus into a
   cross while the answer opens under the question. Answers restate
   what the catalogue already says; no new claims. */

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
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section">
      <div className="wrap-narrow">
        <SectionHeader title="Common Questions" />

        <div className="mt-16 space-y-2.5 md:mt-20">
          {faqs.map((f, i) => (
            <Appear key={f.q} delay={i * 0.1}>
              <FaqItem n={i + 1} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Appear>
          ))}
        </div>

        <Appear delay={0.2} className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[17px] text-ink-soft">Have any other questions?</p>
          <ArrowLink href={CONTACT_MAILTO}>Contact us</ArrowLink>
        </Appear>
      </div>
    </section>
  );
}

interface FaqItemProps {
  n: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}

function FaqItem({ n, q, a, open, onToggle }: FaqItemProps) {
  const id = useId();
  return (
    <div className="card rounded-[32px] md:rounded-[40px]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-4 p-4 text-left md:gap-5 md:p-6"
      >
        <span className="chip h-8 min-w-8 text-[14px]">{n}</span>
        <span className="flex-1 text-[17px] font-medium tracking-[-0.025em] text-ink md:text-[20px]">{q}</span>
        <motion.span
          className="tile-dark grid h-12 w-12 shrink-0 place-items-center rounded-full"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          aria-hidden
        >
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            className="overflow-hidden"
          >
            <p className="max-w-[62ch] px-4 pb-7 pl-16 text-[16px] leading-[1.5] md:px-6 md:pl-[76px]">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
