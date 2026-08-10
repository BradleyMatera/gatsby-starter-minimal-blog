import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";
import { SERVICE_AREA_CITIES, CITY_IMAGES } from "../../shared/city-data";

const pathname = "/services/small-business-web-design/";
const pageTitle = "Small Business Website Packages in Northwest Illinois";
const pageDescription =
  "Custom small business websites built from scratch. Up to 5 pages, mobile-ready, SEO-ready, contact form. Starting at $447 with 14-day builds.";

const deliverables = [
  "Up to 5 custom pages (Home, About, Services, Contact, plus one more)",
  "Mobile-ready responsive design that works on all screen sizes",
  "SEO-ready structure with proper headings, meta tags, and schema markup",
  "Contact form with spam protection and email delivery",
  "Google Analytics 4 setup and Google Search Console verification",
  "Hosting setup and domain configuration",
  "SSL certificate and HTTPS enforcement",
  "Two rounds of revisions during the build",
  "30-day post-launch warranty covering bugs and fixes",
];

const serviceAreaCities = SERVICE_AREA_CITIES;

const faqs = [
  {
    q: "How much does a small business website cost?",
    a: "Starter sites begin at $447 for up to 5 pages. You pay 50% upfront to start and 50% on launch. There are no hidden fees. Optional ongoing support starts at $37/month.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Starter sites are built in 14 days from the time I receive your content and deposit. Larger sites with more pages take 3-4 weeks. You see real progress throughout the build.",
  },
  {
    q: "Do I own my website after it's built?",
    a: "Yes. You own your site, code, content, and domain. No long-term commitment. Website care plans are month-to-month. Every website project still uses a written service agreement and scope of work. If you decide to leave, I help you migrate everything to a new host or provider.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your business name, a short description of what you do, any existing logo or brand colors, photos if you have them, and the text you want on each page. I can help with copywriting if needed.",
  },
];

const SmallBusinessWebDesignPage = () => (
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
          Small Business Web Design
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Web Design"
      titleAs="h1"
      title={
        <>
          <strong>Small Business Web Design</strong> in Northwest Illinois
        </>
      }
      description={
        <>

          <p className="direct-answer">
            <strong>What is small business web design?</strong> A custom website built from scratch for your small business — up to 5 pages, mobile-ready, SEO-ready, with a contact form and schema markup. Built in 14 days, starting at $447. Written agreements included, you own everything.
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
          <img src="/package-images/web-design-price.svg" alt="Starting at $447 illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Starting at $447</h2>
            <p className="pkg-card__desc">
              50% deposit to start, 50% on launch. No hidden fees. Optional support from $37/month.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/web-design-14day.svg" alt="14-day builds illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">14-day builds</h2>
            <p className="pkg-card__desc">
              Starter sites delivered in 14 days. You see real progress, not radio silence.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/contact/">Start your build</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/web-design-own.svg" alt="You own everything illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">You own everything</h2>
            <p className="pkg-card__desc">
              Site, code, content, and domain are yours. Written agreements included. Cancel support anytime.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/northwest-illinois-web-development-faq/">Read the FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="What's included"
      title="Deliverables"
      description={
        <p>
          Every small business website I build includes the following. No upsells, no surprise add-ons.
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
      title="From first call to live site"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/step-1-diagnose.svg" alt="1. Free consultation illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">1. Free consultation</h3>
            <p className="pkg-card__desc">
              We talk about your business, what the site needs to do, and your goals. No pressure, no sales pitch.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/step-2-build.svg" alt="2. Design and build illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">2. Design and build</h3>
            <p className="pkg-card__desc">
              I build a fast, mobile-ready site for your business. You see real progress. Two rounds of revisions included.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/step-3-launch.svg" alt="3. Launch and support illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">3. Launch and support</h3>
            <p className="pkg-card__desc">
              I launch your site, set up hosting, and handle updates. 24-hour response times, 30-day warranty, month-to-month care plans.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Timeline"
      title="What to expect during the build"
    >
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Day 1:</strong> Kickoff call, content review, deposit collected.</li>
          <li><strong>Days 2-5:</strong> Homepage and core page designs sent for review.</li>
          <li><strong>Days 6-10:</strong> Remaining pages built, contact form and analytics configured.</li>
          <li><strong>Days 11-13:</strong> Revisions applied, final review, pre-launch QA.</li>
          <li><strong>Day 14:</strong> Site goes live, hosting and domain configured, final payment collected.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Service area"
      title="Web design in your city"
      description={
        <p>
          I serve Northwest Illinois and Southern Wisconsin. Find your city below for local-specific information.
        </p>
      }
    >
      <div className="grid-three">
        {serviceAreaCities.map((city) => (
          <Link key={city.href} to={city.href} className="city-card" style={{ backgroundImage: `url(/city-images/${CITY_IMAGES[city.href]})` }}>
            <div className="city-card__overlay">
              <h3 className="city-card__title">{city.title}</h3>
              <span className="city-card__link">{city.title} web developer →</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which option fits your business?"
      description={
        <p>
          Three fixed-price packages for new websites. No hidden fees, written agreements included, you own everything.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Small business web design comparison table">
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
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about web design"
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

export default SmallBusinessWebDesignPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Small Business Web Design",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Web development",
        "Responsive design",
        "SEO-ready websites",
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
        { "@type": "ListItem", position: 3, name: "Small Business Web Design", item: pageUrl },
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
