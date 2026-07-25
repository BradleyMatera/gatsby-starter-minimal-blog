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
import { StarIcon, MapPinIcon, PhoneIcon, ShieldIcon, CheckIcon, ClockIcon, SpaIcon, AlertIcon, DocumentIcon, DownloadIcon } from "../../site/icons";

const pathname = "/demos/dental/";
const pageTitle = "Rock River Family Dental — Dixon, IL Dentist | Demo Website";
const pageDescription = "Demo dental website for Rock River Family Dental — services, new patient forms, insurance accepted, online scheduling, and patient reviews. Built by Bradley Matera.";

const socialLinks: SocialLink[] = [
  { platform: "facebook", url: "https://facebook.com" },
  { platform: "google", url: "https://google.com" },
  { platform: "yelp", url: "https://yelp.com" },
  { platform: "instagram", url: "https://instagram.com" },
];

const integrations: Integration[] = [
  { name: "Dentrix", category: "Practice Management", description: "Patient scheduling, charting, treatment planning, and billing. Your website's online scheduling widget syncs directly with Dentrix chair availability — no double-booking, no manual entry.", freeTier: "From $450/month (Dentrix Ascend cloud). 14-day free trial.", url: "https://dentrix.com", status: "mocked" },
  { name: "Demandforce", category: "Patient Communication & Reviews", description: "Automated appointment reminders by text and email, post-visit review requests, and patient reactivation campaigns. Reviews flow directly to your website and Google profile.", freeTier: "From $299/month. Volume pricing available.", url: "https://demandforce.com", status: "mocked" },
  { name: "CareCredit Widget", category: "Patient Financing", description: "Embeddable financing application for dental procedures not covered by insurance. Patients apply for 6, 12, or 24-month interest-free payment plans directly on your site. Instant decisions.", freeTier: "No monthly fee. Provider discount rate per transaction.", url: "https://carecredit.com", status: "mocked" },
  { name: "Calendly", category: "Online Scheduling", description: "New patient scheduling synced with Dentrix. Patients pick a time slot, fill out intake forms online, and receive automatic reminders. Reduces no-shows by 40%.", freeTier: "Free for 1 event type. Standard from $10/user/month.", url: "https://calendly.com", status: "available" },
  { name: "Google Maps Embed", category: "Maps & Directions", description: "Interactive map showing your office location with parking info. Patients get directions directly from the appointment confirmation page.", freeTier: "28,000 embed loads/month (free). $7/1k loads after.", url: "https://developers.google.com/maps/documentation/embed/start", status: "live" },
  { name: "Google Business Profile Reviews", category: "Reviews & Ratings", description: "Live Google reviews displayed on your website. Auto-updates when new reviews are posted. Links to your Google profile so happy patients can leave their own review.", freeTier: "$200/month API credit (≈28k requests).", url: "https://developers.google.com/my-business", status: "mocked" },
  { name: "Stripe Payment Links", category: "Online Payments", description: "Email or text payment links for co-pays, deductibles, and outstanding balances. Patients pay by card or ACH. Posts directly to Dentrix patient ledger.", freeTier: "2.9% + 30¢ per card transaction. 0.8% capped at $5 for ACH.", url: "https://stripe.com/payments", status: "available" },
  { name: "Twilio SMS Reminders", category: "Patient Communication", description: "Automated SMS appointment reminders 48 hours and 2 hours before visits. Patients confirm or reschedule by text. Reduces no-shows by 35% and fills cancelled slots automatically.", freeTier: "Free trial. $0.0079 per SMS after.", url: "https://twilio.com/sms", status: "available" },
  { name: "Dental Intelligence Analytics", category: "Practice Analytics", description: "Real-time dashboard showing production, case acceptance rates, hygiene reactivation, and new patient flow. Tracks the metrics that drive practice growth.", freeTier: "From $299/month. 14-day free trial.", url: "https://dentalintel.com", status: "mocked" },
  { name: "Weave Patient Communication", category: "Unified Communications", description: "Unified phone, text, and email platform with smart routing. Patient calls auto-populate their chart. Automated reactivation campaigns and review requests.", freeTier: "From $449/month. Custom pricing for multi-provider practices.", url: "https://getweave.com", status: "mocked" },
  { name: "Henry Schein Dental Supply", category: "Supply Ordering", description: "Automated supply ordering based on inventory levels. Never run out of gloves, composite, or anesthetic again. Integration with Dentrix inventory module.", freeTier: "Free account. Pay for supplies ordered.", url: "https://henryschein.com", status: "mocked" },
  { name: "Vyne Trellis", category: "Insurance Claims", description: "Dental insurance claim management and electronic attachment platform. Auto-attach X-rays and narratives to claims. Track claim status from submission to payment.", freeTier: "From $99/month per practice. Per-claim pricing available.", url: "https://vyne.com", status: "mocked" },
];

