import * as React from "react";

type SkipNavLinkProps = {
  children: React.ReactNode;
};

const SkipNavLink = ({ children }: SkipNavLinkProps) => (
  <a className="skip-to-content" href="#site-main">
    {children}
  </a>
);

export default SkipNavLink;
