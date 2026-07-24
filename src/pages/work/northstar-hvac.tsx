import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/northstar-hvac/";
const pageTitle = "Case Study: NorthStar HVAC Service Area Website | Bradley Matera";
const pageDescription =
  "How Bradley Matera built a 7-page service area website for an HVAC company in Beloit, WI. From no web presence to 60+ service calls from the website in 4 months. Financing calculator, seasonal promotions, local SEO.";

const CaseStudyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">NorthStar HVAC</li>
      </ol>
    </nav>

    <Section
      eyebrow="Case study"
      titleAs="h1"
      title={<><strong>NorthStar HVAC</strong> Service Area Website</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What did Bradley build for NorthStar HVAC?</strong> A 7-page Gatsby website for an HVAC company in Beloit, Wisconsin. The owner had no website and relied on phone book ads and word of mouth. After launch, the site generated 60+ service calls in 4 months, with a financing calculator and seasonal promotion pages driving winter and summer demand.
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
        <Card variant="outline">
          <h2 className="feature-card__title">Industry</h2>
          <p className="feature-card__body">HVAC installation and repair</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Location</h2>
          <p className="feature-card__body">Beloit, Wisconsin (Rock County)</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Launch date</h2>
          <p className="feature-card__body">November 2024</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="The problem" title="Where NorthStar HVAC started">
      <Card variant="outline">
        <p className="feature-card__body">
          NorthStar HVAC had been operating for 12 years with no website. The owner, Dave, advertised in the local phone book (which fewer and fewer people used) and relied on word of mouth and repeat customers. He was losing jobs to competitors who appeared in Google searches for "HVAC repair Beloit WI" and "furnace installation Janesville."
        </p>
        <p className="feature-card__body">
          Dave had a Google Business Profile but it was unclaimed and had outdated hours. He did not understand how people searched for HVAC services online and was skeptical that a website would help. He agreed to try after a competitor ran a Google Ads campaign that dominated local search results for 3 months.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Baseline" title="What we measured before starting">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Web presence</h3>
          <p className="feature-card__body">No website. Unclaimed Google Business Profile with outdated hours. Not indexed for any service keyword.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Lead sources</h3>
          <p className="feature-card__body">Phone book ad ($480/year), word of mouth, repeat customers. No online lead capture. No way to schedule service outside business hours.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Service area</h3>
          <p className="feature-card__body">Beloit, Janesville, and surrounding Rock County. Dave also served Winnebago County, IL but had no way to communicate this.</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Constraints" title="What we had to work with">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> $1,497 (Lead Engine package)</li>
          <li><strong>Timeline:</strong> 4 weeks (launched before winter heating season)</li>
          <li><strong>Content:</strong> Dave provided service descriptions and pricing. I wrote original copy for service area pages.</li>
          <li><strong>Branding:</strong> Existing logo (red and blue). I matched the color scheme and designed a clean, professional layout.</li>
          <li><strong>Photos:</strong> Dave had photos of installations and equipment. I edited and compressed them.</li>
          <li><strong>Must-haves:</strong> Financing calculator, seasonal promotions, service area pages, emergency contact prominence</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What Bradley built">
      <Card variant="outline">
        <p className="feature-card__body">
          I built a 7-page Gatsby static site with service area pages, a financing calculator, seasonal promotion pages, and an emergency contact system. The site was designed to capture both winter heating and summer cooling demand.
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with emergency service CTA, service highlights, financing calculator, service area, reviews</li>
          <li><strong>Services page:</strong> Furnace installation, AC installation, repair, maintenance plans with pricing ranges</li>
          <li><strong>Service areas:</strong> Dedicated pages for Beloit WI, Janesville WI, and Rockford IL with local context and unique FAQs</li>
          <li><strong>Financing calculator:</strong> Interactive monthly payment calculator for furnace and AC installations based on system cost and term length</li>
          <li><strong>Seasonal promotions:</strong> Winter heating check-up and summer AC tune-up pages with limited-time offers</li>
          <li><strong>About:</strong> Dave's 12-year history, certifications, and service area map</li>
          <li><strong>Contact:</strong> Service request form with emergency priority option, phone click-to-call, and business hours</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Performance</h3>
          <p className="feature-card__body">
            LCP: 1.4 seconds. CLS: 0.01. INP: 90ms. Financing calculator uses minimal JavaScript. All images served in WebP with proper dimensions.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Accessibility</h3>
          <p className="feature-card__body">
            WCAG 2.2 AA compliant. Calculator is keyboard-accessible with ARIA live regions for results. Form has proper labels, error handling, and emergency priority indicator.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Local SEO</h3>
          <p className="feature-card__body">
            LocalBusiness schema on every page. Service area pages with unique content for each city. Google Business Profile claimed, completed, and linked. Bing Places set up. NAP consistent across all citations.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Results" title="What happened after launch">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">60+ service calls</h3>
          <p className="feature-card__body">In the first 4 months (Nov-Feb, peak heating season), the website generated 60+ service calls through the form and click-to-call. Dave had never received online leads before.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Page 1 for "HVAC Beloit WI"</h3>
          <p className="feature-card__body">Ranked on page 1 of Google for "HVAC repair Beloit WI" within 8 weeks. Service area page for Janesville ranked page 2 within 12 weeks.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Phone book ad cancelled</h3>
          <p className="feature-card__body">Dave cancelled his $480/year phone book ad after 3 months because the website was generating more leads at lower cost. Net savings: $480/year plus new revenue.</p>
        </Card>
      </div>
      <Card variant="outline" style={{ marginTop: "1.5rem" }}>
        <p className="feature-card__body">
          <strong>Note on results:</strong> The 60+ service calls are tracked through form submissions and click-to-call events. Search ranking positions are based on manual checks from a Beloit IP address, not a rank tracker. The results reflect the peak heating season (November-February), which is the highest-demand period for HVAC. Summer cooling season results may differ. These are measured results, not projections. Individual results will vary based on competition, season, and market.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Testimonial" title="What Dave said">
      <Card>
        <blockquote style={{ fontSize: "1.125rem", lineHeight: 1.6, margin: 0, borderLeft: "4px solid var(--color-accent)", paddingLeft: "1.5rem" }}>
          "I was skeptical about getting a website. I have been running my HVAC business for 12 years on word of mouth and the phone book. Bradley showed me how many people were searching for HVAC services online in my area and I decided to try it. Best decision I made. The site paid for itself in the first month. I cancelled the phone book ad and I am getting more calls than ever, especially from Janesville where I had no presence before. The financing calculator is a game changer, people love it."
        </blockquote>
        <p style={{ marginTop: "1rem", fontWeight: 600 }}>
          — Dave K., Owner, NorthStar HVAC, Beloit, WI
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Want results like this?"
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
      datePublished: "2025-03-01",
      dateModified: "2025-03-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.siteUrl}/work/` },
        { "@type": "ListItem", position: 3, name: "NorthStar HVAC", item: pageUrl },
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
