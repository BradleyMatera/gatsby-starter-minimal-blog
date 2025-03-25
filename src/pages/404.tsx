// src/pages/404.tsx
import React from 'react';
import { ColorModeProvider } from '@theme-ui/color-modes';
import { PageProps } from 'gatsby';

const NotFoundPage = (props: PageProps) => (
  <div>
    <h1>404: Not Found</h1>
    <p>Sorry, that page doesn’t exist.</p>
  </div>
);

export default function WrappedNotFoundPage(props: PageProps) {
  return (
    <ColorModeProvider>
      <NotFoundPage {...props} />
    </ColorModeProvider>
  );
}