# Project Reference — Big Invisible (starter from CLAUDE.md)

This reference summarizes the Big Invisible codebase and important developer guidance. It builds on `CLAUDE.md` and the repository files to give a quick, actionable overview for contributors and future reference.

---

## Snapshot
- Purpose: Brand architecture studio website — translate complex brand systems into clarity.
- Stack: Astro (SSR) + React + TypeScript + Tailwind CSS + Vite
- Deployment: Vercel (server output via @astrojs/vercel)
- Philosophy: Minimalist, professional, agency-quality design

---

## Quick start (local)
```bash
# install
npm install

# development (dev server)
npm run dev        # starts Astro dev server (project uses port in package/astro defaults; CLAUDE.md references 4321)

# lint
npm run lint

# build
npm run build

# preview production build
npm run preview
```

Note: Always run `npm run lint && npm run build` before committing or opening PRs.

Node requirement: Node >= 18.0.0 (see package.json "engines").

---

## Important npm scripts (package.json)
- lint: `eslint .`
- dev: `astro dev`
- build: `astro build`
- preview: `astro preview`

---

## Architecture & Key Files

Top-level:
- `astro.config.mjs` — Astro configuration (server output + vercel adapter).
- `package.json` — dependencies and scripts, Node engine requirement.
- `vite.config.ts` — Vite config (React plugin).
- `tailwind.config.js` — Tailwind configuration and theme extensions.
- `src/styles/globals.css` — CSS custom properties and global styles; theme variables live here and support `[data-theme="dark"]`.

Astro pages & layout:
- `src/pages/*.astro` — Route files (e.g., `index.astro`, `services.astro`, etc.)
- `src/layouts/Layout.astro` — Document head + slot wrapper for pages.
- `src/PageWrapper.tsx` — React wrapper used on pages to control theme, scroll behavior, and initialize animations. This file imports `setTheme`/`initRevealAnimations` utilities and provides `ThemeModeContext`.

React components:
- `src/components/` — Reusable components.
  - `layout` — `Header.tsx`, `Footer.tsx`, `Layout.tsx` (React layout wrapper used on client-side)
  - `ui` — Buttons, Cards, Grid, Section, SectionHeader, etc.
  - `HomePageHero` — Hero component loaded on home page.
  - `ThemeModeContext.tsx` — React context to share theme state (isLightMode, setIsLightMode, isHomePage).

Utilities:
- `src/utils/theme.ts` — Theme helpers: `setTheme`, `getTheme`, `initTheme`, `themeColors`, `themeClasses`.
- `src/utils/animations.ts` — Reveal/animation helpers (initialized by PageWrapper).

Data:
- `src/data/services.ts` — Canonical services data array and helpers (`getServiceById`, `getOtherServices`).
- `src/data/*` — Additional data sources (statistics, case studies, projects, etc.)

Styles & design system:
- Tailwind + CSS modules used across components.
- Theme uses CSS custom properties (RGB triplets) in `globals.css` and switches light/dark via `document.documentElement` attribute `data-theme`.
- Tailwind config references theme-aware CSS variables (e.g., `primary`, `bg-primary`) and includes design tokens like fonts, sizes, spacing, and custom animations.

---

## Theming behavior (how it works)
- `PageWrapper.tsx` decides light/dark mode based on route and scroll position:
  - Home page (`/`), service pages (`/services/*`), and stat detail pages use scroll thresholds to toggle theme between dark and light.
  - Other pages default to light theme.
- Theme toggling is implemented by `setTheme('light'|'dark')` which sets/removes `data-theme` on `<html>` and stores the choice in `localStorage`.

---

## Common development tasks & where to make changes

- Add a new page (route):
  - Create `src/pages/<slug>.astro`
  - Add client UI in `src/pages-content` if you want shareable React components
  - Update any navigation in `src/components/layout/Header.tsx` as needed

- Add a service:
  1. Add an entry in `src/data/services.ts` following the existing `Service` shape
  2. Add content / template under `src/pages/services/` if a detailed service page is needed
  3. Update any listings/components that render services (e.g., `ServiceCard`, `Services` page)

