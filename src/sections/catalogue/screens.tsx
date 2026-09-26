import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, FileText, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Service } from '../../data/services';

/* ── catalogue screens ────────────────────────────────────────────
   A product-style mock per pillar, shown on the dark tile of each
   slide. Every mock plays once as its slide mounts (the slider keys
   slides by service, so each change remounts and replays). The
   service's own name and first stack items are written into the
   mock, so no two slides look identical. */

const glass = 'border border-white/12 bg-white/[0.07]';
const spring = { type: 'spring', stiffness: 300, damping: 26 } as const;

function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`w-full max-w-[400px] overflow-hidden rounded-[18px] backdrop-blur-sm ${glass}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2.5 w-2.5 rounded-full bg-white/25" />
        ))}
        <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 text-[11px] text-white/60">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function useStep() {
  const reduced = useReducedMotion();
  return (delay: number) => (reduced ? { initial: false } : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { ...spring, delay } });
}

/* AI: a conversation with the agent, answer grounded in named sources.
   Example exchanges are illustrative, one per AI service. */
const EXCHANGES: Record<string, { ask: string; reply: string }> = {
  'rag-agent': { ask: 'How do I set up SSO for my team?', reply: 'Go to Settings → Security → SSO. Answer drawn from the admin guide and 2 help articles.' },
  'workflow-automation': { ask: 'New lead from the website form.', reply: 'Added to the CRM, call booked for Tuesday, SMS confirmation sent.' },
  'document-extraction': { ask: 'Extract the fields from intake_form.pdf.', reply: 'All fields extracted and validated. 2 flagged for a quick human review.' },
  'internal-llm-tool': { ask: 'How do I request annual leave?', reply: 'Submit it in the HR portal under Time Off. Your manager approves it there.' },
  'computer-vision': { ask: 'Count the diffusers on sheet M-201.', reply: 'Found every diffuser and return grille, tagged by size, ready for the BOM.' },
};
const FALLBACK = { ask: 'Can you pull the key terms from this contract?', reply: 'Found 4 key terms: term length, renewal, liability cap and notice period.' };

function AgentScreen({ service }: { service: Service }) {
  const ex = EXCHANGES[service.id] ?? FALLBACK;
  const step = useStep();
  return (
    <Window title={`${service.name.toLowerCase().replace(/[^a-z]+/g, '-')}.app`}>
      <div className="flex flex-col gap-2.5">
        <motion.div {...step(0.15)} className="self-end rounded-[14px] rounded-br-[4px] bg-white px-3.5 py-2 text-[12.5px] text-ink">
          {ex.ask}
        </motion.div>
        <motion.div {...step(0.6)} className="flex gap-2">
          <span className="sheen-bg grid h-7 w-7 shrink-0 place-items-center rounded-full text-navy">
            <Sparkles size={13} />
          </span>
          <div className={`rounded-[14px] rounded-tl-[4px] px-3.5 py-2.5 text-[12.5px] leading-snug text-white ${glass}`}>
            {ex.reply}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {service.stack.slice(0, 2).map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] text-white/75">
                  <FileText size={10} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div {...step(1.1)} className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-[11.5px] text-white/50">
          Ask a follow-up…
          <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-white text-navy">
            <ArrowRight size={12} />
          </span>
        </motion.div>
      </div>
    </Window>
  );
}

/* Web / SaaS: a client dashboard that builds itself: KPIs, then bars. */
const BARS = [38, 62, 48, 80, 56, 92, 70];

function DashboardScreen({ service }: { service: Service }) {
  const step = useStep();
  const reduced = useReducedMotion();
  return (
    <Window title="app.yourclient.com">
      <div className="grid grid-cols-[52px_1fr] gap-3">
        <motion.div {...step(0.1)} className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((r) => (
            <span key={r} className={`h-2.5 rounded-full ${r === 0 ? 'bg-white/60' : 'bg-white/15'}`} />
          ))}
        </motion.div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            {['Active users', 'Sprint'].map((k, i) => (
              <motion.div key={k} {...step(0.25 + i * 0.12)} className={`rounded-[12px] px-3 py-2 ${glass}`}>
                <div className="text-[10.5px] text-white/55">{k}</div>
                <div className="mt-0.5 text-[16px] font-medium text-white">{i === 0 ? '↑ 24%' : 'On track'}</div>
              </motion.div>
            ))}
          </div>
          <div className={`mt-2 flex h-[92px] items-end gap-1.5 rounded-[12px] px-3 pt-3 pb-2 ${glass}`}>
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className={`flex-1 rounded-t-[4px] ${i === 5 ? 'sheen-bg' : 'bg-white/25'}`}
                initial={reduced ? false : { height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ ...spring, delay: 0.55 + i * 0.06 }}
              />
            ))}
          </div>
          <motion.div {...step(1.1)} className="mt-2 truncate text-[10.5px] text-white/45">
            {service.stack.join(' · ')}
          </motion.div>
        </div>
      </div>
    </Window>
  );
}

/* Enterprise: rows move from the legacy system to the new one and are
   checked off as they reconcile. */
const ROWS = ['Clients', 'Matters', 'Invoices', 'Documents'];

function MigrationScreen({ service }: { service: Service }) {
  const reduced = useReducedMotion();
  return (
    <Window title={`${service.stack[0] ?? 'legacy'} → new platform`}>
      <div className="flex flex-col gap-2">
        {ROWS.map((r, i) => (
          <div key={r} className="grid grid-cols-[1fr_28px_1fr] items-center gap-2">
            <span className={`rounded-[10px] px-3 py-2 text-[12px] text-white/55 ${glass}`}>{r}</span>
            <motion.span
              className="grid place-items-center text-sheen-1"
              initial={reduced ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.3 + i * 0.35 }}
            >
              <ArrowRight size={14} />
            </motion.span>
            <motion.span
              className="flex items-center justify-between rounded-[10px] bg-white px-3 py-2 text-[12px] font-medium text-ink"
              initial={reduced ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 0.45 + i * 0.35 }}
            >
              {r}
              <Check size={13} className="text-accent" strokeWidth={3} />
            </motion.span>
          </div>
        ))}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="sheen-bg h-full rounded-full"
            initial={reduced ? false : { width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
          />
        </div>
        <div className="flex justify-between text-[10.5px] text-white/50">
          <span>Reconciliation</span>
          <span>Every row accounted for</span>
        </div>
      </div>
    </Window>
  );
}

/* Vertical: domain records (cases, listings, samples) as a card grid
   with live status chips. */
const STATUS = ['Intake', 'In review', 'Active', 'Closed'];

function RecordsScreen({ service }: { service: Service }) {
  const step = useStep();
  const Icon = service.icon;
  return (
    <Window title={service.name}>
      <div className="grid grid-cols-2 gap-2">
        {STATUS.map((s, i) => (
          <motion.div key={s} {...step(0.15 + i * 0.12)} className={`rounded-[14px] p-2.5 ${glass}`}>
            <div
              className="grid h-14 place-items-center rounded-[10px] text-white/80"
              style={{ background: `linear-gradient(135deg, rgba(157,177,224,${0.35 - i * 0.06}), rgba(53,84,143,0.35))` }}
            >
              <Icon size={20} />
            </div>
            <div className="mt-2 h-2 w-3/4 rounded-full bg-white/30" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-white/15" />
            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${i === 2 ? 'bg-white text-accent' : 'bg-white/10 text-white/70'}`}>
              {s}
            </span>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

const byPillar: Record<string, (p: { service: Service }) => ReactNode> = {
  ai: AgentScreen,
  web: DashboardScreen,
  enterprise: MigrationScreen,
  vertical: RecordsScreen,
};

export function ServiceScreen({ pillarId, service }: { pillarId: string; service: Service }) {
  const Screen = byPillar[pillarId] ?? AgentScreen;
  return <Screen service={service} />;
}
