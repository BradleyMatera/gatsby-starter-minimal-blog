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
        <div style={{ marginTop: "1.5rem" }}>
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
      <div className="store-pill" style={{ marginBottom: "0.75rem" }}>
        {getProductBadge(product)}
      </div>
      {product.badge && (
        <div className="store-pill store-pill--accent" style={{ marginBottom: "0.75rem" }}>
          {product.badge}
        </div>
      )}
      {product.product_type === "affiliate" && product.affiliate_source === "amazon" && (
        <p className="store-meta" style={{ marginBottom: "0.75rem" }}>
          Part of Brad&apos;s Amazon Picks.
        </p>
      )}
      {renderAmazonMeta(product)}
      <div className="store-price" style={{ marginBottom: "1rem" }}>
        {formatPrice(product)}
      </div>
      <div className="store-actions">
        <a className="store-button" href={getGoUrl(product.slug)}>
          {getBuyLabel(product, "detail")}
        </a>
        <Link className="store-link" to="/store/">Back to store</Link>
        <Link className="store-link" to="/purchases/">Customer portal</Link>
      </div>
      {error && <div className="store-status store-error" style={{ marginTop: "1.5rem" }}>{error}</div>}
    </div>
  );
};

export default StoreProductRoute;
