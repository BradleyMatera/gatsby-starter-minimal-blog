import * as React from "react";
import { ResumeIcon, CloudIcon, GlobeIcon, ToolsIcon, ScrollIcon, TrophyIcon, ExternalLinkIcon } from "../../../site/icons";

/* --------------------------------------------------------------------------
   Interview Resources — Real documents from the Resumes folder.
   All documents open in-browser for viewing. No forced downloads.
   -------------------------------------------------------------------------- */

type Packet = {
  id: string;
  title: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  path: string;
  tags: string[];
  badge?: string;
};

const PACKETS: Packet[] = [
  {
    id: "canonical-resume",
    title: "Junior Software Engineer Resume",
    description: "Primary resume targeting junior software engineering roles. Includes all current experience, skills, and certifications.",
    Icon: ResumeIcon,
    path: "/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf",
    tags: ["Primary", "Software Engineer"],
    badge: "Most Used",
  },
  {
    id: "cloud-resume",
    title: "Cloud Support Engineer Resume",
    description: "Tailored for cloud support roles. Emphasizes AWS internship, certifications, and troubleshooting experience.",
    Icon: CloudIcon,
    path: "/documents/resumes/matera-bradley-Cloud-Support-Engineer.pdf",
    tags: ["Cloud", "AWS"],
  },
  {
    id: "web-dev-resume",
    title: "Web Developer Resume",
    description: "Focused on web development positions. Highlights React, JavaScript, and frontend project experience.",
    Icon: GlobeIcon,
    path: "/documents/resumes/matera-bradley-Web-Developer.pdf",
    tags: ["Web Dev", "Frontend"],
  },
  {
    id: "tech-support-resume",
    title: "Technical Support Resume",
    description: "Emphasizes troubleshooting, documentation, and customer support skills from AWS internship and prior roles.",
    Icon: ToolsIcon,
    path: "/documents/resumes/matera-bradley-Technical-Support.pdf",
    tags: ["Support", "Troubleshooting"],
  },
  {
    id: "transcript",
    title: "Full Sail University Transcript",
    description: "Official transcript showing all completed coursework, grades, and degree conferral.",
    Icon: ScrollIcon,
    path: "/documents/transcripts/TRPF3QGL-FullSailTranscripts.pdf",
    tags: ["Official", "Education"],
    badge: "Official",
  },
  {
    id: "licenses-certs",
    title: "Licenses & Certifications",
    description: "AWS Solutions Architect Associate, AWS AI Practitioner, freeCodeCamp certificates, and academic honors.",
    Icon: TrophyIcon,
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
        {PACKETS.map((packet) => {
          const { Icon } = packet;
          return (
            <div
              key={packet.id}
              className="recruiter-card interview-resource-card"
            >
              {packet.badge && (
                <span className="interview-resource-card__badge">
                  {packet.badge}
                </span>
              )}
              <div className="interview-resource__icon">
                <Icon size={24} />
              </div>
              <h3 className="interview-resource-card__title">
                {packet.title}
              </h3>
              <p className="interview-resource-card__desc">
                {packet.description}
              </p>

              <div className="interview-resource-card__tags">
                {packet.tags.map((tag) => (
                  <span key={tag} className="interview-resource-card__tag">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={packet.path}
                target="_blank"
                rel="noopener noreferrer"
                className="recruiter-btn magnetic-btn recruiter-btn--primary interview-resource-card__btn"
              >
                <ExternalLinkIcon size={14} />
                <span>View Document</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InterviewResources;
