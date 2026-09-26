import { Check } from 'lucide-react';
import type { ComponentType } from 'react';
import { Appear } from '../components/motion';
import { Tilt } from '../components/Tilt';
import { Button, SectionHeader } from '../components/ui';
import { engagementModels } from '../data/company';
import { CONTACT_MAILTO } from '../lib/links';
import { AugScene, MilestoneScene, PodScene } from './engagement/scenes';

/* ── engagement ───────────────────────────────────────────────────
   The three engagement models in a tiered-plan layout: one grey tray,
   the middle model raised on a white card. Each card opens on a dark
   panel playing its model (a pod assembling, an engineer joining the
   board, milestones completing). Where a plan would show a price,
   each model shows its shape. No prices, by design. */

const shape: Record<string, { big: string; unit: string; points: readonly string[]; Scene: ComponentType }> = {
  'Dedicated Pod': {
    Scene: PodScene,
    big: '2–4',
    unit: '/people',
    points: ['Developer, QA and PM as needed', 'Embedded in your workflow', 'Full or part time'],
  },
  'Staff Augmentation': {
    Scene: AugScene,
    big: '1',
    unit: '/engineer',
    points: ['Placed on one active client project', 'Works in your tools', 'Follows your process'],
  },
  'Fixed-Price White-Label': {
    Scene: MilestoneScene,
    big: 'Fixed',
    unit: '/scope',
    points: ['Scoped project, delivered end to end', 'Shipped under your brand', 'Paid against milestones, not hours'],
  },
};

export function Engagement() {
  return (
    <section id="engagement" className="section">
      <div className="wrap-wide">
        <SectionHeader
          title="Built Around Your Delivery"
          lede="Three ways to work with us, from one extra pair of hands to a standing team."
        />

        <Appear delay={0.2} y={50} className="mx-auto mt-16 max-w-[1180px] md:mt-20">
          <div className="card grid gap-2 p-2 lg:grid-cols-3">
            {engagementModels.map((m, i) => {
              const s = shape[m.name];
              const raised = i === 1;
              const Icon = m.icon;
              return (
                <Tilt key={m.name} max={3} className="rounded-[28px] md:rounded-[44px]">
                  <article
                    className={`flex h-full flex-col rounded-[28px] p-3 pb-7 md:rounded-[44px] md:pb-10 ${
                      raised ? 'bg-white shadow-[0_20px_50px_-30px_rgba(22,34,63,0.35)]' : ''
                    }`}
                  >
                    <div className="tile-dark tile-dark--dots relative grid h-[200px] place-items-center overflow-hidden rounded-[22px] px-4 md:rounded-[34px]">
                      <span className="tile-glow" aria-hidden />
                      <span
                        className={`absolute top-3.5 left-3.5 z-10 grid h-10 w-10 place-items-center rounded-[12px] ${
                          raised ? 'sheen-bg text-navy' : 'bg-white/12 text-white'
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <s.Scene />
                    </div>

                    <div className="flex flex-1 flex-col px-4 md:px-7">
                      <span className="mt-6 self-start rounded-full border border-sheen-1 bg-accent-bg px-3 py-1 text-[12.5px] font-medium text-accent">
                        {m.fit}
                      </span>
                      <h3 className="mt-4 text-[23px] tracking-[-0.035em]">{m.name}</h3>
                      <p className="mt-2 text-[15px] leading-[1.45]">{m.body}</p>

                      <div className="mt-8 flex items-baseline gap-1">
                        <span className="text-[clamp(2.6rem,4.4vw,3.6rem)] leading-none font-medium tracking-[-0.06em] text-ink">
                          {s.big}
                        </span>
                        <span className="text-[17px] text-ink-soft">{s.unit}</span>
                      </div>

                      <hr className="my-8 border-0 border-t border-rule" />

                      <div className="text-[15px] font-semibold text-ink">How it works:</div>
                      <ul className="m-0 mt-3 mb-10 list-none space-y-2 p-0">
                        {s.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2.5 text-[15px] text-ink-soft">
                            <Check size={15} aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>

                      <Button href={CONTACT_MAILTO} className="mt-auto w-full pr-6">
                        Discuss this model
                      </Button>
                    </div>
                  </article>
                </Tilt>
              );
            })}
          </div>
        </Appear>
      </div>
    </section>
  );
}
