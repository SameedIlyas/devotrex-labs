import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Database, FileText, FlaskConical, House, Mail, Scale, Send, Sparkles, User, Workflow, Zap } from 'lucide-react';
import { useTicker } from '../../components/useTicker';

/* ── bento visuals ────────────────────────────────────────────────
   Small looping illustrations, one per pillar card. Each is purely
   decorative (aria-hidden) and freezes under reduced motion. */

/* AI & automation: a hub orb feeding three triggers. Each branch fires
   in turn: the trigger glows, a spark runs down its wire and the
   action below lights up with a check. */
const BRANCHES = [
  { Trigger: Database, Action: Send, label: 'Sent' },
  { Trigger: User, Action: FileText, label: 'Logged' },
  { Trigger: Zap, Action: Workflow, label: 'Synced' },
];

export function FlowVisual() {
  const active = useTicker(BRANCHES.length, 1600, 0);
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto mt-10 w-full max-w-[420px]" aria-hidden>
      <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full bg-white shadow-[0_0_0_14px_rgba(255,255,255,0.6)]">
        <motion.span
          className="absolute inset-3 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, #9DB1E0, #FFFFFF, #6F8CCB, #35548F, #9DB1E0)' }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <span className="relative grid h-[88px] w-[88px] place-items-center rounded-full bg-white text-navy">
          <Sparkles size={32} strokeWidth={1.5} />
        </span>
      </div>

      <svg className="mx-auto block h-16 w-full" viewBox="0 0 420 64" fill="none" preserveAspectRatio="none">
        <path d="M210 0v30M60 30h300M60 30v34M210 30v34M360 30v34" className="flow-wire" />
      </svg>

      <div className="grid grid-cols-3 gap-6">
        {BRANCHES.map(({ Trigger, Action, label }, i) => {
          const on = i === active;
          return (
            <div key={label} className="flex flex-col items-center">
              <motion.span
                className="tile-dark grid h-[72px] w-[72px] place-items-center rounded-[20px]"
                animate={{ scale: on ? 1.08 : 1, boxShadow: on ? '0 0 0 4px rgba(157,177,224,0.45), 0 12px 30px -8px rgba(53,84,143,0.7)' : '0 0 0 0 rgba(0,0,0,0)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              >
                <Trigger size={24} />
              </motion.span>
              <span className="relative h-10 w-2">
                <svg className="absolute inset-0 h-10 w-2" viewBox="0 0 2 40" fill="none">
                  <path d="M1 0v40" className="flow-wire" />
                </svg>
                {on && !reduced ? (
                  <motion.span
                    key={`spark-${active}`}
                    className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_3px_rgba(111,140,203,0.8)]"
                    initial={{ top: '-10%', opacity: 0 }}
                    animate={{ top: '90%', opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.7, ease: 'easeIn' }}
                  />
                ) : null}
              </span>
              <motion.span
                className="relative grid h-[72px] w-[72px] place-items-center rounded-[20px] text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.6)]"
                animate={{ backgroundColor: on ? '#35548F' : '#DADDE3' }}
                transition={{ delay: on ? 0.55 : 0, duration: 0.3 }}
              >
                <Action size={24} />
                <AnimatePresence>
                  {on ? (
                    <motion.span
                      className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white text-accent shadow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, transition: { delay: 0.6, type: 'spring', stiffness: 500, damping: 18 } }}
                      exit={{ scale: 0 }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.span>
              <span className={`mt-2 text-[12px] font-medium transition-colors ${on ? 'text-accent' : 'text-ink-faint'}`}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Full-stack: a short white-label handover played as chat bubbles. */
const CHAT = [
  { me: false, text: 'Can you pick up the sprint on Monday?' },
  { me: true, text: 'Yes. We’ll work in your repo and your board.' },
  { me: false, text: 'Client-facing name stays ours?' },
  { me: true, text: 'Always. Your brand on every commit.' },
];

export function ChatVisual() {
  const step = useTicker(CHAT.length + 1, 1400);
  const shown = CHAT.slice(Math.max(0, step - 2), step);
  return (
    <div className="mt-6 overflow-hidden rounded-[22px] bg-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)]" aria-hidden>
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5 text-[12px] font-medium text-ink-soft">
        <span className="h-2 w-2 rounded-full bg-accent" />
        #client-sprint
        <span className="ml-auto text-ink-faint">4 members</span>
      </div>
      <div className="flex h-[150px] flex-col justify-end gap-2.5 p-3">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((m) => (
            <motion.div
              layout
              key={m.text}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className={`flex items-center gap-2 ${m.me ? 'justify-end' : ''}`}
            >
              {!m.me ? <span className="sheen-bg h-7 w-7 shrink-0 rounded-full" /> : null}
              <span
                className={`rounded-[14px] px-3.5 py-2 text-[13px] leading-snug ${
                  m.me ? 'bg-navy text-white' : 'bg-white text-ink'
                }`}
              >
                {m.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Enterprise: a carousel of source systems resolving to one record
   count, the migration story in one card. */
const SYSTEMS = [
  { name: 'SQL Server', note: 'Reconciled' },
  { name: 'Legacy CMS', note: 'Integrated' },
  { name: 'Aderant', note: 'Extended' },
  { name: 'Custom ERP', note: 'Migrated' },
];

export function SystemsVisual() {
  const active = useTicker(SYSTEMS.length, 1800);
  return (
    <div className="relative mt-6 flex h-[150px] items-center justify-center" aria-hidden>
      {SYSTEMS.map((s, i) => {
        const offset = ((i - active + SYSTEMS.length + 1) % SYSTEMS.length) - 1;
        const isActive = offset === 0;
        return (
          <motion.div
            key={s.name}
            className="absolute flex w-[132px] flex-col items-center rounded-[22px] bg-white px-3 py-4 text-center"
            animate={{
              x: offset * 64,
              scale: isActive ? 1 : 0.82,
              opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.55,
              zIndex: isActive ? 2 : 1,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{ boxShadow: isActive ? '0 0 0 2px #9DB1E0, 0 16px 30px -18px rgba(22,34,63,0.5)' : 'none' }}
          >
            <span className="tile-dark grid h-11 w-11 place-items-center rounded-full">
              <Database size={18} />
            </span>
            <span className="mt-2.5 text-[14px] font-medium text-ink">{s.name}</span>
            <span className="mt-1.5 rounded-full bg-accent-bg px-2.5 py-0.5 text-[11px] font-medium text-accent">
              ● {s.note}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* Vertical platforms: domain icons riding concentric arcs. */
export function OrbitVisual() {
  const reduced = useReducedMotion();
  const nodes = [
    { Icon: Scale, r: 150, a: 200 },
    { Icon: House, r: 110, a: 250 },
    { Icon: FlaskConical, r: 150, a: 320 },
    { Icon: Mail, r: 110, a: 300 },
  ];
  return (
    <div className="relative mx-auto mt-4 h-[170px] w-full max-w-[520px] overflow-hidden" aria-hidden>
      <div className="absolute bottom-[-150px] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full border border-white shadow-[0_0_0_40px_rgba(255,255,255,0.35)]" />
      <div className="absolute bottom-[-110px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full border border-white" />
      <div className="sheen-bg absolute bottom-[-70px] left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full opacity-60 blur-2xl" />
      <motion.div
        className="absolute bottom-0 left-1/2 h-0 w-0"
        animate={reduced ? undefined : { rotate: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        {nodes.map(({ Icon, r, a }, i) => {
          const rad = (a * Math.PI) / 180;
          return (
            <span
              key={i}
              className="tile-dark absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              style={{ left: Math.cos(rad) * r, top: Math.sin(rad) * r }}
            >
              <Icon size={18} />
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
