import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/website-care-plans/";
const pageTitle = "Website Care Plans and Maintenance | Bradley Matera";
const pageDescription =
  "Website care plans and ongoing maintenance for small businesses. Three tiers from $37 to $97 per month with updates, backups, monitoring, and support.";

const careTiers = [
  {
    name: "Essential",
    price: "$37",
    period: "/month",
    desc: "Keep your site secure, backed up, and online.",
    image: "/package-images/essential-care.svg",
    features: [
      "Monthly security updates",
      "Weekly off-site backups",
      "Uptime monitoring with email alerts",
      "30-minute monthly maintenance window",
      "Email support, 48-hour response",
    ],
  },
  {
    name: "Growth",
    price: "$67",
    period: "/month",
    desc: "Updates, content changes, and faster support.",
    image: "/package-images/growth-care.svg",
    features: [
      "Everything in Essential",
      "Bi-weekly security and plugin updates",
      "Daily off-site backups",
      "2 content updates per month (text, images, pages)",
      "Priority email support, 24-hour response",
      "Monthly uptime and performance report",
    ],
  },
  {
    name: "Search",
    price: "$97",
    period: "/month",
    desc: "Maintenance plus local SEO and strategy.",
    image: "/package-images/search-care.svg",
    features: [
      "Everything in Growth",
      "Weekly security updates",
      "Google Business Profile management",
      "Local SEO monitoring and monthly ranking report",
      "Monthly strategy call (30 minutes)",
      "Priority support, same-day response",
    ],
  },
];

const comparisonRows = [
  { feature: "Security updates", essential: "Monthly", growth: "Bi-weekly", search: "Weekly" },
  { feature: "Off-site backups", essential: "Weekly", growth: "Daily", search: "Daily" },
  { feature: "Uptime monitoring", essential: "Yes", growth: "Yes", search: "Yes" },
  { feature: "Content updates", essential: "—", growth: "2 per month", search: "2 per month" },
  { feature: "Google Business Profile", essential: "—", growth: "—", search: "Yes" },
  { feature: "Local SEO monitoring", essential: "—", growth: "—", search: "Yes" },
  { feature: "Monthly strategy call", essential: "—", growth: "—", search: "30 minutes" },
  { feature: "Support response time", essential: "48 hours", growth: "24 hours", search: "Same day" },
  { feature: "Monthly performance report", essential: "—", growth: "Yes", search: "Yes" },
];

const faqs = [
  {
    q: "Do I need a care plan?",
    a: "If your website runs on WordPress or any CMS with plugins, yes — security updates and backups are essential. Static sites need less maintenance but still benefit from uptime monitoring and occasional updates.",
  },
  {
    q: "Are there contracts?",
    a: "No. All care plans are month-to-month. You can cancel, upgrade, or downgrade anytime with 30 days notice. You own your site and all its content regardless.",
  },
  {
    q: "What counts as a content update?",
    a: "A content update is changing text, swapping images, adding a blog post, or adding a new page. Major redesigns or new features are billed separately at $65/hour.",
  },
  {
    q: "What happens if my site goes down?",
    a: "Uptime monitoring detects outages and alerts me immediately. I investigate and restore your site from the most recent backup. Most outages are resolved within 1-2 hours.",
  },
];

