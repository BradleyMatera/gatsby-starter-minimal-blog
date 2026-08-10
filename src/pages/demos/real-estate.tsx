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
import FAQSection, { FAQItem } from "../../features/demos/FAQSection";
import { StarIcon, MapPinIcon, PhoneIcon, HouseIcon, SearchIcon, ShieldIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/real-estate/";
const pageTitle = "Rockford Heritage Realty — Real Estate Website Concept Demo (Fictional)";
const pageDescription = "Concept demo of a fictional real estate brokerage website with sample listings, agent profiles, market data, and mortgage estimator. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "youtube", url: "https://youtube.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "MLS IDX/RETS Feed", category: "Property Listings", description: "Sample listing display. Production real estate sites connect to an MLS IDX or RESO feed to show live, board-compliant property data.", freeTier: "IDX subscription from $39-99/month via your MLS board. RESO Web API standard.", url: "https://www.reso.org/", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map on every listing page showing property location, nearby schools, and amenities.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Walk Score API", category: "Neighborhood Data", description: "Sample walkability display. A production site could integrate Walk Score or similar data with proper attribution.", freeTier: "Free for up to 5,000 calls/day with attribution. $0.04/call after.", url: "https://walkscore.com/professional/api.php", status: "mocked" },
  { name: "GreatSchools API", category: "School Ratings", description: "Sample school rating display. Production sites can source ratings and reviews from GreatSchools or the local district.", freeTier: "Free API for up to 2,000 calls/day. Attribution required.", url: "https://greatschools.org/api/", status: "mocked" },
  { name: "Freddie Mac PMMS API", category: "Mortgage Rates", description: "Sample mortgage rate data. A production calculator could source weekly rate data from Freddie Mac or a lender API.", freeTier: "Completely free. Public API, no key required.", url: "https://freddiemac.com/pmms", status: "available" },
  { name: "Zillow Trulia Network", category: "Syndication", description: "Example listing syndication. A real brokerage can syndicate listings to Zillow, Trulia, and other networks through MLS feeds or direct feeds.", freeTier: "Free via MLS syndication. Premier Agent from $200/month for lead routing.", url: "https://zillow.com/professionals", status: "available" },
  { name: "Follow Up Boss / LionDesk", category: "CRM & Lead Management", description: "CRM integration example. Website leads can be routed into a CRM with property interest, budget, and timeline for follow-up.", freeTier: "Follow Up Boss from $69/month. LionDesk from $39/month.", url: "https://followupboss.com", status: "available" },
  { name: "DocuSign for Real Estate", category: "Digital Signatures", description: "E-signature integration example. Offers, counter-offers, and contracts can be sent for digital signature through a real DocuSign integration.", freeTier: "Real Estate edition from $45/month per agent.", url: "https://docusign.com/real-estate", status: "available" },
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
  { name: "Sarah Henderson", title: "Broker/Owner", bio: "Fictional profile for demo purposes. 18 years selling homes in Rockford. Specializes in historic homes and first-time buyers.", sales: "Illustrative", rating: "4.9", img: "agent-1" },
  { name: "Mike Kowalski", title: "Realtor", bio: "Fictional profile for demo purposes. Rockford native. Expert in investment properties and multi-family.", sales: "Illustrative", rating: "4.8", img: "agent-2" },
  { name: "Jessica Davis", title: "Realtor", bio: "Fictional profile for demo purposes. Roscoe and Rockton specialist. Works with relocating families and new construction.", sales: "Illustrative", rating: "5.0", img: "agent-3" },
  { name: "Robert Brown", title: "Realtor", bio: "Fictional profile for demo purposes. Commercial and residential. Byron and Freeport market expert.", sales: "Illustrative", rating: "4.9", img: "agent-4" },
];

