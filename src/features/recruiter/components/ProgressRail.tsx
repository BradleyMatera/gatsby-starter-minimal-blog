import * as React from "react";
import { useRecruiterProgress, RECRUITER_SECTIONS } from "../hooks/useRecruiterProgress";

const ProgressRail: React.FC = () => {
  const { viewed } = useRecruiterProgress();
  const total = RECRUITER_SECTIONS.length;
  const completed = viewed.size;
  const percent = Math.round((completed / total) * 100);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section-id="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="progress-rail" role="region" aria-label="Recruiter page progress">
      <div className="progress-rail__summary">
        <span className="progress-rail__label">Profile explored</span>
        <span className="progress-rail__value">{percent}%</span>
      </div>
      <div className="progress-rail__bar" aria-hidden="true">
        <div
          className="progress-rail__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="progress-rail__dots">
        {RECRUITER_SECTIONS.map(({ id, label }) => {
          const isViewed = viewed.has(id);
          return (
            <button
              key={id}
              type="button"
              className={`progress-rail__dot ${isViewed ? "progress-rail__dot--viewed" : ""}`}
              onClick={() => scrollTo(id)}
              title={label}
              aria-label={`${label}${isViewed ? " viewed" : ""}`}
            >
              <span className="progress-rail__dot-label">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressRail;
