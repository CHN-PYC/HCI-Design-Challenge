import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import {
  FoodGlyph,
  type FoodGlyphName,
} from "../components/FoodGlyph";
import { useI18n } from "../i18n/useI18n";

const shoppingItems: {
  name: string;
  zhName: string;
  glyph: FoodGlyphName;
  note: string;
  zhNote: string;
  price: string;
}[] = [
  {
    name: "Feta cheese",
    zhName: "菲达奶酪",
    glyph: "cheese",
    note: "200 g · for Omelette",
    zhNote: "200 克 · 用于煎蛋",
    price: "£2.20",
  },
  {
    name: "Chicken thighs",
    zhName: "鸡腿肉",
    glyph: "chicken",
    note: "500 g · for Rice Bowl",
    zhNote: "500 克 · 用于米饭碗",
    price: "£4.50",
  },
  {
    name: "Tomatoes",
    zhName: "番茄",
    glyph: "tomato",
    note: "6 pcs · for Stir-fry",
    zhNote: "6 个 · 用于炒菜",
    price: "£1.90",
  },
  {
    name: "Spring onions",
    zhName: "小葱",
    glyph: "onion",
    note: "1 bunch · for Stir-fry",
    zhNote: "1 把 · 用于炒菜",
    price: "£3.80",
  },
];

const pantryItems = [
  { en: "Eggs", zh: "鸡蛋", glyph: "egg" as const },
  { en: "Spinach", zh: "菠菜", glyph: "leaf" as const },
  { en: "White rice", zh: "白米饭", glyph: "rice" as const },
  { en: "Carrots", zh: "胡萝卜", glyph: "carrot" as const },
  { en: "Soy sauce", zh: "酱油", glyph: "sauce" as const },
  { en: "Lemon", zh: "柠檬", glyph: "citrus" as const },
];

export function ShoppingListPage() {
  const { isChinese, t } = useI18n();
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const [shareStatus, setShareStatus] = useState("");
  const [ordered, setOrdered] = useState(false);

  function toggleItem(name: string) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  async function shareList() {
    const text = shoppingItems
      .map(
        (item) =>
          (isChinese ? item.zhName : item.name) + " — " + item.price,
      )
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("NutriPal shopping list", "NutriPal 购物清单"),
          text,
        });
        setShareStatus(t("Shopping list shared.", "购物清单已分享。"));
        return;
      } catch {
        // A cancelled share sheet should not show an error in the prototype.
      }
    }

    setShareStatus(t("Shopping list ready to copy.", "购物清单已准备复制。"));
  }

  return (
    <main className="shopping-page page">
      <header className="shopping-header">
        <Link
          aria-label={t("Back to meal plan", "返回餐单")}
          className="round-back"
          to="/plan"
        >
          <ArrowLeft aria-hidden="true" size={18} />
        </Link>
        <div>
          <h1 className="heading-with-icon">
            {t("Shopping List", "购物清单")}
            <ShoppingCart aria-hidden="true" size={21} />
          </h1>
          <p>{t("For Tue–Sun · 18 planned meals", "周二至周日 · 已计划 18 餐")}</p>
        </div>
        <button
          aria-label={t("Share list", "分享清单")}
          className="round-action"
          onClick={shareList}
          type="button"
        >
          <ArrowUpRight aria-hidden="true" size={18} />
        </button>
      </header>

      <section className="budget-card" aria-label={t("Shopping budget", "购物预算")}>
        <div className="budget-top">
          <p>
            <strong>£12.40</strong>{" "}
            <span>{t("of £35 budget", "占 £35 预算")}</span>
          </p>
          <span className="budget-left">
            <Sparkles aria-hidden="true" size={13} />
            {t("£22.60 left", "剩余 £22.60")}
          </span>
        </div>
        <div className="budget-progress">
          <i style={{ width: "35%" }} />
        </div>
        <p className="budget-note">
          {t(
            "Using 6 ingredients you already have saves ≈ £9.80",
            "使用现有 6 种食材，预计节省约 £9.80",
          )}
        </p>
      </section>

      <div className="section-bar section-bar--tight">
        <h2>
          {t("To buy", "待购买")} · {shoppingItems.length}{" "}
          {t("items", "项")}
        </h2>
        <span>{t("Tap to tick off", "点击勾选")}</span>
      </div>

      <section className="shopping-items" aria-label={t("Items to buy", "待购买商品")}>
        {shoppingItems.map((item) => {
          const done = checked.has(item.name);
          const name = isChinese ? item.zhName : item.name;
          return (
            <button
              aria-pressed={done}
              className={done ? "check-item done" : "check-item"}
              key={item.name}
              onClick={() => toggleItem(item.name)}
              type="button"
            >
              <span aria-hidden="true" className="check-box">
                {done ? "✓" : ""}
              </span>
              <span aria-hidden="true" className="check-glyph">
                <FoodGlyph name={item.glyph} size={24} />
              </span>
              <span className="check-copy">
                <strong>{name}</strong>
                <small>{isChinese ? item.zhNote : item.note}</small>
              </span>
              <b>{item.price}</b>
            </button>
          );
        })}
      </section>

      <h2 className="pantry-heading">
        {t("Already in your pantry ✓", "食材库中已有 ✓")}
      </h2>
      <div className="pantry-list">
        {pantryItems.map((item) => (
          <span key={item.en}>
            <FoodGlyph name={item.glyph} size={14} />
            {isChinese ? item.zh : item.en}
          </span>
        ))}
      </div>

      <button
        className="primary-button shopping-order"
        onClick={() => setOrdered(true)}
        type="button"
      >
        {ordered
          ? t("Order placed ✓", "订单已提交 ✓")
          : t("Order for delivery", "下单配送")}
      </button>
      <p aria-live="polite" className="inline-status">
        {shareStatus ||
          (ordered
            ? t(
                "Demo order confirmed. No payment was taken.",
                "演示订单已确认，未产生实际支付。",
              )
            : "")}
      </p>
    </main>
  );
}
