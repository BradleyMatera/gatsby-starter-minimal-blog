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
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, TreeIcon, SnowflakeIcon, FlameIcon, CheckIcon } from "../../site/icons";

const pathname = "/demos/landscaping/";
const pageTitle = "GreenScape Pro — Professional Landscaping in Rockford, IL | Demo Website";
const pageDescription = "Demo landscaping company website with service packages, gallery, seasonal tips, and free quote form.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "instagram", url: "https://instagram.com" },
  { platform: "google", url: "https://google.com" },
];

const integrations: Integration[] = [
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your service area boundary. Customers can see if you cover their neighborhood.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "OpenWeatherMap API", category: "Weather Data", description: "Live weather conditions displayed on your site. Shows customers when it's time for snow removal, watering, or lawn care. Auto-recommends seasonal services based on weather.", freeTier: "1,000 API calls/day (free). $0.09/1k calls after.", url: "https://openweathermap.org/api", status: "mocked" },
  { name: "Google Business Profile API", category: "Reviews & Ratings", description: "Live Google reviews and star rating on your site. Auto-updates when customers leave new reviews.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Houzz Pro Integration", category: "Project Portfolio", description: "Sync your Houzz project portfolio with your website. Customers browse before/after photos without leaving your site.", freeTier: "Free Houzz profile. Houzz Pro from $99/month.", url: "https://houzz.com/pro", status: "available" },
  { name: "Instagram Graph API", category: "Social Media", description: "Auto-display your latest landscaping project photos from Instagram. Perfect for showing daily work.", freeTier: "200 requests/hour (free). Facebook Business account required.", url: "https://developers.facebook.com/docs/instagram-api", status: "available" },
  { name: "Jobber / ServiceTitan", category: "Field Service Management", description: "Online booking, dispatching, invoicing, and customer CRM. Customers book online, crew gets the job on their phone.", freeTier: "Jobber from $69/month. ServiceTitan from $300/month.", url: "https://getjobber.com", status: "available" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Let customers pay invoices online with credit card or ACH. Send payment links via text or email.", freeTier: "2.9% + 30¢ per transaction. No monthly fee.", url: "https://stripe.com/payments", status: "available" },
  { name: "Twilio SMS Notifications", category: "Customer Communication", description: "Automated text alerts: 'Your crew is on the way', 'Service completed', 'Invoice ready'. Reduces no-shows and improves satisfaction.", freeTier: "Free trial. $0.0079 per SMS after.", url: "https://twilio.com/sms", status: "available" },
];

const process = [
  { title: "Free Consultation", desc: "I visit your property, listen to what you want, and take measurements. No pressure, no cost." },
  { title: "Design & Estimate", desc: "Within 5 days you get a detailed plan, material list, and fixed-price quote. No surprises." },
  { title: "Installation", desc: "My crew shows up on the scheduled date and completes the work on time. Clean job site daily." },
  { title: "Ongoing Care", desc: "Optional maintenance plans keep your investment looking great. Month-to-month, cancel anytime." },
];

const seasonal = [
  { Icon: FlameIcon, season: "Spring", title: "Cleanup & Prep", list: ["Debris removal", "Bed edging", "Pre-emergent", "Aeration"] },
  { Icon: LeafIcon, season: "Summer", title: "Maintenance", list: ["Weekly mowing", "Fertilizing", "Weed control", "Pruning"] },
  { Icon: TreeIcon, season: "Fall", title: "Winter Prep", list: ["Leaf removal", "Aeration", "Overseeding", "Winterizer"] },
  { Icon: SnowflakeIcon, season: "Winter", title: "Snow & Ice", list: ["Driveway plowing", "Sidewalk clearing", "Salting", "Ice management"] },
];

const testimonials = [
  { text: "GreenScape transformed our backyard. The patio and garden design exceeded our expectations. Worth every penny.", author: "Jennifer M.", location: "Byron, IL" },
  { text: "Reliable, professional, and reasonably priced. They show up when they say they will and the lawn has never looked better.", author: "Dave T.", location: "Rockford, IL" },
  { text: "After the big snowstorm last winter, they were out at 5 AM clearing our driveway. Best snow removal service in the area.", author: "Patricia L.", location: "Machesney Park, IL" },
];

