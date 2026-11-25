export type Language = "en" | "zh";

export const LANGUAGE_STORAGE_KEY = "nutripal.v1.language";

export function readLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "zh" ? "zh" : "en";
}

export function writeLanguage(language: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
