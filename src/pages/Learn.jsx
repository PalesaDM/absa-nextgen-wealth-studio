const glossary = [
  { term: "PAYE", def: "Pay-As-You-Earn tax deducted from salary in South Africa. It affects take-home pay and cashflow planning." },
  { term: "Take-home pay", def: "What you receive after deductions (PAYE, retirement contributions). Planning should start from net, not gross." },
  { term: "RA (Retirement Annuity)", def: "A retirement product for long-term saving. Contributions can reduce taxable income, but access is restricted." },
  { term: "TFSA", def: "Tax-Free Savings Account. Growth can be tax-free within limits. Useful for long-term goals with flexibility." },
  { term: "Medical aid", def: "A major fixed cost in SA. Treat it as non-negotiable in affordability decisions (property, car finance)." },
  { term: "Emergency fund", def: "Cash buffer (often 1–3 months of essentials) that protects you from debt spirals when life happens." },
  { term: "Prime rate", def: "A benchmark lending rate in SA that often influences bond and vehicle finance repayments." },
  { term: "Levies & rates", def: "Ownership costs beyond the bond (levies in complexes/estates, plus municipal rates & taxes)." },
  { term: "Debt pressure", def: "How much of your take-home goes to debt repayments. High pressure reduces flexibility and bond affordability." },
  { term: "Offshore investing", def: "Investing outside SA markets. Adds currency risk and diversification benefits; returns are uncertain." },
];

export default function Learn() {
  return (
    <div className="stack">
      <h1>Learn</h1>
      <p className="muted">
        Short, South Africa–aware explainers that appear across Snapshot, Tracks and Studios. The goal is confidence, not complexity.
      </p>

      <div className="grid3">
        <div className="card">
          <h3>PAYE & take-home (SARS concept)</h3>
          <p className="muted">
            Planning from gross can create false confidence. Your lifestyle and goals must fit your take-home.
          </p>
          <ul>
            <li>Budget from net pay.</li>
            <li>Retirement contributions reduce taxable income.</li>
            <li>Consistency beats “perfect optimisation”.</li>
          </ul>
        </div>

        <div className="card">
          <h3>Emergency fund</h3>
          <p className="muted">
            Before property or upgrades, build stability. It reduces anxiety and prevents revolving credit dependence.
          </p>
          <ul>
            <li>Start with a small buffer (2–4 weeks).</li>
            <li>Then target 3 months of essentials.</li>
            <li>Keep it accessible (not locked or volatile).</li>
          </ul>
        </div>

        <div className="card">
          <h3>Bond vs rent</h3>
          <p className="muted">
            A bond repayment is not the full cost of owning in South Africa.
          </p>
          <ul>
            <li>Include levies/rates, insurance, maintenance.</li>
            <li>Rates can rise → repayment stress.</li>
            <li>Renting can be strategic while building deposit.</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>RA vs TFSA (high-level)</h3>
        <ul>
          <li><strong>RA:</strong> long-term retirement tool; access restrictions; can reduce taxable income.</li>
          <li><strong>TFSA:</strong> flexible long-term saving; tax-free growth within limits.</li>
          <li><strong>Rule:</strong> choose a discipline you can sustain for 3–5 years.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Vehicle finance trade-offs (SA reality)</h3>
        <p className="muted">
          Transport is often the biggest silent wealth-killer: instalments, insurance, fuel, tolls, and maintenance.
          A premium car can delay a deposit by years.
        </p>
        <ul>
          <li>Balloon payments can hide affordability.</li>
          <li>High instalments reduce borrowing capacity for property.</li>
          <li>Use a Studio before committing.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Glossary</h3>
        <p className="muted">Reference terms used across Snapshot, Tracks and Studios.</p>
        <div className="stack">
          {glossary.map((g) => (
            <div key={g.term} className="info">
              <strong>{g.term}:</strong> {g.def}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}