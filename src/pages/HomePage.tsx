import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Flame,
  Lightbulb,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import { useProfile } from "../app/profile-context";
import {
  FoodGlyph,
  type FoodGlyphName,
} from "../components/FoodGlyph";
import { useI18n } from "../i18n/useI18n";

interface LocalizedText {
  en: string;
  zh: string;
}

interface Recommendation {
  title: LocalizedText;
  glyph: FoodGlyphName;
  time: LocalizedText;
  calories: LocalizedText;
  price: string;
  tags: LocalizedText[];
  reason: LocalizedText;
  tone: "coral" | "green" | "gold";
}

const recommendations: Recommendation[] = [
  {
    title: { en: "Mapo Tofu & Brown Rice", zh: "麻婆豆腐配糙米饭" },
    glyph: "curry",
    time: { en: "25 min", zh: "25 分钟" },
    calories: { en: "520 kcal", zh: "520 千卡" },
    price: "£3.20",
    tags: [
      { en: "Sichuan", zh: "川味" },
      { en: "High-protein", zh: "高蛋白" },
    ],
    reason: {
      en: "You love Sichuan food and need +30g protein today.",
      zh: "你喜欢川味，而且今天的蛋白质还差 30 克。",
    },
    tone: "coral",
  },
  {
    title: { en: "Halloumi Quinoa Bowl", zh: "哈鲁米藜麦碗" },
    glyph: "salad",
    time: { en: "15 min", zh: "15 分钟" },
    calories: { en: "450 kcal", zh: "450 千卡" },
    price: "£2.80",
    tags: [
      { en: "Fresh", zh: "清爽" },
      { en: "Vegetarian", zh: "素食" },
    ],
    reason: {
      en: "A quick vegetarian option that fits your 30-minute limit.",
      zh: "符合你 30 分钟烹饪限制的快手素食。",
    },
    tone: "green",
  },
  {
    title: { en: "Miso Salmon Rice", zh: "味噌三文鱼饭" },
    glyph: "sushi",
    time: { en: "20 min", zh: "20 分钟" },
    calories: { en: "580 kcal", zh: "580 千卡" },
    price: "£4.60",
    tags: [
      { en: "Omega-3", zh: "Omega-3" },
      { en: "Pantry rice", zh: "现有米饭" },
    ],
    reason: {
      en: "You have rice at home and still need 36g of protein today.",
      zh: "家里有米饭，而且今天还需要补充 36 克蛋白质。",
    },
    tone: "gold",
  },
];

const extraPicks: {
  title: LocalizedText;
  glyph: FoodGlyphName;
  meta: LocalizedText;
}[] = [
  {
    title: { en: "Lemon Herb Chicken", zh: "柠檬香草鸡" },
    glyph: "citrus",
    meta: { en: "30 min · 610 kcal", zh: "30 分钟 · 610 千卡" },
  },
  {
    title: { en: "Mushroom Miso Risotto", zh: "蘑菇味噌烩饭" },
    glyph: "beans",
    meta: { en: "25 min · 520 kcal", zh: "25 分钟 · 520 千卡" },
  },
];

export function HomePage() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const featured = recommendations[featuredIndex];
  const localize = (value: LocalizedText) =>
    isChinese ? value.zh : value.en;

  return (
    <main className="home-page page">
      <header className="home-header">
        <div>
          <h1>
            {t(
              "Good evening, " + profile.displayName,
              "晚上好，" + profile.displayName,
            )}
          </h1>
          <h2>{t("What's on your plate today?", "今天想吃点什么？")}</h2>
        </div>
        <button
          aria-label={t("Open your profile", "打开个人档案")}
          className="avatar"
          onClick={() => navigate("/me")}
          type="button"
        >
          <UserRound aria-hidden="true" size={23} />
        </button>
      </header>

      <section
        aria-label={t("Daily nutrition summary", "每日营养概览")}
        className="daily-summary"
      >
        <p className="daily-kcal">
          <strong>1,240</strong>
          <span>{t("/ 1,900 kcal today", "/ 1,900 千卡 · 今日")}</span>
        </p>
        <div
          aria-label={t("65 percent of daily calories", "今日热量完成 65%")}
          className="daily-progress"
        >
          <i style={{ width: "65%" }} />
        </div>
        <div className="daily-macros">
          <div>
            <b>62g</b>
            <span>{t("Protein", "蛋白质")}</span>
          </div>
          <div>
            <b>140g</b>
            <span>{t("Carbs", "碳水")}</span>
          </div>
          <div>
            <b>38g</b>
            <span>{t("Fat", "脂肪")}</span>
          </div>
        </div>
      </section>

      <div className="section-bar">
        <h2 className="heading-with-icon">
          <Sparkles aria-hidden="true" size={18} />
          {t("Picked for you", "为你精选")}
        </h2>
        <button
          aria-expanded={showAll}
          className="text-link"
          onClick={() => setShowAll((current) => !current)}
          type="button"
        >
          {showAll ? t("Show less", "收起") : t("See all", "查看全部")}
        </button>
      </div>

      <article className="featured-card">
        <div className={"featured-hero featured-hero--" + featured.tone}>
          <div className="featured-tags">
            {featured.tags.map((tag) => (
              <span key={tag.en}>{localize(tag)}</span>
            ))}
          </div>
          <span aria-hidden="true" className="featured-glyph">
            <FoodGlyph name={featured.glyph} size={54} />
          </span>
          <div aria-hidden="true" className="plate-shadow" />
        </div>
        <div className="featured-body">
          <h3>{localize(featured.title)}</h3>
          <p className="recipe-meta">
            <span>
              <Clock aria-hidden="true" size={14} /> {localize(featured.time)}
            </span>
            <span>
              <Flame aria-hidden="true" size={14} /> {localize(featured.calories)}
            </span>
            <span>
              <Wallet aria-hidden="true" size={14} /> {featured.price}
            </span>
          </p>
          <p className="why-card">
            <Lightbulb aria-hidden="true" size={16} />
            <span>
              <b>{t("Why this?", "为什么推荐？")}</b> {localize(featured.reason)}
            </span>
          </p>
        </div>
      </article>

      <div
        aria-label={t("More recommendations", "更多推荐")}
        className="mini-grid"
      >
        {recommendations.slice(1).map((recipe, index) => (
          <button
            className={featuredIndex === index + 1 ? "mini-card on" : "mini-card"}
            key={recipe.title.en}
            onClick={() => setFeaturedIndex(index + 1)}
            type="button"
          >
            <span aria-hidden="true" className="mini-card__icon">
              <FoodGlyph name={recipe.glyph} size={30} />
            </span>
            <strong>{localize(recipe.title)}</strong>
            <small>
              {localize(recipe.calories)} · {localize(recipe.time)}
            </small>
          </button>
        ))}
      </div>

      {showAll && (
        <div
          aria-label={t("All recommendations", "全部推荐")}
          className="explore-list"
        >
          {extraPicks.map((pick) => (
            <button className="explore-card" key={pick.title.en} type="button">
              <span aria-hidden="true">
                <FoodGlyph name={pick.glyph} size={23} />
              </span>
              <span>
                <strong>{localize(pick.title)}</strong>
                <small>{localize(pick.meta)}</small>
              </span>
              <b aria-hidden="true">›</b>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
