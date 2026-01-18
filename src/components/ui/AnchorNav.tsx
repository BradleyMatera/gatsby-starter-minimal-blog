import * as React from "react";
import joinClasses from "../../utils/joinClasses";

type AnchorNavItem = {
  id: string;
  label: string;
};

type AnchorNavProps = {
  items: AnchorNavItem[];
  className?: string;
};

const AnchorNav = ({ items, className }: AnchorNavProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={joinClasses("surface-card inpage-nav", className)} aria-label="On this page">
      <span className="eyebrow">On this page</span>
      <div className="inpage-nav__links">
        {items.map((item) => (
          <a key={item.id} className="filter-pill" href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default AnchorNav;