const services = [
  { name: "Cleanings & Exams", desc: "Comprehensive exams, digital X-rays, and professional cleanings. Recommended every 6 months. Most insurance covers 100%.", icon: CheckIcon, img: "cleaning" },
  { name: "Fillings", desc: "Tooth-colored composite fillings for cavities and minor tooth damage. Same-day appointments for most cases. Mercury-free.", icon: CheckIcon, img: "fillings" },
  { name: "Crowns & Bridges", desc: "Porcelain and zirconia crowns to restore damaged teeth. Bridges to replace missing teeth. CEREC same-day crowns available.", icon: ShieldIcon, img: "crowns" },
  { name: "Teeth Whitening", desc: "Professional in-office whitening and custom take-home trays. Brighten your smile by up to 8 shades in a single visit.", icon: SpaIcon, img: "whitening" },
  { name: "Invisalign", desc: "Clear aligner orthodontics for adults and teens. Free consultation includes 3D digital scan and treatment preview. Diamond Plus provider.", icon: SpaIcon, img: "invisalign" },
  { name: "Emergency Dental", desc: "Same-day emergency appointments for severe pain, broken teeth, lost fillings, and dental trauma. Call before noon for same-day care.", icon: AlertIcon, img: "emergency" },
  { name: "Pediatric Dentistry", desc: "Gentle, kid-friendly dental care starting at age 1. Sealants, fluoride treatments, and a positive first experience that builds lifelong habits.", icon: SpaIcon, img: "cleaning" },
];

const officeTour = [
  { label: "Reception Area", img: "reception" },
  { label: "Treatment Room", img: "treatment-room" },
  { label: "Digital X-Ray", img: "x-ray-room" },
  { label: "Kids' Corner", img: "pediatric-area" },
];

const team = [
  { name: "Dr. Sarah Anderson", role: "Founder & Lead Dentist", bio: "DDS from University of Iowa College of Dentistry. 15 years in practice. Invisalign Diamond Plus provider with 400+ cases. Grew up in Dixon and came home to serve the community.", img: "owner" },
  { name: "Dr. James Patel", role: "Associate Dentist", bio: "DMD from University of Illinois Chicago. 8 years in practice. Specializes in CEREC same-day crowns and restorative dentistry. Fluent in Hindi and Gujarati.", img: "dentist-1" },
  { name: "Dr. Emily Ross", role: "Associate Dentist", bio: "DDS from Marquette University School of Dentistry. 5 years in practice. Pediatric specialist — great with anxious kids. Ceiling TV in her operatory makes cleanings fun.", img: "dentist-2" },
  { name: "Maria Gonzalez", role: "Lead Dental Hygienist", bio: "RDH from Carl Sandburg College. 12 years experience. Gentle touch that anxious patients love. Bilingual English/Spanish.", img: "hygienist-1" },
  { name: "Katie Mueller", role: "Dental Hygienist", bio: "RDH from Illinois Central College. 7 years experience. Specializes in periodontal therapy and patient education.", img: "hygienist-2" },
  { name: "Lisa Chen", role: "Office Manager", bio: "12 years managing dental practices. Handles insurance verification, financing, and scheduling. If you have a billing question, Lisa has the answer.", img: "dentist-3" },
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
  { name: "CareCredit", desc: "6, 12, or 24-month interest-free payment plans for procedures over $200. Apply online — instant decision. No annual fee.", details: "0% APR if paid within promo period. Standard APR 26.99% after." },
  { name: "In-House Membership Plan", desc: "For patients without insurance. $349/year includes 2 cleanings, 2 exams, X-rays, and 15% off all other procedures. No deductibles, no annual maximums.", details: "Individual and family plans available. Save 15% on everything." },
];

