import * as React from "react";
import { Link, HeadFC } from "gatsby";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import {
  AmazonCollectionTabs,
  collectionOrder,
  ComparisonSection,
  formatPrice,
  getProductDetailUrl,
  Product,
  ProductGrid,
  StoreProductRoute,
  slugify,
  StoreHero,
  StorePrimaryTabs,
  StoreTab,
} from "../features/store/components";
import "../styles/store.css";

const getFunctionsBase = () => {
  if (typeof window === "undefined") return "";
  const { hostname, port } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0";
  if (isLocalHost && port === "8000") return "http://localhost:8888";
  return "";
};

const getFunctionsUrl = (path: string) => {
  const base = getFunctionsBase();
  if (base && ["list_products", "get_product"].includes(path.split("?")[0])) {
    return `https://bradleymatera.dev/.netlify/functions/${path}`;
  }
  return base ? `${base}/.netlify/functions/${path}` : `/.netlify/functions/${path}`;
};

const getGoUrl = (slug: string) => {
  const base = getFunctionsBase();
  return base ? `https://bradleymatera.dev/go/${slug}` : `/go/${slug}`;
};

const useProducts = () => {
  const [attempt, setAttempt] = React.useState(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
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
          const message = err instanceof Error ? err.message : "Unable to load products.";
          const localApiHint =
            "The catalog is temporarily unavailable. Try again shortly.";
          const lower = message.toLowerCase();
          const isNetworkError =
            lower.includes("failed to fetch") ||
            lower.includes("networkerror") ||
            lower.includes("load failed");
          setError(isNetworkError ? localApiHint : message);
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
  }, [attempt]);

  return { products, loading, error, retry: () => setAttempt((value) => value + 1) };
};

