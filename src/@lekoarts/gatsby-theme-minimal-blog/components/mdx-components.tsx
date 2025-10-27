// src/@lekoarts/gatsby-theme-minimal-blog/components/mdx-components.tsx
import React from "react";
import { Text, Heading } from "@theme-ui/components";
import OriginalComponents from "@lekoarts/gatsby-theme-minimal-blog/src/components/mdx-components";
import Code from "./code";
import { Section, Card, Link } from "../../../components/ui";

const components = {
  Section,
  Card,
  pre: (props: { children?: React.ReactNode; className?: string }) => <Code {...props} />,
  Text,
  Title: Heading,
  a: Link,
};

export default components;
