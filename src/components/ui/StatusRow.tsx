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
      data-active={active ? "true" : "false"}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span className="status-row__icon-wrap">
          {icon}
          <span className="status-row__dot" />
      </span>
      <span className="status-row__label">{label}</span>
      <span className="status-row__text">{text}</span>
    </li>
  );
};

export default StatusRow;
