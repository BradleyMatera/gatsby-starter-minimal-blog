import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import GoogleMapsEmbed from "../../features/demos/GoogleMapsEmbed";
import SocialLinks, { SocialLink } from "../../features/demos/SocialLinks";
import ReviewBadges from "../../features/demos/ReviewBadges";
import MortgageCalculator from "../../features/demos/MortgageCalculator";
import IntegrationsSection, { Integration } from "../../features/demos/IntegrationsSection";
import { StarIcon, MapPinIcon, PhoneIcon, HouseIcon, SearchIcon, ShieldIcon } from "../../site/icons";

const pathname = "/demos/real-estate/";
const pageTitle = "Rockford Heritage Realty — Real Estate | Demo Website";
const pageDescription = "Demo real estate office website with featured listings, agent profiles, market reports, and neighborhood guides.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "youtube", url: "https://youtube.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "MLS IDX/RETS Feed", category: "Property Listings", description: "Live MLS listings on your site. Every property your board has, auto-synced. Required for real estate sites — buyers expect to search all listings, not just yours.", freeTier: "IDX subscription from $39-99/month via your MLS board. RESO Web API standard.", url: "https://www.reso.org/", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map on every listing page showing property location, nearby schools, and amenities.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Walk Score API", category: "Neighborhood Data", description: "Shows walkability, transit, and bike scores for any property address. Buyers use this to evaluate neighborhoods without visiting.", freeTier: "Free for up to 5,000 calls/day with attribution. $0.04/call after.", url: "https://walkscore.com/professional/api.php", status: "mocked" },
  { name: "GreatSchools API", category: "School Ratings", description: "School ratings and reviews for any address. Parents search for homes by school district — this data is essential for family buyers.", freeTier: "Free API for up to 2,000 calls/day. Attribution required.", url: "https://greatschools.org/api/", status: "mocked" },
  { name: "Freddie Mac PMMS API", category: "Mortgage Rates", description: "Live mortgage rate data for your calculator. Updated weekly. Shows buyers current rates so they can estimate payments accurately.", freeTier: "Completely free. Public API, no key required.", url: "https://freddiemac.com/pmms", status: "available" },
  { name: "Zillow Trulia Network", category: "Syndication", description: "Your listings auto-post to Zillow, Trulia, and 30+ other sites. Maximum exposure with zero extra work. Leads route back to you.", freeTier: "Free via MLS syndication. Premier Agent from $200/month for lead routing.", url: "https://zillow.com/professionals", status: "available" },
  { name: "Follow Up Boss / LionDesk", category: "CRM & Lead Management", description: "Every website lead auto-enters your CRM with property interest, budget, and timeline. Automated follow-up sequences. Never lose a lead again.", freeTier: "Follow Up Boss from $69/month. LionDesk from $39/month.", url: "https://followupboss.com", status: "available" },
  { name: "DocuSign for Real Estate", category: "Digital Signatures", description: "Send offers, counter-offers, and contracts for e-signature directly from your site. Closes deals faster — no printing, no faxing.", freeTier: "Real Estate edition from $45/month per agent.", url: "https://docusign.com/real-estate", status: "available" },
];

const listings = [
  { price: "$285,000", title: "4 Bed Colonial in East Rockford", address: "1427 Eastwood Dr, Rockford, IL", beds: 4, baths: 2.5, sqft: "2,100", badge: "New", walkScore: 72, schoolRating: 8, img: "listing-1", interiorImg: "listing-1-interior" },
  { price: "$189,000", title: "3 Bed Ranch — Updated Kitchen", address: "882 Maple Ln, Loves Park, IL", beds: 3, baths: 2, sqft: "1,450", badge: "Price Reduced", walkScore: 45, schoolRating: 7, img: "listing-2", interiorImg: "listing-2-interior" },
  { price: "$425,000", title: "5 Bed Luxury Home on 1.1 Acres", address: "3401 River Rd, Roscoe, IL", beds: 5, baths: 3, sqft: "3,200", badge: "Open Sat", walkScore: 12, schoolRating: 9, img: "listing-3", interiorImg: "listing-3-interior" },
  { price: "$145,000", title: "2 Bed Condo — Downtown Rockford", address: "211 N Main St #4B, Rockford, IL", beds: 2, baths: 1, sqft: "980", badge: null, walkScore: 88, schoolRating: 6, img: "listing-4", interiorImg: "listing-4-interior" },
  { price: "$365,000", title: "4 Bed New Build — Rockton", address: "55 Stonebridge Ct, Rockton, IL", beds: 4, baths: 2.5, sqft: "2,400", badge: "New Construction", walkScore: 28, schoolRating: 9, img: "listing-5", interiorImg: "listing-5-interior" },
  { price: "$225,000", title: "3 Bed Split Level — Byron", address: "718 Oak St, Byron, IL", beds: 3, baths: 2, sqft: "1,680", badge: null, walkScore: 35, schoolRating: 8, img: "listing-6", interiorImg: "listing-6-interior" },
];

