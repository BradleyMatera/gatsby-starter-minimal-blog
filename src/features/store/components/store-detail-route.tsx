import * as React from "react";
import { Link } from "gatsby";
import { RouteComponentProps } from "@reach/router";
import {
  disclosureText,
  formatPrice,
  getBuyLabel,
  getProductAlt,
  getProductBadge,
  getProductImage,
  legalText,
  Product,
  renderAmazonMeta,
} from "./store-view";
import { SELLER_DISCLOSURE_SHORT } from "../../../site/legal/business-identity";

type StoreProductRouteProps = RouteComponentProps & {
  getFunctionsUrl: (path: string) => string;
  getGoUrl: (slug: string) => string;
  slug?: string;
};

const StoreProductRoute: React.FC<StoreProductRouteProps> = ({
  slug,
  getFunctionsUrl,
  getGoUrl,
}) => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [agreed, setAgreed] = React.useState(false);

  React.useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Product not found.");
      return;
    }

    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch(getFunctionsUrl(`get_product?slug=${encodeURIComponent(slug)}`));
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Product not found.");
        }
        if (isMounted) {
          setProduct(data.product);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Product not found.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [slug, getFunctionsUrl]);

  if (loading) {
    return (
      <div className="store-shell">
        <div className="store-status">Loading product…</div>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="store-shell">
        <div className="store-status store-error">{error || "Product not found."}</div>
        <div className="u-mt-6">
          <Link className="store-link" to="/store/">Back to store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="store-shell store-detail">
      <header className="store-header">
        <h1 className="store-title">{product.name}</h1>
        <p className="store-subtitle">{product.description}</p>
        <p className="store-disclosure">{disclosureText}</p>
        <p className="store-legal">{legalText}</p>
      </header>
      <div className="store-detail__media">
        <img src={getProductImage(product)} alt={getProductAlt(product)} />
      </div>
      <div className="store-pill store-meta--spaced">
        {getProductBadge(product)}
      </div>
      {product.badge && (
        <div className="store-pill store-pill--accent store-meta--spaced">
          {product.badge}
        </div>
      )}
      {product.product_type === "affiliate" && product.affiliate_source === "amazon" && (
        <p className="store-meta store-meta--spaced">
          Part of Brad&apos;s Amazon Picks.
        </p>
      )}
      {renderAmazonMeta(product)}
      <div className="store-price store-price--spaced">
        {formatPrice(product)}
      </div>
      {product.product_type !== "affiliate" && (
        <div className="store-checkout-agreement" style={{ margin: "1rem 0", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "4px" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              aria-required="true"
              style={{ marginTop: "0.2rem" }}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms/" target="_blank" rel="noopener noreferrer">Terms of Service</Link>,{" "}
              <Link to="/refund-policy/" target="_blank" rel="noopener noreferrer">Refund and Cancellation Policy</Link>, and applicable{" "}
              <Link to="/digital-product-license/" target="_blank" rel="noopener noreferrer">Digital Product License</Link>.
            </span>
          </label>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem", marginBottom: 0 }}>
            {SELLER_DISCLOSURE_SHORT}
          </p>
        </div>
      )}
      <div className="store-actions">
        {product.product_type !== "affiliate" && !agreed ? (
          <button className="store-button" disabled aria-disabled="true" title="Please accept the terms to continue">
            {getBuyLabel(product, "detail")}
          </button>
        ) : (
          <a className="store-button" href={getGoUrl(product.slug)}>
            {getBuyLabel(product, "detail")}
          </a>
        )}
        <Link className="store-link" to="/store/">Back to store</Link>
        <Link className="store-link" to="/purchases/">Customer portal</Link>
      </div>
      {error && <div className="store-status store-error store-status--spaced-lg">{error}</div>}
    </div>
  );
};

export default StoreProductRoute;
