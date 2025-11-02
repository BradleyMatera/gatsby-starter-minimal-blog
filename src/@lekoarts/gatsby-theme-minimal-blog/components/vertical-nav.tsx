import * as React from "react";
import { Link } from "gatsby";
import "../../../styles/vertical-nav.css";

type NavItem = {
  title: string;
  slug: string;
};

type VerticalNavProps = {
  nav: NavItem[];
};

const VerticalNav = ({ nav }: VerticalNavProps) => {
  // Filter to core links only: Home, Projects, About, Contact
  const coreLinks = nav.filter(item => 
    ["/", "/projects", "/about", "/contact"].includes(item.slug)
  );

  return (
    <nav className="vertical-nav" role="navigation" aria-label="Main Navigation">
      <div className="vertical-nav__inner">
        {/* Logo/Brand */}
        <Link to="/" className="vertical-nav__brand" aria-label="Home">
          <span className="vertical-nav__brand-text">BM</span>
        </Link>

        {/* Core Navigation Links */}
        <ul className="vertical-nav__list">
          {coreLinks.map((item) => {
            const label = item.slug === "/" ? "Home" : item.title;
            const icon = getNavIcon(item.slug);
            
            return (
              <li key={item.slug}>
                <Link
                  to={item.slug}
                  className="vertical-nav__link"
                  activeClassName="vertical-nav__link--active"
                  title={label}
                >
                  <span className="vertical-nav__icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="vertical-nav__label">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <Link to="/contact" className="vertical-nav__cta">
          <span className="vertical-nav__cta-icon" aria-hidden="true">→</span>
          <span className="vertical-nav__cta-text">Start a Project</span>
        </Link>
      </div>
    </nav>
  );
};

// Helper function to get icons for nav items
function getNavIcon(slug: string): string {
  switch (slug) {
    case "/":
      return "⌂";
    case "/projects":
      return "◈";
    case "/about":
      return "☉";
    case "/contact":
      return "✉";
    default:
      return "•";
  }
}

export default VerticalNav;
