import * as React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import { BrandLogo } from "../../../site/components";
import {
  SELLER_IDENTITY_LINE,
  SELLER_DISCLOSURE_SHORT,
  SELLER_EMAIL,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LINKS,
} from "../../../site/legal/business-identity";

const Footer = () => {
  const { siteHeadline } = useSiteMetadata();
  const { navigation: nav, externalLinks, basePath } = useMinimalBlogConfig();
  const [currentYear] = React.useState(() => new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="footer-inner footer-inner--compact">
        <div className="footer__brand">
          <div>
            <Link to="/" className="footer__logo-link" aria-label="Matera Digital — Home">
              <BrandLogo variant="full" alt="Matera Digital" className="footer__logo" />
            </Link>
            {siteHeadline ? <p className="footer__description">{siteHeadline}</p> : null}
            <p className="footer__description">
              <a href={SELLER_PHONE_HREF} style={{ color: "inherit" }}>{SELLER_PHONE}</a>
              <span aria-hidden="true"> · </span>
              <a href={`mailto:${SELLER_EMAIL}`} style={{ color: "inherit" }}>{SELLER_EMAIL}</a>
            </p>
          </div>
          <div className="footer-cta footer-cta--compact">
            <Link to="/contact/">Get a free website plan</Link>
            <Link to={replaceSlashes(`/${basePath}/blog`)}>Blog</Link>
          </div>
        </div>

        <div className="footer-nav footer-nav--compact">
          <div>
            <p className="footer-nav__title">Explore</p>
            <ul>
              {nav?.map((item) => (
                <li key={item.slug}>
                  <Link to={replaceSlashes(`/${basePath}/${item.slug}`)}>{item.title}</Link>
                </li>
              ))}
              <li><Link to="/demos/">Website demos</Link></li>
              <li><Link to="/service-areas/">Service areas</Link></li>
            </ul>
          </div>
          {externalLinks && externalLinks.length > 0 ? (
            <div>
              <p className="footer-nav__title">Connect</p>
              <ul>
                {externalLinks.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="footer-bottom footer-bottom--compact">
        <span suppressHydrationWarning>&copy; {currentYear} Matera Digital — {SELLER_IDENTITY_LINE}</span>
        <span className="footer-legal-links">
          {POLICY_LINKS.map((link, i) => (
            <React.Fragment key={link.path}>
              {i > 0 && " · "}
              <Link to={link.path} style={{ color: "inherit", textDecoration: "underline" }}>{link.label}</Link>
            </React.Fragment>
          ))}
          {" · "}
          <Link to="/image-credits/" style={{ color: "inherit", textDecoration: "underline" }}>Image credits</Link>
        </span>
      </div>
      <div className="footer-disclosure" style={{ borderTop: "1px solid var(--color-border)", padding: "0.5rem 1rem", fontSize: "0.75rem", color: "var(--color-text-secondary)", textAlign: "center" }}>
        {SELLER_DISCLOSURE_SHORT}
      </div>
    </footer>
  );
};

export default Footer;
