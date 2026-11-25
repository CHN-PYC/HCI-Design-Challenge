# NutriPal Prototype

ATDD-driven React/Vite/TypeScript scaffold for the NutriPal mobile-first PWA prototype.

## Requirements

- Node.js 22.12 or newer; Node 24 is the local baseline
- npm 12

## Commands

```bash
npm install
npm run dev
npm test
npm run test:acceptance
npm run lint
npm run build
npm run preview
```

## Current scope

- Full-viewport application shell without simulated phone chrome or status bar
- English and Chinese interface with a persisted language switch in Me
- Consistent vector icon set throughout the interface, with no emoji glyphs
- Archived Figma screens F01–F06 and F03b implemented as one interactive prototype
- Onboarding redirect for new users
- F01 preference capture and Me edit mode with local Mock persistence
- F02 recommendations with switchable picks and expandable discovery
- F03 meal plan with day selection, pantry editing, swaps and regeneration
- F03b shopping checklist, budget summary, sharing hand-off and order demo
- F04 contextual nudge preview with alternate ideas and dismissal
- F05 interactive nudge settings and recent-nudge explanation
- F06 scan result with working portion calculations and log-return flow
- Installable Web App Manifest and production offline shell

Production builds accept a subpath through `VITE_BASE`. GitHub Pages uses `/HCI-Design-Challenge/`; the manifest, router basename and service-worker scope follow that value.

The current data layer is a local storage Mock. It is deliberately isolated behind `src/data/profile-repository.ts` so it can be replaced by the `/api/v1` contract later.

## Structure

- `src/app`: routing, onboarding guard, app shell and profile context
- `src/pages`: screen-level modules
- `src/domain`: domain types
- `src/data`: local Mock repositories
- `src/acceptance`: ATDD acceptance tests
- `src/test`: test environment setup

## ATDD rule

Before implementing the next behavior:

1. Add one acceptance assertion under `src/acceptance/`.
2. Run it and confirm it fails for the expected missing behavior.
3. Add the minimum implementation.
4. Re-run the acceptance suite, lint and build.

See `docs/04-engineering/atdd.md` for the current acceptance baseline and manual hand-off boundaries.
