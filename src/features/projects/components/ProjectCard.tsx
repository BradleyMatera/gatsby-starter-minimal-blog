import * as React from "react";
import joinClasses from "../../../utils/joinClasses";
import Link from "../../../ui/Link";
import MetricBadge from "./MetricBadge";
import ExternalLinkIcon from "../../../site/icons/ExternalLinkIcon";
import { ProjectGraphic } from "./ProjectEvidence";
import { projectMedia } from "../projectMedia";
import "../../../styles/editorial.css";

type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export type ProjectCardProps = {
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
  const articleClassName = joinClasses("project-card", "editorial-project-card", className);
  const projectPath = links?.find((link) => link.href.startsWith("/projects/"))?.href;
  const media = projectPath ? projectMedia[projectPath] : undefined;
  const image = media?.src || (media?.steps ? undefined : thumbnail);
  const hasDetails = Boolean(summaryDetails);
  const previewContent = summaryPreview ?? summary;
  const previewClassName = hasDetails ? "project-card__summary" : "project-card__description";
  const hasThumbnail = Boolean(image);
  const orderedLinks = React.useMemo(() => {
    if (!links || links.length === 0) return [];
    const rank = (link: ProjectLink) => {
      const label = link.label.toLowerCase();
      const href = link.href.toLowerCase();
      if (href.startsWith("/projects/") || label.includes("case study") || link.variant === "primary") return 0;
      if (label.includes("live demo") || label.includes("live project")) return 1;
      if (label.includes("github") || href.includes("github.com")) return 2;
      return 3;
    };
    return [...links].sort((a, b) => rank(a) - rank(b));
  }, [links]);

  return (
    <article
      className={articleClassName}
    >
      <div className={joinClasses("project-card__frame", hasThumbnail ? "u-flex-col u-gap-3" : undefined)}>
        {image ? (
          <div className="project-card__thumbnail u-w-full u-flex-none">
            <img
              src={image}
              alt={media?.src ? media.alt : thumbnailAlt ?? `${title} project illustration`}
              loading="lazy"
              decoding="async"
              width="1440"
              height="960"
              className="editorial-project-card__image"
            />
            {media ? <p className="editorial-media-caption">{media.caption}</p> : null}
          </div>
        ) : media?.steps ? <div><ProjectGraphic media={media} /><p className="editorial-media-caption">{media.caption}</p></div> : null}
        <div className="project-card__content">
          <h3 className="project-card__title">{title}</h3>
          {meta ? <p className="project-card__meta">{meta}</p> : null}
          {metrics && metrics.length > 0 ? (
            <div className="project-card__metrics">
              {metrics.map((metric) => (
                <MetricBadge key={metric} text={metric} />
              ))}
            </div>
          ) : null}
          {impact ? (
            <p className="project-card__impact">
              <strong>{impactPrefix}:</strong> {impact}
            </p>
          ) : null}
          {previewContent ? (
            <div className={previewClassName}>
              {previewContent}
            </div>
          ) : null}
          {stack && stack.length > 0 ? (
            <div className="project-card__stack">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
          {summaryDetails ? (
            <details className="project-card__details">
              <summary>{detailsLabel}</summary>
              <div className="project-card__details-body">{summaryDetails}</div>
            </details>
          ) : null}
          {orderedLinks.length > 0 ? (
            <div className="card-actions">
              {orderedLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  data-variant={link.variant ?? "ghost"}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={link.external ? "link-external" : undefined}
                >
                  {link.label}
                  {link.external && (
                    <ExternalLinkIcon size={14} className="link-external__icon" />
                  )}
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
