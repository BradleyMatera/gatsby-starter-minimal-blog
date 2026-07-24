import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import { UtensilsIcon, LeafIcon, GearIcon, CarIcon, HouseIcon, ScissorsIcon } from "../site/icons";

const pathname = "/web-developer-rockford-illinois/";
const pageTitle = "Web Developer & Website Design in Rockford, Illinois";
const pageDescription =
  "Website design and web developer for Rockford, Illinois small businesses — SEO services, site repair, and custom builds from a developer 25 minutes away in Durand.";

const serviceBullets = [
  "Website design for Rockford small businesses that need a real online presence, not a template dump.",
  "Website help and repair when your current site is broken, slow, or abandoned by whoever built it.",
  "SEO services focused on local Rockford search visibility — content structure, metadata, and technical cleanup.",
  "Small business websites built to be maintainable, fast, and honest about what they cost to keep running.",
  "Google Business Profile setup and optimization — so you show up in local map results when people search for Rockford businesses.",
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
          Web Developer in Rockford, Illinois
        </li>
      </ol>
    </nav>

    <img src="/city-images/rockford.jpg" alt="Rockford, Illinois" className="city-hero-image" />

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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">How I work</h2>
            <p className="pkg-card__desc">
              Most of my experience comes from building in public, shipping projects to GitHub, and
              documenting what changed and why. That makes me a good fit for Rockford businesses that
              want a website they can understand and maintain, not a black-box deliverable that breaks
              the moment the original developer disappears.
            </p>
            <p className="pkg-card__desc">
              Rockford projects can be handled mostly remotely, with in-person meetings when the scope
              warrants it. The drive from Durand is short, and the work itself does not change based on
              where I sit — clear scope, visible proof, and a site that loads fast and ranks locally.
            </p>
            <p className="pkg-card__desc">
              Every site I build loads in under 2 seconds on mobile — faster than most sites in Rockford. I test with Google PageSpeed Insights before launch.
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website design</h3>
            <p className="pkg-card__desc">
              Custom website design for Rockford businesses that want something better than a
              cookie-cutter template. Responsive layouts, clear service pages, contact flows that
              actually convert, and copy that explains what you do without sounding like every other
              site in your industry. Built in React, Gatsby, or Next.js depending on what fits.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website help and repair</h3>
            <p className="pkg-card__desc">
              If your current Rockford business website is broken, slow, was abandoned by the original
              developer, or never quite finished, that is some of the most common work I do. Front-end
              cleanup, dependency updates, deployment fixes, content restructuring, and making a site
              that was left half-done actually usable again.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">SEO services</h3>
            <p className="pkg-card__desc">
              Local SEO for Rockford means showing up when someone searches "website design Rockford"
              or the service you actually provide. That is content structure, metadata, page speed,
              semantic HTML, and local search signals — not a monthly retainer for vague reports. I do
              the technical work and tell you what moved and why.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Small business websites</h3>
            <p className="pkg-card__desc">
              Rockford has a strong small business community, from machine shops to service companies
              to independent retailers. Those businesses need websites that are affordable to build,
              cheap to maintain, and honest about what they cost over time. I build with that in mind —
              no bloated CMS, no ongoing license fees you did not agree to.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Local context"
      title="What makes Rockford different for web design"
      description={
        <p>
          Rockford is the largest city in Northwest Illinois with a population of about 150,000. The
          business landscape is diverse — from downtown restaurants and shops along State Street and
          North Main Street to manufacturing companies along the I-90 corridor and healthcare
          providers like Mercyhealth and SwedishAmerican. Rockford businesses face more online
          competition than smaller towns in the region, making website quality and local SEO more
          impactful. The city has invested in downtown revitalization along the Rock River, and new
          businesses are opening regularly. For web design, Rockford businesses need sites that can
          compete with Chicago and Madison agencies for local search visibility while reflecting the
          city's character.
        </p>
      }
    >
      <></>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Knows the Rockford market</h3>
            <p className="pkg-card__desc">
              Rockford is not Chicago. The customer base, the price sensitivity, and the competitive
              landscape are different. A developer who lives in the region understands that a Rockford
              manufacturer's site needs different language than a downtown Chicago startup's site.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Available in person</h3>
            <p className="pkg-card__desc">
              Sometimes a whiteboard session is worth more than ten emails. Being 25 minutes from
              Rockford means I can show up when the project needs it, without billing you for a flight
              or pretending a Zoom call is the same as sitting in the same room.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Accountable to the region</h3>
            <p className="pkg-card__desc">
              I am not going to disappear into a different time zone. My reputation in Northwest
              Illinois is tied to the work I do here. If a Rockford client has a problem, it gets fixed
              because I am still local and still reachable — not a ticket in a queue.
            </p>
          </div>
        </div>
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Smaller and more personal</h3>
            <p className="pkg-card__desc">
              When you hire me you are hiring the person who does the work. No account manager
              relaying messages to a developer you never meet, no rotating team members between kickoff
              and launch. The scope, the code, and the communication all come from one place.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">More transparent on cost</h3>
            <p className="pkg-card__desc">
              Agencies often bundle hosting, maintenance, and licensing into opaque monthly fees that
              add up over years. I separate the build cost from the ongoing cost so you know what the
              site costs to make and what it costs to keep — and you can leave whenever you want.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">No sales pipeline</h3>
            <p className="pkg-card__desc">
              Larger agencies have a sales process designed to close deals, which means proposals full
              of buzzwords and scope that quietly expands. I skip that. You tell me what you need, I
              tell you whether I can do it, what it costs, and how long it takes.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">When an agency is the right call</h3>
            <p className="pkg-card__desc">
              If you need a large e-commerce platform, a dedicated marketing team running campaigns, or
              a brand identity overhaul with a creative director, a Rockford agency may genuinely be the
              better fit. I will tell you that directly if it is true for your project.
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
          <img src="/package-images/city-step-call.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Free consultation</h3>
            <p className="pkg-card__desc">
              We talk about your business, what the site needs to do, and what's currently broken. I tell you honestly whether I'm the right fit. No pressure, no sales pitch.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-step-build.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Design and build</h3>
            <p className="pkg-card__desc">
              I build a fast, mobile-ready site built for your business. You see real progress, not radio silence. Two rounds of revisions included so the final site matches what you actually want.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-step-launch.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          Small businesses across Rockford and Northwest Illinois — if you need a website that works on mobile and shows up on Google, I can help.
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
      eyebrow="Website samples"
      title="What your Rockford business website could look like"
      description={
        <p>
          Don't just take my word for it — see full, working website samples built for different
          industries. Each one shows what your Rockford business site could look like, complete with
          services, reviews, contact forms, and mobile-responsive design.
        </p>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">75% of consumers judge your business by its website alone</h3>
            <p className="pkg-card__desc">
              Source: Stanford Web Credibility Study
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">53% of visitors leave a site that takes over 3 seconds to load</h3>
            <p className="pkg-card__desc">
              Source: Google PageSpeed research
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/city-evidence-work.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Project case studies</h3>
            <p className="pkg-card__desc">
              See <Link to="/projects/">completed project case studies</Link> with code, screenshots, and honest notes on what worked and what didn't.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Web development FAQ</h3>
            <p className="pkg-card__desc">
              Read the <Link to="/northwest-illinois-web-development-faq/">Northwest Illinois web development FAQ</Link> for process details, timelines, and pricing answers.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/city-evidence-pricing.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Pricing breakdown</h3>
            <p className="pkg-card__desc">
              Transparent <Link to="/pricing/">pricing tiers</Link> starting at $447 with no hidden fees or contracts.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
      title="Common questions about web development in Rockford"
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">How much does a website cost?</h3>
            <p className="pkg-card__desc">
              Starter sites begin at $447 for the build and $37/month for hosting and support. See the full pricing breakdown on the pricing page.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">How long does it take?</h3>
            <p className="pkg-card__desc">
              Starter sites typically take 14 days. Larger projects run 3-4 weeks. I'll give you a specific timeline during the free consultation.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Do you offer a guarantee?</h3>
            <p className="pkg-card__desc">
              Yes. Every build includes a 24-hour response time guarantee and a 30-day warranty after launch. If you're not happy after the first round of revisions, you get your deposit back.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Do I own my website?</h3>
            <p className="pkg-card__desc">
              Yes. The code, content, and domain are all yours. If you ever want to leave, I'll help you migrate at no extra charge.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
            <Link to="/web-developer-durand-davis-illinois/">Durand and Davis</Link>,{" "}
            <Link to="/web-developer-freeport-illinois/">Freeport</Link>,{" "}
            <Link to="/web-developer-pecatonica-illinois/">Pecatonica</Link>,{" "}
            <Link to="/web-developer-winnebago-illinois/">Winnebago</Link>,{" "}
            <Link to="/web-developer-loves-park-illinois/">Loves Park</Link>,{" "}
            <Link to="/web-developer-machesney-park-illinois/">Machesney Park</Link>,{" "}
            <Link to="/web-developer-byron-illinois/">Byron</Link>,{" "}
            <Link to="/web-developer-roscoe-illinois/">Roscoe</Link>,{" "}
            <Link to="/web-developer-rockton-illinois/">Rockton</Link>,{" "}
            <Link to="/web-developer-south-beloit-illinois/">South Beloit</Link>,{" "}
            <Link to="/web-developer-beloit-wisconsin/">Beloit, WI</Link>, and{" "}
            <Link to="/web-developer-janesville-wisconsin/">Janesville, WI</Link>. If you are in the broader
            Northwest Illinois or Southern Wisconsin region, the same work applies.
          </p>
        </>
      }
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Common questions</h3>
            <p className="pkg-card__desc">
              I broke the common fit, scope, and process questions into a separate FAQ so the answers
              are easier to skim before you reach out.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/northwest-illinois-web-development-faq/">
                Read the FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Website help and repair</h3>
            <p className="pkg-card__desc">
              If your Rockford site is already live but broken, slow, or unfinished, the website help
              page explains the repair and cleanup process without turning it into agency copy.
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
          <img src="/package-images/city-evidence-pricing.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
          <img src="/package-images/city-evidence-contact.svg" alt="" className="pkg-card__bg" loading="lazy" />
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
      <p><strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Durand, Davis, and Northwest Illinois. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link></p>
      <p style={{ marginTop: "0.5rem" }}>Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.</p>
    </div>
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
        telephone: "+16083135373",
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
      telephone: "+16083135373",
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
