import * as React from "react";
import { Link } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import "../styles/store.css";

const CancelPage = () => (
  <Layout>
    <div className="store-shell">
      <header className="store-header">
        <h1 className="store-title">Checkout canceled</h1>
        <p className="store-subtitle">You returned from checkout. Check your customer portal or receipt for payment status before trying again.</p>
      </header>
      <div className="store-actions">
        <Link className="store-button" to="/store/">Back to store</Link>
        <Link className="store-link" to="/purchases/">Check purchases</Link>
        <Link className="store-link" to="/support/">Support & refunds</Link>
      </div>
    </div>
  </Layout>
);

export default CancelPage;

export const Head = () => (
  <Seo title="Checkout canceled" description="Checkout canceled page." pathname="/cancel/" robots="noindex,nofollow" />
);
