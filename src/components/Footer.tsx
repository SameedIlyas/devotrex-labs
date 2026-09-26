import { ArrowUpRight } from 'lucide-react';
import { Appear } from './motion';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/links';

/* ── footer ───────────────────────────────────────────────────────
   On the closing navy field: a row of outbound links, a row of section
   links, then the colophon with an oversized fading wordmark. */

const outbound = [
  { name: 'Book a call', href: BOOKING_URL },
  { name: CONTACT_EMAIL, href: CONTACT_MAILTO, internal: true },
];

const sections = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Catalogue', href: '#catalogue' },
  { name: 'Stack', href: '#stack' },
  { name: 'Engagement', href: '#engagement' },
];

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="px-[clamp(16px,4vw,40px)] pb-8 text-white">
      <div className="wrap-wide">
        <ul className="m-0 flex list-none flex-wrap justify-between gap-x-8 gap-y-4 border-b border-white/15 p-0 pb-8">
          {outbound.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                className="group inline-flex items-center gap-2 text-[17px] font-medium text-white/90 hover:text-white"
                {...(l.internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {l.name}
                <ArrowUpRight size={15} className="text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label="Footer" className="flex flex-wrap justify-between gap-x-8 gap-y-3 pt-8">
          {sections.map((l) => (
            <a key={l.href} href={l.href} className="text-[16px] text-white/70 transition-colors hover:text-white">
              {l.name}
            </a>
          ))}
        </nav>

        <Appear y={30} className="mt-20">
          <div
            className="bg-gradient-to-b from-white/70 to-white/0 bg-clip-text text-center text-[clamp(3.4rem,15vw,12rem)] leading-[0.9] font-semibold tracking-[-0.07em] whitespace-nowrap text-transparent select-none"
            aria-hidden
          >
            devotrex
          </div>
        </Appear>
        <div className="mt-6 flex flex-col justify-between gap-2 text-[14px] text-white/55 md:flex-row">
          <span>© {new Date().getFullYear()} Devotrex · All rights reserved.</span>
          <span>White-label by default. Your brand, our engineering.</span>
        </div>
      </div>
    </footer>
  );
}
