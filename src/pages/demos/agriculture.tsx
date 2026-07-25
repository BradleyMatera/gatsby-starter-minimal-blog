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
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, SunIcon, ClockIcon, CheckIcon, GearIcon, ToolsIcon, ShieldIcon } from "../../site/icons";

const pathname = "/demos/agriculture/";
const pageTitle = "Kishwaukee Valley Farm Services — Agricultural Equipment & Supplies | Demo Website";
const pageDescription = "Demo agriculture website for a farm supply company — equipment sales, repair services, seed/fertilizer ordering, and crop planning resources. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "youtube", url: "https://youtube.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "linkedin", url: "https://linkedin.com" },
];

const integrations: Integration[] = [
  { name: "John Deere Operations Center API", category: "Equipment Telemetry", description: "Live equipment data streamed to your site. Customers log in and see their tractor hours, fuel levels, and maintenance alerts. Service department gets auto-notified when a machine needs an oil change.", freeTier: "Free for John Deere equipment owners. API access included with JDLink subscription.", url: "https://deere.com/en/technology-products/precision-ag-technology/operations-center", status: "mocked" },
  { name: "Climate FieldView", category: "Crop Data & Agronomy", description: "Integrate field-level crop data, planting maps, and yield history. Customers can view their FieldView data alongside your seed and fertilizer recommendations.", freeTier: "Basic free. Plus from $999/year per farm.", url: "https://climate.com", status: "mocked" },
  { name: "QuickBooks Online", category: "Accounting & Invoicing", description: "Sync equipment sales, repair invoices, and parts orders. Farm credit accounts bill automatically with 30-day terms. Seasonal payment plans for seed and fertilizer purchases.", freeTier: "From $35/month. 50% off for first 3 months.", url: "https://quickbooks.intuit.com", status: "available" },
  { name: "Shopify (Parts Ordering)", category: "E-Commerce / Parts Catalog", description: "Online parts catalog with year-make-model lookup. Customers order filters, belts, and wear parts with free in-store pickup or delivery to their farm.", freeTier: "From $39/month. 3-day free trial.", url: "https://shopify.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your service area and delivery routes. Farmers can see if you deliver to their area and estimate delivery days.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "USDA Farm Service Agency Feed", category: "Government Resources", description: "Live feed of USDA FSA announcements — program deadlines, disaster assistance, and market reports. Auto-displayed on your resources page so farmers always see current info.", freeTier: "Free public API. No authentication required.", url: "https://fsa.usda.gov", status: "mocked" },
  { name: "DTN Markets API", category: "Commodity Prices", description: "Live grain prices (corn, soybeans, wheat) displayed on your homepage. Farmers see current local elevator bids without leaving your site.", freeTier: "From $89/month for DTN Professional. Market data add-on available.", url: "https://dtn.com", status: "available" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email payment links for equipment deposits, repair invoices, and parts orders. Accept cards and ACH. Farm credit accounts sync with QuickBooks terms.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
];

const services = [
  { name: "Equipment Sales", desc: "New and used tractors, implements, and combines. John Deere and Case IH dealer. Financing available through John Deere Financial.", icon: GearIcon },
  { name: "Equipment Repair", desc: "On-farm and in-shop repair. Tractors, combines, planters, and balers. Factory-trained technicians. Mobile service truck covers the valley.", icon: ToolsIcon },
  { name: "Seed & Fertilizer Ordering", desc: "Corn, soybean, and alfalfa seed from Dekalb, Asgrow, and Pioneer. Custom fertilizer blends. Bulk delivery to your farm.", icon: LeafIcon },
  { name: "Soil Testing", desc: "Pull samples, send to lab, and deliver recommendations. GPS-grid sampling available. Fall and spring sampling seasons.", icon: CheckIcon },
  { name: "Crop Planning Consultation", desc: "Sit down with our agronomist to plan your season — variety selection, planting rates, fertility programs, and rotation strategy.", icon: SunIcon },
];

const productCategories = [
  { category: "Tractors", brands: "John Deere, Case IH", items: "Compact (25–45 HP), Utility (50–125 HP), Row Crop (130–400+ HP). New and used inventory." },
  { category: "Implements", brands: "John Deere, Sunflower, Great Plains", items: "Plows, planters, grain drills, field cultivators, discs, mowers, rakes, balers." },
  { category: "Seed", brands: "Dekalb, Asgrow, Pioneer, Croplan", items: "Corn (110–115 day), soybeans (2.8–3.5 maturity), alfalfa, wheat, and cover crops." },
  { category: "Fertilizer", brands: "Nutrien, CHS, The Mosaic Company", items: "Dry blends, liquid nitrogen, MAP, DAP, potash, and custom prescription blends." },
  { category: "Parts", brands: "John Deere, Case IH, A&I Products", items: "Filters, belts, bearings, hydraulic hoses, mower blades, and planter wear parts." },
  { category: "Crop Protection", brands: "BASF, Bayer, Corteva, Syngenta", items: "Herbicides, fungicides, insecticides, and adjuvants. Restricted-use products with applicator license." },
];

const seasonalFeatures = [
  { season: "Spring Planting", icon: SunIcon, tips: [
    "Planter tune-up checklist — replace worn seed tubes, check metering units, calibrate down pressure",
    "Pre-plant soil sampling — book by March 15 for results before planting",
    "Seed delivery scheduling — reserve your delivery slot early, April fills up fast",
    "Starter fertilizer blends — custom-mixed for your soil test results",
  ]},
  { season: "Fall Harvest", icon: GearIcon, tips: [
    "Combine inspection — pre-harvest check of sieves, concaves, and knife sections",
    "Grain cart and wagon service — bearings, tires, and unloading augers",
    "Yield monitor calibration — stop by with your combine for a 30-minute calibration",
    "Post-harvest fertilizer — fall application booking opens August 1",
  ]},
  { season: "Winter Maintenance", icon: ToolsIcon, tips: [
    "Off-season tractor service — save 10% on labor December through February",
    "Equipment storage prep — fuel stabilizer, battery tender, and rodent prevention",
    "Tax-year-end purchases — Section 179 qualifying equipment in stock",
    "Spring order booking — lock in seed and fertilizer pricing for next season",
  ]},
];

const faqs: FAQItem[] = [
  { q: "Do you offer equipment financing?", a: "Yes. We partner with John Deere Financial and Case IH Financial for new equipment, offering rates as low as 0% for 36 months on qualifying models. For used equipment, we work with AgChoice Farm Credit and local banks. We can also arrange lease-to-own and seasonal payment plans that align with your harvest income." },
  { q: "What is your repair turnaround time?", a: "In-shop repairs typically take 3–5 business days during peak season (April–May and September–October). Off-season repairs are usually 1–3 days. For emergency breakdowns during planting or harvest, we dispatch our mobile service truck same-day within 40 miles of Oregon, IL. Call (815) 555-0630 and press 1 for the service department." },
  { q: "Do you offer bulk seed pricing?", a: "Yes. Bulk seed pricing applies to orders of 50+ units (80,000 kernel bags for corn, 140,000 seed units for soybeans). Early-book discounts of 8–12% are available from October through December for the following spring. We also offer volume rebates that are applied to your account at season end." },
  { q: "What areas do you serve?", a: "Our shop is in Oregon, IL, and our mobile service truck covers Forreston, Polo, Ashton, Amboy, Byron, Stillman Valley, Mount Morris, and Dixon in Illinois, plus Brodhead, Clinton, and Edgerton in Wisconsin. Equipment delivery extends 60 miles in any direction. Call us if you're outside that radius — we may still be able to help." },
  { q: "Do you offer emergency breakdown service?", a: "Yes. During planting (April–May) and harvest (September–October), we have a technician on call 7 days a week, 6:00 AM to 8:00 PM. Call (815) 555-0630 and press 1. Our mobile service truck is stocked with common hydraulic hoses, bearings, and electrical parts. We can get most machines running in the field." },
];

const testimonials = [
  { text: "When my planter lost a hydraulic line in the middle of planting season, Kishwaukee Valley had a tech at my farm in 90 minutes. He had the hose in the truck and I was back planting before lunch. That's why I've been a customer for 15 years.", author: "Jim K.", location: "Corn & Soybean Farmer, Forreston, IL" },
  { text: "Their agronomist sat down with me in February and planned my whole fertility program based on soil tests. My soybean yield was up 8 bushels per acre this year. The seed delivery scheduling alone saved me two days of running back and forth.", author: "Sarah B.", location: "Dairy Operation, Brodhead, WI" },
  { text: "I bought my John Deere 6120M from them three years ago and the service has been outstanding. They pick it up for maintenance, bring it back, and the financing through John Deere Financial was painless. They understand livestock operations — not just row crop.", author: "Mike D.", location: "Livestock Rancher, Polo, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const AgricultureDemo: React.FC = () => (
  <DemoLayout demoName="Kishwaukee Valley Farm Services" industry="Agriculture / Farm Supply" themeColor="#4a7c3a" designSystem="organic">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/agriculture/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">John Deere & Case IH Dealer · Serving the Kishwaukee Valley Since 1972</span>
        <h1 className="demo-hero__title">Kishwaukee Valley Farm Services</h1>
        <p className="demo-hero__subtitle">Equipment sales, repair, seed, fertilizer, and agronomy services for farms across Ogle County and Southern Wisconsin. Located on IL Route 64 in Oregon, IL — 20 miles south of Rockford, 15 miles north of Dixon.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550630" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0630</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Features at a glance</h2>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Kishwaukee Valley Farm Services features at a glance">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Equipment sales pages</td>
                <td style={{ padding: "0.75rem" }}>New and used inventory with specs, photos, and financing options. John Deere and Case IH dealer.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Repair service booking</td>
                <td style={{ padding: "0.75rem" }}>Online repair scheduling with equipment type, issue description, and preferred date. Mobile service truck dispatch.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Seed & fertilizer ordering</td>
                <td style={{ padding: "0.75rem" }}>Online ordering with bulk pricing, delivery scheduling, and early-book discounts. Prescription blend mixing.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Seasonal resource guides</td>
                <td style={{ padding: "0.75rem" }}>Spring planting, fall harvest, and winter maintenance checklists with tips and service specials.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Equipment telemetry</td>
                <td style={{ padding: "0.75rem" }}>John Deere Operations Center integration — customers see tractor hours and maintenance alerts on your site.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Commodity prices feed</td>
                <td style={{ padding: "0.75rem" }}>Live local grain prices (corn, soybeans, wheat) displayed on the homepage via DTN Markets API.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Emergency breakdown line</td>
                <td style={{ padding: "0.75rem" }}>Dedicated service line during planting and harvest with mobile dispatch and field repair capability.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>SEO setup</td>
                <td style={{ padding: "0.75rem" }}>LocalBusiness schema, service area pages for each town, Google Business Profile, and seasonal content landing pages.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">52</div><div className="demo-stat__label">Years Serving Farmers</div></div>
          <div><div className="demo-stat__number">1,200+</div><div className="demo-stat__label">Farms Served</div></div>
          <div><div className="demo-stat__number">7</div><div className="demo-stat__label">Service Technicians</div></div>
          <div><div className="demo-stat__number">4.8</div><div className="demo-stat__label">Google Rating</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.8} googleReviewCount={89} yelpRating={4.5} yelpReviewCount={23} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><CheckIcon size={20} /> John Deere Dealer</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> Case IH Dealer</span>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> Licensed Pesticide Applicator</span>
        </div>
      </div>
    </section>

    <section className="demo-section" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Everything your farm needs, under one roof. From the field to the shop, we've got you covered.</p>
        <div className="demo-services-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="demo-service-card">
                <div className="demo-service-card__icon"><Icon size={32} /></div>
                <h3 className="demo-service-card__title">{s.name}</h3>
                <p className="demo-service-card__desc">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Product Categories</h2>
        <p className="demo-section__subtitle">We stock the brands you trust and the parts you need. Special orders welcome — most arrive in 2–3 days.</p>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Product categories">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Category</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Brands</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>What We Carry</th>
              </tr>
            </thead>
            <tbody>
              {productCategories.map((p) => (
                <tr key={p.category} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{p.category}</td>
                  <td style={{ padding: "0.75rem" }}>{p.brands}</td>
                  <td style={{ padding: "0.75rem" }}>{p.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Seasonal Resources</h2>
        <p className="demo-section__subtitle">Timely tips and service reminders for each season. Bookmark this page — we update it monthly.</p>
        <div className="demo-services-grid">
          {seasonalFeatures.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.season} className="demo-service-card">
                <div className="demo-service-card__icon"><Icon size={32} /></div>
                <h3 className="demo-service-card__title">{s.season}</h3>
                <ul style={{ paddingLeft: "1.25rem", fontSize: "0.9rem", lineHeight: 1.7, margin: "0.5rem 0" }}>
                  {s.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>

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

    <FAQSection faqs={faqs} />

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Service Area</h2>
        <p className="demo-section__subtitle">Based in Oregon, IL. Mobile service covers Ogle County and Southern Wisconsin. Equipment delivery within 60 miles.</p>
        <GoogleMapsEmbed address="Oregon, IL" height={300} title="Kishwaukee Valley Farm Services service area" />
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.95rem" }}>
          <span><MapPinIcon size={18} /> 485 IL Route 64, Oregon, IL 61061</span>
          <span><PhoneIcon size={18} /> (815) 555-0630</span>
          <span><ClockIcon size={18} /> Mon–Fri 7:00 AM – 5:30 PM · Sat 7:00 AM – Noon</span>
        </div>
      </div>
    </section>

    <IntegrationsSection industry="agriculture & farm supply" integrations={integrations} />

    <section className="demo-contact" style={{ background: "#2d4a22" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Need Parts, Service, or a New Tractor?</h2>
        <p className="demo-contact__text">Call (815) 555-0630 or stop by the shop on Route 64 in Oregon. During planting and harvest, our service line is open 7 days a week.</p>
        <a href="tel:8155550630" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0630</a>
        <div style={{ marginTop: "1.5rem" }}>
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </section>
  </DemoLayout>
);

export default AgricultureDemo;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  return (
    <Seo
      title={pageTitle}
      description={pageDescription}
      pathname={pathname}
      canonicalUrl={pageUrl}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Demos", path: "/demos/" },
        { name: "Agriculture", path: pathname },
      ]}
    />
  );
};
