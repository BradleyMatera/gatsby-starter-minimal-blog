import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, HouseIcon } from "../../site/icons";

const pathname = "/demos/real-estate/";
const pageTitle = "Rockford Heritage Realty — Real Estate | Demo Website";
const pageDescription =
  "Demo real estate office website with featured listings, agent profiles, market reports, and neighborhood guides.";

const listings = [
  { price: "$285,000", title: "4 Bed, 2.5 Bath Colonial in East Rockford", details: ["4 BD", "2.5 BA", "2,100 sqft", "0.3 acres"] },
  { price: "$189,000", title: "3 Bed Ranch in Loves Park — Updated Kitchen", details: ["3 BD", "2 BA", "1,450 sqft", "0.2 acres"] },
  { price: "$425,000", title: "5 Bed Luxury Home — Roscoe, IL", details: ["5 BD", "3 BA", "3,200 sqft", "1.1 acres"] },
  { price: "$145,000", title: "2 Bed Condo — Downtown Rockford", details: ["2 BD", "1 BA", "980 sqft", "Condo"] },
  { price: "$365,000", title: "4 Bed New Build — Rockton, IL", details: ["4 BD", "2.5 BA", "2,400 sqft", "0.4 acres"] },
  { price: "$225,000", title: "3 Bed Split Level — Byron, IL", details: ["3 BD", "2 BA", "1,680 sqft", "0.3 acres"] },
];

const agents = [
  { initials: "SH", name: "Sarah Henderson", role: "Broker/Owner · 18 years experience" },
  { initials: "MK", name: "Mike Kowalski", role: "Realtor · 12 years experience" },
  { initials: "JD", name: "Jessica Davis", role: "Realtor · 7 years experience" },
  { initials: "RB", name: "Robert Brown", role: "Realtor · 10 years experience" },
];

const testimonials = [
  { text: "Sarah sold our house in 11 days for above asking. Her market knowledge and negotiation skills are unmatched in Rockford.", author: "The Peterson Family", location: "Rockford, IL" },
  { text: "As first-time homebuyers, we were nervous. Mike walked us through every step and found us a home we love in our budget.", author: "Jake & Emily", location: "Loves Park, IL" },
  { text: "Professional, responsive, and genuinely cares about her clients. Jessica found us the perfect home in Roscoe in two weeks.", author: "Diana M.", location: "Roscoe, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const RealEstateDemo: React.FC = () => (
  <DemoLayout demoName="Rockford Heritage Realty" industry="Real Estate" themeColor="#8e44ad">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #6c3483, #2c1140)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Trusted Real Estate Team Since 2006</span>
        <h1 className="demo-hero__title">Rockford Heritage Realty</h1>
        <p className="demo-hero__subtitle">
          Buying or selling a home in Rockford, Loves Park, Roscoe, Byron, or anywhere in Northwest
          Illinois? Our experienced agents know the market inside and out.
        </p>
        <div className="demo-hero__actions">
          <a href="#listings" className="demo-btn demo-btn--primary">View Listings</a>
          <a href="#contact" className="demo-btn demo-btn--ghost">Contact an Agent</a>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">$450M+</div><div className="demo-stat__label">Total Sales</div></div>
          <div><div className="demo-stat__number">1,200+</div><div className="demo-stat__label">Homes Sold</div></div>
          <div><div className="demo-stat__number">18</div><div className="demo-stat__label">Years in Rockford</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Client Rating</div></div>
        </div>
      </div>
    </section>

    {/* Featured Listings */}
    <section className="demo-section demo-section--alt" id="listings">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Featured Listings</h2>
        <p className="demo-section__subtitle">Current homes for sale across the Rockford area. Updated daily.</p>
        <div className="demo-listings">
          {listings.map((l) => (
            <div key={l.title} className="demo-listing">
              <div className="demo-listing__image">
                <HouseIcon size={40} />
              </div>
              <div className="demo-listing__body">
                <div className="demo-listing__price">{l.price}</div>
                <h3 className="demo-listing__title">{l.title}</h3>
                <div className="demo-listing__details">
                  {l.details.map((d) => <span key={d}>{d}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div className="demo-about__image" style={{ background: "linear-gradient(135deg, #6c3483, #2c1140)" }} />
          <div>
            <h2 className="demo-about__title">Local Experts. Proven Results.</h2>
            <p className="demo-about__text">
              Rockford Heritage Realty has been helping families buy and sell homes across Northwest
              Illinois since 2006. We're not a national chain — we're your neighbors.
            </p>
            <p className="demo-about__text">
              Our agents live in the communities they serve. We know which neighborhoods have the best
              schools, which areas are growing, and where to find the best value. When you work with
              us, you get local knowledge that Zillow can't tell you.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Agents */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Agents</h2>
        <p className="demo-section__subtitle">Experienced, licensed, and dedicated to finding your perfect home.</p>
        <div className="demo-team">
          {agents.map((a) => (
            <div key={a.name}>
              <div className="demo-team-member__avatar">{a.initials}</div>
              <div className="demo-team-member__name">{a.name}</div>
              <div className="demo-team-member__role">{a.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Clients Say</h2>
        <div className="demo-testimonials">
          {testimonials.map((t) => (
            <div key={t.author} className="demo-testimonial">
              <StarRating />
              <p className="demo-testimonial__text">"{t.text}"</p>
              <div className="demo-testimonial__author">{t.author}</div>
              <div className="demo-testimonial__location">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Market Report */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Rockford Area Market Report</h2>
        <p className="demo-section__subtitle">Current market data for the Rockford metro area — updated monthly.</p>
        <div className="demo-stats">
          <div><div className="demo-stat__number">$195K</div><div className="demo-stat__label">Median Home Price</div></div>
          <div><div className="demo-stat__number">23 days</div><div className="demo-stat__label">Avg. Days on Market</div></div>
          <div><div className="demo-stat__number">98%</div><div className="demo-stat__label">Sale-to-List Ratio</div></div>
          <div><div className="demo-stat__number">+4.2%</div><div className="demo-stat__label">Price Change (YoY)</div></div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="demo-contact" id="contact" style={{ background: "#6c3483" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Ready to Buy or Sell?</h2>
        <p className="demo-contact__text">
          Call (815) 555-0567 to speak with an agent today. Free home valuations for sellers, and
          buyer consultations at no cost.
        </p>
        <a href="tel:8155550567" className="demo-btn demo-btn--primary">
          <PhoneIcon size={20} /> Call (815) 555-0567
        </a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <MapPinIcon size={20} />
            <span className="demo-contact__info-label">Office</span>
            <span>789 E State St, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Hours</span>
            <span>Mon–Sat 9AM–5PM</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>info@heritagerealty.com</span>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Rockford Heritage Realty</div>
        <div>789 E State St, Rockford, IL 61104 · (815) 555-0567</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default RealEstateDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      robots="noindex,nofollow"
      breadcrumbs={[
        { name: "Demos", path: "/demos/" },
        { name: "Real Estate Demo", path: pathname },
      ]}
    />
  );
};
