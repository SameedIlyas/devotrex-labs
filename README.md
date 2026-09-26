# Devotrex — devotrex.com

One-page site for Devotrex, the white-label engineering partner for boutique
consultancies and agencies. React 19 + Vite + Tailwind v4 + framer-motion.

## Structure

| Path | What it holds |
| --- | --- |
| `src/index.css` | Brand tokens (`@theme`): navy, accent blue, ink, Geist |
| `src/styles/site.css` | Layout, buttons, cards, dark tiles, sheen gradient |
| `src/components/motion.tsx` | Shared animations: entrances, word reveals, scroll-lit text, marquee |
| `src/components/ui.tsx` | Section header, buttons, arrow link |
| `src/sections/` | One file per page section, in page order in `src/App.tsx` |

## Content

All copy lives in `src/data/`:

- `services.ts`: the 4 pillars and 15 services
- `company.ts`: positioning, engagement models, process and tech stack

This is the **public** version of `devotrex-labs-internal-catalogue.html`. It
leaves out, on purpose, prices, the hourly rate card, competitor notes, the
document checklist, external reference links and the internal pitch scripts.
Keep those out of this repo.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
```

## Deploy (Vercel)

1. Create a Vercel project from this folder (framework preset: Vite).
2. Under Project → Settings → Domains, add `devotrex.com` (and `www.devotrex.com`).
3. At your DNS provider, point the apex `A` record at Vercel (`76.76.21.21`) and
   `www` as a `CNAME` to `cname.vercel-dns.com`.
