import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/pricing/";
const pageTitle = "Pricing — Website Design & Web Development | Bradley Matera";
const pageDescription =
  "Transparent website pricing for Northwest Illinois. Starter sites from $447, growth sites from $797, premium from $1,497. No hidden fees, no contracts.";

const starterFeatures = [
  "Up to 5 pages",
  "Mobile-ready, SEO-ready",
  "Contact form with spam protection",
  "Hosting setup (Netlify or equivalent)",
  "Google Search Console + sitemap submission",
  "Schema markup (LocalBusiness, Service)",
  "2 rounds of revisions",
  "14-day build time",
  "30-day post-launch warranty",
  "24-hour response guarantee",
];

const growthFeatures = [
  "Everything in Starter, plus:",
  "Up to 10 pages",
  "Google Business Profile setup and optimization",
  "Advanced schema markup (FAQ, Breadcrumbs)",
  "3 rounds of revisions",
  "Copywriting assistance for all pages",
  "Google Analytics 4 setup",
  "Social media meta tags",
  "30-day post-launch warranty",
  "24-hour response guarantee",
];

const premiumFeatures = [
  "Everything in Growth, plus:",
  "Unlimited pages",
  "Custom integrations and API connections",
  "AI chat assistant setup",
  "Priority support (same-day response)",
  "Monthly strategy call (30 min)",
  "Unlimited small fixes during build",
  "30-day post-launch warranty",
];

const alaCarteItems = [
  "Domain registration (~$15/year)",
  "Logo and branding (custom quoted)",
  "Custom photography (custom quoted)",
  "Paid ad management (custom quoted)",
  "E-commerce functionality (custom quoted)",
  "3-day rush delivery (+$150)",
];

const faqs = [
  {
    question: "Why are you cheaper than other agencies?",
    answer:
      "I'm a one-person operation with no office, no sales team, no overhead. You pay for the actual work, not for a fancy address. Industry surveys (e.g., Clutch's 2024 web design cost survey) report typical agency small-business websites run $3,000–$8,000+. I don't have that payroll.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Hosting and support are month-to-month. You can cancel anytime. There's no long-term contract for the build itself.",
  },
  {
    question: "What if I want to leave?",
    answer:
      "You take the site with you. The code, the content, the domain — all yours. I'll help you migrate to your own hosting at no extra charge.",
  },
  {
    question: "What's the deposit and payment schedule?",
    answer:
      "50% deposit to start, 50% on launch. Monthly support starts when the site goes live.",
  },
  {
    question: "Can I upgrade tiers later?",
    answer:
      "Yes. If you start on Starter and want to add features later, I'll quote the difference. No need to commit to the bigger tier upfront.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "For Growth and Premium tiers, yes. I can split the build cost into 2 or 3 payments if needed. Just ask.",
  },
  {
    question: "How long does a build take?",
    answer:
      "Starter sites typically take 14 days. Growth projects run 3-4 weeks. Premium timelines are scoped per project.",
  },
  {
    question: "Do you work with clients outside Illinois?",
    answer:
      "Absolutely. I'm based in Durand, Illinois, but work with clients anywhere. Everything runs remote.",
  },
];

