import { Link } from "react-router-dom";

export function PlanPage() {
  return (
    <main className="screen">
      <p className="eyebrow">F03 · Module scaffold</p>
      <h1>Practical Meal Planning</h1>
      <p className="lede">
        Weekly planning, budget constraints, pantry items and meal swaps will
        be implemented through the meal-plan repository in acceptance cycle 4.
      </p>
      <Link className="primary-button primary-button--link" to="/plan/shopping-list">
        Open shopping list
      </Link>
    </main>
  );
}
