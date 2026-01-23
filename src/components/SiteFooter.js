import React from "react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p>&copy; {new Date().getFullYear()} Bradley Matera. All rights reserved.</p>
        <p>
          <a href="https://github.com/BradleyMatera" target="_blank" rel="noopener noreferrer">GitHub</a>
          {" | "}
          <a href="mailto:bradmatera@gmail.com">Email</a>
        </p>
      </div>
    </footer>
  );
}
