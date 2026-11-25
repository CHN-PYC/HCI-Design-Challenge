import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Dumbbell,
  Info,
  MapPin,
  Salad,
  Sparkles,
  Store,
  Timer,
  Wheat,
} from "lucide-react";
import {
  FoodGlyph,
  type FoodGlyphName,
} from "../components/FoodGlyph";
import { useI18n } from "../i18n/useI18n";

interface LocalizedText {
  en: string;
  zh: string;
}

type ContextIcon = "clock" | "grain" | "pin" | "protein" | "shop" | "timer";

interface Suggestion {
  glyph: FoodGlyphName;
  title: LocalizedText;
  meta: LocalizedText;
  context: {
    icon: ContextIcon;
    text: LocalizedText;
  }[];
}

const suggestions: Suggestion[] = [
  {
    glyph: "tomato",
    title: { en: "Tomato Egg Stir-fry", zh: "番茄炒蛋" },
    meta: {
      en: "15 min · 490 kcal · 28g protein",
      zh: "15 分钟 · 490 千卡 · 28 克蛋白质",
    },
    context: [
      { icon: "pin", text: { en: "Leaving the gym", zh: "正离开健身房" } },
      { icon: "clock", text: { en: "4h since lunch", zh: "距离午餐 4 小时" } },
      { icon: "protein", text: { en: "Protein 62/110g", zh: "蛋白质 62/110 克" } },
      { icon: "grain", text: { en: "Rice expires tomorrow", zh: "米饭明天过期" } },
    ],
  },
  {
    glyph: "salad",
    title: { en: "Halloumi Quinoa Bowl", zh: "哈鲁米藜麦碗" },
    meta: {
      en: "15 min · 450 kcal · 24g protein",
      zh: "15 分钟 · 450 千卡 · 24 克蛋白质",
    },
    context: [
      { icon: "pin", text: { en: "Near your local shop", zh: "靠近你常去的商店" } },
      { icon: "clock", text: { en: "3h since lunch", zh: "距离午餐 3 小时" } },
      { icon: "shop", text: { en: "Halloumi in your basket", zh: "购物篮里有哈鲁米" } },
      { icon: "timer", text: { en: "Under your 30-minute limit", zh: "在你 30 分钟限制内" } },
    ],
  },
];

const contextIcons = {
  clock: Clock,
  grain: Wheat,
  pin: MapPin,
  protein: Dumbbell,
  shop: Store,
  timer: Timer,
};

export function NudgePreviewPage() {
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestion = suggestions[suggestionIndex];
  const localize = (value: LocalizedText) =>
    isChinese ? value.zh : value.en;

  return (
    <main className="nudge-preview-page">
      <div className="nudge-preview-inner">
        <header className="lock-clock">
          <p>{t("Tuesday 24 November", "11 月 24 日 星期二")}</p>
          <h1>18:42</h1>
        </header>

        <section
          className="notification-card"
          aria-label={t("NutriPal notification", "NutriPal 通知")}
        >
          <div aria-hidden="true" className="notification-icon">
            <Salad size={21} />
          </div>
          <div>
            <div className="notification-meta">
              <b>NUTRIPAL</b>
              <span>{t("now", "现在")}</span>
            </div>
            <h2>{t("Heading home?", "回家了吗？")}</h2>
            <p>
              {t(
                "Dinner in 15 min using your leftover rice — tap for the recipe.",
                "用剩下的米饭 15 分钟做好晚餐——点击查看食谱。",
              )}
            </p>
          </div>
        </section>

        <section
          className="suggestion-sheet"
          aria-label={t("Smart suggestion", "智能建议")}
        >
          <p className="smart-label">
            <Sparkles aria-hidden="true" size={13} />
            {t("Smart suggestion", "智能建议")}
          </p>
          <div className="suggestion-recipe">
            <span aria-hidden="true" className="suggestion-glyph">
              <FoodGlyph name={suggestion.glyph} size={30} />
            </span>
            <div>
              <h2>{localize(suggestion.title)}</h2>
              <p>{localize(suggestion.meta)}</p>
            </div>
          </div>
          <h3>{t("Because right now…", "因为此刻…")}</h3>
          <div className="context-grid">
            {suggestion.context.map((item) => {
              const Icon = contextIcons[item.icon];
              return (
                <span key={item.text.en}>
                  <Icon aria-hidden="true" size={14} />
                  {localize(item.text)}
                </span>
              );
            })}
          </div>
          <button
            aria-label={t(
              "Cook this — start cooking",
              "做这道菜——开始烹饪",
            )}
            className="primary-button"
            onClick={() => navigate("/plan")}
            type="button"
          >
            {t("Start cooking", "开始做饭")}
          </button>
          <div className="suggestion-actions">
            <button
              className="ghost-button"
              onClick={() =>
                setSuggestionIndex(
                  (current) => (current + 1) % suggestions.length,
                )
              }
              type="button"
            >
              {t("Other ideas", "其他建议")}
            </button>
            <button
              className="ghost-button"
              onClick={() => navigate("/home")}
              type="button"
            >
              {t("Not now", "暂时不要")}
            </button>
          </div>
          <button
            className="why-link"
            onClick={() => navigate("/nudges/settings#why-last")}
            type="button"
          >
            <Info aria-hidden="true" size={13} />
            {t("Why am I seeing this?", "为什么我会看到这个？")}
          </button>
        </section>
      </div>
    </main>
  );
}
