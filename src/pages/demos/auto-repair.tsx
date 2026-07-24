import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, OilDropIcon, TireIcon, WrenchIcon, BoltIcon, GearIcon, SnowflakeIcon, ShieldIcon, CheckIcon, ClockIcon } from "../../site/icons";

const pathname = "/demos/auto-repair/";
const pageTitle = "Northside Auto Repair — Rockford Mechanic | Demo Website";
const pageDescription =
  "Demo auto repair shop website with service menu, online booking, tire lookup, and ASE-certified mechanic credentials.";

const serviceCategories = [
  {
    title: "Routine Maintenance",
    items: [
      { name: "Oil Change (Conventional)", desc: "Up to 5 qts, new filter, 21-point inspection", price: "$39", time: "30 min" },
      { name: "Oil Change (Full Synthetic)", desc: "Up to 5 qts, premium filter, 21-point inspection", price: "$69", time: "30 min" },
      { name: "Tire Rotation", desc: "Includes pressure check and tread depth measurement", price: "$25", time: "20 min" },
      { name: "Multipoint Inspection", desc: "50-point visual inspection with written report", price: "Free", time: "30 min" },
    ],
  },
  {
    title: "Brakes",
    items: [
      { name: "Brake Pad Replacement", desc: "Front or rear pads, includes resurfacing rotors", price: "from $179", time: "1-2 hrs" },
      { name: "Brake Fluid Flush", desc: "Remove old fluid, replace with DOT 4, bleed system", price: "$99", time: "45 min" },
      { name: "Rotor Replacement", desc: "Front or rear rotors, includes pads", price: "from $279", time: "1-2 hrs" },
      { name: "Caliper Replacement", desc: "Single caliper, includes brake fluid", price: "from $189", time: "1 hr" },
    ],
  },
  {
    title: "Diagnostics & Engine",
    items: [
      { name: "Check Engine Light", desc: "OBD-II scan, diagnose code, written estimate", price: "$89", time: "45 min" },
      { name: "Engine Diagnostics", desc: "Advanced diagnostics beyond code reading", price: "from $129", time: "1-2 hrs" },
      { name: "Transmission Service", desc: "Fluid flush, filter replacement, gasket", price: "from $149", time: "2 hrs" },
      { name: "Timing Belt", desc: "Includes tensioner and water pump inspection", price: "from $499", time: "4-6 hrs" },
    ],
  },
  {
    title: "Climate & Electrical",
    items: [
      { name: "AC Recharge", desc: "Recharge with R-134a, leak check, performance test", price: "$99", time: "45 min" },
      { name: "AC Compressor", desc: "New compressor, receiver drier, system flush", price: "from $599", time: "3-4 hrs" },
      { name: "Battery Replacement", desc: "New battery, old core recycling, terminal cleaning", price: "from $129", time: "20 min" },
      { name: "Alternator Replacement", desc: "New alternator, belt inspection, test charging", price: "from $289", time: "1-2 hrs" },
    ],
  },
];

const makes = ["Toyota", "Honda", "Ford", "Chevy", "Nissan", "Subaru", "Hyundai", "Kia", "Jeep", "Dodge", "Ram", "GMC", "Buick", "Mazda", "Volkswagen", "BMW", "Audi", "Mercedes", "Lexus", "Acura"];

const coupons = [
  { label: "Oil Change Special", offer: "$29.99", desc: "Conventional oil change with 21-point inspection. Most vehicles.", code: "OIL29" },
  { label: "Brake Special", offer: "$50 OFF", desc: "Front or rear brake pad replacement. Includes rotor resurfacing.", code: "BRAKES50" },
  { label: "AC Season", offer: "$25 OFF", desc: "AC recharge and performance check. Before the summer heat hits.", code: "AC25" },
];

const testimonials = [
  { text: "Honest mechanics who don't upsell. They showed me the worn brake pads and explained exactly what needed fixing. No pressure, no games.", author: "Chris P.", location: "Rockford, IL" },
  { text: "Took my Honda here after the dealer quoted $1,200 for a repair. Northside did it for $450 and it's been perfect for 20,000 miles.", author: "Amanda J.", location: "Loves Park, IL" },
  { text: "Quick oil change, fair price, and they found a leaking coolant hose I didn't even know about. Fixed it same day. Great shop.", author: "Kevin R.", location: "Machesney Park, IL" },
];

