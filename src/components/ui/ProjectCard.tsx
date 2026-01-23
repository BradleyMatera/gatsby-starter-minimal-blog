import * as React from "react";
import joinClasses from "../../utils/joinClasses";
import Link from "./Link";
import { useScrollReveal } from "../home/useScrollReveal";
import MetricBadge from "../visuals/MetricBadge";

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
  summaryPreview?: React.ReactNode;
  summaryDetails?: React.ReactNode;
  detailsLabel?: string;
  impact?: React.ReactNode;
  impactPrefix?: string;
  stack?: string[];
  metrics?: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  links?: ProjectLink[];
  className?: string;
};

const ProjectCard = ({
  title,
  meta,
  summary,
  summaryPreview,
  summaryDetails,
  detailsLabel = "More details",
  impact,
  impactPrefix = "Impact",
  stack,
  metrics,
  thumbnail,
  thumbnailAlt,
  links,
  className,
}: ProjectCardProps) => {
  const { ref, revealed } = useScrollReveal(0, { initiallyVisible: true });
  const articleClassName = joinClasses(
    "project-card",
    "reveal-card",
    className,
    revealed ? "is-revealed" : undefined
  );
  const hasDetails = Boolean(summaryDetails);
  const previewContent = summaryPreview ?? summary;
  const previewClassName = hasDetails ? "project-card__summary" : "project-card__description";

  return (
    <article ref={ref as React.RefObject<HTMLElement>} className={articleClassName}>
      <div className="project-card__frame">
        {thumbnail ? (
          <div className="project-card__thumbnail">
            <img src={thumbnail} alt={thumbnailAlt ?? `${title} project thumbnail`} loading="lazy" />
          </div>
        ) : null}
        <div className="project-card__content">
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

          {/* Metrics badges */}
          {metrics && metrics.length > 0 ? (
            <div className="project-card__metrics">
              {metrics.map((metric) => (
                <MetricBadge key={metric} text={metric} />
              ))}
            </div>
          ) : null}

          {/* Impact - Bolded outcome/result */}
          {impact ? (
            <p className="project-card__impact">
              <strong>{impactPrefix}:</strong> {impact}
            </p>
          ) : null}

          {/* Description - Body content */}
          {previewContent ? (
            <div className={previewClassName}>
              {previewContent}
              {stack && stack.length > 0 ? (
                <p className="project-card__tech">
                  <strong>Tech:</strong> {stack.join(", ")}
                </p>
              ) : null}
            </div>
          ) : null}
          {summaryDetails ? (
            <details className="project-card__details">
              <summary>{detailsLabel}</summary>
              <div className="project-card__details-body">{summaryDetails}</div>
            </details>
          ) : null}

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
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
