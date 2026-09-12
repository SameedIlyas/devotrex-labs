import { Handshake } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgBadge, AgEyebrow, AgFrame, AgSection } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { engagementModels } from '../data/company';

/* ── engagement models ────────────────────────────────────────────
   The three ways to buy. The internal catalogue closes each card with
   a price; the public card closes with who the model fits instead. */

export function Engagement() {
  return (
    <AgSection id="engagement" field="a">
      <div className="text-center">
        <MotionReveal className="flex justify-center">
          <AgEyebrow icon={<Handshake />}>Engagement models</AgEyebrow>
        </MotionReveal>
        <h2 className="ag-h2 mx-auto mt-6 max-w-[18ch] text-balance">
          <AgWords text="Three ways to work with us." />
        </h2>
        <MotionReveal delay={0.15}>
          <p className="ag-lede mx-auto mt-4 max-w-[54ch]">
            Every service in the catalogue can be bought under any of the three. Pick the shape that
            matches the work, not the other way round.
          </p>
        </MotionReveal>
      </div>

      {/* Same 2 + 1 tablet layout as the positioning cards. */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {engagementModels.map((m, i) => {
          const Icon = m.icon;
          return (
            <MotionReveal
              key={m.name}
              delay={Math.min(i * 0.08, 0.24)}
              className={`h-full ${i === engagementModels.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <AgFrame className="h-full" innerClassName="flex flex-col">
                <AgBadge>
                  <Icon size={22} strokeWidth={1.6} aria-hidden />
                </AgBadge>
                <h3 className="mt-6 text-[20px] font-medium tracking-tight text-ink">{m.name}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{m.body}</p>
                <div className="mt-auto pt-6">
                  <hr className="ag-dotted my-0" />
                  <div className="ag-label pt-4">Best for</div>
                  <div className="mt-1 text-[15px] font-medium text-ink">{m.fit}</div>
                </div>
              </AgFrame>
            </MotionReveal>
          );
        })}
      </div>
    </AgSection>
  );
}
