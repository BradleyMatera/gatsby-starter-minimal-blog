import * as React from "react";
import VerticalNav from "./vertical-nav";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";

const Header = () => {
  const { navigation: nav } = useMinimalBlogConfig();

  return <VerticalNav nav={nav} />;
};

export default Header;
