import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/website-accessibility/";
const pageTitle = "Website Accessibility Services — WCAG 2.2 AA Compliance | Bradley Matera";
const pageDescription =
  "Website accessibility audits and fixes for WCAG 2.2 AA compliance. Keyboard navigation, screen reader support, color contrast, and ARIA labels for small business websites.";

const auditItems = [
  "Keyboard navigation testing — every page reachable and usable without a mouse",
  "Screen reader compatibility testing with NVDA, JAWS, and VoiceOver",
  "Color contrast audit against WCAG 2.2 AA ratios (4.5:1 for normal text, 3:1 for large text)",
  "ARIA labels and landmarks review for proper semantic structure",
  "Form label and error message validation for assistive technology",
  "Image alt text audit and missing alt text remediation",
  "Heading hierarchy review for proper document outline",
  "Focus management and visible focus indicators",
  "Skip-to-content links and navigation bypass testing",
  "Audio and video content captioning and transcript review",
];

const faqs = [
  {
    q: "What is WCAG 2.2 AA compliance?",
    a: "WCAG 2.2 AA is the accessibility standard referenced by the Americans with Disabilities Act (ADA) and Section 508. It covers keyboard navigation, screen reader support, color contrast, form labels, and more. AA is the middle level — the one most businesses target.",
  },
  {
    q: "Does my website need to be ADA compliant?",
    a: "If your business serves the public, your website is likely covered by the ADA. Recent lawsuits and Department of Justice guidance make clear that websites are places of public accommodation. Compliance reduces legal risk and makes your site usable for more customers.",
  },
  {
    q: "How much does an accessibility audit cost?",
    a: "Accessibility audits start at $197 for a full report. Fixing the issues found in the audit is billed at $65/hour or quoted as a fixed project. Most small business sites need 4-8 hours of remediation work.",
  },
  {
    q: "How long does accessibility remediation take?",
    a: "Most small business websites can be made WCAG 2.2 AA compliant in 1-2 weeks after the audit. Larger or more complex sites may take longer. You get a clear timeline after the audit is complete.",
  },
];

const WebsiteAccessibilityPage = () => (
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
          Website Accessibility
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Accessibility"
      titleAs="h1"
      title={
        <>
          <strong>Website Accessibility</strong> Services
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What are website accessibility services?</strong> Audits and fixes to bring your website up to WCAG 2.2 AA compliance — keyboard navigation, screen reader support, color contrast, ARIA labels, and form accessibility. Audits from $197, remediation at $65/hour.
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
          <h2 className="feature-card__title">WCAG 2.2 AA</h2>
          <p className="feature-card__body">
            The standard referenced by the ADA and Section 508. Covers keyboard, screen reader, contrast, and form accessibility.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Request an audit</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Audits from $197</h2>
          <p className="feature-card__body">
            Full report listing every issue with severity, location, and fix recommendation. No obligation to hire me for remediation.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Remediation at $65/hr</h2>
          <p className="feature-card__body">
            Fixing the issues found in the audit. Most small business sites need 4-8 hours. Fixed project quotes available.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Get a quote</Link>
          </div>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="What's covered"
      title="What the audit checks"
      description={
        <p>
          Every accessibility audit covers the following WCAG 2.2 AA criteria. You get a detailed report for each.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          {auditItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="How it works"
      title="From audit to compliance"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">1. Audit</h3>
          <p className="feature-card__body">
            I test your site against WCAG 2.2 AA criteria using automated tools and manual testing with screen readers and keyboard-only navigation.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">2. Report</h3>
          <p className="feature-card__body">
            You receive a detailed report listing every issue, its severity, location, and recommended fix. You decide what to fix and when.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">3. Remediate</h3>
          <p className="feature-card__body">
            I fix the issues you choose to address, re-test to verify compliance, and document the changes. 30-day warranty on all fixes.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Why it matters"
      title="Who benefits from accessibility"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Your customers</h3>
          <p className="feature-card__body">
            1 in 4 adults in the US has a disability. Accessible sites serve more customers — including aging populations who use larger text and keyboard shortcuts.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Your legal risk</h3>
          <p className="feature-card__body">
            ADA website lawsuits are rising. Compliance reduces your risk of demand letters and lawsuits. The DOJ has confirmed websites are places of public accommodation.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Your SEO</h3>
          <p className="feature-card__body">
            Many accessibility fixes also improve SEO. Proper headings, alt text, and semantic HTML help both screen readers and search engines understand your content.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about accessibility"
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
          Call (608) 313-5373 or send a message through the contact page. I'll assess your site and tell you what compliance looks like.
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

export default WebsiteAccessibilityPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Accessibility Services",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "WCAG 2.2 AA audits",
        "Accessibility remediation",
        "ADA compliance",
        "Screen reader testing",
        "Keyboard navigation testing",
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
          name: "Accessibility Audit — $197",
          price: "197",
          priceCurrency: "USD",
          description: "Full WCAG 2.2 AA audit with detailed report listing every issue, severity, location, and recommended fix.",
        },
        {
          "@type": "Offer",
          name: "Remediation — $65/hour",
          price: "65",
          priceCurrency: "USD",
          description: "Fixing accessibility issues found in the audit. Most small business sites need 4-8 hours. Fixed project quotes available.",
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
        { "@type": "ListItem", position: 3, name: "Website Accessibility", item: pageUrl },
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
