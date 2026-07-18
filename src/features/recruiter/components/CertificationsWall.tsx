import * as React from "react";

/* --------------------------------------------------------------------------
   Certifications Wall — Beautiful certificate grid with verification.
   -------------------------------------------------------------------------- */

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  skills: string[];
  color: string;
  icon: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    date: "July 2025",
    credentialId: "SAA-C03",
    verifyUrl: "https://www.credly.com/badges/c585d7ac-44f9-41fe-87e6-c46f9998bb6a/linked_in_profile",
    skills: ["EC2", "S3", "Lambda", "VPC", "CloudFront", "DynamoDB", "RDS"],
    color: "var(--r-aws-orange)",
    icon: "AWS",
  },
  {
    id: "aws-aip",
    name: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "August 2025",
    credentialId: "AIF-C01",
    verifyUrl: "https://www.credly.com/badges/fcbb3120-f086-4784-9cb5-80daca9fb61a/linked_in_profile",
    skills: ["SageMaker", "Bedrock", "Rekognition", "Comprehend", "Lex"],
    color: "var(--r-aws-orange)",
    icon: "AWS",
  },
  {
    id: "fcc-js",
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "December 2024",
    credentialId: "bradleymatera-jaads",
    verifyUrl: "https://freecodecamp.org/certification/bradleymatera/javascript-algorithms-and-data-structures-v8",
    skills: ["JavaScript", "Algorithms", "Data Structures"],
    color: "var(--r-text)",
    icon: "FCC",
  },
  {
    id: "fcc-rwd",
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "December 2024",
    credentialId: "bradleymatera-rwd",
    verifyUrl: "https://freecodecamp.org/certification/bradleymatera/responsive-web-design",
    skills: ["HTML", "CSS", "Responsive Design", "Accessibility"],
    color: "var(--r-text)",
    icon: "FCC",
  },
  {
    id: "fcc-csharp",
    name: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp",
    date: "January 2025",
    credentialId: "bradleymatera-fcswm",
    verifyUrl: "https://freecodecamp.org/certification/bradleymatera/foundational-c-sharp-with-microsoft",
    skills: ["C#", ".NET", "Visual Studio", "OOP"],
    color: "var(--r-text)",
    icon: "FCC",
  },
];

const CertificationsWall: React.FC = () => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  return (
    <section id="certifications" className="recruiter-section recruiter-section--media reveal-section">
      {/* Background media layer */}
      <div className="recruiter-section__media" aria-hidden="true">
        <img
          className="recruiter-section__video recruiter-ken-burns"
          src="/hero-amazon-2000.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="recruiter-section__media-overlay" />
      </div>

      <div className="recruiter-section__content">
        <div className="recruiter-section__header">
          <div className="recruiter-section__eyebrow">Credentials</div>
          <h2 className="recruiter-section__title">
            Certifications <span className="recruiter-title-accent">Wall</span>
          </h2>
          <p className="recruiter-section__subtitle">
            Verified credentials with links. Every certification includes skills gained and verification details.
          </p>
        </div>

        <div className="recruiter-grid reveal-child recruiter-grid--2" style={{ maxWidth: 900, margin: "0 auto" }}>
        {CERTIFICATIONS.map((cert) => {
          const isExpanded = expandedId === cert.id;

          return (
            <div
              key={cert.id}
              className="recruiter-card"
              style={{
                padding: "2rem",
                cursor: "pointer",
                borderLeft: `3px solid ${cert.color}`,
                transition: "all 0.3s ease",
              }}
              onClick={() => setExpandedId(isExpanded ? null : cert.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandedId(isExpanded ? null : cert.id);
                }
              }}
              aria-expanded={isExpanded}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: "var(--r-accent-light)",
                    border: "1px solid var(--r-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: cert.color,
                    flexShrink: 0,
                  }}
                >
                  {cert.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      marginBottom: "0.25rem",
                      color: "var(--recruiter-text)",
                    }}
                  >
                    {cert.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--recruiter-text-secondary)",
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{cert.issuer}</span>
                    <span style={{ color: "var(--recruiter-border)" }}>|</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--recruiter-border)" }}>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--recruiter-text-muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Credential ID: <code style={{ color: "var(--recruiter-text-secondary)" }}>{cert.credentialId}</code>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recruiter-btn magnetic-btn recruiter-btn--primary"
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "0.8125rem",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify Credential →
                    </a>
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--recruiter-text-muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Skills Gained
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {cert.skills.map((skill) => (
                      <span key={skill} className="recruiter-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--recruiter-text-muted)",
                  marginTop: "0.75rem",
                  textAlign: "right",
                }}
              >
                {isExpanded ? "Show less ↑" : "Show more ↓"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default CertificationsWall;
