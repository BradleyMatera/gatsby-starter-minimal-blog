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
import { StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, AlertIcon, DocumentIcon, DownloadIcon } from "../../site/icons";

const pathname = "/demos/dental/";
const pageTitle = "Rock River Family Dental — Transparent Family Dentistry | Demo Website";
const pageDescription = "Demo dental website for Rock River Family Dental — transparent first visits, family dentistry, clear cost information, and online scheduling. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "instagram", url: "https://instagram.com" },
];

const integrations: Integration[] = [
  { name: "Dentrix", category: "Practice Management", description: "Patient scheduling, charting, treatment planning, and billing. Your website's online scheduling widget can sync with Dentrix chair availability to reduce double-booking.", freeTier: "From $450/month (Dentrix Ascend cloud). 14-day free trial.", url: "https://dentrix.com", status: "mocked" },
  { name: "Demandforce", category: "Patient Communication & Reviews", description: "Automated appointment reminders by text and email, post-visit review requests, and patient reactivation campaigns. Reviews can flow to your website and Google profile.", freeTier: "From $299/month. Volume pricing available.", url: "https://demandforce.com", status: "mocked" },
  { name: "CareCredit Widget", category: "Patient Financing", description: "Embeddable financing application for dental procedures not covered by insurance. Patients can apply for payment plans directly on your site.", freeTier: "No monthly fee. Provider discount rate per transaction.", url: "https://carecredit.com", status: "mocked" },
  { name: "Calendly", category: "Online Scheduling", description: "New patient scheduling can be synced with your practice calendar. Patients pick a time slot, fill out intake forms online, and receive automatic reminders.", freeTier: "Free for 1 event type. Standard from $10/user/month.", url: "https://calendly.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Directions", description: "Interactive map showing your office location with parking info. Patients get directions directly from the appointment confirmation page.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile Reviews", category: "Reviews & Ratings", description: "Google reviews can be displayed on your website. Auto-updates when new reviews are posted. Links to your Google profile so patients can leave their own review.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email or text payment links for co-pays, deductibles, and outstanding balances. Patients pay by card or ACH.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
  { name: "Twilio SMS Reminders", category: "Patient Communication", description: "Automated SMS appointment reminders 48 hours and 2 hours before visits. Patients can confirm or reschedule by text.", freeTier: "Free trial. $0.0079 per SMS after.", url: "https://twilio.com/sms", status: "available" },
  { name: "Dental Intelligence Analytics", category: "Practice Analytics", description: "Dashboard showing production, case acceptance rates, hygiene reactivation, and new patient flow.", freeTier: "From $299/month. 14-day free trial.", url: "https://dentalintel.com", status: "mocked" },
  { name: "Weave Patient Communication", category: "Unified Communications", description: "Unified phone, text, and email platform with smart routing. Automated reactivation campaigns and review requests.", freeTier: "From $449/month. Custom pricing for multi-provider practices.", url: "https://getweave.com", status: "mocked" },
  { name: "Henry Schein Dental Supply", category: "Supply Ordering", description: "Supply ordering integration with your practice management system. Tracks inventory levels and streamlines reordering.", freeTier: "Free account. Pay for supplies ordered.", url: "https://henryschein.com", status: "mocked" },
  { name: "Vyne Trellis", category: "Insurance Claims", description: "Dental insurance claim management and electronic attachment platform. Auto-attach X-rays and narratives to claims. Track claim status from submission to payment.", freeTier: "From $99/month per practice. Per-claim pricing available.", url: "https://vyne.com", status: "mocked" },
];

const serviceCategories = [
  {
    category: "Preventive",
    items: [
      { name: "Cleanings & Exams", desc: "Comprehensive exams, digital X-rays, and professional cleanings." },
      { name: "Pediatric Dentistry", desc: "Gentle first visits starting at age 1, sealants, and fluoride." },
    ],
  },
  {
    category: "Restorative",
    items: [
      { name: "Fillings", desc: "Tooth-colored composite fillings for cavities and minor damage." },
      { name: "Crowns & Bridges", desc: "Porcelain and zirconia crowns; CEREC same-day crowns when appropriate." },
    ],
  },
  {
    category: "Cosmetic",
    items: [
      { name: "Teeth Whitening", desc: "In-office and take-home options. Results vary by patient." },
      { name: "Clear Aligners", desc: "Adult and teen aligner consultations with a 3D scan preview." },
    ],
  },
  {
    category: "Urgent",
    items: [
      { name: "Urgent Dental Care", desc: "Same-day slots when available for pain, breaks, lost fillings, and swelling." },
    ],
  },
];

const officeTour = [
  { label: "Reception Area", img: "reception" },
  { label: "Treatment Room", img: "treatment-room" },
  { label: "Digital X-Ray", img: "x-ray-room" },
  { label: "Kids' Corner", img: "pediatric-area" },
];

const team = [
  { name: "Dr. Sarah Anderson", role: "Founder & Lead Dentist", bio: "Fictional profile for demo purposes. DDS from University of Iowa College of Dentistry. 15 years in practice. Clear-aligner provider. Grew up in Dixon and came home to serve the community.", img: "owner" },
  { name: "Dr. James Patel", role: "Associate Dentist", bio: "Fictional profile for demo purposes. DMD from University of Illinois Chicago. 8 years in practice. Specializes in CEREC same-day crowns and restorative dentistry. Fluent in Hindi and Gujarati.", img: "dentist-1" },
  { name: "Dr. Emily Ross", role: "Associate Dentist", bio: "Fictional profile for demo purposes. DDS from Marquette University School of Dentistry. 5 years in practice. Focuses on pediatric and anxious patients with a gentle approach.", img: "dentist-2" },
  { name: "Maria Gonzalez", role: "Lead Dental Hygienist", bio: "Fictional profile for demo purposes. RDH from Carl Sandburg College. 12 years experience. Gentle touch that anxious patients love. Bilingual English/Spanish.", img: "hygienist-1" },
  { name: "Katie Mueller", role: "Dental Hygienist", bio: "Fictional profile for demo purposes. RDH from Illinois Central College. 7 years experience. Focuses on periodontal therapy and patient education.", img: "hygienist-2" },
  { name: "Lisa Chen", role: "Office Manager", bio: "Fictional profile for demo purposes. 12 years managing dental practices. Handles insurance verification, financing, and scheduling.", img: "dentist-3" },
];

const insuranceProviders = [
  { name: "Delta Dental", network: "Premier & PPO" },
  { name: "Cigna", network: "DPPO" },
  { name: "MetLife", network: "PPO" },
  { name: "Aetna", network: "PPO" },
  { name: "Guardian", network: "PPO" },
  { name: "United Concordia", network: "PPO" },
  { name: "Humana", network: "PPO" },
  { name: "BlueCross BlueShield", network: "Dental Blue" },
];

const financingOptions = [
  { name: "CareCredit", desc: "6, 12, or 24-month promotional financing plans for qualifying procedures. Apply online — decisions are typically available quickly.", details: "Promotional plans available. Standard APR applies if not paid in full during promo period." },
  { name: "In-House Membership Plan", desc: "For patients without insurance. $349/year includes 2 cleanings, 2 exams, X-rays, and a discount on other procedures.", details: "Individual and family plans available. Discounts vary by procedure." },
];

const newPatientSteps = [
  { step: 1, title: "Complete Online Intake", desc: "Fill out your medical history and insurance information online before your visit. We'll verify your benefits and provide a cost estimate before treatment." },
  { step: 2, title: "Comprehensive Exam", desc: "Your first visit includes a full exam, digital X-rays, oral cancer screening, and a cleaning if your gums are healthy. Plan for about 60–90 minutes." },
  { step: 3, title: "Transparent Treatment Plan", desc: "If treatment is recommended, we'll explain the plan, show the estimated cost, review how your insurance applies, and answer questions before you decide." },
];

const faqs: FAQItem[] = [
  { q: "What insurance plans do you accept?", a: "We work with Delta Dental, Cigna, MetLife, Aetna, Guardian, United Concordia, Humana, and BlueCross BlueShield. Coverage varies by plan. Call us at (815) 555-0387 with your insurance card and we'll verify your benefits before your appointment." },
  { q: "Do you offer payment plans?", a: "Yes. We accept CareCredit for qualifying procedures and offer an in-house membership plan for uninsured patients. The membership plan includes preventive care and a discount on other procedures. We'll explain all costs and options before any treatment." },
  { q: "Do you take emergency appointments?", a: "We reserve same-day urgent-care slots when available for severe pain, broken teeth, lost fillings, swelling, and dental trauma. Call (815) 555-0387 as early as possible for the best chance of same-day care. For uncontrolled bleeding or severe facial trauma, call 911 or go to the nearest emergency room." },
  { q: "What ages do you see for pediatric dentistry?", a: "We see children starting at age 1 for a gentle 'happy visit' introduction to the dental office. By age 3, we recommend regular cleanings every 6 months. We offer sealants, fluoride treatments, and a kid-friendly environment." },
  { q: "How much does Invisalign cost?", a: "Clear aligner treatment typically ranges from $3,500 to $6,500 depending on the complexity of your case and treatment length. We offer a complimentary consultation with a 3D scan and treatment preview. Financing options are available. Your actual cost and insurance coverage will be reviewed before treatment begins." },
];

const testimonials = [
  { text: "I hadn't been to a dentist in 6 years because of anxiety. The team made me feel completely comfortable. The dentist explained everything before she did it, and the office has a calming vibe.", author: "Jessica T.", location: "New Patient, Dixon, IL" },
  { text: "My 4-year-old was terrified of the dentist. The ceiling TV with cartoons and the prize chest at the end completely changed her mind. She asks when she gets to go back.", author: "Michael & Amy R.", location: "Parents of Two, Rockford, IL" },
  { text: "I broke a molar on a Friday night and called first thing Saturday. They got me in quickly and fixed it with a same-day crown. The whole experience was much easier than I expected.", author: "David K.", location: "Urgent Care Patient, Belvidere, IL" },
  { text: "I'm 35 and finally decided to fix my crooked teeth. The consultation was free and the 3D scan showed me what my smile could look like. The payment plan made it affordable on a teacher's salary.", author: "Lauren S.", location: "Clear Aligner Patient, DeKalb, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const typicalCosts = [
  { name: "Cleaning & Exam", range: "$89 – $150", note: "Often covered by insurance; your out-of-pocket depends on your plan." },
  { name: "Filling (composite)", range: "$185 – $275", note: "Cost varies by size and location; insurance may cover a portion." },
  { name: "Crown (CEREC)", range: "$1,100 – $1,400", note: "Major procedure; insurance often covers part after deductible." },
  { name: "Root Canal", range: "$700 – $1,100", note: "Depends on tooth and complexity; insurance may cover part." },
  { name: "Extraction", range: "$185 – $350", note: "Cost varies by difficulty and anesthesia needs." },
  { name: "Invisalign Consultation", range: "Complimentary", note: "3D scan and treatment preview included." },
  { name: "Teeth Whitening", range: "$350 – $500", note: "Cosmetic; not covered by insurance." },
  { name: "Urgent Care Exam", range: "$95 – $185", note: "Cost varies by diagnosis and insurance plan." },
];

const coverageSummaries = [
  { name: "Delta Dental", network: "Premier & PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "Cigna", network: "DPPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "MetLife", network: "PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "Aetna", network: "PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "Guardian", network: "PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "United Concordia", network: "PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "Humana", network: "PPO", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
  { name: "BlueCross BlueShield", network: "Dental Blue", summary: "Preventive care is often covered at 100%. Basic and major services may have coinsurance and deductible." },
];

const urgentCareGuide = [
  { issue: "Knocked-out tooth", guidance: "Call (815) 555-0387 immediately. Keep the tooth in milk or saliva. Do not scrub the root. Seek emergency dental care as quickly as possible." },
  { issue: "Severe toothache", guidance: "Call for a same-day appointment if available. Rinse with warm salt water and use a cold compress. Avoid placing aspirin on the gums." },
  { issue: "Broken or chipped tooth", guidance: "Call for a same-day or next-day appointment. Save any pieces, avoid chewing on that side, and rinse gently with warm water." },
  { issue: "Lost filling or crown", guidance: "Call for a same-day or next-day appointment. Temporary dental cement may help protect the area until you are seen." },
  { issue: "Swelling or abscess", guidance: "Call (815) 555-0387 as soon as possible. Dental infections can spread. Do not apply heat. Seek care the same day." },
  { issue: "Uncontrolled bleeding", guidance: "If bleeding does not stop with firm pressure, call 911 or go to the nearest emergency room. For minor bleeding, apply gauze with firm pressure." },
];

const smileExamples = [
  { title: "Clear Aligner Result", desc: "Illustrative example of a crowded-to-straight transformation. Individual results vary.", img: "happy-patient-1", label: "Example" },
  { title: "Professional Whitening", desc: "Illustrative example of in-office whitening. Results vary by patient and staining type.", img: "whitening", label: "Example" },
  { title: "Same-Day Crown", desc: "Illustrative example of a chipped front tooth restored with a porcelain crown.", img: "crowns", label: "Example" },
  { title: "Smile Makeover", desc: "Illustrative example of veneers closing a gap. Results depend on individual case.", img: "happy-patient-2", label: "Example" },
];

const patientForms = [
  { title: "Patient Information Form", desc: "Basic contact, insurance, and emergency contact information. Required for all new patients.", type: "PDF Download" },
  { title: "Medical History Form", desc: "Complete medical history including medications, allergies, and conditions that may affect dental treatment.", type: "PDF Download" },
  { title: "HIPAA Privacy Acknowledgment", desc: "Acknowledgment of our Notice of Privacy Practices as required by federal law.", type: "PDF Download" },
  { title: "Financial Responsibility Agreement", desc: "Acknowledgment of financial policies, payment expectations, and insurance assignment.", type: "PDF Download" },
];

const TypicalCostExplainer: React.FC = () => {
  const [procedure, setProcedure] = React.useState("Cleaning & Exam");
  const cost = typicalCosts.find((p) => p.name === procedure);

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="procedure">Select a Procedure</label>
        <select id="procedure" className="demo-form-select" value={procedure} onChange={(e) => setProcedure(e.target.value)}>
          {typicalCosts.map((p) => <option key={p.name}>{p.name}</option>)}
        </select>
      </div>
      {cost && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <CheckIcon size={36} />
          <h3>{cost.range}</h3>
          <p><strong>Note:</strong> {cost.note}</p>
          <p style={{ fontSize: "0.8rem", marginTop: "1rem", opacity: 0.7 }}>These are typical ranges for demonstration purposes only. Your actual cost depends on your specific case, treatment plan, and insurance benefits. We provide a written estimate before any treatment begins.</p>
        </div>
      )}
    </div>
  );
};

const CoverageSummary: React.FC = () => {
  const [provider, setProvider] = React.useState("Delta Dental");
  const detail = coverageSummaries.find((p) => p.name === provider);
  const isOther = provider === "Other / Not listed";

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="ins-provider">Select Your Insurance Provider</label>
        <select id="ins-provider" className="demo-form-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
          {coverageSummaries.map((p) => <option key={p.name}>{p.name}</option>)}
          <option>Other / Not listed</option>
        </select>
      </div>
      {!isOther && detail && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <CheckIcon size={36} />
          <h3>{detail.name} — {detail.network}</h3>
          <p><strong>Typical summary:</strong> {detail.summary}</p>
          <p style={{ marginTop: "0.5rem" }}>Coverage depends on your specific plan, deductible, and annual maximum. We will verify your actual benefits before your appointment and explain your out-of-pocket cost.</p>
        </div>
      )}
      {isOther && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <AlertIcon size={36} />
          <h3>Let Us Check for You</h3>
          <p>Call <a href="tel:8155550387">(815) 555-0387</a> with your insurance card — we work with many plans and can verify your coverage.</p>
        </div>
      )}
      <p style={{ fontSize: "0.8rem", textAlign: "center", marginTop: "1rem", opacity: 0.7 }}>This is a demo summary. It is not a guarantee of coverage or eligibility.</p>
    </div>
  );
};

