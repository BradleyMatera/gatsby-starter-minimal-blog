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
import { StarIcon, MapPinIcon, PhoneIcon, ScissorsIcon, BrushIcon, SpaIcon, HandIcon, RingIcon, ClockIcon, InstagramIcon } from "../../site/icons";

const pathname = "/demos/beauty-salon/";
const pageTitle = "Bella Vista Salon — Hair & Beauty in Rockford, IL | Demo Website";
const pageDescription = "Demo beauty salon website for Bella Vista Salon — service menu, stylist team bios, online booking widget, before/after gallery, and gift cards. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "Vagaro Booking Widget", category: "Online Booking", description: "Real-time booking with stylist availability. Customer picks service, stylist, date, and time. Syncs with your calendar automatically. Sends text reminders to reduce no-shows.", freeTier: "Vagaro from $25/month. 2.19% + $0.59 per booking fee.", url: "https://vagaro.com", status: "mocked" },
  { name: "Square Appointments", category: "Online Booking + POS", description: "Free online booking with built-in payment processing. Customer books and pays deposit online. Syncs with Square POS for retail product sales.", freeTier: "Free booking software. 2.6% + 10¢ per transaction.", url: "https://square.com/appointments", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map showing salon location with directions. Customers tap to navigate.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Live Google reviews on your site. Auto-updates. Links to your Google profile for new reviews.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Instagram Graph API", category: "Social Media Gallery", description: "Auto-displays your latest Instagram posts as a photo gallery. Perfect for showing hair transformations, nail art, and makeup work.", freeTier: "200 requests/hour (free). Facebook Business account required.", url: "https://developers.facebook.com/docs/instagram-api", status: "mocked" },
  { name: "Yelp Fusion API", category: "Reviews & Ratings", description: "Displays Yelp reviews and rating on your site. Links to your Yelp profile for more reviews.", freeTier: "500 API calls/day (free). No credit card required.", url: "https://docs.developer.yelp.com/", status: "mocked" },
  { name: "Giftfly / Square Gift Cards", category: "Gift Cards", description: "Sell digital gift cards online. Customer purchases, recipient gets email with code. Redeemable in-salon or online. Perfect for holidays.", freeTier: "Square gift cards: 2.6% + 10¢ per transaction. Cards from $2 each.", url: "https://square.com/gift-cards", status: "available" },
  { name: "KlientBoost / Zenoti", category: "Salon Management Software", description: "Full salon management: booking, POS, inventory, loyalty program, marketing campaigns, and client history. All-in-one platform.", freeTier: "Zenoti from $199/month. 14-day free trial.", url: "https://zenoti.com", status: "available" },
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
  { name: "Angela Rossi", role: "Owner & Master Stylist", specialties: ["Balayage", "Color Correction", "Bridal"], bio: "20 years experience. Trained at Vidal Sassoon. Specializes in balayage and bridal styling.", img: "stylist-1" },
  { name: "Lisa Chen", role: "Senior Colorist", specialties: ["Vivid Color", "Highlights", "Blonde Specialist"], bio: "12 years experience. Redken certified. Known for her stunning vivid color transformations.", img: "stylist-2" },
  { name: "Maya Kim", role: "Esthetician", specialties: ["Facials", "Peels", "Brow Artistry"], bio: "8 years experience. Dermalogica certified. Specializes in anti-aging treatments and brow artistry.", img: "stylist-3" },
  { name: "Tina Santos", role: "Nail Technician", specialties: ["Nail Art", "Gel", "Spa Pedicures"], bio: "10 years experience. OPI certified. Creates intricate nail art designs that go viral on Instagram.", img: "stylist-4" },
];

const productBrands = ["Olaplex", "Redken", "OPI", "Dermalogica", "Gelish", "Wella", "Moroccanoil", "It's a 10", "Kevin Murphy"];

const faqs: FAQItem[] = [
  { q: "How much does a haircut cost?", a: "Adult haircuts at Bella Vista Salon start at $45 for a basic cut and style. Senior cuts (65+) are $35, and children's cuts (under 12) are $25. Prices vary by stylist level — master stylists charge $55 to $65. All haircuts include a consultation, wash, cut, and style." },
  { q: "Do I need an appointment or can I walk in?", a: "We recommend booking an appointment to guarantee your preferred stylist and time. Walk-ins are accepted when stylists are available, but wait times can be 30 to 60 minutes during peak hours. Book online through our website or call (815) 555-0987." },
  { q: "How long does hair color last?", a: "Permanent hair color typically lasts 4 to 6 weeks before noticeable fading. Semi-permanent color lasts 2 to 4 weeks. Balayage and highlights can last 3 to 4 months before needing a touch-up. Using color-safe shampoo and avoiding hot water extends color life." },
  { q: "Do you do bridal and event styling?", a: "Yes. We offer bridal hair and makeup packages starting at $150 for the bride and $75 per bridesmaid. Trial runs are $75 and are credited toward your final booking. We also do prom, homecoming, and special event styling. Book bridal services at least 3 months in advance." },
  { q: "What products do you use?", a: "We use professional-grade products from Olaplex, Redken, OPI, Dermalogica, and Moroccanoil. All products are available for purchase at the salon. Our stylists can recommend the best products for your hair type and styling routine." },
  { q: "What is your cancellation policy?", a: "We require 24 hours notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice are charged 50% of the service price. No-shows are charged the full service price. We send text and email reminders 48 hours before your appointment." },
];

