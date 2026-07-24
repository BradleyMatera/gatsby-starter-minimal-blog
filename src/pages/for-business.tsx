import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import { SERVICE_AREA_CITIES, CITY_IMAGES } from "../shared/city-data";

const pathname = "/for-business/";
const pageTitle = "For Business — Website Design & Development | Bradley Matera";
const pageDescription =
  "Websites for small businesses in Northwest Illinois. Live website examples, transparent pricing, and city-specific pages. Free consultation, written agreements included.";

const demoCards = [
  { title: "Restaurant", desc: "Menu, reservations, gallery, and location.", href: "/demos/restaurant/" },
  { title: "Landscaping", desc: "Service packages, project gallery, free quote form.", href: "/demos/landscaping/" },
  { title: "HVAC", desc: "Financing calculator, service areas, booking form.", href: "/demos/hvac/" },
  { title: "Auto Repair", desc: "VIN lookup, service menu, reviews, appointments.", href: "/demos/auto-repair/" },
  { title: "Real Estate", desc: "Property listings, agent profiles, search filters.", href: "/demos/real-estate/" },
  { title: "Salon", desc: "Service menu, stylist bios, gallery, online booking.", href: "/demos/beauty-salon/" },
];

const cityCards = SERVICE_AREA_CITIES.map((c) => ({ ...c, image: CITY_IMAGES[c.href] }));

const ForBusinessPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          For Business
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="For Business"
      titleAs="h1"
      title={
        <>
          <strong>Websites that get you</strong> more customers.
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What does Bradley Matera offer small businesses?</strong> Website design, development, and local SEO for small businesses in Northwest Illinois and Southern Wisconsin. Starter sites from $447, builds in 14 days, written agreements included. See live website examples below, then request a free consultation.
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
        <div className="pkg-card">
          <img src="/package-images/starting-price.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">$447 starting price</h2>
            <p className="pkg-card__desc">No hidden fees. 50% deposit to start, 50% on launch. Month-to-month support starting at $37/month.</p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/fast-builds.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">14-day builds</h2>
            <p className="pkg-card__desc">Starter sites in 14 days. Growth sites in 3-4 weeks. You see real progress, not radio silence.</p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/northwest-illinois-web-development-faq/">Read the FAQ</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/written-agreements.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Written agreements</h2>
            <p className="pkg-card__desc">You own your site, code, content, and domain. Cancel support anytime. I help you migrate if you leave.</p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/contact/">Get started</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section eyebrow="Quick reference" title="Services at a glance">
      <Card variant="outline">
        <table className="data-table">
          <caption>Services at a glance</caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Starting price</th>
              <th scope="col">Timeline</th>
              <th scope="col">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Service">New website</td>
              <td data-label="Starting price">$447</td>
              <td data-label="Timeline">14 days</td>
              <td data-label="Best for">New businesses and solo operators needing a first site</td>
            </tr>
            <tr>
              <td data-label="Service">Redesign</td>
              <td data-label="Starting price">$597</td>
              <td data-label="Timeline">2-3 weeks</td>
              <td data-label="Best for">Existing sites that look dated or perform poorly</td>
            </tr>
            <tr>
              <td data-label="Service">Repair</td>
              <td data-label="Starting price">$65/hour</td>
              <td data-label="Timeline">Varies by issue</td>
              <td data-label="Best for">Broken features, bugs, or small fixes on an existing site</td>
            </tr>
            <tr>
              <td data-label="Service">Local SEO</td>
              <td data-label="Starting price">Included in builds; ongoing from $37/month</td>
              <td data-label="Timeline">Ongoing</td>
              <td data-label="Best for">Businesses wanting to rank in their service area</td>
            </tr>
            <tr>
              <td data-label="Service">Accessibility</td>
              <td data-label="Starting price">$65/hour</td>
              <td data-label="Timeline">Varies by audit scope</td>
              <td data-label="Best for">Sites needing WCAG compliance or audit fixes</td>
            </tr>
            <tr>
              <td data-label="Service">Speed optimization</td>
              <td data-label="Starting price">$65/hour</td>
              <td data-label="Timeline">Varies by site</td>
              <td data-label="Best for">Slow sites that need faster load times and better Core Web Vitals</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Section>

    <Section
      eyebrow="Website examples"
      title="See what your website could look like"
      description={
        <p>
          These are full clickable sample websites — not templates. Click any one to look around.
        </p>
      }
    >
      <div className="grid-three">
        {demoCards.map((demo) => (
          <Card key={demo.title} variant="outline">
            <h3 className="feature-card__title">{demo.title} Website</h3>
            <p className="feature-card__body">{demo.desc}</p>
            <div className="card-actions">
              <Link data-variant="primary" to={demo.href}>See {demo.title.toLowerCase()} sample</Link>
            </div>
          </Card>
        ))}
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/demos/">See all website examples</Link>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>

    <Section
      eyebrow="Find your city"
      title="Web developer in your area"
      description={
        <p>
          I serve Northwest Illinois and Southern Wisconsin. Find your city below for local-specific information.
        </p>
      }
    >
      <div className="grid-three">
        {cityCards.map((city) => (
          <Link key={city.href} to={city.href} className="city-card" style={{ backgroundImage: `url(/city-images/${city.image})` }}>
            <div className="city-card__overlay">
              <h3 className="city-card__title">{city.title}</h3>
              <span className="city-card__link">{city.title} web developer →</span>
            </div>
          </Link>
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
            I launch your site, set up hosting, and handle updates. 24-hour response times, 30-day warranty, month-to-month care plans.
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

export default ForBusinessPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Small Business Website Design & Development",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Web development",
        "Website refresh",
        "Local SEO",
        "Schema markup",
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
          name: "Starter — $447 build + $37/month",
          price: "447",
          priceCurrency: "USD",
          description: "Up to 5 pages, mobile-ready, SEO-ready, contact form, hosting setup, schema markup, 2 rounds of revisions, 14-day build time.",
        },
        {
          "@type": "Offer",
          name: "Growth — $797 build + $67/month",
          price: "797",
          priceCurrency: "USD",
          description: "Up to 10 pages, Google Business Profile setup, advanced schema markup, copywriting assistance, GA4 setup, 3 rounds of revisions.",
        },
        {
          "@type": "Offer",
          name: "Premium — $1,497 build + $97/month",
          price: "1497",
          priceCurrency: "USD",
          description: "Page count defined in the written scope, custom integrations, AI chat assistant, priority support, monthly strategy call.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "For Business", item: pageUrl },
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
