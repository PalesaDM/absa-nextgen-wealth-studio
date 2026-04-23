import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function formatZAR(v) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(v || 0);
}

export default function StudioLocalVsOffshore() {
  const [monthlyContribution, setMonthlyContribution] = useState(3500);
  const [years, setYears] = useState(5);

  // Simplified return assumptions
  const [localReturn, setLocalReturn] = useState(9);
  const [offshoreReturn, setOffshoreReturn] = useState(10);

  const [fxEffect, setFxEffect] = useState(0);

  const [offshorePct, setOffshorePct] = useState(50);

  const fv = (contrib, annualRatePct, yrs) => {
    const r = (annualRatePct / 100) / 12;
    const n = yrs * 12;
    return contrib * ((Math.pow(1 + r, n) - 1) / r);
  };

  const results = useMemo(() => {
    const offshoreAdj = offshoreReturn + fxEffect;

    const localContrib = monthlyContribution * (1 - offshorePct / 100);
    const offContrib = monthlyContribution * (offshorePct / 100);

    const localFV = fv(localContrib, localReturn, years);
    const offFV = fv(offContrib, offshoreAdj, years);

    return {
      localContrib,
      offContrib,
      localFV,
      offFV,
      totalFV: localFV + offFV,
      offshoreAdj,
    };
  }, [monthlyContribution, years, localReturn, offshoreReturn, fxEffect, offshorePct]);

  const verdict = useMemo(() => {
    if (offshorePct >= 70) return { badge: "High offshore tilt", note: "Good diversification, but expect volatility. Stick to rules when ZAR swings." };
    if (offshorePct >= 40) return { badge: "Balanced diversification", note: "A blended approach: reduces single-market risk while keeping local relevance." };
    return { badge: "Local-heavy", note: "Simpler and often lower currency volatility, but less global diversification." };
  }, [offshorePct]);

  return (
    <div className="stack">
      <h1>Studio: Local vs Offshore Allocation (5 years)</h1>
      <p className="muted">
        Explore how splitting contributions between local and offshore exposure can change outcomes. This is a simplified learning studio, not a forecast.
      </p>

      <div className="twoCol">
        <div className="card">
          <h3>Inputs</h3>

          <label className="field">Monthly contribution
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
          </label>

          <label className="field">Time horizon (years)
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
          </label>

          <hr />

          <label className="field">Offshore allocation (%)
            <input type="number" value={offshorePct} onChange={(e) => setOffshorePct(Number(e.target.value))} />
          </label>

          <label className="field">Local return assumption (%/yr)
            <input type="number" value={localReturn} onChange={(e) => setLocalReturn(Number(e.target.value))} />
          </label>

          <label className="field">Offshore return assumption (%/yr)
            <input type="number" value={offshoreReturn} onChange={(e) => setOffshoreReturn(Number(e.target.value))} />
          </label>

          <label className="field">FX effect (%/yr) (simplified)
            <input type="number" value={fxEffect} onChange={(e) => setFxEffect(Number(e.target.value))} />
          </label>

          <div className="info">
            SA context: offshore outcomes can be boosted or hurt by ZAR moves. This slider represents currency tailwind/headwind in a simplified way.
          </div>
        </div>

        <div className="stack">
          <div className="grid4">
            <div className="tile"><div className="tileLabel">Local contrib</div><div className="tileValue">{formatZAR(results.localContrib)}</div></div>
            <div className="tile"><div className="tileLabel">Offshore contrib</div><div className="tileValue">{formatZAR(results.offContrib)}</div></div>
            <div className="tile"><div className="tileLabel">Offshore adj. return</div><div className="tileValue">{results.offshoreAdj.toFixed(1)}%</div></div>
            <div className="tile"><div className="tileLabel">Verdict</div><div className="tileValue">{verdict.badge}</div></div>
          </div>

          <div className="card">
            <h3>Studio Verdict: {verdict.badge}</h3>
            <p>{verdict.note}</p>
            <div className="info">
              Local FV: <strong>{formatZAR(Math.round(results.localFV))}</strong> • Offshore FV: <strong>{formatZAR(Math.round(results.offFV))}</strong> • Total: <strong>{formatZAR(Math.round(results.totalFV))}</strong>
            </div>
          </div>

          <div className="card">
            <h3>What you learn here</h3>
            <ul>
              <li>Allocation changes risk exposure, not just “return”.</li>
              <li>Currency can dominate short-term results.</li>
              <li>Discipline matters more than perfect assumptions.</li>
            </ul>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" to="/studios">Back to Studios</Link>
              <Link className="btn btnPrimary" to="/tracks/balanced">Go to Balanced Track</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}