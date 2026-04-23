import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const studioMeta = {
  "rent-vs-buy-jhb": {
    title: "Rent vs Buy (Johannesburg)",
    desc: "Compare rent vs bond costs, levies/rates and affordability using simplified SA assumptions.",
    to: "/studios/rent-vs-buy-jhb",
  },
};

export default function Studios() {
  const { profile } = useUser();
  const recent = profile.recentStudios || [];

  return (
    <div className="stack">
      <h1>Simulation Lab</h1>
      <p className="muted">Interactive studios that compare real trade-offs in SA context.</p>

      {recent.length > 0 && (
        <div className="card">
          <h3>Recently viewed</h3>
          <div className="grid3">
            {recent.map((slug) => {
              const s = studioMeta[slug];
              if (!s) return null;
              return (
                <div className="card cardEqual" key={slug}>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.desc}</p>
                  <Link className="btn" to={s.to}>Continue →</Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid3">
        <div className="card cardEqual cardHover">
          <h3>Rent vs Buy in Johannesburg</h3>
          <p>Compare rent vs bond costs, deposit, and affordability using simplified assumptions.</p>
          <Link className="btn btnPrimary" to="/studios/rent-vs-buy-jhb">Open studio</Link>
        </div>

        <div className="card cardEqual cardHover">
          <h3>Car Finance vs Uber + Invest</h3>
          <p className="muted">
            Compare the true monthly cost of owning a financed car vs ride-hailing, then estimate investing the difference over 3-5 years.
          </p>
          <Link className="btn btnPrimary" to="/studios/car-vs-uber">Open Studio</Link>
        </div>

        <div className="card cardEqual cardHover">
          <h3>Local vs Offshore Allocation</h3>
          <p className="muted">
            Explore how splitting contributions between local and offshore exposure changes risk and outcomes over 5 years.
          </p>
          <Link className="btn btnPrimary" to="/studios/local-vs-offshore">Open studio</Link>
        </div>
      </div>
    </div>
  );
}