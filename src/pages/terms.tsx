import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/terms/";
const pageTitle = "Terms of Service | Bradley Matera";
const pageDescription =
  "Terms of service for website design, development, and SEO work with Bradley Matera. 50% deposit, defined revisions, 30-day warranty, month-to-month support.";

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
            <strong>What are the terms of working with Bradley Matera?</strong> Website design, development, and SEO services with a 50% deposit to start and 50% on launch. You own all final work, revisions are defined per package, and monthly support is month-to-month with no contracts. Last updated July 2026.
          </p>
        </>
      }
      actions={
        <>
          <a href="tel:+16083135373" data-variant="ghost" className="link">
            (608) 313-5373
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
            50% to start, 50% on launch. Deposit is refundable until the first revision round.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">You own the work</h2>
          <p className="feature-card__body">
            All final deliverables are yours. I retain rights only to reusable code libraries.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No contracts</h2>
          <p className="feature-card__body">
            Monthly support is month-to-month. Cancel anytime, no penalties.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Services"
      title="Services provided"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          Bradley Matera provides the following services to small businesses:
        </p>
        <ul>
          <li>Website design and development</li>
          <li>Search engine optimization (SEO) and local SEO</li>
          <li>Website maintenance and ongoing support</li>
          <li>Website refreshes and redesigns</li>
        </ul>
        <p className="feature-card__body">
          See the <Link to="/service-scope/">service scope page</Link> for full details on what's included.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Scope & quotes"
      title="Project scope and quotes"
    >
      <Card variant="outline">
        <ul>
          <li>A written scope of work is agreed before any work begins.</li>
          <li>The scope includes pages, features, deliverables, and timeline.</li>
          <li>Any changes or additions to the agreed scope are quoted separately before work begins.</li>
          <li>Quotes are valid for 30 days from the date issued.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Payment"
      title="Payment terms"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Build payments</h3>
          <p className="feature-card__body">
            50% deposit to start, 50% on launch. Deposit is refundable until the first revision round.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Monthly support</h3>
          <p className="feature-card__body">
            Month-to-month, billed in advance. Cancel anytime with no penalties.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Hourly work</h3>
          <p className="feature-card__body">
            $65/hour with a 1-hour minimum. Invoiced after work is completed.
          </p>
        </Card>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
      </div>
    </Section>

    <Section
      eyebrow="Client responsibilities"
      title="Client responsibilities"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          To keep projects on schedule, clients are responsible for:
        </p>
        <ul>
          <li>Providing content (text, images, logos) in a timely manner.</li>
          <li>Giving feedback and approval within agreed review periods.</li>
          <li>Providing access to existing accounts (hosting, domain, analytics) when needed.</li>
          <li>Communicating changes or concerns as early as possible.</li>
        </ul>
        <p className="feature-card__body">
          Delays in providing content or feedback may extend the project timeline.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Intellectual property"
      title="Intellectual property"
    >
      <Card variant="outline">
        <ul>
          <li><strong>Client ownership:</strong> You own all final deliverables — design, code, content, and domain — upon final payment.</li>
          <li><strong>Reusable code:</strong> Bradley Matera retains rights to reusable code libraries, frameworks, and tools developed independently or used across multiple projects.</li>
          <li><strong>Third-party assets:</strong> Any third-party fonts, images, or plugins are licensed under their respective terms.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Revisions"
      title="Revisions"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Starter Presence</h3>
          <p className="feature-card__body">
            1 revision round included. Additional revisions at $65/hour.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Local Growth</h3>
          <p className="feature-card__body">
            2 revision rounds included. Additional revisions at $65/hour.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Lead Engine</h3>
          <p className="feature-card__body">
            3 revision rounds included. Additional revisions at $65/hour.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Cancellation"
      title="Cancellation and refunds"
    >
      <Card variant="outline">
        <ul>
          <li><strong>Deposit refund:</strong> The 50% deposit is fully refundable until the first revision round is delivered. After that, work completed is billable.</li>
          <li><strong>Monthly support:</strong> Cancel anytime. You only pay for the current month already billed. No penalties, no notice required.</li>
          <li><strong>Project cancellation:</strong> If a project is cancelled mid-build, you receive all completed work to date and are billed for hours worked beyond the deposit.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Warranty"
      title="Warranty"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          A 30-day post-launch warranty covers bugs and functionality issues caused by the build. This includes broken links, layout errors, and non-functioning features.
        </p>
        <p className="feature-card__body">
          The warranty does <strong>not</strong> cover content changes, new feature requests, issues caused by third-party services, or changes you make to the site after launch.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Liability"
      title="Limitation of liability"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          Bradley Matera is not liable for indirect, incidental, or consequential damages arising from the use of a website, including lost revenue, lost profits, or business interruption. Total liability is limited to the amount paid for the project.
        </p>
        <p className="feature-card__body">
          I do my best work and stand behind it with a 30-day warranty, but no service provider can guarantee specific business outcomes.
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
        <a href="mailto:bradmatera@gmail.com" data-variant="primary" className="link">
          bradmatera@gmail.com
        </a>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/privacy/">Privacy Policy</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Last updated: July 2026
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
