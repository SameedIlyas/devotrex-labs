import { ArrowUpRight } from 'lucide-react';
import { pillars } from '../data/services';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO } from '../lib/links';
import { DotWave } from './DotWave';
import { Appear, WordsIn } from './motion';
import { NAV_LINKS } from './Navbar';
import { Button, Roll } from './ui';

/* ── closing call to action + footer ──────────────────────────────
   The page closes the way it opened: the wordmark, one line and the
   two ways to reach us, with the blue dot landscape rolling beneath
   them and fading into the footer's link columns. */

export function Closing() {
  return (
    <section id="contact" className="relative isolate overflow-hidden pt-[clamp(88px,10vw,140px)]">
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <Appear y={16}>
          <img
            src="/devotrex-wordmark-navy.png"
            alt="Devotrex"
            width={1200}
            height={242}
            className="h-7 w-auto brightness-0 invert md:h-8"
          />
        </Appear>
        <h2 className="h-display mt-8 max-w-[15ch]">
          <WordsIn text="Let’s scope your first project together." />
        </h2>
        <Appear delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={BOOKING_URL} external>
            Book a scoping call
          </Button>
          <Button href={CONTACT_MAILTO} variant="dark" arrow>
            Email us
          </Button>
        </Appear>
      </div>
      <div className="fade-y -mt-10 h-[clamp(300px,36vw,480px)]" aria-hidden>
        <DotWave horizon={0.05} />
      </div>
    </section>
  );
}

const columns = [
  { title: 'Navigate', links: NAV_LINKS.map((l) => ({ name: l.name, href: l.href })) },
  { title: 'Services', links: pillars.map((p) => ({ name: p.short, href: '#services' })) },
  {
    title: 'Contact',
    links: [
      { name: 'Book a call', href: BOOKING_URL, external: true },
      { name: CONTACT_EMAIL, href: CONTACT_MAILTO },
    ],
  },
];

export function Footer() {
  return (
    <footer className="px-[clamp(16px,4vw,40px)] pt-6 pb-10">
      <div className="wrap">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <img
              src="/devotrex-wordmark-navy.png"
              alt="Devotrex"
              width={1200}
              height={242}
              className="h-6 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[30ch] text-[15px]">
              White-label engineering for boutique consultancies and agencies.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="font-sans text-[17px] font-medium tracking-[-0.02em]">{c.title}</h3>
              <ul className="m-0 mt-6 list-none space-y-3.5 p-0">
                {c.links.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="roll-host inline-flex items-center gap-1.5 text-[15.5px] text-ink-soft transition-colors hover:text-white"
                      {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <Roll>{l.name}</Roll>
                      {'external' in l && l.external ? <ArrowUpRight size={14} aria-hidden /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-2 pt-8 text-[14px] text-ink-mute md:flex-row">
          <span>© {new Date().getFullYear()} Devotrex. All rights reserved.</span>
          <span>Your brand, our engineering.</span>
        </div>
      </div>
    </footer>
  );
}
