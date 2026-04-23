import { Link } from "react-router-dom";

export default function Tracks() {
  return (
    <div className="stack">
      <h1>Strategy Tracks</h1>
      <p className="muted">
        Tracks guide your first 3–5 years with milestones, trade-offs, and recommendations.
      </p>

      <div className="grid3">
        <div className="card cardHover">
          <h3>First Property Path</h3>
          <p>Build runway, clean up debt pressure, then grow deposit and bond readiness.</p>
          <Link className="btn btnPrimary" to="/tracks/first-property">Open track</Link>
        </div>

        <div className="card cardHover">
          <h3>Balanced Lifestyle & Investing</h3>
          <p>Automate saving/investing without killing lifestyle.</p>
          <Link className="btn btnPrimary" to="/tracks/balanced">Open track</Link>
        </div>

        <div className="card cardHover">
          <h3>Aggressive Global Investor</h3>
          <p>Higher investing rate + offshore diversification education.</p>
          <Link className="btn btnPrimary" to="/tracks/aggressive-global">Open Track</Link>
        </div>
      </div>
    </div>
  );
}