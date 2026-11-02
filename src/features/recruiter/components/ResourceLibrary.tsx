import * as React from "react";
import { useRecruiterFilter } from "../hooks/useRecruiterFilter";
import { DocumentIcon, ImageIcon, LinkIcon } from "../../../site/icons";

/* --------------------------------------------------------------------------
   Resource Library — Curated real documents from the Resumes folder.
   All documents open in a new browser tab for viewing.
   -------------------------------------------------------------------------- */

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "pdf" | "link" | "image";
  path?: string;
  url?: string;
  badge?: string;
};

const RESOURCES: Resource[] = [
  // ─── RESUMES (curated to most relevant) ───
  {
    id: "resume-canonical",
    title: "Junior Software Engineer Resume",
    description: "Canonical current resume. Targeted for junior software engineering roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-Software-Engineer.pdf",
    badge: "Primary",
  },
  {
    id: "resume-cloud-support",
    title: "Cloud Support Engineer Resume",
    description: "Tailored for cloud support and AWS-adjacent roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Cloud-Support-Engineer.pdf",
  },
  {
    id: "resume-web-dev",
    title: "Web Developer Resume",
    description: "Focused on web development positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Web-Developer.pdf",
  },
  {
    id: "resume-technical-support",
    title: "Technical Support Resume",
    description: "Emphasizes troubleshooting, documentation, and support skills.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Technical-Support.pdf",
  },
  {
    id: "resume-ai-automation",
    title: "AI Automation Engineer Resume",
    description: "Targeted for AI and automation-focused roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-AI-Automation-Engineer.pdf",
  },
  {
    id: "resume-data-engineer",
    title: "Data Engineer Resume",
    description: "Focused on data engineering and analysis roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Data-Engineer.pdf",
  },
  {
    id: "resume-devops",
    title: "DevOps / Cloud Operations Resume",
    description: "Tailored for DevOps and cloud operations positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-DevOps-Cloud-Operations.pdf",
  },
  {
    id: "resume-frontend",
    title: "Frontend / UI Developer Resume",
    description: "Focused on frontend and user interface development.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Frontend-UI-Developer.pdf",
  },
  {
    id: "resume-backend",
    title: "Backend Developer Resume",
    description: "Targeted for backend development roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Backend-Developer.pdf",
  },
  {
    id: "resume-it-support",
    title: "IT Support Resume",
    description: "Focused on IT support and help desk positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-IT-Support.pdf",
  },
  {
    id: "resume-erp",
    title: "ERP Support Specialist Resume",
    description: "Tailored for ERP software support roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-ERP-Support-Specialist.pdf",
  },
  {
    id: "resume-legal-ai",
    title: "Legal AI Engineer Resume",
    description: "Focused on legal AI and automation roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Legal-AI-Engineer.pdf",
  },
  {
    id: "resume-project-coordinator",
    title: "Project Coordinator Resume",
    description: "Focused on project coordination and management.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Project-Coordinator.pdf",
  },
  {
    id: "resume-business-analyst",
    title: "Business Analyst Resume",
    description: "Tailored for business analysis roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Business-Analyst.pdf",
  },
  {
    id: "resume-junior-data",
    title: "Junior Data Engineer Resume",
    description: "Focused on entry-level data engineering positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-Data-Engineer.pdf",
  },
  {
    id: "resume-junior-qa",
    title: "Junior QA Engineer Resume",
    description: "Focused on quality assurance and testing roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Junior-QA-Engineer.pdf",
  },
  {
    id: "resume-ai-ml",
    title: "AI / ML Support Resume",
    description: "Targeted for AI and machine learning support positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-AI-ML-Support.pdf",
  },
  {
    id: "resume-app-support",
    title: "Application Support Engineer Resume",
    description: "Targeted for application support positions.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Application-Support-Engineer.pdf",
  },
  {
    id: "resume-cloud-tech",
    title: "Cloud Support Technician Resume",
    description: "Focused on cloud support technician roles.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Cloud-Support-Technician.pdf",
  },
  {
    id: "resume-associate-support",
    title: "Associate Software Support Resume",
    description: "Tailored for associate-level software support.",
    category: "Resumes",
    type: "pdf",
    path: "/documents/resumes/matera-bradley-Associate-Software-Support-Specialist.pdf",
  },
  // ─── EDUCATION ───
  {
    id: "licenses-certifications",
    title: "Licenses & Certifications",
    description: "AWS Solutions Architect Associate, AWS AI Practitioner, freeCodeCamp certificates, and Full Sail diploma.",
    category: "Education",
    type: "pdf",
    path: "/documents/education/Licenses%20%26%20certifications.pdf",
    badge: "Verified",
  },
  {
    id: "salutatorian-certificate",
    title: "Salutatorian Certificate",
    description: "Academic achievement recognition.",
    category: "Education",
    type: "image",
    path: "/documents/education/Salutatorian-certificate.jpeg",
  },
  {
    id: "webdev-diploma",
    title: "Web Development Diploma",
    description: "Full Sail University Web Development diploma.",
    category: "Education",
    type: "image",
    path: "/documents/education/WebDevDip.jpeg",
  },
  // ─── TRANSCRIPTS (one only) ───
  {
    id: "transcript-fullsail",
    title: "Full Sail University Transcript",
    description: "Official university transcript showing completed coursework and degree conferral.",
    category: "Transcripts",
    type: "pdf",
    path: "/documents/transcripts/TRPF3QGL-FullSailTranscripts.pdf",
    badge: "Official",
  },
  // ─── LINKS ───
  {
    id: "github-profile",
    title: "GitHub Profile",
    description: "Open source contributions, project repos, commit history, and collaboration.",
    category: "Links",
    type: "link",
    url: "https://github.com/BradleyMatera",
    badge: "Live",
  },
  {
    id: "linkedin-profile",
    title: "LinkedIn Profile",
    description: "Professional profile with experience, recommendations, and endorsements.",
    category: "Links",
    type: "link",
    url: "https://www.linkedin.com/in/bradmatera",
    badge: "Live",
  },
];

