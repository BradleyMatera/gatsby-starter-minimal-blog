import React from "react";
import "../styles/global.css";

export default function HeroLayout({ children }) {
  return (
    <div className="content-container">
      {children}
    </div>
  );
}
