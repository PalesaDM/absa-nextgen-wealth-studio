import { useEffect, useMemo, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";

function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value || 0);
}

// Basic amortization monthly payment
function monthlyBondPayment(principal, annualRatePct, years) {
  const r = (annualRatePct / 100) / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Keep consistent with your Snapshot model (simplified)
function estimateTakeHome(gross, pensionPct = 0) {
  const pension = gross * (pensionPct / 100);
  const taxable = Math.max(0, gross - pension);
  let rate = 0.18;
  if (taxable > 50000) rate = 0.23;
  if (taxable > 70000) rate = 0.26;
  const paye = taxable * rate;
  const takeHome = gross - pension - paye;
  return { takeHome };
}

export default function StudioRentVsBuyJhb() {
  const { profile, markStudioViewed } = useUser();
  useEffect(() => {
  markStudioViewed("rent-vs-buy-jhb");
}, [markStudioViewed]);

  const { takeHome } = useMemo(
    () => estimateTakeHome(profile.grossIncome, profile.pensionPct),
    [profile.grossIncome, profile.pensionPct]
  );

  // Defaults pulled from Snapshot/profile
  const [salary, setSalary] = useState(profile.grossIncome ?? 58000);
  const [rent, setRent] = useState(profile.rent ?? 14000);

  // Studio inputs
  const [propertyPrice, setPropertyPrice] = useState(profile.propertyPriceAssumption ?? 1400000);
  const [depositPct, setDepositPct] = useState(profile.depositPctAssumption ?? 10);

  // SA context: prime-ish default (simplified)
  const [interestRate, setInterestRate] = useState(10.25);
  const [termYears, setTermYears] = useState(20);

  // Ownership extras (simplified but realistic)
  const [leviesRates, setLeviesRates] = useState(2200);
  const [homeInsurance, setHomeInsurance] = useState(450);
  const [maintenance, setMaintenance] = useState(600);

  // “Invest the difference” assumption range (simple)
  const [investReturn, setInvestReturn] = useState(10); // % per year
  const [horizonYears, setHorizonYears] = useState(5);

  // Derived numbers
  const deposit = useMemo(() => Math.round(propertyPrice * (depositPct / 100)), [propertyPrice, depositPct]);
  const bondPrincipal = useMemo(() => Math.max(0, propertyPrice - deposit), [propertyPrice, deposit]);

  const bondPayment = useMemo(
    () => monthlyBondPayment(bondPrincipal, interestRate, termYears),
    [bondPrincipal, interestRate, termYears]
  );

  const ownershipMonthly = useMemo(
    () => bondPayment + leviesRates + homeInsurance + maintenance,
    [bondPayment, leviesRates, homeInsurance, maintenance]
  );

  const rentMonthly = rent;

  const monthlyDifference = useMemo(() => ownershipMonthly - rentMonthly, [ownershipMonthly, rentMonthly]);

  // Invest-the-difference future value (simple compounding)
  const investFV = useMemo(() => {
    const monthlyRate = (investReturn / 100) / 12;
    const n = horizonYears * 12;
    const contrib = Math.max(0, monthlyDifference); // if owning costs more, investing difference = owning minus rent? (but here we invest when rent is cheaper)
    // If monthlyDifference > 0, renting is cheaper; invest that difference.
    // If monthlyDifference <= 0, buying is cheaper; invest 0 (or you could invest the savings, but keep MVP simple).
    if (contrib <= 0) return 0;
    // FV of annuity
    return contrib * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
  }, [investReturn, horizonYears, monthlyDifference]);

  // Affordability checks (simple)
  const takeHomeFromSalary = useMemo(() => estimateTakeHome(salary, profile.pensionPct).takeHome, [salary, profile.pensionPct]);

  const fixedCosts = (profile.medicalAid ?? 0) + (profile.otherFixed ?? 0) + rentMonthly + (profile.debtPayments ?? 0);
  const fixedCostsIfBuy = (profile.medicalAid ?? 0) + (profile.otherFixed ?? 0) + ownershipMonthly + (profile.debtPayments ?? 0);

  const freeCashflowRenting = takeHomeFromSalary - fixedCosts;
  const freeCashflowBuying = takeHomeFromSalary - fixedCostsIfBuy;

  // Verdict logic (transparent, simple)
  const verdict = useMemo(() => {
    // If buying makes cashflow negative, it’s a clear “not now”
    if (freeCashflowBuying < 0) {
      return {
        badge: "Needs more buffer",
        summary:
          "Buying at this price/rate would stretch your monthly cashflow. Build your emergency fund and/or reduce debt pressure before committing.",
      };
    }

    // If deposit is low, caution
    if (depositPct < 10) {
      return {
        badge: "Deposit risk",
        summary:
          "A deposit below ~10% can make the bond less comfortable and increases risk if rates rise. Consider renting while you build a stronger deposit buffer.",
      };
    }

    // If owning is much higher than rent, renting + invest can be smart
    if (monthlyDifference > 2500) {
      return {
        badge: "Rent + invest (for now)",
        summary:
          "Owning costs significantly more per month than renting in this scenario. Renting and investing the difference could keep you more flexible while your deposit grows.",
      };
    }

    return {
      badge: "Buy-ready (with discipline)",
      summary:
        "This looks feasible if you keep debt pressure stable and avoid lifestyle creep. Keep a buffer for rate increases and hidden ownership costs.",
    };
  }, [freeCashflowBuying, depositPct, monthlyDifference]);

  return (
    <div className="stack">
      <h1>Studio: Rent vs Buy (Johannesburg)</h1>
      <p className="muted">
        This Studio helps you test trade-offs before you act. It is not advice — it’s a structured comparison using simplified South African assumptions.
      </p>

      <div className="twoCol">
        {/* Inputs */}
        <div className="card">
          <h3>Inputs</h3>

          <label className="field">
            Gross monthly salary (ZAR)
            <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
          </label>

          <label className="field">
            Current rent (monthly)
            <input type="number" value={rent} onChange={(e) => setRent(Number(e.target.value))} />
          </label>

          <hr style={{ borderColor: "var(--border)" }} />

          <label className="field">
            Property price (example range: R1.2m–R1.8m)
            <input type="number" value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))} />
          </label>

          <label className="field">
            Deposit (%)
            <input type="number" value={depositPct} onChange={(e) => setDepositPct(Number(e.target.value))} />
          </label>

          <label className="field">
            Interest rate (% per year) — prime-linked simplification
            <input type="number" step="0.05" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
          </label>

          <label className="field">
            Bond term (years)
            <input type="number" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} />
          </label>

          <hr style={{ borderColor: "var(--border)" }} />

          <label className="field">
            Levies + rates (monthly)
            <input type="number" value={leviesRates} onChange={(e) => setLeviesRates(Number(e.target.value))} />
          </label>

          <label className="field">
            Home insurance (monthly)
            <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} />
          </label>

          <label className="field">
            Maintenance reserve (monthly)
            <input type="number" value={maintenance} onChange={(e) => setMaintenance(Number(e.target.value))} />
          </label>

          <div className="info">
            <strong>Explainer (SA reality):</strong> Ownership is not only the bond repayment. In South Africa you often pay levies (complexes),
            rates and taxes, insurance, and maintenance. This Studio includes simplified placeholders to make hidden costs visible.
          </div>
        </div>

        {/* Outputs */}
        <div className="stack">
          <div className="grid4">
            <div className="tile">
              <div className="tileLabel">Deposit</div>
              <div className="tileValue">{formatZAR(deposit)}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Bond (principal)</div>
              <div className="tileValue">{formatZAR(bondPrincipal)}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Bond payment</div>
              <div className="tileValue">{formatZAR(Math.round(bondPayment))}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Ownership total</div>
              <div className="tileValue">{formatZAR(Math.round(ownershipMonthly))}</div>
            </div>
          </div>

          <div className="card">
            <h3>Studio Verdict: {verdict.badge}</h3>
            <p>{verdict.summary}</p>

            <div className="info">
              <strong>Comparison:</strong> Renting is {formatZAR(rentMonthly)} vs owning at ~{formatZAR(Math.round(ownershipMonthly))} per month.
              {monthlyDifference > 0 ? (
                <> Owning costs about <strong>{formatZAR(Math.round(monthlyDifference))}</strong> more per month in this scenario.</>
              ) : (
                <> Owning costs about <strong>{formatZAR(Math.round(Math.abs(monthlyDifference)))}</strong> less per month in this scenario.</>
              )}
            </div>

            <div className="info">
              <strong>Affordability check:</strong> estimated free cashflow while renting: {formatZAR(freeCashflowRenting)} • while buying: {formatZAR(freeCashflowBuying)}
            </div>
          </div>

          <div className="card">
            <h3>“Invest the difference” (if renting is cheaper)</h3>

            <label className="field">
              Investment return assumption (% per year)
              <input type="number" value={investReturn} onChange={(e) => setInvestReturn(Number(e.target.value))} />
            </label>

            <label className="field">
              Time horizon (years)
              <input type="number" value={horizonYears} onChange={(e) => setHorizonYears(Number(e.target.value))} />
            </label>

            <p className="muted">
              If owning costs more, you could invest the monthly difference while renting. This is a simplified projection to make trade-offs visible.
            </p>

            <div className="info">
              Projected value (rent cheaper → invest difference): <strong>{formatZAR(Math.round(investFV))}</strong>
            </div>

            <div className="info">
              <strong>Explainer (local vs offshore):</strong> Returns are uncertain. SA users also face currency volatility when investing offshore.
              This studio focuses on illustrating the trade-off, not forecasting perfectly.
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" to="/tracks/first-property">Back to Property-First Saver Track</Link>
              <Link className="btn" to="/snapshot">Update Money Snapshot</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}