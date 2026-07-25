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
import { StarIcon, MapPinIcon, PhoneIcon, LeafIcon, SunIcon, ClockIcon, CheckIcon, GearIcon, ToolsIcon, ShieldIcon, BoltIcon, AlertIcon, CalendarIcon } from "../../site/icons";

const pathname = "/demos/agriculture/";
const pageTitle = "Kishwaukee Valley Farm Services — Farm Equipment & Supplies Demo";
const pageDescription = "Demo agriculture website for a fictional farm equipment, parts, and service dealership. Includes illustrative inventory, sample grain prices, and a financing estimator. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "youtube", url: "https://youtube.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "linkedin", url: "https://linkedin.com" },
];

const integrations: Integration[] = [
  { name: "John Deere Operations Center API", category: "Equipment Telemetry", description: "Sample equipment data display. In a production site, customers could log in and see tractor hours, fuel levels, and maintenance alerts.", freeTier: "Free for John Deere equipment owners. API access included with JDLink subscription.", url: "https://deere.com/en/technology-products/precision-ag-technology/operations-center", status: "mocked" },
  { name: "Climate FieldView", category: "Crop Data & Agronomy", description: "Field-level crop data integration example. Shows how a dealer site could display planting maps and yield history alongside recommendations.", freeTier: "Basic free. Plus from $999/year per farm.", url: "https://climate.com", status: "mocked" },
  { name: "Climate FieldView Plus", category: "Yield & Prescription Planting", description: "Variable-rate seeding and fertilizer prescription example. Demonstrates how dealer recommendations could flow to a planter or spreader.", freeTier: "Plus from $999/year. Premium prescription tools from $1,499/year.", url: "https://climate.com/fieldview-plus", status: "mocked" },
  { name: "QuickBooks Online", category: "Accounting & Invoicing", description: "Sync equipment sales, repair invoices, and parts orders. Farm credit accounts bill automatically with 30-day terms. Seasonal payment plans for seed and fertilizer purchases.", freeTier: "From $35/month. 50% off for first 3 months.", url: "https://quickbooks.intuit.com", status: "available" },
  { name: "Shopify Parts Catalog", category: "E-Commerce / Parts Catalog", description: "Online parts catalog with year-make-model lookup. Customers order filters, belts, and wear parts with free in-store pickup or delivery to their farm.", freeTier: "From $39/month. 3-day free trial.", url: "https://shopify.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your service area and delivery routes. Farmers can see if you deliver to their area and estimate delivery days.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "USDA FSA Feed", category: "Government Resources", description: "Sample USDA FSA announcements feed. Production sites can display program deadlines, disaster assistance, and market reports.", freeTier: "Free public API. No authentication required.", url: "https://fsa.usda.gov", status: "mocked" },
  { name: "DTN Markets API", category: "Commodity Prices", description: "Sample grain price ticker for demonstration. Shows how local elevator bids could be displayed with source, timestamp, and disclaimer.", freeTier: "From $89/month for DTN Professional. Market data add-on available.", url: "https://dtn.com", status: "available" },
  { name: "John Deere Financial API", category: "Equipment Financing", description: "Illustrative financing pre-approval form. In production, rate quotes would be based on credit, equipment type, and term and require a real integration.", freeTier: "No cost to dealer. Commission on funded loans.", url: "https://deere.com/en/finance", status: "mocked" },
  { name: "Agrian Crop Protection Registry", category: "Regulatory Compliance", description: "Restricted-use pesticide compliance tracking example. Verify applicator licenses, record applications, and generate EPA-required reports.", freeTier: "From $75/month per location. Compliance reporting add-on available.", url: "https://agrian.com", status: "mocked" },
  { name: "Granular Ag CRM", category: "Farm Management Software", description: "Two-way sync example with Granular farm management platform. Field boundaries, crop plans, and input orders could flow into your CRM.", freeTier: "From $15/acre/year. Minimum 500 acres.", url: "https://granular.ag", status: "mocked" },
  { name: "Farmers Business Network (FBN)", category: "Input Pricing Transparency", description: "Sample input pricing comparison display. FBN anonymized data could be shown alongside your seed and fertilizer quotes.", freeTier: "FBN membership from $700/year per farm. API access for dealers from $200/month.", url: "https://fbn.com", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email payment links for equipment deposits, repair invoices, and parts orders. Accept cards and ACH. Farm credit accounts sync with QuickBooks terms.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
];

const services = [
  { name: "Equipment Sales", desc: "New and used tractors, implements, and combines. John Deere and Case IH dealer. Financing available through John Deere Financial.", icon: GearIcon, img: "equipment-sales" },
  { name: "Equipment Repair", desc: "On-farm and in-shop repair. Tractors, combines, planters, and balers. Factory-trained technicians. Mobile service truck covers the valley.", icon: ToolsIcon, img: "equipment-repair" },
  { name: "Seed & Fertilizer Ordering", desc: "Corn, soybean, and alfalfa seed from Dekalb, Asgrow, and Pioneer. Custom fertilizer blends. Bulk delivery to your farm.", icon: LeafIcon, img: "seed-display" },
  { name: "Soil Testing", desc: "Pull samples, send to lab, and deliver recommendations. GPS-grid sampling available. Fall and spring sampling seasons.", icon: CheckIcon, img: "soil-testing" },
  { name: "Crop Planning Consultation", desc: "Sit down with our agronomist to plan your season — variety selection, planting rates, fertility programs, and rotation strategy.", icon: SunIcon, img: "fertilizer" },
];

const products = [
  { title: "Row Crop Tractors", desc: "130–400 HP John Deere and Case IH", img: "tractor-1" },
  { title: "Plows & Planters", desc: "Great Plains and Sunflower implements", img: "implement-1" },
  { title: "Combine Harvesters", desc: "Used and new — ready for fall", img: "harvester" },
  { title: "Seed Planters", desc: "Precision planting with row command", img: "planter" },
];

const seasonalImages = [
  { label: "Spring Planting", img: "spring-planting" },
  { label: "Fall Harvest", img: "fall-harvest" },
  { label: "Corn Country", img: "corn-field" },
  { label: "Soybean Fields", img: "soybean-field" },
];

const team = [
  { name: "Walt Kishwaukee", role: "Founder & Owner", bio: "Fictional profile for demo purposes. Third-generation farmer and dealer. Started the business in 1972 after his father's dairy operation transitioned to equipment sales.", img: "owner" },
  { name: "Rachel Anderson", role: "Lead Agronomist", bio: "Fictional profile for demo purposes. MS in Agronomy. Helps farmers plan fertility programs and select seed varieties.", img: "farmer-1" },
  { name: "Tom Bruckner", role: "Service Manager", bio: "Fictional profile for demo purposes. John Deere Master Certified technician. Runs the mobile service truck during harvest.", img: "farmer-2" },
  { name: "Jenny Oleson", role: "Parts & Inventory Manager", bio: "Fictional profile for demo purposes. Manages parts inventory for multiple equipment lines and active accounts.", img: "farmer-3" },
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

const equipmentInventory = [
  { model: "John Deere 6120M", hp: "120 HP", status: "In Stock", statusType: "in-stock", price: "$89,500" },
  { model: "Case IH Farmall 120A", hp: "120 HP", status: "In Stock", statusType: "in-stock", price: "$72,000" },
  { model: "John Deere 8R 410", hp: "410 HP", status: "2 on Order", statusType: "on-order", price: "Call for Price" },
  { model: "Kubota M7060", hp: "70 HP", status: "In Stock", statusType: "in-stock", price: "$48,500" },
  { model: "New Holland TD5.120", hp: "117 HP", status: "Used", statusType: "used", price: "$42,000" },
  { model: "John Deere 6155M", hp: "155 HP", status: "Used", statusType: "used", price: "$67,500" },
];

const commodityPrices = [
  { commodity: "Corn", price: "$4.82", unit: "/bu", change: "+$0.03" },
  { commodity: "Soybeans", price: "$11.45", unit: "/bu", change: "-$0.08" },
  { commodity: "Wheat", price: "$5.91", unit: "/bu", change: "+$0.01" },
  { commodity: "Ethanol", price: "$1.89", unit: "/gal", change: "+$0.02" },
];

const faqs: FAQItem[] = [
  { q: "Do you offer equipment financing?", a: "Yes. We partner with John Deere Financial and Case IH Financial for new equipment, offering rates as low as 0% for 36 months on qualifying models. For used equipment, we work with AgChoice Farm Credit and local banks. We can also arrange lease-to-own and seasonal payment plans that align with your harvest income. Use the financing calculator on this page to estimate your monthly payment." },
  { q: "What is your repair turnaround time?", a: "In-shop repairs typically take 3–5 business days during peak season (April–May and September–October). Off-season repairs are usually 1–3 days. For emergency breakdowns during planting or harvest, we dispatch our mobile service truck same-day within 40 miles of Oregon, IL. Call (815) 555-0630 and press 1 for the service department." },
  { q: "Do you offer bulk seed pricing?", a: "Yes. Bulk seed pricing applies to orders of 50+ units (80,000 kernel bags for corn, 140,000 seed units for soybeans). Early-book discounts of 8–12% are available from October through December for the following spring. We also offer volume rebates that are applied to your account at season end." },
  { q: "What areas do you serve?", a: "Our shop is in Oregon, IL, and our mobile service truck covers Forreston, Polo, Ashton, Amboy, Byron, Stillman Valley, Mount Morris, and Dixon in Illinois, plus Brodhead, Clinton, and Edgerton in Wisconsin. Equipment delivery extends 60 miles in any direction. Call us if you're outside that radius — we may still be able to help." },
  { q: "Do you offer emergency breakdown service?", a: "Yes. During planting (April–May) and harvest (September–October), we have a technician on call 7 days a week, 6:00 AM to 8:00 PM. Call (815) 555-0630 and press 1. Our mobile service truck is stocked with common hydraulic hoses, bearings, and electrical parts. We can get most machines running in the field." },
  { q: "Can I see current equipment inventory online?", a: "This demo shows an illustrative sample inventory table with model, status, and price examples. A production site would connect to a dealer management system for real-time availability. Call (815) 555-0630 for current inventory and to schedule a demo or test drive." },
];

const testimonials = [
  { text: "When my planter lost a hydraulic line in the middle of planting season, Kishwaukee Valley had a tech at my farm in 90 minutes. He had the hose in the truck and I was back planting before lunch. That's why I've been a customer for 15 years.", author: "Jim K.", location: "Illustrative review, Forreston, IL" },
  { text: "Their agronomist sat down with me in February and planned my whole fertility program based on soil tests. My soybean yield was up 8 bushels per acre this year. The seed delivery scheduling alone saved me two days of running back and forth.", author: "Sarah B.", location: "Illustrative review, Brodhead, WI" },
  { text: "I bought my John Deere 6120M from them three years ago and the service has been outstanding. They pick it up for maintenance, bring it back, and the financing through John Deere Financial was painless. They understand livestock operations — not just row crop.", author: "Mike D.", location: "Illustrative review, Polo, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const CommodityPriceTicker: React.FC = () => {
  const tickerItems = [...commodityPrices, ...commodityPrices, ...commodityPrices];
  return (
    <div className="demo-financing-calc" style={{ maxWidth: "none", padding: "1.5rem 2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontSize: "1.25rem", margin: 0, fontFamily: "var(--demo-font-heading)" }}>Sample Grain Prices</h3>
        <span style={{ fontSize: "0.75rem", color: "var(--demo-text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <BoltIcon size={14} /> For demonstration only
        </span>
      </div>
      <div style={{ overflow: "hidden", position: "relative", background: "var(--demo-bg)", borderRadius: "var(--demo-radius)", padding: "0.75rem 0", border: "1px solid var(--demo-border)" }}>
        <div style={{ display: "flex", gap: "2.5rem", whiteSpace: "nowrap", animation: "tickerScroll 30s linear infinite", paddingLeft: "100%" }}>
          {tickerItems.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: 600 }}>
              <span style={{ color: "var(--demo-heading)" }}>{item.commodity}</span>
              <span style={{ color: "var(--demo-accent)", fontWeight: 700 }}>{item.price}<span style={{ fontSize: "0.8rem", color: "var(--demo-text-muted)" }}>{item.unit}</span></span>
              <span style={{ fontSize: "0.75rem", color: item.change.startsWith("+") ? "#2d7a2d" : "#c0392b" }}>{item.change}</span>
              <span style={{ color: "var(--demo-border)", margin: "0 0.5rem" }}>|</span>
            </span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--demo-text-muted)", marginTop: "0.75rem", textAlign: "center" }}>
        <strong>Illustrative sample data.</strong> These are placeholder prices for demo layout only. A production site would source live market data with contract, location, commodity, delay, and timestamp from a provider like DTN.
      </p>
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

const EquipmentFinancingCalculator: React.FC = () => {
  const [price, setPrice] = React.useState(89500);
  const [downPct, setDownPct] = React.useState(10);
  const [term, setTerm] = React.useState(60);
  const apr = 4.9;
  const downPayment = price * (downPct / 100);
  const financed = price - downPayment;
  const monthlyRate = apr / 100 / 12;
  const monthly = financed > 0 ? (financed * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1) : 0;
  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="demo-financing-calc">
      <h3 className="demo-financing-calc__title">Equipment Financing Estimator</h3>
      <p className="demo-financing-calc__subtitle">Illustrative monthly-payment estimate. Real rates depend on credit, equipment, term, and lender.</p>
      <div className="demo-financing-calc__slider-row">
        <label className="demo-financing-calc__slider-label" htmlFor="equip-price"><span>Equipment Price</span><span className="demo-financing-calc__slider-value">{fmt(price)}</span></label>
        <input id="equip-price" className="demo-financing-calc__slider" type="range" min="20000" max="200000" step="5000" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__slider-row">
        <label className="demo-financing-calc__slider-label" htmlFor="equip-down"><span>Down Payment ({downPct}%)</span><span className="demo-financing-calc__slider-value">{fmt(downPayment)}</span></label>
        <input id="equip-down" className="demo-financing-calc__slider" type="range" min="0" max="50" step="5" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} />
      </div>
      <div className="demo-financing-calc__slider-row">
        <label className="demo-financing-calc__slider-label" htmlFor="equip-term"><span>Term</span><span className="demo-financing-calc__slider-value">{term} months</span></label>
        <input id="equip-term" className="demo-financing-calc__slider" type="range" min="24" max="72" step="12" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--demo-text-muted)", marginBottom: "0.5rem" }}>
        <span>Amount Financed: <strong style={{ color: "var(--demo-heading)" }}>{fmt(financed)}</strong></span>
        <span>APR: <strong style={{ color: "var(--demo-heading)" }}>{apr}%</strong></span>
      </div>
      <div className="demo-financing-calc__result">
        <div className="demo-financing-calc__result-label">Estimated Monthly Payment</div>
        <div className="demo-financing-calc__result-value">{fmt(monthly)}<span className="demo-financing-calc__result-period">/mo</span></div>
      </div>
      <div className="demo-financing-calc__note">This is a demo calculator. The 4.9% APR and monthly payment are illustrative only. Real financing requires an application, credit review, and a formal quote from John Deere Financial, AgChoice, or another lender. Call (815) 555-0630 for current programs.</div>
    </div>
  );
};

const ServiceRequestForm: React.FC = () => {
  const [equipmentType, setEquipmentType] = React.useState("");
  const [urgency, setUrgency] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="demo-financing-calc" style={{ maxWidth: "600px" }}>
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <CheckIcon size={48} />
          <h3 style={{ marginTop: "1rem", fontFamily: "var(--demo-font-heading)" }}>Service Request Received</h3>
          <p style={{ color: "var(--demo-text-muted)", marginTop: "0.5rem" }}>Our service department will call you within 2 hours during business hours. For emergency breakdowns during planting or harvest, call (815) 555-0630 and press 1.</p>
          <button className="demo-form__submit" style={{ maxWidth: "250px", margin: "1.5rem auto 0" }} onClick={() => setSubmitted(false)}>Submit Another Request</button>
        </div>
      </div>
    );
  }
  return (
    <div className="demo-financing-calc" style={{ maxWidth: "600px" }}>
      <h3 className="demo-financing-calc__title">Service Request Form</h3>
      <p className="demo-financing-calc__subtitle">Tell us about your equipment and what's going on. We'll get back to you fast.</p>
      <form onSubmit={handleSubmit}>
        <div className="demo-form__row">
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-equipment-type">Equipment Type *</label>
            <select id="svc-equipment-type" className="demo-form__select" value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} required>
              <option value="">Select type...</option>
              <option value="Tractor">Tractor</option>
              <option value="Combine">Combine</option>
              <option value="Planter">Planter</option>
              <option value="Baler">Baler</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-urgency">Urgency Level *</label>
            <select id="svc-urgency" className="demo-form__select" value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
              <option value="">Select urgency...</option>
              <option value="Emergency">Emergency breakdown</option>
              <option value="Scheduled">Scheduled service</option>
              <option value="Routine">Routine maintenance</option>
            </select>
          </div>
        </div>
        <div className="demo-form__row">
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-make">Make</label>
            <input id="svc-make" className="demo-form__input" type="text" placeholder="John Deere, Case IH, Kubota..." />
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-model">Model</label>
            <input id="svc-model" className="demo-form__input" type="text" placeholder="6120M, Farmall 120A..." />
          </div>
        </div>
        <div className="demo-form__field">
          <label className="demo-form__label" htmlFor="svc-year">Year</label>
          <input id="svc-year" className="demo-form__input" type="text" placeholder="2019" />
        </div>
        <div className="demo-form__field">
          <label className="demo-form__label" htmlFor="svc-issue">Issue Description *</label>
          <textarea id="svc-issue" className="demo-form__textarea" rows={3} placeholder="Describe what's happening — won't start, hydraulic leak, PTO won't engage..." required />
        </div>
        <div className="demo-form__row">
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-name">Your Name *</label>
            <input id="svc-name" className="demo-form__input" type="text" required />
          </div>
          <div className="demo-form__field">
            <label className="demo-form__label" htmlFor="svc-phone">Phone *</label>
            <input id="svc-phone" className="demo-form__input" type="tel" placeholder="(815) 555-0000" required />
          </div>
        </div>
        <div className="demo-form__field">
          <label className="demo-form__label" htmlFor="svc-date"><CalendarIcon size={14} /> Preferred Service Date</label>
          <input id="svc-date" className="demo-form__input" type="date" />
        </div>
        <button type="submit" className="demo-form__submit">Submit Service Request</button>
        <p style={{ fontSize: "0.75rem", color: "var(--demo-text-muted)", textAlign: "center", marginTop: "0.75rem" }}>
          <AlertIcon size={12} /> Emergency breakdown? Don't wait — call <a href="tel:8155550630" style={{ color: "var(--demo-accent)", fontWeight: 700 }}>(815) 555-0630</a> and press 1 for immediate dispatch.
        </p>
      </form>
    </div>
  );
};

const AgricultureDemo: React.FC = () => (
  <DemoLayout demoName="Kishwaukee Valley Farm Services" industry="Agriculture / Farm Supply" themeColor="#4a7c3a" designSystem="organic">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/agriculture/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Independent Equipment Service, Parts & Used Equipment · Kishwaukee Valley</span>
        <h1 className="demo-hero__title">Kishwaukee Valley Farm Services</h1>
        <p className="demo-hero__subtitle">Fictional demo of a farm-equipment dealer serving the Kishwaukee Valley. On-site repair, parts counter, and used-equipment inventory — with transparent service status and seasonal checklists.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550630" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0630</a>
          <a href="#services" className="demo-btn demo-btn--ghost">View Services</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#3d2618", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> Kishwaukee Valley Farm Services is a fictional business concept created by Bradley Matera. Team, reviews, images, inventory, and interactive features are illustrative.
    </div>

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

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Current Conditions</h2>
        <p className="demo-section__subtitle">Soil temperatures and weather conditions drive every farming decision. Here's what it looks like in the valley right now.</p>
        <div style={{ maxWidth: "450px", margin: "0 auto" }}>
          <WeatherWidget city="Oregon" temp={58} condition="sunny" context="agriculture" />
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Today's Grain Prices</h2>
        <p className="demo-section__subtitle">Know what your crop is worth before you sell. Live local elevator bids powered by DTN Markets.</p>
        <CommodityPriceTicker />
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/agriculture/farm-shop.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Our Shop on Route 64</h2>
            <p className="demo-split-image-text__text">Our 12,000-square-foot dealership sits on IL Route 64 in Oregon, IL — 20 miles south of Rockford, 15 miles north of Dixon. The showroom has the latest John Deere and Case IH models, the parts counter is stocked with 8,000+ SKUs, and the service bay has four lifts and a drive-through wash bay.</p>
            <p className="demo-split-image-text__text">Outside, the equipment lot showcases used and new inventory — tractors, combines, planters, and implements ready for demo or delivery. Come kick the tires.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt" id="services">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Everything your farm needs, under one roof. From the field to the shop, we've got you covered.</p>
        <div className="demo-services-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="demo-service-card">
                <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/agriculture/${s.img}.jpg)` }} />
                <div className="demo-service-card__body">
                  <div className="demo-service-card__icon"><Icon size={28} /></div>
                  <h3 className="demo-service-card__name">{s.name}</h3>
                  <p className="demo-service-card__desc">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/agriculture/corn-field.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Serving the Kishwaukee Valley Since 1972</h2>
        <p className="demo-feature-image__text">From the Rock River bottomlands to the rolling hills of Ogle County — we know this ground because we farm it too.</p>
      </div>
    </div>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Equipment Inventory</h2>
        <p className="demo-section__subtitle">Illustrative sample inventory below. A production site would pull live stock from a dealer management system. Call (815) 555-0630 for current availability and to schedule a demo.</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Sample equipment inventory">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Model</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Horsepower</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Availability</th>
                <th style={{ textAlign: "right", padding: "0.75rem", fontWeight: 600 }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {equipmentInventory.map((item) => (
                <tr key={item.model} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{item.model}</td>
                  <td style={{ padding: "0.75rem" }}>{item.hp}</td>
                  <td style={{ padding: "0.75rem" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.6rem",
                      borderRadius: "999px",
                      background: item.statusType === "in-stock" ? "rgba(45, 122, 45, 0.12)" : item.statusType === "on-order" ? "rgba(200, 150, 0, 0.12)" : "rgba(100, 100, 100, 0.12)",
                      color: item.statusType === "in-stock" ? "#2d7a2d" : item.statusType === "on-order" ? "#b8860b" : "var(--demo-text-muted)",
                    }}>
                      {item.statusType === "in-stock" && <CheckIcon size={14} />}
                      {item.statusType === "on-order" && <ClockIcon size={14} />}
                      {item.statusType === "used" && <GearIcon size={14} />}
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: 700, color: "var(--demo-accent)" }}>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--demo-text-muted)", marginTop: "1rem", textAlign: "center" }}>
          Prices, status, and availability are illustrative for this demo. Real inventory changes daily. Call (815) 555-0630 for current stock, pricing, and trade-in appraisal.
        </p>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Equipment Showcase</h2>
        <p className="demo-section__subtitle">Illustrative example categories. These photos represent the type of equipment a dealer would carry — not live listings.</p>
        <div className="demo-food-gallery">
          {products.map((p) => (
            <div key={p.title} className="demo-food-gallery__item" style={{ backgroundImage: `url(/images/demos/agriculture/${p.img}.jpg)` }}>
              <span className="demo-food-gallery__label">{p.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Fast Equipment Repair When You Need It</h2>
            <p className="demo-split-image-text__text">During planting and harvest, downtime costs you money. Our mobile service truck is stocked with common hydraulic hoses, bearings, and electrical parts — we can get most machines running in the field.</p>
            <p className="demo-split-image-text__text">Factory-trained technicians. John Deere Master Certified. We work on everything from 25-HP compacts to 400-HP row crop tractors, combines, planters, and balers.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/agriculture/equipment-repair.jpg)" }} />
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Equipment Financing</h2>
        <p className="demo-section__subtitle">Don't let cash flow keep you from the equipment you need. Estimate your monthly payment and apply through John Deere Financial.</p>
        <EquipmentFinancingCalculator />
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Product Categories</h2>
        <p className="demo-section__subtitle">We stock the brands you trust and the parts you need. Special orders welcome — most arrive in 2–3 days.</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
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

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Seasonal Resources</h2>
        <p className="demo-section__subtitle">Timely tips and service reminders for each season. Bookmark this page — we update it monthly.</p>
        <div className="demo-services-grid">
          {seasonalFeatures.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.season} className="demo-service-card">
                <div className="demo-service-card__icon"><Icon size={32} /></div>
                <h3 className="demo-service-card__name">{s.season}</h3>
                <ul style={{ paddingLeft: "1.25rem", fontSize: "0.9rem", lineHeight: 1.7, margin: "0.5rem 0" }}>
                  {s.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Through the Seasons</h2>
        <p className="demo-section__subtitle">The Kishwaukee Valley changes with the seasons — and so do we. Here's what the valley looks like throughout the year.</p>
        <div className="demo-food-gallery">
          {seasonalImages.map((s) => (
            <div key={s.label} className="demo-food-gallery__item" style={{ backgroundImage: `url(/images/demos/agriculture/${s.img}.jpg)` }}>
              <span className="demo-food-gallery__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/agriculture/fall-harvest.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Harvest Season is Coming</h2>
        <p className="demo-feature-image__text">Book your combine inspection and yield monitor calibration by August 15. We'll make sure you're ready when the corn hits 25% moisture.</p>
      </div>
    </div>

    <section className="demo-section" id="service-request">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Request Service</h2>
        <p className="demo-section__subtitle">Tractor won't start? Combine making a noise? Tell us about it and we'll get you back in the field.</p>
        <ServiceRequestForm />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Team</h2>
        <p className="demo-section__subtitle">The people who keep your farm running. Experienced, certified, and local.</p>
        <div className="demo-team-grid">
          {team.map((member) => (
            <div key={member.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(/images/demos/agriculture/${member.img}.jpg)` }} />
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

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Kishwaukee Valley Farm Services</div>
        <div>485 IL Route 64, Oregon, IL 61061 · (815) 555-0630</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
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
