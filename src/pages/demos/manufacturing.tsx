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
import { StarIcon, MapPinIcon, PhoneIcon, GearIcon, ShieldIcon, CheckIcon, ClockIcon, BoltIcon, DownloadIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/manufacturing/";
const pageTitle = "Sterling Metalworks — Metal Fabrication Shop Demo";
const pageDescription = "Demo metal fabrication shop website with capabilities, equipment list, certifications, and RFQ form example. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "linkedin", url: "https://linkedin.com" },
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

const integrations: Integration[] = [
  { name: "E2 Shop System", category: "ERP / Shop Management", description: "Example ERP integration. A production quote form could feed directly into job scheduling, material tracking, and invoicing.", freeTier: "From $7,995 one-time + annual support. Cloud version from $199/month.", url: "https://e2shopsystem.com", status: "mocked" },
  { name: "QuickBooks Online", category: "Accounting & Invoicing", description: "Sync invoices, purchase orders, and vendor payments between your shop system and QuickBooks.", freeTier: "From $35/month. 50% off for first 3 months.", url: "https://quickbooks.intuit.com", status: "available" },
  { name: "Salesforce CRM", category: "Customer Relationship Management", description: "CRM integration example. Quote-form submissions could create leads and assign them by industry segment.", freeTier: "Starter from $25/user/month. 30-day free trial.", url: "https://salesforce.com", status: "mocked" },
  { name: "Shopify B2B Portal", category: "E-Commerce / B2B Portal", description: "Customer self-service portal example for reordering parts, checking order status, and downloading invoices.", freeTier: "From $39/month. 3-day free trial.", url: "https://shopify.com", status: "available" },
  { name: "Autodesk Fusion 360 Viewer", category: "CAD / Design Collaboration", description: "Example 3D model viewer. Customers could upload STEP or DWG files and see them rendered in-browser for quoting.", freeTier: "Free for personal use. Commercial from $545/year.", url: "https://autodesk.com/fusion-360", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your shop location and delivery radius. Customers see if you're within trucking distance before requesting a quote.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "ISO 9001 Certification Badge", category: "Trust & Verification", description: "Example certification badge. Real ISO 9001 certification would link to the registrar's verification page.", freeTier: "ISO 9001 certification from $3,000–$10,000 (registrar fees).", url: "https://iso.org/standard/62085.html", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email payment links with invoices. Customers pay by card or ACH for deposits and final payments.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
  { name: "Xometry / Protolabs Quote Comparison API", category: "Overflow Quoting", description: "Example overflow quoting integration. In production, quotes could be compared from Xometry or Protolabs when capacity is full.", freeTier: "API access free. Xometry takes 10–20% margin on routed jobs.", url: "https://xometry.com", status: "mocked" },
  { name: "Thomasnet Supplier Profile", category: "B2B Buyer Discovery", description: "Example Thomasnet supplier profile. A real listing would be verified and could feed RFQs into your CRM.", freeTier: "Basic listing free. Premium from $4,200/year.", url: "https://thomasnet.com", status: "available" },
  { name: "Made in USA Certified", category: "Domestic Manufacturing Verification", description: "Example domestic-manufacturing badge. Real certifications require third-party verification and FTC-compliant claims.", freeTier: "Certification from $895/year. Includes FTC compliance review.", url: "https://madeinusa.com", status: "mocked" },
  { name: "FedEx Freight Quote API", category: "Shipping & Logistics", description: "Example LTL freight-quote integration. A production site could calculate shipping based on weight, dimensions, and ZIP for landed-cost estimates.", freeTier: "API free with FedEx account. Discounted freight rates up to 70% off.", url: "https://fedex.com/freight", status: "available" },
  { name: "Dropbox / Google Drive File Sharing", category: "CAD File Transfer Portal", description: "Example secure CAD file portal for customers to upload STEP, DWG, IGES, and PDF drawings.", freeTier: "Dropbox Business from $15/user/month. Google Drive 15GB free.", url: "https://dropbox.com/business", status: "available" },
];

const equipment = [
  { machine: "Haas VF-2 VMC (example)", type: "CNC Mill", capacity: "Illustrative capacity — verify with real machine specs", qty: 2 },
  { machine: "Haas ST-20 Lathe (example)", type: "CNC Turning", capacity: "Illustrative capacity — verify with real machine specs", qty: 1 },
  { machine: "Trumpf TruLaser 3030 (example)", type: "Fiber Laser", capacity: "Illustrative capacity — verify with real machine specs", qty: 1 },
  { machine: "Amada HG-1003 Press Brake (example)", type: "Press Brake", capacity: "Illustrative capacity — verify with real machine specs", qty: 1 },
  { machine: "Miller Multimatic 220 (example)", type: "MIG/TIG/Stick Welder", capacity: "Illustrative capacity — verify with real machine specs", qty: 4 },
  { machine: "Lincoln Power MIG 360MP (example)", type: "MIG Welder", capacity: "Illustrative capacity — verify with real machine specs", qty: 2 },
  { machine: "Cincinnati CLA 408 (example)", type: "Hydraulic Shear", capacity: "Illustrative capacity — verify with real machine specs", qty: 1 },
  { machine: "Powder Coat Booth (example)", type: "Powder Coating", capacity: "Illustrative capacity — verify with real equipment specs", qty: 1 },
];

const materials = [
  { material: "Mild Steel", grade: "A36, A1018, 1008", maxThickness: '3/4"', applications: "Structural brackets, frames, machine bases, agricultural wear parts" },
  { material: "Stainless Steel", grade: "304, 316, 17-4 PH", maxThickness: '1/2"', applications: "Food-grade frames, washdown equipment, corrosion-resistant enclosures" },
  { material: "Aluminum", grade: "6061, 5052, 7075", maxThickness: '1/4"', applications: "Lightweight housings, aerospace components, heat sinks, panels" },
  { material: "Brass", grade: "C360 (free-machining)", maxThickness: '1/4"', applications: "Fittings, decorative trim, electrical contacts, valve bodies" },
  { material: "Copper", grade: "C110 (electrolytic)", maxThickness: '1/4"', applications: "Bus bars, heat exchangers, electrical components, roofing trim" },
];

const capacityStats = [
  { number: "18,000", label: "Illustrative Sq Ft" },
  { number: "8", label: "Illustrative Machines" },
  { number: "2", label: "Illustrative Shifts" },
  { number: "3-Day", label: "Illustrative Stock" },
  { number: "2–3 Wk", label: "Illustrative Lead Time" },
  { number: "48 Hr", label: "Rush Varies" },
];

const qcSteps = [
  { step: "1", title: "First Article Inspection", desc: "Illustrative first-article process. Real jobs require dimensional verification and sign-off before production release." },
  { step: "2", title: "In-Process Inspection", desc: "Illustrative in-process checks. Frequency and method depend on the part, tolerance, and production plan." },
  { step: "3", title: "Final QC Inspection", desc: "Illustrative final inspection. Every production job should define acceptance criteria and non-conformance handling with the customer." },
  { step: "4", title: "Documentation", desc: "Illustrative documentation. Material certs, inspection reports, and traceability should be agreed upon in the purchase order." },
];

const capabilityMatrix = [
  { process: "CNC Milling", materials: "Aluminum, steel, stainless", envelope: "20\" × 16\" × 12\"", tolerance: "±0.005\" typical", inspection: "CMM, calipers, bore gauges" },
  { process: "CNC Turning", materials: "Aluminum, steel, brass", envelope: "Ø 8\" × 20\" L", tolerance: "±0.003\" typical", inspection: "Micrometers, optical comparator" },
  { process: "Fiber Laser", materials: "Mild steel, stainless, aluminum", envelope: "5' × 10' sheet", tolerance: "±0.010\"", inspection: "Laser measuring, first-article" },
  { process: "Press Brake", materials: "Steel, stainless, aluminum", envelope: "10' length, 175 ton", tolerance: "±0.015\"", inspection: "Angle gauges, fixtures" },
  { process: "Welding", materials: "Steel, stainless, aluminum", envelope: "MIG/TIG/Stick, up to 3/8\"", tolerance: "Per AWS D1.1 fit-up", inspection: "Visual, dye-penetrant as needed" },
  { process: "Powder Coat", materials: "Steel, aluminum", envelope: "6' × 4' × 4' booth", tolerance: "Cosmetic finish", inspection: "Mil thickness, adhesion" },
];

const caseStudies = [
  {
    title: "Agricultural Bracket Run",
    problem: "Customer needed 2,000 identical mounting brackets for a new planter attachment, delivered before spring planting.",
    drawing: "STEP and DWG supplied; nesting optimized for material yield.",
    material: "A36 mild steel, 3/16\" plate",
    process: "Laser cut, deburr, press brake, powder coat",
    tolerance: "±0.030\"",
    quantity: "2,000 pcs",
    inspection: "First-article layout, in-process spot checks, final sample inspection",
    leadTime: "3 weeks",
    application: "Planter row-unit mounting brackets",
    img: "project-1",
  },
  {
    title: "Stainless Food-Grade Frame",
    problem: "Food processor needed a washdown-compatible frame for a conveyor line with tight sanitary requirements.",
    drawing: "PDF and hand sketch; weld callouts reviewed before quote.",
    material: "304 stainless steel, 11 ga",
    process: "Laser cut, TIG weld, passivation",
    tolerance: "±0.062\"",
    quantity: "12 frames",
    inspection: "Visual weld inspection, pit gauge, dimensional check",
    leadTime: "4 weeks",
    application: "Conveyor support frame in washdown packaging line",
    img: "project-2",
  },
  {
    title: "CNC Machined Aluminum Housing",
    problem: "OEM required a prototype aluminum housing with internal bores and threaded inserts in two weeks.",
    drawing: "STEP file with GD&T; material and finish specified.",
    material: "6061-T6 aluminum",
    process: "3-axis CNC mill, tapped holes, deburr, anodize Type II",
    tolerance: "±0.005\"",
    quantity: "25 pcs",
    inspection: "CMM report, thread gauges, surface finish check",
    leadTime: "2 weeks",
    application: "Electronic control enclosure prototype",
    img: "project-4",
  },
];

const team = [
  { name: "Frank Sterling", role: "Founder & Master Fabricator", bio: "Fictional profile for demo purposes. 35 years in metal fabrication. Represents the type of leadership a custom shop would have.", img: "owner" },
  { name: "Carlos Mendez", role: "Lead Welder", bio: "Fictional profile for demo purposes. Experienced in structural and stainless welding. Code welding requires current certifications and QC records.", img: "welder-1" },
  { name: "Dale Hutchins", role: "CNC Machinist", bio: "Fictional profile for demo purposes. CNC machinist example. Actual capability depends on equipment, setup, and inspection.", img: "welder-2" },
  { name: "Marcus Webb", role: "Fabricator / Laser Operator", bio: "Fictional profile for demo purposes. Laser and press-brake operator example. Real nesting and yield depend on the job and material.", img: "welder-3" },
];

const industries = [
  { name: "Agricultural Equipment", desc: "Illustrative parts: brackets, guards, frames, and wear parts for agricultural machinery. Actual capabilities depend on equipment and certifications." },
  { name: "Automotive Parts", desc: "Illustrative aftermarket and OEM-style components. Documentation and quality requirements vary by customer and industry." },
  { name: "Food Processing Equipment", desc: "Illustrative stainless steel fabrication for washdown environments. Food-grade finishes and sanitary welds require proper procedures and verification." },
  { name: "Construction Materials", desc: "Illustrative structural and architectural metalwork. Code welding requires qualified welders and inspection as specified." },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Illustrative certification. Real ISO 9001 registration would be issued by an accredited registrar and verifiable on their website.", logo: "ISO 9001:2015" },
  { name: "AWS D1.1", desc: "Illustrative welding-code reference. Actual AWS D1.1 certification requires welder qualification records and a Certified Welding Inspector as applicable.", logo: "AWS D1.1" },
  { name: "ITAR Registered", desc: "Illustrative defense-manufacturing reference. ITAR registration and compliance must be verified through DDTC before handling defense articles.", logo: "ITAR" },
];

const trustBadges = [
  { label: "ISO 9001:2015", sub: "Illustrative" },
  { label: "AWS D1.1", sub: "Illustrative" },
  { label: "ITAR Registered", sub: "Illustrative" },
  { label: "Made in USA", sub: "Illustrative" },
];

const faqs: FAQItem[] = [
  { q: "What is your minimum order quantity?", a: "Minimum order quantities, setup fees, and prototype pricing vary by shop and job complexity. Contact us for a quote tailored to your part and volume." },
  { q: "What are your typical lead times?", a: "Lead times depend on job complexity, material availability, shop load, and finishing requirements. Standard production can range from 2–3 weeks, with rush service sometimes available. Confirm timing with your quote." },
  { q: "Can you source materials for us?", a: "Most fabrication shops can source common materials such as mild steel, stainless, aluminum, brass, and copper. Material certifications should be requested and verified with your purchase order." },
  { q: "How do you ensure quality?", a: "Quality systems vary by shop. A robust shop will have documented inspection procedures, first-article inspection, in-process checks, final QC, and calibrated measuring equipment. Ask for the specific quality plan and certifications for your job." },
  { q: "What is your delivery radius?", a: "Delivery and shipping options vary. Local delivery may be available within a set radius, and common carriers or customer pickup can handle larger distances. Ask about landed-cost shipping in your quote." },
  { q: "What file formats do you accept for quotes?", a: "Common formats include STEP, IGES, DWG, DXF, and PDF. For this demo, the RFQ form does not upload or transmit files. A production site would use a secure file-transfer integration." },
];

const testimonials = [
  { text: "Sterling Metalworks has been our go-to fab shop for 8 years. They understand agricultural equipment — when we need a replacement bracket during harvest, they turn it around in 24 hours. No one else in the region does that.", author: "Tom R.", location: "Illustrative review, Rock Falls, IL" },
  { text: "We switched from a Chicago shop to Sterling Metalworks and cut our lead times in half. The quality is better, the pricing is competitive, and they actually pick up the phone. The ISO certification gave our customers confidence too.", author: "Karen M.", location: "Illustrative review, Dixon, IL" },
  { text: "Their stainless work for our food processing line is impeccable. Sanitary welds, perfect fit-up, and they understand washdown requirements. The powder coating on our enclosures has held up for 3 years with zero issues.", author: "Dave L.", location: "Illustrative review, Rochelle, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const QuoteForm: React.FC = () => {
  const [material, setMaterial] = React.useState("Mild Steel (A36)");
  const [thickness, setThickness] = React.useState("0.125");
  const [quantity, setQuantity] = React.useState("100");
  const [tolerance, setTolerance] = React.useState("±0.005");
  const [finish, setFinish] = React.useState("Powder Coat");
  const [industry, setIndustry] = React.useState("Agricultural");
  const [volume, setVolume] = React.useState("One-time");
  const [fileName, setFileName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="demo-quote-form__success">
        <CheckIcon size={48} />
        <h3>Quote Request Received (Illustrative)</h3>
        <p>This is a demo form — nothing was submitted. In a production site, the form would send RFQ details to a CRM or email queue for review and follow-up.</p>
        <p><strong>Material:</strong> {material}<br /><strong>Thickness:</strong> {thickness}"<br /><strong>Quantity:</strong> {quantity} pcs<br /><strong>Tolerance:</strong> {tolerance}"<br /><strong>Finish:</strong> {finish}<br /><strong>Industry:</strong> {industry}<br /><strong>Annual Volume:</strong> {volume}<br /><strong>CAD File:</strong> {fileName || "None uploaded"}</p>
        <button className="demo-btn demo-btn--ghost" onClick={() => setSubmitted(false)}>Submit another quote</button>
      </div>
    );
  }

  return (
    <form className="demo-quote-form" onSubmit={handleSubmit}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="material">Material Type</label>
        <select id="material" className="demo-form-select" value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option>Mild Steel (A36)</option>
          <option>Mild Steel (A1018)</option>
          <option>Cold Rolled Steel (1008)</option>
          <option>Stainless Steel (304)</option>
          <option>Stainless Steel (316)</option>
          <option>Stainless Steel (17-4 PH)</option>
          <option>Aluminum (6061)</option>
          <option>Aluminum (5052)</option>
          <option>Aluminum (7075)</option>
          <option>Brass (C360)</option>
          <option>Copper (C110)</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="thickness">Material Thickness (inches)</label>
        <input id="thickness" className="demo-form-input" type="text" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g. 0.125" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="quantity">Quantity (pieces)</label>
        <input id="quantity" className="demo-form-input" type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 100" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="tolerance">Tolerance Required (inches)</label>
        <select id="tolerance" className="demo-form-select" value={tolerance} onChange={(e) => setTolerance(e.target.value)}>
          <option>±0.030</option>
          <option>±0.010</option>
          <option>±0.005</option>
          <option>±0.002</option>
          <option>±0.0005</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="finish">Finish Required</label>
        <select id="finish" className="demo-form-select" value={finish} onChange={(e) => setFinish(e.target.value)}>
          <option>None (raw material)</option>
          <option>Deburr Only</option>
          <option>Powder Coat</option>
          <option>Primer + Paint</option>
          <option>Galvanized (hot-dip)</option>
          <option>Zinc Plating</option>
          <option>Anodize (Type II)</option>
          <option>Passivate (stainless)</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="industry">Industry</label>
        <select id="industry" className="demo-form-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option>Agricultural</option>
          <option>Automotive</option>
          <option>Food Processing</option>
          <option>Construction</option>
          <option>Other</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="volume">Annual Volume</label>
        <select id="volume" className="demo-form-select" value={volume} onChange={(e) => setVolume(e.target.value)}>
          <option>One-time</option>
          <option>100–1,000 / year</option>
          <option>1,000–10,000 / year</option>
          <option>10,000+ / year</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="cadfile">Upload CAD File (STEP, DWG, PDF)</label>
        <div className="demo-form-file-upload">
          <DownloadIcon size={20} />
          <input id="cadfile" className="demo-form-input" type="file" accept=".step,.stp,.iges,.igs,.dwg,.dxf,.pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
          <span className="demo-form-file-name">{fileName || "No file selected — or email to quotes@sterlingmetalworks-demo.com"}</span>
        </div>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="email">Email Address</label>
        <input id="email" className="demo-form-input" type="email" required placeholder="you@company.com" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="phone">Phone Number</label>
        <input id="phone" className="demo-form-input" type="tel" placeholder="(815) 555-0000" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="notes">Project Notes / Drawing Reference</label>
        <textarea id="notes" className="demo-form-textarea" rows={3} placeholder="Brief description of the part, or reference a drawing file you'll email separately." />
      </div>
      <button type="submit" className="demo-btn demo-btn--primary">Request Quote</button>
      <p className="demo-form-note">This is a demo RFQ form. It does not submit, store data, or upload files. A production site would connect to a CRM, email service, or secure file portal.</p>
    </form>
  );
};

const ManufacturingDemo: React.FC = () => (
  <DemoLayout demoName="Sterling Metalworks" industry="Manufacturing / Metal Fabrication" themeColor="#4a6fa5" designSystem="industrial">
    {/* Hero */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/manufacturing/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Short-Run Precision Fabrication · Sterling & Rock River Valley · Demo</span>
        <h1 className="demo-hero__title">Sterling Metalworks</h1>
        <p className="demo-hero__subtitle">Fictional demo of a custom metal fabrication shop serving OEM and industrial maintenance teams. CNC machining, laser cutting, welding, and finishing — from prototype to production.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550420" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0420</a>
          <a href="#quote" className="demo-btn demo-btn--ghost">Upload a Drawing for Quote</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#2a2a2e", color: "#f5f5f5", borderBottom: "1px solid var(--demo-border)" }}>
      <AlertIcon size={18} /> <strong>Demo website:</strong> Sterling Metalworks is a fictional business concept created by Bradley Matera. Team, reviews, images, certifications, and interactive features are illustrative.
    </div>

    {/* Stats + Review Badges + Trust Badges */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">26</div><div className="demo-stat__label">Illustrative Years</div></div>
          <div><div className="demo-stat__number">18K</div><div className="demo-stat__label">Illustrative Sq Ft</div></div>
          <div><div className="demo-stat__number">8</div><div className="demo-stat__label">Illustrative Machines</div></div>
          <div><div className="demo-stat__number">±0.005"</div><div className="demo-stat__label">Illustrative Tolerance</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.8} googleReviewCount={47} yelpRating={4.5} yelpReviewCount={12} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {trustBadges.map((b) => (
            <span key={b.label} className="demo-trust-logo"><ShieldIcon size={20} /> {b.label} <span className="demo-trust-logo__rating">{b.sub}</span></span>
          ))}
        </div>
      </div>
    </section>

    {/* Split image + text: Inside Our Shop */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/manufacturing/shop-floor.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Inside Our Shop</h2>
            <p className="demo-split-image-text__text">Our 18,000-square-foot facility houses eight major machines under one roof — from Haas CNC mills to a Trumpf fiber laser. That means no outsourcing, no subcontractor delays, and full quality control from raw material to finished part.</p>
            <p className="demo-split-image-text__text">We run two shifts during peak season and maintain a 3-day safety stock of common materials — A36 steel, 304 stainless, and 6061 aluminum — so we can start cutting the day we receive your drawings.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Capability matrix */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Capability Matrix</h2>
        <p className="demo-section__subtitle">Process, materials, envelope, tolerance, and inspection method. Real capability depends on the specific machine, setup, and job.</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Capability matrix">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Process</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Materials</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Part Envelope</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Typical Tolerance</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Inspection</th>
              </tr>
            </thead>
            <tbody>
              {capabilityMatrix.map((c) => (
                <tr key={c.process} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{c.process}</td>
                  <td style={{ padding: "0.75rem" }}>{c.materials}</td>
                  <td style={{ padding: "0.75rem" }}>{c.envelope}</td>
                  <td style={{ padding: "0.75rem" }}>{c.tolerance}</td>
                  <td style={{ padding: "0.75rem" }}>{c.inspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Feature image: Precision Welding */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/manufacturing/welding.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Precision Welding</h2>
        <p className="demo-feature-image__text">AWS D1.1 certified welders. MIG, TIG, and stick on steel, stainless, and aluminum. Every weld inspected by our on-staff CWI.</p>
      </div>
    </div>

    {/* Equipment List */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Equipment List</h2>
        <p className="demo-section__subtitle">Illustrative sample equipment list. Real capacity depends on the actual machines in the shop.</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Equipment list">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Machine</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Type</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Capacity</th>
                <th style={{ textAlign: "center", padding: "0.75rem", fontWeight: 600 }}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((e) => (
                <tr key={e.machine} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{e.machine}</td>
                  <td style={{ padding: "0.75rem" }}>{e.type}</td>
                  <td style={{ padding: "0.75rem" }}>{e.capacity}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>{e.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Material Specifications Table */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Material Specifications</h2>
        <p className="demo-section__subtitle">Illustrative material guide. Real availability, grades, and thickness limits depend on supplier and shop capability.</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Material specifications">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Material</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Grade</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Max Thickness</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Typical Applications</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.material} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem", fontWeight: 600 }}>{m.material}</td>
                  <td style={{ padding: "0.75rem" }}>{m.grade}</td>
                  <td style={{ padding: "0.75rem" }}>{m.maxThickness}</td>
                  <td style={{ padding: "0.75rem" }}>{m.applications}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Production Capacity Dashboard */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Production Capacity</h2>
        <p className="demo-section__subtitle">Real-time visibility into our shop's capabilities. This is what we can do, right now, without outsourcing.</p>
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {capacityStats.map((s) => (
            <div key={s.label}><div className="demo-stat__number">{s.number}</div><div className="demo-stat__label">{s.label}</div></div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><GearIcon size={20} /> 8 Machines Running</span>
          <span className="demo-trust-logo"><ClockIcon size={20} /> 2 Shifts / Peak</span>
          <span className="demo-trust-logo"><BoltIcon size={20} /> 48-Hr Rush Available</span>
        </div>
      </div>
    </section>

    {/* Case Studies */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Illustrative Case Studies</h2>
        <p className="demo-section__subtitle">Sample projects showing the inputs, process, and result a buyer would see. These are fictional examples.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {caseStudies.map((c) => (
            <div key={c.title} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", border: "1px solid var(--demo-border)", padding: "1.5rem" }}>
              <div style={{ backgroundImage: `url(/images/demos/manufacturing/${c.img}.jpg)`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "220px" }} />
              <div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>{c.title}</h3>
                <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem 1rem", fontSize: "0.9rem" }}>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Problem</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.problem}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Drawing</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.drawing}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Material</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.material}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Process</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.process}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Tolerance</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.tolerance}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Quantity</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.quantity}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Inspection</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.inspection}</dd></div>
                  <div><dt style={{ fontWeight: 700, color: "var(--demo-heading)" }}>Lead Time</dt><dd style={{ margin: 0, color: "var(--demo-text-muted)" }}>{c.leadTime}</dd></div>
                </dl>
                <p style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}><strong>Finished application:</strong> {c.application}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Split image + text: Quality Assurance */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Quality Assurance</h2>
            <p className="demo-split-image-text__text">Every job gets a first-article inspection before production begins. In-process checks during machining and welding catch issues early. Final QC inspection — dimensional, visual, and weld — happens before anything leaves the shop.</p>
            <p className="demo-split-image-text__text">Our CMM and gauge calibration is tracked and audited annually as part of our ISO 9001:2015 certification. Material certs and inspection reports ship with every order, every time.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/manufacturing/quality-control.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Quality Control Process Timeline */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Quality Control Process</h2>
        <p className="demo-section__subtitle">Every part follows the same 4-step inspection process. No exceptions, no shortcuts.</p>
        <div className="demo-process">
          {qcSteps.map((s) => (
            <div key={s.step} className="demo-process__step">
              <div className="demo-process__number">{s.step}</div>
              <h3 className="demo-process__title">{s.title}</h3>
              <p className="demo-process__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feature image: From Raw Steel to Finished Parts */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/manufacturing/steel-parts.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">From Raw Steel to Finished Parts</h2>
        <p className="demo-feature-image__text">Material sourcing, cutting, forming, welding, machining, coating, and assembly — all in one facility. One PO, one accountable partner.</p>
      </div>
    </div>

    {/* Team grid with headshots */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Crew</h2>
        <p className="demo-section__subtitle">The people who make your parts. Experienced, certified, and accountable.</p>
        <div className="demo-team-grid">
          {team.map((member) => (
            <div key={member.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(/images/demos/manufacturing/${member.img}.jpg)` }} />
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

    {/* Industries Served */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Industries We Serve</h2>
        <p className="demo-section__subtitle">Examples of markets where short-run fabrication and precision machining are commonly applied.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {industries.map((ind) => (
            <div key={ind.name} style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{ind.name}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", margin: 0 }}>{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications with image */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-two-col">
          <div>
            <h2 className="demo-section__title" style={{ textAlign: "left" }}>Certifications & Quality</h2>
            <p className="demo-section__subtitle" style={{ textAlign: "left" }}>Our quality management system is audited annually. Material certs and inspection reports ship with every order.</p>
            <div className="demo-services-grid" style={{ marginTop: "1.5rem" }}>
              {certifications.map((c) => (
                <div key={c.name} className="demo-service-card">
                  <div className="demo-service-card__body">
                    <h3 className="demo-service-card__name">{c.name}</h3>
                    <p className="demo-service-card__desc">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/manufacturing/certification.jpg)", minHeight: "400px", borderRadius: "var(--demo-radius)" }} />
        </div>
      </div>
    </section>

    {/* RFQ Form */}
    <section className="demo-section demo-section--alt" id="quote">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Request a Quote</h2>
        <p className="demo-section__subtitle">Fill out the form below with your part specifications. Upload your CAD file and we'll email a detailed quote within 24 business hours.</p>
        <QuoteForm />
      </div>
    </section>

    {/* Testimonials */}
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

    {/* Service Area Map */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Find Us</h2>
        <p className="demo-section__subtitle">Located on IL Route 40, 2 miles south of US 30 in Sterling, IL. Serving the Rock River Valley and I-88 corridor.</p>
        <GoogleMapsEmbed address="1420 IL Route 40, Sterling, IL 61081" height={300} title="Sterling Metalworks location" />
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.95rem" }}>
          <span><MapPinIcon size={18} /> 1420 IL Route 40, Sterling, IL 61081</span>
          <span><PhoneIcon size={18} /> (815) 555-0420</span>
          <span><ClockIcon size={18} /> Mon–Fri 6:00 AM – 4:30 PM</span>
        </div>
      </div>
    </section>

    <IntegrationsSection industry="manufacturing & metal fabrication" integrations={integrations} />

    {/* Contact */}
    <section className="demo-contact" style={{ background: "#1a2744" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Have a Part to Quote?</h2>
        <p className="demo-contact__text">Call (815) 555-0420 or email quotes@sterlingmetalworks-demo.com. We'll turn your drawings around fast — harvest season or not.</p>
        <a href="tel:8155550420" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0420</a>
        <div style={{ marginTop: "1.5rem" }}>
          <SocialLinks links={socialLinks} />
        </div>
        <div className="demo-contact__info">
          <div className="demo-contact__info-item"><MapPinIcon size={20} /><span className="demo-contact__info-label">Address</span><span>1420 IL Route 40, Sterling, IL 61081</span></div>
          <div className="demo-contact__info-item"><PhoneIcon size={20} /><span className="demo-contact__info-label">Phone</span><span>(815) 555-0420</span></div>
          <div className="demo-contact__info-item"><ClockIcon size={20} /><span className="demo-contact__info-label">Hours</span><span>Mon–Fri 6:00 AM – 4:30 PM</span></div>
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Sterling Metalworks</div>
        <div>1420 IL Route 40, Sterling, IL 61081 · (815) 555-0420</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. Team, reviews, images, and interactive features are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default ManufacturingDemo;

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
        { name: "Manufacturing", path: pathname },
      ]}
    />
  );
};
