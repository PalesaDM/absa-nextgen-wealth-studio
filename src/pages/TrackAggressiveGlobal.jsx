import TrackShell from "../components/TrackShell.jsx";

const STORAGE_KEY = "absa_nextgen_track_aggressive_global_progress_v1";

export default function TrackAggressiveGlobal() {
  const milestones = [
    {
      id: "g1",
      year: "Months 0–6",
      title: "Emergency fund locked in (3 months essentials)",
      why: "Aggressive investing only works if you can survive surprises without selling at the wrong time.",
      doneWhen: "Emergency fund reaches target months of essentials.",
      tradeOff: "Skipping runway forces you into debt or selling investments under stress.",
    },
    {
      id: "g2",
      year: "Year 1",
      title: "Contribution rate rises (step-up plan)",
      why: "The track wins through a high, consistent contribution rate — not perfect timing.",
      doneWhen: "You have increased contributions at least once and kept it stable for 3+ months.",
      tradeOff: "Lifestyle inflation will quietly kill the aggressive strategy.",
    },
    {
      id: "g3",
      year: "Year 1–2",
      title: "Offshore allocation rules (not emotional decisions)",
      why: "Diversification helps, but only if it’s rules-based. Currency swings can trigger bad behaviour.",
      doneWhen: "You have an offshore percentage target and stick to it for 6+ months.",
      tradeOff: "Chasing exchange-rate moves leads to inconsistency and regret.",
    },
    {
      id: "g4",
      year: "Year 2–3",
      title: "Fee discipline + consolidation",
      why: "Aggressive compounding is sensitive to fees. Reduce friction and keep the system simple.",
      doneWhen: "Portfolio is consolidated and you’ve reduced avoidable costs/fees.",
      tradeOff: "Overcomplicated investing increases errors and reduces consistency.",
    },
    {
      id: "g5",
      year: "Year 3–5",
      title: "Decision checkpoint: property vs stay aggressive",
      why: "Property can be a good asset, but it can also reduce invest rate. Compare opportunity cost before committing.",
      doneWhen: "You’ve run the studios and chosen a path based on numbers, not pressure.",
      tradeOff: "Buying too early can cap your investing rate for years.",
    },
  ];

  const buildRecommendations = ({ freeCashflow, debtPressure }) => {
    const recs = [];

    if (freeCashflow <= 0) {
      recs.push({
        title: "Aggressive strategy not viable yet",
        body: "Your free cashflow is under pressure. Stabilise fixed costs or debt repayments first, then re-enter aggressive investing with a buffer.",
        action: { label: "Update Money Snapshot", to: "/snapshot" },
      });
      return recs;
    }

    if (debtPressure >= 0.25) {
      recs.push({
        title: "Debt pressure is restricting your invest rate",
        body: `Debt repayments are about ${(debtPressure * 100).toFixed(0)}% of take-home. Aggressive investing works best when debt pressure is controlled.`,
        action: { label: "Run: Car vs Uber Studio", to: "/studios/car-vs-uber" },
      });
    } else {
      recs.push({
        title: "You have capacity for aggressive contributions",
        body: "Debt pressure is manageable. Set a rules-based contribution plan and avoid new instalments that reduce your monthly invest rate.",
        action: { label: "View Milestones", to: "#milestones" },
      });
    }

    recs.push({
      title: "Set offshore allocation rules",
      body: "Use a target split (e.g., 40–70% offshore depending on your tolerance). Stick to the plan through currency volatility.",
      action: { label: "Run: Local vs Offshore Studio", to: "/studios/local-vs-offshore" },
    });

    recs.push({
      title: "Guard rails (behaviour beats forecasts)",
      body: "Aggressive track rule: no major new monthly commitments for 12 months while you build compounding momentum.",
      action: { label: "Update Profile assumptions", to: "/profile" },
    });

    return recs;
  };

  const buildNudges = ({ freeCashflow, debtPressure }) => {
    const n = [];
    if (freeCashflow <= 0) n.push("Cashflow is under pressure — stabilise before pushing an aggressive invest rate.");
    if (debtPressure > 0.30) n.push("Debt pressure is high — avoid new finance commitments this quarter.");
    if (freeCashflow > 5000 && debtPressure < 0.25) n.push("You have room to increase contributions — consider a small step-up.");
    n.push("Remember: offshore investing adds currency volatility — keep it rules-based, not emotional.");
    return n;
  };

  return (
    <TrackShell
      title="Strategy Track: Aggressive Global Investor"
      intro="For users who want faster wealth accumulation and diversification, and can tolerate volatility. This track prioritises high contribution rates and offshore exposure, with SA-specific trade-offs (fixed costs, debt pressure, currency swings)."
      storageKey={STORAGE_KEY}
      milestones={milestones}
      buildRecommendations={buildRecommendations}
      buildNudges={buildNudges}
      primaryStudioLink={{ label: "Run: Local vs Offshore Studio", to: "/studios/local-vs-offshore" }}
    />
  );
}