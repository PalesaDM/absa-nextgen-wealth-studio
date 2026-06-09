import TrackShell from "../components/TrackShell.jsx";

const STORAGE_KEY = "absa_nextgen_track_balanced_progress_v1";

export default function TrackBalancedLifestyle() {
  const milestones = [
    {
      id: "b1",
      year: "Months 0–3",
      title: "Stability baseline (cashflow clarity + starter buffer)",
      why: "Balanced progress starts with control: know your fixed costs and stop small overspends from becoming debt.",
      doneWhen: "You can describe your monthly fixed costs and have a starter buffer.",
      tradeOff: "Convenience spending is the first thing to silently break balance.",
    },
    {
      id: "b2",
      year: "Months 3–9",
      title: "Emergency fund (target 3 months of essentials)",
      why: "This protects lifestyle and prevents “panic debt” when a surprise happens.",
      doneWhen: "Emergency fund reaches target months of essentials.",
      tradeOff: "Big lifestyle upgrades before the buffer will keep resetting your progress.",
    },
    {
      id: "b3",
      year: "Year 1",
      title: "Debt pressure stays manageable",
      why: "If debt repayments are too high, everything else becomes unstable.",
      doneWhen: "Debt pressure consistently below ~25% of take-home.",
      tradeOff: "New car finance is the most common way to break a balanced plan.",
    },
    {
      id: "b4",
      year: "Year 1–2",
      title: "Automated investing habit (payday-first)",
      why: "A balanced track wins by consistency. Automated transfers beat motivation.",
      doneWhen: "You invest monthly for 6+ months without missing.",
      tradeOff: "Random investing only when you feel like it doesn’t compound.",
    },
    {
      id: "b5",
      year: "Year 2–5",
      title: "Step-up contributions (small increases, regularly)",
      why: "As income rises, you scale your investing while keeping lifestyle sustainable.",
      doneWhen: "You’ve increased contributions at least 2–3 times.",
      tradeOff: "If fixed costs rise with income, you lose the benefit of growth.",
    },
  ];

  const buildRecommendations = ({ freeCashflow, debtPressure, fixedCosts, takeHome }) => {
    const recs = [];

    if (freeCashflow <= 0) {
      recs.push({
        title: "Stabilise your baseline before optimising",
        body: "Your free cashflow is negative or too tight. Reduce one fixed cost or debt payment, then revisit investing targets.",
        action: { label: "Update Money Snapshot", to: "/snapshot" },
      });
      return recs;
    }

    if (debtPressure >= 0.25) {
      recs.push({
        title: "Balance breaks when debt pressure is high",
        body: `Your debt pressure is ${(debtPressure * 100).toFixed(0)}%. Keep it below ~25% before increasing lifestyle or investments.`,
        action: { label: "Run: Car vs Uber Studio", to: "/studios/car-vs-uber" },
      });
    } else {
      recs.push({
        title: "You have room to automate balance",
        body: "Debt pressure is manageable. Set a small automated investment and keep lifestyle spending within a planned allowance.",
        action: { label: "View Milestones", to: "#milestones" },
      });
    }

    const fixedRatio = takeHome > 0 ? fixedCosts / takeHome : 0;
    if (fixedRatio > 0.55) {
      recs.push({
        title: "Your fixed costs are heavy for a balanced plan",
        body: `Fixed costs are about ${(fixedRatio * 100).toFixed(0)}% of take-home. A balanced track needs breathing room — trim subscriptions/transport or revisit housing spend.`,
        action: { label: "Update Money Snapshot", to: "/snapshot" },
      });
    }

    recs.push({
      title: "Next best move",
      body: "Set a ‘payday-first’ rule: emergency buffer (if needed) + investing transfer, then lifestyle spend.",
      action: { label: "Run: Local vs Offshore Studio", to: "/studios/local-vs-offshore" },
    });

    return recs;
  };

  const buildNudges = ({ freeCashflow, debtPressure, fixedCosts, takeHome }) => {
    const n = [];
    const fixedRatio = takeHome > 0 ? fixedCosts / takeHome : 0;

    if (freeCashflow <= 0) n.push("Cashflow is under pressure — pause upgrades and fix the baseline first.");
    if (debtPressure > 0.30) n.push("Debt pressure is high — avoid new finance commitments this quarter.");
    if (fixedRatio > 0.55) n.push("Fixed costs are heavy — balanced plans need more breathing room.");
    if (freeCashflow > 4000 && debtPressure < 0.25) n.push("You have room to automate investing — keep it small and consistent.");
    return n;
  };

  return (
    <TrackShell
      title="Strategy Track: Balanced Lifestyle & Investing"
      intro="For high-earning young professionals who want steady wealth-building without all sacrifice. This track balances stability, debt control, and automated investing while keeping lifestyle sustainable."
      storageKey={STORAGE_KEY}
      milestones={milestones}
      buildRecommendations={buildRecommendations}
      buildNudges={buildNudges}
      primaryStudioLink={{ label: "Run: Car vs Uber Studio", to: "/studios/car-vs-uber" }}
    />
  );
}