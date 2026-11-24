import { useState } from "react";

type Frequency = "Fewer" | "Balanced" | "More";

const frequencies: Frequency[] = ["Fewer", "Balanced", "More"];
const snoozeOptions = ["1 hour", "Today", "1 week"];

const categoryDefaults = [
  {
    label: "Quiet hours",
    description: "22:00 – 07:30",
    emoji: "🌙",
    enabled: true,
  },
  {
    label: "Meal ideas",
    description: "Suggestions around mealtimes",
    emoji: "🍽",
    enabled: true,
  },
  {
    label: "Hydration reminders",
    description: "Gentle prompts through the day",
    emoji: "💧",
    enabled: false,
  },
  {
    label: "Snack swaps",
    description: "Lighter choices when you snack",
    emoji: "🍎",
    enabled: true,
  },
];

export function NudgesSettingsPage() {
  const [proactive, setProactive] = useState(true);
  const [frequency, setFrequency] = useState<Frequency>("Balanced");
  const [snooze, setSnooze] = useState<string | null>(null);
  const [categories, setCategories] = useState(categoryDefaults);
  const [feedback, setFeedback] = useState(false);

  function toggleCategory(label: string) {
    setCategories((current) =>
      current.map((category) =>
        category.label === label
          ? { ...category, enabled: !category.enabled }
          : category,
      ),
    );
  }

  return (
    <main className="nudges-page page">
      <header className="nudges-header">
        <h1>Nudge settings 🔔</h1>
        <p>You decide when NutriPal speaks up.</p>
      </header>

      <section className="settings-card">
        <button
          aria-label="Proactive suggestions"
          aria-pressed={proactive}
          className="setting-row setting-row--master"
          onClick={() => setProactive((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" className="setting-icon">
            ✨
          </span>
          <span className="setting-copy">
            <strong>Proactive suggestions</strong>
            <small>Meal ideas based on time, place &amp; goals</small>
          </span>
          <span aria-hidden="true" className={proactive ? "switch on" : "switch"} />
        </button>

        <div className="snooze-row">
          <span>⏸ Snooze:</span>
          <div className="snooze-options">
            {snoozeOptions.map((option) => (
              <button
                aria-pressed={snooze === option}
                className={snooze === option ? "tiny-chip on" : "tiny-chip"}
                key={option}
                onClick={() =>
                  setSnooze((current) => (current === option ? null : option))
                }
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="segmented" aria-label="Nudge frequency" role="group">
          {frequencies.map((option) => (
            <button
              aria-pressed={frequency === option}
              className={frequency === option ? "on" : ""}
              key={option}
              onClick={() => setFrequency(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-card settings-card--categories">
        {categories.map((category) => (
          <button
            aria-label={category.label}
            aria-pressed={category.enabled}
            className="setting-row"
            key={category.label}
            onClick={() => toggleCategory(category.label)}
            type="button"
          >
            <span aria-hidden="true" className="setting-icon">
              {category.emoji}
            </span>
            <span className="setting-copy">
              <strong>{category.label}</strong>
              <small>{category.description}</small>
            </span>
            <span
              aria-hidden="true"
              className={category.enabled ? "switch on" : "switch"}
            />
          </button>
        ))}
      </section>

      <section className="explanation-card" id="why-last">
        <h2>
          <span aria-hidden="true">💡</span>{" "}
          <span>Why you got the last nudge</span>
        </h2>
        <p>
          <span aria-hidden="true">📍</span> You were leaving the gym
        </p>
        <p>
          <span aria-hidden="true">🕕</span> 4 hours since your last meal
        </p>
        <p>
          <span aria-hidden="true">💪</span> Protein below today’s goal
        </p>
        <p>
          <span aria-hidden="true">🍚</span> Rice in your pantry expires soon
        </p>
        <button
          className="feedback-link"
          onClick={() => setFeedback(true)}
          type="button"
        >
          {feedback ? "Thanks — we’ll use this feedback." : "Not helpful? Tell us →"}
        </button>
      </section>

      <p aria-live="polite" className="inline-status">
        {snooze ? `Nudges paused for ${snooze.toLowerCase()}.` : ""}
      </p>
    </main>
  );
}
