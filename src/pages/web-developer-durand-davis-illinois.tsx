import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-durand-davis-illinois/";
const pageTitle = "Web Developer in Durand, Davis, and Northwest Illinois";
const pageDescription =
  "Web developer for Durand, Davis, and Northwest Illinois — websites, front-end interfaces, and full-stack projects with remote collaboration available.";

const serviceBullets = [
  "Small-business and portfolio websites that are easier to update and maintain.",
  "Website design and redesign — landing pages, service pages, and contact flows that explain the offer clearly.",
  "Website help and repair — fixing broken layouts, slow pages, outdated content, and deployment issues on existing sites.",
  "SEO services — local search optimization, Google Business Profile setup, schema markup, and content restructuring so people in Durand, Davis, and Northwest Illinois can actually find you.",
  "React, Next.js, Gatsby, and front-end cleanup work when an existing site needs fixing.",
  "Simple API-backed features, content updates, deployment cleanup, and SEO-focused restructuring.",
  "Google Business Profile setup and optimization — so you show up in local map results when people search for Durand and Davis businesses.",
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
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
      titleAs="h1"
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
          <a href="tel:+16502651193" data-variant="ghost" className="link">
            (650) 265-1193
          </a>
          <Link data-variant="primary" to="/contact/">
            Free consultation
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
          <p className="feature-card__body">
            Every site I build loads in under 2 seconds on mobile — faster than most sites in Durand and Davis. I test with Google PageSpeed Insights before launch.
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
      eyebrow="Also serving"
      title="Web development across Northwest Illinois"
      description={
        <p>
          I also serve nearby communities with the same approach — honest scope, shipped proof, and
          clear communication. If you are closer to one of these areas, there is a dedicated page with
          local context.
        </p>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Rockford, Illinois</h3>
          <p className="feature-card__body">
            Website design, SEO services, and small business web development for Rockford and the
            surrounding metro area.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/web-developer-rockford-illinois/">
              Rockford web developer page
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Freeport, Illinois</h3>
          <p className="feature-card__body">
            Website help, design, and local SEO for small businesses in Freeport and Stephenson County.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/web-developer-freeport-illinois/">
              Freeport web developer page
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Pecatonica &amp; Winnebago</h3>
          <p className="feature-card__body">
            Small-town web development for businesses in Pecatonica, Winnebago, and rural Winnebago County.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/web-developer-pecatonica-illinois/">
              Pecatonica web developer page
            </Link>
            <Link data-variant="ghost" to="/web-developer-winnebago-illinois/">
              Winnebago web developer page
            </Link>
          </div>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Process"
      title="How it works — from first call to live site"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Free consultation</h3>
          <p className="feature-card__body">
            We talk about your business, what the site needs to do, and what's currently broken. I tell you honestly whether I'm the right fit. No pressure, no sales pitch.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Design and build</h3>
          <p className="feature-card__body">
            I build a fast, mobile-ready site built for your business. You see real progress, not radio silence. Two rounds of revisions included so the final site matches what you actually want.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Launch and support</h3>
          <p className="feature-card__body">
            I launch your site, set up hosting, and handle updates. You get 24-hour response times and a 30-day warranty after launch. Monthly support is month-to-month — no contract trap.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Industries"
      title="Industries I work with"
      description={
        <p>
          Small businesses across Durand and Davis and Northwest Illinois — if you need a website that works on mobile and shows up on Google, I can help.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          <li>Automotive repair and dealerships</li>
          <li>Landscaping and lawn care</li>
          <li>Home services (HVAC, plumbing, roofing)</li>
          <li>Restaurants and food trucks</li>
          <li>Beauty and fitness</li>
          <li>Real estate and property management</li>
          <li>Consulting and professional services</li>
          <li>Nonprofits and community organizations</li>
          <li>Retail and e-commerce</li>
          <li>Health and dental</li>
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="Why it matters"
      title="The hard truth about your website"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">75% of consumers judge your business by its website alone</h3>
          <p className="feature-card__body">
            Source: Stanford Web Credibility Study
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">53% of visitors leave a site that takes over 3 seconds to load</h3>
          <p className="feature-card__body">
            Source: Google PageSpeed research
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">46% of Google searches are looking for a local business</h3>
          <p className="feature-card__body">
            Source: Google local search data
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Evidence & proof"
      title="Work samples and case studies"
      description={
        <p>
          Don't take my word for it — here's the actual work behind the claims above.
        </p>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Project case studies</h3>
          <p className="feature-card__body">
            See <Link to="/projects/">completed project case studies</Link> with code, screenshots, and honest notes on what worked and what didn't.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Web development FAQ</h3>
          <p className="feature-card__body">
            Read the <Link to="/northwest-illinois-web-development-faq/">Northwest Illinois web development FAQ</Link> for process details, timelines, and pricing answers.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Pricing breakdown</h3>
          <p className="feature-card__body">
            Transparent <Link to="/pricing/">pricing tiers</Link> starting at $447 with no hidden fees or contracts.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Small business checklist</h3>
          <p className="feature-card__body">
            Download the <Link to="/small-business-website-checklist-northwest-illinois/">small business website checklist</Link> to see exactly what a complete site needs.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about web development in Durand and Davis"
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">How much does a website cost?</h3>
          <p className="feature-card__body">
            Starter sites begin at $447 for the build and $37/month for hosting and support. See the full pricing breakdown on the pricing page.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">How long does it take?</h3>
          <p className="feature-card__body">
            Starter sites typically take 14 days. Larger projects run 3-4 weeks. I'll give you a specific timeline during the free consultation.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Do you offer a guarantee?</h3>
          <p className="feature-card__body">
            Yes. Every build includes a 24-hour response time guarantee and a 30-day warranty after launch. If you're not happy after the first round of revisions, you get your deposit back.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Do I own my website?</h3>
          <p className="feature-card__body">
            Yes. The code, content, and domain are all yours. If you ever want to leave, I'll help you migrate at no extra charge.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Can you fix my existing website?</h3>
          <p className="feature-card__body">
            Yes. Site refreshes start at $597, or I can work hourly at $65/hour with a 1-hour minimum.
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
            Send me the basic details: what the site or page needs to do, what is currently broken or
            confusing, and what deadline matters. I will answer plainly and tell you whether the work
            is a good fit.
          </p>
          <p>
            The best starting point is still email through the <Link to="/contact/">contact page</Link>.
            If you want to vet the work first, start with the <Link to="/projects/">project pages</Link>{" "}
            or the <Link to="/">about page</Link>.
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
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Pricing</h3>
          <p className="feature-card__body">
            Transparent pricing for every budget. Starter sites from $447, growth sites from $797, premium from $1,497.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/pricing/">
              See pricing
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Get in touch</h3>
          <p className="feature-card__body">
            Ready to talk about your project? Send me the details and I'll tell you honestly whether I'm the right fit.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Get a free consultation
            </Link>
          </div>
        </Card>
      </div>
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">
          Get a free consultation
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
        telephone: "+16502651193",
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
      telephone: "+16502651193",
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
