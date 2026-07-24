import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import DemoLayout from "../../features/demos/DemoLayout";
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, TreeIcon, SnowflakeIcon, DropletIcon, FlameIcon } from "../../site/icons";

const pathname = "/demos/landscaping/";
const pageTitle = "GreenScape Pro — Professional Landscaping in Rockford, IL | Demo Website";
const pageDescription =
  "Demo landscaping company website with service packages, gallery, seasonal tips, and free quote form.";

const services = [
  { Icon: LeafIcon, name: "Lawn Care & Mowing", desc: "Weekly mowing, edging, fertilization, and weed control to keep your lawn healthy and green all season.", price: "from $45/visit" },
  { Icon: TreeIcon, name: "Tree & Shrub Care", desc: "Pruning, trimming, tree removal, and stump grinding by certified arborists.", price: "from $120" },
  { Icon: FlameIcon, name: "Hardscaping", desc: "Patios, retaining walls, walkways, and fire pits built with natural stone and pavers.", price: "from $2,500" },
  { Icon: DropletIcon, name: "Irrigation Systems", desc: "Installation, repair, and winterization of sprinkler systems for efficient watering.", price: "from $1,800" },
  { Icon: LeafIcon, name: "Garden Design", desc: "Custom flower beds, perennial gardens, and seasonal color rotation designed for your space.", price: "from $650" },
  { Icon: SnowflakeIcon, name: "Snow Removal", desc: "Driveway and sidewalk plowing, salting, and ice management for residential and commercial.", price: "from $35/visit" },
];

const testimonials = [
  { text: "GreenScape transformed our backyard. The patio and garden design exceeded our expectations. Worth every penny.", author: "Jennifer M.", location: "Byron, IL" },
  { text: "Reliable, professional, and reasonably priced. They show up when they say they will and the lawn has never looked better.", author: "Dave T.", location: "Rockford, IL" },
  { text: "After the big snowstorm last winter, they were out at 5 AM clearing our driveway. Best snow removal service in the area.", author: "Patricia L.", location: "Machesney Park, IL" },
];

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
          Professional landscaping, lawn care, hardscaping, and snow removal for homes and businesses
          across the Rockford area. Free estimates, satisfaction guaranteed.
        </p>
        <div className="demo-hero__actions">
          <a href="#quote" className="demo-btn demo-btn--primary">Get a Free Quote</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
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

    {/* Services */}
    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Full-service landscaping for residential and commercial properties. Year-round care.</p>
        <div className="demo-services">
          {services.map((s) => {
            const { Icon } = s;
            return (
              <div key={s.name} className="demo-service">
                <div className="demo-service__icon"><Icon size={28} /></div>
                <h3 className="demo-service__name">{s.name}</h3>
                <p className="demo-service__desc">{s.desc}</p>
                <div className="demo-service__price">{s.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* About */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-about">
          <div className="demo-about__image" style={{ background: "linear-gradient(135deg, #1a6b3a, #0d3318)" }} />
          <div>
            <h2 className="demo-about__title">Locally Owned. Locally Trusted.</h2>
            <p className="demo-about__text">
              GreenScape Pro was founded in 2015 by a Rockford native who grew up mowing lawns in
              Winnebago County. What started as a summer job is now a full-service landscaping
              company serving over 500 properties across Northwest Illinois.
            </p>
            <p className="demo-about__text">
              We're not a franchise or a faceless corporation. When you call, you talk to the owner.
              When we show up, it's the same crew every time. And when we say we'll be there, we're
              there — rain, shine, or snow.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Seasonal Tips */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Seasonal Lawn Tips</h2>
        <p className="demo-section__subtitle">Free advice from our team to keep your yard looking great year-round.</p>
        <div className="demo-faq">
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">Spring (March–May)</h3>
            <p className="demo-faq__answer">Aerate your lawn, apply pre-emergent crabgrass control, and seed bare spots. Clean up winter debris and trim back perennials before new growth starts.</p>
          </div>
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">Summer (June–August)</h3>
            <p className="demo-faq__answer">Water deeply 2-3 times per week rather than daily shallow watering. Mow at 3.5 inches to shade roots and retain moisture. Watch for grub damage in late July.</p>
          </div>
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">Fall (September–November)</h3>
            <p className="demo-faq__answer">Fall fertilization is the most important feeding of the year. Aerate again, overseed thin areas, and don't let leaves smother the grass — mulch or remove them.</p>
          </div>
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">Winter (December–February)</h3>
            <p className="demo-faq__answer">Stay off frozen grass to prevent damage. Mark driveway edges with stakes before snow falls. Book snow removal service early — we fill up by October.</p>
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

    {/* Quote CTA */}
    <section className="demo-contact" id="quote" style={{ background: "#1a6b3a" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Get a Free Quote</h2>
        <p className="demo-contact__text">
          Call us at (815) 555-0456 for a free, no-obligation estimate. We serve Rockford, Loves Park,
          Machesney Park, Byron, Roscoe, and the surrounding Northwest Illinois area.
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
