import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Flame,
  Lightbulb,
  Search,
  Sparkles,
  UserRound,
  Wallet,
  X,
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

interface Dish {
  title: LocalizedText;
  glyph: FoodGlyphName;
  time: LocalizedText;
  calories: LocalizedText;
  price: string;
  tags: LocalizedText[];
  reason: LocalizedText;
  tone: "coral" | "green" | "gold";
  keywords: string[];
}

const dishes: Dish[] = [
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
    keywords: ["tofu", "mapo", "sichuan", "rice", "spicy"],
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
    keywords: ["halloumi", "quinoa", "bowl", "salad", "vegetarian"],
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
    keywords: ["sushi", "salmon", "miso", "rice", "fish", "japanese"],
  },
  {
    title: { en: "Lemon Herb Chicken", zh: "柠檬香草鸡" },
    glyph: "citrus",
    time: { en: "30 min", zh: "30 分钟" },
    calories: { en: "610 kcal", zh: "610 千卡" },
    price: "£4.20",
    tags: [
      { en: "High-protein", zh: "高蛋白" },
      { en: "One pan", zh: "一锅完成" },
    ],
    reason: {
      en: "A filling option that uses the lemon already in your pantry.",
      zh: "利用食材库里已有的柠檬，做一顿有满足感的晚餐。",
    },
    tone: "green",
    keywords: ["lemon", "chicken", "herb", "high protein"],
  },
  {
    title: { en: "Mushroom Miso Risotto", zh: "蘑菇味噌烩饭" },
    glyph: "beans",
    time: { en: "25 min", zh: "25 分钟" },
    calories: { en: "520 kcal", zh: "520 千卡" },
    price: "£3.40",
    tags: [
      { en: "Vegetarian", zh: "素食" },
      { en: "Comfort", zh: "暖心" },
    ],
    reason: {
      en: "A warm vegetarian meal that keeps tonight’s budget in check.",
      zh: "温暖的全素餐，同时把今晚的预算控制在范围内。",
    },
    tone: "gold",
    keywords: ["mushroom", "miso", "risotto", "rice", "vegetarian"],
  },
];

export function HomePage() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { isChinese, t } = useI18n();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeTitle, setActiveTitle] = useState(dishes[0].title.en);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return dishes.filter((dish) => {
      const haystack = [
        dish.title.en,
        dish.title.zh,
        ...dish.keywords,
        ...dish.tags.flatMap((tag) => [tag.en, tag.zh]),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [query]);

  const isSearching = query.trim().length > 0;
  const visibleDishes = isSearching
    ? matches
    : showAll
      ? dishes
      : dishes.slice(0, 3);
  const featured =
    visibleDishes.find((dish) => dish.title.en === activeTitle) ??
    visibleDishes[0];
  const localize = (value: LocalizedText) =>
    isChinese ? value.zh : value.en;

  return (
    <main className="home-page page">
      <header className="home-header">
        <div>
          <p className="home-greeting">
            {t("Good evening, " + profile.displayName, "晚上好，" + profile.displayName)}
          </p>
          <h1>{t("What’s on your plate today?", "今天想吃点什么？")}</h1>
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
        className="daily-summary daily-summary--v2"
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

      <section aria-label={t("Dish search", "菜品搜索")} className="dish-search">
        <label className="dish-search__field">
          <Search aria-hidden="true" size={18} />
          <span className="visually-hidden">
            {t("Search dishes", "搜索菜品")}
          </span>
          <input
            aria-label={t("Search dishes", "搜索菜品")}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("Search dishes", "搜索菜品")}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label={t("Clear search", "清除搜索")}
              onClick={() => setQuery("")}
              type="button"
            >
              <X aria-hidden="true" size={15} />
            </button>
          ) : null}
        </label>
        <div className="dish-search__samples">
          <span>{t("Try:", "试试：")}</span>
          {[
            { en: "Tofu", zh: "豆腐" },
            { en: "Sushi", zh: "寿司" },
          ].map((sample) => (
            <button
              className="ui-chip"
              key={sample.en}
              onClick={() => setQuery(sample.en)}
              type="button"
            >
              {isChinese ? sample.zh : sample.en}
            </button>
          ))}
        </div>
      </section>

      <div className="section-bar">
        <h2 className="heading-with-icon">
          <Sparkles aria-hidden="true" size={18} />
          {isSearching
            ? t("Search results", "搜索结果")
            : t("Picked for you", "为你精选")}
        </h2>
        {!isSearching ? (
          <button
            aria-expanded={showAll}
            className="text-link"
            onClick={() => setShowAll((current) => !current)}
            type="button"
          >
            {showAll ? t("Show less", "收起") : t("See all", "查看全部")}
          </button>
        ) : (
          <span className="result-count">
            {matches.length}{" "}
            {matches.length === 1 ? t("dish", "道菜") : t("dishes", "道菜")}
          </span>
        )}
      </div>

      {isSearching && matches.length === 0 ? (
        <section className="empty-search" aria-live="polite">
          <span aria-hidden="true">
            <Search size={28} />
          </span>
          <h2>{t("No dishes found", "没有找到菜品")}</h2>
          <p>
            {t(
              "Try a shorter search or clear the query.",
              "试试更短的关键词，或清除搜索。",
            )}
          </p>
          <button className="text-link" onClick={() => setQuery("")} type="button">
            {t("Show all dishes", "显示全部菜品")}
          </button>
        </section>
      ) : featured ? (
        <>
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

          {visibleDishes.length > 1 ? (
            <div
              aria-label={t("More recommendations", "更多推荐")}
              className="mini-grid"
            >
              {visibleDishes
                .filter((dish) => dish.title.en !== featured.title.en)
                .map((dish) => (
                  <button
                    className="mini-card"
                    key={dish.title.en}
                    onClick={() => setActiveTitle(dish.title.en)}
                    type="button"
                  >
                    <span aria-hidden="true" className="mini-card__icon">
                      <FoodGlyph name={dish.glyph} size={30} />
                    </span>
                    <strong>{localize(dish.title)}</strong>
                    <small>
                      {localize(dish.calories)} · {localize(dish.time)}
                    </small>
                  </button>
                ))}
            </div>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
