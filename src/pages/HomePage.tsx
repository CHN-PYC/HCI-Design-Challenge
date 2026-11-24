import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../app/profile-context";

interface Recommendation {
  title: string;
  emoji: string;
  time: string;
  calories: string;
  price: string;
  tags: string[];
  reason: string;
  tone: "coral" | "green" | "gold";
}

const recommendations: Recommendation[] = [
  {
    title: "Mapo Tofu & Brown Rice",
    emoji: "🍲",
    time: "25 min",
    calories: "520 kcal",
    price: "£3.20",
    tags: ["🌶 Sichuan", "💪 High-protein"],
    reason: "You love Sichuan food and need +30g protein today.",
    tone: "coral",
  },
  {
    title: "Halloumi Quinoa Bowl",
    emoji: "🥗",
    time: "15 min",
    calories: "450 kcal",
    price: "£2.80",
    tags: ["🥗 Fresh", "🧀 Vegetarian"],
    reason: "A quick vegetarian option that fits your 30-minute limit.",
    tone: "green",
  },
  {
    title: "Miso Salmon Rice",
    emoji: "🍱",
    time: "20 min",
    calories: "580 kcal",
    price: "£4.60",
    tags: ["🐟 Omega-3", "🍚 Pantry rice"],
    reason: "You have rice at home and still need 36g of protein today.",
    tone: "gold",
  },
];

const extraPicks = [
  { title: "Lemon Herb Chicken", emoji: "🍋", meta: "30 min · 610 kcal" },
  { title: "Mushroom Miso Risotto", emoji: "🍄", meta: "25 min · 520 kcal" },
];

export function HomePage() {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const featured = recommendations[featuredIndex];

  return (
    <main className="home-page page">
      <header className="home-header">
        <div>
          <h1>Good evening, {profile.displayName} 👋</h1>
          <h2>What's on your plate today?</h2>
        </div>
        <button
          aria-label="Open your profile"
          className="avatar"
          onClick={() => navigate("/me")}
          type="button"
        >
          🧑🏻
        </button>
      </header>

      <section className="daily-summary" aria-label="Daily nutrition summary">
        <p className="daily-kcal">
          <strong>1,240</strong>
          <span>/ 1,900 kcal today</span>
        </p>
        <div className="daily-progress" aria-label="65 percent of daily calories">
          <i style={{ width: "65%" }} />
        </div>
        <div className="daily-macros">
          <div>
            <b>62g</b>
            <span>Protein</span>
          </div>
          <div>
            <b>140g</b>
            <span>Carbs</span>
          </div>
          <div>
            <b>38g</b>
            <span>Fat</span>
          </div>
        </div>
      </section>

      <div className="section-bar">
        <h2>Picked for you ✨</h2>
        <button
          aria-expanded={showAll}
          className="text-link"
          onClick={() => setShowAll((current) => !current)}
          type="button"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>

      <article className="featured-card">
        <div className={`featured-hero featured-hero--${featured.tone}`}>
          <div className="featured-tags">
            {featured.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span aria-hidden="true" className="featured-emoji">
            {featured.emoji}
          </span>
          <div aria-hidden="true" className="plate-shadow" />
        </div>
        <div className="featured-body">
          <h3>{featured.title}</h3>
          <p className="recipe-meta">
            <span>⏱ {featured.time}</span>
            <span>🔥 {featured.calories}</span>
            <span>💷 {featured.price}</span>
          </p>
          <p className="why-card">
            <span aria-hidden="true">💡</span>
            <span>
              <b>Why this?</b> {featured.reason}
            </span>
          </p>
        </div>
      </article>

      <div className="mini-grid" aria-label="More recommendations">
        {recommendations.slice(1).map((recipe, index) => (
          <button
            className={featuredIndex === index + 1 ? "mini-card on" : "mini-card"}
            key={recipe.title}
            onClick={() => setFeaturedIndex(index + 1)}
            type="button"
          >
            <span aria-hidden="true">{recipe.emoji}</span>
            <strong>{recipe.title}</strong>
            <small>
              {recipe.calories} · {recipe.time}
            </small>
          </button>
        ))}
      </div>

      {showAll && (
        <div className="explore-list" aria-label="All recommendations">
          {extraPicks.map((pick) => (
            <button className="explore-card" key={pick.title} type="button">
              <span aria-hidden="true">{pick.emoji}</span>
              <span>
                <strong>{pick.title}</strong>
                <small>{pick.meta}</small>
              </span>
              <b aria-hidden="true">›</b>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