const newPatientSteps = [
  { step: 1, title: "Complete Online Intake", desc: "Fill out your medical history and insurance information online before your visit. Takes about 10 minutes. We'll verify your insurance coverage and estimate your out-of-pocket cost." },
  { step: 2, title: "Comprehensive Exam", desc: "Your first visit includes a full exam, digital X-rays, oral cancer screening, and a cleaning if your gums are healthy. Plan for about 90 minutes. Meet Dr. Anderson and our team." },
  { step: 3, title: "Treatment Plan & Scheduling", desc: "If any treatment is recommended, we'll walk you through the plan, costs, and insurance coverage. No pressure — you decide what to schedule and when. Financing options explained." },
];

const faqs: FAQItem[] = [
  { q: "What insurance plans do you accept?", a: "We accept Delta Dental (Premier and PPO), Cigna, MetLife, Aetna, Guardian, United Concordia, Humana, and BlueCross BlueShield Dental Blue. We file claims electronically and most patients have zero out-of-pocket for cleanings and exams. Not sure if you're covered? Call us at (815) 555-0387 with your insurance card and we'll verify your benefits before your appointment." },
  { q: "Do you offer payment plans?", a: "Yes. We accept CareCredit with 6, 12, or 24-month interest-free payment plans for procedures over $200. We also offer an in-house membership plan for uninsured patients — $349/year includes two cleanings, exams, X-rays, and 15% off all other procedures. No deductibles, no annual maximums, no waiting periods." },
  { q: "Do you take emergency appointments?", a: "Yes. We reserve same-day emergency slots every day for severe pain, broken teeth, lost fillings, swelling, and dental trauma. Call (815) 555-0387 before noon for same-day care. After hours, our answering service will reach Dr. Anderson for true emergencies. If you've knocked out a tooth, keep it in milk and call immediately — we may be able to re-implant it within 30 minutes." },
  { q: "What ages do you see for pediatric dentistry?", a: "We see children starting at age 1 for their first 'happy visit' — a gentle introduction to the dental office. By age 3, we recommend regular cleanings every 6 months. We offer sealants on permanent molars (around age 6 and 12), fluoride treatments, and a kid-friendly environment with prizes and a ceiling TV above the chair." },
  { q: "How much does Invisalign cost?", a: "Invisalign treatment typically ranges from $3,500 to $6,500 depending on the complexity of your case and treatment length. We offer free Invisalign consultations with a 3D digital scan and treatment preview. CareCredit financing is available with interest-free payment plans as low as $145/month. As a Diamond Plus Invisalign provider, Dr. Anderson has completed over 400 cases." },
];

const testimonials = [
  { text: "I hadn't been to a dentist in 6 years because of anxiety. The team at Rock River Family Dental made me feel completely comfortable. Dr. Anderson explained everything before she did it, and the office has a calming vibe. I actually look forward to my cleanings now.", author: "Jessica T.", location: "New Patient, Dixon, IL" },
  { text: "My 4-year-old was terrified of the dentist. The ceiling TV with cartoons and the prize chest at the end completely changed her mind. She asks when she gets to go back. The pediatric care here is exceptional.", author: "Michael & Amy R.", location: "Parents of Two, Rockford, IL" },
  { text: "I broke a molar on a Friday night and called first thing Saturday. They got me in by 10 AM, fixed it with a same-day CEREC crown, and I was eating dinner that night. The whole experience was painless — literally and figuratively.", author: "David K.", location: "Emergency Patient, Belvidere, IL" },
  { text: "I'm 35 and finally decided to fix my crooked teeth. The Invisalign consultation was free and the 3D scan showed me exactly what my smile would look like after treatment. 14 months later, I can't stop smiling. The payment plan made it affordable on a teacher's salary.", author: "Lauren S.", location: "Invisalign Patient, DeKalb, IL" },
];

