import * as React from "react";

/**
 * Real working mortgage calculator — pure JavaScript, no API needed.
 * Uses standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * In production, this could integrate with a real-time mortgage rate API
 * like Freddie Mac PMMS or Zillow's API for live rate data.
 */
const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = React.useState(285000);
  const [downPayment, setDownPayment] = React.useState(57000);
  const [rate, setRate] = React.useState(6.75);
  const [term, setTerm] = React.useState(30);

  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = term * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPaid = monthlyPayment * numPayments;
  const totalInterest = totalPaid - principal;

  const formatCurrency = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="demo-mortgage-calc">
      <h3 className="demo-mortgage-calc__title">Mortgage Calculator</h3>
      <p className="demo-mortgage-calc__subtitle">
        Estimate your monthly payment. Live rate data available via Freddie Mac PMMS API or Zillow API.
      </p>

      <div className="demo-mortgage-calc__form">
        <div className="demo-form__field">
          <label className="demo-form__label" htmlFor="homePrice">Home Price</label>
          <input
            className="demo-form__input"
            id="homePrice"
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            step="5000"
          />
        </div>
        <div className="demo-form__field">
          <label className="demo-form__label" htmlFor="downPayment">Down Payment</label>
          <input
            className="demo-form__input"
            id="downPayment"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            step="5000"
          />
        </div>
        <div className="demo-form__row">
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="rate">Interest Rate (%)</label>
            <input
              className="demo-form__input"
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              step="0.05"
            />
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="term">Loan Term (years)</label>
            <select
              className="demo-form__select"
              id="term"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
        </div>
      </div>

      <div className="demo-mortgage-calc__results">
        <div className="demo-mortgage-calc__result">
          <div className="demo-mortgage-calc__result-label">Monthly Payment</div>
          <div className="demo-mortgage-calc__result-value">{formatCurrency(monthlyPayment)}<span className="demo-mortgage-calc__result-unit">/mo</span></div>
        </div>
        <div className="demo-mortgage-calc__result">
          <div className="demo-mortgage-calc__result-label">Loan Amount</div>
          <div className="demo-mortgage-calc__result-value-sm">{formatCurrency(principal)}</div>
        </div>
        <div className="demo-mortgage-calc__result">
          <div className="demo-mortgage-calc__result-label">Total Interest</div>
          <div className="demo-mortgage-calc__result-value-sm">{formatCurrency(totalInterest)}</div>
        </div>
        <div className="demo-mortgage-calc__result">
          <div className="demo-mortgage-calc__result-label">Total Paid</div>
          <div className="demo-mortgage-calc__result-value-sm">{formatCurrency(totalPaid)}</div>
        </div>
      </div>

      <div className="demo-mortgage-calc__disclaimer">
        Estimate only. Does not include taxes, insurance, or PMI. For exact rates, contact a lender.
        Live rate data: Freddie Mac Primary Mortgage Market Survey API (free) or Zillow API.
      </div>
    </div>
  );
};

export default MortgageCalculator;
