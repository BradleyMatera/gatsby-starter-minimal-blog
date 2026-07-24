import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/greenscape-pro-landscaping/";
const pageTitle = "Case Study: GreenScape Pro Landscaping Website | Bradley Matera";
const pageDescription =
  "How Bradley Matera built a fast 5-page Gatsby website for a Rockford, IL landscaping company. From no web presence to 40+ online quote requests in 3 months. LCP 1.2s, WCAG 2.2 AA, local SEO foundations.";

const CaseStudyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">GreenScape Pro</li>
      </ol>
    </nav>

    <Section
      eyebrow="Case study"
      titleAs="h1"
      title={<><strong>GreenScape Pro</strong> Landscaping</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What did Bradley build for GreenScape Pro?</strong> A 5-page Gatsby website for a landscaping company in Rockford, Illinois. The owner had no website, only a Facebook page. After launch, the site loaded in 1.2 seconds, passed WCAG 2.2 AA accessibility checks, and generated 40+ online quote requests in the first 3 months.
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
          <h2 className="feature-card__title">Launch date</h2>
          <p className="feature-card__body">March 2025</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="The problem" title="Where GreenScape Pro started">
      <Card variant="outline">
        <p className="feature-card__body">
          GreenScape Pro had been running for 8 years with no website. The owner, Mike, relied on a Facebook page, word of mouth, and yard signs. He was losing jobs to competitors who showed up in Google searches for "landscaping Rockford IL." When potential customers searched for his business name, they found his Facebook page but no website, no service list, and no way to request a quote without calling during business hours.
        </p>
        <p className="feature-card__body">
          Mike had tried a DIY website builder but abandoned it after 6 months because it looked unprofessional and he could not figure out how to add a contact form that worked. He wanted something simple, fast, and professional that he could point people to.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Baseline" title="What we measured before starting">
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

    <Section eyebrow="Constraints" title="What we had to work with">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> $797 (Local Growth package)</li>
          <li><strong>Timeline:</strong> 3 weeks from start to launch</li>
          <li><strong>Content:</strong> Mike provided service descriptions and photos from past jobs</li>
          <li><strong>Branding:</strong> No logo. I designed a simple text-based logo and color scheme using green and earth tones</li>
          <li><strong>Photos:</strong> Mike had 20+ project photos from his phone. I edited and compressed them for web</li>
          <li><strong>Domain:</strong> Not registered. I helped Mike register greenscapepro.com and set up email forwarding</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What Bradley built">
      <Card variant="outline">
        <p className="feature-card__body">
          I built a 5-page Gatsby static site with the following pages: Home, Services, Project Gallery, About, and Contact. The site includes a free quote form, before-and-after project photos, service package pricing, and a weather widget that recommends seasonal services (snow removal in winter, lawn care in spring).
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with service area, proof strip, service packages, project highlights, and a quote form CTA</li>
          <li><strong>Services page:</strong> Detailed service descriptions for lawn care, hardscaping, snow removal, and seasonal cleanup with pricing</li>
          <li><strong>Gallery:</strong> Before-and-after photos of 12 projects with location and project description</li>
          <li><strong>About:</strong> Mike's story, 8 years in business, service area map, and Google review badges</li>
          <li><strong>Contact:</strong> Free quote form with service type, property size, and preferred contact method</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Performance</h3>
          <p className="feature-card__body">
            LCP: 1.2 seconds on a throttled 4G connection. CLS: 0.02. INP: 80ms. All images served in WebP with proper width and height attributes. No render-blocking JavaScript.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Accessibility</h3>
          <p className="feature-card__body">
            WCAG 2.2 AA compliant. Keyboard-navigable, proper heading order, alt text on all project photos, form labels and error messages, 4.5:1 contrast ratio on all text.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Local SEO</h3>
          <p className="feature-card__body">
            LocalBusiness schema markup, Google Business Profile completed with photos and service list, NAP consistency across the site, service area pages for Rockford and Loves Park.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Results" title="What happened after launch">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">40+ quote requests</h3>
          <p className="feature-card__body">In the first 3 months, the contact form generated 40+ quote requests. Mike had never received an online lead before.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Google indexed</h3>
          <p className="feature-card__body">Site indexed within 5 days. Ranking on page 2 for "landscaping Rockford IL" within 6 weeks. Google Business Profile views increased 300%.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">3 new clients</h3>
          <p className="feature-card__body">Mike attributed 3 new recurring lawn care contracts directly to the website in the first 90 days. Each contract worth $2,400/year.</p>
        </Card>
      </div>
      <Card variant="outline" style={{ marginTop: "1.5rem" }}>
        <p className="feature-card__body">
          <strong>Note on results:</strong> The 40+ quote requests and 3 new clients are self-reported by the client and tracked through the contact form submission log. Search ranking positions is based on manual checks, not a rank tracker. These are measured results from the first 90 days post-launch, not projections. Individual results will vary based on competition, market, and season.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Testimonial" title="What Mike said">
      <Card>
        <blockquote style={{ fontSize: "1.125rem", lineHeight: 1.6, margin: 0, borderLeft: "4px solid var(--color-accent)", paddingLeft: "1.5rem" }}>
          "I ran my landscaping business for 8 years without a website. Bradley built me one in 3 weeks that looks better than the big companies in town. The quote form alone has brought in 40 leads I would never have gotten. He explained everything in plain English and I own the whole site. Best $797 I ever spent on the business."
        </blockquote>
        <p style={{ marginTop: "1rem", fontWeight: 600 }}>
          — Mike R., Owner, GreenScape Pro, Rockford, IL
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Want results like this?"
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
        { "@type": "ListItem", position: 3, name: "GreenScape Pro", item: pageUrl },
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