const StarRating: React.FC = () => (
  <div className="demo-testimonial__stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((i) => <StarIcon key={i} size={18} />)}</div>
);

const procedureCosts = [
  { name: "Cleaning & Exam", low: 89, high: 150, coverage: "Insurance covers 100%" },
  { name: "Filling (composite)", low: 185, high: 275, coverage: "Insurance covers 80%" },
  { name: "Crown (CEREC)", low: 1100, high: 1400, coverage: "Insurance covers 50%" },
  { name: "Root Canal", low: 700, high: 1100, coverage: "Insurance covers 50%" },
  { name: "Extraction", low: 185, high: 350, coverage: "Insurance covers 80%" },
  { name: "Invisalign Consultation", low: 0, high: 0, coverage: "Free consultation" },
  { name: "Teeth Whitening", low: 350, high: 500, coverage: "Not covered by insurance" },
  { name: "Emergency Exam", low: 95, high: 185, coverage: "Varies by insurance" },
];

const insuranceDetails = [
  { name: "Delta Dental", network: "Premier & PPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "Cigna", network: "DPPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "MetLife", network: "PPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "Aetna", network: "PPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "Guardian", network: "PPO", coverage: "Preventive: 100% · Basic: 70% · Major: 50%" },
  { name: "United Concordia", network: "PPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "Humana", network: "PPO", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
  { name: "BlueCross BlueShield", network: "Dental Blue", coverage: "Preventive: 100% · Basic: 80% · Major: 50%" },
];

const emergencyTriage = [
  { issue: "Knocked-out tooth", urgency: "URGENT", instruction: "Call (815) 555-0387 NOW. Keep tooth in milk or saliva. Re-implant possible within 30 minutes. Do not scrub the root." },
  { issue: "Severe toothache", urgency: "Same-day", instruction: "Call before noon for same-day appointment. Rinse with warm salt water. Take ibuprofen for pain. Apply cold compress to cheek." },
  { issue: "Broken or chipped tooth", urgency: "Same-day", instruction: "Same-day or next-day appointment. Save the piece if possible. Avoid chewing on that side. Rinse with warm water." },
  { issue: "Lost filling or crown", urgency: "Same-day", instruction: "Same-day or next-day. Temporary cement available at pharmacy. Keep area clean. Avoid hot/cold/sweet on that side." },
  { issue: "Swelling or abscess", urgency: "URGENT", instruction: "Call (815) 555-0387 NOW. Infection can spread quickly. Do NOT apply heat. Rinse with warm salt water. Seek immediate care." },
  { issue: "Uncontrolled bleeding", urgency: "911 / ER", instruction: "If bleeding is uncontrolled, call 911 or go to the nearest ER. If minor, apply gauze with firm pressure for 20 minutes." },
];

const smileGallery = [
  { title: "Invisalign: 14-Month Transformation", desc: "Crowded to straight in 14 months. Free 3D scan showed the patient their future smile before starting.", img: "happy-patient-1", label: "After" },
  { title: "Professional Whitening", desc: "Three shades brighter in a single 90-minute visit. Custom take-home trays for maintenance.", img: "whitening", label: "After" },
  { title: "CEREC Same-Day Crown", desc: "Chipped front tooth restored with a same-day porcelain crown. No temporary, no second visit.", img: "crowns", label: "After" },
  { title: "Porcelain Veneers", desc: "Six porcelain veneers closed a gap and created a symmetrical smile. Completed in two visits.", img: "happy-patient-2", label: "After" },
];

const patientForms = [
  { title: "Patient Information Form", desc: "Basic contact, insurance, and emergency contact information. Required for all new patients.", type: "PDF Download" },
  { title: "Medical History Form", desc: "Complete medical history including medications, allergies, and conditions that may affect dental treatment.", type: "PDF Download" },
  { title: "HIPAA Privacy Acknowledgment", desc: "Acknowledgment of our Notice of Privacy Practices as required by federal law.", type: "PDF Download" },
  { title: "Financial Responsibility Agreement", desc: "Acknowledgment of financial policies, payment expectations, and insurance assignment.", type: "PDF Download" },
];

const CostEstimator: React.FC = () => {
  const [procedure, setProcedure] = React.useState("Cleaning & Exam");
  const cost = procedureCosts.find((p) => p.name === procedure);

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="procedure">Select a Procedure</label>
        <select id="procedure" className="demo-form-select" value={procedure} onChange={(e) => setProcedure(e.target.value)}>
          {procedureCosts.map((p) => <option key={p.name}>{p.name}</option>)}
        </select>
      </div>
      {cost && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <CheckIcon size={36} />
          <h3>{cost.low === 0 ? "Free Consultation" : `$${cost.low} – $${cost.high}`}</h3>
          <p><strong>Insurance:</strong> {cost.coverage}</p>
          <p style={{ fontSize: "0.8rem", marginTop: "1rem", opacity: 0.7 }}>Estimates only. Final cost depends on your specific case and insurance plan. We'll provide a written estimate before any treatment begins.</p>
        </div>
      )}
    </div>
  );
};

