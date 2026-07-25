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
import { StarIcon, MapPinIcon, PhoneIcon, GearIcon, ShieldIcon, CheckIcon, ClockIcon, ToolsIcon, BoltIcon, DocumentIcon, ClipboardIcon, DownloadIcon } from "../../site/icons";

const pathname = "/demos/manufacturing/";
const pageTitle = "Sterling Metalworks — Custom Metal Fabrication | Demo Website";
const pageDescription = "Demo manufacturing website for a metal fabrication shop — capabilities, equipment list, material specs, RFQ form, ISO certifications, and project gallery. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "linkedin", url: "https://linkedin.com" },
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "youtube", url: "https://youtube.com" },
];

const integrations: Integration[] = [
  { name: "E2 Shop System", category: "ERP / Shop Management", description: "Full shop floor control — quoting, job scheduling, material tracking, shipping, and invoicing. Your website quote form feeds directly into E2 for instant job setup.", freeTier: "From $7,995 one-time + annual support. Cloud version from $199/month.", url: "https://e2shopsystem.com", status: "mocked" },
  { name: "QuickBooks Online", category: "Accounting & Invoicing", description: "Sync invoices, purchase orders, and vendor payments between your shop system and QuickBooks. No double entry — jobs bill straight through to accounting.", freeTier: "From $35/month. 50% off for first 3 months.", url: "https://quickbooks.intuit.com", status: "available" },
  { name: "Salesforce CRM", category: "Customer Relationship Management", description: "Track leads, quotes, and customer history. When a prospect submits the quote form, Salesforce creates a lead and assigns it to your sales rep based on industry segment.", freeTier: "Starter from $25/user/month. 30-day free trial.", url: "https://salesforce.com", status: "mocked" },
  { name: "Shopify B2B Portal", category: "E-Commerce / B2B Portal", description: "Customer self-service portal for reordering parts, checking order status, and downloading invoices. Tiered pricing per customer account.", freeTier: "From $39/month. 3-day free trial.", url: "https://shopify.com", status: "available" },
  { name: "Autodesk Fusion 360 Viewer", category: "CAD / Design Collaboration", description: "Embeddable 3D model viewer. Customers upload STEP or DWG files and see them rendered in-browser. You review and quote directly from the model.", freeTier: "Free for personal use. Commercial from $545/year.", url: "https://autodesk.com/fusion-360", status: "mocked" },
  { name: "Google Maps Embed", category: "Maps & Service Area", description: "Interactive map showing your shop location and delivery radius. Customers see if you're within trucking distance before requesting a quote.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "ISO 9001 Certification Badge", category: "Trust & Verification", description: "Live certification badge linking to your ISO registrar's verification page. Shows customers your quality management system is audited and certified.", freeTier: "ISO 9001 certification from $3,000–$10,000 (registrar fees).", url: "https://iso.org/standard/62085.html", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email payment links with invoices. Customers pay by card or ACH for deposits and final payments. Funds in your account in 2 days.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
  { name: "Xometry / Protolabs Quote Comparison API", category: "Overflow Quoting", description: "When capacity is full, automatically compare quotes from Xometry and Protolabs so you can route overflow work without turning customers away. Instant pricing for CNC, sheet metal, and 3D printing.", freeTier: "API access free. Xometry takes 10–20% margin on routed jobs.", url: "https://xometry.com", status: "mocked" },
  { name: "Thomasnet Supplier Profile", category: "B2B Buyer Discovery", description: "Verified supplier profile on Thomasnet.com — the platform where 1.4M+ industrial buyers source suppliers. RFQs from Thomasnet feed directly into your Salesforce pipeline.", freeTier: "Basic listing free. Premium from $4,200/year.", url: "https://thomasnet.com", status: "available" },
  { name: "Made in USA Certified", category: "Domestic Manufacturing Verification", description: "Third-party verification that your parts are manufactured in the USA. Critical for defense (ITAR), government contracts, and reshoring initiatives. Badge links to verification registry.", freeTier: "Certification from $895/year. Includes FTC compliance review.", url: "https://madeinusa.com", status: "mocked" },
  { name: "FedEx Freight Quote API", category: "Shipping & Logistics", description: "Real-time LTL freight quotes for heavy parts and large assemblies. Quote form auto-calculates shipping based on part weight, dimensions, and destination ZIP. Customers see landed cost upfront.", freeTier: "API free with FedEx account. Discounted freight rates up to 70% off.", url: "https://fedex.com/freight", status: "available" },
  { name: "Dropbox / Google Drive File Sharing", category: "CAD File Transfer Portal", description: "Secure portal for customers to upload STEP, DWG, IGES, and PDF drawings. Files auto-organize by customer and job number. No more 50MB email attachments.", freeTier: "Dropbox Business from $15/user/month. Google Drive 15GB free.", url: "https://dropbox.com/business", status: "available" },
];

const capabilities = [
  { name: "CNC Machining", desc: "3-axis and 4-axis milling, turning, and boring. Tolerances to ±0.0005\". Prototype to production runs.", img: "cnc-machining" },
  { name: "Laser Cutting", desc: "Fiber laser cutting up to 3/4\" mild steel, 1/2\" stainless, 1/4\" aluminum. Nesting software optimizes material yield.", img: "laser-cutting" },
  { name: "Welding (MIG/TIG/Stick)", desc: "AWS D1.1 certified welders. MIG, TIG, and stick welding on steel, stainless, and aluminum. Code welding available.", img: "welding" },
  { name: "Sheet Metal Forming", desc: "Press brake forming up to 10' length. Rolling, shearing, punching, and notching. Gauge to 10ga steel.", img: "sheet-metal" },
  { name: "Powder Coating", desc: "In-house powder coating booth. Standard and custom RAL colors. Media blasting prep. 48-hour typical turnaround.", img: "powder-coating" },
  { name: "Assembly", desc: "Mechanical and sub-assembly. Torque-controlled fastening, leak testing, and final QC inspection before shipping.", img: "assembly" },
];

const equipment = [
  { machine: "Haas VF-2 VMC", type: "CNC Mill", capacity: "30\" x 16\" x 20\" travels, 8,100 RPM", qty: 2 },
  { machine: "Haas ST-20 Lathe", type: "CNC Turning", capacity: "20\" x 40\" turning, 12-station turret", qty: 1 },
  { machine: "Trumpf TruLaser 3030", type: "Fiber Laser", capacity: "5' x 10' sheet, up to 3/4\" mild steel", qty: 1 },
  { machine: "Amada HG-1003 Press Brake", type: "Press Brake", capacity: "10' length, 110-ton, 4-axis back gauge", qty: 1 },
  { machine: "Miller Multimatic 220", type: "MIG/TIG/Stick Welder", capacity: "Multi-process, 210A output", qty: 4 },
  { machine: "Lincoln Power MIG 360MP", type: "MIG Welder", capacity: "300A, industrial wire feed", qty: 2 },
  { machine: "Cincinnati CLA 408", type: "Hydraulic Shear", capacity: "10' x 1/4\" capacity", qty: 1 },
  { machine: "Gertebauer Powder Coat Booth", type: "Powder Coating", capacity: "8' x 8' x 20' booth, 4-stage wash", qty: 1 },
];

const materials = [
  { material: "Mild Steel", grade: "A36, A1018, 1008", maxThickness: '3/4"', applications: "Structural brackets, frames, machine bases, agricultural wear parts" },
  { material: "Stainless Steel", grade: "304, 316, 17-4 PH", maxThickness: '1/2"', applications: "Food-grade frames, washdown equipment, corrosion-resistant enclosures" },
  { material: "Aluminum", grade: "6061, 5052, 7075", maxThickness: '1/4"', applications: "Lightweight housings, aerospace components, heat sinks, panels" },
  { material: "Brass", grade: "C360 (free-machining)", maxThickness: '1/4"', applications: "Fittings, decorative trim, electrical contacts, valve bodies" },
  { material: "Copper", grade: "C110 (electrolytic)", maxThickness: '1/4"', applications: "Bus bars, heat exchangers, electrical components, roofing trim" },
];

const capacityStats = [
  { number: "18,000", label: "Sq Ft Facility" },
  { number: "8", label: "Major Machines" },
  { number: "2", label: "Shifts During Peak" },
  { number: "3-Day", label: "Material Safety Stock" },
  { number: "2–3 Wk", label: "Standard Lead Time" },
  { number: "48 Hr", label: "Rush Service Available" },
];

const qcSteps = [
  { step: "1", title: "First Article Inspection", desc: "Dimensional verification on the first part off every machine. CMM, calipers, and micrometers. No production run starts until first article is signed off." },
  { step: "2", title: "In-Process Inspection", desc: "Checks during machining and welding at set intervals — typically every 25 pieces or every 2 hours. Catches drift before it becomes scrap." },
  { step: "3", title: "Final QC Inspection", desc: "Dimensional, visual, and weld inspection before shipping. Every part checked against print. Non-conforming parts are quarantined and reviewed." },
  { step: "4", title: "Documentation", desc: "Material certs and inspection reports ship with every order. Full traceability from raw material heat number to finished part. ISO 9001:2015 compliant." },
];

const projects = [
  { title: "Agricultural Bracket Run", desc: "2,000-piece production run of mounting brackets for a combine manufacturer.", img: "project-1" },
  { title: "Stainless Food-Grade Frame", desc: "TIG-welded 304 stainless frame for a washdown conveyor system.", img: "project-2" },
  { title: "Structural Steel Assembly", desc: "AWS D1.1 certified structural weldment for a commercial building.", img: "project-3" },
  { title: "CNC Machined Housing", desc: "Precision-machined aluminum housing with ±0.001\" tolerances.", img: "project-4" },
  { title: "Powder Coated Enclosures", desc: "Custom RAL 7016 powder-coated electrical enclosures for outdoor use.", img: "project-5" },
  { title: "Laser-Cut Panel Array", desc: "Nested laser-cut decorative panels for an architectural installation.", img: "project-6" },
];

const team = [
  { name: "Frank Sterling", role: "Founder & Master Fabricator", bio: "Started Sterling Metalworks in 1998. 35 years in metal fabrication. AWS D1.1 Certified Welding Inspector. Still runs the shop floor every day.", img: "owner" },
  { name: "Carlos Mendez", role: "Lead Welder / CWI", bio: "AWS D1.1 certified welder and welding inspector. 18 years experience in structural and stainless welding. Oversees all code welding jobs.", img: "welder-1" },
  { name: "Dale Hutchins", role: "CNC Machinist", bio: "Haas-certified machinist with 14 years experience. Programs and runs all CNC mills and lathes. Tolerance specialist — hits ±0.0005\" consistently.", img: "welder-2" },
  { name: "Marcus Webb", role: "Fabricator / Laser Operator", bio: "10 years in the trade. Runs the Trumpf laser and Amada press brake. Expert at nesting for maximum material yield and minimum waste.", img: "welder-3" },
];

const industries = [
  { name: "Agricultural Equipment", desc: "Brackets, guards, frames, and wear parts for planters, combines, and tillage implements. We understand harvest season deadlines." },
  { name: "Automotive Parts", desc: "Aftermarket and OEM-spec components. PPAP documentation available. JIT delivery scheduling for assembly-line customers." },
  { name: "Food Processing Equipment", desc: "Stainless steel fabrication for washdown environments. FDA-compliant finishes, sanitary welds, and food-grade materials." },
  { name: "Construction Materials", desc: "Structural brackets, stair stringers, railings, and custom architectural metalwork. AWS D1.1 certified structural welding." },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Quality Management System certified by NSF-ISR. Annual surveillance audits. Certificate #A4287.", logo: "ISO 9001:2015" },
  { name: "AWS D1.1", desc: "Structural Welding Code — Steel. All welders certified. CWI on staff for in-house inspection.", logo: "AWS D1.1" },
  { name: "ITAR Registered", desc: "Registered with DDTC for defense-related manufacturing. Export compliance program in place.", logo: "ITAR" },
];

const trustBadges = [
  { label: "ISO 9001:2015", sub: "Certified QMS" },
  { label: "AWS D1.1", sub: "Certified Welders" },
  { label: "ITAR Registered", sub: "DDTC Compliant" },
  { label: "Made in USA", sub: "Domestic Mfg" },
];

const faqs: FAQItem[] = [
  { q: "What is your minimum order quantity?", a: "We have no minimum order quantity. Whether you need one prototype part or 10,000 production units, we can help. Prototype jobs are quoted at shop rate with no setup fee for first-time customers." },
  { q: "What are your typical lead times?", a: "Standard lead time is 2–3 weeks for production runs. Prototypes typically ship in 5–7 business days. Rush service is available — we can often turn emergency parts in 48 hours for agricultural and construction customers during peak season." },
  { q: "Can you source materials for us?", a: "Yes. We maintain accounts with Steel Dynamics, Ryerson, and Alro Steel. We can source mild steel, stainless, aluminum, brass, and copper in sheet, plate, bar, and tube. Material certs are provided with every order." },
  { q: "How do you ensure quality?", a: "We are ISO 9001:2015 certified with documented quality procedures for every process. First-article inspection on all new jobs, in-process inspection during machining, and final QC before shipping. CMM and gauge calibration is tracked and audited annually." },
  { q: "What is your delivery radius?", a: "We deliver free within 75 miles of Sterling, IL — covering Rock Falls, Dixon, Rockford, Belvidere, Rochelle, and the I-88 corridor. Beyond that, we ship via common carrier (Old Dominion, Estes) or customer pickup. White-glove delivery available for oversize items." },
  { q: "What file formats do you accept for quotes?", a: "We accept STEP, IGES, DWG, DXF, and PDF drawings. Upload them through our RFQ form or email to quotes@sterlingmetalworks-demo.com. For 3D models, we use Autodesk Fusion 360 to review and quote directly from the geometry." },
];

const testimonials = [
  { text: "Sterling Metalworks has been our go-to fab shop for 8 years. They understand agricultural equipment — when we need a replacement bracket during harvest, they turn it around in 24 hours. No one else in the region does that.", author: "Tom R.", location: "Agricultural Equipment Manufacturer, Rock Falls, IL" },
  { text: "We switched from a Chicago shop to Sterling Metalworks and cut our lead times in half. The quality is better, the pricing is competitive, and they actually pick up the phone. The ISO certification gave our customers confidence too.", author: "Karen M.", location: "Construction Company, Dixon, IL" },
  { text: "Their stainless work for our food processing line is impeccable. Sanitary welds, perfect fit-up, and they understand washdown requirements. The powder coating on our enclosures has held up for 3 years with zero issues.", author: "Dave L.", location: "Food Processing Plant, Rochelle, IL" },
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
        <h3>Quote Request Received</h3>
        <p>Thank you. Our quoting team will review your specifications and email a detailed quote within 24 business hours. For rush quotes, call (815) 555-0420.</p>
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
      <p className="demo-form-note">Quotes returned within 24 business hours. Upload STEP, DWG, or PDF drawings directly or email to quotes@sterlingmetalworks-demo.com.</p>
    </form>
  );
};

