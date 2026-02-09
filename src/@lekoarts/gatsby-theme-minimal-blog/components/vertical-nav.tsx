import * as React from "react";
import { Link } from "gatsby";
import ThemeToggle from "../../../components/ThemeToggle";
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
  const [activeLink, setActiveLink] = React.useState("");

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile) setMobileDrawerOpen(false);
  }, [isMobile]);

  // Set active link based on current path
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, []);

  // Filter to core links only: Home, Projects, About, Contact, Roles, Contributions, Blog
  const coreLinks = nav.filter(item =>
    ["/", "/projects", "/about", "/roles", "/contributions", "/posts"].includes(item.slug)
  );

  return (
    <>
      {isMobile && (
        <button
          className="vertical-nav__toggle-icon cyber-toggle"
          aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
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
          className="vertical-nav vertical-nav--top cyber-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="vertical-nav__inner cyber-nav__inner">
            <Link to="/" className="vertical-nav__brand cyber-brand" aria-label="Home">
              <span className="vertical-nav__brand-text cyber-brand__text">BM</span>
            </Link>
            <ul className="vertical-nav__list cyber-nav__list">
              {coreLinks.map((item) => {
                const label = item.slug === "/" ? "Home" : item.title;
                const icon = getNavIcon(item.slug);
                const isActive = activeLink === item.slug || activeLink.startsWith(item.slug + '/');

                return (
                  <li key={item.slug}>
                    <Link
                      to={item.slug}
                      className={`vertical-nav__link cyber-nav__link ${isActive ? 'cyber-nav__link--active' : ''}`}
                      activeClassName="vertical-nav__link--active cyber-nav__link--active"
                      title={label}
                    >
                      <span className="vertical-nav__icon cyber-nav__icon" aria-hidden="true">
                        {icon}
                      </span>
                      <span className="vertical-nav__label cyber-nav__label">{label}</span>
                      {isActive && <span className="cyber-nav__glow" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="vertical-nav__actions cyber-nav__actions">
              <ThemeToggle />
              <a href="/contact" className="vertical-nav__cta vertical-nav__cta--inline cyber-cta">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Contact</span>
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Drawer Nav */}
      {isMobile && mobileDrawerOpen && (
        <nav
          className="vertical-nav vertical-nav--drawer cyber-drawer"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="vertical-nav__inner cyber-drawer__inner">
            <Link to="/" className="vertical-nav__brand cyber-brand" aria-label="Home">
              <span className="vertical-nav__brand-text cyber-brand__text">BM</span>
            </Link>
            <button
              className="vertical-nav__close-btn cyber-close-btn"
              onClick={() => setMobileDrawerOpen(false)}
              aria-label="Close Menu"
            >
              Close
            </button>
            <ThemeToggle />
            <ul className="vertical-nav__list cyber-drawer__list">
              {coreLinks.map((item) => {
                const label = item.slug === "/" ? "Home" : item.title;
                const icon = getNavIcon(item.slug);
                const isActive = activeLink === item.slug || activeLink.startsWith(item.slug + '/');

                return (
                  <li key={item.slug}>
                    <Link
                      to={item.slug}
                      className={`vertical-nav__link cyber-drawer__link ${isActive ? 'cyber-drawer__link--active' : ''}`}
                      activeClassName="vertical-nav__link--active cyber-drawer__link--active"
                      title={label}
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      <span className="vertical-nav__icon cyber-drawer__icon" aria-hidden="true">
                        {icon}
                      </span>
                      <span className="vertical-nav__label cyber-drawer__label">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="vertical-nav__actions vertical-nav__actions--stacked cyber-drawer__actions">
              <a href="/contact" className="vertical-nav__cta cyber-cta cyber-cta--drawer">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Contact</span>
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
