import { useState } from "react";
import { Link } from "react-router-dom";

const week = [
  { day: "Mon", date: "23", label: "Monday" },
  { day: "Tue", date: "24", label: "Tuesday" },
  { day: "Wed", date: "25", label: "Wednesday" },
  { day: "Thu", date: "26", label: "Thursday" },
  { day: "Fri", date: "27", label: "Friday" },
  { day: "Sat", date: "28", label: "Saturday" },
  { day: "Sun", date: "29", label: "Sunday" },
];

const pantry = [
  { emoji: "🥚", label: "Eggs" },
  { emoji: "🥬", label: "Spinach" },
  { emoji: "🍚", label: "White rice" },
  { emoji: "🥕", label: "Carrots" },
  { emoji: "🥫", label: "Soy sauce" },
];

interface Meal {
  time: string;
  name: string;
  meta: string;
  emoji: string;
  tint: string;
}

const tuesdayMeals: Meal[] = [
  {
    time: "Breakfast · 8:00",
    name: "Spinach & Feta Omelette",
    meta: "10 min · £1.10 · 380 kcal",
    emoji: "🍳",
    tint: "#f5f1ff",
  },
  {
    time: "Lunch · 12:30",
    name: "Chicken Rice Bowl",
    meta: "20 min · £2.40 · 560 kcal",
    emoji: "🍚",
    tint: "#f2f0f8",
  },
  {
    time: "Dinner · 19:00",
    name: "Tomato Egg Stir-fry",
    meta: "15 min · £1.60 · 490 kcal",
    emoji: "🍅",
    tint: "#fff0eb",
  },
];

const dayMeals: Record<string, Meal[]> = {
  Mon: [
    {
      time: "Breakfast · 8:00",
      name: "Greek Yogurt & Berries",
      meta: "5 min · £1.40 · 310 kcal",
      emoji: "🫐",
      tint: "#eef4ff",
    },
    {
      time: "Lunch · 12:30",
      name: "Chicken Couscous Bowl",
      meta: "20 min · £2.80 · 540 kcal",
      emoji: "🥙",
      tint: "#fff3df",
    },
    {
      time: "Dinner · 19:00",
      name: "Golden Lentil Curry",
      meta: "25 min · £1.90 · 470 kcal",
      emoji: "🍛",
      tint: "#fff0d8",
    },
  ],
  Tue: tuesdayMeals,
  Wed: [
    {
      time: "Breakfast · 8:00",
      name: "Apple Cinnamon Oats",
      meta: "8 min · £0.90 · 350 kcal",
      emoji: "🥣",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Tuna Jacket Potato",
      meta: "18 min · £2.10 · 510 kcal",
      emoji: "🥔",
      tint: "#eef4ff",
    },
    {
      time: "Dinner · 19:00",
      name: "Halloumi Quinoa Bowl",
      meta: "15 min · £2.80 · 450 kcal",
      emoji: "🥗",
      tint: "#eaf7ee",
    },
  ],
  Thu: [
    {
      time: "Breakfast · 8:00",
      name: "Soft Scrambled Eggs",
      meta: "10 min · £1.20 · 390 kcal",
      emoji: "🍳",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Miso Salmon Rice",
      meta: "20 min · £4.60 · 580 kcal",
      emoji: "🍱",
      tint: "#eaf7ee",
    },
    {
      time: "Dinner · 19:00",
      name: "Ginger Chicken Stir-fry",
      meta: "18 min · £2.60 · 520 kcal",
      emoji: "🥡",
      tint: "#fff0eb",
    },
  ],
  Fri: [
    {
      time: "Breakfast · 8:00",
      name: "Banana Oat Pancakes",
      meta: "15 min · £1.30 · 420 kcal",
      emoji: "🥞",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 12:30",
      name: "Tomato Lentil Soup",
      meta: "12 min · £1.50 · 360 kcal",
      emoji: "🍲",
      tint: "#fff0eb",
    },
    {
      time: "Dinner · 19:00",
      name: "Friday Flatbread Pizza",
      meta: "22 min · £3.20 · 640 kcal",
      emoji: "🍕",
      tint: "#fff0eb",
    },
  ],
  Sat: [
    {
      time: "Breakfast · 9:00",
      name: "Spiced Shakshuka",
      meta: "20 min · £1.80 · 430 kcal",
      emoji: "🍳",
      tint: "#fff0eb",
    },
    {
      time: "Lunch · 13:00",
      name: "Crispy Falafel Wrap",
      meta: "15 min · £2.40 · 480 kcal",
      emoji: "🌯",
      tint: "#eaf7ee",
    },
    {
      time: "Dinner · 19:30",
      name: "Creamy Butter Chicken",
      meta: "30 min · £3.90 · 690 kcal",
      emoji: "🍛",
      tint: "#fff3df",
    },
  ],
  Sun: [
    {
      time: "Breakfast · 9:00",
      name: "Maple Pecan Porridge",
      meta: "7 min · £1.10 · 380 kcal",
      emoji: "🥣",
      tint: "#fff3df",
    },
    {
      time: "Lunch · 13:00",
      name: "Roast Chicken & Greens",
      meta: "30 min · £4.20 · 560 kcal",
      emoji: "🍗",
      tint: "#fff0d8",
    },
    {
      time: "Dinner · 18:30",
      name: "Sunday Veggie Ramen",
      meta: "20 min · £2.20 · 510 kcal",
      emoji: "🍜",
      tint: "#eaf7ee",
    },
  ],
};

