import * as React from "react";

/* --------------------------------------------------------------------------
   Experience Timeline — Artistic scroll-revealed career timeline.
   - Alternating left/right cards on desktop
   - Smooth GSAP/CSS scroll reveals
   - Expandable detail panels with animated progress dots
   -------------------------------------------------------------------------- */

type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  type: string;
  highlights: string[];
  tags: string[];
};

const TIMELINE: TimelineEntry[] = [
  {
    period: "Oct 2024 – Jun 2025",
    title: "Junior Frontend Developer",
    org: "CIRIS Ethical AI — Freelance, Remote",
    type: "Freelance",
    highlights: [
      "Ran the project locally and improved onboarding/setup documentation with environment notes and JWT guidance.",
      "Contributed small merged PRs: logging around token verification, lint fixes, improved error messages.",
      "Tracked larger improvements as GitHub Issues to keep work transparent and organized.",
    ],
    tags: ["JavaScript", "GitHub", "Documentation", "JWT", "Debugging", "Frontend"],
  },
  {
    period: "May 2025 – Aug 2025",
    title: "Cloud Support Engineer Intern",
    org: "Amazon Web Services (AWS) — Seattle, WA",
    type: "Internship",
    highlights: [
      "Completed guided support rotations in training environments with no customer data.",
      "Finished Juniper/Junos troubleshooting labs delivered in Jupyter Notebooks.",
      "Built a serverless metadata extraction capstone using Lambda, DynamoDB, S3, and Amplify.",
      "Created a transparent cost model using request counts, GB-month, compute time, read/write units, and transfer out.",
    ],
    tags: ["AWS", "Lambda", "DynamoDB", "S3", "CloudFront", "Troubleshooting", "Documentation"],
  },
  {
    period: "Oct 2025",
    title: "B.S. Web Development",
    org: "Full Sail University — Winter Park, FL",
    type: "Education",
    highlights: [
      "Completed accelerated B.S. in Web Development focused on JavaScript, React, Node.js, SQL, and project-based development.",
      "Participated in Tech Talk Club and weekly Agile-style standups.",
      "Collaborated on Fallen Knight: Requiem of Honor, a KAJAM game jam project ranked #9 in Artstyle.",
    ],
    tags: ["React", "Node.js", "SQL", "Agile", "Project-based"],
  },
  {
    period: "Sep 2022 – Jan 2023",
    title: "Case Manager",
    org: "Mason County, WA",
    type: "Full-time",
    highlights: [
      "Guided clients through Veterans Court, Drug Court, and Mental Health Court processes.",
      "Maintained clear, accurate documentation for court-mandated requirements.",
      "Used crisis intervention and strong communication to keep clients engaged and supported.",
    ],
    tags: ["Documentation", "Communication", "Organization", "Crisis Intervention"],
  },
  {
    period: "Jun 2020 – Sep 2022",
    title: "Animal Care Associate",
    org: "Mason County Kitten Rescue — Mason County, WA",
    type: "Part-time",
    highlights: [
      "Cared for abandoned and at-risk kittens with daily feeding, cleaning, and basic healthcare.",
      "Trained new volunteers and supported intake, fostering, and adoption efforts.",
      "Worked alongside a small team, building communication and organization skills.",
    ],
    tags: ["Teamwork", "Training", "Compassion", "Organization"],
  },
  {
    period: "Jan 2018 – Jan 2020",
    title: "Roof Loader",
    org: "Stoneway Roofing Supply",
    type: "Full-time",
    highlights: [
      "Loaded and delivered roofing materials to job sites in all weather conditions.",
      "Worked in tight schedules while staying focused on safety and clear crew communication.",
      "Developed discipline, physical endurance, and time management.",
    ],
    tags: ["Safety", "Time management", "Communication", "Physical endurance"],
  },
  {
    period: "Jun 2011 – Apr 2014",
    title: "Healthcare Specialist",
    org: "U.S. Army — Ft. Bragg",
    type: "Military",
    highlights: [
      "Provided medical support in training environments and combat zones.",
      "Developed calm-under-pressure skills, attention to detail, and quick adaptability.",
      "Demonstrated responsibility and reliability in high-stakes situations.",
    ],
    tags: ["Responsibility", "Adaptability", "Teamwork", "Pressure"],
  },
];

const ExperienceTimeline: React.FC = () => (
  <section id="experience-timeline" className="recruiter-section" aria-labelledby="recruiter-experience-heading">
    <div className="recruiter-section__header"><span className="recruiter-section__eyebrow">Experience</span><h2 id="recruiter-experience-heading" className="recruiter-section__title">Career <span className="recruiter-title-accent">Timeline</span></h2><p className="recruiter-section__subtitle">From military service to cloud engineering. Every step built the engineer I am today.</p></div>
    <div className="recruiter-experience-list">{TIMELINE.map((entry, index) => <article className="recruiter-experience-row" key={`${entry.title}-${entry.org}`}>
      <div className="recruiter-experience-row__period"><span>{entry.period}</span><span className="recruiter-tag">{entry.type}</span></div>
      <div><h3>{entry.title}</h3><p>{entry.org}</p><details className="recruiter-details" open={index === 1}><summary>Responsibilities and experience</summary><ul>{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><ul className="recruiter-tag-list">{entry.tags.map((tag) => <li className="recruiter-tag" key={tag}>{tag}</li>)}</ul></details></div>
    </article>)}</div>
  </section>
);

export default ExperienceTimeline;
