# NutriPal ATDD Prototype Scaffold

**Language: [中文](atdd.md) | English**

> - Status: scaffold complete; automated acceptance checks pass.
> - Date: 2026-11-24
> - Stack: React 19 + Vite 8 + TypeScript 5.9 + Vitest + Testing Library

## 1. Acceptance Scope

| ID | User behaviour | Acceptance condition |
| --- | --- | --- |
| AC-01 | A new user opens `/home` | Redirect to F01 preferences; primary navigation is hidden |
| AC-02 | User selects preferences and clicks Continue | Preferences persist to the local Mock; F02 opens with primary navigation |
| AC-03 | An onboarded user uses bottom navigation | Plan, Shopping List, Scan, Nudges and Me are reachable |
| AC-04 | An onboarded user opens `/nudges/preview` | F04 proactive-preview state appears without primary navigation |

Automated acceptance file: [`src/acceptance/app.acceptance.test.tsx`](../../src/acceptance/app.acceptance.test.tsx).

## 2. RED → GREEN Log

1. AC-01 first failed because `AppRouter` did not exist; a minimal router and onboarding guard made it pass.
2. AC-02 first failed because F01 had no Cuisine/Diet controls; preference selection and local persistence made it pass.
3. AC-03 first failed because `/plan` and the other routes were missing; page shells and navigation made it pass.
4. AC-04 first failed because the F04 route was missing; the preview page made it pass.

## 3. Scaffold Contents

- React/Vite/TypeScript project, lockfile and Node requirement.
- Routes, onboarding guard, shared App Shell and bottom navigation.
- F01 preference selection and `localStorage` Mock persistence.
- F02 nutrition summary and one recommendation-card example.
- Accessible page shells for F03, F03b, F04, F05 and F06.
- Vitest + Testing Library acceptance-test environment.
- Web App Manifest, 192/512 icons, Apple touch icon and an offline-shell Service Worker.
- ESLint, TypeScript checks, production build and CI.

## 4. Verification Commands

```bash
npm test
npm run lint
npm run build
```

## 5. Next ATDD Cycles

1. F01 edit mode returns to the source page.
2. F02 See all expands recommendations.
3. F03 meal plan viewing and swapping.
4. F03b shopping-list generation and persisted checks.
5. F05 persisted settings and quiet-hours precedence.
6. F04 simulated proactive nudge.
7. F06 portion adjustment and daily log.

## 6. Confirmed Implementation Baselines

- **Visuals and copy:** use the [Figma seven-screen archive](../../design/exports/2026-11-24-nutripal/README.en.md) as the sole prototype baseline, including its page structure, copy and approximate visual tokens; do not wait for another asset-approval round.
- **Images and brand:** reuse the archive’s emoji, placeholder imagery and `NutriPal` name; use provisional same-palette icons where the archive has no dedicated asset and keep them replaceable.
- **Backend:** use only local Mock data and reserved Repository/API contracts during the prototype phase; do not wait for login, a database, API keys or third-party authorisation.
- **Permissions and privacy:** follow common mobile/Web practice by requesting permission only after a user action, explaining the purpose first, and handling denial and service failure. The prototype does not request real camera, location or notification permissions or use sensitive real data.
- **Research and MVP:** implement the Figma hypotheses and label them as assumptions; never describe Mock results as validated findings or medical advice.
- **PWA:** include a manifest, app icons, theme colours and an offline shell that can be installed/previewed locally. Binding a production domain and deployment account remains an owner-level release action.

## 7. Remaining Manual Release Steps

- Connect the production domain and deployment account; local PWA preview and CI do not depend on this.
- If real third-party services replace Mock later, provide the relevant API credentials and authorisation.