const agents = [
  { name: "Sarah Henderson", title: "Broker/Owner", bio: "18 years selling homes in Rockford. Specializes in historic homes and first-time buyers.", sales: "340+ sold", rating: "4.9", img: "agent-1" },
  { name: "Mike Kowalski", title: "Realtor", bio: "12 years experience. Rockford native. Expert in investment properties and multi-family.", sales: "210+ sold", rating: "4.8", img: "agent-2" },
  { name: "Jessica Davis", title: "Realtor", bio: "7 years. Roscoe and Rockton specialist. Works with relocating families and new construction.", sales: "130+ sold", rating: "5.0", img: "agent-3" },
  { name: "Robert Brown", title: "Realtor", bio: "10 years. Commercial and residential. Byron and Freeport market expert.", sales: "180+ sold", rating: "4.9", img: "agent-4" },
];

const neighborhoods = [
  { name: "East Rockford", desc: "Established neighborhoods with mature trees, larger lots, and great schools.", stat: "Median: $245K", img: "neighborhood-1" },
  { name: "Loves Park", desc: "Family-friendly with parks, affordable homes, and easy highway access.", stat: "Median: $175K", img: "neighborhood-2" },
  { name: "Roscoe", desc: "Growing community with new construction, top-rated schools, and rural feel.", stat: "Median: $310K", img: "neighborhood-3" },
  { name: "Byron", desc: "Small-town charm with a strong community and great value per square foot.", stat: "Median: $198K", img: "neighborhood-4" },
  { name: "Rockton", desc: "Historic village on the Rock River. Quaint downtown and excellent schools.", stat: "Median: $265K", img: "neighborhood-5" },
  { name: "Downtown Rockford", desc: "Lofts, condos, and walkable living near restaurants, bars, and the river.", stat: "Median: $155K", img: "neighborhood-6" },
];

