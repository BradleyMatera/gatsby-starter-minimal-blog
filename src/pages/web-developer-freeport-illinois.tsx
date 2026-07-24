import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/web-developer-freeport-illinois/";
const pageTitle = "Web Developer & Website Design in Freeport, Illinois";
const pageDescription =
  "Freeport, Illinois website design and web developer for small businesses — SEO services, site repair, and local builds from a developer 30 minutes away.";

const serviceBullets = [
  "Website design for small businesses in Freeport — service pages, contact flows, and layouts that load fast and explain the offer clearly.",
  "Website help and repair when an existing Freeport business site is broken, slow, outdated, or hard to update without calling someone every time.",
  "SEO services focused on local Freeport and Stephenson County search visibility — title tags, content structure, schema, and technical cleanup.",
  "Small business websites built so the owner can actually maintain them, with documentation instead of a black box.",
  "Google Business Profile setup and optimization — so you show up in local map results when people search for Freeport businesses.",
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
];

const LocalWebDeveloperPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Web Developer in Freeport, Illinois
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Local web development"
      titleAs="h1"
      title={
        <>
          <strong>Web developer & website design</strong> in Freeport, Illinois
        </>
      }
      description={
        <>
          <p>
            If you searched for a web developer in Freeport, Illinois or website design in Freeport,
            this page gives you the honest version of what I do and how I work with local small
            businesses. I am based in Durand, about 30 minutes south of Freeport, and I build,
            repair, and improve websites for Stephenson County businesses that need something better
            than a template they cannot control.
          </p>
          <p>
            Freeport is the Stephenson County seat, and the small businesses along the historic
            downtown corridor and out on the main roads deserve websites that match the quality of
            what they actually do. Too many local sites are slow, broken on mobile, or invisible in
            local search. That is the gap I am best suited to close.
          </p>
        </>
      }
      actions={
        <>
          <a href="tel:+16083135373" data-variant="ghost" className="link">
            (608) 313-5373
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
          <h2 className="feature-card__title">What I can help a Freeport business with</h2>
          <ul className="feature-list">
            {serviceBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">How I work with local clients</h2>
          <p className="feature-card__body">
            I am not a boutique studio with a sales pipeline. I am one developer who writes the code,
            writes the content, and documents what changed. For a Freeport small business that means
            you talk to the person doing the work, not an account manager relaying messages.
          </p>
          <p className="feature-card__body">
            Most of the collaboration happens remotely — email, shared docs, and preview links. If an
            in-person meeting in Freeport makes sense for scoping a larger project, that is easy
            enough given the drive from Durand. The important part is still clear scope and visible
            proof, not proximity for its own sake.
          </p>
          <p className="feature-card__body">
            Every site I build loads in under 2 seconds on mobile — faster than most sites in Freeport. I test with Google PageSpeed Insights before launch.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Services"
      title="Website design, repair, SEO, and small business sites for Freeport"
      description={
        <>
          <p>
            Freeport businesses do not all need the same thing. Some need a brand new site, some need
            the one they have fixed, and some need to finally show up when someone searches for what
            they sell. Here is how those break down.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Website design</h3>
          <p className="feature-card__body">
            New websites built for Freeport businesses that want a clean, fast, mobile-friendly
            presence without paying agency prices for a template swap. Service pages, contact forms,
            and layouts that explain what you do in plain language. Built so you can update the
            basics yourself.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Website help and repair</h3>
          <p className="feature-card__body">
            If your existing Freeport business website is broken, slow, showing errors, or impossible
            to edit without calling the original developer, that is the kind of cleanup work I do
            regularly. React, Gatsby, static sites, and common CMS setups — I can diagnose what is
            wrong and fix it without starting from scratch unless that is actually warranted.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">SEO services</h3>
          <p className="feature-card__body">
            Local SEO for Freeport and Stephenson County means more than stuffing keywords. It is
            title tags, heading structure, page speed, schema markup, and content that actually
            answers what someone in Freeport is searching for. I handle the technical and structural
            side so your site has a real chance of ranking locally.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Small business websites</h3>
          <p className="feature-card__body">
            Small businesses in Freeport — shops, contractors, service providers, restaurants along
            the historic downtown — need websites that are affordable, maintainable, and honest about
            scope. I build sites that fit a small business budget and leave you with something you can
            actually manage, not a dependency on a developer for every text change.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Why local"
      title="Why choose a local developer over a remote agency"
      description={
        <>
          <p>
            You can hire a web developer from anywhere. So why does it matter that I am 30 minutes
            from Freeport instead of three states away? It comes down to context and accountability.
          </p>
        </>
      }
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">I know the area</h3>
          <p className="feature-card__body">
            I know Freeport is the Stephenson County seat, that the historic downtown matters to the
            local economy, and that small businesses here compete with Rockford and online sellers for
            the same customers. That context shows up in how I write your site copy and structure your
            local SEO — a remote developer has to guess at it.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">You can actually reach me</h3>
          <p className="feature-card__body">
            No ticketing system, no timezone lag, no account manager. Email me directly, get a direct
            answer. If a project warrants sitting down in Freeport to scope it out, the drive from
            Durand is short enough that it is not a production.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Local search understands local</h3>
          <p className="feature-card__body">
            Ranking for "website design Freeport" or "SEO services Freeport IL" requires understanding
            how Stephenson County searches. A developer who lives in the region and is already writing
            local landing pages has a better handle on that than a national agency running a template.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="The honest comparison"
      title="How this compares to boutique studios in the region"
      description={
        <>
          <p>
            There are a couple of boutique design studios serving the broader northwest Illinois and
            Rockford area. They do good visual work and they charge accordingly. If you need a large
            branding package, a full marketing campaign, or ongoing ad management, that is a better
            fit than what I offer.
          </p>
          <p>
            Where I am the better choice is the middle ground: a Freeport small business that needs a
            real website, real local SEO, and someone who will fix it when it breaks — without the
            agency overhead or the retainer. You get the person who writes the code, not a project
            coordinator. And you get documentation so the site is not a mystery after I hand it off.
          </p>
          <p>
            If you are comparing options, the fairest thing I can tell you is: look at the actual work,
            not the pitch. Review my <Link to="/projects/">projects</Link>, read the{" "}
            <Link to="/about/">about page</Link>, and compare it directly to what a studio shows you.
            The right answer depends on what your Freeport business actually needs.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">What I am best at</h3>
          <p className="feature-card__body">
            Website design and rebuilds, front-end repair, local SEO structure, and small business
            sites that stay maintainable. Direct communication, documented work, and pricing that
            fits a small business rather than an enterprise marketing budget.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">When a studio is the better call</h3>
          <p className="feature-card__body">
            Full brand identity design, ongoing paid ad management, large e-commerce builds with
            complex inventory, or projects that need a dedicated design team iterating on visuals. I
            will tell you that directly rather than oversell what I do.
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
            I launch your site, set up hosting, and handle updates. You get 24-hour response times and a 30-day warranty after launch. Monthly support is month-to-month — no long-term commitment.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Industries"
      title="Industries I work with"
      description={
        <p>
          Small businesses across Freeport and Northwest Illinois — if you need a website that works on mobile and shows up on Google, I can help.
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
      title="Common questions about web development in Freeport"
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
            Send me the basic details: what your Freeport business needs the site to do, what is
            currently broken or missing, and what timeline matters. I will answer plainly and tell you
            whether the work is a good fit — or whether you are better off with a different option.
          </p>
          <p>
            The best starting point is email through the <Link to="/contact/">contact page</Link>. If
            you want to vet the work first, start with the <Link to="/projects/">project pages</Link>{" "}
            or the <Link to="/about/">about page</Link>. If you are looking at other nearby areas, I
            also have pages for{" "}
            <Link to="/web-developer-durand-davis-illinois/">web development in Durand and Davis</Link>,{" "}
            <Link to="/web-developer-rockford-illinois/">web development in Rockford</Link>,{" "}
            <Link to="/web-developer-pecatonica-illinois/">Pecatonica</Link>,{" "}
            <Link to="/web-developer-winnebago-illinois/">Winnebago</Link>,{" "}
            <Link to="/web-developer-loves-park-illinois/">Loves Park</Link>,{" "}
            <Link to="/web-developer-machesney-park-illinois/">Machesney Park</Link>,{" "}
            <Link to="/web-developer-byron-illinois/">Byron</Link>,{" "}
            <Link to="/web-developer-roscoe-illinois/">Roscoe</Link>,{" "}
            <Link to="/web-developer-rockton-illinois/">Rockton</Link>,{" "}
            <Link to="/web-developer-south-beloit-illinois/">South Beloit</Link>,{" "}
            <Link to="/web-developer-beloit-wisconsin/">Beloit, WI</Link>, and{" "}
            <Link to="/web-developer-janesville-wisconsin/">Janesville, WI</Link>.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Common questions</h3>
          <p className="feature-card__body">
            I broke the common fit, scope, pricing, and process questions into a separate FAQ so the
            answers are easier to skim before you reach out.
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
            If your Freeport site is already live but broken, slow, or hard to update, the website
            help page explains the practical version of what I usually fix first.
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
      name: "Web development and website design services for Freeport, Illinois",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Website repair",
        "SEO services",
        "Small business websites",
        "Web development",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
        telephone: "+16083135373",
      },
      areaServed: [
        { "@type": "City", name: "Freeport, Illinois" },
        { "@type": "AdministrativeArea", name: "Stephenson County, Illinois" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Bradley Matera",
      url: site.siteUrl,
      description: pageDescription,
      telephone: "+16083135373",
      areaServed: [
        { "@type": "City", name: "Freeport, Illinois" },
        { "@type": "AdministrativeArea", name: "Stephenson County, Illinois" },
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
        { name: "Web Developer in Freeport, Illinois", path: pathname },
      ]}
    />
  );
};
