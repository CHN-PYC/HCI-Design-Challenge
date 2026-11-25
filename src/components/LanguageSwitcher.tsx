import { useI18n } from "../i18n/useI18n";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      aria-label={t("Language", "语言")}
      className="language-switch"
      role="group"
    >
      <button
        aria-label="English"
        aria-pressed={language === "en"}
        className={language === "en" ? "on" : ""}
        onClick={() => setLanguage("en")}
        type="button"
      >
        EN
      </button>
      <button
        aria-pressed={language === "zh"}
        className={language === "zh" ? "on" : ""}
        onClick={() => setLanguage("zh")}
        type="button"
      >
        中文
      </button>
    </div>
  );
}
