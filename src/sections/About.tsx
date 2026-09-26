import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Marquee, ScrollReveal } from '../components/motion';
import { engagementModels } from '../data/company';
import { pillars, serviceCount } from '../data/services';

/* ── who we are ─────────────────────────────────────────────
   A statement that lights up character by character as it scrolls
   through the viewport, then a navy showcase panel that tilts up from
   60° and scales from 0.8 while it enters. Behind the panel, oversized
   figures from the catalogue run past in a marquee. */

const STATEMENT =
  'We are the engineering arm behind boutique consultancies and agencies, building AI, automation, full-stack and legacy systems that ship under your brand, on your timeline.';

const figures = [
  { n: `${pillars.length}`, label: 'service pillars' },
  { n: `${serviceCount}`, label: 'defined services' },
  { n: `${engagementModels.length}`, label: 'ways to engage' },
  { n: '1–2 wk', label: 'first engagements' },
];

const chips = ['White-label delivery', 'Start with a pilot', 'Milestone-based projects'];

export function About() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: panelRef, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <section id="about" className="section relative overflow-hidden pt-8">
      <div className="wrap-narrow flex flex-col items-center text-center">
        <ScrollReveal
          text={STATEMENT}
          className="max-w-[880px] text-[clamp(1.75rem,3.8vw,3rem)] leading-[1.12] font-medium tracking-[-0.045em]"
        />
      </div>

      <div className="relative mt-24 md:mt-32">
        <Marquee speed={90} gap={80} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          {figures.map((f) => (
            <span
              key={f.label}
              className="flex items-baseline gap-5 text-[clamp(4rem,9vw,7.2rem)] leading-none font-semibold tracking-[-0.08em] whitespace-nowrap uppercase"
            >
              <span className="text-ink">{f.n}</span>
              <span className="bg-gradient-to-r from-ink-faint to-rule bg-clip-text text-transparent">{f.label}</span>
            </span>
          ))}
        </Marquee>

        <div className="relative mx-auto w-full max-w-[600px] px-4 [perspective:1200px]">
          <motion.div
            ref={panelRef}
            style={reduced ? undefined : { rotateX, scale, transformOrigin: 'center bottom' }}
            className="tile-dark tile-dark--dots relative aspect-[6/5] overflow-hidden rounded-[56px] md:rounded-[80px]"
          >
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 p-8">
              <span className="orb h-24 w-24">
                <Sparkles size={34} strokeWidth={1.6} />
              </span>
              <p className="max-w-[26ch] text-center text-[20px] leading-snug font-medium tracking-[-0.03em] text-white">
                Your name on the work. Our engineers behind it.
              </p>
              <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
                {chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/85"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
