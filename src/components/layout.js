import React from "react";
import "../global-style.css";

export default function Layout({ children }) {
  return (
    <div className="content-container">
      {children}
    </div>
  );
}
