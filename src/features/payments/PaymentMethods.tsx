import * as React from "react";
import { Link } from "gatsby";
import {
  SELLER_LEGAL_NAME,
  ZELLE_LANGUAGE,
} from "../../site/legal/business-identity";

/**
 * Payment methods overview component.
 * Shows accepted payment methods with safe disabled states for
 * PayPal and Zelle when not configured.
 *
 * PayPal is presented as a "request invoice" option for custom projects.
 * Zelle is shown only as invoice language, never as a public payment button.
 */

type PaymentMethodsProps = {
  showZelle?: boolean;
};

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ showZelle = false }) => {
  const paypalEnabled = typeof window !== "undefined" && Boolean((window as any).__PAYPAL_ENABLED__);

  return (
    <div className="payment-methods" style={{ margin: "1rem 0" }}>
      <h3 className="feature-card__title" style={{ marginBottom: "0.75rem" }}>
        Accepted payment methods
      </h3>
      <ul className="feature-list">
        <li>
          <strong>Stripe (credit and debit cards):</strong> Card payments are processed through
          Stripe-hosted Checkout. Your card number never touches this site.
        </li>
        <li>
          <strong>PayPal (goods and services):</strong>{" "}
          {paypalEnabled ? (
            <>PayPal checkout is available for store purchases.</>
          ) : (
            <>For custom website projects, request a PayPal invoice — it will include the customer name, project description, invoice number, milestone, and amount. PayPal Friends and Family is not accepted for business transactions.</>
          )}{" "}
          The seller is listed as {SELLER_LEGAL_NAME}.
        </li>
        {showZelle && (
          <li>
            <strong>Zelle (established clients only):</strong> {ZELLE_LANGUAGE}
          </li>
        )}
      </ul>
      <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "0.5rem" }}>
        See the <Link to="/payment-terms/">Payment Terms page</Link> for full details on deposits, billing, receipts, and security.
      </p>
    </div>
  );
};

export default PaymentMethods;
