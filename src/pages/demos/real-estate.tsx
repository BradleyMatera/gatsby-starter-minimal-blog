import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, HouseIcon, SearchIcon } from "../../site/icons";

const pathname = "/demos/real-estate/";
const pageTitle = "Rockford Heritage Realty — Real Estate | Demo Website";
const pageDescription =
  "Demo real estate office website with featured listings, agent profiles, market reports, and neighborhood guides.";

const listings = [
  { price: "$285,000", title: "4 Bed Colonial in East Rockford", address: "1427 Eastwood Dr, Rockford, IL", beds: 4, baths: 2.5, sqft: "2,100", badge: "New" },
  { price: "$189,000", title: "3 Bed Ranch — Updated Kitchen", address: "882 Maple Ln, Loves Park, IL", beds: 3, baths: 2, sqft: "1,450", badge: "Price Reduced" },
  { price: "$425,000", title: "5 Bed Luxury Home on 1.1 Acres", address: "3401 River Rd, Roscoe, IL", beds: 5, baths: 3, sqft: "3,200", badge: "Open Sat" },
  { price: "$145,000", title: "2 Bed Condo — Downtown Rockford", address: "211 N Main St #4B, Rockford, IL", beds: 2, baths: 1, sqft: "980", badge: null },
  { price: "$365,000", title: "4 Bed New Build — Rockton", address: "55 Stonebridge Ct, Rockton, IL", beds: 4, baths: 2.5, sqft: "2,400", badge: "New Construction" },
  { price: "$225,000", title: "3 Bed Split Level — Byron", address: "718 Oak St, Byron, IL", beds: 3, baths: 2, sqft: "1,680", badge: null },
];

const agents = [
  { initials: "SH", name: "Sarah Henderson", title: "Broker/Owner", bio: "18 years selling homes in Rockford. Specializes in historic homes and first-time buyers.", sales: "340+ sold", rating: "4.9" },
  { initials: "MK", name: "Mike Kowalski", title: "Realtor", bio: "12 years experience. Rockford native. Expert in investment properties and multi-family.", sales: "210+ sold", rating: "4.8" },
  { initials: "JD", name: "Jessica Davis", title: "Realtor", bio: "7 years. Roscoe and Rockton specialist. Works with relocating families and new construction.", sales: "130+ sold", rating: "5.0" },
  { initials: "RB", name: "Robert Brown", title: "Realtor", bio: "10 years. Commercial and residential. Byron and Freeport market expert.", sales: "180+ sold", rating: "4.9" },
];

