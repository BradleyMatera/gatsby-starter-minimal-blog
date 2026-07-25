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
import { StarIcon, MapPinIcon, PhoneIcon, UtensilsIcon, ClockIcon, RingIcon, ClipboardIcon, InstagramIcon } from "../../site/icons";

const pathname = "/demos/restaurant/";
const pageTitle = "Riverside Grill — Modern Midwestern Live-Fire Dining | Demo Website";
const pageDescription = "Demo restaurant website for a fictional modern Midwestern live-fire restaurant overlooking the Rock River. Seasonal menu, chef story, and reservations. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "OpenTable Reservation Widget", category: "Reservations", description: "Real-time table availability and booking. Customers reserve online without calling. Syncs with your POS and table management system.", freeTier: "$1 per cover (diner seated). No monthly fee.", url: "https://opentable.com/restaurant", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map showing your restaurant location with directions. Customers tap to navigate.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Pulls live Google reviews and star rating directly onto your site. Auto-updates when new reviews come in.", freeTier: "$200/month API credit (≈28k requests). Pay-as-you-go after.", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Yelp Fusion API", category: "Reviews & Ratings", description: "Displays Yelp reviews and rating on your site. Links to your Yelp profile for more reviews.", freeTier: "500 API calls/day (free). No credit card required.", url: "https://docs.developer.yelp.com/", status: "mocked" },
  { name: "DoorDash / Grubhub / Uber Eats", category: "Online Ordering", description: "Direct ordering links to delivery platforms. Customers order takeout or delivery without leaving the platform they already use.", freeTier: "Free to list. 15-30% commission per order.", url: "https://doordash.com/merchants", status: "live" },
  { name: "Instagram Graph API", category: "Social Media", description: "Auto-displays your latest Instagram posts as a photo gallery on your site. Perfect for food photos.", freeTier: "200 requests/hour (free). Requires Facebook Business account.", url: "https://developers.facebook.com/docs/instagram-api", status: "mocked" },
  { name: "Square POS Integration", category: "Point of Sale", description: "Syncs online orders and gift card sales with your in-restaurant POS. Unified reporting and inventory.", freeTier: "2.6% + 10¢ per transaction. No monthly fee.", url: "https://square.com/pos", status: "available" },
  { name: "Toast Restaurant POS", category: "Point of Sale", description: "Restaurant-specific POS with online ordering, loyalty program, and gift cards built in. Integrates with your website.", freeTier: "From $69/month hardware + 2.49% + 15¢ per transaction.", url: "https://pos.toasttab.com", status: "available" },
];

const menuCategories = [
  { title: "Starters", items: [
    { name: "Seared Scallops", desc: "Pan-seared sea scallops, cauliflower puree, brown butter", price: "$16", img: "seafood" },
    { name: "Charcuterie Board", desc: "Cured meats, artisan cheeses, olives, house jam, crostini", price: "$22", img: "salad" },
    { name: "French Onion Soup", desc: "Slow-simmered beef broth, caramelized onions, gruyere crouton", price: "$11", img: "soup" },
  ]},
  { title: "From the Fire", items: [
    { name: "Wood-Grilled Ribeye", desc: "12oz USDA Choice ribeye, rosemary butter, roasted vegetables", price: "$34", img: "steak" },
    { name: "Filet Mignon", desc: "8oz tenderloin, red wine reduction, truffle mashed potatoes", price: "$42", img: "food-4" },
    { name: "Bone-In Pork Chop", desc: "Bone-in chop, apple chutney, Brussels sprouts, bacon jam", price: "$28", img: "food-5" },
  ]},
  { title: "From the Lake", items: [
    { name: "Seared Salmon", desc: "Great Lakes coho salmon, lemon-dill sauce, wild rice, asparagus", price: "$26", img: "food-6" },
    { name: "Wisconsin Walleye", desc: "Fresh walleye, beer batter, coleslaw, house-cut fries", price: "$24", img: "food-2" },
    { name: "Trout Almondine", desc: "Rainbow trout, brown butter almonds, capers, parsley", price: "$27", img: "food-3" },
  ]},
  { title: "Pasta", items: [
    { name: "Truffle Fettuccine", desc: "Hand-cut fettuccine, black truffle, parmesan, cream sauce", price: "$22", img: "pasta" },
    { name: "Lobster Ravioli", desc: "House-made ravioli, lobster, vodka cream, fresh basil", price: "$29", img: "food-1" },
    { name: "Wild Mushroom Linguine", desc: "Mixed wild mushrooms, garlic, white wine, parmesan", price: "$19", img: "food-3" },
  ]},
  { title: "Desserts", items: [
    { name: "Chocolate Lava Cake", desc: "Warm chocolate cake, vanilla bean ice cream, raspberry coulis", price: "$9", img: "dessert" },
    { name: "Crème Brûlée", desc: "Classic vanilla custard, caramelized sugar crust", price: "$8", img: "dessert" },
    { name: "Seasonal Tart", desc: "Ask your server for today's selection", price: "$10", img: "dessert" },
  ]},
];

