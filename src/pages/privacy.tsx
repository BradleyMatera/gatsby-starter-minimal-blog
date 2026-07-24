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
} from "../site/legal/business-identity";

const pathname = "/privacy/";
const pageTitle = "Privacy Policy | Bradley F. Matera";
const pageDescription =
  "How Bradley F. Matera collects, uses, and retains your information. Contact-form data, order metadata, analytics, hosting, email, and payment processors.";

const PrivacyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Privacy Policy
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Privacy</strong> Policy
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What information does {SELLER_LEGAL_NAME} collect and how is it used?</strong> {SELLER_DISCLOSURE_SHORT} This policy explains what information is collected through this website, how it is used, who it is shared with, how long it is kept, and how to request access, correction, or deletion. Last updated {POLICY_LAST_UPDATED}.
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
          <h2 className="feature-card__title">No selling of data</h2>
          <p className="feature-card__body">
            Your personal information is never sold, rented, or licensed to third parties for marketing purposes.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Limited sharing</h2>
          <p className="feature-card__body">
            Limited information is shared with service providers when necessary to operate the site, process payments, prevent fraud, and deliver purchases.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Your rights</h2>
          <p className="feature-card__body">
            You can request access to, correction of, or deletion of your personal data, subject to legal recordkeeping obligations.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Quick reference" title="What data we collect">
      <Card variant="outline">
        <table className="data-table">
          <caption>What data we collect, how we use it, and how long we keep it</caption>
          <thead>
            <tr>
              <th scope="col">Data type</th>
              <th scope="col">What it is</th>
              <th scope="col">How we use it</th>
              <th scope="col">How long we keep it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Data type">Contact form submissions</td>
              <td data-label="What it is">Name, email, phone, business name, project details you provide.</td>
              <td data-label="How we use it">Respond to inquiries and provide quotes.</td>
              <td data-label="How long we keep it">As long as needed to respond, then deleted unless a project begins.</td>
            </tr>
            <tr>
              <td data-label="Data type">Analytics data</td>
              <td data-label="What it is">Aggregated or pseudonymous page visits, device types, general regions.</td>
              <td data-label="How we use it">Understand site usage and improve content.</td>
              <td data-label="How long we keep it">Retained by the analytics provider per its own policy.</td>
            </tr>
            <tr>
              <td data-label="Data type">Cookies</td>
              <td data-label="What it is">Analytics cookies set by providers (no advertising cookies).</td>
              <td data-label="How we use it">Track aggregate usage statistics only.</td>
              <td data-label="How long we keep it">Persist on your device until you clear them via browser settings.</td>
            </tr>
            <tr>
              <td data-label="Data type">Payment data</td>
              <td data-label="What it is">Order ID, customer email, product ID, amount, transaction ID. Card details never touch this site.</td>
              <td data-label="How we use it">Process payments, deliver products, issue receipts.</td>
              <td data-label="How long we keep it">Retained for tax compliance and legal recordkeeping as required by law.</td>
            </tr>
            <tr>
              <td data-label="Data type">Server logs</td>
              <td data-label="What it is">Hosting provider (Netlify) logs of requests, IPs, timestamps.</td>
              <td data-label="How we use it">Operate the site, prevent fraud, and diagnose issues.</td>
              <td data-label="How long we keep it">Managed by the hosting provider per its retention policy.</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Section>

    <Section eyebrow="Data collected" title="What information we collect">
      <Card variant="outline">
        <h3 className="feature-card__title">Contact-form data</h3>
        <p className="feature-card__body">
          When you use the contact form, you voluntarily provide: name, email address, phone number (if included), and business information (business name, services, project details). This is used to respond to your inquiry and provide a quote.
        </p>
      </Card>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <h3 className="feature-card__title">Account and customer-portal data</h3>
        <p className="feature-card__body">
          If you create an account through the customer portal (using Netlify Identity), your email address and authentication data are collected. This allows you to view your orders and download purchased products.
        </p>
      </Card>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <h3 className="feature-card__title">Order and transaction metadata</h3>
        <p className="feature-card__body">
          When you make a purchase, the following metadata is stored: order ID, customer email, product ID, quantity, purchase date, payment provider transaction ID, and order status. Payment card numbers and bank account details are never stored on this site — they are handled entirely by Stripe and other payment processors.
        </p>
      </Card>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <h3 className="feature-card__title">Analytics and cookies</h3>
        <p className="feature-card__body">
          This site may use Google Analytics or similar tools to collect aggregated or pseudonymous analytics information — which pages are visited, general geographic regions, device types, and referral sources. This information is not used to identify you personally. Cookies may be set by analytics providers. You can control cookies through your browser settings. See the &ldquo;Cookies and analytics&rdquo; section below for details.
        </p>
      </Card>
    </Section>

    <Section eyebrow="How data is used" title="How we use your information">
      <Card variant="outline">
        <ul>
          <li>Responding to your inquiries and providing quotes.</li>
          <li>Delivering website design, development, and SEO services you have requested.</li>
          <li>Processing payments and delivering purchased digital products.</li>
          <li>Sending project updates and communications related to your engagement.</li>
          <li>Billing, recordkeeping, and tax compliance.</li>
          <li>Preventing fraud and abuse.</li>
        </ul>
        <p className="feature-card__body">
          No marketing emails are sent unless you explicitly opt in.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Who data is shared with" title="Service providers and data sharing">
      <Card variant="outline">
        <p className="feature-card__body">
          Your data is not sold or licensed to third parties. However, limited information is provided to service providers when necessary to operate this site, process payments, prevent fraud, and deliver purchases. These providers include:
        </p>
        <ul>
          <li><strong>Hosting providers</strong> (Netlify) — serve the website and store server logs.</li>
          <li><strong>Email providers</strong> (Resend) — send receipt emails and project communications.</li>
          <li><strong>Stripe</strong> — processes credit card payments. Stripe receives your email, payment amount, and product description. Card details are handled entirely by Stripe and never touch this site.</li>
          <li><strong>PayPal</strong> (if enabled) — processes payments through PayPal checkout or invoices. PayPal receives your email, payment amount, and product description.</li>
          <li><strong>Authentication/database providers</strong> (Netlify Identity, PostgreSQL database) — manage customer portal accounts and store order metadata.</li>
          <li><strong>Analytics providers</strong> (Google Analytics, if enabled) — receive aggregated or pseudonymous usage data.</li>
        </ul>
        <p className="feature-card__body">
          Each service provider has its own privacy policy governing how they handle data. Bradley F. Matera is not responsible for the data practices of third-party providers.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Legal basis" title="Legal and tax recordkeeping">
      <Card variant="outline">
        <p className="feature-card__body">
          Certain transaction records (invoices, payment metadata, customer email) are retained as required for tax compliance, fraud prevention, and legal recordkeeping. These records may be kept for the period required by applicable tax and business laws, even if you request deletion of other data.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Cookies & analytics" title="Cookies and analytics">
      <Card variant="outline">
        <p className="feature-card__body">
          This site may use cookies and similar technologies for analytics. Specifically:
        </p>
        <ul>
          <li>Google Analytics (if enabled) collects aggregated or pseudonymous analytics information about page visits, device types, and general geographic regions.</li>
          <li>Cookies set by analytics providers may persist on your device.</li>
          <li>This site does not use advertising pixels, cross-site tracking, or remarketing lists.</li>
          <li>This site does not use cookies for targeted advertising.</li>
        </ul>
        <p className="feature-card__body">
          You can control or disable cookies through your browser settings. A consent mechanism may be shown depending on your region and the analytics configuration in use. Nonessential analytics scripts are loaded only after the applicable consent rule is satisfied where required.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Retention" title="Data retention">
      <Card variant="outline">
        <ul>
          <li><strong>Project-related data</strong> (files, communications, account access) is kept for the duration of the engagement plus 30 days, then deleted unless required for legal or tax recordkeeping.</li>
          <li><strong>Contact form submissions</strong> from non-clients are deleted after 90 days unless a working relationship begins.</li>
          <li><strong>Transaction records</strong> (order ID, customer email, payment metadata) are retained for the period required by applicable tax and business laws. This may be several years.</li>
          <li><strong>Deletion requests</strong> are processed within 30 days, except for records that must be retained for legal, tax, or fraud-prevention purposes. You will be informed if deletion is limited by these obligations.</li>
        </ul>
        <p className="feature-card__body">
          This site does not promise a retention period that the code and business cannot follow. If deletion is limited by legal obligations, that is disclosed to you.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Your rights" title="Your rights — access, correction, and deletion">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Request access</h3>
          <p className="feature-card__body">
            Ask for a copy of the personal data held about you. You will receive it within 30 days.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Request correction</h3>
          <p className="feature-card__body">
            If any personal data is inaccurate or outdated, request a correction.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Request deletion</h3>
          <p className="feature-card__body">
            Request deletion of your personal data. Deletion is subject to legal recordkeeping obligations for transaction and tax records.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Security" title="Security limitations">
      <Card variant="outline">
        <p className="feature-card__body">
          This site uses HTTPS for all connections. Payment processing is handled by Stripe and PayPal, which are PCI-compliant. No card numbers or bank details are stored on this site. Authentication tokens are handled server-side.
        </p>
        <p className="feature-card__body">
          No website or online service can guarantee complete security. Bradley F. Matera uses industry-standard practices but cannot represent that this site is immune to security incidents. If a data breach occurs, affected users will be notified as required by applicable law.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about privacy?"
      description={
        <p>
          To exercise any of your rights or ask questions about this privacy policy, reach out directly.
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
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Effective date: {POLICY_LAST_UPDATED}. Last updated: {POLICY_LAST_UPDATED}.
      </p>
    </Section>
  </Layout>
);

export default PrivacyPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: pageUrl },
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
