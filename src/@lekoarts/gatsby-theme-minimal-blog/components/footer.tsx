import * as React from "react";
import { Link } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";

const Footer = () => {
  const { siteTitle, siteDescription, siteHeadline } = useSiteMetadata();
  const { navigation: nav, externalLinks, basePath } = useMinimalBlogConfig();
  const currentYear = new Date().getFullYear();
  const description = siteHeadline || siteDescription;
  const quickStats = [
    "AWS Cloud Support Engineer Intern — Amazon",
    "Core Skills: Full-Stack JavaScript, AWS, CI/CD, API security",
    "Certifications: AWS Solutions Architect – Associate, AWS AI Practitioner",
    "Based in the Midwest — open to Seattle on-site or remote",
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer__brand">
          <p className="footer__title">{siteTitle}</p>
          {description ? <p className="footer__description">{description}</p> : null}
          <div className="hero-actions">
            <Link data-variant="primary" to={replaceSlashes(`/${basePath}/projects`)}>
              View project portfolio
            </Link>
            <Link data-variant="ghost" to={replaceSlashes(`/${basePath}/blog`)}>
              Read latest blog posts
            </Link>
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
                <Link to="/store/">Store</Link>
              </li>
              <li>
                <Link to="/purchases/">Customer portal</Link>
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
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} {siteTitle}. All rights reserved.</span>
        <span>Designing and delivering resilient cloud-backed products.</span>
        <span>As an Amazon Associate I earn from qualifying purchases.</span>
      </div>
    </footer>
  );
};

export default Footer;
