import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, UtensilsIcon, ClockIcon, RingIcon, ClipboardIcon } from "../../site/icons";

const pathname = "/demos/restaurant/";
const pageTitle = "Riverside Grill — Rockford's Finest Dining | Demo Website";
const pageDescription =
  "Demo restaurant website for Riverside Grill in Rockford, Illinois. Menu, reservations, hours, reviews, and photo gallery.";

const menuCategories = [
  {
    title: "Starters",
    items: [
      { name: "Seared Scallops", desc: "Pan-seared sea scallops, cauliflower puree, brown butter", price: "$16" },
      { name: "Charcuterie Board", desc: "Cured meats, artisan cheeses, olives, house jam, crostini", price: "$22" },
      { name: "French Onion Soup", desc: "Slow-simmered beef broth, caramelized onions, gruyere crouton", price: "$11" },
    ],
  },
  {
    title: "From the Grill",
    items: [
      { name: "Wood-Grilled Ribeye", desc: "12oz USDA Choice ribeye, rosemary butter, roasted vegetables", price: "$34" },
      { name: "Filet Mignon", desc: "8oz tenderloin, red wine reduction, truffle mashed potatoes", price: "$42" },
      { name: "Pork Chop", desc: "Bone-in chop, apple chutney, Brussels sprouts, bacon jam", price: "$28" },
    ],
  },
  {
    title: "From the Lake",
    items: [
      { name: "Seared Salmon", desc: "Atlantic salmon, lemon-dill sauce, wild rice, asparagus", price: "$26" },
      { name: "Walleye Special", desc: "Fresh Wisconsin walleye, beer-battered, coleslaw, fries", price: "$24" },
      { name: "Trout Almondine", desc: "Rainbow trout, brown butter almonds, capers, parsley", price: "$27" },
    ],
  },
  {
    title: "Pasta",
    items: [
      { name: "Truffle Fettuccine", desc: "Hand-cut fettuccine, black truffle, parmesan, cream sauce", price: "$22" },
      { name: "Lobster Ravioli", desc: "House-made ravioli, lobster, vodka cream, fresh basil", price: "$29" },
      { name: "Wild Mushroom Linguine", desc: "Mixed wild mushrooms, garlic, white wine, parmesan", price: "$19" },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Chocolate Lava Cake", desc: "Warm chocolate cake, vanilla bean ice cream, raspberry coulis", price: "$9" },
      { name: "Crème Brûlée", desc: "Classic vanilla custard, caramelized sugar crust", price: "$8" },
      { name: "Seasonal Tart", desc: "Ask your server for today's selection", price: "$10" },
    ],
  },
  {
    title: "Burgers & Sandwiches",
    items: [
      { name: "Riverside Burger", desc: "Half-pound Angus beef, aged cheddar, caramelized onions, brioche", price: "$16" },
      { name: "Walleye Sandwich", desc: "Beer-battered walleye, tartar sauce, lettuce, tomato", price: "$15" },
      { name: "French Dip", desc: "Shaved prime rib, provolone, au jus, horseradish cream", price: "$17" },
    ],
  },
];

const wineSelection = [
  { name: "Cabernet Sauvignon", origin: "Napa Valley, CA", price: "$12 / $48" },
  { name: "Pinot Noir", origin: "Willamette Valley, OR", price: "$11 / $44" },
  { name: "Chardonnay", origin: "Sonoma Coast, CA", price: "$10 / $40" },
  { name: "Sauvignon Blanc", origin: "Marlborough, NZ", price: "$9 / $36" },
  { name: "Malbec", origin: "Mendoza, AR", price: "$10 / $38" },
  { name: "Prosecco", origin: "Veneto, IT", price: "$8 / $32" },
];

