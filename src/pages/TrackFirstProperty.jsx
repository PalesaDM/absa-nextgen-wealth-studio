import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value || 0);
}


function estimateTakeHome(gross, pensionPct = 0) {
  const pension = gross * (pensionPct / 100);
  const taxable = Math.max(0, gross - pension);

  let rate = 0.18;
  if (taxable > 50000) rate = 0.23;
  if (taxable > 70000) rate = 0.26;

  const paye = taxable * rate;
  const takeHome = gross - pension - paye;

  return { takeHome, paye, pension };
}

const STORAGE_KEY = "absa_nextgen_track_first_property_progress_v1";

export default function TrackFirstProperty() {
  const { profile } = useUser();


  const { takeHome } = useMemo(
    () => estimateTakeHome(profile.grossIncome, profile.pensionPct),
    [profile.grossIncome, profile.pensionPct]
  );

  const fixedCosts = profile.rent + profile.medicalAid + profile.otherFixed;
  const freeCashflow = takeHome - fixedCosts - profile.debtPayments;
  const debtPressure = takeHome > 0 ? profile.debtPayments / takeHome : 0;

  const essentials = profile.rent + profile.medicalAid + profile.otherFixed;
  const efTarget = essentials * (profile.emergencyFundTargetMonths ?? 3);


  const derivedDepositTarget =
    profile.propertyDepositTarget ??
    Math.round((profile.propertyPriceAssumption ?? 1400000) * ((profile.depositPctAssumption ?? 10) / 100));

  // Suggested monthly contributions 
  const suggestedEmergency = Math.max(0, Math.min(freeCashflow * 0.35, 3500));
  const suggestedDeposit = Math.max(0, Math.min(freeCashflow * 0.45, 6500));

  const monthsToEF = suggestedEmergency > 0 ? Math.ceil(efTarget / suggestedEmergency) : null;
  const monthsToDeposit = suggestedDeposit > 0 ? Math.ceil(derivedDepositTarget / suggestedDeposit) : null;

  // ---- Milestones (5) ----
  const milestones = useMemo(
    () => [
      {
        id: "m1",
        year: "Year 1",
        title: "Build emergency fund (starter buffer → target)",
        why: "Stability first. A 3-month buffer stops debt spirals when life happens.",
        doneWhen: `Emergency fund target reached: ${profile.emergencyFundTargetMonths ?? 3} months of essentials.`,
        tradeOff: "If you upgrade your lifestyle too early, your buffer stays fragile.",
      },
      {
        id: "m2",
        year: "Year 1–2",
        title: "Reduce debt pressure (especially revolving credit)",
        why: "High monthly repayments reduce bond affordability and deposit momentum.",
        doneWhen: "Debt pressure consistently below ~25% of take-home.",
        tradeOff: "Big car instalments can delay your deposit timeline dramatically.",
      },
      {
        id: "m3",
        year: "Year 2",
        title: "Deposit ramp (consistent saving + transfer-cost buffer)",
        why: "Deposits and transfer-related costs are the biggest early barriers in SA property buying.",
        doneWhen: `Deposit target built: ${formatZAR(derivedDepositTarget)} (plus a small buffer).`,
        tradeOff: "Entertainment and convenience spending often eats the deposit silently.",
      },
      {
        id: "m4",
        year: "Year 2–3",
        title: "Bond readiness (affordability + clean repayment behaviour)",
        why: "Bond readiness is not only salary—it's clean, reliable repayment behaviour.",
        doneWhen: "Stable cashflow, low missed payments, manageable fixed costs, and realistic monthly bond.",
        tradeOff: "Rising fixed costs (rent, subscriptions, lifestyle creep) reduce borrowing capacity.",
      },
      {
        id: "m5",
        year: "Year 3–5",
        title: "Execute: buy or reassess (based on numbers, not pressure)",
        why: "Buying is a decision. Renting can be strategic if it protects investing and flexibility.",
        doneWhen: "You can afford ownership costs comfortably without breaking your investing discipline.",
        tradeOff: "Buying too early can lock you into high costs and reduce growth.",
      },
    ],
    [
      profile.emergencyFundTargetMonths,
      derivedDepositTarget
    ]
  );

  // ---- Progress state (Not started / In progress / Done) ----
  const [progress, setProgress] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return saved;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const statusLabel = (id) => progress[id] || "Not started";
  const setStatus = (id, value) => setProgress((p) => ({ ...p, [id]: value }));

  // Simple progress % for display
  const progressPct = useMemo(() => {
    const total = milestones.length;
    const done = milestones.filter((m) => statusLabel(m.id) === "Done").length;
    return Math.round((done / total) * 100);
  }, [milestones, progress]);

  
  const recommendations = useMemo(() => {
    const recs = [];

    if (freeCashflow <= 0) {
      recs.push({
        title: "Your plan is under pressure",
        body:
          "Your free cashflow is negative or too tight. Before pushing deposit goals, reduce fixed costs or debt repayments. Start with one lever: transport, subscriptions, or revolving credit.",
        action: { label: "Update Money Snapshot", to: "/snapshot" },
        kind: "warn",
      });
      return recs;
    }

    if (debtPressure >= 0.25) {
      recs.push({
        title: "Debt pressure is limiting your property timeline",
        body:
          `Your debt repayments are about ${(debtPressure * 100).toFixed(0)}% of take-home. Aim to get this below ~25% before scaling deposit contributions.`,
        action: { label: "Run a Studio", to: "/studios/rent-vs-buy-jhb" },
        kind: "warn",
      });
    } else {
      recs.push({
        title: "Debt pressure looks manageable",
        body:
          `Your debt pressure is ${(debtPressure * 100).toFixed(0)}%. Keep repayments stable and avoid new high instalments while you ramp your deposit.`,
        action: { label: "View Milestones", to: "#milestones" },
        kind: "ok",
      });
    }

    recs.push({
      title: "Emergency fund recommendation",
      body:
        monthsToEF
          ? `If you set aside about ${formatZAR(suggestedEmergency)} per month, you could reach your emergency fund target in ~${monthsToEF} months.`
          : "Set a monthly emergency fund contribution to build stability before major commitments.",
      action: { label: "Adjust Snapshot Inputs", to: "/snapshot" },
      kind: "ok",
    });

    recs.push({
      title: "Deposit ramp recommendation",
      body:
        monthsToDeposit
          ? `If you dedicate about ${formatZAR(suggestedDeposit)} per month, you could build your deposit in ~${monthsToDeposit} months (excluding transfer-cost buffer).`
          : "Once your buffer is stable, dedicate a consistent monthly deposit contribution (automated).",
      action: { label: "Run Rent vs Buy Studio", to: "/studios/rent-vs-buy-jhb" },
      kind: "ok",
    });

    return recs;
  }, [
    freeCashflow,
    debtPressure,
    monthsToEF,
    suggestedEmergency,
    monthsToDeposit,
    suggestedDeposit,
  ]);


  const nudges = useMemo(() => {
    const n = [];
    if (debtPressure > 0.30) {
      n.push("Your debt repayments are heavy. Avoid new finance commitments this quarter.");
    }
    if (profile.rent > takeHome * 0.35) {
      n.push("Housing cost is high relative to take-home. This can slow your deposit timeline.");
    }
    if (freeCashflow > 0 && freeCashflow < 2000) {
      n.push("Cashflow is positive but thin—build stability before big upgrades.");
    }
    if (freeCashflow > 5000 && debtPressure < 0.25) {
      n.push("You have room to automate a deposit contribution—consistency will do the work.");
    }
    return n;
  }, [debtPressure, profile.rent, takeHome, freeCashflow]);

  return (
    <div className="stack" id="top">
      <h1>Strategy Track: Property-First Saver</h1>
      <p className="muted">
        This track prioritises deposit accumulation, emergency fund discipline, and realistic bond readiness.
        It warns against overcommitting to vehicle finance or entertainment spend when a deposit is the goal.
      </p>

      {/* Top summary row */}
      <div className="grid4">
        <div className="tile">
          <div className="tileLabel">Take-home (est.)</div>
          <div className="tileValue">{formatZAR(takeHome)}</div>
        </div>
        <div className="tile">
          <div className="tileLabel">Free cashflow</div>
          <div className="tileValue">{formatZAR(freeCashflow)}</div>
        </div>
        <div className="tile">
          <div className="tileLabel">Debt pressure</div>
          <div className="tileValue">{(debtPressure * 100).toFixed(0)}%</div>
        </div>
        <div className="tile">
          <div className="tileLabel">Track progress</div>
          <div className="tileValue">{progressPct}%</div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3>Recommendations (based on your snapshot)</h3>
        <div className="stack">
          {recommendations.map((r, idx) => (
            <div key={idx} className="info">
              <strong>{r.title}:</strong> {r.body}{" "}
              
              {r.action && (
  <>
    <br />
    {r.action.to?.startsWith("#") ? (
      <a className="btn" href={r.action.to}>{r.action.label}</a>
    ) : (
      <Link className="btn" to={r.action.to}>{r.action.label}</Link>
    )}
  </>
)}
            </div>
          ))}
        </div>
      </div>

      {/* Educational notes / trade-offs */}
      <div className="card">
        <h3>How this track thinks (trade-offs)</h3>
        <ul>
          <li><strong>Sequence matters:</strong> runway → debt stability → deposit ramp → bond readiness → buy/reassess.</li>
          <li><strong>Transport is a major lever in SA:</strong> high instalments + insurance + fuel can delay property.</li>
          <li><strong>Renting can be strategic:</strong> if it protects your investing and avoids over-commitment.</li>
          <li><strong>Medical aid is a real fixed cost:</strong> treat it as non-negotiable in affordability planning.</li>
        </ul>
        <div className="info">
          <strong>SA note:</strong> Ownership costs are more than a bond repayment—transfer costs, levies/rates and maintenance add pressure.
          Your studio will surface these trade-offs.
        </div>
      </div>

      {/* Nudges */}
      <div className="card">
        <h3>Nudges</h3>
        {nudges.length === 0 ? (
          <p className="muted">No nudges triggered right now. Keep your snapshot updated.</p>
        ) : (
          <ul>
            {nudges.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        )}
      </div>

      {/* Milestones */}
      <div className="card" id="milestones">
        <h3>Milestones (3–5 years)</h3>
        <p className="muted">
          Mark each milestone as you progress. This is not “perfect finance” — it’s consistent sequencing.
        </p>

        <div className="stack">
          {milestones.map((m) => (
            <div key={m.id} className="card" style={{ background: "rgba(255,255,255,.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <strong>{m.year} — {m.title}</strong>
                  <div className="muted" style={{ marginTop: 6 }}>
                    <div><strong>Why:</strong> {m.why}</div>
                    <div><strong>Done when:</strong> {m.doneWhen}</div>
                    <div><strong>Trade-off:</strong> {m.tradeOff}</div>
                  </div>
                </div>

                <div style={{ minWidth: 220 }}>
                  <div className="muted" style={{ marginBottom: 6 }}><strong>Status</strong></div>
                  <select
                    value={statusLabel(m.id)}
                    onChange={(e) => setStatus(m.id, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    <option>Not started</option>
                    <option>In progress</option>
                    <option>Done</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" to="/studios/rent-vs-buy-jhb">Run: Rent vs Buy Studio</Link>
          <Link className="btn" to="/snapshot">Update Snapshot</Link>
          <a className="btn" href="#top">Back to top</a>
        </div>
      </div>
    </div>
  );
}