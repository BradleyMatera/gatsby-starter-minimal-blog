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
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile) setMobileDrawerOpen(false);
  }, [isMobile]);

  const emailAddress = "bradmatera@gmail.com";
  const emailSubject = encodeURIComponent("Project inquiry via bradmatera.com");
  const emailBody = encodeURIComponent(
    [
      "Hi Bradley,",
      "",
      "I'm reaching out from your portfolio. Here's a quick summary of what I have in mind:",
      "",
      "- Goals:",
      "- Timeline:",
      "- Budget / constraints:",
      "",
      "Looking forward to collaborating!"
    ].join("\n")
  );
  const emailHref = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

  // Filter to core links only: Home, Projects, About, Contact, Roles, Contributions, Blog
  const coreLinks = nav.filter(item =>
    ["/", "/projects", "/about", "/roles", "/contributions", "/posts"].includes(item.slug)
  );

  return (
    <>
      {isMobile && (
        <button
          className="vertical-nav__toggle-icon"
          aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 200,
            background: "var(--color-accent, #e05a5a)",
            color: "var(--color-text-inverse, #fff)",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(224,90,90,0.10)",
            cursor: "pointer",
            transition: "left 0.3s"
          }}
        >
          {mobileDrawerOpen ? (
            // Close icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="7" width="16" height="2" rx="1" fill="currentColor"/>
              <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>
              <rect x="4" y="15" width="16" height="2" rx="1" fill="currentColor"/>
            </svg>
          )}
        </button>
      )}
      {/* Desktop Nav */}
      {!isMobile && (
        <nav
          className="vertical-nav vertical-nav--top"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="vertical-nav__inner">
            <Link to="/" className="vertical-nav__brand" aria-label="Home">
              <span className="vertical-nav__brand-text">BM</span>
            </Link>
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
        <a href="/contact" className="vertical-nav__cta" style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', padding: '0.2rem 0.7rem', borderRadius: '1rem', background: '#fff', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textDecoration: 'none', whiteSpace: 'nowrap', height: '1.8rem'}}>
          <span className="vertical-nav__cta-icon" aria-hidden="true">✉</span>
          <span>Email me!</span>
        </a>
      </div>
    </nav>
  )}

      {/* Mobile Drawer Nav */}
      {isMobile && mobileDrawerOpen && (
        <nav
          className="vertical-nav vertical-nav--drawer"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="vertical-nav__inner">
            <Link to="/" className="vertical-nav__brand" aria-label="Home">
              <span className="vertical-nav__brand-text">BM</span>
            </Link>
            <button
              className="vertical-nav__close-btn"
              style={{
                marginBottom: "1.5rem",
                background: "var(--color-accent, #e05a5a)",
                color: "var(--color-text-inverse, #fff)",
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                alignSelf: "flex-end"
              }}
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="Close Menu"
            >
              Close Menu
            </button>
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
        <a href="/contact" className="vertical-nav__cta" style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', padding: '0.2rem 0.7rem', borderRadius: '1rem', background: '#fff', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textDecoration: 'none', whiteSpace: 'nowrap', height: '1.8rem'}}>
          <span className="vertical-nav__cta-icon" aria-hidden="true">✉</span>
          <span>Email me!</span>
        </a>
    </div>
  </nav>
)}
    </>
  );
};

// Helper function to get icons for nav items
function getNavIcon(slug: string): React.ReactNode {
  switch (slug) {
    case "/":
      return <span title="Home">⌂</span>;
    case "/projects":
      return <span title="Projects">◈</span>;
    case "/about":
      return <span title="About">☉</span>;
    case "/contact":
      return <span title="Contact">✉</span>;
    case "/roles":
      // Custom SVG icon for Roles
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3.5" stroke="#e05a5a" strokeWidth="2"/>
          <rect x="4" y="13" width="12" height="5" rx="2.5" stroke="#e05a5a" strokeWidth="2"/>
        </svg>
      );
    case "/contributions":
      // Custom SVG icon for Contributions
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M10 4v12" stroke="#e05a5a" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="10" cy="10" r="9" stroke="#e05a5a" strokeWidth="2"/>
        </svg>
      );
    case "/posts":
      // Custom SVG icon for Blog
      return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="5" width="14" height="10" rx="2" stroke="#e05a5a" strokeWidth="2"/>
          <line x1="6" y1="8" x2="14" y2="8" stroke="#e05a5a" strokeWidth="2"/>
          <line x1="6" y1="12" x2="12" y2="12" stroke="#e05a5a" strokeWidth="2"/>
        </svg>
      );
    default:
      return <span>•</span>;
  }
}

export default VerticalNav;
