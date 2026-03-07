import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/website-help-northwest-illinois/";
const pageTitle = "Website Help in Northwest Illinois";
const pageDescription =
  "How Bradley Matera approaches website help for Durand, Davis, and nearby Northwest Illinois projects: scope, cleanup, structure, fixes, and delivery expectations.";

const WebsiteHelpPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="/web-developer-durand-davis-illinois/">Local web development</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Website help in Northwest Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Website help"
      title="How I approach website help in Northwest Illinois"
      description={
        <>
          <p>
            This is the process page behind the local service area. If someone in Durand, Davis, or a
            nearby Illinois community needs website help, the work usually falls into a few repeatable
            buckets.
          </p>
          <p>
            The point here is clarity. Instead of talking in vague marketing language, I would rather
            say exactly what I usually fix and how I usually work through it.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h2 className="feature-card__title">Typical starting problems</h2>
          <ul className="feature-list">
            <li>The site looks outdated or hard to trust.</li>
            <li>Important services are buried under unclear layout or weak copy.</li>
            <li>Mobile behavior is messy, slow, or visually inconsistent.</li>
            <li>The site exists, but no one knows what to fix first.</li>
            <li>There is code already, but it needs cleanup before adding more.</li>
          </ul>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">What I usually do first</h2>
          <ul className="feature-list">
            <li>Figure out the real goal of the page or site.</li>
            <li>Cut confusion in the heading structure, navigation, and calls to action.</li>
            <li>Fix obvious layout and readability problems across desktop and mobile.</li>
            <li>Make the page easier to explain to both users and search engines.</li>
            <li>Document what changed so later edits do not become guesswork.</li>
          </ul>
        </Card>
        <Card>
          <h2 className="feature-card__title">Best-fit project types</h2>
          <p className="feature-card__body">
            Small-business websites, portfolio sites, landing pages, service pages, content refreshes,
            front-end cleanup, Gatsby or Next.js fixes, and small API-backed features where the scope
            is reasonable and the results can be shown clearly.
          </p>
        </Card>
        <Card>
          <h2 className="feature-card__title">What I am not pretending to be</h2>
          <p className="feature-card__body">
            I am not selling this like a giant agency or enterprise team. If a project needs a large
            multi-person shop or deep long-term production ownership beyond my current scope, it is
            better to say that clearly than dress it up with better wording.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="Related pages" title="Local SEO cluster">
      <div className="card-actions">
        <Link data-variant="primary" to="/web-developer-durand-davis-illinois/">
          Durand and Davis local page
        </Link>
        <Link data-variant="ghost" to="/northwest-illinois-web-development-faq/">
          Northwest Illinois FAQ
        </Link>
        <Link data-variant="ghost" to="/projects/">
          Project proof
        </Link>
      </div>
    </Section>
  </Layout>
);

export default WebsiteHelpPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Web Developer in Durand and Davis, Illinois", path: "/web-developer-durand-davis-illinois/" },
        { name: "Website Help in Northwest Illinois", path: pathname },
      ]}
    />
  );
};
