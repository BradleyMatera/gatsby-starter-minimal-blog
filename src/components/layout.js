import React from 'react';
import { ColorModeProvider } from '@theme-ui/color-modes';
import { MDXProvider } from '@mdx-js/react';
import { Text, Heading } from '@theme-ui/components';
import { Layout as ThemeLayout } from '@lekoarts/gatsby-theme-minimal-blog';

const components = {
  Text,
  Title: Heading,
};

const Layout = ({ children }) => (
  <ColorModeProvider>
    <MDXProvider components={components}>
      <ThemeLayout>{children}</ThemeLayout>
    </MDXProvider>
  </ColorModeProvider>
);

export default Layout;