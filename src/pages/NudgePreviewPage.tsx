export function NudgePreviewPage() {
  return (
    <main className="screen screen--preview">
      <p className="eyebrow">F04 · Proactive preview</p>
      <h1>Heading home?</h1>
      <p className="lede">
        Dinner in 15 minutes using your leftover rice. This simulated nudge
        demonstrates the proactive-notification entry point without requesting
        system permission.
      </p>
      <article className="recommendation-card">
        <p className="eyebrow">Tomato Egg Stir-fry</p>
        <p>15 min · 490 kcal · 28g protein</p>
        <p className="why-note">
          Because you are leaving the gym, it has been four hours since lunch,
          and your rice expires tomorrow.
        </p>
      </article>
    </main>
  );
}
