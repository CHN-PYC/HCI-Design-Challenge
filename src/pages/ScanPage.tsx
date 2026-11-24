import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_CALORIES = 610;
const BASE_MACROS = { protein: 34, carbs: 72, fat: 18 };

function ScanFrame() {
  return (
    <svg
      aria-hidden="true"
      className="scan-frame"
      fill="none"
      viewBox="-2.5 -2.5 239 219"
    >
      <path
        d="M0 37V11C0 8.08262 1.15893 5.28473 3.22183 3.22183C5.28473 1.15893 8.08262 0 11 0H37M197 0H223C225.917 0 228.715 1.15893 230.778 3.22183C232.841 5.28473 234 8.08262 234 11V37M234 177V203C234 205.917 232.841 208.715 230.778 210.778C228.715 212.841 225.917 214 223 214H197M37 214H11C8.08262 214 5.28473 212.841 3.22183 210.778C1.15893 208.715 0 205.917 0 203V177"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export function ScanPage() {
  const navigate = useNavigate();
  const [portion, setPortion] = useState(1);
  const calories = new Intl.NumberFormat("en-GB").format(
    BASE_CALORIES * portion,
  );

  function updatePortion(delta: number) {
    setPortion((current) => Math.min(5, Math.max(1, current + delta)));
  }

  return (
    <main className="scan-page">
      <section className="scan-camera" aria-label="Food camera preview">
        <div className="scan-camera-top">
          <button
            aria-label="Close food scan"
            className="scan-round-button"
            onClick={() => navigate("/home")}
            type="button"
          >
            ✕
          </button>
          <strong>Scan food</strong>
          <button
            aria-label="Toggle flash"
            className="scan-round-button"
            type="button"
          >
            ⚡
          </button>
        </div>
        <span aria-hidden="true" className="scan-dish">
          🍜
        </span>
        <ScanFrame />
        <span className="scan-detected">✓ Detected</span>
      </section>

      <section className="scan-sheet" aria-label="Food recognition result">
        <div aria-hidden="true" className="scan-sheet-handle" />
        <header className="scan-result-heading">
          <div>
            <h1>Beef Noodle Soup</h1>
            <button className="scan-edit" type="button">
              Not right? Edit dish ✎
            </button>
          </div>
          <span className="scan-match">92% match</span>
        </header>

        <div className="scan-calorie-card">
          <div>
            <p className="scan-calories">
              ≈ <span aria-label="Estimated calories">{calories}</span>{" "}
              <small>kcal</small>
            </p>
            <p className="scan-estimate">Estimated for 1 bowl (≈550 g)</p>
          </div>
          <div className="scan-stepper">
            <button
              aria-label="Decrease portion"
              onClick={() => updatePortion(-1)}
              type="button"
            >
              −
            </button>
            <b aria-label="Portion quantity">{portion}</b>
            <button
              aria-label="Increase portion"
              onClick={() => updatePortion(1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="scan-macros">
          <div className="scan-macro">
            <span>Protein</span>
            <i><b style={{ width: "62%", background: "var(--accent)" }} /></i>
            <strong>{BASE_MACROS.protein * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>Carbs</span>
            <i><b style={{ width: "78%", background: "var(--amber)" }} /></i>
            <strong>{BASE_MACROS.carbs * portion} g</strong>
          </div>
          <div className="scan-macro">
            <span>Fat</span>
            <i><b style={{ width: "40%", background: "var(--coral)" }} /></i>
            <strong>{BASE_MACROS.fat * portion} g</strong>
          </div>
        </div>

        <div className="scan-ingredients">
          <h2>Detected ingredients</h2>
          <div className="scan-chips">
            {["🍜 Noodles", "🥩 Beef", "🥬 Bok choy", "🌿 Spring onion"].map(
              (ingredient) => (
                <span className="scan-chip" key={ingredient}>
                  {ingredient}
                </span>
              ),
            )}
          </div>
        </div>

        <button
          aria-label="Log to Dinner — add to today's log"
          className="scan-log-button"
          onClick={() => navigate("/home")}
          type="button"
        >
          Add to today’s log
        </button>
      </section>
    </main>
  );
}
