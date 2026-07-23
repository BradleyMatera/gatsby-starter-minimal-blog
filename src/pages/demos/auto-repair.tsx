import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";

const pathname = "/demos/auto-repair/";
const pageTitle = "Northside Auto Repair — Rockford Mechanic | Demo Website";
const pageDescription =
  "Demo auto repair shop website with service menu, online booking, tire lookup, and ASE-certified mechanic credentials.";

const services = [
  { icon: "🛢️", name: "Oil Change & Fluid Service", desc: "Conventional, synthetic blend, and full synthetic oil changes with 21-point inspection. Most services done in 30 minutes.", price: "from $39" },
  { icon: "🛞", name: "Tire Sales & Installation", desc: "All major brands. Mount, balance, rotate, and alignment. Free tire pressure checks and flat repairs.", price: "from $120" },
  { icon: "🔧", name: "Brake Service", desc: "Brake pads, rotors, calipers, and fluid flush. Free brake inspection. Same-day service on most vehicles.", price: "from $179" },
  { icon: "⚡", name: "Engine Diagnostics", desc: "Check engine light on? Our OBD-II scanners and 25 years of experience find the real problem, fast.", price: "from $89" },
  { icon: "🔄", name: "Transmission Service", desc: "Fluid flush, filter replacement, and minor repairs. We service automatic and manual transmissions.", price: "from $149" },
  { icon: "❄️", name: "AC & Heating Repair", desc: "Recharge, leak detection, compressor replacement, and heater core service. Stay comfortable year-round.", price: "from $99" },
];

const testimonials = [
  { text: "Honest mechanics who don't upsell. They showed me the worn brake pads and explained exactly what needed fixing. No pressure, no games.", author: "Chris P.", location: "Rockford, IL" },
  { text: "Took my Honda here after the dealer quoted $1,200 for a repair. Northside did it for $450 and it's been perfect for 20,000 miles.", author: "Amanda J.", location: "Loves Park, IL" },
  { text: "Quick oil change, fair price, and they found a leaking coolant hose I didn't even know about. Fixed it same day. Great shop.", author: "Kevin R.", location: "Machesney Park, IL" },
];

const faqs = [
  { q: "Do you work on all vehicle makes and models?", a: "Yes. We service domestic (Ford, Chevy, Dodge), imports (Toyota, Honda, Nissan, Subaru), and European (BMW, VW, Audi) vehicles. Our technicians stay current on all major platforms." },
  { q: "Do you offer a warranty on repairs?", a: "All repairs come with a 12-month/12,000-mile warranty on parts and labor. If something we fixed breaks again within that period, we fix it free." },
  { q: "Can I book an appointment online?", a: "Yes! Use our online booking form or call (815) 555-0321. We'll confirm your appointment by text or email within 1 business hour." },
  { q: "Do you provide free estimates?", a: "Yes, estimates are always free. Drop by or call with your vehicle's year, make, model, and a description of the issue. We'll give you a written estimate before any work begins." },
];

const AutoRepairDemo: React.FC = () => (
  <DemoLayout demoName="Northside Auto Repair" industry="Auto Repair" themeColor="#e67e22">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #e67e22, #8b4513)" }}>
      <div className="demo-hero__inner">
        <div className="demo-hero__tagline">ASE Certified · Serving Rockford Since 2008</div>
        <h1 className="demo-hero__title">Northside Auto Repair</h1>
        <p className="demo-hero__subtitle">
          Honest, reliable auto repair for all makes and models. Oil changes, brakes, tires,
          diagnostics, and major repairs — all backed by a 12-month warranty.
        </p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Appointment</a>
          <a href="tel:8155550321" className="demo-btn demo-btn--ghost">📞 (815) 555-0321</a>
        </div>
      </div>
    </section>

    {/* Trust Badges */}
    <section style={{ background: "#f9f9f9", padding: "1.5rem 1.5rem", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", fontSize: "0.875rem", fontWeight: 600, color: "#666" }}>
        <span>✅ ASE Certified</span>
        <span>✅ BBB A+ Rated</span>
        <span>✅ 12-Month Warranty</span>
        <span>✅ Free Estimates</span>
        <span>✅ All Makes & Models</span>
      </div>
    </section>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">16</div><div className="demo-stat__label">Years in Rockford</div></div>
          <div><div className="demo-stat__number">15K+</div><div className="demo-stat__label">Cars Repaired</div></div>
          <div><div className="demo-stat__number">4.8★</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">12mo</div><div className="demo-stat__label">Warranty on Repairs</div></div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Full-service auto repair for domestic, import, and European vehicles.</p>
        <div className="demo-services">
          {services.map((s) => (
            <div key={s.name} className="demo-service">
              <div className="demo-service__icon">{s.icon}</div>
              <h3 className="demo-service__name">{s.name}</h3>
              <p className="demo-service__desc">{s.desc}</p>
              <div className="demo-service__price">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div className="demo-about__image" style={{ background: "linear-gradient(135deg, #e67e22, #8b4513)" }}>🚗</div>
          <div>
            <h2 className="demo-about__title">The Shop That Tells You the Truth</h2>
            <p className="demo-about__text">
              Northside Auto Repair opened in 2008 with a simple promise: diagnose honestly, fix it
              right, and charge a fair price. No mystery fees, no unnecessary repairs, no pressure.
            </p>
            <p className="demo-about__text">
              Our technicians are ASE certified and we invest in the latest diagnostic equipment. But
              the most important tool in our shop is honesty. We'll show you the worn part, explain
              why it failed, and tell you whether it needs fixing now or can wait. You decide.
            </p>
          </div>
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
              <div className="demo-testimonial__stars">★★★★★</div>
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

    {/* Booking CTA */}
    <section className="demo-contact" id="book" style={{ background: "#e67e22" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Book Your Appointment</h2>
        <p className="demo-contact__text">
          Call (815) 555-0321 or use our online booking form. Same-day service available for most
          repairs. Free estimates on all work.
        </p>
        <a href="tel:8155550321" className="demo-btn demo-btn--primary">Call (815) 555-0321</a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Address</span>
            <span>456 North Ave, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
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
