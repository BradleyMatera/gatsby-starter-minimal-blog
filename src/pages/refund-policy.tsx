import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import {
  SELLER_DISCLOSURE_SHORT,
  SELLER_EMAIL,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LAST_UPDATED,
  REFUND_POLICY,
} from "../site/legal/business-identity";

const pathname = "/refund-policy/";
const pageTitle = "Refund and Cancellation Policy | Bradley F. Matera";
const pageDescription =
  "Refund and cancellation policy for Bradley F. Matera. Project deposits, milestone refunds, monthly plan cancellation, digital products, and nonwaivable consumer rights.";

const RefundPolicyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Refund and Cancellation Policy
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Refund</strong> and Cancellation Policy
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What is the refund and cancellation policy?</strong> {SELLER_DISCLOSURE_SHORT} Project deposits are refundable until the first revision round is delivered. Monthly care plans cancel before the next billing period. Digital products may be reviewed for replacement or refund if defective or inaccessible. Nothing in this policy limits rights that cannot legally be waived. Last updated {POLICY_LAST_UPDATED}.
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
          <h2 className="feature-card__title">Deposit refundable</h2>
          <p className="feature-card__body">
            Project deposits are refundable until the first revision round is delivered.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Cancel anytime</h2>
          <p className="feature-card__body">
            Monthly care plans cancel before the next billing period. No penalties.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Original payment method</h2>
          <p className="feature-card__body">
            Any approved refund is returned through the original payment method.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Custom services" title="Custom service deposits">
      <Card variant="outline">
        <p className="feature-card__body">
          {REFUND_POLICY.depositRefund}
        </p>
        <p className="feature-card__body">
          The deposit schedules the project and reserves development time. Once the first revision round is delivered, the deposit is applied to completed and reserved work.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Milestones" title="Project milestone refunds">
      <Card variant="outline">
        <ul>
          <li><strong>Before first revision round:</strong> Full deposit refund available.</li>
          <li><strong>After first revision round, before launch:</strong> Payments are applied to completed work. If you cancel, you receive all completed work to date and are billed for work completed beyond the deposit.</li>
          <li><strong>After launch:</strong> The final balance has been paid. The 30-day warranty covers bugs caused by the build. Post-launch cancellation of care plans is covered separately below.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Client cancellation" title="Client-requested cancellation">
      <Card variant="outline">
        <p className="feature-card__body">
          If you cancel a project:
        </p>
        <ul>
          <li><strong>Before the first revision round:</strong> Your deposit is refunded in full through the original payment method.</li>
          <li><strong>After the first revision round:</strong> You receive all completed work to date. You are billed for work completed beyond the deposit at the agreed hourly rate. Any remaining balance of your deposit is returned.</li>
          <li><strong>Monthly care plans:</strong> Cancel before the next billing period. You keep access through the end of the current paid period. No penalties, no notice required.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Bradley cancellation" title="Bradley-requested cancellation">
      <Card variant="outline">
        <p className="feature-card__body">
          If Bradley F. Matera cancels a project for any reason (including illness, capacity, or scope disagreement):
        </p>
        <ul>
          <li>Any paid deposit is refunded in full.</li>
          <li>All completed work is transferred to you at no charge.</li>
          <li>No additional billing occurs.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Monthly plans" title="Monthly plan cancellation">
      <Card variant="outline">
        <ul>
          <li>Monthly care plans are billed in advance and may be cancelled before the next billing period.</li>
          <li>Cancellation takes effect at the end of the current paid period.</li>
          <li>No penalties, no notice period required.</li>
          <li>If you cancel and later rejoin, current pricing applies at the time of rejoining.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Duplicates" title="Duplicate payments">
      <Card variant="outline">
        <p className="feature-card__body">
          If you are charged twice for the same product or service due to a processing error, contact {SELLER_EMAIL} with the transaction details. The duplicate charge will be refunded through the original payment method once verified.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Failed payments" title="Failed or reversed payments">
      <Card variant="outline">
        <ul>
          <li>If a payment fails, you will be notified and given the opportunity to retry.</li>
          <li>If a payment is reversed (chargeback) without contacting Bradley first, access to purchased products and ongoing services may be suspended pending resolution.</li>
          <li>If you believe a charge is incorrect, contact {SELLER_EMAIL} before initiating a chargeback. Most issues can be resolved directly and faster.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Refund method" title="Approved refund method and timing">
      <Card variant="outline">
        <p className="feature-card__body">
          {REFUND_POLICY.refundMethod}
        </p>
        <ul>
          <li>Stripe payments are refunded through Stripe.</li>
          <li>PayPal payments are refunded through PayPal.</li>
          <li>Zelle payments are refunded by check or bank transfer, as Zelle does not support direct refunds.</li>
          <li>Refunds are typically processed within 5-10 business days of approval, depending on the payment processor and your bank.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Digital products" title="Digital-product problems">
      <Card variant="outline">
        <p className="feature-card__body">
          If a digital product purchased through the store is defective, inaccessible, or duplicated:
        </p>
        <ul>
          <li>Contact {SELLER_EMAIL} with your order number and a description of the problem.</li>
          <li>If the product cannot be delivered or is materially defective, a replacement or refund will be provided.</li>
          <li>If you already downloaded and used the product successfully, a refund is not available unless the product is materially defective.</li>
          <li>See the <Link to="/digital-product-license/">Digital Product License</Link> for product-specific terms.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Your rights" title="Nonwaivable consumer rights">
      <Card variant="outline">
        <p className="feature-card__body">
          {REFUND_POLICY.nonwaivableRights} If you are a consumer, you may have additional rights under state or federal law that cannot be waived by this policy. This policy describes Bradley F. Matera&rsquo;s standard practices and does not override any statutory consumer protection rights.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about refunds or cancellation?"
      description={
        <p>
          Contact Bradley directly with your order number or project details.
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
        <Link data-variant="ghost" to="/payment-terms/">Payment Terms</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Effective date: {POLICY_LAST_UPDATED}. Last updated: {POLICY_LAST_UPDATED}.
      </p>
    </Section>
  </Layout>
);

export default RefundPolicyPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Refund and Cancellation Policy", item: pageUrl },
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
