import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../ui";
import {
  SELLER_LEGAL_NAME,
  SELLER_DISCLOSURE_SHORT,
  SELLER_EMAIL,
  SELLER_PHONE,
  SELLER_PHONE_HREF,
  POLICY_LAST_UPDATED,
} from "../site/legal/business-identity";

const pathname = "/digital-product-license/";
const pageTitle = "Digital Product License | Bradley F. Matera";
const pageDescription =
  "License terms for downloadable digital products sold by Bradley F. Matera. Limited, nonexclusive, nontransferable license for personal and internal business use.";

const DigitalProductLicensePage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Digital Product License
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Legal"
      titleAs="h1"
      title={
        <>
          <strong>Digital Product</strong> License
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What license do I receive when I buy a digital product?</strong> You receive a limited, nonexclusive, nontransferable license for personal or internal business use as described per product. Resale, redistribution, sublicensing, and public reposting are prohibited unless the product explicitly allows them. Ownership is not transferred. Last updated {POLICY_LAST_UPDATED}.
          </p>
        </>
      }
      actions={
        <>
          <a href={`mailto:${SELLER_EMAIL}`} data-variant="ghost" className="link">
            {SELLER_EMAIL}
          </a>
          <Link data-variant="primary" to="/store/">
            Browse the store
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Limited license</h2>
          <p className="feature-card__body">
            Nonexclusive, nontransferable license for personal or internal business use.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No resale</h2>
          <p className="feature-card__body">
            Resale, redistribution, sublicensing, and public reposting are prohibited unless explicitly allowed.
          </p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">Ownership retained</h2>
          <p className="feature-card__body">
            Purchasing a copy does not transfer ownership of the underlying work.
          </p>
        </Card>
      </div>
    </Section>

    <Section eyebrow="License grant" title="License grant">
      <Card variant="outline">
        <p className="feature-card__body">
          {SELLER_DISCLOSURE_SHORT} When you purchase a downloadable digital product from this store, {SELLER_LEGAL_NAME} grants you a limited, nonexclusive, nontransferable license to use that product as described below and in any product-specific terms.
        </p>
        <p className="feature-card__body">
          This license applies to digital products sold through the store. It does <strong>not</strong> apply to custom client code transferred under a signed service agreement — that code is governed by the intellectual property terms in the <Link to="/terms/">Terms of Service</Link> and the signed project agreement.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Permitted use" title="Permitted use">
      <Card variant="outline">
        <ul>
          <li><strong>Personal use:</strong> You may use the product for your own personal projects.</li>
          <li><strong>Internal business use:</strong> You may use the product within your own business as described per product.</li>
          <li><strong>Modification for own use:</strong> You may modify the product for your own use, unless the product description prohibits modification.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Prohibited use" title="Prohibited use">
      <Card variant="outline">
        <p className="feature-card__body">
          The following are prohibited unless the product explicitly allows them in writing:
        </p>
        <ul>
          <li>Reselling or sub-licensing the product to third parties.</li>
          <li>Redistributing the product, in original or modified form, for free or for payment.</li>
          <li>Publicly reposting the product on websites, repositories, or file-sharing services.</li>
          <li>Using the product in a way that competes with the original offering.</li>
          <li>Removing or altering copyright notices, license headers, or attribution within the product.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Third-party components" title="Third-party components">
      <Card variant="outline">
        <p className="feature-card__body">
          Digital products may include third-party components (fonts, icons, libraries, images). These components retain their original licenses. Your license from {SELLER_LEGAL_NAME} covers only the original work created by Bradley. Third-party components must be used in accordance with their respective license terms.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Ownership" title="Ownership">
      <Card variant="outline">
        <p className="feature-card__body">
          Purchasing a copy of a digital product does not transfer ownership of the underlying work, intellectual property, or copyright. {SELLER_LEGAL_NAME} retains all ownership rights in the product. You receive a license to use the product as described in this policy and any product-specific terms.
        </p>
      </Card>
    </Section>

    <Section eyebrow="Defective products" title="Defective, duplicate, or inaccessible purchases">
      <Card variant="outline">
        <p className="feature-card__body">
          If a purchased product is defective, inaccessible, or you were charged twice:
        </p>
        <ul>
          <li>Contact {SELLER_EMAIL} with your order number and a description of the problem.</li>
          <li>The issue will be reviewed and a replacement, re-download link, or refund provided as appropriate.</li>
          <li>See the <Link to="/refund-policy/">Refund and Cancellation Policy</Link> for full details.</li>
        </ul>
      </Card>
    </Section>

    <Section eyebrow="Statutory rights" title="Statutory rights preserved">
      <Card variant="outline">
        <p className="feature-card__body">
          Nothing in this license limits any statutory rights you may have under applicable law that cannot legally be waived. If you are a consumer, you may have additional rights under state or federal consumer protection laws.
        </p>
      </Card>
    </Section>

    <Section
      eyebrow="Contact"
      title="Questions about this license?"
      description={
        <p>
          Contact Bradley directly with your order number or product question.
        </p>
      }
    >
      <div className="card-actions">
        <a href={`mailto:${SELLER_EMAIL}`} data-variant="primary" className="link">
          {SELLER_EMAIL}
        </a>
        <a href={SELLER_PHONE_HREF} data-variant="ghost" className="link">
          {SELLER_PHONE}
        </a>
        <Link data-variant="ghost" to="/terms/">Terms of Service</Link>
        <Link data-variant="ghost" to="/refund-policy/">Refund and Cancellation Policy</Link>
      </div>
      <p className="feature-card__body" style={{ marginTop: "1.5rem" }}>
        Effective date: {POLICY_LAST_UPDATED}. Last updated: {POLICY_LAST_UPDATED}.
      </p>
    </Section>
  </Layout>
);

export default DigitalProductLicensePage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Digital Product License", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pathname}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
