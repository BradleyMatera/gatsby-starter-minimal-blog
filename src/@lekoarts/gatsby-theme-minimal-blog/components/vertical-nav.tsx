// Gatsby theme shadow file for navigation chrome; shared site pieces live in src/site.
import * as React from "react";
import { Link } from "gatsby";
import { BrandLogo, StyleLabToggle, ThemeToggle } from "../../../site/components";
import {
  HomeIcon,
  BlogIcon,
  UserIcon,
  EmailIcon,
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  BoltIcon,
  GlobeIcon,
  MonitorIcon,
  StarIcon,
} from "../../../site/icons";

type NavItem = {
  title: string;
  slug: string;
};

type VerticalNavProps = {
  nav: NavItem[];
};

const VerticalNav = ({ nav }: VerticalNavProps) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("");
  const mobileMenuRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // Close drawer on resize to desktop
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Set active link based on current path
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, []);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileDrawerOpen]);

  // Close drawer on Escape and restore focus
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
      if (event.key === "Tab" && mobileDrawerOpen && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    if (mobileDrawerOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      const closeBtn = drawerRef.current?.querySelector("button");
      window.setTimeout(() => closeBtn?.focus(), 0);
      document.addEventListener("keydown", onKeyDown);
    } else {
      previousActiveElement.current?.focus?.();
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileDrawerOpen]);

  // Filter to core commercial links: Home, Services, Work, Pricing, Service Areas, About, Contact
  const coreLinks = nav.filter(item =>
    ["/", "/services", "/work", "/pricing", "/service-areas", "/about", "/contact"].includes(item.slug)
  );
  const desktopLinks = coreLinks.filter(item => item.slug !== "/");

  const openDrawer = () => setMobileDrawerOpen(true);
  const closeDrawer = () => setMobileDrawerOpen(false);

  return (
    <>
      <Link to="/" className="vertical-nav__mobile-brand vertical-nav__mobile-only" aria-label="Matera Digital — Home">
        <BrandLogo variant="mark" alt="" className="vertical-nav__mobile-brand-logo" />
        <span>Matera Digital</span>
      </Link>
      <button
        ref={mobileMenuRef}
        className="vertical-nav__toggle-icon cyber-toggle vertical-nav__mobile-only"
        aria-expanded={mobileDrawerOpen}
        aria-controls="mobile-navigation-drawer"
        onClick={() => {
          if (mobileDrawerOpen) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }}
      >
        {mobileDrawerOpen ? (
          <CloseIcon size={24} />
        ) : (
          <MenuIcon size={24} />
        )}
        <span className="vertical-nav__toggle-label sr-only">{mobileDrawerOpen ? "Close menu" : "Open menu"}</span>
      </button>
      {/* Desktop Nav */}
      <nav
        className="vertical-nav vertical-nav--top cyber-nav vertical-nav__desktop-only"
        role="navigation"
        aria-label="Main Navigation"
      >
          <div className="vertical-nav__inner cyber-nav__inner">
            <Link to="/" className="vertical-nav__brand cyber-brand" aria-label="Matera Digital — Home">
              <BrandLogo variant="mark" alt="" className="vertical-nav__brand-logo" />
              <span className="vertical-nav__brand-name">Matera Digital</span>
            </Link>
            <ul className="vertical-nav__list cyber-nav__list">
              {desktopLinks.map((item) => {
                const label = item.title;
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
              <li className="vertical-nav__item vertical-nav__item--style-lab">
                <StyleLabToggle />
              </li>
              <li className="vertical-nav__item vertical-nav__item--theme-toggle">
                <ThemeToggle />
              </li>
            </ul>
            <div className="vertical-nav__actions cyber-nav__actions">
              <a href="tel:+16083135373" className="vertical-nav__cta vertical-nav__cta--inline cyber-cta vertical-nav__phone">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <PhoneIcon size={18} />
                </span>
                <span>(608) 313-5373</span>
              </a>
              <a href="/contact" className="vertical-nav__cta vertical-nav__cta--inline vertical-nav__cta--primary cyber-cta">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Get a free plan</span>
              </a>
            </div>
          </div>
        </nav>

      {/* Mobile Drawer Nav */}
      {mobileDrawerOpen && (
        <nav
          ref={drawerRef}
          id="mobile-navigation-drawer"
          className="vertical-nav vertical-nav--drawer cyber-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Main Navigation"
        >
          <div className="vertical-nav__inner cyber-drawer__inner">
            <Link to="/" className="vertical-nav__brand cyber-brand" aria-label="Matera Digital — Home">
              <BrandLogo variant="full" alt="" className="vertical-nav__brand-logo vertical-nav__brand-logo--drawer" />
            </Link>
            <button
              className="vertical-nav__close-btn cyber-close-btn"
              onClick={() => closeDrawer()}
              aria-label="Close"
            >
              Close
            </button>
            <ThemeToggle />
            <StyleLabToggle />
            <ul className="vertical-nav__list cyber-drawer__list">
              {coreLinks.map((item) => {
                const label = item.title;
                const icon = getNavIcon(item.slug);
                const isActive = activeLink === item.slug || activeLink.startsWith(item.slug + '/');

                return (
                  <li key={item.slug}>
                    <Link
                      to={item.slug}
                      className={`vertical-nav__link cyber-drawer__link ${isActive ? 'cyber-drawer__link--active' : ''}`}
                      activeClassName="vertical-nav__link--active cyber-drawer__link--active"
                      title={label}
                      onClick={() => closeDrawer()}
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
              <Link to="/for-business/" className="vertical-nav__cta cyber-cta cyber-cta--drawer cyber-cta--business" onClick={() => closeDrawer()}>
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <BoltIcon size={18} />
                </span>
                <span>For Business</span>
              </Link>
              <a href="tel:+16083135373" className="vertical-nav__cta cyber-cta cyber-cta--drawer">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <PhoneIcon size={18} />
                </span>
                <span>(608) 313-5373</span>
              </a>
              <a href="/contact" className="vertical-nav__cta cyber-cta cyber-cta--drawer">
                <span className="vertical-nav__cta-icon" aria-hidden="true">
                  <EmailIcon size={18} />
                </span>
                <span>Get a free plan</span>
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
    case "/services":
      return <BoltIcon size={18} />;
    case "/work":
      return <MonitorIcon size={18} />;
    case "/pricing":
      return <StarIcon size={18} />;
    case "/service-areas":
      return <GlobeIcon size={18} />;
    case "/about":
      return <UserIcon size={18} />;
    case "/contact":
      return <EmailIcon size={18} />;
    case "/recruiter":
      return <UserIcon size={18} />;
    case "/for-business":
      return <BoltIcon size={18} />;
    case "/posts":
    case "/blog":
      return <BlogIcon size={18} />;
    default:
      return <span>•</span>;
  }
}

export default VerticalNav;
