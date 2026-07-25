import * as React from "react";
import type { HeadFC } from "gatsby";
import { Link } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Section } from "../../ui";
import {
  UtensilsIcon,
  LeafIcon,
  GearIcon,
  CarIcon,
  HouseIcon,
  ScissorsIcon,
  ToolsIcon,
  ScrollIcon,
  SpaIcon,
} from "../../site/icons";

const pathname = "/demos/";
const pageTitle = "Website Demos — See What I Can Build | Bradley Matera";
const pageDescription =
  "Live demo websites for restaurants, landscaping, HVAC, auto repair, real estate, and beauty salons. See exactly what your business website could look like.";

type DemoEntry = {
  slug: string;
  name: string;
  industry: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  heroImage: string;
  features: string[];
};

const DEMOS: DemoEntry[] = [
  {
    slug: "restaurant",
    name: "Riverside Grill",
    industry: "Restaurant",
    description: "Full restaurant website with menu, reservations, hours, photo gallery, and customer reviews.",
    Icon: UtensilsIcon,
    color: "#c9a227",
    heroImage: "/images/demos/restaurant/hero.jpg",
    features: ["Menu", "Reservations", "Reviews", "Hours"],
  },
  {
    slug: "landscaping",
    name: "GreenScape Pro",
    industry: "Landscaping",
    description: "Landscaping company site with service packages, before/after gallery, seasonal tips, and free quote form.",
    Icon: LeafIcon,
    color: "#4a7c3a",
    heroImage: "/images/demos/landscaping/hero.jpg",
    features: ["Service Packages", "Gallery", "Free Quote", "Seasonal Tips"],
  },
  {
    slug: "hvac",
    name: "ComfortAir Heating & Cooling",
    industry: "HVAC / Home Services",
    description: "HVAC company with emergency service callout, maintenance plans, technician bios, and financing info.",
    Icon: GearIcon,
    color: "#e85d04",
    heroImage: "/images/demos/hvac/hero.jpg",
    features: ["Emergency Service", "Maintenance Plans", "Financing", "Team Bios"],
  },
  {
    slug: "auto-repair",
    name: "Northside Auto Repair",
    industry: "Auto Repair",
    description: "Auto shop website with service menu, online appointment booking, tire size lookup, and mechanic credentials.",
    Icon: CarIcon,
    color: "#ff6b1a",
    heroImage: "/images/demos/auto-repair/hero.jpg",
    features: ["Online Booking", "Service Menu", "VIN Lookup", "ASE Certified"],
  },
  {
    slug: "real-estate",
    name: "Rockford Heritage Realty",
    industry: "Real Estate",
    description: "Real estate office with featured listings, agent profiles, market reports, and neighborhood guides.",
    Icon: HouseIcon,
    color: "#b8943f",
    heroImage: "/images/demos/real-estate/hero.jpg",
    features: ["Featured Listings", "Agent Profiles", "Market Reports", "Neighborhood Guides"],
  },
  {
    slug: "beauty-salon",
    name: "Bella Vista Salon",
    industry: "Beauty Salon",
    description: "Hair and beauty salon with service menu, stylist team, online booking, and before/after gallery.",
    Icon: ScissorsIcon,
    color: "#d63384",
    heroImage: "/images/demos/beauty-salon/hero.jpg",
    features: ["Service Menu", "Stylist Team", "Online Booking", "Gallery"],
  },
  {
    slug: "manufacturing",
    name: "Sterling Metalworks",
    industry: "Manufacturing / Metal Fabrication",
    description: "Metal fabrication shop with capabilities, equipment list, quote form, ISO certifications, and project gallery.",
    Icon: ToolsIcon,
    color: "#4a6fa5",
    heroImage: "/images/demos/manufacturing/hero.jpg",
    features: ["Capabilities", "Equipment List", "Quote Form", "ISO Certified"],
  },
  {
    slug: "agriculture",
    name: "Kishwaukee Valley Farm Services",
    industry: "Agriculture / Farm Supply",
    description: "Farm supply company with equipment sales, repair services, seed/fertilizer ordering, and crop planning resources.",
    Icon: LeafIcon,
    color: "#4a7c3a",
    heroImage: "/images/demos/agriculture/hero.jpg",
    features: ["Equipment Sales", "Repair Services", "Seed Ordering", "Crop Planning"],
  },
  {
    slug: "law-firm",
    name: "Rock River Legal Group",
    industry: "Law Firm / Legal Services",
    description: "Law firm with practice areas, attorney bios, consultation booking, client resources, and online payment options.",
    Icon: ScrollIcon,
    color: "#1a3a5c",
    heroImage: "/images/demos/law-firm/hero.jpg",
    features: ["Practice Areas", "Attorney Bios", "Consultation Booking", "Client Resources"],
  },
  {
    slug: "dental",
    name: "Rock River Family Dental",
    industry: "Dental / Healthcare",
    description: "Dental practice with services, new patient forms, insurance info, online scheduling, and patient reviews.",
    Icon: SpaIcon,
    color: "#2b8a8a",
    heroImage: "/images/demos/dental/hero.jpg",
    features: ["Services", "New Patient Forms", "Insurance Info", "Online Scheduling"],
  },
];