const UrgentCareGuide: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const triage = urgentCareGuide.find((t) => t.issue === selected);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>Select your concern to see general first-aid guidance. This is not a substitute for professional care.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "1.5rem" }}>
        {urgentCareGuide.map((t) => (
          <button
            key={t.issue}
            type="button"
            className="demo-btn"
            style={{
              background: selected === t.issue ? "var(--demo-accent)" : "transparent",
              color: selected === t.issue ? "#fff" : "var(--demo-text)",
              border: "1px solid var(--demo-accent)",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem"
            }}
            onClick={() => setSelected(t.issue)}
          >
            {t.issue}
          </button>
        ))}
      </div>
      {triage && (
        <div className="demo-quote-form__success" style={{ borderColor: triage.issue === "Knocked-out tooth" || triage.issue === "Swelling or abscess" || triage.issue === "Uncontrolled bleeding" ? "#c0392b" : "var(--demo-accent)" }}>
          <AlertIcon size={36} />
          <h3>{triage.issue}</h3>
          <p>{triage.guidance}</p>
          {triage.issue !== "Uncontrolled bleeding" && (
            <a href="tel:8155550387" className="demo-btn demo-btn--primary" style={{ marginTop: "1rem" }}><PhoneIcon size={18} /> Call (815) 555-0387</a>
          )}
        </div>
      )}
      <p style={{ fontSize: "0.8rem", textAlign: "center", marginTop: "1.5rem", opacity: 0.7 }}>This guide is for general information only. For serious injuries, call 911 or visit an emergency room.</p>
    </div>
  );
};

