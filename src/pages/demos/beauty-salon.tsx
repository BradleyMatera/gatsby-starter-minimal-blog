import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";

const pathname = "/demos/beauty-salon/";
const pageTitle = "Bella Vista Salon — Hair & Beauty in Rockford, IL | Demo Website";
const pageDescription =
  "Demo beauty salon website with service menu, stylist team, online booking, and before/after gallery.";

const services = [
  { icon: "✂️", name: "Haircut & Style", desc: "Women's, men's, and children's cuts. Includes wash, cut, and style. Consultation included.", price: "from $35" },
  { icon: "🎨", name: "Color & Highlights", desc: "Full color, partial highlights, balayage, and color correction. Free patch test for new clients.", price: "from $85" },
  { icon: "💅", name: "Manicure & Pedicure", desc: "Classic, gel, and dip powder nails. Luxury spa pedicure with massage and paraffin treatment.", price: "from $30" },
  { icon: "💆", name: "Facials & Skincare", desc: "Customized facials, chemical peels, and microdermabrasion. Free skin consultation.", price: "from $65" },
  { icon: "💄", name: "Makeup & Special Events", desc: "Wedding makeup, prom, photo shoots, and special occasions. Trial run included for weddings.", price: "from $75" },
  { icon: "👰", name: "Bridal Packages", desc: "Hair, makeup, and nails for the bride and bridal party. On-site service available.", price: "from $250" },
];

const stylists = [
  { initials: "AR", name: "Angela Rossi", role: "Owner & Master Stylist (15 yrs)" },
  { initials: "LC", name: "Lisa Chen", role: "Senior Colorist (10 yrs)" },
  { initials: "MK", name: "Maya Kim", role: "Esthetician (6 yrs)" },
  { initials: "TS", name: "Tina Santos", role: "Nail Technician (8 yrs)" },
];

const testimonials = [
  { text: "Angela is a color genius. She fixed a box-dye disaster and my hair has never looked better. I won't go anywhere else.", author: "Rachel B.", location: "Rockford, IL" },
  { text: "Got my wedding hair and makeup done here and it was perfect. The whole bridal party looked amazing. Worth every penny.", author: "Brittany K.", location: "Roscoe, IL" },
  { text: "Best pedicure in Rockford. The spa treatment is so relaxing and Tina does the most beautiful nail art.", author: "Sandra W.", location: "Loves Park, IL" },
];

const BeautySalonDemo: React.FC = () => (
  <DemoLayout demoName="Bella Vista Salon" industry="Beauty Salon" themeColor="#d63384">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #d63384, #6b1235)" }}>
      <div className="demo-hero__inner">
        <div className="demo-hero__tagline">Rockford's Premier Hair & Beauty Salon Since 2014</div>
        <h1 className="demo-hero__title">Bella Vista Salon</h1>
        <p className="demo-hero__subtitle">
          Haircuts, color, nails, facials, and makeup in a relaxing, modern salon in the heart of
          Rockford. Book your appointment online today.
        </p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Online</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">10</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">5,000+</div><div className="demo-stat__label">Happy Clients</div></div>
          <div><div className="demo-stat__number">4.9★</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Expert Stylists</div></div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Full-service hair, beauty, and nail care in a relaxing environment.</p>
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
          <div className="demo-about__image" style={{ background: "linear-gradient(135deg, #d63384, #6b1235)" }}>💇</div>
          <div>
            <h2 className="demo-about__title">Where Beauty Meets Expertise</h2>
            <p className="demo-about__text">
              Bella Vista Salon was founded in 2014 by Angela Rossi, a master stylist with a passion
              for making every client feel beautiful and confident. Our team brings over 40 years of
              combined experience to every appointment.
            </p>
            <p className="demo-about__text">
              We use premium products — Olaplex, Redken, OPI, and Dermalogica — and our salon is
              designed for relaxation. Come in for a transformation, leave feeling like the best
              version of yourself.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Stylists */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Stylists</h2>
        <p className="demo-section__subtitle">Experienced, licensed, and passionate about what they do.</p>
        <div className="demo-team">
          {stylists.map((s) => (
            <div key={s.name}>
              <div className="demo-team-member__avatar">{s.initials}</div>
              <div className="demo-team-member__name">{s.name}</div>
              <div className="demo-team-member__role">{s.role}</div>
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
              <div className="demo-testimonial__stars">★★★★★</div>
              <p className="demo-testimonial__text">"{t.text}"</p>
              <div className="demo-testimonial__author">{t.author}</div>
              <div className="demo-testimonial__location">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Hours */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Hours &amp; Location</h2>
        <div className="demo-about">
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
            <div className="demo-map">
              💇 321 N Main Street, Rockford, IL 61103
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Booking CTA */}
    <section className="demo-contact" id="book" style={{ background: "#d63384" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Book Your Appointment</h2>
        <p className="demo-contact__text">
          Call (815) 555-0987 or book online. New clients get 20% off their first service. Walk-ins
          welcome based on availability.
        </p>
        <a href="tel:8155550987" className="demo-btn demo-btn--primary">Call (815) 555-0987</a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Address</span>
            <span>321 N Main Street, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">New Client Special</span>
            <span>20% off first service</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>hello@bellavistasalon.com</span>
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
