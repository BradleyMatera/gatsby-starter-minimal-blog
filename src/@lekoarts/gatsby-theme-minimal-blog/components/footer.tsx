import * as React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import {
  SELLER_IDENTITY_LINE,
  SELLER_DISCLOSURE_SHORT,
  SELLER_EMAIL,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LINKS,
} from "../../../site/legal/business-identity";

const Footer = () => {
  const { siteTitle, siteDescription, siteHeadline } = useSiteMetadata();
  const { navigation: nav, externalLinks, basePath } = useMinimalBlogConfig();
  const [currentYear] = React.useState(() => new Date().getFullYear());
  const description = siteHeadline || siteDescription;
  const quickStats = [
    "AWS Cloud Support Engineer Intern — Amazon",
    "Based in the Midwest — open to Seattle on-site or remote",
    "Serving Durand, Davis, Rockford, Freeport, and Northwest Illinois",
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer__brand">
          <p className="footer__title">{siteTitle}</p>
          {description ? <p className="footer__description">{description}</p> : null}
          <div className="footer-cta">
            <Link to="/recruiter/#project-explorer">View Bradley's project portfolio</Link>
            <Link to={replaceSlashes(`/${basePath}/blog`)}>Read Bradley's latest blog posts</Link>
          </div>
        </div>

        <div className="footer-nav">
          <div>
            <p className="footer-nav__title">Explore</p>
            <ul>
              {nav?.map((item) => (
                <li key={item.slug}>
                  <Link to={replaceSlashes(`/${basePath}/${item.slug}`)}>{item.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/pricing/">Pricing</Link>
              </li>
              <li>
                <Link to="/store/">Store</Link>
              </li>
              <li>
                <Link to="/purchases/">Customer portal</Link>
              </li>
              <li>
                <Link to="/demos/">Website demos</Link>
              </li>
              <li>
                <Link to="/web-developer-durand-davis-illinois/">Northwest Illinois web development</Link>
              </li>
              <li>
                <Link to="/web-developer-rockford-illinois/">Rockford web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-freeport-illinois/">Freeport web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-loves-park-illinois/">Loves Park web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-machesney-park-illinois/">Machesney Park web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-byron-illinois/">Byron web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-roscoe-illinois/">Roscoe web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-rockton-illinois/">Rockton web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-south-beloit-illinois/">South Beloit web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-beloit-wisconsin/">Beloit WI web developer</Link>
              </li>
              <li>
                <Link to="/web-developer-janesville-wisconsin/">Janesville WI web developer</Link>
              </li>
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

        <div className="footer-stats">
          <p className="footer-nav__title">Quick stats</p>
          <ul>
            {quickStats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="footer-nav__title" style={{ marginTop: "1rem" }}>Contact</p>
          <ul>
            <li>
              <a href={SELLER_PHONE_HREF} style={{ color: "inherit", textDecoration: "underline" }}>
                {SELLER_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${SELLER_EMAIL}`} aria-label={`Email Bradley Matera at ${SELLER_EMAIL}`} style={{ color: "inherit", textDecoration: "underline" }}>
                {SELLER_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span suppressHydrationWarning>&copy; {currentYear} {siteTitle} — {SELLER_IDENTITY_LINE}</span>
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
        <span>
          <Link to="/recruiter/" style={{ color: "inherit", textDecoration: "underline" }}>
            Hiring? View the recruiter hub →
          </Link>
        </span>
      </div>
      <div className="footer-disclosure" style={{ borderTop: "1px solid var(--color-border)", padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--color-text-secondary)", textAlign: "center" }}>
        {SELLER_DISCLOSURE_SHORT}
      </div>
    </footer>
  );
};

export default Footer;
