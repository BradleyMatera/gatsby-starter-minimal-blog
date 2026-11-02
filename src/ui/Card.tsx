import * as React from "react";
import joinClasses from "../utils/joinClasses";

type CardVariant = "default" | "muted" | "outline";

type CardProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const variantClassMap: Record<CardVariant, string> = {
  default: "surface-card",
  muted: "surface-card surface-card--muted",
  outline: "surface-card surface-card--outline",
};



const Card = ({ as: Tag = "div", variant = "default", className, children, style }: CardProps) => {
  const variantClass = variantClassMap[variant] ?? variantClassMap.default;
  return (
    <Tag className={joinClasses(variantClass, "u-relative", className)} style={style}>
      {children}
    </Tag>
  );
};

export default Card;
