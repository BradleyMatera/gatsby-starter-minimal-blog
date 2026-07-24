import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, FlameIcon, SnowflakeIcon, WindIcon, AlertIcon, ShieldIcon, CheckIcon, XIcon, ClockIcon } from "../../site/icons";

const pathname = "/demos/hvac/";
const pageTitle = "ComfortAir Heating & Cooling — Rockford HVAC | Demo Website";
const pageDescription =
  "Demo HVAC company website with emergency service, maintenance plans, financing, and technician bios.";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    period: "/month",
    features: [
      { text: "1 annual tune-up", included: true },
      { text: "10% repair discount", included: true },
      { text: "Priority scheduling", included: true },
      { text: "No overtime fees", included: false },
      { text: "Free diagnostic with repair", included: false },
      { text: "Transferable warranty", included: false },
    ],
  },
  {
    name: "Comfort",
    price: "$14.99",
    period: "/month",
    featured: true,
    features: [
      { text: "2 annual tune-ups (heat + AC)", included: true },
      { text: "15% repair discount", included: true },
      { text: "Priority same-day service", included: true },
      { text: "No overtime fees", included: true },
      { text: "Free diagnostic with repair", included: true },
      { text: "Transferable warranty", included: false },
    ],
  },
  {
    name: "Total Comfort",
    price: "$24.99",
    period: "/month",
    features: [
      { text: "2 annual tune-ups + plumbing check", included: true },
      { text: "20% repair discount", included: true },
      { text: "Guaranteed 2-hour response", included: true },
      { text: "No overtime fees ever", included: true },
      { text: "Free diagnostic, even if no repair", included: true },
      { text: "Transferable to new owner", included: true },
    ],
  },
];

const brands = ["Carrier", "Trane", "Lennox", "Goodman", "Rheem", "York", "American Standard", "Amana", "Bryant", "Ruud", "Heil", "Tempstar"];

const coupons = [
  { label: "New Customer Special", offer: "$59 Tune-Up", desc: "Full heating or AC tune-up. 21-point inspection. New customers only.", code: "TUNE59" },
  { label: "Furnace Season", offer: "$200 OFF", desc: "New high-efficiency furnace installation. Includes free thermostat.", code: "FURNACE200" },
  { label: "AC Season", offer: "FREE Diagnostic", desc: "We waive the $89 diagnostic fee if you approve the repair.", code: "FREEDIAG" },
];

const faqs = [
  { q: "How much does a new furnace cost?", a: "A new high-efficiency furnace typically runs $3,500–$6,500 installed, depending on size and efficiency rating. We offer free in-home estimates and financing options with payments as low as $59/month." },
  { q: "Do you offer financing?", a: "Yes. We partner with Synchrony Financial to offer 0% APR for 12 months on qualified purchases, and longer terms with low monthly payments. Apply online or in person — most decisions are instant." },
  { q: "What does the maintenance plan include?", a: "Two annual tune-ups (heating and cooling), priority same-day service, 15% discount on all repairs, no overtime fees, and a written record of all service for warranty purposes." },
  { q: "What areas do you serve?", a: "Rockford, Loves Park, Machesney Park, Byron, Roscoe, Rockton, South Beloit, Pecatonica, Winnebago, and Freeport. If you're in Northwest Illinois, we can help." },
];

