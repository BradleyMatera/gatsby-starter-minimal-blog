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
import { StarIcon, MapPinIcon, PhoneIcon, CheckIcon, ClockIcon, DocumentIcon, ScrollIcon, QuoteIcon, AlertIcon } from "../../site/icons";

const pathname = "/demos/law-firm/";
const pageTitle = "Rock River Legal Group — Business, Estate & Real Estate Counsel | Demo Website";
const pageDescription = "Demo law firm website for Rock River Legal Group — business counsel, estate planning, and real estate closings for the Rock River Valley. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "linkedin", url: "https://linkedin.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "facebook", url: "https://facebook.com" },
];

const integrations: Integration[] = [
  { name: "Clio Manage", category: "Practice Management", description: "Client intake, matter management, time tracking, billing, and document automation. Your website consultation form creates a new contact and matter in Clio automatically — no manual entry.", freeTier: "From $49/user/month. 10-day free trial.", url: "https://cliocom", status: "mocked" },
  { name: "LawPay", category: "Client Payments", description: "Secure, trust-compliant payment processing for retainers and invoices. Clients pay by card or eCheck directly from your website or email invoice. IOLTA-compliant trust accounting.", freeTier: "No monthly fee. $0.95 + 2.95% per card transaction. $0.95 per eCheck.", url: "https://lawpay.com", status: "mocked" },
  { name: "Calendly", category: "Scheduling", description: "Online consultation scheduling synced with attorney calendars. Clients pick a time that works, and Calendly blocks it in Clio and sends confirmation emails with intake forms.", freeTier: "Free for 1 event type. Standard from $10/user/month.", url: "https://calendly.com", status: "available" },
  { name: "DocuSign", category: "Document Signing", description: "Electronic signature for retainers, estate plans, operating agreements, and closing documents. Clients sign from their phone. Completed documents auto-file to the correct Clio matter.", freeTier: "From $15/month for 5 envelopes. 30-day free trial.", url: "https://docusign.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Directions", description: "Interactive map showing your office location with parking info. Clients get directions directly from the consultation confirmation page.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Zapier Automation", category: "Workflow Integration", description: "Connect your website forms to 5,000+ apps. Consultation requests route to Clio, Calendly, and your email — all automatically. No manual data entry.", freeTier: "Free for 100 tasks/month. Starter from $19.99/month.", url: "https://zapier.com", status: "available" },
  { name: "Fastcase Legal Research", category: "Legal Research", description: "Cloud-based case law database with AI-powered search. Attorneys research precedent and statutes directly from the matter file. Includes Illinois-specific case law.", freeTier: "Included with Illinois State Bar Association membership. Standalone from $95/user/month.", url: "https://fastcase.com", status: "mocked" },
  { name: "Illinois Courts e-Filing System", category: "Court Filing", description: "Direct electronic filing to Illinois circuit courts. File pleadings from your website dashboard without leaving the matter. Automatic docket updates.", freeTier: "Free for all Illinois-licensed attorneys. Mandated by Illinois Supreme Court Rule 9.", url: "https://efile.illinoiscourts.gov", status: "mocked" },
  { name: "Smokeball Document Automation", category: "Document Automation", description: "Automated legal document generation. Estate plans, operating agreements, and LLC formations generated from matter data in seconds. Illinois-specific templates.", freeTier: "From $99/user/month. 14-day free trial.", url: "https://smokeball.com", status: "mocked" },
  { name: "LexisNexis Public Records", category: "Background & Asset Search", description: "Background checks, asset searches, and public records lookups for litigation support. Find defendants, locate assets, verify witness backgrounds.", freeTier: "Pay-per-search from $7. Subscription from $89/month.", url: "https://lexisnexis.com", status: "available" },
];

const practiceAreas = [
  { name: "Business Counsel & Contracts", desc: "Operating agreements, contract review, buy-sell provisions, vendor disputes, and ongoing outside general counsel for small businesses across the Rock River Valley.", icon: ScrollIcon, img: "business-law" },
  { name: "Estate Planning & Probate", desc: "Wills, trusts, powers of attorney, healthcare directives, and probate administration. Flat-fee packages available so you know the cost before we start.", icon: DocumentIcon, img: "estate-planning" },
  { name: "Real Estate Closings & Title", desc: "Residential and commercial closings, title examinations, deed preparation, and boundary issues in Lee, Ogle, Whiteside, and Winnebago counties.", icon: MapPinIcon, img: "real-estate-law" },
  { name: "Business Succession", desc: "Transition planning for family-owned businesses, from buy-sell agreements to entity restructuring — so what you built stays in the right hands.", icon: ScrollIcon, img: "conference-room" },
];

