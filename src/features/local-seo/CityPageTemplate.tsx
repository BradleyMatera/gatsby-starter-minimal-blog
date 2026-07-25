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
  /** City-specific details: landmarks, neighborhoods, local business types */
  localDetails: string;
  /** All city slugs for cross-linking (including this one) */
  allCitySlugs: Array<{ slug: string; label: string }>;
  /** County name */
  county: string;
  /** City image filename in /static/city-images/ */
  cityImage: string;
};

const serviceBullets = (city: string) => [
  `Website design for ${city} small businesses that need a real online presence, not a template dump.`,
  "Website help and repair when your current site is broken, slow, or abandoned by whoever built it.",
  `SEO services focused on local ${city} search visibility — content structure, metadata, and technical cleanup.`,
  "Small business websites built to be maintainable, fast, and honest about what they cost to keep running.",
  `Google Business Profile setup and optimization — so you show up in local map results when people search for ${city} businesses.`,
  "Ongoing hosting and maintenance — month-to-month support with 24-hour response times, no long-term contracts.",
];

export const createCityPage = (config: CityPageConfig) => {
  const { city, state, stateAbbrev, slug, pageTitle, pageDescription, distance, direction, cityContext, marketContext, localDetails, allCitySlugs, county, cityImage } = config;
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

      <img src={`/city-images/${cityImage}`} alt={`${city}, ${state}`} className="city-hero-image" />

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
                {serviceBullets(city).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="How I work illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h2 className="pkg-card__title">How I work</h2>
              <p className="pkg-card__desc">
                Most of my experience comes from building in public, shipping projects to GitHub, and documenting what changed and why. That makes me a good fit for {city} businesses that want a website they can understand and maintain, not a black-box deliverable that breaks the moment the original developer disappears.
              </p>
              <p className="pkg-card__desc">
                {city} projects can be handled mostly remotely, with in-person meetings when the scope warrants it. The drive from Durand is short, and the work itself does not change based on where I sit — clear scope, visible proof, and a site that loads fast and ranks locally.
              </p>
              <p className="pkg-card__desc">
                Every site I build loads in under 2 seconds on mobile — faster than most sites in {city}. I test with Google PageSpeed Insights before launch.
              </p>
            </div>
          </div>
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
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Website design illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Website design</h3>
              <p className="pkg-card__desc">
                Custom website design for {city} businesses that want something better than a cookie-cutter template. Responsive layouts, clear service pages, contact flows that actually convert, and copy that explains what you do without sounding like every other site in your industry. Built in React, Gatsby, or Next.js depending on what fits.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Website help and repair illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Website help and repair</h3>
              <p className="pkg-card__desc">
                If your current {city} business website is broken, slow, was abandoned by the original developer, or never quite finished, that is some of the most common work I do. Front-end cleanup, dependency updates, deployment fixes, content restructuring, and making a site that was left half-done actually usable again.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="SEO services illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">SEO services</h3>
              <p className="pkg-card__desc">
                Local SEO for {city} means showing up when someone searches "website design {city}" or the service you actually provide. That is content structure, metadata, page speed, semantic HTML, and local search signals — not a monthly retainer for vague reports. I do the technical work and tell you what moved and why.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Small business websites illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Small business websites</h3>
              <p className="pkg-card__desc">
                {marketContext} Those businesses need websites that are affordable to build, cheap to maintain, and honest about what they cost over time. I build with that in mind — no bloated CMS, no ongoing license fees you did not agree to.
              </p>
            </div>
          </div>
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
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt={`Knows the ${city} market illustration`} className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Knows the {city} market</h3>
              <p className="pkg-card__desc">
                {city} is not Chicago. The customer base, the price sensitivity, and the competitive landscape are different. A developer who lives in the region understands that a {city} business's site needs different language than a downtown Chicago startup's site.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Available in person illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Available in person</h3>
              <p className="pkg-card__desc">
                Sometimes a whiteboard session is worth more than ten emails. Being {distance} from {city} means I can show up when the project needs it, without billing you for a flight or pretending a Zoom call is the same as sitting in the same room.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Accountable to the region illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Accountable to the region</h3>
              <p className="pkg-card__desc">
                I am not going to disappear into a different time zone. My reputation in the region is tied to the work I do here. If a {city} client has a problem, it gets fixed because I am still local and still reachable — not a ticket in a queue.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Local context"
        title={`What makes ${city} different for web design`}
        description={
          <p>
            {localDetails}
          </p>
        }
      >
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt={`${city} businesses I typically work with illustration`} className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">{city} businesses I typically work with</h3>
            <p className="pkg-card__desc">
              {marketContext}
            </p>
          </div>
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
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Smaller and more personal illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Smaller and more personal</h3>
              <p className="pkg-card__desc">
                When you hire me you are hiring the person who does the work. No account manager relaying messages to a developer you never meet, no rotating team members between kickoff and launch. The scope, the code, and the communication all come from one place.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="More transparent on cost illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">More transparent on cost</h3>
              <p className="pkg-card__desc">
                Agencies often bundle hosting, maintenance, and licensing into opaque monthly fees that add up over years. I separate the build cost from the ongoing cost so you know what the site costs to make and what it costs to keep — and you can leave whenever you want.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="No sales pipeline illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">No sales pipeline</h3>
              <p className="pkg-card__desc">
                Larger agencies have a sales process designed to close deals, which means proposals full of buzzwords and scope that quietly expands. I skip that. You tell me what you need, I tell you whether I can do it, what it costs, and how long it takes.
              </p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="When an agency is the right call illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">When an agency is the right call</h3>
              <p className="pkg-card__desc">
                If you need a large e-commerce platform, a dedicated marketing team running campaigns, or a brand identity overhaul with a creative director, a larger agency may genuinely be the better fit. I will tell you that directly if it is true for your project.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="The honest difference"
        title={`Solo developer vs. agency: what changes for your ${city} business`}
        description={
          <p>
            {city} has established web design companies that have been around for decades. Some do good work. But the experience of hiring a solo developer is fundamentally different from hiring an agency — and the difference shows up in your invoice, your timeline, and your ability to get changes made after launch.
          </p>
        }
      >
        <Card variant="outline">
          <table className="data-table">
            <caption>Solo developer vs. agency comparison for {city} businesses</caption>
            <thead>
              <tr>
                <th scope="col">Factor</th>
                <th scope="col">Solo developer (me)</th>
                <th scope="col">Typical agency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-label="Factor">Pricing transparency</th>
                <td data-label="Solo developer (me)">Fixed prices posted online — $447 to $1,497</td>
                <td data-label="Typical agency">Quote-based, often requires a sales call</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Who does the work</th>
                <td data-label="Solo developer (me)">The person you talked to</td>
                <td data-label="Typical agency">Whoever is assigned — may change mid-project</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Accessibility</th>
                <td data-label="Solo developer (me)">WCAG 2.2 AA compliant by default</td>
                <td data-label="Typical agency">Often not compliant — check their own site</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Ongoing costs</th>
                <td data-label="Solo developer (me)">$37-$97/month, month-to-month, cancel anytime</td>
                <td data-label="Typical agency">Bundled retainer, often $200-$500/month</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Response time</th>
                <td data-label="Solo developer (me)">24-hour guarantee, you text or call one person</td>
                <td data-label="Typical agency">Ticket queue, account manager, 2-5 business days</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Site ownership</th>
                <td data-label="Solo developer (me)">You own everything — code, content, domain</td>
                <td data-label="Typical agency">Often tied to their CMS or hosting — hard to leave</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">Build speed</th>
                <td data-label="Solo developer (me)">14 days for a starter site, 3-4 weeks for larger</td>
                <td data-label="Typical agency">6-12 weeks typical, depends on their pipeline</td>
              </tr>
              <tr>
                <th scope="row" data-label="Factor">After launch</th>
                <td data-label="Solo developer (me)">30-90 day warranty included, then month-to-month</td>
                <td data-label="Typical agency">Bug fixes often billed separately after 14-30 days</td>
              </tr>
            </tbody>
          </table>
        </Card>
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
        eyebrow="Website samples"
        title={`What your ${city} business website could look like`}
        description={
          <p>
            These are sample websites built for different industries — not templates, but full
            working sites with services, contact forms, and mobile-responsive design. Browse to
            get ideas for your own site, then reach out and I will build one customized for your
            business with your name, photos, and branding.
          </p>
        }
      >
        <div className="grid-three">
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Restaurant Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Restaurant Website</h3>
              <p className="pkg-card__desc">
                Full restaurant website with menu, reservations, hours, photo gallery, and customer reviews.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/restaurant/">See restaurant sample</Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Landscaping Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Landscaping Website</h3>
              <p className="pkg-card__desc">
                Landscaping company site with service packages, seasonal tips, gallery, and free quote form.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/landscaping/">See landscaping sample</Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="HVAC Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">HVAC Website</h3>
              <p className="pkg-card__desc">
                HVAC company with emergency service, maintenance plans, team bios, and financing info.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/hvac/">See HVAC sample</Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Auto Repair Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Auto Repair Website</h3>
              <p className="pkg-card__desc">
                Auto shop with service menu, online booking, tire lookup, and mechanic credentials.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/auto-repair/">See auto repair sample</Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Real Estate Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Real Estate Website</h3>
              <p className="pkg-card__desc">
                Real estate office with featured listings, agent profiles, market reports, and neighborhood guides.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/real-estate/">See real estate sample</Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Beauty Salon Website illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Beauty Salon Website</h3>
              <p className="pkg-card__desc">
                Hair and beauty salon with service menu, stylist team, online booking, and gallery.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/demos/beauty-salon/">See salon sample</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="card-actions" style={{ marginTop: "1.5rem" }}>
          <Link data-variant="primary" to="/contact/">
            Get a free consultation
          </Link>
          <Link data-variant="ghost" to="/pricing/">
            See pricing
          </Link>
        </div>
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
              <p className="pkg-card__desc">Source: Stanford Web Credibility Study</p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="53% of visitors leave a site that takes over 3 seconds to load illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">53% of visitors leave a site that takes over 3 seconds to load</h3>
              <p className="pkg-card__desc">Source: Google PageSpeed research</p>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="46% of Google searches are looking for a local business illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">46% of Google searches are looking for a local business</h3>
              <p className="pkg-card__desc">Source: Google local search data</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Evidence & proof"
        title="Work samples and case studies"
        description={<p>Don't take my word for it — here's the actual work behind the claims above.</p>}
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
                Read the <Link to="/northwest-illinois-web-development-faq/">web development FAQ</Link> for process details, timelines, and pricing answers.
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
        eyebrow="Pricing comparison"
        title={`Website package comparison for ${city} businesses`}
        description={
          <p>
            Three fixed-price tiers so you can see exactly what each includes before we talk. No hidden fees, no scope creep — pick the tier that fits your {city} business and we go from there.
          </p>
        }
      >
        <Card variant="outline">
          <table className="data-table">
            <caption>Website package tiers compared — Starter, Growth, and Premium</caption>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Starter — $447</th>
                <th scope="col">Growth — $797</th>
                <th scope="col">Premium — $1,497</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-label="Feature">Pages</th>
                <td data-label="Starter — $447">Up to 5</td>
                <td data-label="Growth — $797">Up to 10</td>
                <td data-label="Premium — $1,497">Up to 20</td>
              </tr>
              <tr>
                <th scope="row" data-label="Feature">Design</th>
                <td data-label="Starter — $447">Template-based, mobile-responsive</td>
                <td data-label="Growth — $797">Custom layout, two revision rounds</td>
                <td data-label="Premium — $1,497">Full custom design, unlimited revisions</td>
              </tr>
              <tr>
                <th scope="row" data-label="Feature">Local SEO</th>
                <td data-label="Starter — $447">Basic on-page metadata</td>
                <td data-label="Growth — $797">On-page + Google Business Profile setup</td>
                <td data-label="Premium — $1,497">Full local SEO, schema markup, content structure</td>
              </tr>
              <tr>
                <th scope="row" data-label="Feature">Care Plan</th>
                <td data-label="Starter — $447">$37/month hosting and updates</td>
                <td data-label="Growth — $797">$67/month hosting, updates, and edits</td>
                <td data-label="Premium — $1,497">$97/month full support and priority edits</td>
              </tr>
              <tr>
                <th scope="row" data-label="Feature">Support</th>
                <td data-label="Starter — $447">24-hour response, 30-day warranty</td>
                <td data-label="Growth — $797">24-hour response, 60-day warranty</td>
                <td data-label="Premium — $1,497">Priority response, 90-day warranty</td>
              </tr>
              <tr>
                <th scope="row" data-label="Feature">Timeline</th>
                <td data-label="Starter — $447">14 days</td>
                <td data-label="Growth — $797">3 weeks</td>
                <td data-label="Premium — $1,497">4 weeks</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <div className="card-actions" style={{ marginTop: "1.5rem" }}>
          <Link data-variant="primary" to="/contact/">
            Get a free consultation
          </Link>
          <Link data-variant="ghost" to="/pricing/">
            See full pricing
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="FAQ"
        title={`Common questions about web development in ${city}`}
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
          <div className="pkg-card">
            <img src="/package-images/why-fixed.svg" alt={`Do you work with businesses in ${county}? illustration`} className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Do you work with businesses in {county}?</h3>
              <p className="pkg-card__desc">
                Yes. I serve businesses throughout {county} and the broader Northwest Illinois and Southern Wisconsin region. The drive to {city} is {distance}, so in-person meetings are easy to arrange when needed.
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
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Common questions illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Common questions</h3>
              <p className="pkg-card__desc">
                I broke the common fit, scope, and process questions into a separate FAQ so the answers are easier to skim before you reach out.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
                  Read the FAQ
                </Link>
              </div>
            </div>
          </div>
          <div className="pkg-card">
            <img src="/package-images/evidence-projects.svg" alt="Website help and repair illustration" className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">Website help and repair</h3>
              <p className="pkg-card__desc">
                If your {city} site is already live but broken, slow, or unfinished, the website help page explains the repair and cleanup process without turning it into agency copy.
              </p>
              <div className="card-actions">
                <Link data-variant="primary" to="/website-help-northwest-illinois/">
                  Website help page
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
          telephone: "+16083135373",
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
        telephone: "+16083135373",
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
