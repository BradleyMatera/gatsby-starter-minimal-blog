import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import GoogleMapsEmbed from "../../features/demos/GoogleMapsEmbed";
import SocialLinks, { SocialLink } from "../../features/demos/SocialLinks";
import ReviewBadges from "../../features/demos/ReviewBadges";
import WeatherWidget from "../../features/demos/WeatherWidget";
import IntegrationsSection, { Integration } from "../../features/demos/IntegrationsSection";
import FAQSection, { FAQItem } from "../../features/demos/FAQSection";
import { StarIcon, PhoneIcon, AlertIcon, ShieldIcon, CheckIcon, XIcon, ClockIcon } from "../../site/icons";

const pathname = "/demos/hvac/";
const pageTitle = "ComfortAir Heating & Cooling — HVAC Website Concept Demo (Fictional)";
const pageDescription = "Concept demo of a fictional HVAC contractor website with emergency service info, maintenance plans, financing estimator, and technician bios. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

const integrations: Integration[] = [
  { name: "OpenWeatherMap API", category: "Weather Data", description: "Sample weather feed that could trigger smart alerts. When temps drop below 32°F or hit 90°F+, the site could show furnace or AC messaging.", freeTier: "1,000 API calls/day (free). $0.09/1k calls after.", url: "https://openweathermap.org/api", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your service area. Customers can see if you cover their location before calling.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Sample Google review display. Production sites can pull live reviews and ratings.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "ServiceTitan / Housecall Pro", category: "Field Service Management", description: "Online booking, dispatch, technician tracking, invoicing, and CRM. Customer could see technician ETA in production.", freeTier: "Housecall Pro from $49/month. ServiceTitan from $300/month.", url: "https://housecallpro.com", status: "available" },
  { name: "Synchrony Financing Widget", category: "Financing", description: "Embeddable financing application example. Customers could apply for promotional financing through a real lender integration.", freeTier: "No monthly fee. Merchant discount rate per transaction.", url: "https://synchrony.com/business", status: "mocked" },
  { name: "Twilio SMS Dispatch", category: "Customer Communication", description: "Automated SMS example. 'Your technician is 15 minutes away' with a tracking link. Reduces 'where are you?' calls.", freeTier: "Free trial. $0.0079 per SMS after.", url: "https://twilio.com/sms", status: "available" },
  { name: "BBB Accredited Business Badge", category: "Trust & Verification", description: "BBB badge example. Links to the company's BBB profile once accreditation is verified.", freeTier: "BBB accreditation from $500/year (varies by region).", url: "https://bbb.org", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Text or email a payment link after service. Customer pays with card or ACH. Funds in your account in 2 days.", freeTier: "2.9% + 30¢ per transaction. No monthly fee.", url: "https://stripe.com/payments", status: "available" },
];

const plans = [
  { name: "Basic", price: "$9.99", period: "/month", features: [
    { text: "1 annual tune-up", included: true },
    { text: "10% repair discount", included: true },
    { text: "Priority scheduling", included: true },
    { text: "No overtime fees", included: false },
    { text: "Free diagnostic with repair", included: false },
    { text: "Transferable warranty", included: false },
  ]},
  { name: "Comfort", price: "$14.99", period: "/month", featured: true, features: [
    { text: "2 annual tune-ups (heat + AC)", included: true },
    { text: "15% repair discount", included: true },
    { text: "Priority same-day service", included: true },
    { text: "No overtime fees", included: true },
    { text: "Free diagnostic with repair", included: true },
    { text: "Transferable warranty", included: false },
  ]},
  { name: "Total Comfort", price: "$24.99", period: "/month", features: [
    { text: "2 annual tune-ups + plumbing check", included: true },
    { text: "20% repair discount", included: true },
    { text: "Guaranteed 2-hour response", included: true },
    { text: "No overtime fees ever", included: true },
    { text: "Free diagnostic, even if no repair", included: true },
    { text: "Transferable to new owner", included: true },
  ]},
];

const brands = ["Carrier", "Trane", "Lennox", "Goodman", "Rheem", "York", "American Standard", "Amana", "Bryant", "Ruud", "Heil", "Tempstar"];

const coupons = [
  { label: "New Customer Special", offer: "$59 Tune-Up", desc: "Full heating or AC tune-up. 21-point inspection. New customers only.", code: "TUNE59" },
  { label: "Furnace Season", offer: "$200 OFF", desc: "New high-efficiency furnace installation. Includes free thermostat.", code: "FURNACE200" },
  { label: "AC Season", offer: "FREE Diagnostic", desc: "We waive the $89 diagnostic fee if you approve the repair.", code: "FREEDIAG" },
];

const faqs: FAQItem[] = [
  { q: "How much does a new furnace cost?", a: "A new high-efficiency furnace in this region typically ranges from $3,500–$6,500 installed, depending on size, efficiency rating, and installation requirements. We provide free in-home estimates and can discuss financing options." },
  { q: "Do you offer financing?", a: "Yes. We partner with financing providers to offer promotional APR plans on qualified purchases, with longer terms and low monthly payments available. Approval and rates depend on creditworthiness. The calculator on this page is illustrative." },
  { q: "What does the maintenance plan include?", a: "Plans typically include seasonal tune-ups, priority scheduling, repair discounts, and written service records. Specific benefits and terms are listed in your membership agreement." },
  { q: "What areas do you serve?", a: "Rockford, Loves Park, Machesney Park, Byron, Roscoe, Rockton, South Beloit, Pecatonica, Winnebago, and Freeport. If you're in Northwest Illinois, call to confirm service availability." },
];

const testimonials = [
  { text: "Our furnace died on the coldest night of the year and John was at our house within an hour. Fixed it in 30 minutes. Lifesavers.", author: "Robert D.", location: "Illustrative review, Rockford, IL" },
  { text: "The maintenance plan is worth every penny. They caught a cracked heat exchanger during a tune-up that could have been dangerous.", author: "Maria G.", location: "Illustrative review, Loves Park, IL" },
  { text: "Fair pricing, honest advice, and no upselling. They told me my AC just needed a capacitor, not a whole new unit like another company said.", author: "Steve W.", location: "Illustrative review, Byron, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const FinancingCalculator: React.FC = () => {
  const [amount, setAmount] = React.useState(4500);
  const [months, setMonths] = React.useState(60);
  const apr = 0;
  const monthly = apr === 0 ? amount / months : (amount * (apr/100/12) * Math.pow(1 + apr/100/12, months)) / (Math.pow(1 + apr/100/12, months) - 1);
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="demo-financing-calc">
      <h3 className="demo-financing-calc__title">Financing Estimator</h3>
      <p className="demo-financing-calc__subtitle">Illustrative monthly payment estimate. Real rates and approval depend on credit and lender terms.</p>
      <div className="demo-financing-calc__slider-row">
        <label className="demo-financing-calc__slider-label" htmlFor="financing-amount"><span>Project Amount</span><span className="demo-financing-calc__slider-value">{fmt(amount)}</span></label>
        <input id="financing-amount" className="demo-financing-calc__slider" type="range" min="500" max="10000" step="100" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__slider-row">
        <label className="demo-financing-calc__slider-label" htmlFor="financing-term"><span>Term</span><span className="demo-financing-calc__slider-value">{months} months</span></label>
        <input id="financing-term" className="demo-financing-calc__slider" type="range" min="12" max="72" step="12" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__result">
        <div className="demo-financing-calc__result-label">Estimated Monthly Payment</div>
        <div className="demo-financing-calc__result-value">{fmt(monthly)}<span className="demo-financing-calc__result-period">/mo</span></div>
      </div>
      <div className="demo-financing-calc__note">This is a demo estimator. The 0% APR example is for illustration only. Actual financing requires an application, credit approval, and a formal quote from the lender. Terms vary.</div>
    </div>
  );
};

const HvacDemo: React.FC = () => (
  <DemoLayout demoName="ComfortAir Heating & Cooling" industry="HVAC / Home Services" themeColor="#e85d04" designSystem="industrial">
    {/* Hero with real HVAC technician photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/hvac/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">24/7 Emergency Service · Rockford & Northwest Illinois</span>
        <h1 className="demo-hero__title">ComfortAir Heating & Cooling</h1>
        <p className="demo-hero__subtitle">Fictional demo of a full-service heating and cooling contractor. Emergency repairs, maintenance plans, system replacement, and indoor air quality — with clear dispatch and honest recommendations.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550789" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0789</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#1a3a5c", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> ComfortAir Heating & Cooling is a fictional business concept created by Bradley Matera. Team, reviews, images, and interactive features are illustrative.
    </div>

    {/* Emergency Banner */}
    <div className="demo-emergency-banner"><AlertIcon size={20} /> Heating or AC emergency? We're available 24/7 · Call (815) 555-0789 now</div>

    {/* Stats + Weather Widget + BBB Badge */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-two-col">
          <div>
            <div className="demo-stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div><div className="demo-stat__number">14</div><div className="demo-stat__label">Illustrative Years</div></div>
              <div><div className="demo-stat__number">24/7</div><div className="demo-stat__label">Emergency Dispatch (Illustrative)</div></div>
              <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Illustrative Rating</div></div>
              <div><div className="demo-stat__number">Rockford</div><div className="demo-stat__label">NW Illinois Service Base</div></div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <ReviewBadges googleRating={4.9} googleReviewCount={312} yelpRating={4.5} yelpReviewCount={67} />
            </div>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span className="demo-trust-logo"><ShieldIcon size={20} /> BBB A+ (illustrative)</span>
              <span className="demo-trust-logo"><ShieldIcon size={20} /> IL License (illustrative)</span>
            </div>
          </div>
          <WeatherWidget city="Rockford" temp={28} condition="snow" context="hvac" />
        </div>
      </div>
    </section>

    {/* Services with images */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What We Do</h2>
        <p className="demo-section__subtitle">Heating, cooling, and indoor air quality for residential and commercial customers.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Heating</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", margin: 0 }}>Furnace repair and replacement, heat pumps, and boilers. Common service call: no heat, short cycling, or odd noises.</p>
          </div>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Cooling</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", margin: 0 }}>Central AC repair and install, ductless mini-splits. Manual J load calculations for proper system sizing.</p>
          </div>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Indoor Air Quality</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", margin: 0 }}>Air purifiers, humidifiers, UV lights, and duct cleaning. Recommended based on home and health needs.</p>
          </div>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>Maintenance Plans</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", margin: 0 }}>Seasonal tune-ups, priority scheduling, and repair discounts. See plan comparison below.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Emergency Triage */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Is This an Emergency?</h2>
        <p className="demo-section__subtitle">Common winter and summer HVAC problems and what to do right now.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div style={{ border: "1px solid var(--demo-border)", padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>No Heat</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--demo-text-muted)", margin: 0 }}>Check thermostat, breaker, and filter. If the furnace still won't run, call for service.</p>
          </div>
          <div style={{ border: "1px solid var(--demo-border)", padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>No AC</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--demo-text-muted)", margin: 0 }}>Check thermostat setting, breaker, and outdoor unit power. Clear debris around the condenser.</p>
          </div>
          <div style={{ border: "1px solid var(--demo-border)", padding: "1rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Carbon Monoxide Alarm</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--demo-text-muted)", margin: 0 }}>Leave the house and call 911 or the fire department. Do not re-enter until cleared.</p>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", opacity: 0.7 }}>For gas leaks or suspected CO, evacuate and call emergency services first. This is general guidance, not a substitute for professional diagnosis.</p>
      </div>
    </section>

    {/* Split image + text: heating system */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/hvac/furnace-install.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Furnace Installation & Repair</h2>
            <p className="demo-split-image-text__text">We install and service all major furnace brands. From a simple pilot light fix to a complete high-efficiency system replacement, our licensed technicians get it done right the first time.</p>
            <p className="demo-split-image-text__text">Every installation includes a free thermostat, carbon monoxide test, and 12-month warranty on all parts and labor.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Split image + text: AC installation */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">AC Installation & Service</h2>
            <p className="demo-split-image-text__text">Central air, ductless mini-splits, and heat pumps. We size your system correctly using Manual J calculations — not guesswork. An oversized AC wastes energy and doesn't dehumidify.</p>
            <p className="demo-split-image-text__text">All AC installations include a free spring tune-up for the first year and a 10-year parts warranty on qualifying systems.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/hvac/ac-install.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Maintenance Plans */}
    <section className="demo-section demo-section--alt">
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
                  <li key={f.text} style={f.included ? {} : { opacity: 0.4 }}>
                    {f.included ? <CheckIcon size={16} /> : <XIcon size={16} />}{f.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ marginTop: "2rem", overflowX: "auto" }} tabIndex={0} role="region" aria-label="Maintenance plan comparison">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--demo-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Silver ($12/mo)</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Gold ($20/mo)</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Platinum ($35/mo)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Seasonal tune-up</td><td style={{ padding: "0.75rem", textAlign: "center" }}>1</td><td style={{ padding: "0.75rem", textAlign: "center" }}>2</td><td style={{ padding: "0.75rem", textAlign: "center" }}>2</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Priority scheduling</td><td style={{ padding: "0.75rem", textAlign: "center" }}>—</td><td style={{ padding: "0.75rem", textAlign: "center" }}>Yes</td><td style={{ padding: "0.75rem", textAlign: "center" }}>Yes</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Repair discount</td><td style={{ padding: "0.75rem", textAlign: "center" }}>10%</td><td style={{ padding: "0.75rem", textAlign: "center" }}>15%</td><td style={{ padding: "0.75rem", textAlign: "center" }}>20%</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>No overtime fees</td><td style={{ padding: "0.75rem", textAlign: "center" }}>—</td><td style={{ padding: "0.75rem", textAlign: "center" }}>—</td><td style={{ padding: "0.75rem", textAlign: "center" }}>Yes</td></tr>
              <tr><td style={{ padding: "0.75rem" }}>Free filter delivery</td><td style={{ padding: "0.75rem", textAlign: "center" }}>—</td><td style={{ padding: "0.75rem", textAlign: "center" }}>1x/yr</td><td style={{ padding: "0.75rem", textAlign: "center" }}>2x/yr</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--demo-text-muted)" }}>Illustrative pricing for demo purposes. Cancel anytime.</p>
      </div>
    </section>

    {/* Financing Calculator */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Financing Available</h2>
        <p className="demo-section__subtitle">0% APR for 12 months on approved credit. Don't let a broken furnace break the bank.</p>
        <FinancingCalculator />
      </div>
    </section>

    {/* Coupons */}
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

    {/* Brands We Service */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Brands We Service</h2>
        <p className="demo-section__subtitle">We work on most residential HVAC brands. If yours isn't listed, call — we likely service it.</p>
        <div className="demo-brands">{brands.slice(0, 8).map((b) => <div key={b} className="demo-brand">{b}</div>)}</div>
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", opacity: 0.7 }}>Brand names are trademarks of their respective owners. Mention does not imply endorsement or certification.</p>
      </div>
    </section>

    {/* Feature image: winter house */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/hvac/winter.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Winter Ready?</h2>
        <p className="demo-feature-image__text">Don't wait until the first cold snap. Schedule your furnace tune-up today.</p>
      </div>
    </div>

    {/* Team Section with technician headshots */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Technicians</h2>
        <p className="demo-section__subtitle">Licensed, background-checked, and drug-tested. The same faces every time.</p>
        <div className="demo-team-grid">
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/hvac/owner.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Bob Anderson</h3>
              <p className="demo-team-card__role">Owner / Master Tech</p>
              <p className="demo-team-card__bio">30 years in HVAC. Started ComfortAir in 2010. EPA 608 Universal certified. Still goes on calls every week.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/hvac/tech-1.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">John Martinez</h3>
              <p className="demo-team-card__role">Lead Technician</p>
              <p className="demo-team-card__bio">12 years experience. NATE-certified in heating and cooling. Specializes in high-efficiency system installations.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/hvac/tech-2.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Sarah Johnson</h3>
              <p className="demo-team-card__role">Service Technician</p>
              <p className="demo-team-card__bio">7 years experience. NATE-certified. Handles maintenance, diagnostics, and indoor air quality installations.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/hvac/tech-3.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Mike Thompson</h3>
              <p className="demo-team-card__role">Service Technician</p>
              <p className="demo-team-card__bio">5 years experience. EPA 608 certified. Handles emergency calls and weekend service. Rockford native.</p>
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

    {/* FAQ */}
    <FAQSection faqs={faqs} />

    {/* Google Maps */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Service Area</h2>
        <p className="demo-section__subtitle">Based in Rockford, serving all of Northwest Illinois.</p>
        <GoogleMapsEmbed address="Rockford, IL" height={300} title="ComfortAir service area" />
      </div>
    </section>

    <IntegrationsSection industry="HVAC & home services" integrations={integrations} />

    {/* CTA */}
    <section className="demo-contact" style={{ background: "#0d1b2a" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Need Service Today?</h2>
        <p className="demo-contact__text">Call (815) 555-0789 for same-day service or 24/7 emergency repairs. No answering service — you talk to a real technician.</p>
        <a href="tel:8155550789" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0789</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><ShieldIcon size={20} /><span className="demo-contact__info-label">License</span><span>IL #058-204993</span></div>
          <div className="demo-contact__info-item"><ClockIcon size={20} /><span className="demo-contact__info-label">Hours</span><span>24/7 Emergency</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>service@comfortair.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">ComfortAir Heating & Cooling</div>
        <div>Rockford, IL · (815) 555-0789 · IL License #058-204993</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default HvacDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "HVAC Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
