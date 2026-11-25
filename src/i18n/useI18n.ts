import { useContext } from "react";
import { LanguageContext } from "./language-context";

export function useI18n() {
  const value = useContext(LanguageContext);

  if (!value) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return {
    ...value,
    isChinese: value.language === "zh",
    t: (english: string, chinese: string) =>
      value.language === "zh" ? chinese : english,
  };
}
