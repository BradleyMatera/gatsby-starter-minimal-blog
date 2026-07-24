import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, TreeIcon, SnowflakeIcon, DropletIcon, FlameIcon, CheckIcon } from "../../site/icons";

const pathname = "/demos/landscaping/";
const pageTitle = "GreenScape Pro — Professional Landscaping in Rockford, IL | Demo Website";
const pageDescription =
  "Demo landscaping company website with service packages, gallery, seasonal tips, and free quote form.";

const beforeAfter = [
  { title: "Backyard Patio Transformation", desc: "Removed overgrown shrubs, installed paver patio, fire pit, and landscape lighting" },
  { title: "Front Yard Curb Appeal", desc: "New sod, edging, perennial beds, and mulch refresh for a Rockford ranch home" },
  { title: "Hillside Retaining Wall", desc: "Built natural stone retaining wall to fix erosion and create level garden space" },
  { title: "Full Lawn Renovation", desc: "Aerated, overseeded, and fertilized — dead lawn to thick green turf in 6 weeks" },
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
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} size={18} />)}
  </div>
);

const LandscapingDemo: React.FC = () => (
  <DemoLayout demoName="GreenScape Pro" industry="Landscaping" themeColor="#27ae60">
    {/* Hero */}
    <section className="demo-hero" style={{ background: "linear-gradient(135deg, #1a6b3a, #0d3318)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Serving Rockford & Northwest Illinois Since 2015</span>
        <h1 className="demo-hero__title">GreenScape Pro</h1>
        <p className="demo-hero__subtitle">
          Professional landscaping, lawn care, hardscaping, and snow removal. Free estimates,
          satisfaction guaranteed, and the same crew every visit.
        </p>
        <div className="demo-hero__actions">
          <a href="#quote" className="demo-btn demo-btn--primary">Get a Free Quote</a>
          <a href="#gallery" className="demo-btn demo-btn--ghost">View Our Work</a>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats">
          <div><div className="demo-stat__number">500+</div><div className="demo-stat__label">Properties Served</div></div>
          <div><div className="demo-stat__number">8</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
          <div><div className="demo-stat__number">100%</div><div className="demo-stat__label">Satisfaction Guaranteed</div></div>
        </div>
      </div>
    </section>

    {/* Before/After Gallery — the #1 thing landscaping customers want to see */}
    <section className="demo-section demo-section--alt" id="gallery">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Before &amp; After</h2>
        <p className="demo-section__subtitle">Real projects we've completed for homeowners across the Rockford area.</p>
        <div className="demo-before-after">
          {beforeAfter.map((p) => (
            <div key={p.title} className="demo-before-after__item">
              <div className="demo-before-after__images">
                <div className="demo-before-after__before">
                  <span className="demo-before-after__label">Before</span>
                </div>
                <div className="demo-before-after__after">
                  <span className="demo-before-after__label">After</span>
                </div>
              </div>
              <div className="demo-before-after__body">
                <h3 className="demo-before-after__title">{p.title}</h3>
                <p className="demo-before-after__desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process — landscaping customers want to know how it works */}
    <section className="demo-section">
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

    {/* Seasonal Services — landscaping is seasonal, this is industry-specific */}
    <section className="demo-section demo-section--alt">
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
                <ul className="demo-seasonal__list">
                  {s.list.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Service Packages with pricing — landscaping customers want packages */}
    <section className="demo-section">
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
              <li style={{ color: "var(--demo-text-muted)", opacity: 0.5 }}><CheckIcon size={16} /> Fertilization</li>
              <li style={{ color: "var(--demo-text-muted)", opacity: 0.5 }}><CheckIcon size={16} /> Weed control</li>
              <li style={{ color: "var(--demo-text-muted)", opacity: 0.5 }}><CheckIcon size={16} /> Aeration</li>
            </ul>
          </div>
          <div className="demo-plan demo-plan--featured">
            <h3 className="demo-plan__name">Complete Care</h3>
            <div className="demo-plan__price">$89<span className="demo-plan__price-period">/visit</span></div>
            <ul className="demo-plan__features">
              <li><CheckIcon size={16} /> Weekly mowing &amp; edging</li>
              <li><CheckIcon size={16} /> 5-step fertilization program</li>
              <li><CheckIcon size={16} /> Weed &amp; grub control</li>
              <li><CheckIcon size={16} /> Spring &amp; fall cleanup</li>
              <li><CheckIcon size={16} /> Aeration &amp; overseeding</li>
              <li><CheckIcon size={16} /> Priority scheduling</li>
            </ul>
          </div>
          <div className="demo-plan">
            <h3 className="demo-plan__name">Full Service</h3>
            <div className="demo-plan__price">$149<span className="demo-plan__price-period">/visit</span></div>
            <ul className="demo-plan__features">
              <li><CheckIcon size={16} /> Everything in Complete Care</li>
              <li><CheckIcon size={16} /> Garden bed maintenance</li>
              <li><CheckIcon size={16} /> Pruning &amp; trimming</li>
              <li><CheckIcon size={16} /> Mulching (2x/year)</li>
              <li><CheckIcon size={16} /> Snow removal (winter)</li>
              <li><CheckIcon size={16} /> Dedicated account manager</li>
            </ul>
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
              <StarRating />
              <p className="demo-testimonial__text">"{t.text}"</p>
              <div className="demo-testimonial__author">{t.author}</div>
              <div className="demo-testimonial__location">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Service Area — landscaping companies need to show where they work */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Areas We Serve</h2>
        <p className="demo-section__subtitle">Based in Rockford, serving all of Northwest Illinois and Southern Wisconsin.</p>
        <div className="demo-brands">
          {serviceAreas.map((area) => (
            <div key={area} className="demo-brand">{area}</div>
          ))}
        </div>
      </div>
    </section>

    {/* Quote CTA */}
    <section className="demo-contact" id="quote" style={{ background: "#1a6b3a" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Get a Free Quote</h2>
        <p className="demo-contact__text">
          Call us at (815) 555-0456 for a free, no-obligation estimate. We'll come to your property,
          take measurements, and send you a detailed quote within 5 days.
        </p>
        <a href="tel:8155550456" className="demo-btn demo-btn--primary">
          <PhoneIcon size={20} /> Call (815) 555-0456
        </a>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item">
            <MapPinIcon size={20} />
            <span className="demo-contact__info-label">Service Area</span>
            <span>Rockford & NW Illinois</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Hours</span>
            <span>Mon–Sat 7AM–6PM</span>
          </div>
          <div className="demo-contact__info-item">
            <span className="demo-contact__info-label">Email</span>
            <span>quotes@greenscapepro.com</span>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">GreenScape Pro</div>
        <div>Serving Rockford & Northwest Illinois · (815) 555-0456</div>
        <div className="demo-footer__demo-note">
          This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.
          <br />
          <a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a>
        </div>
      </div>
    </footer>
  </DemoLayout>
);

export default LandscapingDemo;

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
        { name: "Landscaping Demo", path: pathname },
      ]}
    />
  );
};
