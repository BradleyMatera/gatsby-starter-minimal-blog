// Gatsby theme shadow file for the brand title row.
import * as React from "react";
import { Link } from "gatsby";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import { BrandLogo, NavSystemBadge } from "../../../site/components";

const HeaderTitle = () => {
  const { basePath } = useMinimalBlogConfig();

  return (
    <div className="brand u-flex u-items-center">
      <Link
        className="brand__title u-inline-block u-align-middle"
        to={replaceSlashes(`/${basePath}`)}
        aria-label={`Matera Digital — back to home`}
      >
        <BrandLogo variant="full" alt="Matera Digital" className="brand__logo" />
      </Link>
      <NavSystemBadge />
    </div>
  );
};

export default HeaderTitle;
