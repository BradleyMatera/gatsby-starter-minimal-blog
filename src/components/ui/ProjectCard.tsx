import * as React from "react";
import cx from "../../utils/cx";

type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
};

type ProjectCardProps = {
  title: string;
  meta?: string;
  summary?: string;
  impact?: string;
  stack?: string[];
  links?: ProjectLink[];
  className?: string;
};

const ProjectCard = ({ title, meta, summary, impact, stack, links, className }: ProjectCardProps) => (
  <article className={cx("project-card", className)}>
    <div className="project-card__heading">
      <h3 className="project-card__title">{title}</h3>
      {meta ? <p className="project-card__meta">{meta}</p> : null}
    </div>
    {summary ? <p className="project-card__description">{summary}</p> : null}
    {impact ? <p className="project-card__impact">{impact}</p> : null}
    {stack && stack.length > 0 ? (
      <div className="project-card__stack">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    ) : null}
    {links && links.length > 0 ? (
      <div className="card-actions">
        {links.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            data-variant={link.variant ?? "ghost"}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    ) : null}
  </article>
);

export default ProjectCard;
