import React from "react";
import { withPrefix } from "gatsby";
import { StyleLabProvider } from "../../src/site/components";

// Keep SSR style order aligned with gatsby-browser to avoid cascade mismatches.
import "../../src/styles/global.css";
import "../../src/styles/site-chrome.css";
import "../../src/styles/utilities.css";
import "../../src/styles/vertical-nav.css";
import "../../src/styles/media.css";
import "../../src/site/styles/style-lab.css";
import "../../src/styles/themes/neumorphism.css";
import "../../src/styles/themes/retrofuturism.css";
import "../../src/styles/themes/brutalism.css";
import "../../src/styles/demos.css";

export const wrapRootElement = ({ element }) => {
  return <StyleLabProvider>{element}</StyleLabProvider>;
};

const THEME_INIT_SCRIPT = `
  (function() {
    try {
      const raw = window.localStorage.getItem("bm-style-lab");
      const parsed = raw ? JSON.parse(raw) : {};
      const mode = parsed.mode || "light";
      const resolved =
        mode === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : mode;
      document.documentElement.setAttribute("data-theme", resolved);
      document.documentElement.style.colorScheme = resolved;
    } catch (_) {}
  })();
`;

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en", "data-theme": "light" });
  setHeadComponents([
    <link
      key="favicon-32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={withPrefix(`/favicon-32x32-32x32.png`)}
    />,
    <link
      key="favicon-16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={withPrefix(`/favicon-16x16-16x16.png`)}
    />,
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href={withPrefix(`/apple-touch-icon-180x180.png`)}
    />,
  ]);
  setPreBodyComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />,
  ]);
};
