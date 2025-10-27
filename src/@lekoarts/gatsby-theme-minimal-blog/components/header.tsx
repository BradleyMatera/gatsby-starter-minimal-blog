import * as React from "react";
import { useLocation } from "@reach/router";
import Navigation from "./navigation";
import HeaderTitle from "./header-title";
import HeaderExternalLinks from "./header-external-links";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import ColorModeToggle from "./colormode-toggle";

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig();
  const roleLinks = React.useMemo(
    () => [
      { title: "Cloud Engineer", slug: "/roles/cloud-engineer" },
      { title: "DevOps Engineer", slug: "/roles/devops-engineer" },
      { title: "Backend Engineer", slug: "/roles/backend-engineer" },
      { title: "Full-Stack Engineer", slug: "/roles/full-stack-engineer" },
      { title: "AI/Automation Engineer", slug: "/roles/ai-automation-engineer" },
    ],
    []
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [isSmallViewport, setIsSmallViewport] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const updateViewport = (event?: MediaQueryListEvent) => {
      setIsSmallViewport(event ? event.matches : mediaQuery.matches);
    };

    updateViewport();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateViewport);
    } else {
      mediaQuery.addListener(updateViewport);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateViewport);
      } else {
        mediaQuery.removeListener(updateViewport);
      }
    };
  }, []);

  React.useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!isSmallViewport) {
      setIsMobileNavOpen(false);
    }
  }, [isSmallViewport]);

  const navIsVisible = isSmallViewport ? isMobileNavOpen : true;

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <div className="header-brand">
          <HeaderTitle />
          <button
            type="button"
            className="mobile-nav-toggle"
            aria-expanded={isSmallViewport ? isMobileNavOpen : true}
            aria-controls="primary-navigation"
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              {isMobileNavOpen ? (
                <path
                  fill="currentColor"
                  d="M18.3 5.71a1 1 0 00-1.41-1.41L12 9.17 7.11 4.3A1 1 0 105.7 5.7L10.58 10.6 5.7 15.5a1 1 0 001.41 1.41L12 12l4.89 4.89a1 1 0 001.41-1.41L13.41 10.6z"
                />
              ) : (
                <path
                  fill="currentColor"
                  d="M4 6.5A1.5 1.5 0 015.5 5h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 014 6.5zm0 5A1.5 1.5 0 015.5 10h13a1.5 1.5 0 010 3h-13A1.5 1.5 0 014 11.5zm1.5 5.5h13a1.5 1.5 0 010 3h-13a1.5 1.5 0 010-3z"
                />
              )}
            </svg>
            <span>{isMobileNavOpen ? "Close" : "Menu"}</span>
          </button>
        </div>

        <div className="header-nav" id="primary-navigation">
          <Navigation
            nav={nav}
            roleLinks={roleLinks}
            isVisible={navIsVisible}
            isCollapsible={isSmallViewport}
            onNavigate={() => setIsMobileNavOpen(false)}
          />
        </div>

        <div className="header-actions">
          <ColorModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
