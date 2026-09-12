import { Clock3 } from 'lucide-react';
import { AgBadge, AgFrame } from '../components/agencee/primitives';
import type { Service } from '../data/services';

/* `className` must carry the display utility (inline-flex / hidden) so the
   two breakpoint copies never ship conflicting display classes. */
function TimelinePill({ timeline, className = '' }: { timeline: string; className?: string }) {
  return (
    <span
      className={`min-w-0 items-center gap-1.5 rounded-full border border-[var(--ag-hairline)] bg-paper px-3 py-1.5 text-[12.5px] leading-snug font-medium text-ink ${className}`}
    >
      <Clock3 size={13} className="shrink-0 text-[var(--ag-teal)]" aria-hidden />
      {timeline}
    </span>
  );
}

/* One catalogue entry. Mirrors the internal item's anatomy (name,
   description, best-for, pitch angle, spec line) with the pitch angle
   recast as "why it works" and the price field dropped. */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <AgFrame>
      <article id={service.id} className="scroll-mt-28">
        {/* Phones: badge + timeline share the top row and the text runs the
            full card width. From `sm`: badge beside the text, timeline pinned
            right. The pill renders twice, one copy hidden per breakpoint. */}
        <div className="flex items-start gap-4 sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
            <div className="flex items-center justify-between gap-3">
              <AgBadge size="sm">
                <Icon size={18} strokeWidth={1.7} aria-hidden />
              </AgBadge>
              <TimelinePill timeline={service.timeline} className="inline-flex sm:hidden" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[19px] font-medium tracking-tight text-ink">{service.name}</h4>
              <p className="mt-1.5 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">{service.summary}</p>
            </div>
          </div>
          <TimelinePill timeline={service.timeline} className="hidden shrink-0 whitespace-nowrap sm:inline-flex" />
        </div>

        <hr className="ag-dotted my-5" />

        <dl className="m-0 grid gap-5 md:grid-cols-2 md:gap-8">
          <div>
            <dt className="ag-label">Best for</dt>
            <dd className="m-0 mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{service.bestFor}</dd>
          </div>
          <div>
            <dt className="ag-label">Why it works</dt>
            <dd className="m-0 mt-1.5 text-[14.5px] leading-relaxed text-ink">{service.why}</dd>
          </div>
        </dl>

        <ul className="m-0 mt-5 flex list-none flex-wrap gap-2 p-0" aria-label="Typical stack">
          {service.stack.map((tool) => (
            <li key={tool} className="ag-chip">
              {tool}
            </li>
          ))}
        </ul>
      </article>
    </AgFrame>
  );
}
