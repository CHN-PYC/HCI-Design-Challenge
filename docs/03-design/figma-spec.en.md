# Figma Prototype Specification

**Language: [中文](figma-spec.md) | English**

## Goal

Use a clickable mobile prototype to validate the core task flows, proactive-suggestion approach, and user control. The prototype should show external data in realistic interface states but does not need to implement underlying capabilities.

## Current baseline

- Seven archived screens: F01–F06 and F03b.
- Design file and static export: [`../../design/figma/README.en.md`](../../design/figma/README.en.md), [`../../design/exports/2026-11-24-nutripal/README.en.md`](../../design/exports/2026-11-24-nutripal/README.en.md).
- Engineering contracts: [System design](../04-engineering/system-design.en.md), [Module design](../04-engineering/module-design.en.md).
- Figma remains the visual source of truth; accent colours in the HTML export are approximations.

## Current delivery requirements

### Required

- A unified visual language and component specification.
- Clickable screen flows for core tasks, with buttons connected to real target screens.
- Screens corresponding to the first-round core features, without unvalidated extra features.
- Clear annotation of external API dependencies such as location, weather, and recipes.
- Proactive-suggestion states and controls for accepting, postponing, rejecting, or dismissing them, if research supports this direction.
- Required entry points for notifications, permissions, and privacy settings; their exact scope still needs research validation.

### Not required

- Real calls to GPS, weather, or recipe APIs.
- Real data import or photo recognition.
- A complete backend, account system, or app-store release.

## Screen plan

> The screen structure comes from the current design. Feature priority still needs confirmation through user research.

| Frame | Screen | Purpose | Status |
| --- | --- | --- | --- |
| F01 | Dietary & Cultural Preferences | Collect cuisine, dietary, and allergen preferences | Designed; usability pending |
| F02 | Personalised Meal Recommendations | Daily nutrition summary and personalised recommendations | Designed; recommendation logic pending |
| F03 | Practical Meal Planning | Meal plan with budget and cooking-time constraints | Designed; core flow pending testing |
| F03b | Shopping List | Shopping list generated from the meal plan | Designed; budget logic pending testing |
| F04 | Context-Aware Proactive Assistance | Explain the context and reasons behind a proactive suggestion | Designed; real triggering reserved |
| F05 | Notification Control & Explanation | Suggestion toggle, snooze, frequency, and quiet hours | Designed; control policy pending validation |
| F06 | AI Food Recognition & Calorie Estimation | Recognition, portion adjustment, and logging | Designed; mock recognition only in v1 |

## Pre-delivery checklist

- [x] Developed from one shared concept with consistent visual structure and interaction.
- [ ] Every key button leads to a defined screen or a documented demo state.
- [x] The prototype distinguishes real requirements from simulated data.
- [x] Unvalidated features are not presented as a confirmed MVP.
- [ ] A team click-through review has been completed.
- [ ] At least one target user has tested the prototype and issues have been recorded.
