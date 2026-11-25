import { useEffect, useState, type PropsWithChildren } from "react";
import {
  readLanguage,
  writeLanguage,
  type Language,
} from "./language";
import { LanguageContext } from "./language-context";

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(readLanguage);

  function setLanguage(next: Language) {
    writeLanguage(next);
    setLanguageState(next);
  }

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
