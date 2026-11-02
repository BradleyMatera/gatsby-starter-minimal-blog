// src/pages/404.tsx
import React from 'react';
import { Link, type HeadFC } from 'gatsby';
import Layout from '../@lekoarts/gatsby-theme-minimal-blog/components/layout';
import Seo from '../@lekoarts/gatsby-theme-minimal-blog/components/seo';
import '../styles/editorial.css';

const NotFoundPage = () => (
  <Layout className="editorial-page editorial-not-found">
    <div className="editorial-not-found__content">
      <h1>404: Not Found</h1>
      <p>Sorry, that page doesn't exist.</p>
      <div className="card-actions">
        <Link to="/" data-variant="primary">Home</Link>
        <Link to="/projects/" data-variant="ghost">Projects</Link>
        <Link to="/contact/" data-variant="ghost">Contact</Link>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => (
  <Seo title="404: Not Found" description="This page could not be found." />
);
