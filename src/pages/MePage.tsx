import { Link } from "react-router-dom";
import { Bell, Globe2, LockKeyhole, Sparkles, UserRound } from "lucide-react";
import { useProfile } from "../app/profile-context";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useI18n } from "../i18n/useI18n";

const preferenceLabels: Record<string, string> = {
  Chinese: "中式",
  Indian: "印度",
  Italian: "意式",
  Japanese: "日式",
  Mexican: "墨西哥",
  "Mediterr.": "地中海",
  British: "英式",
  Korean: "韩式",
  Vegetarian: "素食",
  Vegan: "纯素",
  Pescatarian: "鱼素",
  Halal: "清真",
  "Low-carb": "低碳水",
  "High-protein": "高蛋白",
  "No preference": "无偏好",
  Nuts: "坚果",
  Dairy: "乳制品",
  Gluten: "麸质",
  Shellfish: "贝类",
  Pork: "猪肉",
};

export function MePage() {
  const { profile } = useProfile();
  const { isChinese, t } = useI18n();
  const preferences = profile.preferences;
  const localize = (value: string) =>
    isChinese ? (preferenceLabels[value] ?? value) : value;

  return (
    <main className="me-page page">
      <header className="me-header">
        <div>
          <h1>{t("Me", "我")}</h1>
          <p>{t("Your tastes, goals and settings in one place.", "你的口味、目标和设置都在这里。")}</p>
        </div>
      </header>

      <section className="profile-banner" aria-label={t("Profile summary", "个人资料概览")}>
        <span aria-hidden="true" className="profile-avatar">
          <UserRound size={29} />
        </span>
        <div>
          <h2>{profile.displayName}</h2>
          <p>{t("NutriPal prototype profile", "NutriPal 原型档案")}</p>
        </div>
        <span className="profile-badge">{t("Local", "本地")}</span>
      </section>

      <section aria-labelledby="goal-heading">
        <div className="section-bar section-bar--tight">
          <h2 id="goal-heading">{t("Today’s targets", "今日目标")}</h2>
        </div>
        <div className="goal-grid">
          <div className="goal-card goal-card--kcal">
            <strong>{profile.healthTargets.dailyCalories.toLocaleString("en-GB")}</strong>
            <span>{t("kcal / day", "千卡 / 天")}</span>
          </div>
          <div className="goal-card goal-card--protein">
            <strong>{profile.healthTargets.proteinTargetG}g</strong>
            <span>{t("protein", "蛋白质")}</span>
          </div>
          <div className="goal-card goal-card--budget">
            <strong>£{profile.healthTargets.weeklyBudget}</strong>
            <span>{t("food / week", "食材 / 周")}</span>
          </div>
        </div>
      </section>

      <section
        aria-label={t("Language settings", "语言设置")}
        className="language-card"
      >
        <span aria-hidden="true" className="me-link-icon">
          <Globe2 size={21} />
        </span>
        <div className="language-copy">
          <strong>{t("Language", "语言")}</strong>
          <small>{t("Choose the app language", "选择应用显示语言")}</small>
        </div>
        <LanguageSwitcher />
      </section>

      <section className="me-card">
        <div className="me-card-heading">
          <div>
            <h2>{t("Food preferences", "饮食偏好")}</h2>
            <p>{t("Used to personalise every recommendation.", "用于个性化每一条推荐。")}</p>
          </div>
          <Link className="text-link" to="/preferences?mode=edit">
            {t("Edit", "编辑")}
          </Link>
        </div>
        <div className="preference-summary">
          <Group
            emptyLabel={t("Not set yet", "尚未设置")}
            label={t("Cuisines", "菜系")}
            values={preferences.cuisines.map(localize)}
          />
          <Group
            emptyLabel={t("Not set yet", "尚未设置")}
            label={t("Diet style", "饮食方式")}
            values={preferences.dietStyles.map(localize)}
          />
          <Group
            emptyLabel={t("Not set yet", "尚未设置")}
            label={t("Avoid", "忌口")}
            values={preferences.avoidAllergens.map(localize)}
          />
        </div>
      </section>

      <Link className="me-link-card" to="/nudges/settings">
        <span aria-hidden="true" className="me-link-icon">
          <Bell size={21} />
        </span>
        <span>
          <strong>{t("Nudges", "提醒")}</strong>
          <small>{t("Balanced · quiet hours 22:00–07:30", "均衡 · 免打扰 22:00–07:30")}</small>
        </span>
        <b aria-hidden="true">→</b>
      </Link>

      <Link className="me-link-card" to="/nudges/preview">
        <span aria-hidden="true" className="me-link-icon">
          <Sparkles size={21} />
        </span>
        <span>
          <strong>{t("Preview a nudge", "预览一条提醒")}</strong>
          <small>{t("See how a contextual suggestion appears", "查看情境建议如何呈现")}</small>
        </span>
        <b aria-hidden="true">→</b>
      </Link>

      <section className="privacy-note">
        <LockKeyhole aria-hidden="true" size={17} />
        <p>
          <strong>{t("Private by design.", "隐私优先。")}</strong>{" "}
          {t(
            "This prototype keeps preferences on this device. No account, camera or location permission is required.",
            "此原型只在本设备保存偏好，无需账号、相机或定位权限。",
          )}
        </p>
      </section>
    </main>
  );
}

function Group({
  emptyLabel,
  label,
  values,
}: {
  emptyLabel: string;
  label: string;
  values: string[];
}) {
  return (
    <div className="preference-group">
      <span>{label}</span>
      <div>
        {values.length > 0 ? (
          values.map((value) => <b key={value}>{value}</b>)
        ) : (
          <small>{emptyLabel}</small>
        )}
      </div>
    </div>
  );
}
