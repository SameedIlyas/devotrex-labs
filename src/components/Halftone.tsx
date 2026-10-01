import type { ReactNode } from 'react';

/* ── halftone light ───────────────────────────────────────────────
   Where the template uses photography, this site uses light: two or
   three blue glows drifting slowly behind a dot screen. Each preset
   places them differently so panels side by side never match. */

interface Glow {
  x: string;
  y: string;
  size: string;
  color: string;
  delay?: string;
}

const PRESETS: Record<string, readonly Glow[]> = {
  dawn: [
    { x: '58%', y: '30%', size: '70%', color: '#6F8CCB' },
    { x: '15%', y: '75%', size: '55%', color: '#35548F', delay: '-4s' },
    { x: '85%', y: '80%', size: '35%', color: '#D6DFF3', delay: '-9s' },
  ],
  tide: [
    { x: '25%', y: '35%', size: '65%', color: '#35548F' },
    { x: '75%', y: '60%', size: '60%', color: '#9DB1E0', delay: '-6s' },
  ],
  ember: [
    { x: '50%', y: '85%', size: '80%', color: '#6F8CCB' },
    { x: '80%', y: '15%', size: '45%', color: '#9DB1E0', delay: '-3s' },
    { x: '10%', y: '20%', size: '40%', color: '#16223F', delay: '-7s' },
  ],
  mist: [
    { x: '70%', y: '40%', size: '75%', color: '#9DB1E0' },
    { x: '20%', y: '70%', size: '50%', color: '#35548F', delay: '-5s' },
  ],
};

export type HalftonePreset = keyof typeof PRESETS;

interface HalftoneProps {
  preset?: HalftonePreset;
  shade?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Halftone({ preset = 'dawn', shade = true, className = '', children }: HalftoneProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="halftone" aria-hidden>
        {PRESETS[preset].map((g, i) => (
          <span
            key={i}
            className="halftone__glow"
            style={{
              left: `calc(${g.x} - ${g.size} / 2)`,
              top: `calc(${g.y} - ${g.size} / 2)`,
              width: g.size,
              aspectRatio: '1',
              background: `radial-gradient(circle, ${g.color} 0%, transparent 68%)`,
              animationDelay: g.delay,
            }}
          />
        ))}
        <span className="halftone__dots" />
        {shade ? <span className="halftone__shade" /> : null}
      </div>
      {children ? <div className="relative h-full">{children}</div> : null}
    </div>
  );
}