const StoreIndex: React.FC<RouteComponentProps> = () => {
  const { products, loading, error, retry } = useProducts();
  const [query, setQuery] = React.useState("");
  const [activeStoreTab, setActiveStoreTab] = React.useState("direct");
  const [activeAmazonTab, setActiveAmazonTab] = React.useState("all");
  const [filtersReady, setFiltersReady] = React.useState(false);
  const storeTabs: StoreTab[] = [
    { key: "direct", label: "Digital downloads", count: products.filter((item) => item.product_type !== "affiliate").length },
    { key: "amazon", label: "Brad's Amazon Picks", count: products.filter((item) => item.product_type === "affiliate" && item.affiliate_source === "amazon").length },
    { key: "partner", label: "Partner picks", count: products.filter((item) => item.product_type === "affiliate" && item.affiliate_source !== "amazon").length },
  ];
  React.useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const section = params.get("section");
      setActiveStoreTab(window.location.hash === "#brads-amazon-picks" ? "amazon" : section === "amazon" || section === "partner" ? section : "direct");
      setActiveAmazonTab(params.get("collection") || "all");
      setQuery(params.get("q") || "");
      setFiltersReady(true);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    window.addEventListener("gatsby-route-update", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("gatsby-route-update", sync);
    };
  }, []);
  React.useEffect(() => {
    if (!filtersReady) return;
    const url = new URL(window.location.href);
    [["section", activeStoreTab, "direct"], ["collection", activeAmazonTab, "all"], ["q", query, ""]].forEach(([key, value, fallback]) => {
      if (value === fallback) url.searchParams.delete(key); else url.searchParams.set(key, value);
    });
    if (activeStoreTab !== "amazon" && url.hash === "#brads-amazon-picks") url.hash = "";
    window.history.replaceState(window.history.state, "", url);
  }, [activeStoreTab, activeAmazonTab, query, filtersReady]);
  const matches = (product: Product) => `${product.name} ${product.description} ${product.category || ""}`.toLowerCase().includes(query.trim().toLowerCase());
  const directProducts = products.filter((item) => item.product_type !== "affiliate" && matches(item));
  const amazonProducts = products.filter((item) => item.product_type === "affiliate" && item.affiliate_source === "amazon");
  const partnerProducts = products.filter((item) => item.product_type === "affiliate" && item.affiliate_source !== "amazon" && matches(item));
  const collections = Array.from(new Set(amazonProducts.map((item) => item.collection).filter(Boolean))) as string[];
  const ordered = [...collectionOrder.filter((item) => collections.includes(item)), ...collections.filter((item) => !collectionOrder.includes(item))];
  const amazonTabs = [{ key: "all", label: "All picks" }, ...ordered.map((label) => ({ key: slugify(label), label }))];
  const collection = amazonTabs.some((tab) => tab.key === activeAmazonTab) ? activeAmazonTab : "all";
  const amazonCounts = amazonProducts.reduce<Record<string, number>>((counts, item) => { if (item.collection) { const key = slugify(item.collection); counts[key] = (counts[key] || 0) + 1; } return counts; }, {});
  const filteredAmazonProducts = amazonProducts.filter((item) => matches(item) && (collection === "all" || slugify(item.collection || "") === collection));
  const visibleProducts = activeStoreTab === "direct" ? directProducts : activeStoreTab === "amazon" ? filteredAmazonProducts : partnerProducts;
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


  const getStorePanelId = (key: string) => `store-panel-${key}`;
  const handlePrimaryTabsKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = storeTabs.findIndex((tab) => tab.key === activeStoreTab);
    const next = event.key === "Home" ? 0 : event.key === "End" ? storeTabs.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + storeTabs.length) % storeTabs.length;
    setActiveStoreTab(storeTabs[next].key);
    document.getElementById(`store-tab-${storeTabs[next].key}`)?.focus();
  };
  const resetFilters = () => { setQuery(""); setActiveAmazonTab("all"); };
  const catalogQuery = `?${new URLSearchParams({ section: activeStoreTab, collection, q: query })}`;
  return <div className="store-shell">
    <StoreHero amazonAnchorId="brads-amazon-picks" onBrowseAmazon={() => setActiveStoreTab("amazon")} />
    <div id="brads-amazon-picks" tabIndex={-1}>
    {loading && <div className="store-status" role="status">Loading products…</div>}
    {error && <div className="store-status store-error" role="alert"><h2>The catalog could not load.</h2><p>{error}</p><div className="store-actions"><button type="button" className="store-button" onClick={retry}>Try again</button><Link className="store-link" to="/support/">Support</Link></div></div>}
    {!loading && !error && <div id="products" className="store-sections">
      <StorePrimaryTabs tabs={storeTabs} activeTab={activeStoreTab} getPanelId={getStorePanelId} onTabChange={setActiveStoreTab} onTabKeyDown={handlePrimaryTabsKeyDown} />
      <div className="store-filter-bar"><div><label htmlFor="store-search">Search this section</label><input id="store-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product, topic, or category" /></div><button className="store-button store-button--ghost" type="button" onClick={resetFilters} disabled={!query && collection === "all"}>Reset filters</button><p role="status" aria-live="polite">{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"} shown</p></div>
      {storeTabs.map((tab) => <section key={tab.key} id={getStorePanelId(tab.key)} role="tabpanel" aria-labelledby={`store-tab-${tab.key}`} hidden={activeStoreTab !== tab.key} tabIndex={0} className="store-section">
        <h2 className="store-section-title">{tab.label}</h2>
        <p className="store-section-description">{tab.key === "direct" ? "Instant digital downloads sold directly by Bradley Matera." : tab.key === "amazon" ? "Hand-picked Amazon gear I actually recommend. Checkout happens on Amazon, and using these links supports my work at no extra cost." : "Affiliate products from trusted partner stores."}</p>
        {tab.key === "amazon" && <AmazonCollectionTabs tabs={amazonTabs} counts={amazonCounts} totalCount={amazonProducts.length} activeTab={collection} onChange={setActiveAmazonTab} />}
        {activeStoreTab === tab.key && (visibleProducts.length ? <ProductGrid items={visibleProducts} getGoUrl={getGoUrl} catalogQuery={catalogQuery} /> : <div className="store-empty"><h3>{query || collection !== "all" ? "No products match these filters." : "No products in this section yet."}</h3><p>{query || collection !== "all" ? "Try a different keyword or reset the filters." : "Check another section or come back soon."}</p>{(query || collection !== "all") && <button type="button" className="store-button store-button--ghost" onClick={resetFilters}>Show all in this section</button>}</div>)}
        {activeStoreTab === tab.key && visibleProducts.length > 0 && <details className="store-comparison"><summary>Compare this section</summary><div className="store-table-scroll" role="region" aria-label="Product comparison"><table className="data-table"><caption>Price, category, and purchase destination</caption><thead><tr><th scope="col">Product</th><th scope="col">Price</th><th scope="col">Category</th><th scope="col">Purchase</th></tr></thead><tbody>{visibleProducts.map((product) => <tr key={product.id}><td data-label="Product"><Link to={getProductDetailUrl(product, catalogQuery)}>{product.name}</Link></td><td data-label="Price">{formatPrice(product)}</td><td data-label="Category">{product.collection || product.category || "Digital download"}</td><td data-label="Purchase">{product.product_type === "affiliate" ? "Third-party retailer" : <Link to="/digital-product-license/">Digital product license</Link>}</td></tr>)}</tbody></table></div></details>}
      </section>)}
      <ComparisonSection visible={activeStoreTab === "amazon" && !query && collection === "all"} items={comparisonItems} getGoUrl={getGoUrl} />
    </div>}
    </div>
    <section className="store-buying-guide" aria-label="How the store works">
      <h2 className="store-question-heading" style={{ fontSize: "1.25rem", margin: "2rem 0 0.5rem", maxWidth: "42rem" }}>
        What can I buy in Bradley Matera&apos;s store?
      </h2>
      <p className="store-direct-answer" style={{ fontSize: "1.15rem", lineHeight: 1.6, margin: "1.5rem 0", maxWidth: "42rem" }}>
        Browse digital downloads, templates, and development resources by Bradley Matera. All products are instant download after Stripe payment confirmation. The store also features hand-picked Amazon gear recommendations for developers.
      </p>

      <h2 className="store-question-heading" style={{ fontSize: "1.25rem", margin: "2rem 0 0.5rem", maxWidth: "42rem" }}>
        How do purchases work?
      </h2>
      <ul style={{ maxWidth: "42rem", lineHeight: 1.8, margin: "0 0 2rem", paddingLeft: "1.5rem" }}>
        <li><strong>Digital downloads:</strong> Pay with Stripe, receive an instant download link via email.</li>
        <li><strong>Amazon picks:</strong> Redirect to Amazon for checkout. Using these links supports my work at no extra cost.</li>
        <li><strong>Access your purchases:</strong> Visit the <Link to="/purchases/">customer portal</Link> to re-download anytime.</li>
        <li><strong>Need help?</strong> Contact me via the <Link to="/support/">support page</Link> for refunds or download issues.</li>
      </ul>

    </section>
  </div>;
};

const StorePage = () => {
  return (
    <Layout>
      <Router basepath="/store">
        <StoreIndex path="/" />
        <StoreProductRoute
          path="/:slug"
          getFunctionsUrl={getFunctionsUrl}
          getGoUrl={getGoUrl}
        />
      </Router>
    </Layout>
  );
};

export default StorePage;

export const Head: HeadFC = () => (
  <Seo
    title="Store"
    description="Browse and purchase software downloads, templates, and digital products by Bradley Matera — developer tools, project templates, and code resources for web developers."
    pathname="/store/"
    canonicalUrl="https://bradleymatera.dev/store/"
    structuredData={[
      {
        "@context": "https://schema.org",
        "@type": "Store",
        name: "Bradley F. Matera — Digital Store",
        url: "https://bradleymatera.dev/store/",
        description: "Digital downloads, templates, and developer resources by Bradley Matera.",
        author: {
          "@type": "Person",
          name: "Bradley Matera",
          url: "https://bradleymatera.dev/",
        },
        publisher: {
          "@type": "Person",
          name: "Bradley Matera",
          url: "https://bradleymatera.dev/",
        },
      },
    ]}
  />
);
