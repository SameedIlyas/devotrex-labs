import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { DotWave } from '../components/DotWave';
import { EASE, LettersBlurIn, Marquee } from '../components/motion';
import { Button } from '../components/ui';
import { stack } from '../data/company';

/* ── hero ──────────────────────────────────────────────────────────
   The name, set huge in the serif, its letters de-blurring in one by
   one; a lede and two actions under it; the blue dot landscape
   rolling across the lower half; and the tools we build with running
   along the bottom edge. Scrolling away sinks the copy and fades it. */

const tools = stack.flatMap((g) => g.tools);

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { delay, duration: 1, ease: EASE },
        };

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div
        className="fade-top absolute inset-x-0 bottom-0 -z-10 h-[58%]"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 2.2, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_100%,rgba(53,84,143,0.4),transparent_70%)]" />
        <DotWave className="relative" />
      </motion.div>

      <motion.div
        className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center px-4 pt-[clamp(130px,18vh,200px)] text-center"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <h1 className="text-[clamp(4.6rem,15vw,11.5rem)] leading-[0.9] tracking-[-0.045em]">
          <LettersBlurIn text="Devotrex" />
        </h1>

        <motion.p className="mt-8 max-w-[660px] text-[clamp(17px,1.5vw,20px)] leading-[1.45] text-ink-soft" {...enter(0.9)}>
          The engineering team behind your delivery. AI, automation, full-stack and legacy-systems
          work for boutique consultancies and agencies, shipped under your brand.
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-3" {...enter(1.1)}>
          <Button href="#contact">Scope a project</Button>
          <Button href="#process" variant="dark" arrow>
            How we work
          </Button>
        </motion.div>
      </motion.div>

      <motion.div className="relative mx-auto w-full max-w-[1240px] px-4 pt-16 pb-10" {...enter(1.5)}>
        <p className="mb-5 text-center text-[14px] font-medium text-ink-mute">Tools we build with</p>
        <Marquee speed={45} gap={64} className="fade-x">
          {tools.map((t) => (
            <span key={t} className="text-[19px] font-medium tracking-[-0.03em] whitespace-nowrap text-white/70">
              {t}
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
