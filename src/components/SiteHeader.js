import React from "react";
import { Link } from "gatsby";

export default function SiteHeader() {
  return (
    <header className="site-header site-header--legacy">
      <div className="header-inner">
        <Link to="/" className="header-brand">BM</Link>
        <nav className="header-nav">
          <ul className="primary-nav u-list-none">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="https://github.com/BradleyMatera" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