const ManufacturingDemo: React.FC = () => (
  <DemoLayout demoName="Sterling Metalworks" industry="Manufacturing / Metal Fabrication" themeColor="#4a6fa5" designSystem="industrial">
    {/* Hero */}
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/manufacturing/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">ISO 9001:2015 Certified · AWS D1.1 Welding · ITAR Registered · Since 1998</span>
        <h1 className="demo-hero__title">Sterling Metalworks</h1>
        <p className="demo-hero__subtitle">Custom metal fabrication shop serving Sterling, Rock Falls, and the Rock River Valley. CNC machining, laser cutting, welding, and powder coating — from prototype to production. Located on IL Route 40, 2 miles south of US 30.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550420" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0420</a>
          <a href="#quote" className="demo-btn demo-btn--ghost">Request a Quote</a>
        </div>
      </div>
    </section>

    {/* Features table */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Features at a glance</h2>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Sterling Metalworks features at a glance">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Capabilities pages</td>
                <td style={{ padding: "0.75rem" }}>Detailed pages for CNC machining, laser cutting, welding, forming, powder coating, and assembly.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Equipment list</td>
                <td style={{ padding: "0.75rem" }}>Full machine list with specifications — Haas mills, Trumpf laser, Amada press brake, Miller welders.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Material specifications</td>
                <td style={{ padding: "0.75rem" }}>Detailed table of all materials worked with — grades, max thickness, and typical applications.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Production capacity dashboard</td>
                <td style={{ padding: "0.75rem" }}>Facility size, machine count, shift schedule, material stock, and lead times — all at a glance.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>RFQ form with CAD upload</td>
                <td style={{ padding: "0.75rem" }}>Structured quote form with material, thickness, quantity, tolerance, finish, industry, annual volume, and CAD file upload. Feeds into E2 shop system.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Quality control process</td>
                <td style={{ padding: "0.75rem" }}>4-step QC timeline — first article, in-process, final inspection, and documentation with material certs.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Certifications display</td>
                <td style={{ padding: "0.75rem" }}>ISO 9001:2015, AWS D1.1, ITAR Registered, and Made in USA badges with links to verification pages.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>B2B portal</td>
                <td style={{ padding: "0.75rem" }}>Customer login for reordering parts, checking order status, and downloading invoices and certs.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Stats + Review Badges + Trust Badges */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">26</div><div className="demo-stat__label">Years in Business</div></div>
          <div><div className="demo-stat__number">40,000+</div><div className="demo-stat__label">Parts Shipped Yearly</div></div>
          <div><div className="demo-stat__number">8</div><div className="demo-stat__label">Major Machines</div></div>
          <div><div className="demo-stat__number">±0.0005"</div><div className="demo-stat__label">Tightest Tolerance</div></div>
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

    {/* Capabilities grid with background images */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Capabilities</h2>
        <p className="demo-section__subtitle">Six core processes under one roof. No outsourcing means tighter quality control and faster turnaround.</p>
        <div className="demo-services-grid">
          {capabilities.map((c) => (
            <div key={c.name} className="demo-service-card">
              <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/manufacturing/${c.img}.jpg)` }} />
              <div className="demo-service-card__body">
                <h3 className="demo-service-card__name">{c.name}</h3>
                <p className="demo-service-card__desc">{c.desc}</p>
              </div>
            </div>
          ))}
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
        <p className="demo-section__subtitle">Our shop floor is equipped for everything from one-off prototypes to production runs of 10,000+ pieces.</p>
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
        <p className="demo-section__subtitle">We stock and source these materials regularly. Don't see what you need? Call us — we source specialty alloys weekly.</p>
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

    {/* Project Showcase Gallery */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Project Showcase</h2>
        <p className="demo-section__subtitle">A selection of recent work — from prototype parts to production runs across four industries.</p>
        <div className="demo-food-gallery">
          {projects.map((p) => (
            <div key={p.title} className="demo-food-gallery__item" style={{ backgroundImage: `url(/images/demos/manufacturing/${p.img}.jpg)` }}>
              <span className="demo-food-gallery__label">{p.title}</span>
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
        <p className="demo-section__subtitle">We understand the demands of each industry we work with. That's why customers keep coming back.</p>
        <div className="demo-services-grid">
          {industries.map((ind) => (
            <div key={ind.name} className="demo-service-card">
              <div className="demo-service-card__body">
                <h3 className="demo-service-card__name">{ind.name}</h3>
                <p className="demo-service-card__desc">{ind.desc}</p>
              </div>
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
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
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
