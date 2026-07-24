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
  REFUND_POLICY,
  IP_WORDING,
  NO_CONTRACTS_REPLACEMENT,
} from "../site/legal/business-identity";

const pathname = "/terms/";
const pageTitle = "Terms of Service | Bradley F. Matera";
const pageDescription =
  "Terms of service for Bradley F. Matera, an Illinois sole proprietor. Website services, project agreements, payment schedule, refunds, IP, warranty, and limitation of liability.";

const TermsPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Terms of Service
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Terms</strong> of Service
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What are the terms of working with {SELLER_LEGAL_NAME}?</strong> {SELLER_DISCLOSURE_SHORT} These Terms cover informational website use and general service expectations. Every custom website project also uses a signed project-specific service agreement and scope of work. If the signed project agreement and these Terms conflict, the signed project agreement controls for that project. Last updated {POLICY_LAST_UPDATED}.
          </p>
        </>
      }
      actions={
        <>
          <a href={SELLER_PHONE_HREF} data-variant="ghost" className="link">
            {SELLER_PHONE}
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
          <h2 className="feature-card__title">Written agreement</h2>
          <p className="feature-card__body">
            Every website project uses a signed service agreement and scope of work. {NO_CONTRACTS_REPLACEMENT}
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">You own the final work</h2>
          <p className="feature-card__body">
            {IP_WORDING.ownership}
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Seller identity" title="Who provides these services">
      <Card variant="outline">
        <p className="feature-card__body">
          {SELLER_DISCLOSURE_SHORT} &ldquo;Matera Digital&rdquo; is an informal trade name only, not a registered LLC or corporation. Bradley F. Matera operates as an Illinois sole proprietor. These Terms and any signed project agreement are between you and Bradley F. Matera individually.
        </p>
        <p className="feature-card__body">
          Contact: {SELLER_EMAIL} · {SELLER_PHONE}
        </p>
      </Card>
    </Section>

    <Section eyebrow="Website use" title="Informational website use">
      <Card variant="outline">
        <p className="feature-card__body">
          This website (bradleymatera.dev) provides information about services, pricing, portfolio work, and blog content. Using this site does not create a service relationship. A service relationship begins only when both parties sign a project-specific service agreement and the deposit is received.
        </p>
        <p className="feature-card__body">
          You agree not to misuse this site, including attempting unauthorized access, scraping content for resale, introducing malware, or interfering with normal operation.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Services" title="Website services">
      <Card variant="outline">
        <p className="feature-card__body">
          {SELLER_LEGAL_NAME} provides the following services to small businesses:
        </p>
        <ul>
          <li>Website design and development</li>
          <li>Search engine optimization (SEO) and local SEO</li>
          <li>Website maintenance and ongoing support (care plans)</li>
          <li>Website refreshes and redesigns</li>
          <li>Website repair and troubleshooting</li>
          <li>Website accessibility audits and improvements</li>
          <li>Digital products sold through the store</li>
        </ul>
        <p className="feature-card__body">
          See the <Link to="/service-scope/">service scope page</Link> for full details on what is included in each package.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Project agreements" title="Project-specific service agreements">
      <Card variant="outline">
        <p className="feature-card__body">
          Every custom website project begins with a written service agreement that includes:
        </p>
        <ul>
          <li>The scope of work — pages, features, deliverables, and timeline</li>
          <li>The total price and payment schedule</li>
          <li>The number of revision rounds included</li>
          <li>Client responsibilities (content, feedback, access)</li>
          <li>Warranty terms</li>
          <li>Intellectual property terms</li>
        </ul>
        <p className="feature-card__body">
          These Terms do not replace the signed project-specific service agreement. If the documents conflict, the signed project agreement controls for that project.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Scope changes" title="Scope changes">
      <Card variant="outline">
        <ul>
          <li>Any changes or additions to the agreed scope require written approval before work begins.</li>
          <li>Additional work outside the approved scope is quoted separately.</li>
          <li>Quotes are valid for 30 days from the date issued.</li>
          <li>Delays in providing content or feedback may extend the project timeline.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Client responsibilities" title="Customer responsibilities">
      <Card variant="outline">
        <p className="feature-card__body">
          To keep projects on schedule, clients are responsible for:
        </p>
        <ul>
          <li>Providing content (text, images, logos) in a timely manner.</li>
          <li>Giving feedback and approval within agreed review periods.</li>
          <li>Providing access to existing accounts (hosting, domain, analytics) when needed.</li>
          <li>Communicating changes or concerns as early as possible.</li>
          <li>Reviewing and signing the service agreement before work begins.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Payment" title="Payment schedule">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Project deposits</h3>
          <p className="feature-card__body">
            {PAYMENT_TERMS.depositDescription} {PAYMENT_TERMS.finalBalanceDescription}
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Monthly care plans</h3>
          <p className="feature-card__body">
            {PAYMENT_TERMS.monthlyBillingDescription} {NO_CONTRACTS_REPLACEMENT}
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Hourly work</h3>
          <p className="feature-card__body">
            $65/hour with a 1-hour minimum. Invoiced after work is completed. You approve scope before work begins.
          </p>
        </Card>
      </div>
      <Card variant="outline" style={{ marginTop: "1rem" }}>
        <ul>
          <li>{PAYMENT_TERMS.feePolicy}</li>
          <li>{PAYMENT_TERMS.currency}</li>
          <li>See the <Link to="/payment-terms/">Payment Terms page</Link> for accepted payment methods and detailed terms.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Late payments" title="Late or failed payments">
      <Card variant="outline">
        <ul>
          <li>If a final balance is not received before launch, the site will not be published or transferred until payment is received.</li>
          <li>If a monthly care plan payment fails, service continues for the current billing period and pauses at the next renewal until payment is resolved.</li>
          <li>Repeated payment failures may require prepayment for future work.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Cancellation" title="Cancellation">
      <Card variant="outline">
        <ul>
          <li><strong>Client-requested project cancellation:</strong> If you cancel a project after the first revision round is delivered, you receive all completed work to date and are billed for work completed beyond the deposit. See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> for details.</li>
          <li><strong>Bradley-requested cancellation:</strong> If Bradley cancels a project for any reason, any paid deposit is refunded in full and all completed work is transferred to you.</li>
          <li><strong>Monthly care plans:</strong> Cancel before the next billing period. No penalties, no notice required. See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> for details.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Refunds" title="Refunds">
      <Card variant="outline">
        <p className="feature-card__body">
          {REFUND_POLICY.depositRefund} {REFUND_POLICY.refundMethod} {REFUND_POLICY.nonwaivableRights}
        </p>
        <p className="feature-card__body">
          See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> for the full policy covering project deposits, milestone refunds, monthly plan cancellation, duplicate payments, and digital-product problems.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Intellectual property" title="Intellectual property">
      <Card variant="outline">
        <ul>
          <li><strong>Custom deliverables:</strong> {IP_WORDING.ownership}</li>
          <li><strong>Domains and accounts:</strong> {IP_WORDING.domains}</li>
          <li><strong>Third-party assets:</strong> Any third-party fonts, images, plugins, or components are licensed under their respective terms and remain governed by those terms.</li>
          <li><strong>Store products:</strong> Digital products sold through the store are governed by the <Link to="/digital-product-license/">Digital Product License</Link>, not this intellectual property section.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Third-party tools" title="Third-party tools and licenses">
      <Card variant="outline">
        <p className="feature-card__body">
          Websites may use third-party tools, libraries, fonts, plugins, and services (e.g., Google Analytics, Google Fonts, Stripe, Netlify, Resend). These are governed by their own terms and privacy policies. Bradley F. Matera is not responsible for changes to third-party services, their availability, or their data practices.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Portfolio" title="Portfolio-display permission">
      <Card variant="outline">
        <p className="feature-card__body">
          Unless you opt out in writing, Bradley F. Matera may display your completed website in a portfolio and case studies, including screenshots, descriptions of work performed, and measured outcomes. Client contact information is never published without separate written permission.
        </p>
        <p className="feature-card__body">
          To opt out of portfolio display, notify Bradley in writing at any time.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Warranty" title="Warranty boundaries">
      <Card variant="outline">
        <p className="feature-card__body">
          A 30-day post-launch warranty covers bugs and functionality issues caused by the build. This includes broken links, layout errors, and non-functioning features that existed at launch.
        </p>
        <p className="feature-card__body">
          The warranty does <strong>not</strong> cover:
        </p>
        <ul>
          <li>Content changes or new feature requests after launch.</li>
          <li>Issues caused by third-party services, plugins, or hosting changes.</li>
          <li>Changes you or anyone else makes to the site after launch.</li>
          <li>Issues arising from failure to apply recommended updates.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="No guarantees" title="No guarantee of rankings, revenue, leads, or uninterrupted third-party services">
      <Card variant="outline">
        <p className="feature-card__body">
          Bradley F. Matera does not guarantee specific search engine rankings, revenue, leads, traffic, conversions, or business outcomes. SEO and web development results depend on many factors outside any service provider&rsquo;s control, including search engine algorithm changes, competitor activity, market conditions, and client follow-through.
        </p>
        <p className="feature-card__body">
          No service provider can guarantee complete security, complete accessibility compliance, or uninterrupted operation of third-party services (hosting, email, analytics, payment processors). Bradley uses industry-standard practices but does not represent that any website is immune to security incidents, accessibility gaps, or service interruptions.
        </p>
        <p className="feature-card__body">
          &ldquo;Response time&rdquo; means acknowledging a support request, not necessarily resolving it. Resolution time depends on the nature and complexity of the issue.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Liability" title="Reasonable limitation of liability">
      <Card variant="outline">
        <p className="feature-card__body">
          To the extent permitted by law, Bradley F. Matera&rsquo;s total liability arising from any website project is limited to the amount you paid for that project. This limitation does not apply to liability that cannot legally be limited or excluded under applicable law.
        </p>
        <p className="feature-card__body">
          Bradley F. Matera is not liable for indirect, incidental, special, or consequential damages, including lost revenue, lost profits, or business interruption, to the extent permitted by law. Nothing in these Terms limits any statutory rights you may have that cannot legally be waived.
        </p>
        <p className="feature-card__body">
          These Terms were not reviewed by an attorney. If you have specific legal concerns, consult a licensed attorney in your jurisdiction.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Governing law" title="Illinois governing law">
      <Card variant="outline">
        <p className="feature-card__body">
          These Terms and any service relationship with Bradley F. Matera are governed by the laws of the State of Illinois, without regard to conflict-of-law principles. Any disputes shall be resolved in the courts located in Winnebago County, Illinois, or as otherwise required by law.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about these terms?"
      description={
        <p>
          If you have any questions about these terms before or during a project, reach out directly.
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
        <Link data-variant="ghost" to="/privacy/">Privacy Policy</Link>
        <Link data-variant="ghost" to="/refund-policy/">Refund and Cancellation Policy</Link>
        <Link data-variant="ghost" to="/payment-terms/">Payment Terms</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Effective date: {POLICY_LAST_UPDATED}. Last updated: {POLICY_LAST_UPDATED}.
      </p>
    </Section>
  </Layout>
);

export default TermsPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Terms of Service", item: pageUrl },
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
