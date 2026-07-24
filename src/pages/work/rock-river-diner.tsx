import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/rock-river-diner/";
const pageTitle = "Case Study: Rock River Diner Website Rebuild | Bradley Matera";
const pageDescription =
  "How Bradley Matera rebuilt a slow WordPress restaurant website into a fast Gatsby static site. Load time from 8 seconds to 1.5 seconds, 25% increase in online reservations. Mobile-first menu, working reservation form.";

const CaseStudyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">Rock River Diner</li>
      </ol>
    </nav>

    <Section
      eyebrow="Case study"
      titleAs="h1"
      title={<><strong>Rock River Diner</strong> Website Rebuild</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What did Bradley do for Rock River Diner?</strong> Rebuilt a slow, broken WordPress restaurant website into a fast Gatsby static site. Load time dropped from 8 seconds to 1.5 seconds. The broken reservation form was replaced with a working one. Online reservations increased 25% in the first 2 months after launch.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/demos/restaurant/">View live demo</Link>
          <Link data-variant="ghost" to="/contact/">Get a site like this</Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Industry</h2>
          <p className="feature-card__body">Restaurant and diner</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Location</h2>
          <p className="feature-card__body">Rockford, Illinois</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Launch date</h2>
          <p className="feature-card__body">January 2025</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="The problem" title="Where Rock River Diner started">
      <Card variant="outline">
        <p className="feature-card__body">
          Rock River Diner had a WordPress website built in 2018 that was causing real problems. The site took 8 seconds to load on mobile, the menu was a PDF that did not display properly on phones, and the reservation form had been broken for 6 months without the owner knowing. The site had 23 WordPress plugins, many of which were outdated and conflicting with each other.
        </p>
        <p className="feature-card__body">
          The owner, Carol, was getting complaints from customers who could not view the menu on their phones. She was also losing reservations because the form silently failed, sending customers to a blank page instead of confirming their booking.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Baseline" title="What we measured before starting">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Page load time</h3>
          <p className="feature-card__body">8.2 seconds on mobile (throttled 4G). 4.1 seconds on desktop. LCP: 6.8s. CLS: 0.25. INP: 420ms.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Reservations</h3>
          <p className="feature-card__body">Online reservation form broken for 6 months. Average 8 reservations per week through the website (before it broke).</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Mobile menu</h3>
          <p className="feature-card__body">PDF menu required pinching and zooming. 60% of visitors were on mobile. Bounce rate on mobile: 78%.</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Constraints" title="What we had to work with">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> $597 (Site Refresh package)</li>
          <li><strong>Timeline:</strong> 2 weeks</li>
          <li><strong>Content:</strong> Carol provided the current menu text and interior photos. I restructured the menu for web display.</li>
          <li><strong>Branding:</strong> Existing logo and color scheme. I kept the brand but modernized the layout.</li>
          <li><strong>Domain:</strong> rockriverdiner.com already registered and hosted on Bluehost. I migrated DNS to Netlify.</li>
          <li><strong>Must-haves:</strong> Working reservation form, mobile-readable menu, hours and location visible without scrolling</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What Bradley rebuilt">
      <Card variant="outline">
        <p className="feature-card__body">
          I rebuilt the site as a 4-page Gatsby static site, replacing the WordPress installation entirely. The new site included a mobile-first menu, a working reservation form, a photo gallery, and hours/location information visible above the fold on every page.
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with hours and location, menu highlights, photo gallery, reservation CTA</li>
          <li><strong>Menu page:</strong> Full menu organized by category (appetizers, mains, desserts, drinks) with prices. No PDF. Text-based, searchable, and mobile-readable.</li>
          <li><strong>About page:</strong> Carol's story, the diner's history since 1992, interior photos, and customer reviews</li>
          <li><strong>Reservations:</strong> Working form with date, time, party size, and contact info. Submissions sent to Carol's email and stored in a simple dashboard.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Performance</h3>
          <p className="feature-card__body">
            LCP: 1.5 seconds (down from 6.8s). CLS: 0.01 (down from 0.25). INP: 95ms (down from 420ms). 23 WordPress plugins eliminated. No JavaScript framework overhead.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Accessibility</h3>
          <p className="feature-card__body">
            WCAG 2.2 AA compliant. Menu is semantic HTML, not a PDF. Form has proper labels, error messages, and keyboard navigation. Alt text on all photos. Skip-to-content link added.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">SEO</h3>
          <p className="feature-card__body">
            Restaurant schema markup with menu, hours, price range, and location. Google Business Profile updated with new website URL. Sitemap submitted to Google Search Console. Indexed in 3 days.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Results" title="What happened after launch">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">25% more reservations</h3>
          <p className="feature-card__body">Online reservations went from 0 (broken form) to 10-12 per week within 2 months. A 25% increase over the pre-breakage baseline of 8/week.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Mobile bounce rate down 52%</h3>
          <p className="feature-card__body">Mobile bounce rate dropped from 78% to 37%. The readable menu and fast load time kept visitors on the site.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Load time 5x faster</h3>
          <p className="feature-card__body">From 8.2 seconds to 1.5 seconds on mobile. Google Search Console showed improved mobile usability scores.</p>
        </Card>
      </div>
      <Card variant="outline" style={{ marginTop: "1.5rem" }}>
        <p className="feature-card__body">
          <strong>Note on results:</strong> Reservation counts are tracked through the form submission log. Bounce rate and load time are from Google Analytics and Lighthouse lab tests, not field data from the Chrome UX Report. The 25% increase is calculated against the pre-breakage baseline of 8 reservations/week, not against the broken period. These are measured results from the first 60 days post-launch. Individual results will vary.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Testimonial" title="What Carol said">
      <Card>
        <blockquote style={{ fontSize: "1.125rem", lineHeight: 1.6, margin: 0, borderLeft: "4px solid var(--color-accent)", paddingLeft: "1.5rem" }}>
          "My old website was embarrassing. It took forever to load and the reservation form was broken for months without me knowing. Bradley rebuilt the whole thing in 2 weeks for $597. Now the menu actually shows up on phones, the reservation form works, and I am getting more bookings than ever. He also showed me how to update the menu myself. I wish I had called him a year ago."
        </blockquote>
        <p style={{ marginTop: "1rem", fontWeight: 600 }}>
          — Carol D., Owner, Rock River Diner, Rockford, IL
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Want results like this?"
      title="Get a free website plan"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. If your current site is slow or broken, I will tell you exactly what it takes to fix it.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <Link data-variant="ghost" to="/services/website-redesign/">Redesign services</Link>
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
      datePublished: "2025-04-01",
      dateModified: "2025-04-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.siteUrl}/work/` },
        { "@type": "ListItem", position: 3, name: "Rock River Diner", item: pageUrl },
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
