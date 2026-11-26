# Figma Prototype Specification

**Language: [中文](figma-spec.md) | English**

## Goal

Use a clickable mobile web prototype to validate the core task flows, proactive-suggestion approach and user control. The prototype also demonstrates F02 dish search, the Me settings hub and a global large-text mode. It does not need to implement the underlying third-party capabilities.

## Current baseline (2026-11-25)

- Visual source of truth: Figma NutriPal – Healthy Eating App (Copy), file key QHOOV8NcB4Ev499ycoRtZq.
- Eight screens: F01–F06, F03b and Me; every screen has a default and large-text variant, giving 16 frames at 390 × 844.
- Design archive: [2026-11-25 archive](../../design/exports/2026-11-25-nutripal-v2/README.en.md).
- Implementation: NutriPal v1.1; the presentation layer is redesigned while data and /api/v1 contracts remain compatible.
- Figma is the visual source of truth; implementation is not a pixel copy.

## Confirmed implementation interpretations

- **No emoji icons**: emoji in the new Figma are treated as a design-source defect. The implementation uses Lucide and FoodGlyph vector icons with readable text labels.
- **No device chrome**: no Figma 9:41 status bar, signal/battery chrome or 44px phone frame. The web prototype uses a content column of at most 390px.
- **Large text**: the Me toggle applies globally and persists; semantic type tokens increase by roughly 2px and pages scroll instead of reproducing fixed-frame clipping.
- **Me retains v1.0 information**: language, today’s targets, preference summary, nudge preview, Nudges entry and privacy note remain in addition to the Figma rows.
- **Custom avoidances**: the F01 + Add action opens a local sheet for any ingredient or allergen; no backend field is added.

## Current delivery requirements

### Required

- Unified visual tokens, components and bottom navigation.
- Clickable flows for core tasks, with buttons connected to real screens or documented sheets/demo states.
- Local F02 dish search, Try chips, empty result and clear-search states.
- F01 custom avoidance, saving and edit-mode return to Me.
- Me large-text toggle, language switch, preference and notification entries.
- Accept, postpone, dismiss and explanation controls for proactive suggestions.
- Clear separation between Mock capabilities and real API dependencies.

### Not required

- Real GPS, weather, recipe, notification or camera permissions.
- Real image recognition, backend, accounts or store release.
- Figma status bar, device frame or pixel-identical emoji.

## Screen plan

| Frame | Screen | Purpose | Current implementation |
| --- | --- | --- | --- |
| F01 | Dietary & Cultural Preferences | Cuisine, diet style, allergen/avoidance and custom add | Implemented, including edit mode |
| F02 | Personalised Meal Recommendations | Nutrition summary, search, recommendations and See all | Implemented with local search |
| F03 | Practical Meal Planning | Weekly plan, budget, cook time, pantry and shopping entry | Implemented with day/swap/edit/regenerate |
| F03b | Shopping List | Items, budget, pantry, check-off and share | Implemented, with delivery demo |
| F04 | Context-Aware Proactive Assistance | Lock-screen suggestion and context explanation | Implemented with gradient and all actions |
| F05 | Notification Control & Explanation | Master toggle, snooze, frequency, categories, explanation and feedback | Implemented |
| F06 | AI Food Recognition & Calorie Estimation | Simulated recognition, portion, nutrition and log | Implemented with Mock recognition |
| Me | Profile & Settings | Profile, preferences, notifications, language and large text | Implemented while retaining v1.0 content |

## Pre-delivery checklist

- [x] All eight screens have routes and reachable entry points.
- [x] Both default and large-text states work.
- [x] Key buttons lead to real screens, sheets or documented demo states.
- [x] Mock data and real capabilities are clearly distinguished.
- [x] No emoji icons and no simulated device chrome.
- [ ] Complete a team click-through review.
- [ ] Test with at least one target user and record issues.

