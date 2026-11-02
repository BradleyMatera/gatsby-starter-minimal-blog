/** @jsx jsx */
// Gatsby theme shadow file: this wires the theme shell to app-owned modules in src/site and src/ui.
import { jsx } from "theme-ui";
import * as React from "react";
import { Global } from "@emotion/react";
import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import MdxComponents from "./mdx-components";
import Header from "./header";
import Footer from "./footer";
import ConsentBanner from "../../../features/consent/ConsentBanner";
import SkipNavLink from "./skip-nav";
import CodeStyles from "../styles/code";
import SiteShopPromotion, { ShopPromotionBanner } from "../../../site/components/SiteShopPromotion";


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
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <MDXProvider components={MdxComponents as MDXComponents}>
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
            backgroundColor: "var(--color-accent-soft)",
            color: "var(--color-text)",
          },
        }}
      />
      <div className="layout-shell matera-site">
        <SkipNavLink>Skip to content</SkipNavLink>
        
        {/* Header includes VerticalNav */}
        <Header />
        <ShopPromotionBanner />
        
        <main id="site-main" className={`site-main ${className}`}>
          <div className="site-content" sx={{ ...CodeStyles }}>
            {children}
            <SiteShopPromotion layoutClass={className} />
          </div>
        </main>
        
        <Footer />
        <ConsentBanner />
        
        {/* Cyberpunk Back to Top Button */}
        <button
          type="button"
          className="back-to-top cyber-back-to-top"
          data-visible={isBackToTopVisible}
          onClick={handleBackToTop}
        >
          <span aria-hidden="true" className="cyber-arrow">↑</span>
          <span className="sr-only">Back to top</span>
        </button>
      </div>
    </MDXProvider>
  );
};

export default Layout;
