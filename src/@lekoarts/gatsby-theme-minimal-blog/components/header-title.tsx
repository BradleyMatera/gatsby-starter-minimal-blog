// Gatsby theme shadow file for the brand title row.
import * as React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import { NavSystemBadge } from "../../../site/components";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();

  return (
    <div className="brand u-flex u-items-center">
      <Link
        className="brand__title u-inline-block u-align-middle"
        to={replaceSlashes(`/${basePath}`)}
        aria-label={`${siteTitle} — back to home`}
      >
        {siteTitle}
      </Link>
      <NavSystemBadge />
    </div>
  );
};

export default HeaderTitle;
