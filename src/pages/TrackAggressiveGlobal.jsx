import { Link } from "react-router-dom";

export default function TrackAggressiveGlobal() {
  return (
    <div className="stack">
      <h1>Strategy Track: Aggressive Global Investor</h1>
      <p className="muted">
        For users who want faster wealth accumulation and diversification, and can tolerate volatility.
        This track prioritises high contribution rates and offshore exposure (with realistic SA trade-offs).
      </p>

      <div className="card">
        <h3>Who this is for</h3>
        <ul>
          <li>Comfortable with market swings and long-term discipline.</li>
          <li>Wants diversification beyond SA exposure.</li>
          <li>Can avoid big new monthly commitments for 12–24 months.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Priorities (and what it avoids)</h3>
        <ul>
          <li><strong>Prioritises:</strong> emergency fund → high contribution rate → offshore allocation plan → cost control.</li>
          <li><strong>Avoids:</strong> high lifestyle inflation + large instalments that reduce monthly invest capacity.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Milestones (3–5 years)</h3>
        <ol>
          <li><strong>Months 0–6:</strong> Emergency fund locked in (3 months of essentials).</li>
          <li><strong>Year 1:</strong> Contribution rate increases (step-up every 3–6 months).</li>
          <li><strong>Year 1–2:</strong> Offshore allocation established (rules-based, not emotional).</li>
          <li><strong>Year 2–3:</strong> Consolidate: reduce fees, keep behaviour stable.</li>
          <li><strong>Year 3–5:</strong> Decide: property vs continue aggressive investing (based on opportunity cost).</li>
        </ol>
      </div>

      <div className="card">
        <h3>Trade-offs (SA context)</h3>
        <ul>
          <li>Currency volatility can help or hurt over 1–2 years.</li>
          <li>Offshore investing isn’t “guaranteed returns” — discipline matters.</li>
          <li>Don’t ignore local obligations (medical aid, insurance, debt).</li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link className="btn btnPrimary" to="/studios/local-vs-offshore">Run: Local vs Offshore Studio</Link>
        <Link className="btn" to="/tracks">Back to Tracks</Link>
      </div>
    </div>
  );
}