const CATEGORIES = [
  "All",
  "Resumes",
  "Education",
  "Transcripts",
  "Links",
];

const ResourceLibrary: React.FC = () => {
  const [search, setSearch] = useRecruiterFilter("document-search", "");
  const [category, setCategory] = useRecruiterFilter("document-category");
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const activeCategory = CATEGORIES.includes(category) ? category : "All";
  const query = search.trim().toLowerCase();
  const filtered = RESOURCES.filter((resource) => (activeCategory === "All" || resource.category === activeCategory) && (!query || `${resource.title} ${resource.description}`.toLowerCase().includes(query)));
  const reset = () => { setSearch(""); setCategory("All"); };
  return (
    <section id="resource-library" className="recruiter-section" aria-labelledby="recruiter-documents-heading">
      <div className="recruiter-section__header">
        <span className="recruiter-section__eyebrow">Document Library</span>
        <h2 id="recruiter-documents-heading" className="recruiter-section__title">All Documents, <span className="recruiter-title-accent">One Place</span></h2>
        <p className="recruiter-section__subtitle">Every resume, transcript, and certificate — viewable in your browser. No downloads required.</p>
      </div>
      <div className="recruiter-resume-feature">
        <div><span className="recruiter-tag">Start here / PDF</span><h3>{RESOURCES[0].title}</h3><p>{RESOURCES[0].description}</p></div>
        <div className="recruiter-actions">
          <a href={RESOURCES[0].path} className="recruiter-btn recruiter-btn--primary">Open resume</a>
          <a href={RESOURCES[0].path} download className="recruiter-btn recruiter-btn--secondary">Download</a>
          <button type="button" className="recruiter-text-link recruiter-resume-preview-toggle" aria-expanded={previewOpen} aria-controls="recruiter-resume-preview" onClick={() => setPreviewOpen(!previewOpen)}>{previewOpen ? "Close preview" : "Preview on this page"}</button>
        </div>
      </div>
      {previewOpen && <div id="recruiter-resume-preview" className="recruiter-resume-preview"><p>The preview may depend on your browser. <a href={RESOURCES[0].path}>Open the PDF directly</a>.</p><object data={RESOURCES[0].path} type="application/pdf" aria-label="Junior Software Engineer resume"><p><a href={RESOURCES[0].path}>Open resume PDF</a></p></object></div>}
      <div className="recruiter-filter-bar recruiter-filter-bar--documents">
        <div className="recruiter-filter-field"><label htmlFor="recruiter-document-search">Search documents</label><input id="recruiter-document-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Role, certificate, or transcript" /></div>
        <div className="recruiter-filter-field"><label htmlFor="recruiter-document-category">Document type</label><select id="recruiter-document-category" value={activeCategory} onChange={(event) => setCategory(event.target.value)}>{CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></div>
        <button type="button" onClick={reset} disabled={!search && activeCategory === "All"}>Reset</button>
      </div>
      <p className="recruiter-result-count" role="status" aria-live="polite">Showing {filtered.length} of {RESOURCES.length} documents</p>
      <div className="recruiter-document-list">
        {CATEGORIES.filter((group) => group !== "All").map((group) => {
          const items = filtered.filter((resource) => resource.category === group);
          return items.length ? <section key={group} aria-label={group}><h3 className="recruiter-document-group">{group}</h3>{items.map((resource) => <DocumentCard key={resource.id} resource={resource} />)}</section> : null;
        })}
      </div>
      {filtered.length === 0 && <div className="recruiter-empty-state"><h3>No documents match your search.</h3><p>Try a different keyword or clear the filters.</p><button type="button" className="recruiter-btn recruiter-btn--secondary" onClick={reset}>Show all documents</button></div>}
    </section>
  );
};

const DocumentCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const href = resource.type === "link" ? resource.url : resource.path;
  return <article className="recruiter-document-row">
    <div className="recruiter-document-row__icon" aria-hidden="true">{resource.type === "pdf" ? <DocumentIcon size={24} /> : resource.type === "image" ? <ImageIcon size={24} /> : <LinkIcon size={24} />}</div>
    <div><span className="recruiter-document-row__type">{resource.type}{resource.badge ? ` · ${resource.badge}` : ""}</span><h4>{resource.title}</h4><p>{resource.description}</p></div>
    <div className="recruiter-actions"><a href={href} className="recruiter-text-link" target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.title} in a new tab`}>Open ↗</a>{resource.path && <a href={resource.path} download className="recruiter-text-link" aria-label={`Download ${resource.title}`}>Download ↓</a>}</div>
  </article>;
};

export default ResourceLibrary;
