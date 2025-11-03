import * as React from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ padding: "2rem", maxWidth: 600, margin: "0 auto", fontFamily: "inherit" }}>
        <h1 style={{ color: "#e23b2d", fontWeight: 700, fontSize: "2rem", marginBottom: "1.2rem" }}>Contact Bradley Matera</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
          Email is the best way to reach me. Please send your project details and I'll reply within one business day.
        </p>
        <a href="mailto:bradmatera@gmail.com" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "1.1rem",
          padding: "0.5rem 1.2rem",
          borderRadius: "1rem",
          background: "#fff",
          color: "#333",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textDecoration: "none",
          fontWeight: 600
        }}>
          <span aria-hidden="true">✉</span>
          <span>bradmatera@gmail.com</span>
        </a>
        <p style={{ marginTop: "1rem", color: "#888" }}>
          Replies in one business day.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
