import * as React from "react";

const ResponsiveFilters = ({ children, label = "Filters", initiallyCollapsed = false }: React.PropsWithChildren<{ label?: string; initiallyCollapsed?: boolean }>) => {
  const ref = React.useRef<HTMLDetailsElement>(null);
  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => { if (ref.current) ref.current.open = media.matches && !initiallyCollapsed; };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [initiallyCollapsed]);
  return (
    <details className="editorial-filters" open={!initiallyCollapsed} ref={ref}>
      <summary>{label}</summary>
      <div className="editorial-filters__body">{children}</div>
    </details>
  );
};

export default ResponsiveFilters;
