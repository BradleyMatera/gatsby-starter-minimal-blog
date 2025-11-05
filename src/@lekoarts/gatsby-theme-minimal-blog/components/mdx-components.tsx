// src/@lekoarts/gatsby-theme-minimal-blog/components/mdx-components.tsx
import React from "react";
import { Text, Heading } from "@theme-ui/components";
import Code from "./code";
import { Section, Card, Link, Badge } from "../../../components/ui";
import cx from "../../../utils/cx";

interface CalloutProps {
  children: React.ReactNode;
  type?: string;
}

const Callout: React.FC<CalloutProps> = ({ children, type = "info" }) => (
  <div className={`callout callout--${type}`}>
    {children}
  </div>
);

interface AsideProps {
  children: React.ReactNode;
}

const Aside: React.FC<AsideProps> = ({ children }) => (
  <aside className="aside">
    {children}
  </aside>
);

interface TipProps {
  children: React.ReactNode;
}

const Tip: React.FC<TipProps> = ({ children }) => (
  <div className="tip">
    <strong>Tip:</strong> {children}
  </div>
);

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

const Paragraph: React.FC<ParagraphProps> = ({ className, ...props }) => (
  <p className={cx("mdx-paragraph", className)} {...props} />
);

const components = {
  Section,
  Card,
  pre: (props: { children?: React.ReactNode; className?: string }) => <Code {...props} />,
  Text,
  Title: Heading,
  a: Link,
  p: Paragraph,
  Callout,
  Aside,
  Tip,
  Badge,
};

export { Callout, Aside, Tip, Section, Badge };
export default components;
