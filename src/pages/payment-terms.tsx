import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import {
  SELLER_LEGAL_NAME,
  SELLER_DISCLOSURE_SHORT,
  SELLER_EMAIL,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LAST_UPDATED,
  PAYMENT_TERMS,
  ZELLE_LANGUAGE,
} from "../site/legal/business-identity";

const pathname = "/payment-terms/";
const pageTitle = "Payment Terms | Bradley F. Matera";
const pageDescription =
  "Payment terms for Bradley F. Matera. Accepted methods, deposits, final balances, monthly billing, receipts, refunds, chargebacks, and payment security.";

const PaymentTermsPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Payment Terms
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Payment</strong> Terms
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What are the payment terms?</strong> {SELLER_DISCLOSURE_SHORT} A 50% deposit schedules the project and the remaining balance is due before launch. Monthly care plans are billed in advance. Accepted methods include Stripe (credit cards), PayPal (goods and services), and Zelle for approved clients. All prices are in U.S. dollars. Last updated {POLICY_LAST_UPDATED}.
          </p>
        </>
      }
      actions={
        <>
          <a href={`mailto:${SELLER_EMAIL}`} data-variant="ghost" className="link">
            {SELLER_EMAIL}
          </a>
          <Link data-variant="primary" to="/contact/">
            Contact me
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">50% deposit</h2>
          <p className="feature-card__body">
            {PAYMENT_TERMS.depositDescription}
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Balance before launch</h2>
          <p className="feature-card__body">
            {PAYMENT_TERMS.finalBalanceDescription}
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Monthly in advance</h2>
          <p className="feature-card__body">
            {PAYMENT_TERMS.monthlyBillingDescription}
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Payment methods" title="Accepted payment methods">
      <Card variant="outline">
        <h3 className="feature-card__title">Stripe (credit and debit cards)</h3>
        <p className="feature-card__body">
          Credit and debit card payments are processed through Stripe-hosted Checkout. Your card number is never entered on this site and is never stored by {SELLER_LEGAL_NAME}. Stripe handles all card data in a PCI-compliant environment. Stripe receives your email, payment amount, and product description.
        </p>
      </Card>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <h3 className="feature-card__title">PayPal (goods and services)</h3>
        <p className="feature-card__body">
          PayPal is available for goods and services payments through PayPal checkout or invoice. The seller is listed as {SELLER_LEGAL_NAME}. Friends and Family payments are not accepted for business transactions. For custom website projects, a PayPal invoice can be requested — it will include the customer name, project description, invoice number, milestone, and amount.
        </p>
        <p className="feature-card__body">
          PayPal Seller Protection may or may not apply to a given transaction depending on the transaction type, buyer location, and PayPal&rsquo;s policies. This site does not claim that every transaction is protected by PayPal Seller Protection.
        </p>
      </Card>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <h3 className="feature-card__title">Zelle (established clients only)</h3>
        <p className="feature-card__body">
          {ZELLE_LANGUAGE}
        </p>
        <p className="feature-card__body">
          A Zelle payment still generates an internal payment record and a paid receipt. Zelle payments are not tax-free and are reported as income as required by law. There is no public Zelle payment button on this site, and personal bank information is not published.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Invoices" title="Invoice numbers">
      <Card variant="outline">
        <p className="feature-card__body">
          Every project and store purchase is assigned a unique sequential invoice or order number. This number appears on your invoice, receipt, and any payment records. Include the invoice number in all payment correspondence and in Zelle payment memos.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Deposits" title="Deposits and final balances">
      <Card variant="outline">
        <ul>
          <li>{PAYMENT_TERMS.depositDescription}</li>
          <li>{PAYMENT_TERMS.finalBalanceDescription}</li>
          <li>Work begins only after the service agreement, scope, and deposit are received.</li>
          <li>Additional work outside the approved scope requires written approval and may be invoiced separately.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Monthly billing" title="Monthly billing">
      <Card variant="outline">
        <ul>
          <li>{PAYMENT_TERMS.monthlyBillingDescription}</li>
          <li>Cancellation takes effect at the end of the current paid period.</li>
          <li>{PAYMENT_TERMS.feePolicy}</li>
          <li>{PAYMENT_TERMS.currency}</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Receipts" title="Receipts">
      <Card variant="outline">
        <p className="feature-card__body">
          After a successful payment, you receive an itemized receipt that includes:
        </p>
        <ul>
          <li>Receipt number</li>
          <li>Invoice or order number</li>
          <li>Date paid</li>
          <li>Customer name</li>
          <li>Itemized purchase (product, quantity, unit price)</li>
          <li>Amount paid</li>
          <li>Payment provider (Stripe, PayPal, or Zelle)</li>
          <li>Transaction reference</li>
          <li>Remaining balance (if any)</li>
          <li>Seller identity: {SELLER_LEGAL_NAME}, Illinois sole proprietor</li>
          <li>Support contact: {SELLER_EMAIL}</li>
        </ul>
        <p className="feature-card__body">
          Receipts are sent by email and are also available through the <Link to="/purchases/">customer portal</Link>.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Refunds" title="Refund method">
      <Card variant="outline">
        <p className="feature-card__body">
          Any approved refund is returned through the original payment method. Stripe refunds go through Stripe, PayPal refunds through PayPal, and Zelle refunds by check or bank transfer. See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> for full details.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Chargebacks" title="Chargebacks and dispute contact">
      <Card variant="outline">
        <p className="feature-card__body">
          If you believe a charge is incorrect, contact {SELLER_EMAIL} before initiating a chargeback. Most issues can be resolved directly and faster than a chargeback. If a chargeback is initiated without prior contact, access to purchased products and ongoing services may be suspended pending resolution.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Tax" title="Tax responsibility">
      <Card variant="outline">
        <p className="feature-card__body">
          {SELLER_LEGAL_NAME} is responsible for reporting and paying income tax on payments received. Prices listed on this site do not include separate sales tax collection unless required by applicable law. Customers are responsible for any use-tax obligations that may apply to their purchases. This site does not provide tax advice.
        </p>
        <p className="feature-card__body" style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
          Note: Bradley&rsquo;s EIN is not displayed on this page, on public invoices, or on ordinary customer receipts. It is used only when a specific verified legal need is established.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Security" title="Payment security">
      <Card variant="outline">
        <ul>
          <li>All payments are processed through Stripe or PayPal, both of which are PCI-compliant.</li>
          <li>Card numbers and bank details are never entered on, stored by, or transmitted through this site.</li>
          <li>Payment provider secret keys are stored in server-side environment variables only.</li>
          <li>Webhook events are cryptographically verified before any order is marked as paid.</li>
          <li>Downloads and paid status are never granted based on a client-side redirect alone.</li>
          <li>This site enforces HTTPS for all connections.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Zelle limitations" title="Zelle limitations">
      <Card variant="outline">
        <p className="feature-card__body">
          {ZELLE_LANGUAGE} Zelle does not support direct refunds — approved refunds for Zelle payments are issued by check or bank transfer. Zelle availability depends on the participating financial institutions and may change without notice.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about payment?"
      description={
        <p>
          Contact Bradley directly with your invoice or order number.
        </p>
      }
    >
      <div className="card-actions">
        <a href={`mailto:${SELLER_EMAIL}`} data-variant="primary" className="link">
          {SELLER_EMAIL}
        </a>
        <a href={SELLER_PHONE_HREF} data-variant="ghost" className="link">
          {SELLER_PHONE}
        </a>
        <Link data-variant="ghost" to="/terms/">Terms of Service</Link>
        <Link data-variant="ghost" to="/refund-policy/">Refund and Cancellation Policy</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Effective date: {POLICY_LAST_UPDATED}. Last updated: {POLICY_LAST_UPDATED}.
      </p>
    </Section>
  </Layout>
);

export default PaymentTermsPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Payment Terms", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pathname}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
