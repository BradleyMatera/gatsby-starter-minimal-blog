import * as React from "react";
import { Link as GatsbyLink } from "gatsby";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({ href, children, target, rel, className, ...rest }: LinkProps) => {
  const isInternal = /^\/(?!\/)/.test(href);
  if (isInternal) {
    return (
      <GatsbyLink to={href} className={className} {...rest}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a
      href={href}
      target={target || "_blank"}
      rel={rel || "noopener noreferrer"}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
