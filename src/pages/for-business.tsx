import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/for-business/";
const pageTitle = "For Business — Website Design & Development | Bradley Matera";
const pageDescription =
  "Websites for small businesses in Northwest Illinois. Live website examples, transparent pricing, and city-specific pages. Free consultation, no contracts.";

const demoCards = [
  { title: "Restaurant", desc: "Menu, reservations, gallery, and location.", href: "/demos/restaurant/" },
  { title: "Landscaping", desc: "Service packages, project gallery, free quote form.", href: "/demos/landscaping/" },
  { title: "HVAC", desc: "Financing calculator, service areas, booking form.", href: "/demos/hvac/" },
  { title: "Auto Repair", desc: "VIN lookup, service menu, reviews, appointments.", href: "/demos/auto-repair/" },
  { title: "Real Estate", desc: "Property listings, agent profiles, search filters.", href: "/demos/real-estate/" },
  { title: "Salon", desc: "Service menu, stylist bios, gallery, online booking.", href: "/demos/beauty-salon/" },
];

const cityCards = [
  { title: "Durand & Davis", href: "/web-developer-durand-davis-illinois/" },
  { title: "Rockford", href: "/web-developer-rockford-illinois/" },
  { title: "Freeport", href: "/web-developer-freeport-illinois/" },
  { title: "Pecatonica", href: "/web-developer-pecatonica-illinois/" },
  { title: "Winnebago", href: "/web-developer-winnebago-illinois/" },
  { title: "Loves Park", href: "/web-developer-loves-park-illinois/" },
  { title: "Machesney Park", href: "/web-developer-machesney-park-illinois/" },
  { title: "Byron", href: "/web-developer-byron-illinois/" },
  { title: "Rockton", href: "/web-developer-rockton-illinois/" },
  { title: "Roscoe", href: "/web-developer-roscoe-illinois/" },
  { title: "South Beloit", href: "/web-developer-south-beloit-illinois/" },
  { title: "Beloit, WI", href: "/web-developer-beloit-wisconsin/" },
  { title: "Janesville, WI", href: "/web-developer-janesville-wisconsin/" },
];

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
            <strong>What does Bradley Matera offer small businesses?</strong> Website design, development, and local SEO for small businesses in Northwest Illinois and Southern Wisconsin. Starter sites from $447, builds in 14 days, no contracts. See live website examples below, then request a free consultation.
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
          <h2 className="feature-card__title">$447 starting price</h2>
          <p className="feature-card__body">
            No hidden fees. 50% deposit to start, 50% on launch. Month-to-month support starting at $37/month.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">14-day builds</h2>
          <p className="feature-card__body">
            Starter sites in 14 days. Growth sites in 3-4 weeks. You see real progress, not radio silence.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/northwest-illinois-web-development-faq/">Read the FAQ</Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No contracts</h2>
          <p className="feature-card__body">
            You own your site, code, content, and domain. Cancel support anytime. I help you migrate if you leave.
          </p>
          <div className="card-actions">
            <Link data-variant="ghost" to="/contact/">Get started</Link>
          </div>
        </Card>
      </div>
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
          description: "Unlimited pages, custom integrations, AI chat assistant, priority support, monthly strategy call.",
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
