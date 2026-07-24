import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import {
  SELLER_LEGAL_NAME,
  SELLER_DISCLOSURE_SHORT,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  PACKAGES,
  HOURLY_RATE,
  SITE_REFRESH_PRICE,
  REFUND_POLICY,
  NO_CONTRACTS_REPLACEMENT,
} from "../site/legal/business-identity";

const pathname = "/pricing/";
const pageTitle = "Pricing — Website Design & Web Development | Bradley F. Matera";
const pageDescription =
  "Transparent website pricing for Northwest Illinois. Starter $447, Growth $797, Lead Engine from $1,497. Written agreements, no hidden fees.";

const [starterPkg, growthPkg, leadEnginePkg] = PACKAGES;

const alaCarteItems = [
  "Domain registration (~$15/year)",
  "Logo and branding (custom quoted)",
  "Custom photography (custom quoted)",
  "Paid ad management (custom quoted)",
  "E-commerce functionality (custom quoted)",
  "AI integrations (custom quoted)",
  "3-day rush delivery (+$150)",
];

const faqs = [
  {
    question: "Why are you cheaper than other agencies?",
    answer:
      "I'm a one-person operation with no office, no sales team, no overhead. You pay for the actual work, not for a fancy address. Industry surveys (e.g., Clutch's 2024 web design cost survey — https://clutch.co/web-design/pricing) report typical agency small-business websites run $3,000–$8,000+. I don't have that payroll.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Every website project uses a written service agreement and scope of work. Website care plans are month-to-month with no long-term commitment — cancel before the next billing period. There is no long-term contract for the build itself, but there is a signed project agreement.",
  },
  {
    question: "What if I want to leave?",
    answer:
      "You take the site with you. The code, the content, the domain — all yours after final payment. I'll help you migrate to your own hosting at no extra charge.",
  },
  {
    question: "What's the deposit and payment schedule?",
    answer:
      "50% deposit to start, 50% on launch. Work begins only after the service agreement, scope, and deposit are received. Monthly support starts when the site goes live.",
  },
  {
    question: "Can I upgrade tiers later?",
    answer:
      "Yes. If you start on Starter and want to add features later, I'll quote the difference. No need to commit to the bigger tier upfront.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "For Growth and Lead Engine tiers, yes. I can split the build cost into 2 or 3 payments if needed. Just ask.",
  },
  {
    question: "How long does a build take?",
    answer:
      `Starter sites typically take ${starterPkg.buildTime}. Growth projects run ${growthPkg.buildTime}. Lead Engine timelines are defined in the written scope.`,
  },
  {
    question: "Do you work with clients outside Illinois?",
    answer:
      "Absolutely. I'm based in Durand, Illinois, but work with clients anywhere. Everything runs remote.",
  },
];

const internalLinks = [
  { label: "Small Business Web Design", href: "/services/small-business-web-design/" },
  { label: "Website Redesign", href: "/services/website-redesign/" },
  { label: "Local SEO Services", href: "/services/local-seo/" },
  { label: "Website Repair", href: "/services/website-repair/" },
  { label: "Website Accessibility", href: "/services/website-accessibility/" },
  { label: "Website Care Plans", href: "/services/website-care-plans/" },
  { label: "Web Developer in Durand & Davis, Illinois", href: "/web-developer-durand-davis-illinois/" },
  { label: "Web Developer in Rockford, Illinois", href: "/web-developer-rockford-illinois/" },
  { label: "Northwest Illinois Web Development FAQ", href: "/northwest-illinois-web-development-faq/" },
];

const PricingPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Pricing
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Pricing"
      titleAs="h1"
      title={
        <>
          <strong>Straightforward pricing.</strong> No surprise invoices.
        </>
      }
      description={
        <>
          <p>
            Most agencies hide their prices until you're already committed. I don't do that. Here's
            exactly what you pay, what you get, and what costs extra.
          </p>
          <p className="direct-answer" style={{ fontSize: "1.05rem", lineHeight: 1.6, marginTop: "0.75rem" }}>
            <strong>How much does a website cost?</strong> Website builds start at ${starterPkg.buildPrice} for a Starter
            site (up to 5 pages, SEO-ready), ${growthPkg.buildPrice} for a Growth site (up to 10 pages, Google Business Profile alignment),
            and ${leadEnginePkg.buildPrice.toLocaleString()} for a Lead Engine site (page count and timeline defined in the written scope). Monthly
            support ranges from ${starterPkg.monthlyPrice} to ${leadEnginePkg.monthlyPrice}. {NO_CONTRACTS_REPLACEMENT}
          </p>
        </>
      }
      actions={
        <>
          <a href={SELLER_PHONE_HREF} data-variant="ghost" className="link">
            {SELLER_PHONE}
          </a>
          <Link data-variant="primary" to="/contact/">
            Free consultation
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/starter-presence.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">{starterPkg.name} — ${starterPkg.buildPrice} build + ${starterPkg.monthlyPrice}/month</h2>
            <p className="pkg-card__desc">For: New businesses or solo operators who need a clean website</p>
            <ul className="feature-list">
              {starterPkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">Get started</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/local-growth.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">{growthPkg.name} — ${growthPkg.buildPrice} build + ${growthPkg.monthlyPrice}/month</h2>
            <p className="pkg-card__desc">For: Established service businesses ready to compete online</p>
            <p className="pkg-card__desc"><strong>Best value for established businesses</strong></p>
            <ul className="feature-list">
              {growthPkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">Choose Local Growth</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/lead-engine.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">{leadEnginePkg.name} — from ${leadEnginePkg.buildPrice.toLocaleString()} build + ${leadEnginePkg.monthlyPrice}/month</h2>
            <p className="pkg-card__desc">For: Businesses ready to dominate their local market</p>
            <ul className="feature-list">
              {leadEnginePkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">Choose Lead Engine</Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="section-title" style={{ marginTop: "2rem" }}>Pricing comparison at a glance</h2>
      <table className="pricing-comparison-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Feature</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Starter Presence (${starterPkg.buildPrice})</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Local Growth (${growthPkg.buildPrice})</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Lead Engine (${leadEnginePkg.buildPrice.toLocaleString()}+)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Pages</td><td style={{ textAlign: "center" }}>Up to 5</td><td style={{ textAlign: "center" }}>Up to 10</td><td style={{ textAlign: "center" }}>Per scope</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Monthly support</td><td style={{ textAlign: "center" }}>${starterPkg.monthlyPrice}/mo</td><td style={{ textAlign: "center" }}>${growthPkg.monthlyPrice}/mo</td><td style={{ textAlign: "center" }}>${leadEnginePkg.monthlyPrice}/mo</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>SEO-ready</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Google Business Profile</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Schema markup</td><td style={{ textAlign: "center" }}>Basic</td><td style={{ textAlign: "center" }}>Advanced</td><td style={{ textAlign: "center" }}>Full</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Revisions</td><td style={{ textAlign: "center" }}>{starterPkg.revisionRounds} round</td><td style={{ textAlign: "center" }}>{growthPkg.revisionRounds} rounds</td><td style={{ textAlign: "center" }}>{leadEnginePkg.revisionRounds} rounds</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Build time</td><td style={{ textAlign: "center" }}>~14 days</td><td style={{ textAlign: "center" }}>3-4 weeks</td><td style={{ textAlign: "center" }}>Per scope</td></tr>
          <tr><td style={{ padding: "0.5rem" }}>E-commerce</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Custom quoted</td></tr>
        </tbody>
      </table>
    </Section>

    <Section
      eyebrow="Already have a site?"
      title="Refresh or targeted help"
      description={
        <p>
          Not every project needs a full rebuild. If your existing site just needs a facelift or
          small fixes, here's what that looks like.
        </p>
      }
    >
      <div className="grid-two">
        <div className="pkg-card">
          <img src="/package-images/addon-refresh.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Site Refresh — ${SITE_REFRESH_PRICE}</h2>
            <p className="pkg-card__desc">
              Visual updates, content restructuring, mobile improvements, SEO basics.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">
                Get a refresh
              </Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/addon-hourly.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Hourly Work — ${HOURLY_RATE}/hour</h2>
            <p className="pkg-card__desc">
              Light maintenance, one-off changes, targeted fixes. 1-hour minimum.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/contact/">
                Book hourly work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Ongoing care"
      title="Website care plans"
      description={
        <p>
          {NO_CONTRACTS_REPLACEMENT} These care plans cover the ongoing work that keeps your site fast, secure, and visible.
        </p>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/essential-care.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Essential Care — ${starterPkg.monthlyPrice}/month</h2>
            <ul className="feature-list">
              <li>Software and dependency updates</li>
              <li>Weekly backups</li>
              <li>Uptime monitoring</li>
              <li>Security checks</li>
              <li>24-hour response time (acknowledgment)</li>
            </ul>
            <div className="card-actions">
              <Link data-variant="ghost" to="/services/website-care-plans/">View Essential Care details</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/growth-care.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Growth Care — ${growthPkg.monthlyPrice}/month</h2>
            <p className="pkg-card__desc"><strong>Essential Care plus:</strong></p>
            <ul className="feature-list">
              <li>Content changes and updates</li>
              <li>Monthly performance report</li>
              <li>SEO monitoring and fixes</li>
              <li>Form and lead tracking</li>
              <li>24-hour response time (acknowledgment)</li>
            </ul>
            <div className="card-actions">
              <Link data-variant="ghost" to="/services/website-care-plans/">View Growth Care details</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/search-care.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Search Care — ${leadEnginePkg.monthlyPrice}/month</h2>
            <p className="pkg-card__desc"><strong>Growth Care plus:</strong></p>
            <ul className="feature-list">
              <li>Content optimization</li>
              <li>Local visibility work</li>
              <li>Quarterly strategy call</li>
              <li>Competitor monitoring</li>
              <li>Priority support (same-day acknowledgment)</li>
            </ul>
            <div className="card-actions">
              <Link data-variant="ghost" to="/services/website-care-plans/">View Search Care details</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="What's not included"
      title="À la carte items"
      description={
        <p>
          These aren't hidden fees — they're just things that fall outside the standard tiers. If
          you need any of them, I'll quote them up front so there are no surprises.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          {alaCarteItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="How pricing works"
      title="Transparent pricing, no surprises"
      description={
        <p>
          Here is the reasoning behind the numbers — why prices are fixed, what every package includes, and what the monthly fee actually covers.
        </p>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="pkg-card">
          <img src="/package-images/why-fixed.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Why prices are fixed, not hourly</h3>
            <p className="pkg-card__desc">
              New website builds are priced as fixed packages, not billed by the hour. You know the total cost before work begins, so there are no surprise invoices or scope creep charges. A fixed price means I absorb the risk of unexpected complexity — not you. If a build takes longer than estimated, you still pay the agreed price.
            </p>
            <p className="pkg-card__desc">
              A 5-page Growth package typically takes 14-21 days from kickoff to launch. That timeline includes design, development, content review, revisions, and a final QA pass before going live.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/whats-included.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">What's included in every package</h3>
            <p className="pkg-card__desc">
              Regardless of which tier you choose, every build includes:
            </p>
            <ul className="feature-list">
              <li>Hosting setup and configuration</li>
              <li>Domain connection (pointing your existing domain to the new site)</li>
              <li>SSL certificate installation and renewal</li>
              <li>Google Analytics 4 setup and verification</li>
              <li>Mobile-responsive design tested on real devices</li>
              <li>Basic on-page SEO (title tags, meta descriptions, heading structure)</li>
              <li>XML sitemap generation and submission to Google</li>
              <li>Contact form with spam protection</li>
            </ul>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/monthly-fee.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">What the monthly fee covers</h3>
            <p className="pkg-card__desc">
              The monthly care plan fee covers hosting, security updates, and ongoing support — not a lock-in contract. Plans are month-to-month. You can cancel before the next billing period with no penalty, and you take your site with you.
            </p>
            <p className="pkg-card__desc">
              The ${starterPkg.monthlyPrice}/month Starter hosting includes SSL renewal, weekly backups, and uptime monitoring. Higher tiers add content updates, performance reports, and local SEO monitoring.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/written-agreement-card.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Written agreement on every project</h3>
            <p className="pkg-card__desc">
              Every build includes a written service agreement that outlines the scope, timeline, cost, and payment schedule before any work begins. No verbal-only deals, no vague promises. Read the full <Link to="/terms/">Terms of Service</Link> for the complete terms.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Deposit guarantee"
      title="Deposit refund guarantee"
      description={
        <>
          <p>
            Every build starts with a 50% deposit. {REFUND_POLICY.depositRefund} {REFUND_POLICY.refundMethod} {REFUND_POLICY.nonwaivableRights}
          </p>
          <p>
            The whole site is yours when it's done. The domain is yours. The code is yours — after final payment.
          </p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
            See <Link to="/projects/">project write-ups</Link> for examples of completed work with real GitHub repos,
            or read the <Link to="/northwest-illinois-web-development-faq/">web development FAQ</Link> for
            process details. See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> and <Link to="/payment-terms/">Payment Terms</Link> for full details.
          </p>
        </>
      }
    />

    <Section
      eyebrow="FAQ"
      title="Common pricing questions"
      description={
        <p>
          The questions I hear most often about how pricing, agreements, and the build process
          actually work.
        </p>
      }
    >
      <div className="grid-two">
        {faqs.map((faq) => (
          <Card key={faq.question} variant="outline">
            <h3 className="feature-card__title">{faq.question}</h3>
            <p className="feature-card__body">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Still deciding?"
      title="Not sure which tier is right for you?"
      description={
        <p>
          Get a free consultation and I'll tell you exactly which tier fits, no pressure.
        </p>
      }
      actions={
        <>
          <Link data-variant="primary" to="/contact/">
            Get a free consultation
          </Link>
        </>
      }
    />

    <Section
      eyebrow="Explore more"
      title="Related pages"
      description={
        <p>
          More context on how I work, who I serve, and the common questions that come up before
          starting a project.
        </p>
      }
    >
      <div className="grid-two">
        {internalLinks.map((link) => (
          <Card key={link.href} variant="outline">
            <h3 className="feature-card__title">{link.label}</h3>
            <div className="card-actions">
              <Link data-variant="primary" to={link.href}>
                View page
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Section>

    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: "2rem", textAlign: "center" }}>
      {SELLER_DISCLOSURE_SHORT} Maintained by <Link to="/about/">{SELLER_LEGAL_NAME}</Link>, web developer in Durand, Illinois. Prices current as of 2026. See <Link to="/service-scope/">service scope</Link> and <Link to="/payment-terms/">payment terms</Link> for details.
    </p>
    <div className="attribution-block" style={{ maxWidth: "42rem", margin: "2rem auto", padding: "1rem 1.5rem", fontSize: "0.875rem", opacity: 0.7, borderTop: "1px solid var(--color-border)" }}>
      <p>
        <strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Northwest Illinois and Southern Wisconsin. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link>
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.
      </p>
    </div>
  </Layout>
);

export default PricingPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Design & Web Development Pricing",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Website design",
        "Web development",
        "Website refresh",
        "Local SEO",
        "Schema markup",
      ],
      provider: {
        "@type": "Person",
        name: SELLER_LEGAL_NAME,
        url: site.siteUrl,
        telephone: "+16083135373",
      },
      areaServed: [
        { "@type": "City", name: "Durand, Illinois" },
        { "@type": "City", name: "Rockford, Illinois" },
        { "@type": "City", name: "Freeport, Illinois" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
      offers: [
        {
          "@type": "Offer",
          name: `${starterPkg.name} — $${starterPkg.buildPrice} build + $${starterPkg.monthlyPrice}/month`,
          price: String(starterPkg.buildPrice),
          priceCurrency: "USD",
          description:
            "Up to 5 pages, mobile responsive, contact form, basic SEO, accessibility baseline, analytics setup, 1 revision round, ~14-day build time.",
        },
        {
          "@type": "Offer",
          name: `${growthPkg.name} — $${growthPkg.buildPrice} build + $${growthPkg.monthlyPrice}/month`,
          price: String(growthPkg.buildPrice),
          priceCurrency: "USD",
          description:
            "Up to 10 pages, local SEO foundations, conversion tracking, Google Business Profile alignment, 2 revision rounds, 3-4 week build time.",
        },
        {
          "@type": "Offer",
          name: `${leadEnginePkg.name} — from $${leadEnginePkg.buildPrice.toLocaleString()} build + $${leadEnginePkg.monthlyPrice}/month`,
          price: String(leadEnginePkg.buildPrice),
          priceCurrency: "USD",
          description:
            "Page count and timeline defined in written scope, custom conversion plan, service-area architecture, technical SEO, 3 revision rounds, post-launch measurement review.",
        },
        {
          "@type": "Offer",
          name: `Site Refresh — $${SITE_REFRESH_PRICE}`,
          price: String(SITE_REFRESH_PRICE),
          priceCurrency: "USD",
          description:
            "Visual updates, content restructuring, mobile improvements, SEO basics for existing sites.",
        },
        {
          "@type": "Offer",
          name: `Hourly Work — $${HOURLY_RATE}/hour`,
          price: String(HOURLY_RATE),
          priceCurrency: "USD",
          description: "Light maintenance, one-off changes, targeted fixes. 1-hour minimum.",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: pageUrl,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
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
        { name: "Pricing", path: pathname },
      ]}
    />
  );
};
