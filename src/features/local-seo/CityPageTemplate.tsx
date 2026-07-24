import * as React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Section } from "../../ui";
import { UtensilsIcon, LeafIcon, GearIcon, CarIcon, HouseIcon, ScissorsIcon } from "../../site/icons";

export type CityPageConfig = {
  city: string;
  state: string;
  stateAbbrev: string;
  slug: string;
  pageTitle: string;
  pageDescription: string;
  /** Distance from Durand, e.g. "25 minutes" */
  distance: string;
  /** Direction from Durand, e.g. "west", "east", "north" */
  direction: string;
  /** Key context about the city — population, economy, etc. */
  cityContext: string;
  /** What makes this city's businesses unique */
  marketContext: string;
  /** All city slugs for cross-linking (including this one) */
  allCitySlugs: Array<{ slug: string; label: string }>;
  /** County name */
  county: string;
};

const serviceBullets = (city: string) => [
  `Website design for ${city} small businesses that need a real online presence, not a template dump.`,
  "Website help and repair when your current site is broken, slow, or abandoned by whoever built it.",
  `SEO services focused on local ${city} search visibility — content structure, metadata, and technical cleanup.`,
  "Small business websites built to be maintainable, fast, and honest about what they cost to keep running.",
  `Google Business Profile setup and optimization — so you show up in local map results when people search for ${city} businesses.`,
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
];

const proofCards = (city: string) => [
  {
    title: "Projects you can review",
    body: "Instead of vague portfolio claims, the work is public. Interactive apps, content systems, and front-end builds are all on the projects page with notes on what each one does and how it was built.",
    links: [
      { label: "Browse projects", href: "/projects/" },
      { label: "About my background", href: "/about/" },
    ],
  },
  {
    title: "Roles and capabilities",
    body: `The roles page breaks down what I actually do day to day — front-end development, content restructuring, deployment, SEO-focused work — so you can match it against what your ${city} business needs.`,
    links: [
      { label: "Roles and capabilities", href: "/roles/" },
      { label: "Projects index", href: "/projects/" },
    ],
  },
  {
    title: "Built in public",
    body: `This site is the proof. I rewrite, restructure, and document it continuously so the process is visible. That is the opposite of how most ${city} web agencies operate, and it is the point.`,
    links: [
      { label: "About page", href: "/about/" },
      { label: "Get a free consultation", href: "/contact/" },
    ],
  },
];

