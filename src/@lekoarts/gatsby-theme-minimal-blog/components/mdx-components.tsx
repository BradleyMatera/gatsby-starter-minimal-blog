// src/@lekoarts/gatsby-theme-minimal-blog/components/mdx-components.tsx
import React from 'react';
import { Text, Heading } from '@theme-ui/components';
import OriginalComponents from '@lekoarts/gatsby-theme-minimal-blog/src/components/mdx-components';
import Code from './code';

const components = {
  ...OriginalComponents, // Preserve theme’s default components
  pre: (props: { children?: React.ReactNode; className?: string }) => <Code {...props} />,
  Text,
  Title: Heading,
  p: (props: { children?: React.ReactNode; className?: string }) => <p {...props} />,
};

export default components;
