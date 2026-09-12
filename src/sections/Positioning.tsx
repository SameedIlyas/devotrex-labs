import { Compass } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgBadge, AgDots, AgEyebrow, AgFrame, AgSection } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { positioning } from '../data/company';

/* ── positioning ──────────────────────────────────────────────────
   The public form of the catalogue's "where we sit" statement: AI
   depth, plus the engineering range AI specialists lack, delivered with
   boutique white-label discipline. Laid out as the main site's
   numbered-gate cards (glow numeral, dotted rule, body). */

export function Positioning() {
  return (
    <AgSection id="why" field="b">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <MotionReveal>
            <AgEyebrow icon={<Compass />}>Why Devotrex Labs</AgEyebrow>
          </MotionReveal>
          <h2 className="ag-h2 mt-6 max-w-[17ch]">
            <AgWords text="Specialist depth, generalist range, and no logo on the work." />
          </h2>
        </div>
        <MotionReveal delay={0.15}>
          <p className="ag-lede max-w-[48ch]">
            Most partners give you one of three things: AI know-how, broad engineering, or a
            personal white-label relationship. You shouldn’t have to choose.
          </p>
        </MotionReveal>
      </div>

      {/* Three across only from `lg`: at tablet widths three columns are
          ~230px and every title wraps. Tablets get 2 + 1, the last card
          spanning the row. */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {positioning.map((g, i) => (
          <MotionReveal
            key={g.n}
            delay={Math.min(i * 0.08, 0.24)}
            className={`h-full ${i === positioning.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <AgFrame className="h-full">
              <div className="flex items-center justify-between">
                <AgBadge className="ag-badge--num">{g.n}</AgBadge>
                <AgDots />
              </div>
              <hr className="ag-dotted my-6" />
              <h3 className="text-[19px] font-medium tracking-tight text-ink">{g.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{g.body}</p>
            </AgFrame>
          </MotionReveal>
        ))}
      </div>
    </AgSection>
  );
}
