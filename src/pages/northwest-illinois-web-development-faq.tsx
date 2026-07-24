import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/northwest-illinois-web-development-faq/";
const pageTitle = "Northwest Illinois Web Development FAQ";
const pageDescription =
  "FAQ for people looking for a web developer in Durand, Davis, or nearby Northwest Illinois: what kind of projects fit, how I work, and what to expect before reaching out.";

const faqs = [
  {
    question: "Do you work only in Durand and Davis, Illinois?",
    answer:
      "No. Durand and Davis are the main local search terms I am targeting on-site, but I am open to nearby Northwest Illinois work and remote projects too.",
  },
  {
    question: "What kind of web development work fits you best right now?",
    answer:
      "Focused website builds, portfolio or service-site refreshes, front-end cleanup, content restructuring, static-site fixes, and smaller full-stack projects where the scope is clear and the work can be documented well.",
  },
  {
    question: "Do you handle large agency-style projects?",
    answer:
      "No. I am not positioning this site like a large agency. The strongest fit is smaller or mid-sized work where clear communication, cleanup, and visible proof matter more than pretending I have a massive team.",
  },
  {
    question: "Can you help with SEO too?",
    answer:
      "Yes, on the site side. That includes page structure, metadata, internal linking, local landing pages, schema, crawl controls, and content cleanup. Off-site work like Google Business Profile, citations, and review collection still requires your direct account access and real business signals.",
  },
  {
    question: "Do local projects need in-person meetings?",
    answer:
      "Not necessarily. Most website and front-end work can be handled remotely. If a local meeting makes sense, the important part is still the same: clear scope, proof, and a practical delivery plan.",
  },
  {
    question: "Where should I start if I found you through a local Google search?",
    answer:
      "Start with the local service page, then review the projects or about page. After that, send the problem, desired outcome, and timing through the contact page so I can tell you honestly whether the fit is right.",
  },
];

const LocalFaqPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="/web-developer-durand-davis-illinois/">Local web development</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Northwest Illinois web development FAQ
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="FAQ"
      title="Questions about web development in Northwest Illinois"
      titleAs="h1"
      description={
        <>
          <p className="direct-answer">
            <strong>What web development services are available in Northwest Illinois?</strong> Bradley Matera offers website builds, site refreshes, SEO optimization, and front-end cleanup for small businesses in Durand, Davis, Rockford, Freeport, and surrounding Northwest Illinois communities. Pricing starts at $447 for a Starter site, with most projects completed in 14-28 days. Remote work is welcome.
          </p>
          <p>
            This page exists to answer the practical questions behind searches like web developer
            Durand Illinois, web developer Davis Illinois, and related Northwest Illinois website help
            searches.
          </p>
        </>
      }
    >
      <div className="grid-two">
        {faqs.map((faq) => (
          <Card key={faq.question} variant="outline">
            <h2 className="feature-card__title">{faq.question}</h2>
            <p className="feature-card__body">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Pricing at a glance"
      title="Compare website tiers side by side"
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Feature</th>
            <th style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Starter ($447)</th>
            <th style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Growth ($797)</th>
            <th style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Premium ($1,497)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Pages</td><td style={{ textAlign: "center" }}>Up to 5</td><td style={{ textAlign: "center" }}>Up to 10</td><td style={{ textAlign: "center" }}>Unlimited</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Monthly support</td><td style={{ textAlign: "center" }}>$37/mo</td><td style={{ textAlign: "center" }}>$67/mo</td><td style={{ textAlign: "center" }}>$97/mo</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>SEO-ready</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Google Business Profile</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Build time</td><td style={{ textAlign: "center" }}>14 days</td><td style={{ textAlign: "center" }}>3-4 weeks</td><td style={{ textAlign: "center" }}>Scoped</td></tr>
          <tr><td style={{ padding: "0.5rem" }}>E-commerce</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Yes</td></tr>
        </tbody>
      </table>
      <div className="card-actions" style={{ marginTop: "1rem" }}>
        <Link data-variant="primary" to="/pricing/">See full pricing</Link>
        <Link data-variant="ghost" to="/contact/">Get a free consultation</Link>
      </div>
    </Section>

    <Section
      eyebrow="Evidence & proof"
      title="Work samples and case studies"
      description={
        <p>
          Don't take my word for it — here's the actual work behind the answers above.
        </p>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Project case studies</h3>
          <p className="feature-card__body">
            See <Link to="/projects/">completed project case studies</Link> with code, screenshots, and honest notes on what worked and what didn't.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Pricing breakdown</h3>
          <p className="feature-card__body">
            Transparent <Link to="/pricing/">pricing tiers</Link> starting at $447 with no hidden fees or contracts.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">About Bradley Matera</h3>
          <p className="feature-card__body">
            Read <Link to="/about/">about my background</Link> — Full Sail University training, AWS Cloud Support internship, and real project work.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Small business checklist</h3>
          <p className="feature-card__body">
            Download the <Link to="/small-business-website-checklist-northwest-illinois/">small business website checklist</Link> to see exactly what a complete site needs.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Related local pages" title="Keep going">
      <div className="card-actions">
        <Link data-variant="primary" to="/web-developer-durand-davis-illinois/">
          Local services page
        </Link>
        <Link data-variant="ghost" to="/website-help-northwest-illinois/">
          Website help and process
        </Link>
        <Link data-variant="ghost" to="/contact/">
          Contact page
        </Link>
      </div>
    </Section>
  </Layout>
);

export default LocalFaqPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Web Developer in Durand and Davis, Illinois", path: "/web-developer-durand-davis-illinois/" },
        { name: "Northwest Illinois Web Development FAQ", path: pathname },
      ]}
    />
  );
};
