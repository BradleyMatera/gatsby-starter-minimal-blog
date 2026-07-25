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
import { StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, DocumentIcon, ScrollIcon, QuoteIcon, CalendarIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/law-firm/";
const pageTitle = "Rock River Legal Group — Dixon, IL Attorney | Demo Website";
const pageDescription = "Demo law firm website for Rock River Legal Group — practice areas, attorney bios, consultation booking, and client resources. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "linkedin", url: "https://linkedin.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "facebook", url: "https://facebook.com" },
];

const integrations: Integration[] = [
  { name: "Clio Manage", category: "Practice Management", description: "Client intake, matter management, time tracking, billing, and document automation. Your website consultation form creates a new contact and matter in Clio automatically — no manual entry.", freeTier: "From $49/user/month. 10-day free trial.", url: "https://cliocom", status: "mocked" },
  { name: "LawPay", category: "Client Payments", description: "Secure, trust-compliant payment processing for retainers and invoices. Clients pay by card or eCheck directly from your website or email invoice. IOLTA-compliant trust accounting.", freeTier: "No monthly fee. $0.95 + 2.95% per card transaction. $0.95 per eCheck.", url: "https://lawpay.com", status: "mocked" },
  { name: "Calendly", category: "Scheduling", description: "Online consultation scheduling synced with attorney calendars. Clients pick a time that works, and Calendly blocks it in Clio and sends confirmation emails with intake forms.", freeTier: "Free for 1 event type. Standard from $10/user/month.", url: "https://calendly.com", status: "available" },
  { name: "DocuSign", category: "Document Signing", description: "Electronic signature for retainers, estate plans, and settlement agreements. Clients sign from their phone. Completed documents auto-file to the correct Clio matter.", freeTier: "From $15/month for 5 envelopes. 30-day free trial.", url: "https://docusign.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Directions", description: "Interactive map showing your office location with parking info. Clients get directions directly from the consultation confirmation page.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Avvo Rating Badge", category: "Reviews & Ratings", description: "Live Avvo rating badge linking to your attorney profiles. Shows clients and prospects your peer endorsements and client reviews on a trusted legal platform.", freeTier: "Free attorney profile. Sponsored listings from $50/month.", url: "https://avvo.com", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email payment links for consultation fees and document prep. Accepts cards and ACH. Syncs with LawPay for trust account compliance.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
  { name: "Zapier Automation", category: "Workflow Integration", description: "Connect your website forms to 5,000+ apps. Consultation requests route to Clio, Calendly, and your email — all automatically. No manual data entry.", freeTier: "Free for 100 tasks/month. Starter from $19.99/month.", url: "https://zapier.com", status: "available" },
  { name: "Fastcase Legal Research", category: "Legal Research", description: "Cloud-based case law database with AI-powered search. Attorneys research precedent and statutes directly from the matter file. Includes Illinois-specific case law.", freeTier: "Included with Illinois State Bar Association membership. Standalone from $95/user/month.", url: "https://fastcase.com", status: "mocked" },
  { name: "Illinois Courts e-Filing System", category: "Court Filing", description: "Direct electronic filing to Illinois circuit courts. File pleadings from your website dashboard without leaving the matter. Automatic docket updates.", freeTier: "Free for all Illinois-licensed attorneys. Mandated by Illinois Supreme Court Rule 9.", url: "https://efile.illinoiscourts.gov", status: "mocked" },
  { name: "Martindale-Hubbell AV Preeminent", category: "Peer Review Rating", description: "Live peer review rating badge. The AV Preeminent rating is the highest possible from Martindale-Hubbell — recognized by clients and attorneys nationwide.", freeTier: "Free attorney profile. Premium listings from $75/month.", url: "https://martindale.com", status: "mocked" },
  { name: "Smokeball Document Automation", category: "Document Automation", description: "Automated legal document generation. Estate plans, divorce petitions, and LLC formations generated from matter data in seconds. 500+ Illinois-specific templates.", freeTier: "From $99/user/month. 14-day free trial.", url: "https://smokeball.com", status: "mocked" },
  { name: "LexisNexis Public Records", category: "Background & Asset Search", description: "Background checks, asset searches, and public records lookups for litigation support. Find defendants, locate assets, verify witness backgrounds.", freeTier: "Pay-per-search from $7. Subscription from $89/month.", url: "https://lexisnexis.com", status: "available" },
];

const practiceAreas = [
  { name: "Family Law", desc: "Divorce, child custody, child support, adoption, and prenuptial agreements. We handle the emotional and legal complexities with compassion and clarity.", icon: ShieldIcon, img: "family-law" },
  { name: "Estate Planning", desc: "Wills, trusts, powers of attorney, and healthcare directives. Protect your assets and provide for your family. Flat-fee packages available.", icon: DocumentIcon, img: "estate-planning" },
  { name: "Real Estate Law", desc: "Residential and commercial closings, title issues, boundary disputes, and landlord-tenant matters. We're your closing attorney in Lee, Ogle, and Whiteside counties.", icon: ScrollIcon, img: "real-estate-law" },
  { name: "Business Formation", desc: "LLC, S-corp, and partnership formation. Operating agreements, contracts, and ongoing counsel for small businesses across the Rock River Valley.", icon: ScrollIcon, img: "business-law" },
  { name: "Personal Injury", desc: "Auto accidents, slip and fall, and workplace injuries. We deal with the insurance companies so you can focus on recovery. Contingency fee — no recovery, no fee.", icon: ShieldIcon, img: "personal-injury" },
  { name: "Criminal Defense", desc: "DUI, traffic violations, misdemeanors, and felony defense. Former Lee County prosecutor on our team — we know how the other side thinks.", icon: ShieldIcon, img: "criminal-defense" },
];

const attorneys = [
  {
    name: "Patricia Holloway, J.D.",
    role: "Founding Partner",
    photo: "/images/demos/law-firm/attorney-1.jpg",
    education: "University of Illinois College of Law, J.D. 1998 | Illinois State University, B.A. Political Science 1995",
    bar: "Illinois State Bar (1998), U.S. District Court Northern District of Illinois (2000)",
    practice: "Estate Planning, Family Law, Business Formation",
    bio: "Patricia founded Rock River Legal Group in 2005 after seven years at a Chicago firm. She grew up in Dixon and returned to serve the community she loves. She handles complex estate plans and high-asset divorces with a steady, strategic hand. Member of the Illinois State Bar Association Trusts and Estates Section."
  },
  {
    name: "Marcus Chen, J.D.",
    role: "Partner",
    photo: "/images/demos/law-firm/attorney-2.jpg",
    education: "Northwestern Pritzker School of Law, J.D. 2005 | University of Iowa, B.A. Economics 2002",
    bar: "Illinois State Bar (2005), U.S. District Court Northern District of Illinois (2007)",
    practice: "Personal Injury, Criminal Defense, Real Estate Law",
    bio: "Marcus joined the firm in 2010 after five years as a Lee County Assistant State's Attorney. His prosecutor experience gives our clients an edge — he knows the local courts, the judges, and how the other side builds a case. He handles DUI defense, personal injury, and commercial real estate closings."
  },
  {
    name: "Jennifer Torres, J.D.",
    role: "Associate Attorney",
    photo: "/images/demos/law-firm/attorney-3.jpg",
    education: "University of Iowa College of Law, J.D. 2015 | Northern Illinois University, B.S. Business Administration 2012",
    bar: "Illinois State Bar (2015)",
    practice: "Family Law, Business Formation, Estate Planning",
    bio: "Jennifer joined the firm in 2018 and has quickly become the go-to attorney for young families setting up their first estate plans and small business owners forming LLCs. She offers flat-fee consultations and is known for making legal concepts approachable. Fluent in Spanish."
  },
];

const resources = [
  { title: "Estate Planning Checklist", desc: "A 12-page guide covering wills, trusts, powers of attorney, and healthcare directives. Includes a worksheet to organize your assets and beneficiaries.", type: "PDF Download" },
  { title: "Divorce Guide for Illinois Residents", desc: "Understand the Illinois divorce process, property division, maintenance (alimony), and child custody. Know what to expect before you file.", type: "PDF Download" },
  { title: "Business Formation Guide", desc: "LLC vs. S-Corp vs. Partnership — which is right for your business? Includes Illinois filing requirements and operating agreement templates.", type: "PDF Download" },
  { title: "What to Bring to Your First Meeting", desc: "A checklist of documents and information to bring to your initial consultation so we can make the most of your time.", type: "PDF Download" },
];

const faqs: FAQItem[] = [
  { q: "How much is the initial consultation?", a: "Initial consultations are $150 for a 45-minute meeting with one of our attorneys. This fee is credited toward your case if you retain us. Estate planning consultations are complimentary because we offer flat-fee packages. Personal injury consultations are free — we work on contingency." },
  { q: "What payment options do you accept?", a: "We accept all major credit cards, eCheck via LawPay, and traditional checks. For most matters, we require a retainer deposit that is drawn down as work is performed. Estate planning is flat-fee. Personal injury is contingency — you pay nothing unless we recover for you. Payment plans are available for family law cases." },
  { q: "What should I bring to my first meeting?", a: "Bring a photo ID, any relevant documents (court papers, contracts, deeds, insurance policies), a list of questions, and a timeline of events. For estate planning, bring a list of your assets, approximate values, and beneficiary names. For divorce, bring tax returns, bank statements, and a list of assets and debts. Download our checklist from the Resources section." },
  { q: "How quickly will you respond to my calls and emails?", a: "We respond to all client communications within one business day — usually the same day. Our paralegal team monitors calls and emails throughout the day. If your attorney is in court, you'll speak with a paralegal who can access your file and answer most questions. Urgent matters are handled immediately." },
  { q: "Do you offer virtual consultations?", a: "Yes. We offer consultations via Zoom or phone for clients who can't come to our Dixon office. We serve clients across Lee, Ogle, Whiteside, and Winnebago counties, and many prefer virtual meetings for convenience. All document signing can be done electronically via DocuSign. In-person meetings are available by appointment." },
];

const testimonials = [
  { text: "Patricia made the estate planning process painless. She explained everything in plain English, not legalese. My trust, will, and powers of attorney were done in two meetings. The peace of mind is worth every penny.", author: "Robert & Linda H.", location: "Estate Planning Clients, Dixon, IL" },
  { text: "When I started my manufacturing business, Jennifer set up my LLC and operating agreement for a flat fee. She thought of things I never would have — buy-sell provisions, liability protection. Two years later she's still my go-to for contract review.", author: "Steve M.", location: "Business Formation Client, Sterling, IL" },
  { text: "My divorce was the hardest thing I've been through. Marcus was direct, compassionate, and fought for me when it mattered. He kept me informed every step of the way and got me a fair custody arrangement. I never felt like just another case number.", author: "Anonymous", location: "Family Law Client, Oregon, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const caseResults = [
  { area: "Personal Injury", result: "$1.2M Settlement", desc: "Semi-truck collision on IL Route 2. Client suffered broken femur and required two surgeries. Negotiated policy limits plus umbrella coverage.", attorney: "Marcus Chen", year: "2023" },
  { area: "Family Law", result: "Primary Custody Awarded", desc: "Father granted primary residential custody in contested divorce. Demonstrated stability, school involvement, and primary caretaker status.", attorney: "Patricia Holloway", year: "2023" },
  { area: "Business Law", result: "$340K Contract Dispute Won", desc: "Supplier breach of delivery agreement. Recovered damages plus attorney fees for manufacturing client in Sterling.", attorney: "Jennifer Torres", year: "2022" },
  { area: "Estate Planning", result: "$2.8M Farm Protected", desc: "Family farm protected from Medicaid recovery through irrevocable trust. Three generations of assets preserved.", attorney: "Patricia Holloway", year: "2022" },
  { area: "Criminal Defense", result: "DUI Reduced to Reckless Driving", desc: "Second-offense DUI reduced to reckless driving. No license suspension, no ignition interlock. Challenged field sobriety test administration.", attorney: "Marcus Chen", year: "2023" },
  { area: "Real Estate", result: "Title Defect Cleared", desc: "$450K commercial closing saved. Discovered 40-year-old chain of title defect and quieted title in 30 days.", attorney: "Jennifer Torres", year: "2023" },
];

const statuteLimitations = [
  { caseType: "Personal Injury", years: 2, desc: "2 years from date of injury (735 ILCS 5/13-202)" },
  { caseType: "Breach of Contract (oral)", years: 5, desc: "5 years from breach (735 ILCS 5/13-205)" },
  { caseType: "Breach of Contract (written)", years: 10, desc: "10 years from breach (735 ILCS 5/13-206)" },
  { caseType: "Property Damage", years: 5, desc: "5 years from damage (735 ILCS 5/13-205)" },
  { caseType: "Wrongful Death", years: 2, desc: "2 years from date of death (740 ILCS 180/2)" },
  { caseType: "Fraud", years: 5, desc: "5 years from discovery (735 ILCS 5/13-205)" },
];

const consultationFees = [
  { area: "Estate Planning", fee: "Free", reason: "We offer flat-fee packages — the consultation is complimentary." },
  { area: "Personal Injury", fee: "Free", reason: "We work on contingency — you pay nothing unless we recover for you." },
  { area: "Family Law", fee: "$150 / 45 min", reason: "Credited to your case if you retain us. Payment plans available." },
  { area: "Criminal Defense", fee: "$150 / 45 min", reason: "Credited to your case if you retain us." },
  { area: "Real Estate Law", fee: "$150 / 30 min", reason: "Credited to closing costs if we handle your closing." },
  { area: "Business Formation", fee: "Free 15-min screening", reason: "Phone screening to assess your needs. Flat-fee formation packages available." },
];

const StatuteCalculator: React.FC = () => {
  const [caseType, setCaseType] = React.useState("Personal Injury");
  const [incidentDate, setIncidentDate] = React.useState("");
  const [result, setResult] = React.useState<{ deadline: string; years: number } | null>(null);

  const calculate = () => {
    if (!incidentDate) return;
    const statute = statuteLimitations.find((s) => s.caseType === caseType);
    if (!statute) return;
    const date = new Date(incidentDate);
    date.setFullYear(date.getFullYear() + statute.years);
    setResult({ deadline: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), years: statute.years });
  };

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="statute-case">Case Type</label>
        <select id="statute-case" className="demo-form-select" value={caseType} onChange={(e) => { setCaseType(e.target.value); setResult(null); }}>
          {statuteLimitations.map((s) => <option key={s.caseType}>{s.caseType}</option>)}
        </select>
        <p style={{ fontSize: "0.8rem", color: "var(--demo-text-muted)", marginTop: "0.5rem" }}>{statuteLimitations.find((s) => s.caseType === caseType)?.desc}</p>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="statute-date">Date of Incident</label>
        <input id="statute-date" className="demo-form-input" type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
      </div>
      <button type="button" className="demo-btn demo-btn--primary" onClick={calculate} disabled={!incidentDate}>Calculate Filing Deadline</button>
      {result && (
        <div className="demo-quote-form__success" style={{ marginTop: "1.5rem" }}>
          <AlertIcon size={36} />
          <h3>Your Filing Deadline: {result.deadline}</h3>
          <p>You have <strong>{result.years} years</strong> from the date of incident to file. Do not wait — evidence disappears, witnesses move, and memories fade. Call <a href="tel:8155550915">(815) 555-0915</a> today.</p>
          <p style={{ fontSize: "0.8rem", marginTop: "1rem", opacity: 0.7 }}>This tool provides general information based on Illinois statutes and does not constitute legal advice. Consult an attorney about your specific situation.</p>
        </div>
      )}
    </div>
  );
};

