import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="stack">
      <h1>ABSA NextGen Wealth Studio – First Five Years</h1>
      <p className="muted">
        A digital companion for high-earning young professionals in South Africa to make confident,
        practical money decisions (rent vs buy, car vs invest, saving vs lifestyle).
      </p>

      <div className="grid3">
        <div className="card">
          <h3>Money Snapshot</h3>
          <p>See your take-home estimate, fixed costs, debt pressure, and free cashflow in ZAR.</p>
          <Link className="btn btnPrimary" to="/snapshot">Open Snapshot</Link>
        </div>

        <div className="card">
          <h3>Strategy Track</h3>
          <p>Follow one track end-to-end with milestones, progress toggles, and trade-offs.</p>
          <Link className="btn btnPrimary" to="/tracks">View Tracks</Link>
        </div>

        <div className="card">
          <h3>Simulation Lab</h3>
          <p>Interactive studio with the inputs → outputs and a clear verdict in SA context.</p>
          <Link className="btn btnPrimary" to="/studios">Open Studios</Link>
        </div>
      </div>
    </div>
  );
}