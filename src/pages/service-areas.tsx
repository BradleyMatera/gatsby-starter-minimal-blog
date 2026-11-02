import TableScroll from "../features/demos/TableScroll";
import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Link, Section } from "../ui";
import { NEW_CITY_CONFIGS } from "../features/local-seo/city-configs";
import LocalIllustration from "../features/local-seo/LocalIllustration";
import "../features/local-seo/local-pages.css";

const pathname = "/service-areas/";
const pageTitle = "Service Areas — Northwest Illinois and Southern Wisconsin | Bradley Matera";
const pageDescription =
  "Web development service areas in Northwest Illinois and Southern Wisconsin. Durand, Rockford, Freeport, Beloit WI, Janesville WI. Remote and in-person.";

const cityCards = NEW_CITY_CONFIGS.slice().sort((a, b) => a.city.localeCompare(b.city));

const industries = [
  "Restaurants and cafes",
  "Landscaping and lawn care",
  "HVAC and plumbing",
  "Auto repair and auto body",
  "Real estate agencies",
  "Salons and beauty studios",
  "Contractors and trades",
  "Retail and specialty shops",
];

const ServiceAreasPage = () => {
  const [query, setQuery] = React.useState("");
  const [state, setState] = React.useState("all");
  const filtered = cityCards.filter((city) => (state === "all" || city.stateAbbrev === state) && `${city.city} ${city.county}`.toLowerCase().includes(query.trim().toLowerCase()));
  const reset = () => { setQuery(""); setState("all"); };
  return (
  <Layout>
    <div className="local-editorial service-area-directory">
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Service Areas
        </li>
      </ol>
    </nav>

    <Section
      className="area-directory-hero"
      eyebrow="Service Areas"
      titleAs="h1"
      title={
        <>
          <strong>Service areas</strong> — Northwest Illinois and Southern Wisconsin.
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>Where does Bradley Matera work?</strong> Bradley serves Northwest Illinois and Southern Wisconsin from Durand/Davis, IL. Most work is done remotely with in-person meetings when it makes sense. See all served cities below.
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
        </>
      }
    >
      <div className="area-region-mosaic" aria-label="Views from the service region">
        <figure><img src="/city-images/rockford.jpg" alt="Rockford, Illinois community view" loading="eager" /><figcaption>Rockford, Illinois</figcaption></figure>
        <figure><img src="/city-images/durand-davis.jpg" alt="Durand and Davis, Illinois community view" loading="eager" /><figcaption>Durand &amp; Davis, Illinois</figcaption></figure>
        <figure><img src="/city-images/beloit-wi.jpg" alt="Beloit, Wisconsin community view" loading="eager" /><figcaption>Beloit, Wisconsin</figcaption></figure>
        <div className="area-region-mosaic__index"><strong>33</strong><span>Service-area pages<br />Illinois + Wisconsin</span></div>
      </div>
    </Section>

    <Section id="area-search" className="area-directory-results" eyebrow="Find your community" title="Explore the service areas">
      <div className="area-filters" role="search" aria-label="Find a service area">
        <div><label htmlFor="area-query">Find a city or county</label><input id="area-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="City or county" /></div>
        <div><label htmlFor="area-state">State</label><select id="area-state" value={state} onChange={(event) => setState(event.target.value)}><option value="all">Illinois and Wisconsin</option><option value="IL">Illinois</option><option value="WI">Wisconsin</option></select></div>
        <button type="button" onClick={reset}>Reset filters</button>
      </div>
      <p className="area-result-count" role="status">{filtered.length} of {cityCards.length} service areas</p>
      {filtered.length === 0 && <div className="area-empty"><p>No service areas match that search.</p><button type="button" onClick={reset}>Show all service areas</button></div>}
      <div className="area-directory-grid">
        {filtered.map((city) => <Link key={city.slug} to={`/${city.slug}/`} className="area-directory-card">
          <img src={`/city-images/${city.cityImage}`} alt="" loading="lazy" width={480} height={320} />
          <div><p>{city.state} · {city.county}</p><h2>{city.city}</h2><span>Explore website services <span aria-hidden="true">↗</span></span></div>
        </Link>)}
      </div>
    </Section>

    <Section
      className="area-comparison-section"
      eyebrow="Service areas at a glance"
      title="Cities served, distance, and county"
      description={
        <p>
          Most work is done remotely with in-person meetings available when needed. Travel times below are estimates from Durand, Illinois.
        </p>
      }
    >
      <TableScroll label="Service areas comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "2px solid var(--color-border)" }}>City</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "2px solid var(--color-border)" }}>State</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "2px solid var(--color-border)" }}>County</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "2px solid var(--color-border)" }}>Drive from Durand</th>
              <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "2px solid var(--color-border)" }}>Page</th>
            </tr>
          </thead>
          <tbody>
            {cityCards.map((city) => <tr key={city.slug}><td>{city.city}</td><td>{city.stateAbbrev}</td><td>{city.county}</td><td>{city.distance}</td><td><Link to={`/${city.slug}/`} aria-label={`Website services in ${city.city}`}>View page</Link></td></tr>)}
          </tbody>
        </table>
      </TableScroll>
    </Section>

    <Section
      className="area-working-section"
      eyebrow="Service radius"
      title="How Bradley works with local businesses"
      description={
        <p>
          Based in Durand/Davis, IL, Bradley builds websites remotely for clients across the region. In-person meetings are available when it makes sense — for kickoff, content review, or launch. Most communication happens by phone, email, and shared preview links.
        </p>
      }
    >
      <LocalIllustration kind="collaboration" className="area-working-visual" caption="Direct collaboration · shared previews · clear next steps" />
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Request a consultation</Link>
        <Link data-variant="ghost" to="/for-business/">See services</Link>
      </div>
    </Section>

    <Section
      className="area-industries-section"
      eyebrow="Industries"
      title="Industries served"
      description={
        <p>
          Bradley builds websites for small businesses across these industries.
        </p>
      }
    >
      <div className="area-industry-art" aria-hidden="true"><LocalIllustration kind="catalog" /><LocalIllustration kind="supplier" /><LocalIllustration kind="visit" /></div>
      <ul className="feature-list">
        {industries.map((industry) => (
          <li key={industry}>{industry}</li>
        ))}
      </ul>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="ghost" to="/demos/">See industry demo websites</Link>
      </div>
    </Section>

    <Section
      className="area-final-cta"
      eyebrow="Ready to start?"
      title="Get a free consultation"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I'll tell you honestly whether I'm the right fit.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>
    </div>
  </Layout>
);
};

export default ServiceAreasPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pathname}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