export const createCityPage = (config: CityPageConfig) => {
  const { city, state, stateAbbrev, slug, pageTitle, pageDescription, distance, direction, cityContext, marketContext, allCitySlugs, county } = config;
  const pathname = `/${slug}/`;
  const otherCities = allCitySlugs.filter((c) => c.slug !== slug);

  const CityPage: React.FC = () => (
    <Layout>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumbs__item" aria-current="page">
            Web Developer in {city}, {stateAbbrev}
          </li>
        </ol>
      </nav>

      <Section
        eyebrow="Local web development"
        titleAs="h1"
        title={
          <>
            <strong>Web developer and website design</strong> in {city}, {state}
          </>
        }
        description={
          <>
            <p>
              {cityContext} If you searched for a web developer in {city}, this page explains what I do and why I might be a better fit than a larger agency downtown.
            </p>
            <p>
              I am based in Durand, Illinois — about {distance} {direction} of {city}. That is close enough to meet in person when it matters and far enough that I am not carrying the overhead of a {city} office into your bill. I build, repair, and optimize websites for small businesses, and I document the work so you can see what you are paying for.
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
              {serviceBullets(city).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Card>
          <Card variant="outline">
            <h2 className="feature-card__title">How I work</h2>
            <p className="feature-card__body">
              Most of my experience comes from building in public, shipping projects to GitHub, and documenting what changed and why. That makes me a good fit for {city} businesses that want a website they can understand and maintain, not a black-box deliverable that breaks the moment the original developer disappears.
            </p>
            <p className="feature-card__body">
              {city} projects can be handled mostly remotely, with in-person meetings when the scope warrants it. The drive from Durand is short, and the work itself does not change based on where I sit — clear scope, visible proof, and a site that loads fast and ranks locally.
            </p>
            <p className="feature-card__body">
              Every site I build loads in under 2 seconds on mobile — faster than most sites in {city}. I test with Google PageSpeed Insights before launch.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Services"
        title={`Website design, repair, SEO, and small business builds for ${city}`}
        description={
          <p>
            {city} businesses do not all need the same thing. Some need a brand-new site, some need the old one fixed, and some just need to show up when someone searches for what they do. Here is the honest breakdown of each.
          </p>
        }
      >
        <div className="grid-two">
          <Card variant="outline">
            <h3 className="feature-card__title">Website design</h3>
            <p className="feature-card__body">
              Custom website design for {city} businesses that want something better than a cookie-cutter template. Responsive layouts, clear service pages, contact flows that actually convert, and copy that explains what you do without sounding like every other site in your industry. Built in React, Gatsby, or Next.js depending on what fits.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">Website help and repair</h3>
            <p className="feature-card__body">
              If your current {city} business website is broken, slow, was abandoned by the original developer, or never quite finished, that is some of the most common work I do. Front-end cleanup, dependency updates, deployment fixes, content restructuring, and making a site that was left half-done actually usable again.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">SEO services</h3>
            <p className="feature-card__body">
              Local SEO for {city} means showing up when someone searches "website design {city}" or the service you actually provide. That is content structure, metadata, page speed, semantic HTML, and local search signals — not a monthly retainer for vague reports. I do the technical work and tell you what moved and why.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">Small business websites</h3>
            <p className="feature-card__body">
              {marketContext} Those businesses need websites that are affordable to build, cheap to maintain, and honest about what they cost over time. I build with that in mind — no bloated CMS, no ongoing license fees you did not agree to.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Why local"
        title={`Why choose a local developer over a remote freelancer or big agency`}
        description={
          <p>
            You can hire anyone on the internet. So why does local still matter for web development in {city}? Because the person building your site should understand the market, the customer base, and the difference between a {city} business and a Chicago one.
          </p>
        }
      >
        <div className="grid-three">
          <Card>
            <h3 className="feature-card__title">Knows the {city} market</h3>
            <p className="feature-card__body">
              {city} is not Chicago. The customer base, the price sensitivity, and the competitive landscape are different. A developer who lives in the region understands that a {city} business's site needs different language than a downtown Chicago startup's site.
            </p>
          </Card>
          <Card>
            <h3 className="feature-card__title">Available in person</h3>
            <p className="feature-card__body">
              Sometimes a whiteboard session is worth more than ten emails. Being {distance} from {city} means I can show up when the project needs it, without billing you for a flight or pretending a Zoom call is the same as sitting in the same room.
            </p>
          </Card>
          <Card>
            <h3 className="feature-card__title">Accountable to the region</h3>
            <p className="feature-card__body">
              I am not going to disappear into a different time zone. My reputation in the region is tied to the work I do here. If a {city} client has a problem, it gets fixed because I am still local and still reachable — not a ticket in a queue.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Proof"
        title="Projects you can actually review"
        description={
          <p>
            The point is not to claim I do everything. The point is to show current, public proof that matches what {city} businesses actually need: shipped sites, clean front-end work, deployment follow-through, and honest notes about what each project does and does not do.
          </p>
        }
      >
        <div className="grid-three">
          {proofCards(city).map((card) => (
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
        title={`How this compares to a ${city} web agency`}
        description={
          <p>
            {city} has several established web design options, and some of them do good work. This is not about tearing them down — it is about being honest about the difference so you can pick what fits your project.
          </p>
        }
      >
        <div className="grid-two">
          <Card variant="outline">
            <h3 className="feature-card__title">Smaller and more personal</h3>
            <p className="feature-card__body">
              When you hire me you are hiring the person who does the work. No account manager relaying messages to a developer you never meet, no rotating team members between kickoff and launch. The scope, the code, and the communication all come from one place.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">More transparent on cost</h3>
            <p className="feature-card__body">
              Agencies often bundle hosting, maintenance, and licensing into opaque monthly fees that add up over years. I separate the build cost from the ongoing cost so you know what the site costs to make and what it costs to keep — and you can leave whenever you want.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">No sales pipeline</h3>
            <p className="feature-card__body">
              Larger agencies have a sales process designed to close deals, which means proposals full of buzzwords and scope that quietly expands. I skip that. You tell me what you need, I tell you whether I can do it, what it costs, and how long it takes.
            </p>
          </Card>
          <Card variant="outline">
            <h3 className="feature-card__title">When an agency is the right call</h3>
            <p className="feature-card__body">
              If you need a large e-commerce platform, a dedicated marketing team running campaigns, or a brand identity overhaul with a creative director, a larger agency may genuinely be the better fit. I will tell you that directly if it is true for your project.
            </p>
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
            Small businesses across {city} and the surrounding region — if you need a website that works on mobile and shows up on Google, I can help.
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
            <li>Manufacturing and industrial services</li>
            <li>Construction and contractors</li>
          </ul>
        </Card>
      </Section>

      <Section
        eyebrow="See examples"
        title={`Live demo websites for ${city} businesses`}
        description={
          <p>
            Don't just take my word for it — see full, working demo websites built for different
            industries. Each one shows what your {city} business site could look like, complete with
            services, reviews, contact forms, and mobile-responsive design.
          </p>
        }
      >
        <div className="grid-three">
          <Card variant="outline">
            <div className="feature-card__icon"><UtensilsIcon size={24} /></div>
            <h3 className="feature-card__title">Restaurant Demo</h3>
            <p className="feature-card__body">
              Full restaurant website with menu, reservations, hours, photo gallery, and customer reviews.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/restaurant/">View restaurant demo</Link>
            </div>
          </Card>
          <Card variant="outline">
            <div className="feature-card__icon"><LeafIcon size={24} /></div>
            <h3 className="feature-card__title">Landscaping Demo</h3>
            <p className="feature-card__body">
              Landscaping company site with service packages, seasonal tips, gallery, and free quote form.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/landscaping/">View landscaping demo</Link>
            </div>
          </Card>
          <Card variant="outline">
            <div className="feature-card__icon"><GearIcon size={24} /></div>
            <h3 className="feature-card__title">HVAC Demo</h3>
            <p className="feature-card__body">
              HVAC company with emergency service, maintenance plans, team bios, and financing info.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/hvac/">View HVAC demo</Link>
            </div>
          </Card>
          <Card variant="outline">
            <div className="feature-card__icon"><CarIcon size={24} /></div>
            <h3 className="feature-card__title">Auto Repair Demo</h3>
            <p className="feature-card__body">
              Auto shop with service menu, online booking, tire lookup, and mechanic credentials.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/auto-repair/">View auto repair demo</Link>
            </div>
          </Card>
          <Card variant="outline">
            <div className="feature-card__icon"><HouseIcon size={24} /></div>
            <h3 className="feature-card__title">Real Estate Demo</h3>
            <p className="feature-card__body">
              Real estate office with featured listings, agent profiles, market reports, and neighborhood guides.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/real-estate/">View real estate demo</Link>
            </div>
          </Card>
          <Card variant="outline">
            <div className="feature-card__icon"><ScissorsIcon size={24} /></div>
            <h3 className="feature-card__title">Beauty Salon Demo</h3>
            <p className="feature-card__body">
              Hair and beauty salon with service menu, stylist team, online booking, and gallery.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/demos/beauty-salon/">View salon demo</Link>
            </div>
          </Card>
        </div>
        <div className="card-actions" style={{ marginTop: "1.5rem" }}>
          <Link data-variant="primary" to="/demos/">
            View all demos
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Why it matters"
        title="The hard truth about your website"
      >
        <div className="grid-three">
          <Card>
            <h3 className="feature-card__title">75% of consumers judge your business by its website alone</h3>
            <p className="feature-card__body">Source: Stanford Web Credibility Study</p>
          </Card>
          <Card>
            <h3 className="feature-card__title">53% of visitors leave a site that takes over 3 seconds to load</h3>
            <p className="feature-card__body">Source: Google PageSpeed research</p>
          </Card>
          <Card>
            <h3 className="feature-card__title">46% of Google searches are looking for a local business</h3>
            <p className="feature-card__body">Source: Google local search data</p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Evidence & proof"
        title="Work samples and case studies"
        description={<p>Don't take my word for it — here's the actual work behind the claims above.</p>}
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
              Read the <Link to="/northwest-illinois-web-development-faq/">web development FAQ</Link> for process details, timelines, and pricing answers.
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
        title={`Common questions about web development in ${city}`}
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
          <Card variant="outline">
            <h3 className="feature-card__title">Do you work with businesses in {county}?</h3>
            <p className="feature-card__body">
              Yes. I serve businesses throughout {county} and the broader Northwest Illinois and Southern Wisconsin region. The drive to {city} is {distance}, so in-person meetings are easy to arrange when needed.
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
              Send me the basics: what your {city} business needs the site to do, what is currently broken or missing, and what timeline matters. I will answer plainly and tell you whether the work is a good fit — or whether you are better off with someone else.
            </p>
            <p>
              The best starting point is email through the <Link to="/contact/">contact page</Link>. If you want to vet the work first, start with the <Link to="/projects/">project pages</Link> or the <Link to="/about/">about page</Link>. You can also read the <Link to="/northwest-illinois-web-development-faq/">local development FAQ</Link> for common questions about scope, process, and pricing.
            </p>
            <p>
              I also maintain local pages for nearby areas:{" "}
              {otherCities.map((c, i) => (
                <React.Fragment key={c.slug}>
                  <Link to={`/${c.slug}/`}>{c.label}</Link>
                  {i < otherCities.length - 2 ? ", " : i === otherCities.length - 2 ? ", and " : ""}
                </React.Fragment>
              ))}
              {" "}. If you are in the broader region, the same work applies.
            </p>
          </>
        }
      >
        <div className="grid-two">
          <Card variant="outline">
            <h3 className="feature-card__title">Common questions</h3>
            <p className="feature-card__body">
              I broke the common fit, scope, and process questions into a separate FAQ so the answers are easier to skim before you reach out.
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
              If your {city} site is already live but broken, slow, or unfinished, the website help page explains the repair and cleanup process without turning it into agency copy.
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

  const Head: HeadFC = () => {
    const site = useSiteMetadata();
    const pageUrl = `${site.siteUrl}${pathname}`;
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Web development and website design services for ${city}, ${state}`,
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
          telephone: "+16502651193",
        },
        areaServed: [
          { "@type": "City", name: `${city}, ${state}` },
          { "@type": "AdministrativeArea", name: county },
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
          { "@type": "City", name: `${city}, ${state}` },
          { "@type": "AdministrativeArea", name: county },
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
          { name: `Web Developer in ${city}, ${stateAbbrev}`, path: pathname },
        ]}
      />
    );
  };

  return { default: CityPage, Head };
};
