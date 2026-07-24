import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/process/";
const pageTitle = "How I Build Websites — From First Call to Launch | Bradley Matera";
const pageDescription =
  "A clear 5-step process for building small business websites: free consultation, scope and proposal, design and build, review and revisions, launch and support. Starter sites in 14 days.";

const timelineRows = [
  { tier: "Starter", time: "14 days", detail: "Up to 5 pages, mobile-ready, SEO-ready" },
  { tier: "Growth", time: "3-4 weeks", detail: "Up to 10 pages, Google Business Profile, advanced schema" },
  { tier: "Lead Engine", time: "Scoped per project", detail: "Custom integrations, unlimited pages, AI features" },
];

const includedItems = [
  "Mobile-first responsive design",
  "Accessibility checks (WCAG basics)",
  "On-page SEO and schema markup",
  "Contact form setup",
  "Hosting configuration",
  "Google Analytics 4 setup",
  "Two rounds of revisions",
  "30-day post-launch warranty",
];

const ProcessPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Process
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Process"
      titleAs="h1"
      title={
        <>
          <strong>How I build websites</strong> — from first call to launch.
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What is Bradley's process for building a website?</strong> Five steps: a free consultation to understand your business, a clear scope and proposal, a mobile-first design and build, a review period with revisions, and a launch with 30-day warranty and ongoing support. Starter sites ship in 14 days.
          </p>
        </>
      }
      actions={
        <>
          <a href="tel:+16083135373" data-variant="ghost" className="link">
            (608) 313-5373
          </a>
          <Link data-variant="primary" to="/contact/">
            Free consultation
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Step 1 — Free consultation</h2>
          <p className="feature-card__body">
            We talk about your business, your goals, and what's currently broken. No pressure, no sales pitch. I tell you honestly whether a new site makes sense or if you just need a few fixes.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Step 2 — Scope and proposal</h2>
          <p className="feature-card__body">
            You get a clear scope, fixed price, and timeline in writing. No vague estimates. You know exactly what you're paying for and when it will be done before any work starts.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Step 3 — Design and build</h2>
          <p className="feature-card__body">
            I build mobile-first with accessibility and SEO baked in from the start. You see real progress, not radio silence. Code is clean, fast, and owned by you.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Step 4 — Review and revisions</h2>
          <p className="feature-card__body">
            You see the site on a preview link, click around, and request changes. Two rounds of revisions included with every build. Nothing launches until you're happy.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Step 5 — Launch and support</h2>
          <p className="feature-card__body">
            I handle hosting setup, DNS, and go-live. Every build includes a 30-day warranty for bug fixes. Ongoing support starts at $37/month with no contracts.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Timeline"
      title="How long does it take?"
      description={
        <p>
          Build time depends on the package. Here's what to expect from first call to live site.
        </p>
      }
    >
      <div className="card-actions">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Package</th>
              <th>Timeline</th>
              <th>What's included</th>
            </tr>
          </thead>
          <tbody>
            {timelineRows.map((row) => (
              <tr key={row.tier}>
                <td><strong>{row.tier}</strong></td>
                <td>{row.time}</td>
                <td>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/pricing/">See full pricing</Link>
        <Link data-variant="ghost" to="/for-business/">See what's included</Link>
      </div>
    </Section>

    <Section
      eyebrow="Every build"
      title="What's included in every build"
      description={
        <p>
          Regardless of package, every site I build comes with these fundamentals.
        </p>
      }
    >
      <ul className="feature-list">
        {includedItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. We'll talk through your goals and figure out the right package for your business.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>
  </Layout>
);

export default ProcessPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Process", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pathname}
        siteMetadata={site}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
