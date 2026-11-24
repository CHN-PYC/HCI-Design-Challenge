import { Link } from "react-router-dom";

export function ShoppingListPage() {
  return (
    <main className="screen">
      <p className="eyebrow">F03b · Module scaffold</p>
      <h1>Shopping List</h1>
      <p className="lede">
        This route is reserved for shopping items generated from the current
        weekly meal plan.
      </p>
      <Link className="text-link" to="/plan">
        Back to meal plan
      </Link>
    </main>
  );
}
