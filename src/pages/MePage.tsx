import { Link } from "react-router-dom";
import { useProfile } from "../app/profile-context";

export function MePage() {
  const { profile } = useProfile();
  const preferences = profile.preferences;

  return (
    <main className="me-page page">
      <header className="me-header">
        <h1>Me 👤</h1>
        <p>Your tastes, goals and settings in one place.</p>
      </header>

      <section className="profile-banner" aria-label="Profile summary">
        <span aria-hidden="true" className="profile-avatar">
          🧑🏻
        </span>
        <div>
          <h2>{profile.displayName}</h2>
          <p>NutriPal prototype profile</p>
        </div>
        <span className="profile-badge">Local</span>
      </section>

      <section aria-labelledby="goal-heading">
        <div className="section-bar section-bar--tight">
          <h2 id="goal-heading">Today’s targets</h2>
        </div>
        <div className="goal-grid">
          <div className="goal-card goal-card--kcal">
            <strong>{profile.healthTargets.dailyCalories.toLocaleString("en-GB")}</strong>
            <span>kcal / day</span>
          </div>
          <div className="goal-card goal-card--protein">
            <strong>{profile.healthTargets.proteinTargetG}g</strong>
            <span>protein</span>
          </div>
          <div className="goal-card goal-card--budget">
            <strong>£{profile.healthTargets.weeklyBudget}</strong>
            <span>food / week</span>
          </div>
        </div>
      </section>

      <section className="me-card">
        <div className="me-card-heading">
          <div>
            <h2>Food preferences</h2>
            <p>Used to personalise every recommendation.</p>
          </div>
          <Link className="text-link" to="/preferences?mode=edit">
            Edit
          </Link>
        </div>
        <div className="preference-summary">
          <Group label="Cuisines" values={preferences.cuisines} />
          <Group label="Diet style" values={preferences.dietStyles} />
          <Group label="Avoid" values={preferences.avoidAllergens} />
        </div>
      </section>

      <Link className="me-link-card" to="/nudges/settings">
        <span aria-hidden="true" className="me-link-icon">
          🔔
        </span>
        <span>
          <strong>Nudges</strong>
          <small>Balanced · quiet hours 22:00–07:30</small>
        </span>
        <b aria-hidden="true">→</b>
      </Link>

      <Link className="me-link-card" to="/nudges/preview">
        <span aria-hidden="true" className="me-link-icon">
          ✨
        </span>
        <span>
          <strong>Preview a nudge</strong>
          <small>See how a contextual suggestion appears</small>
        </span>
        <b aria-hidden="true">→</b>
      </Link>

      <section className="privacy-note">
        <span aria-hidden="true">🔒</span>
        <p>
          <strong>Private by design.</strong> This prototype keeps preferences
          on this device. No account, camera or location permission is required.
        </p>
      </section>
    </main>
  );
}

function Group({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="preference-group">
      <span>{label}</span>
      <div>
        {values.length > 0 ? (
          values.map((value) => <b key={value}>{value}</b>)
        ) : (
          <small>Not set yet</small>
        )}
      </div>
    </div>
  );
}
