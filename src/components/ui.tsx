import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { WordsIn } from './motion';

/* ── shared UI ─────────────────────────────────────────────────────
   Section heading and the square-cornered buttons whose label rolls
   on hover. No router: every link is a plain anchor. */

interface SectionHeadProps {
  title: string;
  align?: 'center' | 'left';
  className?: string;
}

export function SectionHead({ title, align = 'center', className = '' }: SectionHeadProps) {
  const centred = align === 'center';
  return (
    <header className={`flex flex-col ${centred ? 'items-center text-center' : 'items-start'} ${className}`}>
      <h2 className={`h-display ${centred ? 'max-w-[18ch]' : 'max-w-[16ch]'}`}>
        <WordsIn text={title} />
      </h2>
    </header>
  );
}

/* The label twice in one grid cell: on hover the first slides out the
   top while the copy rises in from below. */
export function Roll({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

interface ButtonProps {
  href: string;
  variant?: 'light' | 'dark';
  size?: 'md' | 'sm';
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function Button({
  href,
  variant = 'light',
  size = 'md',
  arrow = false,
  external = false,
  className = '',
  onClick,
  children,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn btn--${variant} ${size === 'sm' ? 'btn--sm' : ''} roll-host ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Roll>{children}</Roll>
      {arrow ? (
        <span className="btn__dot" aria-hidden>
          <ArrowRight size={13} strokeWidth={2.4} />
        </span>
      ) : null}
    </a>
  );
}
