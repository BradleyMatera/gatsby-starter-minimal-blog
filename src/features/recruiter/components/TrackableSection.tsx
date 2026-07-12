import * as React from "react";
import { useRecruiterProgress, type RecruiterSectionId } from "../hooks/useRecruiterProgress";

type TrackableSectionProps = {
  id: RecruiterSectionId;
  children: React.ReactNode;
  className?: string;
};

const TrackableSection: React.FC<TrackableSectionProps> = ({ id, children, className }) => {
  const { registerSection } = useRecruiterProgress();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    registerSection(id, ref.current);
  }, [id, registerSection]);

  return (
    <div ref={ref} data-section-id={id} className={className}>
      {children}
    </div>
  );
};

export default TrackableSection;
