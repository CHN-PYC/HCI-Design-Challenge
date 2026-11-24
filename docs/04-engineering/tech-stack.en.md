# Technology Stack Decision

**Language: [中文](tech-stack.md) | English**

> Status: **Undecided.** The system and module designs are complete, but the concrete framework and implementation tools have not been locked.

## Design baseline

- The system design fixes a front-end/back-end API/Repository boundary; that boundary is framework-independent.
- V1 uses a local Mock with the same contract as the future HTTP API, so the backend does not need to be completed first.
- If code implementation begins, the recommended reference stack is **React + Vite + TypeScript**, using a mobile-first PWA. This is an evaluation baseline, not a final team decision.
- A future backend should implement the `/api/v1` contract in `docs/04-engineering/system-design.en.md`, preferably as a modular monolith rather than microservices.
- See [System design](system-design.en.md) and [Module design](module-design.en.md).

## Open decisions

| Area | Candidate | Status | Rationale/constraint |
| --- | --- | --- | --- |
| Prototype format | Figma clickable prototype | Confirmed as prototype baseline | The source document requires clickable navigation |
| Runnable app | To be confirmed | Not started | Course scope and learning cost still need assessment |
| Target platform | iOS / Android / mobile Web | Undecided | V1 design uses mobile Web/PWA as its reference |
| Front-end technology | React + Vite + TypeScript (reference) | Undecided | Does not affect the system contract; team confirmation needed |
| Backend/database | REST API + logical storage (reserved) | Undecided | V1 is Mock-only; no real backend will be implemented |
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
| 2026-11-24 | Front-end/back-end contract + interchangeable Mock Adapter (design baseline, pending team confirmation) | Static-only prototype; direct third-party API use | [System design](system-design.en.md), [Module design](module-design.en.md) | Engineering documentation |
| — | Concrete front-end/back-end framework and database | React/Vite, Flutter, other | Pending team confirmation | — |