const wineSelection = [
  { name: "Cabernet Sauvignon", origin: "Napa Valley, CA", price: "$12 / $48" },
  { name: "Pinot Noir", origin: "Willamette Valley, OR", price: "$11 / $44" },
  { name: "Chardonnay", origin: "Sonoma Coast, CA", price: "$10 / $40" },
  { name: "Sauvignon Blanc", origin: "Marlborough, NZ", price: "$9 / $36" },
  { name: "Malbec", origin: "Mendoza, AR", price: "$10 / $38" },
  { name: "Prosecco", origin: "Veneto, IT", price: "$8 / $32" },
];

const team = [
  { name: "Marcus Lindqvist", role: "Owner & Executive Chef", bio: "Fictional profile for demo purposes. CIA graduate, 15+ years in live-fire and Michelin-starred kitchens. Born and raised in Rockford.", img: "owner" },
  { name: "Sofia Antonelli", role: "Head Chef", bio: "Fictional profile for demo purposes. Trained in Bologna. Specializes in house-made pasta and regional Italian cuisine.", img: "head-chef" },
  { name: "James O'Brien", role: "Sous Chef", bio: "Fictional profile for demo purposes. Manages daily specials and the wood-fired grill station.", img: "sous-chef" },
  { name: "Rachel Chen", role: "General Manager", bio: "Fictional profile for demo purposes. Wine specialist with sommelier certification. Oversees front-of-house and private events.", img: "manager" },
  { name: "Diego Ramirez", role: "Bar Manager", bio: "Fictional profile for demo purposes. Craft cocktail expert. Curates seasonal drink menus and local beer selection.", img: "bartender" },
  { name: "Aisha Williams", role: "Lead Server", bio: "Fictional profile for demo purposes. 10 years in fine dining. Known for remembering regulars' favorite orders.", img: "server" },
];

const faqs: FAQItem[] = [
  { q: "Do I need a reservation?", a: "Reservations are recommended for dinner, especially on weekends. You can use the illustrative reservation widget below or call (815) 555-0123. Walk-ins are welcome at the bar and patio, subject to availability." },
  { q: "What are your hours?", a: "Riverside Grill is open Tuesday through Thursday from 4:00 PM to 10:00 PM, Friday from 4:00 PM to 11:00 PM, Saturday from 12:00 PM to 11:00 PM, and Sunday from 12:00 PM to 9:00 PM. We are closed on Mondays." },
  { q: "Do you offer vegetarian and vegan options?", a: "Yes. Our menu includes vegetarian and vegan options, and our chef can modify many dishes to accommodate dietary restrictions. Just ask your server." },
  { q: "Is parking available?", a: "Free parking is available in the lot behind the restaurant and along Main Street. Valet parking is offered on Friday and Saturday evenings starting at 5:00 PM for $5." },
  { q: "Do you do private events or large parties?", a: "Yes. We host private events for groups of 8 to 50 in our private dining room. Custom menus are available. Contact us at (815) 555-0123 to discuss your event." },
  { q: "Can I order takeout or delivery?", a: "Takeout is available by calling ahead. We also partner with third-party delivery services. Links are available on our ordering page." },
];

