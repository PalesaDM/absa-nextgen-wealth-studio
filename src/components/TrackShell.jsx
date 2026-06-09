import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

function formatZAR(value) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value || 0);
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

/**
 * TrackShell props:
 * - title, intro
 * - storageKey (unique per track)
 * - milestones: [{id, year, title, why, doneWhen, tradeOff}]
 * - buildRecommendations: (ctx) => [{title, body, action?: {label,to}}]
 * - buildNudges: (ctx) => string[]
 * - primaryStudioLink: {label,to} (optional)
 */
export default function TrackShell({
  title,
  intro,
  storageKey,
  milestones,
  buildRecommendations,
  buildNudges,
  primaryStudioLink,
}) {
  const { profile } = useUser();

  const { takeHome } = useMemo(
    () => estimateTakeHome(profile.grossIncome, profile.pensionPct),
    [profile.grossIncome, profile.pensionPct]
  );

  const fixedCosts = (profile.rent ?? 0) + (profile.medicalAid ?? 0) + (profile.otherFixed ?? 0);
  const freeCashflow = takeHome - fixedCosts - (profile.debtPayments ?? 0);
  const debtPressure = takeHome > 0 ? (profile.debtPayments ?? 0) / takeHome : 0;

  // Progress state (localStorage)
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, storageKey]);

  const statusLabel = (id) => progress[id] || "Not started";
  const setStatus = (id, value) => setProgress((p) => ({ ...p, [id]: value }));

  const progressPct = useMemo(() => {
    const total = milestones.length;
    const done = milestones.filter((m) => statusLabel(m.id) === "Done").length;
    return Math.round((done / total) * 100);
  }, [milestones, progress]);

  const ctx = useMemo(
    () => ({ profile, takeHome, fixedCosts, freeCashflow, debtPressure, progressPct }),
    [profile, takeHome, fixedCosts, freeCashflow, debtPressure, progressPct]
  );

  const recommendations = useMemo(() => buildRecommendations(ctx), [buildRecommendations, ctx]);
  const nudges = useMemo(() => buildNudges(ctx), [buildNudges, ctx]);

  return (
    <div className="stack" id="top">
      <h1>{title}</h1>
      <p className="muted">{intro}</p>

      {/* Tiles */}
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
              <strong>{r.title}:</strong> {r.body}
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

      {/* Nudges */}
      <div className="card">
        <h3>Nudges</h3>
        {nudges.length === 0 ? (
          <p className="muted">No nudges triggered right now.</p>
        ) : (
          <ul>
            {nudges.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        )}
      </div>

      {/* Milestones */}
      <div className="card" id="milestones">
        <h3>Milestones (3–5 years)</h3>
        <p className="muted">Mark milestones as you progress. Consistency beats perfection.</p>

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
          {primaryStudioLink && (
            <Link className="btn btnPrimary" to={primaryStudioLink.to}>{primaryStudioLink.label}</Link>
          )}
          <Link className="btn" to="/snapshot">Update Snapshot</Link>
          <a className="btn" href="#top">Back to top</a>
        </div>
      </div>
    </div>
  );
}