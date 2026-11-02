import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Link, Section } from "../../ui";
import {
  IP_WORDING,
  NO_CONTRACTS_REPLACEMENT,
  PACKAGES,
  REFUND_POLICY,
  RESPONSE_TIME_CLARIFICATION,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
} from "../../site/legal/business-identity";
import { COUNTY_SOURCES, MUNICIPAL_SOURCES } from "./city-references";
import { getCityArtProfile } from "./city-visuals";
import LocalIllustration from "./LocalIllustration";
import { NEW_CITY_CONFIGS } from "./city-configs";
import "./local-pages.css";

export type CityPageConfig = {
  city: string;
  state: string;
  stateAbbrev: string;
  slug: string;
  pageTitle: string;
  pageDescription: string;
  distance: string;
  direction: string;
  cityContext: string;
  marketContext: string;
  localDetails: string;
  industries?: string[];
  allCitySlugs: Array<{ slug: string; label: string }>;
  county: string;
  cityImage: string;
};

type DemoChoice = {
  slug: string;
  name: string;
  industry: string;
  summary: string;
};

const demoChoices: Record<string, DemoChoice> = {
  agriculture: { slug: "agriculture", name: "Kishwaukee Valley Farm Services", industry: "Agriculture", summary: "See how inventory, financing, service requests, and trust details can work together." },
  automotive: { slug: "auto-repair", name: "Northside Auto Repair", industry: "Auto repair", summary: "See a service-led site with coupons, repair information, reviews, and a clear booking path." },
  dental: { slug: "dental", name: "Rock River Family Dental", industry: "Dental", summary: "See treatment information, patient tools, insurance guidance, and emergency pathways." },
  home: { slug: "hvac", name: "ComfortAir Heating & Cooling", industry: "Home services", summary: "See emergency contact paths, service explanations, financing details, and local trust signals." },
  law: { slug: "law-firm", name: "Rock River Legal Group", industry: "Legal", summary: "See a credibility-focused professional-services concept with consultation tools and clear disclaimers." },
  manufacturing: { slug: "manufacturing", name: "Sterling Metalworks", industry: "Manufacturing", summary: "See capabilities, material specifications, quality steps, and a detailed request-for-quote flow." },
  restaurant: { slug: "restaurant", name: "Riverside Grill", industry: "Restaurant", summary: "See menus, reservations, reviews, location details, and mobile-first calls to action." },
  retail: { slug: "beauty-salon", name: "Bella Vista Salon", industry: "Appointment business", summary: "See services, staff profiles, reviews, galleries, and an appointment-focused customer journey." },
};

const chooseDemo = (industries: string[] = []): DemoChoice => {
  const text = industries.join(" ").toLowerCase();
  if (/farm|agricultur/.test(text)) return demoChoices.agriculture;
  if (/dental|health/.test(text)) return demoChoices.dental;
  if (/law|legal|government/.test(text)) return demoChoices.law;
  if (/manufactur|industrial|metal|logistics|distribution/.test(text)) return demoChoices.manufacturing;
  if (/restaurant|food|hospitality|tourism/.test(text)) return demoChoices.restaurant;
  if (/construction|home|hvac|plumb|roof/.test(text)) return demoChoices.home;
  if (/retail|beauty|personal/.test(text)) return demoChoices.retail;
  return demoChoices.automotive;
};

const money = (amount: number) => `$${amount.toLocaleString("en-US")}`;
const cityImageBySlug = new Map(NEW_CITY_CONFIGS.map((place) => [place.slug, place.cityImage]));

