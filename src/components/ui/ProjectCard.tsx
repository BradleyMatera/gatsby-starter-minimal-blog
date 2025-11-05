import * as React from "react";
import cx from "../../utils/cx";
import Link from "./Link";
import { useScrollReveal } from "../home/useScrollReveal";

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

const ProjectCard = ({ title, meta, summary, impact, stack, links, className }: ProjectCardProps) => {
  const { ref, revealed } = useScrollReveal(0);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={cx("project-card", className)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      <div className="project-card__header">
        <div className="project-card__heading">
          <h3 className="project-card__title">{title}</h3>
          {meta ? <p className="project-card__meta">{meta}</p> : null}
        </div>
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
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              data-variant={link.variant ?? "ghost"}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
};

export default ProjectCard;
