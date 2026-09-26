import { Check, EyeOff, GitBranch, Milestone, PhoneCall, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { Appear } from '../../components/motion';
import { Tilt } from '../../components/Tilt';
import { Button, SectionHeader } from '../../components/ui';
import { pillars } from '../../data/services';
import type { Pillar } from '../../data/services';
import { BOOKING_URL } from '../../lib/links';
import { ChatVisual, FlowVisual, OrbitVisual, SystemsVisual } from './visuals';

/* ── capabilities ─────────────────────────────────────────────────
   Bento of the four pillars: the AI pillar as the tall lead card with
   its flow diagram, the other three beside it, each with a small
   looping visual. Below: the scoping CTA on a drifting sheen field,
   and a row of dark tiles for how delivery is protected. Every card
   tilts toward the pointer. */

const [ai, web, enterprise, vertical] = pillars;

const guarantees = [
  { Icon: EyeOff, label: 'White-label delivery', note: 'Your client sees your team' },
  { Icon: GitBranch, label: 'Your repo, your tools', note: 'We join your process' },
  { Icon: Milestone, label: 'Milestone payments', note: 'Not open-ended hours' },
  { Icon: ShieldCheck, label: 'Full audit trails', note: 'Air-gapped when needed' },
];

function PillarCopy({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <span className="tile-dark grid h-11 w-11 place-items-center rounded-[14px]">
          <Icon size={20} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-[12.5px] font-medium text-ink-soft">
          {pillar.services.length} services
        </span>
      </div>
      <p className="text-[16px] leading-[1.4] text-ink-soft md:text-[17px]">
        <strong className="font-semibold text-ink">{pillar.name}.</strong> {pillar.blurb}
      </p>
    </>
  );
}

const CARD_RADIUS = 'rounded-[clamp(32px,4vw,56px)]';

function BentoCard({ id, className = '', delay, children }: { id: string; className?: string; delay: number; children: ReactNode }) {
  return (
    <Appear delay={delay} className={className}>
      <Tilt max={3} className={CARD_RADIUS}>
        <article id={id} className="card h-full overflow-hidden p-7 md:p-10">
          {children}
        </article>
      </Tilt>
    </Appear>
  );
}

export function Capabilities() {
  return (
    <section id="services" className="section">
      <div className="wrap-wide">
        <SectionHeader title="Four Ways We Build" />

        <div className="mt-16 grid gap-3 md:mt-20 lg:grid-cols-[1.35fr_1fr_1fr]">
          <BentoCard id={ai.id} delay={0} className="lg:row-span-2">
            <PillarCopy pillar={ai} />
            <ul className="m-0 mt-5 list-none space-y-2 p-0">
              {ai.services.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                  <Check size={15} className="text-ink-mute" aria-hidden />
                  {s.name}
                </li>
              ))}
            </ul>
            <FlowVisual />
          </BentoCard>

          <BentoCard id={web.id} delay={0.2}>
            <PillarCopy pillar={web} />
            <ChatVisual />
          </BentoCard>

          <BentoCard id={enterprise.id} delay={0.3}>
            <PillarCopy pillar={enterprise} />
            <SystemsVisual />
          </BentoCard>

          <BentoCard id={vertical.id} delay={0.4} className="lg:col-span-2">
            <PillarCopy pillar={vertical} />
            <OrbitVisual />
          </BentoCard>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.5fr]">
          <Appear delay={0.2}>
            <Tilt max={3} className={CARD_RADIUS}>
              <div className="card relative h-full overflow-hidden p-7 md:p-10">
                <div className="sheen-bg absolute inset-0 opacity-90" aria-hidden />
                <span className="cta-blob cta-blob--a" aria-hidden />
                <span className="cta-blob cta-blob--b" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-white/55 to-transparent" aria-hidden />
                <div className="relative">
                  <span className="flex -space-x-2" aria-hidden>
                    <span className="grid h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-navy">
                      <img src="/devotrex-logo-2026.png" alt="" className="h-full w-full scale-[1.9] object-cover" />
                    </span>
                    <span className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-white text-navy">
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/70 [animation-duration:2.2s]" />
                      <PhoneCall size={20} className="relative" />
                    </span>
                  </span>
                  <h3 className="mt-6 text-[24px] tracking-[-0.035em]">Not sure where to start?</h3>
                  <p className="mt-3 max-w-[40ch] text-[15.5px] leading-[1.45] text-ink/75">
                    Book a scoping call. Tell us the project, the stack and the deadline, and we’ll name
                    the smallest useful first step.
                  </p>
                  <Button href={BOOKING_URL} external arrow className="mt-10">
                    Book a scoping call
                  </Button>
                </div>
              </div>
            </Tilt>
          </Appear>

          <Appear delay={0.3}>
            <div className="card h-full p-3.5">
              <ul className="m-0 grid h-full list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-4">
                {guarantees.map(({ Icon, label, note }, i) => (
                  <li
                    key={label}
                    className="tile-dark group/tile flex min-h-[220px] flex-col items-center justify-between overflow-hidden rounded-[32px] px-3 pt-7 pb-6 text-center transition-transform duration-500 hover:-translate-y-1.5"
                  >
                    <span className="tile-glow" style={{ animationDelay: `${i * -2.2}s` }} aria-hidden />
                    <span className="orb relative z-10 h-[76px] w-[76px] transition-transform duration-500 group-hover/tile:scale-110">
                      <span className="orb-ring" style={{ animationDelay: `${i * -1}s` }} aria-hidden />
                      <Icon size={28} strokeWidth={1.7} />
                    </span>
                    <span className="relative z-10">
                      <span className="block text-[15px] leading-tight font-medium">{label}</span>
                      <span className="mt-1.5 block text-[12px] leading-snug text-white/55">{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Appear>
        </div>
      </div>
    </section>
  );
}
