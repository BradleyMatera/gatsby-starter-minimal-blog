import * as React from "react";

export type RecruiterSectionId =
  | "hero"
  | "why"
  | "roles"
  | "contributions"
  | "resources"
  | "experience"
  | "projects"
  | "skills"
  | "aws"
  | "certifications"
  | "writing"
  | "faq"
  | "leadership"
  | "contact"
  | "interview";

export const RECRUITER_SECTIONS: { id: RecruiterSectionId; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "why", label: "Why" },
  { id: "roles", label: "Roles" },
  { id: "contributions", label: "Open Source" },
  { id: "resources", label: "Resources" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "aws", label: "AWS" },
  { id: "certifications", label: "Certs" },
  { id: "writing", label: "Writing" },
  { id: "faq", label: "FAQ" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
  { id: "interview", label: "Interview" },
];

type ProgressContextValue = {
  viewed: Set<RecruiterSectionId>;
  registerSection: (id: RecruiterSectionId, node: HTMLElement | null) => void;
};

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

const STORAGE_KEY = "bm-recruiter-progress";

export const RecruiterProgressProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [viewed, setViewed] = React.useState<Set<RecruiterSectionId>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw) as RecruiterSectionId[]) : new Set<RecruiterSectionId>();
    } catch (_) {
      return new Set<RecruiterSectionId>();
    }
  });

  const sectionNodes = React.useRef<Map<RecruiterSectionId, HTMLElement>>(new Map());
  const [, forceUpdate] = React.useState(0);

  const registerSection = React.useCallback((id: RecruiterSectionId, node: HTMLElement | null) => {
    if (node) {
      sectionNodes.current.set(id, node);
    } else {
      sectionNodes.current.delete(id);
    }
    forceUpdate((n) => n + 1);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id") as RecruiterSectionId | null;
            if (!id) return;
            setViewed((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
              } catch (_) { /* localStorage may be unavailable */ }
              return next;
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -20% 0px" }
    );

    sectionNodes.current.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [forceUpdate]);

  const value = React.useMemo(
    () => ({ viewed, registerSection }),
    [viewed, registerSection]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useRecruiterProgress = (): ProgressContextValue => {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) throw new Error("useRecruiterProgress must be used within RecruiterProgressProvider");
  return ctx;
};
