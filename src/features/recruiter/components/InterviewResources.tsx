import * as React from "react";

/* --------------------------------------------------------------------------
   Interview Resources — Real documents from the Resumes folder.
   All documents open in-browser for viewing. No forced downloads.
   -------------------------------------------------------------------------- */

type Packet = {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  tags: string[];
  badge?: string;
};

const PACKETS: Packet[] = [
  {
    id: "canonical-resume",
    title: "Junior Software Engineer Resume",
    description: "Primary resume targeting junior software engineering roles. Includes all current experience, skills, and certifications.",
    icon: "📄",
    path: "/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf",
    tags: ["Primary", "Software Engineer"],
    badge: "Most Used",
  },
  {
    id: "cloud-resume",
    title: "Cloud Support Engineer Resume",
    description: "Tailored for cloud support roles. Emphasizes AWS internship, certifications, and troubleshooting experience.",
    icon: "☁️",
    path: "/documents/resumes/matera-bradley-Cloud-Support-Engineer.pdf",
    tags: ["Cloud", "AWS"],
  },
  {
    id: "web-dev-resume",
    title: "Web Developer Resume",
    description: "Focused on web development positions. Highlights React, JavaScript, and frontend project experience.",
    icon: "🌐",
    path: "/documents/resumes/matera-bradley-Web-Developer.pdf",
    tags: ["Web Dev", "Frontend"],
  },
  {
    id: "tech-support-resume",
    title: "Technical Support Resume",
    description: "Emphasizes troubleshooting, documentation, and customer support skills from AWS internship and prior roles.",
    icon: "🛠️",
    path: "/documents/resumes/matera-bradley-Technical-Support.pdf",
    tags: ["Support", "Troubleshooting"],
  },
  {
    id: "transcript",
    title: "Full Sail University Transcript",
    description: "Official transcript showing all completed coursework, grades, and degree conferral.",
    icon: "📜",
    path: "/documents/transcripts/TRPF3QGL-FullSailTranscripts.pdf",
    tags: ["Official", "Education"],
    badge: "Official",
  },
  {
    id: "licenses-certs",
    title: "Licenses & Certifications",
    description: "AWS Solutions Architect Associate, AWS AI Practitioner, freeCodeCamp certificates, and academic honors.",
    icon: "🏆",
    path: "/documents/education/Licenses%20%26%20certifications.pdf",
    tags: ["AWS", "Certified"],
    badge: "Verified",
  },
];

const InterviewResources: React.FC = () => {
  return (
    <section id="interview-resources" className="recruiter-section" data-static-visibility="true">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Document Quick Access</div>
        <h2 className="recruiter-section__title">
          Essential <span className="recruiter-title-accent">Documents</span>
        </h2>
        <p className="recruiter-section__subtitle">
          The most important documents for interview and application purposes — viewable instantly.
        </p>
      </div>

      <div className="recruiter-grid recruiter-grid--4" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {PACKETS.map((packet) => (
          <div
            key={packet.id}
            className="recruiter-card"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              textAlign: "center",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "";
            }}
          >
            {packet.badge && (
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "0.25rem 0.5rem",
                  borderRadius: 4,
                  background: "rgba(167,139,250,0.15)",
                  color: "var(--recruiter-purple)",
                  alignSelf: "center",
                }}
              >
                {packet.badge}
              </span>
            )}
            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{packet.icon}</div>
            <h3
              style={{
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "var(--recruiter-text)",
                margin: 0,
              }}
            >
              {packet.title}
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--recruiter-text-secondary)",
                lineHeight: 1.55,
                flex: 1,
              }}
            >
              {packet.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", justifyContent: "center" }}>
              {packet.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.625rem",
                    padding: "0.2rem 0.5rem",
                    borderRadius: 9999,
                    background: "rgba(167,139,250,0.1)",
                    color: "var(--recruiter-purple)",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={packet.path}
              target="_blank"
              rel="noopener noreferrer"
              className="recruiter-btn magnetic-btn recruiter-btn--primary"
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.625rem",
                fontSize: "0.8125rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Document →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InterviewResources;