const InsuranceChecker: React.FC = () => {
  const [provider, setProvider] = React.useState("Delta Dental");
  const detail = insuranceDetails.find((p) => p.name === provider);
  const isOther = provider === "Other / Not listed";

  return (
    <div className="demo-quote-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="ins-provider">Select Your Insurance Provider</label>
        <select id="ins-provider" className="demo-form-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
          {insuranceDetails.map((p) => <option key={p.name}>{p.name}</option>)}
          <option>Other / Not listed</option>
        </select>
      </div>
      {!isOther && detail && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <CheckIcon size={36} />
          <h3>{detail.name} — {detail.network}</h3>
          <p><strong>Coverage:</strong> {detail.coverage}</p>
          <p style={{ marginTop: "0.5rem" }}>We file claims electronically — you pay only your share at the visit. We'll verify your benefits before your appointment.</p>
        </div>
      )}
      {isOther && (
        <div className="demo-quote-form__success" style={{ marginTop: "1rem" }}>
          <AlertIcon size={36} />
          <h3>Let Us Check for You</h3>
          <p>Call <a href="tel:8155550387">(815) 555-0387</a> with your insurance card — we accept many other plans and can verify your coverage in minutes.</p>
        </div>
      )}
    </div>
  );
};

const EmergencyTriage: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const triage = emergencyTriage.find((t) => t.issue === selected);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <p style={{ textAlign: "center", marginBottom: "1.5rem" }}>Select your emergency to see what to do right now:</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "1.5rem" }}>
        {emergencyTriage.map((t) => (
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
        <div className="demo-quote-form__success" style={{
          borderColor: triage.urgency === "URGENT" || triage.urgency === "911 / ER" ? "#c0392b" : "var(--demo-accent)"
        }}>
          <AlertIcon size={36} />
          <h3 style={{ color: triage.urgency === "URGENT" || triage.urgency === "911 / ER" ? "#c0392b" : "var(--demo-accent)" }}>{triage.urgency}</h3>
          <p>{triage.instruction}</p>
          {(triage.urgency === "URGENT" || triage.urgency === "Same-day") && (
            <a href="tel:8155550387" className="demo-btn demo-btn--primary" style={{ marginTop: "1rem" }}><PhoneIcon size={18} /> Call (815) 555-0387</a>
          )}
        </div>
      )}
    </div>
  );
};

