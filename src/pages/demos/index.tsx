import * as React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Section } from "../../ui";

const pathname = "/demos/";
const pageTitle = "Website Demos — See What I Can Build | Bradley Matera";
const pageDescription =
  "Live demo websites for restaurants, landscaping, HVAC, auto repair, real estate, and beauty salons. See exactly what your business website could look like.";

type DemoEntry = {
  slug: string;
  name: string;
  industry: string;
  description: string;
  emoji: string;
  color: string;
  features: string[];
};

const DEMOS: DemoEntry[] = [
  {
    slug: "restaurant",
    name: "Riverside Grill",
    industry: "Restaurant",
    description: "Full restaurant website with menu, reservations, hours, photo gallery, and customer reviews.",
    emoji: "🍽️",
    color: "#c0392b",
    features: ["Menu", "Reservations", "Reviews", "Hours"],
  },
  {
    slug: "landscaping",
    name: "GreenScape Pro",
    industry: "Landscaping",
    description: "Landscaping company site with service packages, before/after gallery, seasonal tips, and free quote form.",
    emoji: "🌿",
    color: "#27ae60",
    features: ["Service Packages", "Gallery", "Free Quote", "Seasonal Tips"],
  },
  {
    slug: "hvac",
    name: "ComfortAir Heating & Cooling",
    industry: "HVAC / Home Services",
    description: "HVAC company with emergency service callout, maintenance plans, technician bios, and financing info.",
    emoji: "🔧",
    color: "#2980b9",
    features: ["Emergency Service", "Maintenance Plans", "Financing", "Team Bios"],
  },
  {
    slug: "auto-repair",
    name: "Northside Auto Repair",
    industry: "Auto Repair",
    description: "Auto shop website with service menu, online appointment booking, tire size lookup, and mechanic credentials.",
    emoji: "🚗",
    color: "#e67e22",
    features: ["Online Booking", "Service Menu", "Tire Lookup", "ASE Certified"],
  },
  {
    slug: "real-estate",
    name: "Rockford Heritage Realty",
    industry: "Real Estate",
    description: "Real estate office with featured listings, agent profiles, market reports, and neighborhood guides.",
    emoji: "🏠",
    color: "#8e44ad",
    features: ["Featured Listings", "Agent Profiles", "Market Reports", "Neighborhood Guides"],
  },
  {
    slug: "beauty-salon",
    name: "Bella Vista Salon",
    industry: "Beauty Salon",
    description: "Hair and beauty salon with service menu, stylist team, online booking, and before/after gallery.",
    emoji: "💇",
    color: "#d63384",
    features: ["Service Menu", "Stylist Team", "Online Booking", "Gallery"],
  },
];

const DemosIndex: React.FC = () => (
  <Layout>
    <Section
      eyebrow="Portfolio Demos"
      title="See what your website could look like"
      description={
        <p>
          These are full, working demo websites built for different industries. Each one is a complete
          business site — hero, services, about, testimonials, contact, the works. Click any demo to
          see it in action, then use the back button at the top to return here.
        </p>
      }
    >
      <div className="demo-gallery__grid">
        {DEMOS.map((demo) => (
          <Link key={demo.slug} to={`/demos/${demo.slug}/`} className="demo-card" style={{ ["--demo-accent" as string]: demo.color } as React.CSSProperties}>
            <div className="demo-card__preview" style={{ background: `linear-gradient(135deg, ${demo.color}, ${demo.color}dd)` }}>
              <span style={{ fontSize: "3rem" }}>{demo.emoji}</span>
            </div>
            <div className="demo-card__body">
              <div className="demo-card__industry">{demo.industry}</div>
              <h3 className="demo-card__name">{demo.name}</h3>
              <p className="demo-card__desc">{demo.description}</p>
              <div className="demo-card__features">
                {demo.features.map((f) => (
                  <span key={f} className="demo-card__feature">{f}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="How this works"
      title="Every demo is a real, working website"
    >
      <div className="grid-three">
        <Card variant="outline">
          <h3 className="feature-card__title">Click any demo</h3>
          <p className="feature-card__body">
            Each demo opens as a full standalone website — not a screenshot. You can scroll through
            every section, see the layout, read the copy, and experience the mobile responsiveness.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Back button at top</h3>
          <p className="feature-card__body">
            Every demo has a sticky bar at the top with a back button. Click "All Demos" to return
            here, or "Get a site like this" to contact me directly.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Built for your industry</h3>
          <p className="feature-card__body">
            These demos show what's possible. Your real site would be customized with your business
            name, photos, menu, services, colors, and branding. Starting at $447.
          </p>
          <div className="card-actions">
            <Link data-variant="primary" to="/pricing/">See pricing</Link>
            <Link data-variant="ghost" to="/contact/">Get a quote</Link>
          </div>
        </Card>
      </div>
    </Section>
  </Layout>
);

export default DemosIndex;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Demos", path: pathname },
      ]}
    />
  );
};
