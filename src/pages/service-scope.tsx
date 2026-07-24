import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import {
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LAST_UPDATED,
  PACKAGES,
} from "../site/legal/business-identity";

const leadEnginePkg = PACKAGES[2];

const pathname = "/service-scope/";
const pageTitle = "Service Scope and What's Included | Bradley F. Matera";
const pageDescription =
  "What is included in every website build: mobile responsive, SEO, contact form, hosting setup, analytics, 30-day warranty, care plans, and hourly work scope.";

const ServiceScopePage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Service Scope
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Service Scope</strong> and What's Included
        </>
      }
      description={
        <>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-subtle)", marginBottom: "1rem" }}>Last updated: July 2026 · By Bradley Matera</p>
          <p className="direct-answer">
            <strong>What's included in a Bradley Matera website build?</strong> Every build includes mobile-responsive design, basic SEO, a contact form, hosting setup, analytics, and a 30-day warranty. Custom photography, logo design, paid advertising, and content writing beyond package scope are not included. Last updated July 2026.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/pricing/">
            See pricing
          </Link>
          <a href="tel:+16083135373" data-variant="ghost" className="link">
            (608) 313-5373
          </a>
        </>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="Mobile responsive illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Mobile responsive</h2>
            <p className="pkg-card__desc">
              Every site works on phones, tablets, and desktops out of the box.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="30-day warranty illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">30-day warranty</h2>
            <p className="pkg-card__desc">
              Bugs and functionality issues fixed free for 30 days post-launch.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="No hidden scope illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">No hidden scope</h2>
            <p className="pkg-card__desc">
              What's listed here is what you get. Anything beyond is quoted separately.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Every build"
      title="What's included in every build"
    >
      <div className="pkg-card">
        <img src="/package-images/scope-included.svg" alt="What's included in every build illustration" className="pkg-card__bg" loading="lazy" />
        <div className="pkg-card__body">
          <p className="pkg-card__desc">
            Regardless of which package you choose, every website build includes:
          </p>
          <ul>
            <li><strong>Mobile-responsive design</strong> — looks and works great on all devices.</li>
            <li><strong>Basic SEO</strong> — meta tags, semantic HTML, fast load times, schema markup.</li>
            <li><strong>Contact form</strong> — working form that sends submissions to your email.</li>
            <li><strong>Hosting setup</strong> — I set up and configure hosting for your site.</li>
            <li><strong>Analytics</strong> — Google Analytics installed and configured.</li>
            <li><strong>30-day warranty</strong> — bugs and functionality issues fixed free for 30 days after launch.</li>
          </ul>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="What's included"
      title="Every project includes these fundamentals"
      description={
        <p>
          No matter which package you choose — Starter, Growth, or Lead Engine — these items are part of every build. There is no "basic tier" that skips the essentials.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          <li><strong>SSL certificate setup and renewal</strong> — HTTPS encryption configured at launch and renewed automatically.</li>
          <li><strong>Mobile-responsive design</strong> — tested on iOS and Android devices, not just browser dev tools.</li>
          <li><strong>Google Analytics 4 setup</strong> — GA4 installed, verified, and sending data before launch.</li>
          <li><strong>Google Search Console verification</strong> — your property claimed and linked to Analytics.</li>
          <li><strong>XML sitemap generation and submission</strong> — sitemap built and submitted to Google for indexing.</li>
          <li><strong>Basic on-page SEO</strong> — title tags, meta descriptions, and heading structure on every page.</li>
          <li><strong>Contact form with spam protection</strong> — working form with honeypot and submission filtering.</li>
          <li><strong>Cross-browser testing</strong> — verified in Chrome, Safari, Firefox, and Edge.</li>
          <li><strong>30-day post-launch warranty</strong> — bugs and functionality issues fixed free for 30 days after launch.</li>
          <li><strong>Written agreement</strong> — a signed document outlining scope, timeline, and cost before work begins.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Not included"
      title="What's NOT included"
    >
      <div className="pkg-card">
        <img src="/package-images/scope-excluded.svg" alt="What's not included illustration" className="pkg-card__bg" loading="lazy" />
        <div className="pkg-card__body">
          <p className="pkg-card__desc">
            The following are not included in standard builds and can be quoted separately if needed:
          </p>
          <ul>
            <li>Custom photography or stock photo licensing beyond what's provided.</li>
            <li>Logo design and brand identity work.</li>
            <li>Paid advertising setup or management (Google Ads, Facebook Ads).</li>
            <li>Content writing beyond the scope of your chosen package.</li>
            <li>E-commerce functionality on Starter Presence or Local Growth packages.</li>
          </ul>
          <p className="pkg-card__desc">
            If you need any of these, let me know and I'll either quote it or refer you to someone who does it well.
          </p>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Packages"
      title="Package inclusions"
      description={
        <p>
          Three build packages with clearly defined scope. See the <Link to="/pricing/">pricing page</Link> for current prices.
        </p>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="Starter Presence package illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Starter Presence</h3>
            <p className="pkg-card__desc">
              Up to 5 pages, mobile-ready, SEO-ready, contact form, hosting setup, schema markup, 1 revision round, 14-day build time.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="Local Growth package illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Local Growth</h3>
            <p className="pkg-card__desc">
              Up to 10 pages, Google Business Profile setup, advanced schema markup, copywriting assistance, GA4 setup, 2 revision rounds, 3-4 week build time.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-included.svg" alt="Lead Engine package illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Lead Engine</h3>
            <p className="pkg-card__desc">
              {leadEnginePkg.maxPages}. Advanced integrations (custom quoted), custom conversion planning, service-area architecture, technical SEO, post-launch measurement review, {leadEnginePkg.revisionRounds} revision rounds.
            </p>
          </div>
        </div>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/pricing/">See full pricing</Link>
        <Link data-variant="ghost" to="/terms/">Terms of Service</Link>
      </div>
    </Section>

    <Section
      eyebrow="Comparison"
      title="Package comparison: what's included vs. not included"
      description={
        <p>
          A side-by-side comparison of the three build packages. Items marked <strong>Yes</strong> are included in the standard build scope; items marked <strong>No</strong> are excluded and can be quoted separately.
        </p>
      }
    >
      <Card variant="outline">
        <table className="data-table">
          <caption>What's included vs. not included across Starter Presence, Local Growth, and Lead Engine</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Starter Presence</th>
              <th scope="col">Local Growth</th>
              <th scope="col">Lead Engine</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Max pages</th>
              <td data-label="Starter Presence">Up to 5</td>
              <td data-label="Local Growth">Up to 10</td>
              <td data-label="Lead Engine">Defined in written scope</td>
            </tr>
            <tr>
              <th scope="row">Mobile-responsive design</th>
              <td data-label="Starter Presence">Yes</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Basic SEO &amp; local business schema</th>
              <td data-label="Starter Presence">Yes</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Contact form with spam protection</th>
              <td data-label="Starter Presence">Yes</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Hosting &amp; analytics setup</th>
              <td data-label="Starter Presence">Yes</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">30-day post-launch warranty</th>
              <td data-label="Starter Presence">Yes</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Revision rounds</th>
              <td data-label="Starter Presence">1</td>
              <td data-label="Local Growth">2</td>
              <td data-label="Lead Engine">3</td>
            </tr>
            <tr>
              <th scope="row">Google Business Profile alignment</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Advanced schema markup (Service + FAQ)</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Local SEO foundations</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">Yes</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Custom conversion planning</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Service-area architecture</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">Technical SEO &amp; post-launch measurement review</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">Yes</td>
            </tr>
            <tr>
              <th scope="row">E-commerce functionality</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">Custom quoted</td>
            </tr>
            <tr>
              <th scope="row">Advanced / AI integrations</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">Custom quoted</td>
            </tr>
            <tr>
              <th scope="row">Advertising management</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">No</td>
            </tr>
            <tr>
              <th scope="row">Custom photography / logo design</th>
              <td data-label="Starter Presence">No</td>
              <td data-label="Local Growth">No</td>
              <td data-label="Lead Engine">No</td>
            </tr>
            <tr>
              <th scope="row">Build time</th>
              <td data-label="Starter Presence">~14 days</td>
              <td data-label="Local Growth">3&ndash;4 weeks</td>
              <td data-label="Lead Engine">Defined in scope</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Section>

    <Section
      eyebrow="Care plans"
      title="Care plan scope"
      description={
        <p>
          Monthly support plans keep your site updated, secure, and performing. No long-term commitment. Website care plans are month-to-month. Every website project still uses a written service agreement and scope of work.
        </p>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Essential care plan illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Essential — $37/month</h3>
            <p className="pkg-card__desc">
              Hosting, security updates, backups, uptime monitoring, 24-hour response time. For Starter Presence sites that just need to stay live.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Growth care plan illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Growth — $67/month</h3>
            <p className="pkg-card__desc">
              Everything in Essential plus content updates, performance monitoring, monthly reports, 24-hour response time. For Local Growth sites that change regularly.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Search care plan illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Search — $97/month</h3>
            <p className="pkg-card__desc">
              Everything in Growth plus local SEO monitoring, ranking tracking, schema updates, same-day response time. For Lead Engine sites focused on search visibility.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Hourly work"
      title="Hourly work scope"
    >
      <Card variant="outline">
        <ul>
          <li><strong>Rate:</strong> $65/hour with a 1-hour minimum per task.</li>
          <li><strong>Billable time includes:</strong> design changes, code updates, content updates, bug fixes, consultations, and research directly related to your request.</li>
          <li><strong>Not billable:</strong> time spent on bugs I caused within the 30-day warranty period.</li>
          <li><strong>Billing:</strong> Invoiced after work is completed. You approve scope before work begins.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Travel"
      title="Travel policy"
    >
      <div className="pkg-card">
        <img src="/package-images/scope-process.svg" alt="Travel policy illustration" className="pkg-card__bg" loading="lazy" />
        <div className="pkg-card__body">
          <p className="pkg-card__desc">
            Work is remote-first. Phone, video, and email handle the vast majority of projects efficiently.
          </p>
          <p className="pkg-card__desc">
            For local clients in Northwest Illinois and Southern Wisconsin, in-person meetings are available when it makes sense — typically for initial consultations or project kickoffs. No travel fees within the service area.
          </p>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Response times"
      title="Response time targets"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Essential plan response time illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Essential plan</h3>
            <p className="pkg-card__desc">
              24-hour response time for support requests during business days.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Growth plan response time illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Growth plan</h3>
            <p className="pkg-card__desc">
              24-hour response time for support requests during business days.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/scope-process.svg" alt="Search plan response time illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Search plan</h3>
            <p className="pkg-card__desc">
              Same-day response time for support requests during business days.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call {SELLER_PHONE} or send a message through the contact page. I'll tell you honestly which package fits your needs.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <a href={SELLER_PHONE_HREF} data-variant="ghost" className="link">
          {SELLER_PHONE}
        </a>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Last updated: {POLICY_LAST_UPDATED}
      </p>
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

export default ServiceScopePage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Service Scope", item: pageUrl },
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
