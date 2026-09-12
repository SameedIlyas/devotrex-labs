import { LayoutGrid } from 'lucide-react';
import { AgWords } from '../components/agencee/AgWords';
import { AgBadge, AgEyebrow, AgSection } from '../components/agencee/primitives';
import { MotionReveal } from '../components/MotionReveal';
import { pillars, serviceCount } from '../data/services';
import type { Pillar } from '../data/services';
import { ServiceCard } from './ServiceCard';

/* ── service catalogue ────────────────────────────────────────────
   Four pillars, each laid out like the main site's process block: a
   sticky left column carrying the pillar heading, and the services
   stacked on the right. The left column only sticks from `lg` up;
   below that a sticky heading would just eat the viewport. */

function PillarNav() {
  return (
    <nav aria-label="Service pillars" className="mt-10 flex flex-wrap justify-center gap-2.5">
      {pillars.map((p) => {
        const Icon = p.icon;
        return (
          <a key={p.id} href={`#${p.id}`} className="ag-btn ag-btn--light">
            <Icon size={15} strokeWidth={1.8} className="text-[var(--ag-teal)]" aria-hidden />
            {p.short}
            <span className="text-ink-faint">{p.services.length}</span>
          </a>
        );
      })}
    </nav>
  );
}

function PillarBlock({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    /* grid-cols-1 (minmax(0,1fr)), not the implicit `auto` track: an auto
       track grows to its widest unbreakable child, which pushed the cards
       past the viewport on 320px phones. */
    <div
      id={pillar.id}
      className="scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-14"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <MotionReveal>
          <div className="flex items-center gap-4">
            <AgBadge>
              <Icon size={22} strokeWidth={1.6} aria-hidden />
            </AgBadge>
            <div className="ag-label">
              {pillar.index} · {pillar.services.length} services
            </div>
          </div>
          <h3 className="mt-6 max-w-[16ch] text-[clamp(26px,2.8vw,34px)] font-light tracking-[-0.03em] text-ink">
            {pillar.name}
          </h3>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">{pillar.blurb}</p>
        </MotionReveal>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5">
        {pillar.services.map((s, i) => (
          <MotionReveal key={s.id} delay={Math.min(i * 0.04, 0.12)}>
            <ServiceCard service={s} />
          </MotionReveal>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <AgSection id="services" field="b">
      <div className="text-center">
        <MotionReveal className="flex justify-center">
          <AgEyebrow icon={<LayoutGrid />}>Service catalogue</AgEyebrow>
        </MotionReveal>
        <h2 className="ag-h2 mx-auto mt-6 max-w-[20ch] text-balance">
          <AgWords text={`${serviceCount} defined services across four pillars.`} />
        </h2>
        <MotionReveal delay={0.15}>
          <p className="ag-lede mx-auto mt-4 max-w-[56ch]">
            Each one is scoped, time-boxed and repeatable, so you know what you are buying before
            anyone writes a line of code.
          </p>
        </MotionReveal>
        <MotionReveal delay={0.2}>
          <PillarNav />
        </MotionReveal>
      </div>

      <div className="mt-20 space-y-24 md:mt-24 md:space-y-32">
        {pillars.map((p) => (
          <PillarBlock key={p.id} pillar={p} />
        ))}
      </div>
    </AgSection>
  );
}