const attorneys = [
  {
    name: "Patricia Holloway, J.D.",
    role: "Founding Partner",
    photo: "/images/demos/law-firm/attorney-1.jpg",
    education: "University of Illinois College of Law, J.D. 1998 | Illinois State University, B.A. Political Science 1995",
    bar: "Illinois State Bar (1998), U.S. District Court Northern District of Illinois (2000)",
    practice: "Estate Planning, Business Succession, Real Estate",
    bio: "Patricia founded Rock River Legal Group in 2005 after seven years at a Chicago firm. She grew up in Dixon and returned to serve the community she loves. She guides business owners through estate plans and succession transitions, and handles complex real estate closings. Member of the Illinois State Bar Association Trusts and Estates Section."
  },
  {
    name: "Marcus Chen, J.D.",
    role: "Partner",
    photo: "/images/demos/law-firm/attorney-2.jpg",
    education: "Northwestern Pritzker School of Law, J.D. 2005 | University of Iowa, B.A. Economics 2002",
    bar: "Illinois State Bar (2005), U.S. District Court Northern District of Illinois (2007)",
    practice: "Business Law, Real Estate Closings, Contract Disputes",
    bio: "Marcus joined the firm in 2010 after five years advising closely held businesses at a Rockford firm. He knows the local courts and the local economy, and focuses on contracts, commercial real estate closings, and business disputes."
  },
  {
    name: "Jennifer Torres, J.D.",
    role: "Associate Attorney",
    photo: "/images/demos/law-firm/attorney-3.jpg",
    education: "University of Iowa College of Law, J.D. 2015 | Northern Illinois University, B.S. Business Administration 2012",
    bar: "Illinois State Bar (2015)",
    practice: "Business Formation, Estate Planning, Real Estate",
    bio: "Jennifer joined the firm in 2018 and has become the go-to attorney for small business owners forming LLCs and families setting up their first estate plans. She offers flat-fee consultations and is known for making legal concepts approachable. Fluent in Spanish."
  },
];

const resources = [
  { title: "Estate Planning Checklist", desc: "A guide covering wills, trusts, powers of attorney, and healthcare directives. Includes a worksheet to organize your assets and beneficiaries.", type: "PDF Download" },
  { title: "Business Formation Guide", desc: "LLC vs. S-Corp vs. Partnership — which is right for your business? Includes Illinois filing requirements and operating agreement templates.", type: "PDF Download" },
  { title: "Real Estate Closing Checklist", desc: "What to expect at closing, what to bring, and the documents you will sign when buying or selling property in Illinois.", type: "PDF Download" },
  { title: "What to Bring to Your First Meeting", desc: "A checklist of documents and information to bring to your initial consultation so we can make the most of your time.", type: "PDF Download" },
];

const faqs: FAQItem[] = [
  { q: "How much is the initial consultation?", a: "Initial consultations are $150 for a 45-minute meeting with one of our attorneys. This fee is credited toward your case if you retain us. Estate planning consultations are complimentary because we offer flat-fee packages." },
  { q: "What payment options do you accept?", a: "We accept all major credit cards, eCheck via LawPay, and traditional checks. For most matters, we require a retainer deposit that is drawn down as work is performed. Estate planning and business formation are typically flat-fee. Payment plans are available for qualifying matters." },
  { q: "What should I bring to my first meeting?", a: "Bring a photo ID, any relevant documents (contracts, deeds, operating agreements, estate-planning documents, business records), a list of questions, and a timeline of events. For estate planning, bring a list of your assets, approximate values, and beneficiary names. For a business matter, bring your formation documents and any contracts in dispute. Download our checklist from the Resources section." },
  { q: "How quickly will you respond to my calls and emails?", a: "We respond to all client communications within one business day — usually the same day. Our support staff monitors calls and emails throughout the day. If your attorney is in court or a closing, you'll speak with a staff member who can access your file. Urgent matters are handled immediately." },
  { q: "Do you offer virtual consultations?", a: "Yes. We offer consultations via Zoom or phone for clients who can't come to our Dixon office. We serve clients across Lee, Ogle, Whiteside, and Winnebago counties. Document signing can be done electronically via DocuSign. In-person meetings are available by appointment." },
  { q: "Do you handle litigation or criminal defense?", a: "Our practice focuses on business counsel, estate planning, and real estate matters. For litigation or criminal defense matters, we refer clients to trusted local counsel whose practice is dedicated to those areas." },
];