const testimonials = [
  { text: "Best steak in Rockford, hands down. The ribeye was cooked perfectly and the service was outstanding.", author: "Mike R.", location: "Rockford, IL" },
  { text: "We celebrated our anniversary here and it was perfect. The truffle pasta is to die for.", author: "Sarah K.", location: "Loves Park, IL" },
  { text: "Great atmosphere, excellent food, reasonable prices for the quality. Our go-to date night spot.", author: "Tom & Lisa", location: "Roscoe, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const RestaurantDemo: React.FC = () => (
  <DemoLayout demoName="Riverside Grill" industry="Restaurant" themeColor="#c0392b">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #8b1a12, #2a0a08)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Rockford's Finest Dining Since 2008</span>
        <h1 className="demo-hero__title">Riverside Grill</h1>
        <p className="demo-hero__subtitle">
          Wood-fired steaks, fresh Great Lakes fish, and hand-crafted pasta in the heart of downtown Rockford.
        </p>
        <div className="demo-hero__actions">
          <a href="#menu" className="demo-btn demo-btn--primary">
            <UtensilsIcon size={20} /> View Menu
          </a>
          <a href="#reserve" className="demo-btn demo-btn--ghost">Reserve a Table</a>
        </div>
      </div>
    </section>

    {/* Hours strip — restaurants need hours front and center */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        <span className="demo-trust-badge"><ClockIcon size={18} /> Wed–Thu 4–10 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Fri 4–11 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Sat 3–11 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Sun 3–9 PM</span>
        <span className="demo-trust-badge"><MapPinIcon size={18} /> 123 Main St, Rockford</span>
      </div>
    </div>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">15+</div><div className="demo-stat__label">Years Serving Rockford</div></div>
          <div><div className="demo-stat__number">4.8</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">200+</div><div className="demo-stat__label">5-Star Reviews</div></div>
          <div><div className="demo-stat__number">6</div><div className="demo-stat__label">Days a Week</div></div>
        </div>
      </div>
    </section>

    {/* Menu — categorized like a real restaurant menu, not a generic grid */}
    <section className="demo-section demo-section--alt" id="menu">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Menu</h2>
        <p className="demo-section__subtitle">Everything is made from scratch in our kitchen. No freezers, no shortcuts.</p>
        <div className="demo-menu-categories">
          {menuCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="demo-menu-category__title">{cat.title}</h3>
              {cat.items.map((item) => (
                <div key={item.name} className="demo-menu-category__item">
                  <div className="demo-menu-category__item-info">
                    <h4 className="demo-menu-category__item-name">{item.name}</h4>
                    <p className="demo-menu-category__item-desc">{item.desc}</p>
                  </div>
                  <div className="demo-menu-category__item-price">{item.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Chef Spotlight — restaurants have chefs, not "teams" */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-chef">
          <div className="demo-chef__photo" />
          <div>
            <h2 className="demo-chef__name">Marcus Lindqvist</h2>
            <p className="demo-chef__title">Executive Chef &amp; Owner</p>
            <p className="demo-chef__bio">
              Marcus grew up in Rockford and trained at the Culinary Institute of America in Hyde Park.
              After a decade cooking in Chicago restaurants — including two Michelin-starred kitchens —
              he came home to open Riverside Grill in 2008.
            </p>
            <p className="demo-chef__bio">
              His philosophy is simple: source locally, cook from scratch, and let the ingredients speak.
              He works directly with Illinois farmers, Great Lakes fisheries, and Midwest ranches to bring
              the best possible food to your table.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Wine Selection — restaurants have wine lists, not "service grids" */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">From the Cellar</h2>
        <p className="demo-section__subtitle">A curated selection of wines by the glass and bottle. Ask your server for the full list.</p>
        <div className="demo-wine-list">
          <h3 className="demo-wine-list__title">By the Glass / Bottle</h3>
          {wineSelection.map((w) => (
            <div key={w.name} className="demo-wine-list__item">
              <div>
                <div className="demo-wine-list__item-name">{w.name}</div>
                <div className="demo-wine-list__item-origin">{w.origin}</div>
              </div>
              <div className="demo-wine-list__item-price">{w.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Private Events — restaurants host events */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Private Events</h2>
        <p className="demo-section__subtitle">Host your next celebration with us. Private dining and semi-private spaces available.</p>
        <div className="demo-events">
          <div className="demo-event-card">
            <div className="demo-event-card__icon"><RingIcon size={24} /></div>
            <h3 className="demo-event-card__title">Rehearsal Dinners</h3>
            <p className="demo-event-card__desc">Custom prefix or full menu. Private dining room with dedicated server.</p>
            <div className="demo-event-card__capacity">Up to 30 guests</div>
          </div>
          <div className="demo-event-card">
            <div className="demo-event-card__icon"><UtensilsIcon size={24} /></div>
            <h3 className="demo-event-card__title">Corporate Dinners</h3>
            <p className="demo-event-card__desc">Impress clients or celebrate team milestones. Set menus or a la carte.</p>
            <div className="demo-event-card__capacity">Up to 50 guests</div>
          </div>
          <div className="demo-event-card">
            <div className="demo-event-card__icon"><ClipboardIcon size={24} /></div>
            <h3 className="demo-event-card__title">Holiday Parties</h3>
            <p className="demo-event-card__desc">Book early for November and December. Full venue buyout available.</p>
            <div className="demo-event-card__capacity">Up to 120 guests</div>
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
              <StarRating />
              <p className="demo-testimonial__text">"{t.text}"</p>
              <div className="demo-testimonial__author">{t.author}</div>
              <div className="demo-testimonial__location">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Reservation CTA */}
    <section className="demo-contact" id="reserve" style={{ background: "#8b1a12" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Make a Reservation</h2>
        <p className="demo-contact__text">
          Call us at (815) 555-0123 or fill out our online form. Walk-ins welcome but reservations
          are recommended for Friday and Saturday evenings.
        </p>
        <a href="tel:8155550123" className="demo-btn demo-btn--primary">
          <PhoneIcon size={20} /> Call (815) 555-0123
        </a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <MapPinIcon size={20} />
            <span className="demo-contact__info-label">Address</span>
            <span>123 Main Street, Rockford, IL</span>
          </div>
          <div className="demo-contact__info-item">
            <PhoneIcon size={20} />
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