const testimonials = [
  { text: "Sarah sold our house in 11 days for above asking. Her market knowledge and negotiation skills are unmatched in Rockford.", author: "The Peterson Family", location: "Rockford, IL" },
  { text: "As first-time homebuyers, we were nervous. Mike walked us through every step and found us a home we love in our budget.", author: "Jake & Emily", location: "Loves Park, IL" },
  { text: "Professional, responsive, and genuinely cares about her clients. Jessica found us the perfect home in Roscoe in two weeks.", author: "Diana M.", location: "Roscoe, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const RealEstateDemo: React.FC = () => (
  <DemoLayout demoName="Rockford Heritage Realty" industry="Real Estate" themeColor="#b8943f" designSystem="luxury">
    {/* Hero with real home photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/real-estate/hero.jpg)", paddingBottom: "5rem" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Trusted Real Estate Team Since 2006</span>
        <h1 className="demo-hero__title">Find Your Next Home</h1>
        <p className="demo-hero__subtitle">1,200+ homes sold across Rockford, Loves Park, Roscoe, Byron, and Rockton. Local agents who know the market that Zillow can't tell you.</p>
      </div>
    </section>

    {/* Property Search Bar */}
    <div className="demo-section__inner" style={{ padding: "0 1.5rem" }}>
      <div className="demo-search-bar">
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label" htmlFor="search-location">Location</label>
          <select id="search-location" className="demo-form__select"><option>Any Area</option><option>Rockford</option><option>Loves Park</option><option>Roscoe</option><option>Byron</option><option>Rockton</option></select>
        </div>
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label" htmlFor="search-price">Price Range</label>
          <select id="search-price" className="demo-form__select"><option>Any Price</option><option>Under $150K</option><option>$150K - $250K</option><option>$250K - $400K</option><option>$400K+</option></select>
        </div>
        <div className="demo-form__field" style={{ margin: 0 }}>
          <label className="demo-form__label" htmlFor="search-beds">Bedrooms</label>
          <select id="search-beds" className="demo-form__select"><option>Any</option><option>2+</option><option>3+</option><option>4+</option><option>5+</option></select>
        </div>
        <button type="button" className="demo-form__submit" style={{ width: "auto", padding: "0.75rem 1.5rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}><SearchIcon size={18} /> Search</button>
      </div>
    </div>

    {/* Featured Listings with real photos + Walk Score + School Rating */}
    <section className="demo-section" id="listings">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Featured Listings</h2>
        <p className="demo-section__subtitle">Current homes for sale across the Rockford area. Updated daily from the MLS.</p>
        <div className="demo-listings">
          {listings.map((l) => (
            <div key={l.title} className="demo-listing-detail">
              <div className="demo-listing-detail__images">
                <div className="demo-listing-detail__image demo-listing-detail__image--exterior" style={{ backgroundImage: `url(/images/demos/real-estate/${l.img}.jpg)` }}>
                  {l.badge && <div className="demo-listing-detail__badge">{l.badge}</div>}
                </div>
                <div className="demo-listing-detail__image demo-listing-detail__image--interior" style={{ backgroundImage: `url(/images/demos/real-estate/${l.interiorImg}.jpg)` }} />
              </div>
              <div className="demo-listing-detail__body">
                <div className="demo-listing-detail__price">{l.price}</div>
                <h3 className="demo-listing-detail__title">{l.title}</h3>
                <div className="demo-listing-detail__specs">
                  <div className="demo-listing-detail__spec"><div className="demo-listing-detail__spec-number">{l.beds}</div><div className="demo-listing-detail__spec-label">Beds</div></div>
                  <div className="demo-listing-detail__spec"><div className="demo-listing-detail__spec-number">{l.baths}</div><div className="demo-listing-detail__spec-label">Baths</div></div>
                  <div className="demo-listing-detail__spec"><div className="demo-listing-detail__spec-number">{l.sqft}</div><div className="demo-listing-detail__spec-label">Sq Ft</div></div>
                </div>
                <p className="demo-listing-detail__address">{l.address}</p>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                  <div className="demo-score-badge">
                    <div className="demo-score-badge__circle demo-score-badge__circle--walk">{l.walkScore}</div>
                    <div className="demo-score-badge__label">Walk Score</div>
                  </div>
                  <div className="demo-score-badge">
                    <div className="demo-score-badge__circle demo-score-badge__circle--school">{l.schoolRating}</div>
                    <div className="demo-score-badge__label">School Rating</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> MLS Listed</span>
          <span className="demo-trust-logo"><HouseIcon size={20} /> Zillow Premier Agent</span>
        </div>
      </div>
    </section>

    {/* Mortgage Calculator */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Mortgage Calculator</h2>
        <p className="demo-section__subtitle">Estimate your monthly payment. Adjust the numbers to see what fits your budget.</p>
        <MortgageCalculator />
      </div>
    </section>

    {/* Market Dashboard */}
    <section className="demo-section">
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

    {/* Split image + text: interior */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/real-estate/living-room.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Local Knowledge That Matters</h2>
            <p className="demo-split-image-text__text">We've been selling homes in Rockford for 18 years. We know which neighborhoods are appreciating, which schools are the best, and which streets to avoid. That's knowledge Zillow can't give you.</p>
            <p className="demo-split-image-text__text">When you work with Heritage Realty, you get a dedicated agent who answers their phone and fights for your interests — not a call center reading from a script.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Neighborhood Guides with real photos */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Neighborhood Guides</h2>
        <p className="demo-section__subtitle">Local knowledge that Zillow can't tell you. We live in these communities.</p>
        <div className="demo-neighborhoods">
          {neighborhoods.map((n) => (
            <div key={n.name} className="demo-neighborhood">
              <div className="demo-neighborhood__image" style={{ backgroundImage: `url(/images/demos/real-estate/${n.img}.jpg)` }} />
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

    {/* Agent Bios */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Agents</h2>
        <p className="demo-section__subtitle">Experienced, licensed, and dedicated to finding your perfect home.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {agents.map((a) => (
            <div key={a.name} className="demo-agent">
              <div className="demo-agent__photo" style={{ backgroundImage: `url(/images/demos/real-estate/${a.img}.jpg)` }} />
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
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={87} yelpRating={5.0} yelpReviewCount={23} />
        </div>
      </div>
    </section>

    {/* Split CTA */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-cta">
          <div className="demo-split-cta__card">
            <h3 className="demo-split-cta__title">Thinking of Selling?</h3>
            <p className="demo-split-cta__desc">Get a free home valuation in 24 hours. See what your home is worth in today's market.</p>
            <a href="tel:8155550567" className="demo-split-cta__btn"><HouseIcon size={18} /> Get My Home Value</a>
          </div>
          <div className="demo-split-cta__card">
            <h3 className="demo-split-cta__title">Ready to Buy?</h3>
            <p className="demo-split-cta__desc">Free buyer consultation. We'll help you find the right home and negotiate the best price.</p>
            <a href="tel:8155550567" className="demo-split-cta__btn"><PhoneIcon size={18} /> Talk to an Agent</a>
          </div>
        </div>
      </div>
    </section>

    {/* Google Maps */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Office</h2>
        <p className="demo-section__subtitle">789 E State St, Rockford, IL — stop by or schedule a consultation.</p>
        <GoogleMapsEmbed address="789 E State St, Rockford, IL 61104" height={300} title="Heritage Realty office location" />
      </div>
    </section>

    <IntegrationsSection industry="real estate" integrations={integrations} />

    {/* Contact */}
    <section className="demo-contact" style={{ background: "#1a2845" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Let's Find Your Next Home</h2>
        <p className="demo-contact__text">Call (815) 555-0567 to speak with an agent today. Free consultations for buyers and sellers.</p>
        <a href="tel:8155550567" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0567</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Office</span><span>789 E State St, Rockford, IL</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Hours</span><span>Mon–Sat 9AM–5PM</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>info@heritagerealty.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Rockford Heritage Realty</div>
        <div>789 E State St, Rockford, IL 61104 · (815) 555-0567</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default RealEstateDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Real Estate Demo", path: pathname }]} />;
};
