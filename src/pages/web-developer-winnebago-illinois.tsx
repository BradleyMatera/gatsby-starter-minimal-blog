import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-winnebago-illinois/";
const pageTitle = "Web Developer & Website Design in Winnebago, Illinois";
const pageDescription =
  "Web developer near Winnebago, Illinois providing website design, SEO, and small business websites for local businesses in Winnebago County.";

const serviceBullets = [
  "Website design for Winnebago small businesses that need a professional online presence without agency pricing.",
  "Website help and repair for existing sites that are broken, outdated, or stuck on a platform nobody can update.",
  "SEO services focused on local Winnebago and Winnebago County searches so nearby customers find you first.",
  "Small business websites built to be fast, maintainable, and clear about what you offer and how to reach you.",
  "Google Business Profile setup and optimization — so you show up in local map results when people search for Winnebago businesses.",
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
];

const proofCards = [
  {
    title: "Projects you can review",
    body:
      "The work is public, not hidden behind vague claims. Browse shipped projects, case studies, and documented builds that show exactly how I approach website design and front-end development.",
    links: [
      { label: "Browse projects", href: "/projects/" },
      { label: "About my background", href: "/about/" },
    ],
  },
  {
    title: "How I actually work",
    body:
      "I build in public, iterate on real projects, and write up what changed. That means the website you get is something you can understand and maintain, not a black box handed off and forgotten.",
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "Projects index", href: "/projects/" },
    ],
  },
  {
    title: "Front-end and full-stack reps",
    body:
      "From React and Gatsby builds to API-backed features and deployment cleanup, the projects I ship cover the kinds of problems Winnebago small businesses run into once a site has to keep working in production.",
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "About page", href: "/about/" },
    ],
  },
];

const WinnebagoWebDeveloperPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Web Developer in Winnebago, Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local web development"
      titleAs="h1"
      title={
        <>
          <strong>Web developer & website design</strong> in Winnebago, Illinois
        </>
      }
      description={
        <>
          <p>
            Winnebago is a small village in Winnebago County, just west of Rockford but very much its
            own community. I am based in Durand, about 20 minutes away, and I work with local
            businesses that need a real website rather than a social media page and a prayer.
          </p>
          <p>
            I am a solo developer, not an agency. The work I do best is focused website design, website
            repair, local SEO, and small business websites for rural communities like Winnebago where
            being found online by nearby customers is the whole point.
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
          <h2 className="feature-card__title">Being near Rockford but not Rockford</h2>
          <p className="feature-card__body">
            Winnebago sits close enough to Rockford that some businesses get lumped into Rockford
            searches, but it is a separate village with its own identity and customer base. A website
            that only targets Rockford misses the people searching specifically for Winnebago. I build
            sites and SEO that account for both layers.
          </p>
          <p className="feature-card__body">
            Being 20 minutes away in Durand means I understand the rural Winnebago County context
            without pretending to be a big-city agency. The communication is direct and the scope stays
            honest.
          </p>
          <p className="feature-card__body">
            Every site I build loads in under 2 seconds on mobile — faster than most sites in Winnebago. I test with Google PageSpeed Insights before launch.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Services"
      title="Website design, repair, SEO, and small business sites for Winnebago"
      description={
        <p>
          These are the four services Winnebago businesses ask for most. Each is a real, focused scope
          rather than a broad promise.
        </p>
      }
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Website design</h3>
          <p className="feature-card__body">
            New websites built for Winnebago businesses that need a genuine online presence. Responsive
            layouts, clear service pages, and contact flows that make it obvious what you do and how to
            reach you, without overcomplicating things.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Website help & repair</h3>
          <p className="feature-card__body">
            If your current site is broken, slow, or stuck on a platform nobody can update, I can
            diagnose and fix it. That includes React, Gatsby, and static site cleanup, content updates,
            and deployment fixes.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">SEO services</h3>
          <p className="feature-card__body">
            Local SEO targeting Winnebago and the broader Winnebago County area so nearby customers
            find your business. Page structure, content clarity, and metadata that match how local
            people actually search.
          </p>
        </Card>
      </div>
      <div className="grid-two">
        <Card>
          <h3 className="feature-card__title">Small business websites</h3>
          <p className="feature-card__body">
            Winnebago has small businesses that serve both the village and the surrounding rural area.
            A small business website should be maintainable, fast, and honest about what you offer, not
            a recurring expense that never gets touched. I build sites you can actually live with and
            update.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Nearby communities I also serve</h3>
          <p className="feature-card__body">
            I am based in Durand and work across Northwest Illinois. If you are closer to Durand or
            Rockford, I have dedicated pages for{" "}
            <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link> and{" "}
            <Link to="/web-developer-rockford-illinois/">Rockford</Link>. Same developer, same honest
            scope everywhere.
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
          what Winnebago businesses care about: shipped pages, clearer UX, deployment follow-through,
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
          Small businesses across Winnebago and Northwest Illinois — if you need a website that works on mobile and shows up on Google, I can help.
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
      eyebrow="FAQ"
      title="Common questions about web development in Winnebago"
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
            Send me the basic details: what the site needs to do, what is currently broken or missing,
            and what deadline matters. I will answer plainly and tell you whether the work is a good fit
            for Winnebago and the surrounding area.
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

export default WinnebagoWebDeveloperPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Web development services for Winnebago, Illinois",
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
        telephone: "+16502651193",
      },
      areaServed: [
        { "@type": "City", name: "Winnebago, Illinois" },
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
      telephone: "+16502651193",
      areaServed: [
        { "@type": "City", name: "Winnebago, Illinois" },
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
        { name: "Web Developer in Winnebago, Illinois", path: pathname },
      ]}
    />
  );
};
