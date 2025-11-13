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
  summary?: React.ReactNode;
  impact?: React.ReactNode;
  impactPrefix?: string;
  stack?: string[];
  links?: ProjectLink[];
  className?: string;
};

const ProjectCard = ({ title, meta, summary, impact, impactPrefix = "Impact", stack, links, className }: ProjectCardProps) => {
  const { ref, revealed } = useScrollReveal(0, { initiallyVisible: true });
  const articleClassName = cx(
    "project-card",
    "reveal-card",
    className,
    revealed ? "is-revealed" : undefined
  );

  return (
    <article ref={ref as React.RefObject<HTMLElement>} className={articleClassName}>
      {/* Title - Top horizontal bar (F-pattern first fixation) */}
      <h3 className="project-card__title">{title}</h3>

      {/* Stack - Second horizontal bar (scannable keywords) */}
      {stack && stack.length > 0 ? (
        <div className="project-card__stack">
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}

      {/* Meta - De-emphasized context */}
      {meta ? <p className="project-card__meta">{meta}</p> : null}

      {/* Impact - Bolded outcome/result */}
      {impact ? (
        <p className="project-card__impact">
          <strong>{impactPrefix}:</strong> {impact}
        </p>
      ) : null}

      {/* Description - Body content */}
      {summary ? <p className="project-card__description">{summary}</p> : null}

      {/* CTAs - Call to action links */}
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
