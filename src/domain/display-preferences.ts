export type TextSize = "default" | "large";

export interface DisplayPreferences {
  textSize: TextSize;
}

export const DEFAULT_DISPLAY_PREFERENCES: DisplayPreferences = {
  textSize: "default",
};

