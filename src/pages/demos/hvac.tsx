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
import { StarIcon, MapPinIcon, PhoneIcon, FlameIcon, SnowflakeIcon, WindIcon, AlertIcon, ShieldIcon, CheckIcon, XIcon, ClockIcon } from "../../site/icons";

const pathname = "/demos/hvac/";
const pageTitle = "ComfortAir Heating & Cooling — Rockford HVAC | Demo Website";
const pageDescription = "Demo HVAC company website for ComfortAir Heating & Cooling — emergency service callout, maintenance plans, financing calculator, and technician bios. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

const integrations: Integration[] = [
  { name: "OpenWeatherMap API", category: "Weather Data", description: "Live weather feed that triggers smart alerts on your site. When temps drop below 32°F, the site auto-shows a 'Is your furnace ready?' banner. When it hits 90°F+, it switches to AC messaging.", freeTier: "1,000 API calls/day (free). $0.09/1k calls after.", url: "https://openweathermap.org/api", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your service area. Customers can see if you cover their location before calling.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Live Google reviews on your site. Auto-updates. Links to your Google profile for new reviews.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "ServiceTitan / Housecall Pro", category: "Field Service Management", description: "Online booking, dispatch, technician tracking, invoicing, and CRM. Customer sees real-time tech ETA like Uber.", freeTier: "Housecall Pro from $49/month. ServiceTitan from $300/month.", url: "https://housecallpro.com", status: "available" },
  { name: "Synchrony Financing Widget", category: "Financing", description: "Embeddable financing application. Customers apply for 0% APR financing directly on your site. Instant decisions.", freeTier: "No monthly fee. Merchant discount rate per transaction.", url: "https://synchrony.com/business", status: "mocked" },
  { name: "Twilio SMS Dispatch", category: "Customer Communication", description: "Automated SMS: 'Your technician John is 15 minutes away' with live GPS tracking link. Reduces 'where are you?' calls by 80%.", freeTier: "Free trial. $0.0079 per SMS after.", url: "https://twilio.com/sms", status: "available" },
  { name: "BBB Accredited Business Badge", category: "Trust & Verification", description: "Live BBB rating badge that links to your BBB profile. Shows customers you're accredited and trustworthy.", freeTier: "BBB accreditation from $500/year (varies by region).", url: "https://bbb.org", status: "mocked" },
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
      <h3 className="demo-financing-calc__title">Financing Calculator</h3>
      <p className="demo-financing-calc__subtitle">0% APR for 12 months. Estimate your monthly payment.</p>
      <div className="demo-financing-calc__slider-row">
        <div className="demo-financing-calc__slider-label"><span>Project Amount</span><span className="demo-financing-calc__slider-value">{fmt(amount)}</span></div>
        <input className="demo-financing-calc__slider" type="range" min="500" max="10000" step="100" value={amount} aria-label="Project amount in dollars" onChange={(e) => setAmount(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__slider-row">
        <div className="demo-financing-calc__slider-label"><span>Term</span><span className="demo-financing-calc__slider-value">{months} months</span></div>
        <input className="demo-financing-calc__slider" type="range" min="12" max="72" step="12" value={months} aria-label="Loan term in months" onChange={(e) => setMonths(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__result">
        <div className="demo-financing-calc__result-label">Estimated Monthly Payment</div>
        <div className="demo-financing-calc__result-value">{fmt(monthly)}<span className="demo-financing-calc__result-period">/mo</span></div>
      </div>
      <div className="demo-financing-calc__note">0% APR for 12 months on approved credit. After promo period, standard APR applies. Powered by Synchrony Financial.</div>
    </div>
  );
};

const HvacDemo: React.FC = () => (
  <DemoLayout demoName="ComfortAir Heating & Cooling" industry="HVAC / Home Services" themeColor="#e85d04" designSystem="industrial">
    {/* Hero with real HVAC technician photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/hvac/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">24/7 Emergency Service · Licensed & Insured</span>
        <h1 className="demo-hero__title">ComfortAir Heating & Cooling</h1>
        <p className="demo-hero__subtitle">Furnace out in January? AC down in July? We're available 24/7. Same-day service across Rockford and Northwest Illinois since 2010.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550789" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0789</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    {/* Emergency Banner */}
    <div className="demo-emergency-banner"><AlertIcon size={20} /> Heating or AC emergency? We're available 24/7 · Call (815) 555-0789 now</div>

    {/* Stats + Weather Widget + BBB Badge */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-two-col">
          <div>
            <div className="demo-stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div><div className="demo-stat__number">14</div><div className="demo-stat__label">Years in Business</div></div>
              <div><div className="demo-stat__number">8,000+</div><div className="demo-stat__label">Service Calls</div></div>
              <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
              <div><div className="demo-stat__number">24/7</div><div className="demo-stat__label">Emergency Service</div></div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <ReviewBadges googleRating={4.9} googleReviewCount={312} yelpRating={4.5} yelpReviewCount={67} />
            </div>
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span className="demo-trust-logo"><ShieldIcon size={20} /> BBB <span className="demo-trust-logo__rating">A+</span> Accredited</span>
              <span className="demo-trust-logo"><ShieldIcon size={20} /> IL Licensed <span className="demo-trust-logo__rating">#058-204993</span></span>
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
        <p className="demo-section__subtitle">Complete heating, cooling, and indoor air quality services for residential and commercial.</p>
        <div className="demo-services-grid">
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/heating.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Heating</h3><p className="demo-service-card__desc">Furnace repair, installation, and maintenance for all brands. Heat pumps and boilers too.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>Repair from $89</div></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/ac-unit.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Cooling</h3><p className="demo-service-card__desc">Central AC repair, replacement, and new installation. Ductless mini-splits for additions.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>Repair from $89</div></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/indoor-air-quality.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Indoor Air Quality</h3><p className="demo-service-card__desc">Air purifiers, humidifiers, UV lights, and duct cleaning for healthier home air.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>from $299</div></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/maintenance.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Maintenance</h3><p className="demo-service-card__desc">Tune-ups, inspections, and preventative maintenance. Keep your system running efficiently.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>from $89</div></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/thermostat.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Smart Thermostats</h3><p className="demo-service-card__desc">Nest, Ecobee, and Honeywell installation. Save 10-15% on energy bills with smart controls.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>from $199</div></div>
          </div>
          <div className="demo-service-card">
            <div className="demo-service-card__image" style={{ backgroundImage: "url(/images/demos/hvac/duct-cleaning.jpg)" }} />
            <div className="demo-service-card__body"><h3 className="demo-service-card__name">Duct Cleaning</h3><p className="demo-service-card__desc">Remove dust, allergens, and debris from your ductwork. Breathe cleaner air.</p><div className="demo-service__price" style={{ marginTop: "0.5rem", fontWeight: 700, color: "var(--demo-accent)" }}>from $399</div></div>
          </div>
        </div>
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
        <p className="demo-section__subtitle">We repair and install all major brands. If yours isn't listed, call us — we can probably help.</p>
        <div className="demo-brands">{brands.map((b) => <div key={b} className="demo-brand">{b}</div>)}</div>
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
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default HvacDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="noindex,nofollow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "HVAC Demo", path: pathname }]} />;
};
