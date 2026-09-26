import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TWEEN_EASE } from './motion';

/* ── navbar ───────────────────────────────────────────────────────
   One floating glass bar: wordmark, section links, primary action.
   - Tone follows what is underneath: dark glass over any element
     marked data-nav-theme="dark" (hero, closing field), light glass
     over the white page.
   - A pill slides under the section currently in view (and under the
     hovered link), shared via layoutId.
   - The bar narrows once the page scrolls; phones get a menu panel. */

const links = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Catalogue', href: '#catalogue' },
  { name: 'Stack', href: '#stack' },
  { name: 'Engagement', href: '#engagement' },
  { name: 'FAQs', href: '#faq' },
] as const;

const PROBE_Y = 44; /* vertical middle of the bar, in viewport px */

function useNavState() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const darkZones = document.querySelectorAll('[data-nav-theme="dark"]');
      setDark(
        Array.from(darkZones).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= PROBE_Y && r.bottom >= PROBE_Y;
        }),
      );
      const mid = window.innerHeight * 0.45;
      const current = links.find((l) => {
        const r = document.querySelector(l.href)?.getBoundingClientRect();
        return r ? r.top <= mid && r.bottom >= mid : false;
      });
      setActive(current?.href ?? '');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { dark, scrolled, active };
}

export function Navbar() {
  const { dark, scrolled, active } = useNavState();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
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

  const highlighted = hovered ?? active;
  const glass = dark
    ? 'border-white/15 bg-navy-deep/35 text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]'
    : 'border-[var(--fx-hairline)] bg-white/75 text-ink shadow-[0_10px_40px_-16px_rgba(22,34,63,0.35)]';

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-6"
      initial={reduced ? false : { opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: TWEEN_EASE }}
    >
      <motion.div
        ref={barRef}
        className="relative mx-auto"
        animate={{ maxWidth: scrolled ? 1040 : 1240 }}
        transition={{ type: 'spring', stiffness: 260, damping: 34 }}
      >
        <div
          className={`flex h-16 items-center justify-between gap-4 rounded-full border pr-2 pl-6 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,color,box-shadow] duration-500 ${glass}`}
        >
          <a href="#top" aria-label="Devotrex, back to top" className="flex shrink-0 items-center">
            <img
              src="/devotrex-wordmark-navy.png"
              alt="Devotrex"
              width={1200}
              height={242}
              draggable={false}
              className={`h-[22px] w-auto transition-[filter] duration-500 select-none md:h-6 ${
                dark ? 'brightness-0 invert' : ''
              }`}
            />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                aria-current={active === l.href ? 'location' : undefined}
                className={`relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-opacity ${
                  highlighted === l.href ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {highlighted === l.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${dark ? 'bg-white/15' : 'bg-navy/[0.07]'}`}
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    aria-hidden
                  />
                ) : null}
                <span className="relative">{l.name}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn--primary hidden h-12 pr-2 pl-5 text-[15px] sm:inline-flex">
              <span className="relative">Scope a project</span>
              <span className="btn__arrow" aria-hidden>
                <ArrowRight size={15} strokeWidth={2} />
              </span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              className={`grid h-12 w-12 place-items-center rounded-full transition-colors lg:hidden ${
                dark ? 'bg-white/15 hover:bg-white/25' : 'bg-navy/[0.07] hover:bg-navy/[0.12]'
              }`}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="site-menu"
              className="absolute inset-x-0 top-[calc(100%+8px)] overflow-hidden rounded-[32px] border border-[var(--fx-hairline)] bg-white p-2 text-ink shadow-[0_24px_60px_-20px_rgba(22,34,63,0.45)] backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              style={{ transformOrigin: 'top center' }}
            >
              <nav aria-label="Mobile navigation" className="flex flex-col">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-[20px] px-5 py-3.5 text-[17px] font-medium transition-colors hover:bg-paper-deep ${
                      active === l.href ? 'bg-paper-deep' : ''
                    }`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    {l.name}
                  </motion.a>
                ))}
              </nav>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn--primary mt-2 w-full sm:hidden"
              >
                <span className="relative">Scope a project</span>
                <span className="btn__arrow" aria-hidden>
                  <ArrowRight size={15} strokeWidth={2} />
                </span>
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3 w-[18px]" aria-hidden>
      <span
        className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
          open ? 'top-[5px] rotate-45' : 'top-[1px]'
        }`}
      />
      <span
        className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300 ${
          open ? 'top-[5px] -rotate-45' : 'top-[9px]'
        }`}
      />
    </span>
  );
}
