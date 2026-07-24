import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/work/rock-river-diner/";
const pageTitle = "Example: Restaurant Website Rebuild | Bradley Matera";
const pageDescription =
  "An illustrative example of rebuilding a slow WordPress restaurant site into a fast Gatsby static site. Covers menus, reservation forms, and accessibility.";

const ExamplePage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
        <li className="breadcrumbs__item"><Link to="/work/">Work</Link></li>
        <li className="breadcrumbs__item" aria-current="page">Restaurant example</li>
      </ol>
    </nav>

    <div className="surface-card surface-card--outline" style={{ marginTop: "1.5rem", marginBottom: "1.5rem", borderColor: "var(--color-accent)" }}>
      <p className="feature-card__body" style={{ margin: 0 }}>
        <strong>Disclaimer:</strong> This is an illustrative example showing the structure and approach for a restaurant website rebuild. It is not a real client project.
      </p>
    </div>

    <Section
      eyebrow="Example project"
      titleAs="h1"
      title={<><strong>Rock River Diner</strong> (illustrative example)</>}
      description={
        <>
          <p className="direct-answer">
            <strong>What does this example show?</strong> This is an illustrative example of how a slow, broken WordPress restaurant website could be rebuilt into a fast Gatsby static site. It demonstrates the structure, technical approach, and typical improvements involved in a WordPress-to-Gatsby migration for a restaurant, including a mobile-first menu, a working reservation form, and accessibility upgrades.
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
          <p className="feature-card__body">Small city, Midwest US (illustrative)</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Example type: Restaurant website</h2>
          <p className="feature-card__body">WordPress-to-Gatsby rebuild</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Project specs" title="Project specifications at a glance">
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Rock River Diner project specs table">
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
              <td style={{ padding: "0.75rem" }}>Restaurant and diner</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Pages</td>
              <td style={{ padding: "0.75rem" }}>4 pages — Home, Menu, About, Reservations</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Build time</td>
              <td style={{ padding: "0.75rem" }}>Typically 1-2 weeks for a small restaurant site</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Stack</td>
              <td style={{ padding: "0.75rem" }}>Gatsby 5 static site, React 18, TypeScript, Netlify hosting</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Key features</td>
              <td style={{ padding: "0.75rem" }}>Mobile-first text menu, working reservation form, photo gallery, hours and location visible above the fold</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>SEO features</td>
              <td style={{ padding: "0.75rem" }}>Restaurant schema markup with menu, hours, price range, and location, Google Business Profile update, sitemap submission</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Accessibility</td>
              <td style={{ padding: "0.75rem" }}>WCAG 2.2 AA compliant, semantic HTML menu (no PDF), proper form labels, keyboard navigation, alt text on all photos, skip-to-content link</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section eyebrow="The problem" title="Common restaurant website problems">
      <Card variant="outline">
        <p className="feature-card__body">
          Many independent restaurants have WordPress websites that were built years ago and have become slow and difficult to maintain. Common issues include long mobile load times, menus published as PDFs that do not display well on phones, and reservation or contact forms that silently fail without the owner knowing. Over time, accumulated plugins can conflict with each other and create security and performance problems.
        </p>
        <p className="feature-card__body">
          Restaurant owners often hear about these problems from customers who cannot view the menu on their phones or who never received a confirmation after submitting a reservation request. By the time the issues are noticed, the site may have been losing bookings for weeks or months.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Common starting point" title="What a typical restaurant site looks like before a rebuild">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Page load time</h3>
          <p className="feature-card__body">Typically 6-10 seconds on mobile (throttled 4G). LCP often above 5 seconds. CLS and INP frequently in the poor range due to unoptimized images and plugin overhead.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Reservations</h3>
          <p className="feature-card__body">Reservation forms are often broken or unreliable. Owners may not realize the form is failing until a customer mentions it.</p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Mobile menu</h3>
          <p className="feature-card__body">PDF menus are common and require pinching and zooming on phones. The majority of restaurant visitors are on mobile, and a poor mobile menu experience drives high bounce rates.</p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Typical constraints" title="What a project like this usually involves">
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>Budget:</strong> Site Refresh tier ($597) is a common fit for this scope.</li>
          <li><strong>Timeline:</strong> Typically 1-2 weeks for a small restaurant site.</li>
          <li><strong>Content:</strong> The owner provides the current menu text and interior photos. The menu is restructured for web display.</li>
          <li><strong>Branding:</strong> Existing logo and color scheme are kept, with the layout modernized.</li>
          <li><strong>Domain:</strong> The existing domain is retained and DNS is migrated to Netlify.</li>
          <li><strong>Must-haves:</strong> Working reservation form, mobile-readable menu, hours and location visible without scrolling</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="What changed" title="What a rebuild looks like">
      <Card variant="outline">
        <p className="feature-card__body">
          The site is rebuilt as a 4-page Gatsby static site, replacing the WordPress installation entirely. The new site includes a mobile-first menu, a working reservation form, a photo gallery, and hours/location information visible above the fold on every page.
        </p>
        <ul className="feature-list">
          <li><strong>Home page:</strong> Hero with hours and location, menu highlights, photo gallery, reservation CTA</li>
          <li><strong>Menu page:</strong> Full menu organized by category (appetizers, mains, desserts, drinks) with prices. No PDF. Text-based, searchable, and mobile-readable.</li>
          <li><strong>About page:</strong> The restaurant's story and history, interior photos, and customer reviews</li>
          <li><strong>Reservations:</strong> Working form with date, time, party size, and contact info. Submissions sent to the owner's email and stored in a simple dashboard.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Technical work" title="Accessibility, performance, and SEO">
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Performance</h3>
          <p className="feature-card__body">
            Target LCP under 2.5 seconds. Target CLS under 0.1. Target INP under 200ms. WordPress plugins are eliminated entirely. No JavaScript framework overhead.
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
            Restaurant schema markup with menu, hours, price range, and location. Google Business Profile updated with new website URL. Sitemap submitted to Google Search Console.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Want a site like this?"
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
      datePublished: "2025-04-01",
      dateModified: "2025-04-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.siteUrl}/work/` },
        { "@type": "ListItem", position: 3, name: "Restaurant example", item: pageUrl },
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
