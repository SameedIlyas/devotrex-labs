import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Appear } from '../components/motion';
import { ArrowLink, Button, SectionHeader } from '../components/ui';
import { pillars } from '../data/services';
import { CONTACT_MAILTO } from '../lib/links';
import { ServiceScreen } from './catalogue/screens';

/* ── catalogue ────────────────────────────────────────────────────
   Every service as one slide: a dark lit tile playing a product-style
   mock for its pillar on the left; pillar, name, summary, the
   client-facing "why" and three facts on the right. Pillar tabs jump
   between groups, round arrows page one service at a time, and a
   sheen line under the card tracks progress. */

/* "8–12 weeks for an MVP" → "8–12 weeks"; "Ongoing, sprint cadence" → "Ongoing". */
function shortTimeline(t: string): string {
  return t.match(/^[\d–-]+\s*weeks?/)?.[0] ?? t.split(',')[0];
}

const slides = pillars.flatMap((p) => p.services.map((s) => ({ ...s, pillar: p })));

export function Catalogue() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const reduced = useReducedMotion();
  const go = (step: number) =>
    setState(([i]) => [(i + step + slides.length) % slides.length, step]);

  const jump = (target: number) => setState(([i]) => [target, target >= i ? 1 : -1]);
  const firstOf = (pillarId: string) => slides.findIndex((x) => x.pillar.id === pillarId);

  const s = slides[index];
  const Icon = s.icon;
  const facts = [
    { n: shortTimeline(s.timeline), l: 'Typical timeline' },
    { n: s.pillar.index, l: s.pillar.short },
    { n: String(s.stack.length), l: s.stack.length === 1 ? 'Stack fit' : 'Core tools' },
  ];

  return (
    <section id="catalogue" className="section">
      <div className="wrap-wide">
        <SectionHeader title="What We Build" />

        <Appear delay={0.1} className="mt-12 flex justify-center">
          <div role="tablist" aria-label="Service pillars" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-paper-deep p-1">
            {pillars.map((p) => {
              const on = p.id === s.pillar.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => jump(firstOf(p.id))}
                  className={`relative shrink-0 rounded-full px-4 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors ${on ? 'text-white' : 'text-ink-soft hover:text-ink'}`}
                >
                  {on ? (
                    <motion.span
                      layoutId="pillar-tab"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <span className="relative flex items-center gap-2">
                    <p.icon size={15} aria-hidden />
                    {p.short}
                  </span>
                </button>
              );
            })}
          </div>
        </Appear>

        <Appear delay={0.2} y={50} className="relative mx-auto mt-8 max-w-[1040px]">
          <div className="card overflow-hidden p-3">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={s.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 320, damping: 36 }}
                className="grid gap-6 md:grid-cols-[0.8fr_1fr] md:gap-10"
              >
                <div className="tile-dark tile-dark--dots relative flex min-h-[440px] flex-col overflow-hidden rounded-[28px] p-5 md:min-h-[540px] md:rounded-[48px] md:p-7">
                  <span className="tile-glow" aria-hidden />
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="orb relative h-12 w-12">
                      <span className="orb-ring" aria-hidden />
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <span className="text-[13px] font-medium text-white/60 tabular-nums">
                      {String(index + 1).padStart(2, '0')} / {slides.length}
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-1 items-center justify-center py-6">
                    <ServiceScreen pillarId={s.pillar.id} service={s} />
                  </div>
                  <p className="relative z-10 rounded-[16px] border border-white/10 bg-white/[0.06] px-4 py-3 text-[13px] leading-snug text-white/75">
                    <span className="font-semibold text-white">Best for: </span>
                    {s.bestFor}
                  </p>
                </div>

                <div className="flex flex-col px-4 pb-8 md:px-0 md:py-10 md:pr-10">
                  <span className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink">
                    <s.pillar.icon size={20} aria-hidden />
                    {s.pillar.short}
                  </span>
                  <h3 className="mt-7 text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.1] tracking-[-0.04em]">{s.name}</h3>
                  <p className="mt-4 text-[16px] leading-[1.45]">{s.summary}</p>
                  <p className="mt-4 border-l-2 border-sheen-1 pl-4 text-[15px] leading-[1.45] text-ink/80">{s.why}</p>
                  <div className="mt-6">
                    <ArrowLink href={CONTACT_MAILTO}>Discuss this service</ArrowLink>
                  </div>

                  <dl className="mt-auto flex flex-wrap gap-x-10 gap-y-5 pt-10">
                    {facts.map((f) => (
                      <div key={f.l} className="flex flex-col-reverse">
                        <dt className="mt-1 text-[13.5px] text-ink-soft">{f.l}</dt>
                        <dd className="m-0 whitespace-nowrap text-[clamp(1.4rem,2.6vw,2rem)] leading-none font-medium tracking-[-0.04em] text-ink">
                          {f.n}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mx-auto mt-6 h-[3px] max-w-[1040px] overflow-hidden rounded-full bg-rule" aria-hidden>
            <motion.div
              className="sheen-bg h-full rounded-full"
              animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 32 }}
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 lg:mt-0">
            <SlideButton side="left" onClick={() => go(-1)} />
            <span className="w-16 text-center text-[14px] font-medium text-ink-soft tabular-nums lg:hidden">
              {String(index + 1).padStart(2, '0')} / {slides.length}
            </span>
            <SlideButton side="right" onClick={() => go(1)} />
          </div>
        </Appear>

        <Appear delay={0.3} className="mt-14 flex justify-center">
          <Button href="#contact" arrow>
            Scope a project
          </Button>
        </Appear>
      </div>
    </section>
  );
}

function SlideButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Chevron = side === 'left' ? ChevronLeft : ChevronRight;
  const pos = side === 'left' ? 'lg:-left-[64px]' : 'lg:-right-[64px]';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous service' : 'Next service'}
      className={`grid h-12 w-12 place-items-center rounded-full bg-navy-deep text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95 lg:absolute lg:top-1/2 lg:-translate-y-1/2 ${pos}`}
    >
      <Chevron size={20} />
    </button>
  );
}