const swapAlternatives = [
  "Mushroom Herb Omelette",
  "Lemon Chicken Couscous",
  "Tofu & Pepper Rice",
];

export function PlanPage() {
  const [selectedDay, setSelectedDay] = useState("Tue");
  const [selectedPantry, setSelectedPantry] = useState(
    () => new Set(pantry.map((item) => item.label)),
  );
  const [editingPantry, setEditingPantry] = useState(false);
  const [swaps, setSwaps] = useState<Record<string, number>>({});
  const [status, setStatus] = useState("");
  const activeDay = week.find((day) => day.day === selectedDay) ?? week[1];
  const meals = dayMeals[selectedDay] ?? tuesdayMeals;

  function togglePantry(label: string) {
    setSelectedPantry((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function swapMeal(index: number) {
    const key = `${selectedDay}-${index}`;
    setSwaps((current) => ({
      ...current,
      [key]: ((current[key] ?? 0) + 1) % 2,
    }));
    setStatus(`Meal swapped for ${activeDay.label}. Your budget is still on track.`);
  }

  function regeneratePlan() {
    setSwaps(
      Object.fromEntries(
        meals.map((_, index) => [`${selectedDay}-${index}`, 1]),
      ),
    );
    setStatus("Fresh meals generated around your pantry, budget and time.");
  }

  return (
    <main className="plan-page page">
      <header className="page-title-row">
        <div>
          <p className="kicker">Week of 23 Nov</p>
          <h1>My Meal Plan 🗓</h1>
        </div>
        <button className="soft-action" onClick={regeneratePlan} type="button">
          ↻ Regenerate
        </button>
      </header>

      <div className="week-strip" aria-label="Week days">
        {week.map(({ day, date, label }) => {
          const selected = selectedDay === day;
          return (
            <button
              aria-label={`${label} ${date}`}
              aria-pressed={selected}
              className={selected ? "week-day on" : "week-day"}
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

      <div className="constraint-grid">
        <div className="constraint constraint--budget">
          <strong>💷 £35/wk</strong>
          <span>Budget</span>
        </div>
        <div className="constraint constraint--time">
          <strong>⏱ ≤ 30 min</strong>
          <span>Cook time</span>
        </div>
        <div className="constraint constraint--pantry">
          <strong>🧊 {selectedPantry.size} items</strong>
          <span>Pantry</span>
        </div>
      </div>

      <div className="section-bar section-bar--tight">
        <h2>Using what you have</h2>
        <button
          className="text-link"
          onClick={() => setEditingPantry((current) => !current)}
          type="button"
        >
          {editingPantry ? "Done" : "Edit"}
        </button>
      </div>

      <div className="pantry-chips" aria-label="Pantry ingredients">
        {pantry.map((item) => {
          const selected = selectedPantry.has(item.label);
          return (
            <button
              aria-pressed={selected}
              className={selected ? "pantry-chip on" : "pantry-chip"}
              key={item.label}
              onClick={() => togglePantry(item.label)}
              type="button"
            >
              <span aria-hidden="true">{item.emoji}</span> {item.label}
            </button>
          );
        })}
      </div>

      <h2 className="meals-title">{activeDay.label}’s meals</h2>

      <section className="meal-list" aria-label={`${activeDay.label}'s meals`}>
        {meals.map((meal, index) => {
          const alternative = swapAlternatives[index];
          const displayedName =
            swaps[`${selectedDay}-${index}`] && alternative
              ? alternative
              : meal.name;
          return (
            <article className="meal-row" key={`${selectedDay}-${index}`}>
              <div
                aria-hidden="true"
                className="meal-icon"
                style={{ background: meal.tint }}
              >
                {meal.emoji}
              </div>
              <div className="meal-copy">
                <span>{meal.time}</span>
                <h3>{displayedName}</h3>
                <small>{meal.meta}</small>
              </div>
              <button
                aria-label={`Swap meal ${displayedName}`}
                className="swap-button"
                onClick={() => swapMeal(index)}
                type="button"
              >
                ⇄
              </button>
            </article>
          );
        })}
      </section>

      <Link className="shopping-cta" to="/plan/shopping-list">
        <span aria-hidden="true" className="shopping-cta-icon">
          🛒
        </span>
        <span>
          <strong>Shopping list</strong>
          <small>Only 4 items to buy · £12.40</small>
        </span>
        <b aria-hidden="true">→</b>
      </Link>

      <p aria-live="polite" className="inline-status">
        {status}
      </p>
    </main>
  );
}