const testimonials = [
  { text: "Our furnace died on the coldest night of the year and John was at our house within an hour. Fixed it in 30 minutes. Lifesavers.", author: "Robert D.", location: "Rockford, IL" },
  { text: "The maintenance plan is worth every penny. They caught a cracked heat exchanger during a tune-up that could have been dangerous.", author: "Maria G.", location: "Loves Park, IL" },
  { text: "Fair pricing, honest advice, and no upselling. They told me my AC just needed a capacitor, not a whole new unit like another company said.", author: "Steve W.", location: "Byron, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const HvacDemo: React.FC = () => (
  <DemoLayout demoName="ComfortAir Heating & Cooling" industry="HVAC / Home Services" themeColor="#2980b9">
    {/* Hero — emergency service is THE priority for HVAC */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #1a5276, #0d2b3a)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">24/7 Emergency Service · Licensed & Insured</span>
        <h1 className="demo-hero__title">ComfortAir Heating &amp; Cooling</h1>
        <p className="demo-hero__subtitle">
          Furnace out in January? AC down in July? We're available 24/7. Same-day service across
          Rockford and Northwest Illinois since 2010.
        </p>
        <div className="demo-hero__actions">
          <a href="tel:8155550789" className="demo-btn demo-btn--primary">
            <PhoneIcon size={20} /> Call (815) 555-0789
          </a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    {/* Emergency Banner — HVAC sites always have this */}
    <div className="demo-emergency-banner">
      <AlertIcon size={20} />
      Heating or AC emergency? We're available 24/7 · Call (815) 555-0789 now
    </div>

    {/* Service icons row — quick visual of what they do */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">14</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">8,000+</div><div className="demo-stat__label">Service Calls</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">24/7</div><div className="demo-stat__label">Emergency Service</div></div>
        </div>
      </div>
    </section>

    {/* Services — HVAC services are simpler, 4 main categories */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What We Do</h2>
        <p className="demo-section__subtitle">Complete heating, cooling, and indoor air quality services for residential and commercial.</p>
        <div className="demo-services">
          <div className="demo-service">
            <div className="demo-service__icon"><FlameIcon size={28} /></div>
            <h3 className="demo-service__name">Heating</h3>
            <p className="demo-service__desc">Furnace repair, installation, and maintenance for all brands. Heat pumps and boilers too.</p>
            <div className="demo-service__price">Repair from $89</div>
          </div>
          <div className="demo-service">
            <div className="demo-service__icon"><SnowflakeIcon size={28} /></div>
            <h3 className="demo-service__name">Cooling</h3>
            <p className="demo-service__desc">Central AC repair, replacement, and new installation. Ductless mini-splits for additions.</p>
            <div className="demo-service__price">Repair from $89</div>
          </div>
          <div className="demo-service">
            <div className="demo-service__icon"><WindIcon size={28} /></div>
            <h3 className="demo-service__name">Indoor Air Quality</h3>
            <p className="demo-service__desc">Air purifiers, humidifiers, UV lights, and duct cleaning for healthier home air.</p>
            <div className="demo-service__price">from $299</div>
          </div>
          <div className="demo-service">
            <div className="demo-service__icon"><AlertIcon size={28} /></div>
            <h3 className="demo-service__name">24/7 Emergency</h3>
            <p className="demo-service__desc">Available nights, weekends, and holidays. No answering service — you talk to a real tech.</p>
            <div className="demo-service__price">Call anytime</div>
          </div>
        </div>
      </div>
    </section>

    {/* Maintenance Plans — HVAC companies live on maintenance plans */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Maintenance Plans</h2>
        <p className="demo-section__subtitle">Protect your equipment, skip the overtime fees, and get priority service. Cancel anytime.</p>
        <div className="demo-plans">
          {plans.map((plan) => (
            <div key={plan.name} className={`demo-plan ${plan.featured ? "demo-plan--featured" : ""}`}>
              <h3 className="demo-plan__name">{plan.name}</h3>
              <div className="demo-plan__price">{plan.price}<span className="demo-plan__price-period">{plan.period}</span></div>
              <ul className="demo-plan__features">
                {plan.features.map((f) => (
                  <li key={f.text} style={f.included ? {} : { color: "var(--demo-text-muted)", opacity: 0.5 }}>
                    {f.included ? <CheckIcon size={16} /> : <XIcon size={16} />}
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Coupons — HVAC companies always run seasonal specials */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Current Specials</h2>
        <p className="demo-section__subtitle">Mention these codes when you call. Limited time offers.</p>
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

    {/* Brands We Service — HVAC customers want to know if you can fix their unit */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Brands We Service</h2>
        <p className="demo-section__subtitle">We repair and install all major brands. If yours isn't listed, call us — we can probably help.</p>
        <div className="demo-brands">
          {brands.map((b) => <div key={b} className="demo-brand">{b}</div>)}
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section demo-section--alt">
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

    {/* FAQ */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Frequently Asked Questions</h2>
        <div className="demo-faq">
          {faqs.map((f) => (
            <div key={f.q} className="demo-faq__item">
              <h3 className="demo-faq__question">{f.q}</h3>
              <p className="demo-faq__answer">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="demo-contact" style={{ background: "#1a5276" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Need Service Today?</h2>
        <p className="demo-contact__text">
          Call (815) 555-0789 for same-day service or 24/7 emergency repairs. No answering service —
          you talk to a real technician.
        </p>
        <a href="tel:8155550789" className="demo-btn demo-btn--primary">
          <PhoneIcon size={20} /> Call (815) 555-0789
        </a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <ShieldIcon size={20} />
            <span className="demo-contact__info-label">License</span>
            <span>IL #058-204993</span>
          </div>
          <div className="demo-contact__info-item">
            <ClockIcon size={20} />
            <span className="demo-contact__info-label">Hours</span>
            <span>24/7 Emergency</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>service@comfortair.com</span>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">ComfortAir Heating & Cooling</div>
        <div>Rockford, IL · (815) 555-0789 · IL License #058-204993</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default HvacDemo;

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
        { name: "HVAC Demo", path: pathname },
      ]}
    />
  );
};
