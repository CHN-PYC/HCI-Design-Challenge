# API and Data Capability Inventory

**Language: [中文](api-inventory.md) | English**

> All statuses are “candidate / to be validated”. These capabilities must not be treated as required MVP features until user research confirms the need.

The authoritative API shapes, error codes, and DTOs are in the [System Design](system-design.en.md#6-api-contract). This file records external capabilities and adapter boundaries without duplicating response fields.

| ID | Capability | Data/dependency | Purpose | Main constraint | Prototype handling | Contract/adapter | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| API-01 | Location | Device GPS/location services | Infer coarse location, nearby places, country, or region | Background location is restricted; permission required; privacy-sensitive | Use a fixed coarse location | Context input → `GET /nudges/next` | Reserved |
| API-02 | Weather | Open-Meteo or equivalent | Support outdoor-activity or food suggestions with weather/forecast data | Service availability, regional coverage, rate limits | Fixed JSON fixture | `WeatherProvider` | To be validated |
| API-03 | Local notifications | iOS, Android, or Web notification systems | Deliver proactive suggestions without opening the app | Notification permission, background execution, interruption risk | F04 preview; no real permission request | `NotificationScheduler` | Mock |
| API-04 | User preferences | Local settings/database | Health goals, dietary preferences, and reminder settings | Data minimisation, cross-device consistency, deletion controls | Local Mock persistence | `PUT /profile/preferences`, `GET/PATCH /nudge-settings` | Baseline |
| API-05 | Recipe data | TheMealDB or equivalent | Recommend recipes using cuisine, budget, and meal-time constraints | API terms, cost, rate limits, incomplete nutrition/allergen data | Fixed recipe fixture | `RecipeProvider`, `GET /recommendations` | Mock |
| API-06 | Photo recognition | Device camera/image-recognition service | Recognise food and estimate calories (candidate) | Not implemented in the first prototype; accuracy, privacy, and ethical risks are high | Mock recognised dish and portion | `FoodRecognitionProvider`, `POST /food-scans` | Mock |

## Verification fields for every API

- Official documentation link and access date
- Authentication method, cost, and rate limits
- Data fields and regional coverage
- Whether health-related errors or inaccuracies may occur
- Privacy terms and data-retention policy
- Degraded experience when the service fails or is offline
