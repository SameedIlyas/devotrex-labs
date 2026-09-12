# Devotrex Labs — labs.devotrex.com

One-page site for Devotrex Labs, the white-label engineering arm of Devotrex.
It uses the same Agencee design system as devotrex.com (`../website`), and the
tokens and primitives are copied from there, so keep them in sync:

| Here | Source on the main site |
| --- | --- |
| `src/index.css` (`@theme`) | `website/src/index.css` |
| `src/styles/agencee.css` | `website/src/styles/agencee.css` + AGENCEE LAYER tokens |
| `src/components/agencee/*` | `website/src/components/agencee/*` |

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

1. Create a new Vercel project from this folder (framework preset: Vite).
2. Under Project → Settings → Domains, add `labs.devotrex.com`.
3. At your DNS provider, add a `CNAME` record: `labs` → `cname.vercel-dns.com`.

The main site links here from its Company menu and footer, and
`devotrex.com/labs` redirects here (`website/vercel.json`).
