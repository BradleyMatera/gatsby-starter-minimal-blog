import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/local-seo/";
const pageTitle = "Local SEO Services for Northwest Illinois Businesses | Bradley Matera";
const pageDescription =
  "Local SEO services for Northwest Illinois businesses. Google Business Profile setup, local search optimization, schema markup, and review management. From $67/month.";

const deliverables = [
  "Google Business Profile setup, optimization, and verification",
  "Local keyword research targeting your city and service area",
  "On-page SEO with proper headings, meta tags, and title optimization",
  "Local business schema markup (NAP, hours, services, area served)",
  "Citation building across local directories and review sites",
  "Review management setup with automated follow-up emails",
  "Google Search Console and Google Analytics 4 configuration",
  "Monthly ranking reports for your target local keywords",
  "Competitor analysis for the top 3 local search results in your area",
];

const serviceAreaCities = [
  { title: "Durand & Davis", href: "/web-developer-durand-davis-illinois/" },
  { title: "Rockford", href: "/web-developer-rockford-illinois/" },
  { title: "Freeport", href: "/web-developer-freeport-illinois/" },
  { title: "Pecatonica", href: "/web-developer-pecatonica-illinois/" },
  { title: "Winnebago", href: "/web-developer-winnebago-illinois/" },
  { title: "Loves Park", href: "/web-developer-loves-park-illinois/" },
  { title: "Byron", href: "/web-developer-byron-illinois/" },
  { title: "Rockton", href: "/web-developer-rockton-illinois/" },
  { title: "Roscoe", href: "/web-developer-roscoe-illinois/" },
  { title: "South Beloit", href: "/web-developer-south-beloit-illinois/" },
  { title: "Beloit, WI", href: "/web-developer-beloit-wisconsin/" },
  { title: "Janesville, WI", href: "/web-developer-janesville-wisconsin/" },
];

const faqs = [
  {
    q: "How much does local SEO cost?",
    a: "Local SEO services start at $67/month with written agreements included. This includes Google Business Profile management, local schema markup, and monthly ranking reports. Higher tiers include more keywords and competitor tracking.",
  },
  {
    q: "How long does it take to see local SEO results?",
    a: "Most businesses see movement in local search rankings within 2-3 months. Google Business Profile optimization can show results faster, sometimes within weeks. Competitive markets take longer.",
  },
  {
    q: "Do I need a new website for local SEO to work?",
    a: "Not necessarily. I can optimize your existing website with local schema markup, better headings, and improved meta tags. If your site is outdated or slow, a redesign may help, but it's not required to start.",
  },
  {
    q: "What is a Google Business Profile and why does it matter?",
    a: "Google Business Profile is the free listing that appears in Google Maps and local search results. It shows your business name, address, phone, hours, photos, and reviews. Optimizing it is the single most impactful thing you can do for local search.",
  },
];

const LocalSeoPage = () => (
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
          Local SEO
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local SEO"
      titleAs="h1"
      title={
        <>
          <strong>Local SEO Services</strong> for Northwest Illinois Businesses
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What are local SEO services?</strong> Optimization of your Google Business Profile, local search rankings, and website schema markup so customers in your area find you when they search. Starting at $67/month, written agreements included, monthly reporting included.
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
          <h2 className="feature-card__title">Starting at $67/month</h2>
          <p className="feature-card__body">
            Month-to-month, written agreements included. Cancel anytime. Higher tiers include more keywords and competitor tracking.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Google Business Profile</h2>
          <p className="feature-card__body">
            Setup, optimization, and verification of your Google Business Profile — the most impactful local SEO action.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Get started</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Monthly reports</h2>
          <p className="feature-card__body">
            You get ranking reports for your target keywords every month. No black-box reporting — you see the data.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Request a sample report</Link>
          </div>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="What's included"
      title="Deliverables"
      description={
        <p>
          Every local SEO engagement includes the following. No upsells, no surprise add-ons.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          {deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="How it works"
      title="From audit to ranking"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">1. Audit and research</h3>
          <p className="feature-card__body">
            I audit your current local search presence, research your target keywords, and analyze the top 3 competitors in your area.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">2. Optimize and submit</h3>
          <p className="feature-card__body">
            I optimize your Google Business Profile, add local schema markup to your site, and build citations across local directories.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">3. Track and adjust</h3>
          <p className="feature-card__body">
            Monthly ranking reports show what's working. I adjust the strategy based on real data, not guesses.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Service area"
      title="Local SEO in your city"
      description={
        <p>
          I serve Northwest Illinois and Southern Wisconsin. Find your city below for local-specific information.
        </p>
      }
    >
      <div className="grid-three">
        {serviceAreaCities.map((city) => (
          <Card key={city.href} variant="outline">
            <h3 className="feature-card__title">{city.title}</h3>
            <div className="card-actions">
              <Link data-variant="ghost" to={city.href}>{city.title} web developer</Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which option fits your business?"
      description={
        <p>
          Three local SEO tiers with clear deliverables. Month-to-month, written agreements included, cancel anytime.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Local SEO comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Basic — $67/mo</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Growth — $97/mo</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Premium — custom</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Keywords tracked</td>
              <td style={{ padding: "0.75rem" }}>Up to 10</td>
              <td style={{ padding: "0.75rem" }}>Up to 25</td>
              <td style={{ padding: "0.75rem" }}>Unlimited</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>GBP management</td>
              <td style={{ padding: "0.75rem" }}>Setup + optimization</td>
              <td style={{ padding: "0.75rem" }}>Setup + ongoing optimization</td>
              <td style={{ padding: "0.75rem" }}>Full management + posts</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Schema markup</td>
              <td style={{ padding: "0.75rem" }}>Local business schema</td>
              <td style={{ padding: "0.75rem" }}>Local business + service schema</td>
              <td style={{ padding: "0.75rem" }}>Full schema suite</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Citation building</td>
              <td style={{ padding: "0.75rem" }}>Top 5 directories</td>
              <td style={{ padding: "0.75rem" }}>Top 15 directories</td>
              <td style={{ padding: "0.75rem" }}>Top 30+ directories</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Competitor analysis</td>
              <td style={{ padding: "0.75rem" }}>No</td>
              <td style={{ padding: "0.75rem" }}>Top 3 competitors</td>
              <td style={{ padding: "0.75rem" }}>Top 5 competitors + ongoing</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Monthly reports</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes + strategy call</td>
              <td style={{ padding: "0.75rem" }}>Yes + monthly strategy call</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Review management</td>
              <td style={{ padding: "0.75rem" }}>Setup only</td>
              <td style={{ padding: "0.75rem" }}>Setup + automated follow-up</td>
              <td style={{ padding: "0.75rem" }}>Full review management</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about local SEO"
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

export default LocalSeoPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Local SEO Services",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Local SEO",
        "Google Business Profile optimization",
        "Local search optimization",
        "Schema markup",
        "Citation building",
        "Review management",
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
          name: "Local SEO — $67/month",
          price: "67",
          priceCurrency: "USD",
          description: "Google Business Profile management, local schema markup, monthly ranking reports, citation building, review management setup.",
        },
        {
          "@type": "Offer",
          name: "Local SEO Growth — $97/month",
          price: "97",
          priceCurrency: "USD",
          description: "Everything in Essential plus competitor tracking, additional keywords, and monthly strategy call.",
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
        { "@type": "ListItem", position: 3, name: "Local SEO", item: pageUrl },
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
