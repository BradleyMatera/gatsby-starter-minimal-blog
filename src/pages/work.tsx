import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";

const pathname = "/work/";
const pageTitle = "Website Work and Examples | Bradley Matera";
const pageDescription =
  "Website examples and demos by Bradley Matera. Live demo sites for restaurants, landscaping, HVAC, auto repair, real estate, and salons, plus project write-ups.";

const demoCards = [
  { title: "Restaurant", desc: "Menu, reservations, gallery, and location.", href: "/demos/restaurant/", img: "/package-images/work-restaurant.svg" },
  { title: "Landscaping", desc: "Service packages, project gallery, free quote form.", href: "/demos/landscaping/", img: "/package-images/work-landscaping.svg" },
  { title: "HVAC", desc: "Financing calculator, service areas, booking form.", href: "/demos/hvac/", img: "/package-images/work-hvac.svg" },
  { title: "Auto Repair", desc: "VIN lookup, service menu, reviews, appointments.", href: "/demos/auto-repair/", img: "/package-images/evidence-projects.svg" },
  { title: "Real Estate", desc: "Property listings, agent profiles, search filters.", href: "/demos/real-estate/", img: "/package-images/evidence-projects.svg" },
  { title: "Salon", desc: "Service menu, stylist bios, gallery, online booking.", href: "/demos/beauty-salon/", img: "/package-images/evidence-projects.svg" },
];

const WorkPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Work
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Work"
      titleAs="h1"
      title={
        <>
          <strong>Website work</strong> and case studies.
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What kind of work does Bradley do?</strong> Bradley builds fast, mobile-first websites for small businesses in Northwest Illinois and Southern Wisconsin — restaurants, landscapers, HVAC, auto shops, real estate, and salons. Below are live demo websites, project case studies with code, and open-source contributions.
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
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Live demo websites illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Live demo websites</h2>
            <p className="pkg-card__desc">
              Full clickable sample websites for six industries. Not templates — real, working sites you can explore.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/demos/">See all demos</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Project case studies illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Project case studies</h2>
            <p className="pkg-card__desc">
              Technical write-ups with code, architecture decisions, and honest limitations.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/projects/">Browse projects</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/evidence-projects.svg" alt="Open-source contributions illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">Open-source contributions</h2>
            <p className="pkg-card__desc">
              Pull requests, fixes, and tools shared with the developer community.
            </p>
            <div className="card-actions">
              <Link data-variant="ghost" to="/contributions/">See contributions</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Website examples"
      title="See what your website could look like"
      description={
        <p>
          These are full clickable sample websites — not templates. Click any one to look around.
        </p>
      }
    >
      <div className="grid-three">
        {demoCards.map((demo) => (
          <div key={demo.title} className="pkg-card">
            <img src={demo.img} alt={`${demo.title} website example illustration`} className="pkg-card__bg" loading="lazy" />
            <div className="pkg-card__body">
              <h3 className="pkg-card__title">{demo.title} Website</h3>
              <p className="pkg-card__desc">{demo.desc}</p>
              <div className="card-actions">
                <Link data-variant="primary" to={demo.href}>See {demo.title.toLowerCase()} sample</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card-actions" style={{ marginTop: "1.5rem" }}>
        <Link data-variant="primary" to="/demos/">See all website examples</Link>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>

    <Section
      eyebrow="Example projects"
      title="Illustrative website examples by industry"
      description={
        <p>
          Sample project walkthroughs showing the structure, features, and technical approach for different industries. These are illustrative examples, not real client projects. For real project write-ups with code and GitHub links, see the technical projects section below.
        </p>
      }
    >
      <div style={{ overflowX: "auto", marginBottom: "2rem" }} tabIndex={0} role="region" aria-label="Work examples comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Project</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Industry</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Pages</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Key features</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Build approach</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>GreenScape Pro Landscaping</td>
              <td style={{ padding: "0.75rem" }}>Landscaping &amp; lawn care</td>
              <td style={{ padding: "0.75rem" }}>5 pages</td>
              <td style={{ padding: "0.75rem" }}>Quote form, project gallery, service packages, weather widget, seasonal tips</td>
              <td style={{ padding: "0.75rem" }}>Gatsby static site, local SEO foundations, WCAG 2.2 AA</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Rock River Diner</td>
              <td style={{ padding: "0.75rem" }}>Restaurant &amp; diner</td>
              <td style={{ padding: "0.75rem" }}>4 pages</td>
              <td style={{ padding: "0.75rem" }}>Mobile menu, reservation form, photo gallery, hours &amp; location</td>
              <td style={{ padding: "0.75rem" }}>WordPress-to-Gatsby rebuild, Restaurant schema, no PDF menu</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>NorthStar HVAC</td>
              <td style={{ padding: "0.75rem" }}>HVAC installation &amp; repair</td>
              <td style={{ padding: "0.75rem" }}>7 pages</td>
              <td style={{ padding: "0.75rem" }}>Financing calculator, seasonal promotions, service area pages, emergency contact</td>
              <td style={{ padding: "0.75rem" }}>Gatsby static site, service area architecture, LocalBusiness schema</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/work-landscaping.svg" alt="Landscaping website example illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Landscaping website example</h3>
            <p className="pkg-card__desc">
              A 5-page Gatsby site structure for a landscaping company — service pages, project gallery, quote form, local SEO foundations, and weather-based service recommendations.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/work/greenscape-pro-landscaping/">View example</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/work-restaurant.svg" alt="Restaurant website example illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Restaurant website example</h3>
            <p className="pkg-card__desc">
              A WordPress-to-Gatsby rebuild structure for a restaurant — menu, reservations, gallery, hours, and reviews. Shows the migration approach and performance targets.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/work/rock-river-diner/">View example</Link>
            </div>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/work-hvac.svg" alt="HVAC website example illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">HVAC website example</h3>
            <p className="pkg-card__desc">
              A 7-page service area website structure for an HVAC company — service pages, financing calculator, seasonal promotions, and service area architecture.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/work/northstar-hvac/">View example</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Technical projects"
      title="Project write-ups with code"
      description={
        <p>
          For technical case studies with code, GitHub links, and honest limitations, see the project write-ups. These cover architecture decisions, trade-offs, and what I'd do differently.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/projects/">Browse all projects</Link>
        <Link data-variant="ghost" to="/open-source-contributions/">Open-source contributions</Link>
        <Link data-variant="ghost" to="/contributions/">Contribution history</Link>
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

export default WorkPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Work", item: pageUrl },
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
