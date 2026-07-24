import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/";
const pageTitle = "Website Services for Small Businesses in Northwest Illinois | Bradley Matera";
const pageDescription =
  "Website design, redesign, local SEO, repair, accessibility, and care plans for small businesses in Northwest Illinois. Starter sites from $447, builds in 14 days, no contracts.";

const serviceCards = [
  {
    title: "Small Business Web Design",
    desc: "New websites built from scratch. Up to 5 pages, mobile-ready, SEO-ready, contact form. Starting at $447.",
    href: "/services/small-business-web-design/",
  },
  {
    title: "Website Redesign",
    desc: "Update your outdated site with a modern, fast, mobile-ready design. Keep your content and domain. Starting at $597.",
    href: "/services/website-redesign/",
  },
  {
    title: "Local SEO",
    desc: "Google Business Profile setup, local search optimization, schema markup, and review management. Starting at $67/month.",
    href: "/services/local-seo/",
  },
  {
    title: "Website Repair",
    desc: "Fix broken pages, forms, layouts, and errors. $65/hour or a full $597 refresh for outdated sites.",
    href: "/services/website-repair/",
  },
  {
    title: "Website Accessibility",
    desc: "WCAG 2.2 AA compliance audits and fixes. Keyboard navigation, screen reader support, color contrast, and ARIA labels.",
    href: "/services/website-accessibility/",
  },
  {
    title: "Website Care Plans",
    desc: "Ongoing maintenance, updates, backups, and monitoring. Three tiers from $37 to $97 per month. No contracts.",
    href: "/services/website-care-plans/",
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
            <strong>What website services does Bradley Matera offer?</strong> Website design, redesign, local SEO, repair, accessibility audits, and ongoing care plans for small businesses in Northwest Illinois and Southern Wisconsin. Starter sites from $447, builds in 14 days, no contracts. Pick a service below to see pricing, deliverables, and process.
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
          <Card key={service.href} variant="outline">
            <h2 className="feature-card__title">{service.title}</h2>
            <p className="feature-card__body">{service.desc}</p>
            <div className="card-actions">
              <Link data-variant="primary" to={service.href}>
                Learn more
              </Link>
            </div>
          </Card>
        ))}
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
            I launch your site, set up hosting, and handle updates. 24-hour response times, 30-day warranty, no contract trap.
          </p>
        </Card>
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
