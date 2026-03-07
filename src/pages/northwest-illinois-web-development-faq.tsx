import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/northwest-illinois-web-development-faq/";
const pageTitle = "Northwest Illinois Web Development FAQ";
const pageDescription =
  "FAQ for people looking for a web developer in Durand, Davis, or nearby Northwest Illinois: what kind of projects fit, how I work, and what to expect before reaching out.";

const faqs = [
  {
    question: "Do you work only in Durand and Davis, Illinois?",
    answer:
      "No. Durand and Davis are the main local search terms I am targeting on-site, but I am open to nearby Northwest Illinois work and remote projects too.",
  },
  {
    question: "What kind of web development work fits you best right now?",
    answer:
      "Focused website builds, portfolio or service-site refreshes, front-end cleanup, content restructuring, static-site fixes, and smaller full-stack projects where the scope is clear and the work can be documented well.",
  },
  {
    question: "Do you handle large agency-style projects?",
    answer:
      "No. I am not positioning this site like a large agency. The strongest fit is smaller or mid-sized work where clear communication, cleanup, and visible proof matter more than pretending I have a massive team.",
  },
  {
    question: "Can you help with SEO too?",
    answer:
      "Yes, on the site side. That includes page structure, metadata, internal linking, local landing pages, schema, crawl controls, and content cleanup. Off-site work like Google Business Profile, citations, and review collection still requires your direct account access and real business signals.",
  },
  {
    question: "Do local projects need in-person meetings?",
    answer:
      "Not necessarily. Most website and front-end work can be handled remotely. If a local meeting makes sense, the important part is still the same: clear scope, proof, and a practical delivery plan.",
  },
  {
    question: "Where should I start if I found you through a local Google search?",
    answer:
      "Start with the local service page, then review the projects or about page. After that, send the problem, desired outcome, and timing through the contact page so I can tell you honestly whether the fit is right.",
  },
];

const LocalFaqPage = () => (
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
          Northwest Illinois web development FAQ
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="FAQ"
      title="Questions about web development in Northwest Illinois"
      description={
        <>
          <p>
            This page exists to answer the practical questions behind searches like web developer
            Durand Illinois, web developer Davis Illinois, and related Northwest Illinois website help
            searches.
          </p>
          <p>
            The goal is not to sound like an agency brochure. The goal is to explain fit, scope, and
            process clearly before anyone emails.
          </p>
        </>
      }
    >
      <div className="grid-two">
        {faqs.map((faq) => (
          <Card key={faq.question} variant="outline">
            <h2 className="feature-card__title">{faq.question}</h2>
            <p className="feature-card__body">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section eyebrow="Related local pages" title="Keep going">
      <div className="card-actions">
        <Link data-variant="primary" to="/web-developer-durand-davis-illinois/">
          Local services page
        </Link>
        <Link data-variant="ghost" to="/website-help-northwest-illinois/">
          Website help and process
        </Link>
        <Link data-variant="ghost" to="/contact/">
          Contact page
        </Link>
      </div>
    </Section>
  </Layout>
);

export default LocalFaqPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Web Developer in Durand and Davis, Illinois", path: "/web-developer-durand-davis-illinois/" },
        { name: "Northwest Illinois Web Development FAQ", path: pathname },
      ]}
    />
  );
};
