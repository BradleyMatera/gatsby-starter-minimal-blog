import * as React from "react";
import cx from "../../utils/cx";

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

const Card = ({ as: Tag = "div", variant = "default", className, children }: CardProps) => {
  const variantClass = variantClassMap[variant] ?? variantClassMap.default;
  return <Tag className={cx(variantClass, className)}>{children}</Tag>;
};

export default Card;
