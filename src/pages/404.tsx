// src/pages/404.tsx
import React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '../@lekoarts/gatsby-theme-minimal-blog/components/layout';
import Seo from '../@lekoarts/gatsby-theme-minimal-blog/components/seo';
import { ThreeScene } from '../site/components';

const NotFoundPage = () => (
  <Layout>
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404: Not Found</h1>
      <p>Sorry, that page doesn't exist.</p>
      <ThreeScene />
    </div>
  </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => (
  <Seo title="404: Not Found" description="This page could not be found." />
);
