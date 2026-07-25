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
import { StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, CarIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/auto-repair/";
const pageTitle = "Northside Auto Repair — Auto Repair Shop Demo";
const pageDescription = "Demo auto repair website for a fictional independent shop. Includes service menu, illustrative VIN lookup, sample mechanic bios, and transparent estimates. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

const integrations: Integration[] = [
  { name: "NHTSA VIN Decoder API", category: "Vehicle Identification", description: "Illustrative VIN lookup. In production, a customer could enter a VIN and the site would auto-fill year, make, model, and engine using the free NHTSA API.", freeTier: "Completely free. No API key required. Unlimited calls.", url: "https://vpic.nhtsa.dot.gov/api/", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Location", description: "Interactive map showing shop location with directions. Customers tap to navigate.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Sample Google review display. Production sites can pull live reviews and ratings.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "RepairPal Price Estimator", category: "Price Transparency", description: "Embeddable price-range widget example. Shows how repair cost estimates could be presented based on location and vehicle.", freeTier: "Free to embed. RepairPal Certified Shop program from $199/month.", url: "https://repairpal.com/shops", status: "mocked" },
  { name: "CARFAX Service Shop Program", category: "Service History", description: "Service history integration example. With a real CARFAX partnership, repairs could be logged to the vehicle's service record.", freeTier: "Free for repair shops. CARFAX pays you for service records.", url: "https://carfax.com/service-shop", status: "available" },
  { name: "Tekmetric / Shop-Ware", category: "Shop Management Software", description: "Digital vehicle inspection example. Technicians could share photo-based inspections with customers for approval.", freeTier: "Tekmetric from $129/month. Shop-Ware from $249/month.", url: "https://tekmetric.com", status: "available" },
  { name: "Worldpac / AutoZone ProAccess", category: "Parts Ordering", description: "Real-time parts inventory and pricing integration example. In production, parts availability could be checked during booking.", freeTier: "Free for registered shops. Wholesale pricing on parts.", url: "https://worldpac.com", status: "available" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Text a payment link after service. Customer pays with card or ACH.", freeTier: "2.9% + 30¢ per transaction. No monthly fee.", url: "https://stripe.com/payments", status: "available" },
];

const serviceCategories = [
  { title: "Routine Maintenance", items: [
    { name: "Oil Change (Conventional)", desc: "Up to 5 qts, new filter, 21-point inspection", price: "$39", time: "30 min" },
    { name: "Oil Change (Full Synthetic)", desc: "Up to 5 qts, premium filter, 21-point inspection", price: "$69", time: "30 min" },
    { name: "Tire Rotation", desc: "Includes pressure check and tread depth measurement", price: "$25", time: "20 min" },
    { name: "Multipoint Inspection", desc: "50-point visual inspection with written report", price: "Free", time: "30 min" },
  ]},
  { title: "Brakes", items: [
    { name: "Brake Pad Replacement", desc: "Front or rear pads, includes resurfacing rotors", price: "from $179", time: "1-2 hrs" },
    { name: "Brake Fluid Flush", desc: "Remove old fluid, replace with DOT 4, bleed system", price: "$99", time: "45 min" },
    { name: "Rotor Replacement", desc: "Front or rear rotors, includes pads", price: "from $279", time: "1-2 hrs" },
    { name: "Caliper Replacement", desc: "Single caliper, includes brake fluid", price: "from $189", time: "1 hr" },
  ]},
  { title: "Diagnostics & Engine", items: [
    { name: "Check Engine Light", desc: "OBD-II scan, diagnose code, written estimate", price: "$89", time: "45 min" },
    { name: "Engine Diagnostics", desc: "Advanced diagnostics beyond code reading", price: "from $129", time: "1-2 hrs" },
    { name: "Transmission Service", desc: "Fluid flush, filter replacement, gasket", price: "from $149", time: "2 hrs" },
    { name: "Timing Belt", desc: "Includes tensioner and water pump inspection", price: "from $499", time: "4-6 hrs" },
  ]},
  { title: "Climate & Electrical", items: [
    { name: "AC Recharge", desc: "Recharge with R-134a, leak check, performance test", price: "$99", time: "45 min" },
    { name: "AC Compressor", desc: "New compressor, receiver drier, system flush", price: "from $599", time: "3-4 hrs" },
    { name: "Battery Replacement", desc: "New battery, old core recycling, terminal cleaning", price: "from $129", time: "20 min" },
    { name: "Alternator Replacement", desc: "New alternator, belt inspection, test charging", price: "from $289", time: "1-2 hrs" },
  ]},
];

const makes = ["Toyota", "Honda", "Ford", "Chevy", "Nissan", "Subaru", "Hyundai", "Kia", "Jeep", "Dodge", "Ram", "GMC", "Buick", "Mazda", "Volkswagen", "BMW", "Audi", "Mercedes", "Lexus", "Acura"];

const coupons = [
  { label: "Oil Change Special", offer: "$29.99", desc: "Conventional oil change with 21-point inspection. Most vehicles.", code: "OIL29" },
  { label: "Brake Special", offer: "$50 OFF", desc: "Front or rear brake pad replacement. Includes rotor resurfacing.", code: "BRAKES50" },
  { label: "AC Season", offer: "$25 OFF", desc: "AC recharge and performance check. Before the summer heat hits.", code: "AC25" },
];

const faqs: FAQItem[] = [
  { q: "How much does an oil change cost?", a: "Oil change pricing depends on oil type, filter, and vehicle. A conventional oil change typically starts around $39.95 and a full synthetic oil change around $59.95. Contact us for current pricing for your vehicle." },
  { q: "Do you work on all car makes and models?", a: "Independent shops like this demo service most domestic, Asian, and European brands. Always confirm the shop has the diagnostic tools, equipment, and training for your specific make and model." },
  { q: "Do you offer a warranty on repairs?", a: "Warranty terms vary by repair and part. Ask for the written warranty terms before approving work. A 12-month / 12,000-mile parts-and-labor warranty is common in the industry but not guaranteed for every component." },
  { q: "How long does a brake job take?", a: "A standard brake pad replacement often takes 45 to 60 minutes per axle. If rotors need resurfacing or replacement, add time. Actual timing depends on the vehicle and parts availability." },
  { q: "Can you diagnose a check engine light?", a: "Yes. An OBD-II diagnostic scan identifies trouble codes and informs a written estimate for recommended repairs. Diagnostic fees and whether they are waived with repair vary by shop — ask when you book." },
  { q: "Do you offer financing?", a: "We partner with financing providers to offer promotional payment plans on qualifying repairs, subject to credit approval. Terms, minimums, and rates vary; ask for current options." },
];

const testimonials = [
  { text: "Honest mechanics who don't upsell. They showed me the worn brake pads and explained exactly what needed fixing. No pressure, no games.", author: "Chris P.", location: "Illustrative review, Rockford, IL" },
  { text: "Took my Honda here after the dealer quoted $1,200 for a repair. Northside did it for $450 and it's been perfect for 20,000 miles.", author: "Amanda J.", location: "Illustrative review, Loves Park, IL" },
  { text: "Quick oil change, fair price, and they found a leaking coolant hose I didn't even know about. Fixed it same day. Great shop.", author: "Kevin R.", location: "Illustrative review, Machesney Park, IL" },
];

const trustBadges = [
  { Icon: ShieldIcon, label: "ASE-Certified Technicians" },
  { Icon: ShieldIcon, label: "BBB Accredited (Verify)" },
  { Icon: CheckIcon, label: "Written Warranty on Repairs" },
  { Icon: CheckIcon, label: "Written Estimates" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const VinLookup: React.FC = () => {
  const [vin, setVin] = React.useState("");
  const [result, setResult] = React.useState<null | { year: string; make: string; model: string }>(null);
  const handleLookup = () => {
    if (vin.length >= 17) setResult({ year: "2019", make: "Toyota", model: "Camry SE" });
    else if (vin.length > 0) setResult({ year: "—", make: "VIN must be 17 characters", model: "" });
  };
  return (
    <div className="demo-vin-lookup">
      <label htmlFor="vin-input"><h3 className="demo-vin-lookup__title">VIN Lookup</h3></label>
      <p className="demo-vin-lookup__desc">Enter any 17-character VIN to see an illustrative vehicle lookup. A production site would call the free NHTSA VIN Decoder API for real data.</p>
      <div className="demo-vin-lookup__row">
        <input id="vin-input" className="demo-vin-lookup__input" type="text" placeholder="1HGCM82633A123456" maxLength={17} value={vin} onChange={(e) => setVin(e.target.value.toUpperCase())} />
        <button type="button" className="demo-vin-lookup__btn" onClick={handleLookup}>Look Up</button>
      </div>
      {result && <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--demo-bg)", borderRadius: "var(--demo-radius)" }}><strong>Vehicle (illustrative):</strong> {result.year} {result.make} {result.model}</div>}
      <div className="demo-vin-lookup__note">This is a mock VIN lookup for demonstration. Results are fictional. Production sites use the free NHTSA VIN Decoder API to auto-fill year, make, model, and engine info.</div>
    </div>
  );
};

const AutoRepairDemo: React.FC = () => (
  <DemoLayout demoName="Northside Auto Repair" industry="Auto Repair" themeColor="#ff6b1a" designSystem="garage">
    {/* Hero with real mechanic photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/auto-repair/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Independent Auto Repair · Rockford Since 2008</span>
        <h1 className="demo-hero__title">Northside Auto Repair</h1>
        <p className="demo-hero__subtitle">Fictional demo of a neighborhood auto repair shop. Transparent estimates, written warranties, and ASE-certified technicians — for cars, trucks, and SUVs.</p>
        <div className="demo-hero__actions">
          <a href="#book" className="demo-btn demo-btn--primary">Book Appointment</a>
          <a href="tel:8155550321" className="demo-btn demo-btn--ghost"><PhoneIcon size={20} /> (815) 555-0321</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#2c2c30", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> Northside Auto Repair is a fictional business concept created by Bradley Matera. Team, reviews, images, and interactive features are illustrative.
    </div>

    {/* Trust Badges */}
    <div className="demo-trust-bar">
      <div className="demo-trust-bar__inner">
        {trustBadges.map((b) => { const { Icon } = b; return <span key={b.label} className="demo-trust-badge"><Icon size={18} /> {b.label}</span>; })}
      </div>
    </div>

    {/* Stats + Review Badges + CARFAX */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">16</div><div className="demo-stat__label">Years in Rockford</div></div>
          <div><div className="demo-stat__number">15K+</div><div className="demo-stat__label">Cars Repaired</div></div>
          <div><div className="demo-stat__number">4.8</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">12mo</div><div className="demo-stat__label">Warranty on Repairs</div></div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <ReviewBadges googleRating={4.8} googleReviewCount={198} yelpRating={4.5} yelpReviewCount={54} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><CarIcon size={20} /> CARFAX Service Partner</span>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> BBB <span className="demo-trust-logo__rating">A+</span> Accredited</span>
        </div>
      </div>
    </section>

    {/* VIN Lookup */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Quick Vehicle Lookup</h2>
        <p className="demo-section__subtitle">Don't know your exact vehicle details? Enter your VIN and we'll figure it out.</p>
        <VinLookup />
      </div>
    </section>

    {/* Services Grid with images */}
    <section className="demo-section" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">From oil changes to engine rebuilds. Transparent pricing, 12-month warranty on everything.</p>
        <div className="demo-services-grid">
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/oil-change.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Oil Change</h3><p className="demo-service-card__desc">Conventional, synthetic blend, and full synthetic. 21-point inspection included.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/brakes.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Brake Service</h3><p className="demo-service-card__desc">Pad replacement, rotor resurfacing, caliper service, and brake fluid flush.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/engine.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Engine Diagnostics</h3><p className="demo-service-card__desc">Check engine light, OBD-II scan, and advanced diagnostics. Written estimate provided.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/tire-service.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Tire Service</h3><p className="demo-service-card__desc">Rotation, balancing, mounting, and flat repair. All major tire brands available.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/battery.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Battery & Electrical</h3><p className="demo-service-card__desc">Battery testing and replacement, alternator, starter, and electrical diagnostics.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/diagnostics.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Computer Diagnostics</h3><p className="demo-service-card__desc">Advanced computer diagnostics for complex electrical and engine management issues.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/transmission.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Transmission</h3><p className="demo-service-card__desc">Fluid flush, filter replacement, and transmission repair for all makes.</p></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/auto-repair/ac-service.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">AC & Heating</h3><p className="demo-service-card__desc">AC recharge, compressor replacement, and heating system repair.</p></div>
          </div>
        </div>
      </div>
    </section>

    {/* Service Menu - detailed pricing */}
    <section className="demo-section demo-section--alt">
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

    {/* Split image + text: garage */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/auto-repair/garage.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">A Shop You Can Trust</h2>
            <p className="demo-split-image-text__text">Our ASE-certified mechanics have decades of combined experience. We work on domestic, import, and European vehicles. No job is too big or too small.</p>
            <p className="demo-split-image-text__text">Every repair comes with a 12-month / 12,000-mile warranty. If something we fixed breaks again within that time, we fix it for free. No questions asked.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Makes We Service */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Makes We Service</h2>
        <p className="demo-section__subtitle">Domestic, import, and European. If your make isn't listed, call us — we probably work on it.</p>
        <div className="demo-makes">{makes.map((m) => <div key={m} className="demo-make">{m}</div>)}</div>
      </div>
    </section>

    {/* Coupons */}
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

    {/* Feature image: car on lift */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/auto-repair/lift.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Brakes Done Right</h2>
        <p className="demo-feature-image__text">Ceramic, semi-metallic, or performance — we use the right pads for your driving style.</p>
      </div>
    </div>

    {/* Team Section with mechanic headshots */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Mechanics</h2>
        <p className="demo-section__subtitle">ASE-certified, honest, and experienced. The same faces every time you visit.</p>
        <div className="demo-team-grid">
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/auto-repair/owner.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Frank Delgado</h3>
              <p className="demo-team-card__role">Owner / Master Mechanic</p>
              <p className="demo-team-card__bio">25 years turning wrenches. ASE Master Certified. Opened Northside Auto in 2008. Still works on cars every day.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/auto-repair/mechanic-1.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Tyler Jackson</h3>
              <p className="demo-team-card__role">Lead Mechanic</p>
              <p className="demo-team-card__bio">10 years experience. ASE certified in brakes, steering, and suspension. Specializes in diagnostics.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/auto-repair/mechanic-2.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Maria Santos</h3>
              <p className="demo-team-card__role">Service Technician</p>
              <p className="demo-team-card__bio">6 years experience. ASE certified. Handles oil changes, tire service, and multi-point inspections.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/auto-repair/mechanic-3.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Kevin O'Neil</h3>
              <p className="demo-team-card__role">Service Technician</p>
              <p className="demo-team-card__bio">8 years experience. ASE certified in electrical and engine performance. European car specialist.</p>
            </div>
          </div>
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

    <FAQSection faqs={faqs} />

    {/* Booking Form */}
    <section className="demo-section demo-section--alt" id="book">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Book an Appointment</h2>
        <p className="demo-section__subtitle">Fill out the form and we'll confirm by text or email within 1 business hour.</p>
        <ol style={{ maxWidth: "600px", margin: "0 auto 2rem", paddingLeft: "1.5rem", color: "var(--demo-text-muted)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <li>Enter your vehicle make, model, and year — or use the VIN lookup above to auto-fill.</li>
          <li>Select the service you need from the dropdown (oil change, brakes, diagnostics, etc.).</li>
          <li>Choose your preferred date and time for drop-off.</li>
          <li>Provide your name and phone number — we will text or email confirmation within 1 business hour.</li>
          <li>Drop off your vehicle at the scheduled time. Most repairs are completed same-day.</li>
        </ol>
        <div className="demo-booking-form">
          <div className="demo-form__row">
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-make">Vehicle Make</label><input id="appt-make" className="demo-form__input" type="text" placeholder="e.g. Toyota" /></div>
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-model">Vehicle Model</label><input id="appt-model" className="demo-form__input" type="text" placeholder="e.g. Camry" /></div>
          </div>
          <div className="demo-form__row">
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-year">Year</label><input id="appt-year" className="demo-form__input" type="text" placeholder="e.g. 2019" /></div>
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-service">Service Needed</label><select id="appt-service" className="demo-form__select"><option>Oil Change</option><option>Brake Service</option><option>Check Engine Light</option><option>AC / Heating</option><option>Tire Service</option><option>Other (describe below)</option></select></div>
          </div>
          <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-name">Your Name</label><input id="appt-name" className="demo-form__input" type="text" placeholder="First and last name" /></div>
          <div className="demo-form__row">
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-phone">Phone</label><input id="appt-phone" className="demo-form__input" type="tel" placeholder="(815) 555-0000" /></div>
            <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-email">Email</label><input id="appt-email" className="demo-form__input" type="email" placeholder="you@example.com" /></div>
          </div>
          <div className="demo-form__field"><label className="demo-form__label" htmlFor="appt-problem">Describe the Problem</label><input id="appt-problem" className="demo-form__input" type="text" placeholder="e.g. Brakes squeaking when stopping" /></div>
          <button type="button" className="demo-form__submit">Request Appointment</button>
        </div>
      </div>
    </section>

    {/* Google Maps */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Find Us</h2>
        <p className="demo-section__subtitle">456 North Ave, Rockford, IL 61101 — corner of North Ave and Main.</p>
        <GoogleMapsEmbed address="456 North Ave, Rockford, IL 61101" height={300} title="Northside Auto Repair location" />
      </div>
    </section>

    <IntegrationsSection industry="auto repair" integrations={integrations} />

    {/* CTA */}
    <section className="demo-contact" style={{ background: "#1c1c1e" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Have Questions?</h2>
        <p className="demo-contact__text">Call (815) 555-0321 and talk to a real mechanic. Free estimates on all work, no appointment needed for estimates.</p>
        <a href="tel:8155550321" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0321</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Address</span><span>456 North Ave, Rockford, IL</span></div>
          <div className="demo-contact__info-item"><ClockIcon size={20} /><span className="demo-contact__info-label">Hours</span><span>Mon–Fri 7AM–6PM, Sat 8AM–2PM</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>service@northsideauto.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Northside Auto Repair</div>
        <div>456 North Ave, Rockford, IL 61101 · (815) 555-0321</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default AutoRepairDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Auto Repair Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
