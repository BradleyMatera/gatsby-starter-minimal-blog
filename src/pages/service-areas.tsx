import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/service-areas/";
const pageTitle = "Service Areas — Northwest Illinois and Southern Wisconsin | Bradley Matera";
const pageDescription =
  "Web development service areas in Northwest Illinois and Southern Wisconsin. Durand, Rockford, Freeport, Beloit WI, Janesville WI. Remote and in-person.";

const cityCards = [
  { title: "Durand & Davis", href: "/web-developer-durand-davis-illinois/", image: "durand-davis.jpg" },
  { title: "Rockford", href: "/web-developer-rockford-illinois/", image: "rockford.jpg" },
  { title: "Freeport", href: "/web-developer-freeport-illinois/", image: "freeport.jpg" },
  { title: "Pecatonica", href: "/web-developer-pecatonica-illinois/", image: "pecatonica.jpg" },
  { title: "Winnebago", href: "/web-developer-winnebago-illinois/", image: "winnebago.jpg" },
  { title: "Loves Park", href: "/web-developer-loves-park-illinois/", image: "loves-park.jpg" },
  { title: "Machesney Park", href: "/web-developer-machesney-park-illinois/", image: "machesney-park.jpg" },
  { title: "Byron", href: "/web-developer-byron-illinois/", image: "byron.jpg" },
  { title: "Rockton", href: "/web-developer-rockton-illinois/", image: "rockton.jpg" },
  { title: "Roscoe", href: "/web-developer-roscoe-illinois/", image: "roscoe.jpg" },
  { title: "South Beloit", href: "/web-developer-south-beloit-illinois/", image: "south-beloit.jpg" },
  { title: "Beloit, WI", href: "/web-developer-beloit-wisconsin/", image: "beloit-wi.jpg" },
  { title: "Janesville, WI", href: "/web-developer-janesville-wisconsin/", image: "janesville-wi.jpg" },
  { title: "Belvidere", href: "/web-developer-belvidere-illinois/", image: "rockford.jpg" },
  { title: "Cherry Valley", href: "/web-developer-cherry-valley-illinois/", image: "rockford.jpg" },
  { title: "Oregon", href: "/web-developer-oregon-illinois/", image: "rockford.jpg" },
  { title: "Mount Morris", href: "/web-developer-mount-morris-illinois/", image: "rockford.jpg" },
  { title: "Rochelle", href: "/web-developer-rochelle-illinois/", image: "rockford.jpg" },
  { title: "Polo", href: "/web-developer-polo-illinois/", image: "rockford.jpg" },
  { title: "Forreston", href: "/web-developer-forreston-illinois/", image: "rockford.jpg" },
  { title: "DeKalb", href: "/web-developer-dekalb-illinois/", image: "rockford.jpg" },
  { title: "Sycamore", href: "/web-developer-sycamore-illinois/", image: "rockford.jpg" },
  { title: "Sterling", href: "/web-developer-sterling-illinois/", image: "rockford.jpg" },
  { title: "Rock Falls", href: "/web-developer-rock-falls-illinois/", image: "rockford.jpg" },
  { title: "Dixon", href: "/web-developer-dixon-illinois/", image: "rockford.jpg" },
  { title: "Amboy", href: "/web-developer-amboy-illinois/", image: "rockford.jpg" },
  { title: "Ashton", href: "/web-developer-ashton-illinois/", image: "rockford.jpg" },
  { title: "Monroe, WI", href: "/web-developer-monroe-wisconsin/", image: "beloit.jpg" },
  { title: "Brodhead, WI", href: "/web-developer-brodhead-wisconsin/", image: "beloit.jpg" },
  { title: "Evansville, WI", href: "/web-developer-evansville-wisconsin/", image: "beloit.jpg" },
  { title: "Edgerton, WI", href: "/web-developer-edgerton-wisconsin/", image: "beloit.jpg" },
  { title: "Milton, WI", href: "/web-developer-milton-wisconsin/", image: "beloit.jpg" },
  { title: "Clinton, WI", href: "/web-developer-clinton-wisconsin/", image: "beloit.jpg" },
];

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

const ServiceAreasPage = () => (
  <Layout>
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
      <div className="grid-three">
        {cityCards.map((city) => (
          <Link key={city.href} to={city.href} className="city-card" style={{ backgroundImage: `url(/city-images/${city.image})` }}>
            <div className="city-card__overlay">
              <h2 className="city-card__title">{city.title}</h2>
              <span className="city-card__link">{city.title} web developer →</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Service areas at a glance"
      title="Cities served, distance, and county"
      description={
        <p>
          All service areas are within a 55-minute drive of Durand, Illinois. Most work is done remotely with in-person meetings available when needed.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Service areas comparison table">
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
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Durand & Davis</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Home base</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-durand-davis-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Rockford</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>25 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-rockford-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Freeport</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Stephenson</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>30 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-freeport-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Pecatonica</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>15 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-pecatonica-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>10 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-winnebago-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Loves Park</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>20 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-loves-park-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Machesney Park</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>22 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-machesney-park-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Byron</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Ogle</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>15 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-byron-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Rockton</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>35 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-rockton-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Roscoe</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>30 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-roscoe-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>South Beloit</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>IL</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Winnebago</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>35 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-south-beloit-illinois/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Beloit</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>WI</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Rock</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>40 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-beloit-wisconsin/">View</Link></td></tr>
            <tr><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Janesville</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>WI</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Rock</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>55 min</td><td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}><Link to="/web-developer-janesville-wisconsin/">View</Link></td></tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="Service radius"
      title="How Bradley works with local businesses"
      description={
        <p>
          Based in Durand/Davis, IL, Bradley builds websites remotely for clients across the region. In-person meetings are available when it makes sense — for kickoff, content review, or launch. Most communication happens by phone, email, and shared preview links.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Request a consultation</Link>
        <Link data-variant="ghost" to="/for-business/">See services</Link>
      </div>
    </Section>

    <Section
      eyebrow="Industries"
      title="Industries served"
      description={
        <p>
          Bradley builds websites for small businesses across these industries.
        </p>
      }
    >
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
  </Layout>
);

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
