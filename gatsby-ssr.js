import React from "react";
import { withPrefix } from "gatsby";

// Keep SSR style order aligned with gatsby-browser to avoid cascade mismatches.
import "./src/styles/global.css";
import "./src/styles/site-chrome.css";
import "./src/styles/utilities.css";
import "./src/styles/vertical-nav.css";
import "./src/styles/media.css";

export const onRenderBody = ({ setHeadComponents }) => {
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
};
