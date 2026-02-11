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
  image_url?: string | null;
  image_alt?: string | null;
  badge?: string | null;
  featured_rank?: number | null;
  category?: string | null;
  collection?: string | null;
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

const getBuyLabel = (product: Product, variant: "list" | "detail" = "list") => {
  if (product.product_type === "affiliate") {
    if (product.affiliate_source === "amazon") {
      return variant === "detail" ? "View on Amazon" : "See on Amazon";
    }
    return "Buy now";
  }
  return "Buy";
};

const disclosureText = "As an Amazon Associate I earn from qualifying purchases.";
const legalText =
  "Affiliate products are sold by third-party merchants. Bradley Matera is not the seller or creator of affiliate products. Direct digital downloads are sold by Bradley Matera.";

const getProductBadge = (product: Product) => {
  if (product.product_type === "affiliate") {
    if (product.affiliate_source === "amazon") return "Amazon pick";
    return product.affiliate_source ? product.affiliate_source : "Affiliate";
  }
  return "Direct";
};

const fallbackImages: Record<string, string> = {
  mouse: "/store/mouse.svg",
  keyboard: "/store/keyboard.svg",
  streamdeck: "/store/deck.svg",
  maker: "/store/microcontroller.svg",
  pi: "/store/pi.svg",
  audio: "/store/mic.svg",
  tabletop: "/store/book.svg",
  network: "/store/router.svg",
  camera: "/store/camera.svg",
  robot: "/store/robot.svg",
  art: "/store/art.svg",
  apparel: "/store/shirt.svg",
  book: "/store/book.svg",
  lego: "/store/lego.svg",
  collectible: "/store/funko.svg",
  default: "/store/gear.svg",
};

const getProductImage = (product: Product) => {
  if (product.image_url) return product.image_url;
  if (product.category && fallbackImages[product.category]) {
    return fallbackImages[product.category];
  }
  return fallbackImages.default;
};

const getProductAlt = (product: Product) => product.image_alt || product.name;

const getAmazonAsin = (product: Product) => {
  if (!product.affiliate_url) return null;
  const match =
    product.affiliate_url.match(/\/dp\/([A-Z0-9]{10})/i) ||
    product.affiliate_url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
};

