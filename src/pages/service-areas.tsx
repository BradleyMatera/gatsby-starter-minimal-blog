import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/service-areas/";
const pageTitle = "Service Areas — Northwest Illinois and Southern Wisconsin | Bradley Matera";
const pageDescription =
  "Bradley Matera serves Northwest Illinois and Southern Wisconsin from Durand/Davis, IL. See all service area cities including Rockford, Freeport, Beloit WI, and Janesville WI. Remote and in-person available.";

const cityCards = [
  { title: "Durand & Davis", href: "/web-developer-durand-davis-illinois/" },
  { title: "Rockford", href: "/web-developer-rockford-illinois/" },
  { title: "Freeport", href: "/web-developer-freeport-illinois/" },
  { title: "Pecatonica", href: "/web-developer-pecatonica-illinois/" },
  { title: "Winnebago", href: "/web-developer-winnebago-illinois/" },
  { title: "Loves Park", href: "/web-developer-loves-park-illinois/" },
  { title: "Machesney Park", href: "/web-developer-machesney-park-illinois/" },
  { title: "Byron", href: "/web-developer-byron-illinois/" },
  { title: "Rockton", href: "/web-developer-rockton-illinois/" },
  { title: "Roscoe", href: "/web-developer-roscoe-illinois/" },
  { title: "South Beloit", href: "/web-developer-south-beloit-illinois/" },
  { title: "Beloit, WI", href: "/web-developer-beloit-wisconsin/" },
  { title: "Janesville, WI", href: "/web-developer-janesville-wisconsin/" },
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
          <Card key={city.href} variant="outline">
            <h3 className="feature-card__title">{city.title}</h3>
            <div className="card-actions">
              <Link data-variant="ghost" to={city.href}>{city.title} web developer</Link>
            </div>
          </Card>
        ))}
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
        siteMetadata={site}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
