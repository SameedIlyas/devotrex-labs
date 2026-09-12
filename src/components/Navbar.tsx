import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

/* ── navbar ───────────────────────────────────────────────────────
   Same bar as devotrex.com: transparent over the hero, frosted paper
   with a hairline once the page scrolls. The lockup is the devotrex
   wordmark plus a light "Labs" suffix after a hairline divider, so the
   subdomain reads as part of the brand rather than a separate one. */

const links = [
  { name: 'Services', href: '#services' },
  { name: 'Engagement', href: '#engagement' },
  { name: 'Process', href: '#process' },
  { name: 'Stack', href: '#stack' },
] as const;

export function LabsLockup({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const h = size === 'lg' ? 'h-8' : 'h-6 md:h-7';
  const text = size === 'lg' ? 'text-[26px]' : 'text-[20px] md:text-[23px]';
  return (
    <span className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap">
      <img
        src="/devotrex-wordmark-navy.png"
        alt="Devotrex"
        width={1200}
        height={242}
        className={`${h} w-auto select-none`}
        draggable={false}
      />
      <span className="h-5 w-px bg-[var(--fx-hairline)]" aria-hidden />
      <span className={`${text} font-light leading-none tracking-[-0.03em] text-navy`}>Labs</span>
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeBtnRef.current?.focus();
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
    /* Return focus to the trigger only after a real close, not on mount. */
    if (wasOpen.current) hamburgerRef.current?.focus();
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[var(--fx-hairline)] bg-paper/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Same gutter + 1200px measure as .ag-section/.ag-container, so the
          lockup and CTA line up with the content edges at every width. */}
      <div className="mx-auto flex h-[72px] max-w-[calc(1200px+2*clamp(20px,4vw,40px))] items-center justify-between px-[clamp(20px,4vw,40px)]">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Devotrex Labs, back to top">
          <LabsLockup />
        </a>

        {/* Inline links from `lg` only: at 768px the lockup, four links and
            the CTA need ~790px and collide, so tablets get the menu button. */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ag-btn ag-btn--dark ml-4"
          >
            Scope a project
            <span aria-hidden>→</span>
          </a>
        </nav>

        <button
          ref={hamburgerRef}
          type="button"
          className="-mr-2 rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 overflow-y-auto bg-paper px-[clamp(20px,4vw,40px)] pb-8 lg:hidden"
        >
          {/* Same 72px row and gutter as the closed bar, so opening the
              menu doesn't nudge the lockup or swap the button's position. */}
          <div className="mb-6 flex h-[72px] items-center justify-between">
            <LabsLockup />
            <button
              ref={closeBtnRef}
              type="button"
              className="-mr-2 rounded-full p-2 text-ink"
              onClick={close}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="ag-label mb-3">Explore</div>
          <div className="space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex items-center justify-between border-b border-[var(--fx-hairline)] py-3 text-[15px] font-medium text-ink-soft"
              >
                {l.name}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={close}
            className="ag-btn ag-btn--dark mt-8 w-full justify-center py-4"
          >
            Scope a project
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </header>
  );
}
