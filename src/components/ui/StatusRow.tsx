import * as React from "react";
import { useRef, useState, useEffect } from "react";

type StatusRowProps = {
  icon: React.ReactNode;
  label: string;
  text: string;
};

const StatusRow = ({ icon, label, text }: StatusRowProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className={`status-row${active ? " status-row--active" : ""}`}
      tabIndex={0}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "box-shadow 0.3s, background 0.3s",
        boxShadow: active ? "0 2px 12px rgba(0,32,64,0.08)" : "none",
        background: active ? "var(--color-bg-soft, #f7f8fa)" : "none",
        borderRadius: "1rem",
        outline: "none",
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {icon}
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: active ? "var(--color-accent, #e05a5a)" : "#dbe2ea",
            marginLeft: 4,
            boxShadow: active ? "0 0 8px 2px rgba(224,90,90,0.15)" : "none",
            opacity: active ? 1 : 0.5,
            animation: active
              ? "statusPulse 1.2s infinite cubic-bezier(.22,.9,.2,1)"
              : "none",
          }}
        />
      </span>
      <span
        style={{
          fontWeight: 600,
          color: active ? "var(--color-accent, #1a3a6c)" : "#444",
          transition: "color 0.3s",
        }}
      >
        {label}
      </span>
      <span
        style={{
          marginLeft: 8,
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s, transform 0.4s",
        }}
      >
        {text}
      </span>
      <style>
        {`
          @keyframes statusPulse {
            0% { opacity: 1; transform: scale(1);}
            50% { opacity: 0.6; transform: scale(1.2);}
            100% { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </li>
  );
};

export default StatusRow;
