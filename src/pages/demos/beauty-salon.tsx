import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, ScissorsIcon, BrushIcon, SpaIcon, HandIcon, RingIcon, ClockIcon } from "../../site/icons";

const pathname = "/demos/beauty-salon/";
const pageTitle = "Bella Vista Salon — Hair & Beauty in Rockford, IL | Demo Website";
const pageDescription =
  "Demo beauty salon website with service menu, stylist team, online booking, and before/after gallery.";

const serviceCategories = [
  {
    Icon: ScissorsIcon,
    title: "Hair",
    items: [
      { name: "Women's Cut & Style", time: "60 min", price: "$45" },
      { name: "Men's Cut", time: "30 min", price: "$28" },
      { name: "Children's Cut (under 12)", time: "20 min", price: "$20" },
      { name: "Blowout & Style", time: "45 min", price: "$35" },
      { name: "Full Color", time: "2 hrs", price: "$85+" },
      { name: "Partial Highlights", time: "2 hrs", price: "$95+" },
      { name: "Balayage", time: "3 hrs", price: "$150+" },
      { name: "Color Correction", time: "Consult", price: "$200+" },
    ],
  },
  {
    Icon: HandIcon,
    title: "Nails",
    items: [
      { name: "Classic Manicure", time: "30 min", price: "$25" },
      { name: "Gel Manicure", time: "45 min", price: "$35" },
      { name: "Dip Powder", time: "45 min", price: "$45" },
      { name: "Classic Pedicure", time: "45 min", price: "$35" },
      { name: "Spa Pedicure", time: "60 min", price: "$50" },
      { name: "Luxury Pedicure + Paraffin", time: "75 min", price: "$65" },
      { name: "Nail Art (per nail)", time: "10 min", price: "$5+" },
      { name: "Nail Repair (single)", time: "10 min", price: "$8" },
    ],
  },
  {
    Icon: SpaIcon,
    title: "Skincare",
    items: [
      { name: "Custom Facial", time: "60 min", price: "$65" },
      { name: "Deep Cleansing Facial", time: "75 min", price: "$85" },
      { name: "Anti-Aging Facial", time: "90 min", price: "$95" },
      { name: "Microdermabrasion", time: "45 min", price: "$75" },
      { name: "Chemical Peel", time: "60 min", price: "$120+" },
      { name: "LED Light Therapy", time: "30 min", price: "$45" },
      { name: "Brow Wax & Shape", time: "20 min", price: "$20" },
      { name: "Lash Tint", time: "30 min", price: "$25" },
    ],
  },
  {
    Icon: BrushIcon,
    title: "Makeup & Events",
    items: [
      { name: "Everyday Makeup", time: "45 min", price: "$50" },
      { name: "Special Event Makeup", time: "60 min", price: "$75" },
      { name: "Bridal Makeup (incl. trial)", time: "2 hrs", price: "$150" },
      { name: "Bridal Party (per person)", time: "45 min", price: "$65" },
      { name: "Lash Application", time: "30 min", price: "$30" },
      { name: "Makeup Lesson", time: "90 min", price: "$100" },
    ],
  },
];

const stylists = [
  { initials: "AR", name: "Angela Rossi", role: "Owner & Master Stylist", specialties: ["Balayage", "Color Correction", "Bridal"] },
  { initials: "LC", name: "Lisa Chen", role: "Senior Colorist", specialties: ["Vivid Color", "Highlights", "Blonde Specialist"] },
  { initials: "MK", name: "Maya Kim", role: "Esthetician", specialties: ["Facials", "Peels", "Brow Artistry"] },
  { initials: "TS", name: "Tina Santos", role: "Nail Technician", specialties: ["Nail Art", "Gel", "Spa Pedicures"] },
];

const beforeAfter = [
  { title: "Balayage Transformation", desc: "Dark roots to sun-kissed blonde — seamless grow-out" },
  { title: "Color Correction", desc: "Fixed box-dye disaster, restored natural-looking blonde" },
  { title: "Bridal Updo", desc: "Romantic half-up style for a Rockford wedding" },
  { title: "Nail Art Design", desc: "Custom floral design for a special occasion" },
];

const productBrands = ["Olaplex", "Redken", "OPI", "Dermalogica", "Gelish", "Wella", "Moroccanoil", "It's a 10", "Kevin Murphy"];

