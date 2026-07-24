import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/service-scope/";
const pageTitle = "Service Scope and What's Included | Bradley Matera";
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
        <Card variant="outline">
          <h2 className="feature-card__title">Mobile responsive</h2>
          <p className="feature-card__body">
            Every site works on phones, tablets, and desktops out of the box.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">30-day warranty</h2>
          <p className="feature-card__body">
            Bugs and functionality issues fixed free for 30 days post-launch.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No hidden scope</h2>
          <p className="feature-card__body">
            What's listed here is what you get. Anything beyond is quoted separately.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Every build"
      title="What's included in every build"
    >
      <Card variant="outline">
        <p className="feature-card__body">
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
      </Card>
    </Section>

    <Section
      eyebrow="Not included"
      title="What's NOT included"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          The following are not included in standard builds and can be quoted separately if needed:
        </p>
        <ul>
          <li>Custom photography or stock photo licensing beyond what's provided.</li>
          <li>Logo design and brand identity work.</li>
          <li>Paid advertising setup or management (Google Ads, Facebook Ads).</li>
          <li>Content writing beyond the scope of your chosen package.</li>
          <li>E-commerce functionality on Starter Presence or Local Growth packages.</li>
        </ul>
        <p className="feature-card__body">
          If you need any of these, let me know and I'll either quote it or refer you to someone who does it well.
        </p>
      </Card>
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
        <Card variant="outline">
          <h3 className="feature-card__title">Starter Presence</h3>
          <p className="feature-card__body">
            Up to 5 pages, mobile-ready, SEO-ready, contact form, hosting setup, schema markup, 1 revision round, 14-day build time.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Local Growth</h3>
          <p className="feature-card__body">
            Up to 10 pages, Google Business Profile setup, advanced schema markup, copywriting assistance, GA4 setup, 2 revision rounds, 3-4 week build time.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Lead Engine</h3>
          <p className="feature-card__body">
            Unlimited pages, custom integrations, AI chat assistant, priority support, monthly strategy call, 3 revision rounds.
          </p>
        </Card>
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/pricing/">See full pricing</Link>
        <Link data-variant="ghost" to="/terms/">Terms of Service</Link>
      </div>
    </Section>

    <Section
      eyebrow="Care plans"
      title="Care plan scope"
      description={
        <p>
          Monthly support plans keep your site updated, secure, and performing. Month-to-month, no contracts.
        </p>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Essential — $37/month</h3>
          <p className="feature-card__body">
            Hosting, security updates, backups, uptime monitoring, 24-hour response time. For Starter Presence sites that just need to stay live.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Growth — $67/month</h3>
          <p className="feature-card__body">
            Everything in Essential plus content updates, performance monitoring, monthly reports, 24-hour response time. For Local Growth sites that change regularly.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Search — $97/month</h3>
          <p className="feature-card__body">
            Everything in Growth plus local SEO monitoring, ranking tracking, schema updates, same-day response time. For Lead Engine sites focused on search visibility.
          </p>
        </Card>
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
      <Card variant="outline">
        <p className="feature-card__body">
          Work is remote-first. Phone, video, and email handle the vast majority of projects efficiently.
        </p>
        <p className="feature-card__body">
          For local clients in Northwest Illinois and Southern Wisconsin, in-person meetings are available when it makes sense — typically for initial consultations or project kickoffs. No travel fees within the service area.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Response times"
      title="Response time guarantees"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Essential plan</h3>
          <p className="feature-card__body">
            24-hour response time for support requests during business days.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Growth plan</h3>
          <p className="feature-card__body">
            24-hour response time for support requests during business days.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Search plan</h3>
          <p className="feature-card__body">
            Same-day response time for support requests during business days.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I'll tell you honestly which package fits your needs.
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
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Last updated: July 2026
      </p>
    </Section>
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