const renderAmazonMeta = (product: Product) => {
  if (!(product.product_type === "affiliate" && product.affiliate_source === "amazon")) {
    return null;
  }
  const asin = getAmazonAsin(product);
  return (
    <div className="store-asin-row">
      <span className="store-pill store-pill--accent">Ships from Amazon</span>
      {asin && <span className="store-asin-code">ASIN {asin}</span>}
    </div>
  );
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

  const featuredProducts = [...products]
    .filter((product) => product.featured_rank !== null && product.featured_rank !== undefined)
    .sort((a, b) => (a.featured_rank ?? 999) - (b.featured_rank ?? 999));

  const directProducts = products.filter((product) => product.product_type !== "affiliate");
  const amazonProducts = products.filter(
    (product) => product.product_type === "affiliate" && product.affiliate_source === "amazon",
  );
  const partnerProducts = products.filter(
    (product) => product.product_type === "affiliate" && product.affiliate_source !== "amazon",
  );

  const productMap = new Map(products.map((product) => [product.slug, product]));

  const comparisonCards = [
    {
      slug: "logitech-g502-hero-mouse",
      title: "Best for gaming control",
      bullets: ["11 programmable buttons", "Precision HERO sensor", "Adjustable weights"],
    },
    {
      slug: "keychron-k2-mechanical-keyboard",
      title: "Best typing feel",
      bullets: ["Wireless multi-device", "Compact layout", "USB-C wired option"],
    },
    {
      slug: "logitech-yeti-usb-microphone",
      title: "Best audio upgrade",
      bullets: ["Multi-pattern recording", "USB plug-and-play", "Studio-style sound"],
    },
  ];

  const comparisonItems = comparisonCards
    .map((card) => ({ ...card, product: productMap.get(card.slug) }))
    .filter((card): card is typeof card & { product: Product } => Boolean(card.product));

  const renderProducts = (items: Product[]) => (
    <div className="store-grid" style={{ marginTop: "1.5rem" }}>
      {items.map((product) => (
        <div key={product.id} className="store-card">
          <div className="store-card__image">
            <img src={getProductImage(product)} alt={getProductAlt(product)} loading="lazy" />
          </div>
          <div className="store-card__body">
            <div>
              <h3>{product.name}</h3>
              <div className="store-pill-group" style={{ marginTop: "0.35rem" }}>
                <span className="store-pill">{getProductBadge(product)}</span>
                {product.badge && <span className="store-pill store-pill--accent">{product.badge}</span>}
              </div>
              <p className="store-meta">{product.description}</p>
              {renderAmazonMeta(product)}
            </div>
            <div className="store-price">{formatPrice(product)}</div>
            <div className="store-actions">
              <a className="store-button" href={getGoUrl(product.slug)}>
                {getBuyLabel(product, "list")}
              </a>
              <Link className="store-link" to={`/store/${product.slug}`}>Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="store-shell">
      <header className="store-header store-hero">
        <div>
          <h1 className="store-title">Store</h1>
          <p className="store-subtitle">Curated tech picks plus direct digital downloads.</p>
          <p className="store-disclosure">{disclosureText}</p>
          <p className="store-legal">{legalText}</p>
          <div className="store-cta">
            <a className="store-button" href="#brads-amazon-picks">Browse Brad&apos;s Amazon Picks</a>
            <Link className="store-link" to="/purchases/">Customer portal</Link>
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

      {!loading && !error && products.length > 0 && (
        <div id="products" className="store-sections">
          {featuredProducts.length > 0 && (
            <section className="store-section store-section--featured">
              <h2 className="store-section-title">Featured picks</h2>
              <p className="store-section-description">
                The tightest stack of gear I keep recommending.
              </p>
              <div className="store-featured-grid">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="store-featured-card">
                    <div className="store-featured-card__image">
                      <img src={getProductImage(product)} alt={getProductAlt(product)} loading="lazy" />
                    </div>
                    <div>
                      <div className="store-pill-group">
                        <span className="store-pill">{getProductBadge(product)}</span>
                        {product.badge && (
                          <span className="store-pill store-pill--accent">{product.badge}</span>
                        )}
                      </div>
                      <h3>{product.name}</h3>
                      <p className="store-meta">{product.description}</p>
                      {renderAmazonMeta(product)}
                      <div className="store-featured-card__footer">
                        <span className="store-price">{formatPrice(product)}</span>
                        <a className="store-button" href={getGoUrl(product.slug)}>
                          {getBuyLabel(product, "list")}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {directProducts.length > 0 && (
            <section className="store-section">
              <h2 className="store-section-title">Direct downloads</h2>
              <p className="store-section-description">
                Instant digital downloads sold directly by Bradley Matera.
              </p>
              {renderProducts(directProducts)}
            </section>
          )}

          {amazonProducts.length > 0 && (
            <section id="brads-amazon-picks" className="store-section">
              <h2 className="store-section-title">Brad&apos;s Amazon Picks</h2>
              <p className="store-section-description">
                Hand-picked Amazon gear I actually recommend. Checkout happens on Amazon, and using these links supports my work at no extra cost.
              </p>
              {renderProducts(amazonProducts)}
            </section>
          )}

          {comparisonItems.length > 0 && (
            <section className="store-section store-section--compare">
              <h2 className="store-section-title">Quick comparison</h2>
              <p className="store-section-description">
                Side-by-side highlights for the most popular picks.
              </p>
              <div className="store-compare-grid">
                {comparisonItems.map((card) => (
                  <div key={card.slug} className="store-compare-card">
                    <div className="store-compare-card__header">
                      <span className="store-pill store-pill--accent">{card.title}</span>
                    </div>
                    <div className="store-compare-card__body">
                      <h3>{card.product.name}</h3>
                      <p className="store-meta">{card.product.description}</p>
                      <ul>
                        {card.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="store-compare-card__footer">
                      <span className="store-price">{formatPrice(card.product)}</span>
                      <a className="store-button store-button--ghost" href={getGoUrl(card.product.slug)}>
                        {getBuyLabel(card.product, "list")}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {partnerProducts.length > 0 && (
            <section className="store-section">
              <h2 className="store-section-title">Partner picks</h2>
              <p className="store-section-description">
                Affiliate products from trusted partner stores.
              </p>
              {renderProducts(partnerProducts)}
            </section>
          )}
        </div>
      )}
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