const ConsultationChecker: React.FC = () => {
  const [area, setArea] = React.useState("Estate Planning");
  const fee = consultationFees.find((f) => f.area === area);

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="check-area">Select Your Practice Area</label>
        <select id="check-area" className="demo-form-select" value={area} onChange={(e) => setArea(e.target.value)}>
          {consultationFees.map((f) => <option key={f.area}>{f.area}</option>)}
        </select>
      </div>
      {fee && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <CheckIcon size={36} />
          <h3 style={{ fontSize: fee.fee === "Free" ? "1.5rem" : "1.25rem" }}>{fee.fee === "Free" ? "Free Consultation" : `Consultation: ${fee.fee}`}</h3>
          <p>{fee.reason}</p>
          <a href="#consultation" className="demo-btn demo-btn--primary" style={{ marginTop: "1rem" }}>Book Now</a>
        </div>
      )}
    </div>
  );
};

const ConsultationForm: React.FC = () => {
  const [practiceArea, setPracticeArea] = React.useState("Family Law");
  const [attorney, setAttorney] = React.useState("No preference");
  const [date, setDate] = React.useState("");
  const [consultType, setConsultType] = React.useState("In-person");
  const [clientStatus, setClientStatus] = React.useState("New client");
  const [referral, setReferral] = React.useState("Google search");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="demo-quote-form__success">
        <CheckIcon size={48} />
        <h3>Consultation Request Received</h3>
        <p>Thank you. We'll call you within one business day to confirm your appointment. If you need immediate assistance, call (815) 555-0915.</p>
        <p><strong>Practice Area:</strong> {practiceArea}<br /><strong>Preferred Attorney:</strong> {attorney}<br /><strong>Preferred Date:</strong> {date || "To be scheduled"}<br /><strong>Consultation Type:</strong> {consultType}<br /><strong>Client Status:</strong> {clientStatus}</p>
        <button className="demo-btn demo-btn--ghost" onClick={() => setSubmitted(false)}>Submit another request</button>
      </div>
    );
  }

  return (
    <form className="demo-quote-form" onSubmit={handleSubmit}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="practice">Practice Area</label>
        <select id="practice" className="demo-form-select" value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)}>
          <option>Family Law</option>
          <option>Estate Planning</option>
          <option>Real Estate Law</option>
          <option>Business Formation</option>
          <option>Personal Injury</option>
          <option>Criminal Defense</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="attorney">Preferred Attorney</label>
        <select id="attorney" className="demo-form-select" value={attorney} onChange={(e) => setAttorney(e.target.value)}>
          <option>No preference</option>
          <option>Patricia Holloway, J.D.</option>
          <option>Marcus Chen, J.D.</option>
          <option>Jennifer Torres, J.D.</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="consult-type">Preferred Consultation Type</label>
        <select id="consult-type" className="demo-form-select" value={consultType} onChange={(e) => setConsultType(e.target.value)}>
          <option>In-person</option>
          <option>Zoom video call</option>
          <option>Phone call</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="client-status">Are You a New or Existing Client?</label>
        <select id="client-status" className="demo-form-select" value={clientStatus} onChange={(e) => setClientStatus(e.target.value)}>
          <option>New client</option>
          <option>Existing client</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="referral">How Did You Hear About Us?</label>
        <select id="referral" className="demo-form-select" value={referral} onChange={(e) => setReferral(e.target.value)}>
          <option>Google search</option>
          <option>Referral from friend/family</option>
          <option>Avvo or Martindale</option>
          <option>Facebook</option>
          <option>Walked by the office</option>
          <option>Other attorney referral</option>
          <option>Other</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="date">Preferred Date &amp; Time</label>
        <input id="date" className="demo-form-input" type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. Tuesday, March 12 at 2:00 PM" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="name">Full Name</label>
        <input id="name" className="demo-form-input" type="text" required placeholder="Your name" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="email">Email Address</label>
        <input id="email" className="demo-form-input" type="email" required placeholder="you@email.com" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="phone">Phone Number</label>
        <input id="phone" className="demo-form-input" type="tel" placeholder="(815) 555-0000" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="description">Brief Description of Your Situation</label>
        <textarea id="description" className="demo-form-textarea" rows={4} placeholder="Please provide a brief summary. This helps us assign the right attorney and prepare for your consultation. This information is confidential." />
      </div>
      <button type="submit" className="demo-btn demo-btn--primary">Request Consultation</button>
      <p className="demo-form-note">By submitting this form, you understand that no attorney-client relationship is created until a retainer agreement is signed. Confidential information should not be shared until then.</p>
    </form>
  );
};

