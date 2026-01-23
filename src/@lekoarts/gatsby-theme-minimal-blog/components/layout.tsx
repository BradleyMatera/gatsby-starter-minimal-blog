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

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MDXProvider components={MdxComponents}>
      <Global
        styles={{
          "*": { boxSizing: "border-box" },
          "[hidden]": { display: "none" },
          body: { boxSizing: "border-box" },
        }}
      />
      <div className="layout-shell">
        <div className="scroll-color-layer" aria-hidden="true" />
        <svg
          className="global-curves"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="global-curves__path"
            d="M-50,180 C220,80 420,260 690,180 C980,90 1170,260 1490,150"
          />
          <path
            className="global-curves__path global-curves__path--alt"
            d="M-80,520 C180,420 460,600 740,520 C980,450 1180,620 1500,520"
          />
        </svg>
        <GlobalScrollEffects />
        <SkipNavLink>Skip to content</SkipNavLink>
        <Header />
        <main id="site-main" className={`site-main ${className}`}>
          <div className="site-content" sx={{ ...CodeStyles }}>
            {children}
          </div>
        </main>
        <Footer />
        <button
          type="button"
          className="back-to-top"
          data-visible={isBackToTopVisible}
          onClick={handleBackToTop}
        >
          <span aria-hidden="true">↑</span>
          <span className="sr-only">Back to top</span>
        </button>
      </div>
    </MDXProvider>
  );
};

export default Layout;
