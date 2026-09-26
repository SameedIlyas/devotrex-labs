import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Appear, WordsIn } from './motion';

/* ── shared UI ─────────────────────────────────────────────────────
   Section header (heading, lede) and the pill buttons.
   This site has no router, so every link is a plain anchor. */

interface SectionHeaderProps {
  title: string;
  lede?: string;
  className?: string;
}

export function SectionHeader({ title, lede, className = '' }: SectionHeaderProps) {
  return (
    <header className={`flex flex-col items-center text-center ${className}`}>
      <h2 className="h-section max-w-[16ch]">
        <WordsIn text={title} />
      </h2>
      {lede ? (
        <Appear delay={0.3} className="lede mt-7 max-w-[600px]">
          <p>{lede}</p>
        </Appear>
      ) : null}
    </header>
  );
}

interface ButtonProps {
  href: string;
  variant?: 'primary' | 'glass' | 'light';
  arrow?: boolean;
  external?: boolean;
  leading?: ReactNode;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  arrow = false,
  external = false,
  leading,
  className = '',
  onClick,
  children,
}: ButtonProps) {
  const pad = !arrow && variant === 'primary' ? 'pr-6' : '';
  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn btn--${variant} ${pad} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {leading}
      <span className="relative">{children}</span>
      {arrow ? (
        <span className="btn__arrow" aria-hidden>
          <ArrowRight size={15} strokeWidth={2} />
        </span>
      ) : null}
    </a>
  );
}

export function ArrowLink({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className="link-arrow"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      <span className="link-arrow__icon" aria-hidden>
        <ArrowRight size={13} strokeWidth={2.2} />
      </span>
    </a>
  );
}
