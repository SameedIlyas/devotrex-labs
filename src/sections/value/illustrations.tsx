import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Database, FileText, GitCommitHorizontal, Layout, Server, Sparkles } from 'lucide-react';
import { useTicker } from '../../components/useTicker';

/* ── value illustrations ──────────────────────────────────────────
   One looping scene per positioning point, drawn on the dark tile.
   Decorative only (aria-hidden); frozen on the finished frame under
   reduced motion. */

const glass = 'border border-white/12 bg-white/[0.07] backdrop-blur-sm';

/* AI depth: a question retrieves three sources, then the grounded
   answer types itself out. */
const SOURCES = ['Policy.pdf', 'FAQ.md', 'Tickets.csv'];
const ANSWER = 'Refunds within 30 days, per Policy §4.';

export function RagScene() {
  const step = useTicker(7, 900, 6); /* 0 ask · 1-3 sources · 4-6 answer */
  const typed = step >= 4 ? ANSWER.slice(0, Math.round((ANSWER.length * (step - 3)) / 3)) : '';
  return (
    <div className="relative z-10 flex w-full max-w-[280px] flex-col gap-3 px-2" aria-hidden>
      <div className={`self-end rounded-[14px] rounded-br-[4px] px-3.5 py-2 text-[12.5px] text-white ${glass}`}>
        What’s our refund window?
      </div>
      <div className="flex justify-center gap-1.5">
        {SOURCES.map((s, i) => {
          const lit = step >= i + 1;
          return (
            <motion.span
              key={s}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-[10.5px] font-medium"
              animate={{
                backgroundColor: lit ? 'rgba(157,177,224,0.28)' : 'rgba(255,255,255,0.05)',
                color: lit ? '#FFFFFF' : 'rgba(255,255,255,0.35)',
                scale: lit && step === i + 1 ? 1.08 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            >
              <FileText size={11} />
              {s}
            </motion.span>
          );
        })}
      </div>
      <div className={`flex min-h-[58px] items-start gap-2 rounded-[14px] rounded-bl-[4px] px-3 py-2.5 ${glass}`}>
        <span className="sheen-bg mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-navy">
          <Sparkles size={11} />
        </span>
        <span className="text-[12.5px] leading-snug text-white">
          {typed}
          {step >= 4 && step < 6 ? <span className="ml-0.5 inline-block h-3 w-[2px] animate-pulse bg-white align-middle" /> : null}
          {step < 4 ? <span className="text-white/40">Searching sources…</span> : null}
        </span>
      </div>
    </div>
  );
}

/* Range beyond AI: the full stack assembles layer by layer, database
   first, then the API, then the interface, and a pulse runs through. */
const LAYERS = [
  { Icon: Layout, name: 'Web app', note: 'React · Next.js' },
  { Icon: Server, name: 'API layer', note: 'FastAPI · Node' },
  { Icon: Database, name: 'Legacy DB', note: 'SQL Server' },
];

export function StackScene() {
  const step = useTicker(5, 850, 4); /* 0 empty · 1-3 layers in · 4 pulse */
  const reduced = useReducedMotion();
  return (
    <div className="relative z-10 flex w-full max-w-[250px] flex-col gap-2" aria-hidden>
      {LAYERS.map(({ Icon, name, note }, i) => {
        const shown = step >= LAYERS.length - i;
        return (
          <motion.div
            key={name}
            className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 ${glass}`}
            animate={{
              opacity: shown ? 1 : 0.15,
              x: shown ? 0 : i % 2 ? 24 : -24,
              boxShadow: step === 4 ? '0 0 0 1px rgba(157,177,224,0.55), 0 0 24px -4px rgba(111,140,203,0.6)' : '0 0 0 0 rgba(0,0,0,0)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 26, delay: step === 4 && !reduced ? i * 0.08 : 0 }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-white/15 text-white">
              <Icon size={16} />
            </span>
            <span className="flex flex-col">
              <span className="text-[13px] font-medium text-white">{name}</span>
              <span className="text-[11px] text-white/55">{note}</span>
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* Boutique, and invisible: a client repo where every commit is
   authored under the agency's name, stamped "your brand". */
const COMMITS = ['feat: intake workflow', 'fix: sync retries', 'feat: client dashboard'];

export function BrandScene() {
  const step = useTicker(5, 900, 4); /* 1-3 commits land · 4 stamp */
  return (
    <div className={`relative z-10 w-full max-w-[260px] overflow-hidden rounded-[16px] ${glass}`} aria-hidden>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2 w-2 rounded-full bg-white/25" />
        ))}
        <span className="ml-2 text-[11px] text-white/55">client-project / main</span>
      </div>
      <ul className="m-0 list-none space-y-1.5 p-3">
        {COMMITS.map((c, i) => (
          <motion.li
            key={c}
            className="flex items-center gap-2 text-[11.5px] text-white"
            animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <GitCommitHorizontal size={13} className="shrink-0 text-sheen-1" />
            <span className="truncate">{c}</span>
            <span className="ml-auto shrink-0 text-white/45">@youragency</span>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
        {step === 4 ? (
          <motion.span
            className="sheen-bg absolute right-3 bottom-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-navy shadow-lg"
            initial={{ scale: 1.8, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: -6 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 16 }}
          >
            <BadgeCheck size={12} />
            Your brand
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