const LawFirmDemo: React.FC = () => (
  <DemoLayout demoName="Rock River Legal Group" industry="Law Firm / Legal Services" themeColor="#1a3a5c" designSystem="elegant">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/law-firm/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Serving Lee, Ogle & Whiteside Counties Since 2005</span>
        <h1 className="demo-hero__title">Rock River Legal Group</h1>
        <p className="demo-hero__subtitle">A small-town law firm with big-firm experience. Estate planning, family law, business formation, real estate, and criminal defense. Located on First Street in Dixon, IL — the Lee County seat. We know the local courts and the local people.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550915" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0915</a>
          <a href="#consultation" className="demo-btn demo-btn--ghost">Book a Consultation</a>
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Features at a glance</h2>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Rock River Legal Group features at a glance">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Practice area pages</td>
                <td style={{ padding: "0.75rem" }}>Detailed pages for family law, estate planning, real estate, business formation, personal injury, and criminal defense.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Attorney bios</td>
                <td style={{ padding: "0.75rem" }}>Professional profiles with education, bar admissions, practice areas, and background for each attorney.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Consultation booking</td>
                <td style={{ padding: "0.75rem" }}>Online form with practice area selector, attorney preference, date/time, and confidential description field.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Client resources</td>
                <td style={{ padding: "0.75rem" }}>Downloadable guides — estate planning checklist, divorce guide, business formation guide, and first-meeting checklist.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Online payments</td>
                <td style={{ padding: "0.75rem" }}>LawPay integration for secure, IOLTA-compliant retainer deposits and invoice payments by card or eCheck.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>E-signature</td>
                <td style={{ padding: "0.75rem" }}>DocuSign integration for remote signing of retainers, estate plans, and settlement agreements.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Virtual consultations</td>
                <td style={{ padding: "0.75rem" }}>Zoom and phone consultation options for clients who can't visit the Dixon office in person.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>SEO setup</td>
                <td style={{ padding: "0.75rem" }}>LegalService schema, practice area pages with unique content, Google Business Profile, and Avvo profile integration.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">20</div><div className="demo-stat__label">Years Serving the Valley</div></div>
          <div><div className="demo-stat__number">3</div><div className="demo-stat__label">Experienced Attorneys</div></div>
          <div><div className="demo-stat__number">1,500+</div><div className="demo-stat__label">Cases Handled</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={56} yelpRating={5.0} yelpReviewCount={8} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> Avvo Rated</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> Illinois State Bar</span>
          <span className="demo-trust-logo"><QuoteIcon size={20} /> BBB <span className="demo-trust-logo__rating">A+</span> Accredited</span>
        </div>
      </div>
    </section>

    {/* Split image + text: Welcome */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/reception.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Welcome to Rock River Legal Group</h2>
            <p className="demo-split-image-text__text">Our office is on First Street in downtown Dixon — one block from the Lee County Courthouse. When you walk in, you'll be greeted by name. We're not a big-city firm where you're a case number.</p>
            <p className="demo-split-image-text__text">Three attorneys, two paralegals, and a support staff that knows the local courts. We've been here since 2005, and we're not going anywhere.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Practice Areas</h2>
        <p className="demo-section__subtitle">Six core practice areas serving individuals, families, and businesses across the Rock River Valley.</p>
        <div className="demo-services-grid">
          {practiceAreas.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="demo-service-card">
                <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/law-firm/${p.img}.jpg)` }} />
                <div className="demo-service-card__body">
                  <div className="demo-service-card__icon"><Icon size={28} /></div>
                  <h3 className="demo-service-card__name">{p.name}</h3>
                  <p className="demo-service-card__desc">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Feature image: Your Case Deserves Attention */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/law-firm/conference-room.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Your Case Deserves Attention</h2>
        <p className="demo-feature-image__text">The same attorney handles your case from start to finish. No handoffs, no junior associates learning on your dime.</p>
      </div>
    </div>

    {/* Case Results / Settlements */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Case Results &amp; Settlements</h2>
        <p className="demo-section__subtitle">Real outcomes for real clients across the Rock River Valley. Past results do not guarantee future outcomes — every case is unique.</p>
        <div className="demo-services-grid">
          {caseResults.map((c, i) => (
            <div key={i} className="demo-service-card">
              <div className="demo-service-card__body">
                <span className="demo-service-card__tag" style={{ marginBottom: "0.5rem", display: "inline-block" }}>{c.area}</span>
                <h3 className="demo-service-card__name" style={{ fontSize: "1.5rem", color: "var(--demo-accent)" }}>{c.result}</h3>
                <p className="demo-service-card__desc">{c.desc}</p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.75rem", opacity: 0.7 }}>Attorney: {c.attorney} · {c.year}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.7, fontStyle: "italic" }}>Past results do not guarantee future outcomes. Every case is unique and depends on its specific facts.</p>
      </div>
    </section>

    {/* Split image + text: Deep Legal Knowledge */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Deep Legal Knowledge</h2>
            <p className="demo-split-image-text__text">Our attorneys trained at the University of Illinois, Northwestern Pritzker, and the University of Iowa — then came home to the Rock River Valley. Big-firm experience, small-town values.</p>
            <p className="demo-split-image-text__text">We keep our library current with Illinois case law updates, practice guides, and continuing legal education. But we explain things in plain English, not legalese.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/law-library.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Statute of Limitations Calculator */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Statute of Limitations Calculator</h2>
        <p className="demo-section__subtitle">Don't let your deadline pass. Illinois law sets strict time limits for filing lawsuits. Check yours now.</p>
        <StatuteCalculator />
      </div>
    </section>

    {/* Free Consultation Eligibility Checker */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Consultation Fee Checker</h2>
        <p className="demo-section__subtitle">Your first consultation may be free. Check your practice area below.</p>
        <ConsultationChecker />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Attorneys</h2>
        <p className="demo-section__subtitle">Experienced, approachable, and rooted in the community. The same attorney handles your case from start to finish.</p>
        <div className="demo-team-grid">
          {attorneys.map((a) => (
            <div key={a.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(${a.photo})` }} />
              <div className="demo-team-card__body">
                <h3 className="demo-team-card__name">{a.name}</h3>
                <p className="demo-team-card__role">{a.role}</p>
                <p className="demo-team-card__bio">{a.bio}</p>
                <div style={{ marginTop: "0.75rem", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  <p><strong>Education:</strong> {a.education}</p>
                  <p><strong>Bar Admissions:</strong> {a.bar}</p>
                  <p><strong>Practice Areas:</strong> {a.practice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feature image: We Know the Local Courts */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/law-firm/courthouse.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">We Know the Local Courts</h2>
        <p className="demo-feature-image__text">Lee, Ogle, Whiteside, and Winnebago counties — we practice here every day. One block from the Lee County Courthouse.</p>
      </div>
    </div>

    {/* Split image + text: Your First Consultation */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/consultation.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Your First Consultation</h2>
            <p className="demo-split-image-text__text">Bring your documents, your questions, and your timeline. We'll listen, assess your situation, and give you honest options — including whether you even need a lawyer.</p>
            <p className="demo-split-image-text__text">Consultations are $150 for 45 minutes (credited to your case if you retain us). Estate planning consultations are free. Personal injury consultations are free — we work on contingency.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt" id="consultation">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Book a Consultation</h2>
        <p className="demo-section__subtitle">Tell us about your situation and we'll match you with the right attorney. Consultations are $150 (credited to your case) or free for estate planning and personal injury.</p>
        <ConsultationForm />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Client Resources</h2>
        <p className="demo-section__subtitle">Free downloadable guides to help you understand your legal situation before you call. No email required.</p>
        <div className="demo-services-grid">
          {resources.map((r) => (
            <div key={r.title} className="demo-service-card">
              <div className="demo-service-card__icon"><DocumentIcon size={32} /></div>
              <h3 className="demo-service-card__title">{r.title}</h3>
              <p className="demo-service-card__desc">{r.desc}</p>
              <span className="demo-service-card__tag">{r.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Clients Say</h2>
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
        <h2 className="demo-section__title">Our Office</h2>
        <p className="demo-section__subtitle">Located on First Street in downtown Dixon, IL — one block from the Lee County Courthouse. Free parking behind the building.</p>
        <GoogleMapsEmbed address="Dixon, IL" height={300} title="Rock River Legal Group office location" />
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.95rem" }}>
          <span><MapPinIcon size={18} /> 208 W First Street, Dixon, IL 61021</span>
          <span><PhoneIcon size={18} /> (815) 555-0915</span>
          <span><ClockIcon size={18} /> Mon–Fri 8:30 AM – 5:00 PM · Evenings by appointment</span>
        </div>
      </div>
    </section>

    <IntegrationsSection industry="law firms & legal services" integrations={integrations} />

    <section className="demo-contact" style={{ background: "#0f1e30" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Need to Talk to a Lawyer?</h2>
        <p className="demo-contact__text">Call (815) 555-0915 or book a consultation online. We serve Dixon, Oregon, Belvidere, Sycamore, and Monroe — the county seats of the Rock River Valley.</p>
        <a href="tel:8155550915" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0915</a>
        <div style={{ marginTop: "1.5rem" }}>
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Rock River Legal Group</div>
        <div>208 W First Street, Dixon, IL 61021 · (815) 555-0915</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default LawFirmDemo;

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
        { name: "Law Firm", path: pathname },
      ]}
    />
  );
};
