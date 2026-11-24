import { useState } from "react";
import { Link } from "react-router-dom";

const week = [
  { day: "Mon", date: "23" },
  { day: "Tue", date: "24" },
  { day: "Wed", date: "25" },
  { day: "Thu", date: "26" },
  { day: "Fri", date: "27" },
  { day: "Sat", date: "28" },
  { day: "Sun", date: "29" },
];

const pantry = [
  { emoji: "🥚", label: "Eggs", selected: true },
  { emoji: "🥬", label: "Spinach", selected: true },
  { emoji: "🍚", label: "Rice", selected: true },
  { emoji: "🍗", label: "Chicken", selected: true },
  { emoji: "🍅", label: "Tomato", selected: false },
];

const meals = [
  {
    time: "Breakfast · 8:00",
    name: "Spinach & Feta Omelette",
    meta: "10 min · £1.10 · 380 kcal",
    emoji: "🍳",
    tint: "#FFF1C7",
  },
  {
    time: "Lunch · 12:30",
    name: "Chicken Rice Bowl",
    meta: "20 min · £2.40 · 560 kcal",
    emoji: "🍚",
    tint: "#DFF7EA",
  },
  {
    time: "Dinner · 19:00",
    name: "Tomato Egg Stir-fry",
    meta: "15 min · £1.60 · 490 kcal",
    emoji: "🍅",
    tint: "#FFE0E8",
  },
];

export function PlanPage() {
  const [selectedDay, setSelectedDay] = useState("Tue");

  return (
    <main className="meal-plan-page">
      <header className="mp-header">
        <div>
          <p className="mp-kicker">Week of 23 Nov</p>
          <h1 className="mp-title">My Meal Plan 🗓</h1>
        </div>
        <button className="mp-regenerate" type="button">
          ↻ Regenerate
        </button>
      </header>

      <div className="mp-week" aria-label="Week days">
        {week.map(({ day, date }) => {
          const selected = selectedDay === day;
          return (
            <button
              aria-label={`${day} ${date}`}
              aria-pressed={selected}
              className={selected ? "mp-day on" : "mp-day"}
              key={day}
              onClick={() => setSelectedDay(day)}
              type="button"
            >
              <span>{day}</span>
              <b>{date}</b>
            </button>
          );
        })}
      </div>

      <div className="mp-constraints">
        <div className="mp-constraint mp-constraint--budget">
          <strong>💷 £35/wk</strong>
          <span>Budget</span>
        </div>
        <div className="mp-constraint mp-constraint--time">
          <strong>⏱ ≤ 30 min</strong>
          <span>Cook time</span>
        </div>
        <div className="mp-constraint mp-constraint--pantry">
          <strong>🧊 6 items</strong>
          <span>Pantry</span>
        </div>
      </div>

      <div className="mp-section-heading">
        <h2>Using what you have</h2>
        <button className="mp-edit" type="button">
          Edit
        </button>
      </div>

      <div className="mp-pantry" aria-label="Pantry ingredients">
        {pantry.map((item) => (
          <span
            className={item.selected ? "mp-chip is-selected" : "mp-chip"}
            key={item.label}
          >
            {item.emoji} {item.label}
          </span>
        ))}
      </div>

      <h2 className="mp-meals-title">Tuesday’s meals</h2>

      <section className="mp-meals" aria-label="Tuesday's meals">
        {meals.map((meal) => (
          <div className="mp-meal" key={meal.name}>
            <div
              aria-hidden="true"
              className="mp-meal-icon"
              style={{ background: meal.tint }}
            >
              {meal.emoji}
            </div>
            <div className="mp-meal-copy">
              <span className="mp-meal-time">{meal.time}</span>
              <h3>{meal.name}</h3>
              <span className="mp-meal-meta">{meal.meta}</span>
            </div>
            <button
              aria-label={`Swap meal ${meal.name}`}
              className="mp-swap"
              type="button"
            >
              ⇄
            </button>
          </div>
        ))}
      </section>

      <Link className="mp-shop" to="/plan/shopping-list">
        <span aria-hidden="true" className="mp-shop-icon">
          🛒
        </span>
        <span className="mp-shop-copy">
          <strong>Shopping list</strong>
          <small>Only 4 items to buy · £12.40</small>
        </span>
        <span aria-hidden="true" className="mp-shop-arrow">
          →
        </span>
      </Link>
    </main>
  );
}
