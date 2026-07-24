import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/northstar-hvac/";
const pageTitle = "Example: HVAC Service Area Website | Bradley Matera";
const pageDescription =
  "An illustrative example of an HVAC service area website built with Gatsby. Shows structure, financing calculator, seasonal promotions, and local SEO.";

const ExamplePage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">HVAC example</li>
      </ol>
    </nav>

    <div style={{ marginBottom: "2rem" }}>
      <Card variant="outline" className="disclaimer-box">
        <p className="feature-card__body" style={{ margin: 0 }}>
          <strong>Disclaimer:</strong> This is an illustrative example showing the structure and approach for an HVAC service area website. It is not a real client project.
        </p>
      </Card>
    </div>

    <Section
      eyebrow="Example project"
      titleAs="h1"
      title={<><strong>NorthStar HVAC</strong> (illustrative example)</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What does this example show?</strong> This is an illustrative example of a 7-page Gatsby website for a hypothetical HVAC company. It demonstrates the structure, features, and approach I would use when building a service area website for an HVAC business, including a financing calculator, seasonal promotion pages, and local SEO setup.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/demos/hvac/">View live demo</Link>
          <Link data-variant="ghost" to="/contact/">Get a site like this</Link>
        </>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Industry</h2>
            <p className="pkg-card__desc">HVAC installation and repair</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Location</h2>
            <p className="pkg-card__desc">Beloit, Wisconsin (Rock County)</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Example type: HVAC website</h2>
            <p className="pkg-card__desc">Service area website</p>
          </div>
        </div>
      </div>
    </Section>

    <Section eyebrow="Project specs" title="Project specifications at a glance">
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="NorthStar HVAC project specs table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Aspect</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Industry</td>
              <td style={{ padding: "0.75rem" }}>HVAC installation and repair</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Pages</td>
              <td style={{ padding: "0.75rem" }}>7 pages — Home, Services, Service Areas, Financing, Seasonal Promotions, About, Contact</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Build time</td>
              <td style={{ padding: "0.75rem" }}>Around 4 weeks, ideally launching before peak heating or cooling season</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Stack</td>
              <td style={{ padding: "0.75rem" }}>Gatsby 5 static site, React 18, TypeScript, Netlify hosting</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Key features</td>
              <td style={{ padding: "0.75rem" }}>Financing calculator, seasonal promotion pages, service area pages, emergency contact system, maintenance plans</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>SEO features</td>
              <td style={{ padding: "0.75rem" }}>LocalBusiness schema on every page, service area pages with unique content, Google Business Profile, Bing Places, NAP consistency</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Accessibility</td>
              <td style={{ padding: "0.75rem" }}>WCAG 2.2 AA compliant, keyboard-accessible calculator with ARIA live regions, proper form labels and error handling</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section eyebrow="The problem" title="Common HVAC website problems">
      <Card variant="outline">
        <p className="feature-card__body">
          Many established HVAC businesses operate for years without a website, relying on phone book ads, word of mouth, and repeat customers. As fewer people use the phone book, these businesses lose jobs to competitors who appear in Google searches for terms like "HVAC repair near me" and "furnace installation [city]."
        </p>
        <p className="feature-card__body">
          A common starting point is an unclaimed or outdated Google Business Profile, no online lead capture, and no way for customers to schedule service outside business hours. Owners are often skeptical that a website will help, until they see competitors dominating local search results.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Common starting point" title="What a typical HVAC business looks like before getting a website">
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Web presence</h3>
            <p className="pkg-card__desc">No website. Unclaimed or outdated Google Business Profile. Not indexed for any service keyword.</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Lead sources</h3>
            <p className="pkg-card__desc">Phone book ads, word of mouth, repeat customers. No online lead capture. No way to schedule service outside business hours.</p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Service area</h3>
            <p className="pkg-card__desc">Serving multiple cities and counties, but with no way to communicate this online or capture searches for each location.</p>
          </div>
        </div>
      </div>
    </Section>

    <Section eyebrow="Typical constraints" title="What an HVAC website project usually involves">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> Varies by package tier; a service area site of this scope typically falls in the mid-range.</li>
          <li><strong>Timeline:</strong> Around 4 weeks, ideally launching before the peak heating or cooling season.</li>
          <li><strong>Content:</strong> The business owner provides service descriptions and pricing; I write original copy for service area pages.</li>
          <li><strong>Branding:</strong> Match the existing logo and color scheme with a clean, professional layout.</li>
          <li><strong>Photos:</strong> The business provides photos of installations and equipment; I edit and compress them for the web.</li>
          <li><strong>Must-haves:</strong> Financing calculator, seasonal promotions, service area pages, emergency contact prominence</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What this example includes">
      <Card variant="outline">
        <p className="feature-card__body">
          A 7-page Gatsby static site with service area pages, a financing calculator, seasonal promotion pages, and an emergency contact system. The site is designed to capture both winter heating and summer cooling demand.
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with emergency service CTA, service highlights, financing calculator, service area, reviews</li>
          <li><strong>Services page:</strong> Furnace installation, AC installation, repair, maintenance plans with pricing ranges</li>
          <li><strong>Service areas:</strong> Dedicated pages for each city served with local context and unique FAQs</li>
          <li><strong>Financing calculator:</strong> Interactive monthly payment calculator for furnace and AC installations based on system cost and term length</li>
          <li><strong>Seasonal promotions:</strong> Winter heating check-up and summer AC tune-up pages with limited-time offers</li>
          <li><strong>About:</strong> Company history, certifications, and service area map</li>
          <li><strong>Contact:</strong> Service request form with emergency priority option, phone click-to-call, and business hours</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Performance</h3>
            <p className="pkg-card__desc">
              Target LCP under 2 seconds. CLS near 0. INP under 200ms. Financing calculator uses minimal JavaScript. All images served in WebP with proper dimensions.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Accessibility</h3>
            <p className="pkg-card__desc">
              WCAG 2.2 AA compliant. Calculator is keyboard-accessible with ARIA live regions for results. Form has proper labels, error handling, and emergency priority indicator.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Local SEO</h3>
            <p className="pkg-card__desc">
              LocalBusiness schema on every page. Service area pages with unique content for each city. Google Business Profile claimed, completed, and linked. Bing Places set up. NAP consistent across all citations.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section eyebrow="Q&A" title="Common questions about HVAC websites">
      <div className="pkg-card">
        <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
        <div className="pkg-card__body">
          <h3 className="pkg-card__title">Why does an HVAC business need service area pages?</h3>
          <p className="pkg-card__desc">
            Customers search for HVAC services by city, not by company name. Dedicated service area pages with unique, locally relevant content help the site rank for searches like "furnace repair Beloit WI" and "AC installation Janesville."
          </p>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">What is a financing calculator and why include one?</h3>
            <p className="pkg-card__desc">
              HVAC installations are a significant expense. A financing calculator lets visitors estimate monthly payments based on system cost and term length, which helps them move from browsing to requesting a quote.
            </p>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Why seasonal promotion pages?</h3>
            <p className="pkg-card__desc">
              HVAC demand is seasonal. Winter heating check-up and summer AC tune-up pages with limited-time offers capture demand at the right moment and give the business a reason to promote the site throughout the year.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Want a site like this?"
      title="Get a free website plan"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I will tell you honestly what a website can do for your service business.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <Link data-variant="ghost" to="/services/local-seo/">Local SEO services</Link>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>
  </Layout>
);

export default ExamplePage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      url: pageUrl,
      author: { "@type": "Person", name: "Bradley Matera", url: site.siteUrl },
      publisher: { "@type": "Person", name: "Bradley Matera", url: site.siteUrl },
      datePublished: "2025-03-01",
      dateModified: "2025-03-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.siteUrl}/work/` },
        { "@type": "ListItem", position: 3, name: "HVAC example", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo title={pageTitle} description={pageDescription} pathname={pathname} />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
