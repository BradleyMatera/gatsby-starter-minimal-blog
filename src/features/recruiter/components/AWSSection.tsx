import * as React from "react";

/* --------------------------------------------------------------------------
   AWS Section — Animated architecture diagram with services.
   -------------------------------------------------------------------------- */

type Service = {
  name: string;
  description: string;
  usedIn: string[];
};

const AWS_SERVICES: Service[] = [
  {
    name: "Lambda",
    description: "Serverless compute for event-driven data processing",
    usedIn: ["AWS Metadata Extraction"],
  },
  {
    name: "DynamoDB",
    description: "NoSQL database for metadata storage and retrieval",
    usedIn: ["AWS Metadata Extraction"],
  },
  {
    name: "S3",
    description: "Object storage for static sites and data staging",
    usedIn: ["AWS Metadata Extraction", "Portfolio"],
  },
  {
    name: "Amplify",
    description: "Frontend deployment and hosting for accessible UIs",
    usedIn: ["AWS Metadata Extraction"],
  },
  {
    name: "CloudFront",
    description: "Global CDN for static assets and edge caching",
    usedIn: ["Portfolio"],
  },
  {
    name: "IAM",
    description: "Identity and access management with least-privilege roles",
    usedIn: ["All Projects"],
  },
  {
    name: "CloudWatch",
    description: "Monitoring, logging, alarms, and dashboards",
    usedIn: ["All Projects"],
  },
];

const AWSServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div
    className="recruiter-glass reveal-child"
    style={{ padding: "1.25rem", transition: "all 0.25s ease" }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "linear-gradient(135deg, #FF9900 0%, #F2A900 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.6875rem",
          fontWeight: 800,
          color: "#fff",
        }}
      >
        AWS
      </div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          margin: 0,
          color: "var(--recruiter-text)",
        }}
      >
        {service.name}
      </h3>
    </div>
    <p
      style={{
        fontSize: "0.875rem",
        color: "var(--recruiter-text-secondary)",
        lineHeight: 1.55,
        marginBottom: "0.75rem",
      }}
    >
      {service.description}
    </p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
      {service.usedIn.map((p) => (
        <span
          key={p}
          style={{
            fontSize: "0.6875rem",
            padding: "0.25rem 0.5rem",
            borderRadius: 4,
            background: "rgba(255,153,0,0.1)",
            color: "#FF9900",
          }}
        >
          {p}
        </span>
      ))}
    </div>
  </div>
);

const AWSSection: React.FC = () => {
  return (
    <section id="aws-section" className="recruiter-section reveal-section">
      <div className="recruiter-section__header">
        <div className="recruiter-section__eyebrow">Cloud Infrastructure</div>
        <h2 className="recruiter-section__title">
          AWS <span className="recruiter-title-accent">Architecture</span>
        </h2>
        <p className="recruiter-section__subtitle">
          AWS services I worked with during my internship and certifications. Verified by AWS Solutions Architect Associate.
        </p>
      </div>

      {/* Animated connection lines SVG */}
      <div style={{ maxWidth: 1100, margin: "0 auto 2rem", position: "relative" }}>
        <svg
          viewBox="0 0 1100 200"
          style={{ width: "100%", height: "auto", opacity: 0.2 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="awsLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9900" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={100 + i * 180}
              y1="20"
              x2={280 + i * 180}
              y2="180"
              stroke="url(#awsLine)"
              strokeWidth="1"
              strokeDasharray="4 4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </svg>
      </div>

      <div className="recruiter-grid reveal-child recruiter-grid--3" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {AWS_SERVICES.map((service) => (
          <AWSServiceCard key={service.name} service={service} />
        ))}
      </div>

      {/* Certification badge */}
      <div
        className="recruiter-glass reveal-child"
        style={{
          maxWidth: 600,
          margin: "3rem auto 0",
          padding: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF9900, #F2A900)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          AWS
        </div>
        <div>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--recruiter-text)",
              marginBottom: "0.25rem",
            }}
          >
            AWS Solutions Architect Associate
          </div>
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--recruiter-text-secondary)",
            }}
          >
            SAA-C03 • Verified 2024 • AWS Certified AI Practitioner
          </div>
        </div>
      </div>
    </section>
  );
};

export default AWSSection;
