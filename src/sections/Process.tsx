import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MessagesSquare, Rocket, SearchCode, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { SectionHeader } from '../components/ui';
import { processSteps } from '../data/company';
import type { ProcessStep } from '../data/company';

/* ── 004 · process ────────────────────────────────────────────────
   A zig-zag timeline on a centre rail. The rail fills with the sheen
   gradient as the list scrolls through the viewport; each step turns
   "active" once the fill reaches its node: the row gets its grey
   capsule, the icon tile goes dark and the node lights up. On phones
   the rail moves to the left edge and every row reads left to right. */

const icons: readonly LucideIcon[] = [MessagesSquare, SearchCode, Rocket, Users];

export function Process() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.65', 'end 0.65'] });
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [reached, setReached] = useState(reduced ? processSteps.length : 0);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduced) return;
    const n = processSteps.length;
    /* Node i sits at the middle of row i, i.e. (i + 0.5) / n down the rail. */
    setReached(processSteps.filter((_, i) => p >= (i + 0.35) / n).length);
  });

  return (
    <section id="process" className="section">
      <div className="wrap-narrow">
        <SectionHeader
          title="How We Work"
          lede="Four steps from the first conversation to a standing team, each one proven before the next."
        />

        <div className="relative mt-16 md:mt-24">
          {/* z-[1]: above the rows' active capsules, below the nodes (z-10). */}
          <div className="absolute top-12 bottom-12 left-[39px] z-[1] w-px bg-rule md:left-1/2" aria-hidden>
            <motion.div
              className="w-full bg-gradient-to-b from-sheen-1 via-sheen-3 to-accent"
              style={{ height: reduced ? '100%' : fill }}
            />
          </div>
          <ol ref={listRef} className="relative m-0 list-none space-y-4 p-0">
            {processSteps.map((step, i) => (
              <StepRow key={step.n} step={step} index={i} active={i < reached} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface StepRowProps {
  step: ProcessStep;
  index: number;
  active: boolean;
}

function StepRow({ step, index, active }: StepRowProps) {
  const Icon = icons[index];
  const flip = index % 2 === 1;

  const iconSide = (
    <div className="flex items-center gap-4">
      <span
        className={`grid h-20 w-20 shrink-0 place-items-center rounded-[24px] transition-all duration-500 ${
          active ? 'tile-dark' : 'bg-paper-deep text-ink'
        }`}
      >
        <Icon size={30} strokeWidth={1.8} />
      </span>
      <span className="chip">{step.n}</span>
    </div>
  );

  const textSide = (
    <div className={flip ? 'md:text-right' : ''}>
      <div className="text-[12px] font-semibold tracking-[0.06em] text-accent uppercase">{step.kicker}</div>
      <h3 className="mt-1.5 text-[21px] font-medium tracking-[-0.03em]">{step.title}</h3>
      <p className="mt-2 max-w-[38ch] text-[15.5px] leading-[1.45] md:inline-block">{step.body}</p>
    </div>
  );

  return (
    <li
      className={`relative grid grid-cols-[48px_1fr] items-center gap-x-6 rounded-[40px] px-4 py-8 transition-colors duration-500 md:grid-cols-[1fr_56px_1fr] md:gap-x-10 md:px-10 md:py-10 ${
        active ? 'bg-paper-deep' : 'bg-transparent'
      }`}
    >
      {/* Desktop: icon and text swap sides every row. */}
      <div className={`hidden md:block ${flip ? 'md:order-3' : 'md:order-1 md:justify-self-end'}`}>{iconSide}</div>
      <div className={`hidden md:block ${flip ? 'md:order-1 md:justify-self-end' : 'md:order-3'}`}>{textSide}</div>

      <div className="z-10 grid place-items-center md:order-2">
        <Node active={active} />
      </div>

      {/* Phone: one column to the right of the rail. */}
      <div className="space-y-5 md:hidden">
        {iconSide}
        {textSide}
      </div>
    </li>
  );
}

function Node({ active }: { active: boolean }) {
  return (
    <span
      className={`grid h-9 w-9 place-items-center rounded-[11px] transition-all duration-500 ${
        active ? 'sheen-bg shadow-[0_0_18px_rgba(111,140,203,0.55)]' : 'border border-rule bg-white'
      }`}
      aria-hidden
    >
      <span
        className={`grid h-[30px] w-[30px] place-items-center rounded-[9px] ${active ? 'bg-white/80' : 'bg-white'}`}
      >
        <span className={`h-3 w-3 rounded-full transition-colors duration-500 ${active ? 'bg-ink' : 'bg-transparent'}`} />
      </span>
    </span>
  );
}