const testimonials = [
  { text: "Best steak in Rockford, hands down. The ribeye was cooked perfectly and the service was outstanding.", author: "Mike R.", location: "Illustrative review, Rockford, IL" },
  { text: "We celebrated our anniversary here and it was perfect. The truffle pasta is to die for.", author: "Sarah K.", location: "Illustrative review, Loves Park, IL" },
  { text: "Great atmosphere, excellent food, reasonable prices for the quality. Our go-to date night spot.", author: "Tom & Lisa", location: "Illustrative review, Roscoe, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const RestaurantDemo: React.FC = () => (
  <DemoLayout demoName="Riverside Grill" industry="Restaurant" themeColor="#c9a227" designSystem="elegant">
    {/* Hero with real restaurant interior photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/restaurant/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Live-fire Midwestern cooking on the Rock River</span>
        <h1 className="demo-hero__title">Riverside Grill</h1>
        <p className="demo-hero__subtitle">A modern Midwestern restaurant where hardwood fire, Great Lakes fish, and local farms meet. Dinner, drinks, and private events in downtown Rockford.</p>
        <div className="demo-hero__actions">
          <a href="#menu" className="demo-btn demo-btn--primary"><UtensilsIcon size={20} /> View Menu</a>
          <a href="#reserve" className="demo-btn demo-btn--ghost">Reserve a Table</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#5c3a21", color: "#f5efe4", borderBottom: "1px solid var(--demo-border)" }}>
      <UtensilsIcon size={18} /> <strong>Demo website:</strong> Riverside Grill is a fictional restaurant concept created by Bradley Matera. Menu, team, reviews, and reservation widget are illustrative.
    </div>

    {/* Hours strip */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        <span className="demo-trust-badge"><ClockIcon size={18} /> Wed–Thu 4–10 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Fri 4–11 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Sat 3–11 PM</span>
        <span className="demo-trust-badge"><ClockIcon size={18} /> Sun 3–9 PM</span>
        <span className="demo-trust-badge"><MapPinIcon size={18} /> 123 Main St, Rockford</span>
      </div>
    </div>

    {/* Stats + Review Badges */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">15+</div><div className="demo-stat__label">Illustrative Years</div></div>
          <div><div className="demo-stat__number">4.8</div><div className="demo-stat__label">Illustrative Rating</div></div>
          <div><div className="demo-stat__number">200+</div><div className="demo-stat__label">Illustrative Reviews</div></div>
          <div><div className="demo-stat__number">6</div><div className="demo-stat__label">Days Open (Illustrative)</div></div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <ReviewBadges googleRating={4.8} googleReviewCount={247} yelpRating={4.5} yelpReviewCount={89} />
        </div>
      </div>
    </section>

    {/* Split image + text: Chef spotlight with real photo */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/restaurant/chef.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Meet Chef Marcus Lindqvist (Illustrative)</h2>
            <p className="demo-split-image-text__text">This is a fictional chef profile for demo purposes. A real restaurant site would feature its actual executive chef, owner, or culinary team's story, training, and philosophy.</p>
            <p className="demo-split-image-text__text">The menu, ingredients, and sourcing claims below are illustrative examples for layout and copy style — not an actual restaurant's offerings.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Split image + text: Interior */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">An Atmosphere to Match</h2>
            <p className="demo-split-image-text__text">Warm lighting, exposed brick, and hand-built wooden tables create an intimate dining experience. Whether it's a first date or a 50th anniversary, our space sets the stage.</p>
            <p className="demo-split-image-text__text">Private dining room available for parties up to 30. Full venue buyout for events up to 120 guests.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/restaurant/interior.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Menu with item images */}
    <section className="demo-section demo-section--alt" id="menu">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Menu</h2>
        <p className="demo-section__subtitle">Everything is made from scratch in our kitchen. No freezers, no shortcuts.</p>
        <div className="demo-menu-categories">
          {menuCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="demo-menu-category__title">{cat.title}</h3>
              {cat.items.map((item) => (
                <div key={item.name} className="demo-menu-category__item demo-menu-item--with-image">
                  <div className="demo-menu-item__image" style={{ backgroundImage: `url(/images/demos/restaurant/${item.img}.jpg)` }} />
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

    {/* Feature image: steak */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/restaurant/steak.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Wood-Fired. Always.</h2>
        <p className="demo-feature-image__text">Every steak is grilled over real hardwood — never gas. It's the difference you can taste.</p>
      </div>
    </div>

    {/* Food Gallery - all 6 food photos */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">From Our Kitchen</h2>
        <p className="demo-section__subtitle">A taste of what's on the menu. Every dish made to order.</p>
        <div className="demo-food-gallery">
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-1.jpg)" }}><span className="demo-food-gallery__label">Lobster Ravioli</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-2.jpg)" }}><span className="demo-food-gallery__label">Walleye Special</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-3.jpg)" }}><span className="demo-food-gallery__label">Trout Almondine</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-4.jpg)" }}><span className="demo-food-gallery__label">Filet Mignon</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-5.jpg)" }}><span className="demo-food-gallery__label">Pork Chop</span></div>
          <div className="demo-food-gallery__item" style={{ backgroundImage: "url(/images/demos/restaurant/food-6.jpg)" }}><span className="demo-food-gallery__label">Seared Salmon</span></div>
        </div>
      </div>
    </section>

    {/* Wine Selection with wine image */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-two-col">
          <div>
            <h2 className="demo-section__title" style={{ textAlign: "left" }}>From the Cellar</h2>
            <p className="demo-section__subtitle" style={{ textAlign: "left" }}>A curated selection of wines by the glass and bottle. Ask your server for the full list.</p>
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
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/restaurant/wine.jpg)", minHeight: "400px", borderRadius: "var(--demo-radius)" }} />
        </div>
      </div>
    </section>

    {/* Cocktails feature image */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/restaurant/cocktail.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Craft Cocktails</h2>
        <p className="demo-feature-image__text">House-made syrups, fresh juices, and premium spirits. Diego crafts seasonal cocktails you won't find anywhere else in Rockford.</p>
      </div>
    </div>

    {/* Team Section with headshots */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Team</h2>
        <p className="demo-section__subtitle">Fictional team profiles for this demo. A real site would feature its actual staff.</p>
        <div className="demo-team-grid">
          {team.slice(0, 4).map((member) => (
            <div key={member.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(/images/demos/restaurant/${member.img}.jpg)` }} />
              <div className="demo-team-card__body">
                <h3 className="demo-team-card__name">{member.name}</h3>
                <p className="demo-team-card__role">{member.role}</p>
                <p className="demo-team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Private Events */}
    <section className="demo-section demo-section--alt">
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

    {/* Online Ordering */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Order Online</h2>
        <p className="demo-section__subtitle">Prefer to eat at home? Order delivery or takeout through your favorite platform.</p>
        <div className="demo-ordering-links">
          <a href="https://doordash.com" target="_blank" rel="noopener noreferrer" className="demo-ordering-link demo-ordering-link--doordash">DoorDash</a>
          <a href="https://grubhub.com" target="_blank" rel="noopener noreferrer" className="demo-ordering-link demo-ordering-link--grubhub">Grubhub</a>
          <a href="https://ubereats.com" target="_blank" rel="noopener noreferrer" className="demo-ordering-link demo-ordering-link--ubereats">Uber Eats</a>
        </div>
      </div>
    </section>

    {/* Instagram Feed with real food photos - all unique */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title"><InstagramIcon size={24} /> Follow @riversidegrill</h2>
        <p className="demo-section__subtitle">See what's coming out of our kitchen. New specials posted daily.</p>
        <div className="demo-instagram-feed">
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/steak.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/pasta.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/seafood.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/burger.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/dessert.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/cocktail.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/wine.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/restaurant/soup.jpg)" }} />
        </div>
        <div className="demo-instagram-feed__note">Mock Instagram feed. Production sites use the Instagram Graph API to auto-display latest posts.</div>
      </div>
    </section>

    {/* Reviews */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Guests Say</h2>
        <p className="demo-section__subtitle">Illustrative guest reviews for demonstration purposes.</p>
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

    {/* OpenTable Reservation Widget Mock */}
    <section className="demo-section demo-section--alt" id="reserve">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Make a Reservation</h2>
        <p className="demo-section__subtitle">Book your table online in seconds. Powered by OpenTable.</p>
        <ol style={{ maxWidth: "600px", margin: "0 auto 2rem", paddingLeft: "1.5rem", color: "var(--demo-text-muted)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <li>Select your preferred date, time, and party size in the form below.</li>
          <li>Enter your name, phone number, and any special requests (dietary needs, seating preferences).</li>
          <li>Click "Find a Table" to see available reservation times.</li>
          <li>Confirm your selected time slot — you will receive a text and email confirmation instantly.</li>
        </ol>
        <div className="demo-booking-widget">
          <div className="demo-booking-widget__header">
            <h3 className="demo-booking-widget__title">Find a Table</h3>
            <span className="demo-booking-widget__powered-by">Powered by OpenTable</span>
          </div>
          <div className="demo-booking-widget__row">
            <div className="demo-form__field" style={{ margin: 0 }}>
              <label className="demo-form__label" htmlFor="rsvp-date">Date</label>
              <input id="rsvp-date" className="demo-form__input" type="date" />
            </div>
            <div className="demo-form__field" style={{ margin: 0 }}>
              <label className="demo-form__label" htmlFor="rsvp-time">Time</label>
              <select id="rsvp-time" className="demo-form__select">
                <option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option>
                <option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option>
              </select>
            </div>
          </div>
          <div className="demo-form__field" style={{ margin: 0 }}>
            <label className="demo-form__label" htmlFor="rsvp-party">Party Size</label>
            <select id="rsvp-party" className="demo-form__select">
              <option>1 person</option><option>2 people</option><option>3 people</option>
              <option>4 people</option><option>5 people</option><option>6 people</option>
              <option>7+ people (call us)</option>
            </select>
          </div>
          <button type="button" className="demo-booking-widget__find">Find a Table</button>
          <div className="demo-booking-widget__note">Mock OpenTable widget. Production sites embed the real OpenTable widget for live availability and booking. $1 per diner seated, no monthly fee.</div>
        </div>
      </div>
    </section>

    {/* Google Maps */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Find Us</h2>
        <p className="demo-section__subtitle">123 Main Street, Rockford, IL 61101 — downtown, near the Rock River.</p>
        <GoogleMapsEmbed address="123 Main Street, Rockford, IL 61101" height={350} />
      </div>
    </section>

    <IntegrationsSection industry="restaurant" integrations={integrations} />

    {/* Contact */}
    <section className="demo-contact" style={{ background: "#1a1410" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Get in Touch</h2>
        <p className="demo-contact__text">Call us at (815) 555-0123 or follow us on social media for daily specials and updates.</p>
        <a href="tel:8155550123" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0123</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Address</span><span>123 Main Street, Rockford, IL</span></div>
          <div className="demo-contact__info-item"><PhoneIcon size={20} /><span className="demo-contact__info-label">Phone</span><span>(815) 555-0123</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>info@riversidegrill.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Riverside Grill</div>
        <div>123 Main Street, Rockford, IL 61101 · (815) 555-0123</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional restaurant concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Menu, team, reviews, and reservation widget are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default RestaurantDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Restaurant Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
