import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";

const pathname = "/demos/restaurant/";
const pageTitle = "Riverside Grill — Rockford's Finest Dining | Demo Website";
const pageDescription =
  "Demo restaurant website for Riverside Grill in Rockford, Illinois. Menu, reservations, hours, reviews, and photo gallery.";

const menuItems = [
  { name: "Wood-Grilled Ribeye", desc: "12oz USDA Choice ribeye with rosemary butter and roasted vegetables", price: "$34" },
  { name: "Seared Salmon", desc: "Atlantic salmon with lemon-dill sauce, wild rice, and asparagus", price: "$26" },
  { name: "Truffle Pasta", desc: "Hand-cut fettuccine with black truffle, parmesan, and cream sauce", price: "$22" },
  { name: "Riverside Burger", desc: "Half-pound Angus beef, aged cheddar, caramelized onions, brioche bun", price: "$16" },
  { name: "Walleye Special", desc: "Fresh Wisconsin walleye, beer-battered, with coleslaw and fries", price: "$24" },
  { name: "Chocolate Lava Cake", desc: "Warm chocolate cake with vanilla bean ice cream and raspberry coulis", price: "$9" },
];

const testimonials = [
  { text: "Best steak in Rockford, hands down. The ribeye was cooked perfectly and the service was outstanding.", author: "Mike R.", location: "Rockford, IL" },
  { text: "We celebrated our anniversary here and it was perfect. The truffle pasta is to die for.", author: "Sarah K.", location: "Loves Park, IL" },
  { text: "Great atmosphere, excellent food, reasonable prices for the quality. Our go-to date night spot.", author: "Tom & Lisa", location: "Roscoe, IL" },
];

const RestaurantDemo: React.FC = () => (
  <DemoLayout demoName="Riverside Grill" industry="Restaurant" themeColor="#c0392b">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #c0392b, #4a0e0a)" }}>
      <div className="demo-hero__inner">
        <div className="demo-hero__tagline">Rockford's Finest Dining Since 2008</div>
        <h1 className="demo-hero__title">Riverside Grill</h1>
        <p className="demo-hero__subtitle">
          Wood-fired steaks, fresh Great Lakes fish, and hand-crafted pasta in the heart of downtown Rockford.
          Join us for dinner Wednesday through Sunday.
        </p>
        <div className="demo-hero__actions">
          <a href="#menu" className="demo-btn demo-btn--primary">View Menu</a>
          <a href="#reserve" className="demo-btn demo-btn--ghost">Make a Reservation</a>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">15+</div><div className="demo-stat__label">Years Serving Rockford</div></div>
          <div><div className="demo-stat__number">4.8★</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">200+</div><div className="demo-stat__label">5-Star Reviews</div></div>
          <div><div className="demo-stat__number">6</div><div className="demo-stat__label">Days a Week</div></div>
        </div>
      </div>
    </section>

    {/* Menu */}
    <section className="demo-section demo-section--alt" id="menu">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Menu</h2>
        <p className="demo-section__subtitle">A selection of our most popular dishes. Full menu available in the restaurant.</p>
        <div className="demo-menu">
          {menuItems.map((item) => (
            <div key={item.name} className="demo-menu-item">
              <div className="demo-menu-item__image">🍽️</div>
              <div>
                <h3 className="demo-menu-item__name">{item.name}</h3>
                <p className="demo-menu-item__desc">{item.desc}</p>
                <div className="demo-menu-item__price">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div className="demo-about__image">🍴</div>
          <div>
            <h2 className="demo-about__title">A Rockford Original</h2>
            <p className="demo-about__text">
              Riverside Grill opened in 2008 with a simple idea: serve great food made with local
              ingredients in a warm, welcoming atmosphere. Fifteen years later, we're still doing
              exactly that.
            </p>
            <p className="demo-about__text">
              Our chef sources produce from Illinois farms, fish from the Great Lakes, and beef from
              Midwest ranches. Everything is made from scratch in our kitchen — no freezers, no
              shortcuts, no compromises.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Guests Say</h2>
        <p className="demo-section__subtitle">Real reviews from real diners across the Rockford area.</p>
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

    {/* Hours & Location */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div>
            <h2 className="demo-about__title">Hours &amp; Location</h2>
            <table className="demo-hours">
              <tbody>
                <tr><th>Monday</th><td>Closed</td></tr>
                <tr><th>Tuesday</th><td>Closed</td></tr>
                <tr><th>Wednesday</th><td>4:00 PM – 10:00 PM</td></tr>
                <tr><th>Thursday</th><td>4:00 PM – 10:00 PM</td></tr>
                <tr><th>Friday</th><td>4:00 PM – 11:00 PM</td></tr>
                <tr><th>Saturday</th><td>3:00 PM – 11:00 PM</td></tr>
                <tr><th>Sunday</th><td>3:00 PM – 9:00 PM</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="demo-map">
              📍 123 Main Street, Rockford, IL 61101
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Reservation CTA */}
    <section className="demo-contact" id="reserve" style={{ background: "#c0392b" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Make a Reservation</h2>
        <p className="demo-contact__text">
          Call us at (815) 555-0123 or fill out our online form. Walk-ins welcome but reservations
          are recommended for Friday and Saturday evenings.
        </p>
        <a href="tel:8155550123" className="demo-btn demo-btn--primary">Call (815) 555-0123</a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Address</span>
            <span>123 Main Street, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Phone</span>
            <span>(815) 555-0123</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>info@riversidegrill.com</span>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Riverside Grill</div>
        <div>123 Main Street, Rockford, IL 61101 · (815) 555-0123</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default RestaurantDemo;

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
        { name: "Restaurant Demo", path: pathname },
      ]}
    />
  );
};
