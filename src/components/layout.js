import React from "react";
import "../components/global-style.css";

export default function Layout({ children }) {
  return (
    <div className="content-container">
      {children}
    </div>
  );
}
