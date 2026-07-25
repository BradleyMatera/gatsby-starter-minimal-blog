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
import { StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, DocumentIcon, ScrollIcon, QuoteIcon } from "../../site/icons";

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
];

const practiceAreas = [
  { name: "Family Law", desc: "Divorce, child custody, child support, adoption, and prenuptial agreements. We handle the emotional and legal complexities with compassion and clarity.", icon: ShieldIcon },
  { name: "Estate Planning", desc: "Wills, trusts, powers of attorney, and healthcare directives. Protect your assets and provide for your family. Flat-fee packages available.", icon: DocumentIcon },
  { name: "Real Estate Law", desc: "Residential and commercial closings, title issues, boundary disputes, and landlord-tenant matters. We're your closing attorney in Lee, Ogle, and Whiteside counties.", icon: ScrollIcon },
  { name: "Business Formation", desc: "LLC, S-corp, and partnership formation. Operating agreements, contracts, and ongoing counsel for small businesses across the Rock River Valley.", icon: ScrollIcon },
  { name: "Personal Injury", desc: "Auto accidents, slip and fall, and workplace injuries. We deal with the insurance companies so you can focus on recovery. Contingency fee — no recovery, no fee.", icon: ShieldIcon },
  { name: "Criminal Defense", desc: "DUI, traffic violations, misdemeanors, and felony defense. Former Lee County prosecutor on our team — we know how the other side thinks.", icon: ShieldIcon },
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

const ConsultationForm: React.FC = () => {
  const [practiceArea, setPracticeArea] = React.useState("Family Law");
  const [attorney, setAttorney] = React.useState("No preference");
  const [date, setDate] = React.useState("");
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
        <p><strong>Practice Area:</strong> {practiceArea}<br /><strong>Preferred Attorney:</strong> {attorney}<br /><strong>Preferred Date:</strong> {date || "To be scheduled"}</p>
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

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Practice Areas</h2>
        <p className="demo-section__subtitle">Six core practice areas serving individuals, families, and businesses across the Rock River Valley.</p>
        <div className="demo-services-grid">
          {practiceAreas.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="demo-service-card">
                <div className="demo-service-card__icon"><Icon size={32} /></div>
                <h3 className="demo-service-card__title">{p.name}</h3>
                <p className="demo-service-card__desc">{p.desc}</p>
              </div>
            );
          })}
        </div>
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

    <section className="demo-section" id="consultation">
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