const neighborhoods = [
  { name: "East Rockford", desc: "Established neighborhoods with mature trees, larger lots, and great schools.", stat: "Illustrative median", img: "neighborhood-1" },
  { name: "Loves Park", desc: "Family-friendly with parks, affordable homes, and easy highway access.", stat: "Illustrative median", img: "neighborhood-2" },
  { name: "Roscoe", desc: "Growing community with new construction, top-rated schools, and rural feel.", stat: "Illustrative median", img: "neighborhood-3" },
  { name: "Byron", desc: "Small-town charm with a strong community and great value per square foot.", stat: "Illustrative median", img: "neighborhood-4" },
  { name: "Rockton", desc: "Historic village on the Rock River. Quaint downtown and excellent schools.", stat: "Illustrative median", img: "neighborhood-5" },
  { name: "Downtown Rockford", desc: "Lofts, condos, and walkable living near restaurants, bars, and the river.", stat: "Illustrative median", img: "neighborhood-6" },
];

const faqs: FAQItem[] = [
  { q: "How much are closing costs when buying a home?", a: "Closing costs in Illinois typically range from 2% to 5% of the purchase price. For a $200,000 home, that could be $4,000 to $10,000, including lender fees, title insurance, appraisal, and prepaid property taxes. Your lender will provide a Loan Estimate within three business days of applying." },
  { q: "How long does it take to buy a house?", a: "From offer acceptance to closing, the typical timeline is 30 to 45 days for a conventional loan and 45 to 60 days for FHA or VA loans. Cash purchases can close more quickly. Timelines depend on financing, inspections, appraisal, and underwriting." },
  { q: "What credit score do I need to buy a home?", a: "Most conventional loans require a minimum credit score around 620. FHA loans may accept lower scores with a larger down payment. VA and USDA loans have flexible requirements. Higher scores generally qualify for better interest rates. Contact a lender for current requirements." },
  { q: "How do I get pre-approved for a mortgage?", a: "Pre-approval typically requires proof of income, assets, employment, and authorization to pull credit. Your lender issues a pre-approval letter showing how much you may be able to borrow. The process usually takes 1 to 3 business days." },
  { q: "What is the difference between a buyer's agent and a listing agent?", a: "A buyer's agent represents the buyer and negotiates price and terms on their behalf. A listing agent represents the seller and works to market the property and secure the best offer. In this demo, agents are fictional." },
  { q: "How much is the commission to sell my home?", a: "Real estate commissions are negotiable and vary by market and broker. Typical total commissions range from 5% to 6%, often split between the buyer's and listing agents. Ask any brokerage for their specific fee structure." },
];

