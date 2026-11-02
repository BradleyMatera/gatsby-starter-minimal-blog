import * as React from "react";

const SECTIONS = [
  { id: "recruiter-hero", label: "Overview" },
  { id: "project-explorer", label: "Projects" },
  { id: "experience-timeline", label: "Experience" },
  { id: "resource-library", label: "Documents" },
  { id: "certifications", label: "Credentials" },
  { id: "contact-cta", label: "Contact" },
];

const ProgressRail: React.FC = () => {
  const [active, setActive] = React.useState(SECTIONS[0].id);
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const current = SECTIONS.filter(({ id }) => {
        const node = document.getElementById(id);
        return node && node.getBoundingClientRect().top <= 190;
      }).pop();
      setActive(current?.id || SECTIONS[0].id);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <nav className="recruiter-section-nav" aria-label="Recruiter sections">
      {SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>
      ))}
    </nav>
  );
};

export default ProgressRail;