const ScheduleForm: React.FC = () => {
  const [patientType, setPatientType] = React.useState("new");
  const [reason, setReason] = React.useState("exam");
  const [anxiety, setAnxiety] = React.useState("none");
  const [insurance, setInsurance] = React.useState("");
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
        <h3>Appointment Request Received (Illustrative)</h3>
        <p>In a live practice, the front desk would call to confirm within one business day and verify insurance. For urgent dental concerns, call (815) 555-0387.</p>
        <p><strong>Patient type:</strong> {patientType}<br /><strong>Reason:</strong> {reason}<br /><strong>Anxiety needs:</strong> {anxiety}<br /><strong>Insurance:</strong> {insurance || "To be verified"}<br /><strong>Preferred Date:</strong> {date || "To be scheduled"}</p>
        <p style={{ fontSize: "0.8rem", marginTop: "1rem", opacity: 0.8 }}>This is a demo form. It does not submit to a real dental practice.</p>
        <button className="demo-btn demo-btn--ghost" onClick={() => setSubmitted(false)}>Request another appointment</button>
      </div>
    );
  }

  return (
    <form className="demo-quote-form" onSubmit={handleSubmit}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="patient-type">Patient Type</label>
        <select id="patient-type" className="demo-form-select" value={patientType} onChange={(e) => setPatientType(e.target.value)}>
          <option value="new">New patient — first visit</option>
          <option value="existing">Existing patient — routine care</option>
          <option value="child">Child under 12</option>
          <option value="emergency">Urgent / emergency</option>
          <option value="cosmetic">Cosmetic consultation</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="reason">Reason for Visit</label>
        <select id="reason" className="demo-form-select" value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="exam">Exam & cleaning</option>
          <option value="pain">Tooth pain / urgent</option>
          <option value="cosmetic">Whitening or aligners</option>
          <option value="crown">Crown / bridge / filling</option>
          <option value="child">Child checkup</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="anxiety">Dental Anxiety or Accessibility Needs</label>
        <select id="anxiety" className="demo-form-select" value={anxiety} onChange={(e) => setAnxiety(e.target.value)}>
          <option value="none">None</option>
          <option value="mild">Mild — explain steps as we go</option>
          <option value="moderate">Moderate — extra time and breaks</option>
          <option value="high">High — discuss comfort options first</option>
          <option value="mobility">Mobility / wheelchair access</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="patient-name">Full Name</label>
        <input id="patient-name" className="demo-form-input" type="text" required placeholder="Your name" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="patient-phone">Phone Number</label>
        <input id="patient-phone" className="demo-form-input" type="tel" required placeholder="(815) 555-0000" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="patient-email">Email Address</label>
        <input id="patient-email" className="demo-form-input" type="email" required placeholder="you@email.com" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="insurance">Insurance Provider (optional)</label>
        <select id="insurance" className="demo-form-select" value={insurance} onChange={(e) => setInsurance(e.target.value)}>
          <option value="">Select if applicable</option>
          <option>Delta Dental</option>
          <option>Cigna</option>
          <option>MetLife</option>
          <option>Aetna</option>
          <option>Guardian</option>
          <option>United Concordia</option>
          <option>Humana</option>
          <option>BlueCross BlueShield</option>
          <option>No insurance / Self-pay</option>
        </select>
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="preferred-date">Preferred Date &amp; Time</label>
        <input id="preferred-date" className="demo-form-input" type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. Wednesday morning, March 20" />
      </div>
      <button type="submit" className="demo-btn demo-btn--primary">Request Appointment</button>
      <p className="demo-form-note">This is a demo form. It does not submit to a real practice. For urgent dental issues, call (815) 555-0387.</p>
    </form>
  );
};

