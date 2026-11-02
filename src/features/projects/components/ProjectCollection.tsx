import * as React from "react";
import { useUrlState } from "../../blog/useUrlState";
import ResponsiveFilters from "../../blog/components/ResponsiveFilters";
import type { ProjectCardProps } from "./ProjectCard";

const ProjectCollection = ({ children }: React.PropsWithChildren) => {
  const [filters, setFilters] = useUrlState({ q: "", skill: "" });
  const projects = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<ProjectCardProps>[];
  const skills = Array.from(new Set(projects.flatMap((project) => project.props.stack || []))).sort();
  const visible = projects.filter(({ props }) => {
    const text = [props.title, props.meta, typeof props.summary === "string" ? props.summary : "", ...(props.stack || [])].join(" ").toLowerCase();
    return text.includes(filters.q.trim().toLowerCase()) && (!filters.skill || props.stack?.includes(filters.skill));
  });
  return (
    <div className="project-collection">
      <div className="editorial-library-controls">
        <form className="editorial-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="project-search">Search projects</label>
          <input id="project-search" type="search" value={filters.q} onChange={(event) => setFilters({ q: event.target.value }, true)} />
        </form>
        <ResponsiveFilters label={`Filter by technology${filters.skill ? " · active" : ""}`}>
          <label htmlFor="project-skill">Technology</label>
          <select id="project-skill" value={filters.skill} onChange={(event) => setFilters({ skill: event.target.value })}>
            <option value="">All technologies</option>
            {skills.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
          </select>
        </ResponsiveFilters>
        <div className="editorial-control-actions">
          <p role="status">{visible.length} of {projects.length} projects</p>
          <button type="button" disabled={!filters.q && !filters.skill} onClick={() => setFilters({ q: "", skill: "" })}>Clear all filters</button>
        </div>
      </div>
      {visible.length ? <div className="project-collection__grid">{visible}</div> : <p>No projects match your filters.</p>}
    </div>
  );
};
export default ProjectCollection;