const trustBadges = [
  { Icon: ShieldIcon, label: "ASE Certified" },
  { Icon: ShieldIcon, label: "BBB A+ Rated" },
  { Icon: CheckIcon, label: "12-Month / 12K Mile Warranty" },
  { Icon: CheckIcon, label: "Free Estimates" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const AutoRepairDemo: React.FC = () => (
  <DemoLayout demoName="Northside Auto Repair" industry="Auto Repair" themeColor="#e67e22">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #b35414, #4a2208)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">ASE Certified · Serving Rockford Since 2008</span>
        <h1 className="demo-hero__title">Northside Auto Repair</h1>
        <p className="demo-hero__subtitle">
          Honest, reliable auto repair for all makes and models. 12-month warranty on everything we do.
          Free estimates, no pressure, no games.
        </p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Appointment</a>
          <a href="tel:8155550321" className="demo-btn demo-btn--ghost">
            <PhoneIcon size={20} /> (815) 555-0321
          </a>
        </div>
      </div>
    </section>

    {/* Trust Badges — auto repair customers need to see credentials */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        {trustBadges.map((b) => {
          const { Icon } = b;
          return (
            <span key={b.label} className="demo-trust-badge">
              <Icon size={18} /> {b.label}
            </span>
          );
        })}
      </div>
    </div>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">16</div><div className="demo-stat__label">Years in Rockford</div></div>
          <div><div className="demo-stat__number">15K+</div><div className="demo-stat__label">Cars Repaired</div></div>
          <div><div className="demo-stat__number">4.8</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">12mo</div><div className="demo-stat__label">Warranty on Repairs</div></div>
        </div>
      </div>
    </section>

    {/* Service Menu — categorized like a real auto shop price sheet */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Service Menu</h2>
        <p className="demo-section__subtitle">Transparent pricing on the most common services. All work backed by a 12-month warranty.</p>
        <div className="demo-menu-categories">
          {serviceCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="demo-menu-category__title">{cat.title}</h3>
              {cat.items.map((item) => (
                <div key={item.name} className="demo-menu-category__item">
                  <div className="demo-menu-category__item-info">
                    <h4 className="demo-menu-category__item-name">{item.name}</h4>
                    <p className="demo-menu-category__item-desc">{item.desc}</p>
                    <p className="demo-menu-category__item-desc" style={{ marginTop: "0.2rem", fontWeight: 600, color: "var(--demo-accent)" }}>Est. time: {item.time}</p>
                  </div>
                  <div className="demo-menu-category__item-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Makes We Service — auto repair customers want to know if you can fix their car */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Makes We Service</h2>
        <p className="demo-section__subtitle">Domestic, import, and European. If your make isn't listed, call us — we probably work on it.</p>
        <div className="demo-makes">
          {makes.map((m) => <div key={m} className="demo-make">{m}</div>)}
        </div>
      </div>
    </section>

    {/* Coupons — auto shops always run specials */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Current Specials</h2>
        <p className="demo-section__subtitle">Mention the code when you book. Cannot be combined with other offers.</p>
        <div className="demo-coupons">
          {coupons.map((c) => (
            <div key={c.code} className="demo-coupon">
              <div className="demo-coupon__label">{c.label}</div>
              <div className="demo-coupon__offer">{c.offer}</div>
              <p className="demo-coupon__desc">{c.desc}</p>
              <div className="demo-coupon__code">Code: {c.code}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Customers Say</h2>
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

    {/* Booking Form — auto shops need online booking */}
    <section className="demo-section demo-section--alt" id="book">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Book an Appointment</h2>
        <p className="demo-section__subtitle">Fill out the form and we'll confirm by text or email within 1 business hour.</p>
        <div className="demo-booking-form">
          <div className="demo-form__row">
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="make">Vehicle Make</label>
              <input className="demo-form__input" id="make" type="text" placeholder="e.g. Toyota" />
            </div>
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="model">Vehicle Model</label>
              <input className="demo-form__input" id="model" type="text" placeholder="e.g. Camry" />
            </div>
          </div>
          <div className="demo-form__row">
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="year">Year</label>
              <input className="demo-form__input" id="year" type="text" placeholder="e.g. 2019" />
            </div>
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="service">Service Needed</label>
              <select className="demo-form__select" id="service">
                <option>Oil Change</option>
                <option>Brake Service</option>
                <option>Check Engine Light</option>
                <option>AC / Heating</option>
                <option>Tire Service</option>
                <option>Other (describe below)</option>
              </select>
            </div>
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="name">Your Name</label>
            <input className="demo-form__input" id="name" type="text" placeholder="First and last name" />
          </div>
          <div className="demo-form__row">
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="phone">Phone</label>
              <input className="demo-form__input" id="phone" type="tel" placeholder="(815) 555-0000" />
            </div>
            <div className="demo-form__field">
              <label className="demo-form__label" htmlFor="email">Email</label>
              <input className="demo-form__input" id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="desc">Describe the Problem</label>
            <input className="demo-form__input" id="desc" type="text" placeholder="e.g. Brakes squeaking when stopping" />
          </div>
          <button type="button" className="demo-form__submit">Request Appointment</button>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="demo-contact" style={{ background: "#b35414" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Have Questions?</h2>
        <p className="demo-contact__text">
          Call (815) 555-0321 and talk to a real mechanic. Free estimates on all work, no appointment
          needed for estimates.
        </p>
        <a href="tel:8155550321" className="demo-btn demo-btn--primary">
          <PhoneIcon size={20} /> Call (815) 555-0321
        </a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <MapPinIcon size={20} />
            <span className="demo-contact__info-label">Address</span>
            <span>456 North Ave, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
            <ClockIcon size={20} />
            <span className="demo-contact__info-label">Hours</span>
            <span>Mon–Fri 7AM–6PM, Sat 8AM–2PM</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>service@northsideauto.com</span>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Northside Auto Repair</div>
        <div>456 North Ave, Rockford, IL 61101 · (815) 555-0321</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default AutoRepairDemo;

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
        { name: "Auto Repair Demo", path: pathname },
      ]}
    />
  );
};
