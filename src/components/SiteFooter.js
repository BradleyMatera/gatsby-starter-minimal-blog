import React from "react";

export default function SiteFooter() {
  return (
    <footer className="site-footer" style={{background: "#fff", borderTop: "1px solid #eee", marginTop: "2rem", padding: "1.5rem 0", textAlign: "center", color: "#888"}}>
      <div style={{maxWidth: 1200, margin: "0 auto"}}>
        <p>&copy; {new Date().getFullYear()} Bradley Matera. All rights reserved.</p>
        <p>
          <a href="https://github.com/BradleyMatera" target="_blank" rel="noopener noreferrer" style={{color: "#e23b2d"}}>GitHub</a>
          {" | "}
          <a href="mailto:bradmatera@gmail.com" style={{color: "#e23b2d"}}>Email</a>
        </p>
      </div>
    </footer>
  );
}
