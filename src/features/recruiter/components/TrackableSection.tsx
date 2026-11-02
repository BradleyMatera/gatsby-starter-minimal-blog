import * as React from "react";
import type { RecruiterSectionId } from "../hooks/useRecruiterProgress";

const TrackableSection: React.FC<{
  id: RecruiterSectionId;
  children: React.ReactNode;
  className?: string;
}> = ({ id, children, className }) => (
  <div data-section-id={id} className={className}>{children}</div>
);

export default TrackableSection;
