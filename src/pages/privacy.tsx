import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/privacy/";
const pageTitle = "Privacy Policy | Bradley Matera";
const pageDescription =
  "How Bradley Matera collects, uses, and protects your information. No selling of data, no advertising tracking. Request deletion or a copy anytime.";

const PrivacyPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Privacy Policy
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Privacy</strong> Policy
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What information does Bradley Matera collect and how is it used?</strong> I collect only what you voluntarily provide through the contact form — name, email, phone, and business details — to respond to inquiries and deliver services. I do not sell your data, use it for advertising, or share it with third parties. Last updated July 2026.
          </p>
        </>
      }
      actions={
        <>
          <a href="mailto:bradmatera@gmail.com" data-variant="ghost" className="link">
            bradmatera@gmail.com
          </a>
          <Link data-variant="primary" to="/contact/">
            Contact me
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">No selling of data</h2>
          <p className="feature-card__body">
            Your information is never sold, rented, or traded to anyone.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No advertising tracking</h2>
          <p className="feature-card__body">
            No ad pixels, no cross-site tracking, no remarketing lists.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Delete on request</h2>
          <p className="feature-card__body">
            Request deletion of your data at any time and I will remove it within 30 days.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Data collection"
      title="What information we collect"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          I collect only the information you voluntarily provide when you use the contact form or work with me directly:
        </p>
        <ul>
          <li><strong>Name</strong> — so I know who I'm talking to.</li>
          <li><strong>Email address</strong> — to respond to inquiries and send project updates.</li>
          <li><strong>Phone number</strong> — for follow-up calls if you request them.</li>
          <li><strong>Business information</strong> — business name, services, and details you share through the contact form so I can give you an accurate quote.</li>
        </ul>
        <p className="feature-card__body">
          I do not collect information passively beyond basic analytics (see below).
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Use of data"
      title="How we use your information"
    >
      <Card variant="outline">
        <ul>
          <li>Responding to your inquiries and providing quotes.</li>
          <li>Delivering website design, development, and SEO services you've requested.</li>
          <li>Sending project updates and communications related to your engagement.</li>
          <li>Billing and record-keeping for active projects.</li>
        </ul>
        <p className="feature-card__body">
          That's it. No marketing emails you didn't ask for, no newsletters unless you opt in.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="What we don't do"
      title="What we do NOT do with your data"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">No selling</h3>
          <p className="feature-card__body">
            Your data is never sold, rented, or licensed to third parties.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">No advertising</h3>
          <p className="feature-card__body">
            Your data is not used for targeted advertising or ad retargeting.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">No sharing</h3>
          <p className="feature-card__body">
            Your data is not shared with third parties except where required to deliver services you've requested (e.g., hosting providers).
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Cookies & analytics"
      title="Cookies and analytics"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          This site uses Google Analytics to understand aggregate traffic patterns — which pages are visited, general geographic regions, and device types. No personally identifiable tracking is used.
        </p>
        <ul>
          <li>Google Analytics collects anonymous, aggregated data only.</li>
          <li>No personally identifiable information is tracked.</li>
          <li>No cross-site tracking or remarketing pixels.</li>
          <li>You can opt out of analytics by using a browser ad blocker or Do Not Track setting.</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Retention"
      title="Data retention"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          Project-related data (files, communications, account access) is kept for the duration of our engagement plus 30 days, then deleted. Contact form submissions from non-clients are deleted after 90 days unless we begin a working relationship.
        </p>
        <p className="feature-card__body">
          If you request deletion, I will remove your data within 30 days of the request.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Your rights"
      title="Your rights"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Request deletion</h3>
          <p className="feature-card__body">
            Ask me to delete your data and I will remove it within 30 days.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Request a copy</h3>
          <p className="feature-card__body">
            Ask me for a copy of the data I hold about you and I will provide it.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Opt out of analytics</h3>
          <p className="feature-card__body">
            Use a browser ad blocker or Do Not Track setting to opt out of Google Analytics.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about privacy?"
      description={
        <p>
          If you have any questions about this privacy policy or want to exercise your rights, reach out directly.
        </p>
      }
    >
      <div className="card-actions">
        <a href="mailto:bradmatera@gmail.com" data-variant="primary" className="link">
          bradmatera@gmail.com
        </a>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/terms/">Terms of Service</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Last updated: July 2026
      </p>
    </Section>
  </Layout>
);

export default PrivacyPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: pageUrl },
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
