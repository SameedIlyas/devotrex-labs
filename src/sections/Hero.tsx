import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Marquee, SPRING, TWEEN_EASE, WordsBlurIn } from '../components/motion';
import { Button } from '../components/ui';
import { stack } from '../data/company';

/* ── hero ──────────────────────────────────────────────────────────
   Centred column on a drifting navy field: a two-line
   sheen headline whose words de-blur in, lede, two CTAs, and a
   running strip of the tools we build with. Entrance order and
   timings follow the template: words from 0.5s, lede
   0.6s, CTAs 0.8s, strip 1.5s. */

const tools = stack.flatMap((g) => g.tools);

export function Hero() {
  const reduced = useReducedMotion();
  const enter = (delay: number, y: number, tween = false) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: tween ? { delay, duration: 1, ease: TWEEN_EASE } : { ...SPRING, delay },
        };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="hero-field" aria-hidden>
        <div className="hero-field__glow hero-field__glow--a" />
        <div className="hero-field__glow hero-field__glow--b" />
      </div>

      <div data-nav-theme="dark" className="mx-auto flex min-h-[100svh] max-w-[1100px] flex-col items-center justify-center px-4 pt-36 pb-20 text-center md:pt-44">
        <h1 className="text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.98] font-medium tracking-[-0.06em]">
          <WordsBlurIn text="The engineering team behind your delivery" wordClassName="sheen-text pb-[0.08em]" />
        </h1>

        <motion.p className="mt-7 max-w-[600px] text-[17px] leading-[1.45] text-white/85 md:text-[18px]" {...enter(0.6, 20)}>
          AI, automation, full-stack and legacy-systems engineering for boutique consultancies and
          agencies, delivered under your brand.
        </motion.p>

        <motion.div className="mt-12 flex flex-wrap items-center justify-center gap-3" {...enter(0.8, 20)}>
          <Button href="#contact" arrow>
            Scope a project
          </Button>
          <Button
            href="#services"
            variant="glass"
            leading={
              <span className="flex -space-x-2" aria-hidden>
                <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border-2 border-white/60 bg-navy">
                  <img src="/devotrex-logo-2026.png" alt="" className="h-full w-full scale-[1.9] object-cover" />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/60 bg-accent text-white">
                  <Sparkles size={15} />
                </span>
              </span>
            }
          >
            Explore services
          </Button>
        </motion.div>
      </div>

      <motion.div className="relative -mt-4 pb-40" {...enter(1.5, 40)}>
        <Marquee speed={100} gap={72} className="fade-x mx-auto max-w-[1440px]">
          {tools.map((t) => (
            <span key={t} className="text-[22px] font-semibold tracking-[-0.04em] whitespace-nowrap text-white/80">
              {t}
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
