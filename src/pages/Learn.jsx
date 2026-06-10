const glossary = [
  {
    term: "PAYE",
    def: "Pay-As-You-Earn tax deducted from salary in South Africa. It affects take-home pay and cashflow planning.",
  },
  {
    term: "Take-home pay",
    def: "What you receive after deductions (PAYE, retirement contributions). Planning should start from net, not gross.",
  },
  {
    term: "RA (Retirement Annuity)",
    def: "A retirement product for long-term saving. Contributions can reduce taxable income, but access is restricted.",
  },
  {
    term: "TFSA",
    def: "Tax-Free Savings Account. Growth can be tax-free within limits. Useful for long-term goals with flexibility.",
  },
  {
    term: "Prime rate",
    def: "A benchmark SA lending rate that often influences bond and vehicle finance repayments.",
  },
  {
    term: "Levies & rates",
    def: "Ownership costs beyond the bond (levies in complexes/estates, plus municipal rates & taxes).",
  },
  {
    term: "Debt pressure",
    def: "How much of your take-home goes to debt repayments. High pressure reduces flexibility and bond affordability.",
  },
  {
    term: "Offshore investing",
    def: "Investing outside SA markets. Adds currency risk and diversification benefits; returns are uncertain.",
  },
];

export default function Learn() {
  return (
    <div className="stack">
      <h1>Learn</h1>
      <p className="muted">
        Short, South Africa–aware explainers that appear across Snapshot, Tracks and Studios.
        The goal is confidence, not complexity — with real figures where it matters.
      </p>

      <div className="grid3">
        <div className="card cardHover">
          <h3>PAYE & take-home (SARS)</h3>
          <p className="muted">
            Planning from gross can create false confidence. Your lifestyle and goals must fit your take-home.
          </p>
          <ul>
            <li>Budget from net pay, not gross.</li>
            <li>Tax tables change by year — always sanity-check against SARS.</li>
            <li>
              Practical tip: if you want exact PAYE, use SARS “Tax deduction tables” (weekly/monthly/annual).
            </li>
          </ul>
          <div className="info">
            <strong>Reference:</strong> SARS “Rates of tax for individuals” and “Tax deduction tables”.
          </div>
        </div>

        <div className="card cardHover">
          <h3>Emergency fund</h3>
          <p className="muted">
            Before property or upgrades, build stability. It reduces anxiety and prevents revolving credit dependence.
          </p>
          <ul>
            <li>Starter buffer first (2–4 weeks of essentials).</li>
            <li>Then target <strong>3 months</strong> of essentials (common benchmark).</li>
            <li>Keep it accessible (not locked or volatile).</li>
          </ul>
          <div className="info">
            <strong>Why this matters:</strong> it prevents “panic debt” when something goes wrong.
          </div>
        </div>

        <div className="card cardHover">
          <h3>Bond vs rent (ownership cost reality)</h3>
          <p className="muted">
            A bond repayment is not the full cost of owning in South Africa.
          </p>
          <ul>
            <li>Include levies/rates, insurance, maintenance.</li>
            <li>Rates can rise → repayment stress.</li>
            <li>Renting can be strategic while building deposit.</li>
          </ul>
          <div className="info">
            <strong>Reference rate:</strong> Prime lending rate is currently shown by SARB as <strong>10.50%</strong> (check before deciding).
          </div>
        </div>
      </div>

      <div className="card">
        <h3>TFSA (Tax-Free Savings Account): concrete limits</h3>
        <p className="muted">
          TFSAs are powerful because growth can be tax-free — but only within SARS contribution limits.
        </p>
        <ul>
          <li><strong>Annual limit:</strong> <strong>R46,000</strong> per tax year (effective from 1 March 2026).</li>
          <li><strong>Lifetime limit:</strong> <strong>R500,000</strong>.</li>
          <li><strong>Penalty:</strong> SARS can penalise excess contributions (so don’t exceed caps).</li>
        </ul>
        <div className="info">
          <strong>Source:</strong> SARS Tax-Free Investments page (annual R46,000 from 1 March 2026; lifetime R500,000).
        </div>
      </div>

      <div className="card">
        <h3>Retirement contributions (RA / pension / provident): deduction limits</h3>
        <p className="muted">
          Retirement contributions can reduce taxable income, but SARS caps the deduction.
        </p>
        <ul>
          <li>
            Deduction is limited to the <strong>lesser</strong> of <strong>27.5%</strong> of taxable income/remuneration OR
            <strong> R350,000</strong> (SARS notes this as the current prescribed cap).
          </li>
          <li>Practical: if you’re already contributing via employer funds, that counts toward the limit.</li>
        </ul>
        <div className="info">
          <strong>Source:</strong> SARS FAQ on Section 11F and SARS notice on retirement fund contribution deductions (cap currently R350,000).
        </div>
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
          <li>Use the Studio before committing (Car vs Uber + Invest).</li>
        </ul>
      </div>

      <div className="card">
        <h3>Local vs offshore investing (high-level)</h3>
        <p className="muted">
          Offshore investing can diversify risk but introduces currency volatility. Don’t treat projected returns as guaranteed.
        </p>
        <ul>
          <li>Diversification reduces reliance on one market.</li>
          <li>Currency moves can dominate short-term outcomes.</li>
          <li>Discipline matters more than perfect assumptions.</li>
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

      <div className="card">
        <h3>Sources (last checked)</h3>
        <ul>
          <li>TFSA limits: SARS Tax-Free Investments (R46,000 annual from 1 March 2026; R500,000 lifetime).</li>
          <li>Retirement deduction: SARS Section 11F limits (27.5% and cap currently R350,000).</li>
          <li>Prime rate: SARB Current Market Rates (prime listed).</li>
          <li>Tax brackets/tables: SARS “Rates of Tax for Individuals” and “Tax deduction tables”.</li>
        </ul>
        <p className="muted">
          Note: figures can change year-to-year. For the exam submission, keeping a short “sources last checked” section improves trust.
        </p>
      </div>
    </div>
  );
}