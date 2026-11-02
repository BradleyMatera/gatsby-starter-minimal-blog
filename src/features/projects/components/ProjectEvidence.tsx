import * as React from "react";
import { projectMedia, type ProjectMedia } from "../projectMedia";

export const ProjectGraphic = ({ media }: { media: ProjectMedia }) => (
  <div className="editorial-project-graphic" role="group" aria-label={media.alt}>
    <ol>{media.steps?.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
  </div>
);

const ProjectEvidence = ({ pathname }: { pathname: string }) => {
  const media = projectMedia[pathname];
  if (!media) return null;
  return (
    <figure className="editorial-figure editorial-project-evidence">
      {media.src ? (
        <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size image: ${media.alt}`}>
          <img src={media.src} alt={media.alt} width={1440} height={960} decoding="async" />
        </a>
      ) : <ProjectGraphic media={media} />}
      <figcaption>
        <span>{media.caption}</span>
        <a href={media.source} target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
        {media.src ? <a href={media.src} target="_blank" rel="noopener noreferrer">View full-size image</a> : null}
      </figcaption>
    </figure>
  );
};

export default ProjectEvidence;