const ScheduleForm: React.FC = () => {
  const [service, setService] = React.useState("New Patient Exam & Cleaning");
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
        <h3>Appointment Request Received</h3>
        <p>Thank you. Our front desk will call you within 2 hours during business hours to confirm your appointment. For same-day or emergency appointments, call (815) 555-0387.</p>
        <p><strong>Service:</strong> {service}<br /><strong>Preferred Date:</strong> {date || "To be scheduled"}</p>
        <button className="demo-btn demo-btn--ghost" onClick={() => setSubmitted(false)}>Request another appointment</button>
      </div>
    );
  }

  return (
    <form className="demo-quote-form" onSubmit={handleSubmit}>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="service">Reason for Visit</label>
        <select id="service" className="demo-form-select" value={service} onChange={(e) => setService(e.target.value)}>
          <option>New Patient Exam &amp; Cleaning</option>
          <option>Emergency / Tooth Pain</option>
          <option>Invisalign Consultation (Free)</option>
          <option>Teeth Whitening</option>
          <option>Crown or Bridge</option>
          <option>Pediatric Appointment</option>
          <option>Regular Cleaning (existing patient)</option>
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
        <label className="demo-form-label" htmlFor="preferred-date">Preferred Date &amp; Time</label>
        <input id="preferred-date" className="demo-form-input" type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. Wednesday morning, March 20" />
      </div>
      <div className="demo-form-row">
        <label className="demo-form-label" htmlFor="insurance">Insurance Provider (optional)</label>
        <select id="insurance" className="demo-form-select">
          <option>Select if applicable</option>
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
        <label className="demo-form-label" htmlFor="notes">Notes (optional)</label>
        <textarea id="notes" className="demo-form-textarea" rows={3} placeholder="Any specific concerns, dental anxiety, or accommodation needs?" />
      </div>
      <button type="submit" className="demo-btn demo-btn--primary">Request Appointment</button>
      <p className="demo-form-note">For same-day emergency appointments, call (815) 555-0387 directly. We reserve emergency slots every day.</p>
    </form>
  );
};

