import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/website-repair/";
const pageTitle = "Website Repair and Troubleshooting | Bradley Matera";
const pageDescription =
  "Website repair and troubleshooting for small businesses. Fix broken pages, forms, layouts, and errors. $65/hour or a full $597 site refresh. Fast turnaround.";

const commonIssues = [
  "Broken contact forms that don't send emails",
  "Pages that display incorrectly on mobile devices",
  "White screen of death or fatal PHP errors",
  "Broken images, missing files, or broken links",
  "Slow page load times and poor Core Web Vitals",
  "SSL certificate errors or mixed content warnings",
  "Broken navigation menus or missing pages",
  "Plugin or theme conflicts causing crashes",
  "Hacked sites with malware or suspicious redirects",
  "Database connection errors or corrupted tables",
];

const faqs = [
  {
    q: "How much does website repair cost?",
    a: "I charge $65/hour for individual fixes with a one-hour minimum. For sites that need significant work, a full site refresh at $597 covers a complete update of your existing site with modern, fast, mobile-ready code.",
  },
  {
    q: "How fast can you fix my website?",
    a: "Most small fixes are done within 24-48 hours. Emergency fixes for broken sites can often be done same-day. Full site refreshes take 3-4 weeks depending on scope.",
  },
  {
    q: "Do you work on any platform or CMS?",
    a: "I work on WordPress, Gatsby, static HTML sites, and most common platforms. If your site is on a proprietary builder, I'll assess whether I can help during the free consultation.",
  },
  {
    q: "Should I repair my site or get a new one?",
    a: "If your site has one or two specific problems, hourly repair is the right choice. If your site is outdated, slow, and has multiple issues, a $597 refresh or a new $447 build may be more cost-effective. I'll tell you honestly which makes sense.",
  },
];

const WebsiteRepairPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="/services/">Services</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Website Repair
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Repair"
      titleAs="h1"
      title={
        <>
          <strong>Website Repair</strong> and Troubleshooting
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What is website repair?</strong> Fixing broken pages, forms, layouts, errors, and performance issues on your existing website. $65/hour for individual fixes, or a full $597 refresh for outdated sites. Fast turnaround, written agreements included.
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
          <h2 className="feature-card__title">$65/hour</h2>
          <p className="feature-card__body">
            One-hour minimum for individual fixes. You approve the scope before work starts. No surprise invoices.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">$597 full refresh</h2>
          <p className="feature-card__body">
            For sites with multiple issues. A complete update with modern, fast, mobile-ready code. Keep your content and domain.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/services/website-redesign/">See redesign services</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">24-48 hour turnaround</h2>
          <p className="feature-card__body">
            Most small fixes done within 24-48 hours. Emergency fixes for broken sites often done same-day.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Report your issue</Link>
          </div>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Common issues"
      title="What I fix"
      description={
        <p>
          These are the most common problems I repair. If your issue isn't listed, ask — I probably fix that too.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          {commonIssues.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="How it works"
      title="From broken to fixed"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">1. Diagnose</h3>
          <p className="feature-card__body">
            You describe the problem. I look at your site, identify the root cause, and give you a clear scope and cost estimate.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">2. Fix</h3>
          <p className="feature-card__body">
            I fix the issue and test it across devices and browsers. You approve the work before any payment changes hands.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">3. Document</h3>
          <p className="feature-card__body">
            I document what was wrong and what I changed, so you have a record. 30-day warranty on all repairs.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Repair vs. rebuild"
      title="Which makes sense for you?"
      description={
        <p>
          Not sure whether to repair or rebuild? Here's how I decide.
        </p>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Hourly repair — $65/hr</h3>
          <p className="feature-card__body">
            Best for one or two specific problems on a site that otherwise works. Broken form, broken page, slow load time.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Full refresh — $597</h3>
          <p className="feature-card__body">
            Best for sites with multiple issues that are also outdated. Complete update with modern code, keep your content.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/services/website-redesign/">See redesign details</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">New build — from $447</h3>
          <p className="feature-card__body">
            Best for sites beyond repair or when you want a fresh start. New custom site built from scratch.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/services/small-business-web-design/">See web design</Link>
          </div>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which option fits your business?"
      description={
        <p>
          Three ways to get your site fixed — pick the one that matches how much work you need.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Website repair comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Hourly — $65/hr</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Half-day — $260</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Full refresh — $597</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Best for</td>
              <td style={{ padding: "0.75rem" }}>One or two specific fixes</td>
              <td style={{ padding: "0.75rem" }}>Several issues at once</td>
              <td style={{ padding: "0.75rem" }}>Outdated site needing a full update</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Response time</td>
              <td style={{ padding: "0.75rem" }}>24-48 hours</td>
              <td style={{ padding: "0.75rem" }}>24-48 hours</td>
              <td style={{ padding: "0.75rem" }}>3-4 week build</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Includes diagnostics</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Broken forms</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Layout fixes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Content updates</td>
              <td style={{ padding: "0.75rem" }}>Limited</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>SEO fixes</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Mobile fixes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Warranty</td>
              <td style={{ padding: "0.75rem" }}>30-day</td>
              <td style={{ padding: "0.75rem" }}>30-day</td>
              <td style={{ padding: "0.75rem" }}>30-day</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about repair"
    >
      <div className="grid-three">
        {faqs.map((faq) => (
          <Card key={faq.q} variant="outline">
            <h3 className="feature-card__title">{faq.q}</h3>
            <p className="feature-card__body">{faq.a}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. Describe what's broken and I'll tell you what it'll take to fix.
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
    <div className="attribution-block" style={{ maxWidth: "42rem", margin: "2rem auto", padding: "1rem 1.5rem", fontSize: "0.875rem", opacity: 0.7, borderTop: "1px solid var(--color-border)" }}>
      <p>
        <strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Northwest Illinois and Southern Wisconsin. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link>
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.
      </p>
    </div>
  </Layout>
);

export default WebsiteRepairPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Repair and Troubleshooting",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website repair",
        "Bug fixes",
        "Performance optimization",
        "Security fixes",
        "Troubleshooting",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
        telephone: "+16083135373",
      },
      areaServed: [
        { "@type": "City", name: "Durand, Illinois" },
        { "@type": "City", name: "Rockford, Illinois" },
        { "@type": "City", name: "Freeport, Illinois" },
        { "@type": "City", name: "Beloit, Wisconsin" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
      offers: [
        {
          "@type": "Offer",
          name: "Hourly Repair — $65/hour",
          price: "65",
          priceCurrency: "USD",
          description: "Individual fixes for broken pages, forms, layouts, and errors. One-hour minimum. 24-48 hour turnaround. 30-day warranty.",
        },
        {
          "@type": "Offer",
          name: "Full Site Refresh — $597",
          price: "597",
          priceCurrency: "USD",
          description: "Complete update of outdated sites with modern, fast, mobile-ready code. Keep content and domain. 3-4 week build time.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.siteUrl}/services/` },
        { "@type": "ListItem", position: 3, name: "Website Repair", item: pageUrl },
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
