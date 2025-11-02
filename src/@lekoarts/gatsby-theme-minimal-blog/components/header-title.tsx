import * as React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import NavSystemBadge from "../../../components/NavSystemBadge";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();

  return (
    <div className="brand" style={{ display: "flex", alignItems: "center" }}>
      <Link
        className="brand__title"
        to={replaceSlashes(`/${basePath}`)}
        aria-label={`${siteTitle} — back to home`}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        {siteTitle}
      </Link>
      <NavSystemBadge />
    </div>
  );
};

export default HeaderTitle;