const testimonials = [
  { text: "Patricia made the estate planning process painless. She explained everything in plain English, not legalese. My trust, will, and powers of attorney were done in two meetings. The peace of mind is worth every penny.", author: "Robert & Linda H.", location: "Estate Planning Clients, Dixon, IL" },
  { text: "When I started my manufacturing business, Jennifer set up my LLC and operating agreement for a flat fee. She thought of things I never would have — buy-sell provisions, liability protection. Two years later she's still my go-to for contract review.", author: "Steve M.", location: "Business Formation Client, Sterling, IL" },
  { text: "Marcus handled the closing on our family's commercial property. He caught a title issue that could have delayed everything and got it resolved before closing day. He kept us informed every step of the way.", author: "David & Rachel K.", location: "Real Estate Clients, Oregon, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const representativeExperience = [
  { area: "Estate Planning", matter: "Multi-generational farm succession", desc: "Structured a transition plan for a family farm, combining operating agreements, gifting strategies, and entity restructuring to keep the operation intact across generations.", attorney: "Patricia Holloway", note: "Illustrative sample matter" },
  { area: "Business Counsel", matter: "Manufacturing supplier contract dispute", desc: "Reviewed a breached supply agreement, identified enforceable remedies, and negotiated a resolution that preserved the business relationship while recovering the client's losses.", attorney: "Marcus Chen", note: "Illustrative sample matter" },
  { area: "Real Estate", matter: "Commercial closing with clouded title", desc: "Identified a chain-of-title defect in a decades-old deed and worked with the title company to clear it before closing.", attorney: "Jennifer Torres", note: "Illustrative sample matter" },
  { area: "Estate Planning", matter: "Small business owner's estate plan", desc: "Drafted wills, powers of attorney, and a revocable trust for a business owner, coordinating with the client's CPA and insurance advisor.", attorney: "Patricia Holloway", note: "Illustrative sample matter" },
];

const deadlineGuide = [
  { topic: "Contracts & Business Disputes", note: "Written contracts often have longer deadlines than oral agreements, but the exact limit depends on the contract terms and when the breach was discovered." },
  { topic: "Estate & Probate Deadlines", note: "Probate filings, creditor claims, and tax deadlines have strict windows that vary by county and estate size. Missing one can be costly." },
  { topic: "Real Estate Closings", note: "Contract deadlines, inspection contingencies, and title objection periods are governed by your purchase contract — not a general statute." },
  { topic: "Why deadlines matter", note: "Waiting almost always makes legal problems harder and more expensive. If you think you may have a deadline, contact an attorney now rather than guessing." },
];

const DeadlineExplainer: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto" }}>
      <div className="demo-faq" style={{ marginBottom: "1.5rem" }}>
        {deadlineGuide.map((d) => (
          <div key={d.topic} className="demo-faq__item" role="button" tabIndex={0} style={{ cursor: "pointer" }} onClick={() => setSelected(selected === d.topic ? null : d.topic)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(selected === d.topic ? null : d.topic); }}>
            <h3 className="demo-faq__question" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {d.topic}
              <span style={{ fontSize: "0.8rem", color: "var(--demo-text-muted)" }}>{selected === d.topic ? "−" : "+"}</span>
            </h3>
            {selected === d.topic && <p className="demo-faq__answer">{d.note}</p>}
          </div>
        ))}
      </div>
      <div className="demo-quote-form__success" style={{ borderColor: "#ff6b6b" }}>
        <AlertIcon size={32} />
        <h3 style={{ color: "#ff6b6b" }}>Deadlines are specific to your situation</h3>
        <p>The information above is general. Your actual deadline depends on the facts, the county, the court, and the documents involved. Do not rely on this page to calculate your deadline. If you think you may have a legal deadline, contact an attorney immediately.</p>
        <p style={{ fontSize: "0.8rem", marginTop: "0.75rem", opacity: 0.8 }}>This is an educational demo. It does not provide legal advice and does not create an attorney-client relationship.</p>
      </div>
    </div>
  );
};