const testimonials = [
  { text: "Angela is a color genius. She fixed a box-dye disaster and my hair has never looked better. I won't go anywhere else.", author: "Rachel B.", location: "Rockford, IL" },
  { text: "Got my wedding hair and makeup done here and it was perfect. The whole bridal party looked amazing. Worth every penny.", author: "Brittany K.", location: "Roscoe, IL" },
  { text: "Best pedicure in Rockford. The spa treatment is so relaxing and Tina does the most beautiful nail art.", author: "Sandra W.", location: "Loves Park, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const BeautySalonDemo: React.FC = () => (
  <DemoLayout demoName="Bella Vista Salon" industry="Beauty Salon" themeColor="#d63384" designSystem="soft">
    {/* Hero with real salon photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/beauty-salon/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Premier Hair & Beauty Salon Since 2014</span>
        <h1 className="demo-hero__title">Bella Vista Salon</h1>
        <p className="demo-hero__subtitle">Hair, color, nails, facials, and makeup in a relaxing, modern salon. New clients get 20% off their first service.</p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Online</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Features at a glance</h2>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Bella Vista Salon features at a glance">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Service menu</td>
                <td style={{ padding: "0.75rem" }}>Categorized services for hair, nails, skincare, and makeup with pricing and estimated duration.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Stylist bios</td>
                <td style={{ padding: "0.75rem" }}>Stylist profiles with specialties, certifications, experience, and professional photos.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Photo gallery</td>
                <td style={{ padding: "0.75rem" }}>Salon interior gallery and before-and-after transformation photos showcasing stylist work.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Online booking</td>
                <td style={{ padding: "0.75rem" }}>Online booking widget with stylist availability, service selection, date, and time. Text reminders included.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Price list</td>
                <td style={{ padding: "0.75rem" }}>Transparent pricing for all services with clear time estimates and starting prices for complex treatments.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Mobile-responsive</td>
                <td style={{ padding: "0.75rem" }}>Fully responsive layout optimized for phones, tablets, and desktops.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>SEO setup</td>
                <td style={{ padding: "0.75rem" }}>HairSalon schema markup, service pages with unique content, Google Business Profile, and sitemap.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Reviews</td>
                <td style={{ padding: "0.75rem" }}>Google and Yelp review badges with star ratings and customer testimonials.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

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
          <div><div className="demo-stat__number">10</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">5,000+</div><div className="demo-stat__label">Happy Clients</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Expert Stylists</div></div>
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
        <p className="demo-section__subtitle">A modern, welcoming space designed for your comfort.</p>
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
        <p className="demo-section__subtitle">Hair, nails, skincare, and makeup — all under one roof.</p>
        <div className="demo-services-grid">
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/hair-styling.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Hair Styling</h3><p className="demo-service-card__desc">Cuts, styling, blowouts, and treatments for all hair types.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/hair-color.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Hair Color</h3><p className="demo-service-card__desc">Full color, highlights, balayage, and vivid color transformations.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/manicure.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Manicures</h3><p className="demo-service-card__desc">Classic, gel, dip powder, and custom nail art designs.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/pedicure.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Pedicures</h3><p className="demo-service-card__desc">Classic, spa, and luxury pedicures with paraffin treatment.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/facial.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Facials</h3><p className="demo-service-card__desc">Custom, deep cleansing, anti-aging, and microdermabrasion.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/makeup.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Makeup</h3><p className="demo-service-card__desc">Everyday, special event, bridal, and makeup lessons.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/lash-extensions.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Lash Extensions</h3><p className="demo-service-card__desc">Classic, volume, and hybrid lash extensions. Lash tinting too.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/beauty-salon/products.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Products</h3><p className="demo-service-card__desc">Olaplex, Redken, OPI, Dermalogica, and more. Available in-salon.</p></div>
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
        <p className="demo-section__subtitle">Premium professional products available in-salon and for purchase online.</p>
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
        <p className="demo-section__subtitle">Book online in seconds. Choose your stylist, service, and time.</p>
        <ol style={{ maxWidth: "600px", margin: "0 auto 2rem", paddingLeft: "1.5rem", color: "var(--demo-text-muted)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <li>Choose your service — haircut, color, nails, skincare, or makeup.</li>
          <li>Select your preferred stylist from our team of four professionals.</li>
          <li>Pick a date and time that works for you — real-time availability shown instantly.</li>
          <li>Enter your name and phone number to confirm — you will receive a text reminder 48 hours before your appointment.</li>
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
              <div className="demo-booking-widget__note">Mock Vagaro widget. Production sites embed the real Vagaro booking widget for live availability. $25/month + 2.19% per booking. Sends automatic text reminders.</div>
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
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
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
