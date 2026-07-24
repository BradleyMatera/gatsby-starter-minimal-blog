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

    <img src="/city-images/winnebago.jpg" alt="Winnebago, Illinois" className="city-hero-image" />

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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="What I can help with right now illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">What I can help with right now</h2>
            <ul className="feature-list">
              {serviceBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Being near Rockford but not Rockford illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Being near Rockford but not Rockford</h2>
            <p className="pkg-card__desc">
              Winnebago sits close enough to Rockford that some businesses get lumped into Rockford
              searches, but it is a separate village with its own identity and customer base. A website
              that only targets Rockford misses the people searching specifically for Winnebago. I build
              sites and SEO that account for both layers.
            </p>
            <p className="pkg-card__desc">
              Being 20 minutes away in Durand means I understand the rural Winnebago County context
              without pretending to be a big-city agency. The communication is direct and the scope stays
              honest.
            </p>
            <p className="pkg-card__desc">
              Every site I build loads in under 2 seconds on mobile — faster than most sites in Winnebago. I test with Google PageSpeed Insights before launch.
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Website design illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website design</h3>
            <p className="pkg-card__desc">
              New websites built for Winnebago businesses that need a genuine online presence. Responsive
              layouts, clear service pages, and contact flows that make it obvious what you do and how to
              reach you, without overcomplicating things.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Website help & repair illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website help & repair</h3>
            <p className="pkg-card__desc">
              If your current site is broken, slow, or stuck on a platform nobody can update, I can
              diagnose and fix it. That includes React, Gatsby, and static site cleanup, content updates,
              and deployment fixes.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="SEO services illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">SEO services</h3>
            <p className="pkg-card__desc">
              Local SEO targeting Winnebago and the broader Winnebago County area so nearby customers
              find your business. Page structure, content clarity, and metadata that match how local
              people actually search.
            </p>
          </div>
        </div>
      </div>
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Small business websites illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Small business websites</h3>
            <p className="pkg-card__desc">
              Winnebago has small businesses that serve both the village and the surrounding rural area.
              A small business website should be maintainable, fast, and honest about what you offer, not
              a recurring expense that never gets touched. I build sites you can actually live with and
              update.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Nearby communities I also serve illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Nearby communities I also serve</h3>
            <p className="pkg-card__desc">
              I am based in Durand and work across Northwest Illinois and Southern Wisconsin. If you are
              in a nearby community, I have dedicated pages for{" "}
              <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link>,{" "}
              <Link to="/web-developer-rockford-illinois/">Rockford</Link>,{" "}
              <Link to="/web-developer-freeport-illinois/">Freeport</Link>,{" "}
              <Link to="/web-developer-pecatonica-illinois/">Pecatonica</Link>,{" "}
              <Link to="/web-developer-loves-park-illinois/">Loves Park</Link>,{" "}
              <Link to="/web-developer-machesney-park-illinois/">Machesney Park</Link>,{" "}
              <Link to="/web-developer-byron-illinois/">Byron</Link>,{" "}
              <Link to="/web-developer-roscoe-illinois/">Roscoe</Link>,{" "}
              <Link to="/web-developer-rockton-illinois/">Rockton</Link>,{" "}
              <Link to="/web-developer-south-beloit-illinois/">South Beloit</Link>,{" "}
              <Link to="/web-developer-beloit-wisconsin/">Beloit, WI</Link>, and{" "}
              <Link to="/web-developer-janesville-wisconsin/">Janesville, WI</Link>. Same developer, same
              honest scope everywhere.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Why local"
      title="Why choose a local developer over a remote freelancer or big agency"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Knows the Winnebago market illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Knows the Winnebago market</h3>
            <p className="pkg-card__desc">
              Winnebago is a small village in Winnebago County, about 10 minutes north of Durand. Businesses
              along IL Route 75 and Main Street serve local residents and commuters. A developer who knows
              the area understands that Winnebago businesses need different language than Rockford or
              Chicago businesses.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Available in person illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Available in person</h3>
            <p className="pkg-card__desc">
              Being just 10 minutes from Durand means I can show up when the project needs it. Sometimes a
              face-to-face meeting is worth more than ten emails.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Accountable to the region illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Accountable to the region</h3>
            <p className="pkg-card__desc">
              I am not going to disappear into a different time zone. My reputation in the region is tied to
              the work I do here.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Local context"
      title="What makes Winnebago different for web design"
    >
      <Card variant="outline">
        <p className="feature-card__body">
          Winnebago sits along IL Route 75 in central Winnebago County. The village has a rural character
          with businesses along Main Street and Route 75 serving local residents and farmers. Winnebago
          is part of the Winnebago School District and has a growing residential base as people move out
          from Rockford. The Kishwaukee River runs nearby. For web design, sites need to target
          Winnebago-specific searches while capturing broader Winnebago County and Rockford metro
          traffic.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Comparison"
      title="How this compares to a Winnebago web agency"
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Smaller and more personal illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Smaller and more personal</h3>
            <p className="pkg-card__desc">
              When you hire me you are hiring the person who does the work.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="More transparent on cost illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">More transparent on cost</h3>
            <p className="pkg-card__desc">
              I separate the build cost from the ongoing cost so you know what the site costs to make and
              what it costs to keep.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="No sales pipeline illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">No sales pipeline</h3>
            <p className="pkg-card__desc">
              You tell me what you need, I tell you whether I can do it, what it costs, and how long it
              takes.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="When an agency is the right call illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">When an agency is the right call</h3>
            <p className="pkg-card__desc">
              If you need a large e-commerce platform or dedicated marketing team, a larger agency may be
              the better fit.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Process"
      title="How it works — from first call to live site"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/city-step-call.svg" alt="Free consultation illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Free consultation</h3>
            <p className="pkg-card__desc">
              We talk about your business, what the site needs to do, and what's currently broken. I tell you honestly whether I'm the right fit. No pressure, no sales pitch.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-step-build.svg" alt="Design and build illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Design and build</h3>
            <p className="pkg-card__desc">
              I build a fast, mobile-ready site built for your business. You see real progress, not radio silence. Two rounds of revisions included so the final site matches what you actually want.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-step-launch.svg" alt="Launch and support illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Launch and support</h3>
            <p className="pkg-card__desc">
              I launch your site, set up hosting, and handle updates. You get 24-hour response times and a 30-day warranty after launch. Monthly support is month-to-month — no long-term commitment.
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="75% of consumers judge your business by its website alone illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">75% of consumers judge your business by its website alone</h3>
            <p className="pkg-card__desc">
              Source: Stanford Web Credibility Study
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="53% of visitors leave a site that takes over 3 seconds to load illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">53% of visitors leave a site that takes over 3 seconds to load</h3>
            <p className="pkg-card__desc">
              Source: Google PageSpeed research
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="46% of Google searches are looking for a local business illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">46% of Google searches are looking for a local business</h3>
            <p className="pkg-card__desc">
              Source: Google local search data
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/city-evidence-work.svg" alt="Project case studies illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Project case studies</h3>
            <p className="pkg-card__desc">
              See <Link to="/projects/">completed project case studies</Link> with code, screenshots, and honest notes on what worked and what didn't.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Web development FAQ illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Web development FAQ</h3>
            <p className="pkg-card__desc">
              Read the <Link to="/northwest-illinois-web-development-faq/">Northwest Illinois web development FAQ</Link> for process details, timelines, and pricing answers.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-evidence-pricing.svg" alt="Pricing breakdown illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Pricing breakdown</h3>
            <p className="pkg-card__desc">
              Transparent <Link to="/pricing/">pricing tiers</Link> starting at $447 with no hidden fees or contracts.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Small business checklist illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Small business checklist</h3>
            <p className="pkg-card__desc">
              Download the <Link to="/small-business-website-checklist-northwest-illinois/">small business website checklist</Link> to see exactly what a complete site needs.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about web development in Winnebago"
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="How much does a website cost? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">How much does a website cost?</h3>
            <p className="pkg-card__desc">
              Starter sites begin at $447 for the build and $37/month for hosting and support. See the full pricing breakdown on the pricing page.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="How long does it take? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">How long does it take?</h3>
            <p className="pkg-card__desc">
              Starter sites typically take 14 days. Larger projects run 3-4 weeks. I'll give you a specific timeline during the free consultation.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="Do you offer a guarantee? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Do you offer a guarantee?</h3>
            <p className="pkg-card__desc">
              Yes. Every build includes a 24-hour response time guarantee and a 30-day warranty after launch. If you're not happy after the first round of revisions, you get your deposit back.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="Do I own my website? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Do I own my website?</h3>
            <p className="pkg-card__desc">
              Yes. The code, content, and domain are all yours. If you ever want to leave, I'll help you migrate at no extra charge.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="Can you fix my existing website? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Can you fix my existing website?</h3>
            <p className="pkg-card__desc">
              Yes. Site refreshes start at $597, or I can work hourly at $65/hour with a 1-hour minimum.
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Common questions illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Common questions</h3>
            <p className="pkg-card__desc">
              I broke the common fit, scope, and process questions into a separate FAQ so the answers are
              easier to skim before you reach out.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Other local pages illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Other local pages</h3>
            <p className="pkg-card__desc">
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
          </div>
        </div>
      </div>
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/city-evidence-pricing.svg" alt="Pricing illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Pricing</h3>
            <p className="pkg-card__desc">
              Transparent pricing for every budget. Starter sites from $447, growth sites from $797, premium from $1,497.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/pricing/">
                See pricing
              </Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-evidence-contact.svg" alt="Get in touch illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Get in touch</h3>
            <p className="pkg-card__desc">
              Ready to talk about your project? Send me the details and I'll tell you honestly whether I'm the right fit.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">
                Get a free consultation
              </Link>
            </div>
          </div>
        </div>
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
      <p><strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Winnebago and Northwest Illinois. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link></p>
      <p style={{ marginTop: "0.5rem" }}>Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.</p>
    </div>
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
        telephone: "+16083135373",
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
      telephone: "+16083135373",
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