const ConsultationForm: React.FC = () => {
  const [practiceArea, setPracticeArea] = React.useState("Business Counsel & Contracts");
  const [attorney, setAttorney] = React.useState("No preference");
  const [date, setDate] = React.useState("");
  const [consultType, setConsultType] = React.useState("In-person");
  const [urgency, setUrgency] = React.useState("No urgency — planning ahead");
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
        <p>Thank you. We'll call you within one business day to confirm your appointment. If you have an urgent deadline, call <a href="tel:8155550915">(815) 555-0915</a> now rather than waiting.</p>
        <p><strong>Practice Area:</strong> {practiceArea}<br /><strong>Preferred Attorney:</strong> {attorney}<br /><strong>Preferred Date:</strong> {date || "To be scheduled"}<br /><strong>Consultation Type:</strong> {consultType}</p>
        <p style={{ fontSize: "0.8rem", marginTop: "1rem", opacity: 0.8 }}>This is a demo form. It does not submit to a real law firm and does not create an attorney-client relationship.</p>
        <button className="demo-btn demo-btn--ghost" onClick={() => setSubmitted(false)}>Submit another request</button>
      </div>
    );
  }

  return (
    <form className="demo-quote-form" onSubmit={handleSubmit}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="practice">Practice Area</label>
        <select id="practice" className="demo-form-select" value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)}>
          <option>Business Counsel &amp; Contracts</option>
          <option>Estate Planning &amp; Probate</option>
          <option>Real Estate Closings &amp; Title</option>
          <option>Business Succession</option>
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
        <label className="demo-form-label" htmlFor="urgency">Is this time-sensitive?</label>
        <select id="urgency" className="demo-form-select" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option>No urgency — planning ahead</option>
          <option>Closing or deadline within 30 days</option>
          <option>Urgent — deadline within 7 days</option>
          <option>Emergency — need to speak today</option>
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
        <label className="demo-form-label" htmlFor="description">How can we help? (Keep it general — no confidential details)</label>
        <textarea id="description" className="demo-form-textarea" rows={4} placeholder="Briefly describe the matter type (e.g., 'reviewing an operating agreement' or 'estate plan for family farm'). Do not share confidential details until a retainer agreement is signed." />
      </div>
      <button type="submit" className="demo-btn demo-btn--primary">Request Consultation</button>
      <p className="demo-form-note">This is a demo form. No attorney-client relationship is created by submitting it. Confidential or time-sensitive information should not be sent through this form. If you have an urgent legal issue, call (815) 555-0915.</p>
    </form>
  );
};

