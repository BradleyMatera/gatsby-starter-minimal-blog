import React from "react";

export default function TerminalSection({ children }) {
  // Simple, static terminal-styled wrapper to avoid animations/overlays that duplicate content
  return (
    <section className="terminal-root my-6 reveal">
      <div className="terminal-original">
        {children}
      </div>
    </section>
  );
}
