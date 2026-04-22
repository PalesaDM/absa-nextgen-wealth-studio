import { useMemo, useState } from "react";
import { useUser } from "../context/UserContext.jsx";

function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value || 0);
}

// Simplified SA take-home estimate (consistent, not perfectly accurate)
function estimateTakeHome(gross, pensionPct = 0) {
  const pension = gross * (pensionPct / 100);
  const taxable = Math.max(0, gross - pension);

  // MVP tax model: simple effective rate bands
  let rate = 0.18;
  if (taxable > 50000) rate = 0.23;
  if (taxable > 70000) rate = 0.26;

  const paye = taxable * rate;
  const takeHome = gross - pension - paye;

  return { takeHome, paye, pension };
}

export default function Snapshot() {
  const { profile, setProfile } = useUser();

  const [form, setForm] = useState({
    grossIncome: profile.grossIncome ?? 52000,
    pensionPct: profile.pensionPct ?? 7.5,
    rent: profile.rent ?? 14000,
    medicalAid: profile.medicalAid ?? 2500,
    otherFixed: profile.otherFixed ?? 4000,
    debtPayments: profile.debtPayments ?? 6200,
    emergencyFundTargetMonths: profile.emergencyFundTargetMonths ?? 3,
  });

  const errors = useMemo(() => {
    const e = {};
    if (!form.grossIncome || form.grossIncome <= 0) e.grossIncome = "Enter a gross income above 0.";
    if (form.pensionPct < 0 || form.pensionPct > 27.5) e.pensionPct = "Use a % between 0 and 27.5.";
    ["rent", "medicalAid", "otherFixed", "debtPayments"].forEach((k) => {
      if (form[k] < 0) e[k] = "Value cannot be negative.";
    });
    if (form.emergencyFundTargetMonths < 1 || form.emergencyFundTargetMonths > 6) {
      e.emergencyFundTargetMonths = "Choose 1–6 months.";
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const { takeHome, paye, pension } = useMemo(
    () => estimateTakeHome(form.grossIncome, form.pensionPct),
    [form.grossIncome, form.pensionPct]
  );

  const fixedCosts = form.rent + form.medicalAid + form.otherFixed;
  const freeCashflow = takeHome - fixedCosts - form.debtPayments;
  const debtPressure = takeHome > 0 ? form.debtPayments / takeHome : 0;

  const status = freeCashflow > 0 && debtPressure < 0.25 ? "On track" : "Needs attention";

  const monthlyEssentials = form.rent + form.medicalAid + form.otherFixed;
  const efTarget = monthlyEssentials * form.emergencyFundTargetMonths;
  const suggestedEFContribution = Math.max(0, Math.min(freeCashflow * 0.35, 3000));
  const monthsToEF = suggestedEFContribution > 0 ? Math.ceil(efTarget / suggestedEFContribution) : null;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function saveToProfile() {
    if (!isValid) return;
    setProfile((prev) => ({ ...prev, ...form }));
  }

  return (
    <div className="stack">
      <h1>Money Snapshot</h1>
      <p className="muted">
        A South Africa–aware overview using ZAR and a simplified PAYE/take-home estimate (SARS concept).
      </p>

      <div className="twoCol">
        <div className="card">
          <h3>Your Inputs</h3>

          <label className="field">
            Gross monthly income (ZAR)
            <input
              type="number"
              value={form.grossIncome}
              onChange={(e) => updateField("grossIncome", Number(e.target.value))}
            />
            {errors.grossIncome && <div className="error">{errors.grossIncome}</div>}
          </label>

          <label className="field">
            Pension/RA contribution (%)
            <input
              type="number"
              value={form.pensionPct}
              onChange={(e) => updateField("pensionPct", Number(e.target.value))}
            />
            {errors.pensionPct && <div className="error">{errors.pensionPct}</div>}
          </label>

          <label className="field">
            Rent (monthly)
            <input type="number" value={form.rent} onChange={(e) => updateField("rent", Number(e.target.value))} />
            {errors.rent && <div className="error">{errors.rent}</div>}
          </label>

          <label className="field">
            Medical aid (monthly)
            <input
              type="number"
              value={form.medicalAid}
              onChange={(e) => updateField("medicalAid", Number(e.target.value))}
            />
            {errors.medicalAid && <div className="error">{errors.medicalAid}</div>}
          </label>

          <label className="field">
            Other fixed costs (monthly)
            <input
              type="number"
              value={form.otherFixed}
              onChange={(e) => updateField("otherFixed", Number(e.target.value))}
            />
            {errors.otherFixed && <div className="error">{errors.otherFixed}</div>}
          </label>

          <label className="field">
            Total debt payments (monthly)
            <input
              type="number"
              value={form.debtPayments}
              onChange={(e) => updateField("debtPayments", Number(e.target.value))}
            />
            {errors.debtPayments && <div className="error">{errors.debtPayments}</div>}
          </label>

          <label className="field">
            Emergency fund target (months of essentials)
            <input
              type="number"
              value={form.emergencyFundTargetMonths}
              onChange={(e) => updateField("emergencyFundTargetMonths", Number(e.target.value))}
            />
            {errors.emergencyFundTargetMonths && <div className="error">{errors.emergencyFundTargetMonths}</div>}
          </label>

          <button className="btn" onClick={saveToProfile} disabled={!isValid}>
            Save snapshot
          </button>

          <div className="info">
            <strong>Explainer (PAYE / take-home):</strong> In South Africa, your gross salary is reduced
            by deductions like PAYE (SARS tax), UIF, and contributions (e.g., pension/RA). This MVP uses
            a simplified estimate to help you reason about trade-offs.
          </div>
        </div>

        <div className="stack">
          <div className="grid4">
            <div className="tile">
              <div className="tileLabel">Status</div>
              <div className="tileValue">{status}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Take-home (est.)</div>
              <div className="tileValue">{formatZAR(takeHome)}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Fixed costs</div>
              <div className="tileValue">{formatZAR(fixedCosts)}</div>
            </div>
            <div className="tile">
              <div className="tileLabel">Free cashflow</div>
              <div className="tileValue">{formatZAR(freeCashflow)}</div>
            </div>
          </div>

          <div className="card">
            <h3>Snapshot breakdown</h3>
            <ul>
              <li>Estimated PAYE (SARS concept): {formatZAR(paye)}</li>
              <li>Pension/RA contribution: {formatZAR(pension)}</li>
              <li>Debt pressure ratio: {(debtPressure * 100).toFixed(0)}%</li>
              <li>Emergency fund target: {formatZAR(efTarget)} ({form.emergencyFundTargetMonths} months)</li>
            </ul>

            <div className="info">
              <strong>Explainer (Debt pressure):</strong> If debt repayments are above ~25% of take-home,
              you’ll struggle to build a deposit quickly.
            </div>

            <div className="info">
              <strong>Suggested next step:</strong>{" "}
              {freeCashflow <= 0
                ? "Your plan is under pressure. Reduce fixed costs or debt repayments before scaling goals."
                : monthsToEF
                ? `If you set aside about ${formatZAR(suggestedEFContribution)} per month, you could reach your emergency fund in ~${monthsToEF} months.`
                : "Build your emergency fund before making big commitments (property/vehicle upgrades)."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}