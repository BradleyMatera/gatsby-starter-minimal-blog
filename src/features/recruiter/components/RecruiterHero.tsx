import * as React from "react";
import { projectMedia } from "../../projects/projectMedia";

const RecruiterHero: React.FC = () => (
  <section id="recruiter-hero" className="recruiter-hero" aria-labelledby="recruiter-heading">
    <div className="recruiter-hero__content">
      <span className="recruiter-hero__eyebrow">Bradley Matera / Recruiter Resource Hub</span>
      <h1 id="recruiter-heading" className="recruiter-hero__headline">
        Everything a recruiter needs.<br />
        <span className="recruiter-title-accent">Without the back and forth.</span>
      </h1>
      <p className="recruiter-hero__subheadline">
        I&apos;ve gathered every resource, project, document, certification,
        technical explanation, timeline, and portfolio item into one curated
        experience designed specifically for hiring teams.
      </p>
      <div className="recruiter-actions">
        <a href="/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf" className="recruiter-btn recruiter-btn--primary">Open resume <span className="recruiter-file-type">PDF</span></a>
        <a href="#contact-cta" className="recruiter-btn recruiter-btn--secondary">Schedule Interview</a>
        <a href="#project-explorer" className="recruiter-text-link">Explore projects →</a>
      </div>
      <ul className="recruiter-hero__credentials" aria-label="Background">
        {["Developer", "B.S. Web Development", "AWS Certified", "Cloud Support Trained"].map((label) => <li key={label}>{label}</li>)}
      </ul>
    </div>
    <div className="recruiter-hero__visual">
    <figure className="recruiter-hero__portrait">
      <img src="/brand/bradley-matera-portrait.webp" alt="Bradley Matera" width="320" height="320" loading="eager" />
      <figcaption><strong>Bradley Matera</strong><span>Projects, experience, and the evidence behind them.</span></figcaption>
    </figure>
    <nav className="recruiter-hero__work" aria-label="Featured project previews">
      {[
        { route: "/projects/aws-serverless-metadata-workflow/", label: "Cloud systems" },
        { route: "/projects/interactive-pokedex/", label: "Interfaces" },
        { route: "/projects/triangle-shader-lab/", label: "Graphics" },
      ].map(({ route, label }) => <a key={route} href={route}>
        <img src={projectMedia[route].src} alt="" width="240" height="150" loading="eager" />
        <span>{label}<span aria-hidden="true">↗</span></span>
      </a>)}
    </nav>
    </div>
  </section>
);

export default RecruiterHero;
