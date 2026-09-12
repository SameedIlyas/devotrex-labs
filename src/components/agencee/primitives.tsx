import type { ReactNode } from 'react';

/* ── Agencee primitives ────────────────────────────────────────────
   Thin React wrappers over the classes in styles/agencee.css, mirrored
   from devotrex.com (website/src/components/agencee/primitives.tsx).
   This site has no router, so every link is a plain anchor. */

interface AgSectionProps {
  id?: string;
  field?: 'a' | 'b';
  className?: string;
  children: ReactNode;
}

/* Section shell: alternating field + 1200px container + 120/40 rhythm. */
export function AgSection({ id, field = 'a', className = '', children }: AgSectionProps) {
  return (
    <section id={id} className={`ag-section ag-field-${field} ${className}`}>
      <div className="ag-container">{children}</div>
    </section>
  );
}

interface AgFrameProps {
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/* The double frame. `className` lands on the OUTER frame so callers can
   set span and height in a grid. */
export function AgFrame({ className = '', innerClassName = '', children }: AgFrameProps) {
  return (
    <div className={`ag-frame ${className}`}>
      <div className={`ag-frame-in ${innerClassName}`}>{children}</div>
    </div>
  );
}

export function AgEyebrow({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="ag-eyebrow">
      {icon}
      {children}
    </span>
  );
}

interface AgBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

export function AgBadge({ size = 'md', className = '', children }: AgBadgeProps) {
  const s = size === 'sm' ? 'ag-badge--sm' : size === 'lg' ? 'ag-badge--lg' : '';
  return <span className={`ag-badge ${s} ${className}`}>{children}</span>;
}

interface AgButtonProps {
  variant?: 'dark' | 'light';
  href: string;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/* Pill CTA. `external` opens a new tab (booking pages, the main site). */
export function AgButton({
  variant = 'dark',
  href,
  arrow = false,
  external = false,
  className = '',
  onClick,
  children,
}: AgButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`ag-btn ag-btn--${variant} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {arrow ? (
        <span className="ag-btn__arrow" aria-hidden>
          <ArrowRight />
        </span>
      ) : null}
    </a>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="11" height="11" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The three idle dots the reference sets opposite each step number. */
export function AgDots() {
  return (
    <span className="flex gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink-faint/45" />
      ))}
    </span>
  );
}
