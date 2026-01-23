// src/@lekoarts/gatsby-theme-minimal-blog/components/mdx-components.tsx
import React from "react";
import { Text, Heading } from "@theme-ui/components";
import Code from "./code";
import { Section, Card, Link, Badge } from "../../../components/ui";
import joinClasses from "../../../utils/joinClasses";

// Map MDX headings to Theme UI Heading component
const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h1" {...props} />
);
const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h2" {...props} />
);
const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h3" {...props} />
);
const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h4" {...props} />
);
const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h5" {...props} />
);
const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <Heading as="h6" {...props} />
);

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
  <p className={joinClasses("mdx-paragraph", className)} {...props} />
);

const components = {
  Section,
  Card,
  pre: (props: { children?: React.ReactNode; className?: string }) => <Code {...props} />,
  Text,
  Title: Heading,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  p: Paragraph,
  Callout,
  Aside,
  Tip,
  Badge,
};

export { Callout, Aside, Tip, Section, Badge };
export default components;
