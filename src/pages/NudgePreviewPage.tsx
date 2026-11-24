import { useState } from "react";
import { useNavigate } from "react-router-dom";

const suggestions = [
  {
    emoji: "🍅",
    title: "Tomato Egg Stir-fry",
    meta: "15 min · 490 kcal · 28g protein",
    context: [
      "📍 Leaving the gym",
      "🕕 4h since lunch",
      "💪 Protein 62/110g",
      "🍚 Rice expires tomorrow",
    ],
  },
  {
    emoji: "🥗",
    title: "Halloumi Quinoa Bowl",
    meta: "15 min · 450 kcal · 24g protein",
    context: [
      "📍 Near your local shop",
      "🕕 3h since lunch",
      "🧀 Halloumi in your basket",
      "⏱ Under your 30-minute limit",
    ],
  },
];

export function NudgePreviewPage() {
  const navigate = useNavigate();
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestion = suggestions[suggestionIndex];

  return (
    <main className="nudge-preview-page">
      <div className="nudge-preview-inner">
        <header className="lock-clock">
          <p>Tuesday 24 November</p>
          <h1>18:42</h1>
        </header>

        <section className="notification-card" aria-label="NutriPal notification">
          <div aria-hidden="true" className="notification-icon">
            🥗
          </div>
          <div>
            <div className="notification-meta">
              <b>NUTRIPAL</b>
              <span>now</span>
            </div>
            <h2>Heading home? 🏃‍♀️</h2>
            <p>Dinner in 15 min using your leftover rice — tap for the recipe.</p>
          </div>
        </section>

        <section className="suggestion-sheet" aria-label="Smart suggestion">
          <p className="smart-label">✨ Smart suggestion</p>
          <div className="suggestion-recipe">
            <span aria-hidden="true">{suggestion.emoji}</span>
            <div>
              <h2>{suggestion.title}</h2>
              <p>{suggestion.meta}</p>
            </div>
          </div>
          <h3>Because right now…</h3>
          <div className="context-grid">
            {suggestion.context.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <button
            aria-label="Cook this — start cooking"
            className="primary-button"
            onClick={() => navigate("/plan")}
            type="button"
          >
            Start cooking
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
              Other ideas
            </button>
            <button
              className="ghost-button"
              onClick={() => navigate("/home")}
              type="button"
            >
              Not now
            </button>
          </div>
          <button
            className="why-link"
            onClick={() => navigate("/nudges/settings#why-last")}
            type="button"
          >
            ⓘ Why am I seeing this?
          </button>
        </section>
      </div>
    </main>
  );
}
