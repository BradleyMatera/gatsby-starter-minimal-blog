import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import GoogleMapsEmbed from "../../features/demos/GoogleMapsEmbed";
import SocialLinks, { SocialLink } from "../../features/demos/SocialLinks";
import ReviewBadges from "../../features/demos/ReviewBadges";
import IntegrationsSection, { Integration } from "../../features/demos/IntegrationsSection";
import FAQSection, { FAQItem } from "../../features/demos/FAQSection";
import { StarIcon, MapPinIcon, PhoneIcon, ScissorsIcon, BrushIcon, SpaIcon, HandIcon, RingIcon, ClockIcon, InstagramIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/beauty-salon/";
const pageTitle = "Bella Vista Salon — Beauty Salon Website Concept Demo (Fictional)";
const pageDescription = "Concept demo of a fictional beauty salon website with service menu, stylist bios, booking widget, and product showcase. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "Vagaro Booking Widget", category: "Online Booking", description: "Sample booking widget. Customers could pick service, stylist, date, and time and sync with a salon calendar with text reminders.", freeTier: "Vagaro from $25/month. 2.19% + $0.59 per booking fee.", url: "https://vagaro.com", status: "mocked" },
  { name: "Square Appointments", category: "Online Booking + POS", description: "Online booking with built-in payment processing. Customer books and pays deposit online. Syncs with Square POS for retail product sales.", freeTier: "Free booking software. 2.6% + 10¢ per transaction.", url: "https://square.com/appointments", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map showing salon location with directions. Customers tap to navigate.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Sample Google review display. Production sites can pull live reviews and ratings.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Instagram Graph API", category: "Social Media Gallery", description: "Sample Instagram photo gallery. A production site could display recent posts for social proof and inspiration.", freeTier: "200 requests/hour (free). Facebook Business account required.", url: "https://developers.facebook.com/docs/instagram-api", status: "mocked" },
  { name: "Yelp Fusion API", category: "Reviews & Ratings", description: "Sample Yelp review display. Links to a real Yelp profile once the business is listed.", freeTier: "500 API calls/day (free). No credit card required.", url: "https://docs.developer.yelp.com/", status: "mocked" },
  { name: "Giftfly / Square Gift Cards", category: "Gift Cards", description: "Digital gift card example. Customers purchase online, recipient gets an email code redeemable in-salon.", freeTier: "Square gift cards: 2.6% + 10¢ per transaction. Cards from $2 each.", url: "https://square.com/gift-cards", status: "available" },
  { name: "KlientBoost / Zenoti", category: "Salon Management Software", description: "Full salon management example: booking, POS, inventory, loyalty, marketing, and client history.", freeTier: "Zenoti from $199/month. 14-day free trial.", url: "https://zenoti.com", status: "available" },
];

const serviceCategories = [
  { Icon: ScissorsIcon, title: "Hair", items: [
    { name: "Women's Cut & Style", time: "60 min", price: "$45" },
    { name: "Men's Cut", time: "30 min", price: "$28" },
    { name: "Children's Cut (under 12)", time: "20 min", price: "$20" },
    { name: "Blowout & Style", time: "45 min", price: "$35" },
    { name: "Full Color", time: "2 hrs", price: "$85+" },
    { name: "Partial Highlights", time: "2 hrs", price: "$95+" },
    { name: "Balayage", time: "3 hrs", price: "$150+" },
    { name: "Color Correction", time: "Consult", price: "$200+" },
  ]},
  { Icon: HandIcon, title: "Nails", items: [
    { name: "Classic Manicure", time: "30 min", price: "$25" },
    { name: "Gel Manicure", time: "45 min", price: "$35" },
    { name: "Dip Powder", time: "45 min", price: "$45" },
    { name: "Classic Pedicure", time: "45 min", price: "$35" },
    { name: "Spa Pedicure", time: "60 min", price: "$50" },
    { name: "Luxury Pedicure + Paraffin", time: "75 min", price: "$65" },
    { name: "Nail Art (per nail)", time: "10 min", price: "$5+" },
    { name: "Nail Repair (single)", time: "10 min", price: "$8" },
  ]},
  { Icon: SpaIcon, title: "Skincare", items: [
    { name: "Custom Facial", time: "60 min", price: "$65" },
    { name: "Deep Cleansing Facial", time: "75 min", price: "$85" },
    { name: "Anti-Aging Facial", time: "90 min", price: "$95" },
    { name: "Microdermabrasion", time: "45 min", price: "$75" },
    { name: "Chemical Peel", time: "60 min", price: "$120+" },
    { name: "LED Light Therapy", time: "30 min", price: "$45" },
    { name: "Brow Wax & Shape", time: "20 min", price: "$20" },
    { name: "Lash Tint", time: "30 min", price: "$25" },
  ]},
  { Icon: BrushIcon, title: "Makeup & Events", items: [
    { name: "Everyday Makeup", time: "45 min", price: "$50" },
    { name: "Special Event Makeup", time: "60 min", price: "$75" },
    { name: "Bridal Makeup (incl. trial)", time: "2 hrs", price: "$150" },
    { name: "Bridal Party (per person)", time: "45 min", price: "$65" },
    { name: "Lash Application", time: "30 min", price: "$30" },
    { name: "Makeup Lesson", time: "90 min", price: "$100" },
  ]},
];

const stylists = [
  { name: "Angela Rossi", role: "Owner & Master Stylist", specialties: ["Balayage", "Color Correction", "Bridal"], bio: "Fictional profile for demo purposes. 20 years experience. Trained at Vidal Sassoon. Specializes in balayage and bridal styling.", img: "stylist-1" },
  { name: "Lisa Chen", role: "Senior Colorist", specialties: ["Vivid Color", "Highlights", "Blonde Specialist"], bio: "Fictional profile for demo purposes. 12 years experience. Redken certified. Known for vivid color transformations.", img: "stylist-2" },
  { name: "Maya Kim", role: "Esthetician", specialties: ["Facials", "Peels", "Brow Artistry"], bio: "Fictional profile for demo purposes. 8 years experience. Dermalogica certified. Specializes in anti-aging treatments and brow artistry.", img: "stylist-3" },
  { name: "Tina Santos", role: "Nail Technician", specialties: ["Nail Art", "Gel", "Spa Pedicures"], bio: "Fictional profile for demo purposes. 10 years experience. OPI certified. Creates intricate nail art designs.", img: "stylist-4" },
];

const productBrands = ["Olaplex", "Redken", "OPI", "Dermalogica", "Gelish", "Wella", "Moroccanoil", "It's a 10", "Kevin Murphy"];

const faqs: FAQItem[] = [
  { q: "How much does a haircut cost?", a: "Haircut pricing depends on the stylist level, service, and salon location. Contact Bella Vista Salon or check the menu for current pricing. A typical range for a women's cut and style is $45–$65." },
  { q: "Do I need an appointment or can I walk in?", a: "Appointments are recommended to secure your preferred stylist and time. Walk-ins are accepted when availability allows. Call (815) 555-0987 or use the online booking example on this page." },
  { q: "How long does hair color last?", a: "Color longevity varies by type, hair condition, and aftercare. Permanent color typically lasts several weeks, while balayage and highlights can last months before a touch-up. Use color-safe products and follow your stylist's care instructions." },
  { q: "Do you do bridal and event styling?", a: "Yes. Bridal and event packages are available. Pricing and availability depend on the date, party size, and services selected. Book event styling well in advance, especially during wedding season." },
  { q: "What products do you use?", a: "We use professional-grade salon products. Specific brands and recommendations vary by stylist and hair type. Products are available for purchase at the salon." },
  { q: "What is your cancellation policy?", a: "Cancellation and no-show policies vary by salon. We recommend confirming the policy when you book. Most salons require 24 hours' notice for cancellations to avoid a fee." },
];

const testimonials = [
  { text: "Angela is a color genius. She fixed a box-dye disaster and my hair has never looked better. I won't go anywhere else.", author: "Rachel B.", location: "Illustrative review, Rockford, IL" },
  { text: "Got my wedding hair and makeup done here and it was perfect. The whole bridal party looked amazing. Worth every penny.", author: "Brittany K.", location: "Illustrative review, Roscoe, IL" },
  { text: "Best pedicure in Rockford. The spa treatment is so relaxing and Tina does the most beautiful nail art.", author: "Sandra W.", location: "Illustrative review, Loves Park, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const BeautySalonDemo: React.FC = () => (
  <DemoLayout demoName="Bella Vista Salon" industry="Beauty Salon" themeColor="#d63384" designSystem="soft">
    {/* Hero with real salon photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/beauty-salon/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Hair · Color · Nails · Skin · Rockford</span>
        <h1 className="demo-hero__title">Bella Vista Salon</h1>
        <p className="demo-hero__subtitle">Fictional demo of a full-service salon. Haircuts, color, nails, facials, and bridal styling — with a transparent menu and easy online booking.</p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Online</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#3d1f2b", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> Bella Vista Salon is a fictional business concept created by Bradley Matera. Team, reviews, images, and interactive features are illustrative.
    </div>

    {/* New client special banner */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        <span className="demo-trust-badge"><ScissorsIcon size={18} /> New Clients: 20% Off</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Walk-Ins Welcome</span>
        <span className="demo-trust-badge"><RingIcon size={18} /> Bridal Packages</span>
        <span className="demo-trust-badge"><PhoneIcon size={18} /> (815) 555-0987</span>
      </div>
    </div>

    {/* Stats + Review Badges */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">10</div><div className="demo-stat__label">Illustrative Years</div></div>
          <div><div className="demo-stat__number">5,000+</div><div className="demo-stat__label">Illustrative Clients</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Illustrative Rating</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Illustrative Stylists</div></div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={143} yelpRating={4.5} yelpReviewCount={38} />
        </div>
      </div>
    </section>

    {/* Split image + text: salon interior */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/salon-interior.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">A Relaxing Escape</h2>
            <p className="demo-split-image-text__text">Step into our modern, welcoming salon and leave the stress behind. Complimentary beverages, comfortable seating, and a relaxing atmosphere designed for your comfort.</p>
            <p className="demo-split-image-text__text">Our 2,000 sq ft space features 6 styling stations, 2 nail stations, a private facial room, and a dedicated makeup area.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Salon interior gallery */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Inside Bella Vista</h2>
        <p className="demo-section__subtitle">A representative look at a modern salon space. Photos are for demo layout only.</p>
        <div className="demo-food-gallery">
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/salon-chairs.jpg)" }}><span className="demo-food-gallery__label">Styling Stations</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/salon-reception.jpg)" }}><span className="demo-food-gallery__label">Reception Area</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/salon-nail-area.jpg)" }}><span className="demo-food-gallery__label">Nail Station</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/products.jpg)" }}><span className="demo-food-gallery__label">Retail Products</span></div>
        </div>
      </div>
    </section>

    {/* Services Gallery with real photos */}
    <section className="demo-section" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Hair, nails, skincare, and makeup — all under one roof. Full menu with prices below.</p>
        <div className="demo-services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/hair-styling.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Hair</h3><p className="demo-service-card__desc">Cuts, styling, blowouts, color, highlights, balayage, and treatments.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/manicure.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Nails</h3><p className="demo-service-card__desc">Manicures, pedicures, gel, dip powder, and nail art.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/facial.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Skin</h3><p className="demo-service-card__desc">Custom facials, peels, microdermabrasion, and LED therapy.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/makeup.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Events</h3><p className="demo-service-card__desc">Bridal and special-event makeup, lash application, and lessons.</p></div>
          </div>
        </div>
      </div>
    </section>

    {/* Service Menu - detailed pricing */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Services & Pricing</h2>
        <p className="demo-section__subtitle">Full menu of services. Prices vary by hair length and stylist level — call for a custom quote.</p>
        <div className="demo-salon-categories">
          {serviceCategories.map((cat) => {
            const { Icon } = cat;
            return (
              <div key={cat.title}>
                <h3 className="demo-salon-category__title"><Icon size={20} /> {cat.title}</h3>
                {cat.items.map((item) => (
                  <div key={item.name} className="demo-salon-category__item">
                    <div>
                      <p className="demo-salon-category__item-name">{item.name}</p>
                      <p className="demo-salon-category__item-time">{item.time}</p>
                    </div>
                    <div className="demo-salon-category__item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Feature image: manicure */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/beauty-salon/manicure.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Nail Artistry</h2>
        <p className="demo-feature-image__text">From classic manicures to elaborate nail art — your nails are our canvas.</p>
      </div>
    </div>

    {/* Stylists with real photos */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Stylists</h2>
        <p className="demo-section__subtitle">Request your stylist by name when booking. Each has their own specialty.</p>
        <div className="demo-team-grid">
          {stylists.map((s) => (
            <div key={s.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(/images/demos/beauty-salon/${s.img}.jpg)` }} />
              <div className="demo-team-card__body">
                <h3 className="demo-team-card__name">{s.name}</h3>
                <p className="demo-team-card__role">{s.role}</p>
                <p className="demo-team-card__bio">{s.bio}</p>
                <div className="demo-stylist__specialties" style={{ marginTop: "0.75rem" }}>
                  {s.specialties.map((sp) => <span key={sp} className="demo-stylist__specialty">{sp}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Instagram Feed with real salon photos */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title"><InstagramIcon size={24} /> Follow @bellavistasalon</h2>
        <p className="demo-section__subtitle">See our latest transformations, nail art, and behind-the-scenes. New posts daily.</p>
        <div className="demo-instagram-feed">
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/hair-styling.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/hair-color.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/balayage.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/manicure.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/manicure-2.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/pedicure.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/facial.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/beauty-salon/makeup.jpg)" }} />
        </div>
        <div className="demo-instagram-feed__note">Mock Instagram feed. Production sites use the Instagram Graph API to auto-display latest posts.</div>
      </div>
    </section>

    {/* Product Brands */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Products We Use</h2>
        <p className="demo-section__subtitle">Premium professional products available in-salon and for purchase. Brand names are trademarks of their respective owners.</p>
        <div className="demo-product-brands">
          {productBrands.map((b) => <div key={b} className="demo-product-brand">{b}</div>)}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section demo-section--alt">
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

    <FAQSection faqs={faqs} />

    {/* Gift Cards */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-gift-card">
          <h2 className="demo-gift-card__title">Gift Cards</h2>
          <p className="demo-gift-card__desc">The perfect gift for any occasion. Available in any amount, never expires.</p>
          <div className="demo-gift-card__amounts">
            <span className="demo-gift-card__amount">$25</span>
            <span className="demo-gift-card__amount">$50</span>
            <span className="demo-gift-card__amount">$100</span>
            <span className="demo-gift-card__amount">$150</span>
            <span className="demo-gift-card__amount">Custom</span>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem", color: "var(--demo-text-muted)" }}>Mock gift card. Production sites use Square Gift Cards or Giftfly for digital gift cards with email delivery.</div>
      </div>
    </section>

    {/* Booking Widget Mock + Hours */}
    <section className="demo-section demo-section--alt" id="book">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Book Your Appointment</h2>
        <p className="demo-section__subtitle">Mock booking widget. A production site would embed your real scheduling system for live availability.</p>
        <ol style={{ maxWidth: "600px", margin: "0 auto 2rem", paddingLeft: "1.5rem", color: "var(--demo-text-muted)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <li>Choose your service — haircut, color, nails, skincare, or makeup.</li>
          <li>Select your preferred stylist from our team of four professionals.</li>
          <li>Pick a date and time that works for you — availability shown is illustrative.</li>
          <li>Enter your name and phone number to confirm — in a live system, text reminders would be sent before your appointment.</li>
        </ol>
        <div className="demo-two-col">
          <div>
            <div className="demo-booking-widget">
              <div className="demo-booking-widget__header">
                <h3 className="demo-booking-widget__title">Book Now</h3>
                <span className="demo-booking-widget__powered-by">Powered by Vagaro</span>
              </div>
              <div className="demo-form__field" style={{ margin: 0 }}>
                <label className="demo-form__label" htmlFor="salon-service">Service</label>
                <select id="salon-service" className="demo-form__select"><option>Haircut & Style</option><option>Color / Highlights</option><option>Balayage</option><option>Manicure / Pedicure</option><option>Facial</option><option>Makeup</option><option>Bridal Package</option></select>
              </div>
              <div className="demo-form__field" style={{ margin: "0.75rem 0 0" }}>
                <label className="demo-form__label" htmlFor="salon-stylist">Stylist</label>
                <select id="salon-stylist" className="demo-form__select"><option>No preference</option><option>Angela Rossi</option><option>Lisa Chen</option><option>Maya Kim</option><option>Tina Santos</option></select>
              </div>
              <div className="demo-booking-widget__row" style={{ marginTop: "0.75rem" }}>
                <div className="demo-form__field" style={{ margin: 0 }}>
                  <label className="demo-form__label" htmlFor="salon-date">Date</label>
                  <input id="salon-date" className="demo-form__input" type="date" />
                </div>
                <div className="demo-form__field" style={{ margin: 0 }}>
                  <label className="demo-form__label" htmlFor="salon-time">Time</label>
                  <select id="salon-time" className="demo-form__select"><option>9:00 AM</option><option>10:00 AM</option><option>11:00 AM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option><option>7:00 PM</option></select>
                </div>
              </div>
              <button type="button" className="demo-booking-widget__find">Book Appointment</button>
              <div className="demo-booking-widget__note">Mock Vagaro widget. This form does not submit or check real availability. Production sites embed the real Vagaro, Square Appointments, or similar booking widget for live scheduling and text reminders.</div>
            </div>
          </div>
          <div>
            <table className="demo-hours">
              <tbody>
                <tr><th>Monday</th><td>Closed</td></tr>
                <tr><th>Tuesday</th><td>9:00 AM – 7:00 PM</td></tr>
                <tr><th>Wednesday</th><td>9:00 AM – 7:00 PM</td></tr>
                <tr><th>Thursday</th><td>9:00 AM – 8:00 PM</td></tr>
                <tr><th>Friday</th><td>9:00 AM – 8:00 PM</td></tr>
                <tr><th>Saturday</th><td>8:00 AM – 6:00 PM</td></tr>
                <tr><th>Sunday</th><td>10:00 AM – 4:00 PM</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    {/* Google Maps */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Find Us</h2>
        <p className="demo-section__subtitle">321 N Main Street, Rockford, IL 61103 — free parking in the back.</p>
        <GoogleMapsEmbed address="321 N Main Street, Rockford, IL 61103" height={300} title="Bella Vista Salon location" />
      </div>
    </section>

    <IntegrationsSection industry="beauty salon & spa" integrations={integrations} />

    {/* Contact */}
    <section className="demo-contact" style={{ background: "#8b2956" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Get in Touch</h2>
        <p className="demo-contact__text">Call (815) 555-0987 or book online. New clients get 20% off their first service.</p>
        <a href="tel:8155550987" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0987</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Address</span><span>321 N Main Street, Rockford, IL</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">New Client Special</span><span>20% off first service</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>hello@bellavistasalon.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Bella Vista Salon</div>
        <div>321 N Main Street, Rockford, IL 61103 · (815) 555-0987</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default BeautySalonDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Beauty Salon Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
