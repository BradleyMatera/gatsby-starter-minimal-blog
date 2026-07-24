import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/";
const pageTitle = "Website Services for Small Businesses in Northwest Illinois | Bradley Matera";
const pageDescription =
  "Website design, redesign, local SEO, repair, and care plans for small businesses in Northwest Illinois. Starter sites from $447 with written agreements.";

const serviceCards = [
  {
    title: "Small Business Web Design",
    desc: "New websites built from scratch. Up to 5 pages, mobile-ready, SEO-ready, contact form. Starting at $447.",
    href: "/services/small-business-web-design/",
    image: "web-design.svg",
  },
  {
    title: "Website Redesign",
    desc: "Update your outdated site with a modern, fast, mobile-ready design. Keep your content and domain. Starting at $597.",
    href: "/services/website-redesign/",
    image: "website-redesign.svg",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile setup, local search optimization, schema markup, and review management. Starting at $67/month.",
    href: "/services/local-seo/",
    image: "local-seo.svg",
  },
  {
    title: "Website Repair",
    desc: "Fix broken pages, forms, layouts, and errors. $65/hour or a full $597 refresh for outdated sites.",
    href: "/services/website-repair/",
    image: "website-repair.svg",
  },
  {
    title: "Website Accessibility",
    desc: "WCAG 2.2 AA compliance audits and fixes. Keyboard navigation, screen reader support, color contrast, and ARIA labels.",
    href: "/services/website-accessibility/",
    image: "website-accessibility.svg",
  },
  {
    title: "Website Speed Optimization",
    desc: "Improve Core Web Vitals (LCP, INP, CLS). Faster load times, better search rankings, more conversions. $65/hour or flat-rate.",
    href: "/services/website-speed-optimization/",
    image: "website-speed.svg",
  },
  {
    title: "Website Care Plans",
    desc: "Ongoing maintenance, updates, backups, and monitoring. Three tiers from $37 to $97 per month. Written agreements included.",
    href: "/services/website-care-plans/",
    image: "website-care.svg",
  },
];

const ServicesPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Services
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Services"
      titleAs="h1"
      title={
        <>
          <strong>Website services</strong> for small businesses in Northwest Illinois.
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What website services does Bradley Matera offer?</strong> Website design, redesign, local SEO, repair, accessibility audits, and ongoing care plans for small businesses in Northwest Illinois and Southern Wisconsin. Starter sites from $447, builds in 14 days, written agreements included. Pick a service below to see pricing, deliverables, and process.
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
        {serviceCards.map((service) => (
          <Link key={service.href} to={service.href} className="service-card">
            <img src={`/service-images/${service.image}`} alt={service.title} className="service-card__image" loading="lazy" />
            <div className="service-card__body">
              <h2 className="service-card__title">{service.title}</h2>
              <p className="service-card__desc">{service.desc}</p>
              <span className="service-card__link">View details →</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Compare packages"
      title="Which package fits your business?"
      description={
        <p>
          Three fixed-price packages for new sites, plus hourly repair and ongoing care. No hidden fees, written agreements included.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Package comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Starter — $447</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Growth — $797</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Premium — $1,497</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Pages</td>
              <td style={{ padding: "0.75rem" }}>1 page</td>
              <td style={{ padding: "0.75rem" }}>Up to 5 pages</td>
              <td style={{ padding: "0.75rem" }}>Up to 10 pages</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Build time</td>
              <td style={{ padding: "0.75rem" }}>7-14 days</td>
              <td style={{ padding: "0.75rem" }}>14-21 days</td>
              <td style={{ padding: "0.75rem" }}>21-28 days</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Mobile responsive</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Contact form</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>SEO setup</td>
              <td style={{ padding: "0.75rem" }}>Basic</td>
              <td style={{ padding: "0.75rem" }}>Local SEO</td>
              <td style={{ padding: "0.75rem" }}>Local SEO + schema</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Google Business Profile</td>
              <td style={{ padding: "0.75rem" }}>No</td>
              <td style={{ padding: "0.75rem" }}>Setup included</td>
              <td style={{ padding: "0.75rem" }}>Setup + optimization</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Schema markup</td>
              <td style={{ padding: "0.75rem" }}>Basic</td>
              <td style={{ padding: "0.75rem" }}>Service + FAQ</td>
              <td style={{ padding: "0.75rem" }}>Service + FAQ + Breadcrumb</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Accessibility</td>
              <td style={{ padding: "0.75rem" }}>Baseline</td>
              <td style={{ padding: "0.75rem" }}>WCAG 2.2 AA</td>
              <td style={{ padding: "0.75rem" }}>WCAG 2.2 AA + audit</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Revisions</td>
              <td style={{ padding: "0.75rem" }}>1 round</td>
              <td style={{ padding: "0.75rem" }}>2 rounds</td>
              <td style={{ padding: "0.75rem" }}>3 rounds</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>30-day warranty</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Post-launch review</td>
              <td style={{ padding: "0.75rem" }}>No</td>
              <td style={{ padding: "0.75rem" }}>No</td>
              <td style={{ padding: "0.75rem" }}>30-day measurement</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem" }}>Monthly care</td>
              <td style={{ padding: "0.75rem" }}>$37/month optional</td>
              <td style={{ padding: "0.75rem" }}>$67/month optional</td>
              <td style={{ padding: "0.75rem" }}>$97/month optional</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/pricing/">See full pricing</Link>
        <Link data-variant="ghost" to="/contact/">Get a free plan</Link>
      </div>
    </Section>

    <Section
      eyebrow="How it works"
      title="From first call to live site"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">1. Free consultation</h3>
          <p className="feature-card__body">
            We talk about your business, what the site needs to do, and what's currently broken. No pressure, no sales pitch.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">2. Design and build</h3>
          <p className="feature-card__body">
            I build a fast, mobile-ready site for your business. You see real progress. Two rounds of revisions included.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">3. Launch and support</h3>
          <p className="feature-card__body">
            I launch your site, set up hosting, and handle updates. 24-hour response times, 30-day warranty, month-to-month care plans.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Common questions" title="Frequently asked questions about website services">
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">How much do website services cost?</h3>
          <p className="feature-card__body">
            Starter sites start at $447, Growth sites at $797, and Premium sites at $1,497. Hourly repair work is $65/hour. Monthly care plans range from $37 to $97. All prices are flat-rate with no hidden fees.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">How long does a website build take?</h3>
          <p className="feature-card__body">
            A Starter site takes 7-14 days, a Growth site takes 14-21 days, and a Premium site takes 21-28 days. Timelines assume you provide content and feedback promptly. Rush builds are available if you have a deadline.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Do I own my website after it is built?</h3>
          <p className="feature-card__body">
            Yes. You own the code, content, domain, and hosting. Everything is registered in your name. If you ever want to move to another developer, I help you migrate at no extra charge. No vendor lock-in.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">What areas do you serve?</h3>
          <p className="feature-card__body">
            I serve Durand, Davis, Rockford, Freeport, Loves Park, Beloit WI, Janesville WI, and surrounding communities in Northwest Illinois and Southern Wisconsin. Remote work is available for clients outside this area.
          </p>
        </Card>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="ghost" to="/website-design-faq/">See all 12 FAQ topics</Link>
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I'll tell you honestly whether I'm the right fit.
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

    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "2rem", textAlign: "center" }}>
      Maintained by <Link to="/about/">Bradley Matera</Link>, web developer in Durand, Illinois. Last reviewed July 2026. Prices current as of 2026.
    </p>
  </Layout>
);

export default ServicesPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Services for Small Businesses",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Website redesign",
        "Local SEO",
        "Website repair",
        "Website accessibility",
        "Website maintenance",
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
          name: "Small Business Web Design — from $447",
          price: "447",
          priceCurrency: "USD",
          description: "Up to 5 pages, mobile-ready, SEO-ready, contact form, hosting setup, schema markup, 2 rounds of revisions, 14-day build time.",
        },
        {
          "@type": "Offer",
          name: "Website Redesign — from $597",
          price: "597",
          priceCurrency: "USD",
          description: "Modern redesign of existing outdated sites. Keep content and domain. Mobile-ready, SEO-ready, schema markup.",
        },
        {
          "@type": "Offer",
          name: "Local SEO — from $67/month",
          price: "67",
          priceCurrency: "USD",
          description: "Google Business Profile setup, local search optimization, schema markup, review management.",
        },
        {
          "@type": "Offer",
          name: "Website Repair — $65/hour or $597 refresh",
          price: "65",
          priceCurrency: "USD",
          description: "Fix broken pages, forms, layouts, and errors. Hourly rate or full site refresh.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
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
