# Technology Stack Decision

**Language: [中文](tech-stack.md) | English**

> Status: **Partially decided.** The third meeting confirmed front-end/back-end separation, TypeScript + component-based front-end development, and reserved backend interfaces. The concrete framework and database are not yet locked.

## Design baseline

- The system design fixes a front-end/back-end API/Repository boundary; that boundary is framework-independent.
- The third meeting confirmed that the front end uses TypeScript + front-end components, and that the backend is not implemented yet but its interfaces must be reserved.
- V1 uses a local Mock with the same contract as the future HTTP API, so the backend does not need to be completed first.
- If code implementation begins, the recommended reference stack is **React + Vite + TypeScript**, using a mobile-first PWA. This is an evaluation baseline, not a final team decision.
- A future backend should implement the `/api/v1` contract in `docs/04-engineering/system-design.en.md`, preferably as a modular monolith rather than microservices.
- See [System design](system-design.en.md) and [Module design](module-design.en.md).

## Open decisions

| Area | Candidate | Status | Rationale/constraint |
| --- | --- | --- | --- |
| Prototype format | Figma clickable prototype | Confirmed as prototype baseline | The source document requires clickable navigation |
| Runnable app | Front-end prototype/implementation (scope to confirm) | Partially confirmed | The third meeting assigned prototype development, but the “runnable” acceptance scope is not explicit |
| Target platform | iOS / Android / mobile Web | Undecided | V1 design uses mobile Web/PWA as its reference |
| Front-end technology | TypeScript + front-end components; React + Vite as reference | Partially decided | TypeScript and componentisation confirmed; framework still undecided |
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
| — | Concrete front-end/back-end framework and database | React/Vite, Flutter, other | Pending team confirmation | — |
