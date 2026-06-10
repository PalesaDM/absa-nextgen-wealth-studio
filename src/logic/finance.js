export function estimateTakeHome(gross, pensionPct = 0) {
    const pension = gross * (pensionPct / 100);
    const taxable = Math.max(0, gross - pension);

    
    let rate = 0.18;
    if (taxable > 50000) rate = 0.23;
    if (taxable > 70000) rate = 0.26;

    const paye = taxable * rate;
    const estimateTakeHome = gross - pension -paye;

    return { takeHome, paye, pension, effectiveTaxRate: rate};
}