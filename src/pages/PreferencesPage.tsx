import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProfile } from "../app/profile-context";

const cuisines = [
  { label: "Chinese", emoji: "🥟" },
  { label: "Indian", emoji: "🍛" },
  { label: "Italian", emoji: "🍝" },
  { label: "Japanese", emoji: "🍣" },
  { label: "Mexican", emoji: "🌮" },
  { label: "Mediterr.", emoji: "🫒" },
  { label: "British", emoji: "🥧" },
  { label: "Korean", emoji: "🍜" },
];

const dietStyles = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Halal",
  "Low-carb",
  "High-protein",
  "No preference",
];

const allergens = ["Nuts", "Dairy", "Gluten", "Shellfish", "Pork"];

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function PreferencesPage() {
  const { profile, savePreferences } = useProfile();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get("mode") === "edit";
  const [selectedCuisines, setSelectedCuisines] = useState(
    profile.preferences.cuisines,
  );
  const [selectedDiets, setSelectedDiets] = useState(
    profile.preferences.dietStyles,
  );
  const [selectedAllergens, setSelectedAllergens] = useState(
    profile.preferences.avoidAllergens,
  );

  function handleSave() {
    savePreferences({
      cuisines: selectedCuisines,
      dietStyles: selectedDiets,
      avoidAllergens: selectedAllergens,
    });
    navigate(isEditing ? "/me" : "/home");
  }

  return (
    <main className="preferences-page">
      <div className="preferences-inner">
        <div className="preferences-top">
          {isEditing ? (
            <button
              aria-label="Back to me"
              className="round-back"
              onClick={() => navigate("/me")}
              type="button"
            >
              ←
            </button>
          ) : (
            <div className="setup-progress" aria-label="Step 2 of 4">
              <span className="is-done" />
              <span className="is-done" />
              <span />
              <span />
              <em>2 / 4</em>
            </div>
          )}
        </div>

        <header className="preferences-heading">
          {isEditing && <p className="preferences-kicker">Your profile</p>}
          <h1>{isEditing ? "Your food preferences ✨" : "What do you love to eat? 😋"}</h1>
          <p>
            Pick the cuisines you eat often — we’ll keep your meals familiar
            and tasty.
          </p>
        </header>

        <fieldset className="choice-group">
          <legend>Cuisines</legend>
          <div className="cuisine-grid">
            {cuisines.map((cuisine) => {
              const selected = selectedCuisines.includes(cuisine.label);
              return (
                <button
                  aria-label={cuisine.label}
                  aria-pressed={selected}
                  className={selected ? "cuisine-tile on" : "cuisine-tile"}
                  key={cuisine.label}
                  onClick={() =>
                    setSelectedCuisines((current) =>
                      toggleValue(current, cuisine.label),
                    )
                  }
                  type="button"
                >
                  <span aria-hidden="true">{cuisine.emoji}</span>
                  <small>{cuisine.label}</small>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>Diet style</legend>
          <div className="choice-chips">
            {dietStyles.map((diet) => {
              const selected = selectedDiets.includes(diet);
              return (
                <button
                  aria-pressed={selected}
                  className={selected ? "choice-chip on" : "choice-chip"}
                  key={diet}
                  onClick={() =>
                    setSelectedDiets((current) => toggleValue(current, diet))
                  }
                  type="button"
                >
                  {diet}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="choice-group">
          <legend>Avoid &amp; allergies</legend>
          <div className="choice-chips">
            {allergens.map((allergen) => {
              const selected = selectedAllergens.includes(allergen);
              return (
                <button
                  aria-pressed={selected}
                  className={selected ? "choice-chip on" : "choice-chip"}
                  key={allergen}
                  onClick={() =>
                    setSelectedAllergens((current) =>
                      toggleValue(current, allergen),
                    )
                  }
                  type="button"
                >
                  {allergen}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button className="primary-button preferences-save" onClick={handleSave} type="button">
          {isEditing ? "Save changes" : "Continue"}
        </button>
        <p className="preferences-note">
          Saved on this device for the prototype. You can change this any time
          from Me.
        </p>
      </div>
    </main>
  );
}
