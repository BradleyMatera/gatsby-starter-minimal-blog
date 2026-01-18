import * as React from "react";
import joinClasses from "../../utils/joinClasses";

type CardVariant = "default" | "muted" | "outline";

type CardProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
};

const variantClassMap: Record<CardVariant, string> = {
  default: "surface-card",
  muted: "surface-card surface-card--muted",
  outline: "surface-card surface-card--outline",
};

import TinyDotClusterAccent from "../TinyDotClusterAccent";

const Card = ({ as: Tag = "div", variant = "default", className, children }: CardProps) => {
  const variantClass = variantClassMap[variant] ?? variantClassMap.default;
  return (
    <Tag className={joinClasses(variantClass, className)} style={{ position: "relative" }}>
      <TinyDotClusterAccent />
      {children}
    </Tag>
  );
};

export default Card;