const DemosIndex: React.FC = () => (
  <Layout>
    <Section
      eyebrow="Portfolio Demos"
      title="See what your website could look like"
      titleAs="h1"
      description={
        <p>
          These are full, working demo websites built for different industries. Each one is a complete
          business site — hero, services, about, testimonials, contact, the works. Click any demo to
          see it in action, then use the back button at the top to return here.
        </p>
      }
    >
      {/* Direct answer for AEO — question heading + 40-70 word answer */}
      <h2 className="sr-only">What demo websites are available?</h2>
      <p className="direct-answer" style={{ fontSize: "1.125rem", opacity: 0.8, marginBottom: "2rem", lineHeight: 1.6 }}>
        Ten full demo websites are available: a restaurant with online ordering, a landscaping company with quote forms, an HVAC company with financing calculator, an auto repair shop with VIN lookup, a real estate office with mortgage calculator, a beauty salon with online booking, a metal fabrication shop with quote forms, an agricultural services company with equipment sales, a law firm with consultation booking, and a dental practice with online scheduling. Each demo starts at $447 and can be customized with your branding.
      </p>
      <div className="demo-gallery__grid">
        {DEMOS.map((demo) => {
          const { Icon } = demo;
          return (
            <Link
              key={demo.slug}
              to={`/demos/${demo.slug}/`}
              className="demo-card"
              style={{ ["--demo-accent" as string]: demo.color } as React.CSSProperties}
            >
              <div
                className="demo-card__preview"
                style={{ backgroundImage: `url(${demo.heroImage})` }}
              >
                <div className="demo-card__preview-overlay" style={{ background: `linear-gradient(135deg, ${demo.color}aa, ${demo.color}55)` }}>
                  <Icon size={48} />
                </div>
              </div>
              <div className="demo-card__body">
                <div className="demo-card__industry">{demo.industry}</div>
                <h2 className="demo-card__name">{demo.name}</h2>
                <p className="demo-card__desc">{demo.description}</p>
                <div className="demo-card__features">
                  {demo.features.map((f) => (
                    <span key={f} className="demo-card__feature">{f}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>

    <Section
      eyebrow="How this works"
      title="How do the demo websites work?"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/demo-click.svg" alt="Can I click through the demos? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Can I click through the demos?</h3>
            <p className="pkg-card__desc">
              Each demo opens as a full standalone website — not a screenshot. You can scroll through
              every section, see the layout, read the copy, and experience the mobile responsiveness.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/demo-back.svg" alt="How do I get back to this page? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">How do I get back to this page?</h3>
            <p className="pkg-card__desc">
              Every demo has a sticky bar at the top with a back button. Click "All Demos" to return
              here, or "Get a site like this" to contact me directly.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/demo-customize.svg" alt="Can these demos be customized for my business? illustration" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">Can these demos be customized for my business?</h3>
            <p className="pkg-card__desc">
              These demos show what's possible. Your real site would be customized with your business
              name, photos, menu, services, colors, and branding. Starting at $447.
            </p>
            <div className="card-actions">
              <Link data-variant="primary" to="/pricing/">See pricing</Link>
              <Link data-variant="ghost" to="/contact/">Get a quote</Link>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which demo fits your business?"
    >
      <table>
        <thead>
          <tr>
            <th>Demo</th>
            <th>Industry</th>
            <th>Key Features</th>
            <th>Starting Price</th>
          </tr>
        </thead>
        <tbody>
          {DEMOS.map((demo) => (
            <tr key={demo.slug}>
              <td><Link to={`/demos/${demo.slug}/`}>{demo.name}</Link></td>
              <td>{demo.industry}</td>
              <td>{demo.features.join(", ")}</td>
              <td>$447</td>
            </tr>
          ))}
        </tbody>
      </table>
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
