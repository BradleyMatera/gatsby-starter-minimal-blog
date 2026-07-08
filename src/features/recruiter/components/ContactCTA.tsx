import * as React from "react";
import ObscuredContact from "./ObscuredContact";

/* --------------------------------------------------------------------------
   Contact CTA — Final call-to-action for recruiters.
   PII is protected via ObscuredContact to prevent bot scraping.
   -------------------------------------------------------------------------- */

const ContactCTA: React.FC = () => {
  return (
    <section id="contact-cta" className="recruiter-section" data-static-visibility="true" style={{ textAlign: "center" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div className="recruiter-section__eyebrow">Next Steps</div>
        <h2
          className="recruiter-section__title"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Let&apos;s Build Something{" "}
          <span className="recruiter-title-accent">Great</span>
        </h2>
        <p className="recruiter-section__subtitle">
          I am actively exploring new opportunities. If you have a role that needs someone who learns fast,
          communicates clearly, and brings a mix of military discipline and modern development skills — let&apos;s talk.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
            marginTop: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          <a
            href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--primary"
          >
            📄 View Resume
          </a>
          <a
            href="https://www.linkedin.com/in/bradmatera"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--secondary"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/BradleyMatera"
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn magnetic-btn recruiter-btn--secondary"
          >
            🐙 GitHub
          </a>
        </div>

        {/* Obscured contact info */}
        <div
          className="recruiter-card"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            fontSize: "0.875rem",
            color: "var(--recruiter-text-secondary)",
            alignItems: "center",
          }}
        >
          <ObscuredContact />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
              width: "100%",
              borderTop: "1px solid var(--recruiter-border)",
              paddingTop: "1.25rem",
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.25rem" }}>
                Location
              </div>
              <div>Davis, Illinois, USA</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.25rem" }}>
                Time Zone
              </div>
              <div>Central Time (UTC-6/-5)</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.25rem" }}>
                Availability
              </div>
              <div style={{ color: "#34d399", fontWeight: 600 }}>● Open to Opportunities</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--recruiter-text-muted)", marginBottom: "0.25rem" }}>
                Response Time
              </div>
              <div>Within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
