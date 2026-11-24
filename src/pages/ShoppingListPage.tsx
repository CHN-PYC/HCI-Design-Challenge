import { useState } from "react";
import { Link } from "react-router-dom";

const shoppingItems = [
  { name: "Feta cheese", emoji: "🧀", note: "200 g · for Omelette", price: "£2.20" },
  { name: "Chicken thighs", emoji: "🍗", note: "500 g · for Rice Bowl", price: "£4.50" },
  { name: "Tomatoes", emoji: "🍅", note: "6 pcs · for Stir-fry", price: "£1.90" },
  { name: "Spring onions", emoji: "🧅", note: "1 bunch · for Stir-fry", price: "£3.80" },
];

const pantryItems = [
  "🥚 Eggs",
  "🥬 Spinach",
  "🍚 White rice",
  "🥕 Carrots",
  "🥫 Soy sauce",
  "🍋 Lemon",
];

export function ShoppingListPage() {
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
      .map((item) => `${item.name} — ${item.price}`)
      .join("\n");

    if (navigator.share) {
      try {
        await navigator.share({ title: "NutriPal shopping list", text });
        setShareStatus("Shopping list shared.");
        return;
      } catch {
        // A cancelled share sheet should not show an error in the prototype.
      }
    }

    setShareStatus("Shopping list ready to copy.");
  }

  return (
    <main className="shopping-page page">
      <header className="shopping-header">
        <Link aria-label="Back to meal plan" className="round-back" to="/plan">
          ←
        </Link>
        <div>
          <h1>Shopping List 🛒</h1>
          <p>For Tue–Sun · 18 planned meals</p>
        </div>
        <button
          aria-label="Share list"
          className="round-action"
          onClick={shareList}
          type="button"
        >
          ↗
        </button>
      </header>

      <section className="budget-card" aria-label="Shopping budget">
        <div className="budget-top">
          <p>
            <strong>£12.40</strong> <span>of £35 budget</span>
          </p>
          <span className="budget-left">✨ £22.60 left</span>
        </div>
        <div className="budget-progress">
          <i style={{ width: "35%" }} />
        </div>
        <p className="budget-note">
          Using 6 ingredients you already have saves ≈ £9.80
        </p>
      </section>

      <div className="section-bar section-bar--tight">
        <h2>To buy · {shoppingItems.length} items</h2>
        <span>Tap to tick off</span>
      </div>

      <section className="shopping-items" aria-label="Items to buy">
        {shoppingItems.map((item) => {
          const done = checked.has(item.name);
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
              <span aria-hidden="true" className="check-emoji">
                {item.emoji}
              </span>
              <span className="check-copy">
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </span>
              <b>{item.price}</b>
            </button>
          );
        })}
      </section>

      <h2 className="pantry-heading">Already in your pantry ✓</h2>
      <div className="pantry-list">
        {pantryItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <button
        className="primary-button shopping-order"
        onClick={() => setOrdered(true)}
        type="button"
      >
        {ordered ? "Order placed ✓" : "Order for delivery"}
      </button>
      <p aria-live="polite" className="inline-status">
        {shareStatus || (ordered ? "Demo order confirmed. No payment was taken." : "")}
      </p>
    </main>
  );
}
