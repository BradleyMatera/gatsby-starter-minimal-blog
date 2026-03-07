import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-durand-davis-illinois/";
const pageTitle = "Web Developer in Durand, Davis, and Northwest Illinois";
const pageDescription =
  "Bradley Matera builds websites, front-end interfaces, and full-stack web projects for Durand, Davis, and nearby Northwest Illinois communities, with remote collaboration available.";

const serviceBullets = [
  "Small-business and portfolio websites that are easier to update and maintain.",
  "Landing pages, service pages, and contact flows that explain the offer clearly.",
  "React, Next.js, Gatsby, and front-end cleanup work when an existing site needs fixing.",
  "Simple API-backed features, content updates, deployment cleanup, and SEO-focused restructuring.",
];

const proofCards = [
  {
    title: "Portfolio and content systems",
    body:
      "This site itself is part of the proof. I keep rewriting, restructuring, and documenting it in public so the work is easy to review instead of hidden behind vague claims.",
    links: [
      { label: "About my background", href: "/about/" },
      { label: "Browse projects", href: "/projects/" },
    ],
  },
  {
    title: "Front-end and UX work",
    body:
      "Projects like the Interactive Pokédex and AnimalSounds show the kind of UI work I do well right now: responsive layouts, filtering, static deployments, cleanup, and making the experience easier to use.",
    links: [
      { label: "Interactive Pokédex", href: "/projects/interactive-pokedex/" },
      { label: "Projects index", href: "/projects/" },
    ],
  },
  {
    title: "Full-stack and backend reps",
    body:
      "Car-Match, cloud write-ups, and backend experiments are where I practice auth, data flow, deployment, and the kind of debugging that happens once a project has to keep working outside localhost.",
    links: [
      { label: "Car-Match case study", href: "/projects/car-match/" },
      { label: "Roles and capabilities", href: "/roles/" },
    ],
  },
];

const LocalWebDeveloperPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Web Developer in Durand and Davis, Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local web development"
      title={
        <>
          <strong>Web developer for Durand, Davis,</strong> and nearby Northwest Illinois
        </>
      }
      description={
        <>
          <p>
            If you are searching for a web developer near Durand, Illinois or Davis, Illinois, this
            page is the straight version of what I do. I build and improve websites, front-end
            interfaces, and small full-stack projects, then document the work so it is easy to review.
          </p>
          <p>
            I am not pretending to be a large agency. The kind of work I am best suited for right now
            is focused website builds, portfolio or service-site upgrades, front-end fixes, and
            smaller web projects that benefit from careful cleanup and clear communication.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/contact/">
            Start a conversation
          </Link>
          <Link data-variant="ghost" to="/projects/">
            Review proof
          </Link>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h2 className="feature-card__title">What I can help with right now</h2>
          <ul className="feature-list">
            {serviceBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">How I work</h2>
          <p className="feature-card__body">
            Most of my experience comes from building in public, shipping projects to GitHub,
            iterating on them, and documenting what changed. That makes me a good fit for work where
            you want the site or app to be understandable, not just delivered and forgotten.
          </p>
          <p className="feature-card__body">
            Local projects in Durand, Davis, and nearby Illinois communities can still be handled
            mostly remotely. If an in-person conversation makes sense, the important part is still the
            same: clear scope, visible proof, and a site people can actually use.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Service area"
      title="Durand, Davis, and nearby Illinois communities"
      description={
        <>
          <p>
            I created one page for this area on purpose. Durand, Davis, and nearby Northwest Illinois
            searches are closely related, and I would rather make one useful page than a pile of thin
            near-duplicate town pages.
          </p>
        </>
      }
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Durand, Illinois</h3>
          <p className="feature-card__body">
            If you need a web developer in Durand, Illinois, the work I am most useful for is
            service-site cleanup, content restructuring, portfolio pages, and front-end fixes that
            make the site easier to trust and easier to use.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Davis, Illinois</h3>
          <p className="feature-card__body">
            If you are in Davis, Illinois and need a small-business website, landing page refresh, or
            a developer who can clean up an existing React, Gatsby, or static site setup, that is the
            kind of scope I can support honestly.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Nearby Northwest Illinois</h3>
          <p className="feature-card__body">
            I am also open to nearby Northwest Illinois work where the project benefits from strong
            writing, careful restructuring, deployment cleanup, accessibility improvements, or a more
            transparent case-study style delivery process.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Proof"
      title="Projects you can actually review"
      description={
        <p>
          The point is not to say I do everything. The point is to show current proof that matches the
          kind of web work local clients usually care about: shipped pages, clearer UX, deployment
          follow-through, and honest notes about limits.
        </p>
      }
    >
      <div className="grid-three">
        {proofCards.map((card) => (
          <Card key={card.title} variant="outline">
            <h3 className="feature-card__title">{card.title}</h3>
            <p className="feature-card__body">{card.body}</p>
            <div className="card-actions">
              {card.links.map((link) => (
                <Link key={`${card.title}-${link.href}`} data-variant="primary" to={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Next step"
      title="If you found this page by searching locally"
      description={
        <>
          <p>
            Send me the basic details: what the site or page needs to do, what is currently broken or
            confusing, and what deadline matters. I will answer plainly and tell you whether the work
            is a good fit.
          </p>
          <p>
            The best starting point is still email through the <Link to="/contact/">contact page</Link>.
            If you want to vet the work first, start with the <Link to="/projects/">project pages</Link>{" "}
            or the <Link to="/about/">about page</Link>.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Common questions</h3>
          <p className="feature-card__body">
            I broke the common fit, scope, and process questions into a separate FAQ so the answers are
            easier to skim.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
              Read the FAQ
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">How I usually help</h3>
          <p className="feature-card__body">
            If you want the practical version of what I usually fix first, the process page explains it
            without turning it into agency copy.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/website-help-northwest-illinois/">
              Website help page
            </Link>
          </div>
        </Card>
      </div>
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">
          Contact Bradley Matera
        </Link>
        <Link data-variant="ghost" to="/projects/">
          Browse project proof
        </Link>
      </div>
    </Section>
  </Layout>
);

export default LocalWebDeveloperPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web development services for Durand, Davis, and Northwest Illinois",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Web development",
        "Front-end development",
        "Full-stack web development",
        "Website refreshes",
        "Landing pages",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
      },
      areaServed: [
        { "@type": "City", name: "Durand, Illinois" },
        { "@type": "City", name: "Davis, Illinois" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Bradley Matera",
      url: site.siteUrl,
      description: pageDescription,
      areaServed: [
        { "@type": "City", name: "Durand, Illinois" },
        { "@type": "City", name: "Davis, Illinois" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
      sameAs: [
        "https://www.linkedin.com/in/bradmatera",
        "https://github.com/BradleyMatera",
      ],
    },
  ];

  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      structuredData={structuredData}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Web Developer in Durand and Davis, Illinois", path: pathname },
      ]}
    />
  );
};
