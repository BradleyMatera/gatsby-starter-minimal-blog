import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";
import { SERVICE_AREA_CITIES, CITY_IMAGES } from "../../shared/city-data";

const pathname = "/services/website-redesign/";
const pageTitle = "Website Redesign for Small Businesses | Bradley Matera";
const pageDescription =
  "Update your outdated website with a modern, fast, mobile-ready design. Keep your content and domain. Starting at $597, 3-4 week builds, written agreements included.";

const deliverables = [
  "Modern, mobile-ready responsive design that replaces your outdated layout",
  "Content migration from your existing site — you keep your text, images, and domain",
  "Improved page speed and Core Web Vitals scores",
  "Updated SEO structure with proper headings, meta tags, and schema markup",
  "Redesigned contact form with spam protection and email delivery",
  "Google Analytics 4 setup and Google Search Console verification",
  "Redirect mapping from old URLs to new URLs to preserve search rankings",
  "Two rounds of revisions during the redesign",
  "30-day post-launch warranty covering bugs and fixes",
];

const serviceAreaCities = SERVICE_AREA_CITIES;

const faqs = [
  {
    q: "How much does a website redesign cost?",
    a: "Redesigns start at $597 for a full site refresh. You pay 50% upfront to start and 50% on launch. The final price depends on the number of pages and complexity of the existing site.",
  },
  {
    q: "How long does a website redesign take?",
    a: "Most redesigns take 3-4 weeks from the time I receive access to your current site and the deposit. Smaller sites can be done faster. You see real progress throughout the build.",
  },
  {
    q: "Will I lose my search rankings during the redesign?",
    a: "No. I map every old URL to its new equivalent with 301 redirects, preserve your existing content, and maintain or improve your SEO structure. Your search rankings should hold or improve.",
  },
  {
    q: "Can I keep my existing domain and content?",
    a: "Yes. You keep your domain, and I migrate your existing content into the new design. If your content needs updating, I can help with copywriting as part of the project.",
  },
];

const WebsiteRedesignPage = () => (
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
          Website Redesign
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Redesign"
      titleAs="h1"
      title={
        <>
          <strong>Website Redesign</strong> for Small Businesses
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What is a website redesign?</strong> A full refresh of your existing outdated website with a modern, fast, mobile-ready design. You keep your content, domain, and search rankings. Starting at $597, builds in 3-4 weeks, written agreements included.
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
          <img src="/package-images/redesign-price.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Starting at $597</h2>
            <p className="pkg-card__desc">
              50% deposit to start, 50% on launch. Price depends on page count and site complexity.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/pricing/">See full pricing</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/redesign-timeline.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">3-4 week builds</h2>
            <p className="pkg-card__desc">
              Full redesigns completed in 3-4 weeks. You see real progress, not radio silence.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/contact/">Start your redesign</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/redesign-rankings.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Keep your rankings</h2>
            <p className="pkg-card__desc">
              301 redirects, preserved content, and improved SEO structure protect your search rankings.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/services/local-seo/">See local SEO services</Link>
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
          Every website redesign includes the following. No upsells, no surprise add-ons.
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
      title="From audit to launch"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">1. Audit and plan</h3>
          <p className="feature-card__body">
            I review your current site, identify what's broken or outdated, and plan the redesign. You get a clear scope and timeline.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">2. Redesign and migrate</h3>
          <p className="feature-card__body">
            I build the new design and migrate your existing content. You see real progress. Two rounds of revisions included.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">3. Launch with redirects</h3>
          <p className="feature-card__body">
            I set up 301 redirects, launch the new site, and verify your search rankings hold. 30-day warranty, month-to-month care plans.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Timeline"
      title="What to expect during the redesign"
    >
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Week 1:</strong> Site audit, content inventory, kickoff call, deposit collected.</li>
          <li><strong>Week 2:</strong> New design mockups sent for review, revisions applied.</li>
          <li><strong>Week 3:</strong> Content migrated, pages built, forms and analytics configured.</li>
          <li><strong>Week 4:</strong> Redirect mapping, final QA, site goes live, final payment collected.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Service area"
      title="Redesign services in your city"
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
          Three redesign options from a quick refresh to a full premium rebuild. No hidden fees, written agreements included.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Website redesign comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Site Refresh — $597</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Full Redesign — $797</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Premium Redesign — $1,497</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Pages</td>
              <td style={{ padding: "0.75rem" }}>Up to 3 pages</td>
              <td style={{ padding: "0.75rem" }}>Up to 5 pages</td>
              <td style={{ padding: "0.75rem" }}>Up to 10 pages</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Design changes</td>
              <td style={{ padding: "0.75rem" }}>Layout + styling refresh</td>
              <td style={{ padding: "0.75rem" }}>Full visual redesign</td>
              <td style={{ padding: "0.75rem" }}>Full redesign + custom features</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Content migration</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes + copywriting assistance</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Mobile responsive</td>
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
              <td style={{ padding: "0.75rem" }}>Build time</td>
              <td style={{ padding: "0.75rem" }}>7-14 days</td>
              <td style={{ padding: "0.75rem" }}>3-4 weeks</td>
              <td style={{ padding: "0.75rem" }}>4-6 weeks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about redesigns"
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

export default WebsiteRedesignPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Redesign",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website redesign",
        "Website refresh",
        "Content migration",
        "SEO migration",
        "Responsive design",
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
          name: "Website Redesign — from $597",
          price: "597",
          priceCurrency: "USD",
          description: "Full site redesign with content migration, 301 redirects, mobile-ready design, SEO structure, schema markup, 2 rounds of revisions, 3-4 week build time.",
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
        { "@type": "ListItem", position: 3, name: "Website Redesign", item: pageUrl },
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
