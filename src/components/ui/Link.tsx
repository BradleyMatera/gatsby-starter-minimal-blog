import * as React from "react";
import { Link as GatsbyLink } from "gatsby";

type LinkProps = {
  href?: string;
  to?: string;
  children: React.ReactNode;
  activeClassName?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link = ({ href, to, children, target, rel, className, ...rest }: LinkProps) => {
  const finalHref = href ?? to ?? "#";
  const isHash = finalHref.startsWith("#");
  const isInternal = isHash || /^\/(?!\/)/.test(finalHref);

  if (isInternal) {
    if (isHash) {
      return (
        <a href={finalHref} className={className} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <GatsbyLink to={finalHref} className={className} {...rest}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a
      href={finalHref}
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