const LawFirmDemo: React.FC = () => (
  <DemoLayout demoName="Rock River Legal Group" industry="Law Firm / Legal Services" themeColor="#c9a227" designSystem="legal">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/law-firm/office-exterior.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Business · Estate · Real Estate · Dixon, IL</span>
        <h1 className="demo-hero__title">Outside counsel for Northern Illinois businesses and families</h1>
        <p className="demo-hero__subtitle">Rock River Legal Group handles operating agreements, estate plans, real estate closings, and business succession — explained in plain English, with flat-fee options where possible.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550915" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0915</a>
          <a href="#consultation" className="demo-btn demo-btn--ghost">Book a Consultation</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner" style={{ background: "#2b1810", color: "#e8e0d4", borderBottom: "1px solid var(--demo-border)" }}>
      <DocumentIcon size={18} /> <strong>Demo website:</strong> Rock River Legal Group is a fictional concept. Attorneys, cases, testimonials, and credentials are illustrative. No attorney-client relationship is created.
    </div>

    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">20</div><div className="demo-stat__label">Illustrative Years</div></div>
          <div><div className="demo-stat__number">3</div><div className="demo-stat__label">Illustrative Attorneys</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Illustrative Counties</div></div>
          <div><div className="demo-stat__number">$150</div><div className="demo-stat__label">Illustrative Consult Fee</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={56} yelpRating={5.0} yelpReviewCount={8} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><CheckIcon size={20} /> Illinois State Bar (illustrative)</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> Lee County Bar (illustrative)</span>
          <span className="demo-trust-logo"><QuoteIcon size={20} /> BBB <span className="demo-trust-logo__rating">A+</span> (illustrative)</span>
        </div>
      </div>
    </section>

    {/* Split image + text: Welcome */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/reception.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Advising Northern Illinois businesses and families</h2>
            <p className="demo-split-image-text__text">Our office is on First Street in downtown Dixon — one block from the Lee County Courthouse. We serve clients in Sterling, Oregon, Rockford, and the surrounding counties.</p>
            <p className="demo-split-image-text__text">We focus on the areas where business and family overlap: protecting a family farm through an estate plan, structuring an LLC, or making sure a commercial closing closes on time.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Practice Areas</h2>
        <p className="demo-section__subtitle">Focused counsel for business, estate, and real estate matters across the Rock River Valley.</p>
        <div className="demo-two-col" style={{ gap: "1.5rem" }}>
          {practiceAreas.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="demo-split-image-text" style={{ alignItems: "flex-start", gap: "1rem" }}>
                <div className="demo-split-image-text__image" style={{ backgroundImage: `url(/images/demos/law-firm/${p.img}.jpg)`, height: "140px", minWidth: "200px", flex: "0 0 200px" }} />
                <div className="demo-split-image-text__content" style={{ padding: 0 }}>
                  <h3 className="demo-split-image-text__title" style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}><span style={{ marginRight: "0.5rem", verticalAlign: "middle" }}><Icon size={22} /></span>{p.name}</h3>
                  <p className="demo-split-image-text__text" style={{ fontSize: "0.95rem" }}>{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ marginTop: "2rem", overflowX: "auto" }} tabIndex={0} role="region" aria-label="Practice area comparison">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--demo-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Practice Area</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Typical Matters</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Consultation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Business Counsel</td><td style={{ padding: "0.75rem" }}>Contracts, entity formation, employment</td><td style={{ padding: "0.75rem" }}>Free 30-min</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Estate Planning</td><td style={{ padding: "0.75rem" }}>Wills, trusts, powers of attorney, probate</td><td style={{ padding: "0.75rem" }}>Free 30-min</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Real Estate Closings</td><td style={{ padding: "0.75rem" }}>Purchase, sale, title, commercial lease</td><td style={{ padding: "0.75rem" }}>Flat fee</td></tr>
              <tr><td style={{ padding: "0.75rem" }}>Business Succession</td><td style={{ padding: "0.75rem" }}>Ownership transition, buy-sell agreements</td><td style={{ padding: "0.75rem" }}>Free 30-min</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--demo-text-muted)" }}>Illustrative practice areas for demo purposes. This is a fictional law firm.</p>
      </div>
    </section>

    {/* Feature image: Your Case Deserves Attention */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/law-firm/conference-room.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">The same attorney handles your matter from start to finish</h2>
        <p className="demo-feature-image__text">No handoffs, no junior associates learning on your dime. Your lawyer knows your file, your timeline, and your goals.</p>
      </div>
    </div>

    {/* Representative Experience */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Representative Experience</h2>
        <p className="demo-section__subtitle">Illustrative sample matters. These fictional summaries show the types of business, estate, and real estate work the firm could handle.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {representativeExperience.map((c, i) => (
            <div key={i} style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1.25rem" }}>
              <span className="demo-service-card__tag">{c.area}</span>
              <h3 style={{ fontSize: "1.2rem", margin: "0.35rem 0 0.5rem" }}>{c.matter}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", lineHeight: 1.6 }}>{c.desc}</p>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.7 }}>Attorney: {c.attorney} · {c.note}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.7, fontStyle: "italic" }}>These summaries are illustrative only and do not represent real cases or guarantee future results.</p>
      </div>
    </section>

    {/* Industries / Client Types */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Who we serve</h2>
        <p className="demo-section__subtitle">Local businesses and families whose legal needs cross business, estate, and property.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Small Businesses</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)" }}>LLC formation, operating agreements, contract review, vendor disputes, and ongoing counsel.</p>
          </div>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Families & Estates</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)" }}>Wills, trusts, powers of attorney, probate administration, and farm/business succession.</p>
          </div>
          <div style={{ borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Property Buyers & Sellers</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)" }}>Residential and commercial closings, title review, deed preparation, and boundary matters.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Split image + text: Deep Legal Knowledge */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Clear counsel, not legalese</h2>
            <p className="demo-split-image-text__text">Attorneys at Rock River Legal Group combine training at Illinois, Northwestern Pritzker, and Iowa law schools with local practice in the Rock River Valley. Big-firm training, small-town accessibility.</p>
            <p className="demo-split-image-text__text">We explain options in plain English, recommend only work that moves your matter forward, and keep current with Illinois business law, estate planning rules, and local real estate practice.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/attorney-office.jpg)" }} />
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet Our Attorneys</h2>
        <p className="demo-section__subtitle">Fictional attorney profiles for demonstration. All biographical details, bar admissions, and credentials are illustrative.</p>
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

    {/* Practical Insights */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Practical Insights</h2>
        <p className="demo-section__subtitle">Plain-English guidance on common business, estate, and real estate questions.</p>
        <div className="demo-faq">
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">When should a small business owner update their operating agreement?</h3>
            <p className="demo-faq__answer">Anytime ownership changes, a new partner joins, the business adds a major service line, or the company approaches a succession event. An outdated operating agreement is a common source of disputes.</p>
          </div>
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">What is the difference between a will and a trust?</h3>
            <p className="demo-faq__answer">A will takes effect at death and usually requires probate. A trust can hold assets during your lifetime and transfer them at death without probate. The right choice depends on your assets, goals, and family situation.</p>
          </div>
          <div className="demo-faq__item">
            <h3 className="demo-faq__question">Do I need an attorney for a residential closing in Illinois?</h3>
            <p className="demo-faq__answer">Illinois does not require a buyer to use an attorney, but title issues, contract deadlines, and lender requirements can derail a closing. An attorney review is often the best protection against last-minute surprises.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Educational Deadline Explainer */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Understanding Legal Deadlines</h2>
        <p className="demo-section__subtitle">Deadlines vary by matter, county, contract, and facts. Use this as a starting point, then speak with an attorney about your specific situation.</p>
        <DeadlineExplainer />
      </div>
    </section>

    {/* Split image + text: Your First Consultation */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/law-firm/consultation.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Your First Consultation</h2>
            <p className="demo-split-image-text__text">Bring your documents, your questions, and your timeline. We'll listen, assess your situation, and give you honest options — including whether you even need a lawyer.</p>
            <p className="demo-split-image-text__text">Initial business and real estate consultations are $150 for 45 minutes and credited to your matter if you retain us. Estate planning consultations are complimentary because we offer flat-fee packages.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section" id="consultation">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Request a Confidential Consultation</h2>
        <p className="demo-section__subtitle">Tell us the type of matter and we'll match you with the right attorney. This is a demo form — it does not submit to a real firm.</p>
        <ConsultationForm />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Client Resources</h2>
        <p className="demo-section__subtitle">Downloadable guides to help you prepare before you call. These are illustrative samples.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {resources.map((r) => (
            <div key={r.title} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", border: "1px solid var(--demo-border)" }}>
              <div style={{ color: "var(--demo-accent)", flexShrink: 0 }}><DocumentIcon size={32} /></div>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{r.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", marginBottom: "0.5rem" }}>{r.desc}</p>
                <span className="demo-service-card__tag">{r.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Clients Say</h2>
        <p className="demo-section__subtitle" style={{ textAlign: "center", color: "var(--demo-text-muted)", marginBottom: "2rem" }}>Illustrative testimonials for demonstration purposes.</p>
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
        <h2 className="demo-contact__title">Need to talk through a business, estate, or real estate matter?</h2>
        <p className="demo-contact__text">Call (815) 555-0915 or request a consultation online. We serve Dixon, Sterling, Oregon, Rockford, and the surrounding counties.</p>
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
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. All data, testimonials, and case summaries are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
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