const WebsiteCarePlansPage = () => (
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
          Website Care Plans
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Care Plans"
      titleAs="h1"
      title={
        <>
          <strong>Website Care Plans</strong> and Maintenance
        </>
      }
      description={
        <>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-subtle)", marginBottom: "1rem" }}>Last updated: July 2026 · By Bradley Matera</p>
          <p className="direct-answer">
            <strong>What are website care plans?</strong> Ongoing maintenance, security updates, backups, and support for your website. Three tiers from $37 to $97 per month. No long-term commitment. Website care plans are month-to-month. Every website project still uses a written service agreement and scope of work. Your site stays secure, backed up, and online.
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
        {careTiers.map((tier) => (
          <div key={tier.name} className="pkg-card">
            <img src={tier.image} alt={`${tier.name} care plan illustration`} className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h2 className="pkg-card__title">{tier.name}</h2>
              <p className="pkg-card__desc">
                <strong>{tier.price}{tier.period}</strong> — {tier.desc}
              </p>
              <ul className="feature-list">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="card-actions">
                <Link data-variant="primary" to="/contact/">Choose {tier.name}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Compare plans"
      title="Care plan comparison"
      description={
        <p>
          Side-by-side comparison of what's included in each care plan tier.
        </p>
      }
    >
      <Card variant="outline">
        <table className="care-plan-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Essential ($37)</th>
              <th>Growth ($67)</th>
              <th>Search ($97)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.feature}>
                <td><strong>{row.feature}</strong></td>
                <td>{row.essential}</td>
                <td>{row.growth}</td>
                <td>{row.search}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Section>

    <Section
      eyebrow="What's covered"
      title="What care plans include"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/care-security.svg" alt="Security updates illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Security updates</h3>
            <p className="pkg-card__desc">
              Regular updates to your CMS, plugins, and themes to patch security vulnerabilities before they're exploited.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/care-backups.svg" alt="Backups illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Backups</h3>
            <p className="pkg-card__desc">
              Off-site backups stored separately from your hosting. If your site breaks or gets hacked, I restore from backup.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/care-uptime.svg" alt="Uptime monitoring illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Uptime monitoring</h3>
            <p className="pkg-card__desc">
              Your site is checked every 5 minutes. If it goes down, I'm alerted and investigate immediately.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/care-content.svg" alt="Content updates illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Content updates</h3>
            <p className="pkg-card__desc">
              Growth and Search plans include content changes — text edits, image swaps, new pages, blog posts.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/care-localseo.svg" alt="Local SEO illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Local SEO</h3>
            <p className="pkg-card__desc">
              Search plan includes Google Business Profile management and monthly local ranking reports.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/care-support.svg" alt="Support illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Support</h3>
            <p className="pkg-card__desc">
              Email support with target response times. Search plan includes a monthly strategy call.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which option fits your business?"
      description={
        <p>
          Side-by-side comparison of what is included in each care plan tier.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Website care plans comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Essential — $37/mo</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Growth — $67/mo</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Search — $97/mo</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Updates/month</td>
              <td style={{ padding: "0.75rem" }}>Monthly</td>
              <td style={{ padding: "0.75rem" }}>Bi-weekly</td>
              <td style={{ padding: "0.75rem" }}>Weekly</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Backups</td>
              <td style={{ padding: "0.75rem" }}>Weekly</td>
              <td style={{ padding: "0.75rem" }}>Daily</td>
              <td style={{ padding: "0.75rem" }}>Daily</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Uptime monitoring</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Security scans</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Content updates</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>2 per month</td>
              <td style={{ padding: "0.75rem" }}>2 per month</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Performance checks</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Priority support</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Response time</td>
              <td style={{ padding: "0.75rem" }}>48 hours</td>
              <td style={{ padding: "0.75rem" }}>24 hours</td>
              <td style={{ padding: "0.75rem" }}>Same day</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Monthly report</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about care plans"
    >
      <div className="grid-three">
        {faqs.map((faq) => (
          <div key={faq.q} className="pkg-card">
            <img src="/package-images/why-fixed.svg" alt={`${faq.q} illustration`} className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">{faq.q}</h3>
              <p className="pkg-card__desc">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I'll help you pick the right tier for your site.
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

export default WebsiteCarePlansPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Care Plans and Maintenance",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website maintenance",
        "Security updates",
        "Website backups",
        "Uptime monitoring",
        "Content updates",
        "Local SEO management",
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
          name: "Essential Care Plan — $37/month",
          price: "37",
          priceCurrency: "USD",
          description: "Monthly security updates, weekly off-site backups, uptime monitoring, 48-hour email support.",
        },
        {
          "@type": "Offer",
          name: "Growth Care Plan — $67/month",
          price: "67",
          priceCurrency: "USD",
          description: "Bi-weekly updates, daily backups, 2 content updates per month, 24-hour priority support, monthly performance report.",
        },
        {
          "@type": "Offer",
          name: "Search Care Plan — $97/month",
          price: "97",
          priceCurrency: "USD",
          description: "Weekly updates, daily backups, Google Business Profile management, local SEO monitoring, monthly strategy call, same-day support.",
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
        { "@type": "ListItem", position: 3, name: "Website Care Plans", item: pageUrl },
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
