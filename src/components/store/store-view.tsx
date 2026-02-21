import * as React from "react";
import { Link } from "gatsby";

export type Product = {
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

export type StoreTab = { key: string; label: string; count: number };

export const disclosureText = "As an Amazon Associate I earn from qualifying purchases.";
export const legalText =
  "Affiliate products are sold by third-party merchants. Bradley Matera is not the seller or creator of affiliate products. Direct digital downloads are sold by Bradley Matera.";
export const collectionOrder = ["Core Desk & Streaming", "Home Lab & Maker Gear", "Learning & Hobby"];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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
  light: "/store/light.svg",
  art: "/store/art.svg",
  apparel: "/store/shirt.svg",
  book: "/store/book.svg",
  lego: "/store/lego.svg",
  collectible: "/store/funko.svg",
  default: "/store/gear.svg",
};

export const formatPrice = (product: Product) => {
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

export const getBuyLabel = (product: Product, variant: "list" | "detail" = "list") => {
  if (product.product_type === "affiliate") {
    if (product.affiliate_source === "amazon") {
      return variant === "detail" ? "View on Amazon" : "See on Amazon";
    }
    return "Buy now";
  }
  return "Buy";
};

export const getProductBadge = (product: Product) => {
  if (product.product_type === "affiliate") {
    if (product.affiliate_source === "amazon") return "Amazon pick";
    return product.affiliate_source ? product.affiliate_source : "Affiliate";
  }
  return "Direct";
};

export const getProductImage = (product: Product) => {
  if (product.image_url) return product.image_url;
  if (product.category && fallbackImages[product.category]) {
    return fallbackImages[product.category];
  }
  return fallbackImages.default;
};

export const getProductAlt = (product: Product) => product.image_alt || product.name;

const getAmazonAsin = (product: Product) => {
  if (!product.affiliate_url) return null;
  const match =
    product.affiliate_url.match(/\/dp\/([A-Z0-9]{10})/i) ||
    product.affiliate_url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
};

export const renderAmazonMeta = (product: Product) => {
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

type StoreHeroProps = {
  amazonAnchorId: string;
};

export const StoreHero: React.FC<StoreHeroProps> = ({ amazonAnchorId }) => (
  <header className="store-header store-hero">
    <div>
      <h1 className="store-title">Store</h1>
      <p className="store-subtitle">Curated tech picks plus direct digital downloads.</p>
      <p className="store-disclosure">{disclosureText}</p>
      <p className="store-legal">{legalText}</p>
      <div className="store-cta">
        <a className="store-button" href={`#${amazonAnchorId}`}>Browse Brad&apos;s Amazon Picks</a>
        <Link className="store-link" to="/purchases/">Customer portal</Link>
        <Link className="store-link" to="/support/">Support</Link>
      </div>
    </div>
  </header>
);

type StorePrimaryTabsProps = {
  tabs: StoreTab[];
  activeTab: string;
  getPanelId: (tabKey: string) => string;
  onTabChange: (tabKey: string) => void;
  onTabKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export const StorePrimaryTabs: React.FC<StorePrimaryTabsProps> = ({
  tabs,
  activeTab,
  getPanelId,
  onTabChange,
  onTabKeyDown,
}) => {
  if (tabs.length <= 1) return null;
  return (
    <div className="store-tabs store-tabs--primary" role="tablist" aria-label="Store sections">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          id={`store-tab-${tab.key}`}
          type="button"
          role="tab"
          aria-controls={getPanelId(tab.key)}
          aria-selected={activeTab === tab.key}
          tabIndex={activeTab === tab.key ? 0 : -1}
          className={`store-tab ${activeTab === tab.key ? "store-tab--active" : ""}`}
          onClick={() => onTabChange(tab.key)}
          onKeyDown={onTabKeyDown}
        >
          <span>{tab.label}</span>
          <span className="store-tab-count">{tab.count}</span>
        </button>
      ))}
    </div>
  );
};

type ProductGridProps = {
  items: Product[];
  getGoUrl: (slug: string) => string;
};

export const ProductGrid: React.FC<ProductGridProps> = ({ items, getGoUrl }) => (
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

type FeaturedSectionProps = {
  products: Product[];
  getGoUrl: (slug: string) => string;
};

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ products, getGoUrl }) => {
  if (products.length === 0) return null;
  return (
    <section className="store-section store-section--featured">
      <h2 className="store-section-title">Featured picks</h2>
      <p className="store-section-description">
        The tightest stack of gear I keep recommending.
      </p>
      <div className="store-featured-grid">
        {products.map((product) => (
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
  );
};

type AmazonCollectionTabsProps = {
  tabs: Array<{ key: string; label: string }>;
  counts: Record<string, number>;
  totalCount: number;
  activeTab: string;
  onChange: (tabKey: string) => void;
};

export const AmazonCollectionTabs: React.FC<AmazonCollectionTabsProps> = ({
  tabs,
  counts,
  totalCount,
  activeTab,
  onChange,
}) => {
  if (tabs.length <= 1) return null;
  return (
    <div className="store-tabs" role="group" aria-label="Amazon picks categories">
      {tabs.map((tab) => {
        const count = tab.key === "all" ? totalCount : counts[tab.key] || 0;
        return (
          <button
            key={tab.key}
            type="button"
            aria-pressed={activeTab === tab.key}
            className={`store-tab ${activeTab === tab.key ? "store-tab--active" : ""}`}
            onClick={() => onChange(tab.key)}
          >
            <span>{tab.label}</span>
            <span className="store-tab-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
};

type ComparisonItem = {
  slug: string;
  title: string;
  bullets: string[];
  product: Product;
};

type ComparisonSectionProps = {
  visible: boolean;
  items: ComparisonItem[];
  getGoUrl: (slug: string) => string;
};

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  visible,
  items,
  getGoUrl,
}) => {
  if (!visible || items.length === 0) return null;
  return (
    <section aria-labelledby="store-tab-amazon" className="store-section store-section--compare">
      <h2 className="store-section-title">Quick comparison</h2>
      <p className="store-section-description">
        Side-by-side highlights for the most popular picks.
      </p>
      <div className="store-compare-grid">
        {items.map((card) => (
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
  );
};
