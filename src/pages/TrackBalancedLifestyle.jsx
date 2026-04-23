import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

export default function TrackBalancedLifestyle() {
  const { profile } = useUser();

  return (
    <div className="stack">
      <h1>Strategy Track: Balanced Lifestyle & Investing</h1>
      <p className="muted">
        For high-earning young professionals who want steady wealth-building without “all sacrifice”.
        This track balances lifestyle, emergency fund, debt stability, and a consistent investing habit.
      </p>

      <div className="card">
        <h3>Who this is for</h3>
        <ul>
          <li>Income is stable, but lifestyle spending can creep.</li>
          <li>You want progress without feeling deprived.</li>
          <li>You’d rather “automate and forget” than constantly budget.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Priorities (and what it avoids)</h3>
        <ul>
          <li><strong>Prioritises:</strong> emergency fund → debt pressure control → automated investing → planned lifestyle spending.</li>
          <li><strong>Avoids:</strong> large new instalments (car/credit) while goals are not automated.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Milestones (3–5 years)</h3>
        <ol>
          <li><strong>Months 0–6:</strong> Build a starter buffer and stabilise essentials (rent, medical aid, fixed costs).</li>
          <li><strong>Year 1:</strong> Debt pressure consistently manageable (avoid new finance).</li>
          <li><strong>Year 1–2:</strong> Automate investing (monthly transfer on payday).</li>
          <li><strong>Year 2–3:</strong> Increase contribution rate gradually as income rises.</li>
          <li><strong>Year 3–5:</strong> Decide: property path / offshore tilt / business runway (based on numbers).</li>
        </ol>
      </div>

      <div className="card">
        <h3>Nudges you’ll see</h3>
        <ul>
          <li>“Lifestyle creep detected: fixed costs rose faster than income.”</li>
          <li>“Investing streak: 6 months consistent — consider a small step-up.”</li>
          <li>“Debt pressure climbing — delay upgrades until it drops below target.”</li>
        </ul>
        <div className="info">
          SA context: medical aid + transport are common “silent” fixed-cost growth areas.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link className="btn btnPrimary" to="/studios/local-vs-offshore">Run: Local vs Offshore Studio</Link>
        <Link className="btn" to="/tracks">Back to Tracks</Link>
        <Link className="btn btnGhost" to="/snapshot">Update Snapshot</Link>
      </div>
    </div>
  );
}