const serviceAreas = ["Rockford", "Loves Park", "Machesney Park", "Byron", "Roscoe", "Rockton", "South Beloit", "Pecatonica", "Winnebago", "Freeport"];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const LandscapingDemo: React.FC = () => (
  <DemoLayout demoName="GreenScape Pro" industry="Landscaping" themeColor="#4a7c3a" designSystem="organic">
    {/* Hero with real garden photo */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/landscaping/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Serving Rockford & Northwest Illinois Since 2015</span>
        <h1 className="demo-hero__title">GreenScape Pro</h1>
        <p className="demo-hero__subtitle">Professional landscaping, lawn care, hardscaping, and snow removal. Free estimates, satisfaction guaranteed, and the same crew every visit.</p>
        <div className="demo-hero__actions">
          <a href="#quote" className="demo-btn demo-btn--primary">Get a Free Quote</a>
          <a href="#gallery" className="demo-btn demo-btn--ghost">View Our Work</a>
        </div>
      </div>
    </section>

    {/* Stats + Weather Widget */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-two-col">
          <div>
            <div className="demo-stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div><div className="demo-stat__number">500+</div><div className="demo-stat__label">Properties Served</div></div>
              <div><div className="demo-stat__number">8</div><div className="demo-stat__label">Years in Business</div></div>
              <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
              <div><div className="demo-stat__number">100%</div><div className="demo-stat__label">Satisfaction Guaranteed</div></div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <ReviewBadges googleRating={4.9} googleReviewCount={156} yelpRating={4.5} yelpReviewCount={42} />
            </div>
          </div>
          <WeatherWidget city="Rockford" temp={28} condition="snow" context="landscaping" />
        </div>
      </div>
    </section>

    {/* Before/After Gallery with real photos */}
    <section className="demo-section demo-section--alt" id="gallery">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Before & After</h2>
        <p className="demo-section__subtitle">Real projects we've completed for homeowners across the Rockford area.</p>
        <div className="demo-before-after">
          <div className="demo-before-after__item">
            <div className="demo-before-after__images">
              <div className="demo-before-after__before" style={{ backgroundImage: "url(/images/demos/landscaping/before-1.jpg)" }}>
                <span className="demo-before-after__label">Before</span>
              </div>
              <div className="demo-before-after__after" style={{ backgroundImage: "url(/images/demos/landscaping/after-1.jpg)" }}>
                <span className="demo-before-after__label">After</span>
              </div>
            </div>
            <div className="demo-before-after__body">
              <h3 className="demo-before-after__title">Backyard Garden Transformation</h3>
              <p className="demo-before-after__desc">Removed overgrown shrubs, installed new garden beds, edging, and fresh mulch.</p>
            </div>
          </div>
          <div className="demo-before-after__item">
            <div className="demo-before-after__images">
              <div className="demo-before-after__before" style={{ backgroundImage: "url(/images/demos/landscaping/before-2.jpg)" }}>
                <span className="demo-before-after__label">Before</span>
              </div>
              <div className="demo-before-after__after" style={{ backgroundImage: "url(/images/demos/landscaping/after-2.jpg)" }}>
                <span className="demo-before-after__label">After</span>
              </div>
            </div>
            <div className="demo-before-after__body">
              <h3 className="demo-before-after__title">Patio & Fire Pit Installation</h3>
              <p className="demo-before-after__desc">Built paver patio with fire pit, seating wall, and landscape lighting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Split image + text: lawn care */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Lawn Care Done Right</h2>
            <p className="demo-split-image-text__text">Weekly mowing, edging, fertilizing, and weed control. We use commercial-grade equipment and follow agronomy best practices to keep your lawn thick, green, and healthy all season long.</p>
            <p className="demo-split-image-text__text">Our 5-step fertilization program is customized to Northern Illinois soil conditions. No cookie-cutter treatments — we test your soil first.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/landscaping/lawn-care.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">How It Works</h2>
        <p className="demo-section__subtitle">From first call to finished project — here's exactly what to expect.</p>
        <div className="demo-process">
          {process.map((step, i) => (
            <div key={step.title} className="demo-process__step">
              <div className="demo-process__number">{i + 1}</div>
              <h3 className="demo-process__title">{step.title}</h3>
              <p className="demo-process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Seasonal Services */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Year-Round Service</h2>
        <p className="demo-section__subtitle">What we do changes with the seasons. Here's what's included each quarter.</p>
        <div className="demo-seasonal">
          {seasonal.map((s) => {
            const { Icon } = s;
            return (
              <div key={s.season} className="demo-seasonal__card">
                <div className="demo-seasonal__icon"><Icon size={24} /></div>
                <div className="demo-seasonal__season">{s.season}</div>
                <h3 className="demo-seasonal__title">{s.title}</h3>
                <ul className="demo-seasonal__list">{s.list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Service Packages */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Service Packages</h2>
        <p className="demo-section__subtitle">Bundle services and save. All packages are month-to-month — no contracts.</p>
        <div className="demo-plans">
          <div className="demo-plan">
            <h3 className="demo-plan__name">Basic Lawn</h3>
            <div className="demo-plan__price">$45<span className="demo-plan__price-period">/visit</span></div>
            <ul className="demo-plan__features">
              <li><CheckIcon size={16} /> Weekly mowing</li>
              <li><CheckIcon size={16} /> Edging along walks</li>
              <li><CheckIcon size={16} /> Blowing of hard surfaces</li>
              <li style={{ opacity: 0.4 }}><CheckIcon size={16} /> Fertilization</li>
              <li style={{ opacity: 0.4 }}><CheckIcon size={16} /> Weed control</li>
              <li style={{ opacity: 0.4 }}><CheckIcon size={16} /> Aeration</li>
            </ul>
          </div>
          <div className="demo-plan demo-plan--featured">
            <h3 className="demo-plan__name">Complete Care</h3>
            <div className="demo-plan__price">$89<span className="demo-plan__price-period">/visit</span></div>
            <ul className="demo-plan__features">
              <li><CheckIcon size={16} /> Weekly mowing & edging</li>
              <li><CheckIcon size={16} /> 5-step fertilization program</li>
              <li><CheckIcon size={16} /> Weed & grub control</li>
              <li><CheckIcon size={16} /> Spring & fall cleanup</li>
              <li><CheckIcon size={16} /> Aeration & overseeding</li>
              <li><CheckIcon size={16} /> Priority scheduling</li>
            </ul>
          </div>
          <div className="demo-plan">
            <h3 className="demo-plan__name">Full Service</h3>
            <div className="demo-plan__price">$149<span className="demo-plan__price-period">/visit</span></div>
            <ul className="demo-plan__features">
              <li><CheckIcon size={16} /> Everything in Complete Care</li>
              <li><CheckIcon size={16} /> Garden bed maintenance</li>
              <li><CheckIcon size={16} /> Pruning & trimming</li>
              <li><CheckIcon size={16} /> Mulching (2x/year)</li>
              <li><CheckIcon size={16} /> Snow removal (winter)</li>
              <li><CheckIcon size={16} /> Dedicated account manager</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Feature image: patio */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/landscaping/patio.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Hardscaping That Lasts</h2>
        <p className="demo-feature-image__text">Patios, walkways, retaining walls, and fire pits built to last decades.</p>
      </div>
    </div>

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

    {/* Service Area + Google Maps */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Areas We Serve</h2>
        <p className="demo-section__subtitle">Based in Rockford, serving all of Northwest Illinois and Southern Wisconsin.</p>
        <div className="demo-brands" style={{ marginBottom: "2rem" }}>
          {serviceAreas.map((area) => <div key={area} className="demo-brand">{area}</div>)}
        </div>
        <GoogleMapsEmbed address="Rockford, IL" height={300} title="GreenScape Pro service area map" />
      </div>
    </section>

    <IntegrationsSection industry="landscaping & lawn care" integrations={integrations} />

    {/* Quote CTA */}
    <section className="demo-contact" id="quote" style={{ background: "#1a6b3a" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Get a Free Quote</h2>
        <p className="demo-contact__text">Call us at (815) 555-0456 for a free, no-obligation estimate. We'll come to your property, take measurements, and send you a detailed quote within 5 days.</p>
        <a href="tel:8155550456" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0456</a>
        <div style={{ marginTop: "1.5rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Service Area</span><span>Rockford & NW Illinois</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Hours</span><span>Mon–Sat 7AM–6PM</span></div>
          <div className="demo-contact__info-item"><span className="demo-contact__info-label">Email</span><span>quotes@greenscapepro.com</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">GreenScape Pro</div>
        <div>Serving Rockford & Northwest Illinois · (815) 555-0456</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default LandscapingDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="noindex,nofollow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Landscaping Demo", path: pathname }]} />;
};
