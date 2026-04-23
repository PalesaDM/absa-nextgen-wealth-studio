import { useMemo, useState } from "react";
import { useUser } from "../context/UserContext.jsx";

function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value || 0);
}

export default function Profile() {
  const { profile, setProfile } = useUser();

  const [form, setForm] = useState({
    fullName: profile.fullName ?? "",
    city: profile.city ?? "Johannesburg",

    grossIncome: profile.grossIncome ?? 58000,
    pensionPct: profile.pensionPct ?? 7.5,
    rent: profile.rent ?? 14000,
    medicalAid: profile.medicalAid ?? 2500,
    otherFixed: profile.otherFixed ?? 4000,
    debtPayments: profile.debtPayments ?? 6200,

    emergencyFundTargetMonths: profile.emergencyFundTargetMonths ?? 3,
    propertyDepositTarget: profile.propertyDepositTarget ?? 180000,
    propertyPriceAssumption: profile.propertyPriceAssumption ?? 1400000,
    depositPctAssumption: profile.depositPctAssumption ?? 10,

    timeHorizonYears: profile.timeHorizonYears ?? 5,
  });

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  const errors = useMemo(() => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Name is required.";
    if (form.grossIncome <= 0) e.grossIncome = "Gross income must be > 0.";
    if (form.pensionPct < 0 || form.pensionPct > 27.5) e.pensionPct = "Use 0–27.5.";
    ["rent", "medicalAid", "otherFixed", "debtPayments"].forEach((k) => {
      if (form[k] < 0) e[k] = "Cannot be negative.";
    });
    if (form.emergencyFundTargetMonths < 1 || form.emergencyFundTargetMonths > 6)
      e.emergencyFundTargetMonths = "Use 1–6 months.";
    if (form.propertyDepositTarget < 0) e.propertyDepositTarget = "Cannot be negative.";
    if (form.propertyPriceAssumption <= 0) e.propertyPriceAssumption = "Must be > 0.";
    if (form.depositPctAssumption < 0 || form.depositPctAssumption > 50)
      e.depositPctAssumption = "Use 0–50%.";
    if (form.timeHorizonYears < 1 || form.timeHorizonYears > 10)
      e.timeHorizonYears = "Use 1–10 years.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function save() {
    if (!isValid) return;
    setProfile((prev) => ({ ...prev, ...form }));
  }

  function resetRecentlyViewed() {
    setProfile((prev) => ({ ...prev, recentStudios: [] }));
  }

  return (
    <div className="stack">
      <h1>Profile</h1>
      <p className="muted">
        Edit your baseline inputs here. These values drive Money Snapshot, Strategy Tracks and Studios.
      </p>

      <div className="twoCol">
        <div className="card">
          <h3>Personal</h3>

          <label className="field">
            Name
            <input value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </label>

          <label className="field">
            City
            <input value={form.city} onChange={(e) => setField("city", e.target.value)} />
          </label>

          <div className="info">
            <strong>POPIA-minded note:</strong> In a real build, these settings would include consent, data export,
            and delete options. For this prototype we keep data local only.
          </div>
        </div>

        <div className="card">
          <h3>Snapshot defaults</h3>

          <label className="field">
            Gross monthly income (ZAR)
            <input
              type="number"
              value={form.grossIncome}
              onChange={(e) => setField("grossIncome", Number(e.target.value))}
            />
            {errors.grossIncome && <div className="error">{errors.grossIncome}</div>}
          </label>

          <label className="field">
            Pension/RA contribution (%)
            <input
              type="number"
              value={form.pensionPct}
              onChange={(e) => setField("pensionPct", Number(e.target.value))}
            />
            {errors.pensionPct && <div className="error">{errors.pensionPct}</div>}
          </label>

          <label className="field">
            Rent (monthly)
            <input type="number" value={form.rent} onChange={(e) => setField("rent", Number(e.target.value))} />
            {errors.rent && <div className="error">{errors.rent}</div>}
          </label>

          <label className="field">
            Medical aid (monthly)
            <input
              type="number"
              value={form.medicalAid}
              onChange={(e) => setField("medicalAid", Number(e.target.value))}
            />
            {errors.medicalAid && <div className="error">{errors.medicalAid}</div>}
          </label>

          <label className="field">
            Other fixed costs (monthly)
            <input
              type="number"
              value={form.otherFixed}
              onChange={(e) => setField("otherFixed", Number(e.target.value))}
            />
            {errors.otherFixed && <div className="error">{errors.otherFixed}</div>}
          </label>

          <label className="field">
            Total debt payments (monthly)
            <input
              type="number"
              value={form.debtPayments}
              onChange={(e) => setField("debtPayments", Number(e.target.value))}
            />
            {errors.debtPayments && <div className="error">{errors.debtPayments}</div>}
          </label>
        </div>
      </div>

      <div className="twoCol">
        <div className="card">
          <h3>Track + Studio defaults</h3>

          <label className="field">
            Emergency fund target (months)
            <input
              type="number"
              value={form.emergencyFundTargetMonths}
              onChange={(e) => setField("emergencyFundTargetMonths", Number(e.target.value))}
            />
            {errors.emergencyFundTargetMonths && <div className="error">{errors.emergencyFundTargetMonths}</div>}
          </label>

          <label className="field">
            Deposit target (ZAR)
            <input
              type="number"
              value={form.propertyDepositTarget}
              onChange={(e) => setField("propertyDepositTarget", Number(e.target.value))}
            />
            {errors.propertyDepositTarget && <div className="error">{errors.propertyDepositTarget}</div>}
          </label>

          <label className="field">
            Property price assumption (ZAR)
            <input
              type="number"
              value={form.propertyPriceAssumption}
              onChange={(e) => setField("propertyPriceAssumption", Number(e.target.value))}
            />
            {errors.propertyPriceAssumption && <div className="error">{errors.propertyPriceAssumption}</div>}
          </label>

          <label className="field">
            Deposit % assumption
            <input
              type="number"
              value={form.depositPctAssumption}
              onChange={(e) => setField("depositPctAssumption", Number(e.target.value))}
            />
            {errors.depositPctAssumption && <div className="error">{errors.depositPctAssumption}</div>}
          </label>

          <label className="field">
            Planning horizon (years)
            <input
              type="number"
              value={form.timeHorizonYears}
              onChange={(e) => setField("timeHorizonYears", Number(e.target.value))}
            />
            {errors.timeHorizonYears && <div className="error">{errors.timeHorizonYears}</div>}
          </label>

          <button className="btn" onClick={save} disabled={!isValid}>
            Save Profile
          </button>

          <button className="btn" style={{ marginLeft: 10 }} onClick={resetRecentlyViewed}>
            Clear Recently Viewed
          </button>
        </div>

        <div className="card">
          <h3>Quick preview</h3>
          <p className="muted">These are the key values you’re setting.</p>
          <ul>
            <li>Gross income: {formatZAR(form.grossIncome)}</li>
            <li>Rent: {formatZAR(form.rent)}</li>
            <li>Debt payments: {formatZAR(form.debtPayments)}</li>
            <li>Deposit target: {formatZAR(form.propertyDepositTarget)}</li>
            <li>Emergency fund target: {form.emergencyFundTargetMonths} months</li>
          </ul>
          <div className="info">
            Tip: change these values, click <strong>Save Profile</strong>, then go to Snapshot/Track/Studio and confirm everything updates.
          </div>
        </div>
      </div>
    </div>
  );
}