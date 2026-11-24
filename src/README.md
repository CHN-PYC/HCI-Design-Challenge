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

> This is an engineering scaffold, not a finished UI restoration. F03–F06 are currently placeholders; see `docs/03-design/figma-implementation-audit.md`.

- Application shell and primary navigation
- Onboarding redirect for new users
- F01 preference capture with local Mock persistence
- F02 home summary and a recommendation preview
- F03 meal-plan content restored from the selected Figma node, with interactive day selection
- Route placeholders for Shopping List, Scan, Nudge settings and the F04 nudge preview
- Installable Web App Manifest and production offline shell

The PWA paths currently assume deployment at the domain root. If the final host uses a subpath, update Vite `base`, manifest URLs and the service-worker registration together before release.

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
