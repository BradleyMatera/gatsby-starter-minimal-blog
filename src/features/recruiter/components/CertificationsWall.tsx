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

const CertificationsWall: React.FC = () => (
  <section id="certifications" className="recruiter-section" aria-labelledby="recruiter-credentials-heading">
    <div className="recruiter-section__header"><span className="recruiter-section__eyebrow">Credentials</span><h2 id="recruiter-credentials-heading" className="recruiter-section__title">Certifications <span className="recruiter-title-accent">Wall</span></h2><p className="recruiter-section__subtitle">Verified credentials with links. Every certification includes skills gained and verification details.</p></div>
    <div className="recruiter-credential-list">{CERTIFICATIONS.map((cert) => <article key={cert.id} className="recruiter-credential">
      <div className="recruiter-credential__issuer" aria-hidden="true">{cert.icon}</div>
      <div><h3>{cert.name}</h3><p>{cert.issuer} · {cert.date}</p><details className="recruiter-details"><summary>Credential details and skills</summary><p>Credential ID: <code>{cert.credentialId}</code></p><ul className="recruiter-tag-list">{cert.skills.map((skill) => <li className="recruiter-tag" key={skill}>{skill}</li>)}</ul></details></div>
      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="recruiter-btn recruiter-btn--secondary" aria-label={`Verify ${cert.name} in a new tab`}>Verify credential ↗</a>
    </article>)}</div>
  </section>
);

export default CertificationsWall;
