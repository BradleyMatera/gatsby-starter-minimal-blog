import * as React from "react";
import ObscuredContact from "./ObscuredContact";
import { GitHubIcon, LinkedInIcon, ResumeIcon, DownloadIcon } from "../../../site/icons";

/* --------------------------------------------------------------------------
   Contact CTA — Final call-to-action for recruiters.
   PII is protected via ObscuredContact to prevent bot scraping.
   -------------------------------------------------------------------------- */

const ContactCTA: React.FC = () => {
  return (
    <section id="contact-cta" className="recruiter-section contact-cta" data-static-visibility="true">
      <div className="contact-cta__inner">
        <div className="recruiter-section__eyebrow">Next Steps</div>
        <h2 className="recruiter-section__title contact-cta__title">
          Let&apos;s Build Something{" "}
          <span className="recruiter-title-accent">Great</span>
        </h2>
        <p className="recruiter-section__subtitle contact-cta__subtitle">
          I am actively exploring new opportunities. If you have a role that needs someone who learns fast,
          communicates clearly, and brings a mix of military discipline and modern development skills — let&apos;s talk.
        </p>

        <div className="contact-cta__actions">
          <a
            href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--primary contact-cta__btn"
          >
            <ResumeIcon size={18} />
            <span>View Resume</span>
          </a>
          <a
            href="https://www.linkedin.com/in/bradmatera"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--secondary contact-cta__btn"
          >
            <LinkedInIcon size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/BradleyMatera"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--secondary contact-cta__btn"
          >
            <GitHubIcon size={18} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Obscured contact info */}
        <div className="recruiter-card contact-cta__card">
          <ObscuredContact />

          <div className="contact-cta__meta-grid">
            <div className="contact-cta__meta-item">
              <div className="contact-cta__meta-label">Location</div>
              <div className="contact-cta__meta-value">Davis, Illinois, USA</div>
            </div>
            <div className="contact-cta__meta-item">
              <div className="contact-cta__meta-label">Time Zone</div>
              <div className="contact-cta__meta-value">Central Time (UTC-6/-5)</div>
            </div>
            <div className="contact-cta__meta-item">
              <div className="contact-cta__meta-label">Availability</div>
              <div className="contact-cta__meta-value contact-cta__meta-value--success">
                <span className="contact-cta__status-dot" aria-hidden="true" />
                Open to Opportunities
              </div>
            </div>
            <div className="contact-cta__meta-item">
              <div className="contact-cta__meta-label">Response Time</div>
              <div className="contact-cta__meta-value">Within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
