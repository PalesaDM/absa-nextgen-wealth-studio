export default function Profile() {
  return (
    <div className="stack">
      <h1>Profile</h1>
      <p className="muted">
        Next: we will store your inputs here (income, city, time horizon) and consent settings.
      </p>

      <div className="card">
        <h3>POPIA-minded controls (MVP)</h3>
        <ul>
          <li>Data used only to generate your plan and simulations</li>
          <li>Ability to reset profile (later: export/delete)</li>
        </ul>
      </div>
    </div>
  );
}