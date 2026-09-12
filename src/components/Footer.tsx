import { pillars } from '../data/services';
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_MAILTO, MAIN_SITE_URL } from '../lib/links';
import { LabsLockup } from './Navbar';

/* ── footer ───────────────────────────────────────────────────────
   The main site's light colophon: small caps column heads over a
   dotted rule, underlined links. The last column points back to
   devotrex.com so the two properties link both ways. */

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

const columns: readonly { title: string; links: readonly FooterLink[] }[] = [
  {
    title: 'Services',
    links: pillars.map((p) => ({ name: p.short, href: `#${p.id}` })),
  },
  {
    title: 'Working with us',
    links: [
      { name: 'Engagement models', href: '#engagement' },
      { name: 'How we work', href: '#process' },
      { name: 'Tech stack', href: '#stack' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { name: 'Book a scoping call', href: BOOKING_URL, external: true },
      { name: CONTACT_EMAIL, href: CONTACT_MAILTO },
    ],
  },
  {
    title: 'Devotrex',
    links: [{ name: 'devotrex.com ↗', href: MAIN_SITE_URL }],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-paper text-ink-soft">
      <div className="mx-auto max-w-[calc(1200px+2*clamp(20px,4vw,40px))] px-[clamp(20px,4vw,40px)] pt-4 pb-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,3fr)] lg:gap-16">
          <div>
            <div className="mb-5">
              <LabsLockup size="lg" />
            </div>
            <p className="text-[17px] leading-[1.5] font-medium text-ink">The team behind your delivery.</p>
            <p className="mt-3 max-w-[38ch] text-[13.5px] leading-relaxed text-ink-soft">
              White-label AI, automation and software engineering for boutique consultancies and
              agencies. The engineering arm of Devotrex.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-semibold tracking-[0.09em] uppercase text-ink">{col.title}</div>
                <hr className="ag-dotted mt-3 mb-4" />
                <ul className="m-0 list-none space-y-2.5 p-0">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="text-[13.5px] break-words text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
                        {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="ag-dotted mt-14" />
        <div className="flex flex-col justify-between gap-3 pt-6 text-[12px] text-ink-faint md:flex-row">
          <span>© {new Date().getFullYear()} Devotrex Labs · All rights reserved.</span>
          <span>White-label by default. Your brand, your client, our engineering.</span>
        </div>
      </div>
    </footer>
  );
}