export const createCityPage = (config: CityPageConfig) => {
  const { city, state, stateAbbrev, slug, distance, industries = [], allCitySlugs, county, cityImage } = config;
  const pathname = `/${slug}/`;
  const contactPath = `/contact/?source=city-page&city=${encodeURIComponent(city)}&landing=${encodeURIComponent(pathname)}`;
  const placeIndex = allCitySlugs.findIndex((place) => place.slug === slug);
  const nearbyCities = Array.from({ length: 4 }, (_, offset) => allCitySlugs[(placeIndex + offset + 1) % allCitySlugs.length]);
  const municipality = MUNICIPAL_SOURCES[slug];
  const countySource = COUNTY_SOURCES[county];
  const artwork = getCityArtProfile(slug);
  const visual = artwork.industry;
  const demo = visual === "supplier" ? demoChoices.manufacturing : visual === "appointment" ? demoChoices.retail : visual === "visit" ? demoChoices.restaurant : visual === "catalog" ? demoChoices.agriculture : chooseDemo(industries);
  const proximity = distance === "local to the area"
    ? distance
    : `about ${distance.replace(/^about\s+/, "")} from Durand`;
  const businessTypes = industries.length > 0
    ? industries.slice(0, 5)
    : ["Home services", "Professional services", "Retail", "Restaurants", "Local organizations"];
  const seoDescription = `Website design for ${city}, ${state}: transparent packages from $447, local SEO foundations, site repair, and direct support from Bradley Matera.`;

  const faqItems = [
    {
      question: `How much does a business website cost in ${city}?`,
      answer: `Website packages currently start at ${money(PACKAGES[0].buildPrice)} for Starter Presence, ${money(PACKAGES[1].buildPrice)} for Local Growth, and ${money(PACKAGES[2].buildPrice)} for Lead Engine. Final scope and price are confirmed in writing before work begins.`,
    },
    {
      question: "How long does a website project take?",
      answer: `Starter Presence is estimated at ${PACKAGES[0].buildTime.toLowerCase()}. Local Growth is estimated at ${PACKAGES[1].buildTime.toLowerCase()}. Larger projects use the timeline written into the approved scope.`,
    },
    {
      question: "Will I own the finished website?",
      answer: IP_WORDING.ownership,
    },
    {
      question: `Can you guarantee first-page rankings in ${city}?`,
      answer: "No ethical provider can guarantee a search position. I build the technical, content, accessibility, and local-business foundations search engines need, then measure what is working. Results also depend on relevance, competition, reviews, authority, and ongoing business activity.",
    },
    {
      question: "What warranty and refund terms apply?",
      answer: `Every package includes a 30-day post-launch warranty covering bugs caused by the build. ${REFUND_POLICY.depositRefund}`,
    },
    {
      question: `Do you meet with ${city} business owners in person?`,
      answer: `Projects can be handled remotely, and a scheduled local meeting can be arranged when it helps the scope. Bradley is based in Durand, Illinois; the practical travel estimate listed for ${city} is ${proximity}.`,
    },
  ];

  const CityPage: React.FC = () => (
    <Layout>
      <div className={`city-sales-page local-editorial city-visual--${visual} local-region--${artwork.region}`} style={{ "--city-photo": `url(/city-images/${cityImage})` } as React.CSSProperties}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li className="breadcrumbs__item"><Link to="/">Home</Link></li>
            <li className="breadcrumbs__item" aria-current="page">Website design in {city}, {stateAbbrev}</li>
          </ol>
        </nav>

        <Section
          className="city-sales-hero"
          eyebrow={`Website design for ${city}, ${stateAbbrev}`}
          titleAs="h1"
          title={<>Turn your website into a <strong>clear path to the next customer</strong></>}
          description={
            <>
              <p className="direct-answer">
                Bradley Matera builds and repairs small-business websites for {city} with transparent packages starting at {money(PACKAGES[0].buildPrice)}, local SEO foundations, and direct access to the person doing the work.
              </p>
              <p>
                You will get a written scope, a practical conversion plan, and honest limits on what a website can promise. I am based in Durand, Illinois; the listed travel estimate for {city} is {proximity}.
              </p>
            </>
          }
          actions={
            <>
              <Link data-variant="primary" to={contactPath} data-analytics-click="city_plan_cta">Get my free website plan</Link>
              <a data-variant="ghost" className="link" href={SELLER_PHONE_HREF}>Call {SELLER_PHONE}</a>
              <Link data-variant="ghost" to="/pricing/">See packages</Link>
            </>
          }
        >
          <div className="city-visual-stage">
            <span className="city-visual-stage__orbit" aria-hidden="true" />
            <figure className="city-editorial-photo"><img
              src={`/city-images/${cityImage}`}
              alt={`${city}, ${state} community view`}
              className="city-sales-hero__image"
              loading="eager"
            /><figcaption><span>{city}, {stateAbbrev}</span><strong>{county}</strong><Link to="/image-credits/">Local photograph · image credits</Link></figcaption></figure>
            <Link className="city-preview-inset" to={`/demos/${demo.slug}/`} aria-label={`Explore the ${demo.name} fictional website concept`}>
              <span className="city-preview-inset__bar"><span aria-hidden="true">● ● ●</span> Website concept</span>
              <img src={`/images/demos/previews/${demo.slug}.webp`} alt="" loading="eager" />
              <span className="city-preview-inset__caption">Fictional business · explore the design <span aria-hidden="true">↗</span></span>
            </Link>
          </div>
        </Section>
        <ul className="city-trust-bar" aria-label="Project commitments">
          <li><span aria-hidden="true">01</span>Built directly by Bradley</li>
          <li><span aria-hidden="true">02</span>{NO_CONTRACTS_REPLACEMENT}</li>
          <li><span aria-hidden="true">03</span>30-day build-bug warranty</li>
        </ul>
        <nav className="city-page-nav" aria-label="On this city page"><span>Explore the plan</span><a href="#website-services">Services</a><a href="#website-concept">Design example</a><a href="#website-packages">Packages</a><a href="#website-process">Process</a><a href="#website-questions">Questions</a></nav>

        <Section
          id="website-services"
          className="city-services-section"
          eyebrow="Choose the right starting point"
          title={`What does your ${city} business need the website to do?`}
          description={<p>Start with the business problem. The technology and page count follow from that decision.</p>}
        >
          <div className="grid-three city-service-grid">
            <article className="pkg-card">
              <div className="city-service-media"><LocalIllustration kind={artwork.design} /><span>01 / Website design</span></div>
              <div className="pkg-card__body">
                <h3 className="pkg-card__title">Win more of the right inquiries</h3>
                <p className="pkg-card__desc">A focused new site with clear services, proof, calls to action, mobile layouts, analytics, and a contact path visitors can finish.</p>
                <div className="card-actions"><Link data-variant="primary" to="/services/small-business-web-design/">Website design</Link></div>
              </div>
            </article>
            <article className="pkg-card">
              <div className="city-service-media city-service-media--local"><LocalIllustration kind="search" /><img className="city-service-media__place" src={`/city-images/${cityImage}`} alt="" loading="lazy" /><span>02 / Local search</span></div>
              <div className="pkg-card__body">
                <h3 className="pkg-card__title">Build local search foundations</h3>
                <p className="pkg-card__desc">Useful service pages, accurate business details, structured data, technical cleanup, and Google Business Profile alignment without a ranking guarantee.</p>
                <div className="card-actions"><Link data-variant="primary" to="/services/local-seo/">Local SEO</Link></div>
              </div>
            </article>
            <article className="pkg-card">
              <div className="city-service-media"><LocalIllustration kind="refresh" /><span>03 / Website repair</span></div>
              <div className="pkg-card__body">
                <h3 className="pkg-card__title">Fix the site you already own</h3>
                <p className="pkg-card__desc">Repair broken forms, confusing navigation, stale dependencies, deployment problems, content gaps, and mobile usability issues.</p>
                <div className="card-actions"><Link data-variant="primary" to="/services/website-repair/">Website repair</Link></div>
              </div>
            </article>
          </div>
        </Section>

        <Section
          className="city-local-accuracy"
          eyebrow="Local accuracy before local hype"
          title={`A ${city} page should help a customer verify the business`}
          description={<p>Local SEO works best when the website and public profiles describe the real business consistently. City names should reflect where you genuinely operate, not pretend locations.</p>}
        >
          <div className="city-context-layout">
            <aside className="city-place-panel">
              <div className="city-place-panel__photo" aria-hidden="true" />
              <div><span>{state}</span><h3>{city}</h3><p>{county}</p><Link to="/service-areas/">Explore the region <span aria-hidden="true">↗</span></Link></div>
            </aside>
            <div className="grid-two">
            <div className="pkg-card">
              <div className="pkg-card__body">
                <h3 className="pkg-card__title">Details customers should be able to confirm</h3>
                <ul className="feature-list">
                  <li>Business name, working phone number, and contact method</li>
                  <li>Actual service area, office or storefront details, and hours</li>
                  <li>Services, qualifications, policies, and realistic availability</li>
                  <li>Original photos, attributable reviews, examples, and clear disclaimers</li>
                  <li>The same core facts on the website and Google Business Profile</li>
                </ul>
              </div>
            </div>
            <div className="pkg-card">
              <div className="pkg-card__body">
                <h3 className="pkg-card__title">Website types worth considering here</h3>
                <p className="pkg-card__desc">These are project categories suggested by the local market—not claims that every listed organization is a client.</p>
                <ul className="feature-list">{businessTypes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            </div>
          </div>
        </Section>

        <Section
          id="website-concept"
          className="city-concept-section"
          eyebrow="See the standard"
          title="A complete concept is more useful than a vague portfolio tile"
          description={<p>The example below is explicitly fictional. It demonstrates structure and interaction, not a client result or endorsement.</p>}
        >
          <article className="city-demo-proof">
            <img src={`/images/demos/previews/${demo.slug}.webp`} alt={`${demo.name} concept website preview — fictional business`} loading="lazy" />
            <div className="city-demo-proof__body">
              <span className="city-demo-proof__label">Concept demo — fictional business</span>
              <h3>{demo.name}</h3>
              <p>{demo.summary}</p>
              <div className="card-actions">
                <Link data-variant="primary" to={`/demos/${demo.slug}/`}>Explore the concept</Link>
                <Link data-variant="ghost" to="/demos/">See all demos</Link>
              </div>
            </div>
          </article>
        </Section>

        <Section
          id="website-packages"
          className="city-packages-section"
          eyebrow="Transparent website packages"
          title="Pick a starting scope before you book a call"
          description={<p>These public package definitions are used across the site so price, revisions, timing, and warranty language stay consistent.</p>}
        >
          <div className="grid-three city-package-grid">
            {PACKAGES.map((pkg) => (
              <article className="pkg-card" key={pkg.id}>
                <div className="pkg-card__body">
                  <p className="city-package-price">{money(pkg.buildPrice)} build</p>
                  <h3 className="pkg-card__title">{pkg.name}</h3>
                  <p className="pkg-card__desc">{pkg.description}</p>
                  <ul className="feature-list">
                    <li>{pkg.maxPages}</li>
                    <li>{pkg.revisionRounds} revision {pkg.revisionRounds === 1 ? "round" : "rounds"}</li>
                    <li>{pkg.buildTime}</li>
                    <li>{money(pkg.monthlyPrice)}/month optional {pkg.monthlyPlanName}</li>
                    <li>30-day post-launch warranty</li>
                  </ul>
                  <div className="card-actions"><Link data-variant="primary" to={`${contactPath}&package=${pkg.id}`}>Ask about {pkg.name}</Link></div>
                </div>
              </article>
            ))}
          </div>
          <p className="city-terms-note"><strong>Support wording:</strong> {RESPONSE_TIME_CLARIFICATION} {NO_CONTRACTS_REPLACEMENT}</p>
        </Section>

        <Section
          id="website-process"
          className="city-process-section"
          eyebrow="A practical four-step process"
          title={`From first conversation to a working ${city} business website`}
          description={<LocalIllustration kind={artwork.process} caption="A clear plan. A shared preview. An agreed launch." className="city-process-art" />}
        >
          <ol className="city-process-grid">
            <li><strong>Diagnose:</strong> Identify the customer, conversion goal, current problems, and what must be true at launch.</li>
            <li><strong>Scope:</strong> Put pages, features, price, timeline, responsibilities, and revision rounds in writing.</li>
            <li><strong>Build and review:</strong> Create the site, test mobile and keyboard use, connect analytics, and complete the agreed revision rounds.</li>
            <li><strong>Launch and measure:</strong> Publish after approval and payment, verify forms and indexing, then review real behavior instead of guessing.</li>
          </ol>
        </Section>

        <Section id="website-questions" className="city-questions-section" eyebrow="Straight answers" title={`Website design questions from ${city} business owners`}>
          <div className="grid-two city-faq-grid">
            {faqItems.map((item) => (
              <details className="city-faq-item" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>
            ))}
          </div>
        </Section>

        <Section
          className="city-verification"
          eyebrow="Fact-check this page"
          title="Independent local references and regional service areas"
          description={<p>These public links help verify place names and government boundaries. They are references, not endorsements of Bradley Matera or Matera Digital.</p>}
        >
          <div className="grid-two">
            <div>
              <h3>Local references</h3>
              <ul className="city-source-list">
                {municipality && <li><a href={municipality.url}>{municipality.label} official website</a></li>}
                {countySource && <li><a href={countySource}>{county} official website</a></li>}
                <li><a href="https://data.census.gov/">U.S. Census Bureau data portal</a></li>
                <li><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide">Google Search Central SEO Starter Guide</a></li>
              </ul>
            </div>
            <div>
              <h3>More service-area pages</h3>
              <ul className="city-regional-cards">{nearbyCities.map((place) => <li key={place.slug}><Link to={`/${place.slug}/`}>{cityImageBySlug.has(place.slug) && <img src={`/city-images/${cityImageBySlug.get(place.slug)}`} alt="" loading="lazy" />}<span>Website design in {place.label}<span aria-hidden="true">↗</span></span></Link></li>)}</ul>
            </div>
          </div>
        </Section>

        <Section
          className="city-final-cta"
          eyebrow="Your next step"
          title={`Get a useful website plan for your ${city} business`}
          description={<p>Tell me what the business sells, who the customer is, what the current site gets wrong, and what a good inquiry is worth. I will reply with the clearest next step I can recommend.</p>}
          actions={
            <>
              <Link data-variant="primary" to={contactPath} data-analytics-click="city_plan_cta">Get my free website plan</Link>
              <a data-variant="ghost" className="link" href={SELLER_PHONE_HREF}>Call {SELLER_PHONE}</a>
            </>
          }
        ><LocalIllustration kind={artwork.industry} className="city-final-cta__art" caption="A design direction, shaped around your business." /><p className="city-final-cta__note">No obligation. No ranking guarantee. Scope, price, timeline, and ownership terms are documented before work begins.</p></Section>
      </div>
    </Layout>
  );

  const Head: HeadFC = () => {
    const site = useSiteMetadata();
    const pageUrl = `${site.siteUrl}${pathname}`;
    const personId = `${site.siteUrl.replace(/\/$/, "")}/#person`;
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `Website design and local SEO services for ${city}, ${state}`,
        url: pageUrl,
        description: seoDescription,
        serviceType: ["Website design", "Website repair", "Local SEO", "Small business websites"],
        provider: { "@id": personId },
        areaServed: [
          { "@type": "City", name: `${city}, ${state}` },
          { "@type": "AdministrativeArea", name: county },
        ],
        offers: PACKAGES.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          price: pkg.buildPrice,
          priceCurrency: "USD",
          url: `${site.siteUrl}/pricing/`,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ];

    return (
      <Seo
        title={`Website Design in ${city}, ${stateAbbrev}`}
        description={seoDescription}
        pathname={pathname}
        canonicalUrl={pageUrl}
        structuredData={structuredData}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: `Website design in ${city}, ${stateAbbrev}`, path: pathname },
        ]}
      />
    );
  };

  return { default: CityPage, Head };
};
