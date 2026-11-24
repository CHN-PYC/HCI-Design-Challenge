export function HomePage() {
  return (
    <main className="screen">
      <p className="eyebrow">F02</p>
      <h1>Personalised Meal Recommendations</h1>
      <p className="lede">Good evening, Alex. Your prototype data is ready.</p>
      <section className="summary-card" aria-label="Daily nutrition summary">
        <p className="summary-card__value">1,240 / 1,900 kcal</p>
        <div className="macro-row">
          <span>Protein 62g</span>
          <span>Carbs 140g</span>
          <span>Fat 38g</span>
        </div>
      </section>
      <section aria-labelledby="picked-for-you">
        <div className="section-heading">
          <h2 id="picked-for-you">Picked for you</h2>
          <button className="text-button" type="button">See all</button>
        </div>
        <article className="recommendation-card">
          <h3>Mapo Tofu &amp; Brown Rice</h3>
          <p>25 min · 520 kcal · £3.20</p>
          <p className="why-note">
            You love Sichuan food and need more protein today.
          </p>
        </article>
      </section>
    </main>
  );
}