const testimonials = [
  { text: "Angela is a color genius. She fixed a box-dye disaster and my hair has never looked better. I won't go anywhere else.", author: "Rachel B.", location: "Rockford, IL" },
  { text: "Got my wedding hair and makeup done here and it was perfect. The whole bridal party looked amazing. Worth every penny.", author: "Brittany K.", location: "Roscoe, IL" },
  { text: "Best pedicure in Rockford. The spa treatment is so relaxing and Tina does the most beautiful nail art.", author: "Sandra W.", location: "Loves Park, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const BeautySalonDemo: React.FC = () => (
  <DemoLayout demoName="Bella Vista Salon" industry="Beauty Salon" themeColor="#d63384">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #a02463, #4a1230)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Premier Hair & Beauty Salon Since 2014</span>
        <h1 className="demo-hero__title">Bella Vista Salon</h1>
        <p className="demo-hero__subtitle">
          Hair, color, nails, facials, and makeup in a relaxing, modern salon. New clients get 20%
          off their first service.
        </p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Online</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    {/* New client special banner — salons always have promotions */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        <span className="demo-trust-badge"><ScissorsIcon size={18} /> New Clients: 20% Off</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Walk-Ins Welcome</span>
        <span className="demo-trust-badge"><RingIcon size={18} /> Bridal Packages</span>
        <span className="demo-trust-badge"><PhoneIcon size={18} /> (815) 555-0987</span>
      </div>
    </div>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">10</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">5,000+</div><div className="demo-stat__label">Happy Clients</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Expert Stylists</div></div>
        </div>
      </div>
    </section>

    {/* Service Menu — categorized by type (hair, nails, skincare, makeup) with times */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Services &amp; Pricing</h2>
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

    {/* Before & After Gallery — salon clients want to see results */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Work</h2>
        <p className="demo-section__subtitle">Real transformations from our clients. Follow us on Instagram for more.</p>
        <div className="demo-before-after">
          {beforeAfter.map((p) => (
            <div key={p.title} className="demo-before-after__item">
              <div className="demo-before-after__images">
                <div className="demo-before-after__before">
                  <span className="demo-before-after__label">Before</span>
                </div>
                <div className="demo-before-after__after" style={{ background: "linear-gradient(135deg, #a02463, #4a1230)" }}>
                  <span className="demo-before-after__label">After</span>
                </div>
              </div>
              <div className="demo-before-after__body">
                <h3 className="demo-before-after__title">{p.title}</h3>
                <p className="demo-before-after__desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stylists with specialties — salon clients choose by stylist */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Stylists</h2>
        <p className="demo-section__subtitle">Request your stylist by name when booking. Each has their own specialty.</p>
        <div className="demo-team">
          {stylists.map((s) => (
            <div key={s.name} className="demo-stylist">
              <div className="demo-stylist__photo">{s.initials}</div>
              <div className="demo-stylist__name">{s.name}</div>
              <div className="demo-stylist__role">{s.role}</div>
              <div className="demo-stylist__specialties">
                {s.specialties.map((sp) => <span key={sp} className="demo-stylist__specialty">{sp}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Product Brands — salons sell products and clients want to know what you use */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Products We Use</h2>
        <p className="demo-section__subtitle">Premium professional products available in-salon and for purchase.</p>
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

    {/* Gift Cards — salons sell gift cards heavily */}
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
      </div>
    </section>

    {/* Hours & Booking */}
    <section className="demo-section demo-section--alt" id="book">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Book Your Appointment</h2>
        <p className="demo-section__subtitle">Call us or book online. Walk-ins welcome based on availability.</p>
        <div className="demo-two-col">
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
          <div>
            <div className="demo-booking-form">
              <div className="demo-form__field">
                <label className="demo-form__label">Your Name</label>
                <input className="demo-form__input" type="text" placeholder="First and last name" />
              </div>
              <div className="demo-form__field">
                <label className="demo-form__label">Phone</label>
                <input className="demo-form__input" type="tel" placeholder="(815) 555-0000" />
              </div>
              <div className="demo-form__row">
                <div className="demo-form__field">
                  <label className="demo-form__label">Service</label>
                  <select className="demo-form__select">
                    <option>Haircut & Style</option>
                    <option>Color / Highlights</option>
                    <option>Manicure / Pedicure</option>
                    <option>Facial</option>
                    <option>Makeup</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="demo-form__field">
                  <label className="demo-form__label">Stylist</label>
                  <select className="demo-form__select">
                    <option>No preference</option>
                    <option>Angela Rossi</option>
                    <option>Lisa Chen</option>
                    <option>Maya Kim</option>
                    <option>Tina Santos</option>
                  </select>
                </div>
              </div>
              <div className="demo-form__field">
                <label className="demo-form__label">Preferred Date</label>
                <input className="demo-form__input" type="text" placeholder="MM/DD/YYYY" />
              </div>
              <button type="button" className="demo-form__submit">Request Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Bella Vista Salon</div>
        <div>321 N Main Street, Rockford, IL 61103 · (815) 555-0987</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default BeautySalonDemo;

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
        { name: "Beauty Salon Demo", path: pathname },
      ]}
    />
  );
};
