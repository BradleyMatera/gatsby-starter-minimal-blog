import * as React from "react";
import { Link } from "gatsby";
import ThemeToggle from "../../../components/ThemeToggle";
import "../../../styles/vertical-nav.css";
import {
  HomeIcon,
  ProjectsIcon,
  AboutIcon,
  RolesIcon,
  ContributionsIcon,
  BlogIcon,
  EmailIcon,
  MenuIcon,
  CloseIcon,
} from "../../../components/visuals/icons";

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
            <CloseIcon size={24} />
          ) : (
            <MenuIcon size={24} />
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
            <div className="vertical-nav__actions">
              <ThemeToggle />
              <a href="/contact" className="vertical-nav__cta vertical-nav__cta--inline">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Email me!</span>
              </a>
            </div>
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
            <ThemeToggle />
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
            <div className="vertical-nav__actions vertical-nav__actions--stacked">
              <a href="/contact" className="vertical-nav__cta">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Email me!</span>
              </a>
            </div>
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
      return <HomeIcon size={18} />;
    case "/projects":
      return <ProjectsIcon size={18} />;
    case "/about":
      return <AboutIcon size={18} />;
    case "/contact":
      return <EmailIcon size={18} />;
    case "/roles":
      return <RolesIcon size={18} />;
    case "/contributions":
      return <ContributionsIcon size={18} />;
    case "/posts":
      return <BlogIcon size={18} />;
    default:
      return <span>•</span>;
  }
}

export default VerticalNav;
