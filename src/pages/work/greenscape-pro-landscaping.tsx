import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/greenscape-pro-landscaping/";
const pageTitle = "Example: Landscaping Website for Small Businesses | Bradley Matera";
const pageDescription =
  "An illustrative example of a 5-page Gatsby website for a landscaping company. Shows the structure, features, and technical approach for a similar business.";

const CaseStudyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">Landscaping example</li>
      </ol>
    </nav>

    <div className="surface-card surface-card--outline" style={{ marginTop: "1.5rem", marginBottom: "1.5rem", borderColor: "var(--color-accent)" }}>
      <p className="feature-card__body" style={{ margin: 0 }}>
        <strong>Disclaimer:</strong> This is an illustrative example showing the structure and approach for a landscaping business website. It is not a real client project.
      </p>
    </div>

    <Section
      eyebrow="Example project"
      titleAs="h1"
      title={<><strong>GreenScape Pro</strong> Landscaping (illustrative example)</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What does this example show?</strong> This is an illustrative example of a 5-page Gatsby website for a landscaping company. It is not a real client project. The example demonstrates the structure, features, and technical approach Bradley would use when building a website for a similar landscaping or lawn care business — including a quote form, project gallery, service pages, and local SEO foundations.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/demos/landscaping/">View live demo</Link>
          <Link data-variant="ghost" to="/contact/">Get a site like this</Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Industry</h2>
          <p className="feature-card__body">Landscaping and lawn care services</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Location</h2>
          <p className="feature-card__body">Rockford, Illinois (Winnebago County)</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Example type</h2>
          <p className="feature-card__body">Landscaping website</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="The problem" title="The common problem for landscaping businesses">
      <Card variant="outline">
        <p className="feature-card__body">
          Many landscaping and lawn care businesses operate for years with no website, relying on a Facebook page, word of mouth, and yard signs. They lose jobs to competitors who show up in Google searches for terms like "landscaping Rockford IL." When potential customers search for the business name, they find a Facebook page but no website, no service list, and no way to request a quote without calling during business hours.
        </p>
        <p className="feature-card__body">
          Some have tried DIY website builders but abandoned them because the result looked unprofessional or they could not figure out how to add a working contact form. What they need is something simple, fast, and professional that they can point people to.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Baseline" title="Common starting point">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Web presence</h3>
          <p className="feature-card__body">Facebook page only. No website. Not indexed by Google for any service keyword.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Lead sources</h3>
          <p className="feature-card__body">Phone calls and word of mouth. No online quote requests. No way to capture leads outside business hours.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Google Business Profile</h3>
          <p className="feature-card__body">Claimed but incomplete. No photos, no service list, no website link.</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Constraints" title="Typical constraints">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> Aligned to a Local Growth package tier</li>
          <li><strong>Timeline:</strong> Approximately 3 weeks from start to launch</li>
          <li><strong>Content:</strong> The business owner provides service descriptions and photos from past jobs</li>
          <li><strong>Branding:</strong> Often no logo. A simple text-based logo and color scheme using green and earth tones can be designed as part of the build</li>
          <li><strong>Photos:</strong> The owner typically has project photos from a phone. These are edited and compressed for web</li>
          <li><strong>Domain:</strong> Often not yet registered. Domain registration and email forwarding can be set up as part of the project</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What the build includes">
      <Card variant="outline">
        <p className="feature-card__body">
          A 5-page Gatsby static site with the following pages: Home, Services, Project Gallery, About, and Contact. The site includes a free quote form, before-and-after project photos, service package pricing, and a weather widget that recommends seasonal services (snow removal in winter, lawn care in spring).
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with service area, proof strip, service packages, project highlights, and a quote form CTA</li>
          <li><strong>Services page:</strong> Detailed service descriptions for lawn care, hardscaping, snow removal, and seasonal cleanup with pricing</li>
          <li><strong>Gallery:</strong> Before-and-after photos of projects with location and project description</li>
          <li><strong>About:</strong> The owner's story, years in business, service area map, and Google review badges</li>
          <li><strong>Contact:</strong> Free quote form with service type, property size, and preferred contact method</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Performance</h3>
          <p className="feature-card__body">
            Target LCP under 1.5 seconds on a throttled 4G connection, with minimal CLS and low INP. All images served in WebP with proper width and height attributes. No render-blocking JavaScript.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Accessibility</h3>
          <p className="feature-card__body">
            Built to WCAG 2.2 AA standards. Keyboard-navigable, proper heading order, alt text on all project photos, form labels and error messages, 4.5:1 contrast ratio on all text.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Local SEO</h3>
          <p className="feature-card__body">
            LocalBusiness schema markup, Google Business Profile completed with photos and service list, NAP consistency across the site, service area pages for the target region.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Questions about this example" title="Common questions about a landscaping website build">
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">How much would a website like this cost?</h3>
          <p className="feature-card__body">
            A 5-page landscaping website like this example falls under the Local Growth package. This includes 5 pages, a quote form, project gallery, Google Business Profile setup, and local SEO foundations. See the pricing page for current rates.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">How long does the build take?</h3>
          <p className="feature-card__body">
            A build like this typically takes about 3 weeks from kickoff to launch. The business owner provides project photos and service descriptions in week 1. The site is designed and built in weeks 2-3, with one revision round before launch.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">How are quote requests handled?</h3>
          <p className="feature-card__body">
            Quote requests are captured through a contact form with submissions logged on Netlify. Each form submission includes a timestamp, service type, and contact info so the business owner can follow up with leads.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Can I see a live demo?</h3>
          <p className="feature-card__body">
            Yes. The demo version of this landscaping site is available at the landscaping demo page. It shows the same layout, quote form, and gallery structure described in this example.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Want a site like this?"
      title="Get a free website plan"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I will tell you honestly what a website can do for your business.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
        <Link data-variant="ghost" to="/services/small-business-web-design/">Web design services</Link>
      </div>
    </Section>
  </Layout>
);

export default CaseStudyPage;

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
      datePublished: "2025-06-01",
      dateModified: "2025-06-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.siteUrl}/work/` },
        { "@type": "ListItem", position: 3, name: "Landscaping example", item: pageUrl },
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