const internalLinks = [
  { label: "Web Developer in Durand & Davis, Illinois", href: "/web-developer-durand-davis-illinois/" },
  { label: "Web Developer in Rockford, Illinois", href: "/web-developer-rockford-illinois/" },
  { label: "Web Developer in Freeport, Illinois", href: "/web-developer-freeport-illinois/" },
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
            <strong>How much does a website cost?</strong> Website builds start at $447 for a Starter
            site (5 pages, SEO-ready), $797 for a Growth site (10 pages, Google Business Profile setup),
            and $1,497 for a Premium site (unlimited pages, e-commerce, multi-city SEO). Monthly
            support ranges from $37 to $97. No contracts — cancel anytime.
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
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Starter — $447 build + $37/month</h2>
          <p className="feature-card__body">
            For: New businesses or solo operators who need a clean website
          </p>
          <ul className="feature-list">
            {starterFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Get started
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Growth — $797 build + $67/month</h2>
          <p className="feature-card__body">
            For: Established service businesses ready to compete online
          </p>
          <p className="feature-card__body">
            <strong>Best value for established businesses</strong>
          </p>
          <ul className="feature-list">
            {growthFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Choose Growth
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Premium — $1,497 build + $97/month</h2>
          <p className="feature-card__body">
            For: Businesses ready to dominate their local market
          </p>
          <ul className="feature-list">
            {premiumFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Choose Premium
            </Link>
          </div>
        </Card>
      </div>

      <h2 className="section-title" style={{ marginTop: "2rem" }}>Pricing comparison at a glance</h2>
      <table className="pricing-comparison-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "left", padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Feature</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Starter ($447)</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Growth ($797)</th>
            <th scope="col" style={{ padding: "0.5rem", borderBottom: "2px solid currentColor" }}>Premium ($1,497)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Pages</td><td style={{ textAlign: "center" }}>Up to 5</td><td style={{ textAlign: "center" }}>Up to 10</td><td style={{ textAlign: "center" }}>Unlimited</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Monthly support</td><td style={{ textAlign: "center" }}>$37/mo</td><td style={{ textAlign: "center" }}>$67/mo</td><td style={{ textAlign: "center" }}>$97/mo</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>SEO-ready</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Google Business Profile</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Yes</td><td style={{ textAlign: "center" }}>Yes</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Schema markup</td><td style={{ textAlign: "center" }}>Basic</td><td style={{ textAlign: "center" }}>Advanced</td><td style={{ textAlign: "center" }}>Full</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Revisions</td><td style={{ textAlign: "center" }}>2 rounds</td><td style={{ textAlign: "center" }}>3 rounds</td><td style={{ textAlign: "center" }}>Unlimited</td></tr>
          <tr><td style={{ padding: "0.5rem", borderBottom: "1px solid rgba(128,128,128,0.2)" }}>Build time</td><td style={{ textAlign: "center" }}>14 days</td><td style={{ textAlign: "center" }}>3-4 weeks</td><td style={{ textAlign: "center" }}>Scoped per project</td></tr>
          <tr><td style={{ padding: "0.5rem" }}>E-commerce</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>No</td><td style={{ textAlign: "center" }}>Yes (custom quoted)</td></tr>
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
        <Card variant="outline">
          <h2 className="feature-card__title">Site Refresh — $597</h2>
          <p className="feature-card__body">
            Visual updates, content restructuring, mobile improvements, SEO basics.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Get a refresh
            </Link>
          </div>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Hourly Work — $65/hour</h2>
          <p className="feature-card__body">
            Light maintenance, one-off changes, targeted fixes. 1-hour minimum.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/contact/">
              Book hourly work
            </Link>
          </div>
        </Card>
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
      eyebrow="The promise"
      title="If you don't like it, you don't pay."
      description={
        <>
          <p>
            Every build starts with a 50% deposit. After the first round of revisions, if you're not
            happy with the direction, you get the deposit back. No fight, no contract trap. The whole
            site is yours when it's done. The domain is yours. The code is yours.
          </p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
            See <Link to="/projects/">project write-ups</Link> for examples of completed work with real GitHub repos,
            or read the <Link to="/northwest-illinois-web-development-faq/">web development FAQ</Link> for
            process details. Pricing rationale is documented in the <Link to="/about/">about page</Link>.
            This site itself is the proof: it's built with Gatsby, deployed on Netlify, scores SEO 100 and Accessibility 98 on Lighthouse, and runs 234 automated tests on every build.
          </p>
        </>
      }
    />

    <Section
      eyebrow="FAQ"
      title="Common pricing questions"
      description={
        <p>
          The questions I hear most often about how pricing, contracts, and the build process
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
        name: "Bradley Matera",
        url: site.siteUrl,
        telephone: "+16502651193",
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
          name: "Starter — $447 build + $37/month",
          price: "447",
          priceCurrency: "USD",
          description:
            "Up to 5 pages, mobile-ready, SEO-ready, contact form, hosting setup, schema markup, 2 rounds of revisions, 14-day build time.",
        },
        {
          "@type": "Offer",
          name: "Growth — $797 build + $67/month",
          price: "797",
          priceCurrency: "USD",
          description:
            "Up to 10 pages, Google Business Profile setup, advanced schema markup, copywriting assistance, GA4 setup, 3 rounds of revisions.",
        },
        {
          "@type": "Offer",
          name: "Premium — $1,497 build + $97/month",
          price: "1497",
          priceCurrency: "USD",
          description:
            "Unlimited pages, custom integrations, AI chat assistant setup, priority support, monthly strategy call, unlimited small fixes during build.",
        },
        {
          "@type": "Offer",
          name: "Site Refresh — $597",
          price: "597",
          priceCurrency: "USD",
          description:
            "Visual updates, content restructuring, mobile improvements, SEO basics for existing sites.",
        },
        {
          "@type": "Offer",
          name: "Hourly Work — $65/hour",
          price: "65",
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
