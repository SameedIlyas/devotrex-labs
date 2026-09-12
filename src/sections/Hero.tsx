import { motion, useReducedMotion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgButton, AgEyebrow } from '../components/agencee/primitives';
import { engagementModels } from '../data/company';
import { pillars, serviceCount } from '../data/services';

/* ── hero ──────────────────────────────────────────────────────────
   The main site's hero device: a centred column on the animated mesh
   with a dot matrix, light display type, and the final phrase in the
   frosted pill. Where devotrex.com runs a platform-logo row under the
   CTAs, Labs runs the catalogue's own numbers. */

const EASE = [0.16, 1, 0.3, 1] as const;

const facts = [
  { n: String(pillars.length), l: 'service pillars' },
  { n: String(serviceCount), l: 'defined services' },
  { n: String(engagementModels.length), l: 'ways to engage' },
  { n: '1–2 wk', l: 'first engagements' },
] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative isolate -mt-[72px] overflow-hidden bg-paper">
      <div className="ag-mesh" aria-hidden>
        <div className="ag-mesh__blob" />
        <div className="ag-mesh__dots" />
      </div>

      <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-5 pt-40 pb-24 text-center md:px-10 md:pt-48 md:pb-32">
        <motion.div {...rise(0)}>
          <AgEyebrow icon={<FlaskConical />}>
            {/* One text node for the flex item: split across two items, the
                eyebrow's 7px flex gap doubled the space after the dot. */}
            <span>
              <span className="hidden sm:inline">Devotrex Labs · </span>White-label engineering
            </span>
          </AgEyebrow>
        </motion.div>

        {/* 8.4vw below the cap so the pill phrase always fits on one line:
            a 38px floor wrapped "under your brand" inside its pill at 320px. */}
        <h1 className="ag-display mt-8 text-[clamp(1.9rem,8.4vw,4.6rem)]">
          <AgWords
            text="The engineering team behind your delivery,"
            highlight={<span className="ag-glass whitespace-nowrap">under your brand</span>}
            delay={0.15}
          />
        </h1>

        <motion.p className="ag-lede mt-7 max-w-[58ch] text-[17px]" {...rise(0.5)}>
          AI, automation, full-stack and legacy-systems engineering for boutique consultancies and
          agencies. Scoped small to start, delivered white-label, and built to the standard your
          clients already expect from you.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-3" {...rise(0.62)}>
          <AgButton variant="light" href="#services">
            Explore services
          </AgButton>
          <AgButton href="#contact" arrow>
            Scope a project
          </AgButton>
        </motion.div>

        <motion.ul
          className="mt-16 grid w-full max-w-[760px] grid-cols-2 gap-3 p-0 sm:grid-cols-4"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.8, delay: 0.8 },
              })}
        >
          {facts.map((f) => (
            <li
              key={f.l}
              className="list-none rounded-2xl border border-white/60 bg-white/50 px-4 py-3.5 backdrop-blur-sm"
            >
              <div className="text-[24px] leading-none font-light tracking-[-0.03em] text-ink">{f.n}</div>
              <div className="mt-1.5 text-[12px] font-medium text-ink-soft">{f.l}</div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
