import * as React from "react";
type TimelineEntry = {
  id: string;
  dates: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  responsibilities: { label: string; detail: string }[];
  skills: string[];
  proof: { label: string; href: string }[];
};

const entries: TimelineEntry[] = [
  {
    id: "maintenance-2025",
    dates: "Dec 2025 – Present",
    title: "Maintenance Technician",
    company: "Rock Walworth Comprehensive Family Services Inc.",
    location: "On-site (Full-time)",
    summary:
      "Manage facility upkeep, coordinate repairs, and keep equipment operational so staff focus on care delivery while systems stay stable.",
    responsibilities: [
      { label: "Preventative maintenance", detail: "Perform preventative and corrective routines on HVAC, plumbing, and electrical systems." },
      { label: "Coordination", detail: "Align leadership and staff to schedule repairs with minimal disruption to care." },
      { label: "Documentation", detail: "Log work orders and report recurring faults for long-term fixes." },
    ],
    skills: ["Preventative maintenance", "Troubleshooting", "Communication"],
    proof: [
      { label: "Facility info", href: "https://www.rockwalworthinc.com/" },
    ],
  },
  {
    id: "aws-internship-2025",
    dates: "May 2025 – Aug 2025",
    title: "Cloud Support Engineer Intern",
    company: "Amazon Web Services (AWS)",
    location: "Seattle, WA (On-site internship)",
    summary:
      "Completed hands-on AWS support rotations, triaging incidents, automating dashboards, and delivering runbooks for internal usage.",
    responsibilities: [
      { label: "Automation", detail: "Automated incident response checks using CloudWatch and Lambda workflows." },
      { label: "Observability", detail: "Built dashboards that surfaced S3/EC2 health for on-call engineers." },
      { label: "Runbooks", detail: "Authored documentation covering networking and AI support workflows." },
    ],
    skills: [
      "Amazon S3, EC2, RDS, DynamoDB",
      "CloudFront, SageMaker, Bedrock",
      "Technical writing & compliance",
    ],
    proof: [
      { label: "AWS Internships", href: "https://www.amazon.jobs/en/teams/aws" },
    ],
  },
  {
    id: "ciris-2024",
    dates: "Jan 2024 – Dec 2024",
    title: "Junior Frontend Developer (Volunteer)",
    company: "CIRIS Ethical AI",
    location: "Remote (Part-time)",
    summary:
      "Improved onboarding docs and tooling in open-source ethics projects, helping new contributors set up local environments securely.",
    responsibilities: [
      { label: "Onboarding docs", detail: "Updated READMEs, workflows, and contributor guides after testing each project." },
      { label: "Issue triage", detail: "Logged issues and documented AI-assisted debugging steps for maintainers." },
      { label: "Environment notes", detail: "Clarified environment variables, preview URLs, and shared runbooks for new members." },
    ],
    skills: ["React.js", "JavaScript", "Technical documentation", "GitHub workflows"],
    proof: [
      { label: "Pull requests", href: "https://github.com/CIRISAI/CIRISNode/pulls?q=is%3Apr+author%3ABradleyMatera" },
    ],
  },
  {
    id: "case-management-2022",
    dates: "Sep 2022 – Jan 2023",
    title: "Case Manager",
    company: "Mason County, WA",
    location: "On-site (Full-time)",
    summary:
      "Coordinated court compliance for Veterans Court, Drug Court, and Mental Health Court, keeping participants engaged and documentation accurate.",
    responsibilities: [
      { label: "Court coordination", detail: "Tracked court-mandated milestones while maintaining crisis readiness." },
      { label: "Documentation", detail: "Logged client progress and coordinated with legal teams for safety checks." },
      { label: "Project tracking", detail: "Applied Agile-style tracking to keep multiple caseloads moving forward." },
    ],
    skills: ["Crisis intervention", "Project tracking", "Communication"],
    proof: [
      { label: "Mason County services", href: "https://www.masoncountywa.gov/our-county/departments/community-services/" },
    ],
  },
  {
    id: "animal-care-2020",
    dates: "Jun 2020 – Sep 2022",
    title: "Animal Care Associate",
    company: "Mason County Kitten Rescue",
    location: "Mason County, WA (Part-time)",
    summary:
      "Provided veterinarian-style care for rescued kittens, trained volunteers, and supported intake/adoption efforts.",
    responsibilities: [
      { label: "Caretaking", detail: "Handled feeding, cleaning, and behavioral monitoring for at-risk kittens." },
      { label: "Volunteer training", detail: "Trained volunteers on intake procedures and hygiene best practices." },
      { label: "Community support", detail: "Supported fostering, adoption, and outreach events." },
    ],
    skills: ["Compassion", "Volunteer leadership", "Problem-solving"],
    proof: [
      { label: "Rescue page", href: "https://www.masoncountywa.gov" },
    ],
  },
  {
    id: "roof-loader-2018",
    dates: "Jan 2018 – Jan 2020",
    title: "Roof Loader",
    company: "Stoneway Roofing Supply",
    location: "On-site (Full-time)",
    summary:
      "Loaded, delivered, and coordinated roofing materials under tight timelines, building endurance and communication across crews.",
    responsibilities: [
      { label: "Logistics", detail: "Loaded heavy materials onto conveyors and rooftops." },
      { label: "Delivery", detail: "Delivered materials to job sites while aligning schedules with crews." },
      { label: "Safety", detail: "Prioritized safety standards on high-rise roofs and in rough weather." },
    ],
    skills: ["Teamwork", "Logistics", "Safety awareness"],
    proof: [
      { label: "Stoneway Roofing", href: "https://stonewayroofing.com/" },
    ],
  },
  {
    id: "construction-2017",
    dates: "2017 – Aug 2018",
    title: "General Contracting / Construction Worker",
    company: "Ascend Roofing Company LLC",
    location: "On-site (Full-time)",
    summary:
      "Supported residential and commercial roofing projects with demolition, installations, and maintenance work.",
    responsibilities: [
      { label: "Project support", detail: "Assisted with tear-offs, shingle installations, and clean-up." },
      { label: "Material prep", detail: "Managed material prep and collaborated with lead roofers." },
      { label: "Progress tracking", detail: "Documented site progress and communicated issues to supervisors." },
    ],
    skills: ["Construction management", "Customer service", "Problem-solving"],
    proof: [
      { label: "Ascend Roofing", href: "https://www.ascendroofing.com/" },
    ],
  },
  {
    id: "army-2011",
    dates: "Jun 2011 – Apr 2014",
    title: "Healthcare Specialist (Combat Medic)",
    company: "U.S. Army",
    location: "North Carolina, USA (Hybrid)",
    summary:
      "Delivered medical care in training and field operations, specializing in triage, medication administration, and supply management.",
    responsibilities: [
      { label: "Medical care", detail: "Performed exams, medication administration, and emergency responses." },
      { label: "Supply management", detail: "Managed medical supplies for training environments." },
      { label: "Leadership", detail: "Stayed calm under pressure while leading high-stress teams." },
    ],
    skills: ["Crisis care", "Leadership", "Critical thinking"],
    proof: [
      { label: "Army MOS 68W", href: "https://www.goarmy.com/careers-and-jobs/browse-career-fields/healthcare/health-care-specialist.html" },
    ],
  },
];

const ExperienceTimeline = () => (
  <section className="timeline" aria-label="Professional experience timeline">
    <div className="experience-cards">
      {entries.map((item) => (
        <article key={item.id} className="experience-card">
          <div className="experience-card__header">
            <div className="experience-card__title">
              {item.title} · <strong>{item.company}</strong>
            </div>
            <div className="experience-card__meta">
              {item.dates} · {item.location}
            </div>
          </div>
          {item.summary && (
            <p className="experience-card__summary">{item.summary}</p>
          )}
          <ul className="experience-card__list">
            {item.responsibilities.map((line, index) => (
              <li key={`${item.id}-${index}`}>
                <strong>{line.label}:</strong> {line.detail}
              </li>
            ))}
          </ul>
          <div className="experience-card__skills">Skills: {item.skills.join(", ")}</div>
          <div className="experience-card__proof">
            {item.proof.map((proof) => (
              <a key={proof.href} href={proof.href} target="_blank" rel="noopener noreferrer">
                {proof.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default ExperienceTimeline;
