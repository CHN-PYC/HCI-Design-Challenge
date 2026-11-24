# Engineering

**Language: [中文](README.md) | English**

## Current status

The **system design → module design** engineering baseline is complete, but the final technology stack has not been selected, no application code has been created, and no backend has been implemented. The design documents cover the seven Figma screens and use a front-end/back-end contract with interchangeable Mock Adapters.

## Design order

1. [System design](system-design.en.md): boundaries, architecture, domain model, API contract, security, and non-functional constraints.
2. [Module design](module-design.en.md): routes, module responsibilities, state, repository interfaces, error handling, and acceptance scenarios.

System design precedes module design. The module document must not introduce a data owner or external dependency that the system design has not defined.

## Established boundaries

- The first version is a mobile-first Web/PWA reference design, using 390px as the design baseline.
- The front end obtains domain data only through Repositories/API Clients; UI code must not directly call third-party APIs or browser storage.
- The backend is reserved as a modular monolith with an `/api/v1` API prefix; no server is implemented at this stage.
- Mock and future real APIs share the same request, response, error, and timeout contracts.
- Real notifications, GPS, and image recognition for F04, F05, and F06 are reserved through Provider interfaces; v1 uses simulations.
- Health, location, dietary, and preference data must be minimised; raw images and precise tracking data must not be persisted.
- V1 has no login, cloud sync, payment, or real delivery.

## Files

- [System design](system-design.en.md)
- [Module design](module-design.en.md)
- [API candidate inventory](api-inventory.en.md)
- [Technology-stack decision log](tech-stack.en.md)

## Undecided

- App platform and target devices
- Front-end, back-end, and data-storage technologies
- Whether a runnable prototype is needed beyond Figma
- Third-party API substitutions and fallback strategies
- Version control, branching, review, and task-collaboration conventions

React + Vite + TypeScript is only a reference implementation mentioned in the module design; it is not a final decision.
