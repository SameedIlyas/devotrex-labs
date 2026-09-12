import { Route } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgBadge, AgButton, AgDots, AgEyebrow, AgFrame, AgSection } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { processSteps } from '../data/company';

/* ── how we work ──────────────────────────────────────────────────
   The catalogue's first-contact → pilot → ongoing → pod journey, told
   from the partner's side of the table. Same layout as the main site's
   engagement block: sticky heading left, two-up numbered cards right. */

export function Process() {
  return (
    <AgSection id="process" field="a">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <MotionReveal>
            <AgEyebrow icon={<Route />}>How we work</AgEyebrow>
          </MotionReveal>
          <h2 className="ag-h2 mt-6 max-w-[14ch]">
            <AgWords text="Start small. Prove it. Then scale." />
          </h2>
          <MotionReveal delay={0.15}>
            <p className="ag-lede mt-5 max-w-[42ch]">
              Nobody should hand a new partner a whole client account on day one. Every relationship
              starts with one small, real deliverable, and grows only once it has earned trust.
            </p>
            <div className="mt-8">
              <AgButton href="#contact" arrow>
                Start with a pilot
              </AgButton>
            </div>
          </MotionReveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {processSteps.map((s, i) => (
            <MotionReveal key={s.n} delay={(i % 2) * 0.08} className="h-full">
              <AgFrame className="h-full">
                <div className="flex items-center justify-between">
                  <AgBadge className="ag-badge--num">{s.n}</AgBadge>
                  <AgDots />
                </div>
                <hr className="ag-dotted my-6" />
                <p className="ag-label">{s.kicker}</p>
                <h3 className="mt-2 text-[19px] font-medium tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
              </AgFrame>
            </MotionReveal>
          ))}
        </div>
      </div>
    </AgSection>
  );
}
