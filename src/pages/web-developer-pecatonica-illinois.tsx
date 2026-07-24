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
  "Google Business Profile setup and optimization — so you show up in local map results when people search for Pecatonica businesses.",
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
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

    <img src="/city-images/pecatonica.jpg" alt="Pecatonica, Illinois" className="city-hero-image" />

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
          <p className="feature-card__body">
            Every site I build loads in under 2 seconds on mobile — faster than most sites in Pecatonica. I test with Google PageSpeed Insights before launch.
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
            I am based in Durand and work across Northwest Illinois and Southern Wisconsin. If you are
            in a nearby community, I have dedicated pages for{" "}
            <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link>,{" "}
            <Link to="/web-developer-rockford-illinois/">Rockford</Link>,{" "}
            <Link to="/web-developer-freeport-illinois/">Freeport</Link>,{" "}
            <Link to="/web-developer-winnebago-illinois/">Winnebago</Link>,{" "}
            <Link to="/web-developer-loves-park-illinois/">Loves Park</Link>,{" "}
            <Link to="/web-developer-machesney-park-illinois/">Machesney Park</Link>,{" "}
            <Link to="/web-developer-byron-illinois/">Byron</Link>,{" "}
            <Link to="/web-developer-roscoe-illinois/">Roscoe</Link>,{" "}
            <Link to="/web-developer-rockton-illinois/">Rockton</Link>,{" "}
            <Link to="/web-developer-south-beloit-illinois/">South Beloit</Link>,{" "}
            <Link to="/web-developer-beloit-wisconsin/">Beloit, WI</Link>, and{" "}
            <Link to="/web-developer-janesville-wisconsin/">Janesville, WI</Link> as well. The scope and
            honesty are the same everywhere.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Why local"
      title="Why choose a local developer over a remote freelancer or big agency"
    >
      <div className="grid-three">
        <Card>
          <h3 className="feature-card__title">Knows the Pecatonica market</h3>
          <p className="feature-card__body">
            Pecatonica is a small village in Winnebago County along the Pecatonica River. The business
            community is tight-knit, serving local residents and farmers. A developer who knows the area
            understands that Pecatonica businesses need different language than Rockford or Chicago
            businesses.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Available in person</h3>
          <p className="feature-card__body">
            Being just 15 minutes from Durand means I can show up when the project needs it. Sometimes a
            face-to-face meeting is worth more than ten emails.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">Accountable to the region</h3>
          <p className="feature-card__body">
            I am not going to disappear into a different time zone. My reputation in the region is tied to
            the work I do here.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Local context"
      title="What makes Pecatonica different for web design"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          Pecatonica sits along the Pecatonica River in Winnebago County, with businesses concentrated
          along IL Route 70 and Main Street. The village has a strong agricultural heritage and a growing
          residential base. The Pecatonica Prairie Trail runs through town, bringing cyclists and outdoor
          enthusiasts. Local businesses serve both long-time residents and commuters to Rockford and
          Freeport. For web design, this means sites need to target Pecatonica-specific searches while
          also capturing broader Winnebago County traffic.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Comparison"
      title="How this compares to a Pecatonica web agency"
    >
      <div className="grid-two">
        <Card>
          <h3 className="feature-card__title">Smaller and more personal</h3>
          <p className="feature-card__body">
            When you hire me you are hiring the person who does the work.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">More transparent on cost</h3>
          <p className="feature-card__body">
            I separate the build cost from the ongoing cost so you know what the site costs to make and
            what it costs to keep.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">No sales pipeline</h3>
          <p className="feature-card__body">
            You tell me what you need, I tell you whether I can do it, what it costs, and how long it
            takes.
          </p>
        </Card>
        <Card>
          <h3 className="feature-card__title">When an agency is the right call</h3>
          <p className="feature-card__body">
            If you need a large e-commerce platform or dedicated marketing team, a larger agency may be
            the better fit.
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
          Small businesses across Pecatonica and Northwest Illinois — if you need a website that works on mobile and shows up on Google, I can help.
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
      title="Common questions about web development in Pecatonica"
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

    <div className="attribution-block" style={{ maxWidth: "42rem", margin: "2rem auto", padding: "1rem 1.5rem", fontSize: "0.875rem", opacity: 0.7, borderTop: "1px solid var(--color-border)" }}>
      <p><strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Pecatonica and Northwest Illinois. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link></p>
      <p style={{ marginTop: "0.5rem" }}>Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.</p>
    </div>
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
        telephone: "+16083135373",
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
      telephone: "+16083135373",
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