const DentalDemo: React.FC = () => (
  <DemoLayout demoName="Rock River Family Dental" industry="Dental / Healthcare" themeColor="#2b8a8a" designSystem="soft">
    <section className="demo-hero" style={{ backgroundImage: "url(/images/demos/dental/hero.jpg)" }}>
      <div className="demo-hero__inner">
        <span className="demo-hero__tagline">Accepting New Patients · Same-Day Emergencies · Most Insurance Accepted</span>
        <h1 className="demo-hero__title">Rock River Family Dental</h1>
        <p className="demo-hero__subtitle">Family dentistry in Dixon, IL — gentle, modern, and welcoming for all ages. Cleanings, crowns, Invisalign, and emergency care. Located near KSB Hospital on North Galena Avenue. Serving Dixon, Rockford, Belvidere, and DeKalb.</p>
        <div className="demo-hero__actions">
          <a href="tel:8155550387" className="demo-btn demo-btn--primary"><PhoneIcon size={20} /> Call (815) 555-0387</a>
          <a href="#schedule" className="demo-btn demo-btn--ghost">Schedule Online</a>
        </div>
      </div>
    </section>

    <div className="demo-emergency-banner"><AlertIcon size={20} /> Dental emergency? We reserve same-day slots every day · Call (815) 555-0387 before noon</div>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Features at a glance</h2>
        <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Rock River Family Dental features at a glance">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
                <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Service pages</td>
                <td style={{ padding: "0.75rem" }}>Detailed pages for cleanings, fillings, crowns, whitening, Invisalign, emergency, and pediatric dentistry.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Online scheduling</td>
                <td style={{ padding: "0.75rem" }}>Appointment request form with service type, preferred date, and insurance provider. Syncs with Dentrix.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>New patient intake</td>
                <td style={{ padding: "0.75rem" }}>Online medical history and insurance forms completed before the first visit. Insurance verified in advance.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Insurance information</td>
                <td style={{ padding: "0.75rem" }}>List of accepted providers with network details. Insurance verification before first appointment.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Financing options</td>
                <td style={{ padding: "0.75rem" }}>CareCredit widget for interest-free payment plans and in-house membership plan for uninsured patients.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Emergency line</td>
                <td style={{ padding: "0.75rem" }}>Same-day emergency appointments with a dedicated banner and call-to-action on every page.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>Patient reviews</td>
                <td style={{ padding: "0.75rem" }}>Google Business Profile reviews displayed live on the site via Demandforce integration.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <td style={{ padding: "0.75rem" }}>SEO setup</td>
                <td style={{ padding: "0.75rem" }}>Dentist schema, service pages with unique content, Google Business Profile, and local search optimization.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <div className="demo-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div><div className="demo-stat__number">15</div><div className="demo-stat__label">Years in Practice</div></div>
          <div><div className="demo-stat__number">3,200+</div><div className="demo-stat__label">Active Patients</div></div>
          <div><div className="demo-stat__number">400+</div><div className="demo-stat__label">Invisalign Cases</div></div>
          <div><div className="demo-stat__number">4.9</div><div className="demo-stat__label">Google Rating</div></div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <ReviewBadges googleRating={4.9} googleReviewCount={187} yelpRating={4.5} yelpReviewCount={34} />
        </div>
        <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="demo-trust-logo"><ShieldIcon size={20} /> Invisalign Diamond Plus</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> ADA Member</span>
          <span className="demo-trust-logo"><CheckIcon size={20} /> CEREC Same-Day Crowns</span>
        </div>
      </div>
    </section>

    {/* Split image + text: A Welcoming Office */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/dental/reception.jpg)" }} />
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">A Welcoming Office</h2>
            <p className="demo-split-image-text__text">Our reception area feels more like a living room than a waiting room. Comfortable seating, complimentary beverages, and a kids' corner with toys and books. We respect your time — 92% of patients are seated within 5 minutes of their appointment.</p>
            <p className="demo-split-image-text__text">Located on North Galena Avenue near KSB Hospital, with free parking right out front. Wheelchair accessible.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Our Services</h2>
        <p className="demo-section__subtitle">Comprehensive family dental care under one roof. From your child's first checkup to Invisalign and emergency care.</p>
        <div className="demo-services-grid">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="demo-service-card">
                <div className="demo-service-card__image" style={{ backgroundImage: `url(/images/demos/dental/${s.img}.jpg)` }} />
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

    {/* Feature image: Modern Treatment Rooms */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/dental/treatment-room.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Modern Treatment Rooms</h2>
        <p className="demo-feature-image__text">Digital X-rays, intraoral cameras, CEREC same-day crowns, and ceiling TVs above every chair. Technology that makes your visit faster and more comfortable.</p>
      </div>
    </div>

    {/* Treatment Cost Estimator */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Treatment Cost Estimator</h2>
        <p className="demo-section__subtitle">See typical cost ranges and insurance coverage for common procedures. No surprises — we provide written estimates before any treatment.</p>
        <CostEstimator />
      </div>
    </section>

    {/* Insurance Eligibility Checker */}
    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Insurance Eligibility Checker</h2>
        <p className="demo-section__subtitle">Select your insurance provider to see your coverage summary. We verify benefits before your first visit.</p>
        <InsuranceChecker />
      </div>
    </section>

    {/* Split image + text: Kids Welcome Here */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <div className="demo-split-image-text">
          <div className="demo-split-image-text__content">
            <h2 className="demo-split-image-text__title">Kids Welcome Here</h2>
            <p className="demo-split-image-text__text">We see children starting at age 1 for their first 'happy visit' — a gentle, no-pressure introduction to the dental office. By age 3, we recommend regular cleanings every 6 months.</p>
            <p className="demo-split-image-text__text">Our pediatric area has a kids' corner with toys, a ceiling TV with cartoons above the chair, and a prize chest at the end. We make dental visits something kids look forward to.</p>
          </div>
          <div className="demo-split-image-text__image" style={{ backgroundImage: "url(/images/demos/dental/pediatric-area.jpg)" }} />
        </div>
      </div>
    </section>

    {/* Office Tour Gallery */}
    <section className="demo-section demo-section--alt">
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

    {/* Dental Emergency Triage Tool */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Dental Emergency? Start Here</h2>
        <p className="demo-section__subtitle">Tell us what's wrong and we'll tell you what to do right now. Same-day appointments available — call before noon.</p>
        <EmergencyTriage />
      </div>
    </section>

    {/* Feature image: Healthy Smiles */}
    <div className="demo-feature-image" style={{ backgroundImage: "url(/images/demos/dental/happy-patient-1.jpg)" }}>
      <div className="demo-feature-image__content">
        <h2 className="demo-feature-image__title">Healthy Smiles Start Here</h2>
        <p className="demo-feature-image__text">From your first cleaning to your child's first visit to your Invisalign journey — we're with you every step of the way.</p>
      </div>
    </div>

    {/* Before/After Smile Gallery */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Before &amp; After Smile Gallery</h2>
        <p className="demo-section__subtitle">Real results from our patients. Cosmetic dentistry that changes lives — and smiles.</p>
        <div className="demo-services-grid">
          {smileGallery.map((s) => (
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
        <p className="demo-section__subtitle">Experienced, gentle, and genuinely caring. The people who make your visit comfortable.</p>
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
        <p className="demo-section__subtitle">We accept most major dental insurance plans. We file claims electronically and verify your benefits before your first visit.</p>
        <div className="demo-brands">
          {insuranceProviders.map((p) => (
            <div key={p.name} className="demo-brand">
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{p.network}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", opacity: 0.8 }}>
          Don't see your plan? Call (815) 555-0387 — we accept many others and can verify your coverage in minutes.
        </p>
      </div>
    </section>

    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Financing &amp; Payment Options</h2>
        <p className="demo-section__subtitle">No insurance? No problem. We have options that make quality dental care affordable for every family.</p>
        <div className="demo-services-grid">
          {financingOptions.map((f) => (
            <div key={f.name} className="demo-service-card">
              <h3 className="demo-service-card__title">{f.name}</h3>
              <p className="demo-service-card__desc">{f.desc}</p>
              <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.5rem" }}>{f.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">New Patient? Here's What to Expect</h2>
        <p className="demo-section__subtitle">Your first visit should be stress-free. Here's exactly what happens, step by step.</p>
        <div className="demo-services-grid">
          {newPatientSteps.map((s) => (
            <div key={s.step} className="demo-service-card">
              <div className="demo-service-card__icon" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.step}</div>
              <h3 className="demo-service-card__title">{s.title}</h3>
              <p className="demo-service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* New Patient Forms Download */}
    <section className="demo-section">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">New Patient Forms</h2>
        <p className="demo-section__subtitle">Save time — fill out your forms at home and bring them to your first appointment. No email required to download.</p>
        <div className="demo-services-grid">
          {patientForms.map((f) => (
            <div key={f.title} className="demo-service-card">
              <div className="demo-service-card__icon"><DocumentIcon size={32} /></div>
              <h3 className="demo-service-card__title">{f.title}</h3>
              <p className="demo-service-card__desc">{f.desc}</p>
              <span className="demo-service-card__tag"><DownloadIcon size={14} /> {f.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="demo-section" id="schedule">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">Schedule an Appointment</h2>
        <p className="demo-section__subtitle">Request an appointment online and we'll call you to confirm within 2 hours during business hours. For emergencies, call (815) 555-0387.</p>
        <ScheduleForm />
      </div>
    </section>

    <section className="demo-section demo-section--alt">
      <div className="demo-section__inner">
        <h2 className="demo-section__title">What Our Patients Say</h2>
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
        <h2 className="demo-contact__title">Ready to Book Your Appointment?</h2>
        <p className="demo-contact__text">Call (815) 555-0387 or schedule online. We're accepting new patients and most insurance plans. Same-day emergencies welcome.</p>
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
        <div className="demo-footer__demo-note">This is a demo website built by <a href="https://bradleymatera.dev">Bradley Matera</a>.<br /><a href="/demos/">← Back to all demos</a> · <a href="/contact/">Get a site like this →</a></div>
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
