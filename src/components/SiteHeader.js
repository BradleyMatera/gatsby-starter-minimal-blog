import React from "react";
import { Link } from "gatsby";

export default function SiteHeader() {
  return (
    <header className="site-header" style={{background: "#fff", borderBottom: "1px solid #eee", marginBottom: "2rem"}}>
      <div className="header-inner" style={{display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", padding: "1rem 2rem"}}>
        <Link to="/" className="header-brand" style={{fontWeight: 700, fontSize: "1.3rem", color: "#e23b2d"}}>BM</Link>
        <nav className="header-nav">
          <ul className="primary-nav" style={{display: "flex", gap: "1.5rem", listStyle: "none", margin: 0, padding: 0}}>
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
