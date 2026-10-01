import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Layers3, Rocket, Receipt, Workflow, X } from 'lucide-react';
import { Halftone } from '../components/Halftone';
import { Appear, EASE } from '../components/motion';
import { SectionHead } from '../components/ui';

/* ── compare ──────────────────────────────────────────────────────
   Two cards joined at a "VS" badge: the left lit in halftone blue
   with what working with us looks like, the right flat with the usual
   alternative. Every line restates something the catalogue, process
   or FAQ already says; nothing here is a new claim. Lines arrive one
   after another, the badge pops in once both cards are up. */

const WITH = [
  { icon: Layers3, text: 'AI, full-stack and legacy under one roof' },
  { icon: BadgeCheck, text: 'Shipped under your brand' },
  { icon: Rocket, text: 'Start with a 1–2 week audit or pilot' },
  { icon: Workflow, text: 'Joins your sprint cadence and tools' },
  { icon: Receipt, text: 'Fixed scopes paid by milestone' },
] as const;

const WITHOUT = [
  'A separate vendor for every stack',
  'An outside name in front of your client',
  'Long commitments before any deliverable',
  'Weeks of scoping before work starts',
  'Open-ended hours that creep up',
] as const;

export function Compare() {
  const reduced = useReducedMotion();
  const line = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x: -12, filter: 'blur(6px)' },
          whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
          viewport: { once: true, margin: '0px 0px -10% 0px' },
          transition: { duration: 0.7, ease: EASE, delay: 0.25 + i * 0.08 },
        };

  return (
    <section id="compare" className="section">
      <div className="wrap">
        <SectionHead title="What makes a partner actually different." />

        <Appear y={40} className="relative mx-auto mt-16 max-w-[1140px] md:mt-24">
          <div className="card grid gap-2 p-2 md:grid-cols-2">
            <Halftone preset="tide" className="rounded-[16px]">
              <div className="p-7 md:p-10">
                <h3 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.025em]">With Devotrex</h3>
                <ul className="m-0 mt-12 list-none space-y-5 p-0 md:mt-20">
                  {WITH.map(({ icon: Icon, text }, i) => (
                    <motion.li key={text} className="flex items-center gap-3.5 text-[17px] font-medium tracking-[-0.02em] text-white" {...line(i)}>
                      <Icon size={20} strokeWidth={1.8} className="shrink-0 text-blue-pale" aria-hidden />
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Halftone>

            <div className="p-7 md:p-10">
              <h3 className="text-[clamp(1.8rem,3vw,2.4rem)] tracking-[-0.025em] text-white/90">Without Devotrex</h3>
              <ul className="m-0 mt-12 list-none space-y-5 p-0 md:mt-20">
                {WITHOUT.map((text, i) => (
                  <motion.li key={text} className="flex items-center gap-3.5 text-[17px] tracking-[-0.02em] text-ink-soft" {...line(i)}>
                    <X size={20} strokeWidth={1.6} className="shrink-0 text-ink-mute" aria-hidden />
                    {text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <motion.span
            className="absolute top-1/2 left-1/2 hidden h-12 w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[10px] bg-white text-[18px] font-semibold text-bg shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] md:grid"
            initial={reduced ? false : { scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.5 }}
            aria-hidden
          >
            VS
          </motion.span>
        </Appear>
      </div>
    </section>
  );
}
