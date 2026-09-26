import { Appear, Marquee } from '../components/motion';
import { SectionHeader } from '../components/ui';
import { stack } from '../data/company';
import type { LucideIcon } from 'lucide-react';

/* ── 006 · stack ──────────────────────────────────────────────────
   Three rows of tool pills running at different speeds (the middle
   row against the others), with a glowing navy disc pinned over the
   centre as the call to action. The rows fade out at both edges. */

interface Tool {
  name: string;
  icon: LucideIcon;
}

const tools: Tool[] = stack.flatMap((g) => g.tools.map((name) => ({ name, icon: g.icon })));
const rows: { items: Tool[]; speed: number; direction: 'left' | 'right' }[] = [
  { items: tools, speed: 50, direction: 'left' },
  { items: [...tools.slice(6), ...tools.slice(0, 6)], speed: 90, direction: 'right' },
  { items: [...tools.slice(12), ...tools.slice(0, 12)], speed: 110, direction: 'left' },
];

export function Stack() {
  return (
    <section id="stack" className="section overflow-hidden">
      <div className="wrap-wide">
        <SectionHeader title="Technology Ecosystem" />
      </div>

      <Appear delay={0.2} className="relative mt-16 md:mt-20">
        <div className="fade-x space-y-2.5">
          {rows.map((row, i) => (
            <Marquee key={i} speed={row.speed} direction={row.direction} gap={10}>
              {row.items.map((t) => (
                <ToolPill key={t.name} tool={t} />
              ))}
            </Marquee>
          ))}
        </div>

        <a
          href="#contact"
          className="group absolute top-1/2 left-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full md:h-52 md:w-52"
        >
          <span className="sheen-bg absolute -inset-10 rounded-full opacity-70 blur-3xl" aria-hidden />
          <span className="tile-dark absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-105" aria-hidden />
          <span className="relative flex flex-col items-center gap-3 text-white">
            <span className="grid h-14 w-14 overflow-hidden rounded-full">
              <img src="/devotrex-logo-2026.png" alt="" className="h-full w-full scale-[1.9] object-cover" />
            </span>
            <span className="text-[16px] font-medium tracking-[-0.02em]">Build with us</span>
          </span>
        </a>
      </Appear>

      <Appear delay={0.3} className="lede mx-auto mt-12 max-w-[600px] px-4 text-center">
        <p>
          Modern frameworks where we choose, your existing stack where you do: from Next.js and
          pgvector to SQL Server stored procedures.
        </p>
      </Appear>
    </section>
  );
}

function ToolPill({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="flex h-[88px] min-w-[240px] shrink-0 items-center justify-between gap-6 rounded-[28px] bg-paper-deep pr-5 pl-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)]">
      <span className="text-[19px] font-medium tracking-[-0.03em] whitespace-nowrap text-ink">{tool.name}</span>
      <span className="tile-dark grid h-11 w-11 shrink-0 place-items-center rounded-[14px]">
        <Icon size={20} />
      </span>
    </div>
  );
}
