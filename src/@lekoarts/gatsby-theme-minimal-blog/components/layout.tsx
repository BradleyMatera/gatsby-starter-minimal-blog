/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { Global } from "@emotion/react";
import { MDXProvider } from "@mdx-js/react";
import MdxComponents from "./mdx-components";
import Header from "./header";
import Footer from "./footer";
import SkipNavLink from "./skip-nav";
import CodeStyles from "../styles/code";
import GlobalScrollEffects from "../../../components/visuals/GlobalScrollEffects";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className = `` }: LayoutProps) => {
  const [isBackToTopVisible, setIsBackToTopVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsBackToTopVisible(window.scrollY > 480);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const redirect = window.sessionStorage.getItem("identity_redirect");
    const hash = window.location.hash || "";
    const hasIdentityToken =
      hash.includes("recovery_token") ||
      hash.includes("confirmation_token") ||
      hash.includes("invite_token") ||
      hash.includes("email_change_token");

    if (!redirect && !hasIdentityToken) return;

    let cancelled = false;

    const initIdentity = async () => {
      const module = await import("netlify-identity-widget");
      const widget = module.default;

      const hostname = window.location.hostname;
      const isLocal =
        hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
      const identityBase =
        (process.env.GATSBY_IDENTITY_URL || "").trim() || "https://bradleymatera.dev";

      if (isLocal) {
        widget.init({ APIUrl: `${identityBase}/.netlify/identity` });
      } else {
        widget.init();
      }

      const user = widget.currentUser();
      if (!cancelled && user && redirect) {
        window.sessionStorage.removeItem("identity_redirect");
        if (window.location.pathname !== redirect) {
          window.location.assign(redirect);
        }
      }
    };

    initIdentity();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MDXProvider components={MdxComponents}>
      <Global
        styles={{
          "*": { boxSizing: "border-box" },
          "[hidden]": { display: "none" },
          body: { 
            boxSizing: "border-box",
            backgroundColor: "var(--color-page-bg)",
            color: "var(--color-text)",
          },
          "::selection": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "var(--color-text)",
          },
        }}
      />
      <div className="layout-shell cyberpunk-layout">
        {/* Cyberpunk Background Effects */}
        <div className="cyber-grid-bg" aria-hidden="true" />
        <div className="scroll-color-layer" aria-hidden="true" />
        
        {/* Animated SVG Curves */}
        <svg
          className="global-curves"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="curveGrayPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E5E5E5" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#A3A3A3" stopOpacity="0.26" />
            </linearGradient>
            <linearGradient id="curveGraySecondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4D4D4" stopOpacity="0.48" />
              <stop offset="100%" stopColor="#8A8A8A" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <path
            className="global-curves__path"
            d="M-50,180 C220,80 420,260 690,180 C980,90 1170,260 1490,150"
            stroke="url(#curveGrayPrimary)"
          />
          <path
            className="global-curves__path global-curves__path--alt"
            d="M-80,520 C180,420 460,600 740,520 C980,450 1180,620 1500,520"
            stroke="url(#curveGraySecondary)"
          />
        </svg>
        
        <GlobalScrollEffects />
        <SkipNavLink>Skip to content</SkipNavLink>
        
        {/* Header includes VerticalNav */}
        <Header />
        
        <main id="site-main" className={`site-main ${className}`}>
          <div className="site-content" sx={{ ...CodeStyles }}>
            {children}
          </div>
        </main>
        
        <Footer />
        
        {/* Cyberpunk Back to Top Button */}
        <button
          type="button"
          className="back-to-top cyber-back-to-top"
          data-visible={isBackToTopVisible}
          onClick={handleBackToTop}
          aria-label="Back to top"
        >
          <span aria-hidden="true" className="cyber-arrow">↑</span>
          <span className="sr-only">Back to top</span>
        </button>
      </div>
    </MDXProvider>
  );
};

export default Layout;
