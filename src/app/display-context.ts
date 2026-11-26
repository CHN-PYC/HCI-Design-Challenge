import { createContext, useContext } from "react";
import type { TextSize } from "../domain/display-preferences";

export interface DisplayContextValue {
  textSize: TextSize;
  setTextSize: (textSize: TextSize) => void;
}

export const DisplayContext = createContext<DisplayContextValue | null>(null);

export function useDisplayPreferences() {
  const context = useContext(DisplayContext);

  if (!context) {
    throw new Error(
      "useDisplayPreferences must be used inside DisplayPreferencesProvider",
    );
  }

  return context;
}

