import { BrainCircuit, Layers3, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { Appear } from '../components/motion';
import { Tilt } from '../components/Tilt';
import { SectionHeader } from '../components/ui';
import { positioning } from '../data/company';
import { BrandScene, RagScene, StackScene } from './value/illustrations';

/* ── value ────────────────────────────────────────────────────────
   Three ringed cards. Each opens on a dark lit tile playing a small
   looping scene for its point (retrieval, full stack, white-label),
   then the title and one line. Cards fade up 50px, staggered 0 /
   0.2 / 0.4s, and tilt toward the pointer on hover. */

const cards: readonly { Icon: LucideIcon; Scene: ComponentType }[] = [
  { Icon: BrainCircuit, Scene: RagScene },
  { Icon: Layers3, Scene: StackScene },
  { Icon: UsersRound, Scene: BrandScene },
];

export function Value() {
  return (
    <section id="value" className="section">
      <div className="wrap-wide">
        <SectionHeader
          title="Why Devotrex?"
          lede="Where we sit: deeper than an AI demo shop, broader than a single-stack agency, and invisible to your client."
        />

        <div className="mx-auto mt-16 grid max-w-[1100px] gap-4 md:mt-20 md:grid-cols-3">
          {positioning.map((p, i) => {
            const { Icon, Scene } = cards[i];
            return (
              <Appear key={p.n} delay={i * 0.2} y={50}>
                <Tilt className="rounded-[32px] md:rounded-[56px]">
                  <article className="card card--ring h-full p-3.5 pb-9">
                    <div className="tile-dark tile-dark--dots relative grid aspect-square place-items-center overflow-hidden rounded-[24px] px-4 md:rounded-[44px]">
                      <span className="tile-glow" aria-hidden />
                      <span className="absolute top-4 left-4 z-10 grid h-9 w-9 place-items-center rounded-[12px] bg-white/10 text-white md:top-5 md:left-5">
                        <Icon size={18} />
                      </span>
                      <span className="chip chip--dark absolute top-4 right-4 z-10 h-9 md:top-5 md:right-5">{p.n}</span>
                      <Scene />
                    </div>
                    <div className="px-3 text-center">
                      <h3 className="mt-7 text-[21px] font-medium tracking-[-0.03em]">{p.title}</h3>
                      <p className="mx-auto mt-2.5 max-w-[32ch] text-[15px] leading-[1.45]">{p.body}</p>
                    </div>
                  </article>
                </Tilt>
              </Appear>
            );
          })}
        </div>
      </div>
    </section>
  );
}
