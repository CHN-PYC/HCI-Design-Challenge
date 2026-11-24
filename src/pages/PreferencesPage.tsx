import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../app/profile-context";

const cuisines = ["Chinese", "Indian", "Italian", "Japanese"];
const dietStyles = ["Vegetarian", "Vegan", "Pescatarian", "Halal"];

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function PreferencesPage() {
  const { profile, savePreferences } = useProfile();
  const navigate = useNavigate();
  const [selectedCuisines, setSelectedCuisines] = useState(
    profile.preferences.cuisines,
  );
  const [selectedDiets, setSelectedDiets] = useState(
    profile.preferences.dietStyles,
  );

  function handleContinue() {
    savePreferences({
      cuisines: selectedCuisines,
      dietStyles: selectedDiets,
      avoidAllergens: profile.preferences.avoidAllergens,
    });
    navigate("/home");
  }

  return (
    <main className="screen screen--preferences">
      <p className="eyebrow">First-time setup</p>
      <h1>Dietary &amp; Cultural Preferences</h1>
      <p className="lede">
        Tell NutriPal what you enjoy eating. Preferences are stored locally for
        this scaffold and will move behind the reserved API contract later.
      </p>

      <fieldset className="choice-group">
        <legend>Cuisines</legend>
        <div className="chip-row">
          {cuisines.map((cuisine) => {
            const selected = selectedCuisines.includes(cuisine);
            return (
              <button
                aria-pressed={selected}
                className="choice-chip"
                key={cuisine}
                onClick={() =>
                  setSelectedCuisines((current) =>
                    toggleValue(current, cuisine),
                  )
                }
                type="button"
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="choice-group">
        <legend>Diet style</legend>
        <div className="chip-row">
          {dietStyles.map((diet) => {
            const selected = selectedDiets.includes(diet);
            return (
              <button
                aria-pressed={selected}
                className="choice-chip"
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

      <button className="primary-button" onClick={handleContinue} type="button">
        Continue
      </button>
    </main>
  );
}
