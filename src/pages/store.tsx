import * as React from "react";
import { Link } from "gatsby";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import "../styles/store.css";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  product_type?: "affiliate" | "direct";
  affiliate_source?: string | null;
  affiliate_url?: string | null;
  display_price?: string | null;
};

const getFunctionsBase = () => {
  if (typeof window === "undefined") return "";
  const { hostname, port } = window.location;
  if (hostname === "localhost" && port === "8000") return "http://localhost:8888";
  return "";
};

const getFunctionsUrl = (path: string) => {
  const base = getFunctionsBase();
  return base ? `${base}/.netlify/functions/${path}` : `/.netlify/functions/${path}`;
};

const getGoUrl = (slug: string) => {
  const base = getFunctionsBase();
  return base ? `${base}/go/${slug}` : `/go/${slug}`;
};

const formatPrice = (product: Product) => {
  if (product.display_price) return product.display_price;
  const amount = product.price_cents / 100;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency.toUpperCase(),
    }).format(amount);
  } catch (error) {
    return `${amount.toFixed(2)} ${product.currency.toUpperCase()}`;
  }
};

const getBuyLabel = (product: Product) => {
  if (product.product_type === "affiliate") {
    if (product.affiliate_source === "amazon") return "View on Amazon";
    return "Buy now";
  }
  return "Buy";
};

const disclosureText = "As an Amazon Associate I earn from qualifying purchases.";

const getProductBadge = (product: Product) => {
  if (product.product_type === "affiliate") {
    return product.affiliate_source ? product.affiliate_source : "Affiliate";
  }
  return "Direct";
};

const useProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch(getFunctionsUrl("list_products"));
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || "Unable to load products.");
        }
        if (isMounted) {
          setProducts(data.products || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load products.");
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
  }, []);

  return { products, loading, error };
};

const StoreIndex: React.FC<RouteComponentProps> = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="store-shell">
      <header className="store-header store-hero">
        <div>
          <h1 className="store-title">Store</h1>
          <p className="store-subtitle">Digital downloads built for production-minded teams.</p>
          <p className="store-disclosure">{disclosureText}</p>
          <div className="store-cta">
            <a className="store-button" href="#products">Browse products</a>
            <Link className="store-link" to="/purchases/">View purchases</Link>
            <Link className="store-link" to="/support/">Support</Link>
          </div>
        </div>
      </header>

      {loading && <div className="store-status">Loading products…</div>}

      {error && (
        <div className="store-status store-error">
          {error} If this keeps happening, reach out via the <Link className="store-link" to="/support/">support page</Link>.
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="store-status">No products are available right now. Check back soon.</div>
      )}

      <div id="products" className="store-grid" style={{ marginTop: "2rem" }}>
        {products.map((product) => (
          <div key={product.id} className="store-card">
            <div>
              <h3>{product.name}</h3>
              <div className="store-pill" style={{ marginTop: "0.35rem" }}>
                {getProductBadge(product)}
              </div>
              <p className="store-meta">{product.description}</p>
            </div>
            <div className="store-price">{formatPrice(product)}</div>
            <div className="store-actions">
              <a className="store-button" href={getGoUrl(product.slug)}>
                {getBuyLabel(product)}
              </a>
              <Link className="store-link" to={`/store/${product.slug}`}>Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface StoreProductProps extends RouteComponentProps {
  slug?: string;
}

const StoreProduct: React.FC<StoreProductProps> = ({ slug }) => {
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
  }, [slug]);

  if (loading) {
    return <div className="store-shell"><div className="store-status">Loading product…</div></div>;
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
      </header>
      <div className="store-pill" style={{ marginBottom: "0.75rem" }}>
        {getProductBadge(product)}
      </div>
      <div className="store-price" style={{ marginBottom: "1rem" }}>
        {formatPrice(product)}
      </div>
      <div className="store-actions">
        <a className="store-button" href={getGoUrl(product.slug)}>
          {getBuyLabel(product)}
        </a>
        <Link className="store-link" to="/store/">Back to store</Link>
        <Link className="store-link" to="/purchases/">View purchases</Link>
      </div>
      {error && <div className="store-status store-error" style={{ marginTop: "1.5rem" }}>{error}</div>}
    </div>
  );
};

const StorePage = () => {
  return (
    <Layout>
      <Router basepath="/store">
        <StoreIndex path="/" />
        <StoreProduct path="/:slug" />
      </Router>
    </Layout>
  );
};

export default StorePage;
