import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BOOKING_URL } from '../lib/links';
import { EASE } from './motion';
import { Button, Roll } from './ui';

/* ── navbar ───────────────────────────────────────────────────────
   Three columns: section links, the centred wordmark, one action.
   Transparent over the hero; once the page scrolls it fills with the
   page black and a hairline appears under it. Link labels roll on
   hover like the buttons. Phones get a drop-down panel. */

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Engagement', href: '#engagement' },
  { name: 'FAQ', href: '#faq' },
] as const;

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);
  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const barRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const filled = scrolled || open;

  return (
    <motion.header
      ref={barRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        filled ? 'bg-bg/85 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl' : 'bg-transparent'
      }`}
      initial={reduced ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
    >
      <div className="mx-auto grid h-[76px] max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(16px,4vw,40px)] md:h-[88px]">
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="roll-host text-[15.5px] font-medium text-white/90 hover:text-white">
              <Roll>{l.name}</Roll>
            </a>
          ))}
        </nav>

        <a
          href="#top"
          aria-label="Devotrex, back to top"
          className="col-start-1 flex items-center justify-self-start lg:col-start-2 lg:justify-self-center"
        >
          <img
            src="/devotrex-wordmark-navy.png"
            alt="Devotrex"
            width={1200}
            height={242}
            draggable={false}
            className="h-[22px] w-auto brightness-0 invert select-none md:h-[26px]"
          />
        </a>

        <div className="col-start-3 flex items-center justify-end gap-2">
          <Button href={BOOKING_URL} external size="sm" className="hidden sm:inline-flex">
            Book a call
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            className="grid h-11 w-11 place-items-center rounded-[10px] bg-white/8 transition-colors hover:bg-white/14 lg:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col px-[clamp(16px,4vw,40px)] py-4">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-serif text-[28px] tracking-[-0.02em] text-white"
                  initial={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                >
                  {l.name}
                </motion.a>
              ))}
              <Button href={BOOKING_URL} external className="mt-6 w-full sm:hidden" onClick={() => setOpen(false)}>
                Book a call
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-[18px]" aria-hidden>
      <span
        className={`absolute left-0 h-[1.5px] w-full rounded bg-white transition-all duration-300 ${
          open ? 'top-[5px] rotate-45' : 'top-[1px]'
        }`}
      />
      <span
        className={`absolute left-0 h-[1.5px] w-full rounded bg-white transition-all duration-300 ${
          open ? 'top-[5px] -rotate-45' : 'top-[9px]'
        }`}
      />
    </span>
  );
}
