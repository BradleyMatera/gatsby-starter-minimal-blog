import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-pecatonica-illinois/";
const pageTitle = "Web Developer & Website Design in Pecatonica, Illinois";
const pageDescription =
  "Web developer near Pecatonica, Illinois offering website design, SEO, and small business websites for local businesses in Winnebago County.";

const serviceBullets = [
  "Website design for small businesses, shops, and service providers in Pecatonica that need a real online presence.",
  "Website help and repair when an existing site is broken, outdated, or hard to update without a developer.",
  "SEO services that target local Pecatonica and Winnebago County searches so nearby customers can actually find you.",
  "Small business websites built to be maintainable, fast, and clear about what you offer and how to contact you.",
];

const proofCards = [
  {
    title: "Projects you can review",
    body:
      "Instead of vague claims, the work is public. Browse shipped projects, case studies, and documented builds that show how I approach website design and front-end development for real use cases.",
    links: [
      { label: "Browse projects", href: "/projects/" },
      { label: "About my background", href: "/about/" },
    ],
  },
  {
    title: "How I actually work",
    body:
      "I build in public, iterate on real projects, and document what changed. That means the website you get is understandable, not just delivered and abandoned. Clear scope and visible proof come first.",
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "Projects index", href: "/projects/" },
    ],
  },
  {
    title: "Full-stack and front-end reps",
    body:
      "From React and Gatsby builds to API-backed features and deployment cleanup, the projects I ship cover the kinds of problems Pecatonica small businesses run into once a site has to keep working.",
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "About page", href: "/about/" },
    ],
  },
];

const PecatonicaWebDeveloperPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Web Developer in Pecatonica, Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local web development"
      titleAs="h1"
      title={
        <>
          <strong>Web developer & website design</strong> in Pecatonica, Illinois
        </>
      }
      description={
        <>
          <p>
            Pecatonica is a small village in Winnebago County, sitting along the Pecatonica River about
            15 minutes from where I am based in Durand. If you run a local business here and your
            website is missing, broken, or just not bringing in customers, that is exactly the kind of
            work I do.
          </p>
          <p>
            I am a solo web developer, not an agency. The work I am best suited for is focused website
            design, website repair, local SEO, and small business websites for rural communities like
            Pecatonica where a clear, honest online presence matters more than a flashy one.
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
          <h2 className="feature-card__title">Why a local developer makes sense here</h2>
          <p className="feature-card__body">
            Pecatonica businesses do not need a Chicago agency. They need someone who understands rural
            Winnebago County, can meet or talk remotely without friction, and builds sites that local
            customers can actually find and use. Being 15 minutes away means I understand the community
            context without pretending to be something I am not.
          </p>
          <p className="feature-card__body">
            Most of the work happens remotely, but the advantage of a nearby developer is that the
            communication is straightforward and the scope stays honest.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Services"
      title="Website design, repair, SEO, and small business sites for Pecatonica"
      description={
        <p>
          These are the four things Pecatonica businesses ask for most often. Each one is a real,
          focused scope rather than a vague promise.
        </p>
      }
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Website design</h3>
          <p className="feature-card__body">
            New websites built from scratch for Pecatonica businesses that need a real online presence.
            Responsive layouts, clear service pages, and contact flows that make it obvious what you do
            and how to reach you.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Website help & repair</h3>
          <p className="feature-card__body">
            If your current site is broken, slow, or nobody can update it anymore, I can diagnose the
            problem and fix it. That includes React, Gatsby, and static site cleanup, content updates,
            and deployment fixes.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">SEO services</h3>
          <p className="feature-card__body">
            Local SEO targeting Pecatonica and Winnebago County searches so people nearby actually find
            your business. That means page structure, content clarity, and metadata that matches how
            local customers search.
          </p>
        </Card>
      </div>
      <div className="grid-two">
        <Card>
          <h3 className="feature-card__title">Small business websites</h3>
          <p className="feature-card__body">
            Pecatonica has real local businesses, from shops along Main Street to service providers
            working across the rural area. A small business website should be maintainable, fast, and
            clear, not a recurring expense that never gets updated. I build sites you can actually live
            with.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Nearby communities I also serve</h3>
          <p className="feature-card__body">
            I am based in Durand and work across Northwest Illinois. If you are in a nearby community,
            I have dedicated pages for{" "}
            <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link> and{" "}
            <Link to="/web-developer-rockford-illinois/">Rockford</Link> as well. The scope and honesty
            are the same everywhere.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Proof"
      title="Projects you can actually review"
      description={
        <p>
          The point is not to claim I do everything. The point is to show current proof that matches
          what Pecatonica businesses care about: shipped pages, clearer UX, deployment follow-through,
          and honest notes about what is and is not a good fit.
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
            Send me the basic details: what the site needs to do, what is currently broken or missing,
            and what deadline matters. I will answer plainly and tell you whether the work is a good fit
            for Pecatonica and the surrounding area.
          </p>
          <p>
            The best starting point is email through the <Link to="/contact/">contact page</Link>. If
            you want to vet the work first, start with the{" "}
            <Link to="/projects/">project pages</Link> or the <Link to="/about/">about page</Link>.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Common questions</h3>
          <p className="feature-card__body">
            I broke the common fit, scope, and process questions into a separate FAQ so the answers are
            easier to skim before you reach out.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
              Read the FAQ
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Other local pages</h3>
          <p className="feature-card__body">
            If you are closer to Durand or Rockford, I have dedicated pages covering the same services
            for those communities. Same developer, same honest scope.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/web-developer-durand-davis-illinois/">
              Durand & Davis page
            </Link>
            <Link data-variant="ghost" to="/web-developer-rockford-illinois/">
              Rockford page
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

export default PecatonicaWebDeveloperPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web development services for Pecatonica, Illinois",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Website repair",
        "SEO services",
        "Small business websites",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
      },
      areaServed: [
        { "@type": "City", name: "Pecatonica, Illinois" },
        { "@type": "AdministrativeArea", name: "Winnebago County, Illinois" },
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
        { "@type": "City", name: "Pecatonica, Illinois" },
        { "@type": "AdministrativeArea", name: "Winnebago County, Illinois" },
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
        { name: "Web Developer in Pecatonica, Illinois", path: pathname },
      ]}
    />
  );
};
