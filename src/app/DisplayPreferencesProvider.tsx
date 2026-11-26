import { useEffect, useState, type PropsWithChildren } from "react";
import {
  readDisplayPreferences,
  writeDisplayPreferences,
} from "../data/display-preference-repository";
import type { TextSize } from "../domain/display-preferences";
import { DisplayContext } from "./display-context";

export function DisplayPreferencesProvider({ children }: PropsWithChildren) {
  const [textSize, setTextSizeState] = useState<TextSize>(
    () => readDisplayPreferences().textSize,
  );

  function setTextSize(next: TextSize) {
    writeDisplayPreferences({ textSize: next });
    setTextSizeState(next);
  }

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize;
  }, [textSize]);

  return (
    <DisplayContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </DisplayContext.Provider>
  );
}