const neighborhoods = [
  { name: "East Rockford", desc: "Established neighborhoods with mature trees, larger lots, and great schools.", stat: "Median: $245K" },
  { name: "Loves Park", desc: "Family-friendly with parks, affordable homes, and easy highway access.", stat: "Median: $175K" },
  { name: "Roscoe", desc: "Growing community with new construction, top-rated schools, and rural feel.", stat: "Median: $310K" },
  { name: "Byron", desc: "Small-town charm with a strong community and great value per square foot.", stat: "Median: $198K" },
  { name: "Rockton", desc: "Historic village on the Rock River. Quaint downtown and excellent schools.", stat: "Median: $265K" },
  { name: "Downtown Rockford", desc: "Lofts, condos, and walkable living near restaurants, bars, and the river.", stat: "Median: $155K" },
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
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #6c3483, #2c1140)", paddingBottom: "5rem" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Trusted Real Estate Team Since 2006</span>
        <h1 className="demo-hero__title">Find Your Next Home</h1>
        <p className="demo-hero__subtitle">
          1,200+ homes sold across Rockford, Loves Park, Roscoe, Byron, and Rockton.
          Local agents who know the market that Zillow can't tell you.
        </p>
      </div>
    </section>

    {/* Property Search Bar — real estate sites have search bars */}
    <div className="demo-section__inner" style={{ padding: "0 1.5rem" }}>
      <div className="demo-search-bar">
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label">Location</label>
          <select className="demo-form__select">
            <option>Any Area</option>
            <option>Rockford</option>
            <option>Loves Park</option>
            <option>Roscoe</option>
            <option>Byron</option>
            <option>Rockton</option>
          </select>
        </div>
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label">Price Range</label>
          <select className="demo-form__select">
            <option>Any Price</option>
            <option>Under $150K</option>
            <option>$150K - $250K</option>
            <option>$250K - $400K</option>
            <option>$400K+</option>
          </select>
        </div>
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label">Bedrooms</label>
          <select className="demo-form__select">
            <option>Any</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
          </select>
        </div>
        <button type="button" className="demo-form__submit" style={{ width: "auto", padding: "0.75rem 1.5rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SearchIcon size={18} /> Search
        </button>
      </div>
    </div>

    {/* Featured Listings — THE main content of a real estate site */}
    <section className="demo-section" id="listings">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Featured Listings</h2>
        <p className="demo-section__subtitle">Current homes for sale across the Rockford area. Updated daily from the MLS.</p>
        <div className="demo-listings">
          {listings.map((l) => (
            <div key={l.title} className="demo-listing-detail">
              <div className="demo-listing-detail__image">
                {l.badge && <div className="demo-listing-detail__badge">{l.badge}</div>}
              </div>
              <div className="demo-listing-detail__body">
                <div className="demo-listing-detail__price">{l.price}</div>
                <h3 className="demo-listing-detail__title">{l.title}</h3>
                <div className="demo-listing-detail__specs">
                  <div className="demo-listing-detail__spec">
                    <div className="demo-listing-detail__spec-number">{l.beds}</div>
                    <div className="demo-listing-detail__spec-label">Beds</div>
                  </div>
                  <div className="demo-listing-detail__spec">
                    <div className="demo-listing-detail__spec-number">{l.baths}</div>
                    <div className="demo-listing-detail__spec-label">Baths</div>
                  </div>
                  <div className="demo-listing-detail__spec">
                    <div className="demo-listing-detail__spec-number">{l.sqft}</div>
                    <div className="demo-listing-detail__spec-label">Sq Ft</div>
                  </div>
                </div>
                <p className="demo-listing-detail__address">{l.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Market Dashboard — real estate is data-driven */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Rockford Market Report</h2>
        <p className="demo-section__subtitle">Live data from the Rockford MLS — updated monthly.</p>
        <div className="demo-stats">
          <div><div className="demo-stat__number">$195K</div><div className="demo-stat__label">Median Home Price</div></div>
          <div><div className="demo-stat__number">23 days</div><div className="demo-stat__label">Avg. Days on Market</div></div>
          <div><div className="demo-stat__number">98%</div><div className="demo-stat__label">Sale-to-List Ratio</div></div>
          <div><div className="demo-stat__number">+4.2%</div><div className="demo-stat__label">Price Change (YoY)</div></div>
        </div>
      </div>
    </section>

    {/* Neighborhood Guides — buyers research neighborhoods */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Neighborhood Guides</h2>
        <p className="demo-section__subtitle">Local knowledge that Zillow can't tell you. We live in these communities.</p>
        <div className="demo-neighborhoods">
          {neighborhoods.map((n) => (
            <div key={n.name} className="demo-neighborhood">
              <div className="demo-neighborhood__image" />
              <div className="demo-neighborhood__body">
                <h3 className="demo-neighborhood__name">{n.name}</h3>
                <p className="demo-neighborhood__desc">{n.desc}</p>
                <div className="demo-neighborhood__stat"><strong>{n.stat}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Agent Bios — real estate is relationship-based, agents need full bios */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Agents</h2>
        <p className="demo-section__subtitle">Experienced, licensed, and dedicated to finding your perfect home.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {agents.map((a) => (
            <div key={a.name} className="demo-agent">
              <div className="demo-agent__photo">{a.initials}</div>
              <div>
                <h3 className="demo-agent__name">{a.name}</h3>
                <p className="demo-agent__title">{a.title}</p>
                <p className="demo-agent__bio">{a.bio}</p>
                <div className="demo-agent__stats">
                  <span className="demo-agent__stat"><strong>{a.sales}</strong></span>
                  <span className="demo-agent__stat"><strong>{a.rating}</strong> rating</span>
                </div>
              </div>
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

    {/* Split CTA — buyers and sellers get different CTAs */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-cta">
          <div className="demo-split-cta__card">
            <h3 className="demo-split-cta__title">Thinking of Selling?</h3>
            <p className="demo-split-cta__desc">Get a free home valuation in 24 hours. See what your home is worth in today's market.</p>
            <a href="tel:8155550567" className="demo-split-cta__btn">
              <HouseIcon size={18} /> Get My Home Value
            </a>
          </div>
          <div className="demo-split-cta__card">
            <h3 className="demo-split-cta__title">Ready to Buy?</h3>
            <p className="demo-split-cta__desc">Free buyer consultation. We'll help you find the right home and negotiate the best price.</p>
            <a href="tel:8155550567" className="demo-split-cta__btn">
              <PhoneIcon size={18} /> Talk to an Agent
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Contact */}
    <section className="demo-contact" style={{ background: "#6c3483" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Let's Find Your Next Home</h2>
        <p className="demo-contact__text">
          Call (815) 555-0567 to speak with an agent today. Free consultations for buyers and sellers.
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
