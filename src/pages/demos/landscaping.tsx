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
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, TreeIcon, SnowflakeIcon, FlameIcon, CheckIcon, InstagramIcon } from "../../site/icons";

const pathname = "/demos/landscaping/";
const pageTitle = "GreenScape Pro — Professional Landscaping in Rockford, IL | Demo Website";
const pageDescription = "Demo landscaping company website for GreenScape Pro — service packages, before/after project gallery, seasonal tips, and free quote form. Built by Bradley Matera.";

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

const services = [
  { name: "Lawn Care", desc: "Weekly mowing, edging, fertilizing, and weed control.", img: "lawn-care" },
  { name: "Hardscaping", desc: "Patios, walkways, retaining walls, and fire pits.", img: "patio" },
  { name: "Garden Design", desc: "Flower beds, shrubs, trees, and seasonal color.", img: "garden-design" },
  { name: "Planting", desc: "Tree and shrub installation, flower bed prep.", img: "planting" },
  { name: "Tree Work", desc: "Pruning, trimming, and safe tree removal.", img: "tree-removal" },
  { name: "Irrigation", desc: "Sprinkler installation, repair, and winterization.", img: "sprinkler" },
  { name: "Snow Removal", desc: "Driveway plowing, sidewalk clearing, salting.", img: "snow-removal" },
  { name: "Retaining Walls", desc: "Stone and timber walls for erosion control.", img: "hardscaping" },
];

const projects = [
  { title: "Front Yard Makeover", desc: "Complete front yard redesign with new walkway, beds, and lighting.", img: "project-1" },
  { title: "Backyard Oasis", desc: "Multi-level garden with patio, pergola, and water feature.", img: "project-2" },
  { title: "Stone Pathway", desc: "Natural stone walkway through perennial garden.", img: "project-3" },
  { title: "Koi Pond & Waterfall", desc: "Custom pond with waterfall, filtration, and landscaping.", img: "project-4" },
  { title: "Outdoor Living Room", desc: "Patio with fire pit, seating wall, and landscape lighting.", img: "project-5" },
  { title: "Garden Pergola", desc: "Cedar pergola with climbing vines and shade canopy.", img: "project-6" },
];

const faqs: FAQItem[] = [
  { q: "What areas do you serve?", a: "GreenScape Pro serves Rockford, Loves Park, Roscoe, Byron, Rockton, Pecatonica, and surrounding communities in Northwest Illinois. If you are unsure whether we cover your area, call (815) 555-0456 for a free consultation." },
  { q: "Do you offer free estimates?", a: "Yes. Every project starts with a free on-site consultation and written estimate. We measure your property, discuss your goals, and provide a detailed quote with no obligation. Most estimates are completed within 48 hours." },
  { q: "How much does landscaping cost?", a: "Pricing depends on project scope. Weekly lawn care starts at $35 per visit. Full landscape design and installation typically ranges from $2,000 to $15,000 depending on property size and materials. We offer three service plans — Basic, Complete Care, and Full Service — to fit different budgets." },
  { q: "Are you licensed and insured?", a: "Yes. GreenScape Pro is fully licensed in Illinois and carries $1 million in general liability insurance. Our team is trained in safe equipment operation and follows OSHA guidelines on every job site." },
  { q: "Do you work year-round?", a: "Yes. We provide lawn mowing and maintenance from April through October, leaf removal in fall, snow removal in winter, and spring cleanup and planting in March and April. We also install hardscaping projects like patios and retaining walls year-round when weather permits." },
  { q: "What is your guarantee?", a: "All plant installations come with a 1-year survival guarantee. If any plant we install dies within the first year, we replace it free of charge. Hardscaping work carries a 3-year warranty against structural defects." },
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

    {/* Services Grid with images */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Full-service landscaping from weekly mowing to complete outdoor transformations.</p>
        <div className="demo-services-grid">
          {services.map((s) => (
            <div key={s.name} className="demo-service-card">
              <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/landscaping/${s.img}.jpg)` }} />
              <div className="demo-service-card__body">
                <h3 className="demo-service-card__name">{s.name}</h3>
                <p className="demo-service-card__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Before/After Gallery with real different photos - 3 pairs */}
    <section className="demo-section" id="gallery">
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
              <h3 className="demo-before-after__title">Overgrown Yard Cleanup</h3>
              <p className="demo-before-after__desc">Removed overgrown weeds, installed new garden beds, edging, and fresh mulch.</p>
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
          <div className="demo-before-after__item">
            <div className="demo-before-after__images">
              <div className="demo-before-after__before" style={{ backgroundImage: "url(/images/demos/landscaping/before-3.jpg)" }}>
                <span className="demo-before-after__label">Before</span>
              </div>
              <div className="demo-before-after__after" style={{ backgroundImage: "url(/images/demos/landscaping/after-3.jpg)" }}>
                <span className="demo-before-after__label">After</span>
              </div>
            </div>
            <div className="demo-before-after__body">
              <h3 className="demo-before-after__title">Lawn Restoration</h3>
              <p className="demo-before-after__desc">Aerated, overseeded, and fertilized. Transformed patchy dirt into lush green lawn.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Split image + text: lawn care */}
    <section className="demo-section demo-section--alt">
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

    {/* Project Gallery with all 6 project photos */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Project Gallery</h2>
        <p className="demo-section__subtitle">A selection of our recent work across Northwest Illinois.</p>
        <div className="demo-food-gallery">
          {projects.map((p) => (
            <div key={p.title} className="demo-food-gallery__item" style={{ backgroundImage: `url(/images/demos/landscaping/${p.img}.jpg)` }}>
              <span className="demo-food-gallery__label">{p.title}</span>
            </div>
          ))}
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

    {/* Team Section */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Crew</h2>
        <p className="demo-section__subtitle">Same crew every visit. We're not a faceless national chain.</p>
        <div className="demo-team-grid">
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/landscaping/owner.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">Tom Bradley</h3>
              <p className="demo-team-card__role">Owner & Lead Designer</p>
              <p className="demo-team-card__bio">Started GreenScape Pro in 2015. Certified horticulturist with 20 years of experience. Personally visits every new client.</p>
            </div>
          </div>
          <div className="demo-team-card">
            <div className="demo-team-card__photo" style={{ backgroundImage: "url(/images/demos/landscaping/team-photo.jpg)" }} />
            <div className="demo-team-card__body">
              <h3 className="demo-team-card__name">The Crew</h3>
              <p className="demo-team-card__role">Field Team</p>
              <p className="demo-team-card__bio">Our 6-person crew has been together for 5+ years. Trained, uniformed, and equipped with commercial-grade tools.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Instagram Feed with project photos */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title"><InstagramIcon size={24} /> Follow @greenscapepro</h2>
        <p className="demo-section__subtitle">See our latest projects. New photos posted after every job.</p>
        <div className="demo-instagram-feed">
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-1.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-2.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-3.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-4.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-5.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/project-6.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/garden-design.jpg)" }} />
          <div className="demo-instagram-feed__item" style={{ backgroundImage: "url(/images/demos/landscaping/sprinkler.jpg)" }} />
        </div>
        <div className="demo-instagram-feed__note">Mock Instagram feed. Production sites use the Instagram Graph API to auto-display latest posts.</div>
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
  return <Seo title={pageTitle} description={pageDescription} pathname={pathname} canonicalUrl={pageUrl} robots="index,follow" breadcrumbs={[{ name: "Demos", path: "/demos/" }, { name: "Landscaping Demo", path: pathname }]} structuredData={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />;
};
