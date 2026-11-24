# Technology Stack Decision

**Language: [中文](tech-stack.md) | English**

> Status: **Front end decided; backend pending.** The third meeting confirmed front-end/back-end separation, TypeScript + component-based front-end development, and reserved backend interfaces. The ATDD scaffold now uses React + Vite.

## Design baseline

- The system design fixes a front-end/back-end API/Repository boundary; that boundary is framework-independent.
- The third meeting confirmed that the front end uses TypeScript + front-end components, and that the backend is not implemented yet but its interfaces must be reserved.
- V1 uses a local Mock with the same contract as the future HTTP API, so the backend does not need to be completed first.
- The current scaffold uses **React 19 + Vite 8 + TypeScript 5.9** as a mobile-first PWA, with Vitest + Testing Library for ATDD.
- A future backend should implement the `/api/v1` contract in `docs/04-engineering/system-design.en.md`, preferably as a modular monolith rather than microservices.
- See [System design](system-design.en.md) and [Module design](module-design.en.md).

## Open decisions

| Area | Candidate | Status | Rationale/constraint |
| --- | --- | --- | --- |
| Prototype format | Figma clickable prototype | Confirmed as prototype baseline | The source document requires clickable navigation |
| Runnable app | Mobile Web/PWA prototype | Started | The ATDD scaffold runs; real business scope still needs research |
| Target platform | Mobile Web/PWA | Used by the scaffold | Native iOS/Android are outside this implementation round |
| Front-end technology | React 19 + Vite 8 + TypeScript 5.9 | Decided for scaffold | Satisfies TypeScript + componentisation; framework may still change after review |
| Backend/database | Front-end/back-end separation; reserved backend interfaces | Partially decided | Backend not implemented yet; REST/database selection undecided |
| Notification approach | LocalNotificationScheduler (Mock) | Reserved | Real permissions and background behaviour require separate design |
| Charts/data visualisation | Undecided | To be researched | Add only after relevant research confirms the need |

## Selection criteria

1. The team can complete and maintain it within the course timeframe.
2. It validates core interactions without sacrificing design quality for a technical demo.
3. It supports necessary platform capabilities such as notifications with explicit permission handling.
4. It supports minimum health-data collection and deletion/opt-out controls.
5. It still provides a presentable degraded experience when external APIs fail.

## Decision log

| Date | Decision | Alternatives | Evidence | Owner |
| --- | --- | --- | --- | --- |
| Third meeting (date not recorded) | Use the existing UI/UX; separate front end/backend; TypeScript + front-end components; reserve backend interfaces | Alternative UI; static-only; no separation | [Third meeting record](../06-meetings/meeting-03-planning.md) | Team |
| 2026-11-24 | Front-end/back-end contract + interchangeable Mock Adapter | Static-only prototype; direct third-party API use | [System design](system-design.en.md), [Module design](module-design.en.md) | Engineering documentation |
| 2026-11-24 | React 19 + Vite 8 + TypeScript 5.9 + Vitest scaffold | React, other frameworks; Figma-only | [ATDD scaffold](atdd.en.md), `src/` | Engineering documentation |
| — | Backend framework and database | Modular monolith, other | Pending team confirmation | — |
