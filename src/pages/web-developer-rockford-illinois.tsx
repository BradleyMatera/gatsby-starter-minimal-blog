import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-rockford-illinois/";
const pageTitle = "Web Developer & Website Design in Rockford, Illinois";
const pageDescription =
  "Website design and web developer for Rockford, Illinois small businesses — SEO services, site repair, and custom builds from a developer 25 minutes away in Durand.";

const serviceBullets = [
  "Website design for Rockford small businesses that need a real online presence, not a template dump.",
  "Website help and repair when your current site is broken, slow, or abandoned by whoever built it.",
  "SEO services focused on local Rockford search visibility — content structure, metadata, and technical cleanup.",
  "Small business websites built to be maintainable, fast, and honest about what they cost to keep running.",
];

const proofCards = [
  {
    title: "Projects you can review",
    body:
      "Instead of vague portfolio claims, the work is public. Interactive apps, content systems, and front-end builds are all on the projects page with notes on what each one does and how it was built.",
    links: [
      { label: "Browse projects", href: "/projects/" },
      { label: "About my background", href: "/about/" },
    ],
  },
  {
    title: "Roles and capabilities",
    body:
      "The roles page breaks down what I actually do day to day — front-end development, content restructuring, deployment, SEO-focused work — so you can match it against what your Rockford business needs.",
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "Projects index", href: "/projects/" },
    ],
  },
  {
    title: "Built in public",
    body:
      "This site is the proof. I rewrite, restructure, and document it continuously so the process is visible. That is the opposite of how most Rockford web agencies operate, and it is the point.",
    links: [
      { label: "About page", href: "/about/" },
      { label: "Contact Bradley", href: "/contact/" },
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
          Web Developer in Rockford, Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local web development"
      titleAs="h1"
      title={
        <>
          <strong>Web developer and website design</strong> in Rockford, Illinois
        </>
      }
      description={
        <>
          <p>
            Rockford is the largest city in Illinois outside the Chicago metro, and it has a real mix
            of small businesses, manufacturers, service companies, and growing tech-adjacent shops
            that need a web presence that actually works. If you searched for a web developer in
            Rockford, this page explains what I do and why I might be a better fit than a larger
            agency downtown.
          </p>
          <p>
            I am based in Durand, Illinois — about 25 minutes west of Rockford. That is close enough
            to meet in person when it matters and far enough that I am not carrying the overhead of a
            Rockford office into your bill. I build, repair, and optimize websites for small
            businesses, and I document the work so you can see what you are paying for.
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
            Most of my experience comes from building in public, shipping projects to GitHub, and
            documenting what changed and why. That makes me a good fit for Rockford businesses that
            want a website they can understand and maintain, not a black-box deliverable that breaks
            the moment the original developer disappears.
          </p>
          <p className="feature-card__body">
            Rockford projects can be handled mostly remotely, with in-person meetings when the scope
            warrants it. The drive from Durand is short, and the work itself does not change based on
            where I sit — clear scope, visible proof, and a site that loads fast and ranks locally.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Services"
      title="Website design, repair, SEO, and small business builds for Rockford"
      description={
        <>
          <p>
            Rockford businesses do not all need the same thing. Some need a brand-new site, some need
            the old one fixed, and some just need to show up when someone searches for what they do.
            Here is the honest breakdown of each.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Website design</h3>
          <p className="feature-card__body">
            Custom website design for Rockford businesses that want something better than a
            cookie-cutter template. Responsive layouts, clear service pages, contact flows that
            actually convert, and copy that explains what you do without sounding like every other
            site in your industry. Built in React, Gatsby, or Next.js depending on what fits.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Website help and repair</h3>
          <p className="feature-card__body">
            If your current Rockford business website is broken, slow, was abandoned by the original
            developer, or never quite finished, that is some of the most common work I do. Front-end
            cleanup, dependency updates, deployment fixes, content restructuring, and making a site
            that was left half-done actually usable again.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">SEO services</h3>
          <p className="feature-card__body">
            Local SEO for Rockford means showing up when someone searches "website design Rockford"
            or the service you actually provide. That is content structure, metadata, page speed,
            semantic HTML, and local search signals — not a monthly retainer for vague reports. I do
            the technical work and tell you what moved and why.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Small business websites</h3>
          <p className="feature-card__body">
            Rockford has a strong small business community, from machine shops to service companies
            to independent retailers. Those businesses need websites that are affordable to build,
            cheap to maintain, and honest about what they cost over time. I build with that in mind —
            no bloated CMS, no ongoing license fees you did not agree to.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Why local"
      title="Why choose a local developer over a remote freelancer or big agency"
      description={
        <>
          <p>
            You can hire anyone on the internet. So why does local still matter for web development
            in Rockford? Because the person building your site should understand the market, the
            customer base, and the difference between a Rockford business and a Chicago one.
          </p>
        </>
      }
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Knows the Rockford market</h3>
          <p className="feature-card__body">
            Rockford is not Chicago. The customer base, the price sensitivity, and the competitive
            landscape are different. A developer who lives in the region understands that a Rockford
            manufacturer's site needs different language than a downtown Chicago startup's site.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Available in person</h3>
          <p className="feature-card__body">
            Sometimes a whiteboard session is worth more than ten emails. Being 25 minutes from
            Rockford means I can show up when the project needs it, without billing you for a flight
            or pretending a Zoom call is the same as sitting in the same room.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Accountable to the region</h3>
          <p className="feature-card__body">
            I am not going to disappear into a different time zone. My reputation in Northwest
            Illinois is tied to the work I do here. If a Rockford client has a problem, it gets fixed
            because I am still local and still reachable — not a ticket in a queue.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Proof"
      title="Projects you can actually review"
      description={
        <p>
          The point is not to claim I do everything. The point is to show current, public proof that
          matches what Rockford businesses actually need: shipped sites, clean front-end work,
          deployment follow-through, and honest notes about what each project does and does not do.
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
      eyebrow="Comparison"
      title="How this compares to a Rockford web agency"
      description={
        <>
          <p>
            Rockford has several established web design agencies, and some of them do good work. This
            is not about tearing them down — it is about being honest about the difference so you can
            pick what fits your project.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Smaller and more personal</h3>
          <p className="feature-card__body">
            When you hire me you are hiring the person who does the work. No account manager
            relaying messages to a developer you never meet, no rotating team members between kickoff
            and launch. The scope, the code, and the communication all come from one place.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">More transparent on cost</h3>
          <p className="feature-card__body">
            Agencies often bundle hosting, maintenance, and licensing into opaque monthly fees that
            add up over years. I separate the build cost from the ongoing cost so you know what the
            site costs to make and what it costs to keep — and you can leave whenever you want.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">No sales pipeline</h3>
          <p className="feature-card__body">
            Larger agencies have a sales process designed to close deals, which means proposals full
            of buzzwords and scope that quietly expands. I skip that. You tell me what you need, I
            tell you whether I can do it, what it costs, and how long it takes.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">When an agency is the right call</h3>
          <p className="feature-card__body">
            If you need a large e-commerce platform, a dedicated marketing team running campaigns, or
            a brand identity overhaul with a creative director, a Rockford agency may genuinely be the
            better fit. I will tell you that directly if it is true for your project.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Next step"
      title="If you found this page by searching locally"
      description={
        <>
          <p>
            Send me the basics: what your Rockford business needs the site to do, what is currently
            broken or missing, and what timeline matters. I will answer plainly and tell you whether
            the work is a good fit — or whether you are better off with someone else.
          </p>
          <p>
            The best starting point is email through the <Link to="/contact/">contact page</Link>.
            If you want to vet the work first, start with the <Link to="/projects/">project pages</Link>{" "}
            or the <Link to="/about/">about page</Link>. You can also read the{" "}
            <Link to="/northwest-illinois-web-development-faq/">local development FAQ</Link> for
            common questions about scope, process, and pricing.
          </p>
          <p>
            I also maintain local pages for nearby areas:{" "}
            <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link> and{" "}
            <Link to="/web-developer-freeport-illinois/">Freeport</Link>. If you are in the broader
            Northwest Illinois region, the same work applies.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Common questions</h3>
          <p className="feature-card__body">
            I broke the common fit, scope, and process questions into a separate FAQ so the answers
            are easier to skim before you reach out.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
              Read the FAQ
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Website help and repair</h3>
          <p className="feature-card__body">
            If your Rockford site is already live but broken, slow, or unfinished, the website help
            page explains the repair and cleanup process without turning it into agency copy.
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
      name: "Web development and website design services for Rockford, Illinois",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Website repair",
        "SEO services",
        "Small business websites",
        "Front-end development",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
      },
      areaServed: [
        { "@type": "City", name: "Rockford, Illinois" },
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
        { "@type": "City", name: "Rockford, Illinois" },
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
        { name: "Web Developer in Rockford, Illinois", path: pathname },
      ]}
    />
  );
};
