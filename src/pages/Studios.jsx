import { Link } from "react-router-dom";

export default function Studios() {
  return (
    <div className="stack">
      <h1>Simulation Lab</h1>
      <p className="muted">Interactive studios that compare real trade-offs in SA context.</p>

      <div className="grid3">
        <div className="card">
          <h3>Rent vs Buy in Johannesburg</h3>
          <p>Compare rent vs bond costs, deposit, and affordability using simplified assumptions.</p>
          <Link className="btn" to="/studios/rent-vs-buy-jhb">Open studio</Link>
        </div>

        <div className="card">
          <h3>Car Finance vs Uber + Invest</h3>
          <p>Coming in RC2</p>
        </div>

        <div className="card">
          <h3>Local vs Offshore Allocation</h3>
          <p>Coming in RC2</p>
        </div>
      </div>
    </div>
  );
}