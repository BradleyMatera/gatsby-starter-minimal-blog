import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, FlameIcon, SnowflakeIcon, WindIcon, ClipboardIcon, AlertIcon, GearIcon, ShieldIcon } from "../../site/icons";

const pathname = "/demos/hvac/";
const pageTitle = "ComfortAir Heating & Cooling — Rockford HVAC | Demo Website";
const pageDescription =
  "Demo HVAC company website with emergency service, maintenance plans, financing, and technician bios.";

const services = [
  { Icon: FlameIcon, name: "Furnace Repair & Installation", desc: "Fast, reliable furnace repair for all brands. New high-efficiency furnace installation with free estimates.", price: "Repair from $89" },
  { Icon: SnowflakeIcon, name: "AC Repair & Installation", desc: "Central air repair, replacement, and new installation. We service all major brands and offer financing.", price: "Repair from $89" },
  { Icon: WindIcon, name: "Indoor Air Quality", desc: "Air purifiers, humidifiers, UV lights, and duct cleaning to keep your home's air clean and healthy.", price: "from $299" },
  { Icon: ClipboardIcon, name: "Maintenance Plans", desc: "Annual tune-ups, priority service, 15% repair discount, and no overtime fees. Peace of mind for one low price.", price: "$14.99/month" },
  { Icon: WindIcon, name: "Ductless Mini-Splits", desc: "Zoned heating and cooling without ductwork. Perfect for additions, garages, and older homes.", price: "from $3,200" },
  { Icon: AlertIcon, name: "24/7 Emergency Service", desc: "Heat out in January? AC down in July? We're available 24/7 for emergency repairs across the Rockford area.", price: "Available now" },
];

const team = [
  { initials: "JM", name: "John Martinez", role: "Owner & Master HVAC Tech (20 yrs)" },
  { initials: "KS", name: "Karen Schultz", role: "Service Manager (12 yrs)" },
  { initials: "TB", name: "Tom Brown", role: "Lead Installer (15 yrs)" },
  { initials: "AL", name: "Alex Lee", role: "Service Technician (8 yrs)" },
];

const testimonials = [
  { text: "Our furnace died on the coldest night of the year and John was at our house within an hour. Fixed it in 30 minutes. Lifesavers.", author: "Robert D.", location: "Rockford, IL" },
  { text: "The maintenance plan is worth every penny. They caught a cracked heat exchanger during a tune-up that could have been dangerous.", author: "Maria G.", location: "Loves Park, IL" },
  { text: "Fair pricing, honest advice, and no upselling. They told me my AC just needed a capacitor, not a whole new unit like another company said.", author: "Steve W.", location: "Byron, IL" },
];

const faqs = [
  { q: "How much does a new furnace cost?", a: "A new high-efficiency furnace typically runs $3,500–$6,500 installed, depending on size and efficiency rating. We offer free in-home estimates and financing options with payments as low as $59/month." },
  { q: "Do you offer financing?", a: "Yes. We partner with Synchrony Financial to offer 0% APR for 12 months on qualified purchases, and longer terms with low monthly payments. Apply online or in person." },
  { q: "What does the maintenance plan include?", a: "Two annual tune-ups (heating and cooling), priority same-day service, 15% discount on all repairs, no overtime fees, and a written record of all service for warranty purposes." },
  { q: "What areas do you serve?", a: "Rockford, Loves Park, Machesney Park, Byron, Roscoe, Rockton, South Beloit, Pecatonica, Winnebago, and Freeport. If you're in Northwest Illinois, we can help." },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const HvacDemo: React.FC = () => (
  <DemoLayout demoName="ComfortAir Heating & Cooling" industry="HVAC / Home Services" themeColor="#2980b9">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #1a5276, #0d2b3a)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">24/7 Emergency Service · Rockford's Trusted HVAC Since 2010</span>
        <h1 className="demo-hero__title">ComfortAir Heating &amp; Cooling</h1>
        <p className="demo-hero__subtitle">
          Furnace repair, AC installation, maintenance plans, and indoor air quality for homes and
          businesses across Northwest Illinois. Licensed, bonded, and insured.
        </p>
        <div className="demo-hero__actions">
          <a href="tel:8155550789" className="demo-btn demo-btn--primary">
            <PhoneIcon size={20} /> (815) 555-0789
          </a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    {/* Emergency Banner */}
    <div className="demo-emergency-banner">
      <AlertIcon size={20} />
      Heating or AC emergency? We're available 24/7 · Call (815) 555-0789 now
    </div>

    {/* Stats */}
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

    {/* Services */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Complete heating and cooling services for residential and commercial properties.</p>
        <div className="demo-services">
          {services.map((s) => {
            const { Icon } = s;
            return (
              <div key={s.name} className="demo-service">
                <div className="demo-service__icon"><Icon size={28} /></div>
                <h3 className="demo-service__name">{s.name}</h3>
                <p className="demo-service__desc">{s.desc}</p>
                <div className="demo-service__price">{s.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* About */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div className="demo-about__image" style={{ background: "linear-gradient(135deg, #1a5276, #0d2b3a)" }} />
          <div>
            <h2 className="demo-about__title">Honest HVAC Service. No Games.</h2>
            <p className="demo-about__text">
              ComfortAir was founded in 2010 by John Martinez, a master HVAC technician with 20 years
              of experience. The company was built on one principle: tell the truth, do the job right,
              and charge a fair price.
            </p>
            <p className="demo-about__text">
              We don't push unnecessary replacements. We don't add hidden fees. We diagnose the
              problem, explain your options in plain English, and let you decide. That's why over
              8,000 families in the Rockford area trust us with their heating and cooling.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Team</h2>
        <p className="demo-section__subtitle">Licensed, experienced, and background-checked technicians.</p>
        <div className="demo-team">
          {team.map((m) => (
            <div key={m.name}>
              <div className="demo-team-member__avatar">{m.initials}</div>
              <div className="demo-team-member__name">{m.name}</div>
              <div className="demo-team-member__role">{m.role}</div>
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

    {/* FAQ */}
    <section className="demo-section demo-section--alt">
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
          Call (815) 555-0789 for same-day service or 24/7 emergency repairs. We serve Rockford,
          Loves Park, Machesney Park, Byron, Roscoe, and all of Northwest Illinois.
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
