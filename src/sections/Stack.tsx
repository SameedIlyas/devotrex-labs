import { Layers } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgBadge, AgEyebrow, AgFrame, AgSection } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { stack } from '../data/company';

/* ── tech stack ───────────────────────────────────────────────────
   The catalogue's stack reference, grouped the same six ways. */

export function Stack() {
  return (
    <AgSection id="stack" field="b">
      <div className="text-center">
        <MotionReveal className="flex justify-center">
          <AgEyebrow icon={<Layers />}>Tech stack</AgEyebrow>
        </MotionReveal>
        <h2 className="ag-h2 mx-auto mt-6 max-w-[18ch] text-balance">
          <AgWords text="What we build with." />
        </h2>
        <MotionReveal delay={0.15}>
          <p className="ag-lede mx-auto mt-4 max-w-[54ch]">
            Our defaults when we are starting fresh. On feature work and audits, we work in whatever
            your client already runs.
          </p>
        </MotionReveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((g, i) => {
          const Icon = g.icon;
          return (
            <MotionReveal key={g.name} delay={Math.min((i % 3) * 0.06, 0.12)} className="h-full">
              <AgFrame className="h-full">
                <div className="flex items-center gap-3">
                  <AgBadge size="sm">
                    <Icon size={17} strokeWidth={1.7} aria-hidden />
                  </AgBadge>
                  <h3 className="text-[17px] font-medium tracking-tight text-ink">{g.name}</h3>
                </div>
                <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0">
                  {g.tools.map((t) => (
                    <li key={t} className="ag-chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </AgFrame>
            </MotionReveal>
          );
        })}
      </div>
    </AgSection>
  );
}