const testimonials = [
  { text: "Sarah sold our house in 11 days for above asking. Her market knowledge and negotiation skills are unmatched in Rockford.", author: "The Peterson Family", location: "Illustrative review, Rockford, IL" },
  { text: "As first-time homebuyers, we were nervous. Mike walked us through every step and found us a home we love in our budget.", author: "Jake & Emily", location: "Illustrative review, Loves Park, IL" },
  { text: "Professional, responsive, and genuinely cares about her clients. Jessica found us the perfect home in Roscoe in two weeks.", author: "Diana M.", location: "Illustrative review, Roscoe, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const RealEstateDemo: React.FC = () => (
  <DemoLayout demoName="Rockford Heritage Realty" industry="Real Estate" themeColor="#ad7f3a" designSystem="luxury" pageClassName="demo-flagship demo-flagship--realty">
    <nav className="flagship-nav realty-nav" aria-label="Rockford Heritage Realty navigation">
      <a className="flagship-nav__brand" href="#realty-top" aria-label="Rockford Heritage Realty home">
        <span className="realty-mark" aria-hidden="true">RH</span>
        <span><strong>Rockford Heritage</strong><small>Realty · Northern Illinois</small></span>
      </a>
      <div className="flagship-nav__links">
        <a href="#listings">Properties</a>
        <a href="#listings">Neighborhoods</a>
        <a href="#listings" className="demo-btn demo-btn--primary">Begin a search</a>
      </div>
    </nav>

    <section className="realty-hero" id="realty-top">
      <div className="realty-hero__image">
        <img src="/images/demos/real-estate/hero.jpg" alt="Large Rockford-area home framed by mature landscaping" />
        <span>Illustrative residence · Rockford, Illinois</span>
      </div>
      <div className="realty-hero__copy">
        <p className="flagship-eyebrow">Local representation · Thoughtful search</p>
        <h1>A home is not<br />a filter result.</h1>
        <p>It is a street, a school run, a future renovation, and a monthly number that has to make sense. We bring local context to every showing and every offer.</p>
        <a href="#listings" className="demo-btn demo-btn--primary"><SearchIcon size={18} /> Explore sample homes</a>
        <div className="realty-hero__edition"><span>Market note / 01</span><strong>Start with how you want to live.</strong><small>Then let price, place, and timing shape the shortlist.</small></div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#2a2a2e", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> Rockford Heritage Realty is a fictional business concept created by Bradley Matera. Agents, listings, market data, and reviews are illustrative.
    </div>

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
        <button type="button" className="demo-form__submit" aria-live="polite" onClick={(event) => { event.currentTarget.textContent = "6 sample homes found"; }} style={{ width: "auto", padding: "0.75rem 1.5rem", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}><SearchIcon size={18} /> Search</button>
      </div>
    </div>

    {/* Featured Listings - illustrative sample data */}
    <section className="demo-section" id="listings">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Featured Listings</h2>
        <p className="demo-section__subtitle">Illustrative sample listings, prices, addresses, and scores. A production site would display live MLS data through a board-approved IDX feed.</p>
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
          <span className="demo-trust-logo"><ShieldIcon size={20} /> MLS IDX Ready (illustrative)</span>
          <span className="demo-trust-logo"><HouseIcon size={20} /> Listing Syndication Example</span>
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ marginTop: "2rem", overflowX: "auto" }} tabIndex={0} role="region" aria-label="Listing comparison">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--demo-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Listing</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Price</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Beds</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Baths</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Sq Ft</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Walk Score</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.title} style={{ borderBottom: "1px solid var(--demo-border)" }}>
                  <td style={{ padding: "0.75rem" }}>{l.title}</td>
                  <td style={{ padding: "0.75rem" }}>{l.price}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>{l.beds}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>{l.baths}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>{l.sqft}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>{l.walkScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--demo-text-muted)" }}>Illustrative sample listings for demo purposes. A production site would show live MLS data.</p>
      </div>
    </section>

    {/* Mortgage Calculator */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Mortgage Estimator</h2>
        <p className="demo-section__subtitle">Illustrative monthly payment estimate. Rates, taxes, insurance, and fees vary by lender and property.</p>
        <MortgageCalculator />
      </div>
    </section>

    {/* Market Dashboard */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Rockford Market Report</h2>
        <p className="demo-section__subtitle">Illustrative market snapshot for demo layout. Real data would come from the local MLS or a board-approved data provider.</p>
        <div className="demo-stats">
          <div><div className="demo-stat__number">$195K</div><div className="demo-stat__label">Illustrative Median</div></div>
          <div><div className="demo-stat__number">23 days</div><div className="demo-stat__label">Illustrative DOM</div></div>
          <div><div className="demo-stat__number">98%</div><div className="demo-stat__label">Illustrative Sale/List</div></div>
          <div><div className="demo-stat__number">+4.2%</div><div className="demo-stat__label">Illustrative YoY</div></div>
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
            <p className="demo-split-image-text__text">This demo represents an agent team with deep local knowledge. A real buyer or seller should interview agents, verify credentials, and confirm recent sales experience in the target neighborhood.</p>
            <p className="demo-split-image-text__text">When you choose a brokerage, ask how they communicate, how they market listings, and how they handle multiple-offer scenarios.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Neighborhood Guides with real photos */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Neighborhood Guides</h2>
        <p className="demo-section__subtitle">Illustrative neighborhood snapshots for demo layout. Median prices and ratings are placeholders, not current market data.</p>
        <div className="demo-neighborhoods">
          {neighborhoods.slice(0, 4).map((n) => (
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

    <FAQSection faqs={faqs} />

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
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default RealEstateDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Real Estate Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
