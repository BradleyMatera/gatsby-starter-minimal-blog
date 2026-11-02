import * as React from "react";

const initial = { homePrice: "285000", downPayment: "57000", rate: "6.75", term: "30" };
const MortgageCalculator: React.FC = () => {
  const [values, setValues] = React.useState(initial);
  const homePrice = Number(values.homePrice);
  const downPayment = Number(values.downPayment);
  const rate = Number(values.rate);
  const term = Number(values.term);
  const errors: Record<string, string> = {};
  if (!values.homePrice || !Number.isFinite(homePrice) || homePrice <= 0 || homePrice > 100000000) errors.homePrice = "Enter a price between $1 and $100,000,000.";
  if (!values.downPayment || !Number.isFinite(downPayment) || downPayment < 0 || downPayment > homePrice) errors.downPayment = "Enter a down payment from $0 to the home price.";
  if (!values.rate || !Number.isFinite(rate) || rate < 0 || rate > 30) errors.rate = "Enter an illustrative annual rate from 0% to 30%.";
  const valid = Object.keys(errors).length === 0;
  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const payments = term * 12;
  const monthly = valid ? monthlyRate === 0 ? principal / payments : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -payments)) : 0;
  const currency = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fields = [{ key: "homePrice", label: "Home price", min: 1, max: 100000000 }, { key: "downPayment", label: "Down payment", min: 0, max: homePrice }, { key: "rate", label: "Illustrative annual interest rate (%)", min: 0, max: 30 }] as const;
  return <div className="demo-mortgage-calc">
    <h3 className="demo-mortgage-calc__title">Mortgage Calculator</h3>
    <p className="demo-mortgage-calc__subtitle">Explore a sample estimate using your chosen price, down payment and rate. No live rates or loan application.</p>
    <div className="demo-mortgage-calc__form">
      {fields.map((field) => <div className="demo-form__field" key={field.key}>
        <label className="demo-form__label" htmlFor={field.key}>{field.label}</label>
        <input className="demo-form__input" id={field.key} type="number" step={field.key === "rate" ? "0.05" : "1"} min={field.min} max={field.max} value={values[field.key]} onChange={(event) => setValues({ ...values, [field.key]: event.target.value })} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined} />
        {errors[field.key] && <p id={`${field.key}-error`}>{errors[field.key]}</p>}
      </div>)}
      <div className="demo-form__field"><label className="demo-form__label" htmlFor="term">Loan term (years)</label><select className="demo-form__select" id="term" value={values.term} onChange={(event) => setValues({ ...values, term: event.target.value })}>{[15, 20, 30].map((years) => <option key={years} value={years}>{years} years</option>)}</select></div>
    </div>
    <div className="demo-mortgage-calc__results" aria-live="polite" aria-atomic="true">
      {valid ? <><div className="demo-mortgage-calc__result"><div className="demo-mortgage-calc__result-label">Estimated monthly principal and interest</div><output className="demo-mortgage-calc__result-value" htmlFor="homePrice downPayment rate term">{currency(monthly)}<span className="demo-mortgage-calc__result-unit">/mo</span></output></div><div className="demo-mortgage-calc__result"><div className="demo-mortgage-calc__result-label">Loan amount</div><div className="demo-mortgage-calc__result-value-sm">{currency(principal)}</div></div><div className="demo-mortgage-calc__result"><div className="demo-mortgage-calc__result-label">Total interest</div><div className="demo-mortgage-calc__result-value-sm">{currency(monthly * payments - principal)}</div></div></> : <p>Complete the valid amounts above to see an estimate.</p>}
    </div>
    <button type="button" className="demo-btn demo-btn--ghost" onClick={() => setValues(initial)}>Reset sample values</button>
    <p className="demo-mortgage-calc__disclaimer">Illustrative fixed-rate calculation only. Excludes taxes, insurance, fees and PMI. This is not a rate offer, eligibility check or financial advice.</p>
  </div>;
};
export default MortgageCalculator;