- Update a component:
  - Check `src/components/ui/` first and follow patterns (props, variants, padding tokens).
  - Prefer Tailwind utility classes and design tokens; avoid one-off CSS.

- Add case study:
  - Update `src/data/caseStudies.ts` and create an associated page or component.

---

## Conventions & guidelines

DO:
- Test both light and dark themes during development.
- Use TypeScript interfaces and follow existing component patterns.
- Mobile-first responsive design.
- Prefer Tailwind utility classes and design tokens; use CSS Modules only when necessary.
- Run `npm run lint && npm run build` before committing.

DON'T:
- Add unnecessary dependencies.
- Leave console.log statements in committed code.
- Use vague naming or create one-off styles that bypass the design tokens.
- Use corporate buzzwords in copy (see CLAUDE.md for voice guide).

---

## Deployment
- Uses `@astrojs/vercel` adapter and SSR output (`output: 'server'`) in `astro.config.mjs`.
- Deploy to Vercel for serverless SSR. Ensure environment variables and build settings are configured in Vercel dashboard when needed.

---

## Testing & QA
- Lint: `npm run lint` (eslint)
- Build: `npm run build` (Astro builds + Vite)
- Preview production locally: `npm run preview` after `npm run build`
- Visual checks: test breakpoints and theme toggling; verify hero animations and lazy-loaded assets.

---

## Notes on 3D & heavy assets
- Project references Babylon.js (`@babylonjs/*`) — these are used for 3D graphics features. Lazy-load heavy 3D components and video assets, and prefer client-only loading (use client directives in Astro or dynamic import in React).

---

## Where to start when joining the repo
1. Read `CLAUDE.md` (design & voice guidance) + `README.md` for broad context.
2. Run `npm install` and `npm run dev`.
3. Explore `src/pages/index.astro`, `src/PageWrapper.tsx`, and `src/components/HomePageHero` to understand the home flow.
4. Inspect `src/data/services.ts` to see canonical data shapes used across the site.
5. Check `src/styles/globals.css` and `tailwind.config.js` for design tokens and theme rules.

---

## Adding an OpenAI / third-party API test (suggested approach)
If you want a place to add a minimal test integration for OpenAI (or any external API), consider:
- Create a serverless endpoint (Vercel function) under `src/pages/api/openai.ts` or `src/pages/api/openai.js` (Astro supports server endpoints for SSR adapter).
- Add a small client page `src/pages/openai.astro` or `src/pages-content/OpenAiTest.tsx` that calls the endpoint.
- Environment variable: store the key as `OPENAI_API_KEY` in Vercel and locally in `.env` (not committed).

Minimal server snippet (example idea only — implement in code when ready):
```ts
// src/pages/api/openai.ts (server-only)
import type { APIRoute } from 'astro';
export const post: APIRoute = async ({ request }) => {
  // read request body, call OpenAI with server side key, return result
};
```

Client calls `fetch('/api/openai', { method: 'POST', body: JSON.stringify({ prompt }) })`.

---

## Useful file map (high level)
- src/pages/*.astro — top-level routes
- src/pages-content/* — react page components used inside astro pages
- src/components/* — UI & layout components
- src/layouts/Layout.astro — head template + slot
- src/PageWrapper.tsx — theme & animations init; wraps page children
- src/styles/globals.css — theme variables, global CSS
- src/data/* — site data (services, statistics, caseStudies)
- src/utils/* — theme + animation utilities
- tailwind.config.js — tailwind design tokens

---

## Final notes
This file is intended as a living reference. Use it to onboard, scaffold new pages or services, and follow the established patterns for theming and styling. For copy voice, CTA phrasing, and writing rules, see `CLAUDE.md`.

If you want, I can:
- Create a `/docs` folder and move this file there, or
- Add an example OpenAI endpoint + minimal UI to test integration (I can implement that once you toggle to Act mode).

This reference was generated from repository files (`CLAUDE.md`, `README.md`, `package.json`, `astro.config.mjs`, `src/*`) and summarized for quick developer consumption.
