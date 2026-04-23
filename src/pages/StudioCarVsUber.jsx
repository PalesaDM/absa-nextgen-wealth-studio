import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function formatZAR(v) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(v || 0);
}

export default function StudioCarVsUber() {
  // Inputs (simplified SA assumptions)
  const [carInstallment, setCarInstallment] = useState(6500);
  const [insurance, setInsurance] = useState(1600);
  const [fuel, setFuel] = useState(2200);
  const [maintenance, setMaintenance] = useState(600);
  const [parkingTolls, setParkingTolls] = useState(800);

  const [uberMonthly, setUberMonthly] = useState(4500);

  const [investReturn, setInvestReturn] = useState(10);
  const [years, setYears] = useState(5);

  const carTotal = useMemo(
    () => carInstallment + insurance + fuel + maintenance + parkingTolls,
    [carInstallment, insurance, fuel, maintenance, parkingTolls]
  );

  const monthlyDiff = useMemo(() => carTotal - uberMonthly, [carTotal, uberMonthly]);

  const investFV = useMemo(() => {
    // If Uber is cheaper, invest the difference. If car is cheaper, invest 0 (keep MVP simple).
    const contrib = Math.max(0, monthlyDiff);
    if (contrib <= 0) return 0;
    const r = (investReturn / 100) / 12;
    const n = years * 12;
    return contrib * ((Math.pow(1 + r, n) - 1) / r);
  }, [monthlyDiff, investReturn, years]);

  const verdict = useMemo(() => {
    if (monthlyDiff > 2500) return { badge: "Costly upgrade", note: "Car ownership is materially more expensive than Uber in this scenario. It may delay deposit/investing goals." };
    if (monthlyDiff > 0) return { badge: "Trade-off zone", note: "Car costs more than Uber. If you choose the car, do it with a clear plan and capped lifestyle creep." };
    return { badge: "Car is not more expensive", note: "In this scenario the car is not costing more than Uber. Consider non-financial factors (safety, commute, reliability)." };
  }, [monthlyDiff]);

  return (
    <div className="stack">
      <h1>Studio: Car Finance vs Uber + Invest</h1>
      <p className="muted">
        Compare monthly ownership costs (instalment + insurance + fuel + maintenance) vs Uber, then estimate the value of investing the difference.
      </p>

      <div className="twoCol">
        <div className="card">
          <h3>Inputs</h3>

          <label className="field">Car instalment (monthly)
            <input type="number" value={carInstallment} onChange={(e) => setCarInstallment(Number(e.target.value))} />
          </label>

          <label className="field">Insurance (monthly)
            <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} />
          </label>

          <label className="field">Fuel (monthly)
            <input type="number" value={fuel} onChange={(e) => setFuel(Number(e.target.value))} />
          </label>

          <label className="field">Maintenance reserve (monthly)
            <input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
          </label>

          <label className="field">Parking + tolls (monthly)
            <input type="number" value={parkingTolls} onChange={(e) => setParkingTolls(Number(e.target.value))} />
          </label>

          <hr />

          <label className="field">Uber / ride-hailing (monthly)
            <input type="number" value={uberMonthly} onChange={(e) => setUberMonthly(Number(e.target.value))} />
          </label>

          <div className="info">
            SA context: insurance + fuel volatility + maintenance are often underestimated. Balloon payments can also hide real affordability.
          </div>
        </div>

        <div className="stack">
          <div className="grid4">
            <div className="tile"><div className="tileLabel">Car total</div><div className="tileValue">{formatZAR(carTotal)}</div></div>
            <div className="tile"><div className="tileLabel">Uber total</div><div className="tileValue">{formatZAR(uberMonthly)}</div></div>
            <div className="tile"><div className="tileLabel">Difference</div><div className="tileValue">{formatZAR(Math.abs(monthlyDiff))}</div></div>
            <div className="tile"><div className="tileLabel">Cheaper option</div><div className="tileValue">{monthlyDiff > 0 ? "Uber" : "Car"}</div></div>
          </div>

          <div className="card">
            <h3>Studio Verdict: {verdict.badge}</h3>
            <p>{verdict.note}</p>
            <div className="info">
              If Uber is cheaper, you could invest the monthly difference to protect your five-year goals.
            </div>
          </div>

          <div className="card">
            <h3>Invest the difference (if Uber is cheaper)</h3>
            <label className="field">Return assumption (% per year)
              <input type="number" value={investReturn} onChange={(e) => setInvestReturn(Number(e.target.value))} />
            </label>
            <label className="field">Time horizon (years)
              <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </label>

            <div className="info">
              Projected value (investing the difference): <strong>{formatZAR(Math.round(investFV))}</strong>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" to="/studios">Back to Studios</Link>
              <Link className="btn btnPrimary" to="/tracks/first-property">Back to Property Track</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}