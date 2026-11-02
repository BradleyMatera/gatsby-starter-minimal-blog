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
  isCategoryIllustration,
  getCatalogQuery,
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
  const previewRef = React.useRef<HTMLDialogElement>(null);
  const [attempt, setAttempt] = React.useState(0);
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
    setLoading(true);
    setAgreed(false);
    setError(null);
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
  }, [slug, getFunctionsUrl, attempt]);

  if (loading) {
    return (
      <div className="store-shell">
        <div className="store-status" role="status">Loading product…</div>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="store-shell">
        <div className="store-status store-error" role="alert">{error || "Product not found."}</div>
        <button type="button" className="store-button" onClick={() => setAttempt((value) => value + 1)}>Try again</button>
        <div className="u-mt-6">
          <Link className="store-link" to={`/store/${getCatalogQuery()}`}>Back to store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="store-shell store-detail">
      <nav className="store-breadcrumbs" aria-label="Store navigation"><Link to={`/store/${getCatalogQuery()}`}>← Back to your catalog</Link><Link to="/purchases/">Customer portal</Link></nav>
      <header className="store-header"><span className="store-pill">{getProductBadge(product)}</span><h1 className="store-title">{product.name}</h1><p className="store-subtitle">{product.description}</p></header>
      <div className="store-detail-layout">
        <figure className="store-detail__media"><img src={getProductImage(product)} alt={getProductAlt(product)} width="640" height="480" /><figcaption>{isCategoryIllustration(product) ? "Category illustration, not an exact product photograph." : "Product image"}</figcaption><button type="button" className="store-button store-button--ghost" onClick={() => previewRef.current?.showModal()}>Enlarge image</button></figure>
        <div className="store-detail__purchase">
          {product.badge && <span className="store-pill store-pill--accent">{product.badge}</span>}
          {renderAmazonMeta(product)}
          <div className="store-price store-price--spaced">{formatPrice(product)}</div>
          <dl className="store-product-facts"><div><dt>Purchase destination</dt><dd>{product.product_type === "affiliate" ? product.affiliate_source === "amazon" ? "Amazon" : "Third-party retailer" : "Stripe checkout"}</dd></div><div><dt>Product type</dt><dd>{product.product_type === "affiliate" ? "Retailer product" : "Digital download"}</dd></div>{product.product_type !== "affiliate" && <div><dt>License</dt><dd><Link to="/digital-product-license/">Read the applicable Digital Product License</Link></dd></div>}</dl>
          {product.product_type === "affiliate" && <p className="store-meta">Check the retailer for current price, availability, compatibility, and delivery details.</p>}
      {product.product_type !== "affiliate" && (
        <div className="store-checkout-agreement" style={{ margin: "1rem 0", padding: "0.75rem", border: "1px solid var(--color-border)", borderRadius: "4px" }}>
          <label htmlFor="store-terms-agreement" style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              id="store-terms-agreement"
              aria-describedby="store-checkout-help"
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
          <p id="store-checkout-help" className="store-meta">{product.product_type === "affiliate" ? "The next link takes you to the retailer for checkout." : agreed ? "Your agreement is selected. Continue to secure checkout." : "Select the agreement above to enable checkout."}</p>
          <div className="store-actions">{product.product_type !== "affiliate" && !agreed ? <button type="button" className="store-button" disabled aria-describedby="store-checkout-help">{getBuyLabel(product, "detail")}</button> : <a className="store-button" href={getGoUrl(product.slug)} rel={product.product_type === "affiliate" ? "sponsored" : undefined}>{getBuyLabel(product, "detail")}</a>}<Link className="store-link" to="/support/">Product support</Link></div>
        </div>
      </div>
      <aside className="store-purchase-disclosure" aria-label="Seller information"><p className="store-disclosure">{disclosureText}</p><p className="store-legal">{legalText}</p></aside>
      <dialog ref={previewRef} className="store-image-dialog" aria-label={`${product.name} image preview`}><button type="button" className="store-button store-button--ghost" onClick={() => previewRef.current?.close()}>Close preview</button><img src={getProductImage(product)} alt={getProductAlt(product)} /><p>{isCategoryIllustration(product) ? "Category illustration, not an exact product photograph." : product.name}</p></dialog>
    </div>
  );
};

export default StoreProductRoute;