const DentalDemo: React.FC = () => (
  <DemoLayout demoName="Rock River Family Dental" industry="Dental / Healthcare" themeColor="#b04e35" designSystem="dental">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/dental/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Gentle family dentistry · Transparent first visits · Dixon, IL</span>
        <h1 className="demo-hero__title">Know what your first visit will cost before you sit in the chair</h1>
        <p className="demo-hero__subtitle">Rock River Family Dental is a privately owned, modern family dental practice in Dixon, Illinois. We explain your exam, X-rays, cleaning, and out-of-pocket cost upfront — so your first visit is calm, clear, and stress-free.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550387" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0387</a>
          <a href="#schedule" className="demo-btn demo-btn--ghost">Schedule Online</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner"><AlertIcon size={20} /> Urgent dental concern? We reserve same-day slots when available · Call (815) 555-0387 as early as possible</div>

    <div className="demo-emergency-banner" style={{ background: "#3d1f1f", color: "#f8e8e8", borderBottom: "1px solid var(--demo-border)" }}>
      <DocumentIcon size={18} /> <strong>Demo website:</strong> Rock River Family Dental is a fictional business concept created by Bradley Matera. All team members, testimonials, and smile photos are illustrative.
    </div>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">15</div><div className="demo-stat__label">Illustrative Years</div></div>
          <div><div className="demo-stat__number">6</div><div className="demo-stat__label">Illustrative Staff</div></div>
          <div><div className="demo-stat__number">4</div><div className="demo-stat__label">Illustrative Counties</div></div>
          <div><div className="demo-stat__number">$89</div><div className="demo-stat__label">Illustrative New-Patient Exam</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={187} yelpRating={4.5} yelpReviewCount={34} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><CheckIcon size={20} /> ADA Member (illustrative)</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> CEREC Same-Day Crowns</span>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> Clear Aligner Provider</span>
        </div>
      </div>
    </section>

    {/* Split image + text: A Welcoming Office */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/dental/reception.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">A calm, welcoming office</h2>
            <p className="demo-split-image-text__text">Our reception area is designed to feel more like a living room than a waiting room. Comfortable seating, complimentary beverages, and a kids' corner with toys and books.</p>
            <p className="demo-split-image-text__text">Located on North Galena Avenue near KSB Hospital, with free parking out front. Wheelchair accessible.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt" id="new-patient">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Your first visit, explained</h2>
        <p className="demo-section__subtitle">No surprises. We tell you what will happen, how long it takes, and what it costs before treatment begins.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "720px", margin: "0 auto" }}>
          {newPatientSteps.map((s) => (
            <div key={s.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", borderLeft: "3px solid var(--demo-accent)", paddingLeft: "1.25rem" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--demo-accent)", minWidth: "1.5rem" }}>{s.step}</div>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Services by Need</h2>
        <p className="demo-section__subtitle">Comprehensive family dental care organized by what you're looking for.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {serviceCategories.map((cat) => (
            <div key={cat.category} style={{ borderTop: "3px solid var(--demo-accent)", paddingTop: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.category}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <strong style={{ color: "var(--demo-heading)", fontSize: "0.95rem" }}>{item.name}</strong>
                    <p style={{ fontSize: "0.9rem", color: "var(--demo-text-muted)", margin: "0.2rem 0 0" }}>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feature image: Modern Treatment Rooms */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/dental/treatment-room.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Modern Treatment Rooms</h2>
        <p className="demo-feature-image__text">Digital X-rays, intraoral cameras, CEREC same-day crowns, and ceiling TVs above every chair. Technology that makes your visit faster and more comfortable.</p>
      </div>
    </div>

    {/* Typical Cost Explainer */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Typical Treatment Costs</h2>
        <p className="demo-section__subtitle">See typical cost ranges for common procedures. Your actual cost depends on your treatment plan and insurance benefits.</p>
        <TypicalCostExplainer />
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div style={{ marginTop: "2rem", overflowX: "auto" }} tabIndex={0} role="region" aria-label="Treatment cost comparison">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--demo-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Procedure</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Typical Cost</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Insurance Usually Covers</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Cleaning & exam</td><td style={{ padding: "0.75rem" }}>$89–$150</td><td style={{ padding: "0.75rem" }}>100% (preventive)</td><td style={{ padding: "0.75rem" }}>45 min</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Filling (composite)</td><td style={{ padding: "0.75rem" }}>$150–$300</td><td style={{ padding: "0.75rem" }}>80% after deductible</td><td style={{ padding: "0.75rem" }}>60 min</td></tr>
              <tr style={{ borderBottom: "1px solid var(--demo-border)" }}><td style={{ padding: "0.75rem" }}>Crown</td><td style={{ padding: "0.75rem" }}>$900–$1,400</td><td style={{ padding: "0.75rem" }}>50% after deductible</td><td style={{ padding: "0.75rem" }}>2 visits</td></tr>
              <tr><td style={{ padding: "0.75rem" }}>Implant</td><td style={{ padding: "0.75rem" }}>$3,000–$5,000</td><td style={{ padding: "0.75rem" }}>Varies by plan</td><td style={{ padding: "0.75rem" }}>3–6 months</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--demo-text-muted)" }}>Illustrative cost ranges for demo purposes. Actual costs depend on your treatment plan and insurance.</p>
      </div>
    </section>

    {/* Coverage Summary */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Insurance Coverage Summary</h2>
        <p className="demo-section__subtitle">Select your insurance to see a typical coverage summary. We will verify your actual benefits before your first visit.</p>
        <CoverageSummary />
      </div>
    </section>

    {/* Office Tour Gallery */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Office Tour</h2>
        <p className="demo-section__subtitle">Take a look around. Our office was designed for your comfort.</p>
        <div className="demo-food-gallery">
          {officeTour.map((o) => (
            <div key={o.label} className="demo-food-gallery__item" style={{ backgroundImage: `url(/images/demos/dental/${o.img}.jpg)` }}>
              <span className="demo-food-gallery__label">{o.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Urgent Care Guide */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Urgent Dental Care Guide</h2>
        <p className="demo-section__subtitle">General first-aid guidance for common dental concerns. This is not a substitute for professional diagnosis or treatment.</p>
        <UrgentCareGuide />
      </div>
    </section>

    {/* Split image + text: Kids Welcome Here */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Kids welcome here</h2>
            <p className="demo-split-image-text__text">We see children starting at age 1 for a gentle, no-pressure 'happy visit.' By age 3, we recommend regular cleanings every 6 months.</p>
            <p className="demo-split-image-text__text">Our pediatric area has a kids' corner with toys, a ceiling TV with cartoons above the chair, and a small prize at the end. We want dental visits to be something kids look forward to.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/dental/pediatric-area.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Smile Examples */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Smile Transformation Examples</h2>
        <p className="demo-section__subtitle">Illustrative examples of cosmetic and restorative results. Individual results vary. These are not photos of real patients.</p>
        <div className="demo-services-grid">
          {smileExamples.map((s) => (
            <div key={s.title} className="demo-service-card">
              <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/dental/${s.img}.jpg)` }} />
              <div className="demo-service-card__body">
                <span className="demo-service-card__tag" style={{ marginBottom: "0.5rem", display: "inline-block" }}>{s.label}</span>
                <h3 className="demo-service-card__name">{s.title}</h3>
                <p className="demo-service-card__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team grid with headshots */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Meet the Team</h2>
        <p className="demo-section__subtitle">Fictional team profiles for demonstration purposes.</p>
        <div className="demo-team-grid">
          {team.map((member) => (
            <div key={member.name} className="demo-team-card">
              <div className="demo-team-card__photo" style={{ backgroundImage: `url(/images/demos/dental/${member.img}.jpg)` }} />
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

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Insurance Accepted</h2>
        <p className="demo-section__subtitle">We work with most major dental insurance plans. We file claims electronically and verify your benefits before your first visit.</p>
        <div className="demo-brands">
          {insuranceProviders.map((p) => (
            <div key={p.name} className="demo-brand">
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{p.network}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.8 }}>
          Don't see your plan? Call (815) 555-0387 — we work with many plans and can verify your coverage.
        </p>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Financing &amp; Payment Options</h2>
        <p className="demo-section__subtitle">Options that make quality dental care affordable for every family. We'll explain your out-of-pocket cost before any treatment.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {financingOptions.map((f) => (
            <div key={f.name} style={{ borderTop: "3px solid var(--demo-accent)", paddingTop: "1rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>{f.name}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", marginBottom: "0.5rem" }}>{f.desc}</p>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{f.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* New Patient Forms Download */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">New Patient Forms</h2>
        <p className="demo-section__subtitle">Save time — fill out your forms at home and bring them to your first appointment. No email required to download.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "720px", margin: "0 auto" }}>
          {patientForms.map((f) => (
            <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", border: "1px solid var(--demo-border)" }}>
              <div style={{ color: "var(--demo-accent)", flexShrink: 0 }}><DocumentIcon size={32} /></div>
              <div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--demo-text-muted)", marginBottom: "0.5rem" }}>{f.desc}</p>
                <span className="demo-service-card__tag"><DownloadIcon size={14} /> {f.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section" id="schedule">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Schedule an Appointment</h2>
        <p className="demo-section__subtitle">Request an appointment online. In a live practice, the front desk would call to confirm. For urgent concerns, call (815) 555-0387.</p>
        <ScheduleForm />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Patients Say</h2>
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
        <h2 className="demo-section__title">Find Us</h2>
        <p className="demo-section__subtitle">Located on North Galena Avenue in Dixon, IL — near KSB Hospital. Free parking in front of the building. Wheelchair accessible.</p>
        <GoogleMapsEmbed address="Dixon, IL" height={300} title="Rock River Family Dental office location" />
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.95rem" }}>
          <span><MapPinIcon size={18} /> 740 N Galena Ave, Dixon, IL 61021</span>
          <span><PhoneIcon size={18} /> (815) 555-0387</span>
          <span><ClockIcon size={18} /> Mon–Thu 7:00 AM – 5:00 PM · Fri 7:00 AM – 2:00 PM</span>
        </div>
      </div>
    </section>

    <IntegrationsSection industry="dental practices" integrations={integrations} />

    <section className="demo-contact" style={{ background: "#0d2b2b" }}>
      <div className="demo-contact__inner">
        <h2 className="demo-contact__title">Ready to book your first visit?</h2>
        <p className="demo-contact__text">Call (815) 555-0387 or schedule online. We're accepting new patients and most insurance plans. Same-day urgent care available when possible.</p>
        <a href="tel:8155550387" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0387</a>
        <div style={{ marginTop: "1.5rem" }}>
          <SocialLinks links={socialLinks} />
        </div>
      </div>
    </section>

    <footer className="demo-footer">
      <div className="demo-footer__inner">
        <div className="demo-footer__name">Rock River Family Dental</div>
        <div>740 N Galena Ave, Dixon, IL 61021 · (815) 555-0387</div>
        <div style={{ marginTop: "1rem" }}><SocialLinks links={socialLinks} /></div>
        <div className="demo-footer__demo-note">Fictional business concept created by <a href="https://bradleymatera.dev">Bradley Matera</a>. All data, testimonials, team profiles, and smile photos are illustrative.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
      </div>
    </footer>
  </DemoLayout>
);

export default DentalDemo;

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
        { name: "Dental", path: pathname },
      ]}
    />
  );
};
