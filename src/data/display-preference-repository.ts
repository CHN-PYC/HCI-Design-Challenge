import {
  DEFAULT_DISPLAY_PREFERENCES,
  type DisplayPreferences,
  type TextSize,
} from "../domain/display-preferences";

export const DISPLAY_PREFERENCES_STORAGE_KEY = "nutripal.v1.display";

function isTextSize(value: unknown): value is TextSize {
  return value === "default" || value === "large";
}

export function readDisplayPreferences(): DisplayPreferences {
  const stored = localStorage.getItem(DISPLAY_PREFERENCES_STORAGE_KEY);

  if (stored) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (
        parsed &&
        typeof parsed === "object" &&
        isTextSize((parsed as Partial<DisplayPreferences>).textSize)
      ) {
        return { textSize: (parsed as DisplayPreferences).textSize };
      }
    } catch {
      localStorage.removeItem(DISPLAY_PREFERENCES_STORAGE_KEY);
    }
  }

  return DEFAULT_DISPLAY_PREFERENCES;
}

export function writeDisplayPreferences(preferences: DisplayPreferences) {
  localStorage.setItem(
    DISPLAY_PREFERENCES_STORAGE_KEY,
    JSON.stringify(preferences),
  );
}

