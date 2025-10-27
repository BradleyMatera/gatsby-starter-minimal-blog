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
