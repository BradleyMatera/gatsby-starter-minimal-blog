import * as React from "react";
import { Link } from "gatsby";
import { Router, RouteComponentProps } from "@reach/router";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import StoreProductRoute from "../components/store/store-detail-route";
import {
  AmazonCollectionTabs,
  collectionOrder,
  ComparisonSection,
  FeaturedSection,
  Product,
  ProductGrid,
  slugify,
  StoreHero,
  StorePrimaryTabs,
  StoreTab,
} from "../components/store/store-view";
import "../styles/store.css";

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

  const directProducts = products.filter((product) => product.product_type !== "affiliate");
  const amazonProducts = products.filter(
    (product) => product.product_type === "affiliate" && product.affiliate_source === "amazon",
  );
  const partnerProducts = products.filter(
    (product) => product.product_type === "affiliate" && product.affiliate_source !== "amazon",
  );

  const storeTabs = React.useMemo(
    () =>
      [
        amazonProducts.length > 0
          ? { key: "amazon", label: "Brad's Amazon Picks", count: amazonProducts.length }
          : null,
        { key: "direct", label: "Digital downloads", count: directProducts.length },
        partnerProducts.length > 0
          ? { key: "partner", label: "Partner picks", count: partnerProducts.length }
          : null,
      ].filter(Boolean) as StoreTab[],
    [amazonProducts.length, directProducts.length, partnerProducts.length],
  );

  const defaultStoreTab = React.useMemo(
    () => storeTabs.find((tab) => tab.key === "amazon")?.key || storeTabs[0]?.key || "direct",
    [storeTabs],
  );

  const [activeStoreTab, setActiveStoreTab] = React.useState(defaultStoreTab);
  React.useEffect(() => {
    if (!storeTabs.find((tab) => tab.key === activeStoreTab)) {
      setActiveStoreTab(defaultStoreTab);
    }
  }, [storeTabs, activeStoreTab, defaultStoreTab]);

  const featuredProducts = [...products]
    .filter((product) => product.featured_rank !== null && product.featured_rank !== undefined)
    .filter((product) => {
      if (activeStoreTab === "direct") return product.product_type !== "affiliate";
      if (activeStoreTab === "partner") {
        return product.product_type === "affiliate" && product.affiliate_source !== "amazon";
      }
      return product.product_type === "affiliate" && product.affiliate_source === "amazon";
    })
    .sort((a, b) => (a.featured_rank ?? 999) - (b.featured_rank ?? 999));

  const amazonTabs = React.useMemo(() => {
    const amazonCollections = Array.from(
      new Set(amazonProducts.map((product) => product.collection).filter(Boolean)),
    ) as string[];
    const orderedCollections = [
      ...collectionOrder.filter((name) => amazonCollections.includes(name)),
      ...amazonCollections.filter((name) => !collectionOrder.includes(name)),
    ];
    return [
      { key: "all", label: "All picks" },
      ...orderedCollections.map((label) => ({ key: slugify(label), label })),
    ];
  }, [amazonProducts]);

  const [activeAmazonTab, setActiveAmazonTab] = React.useState(amazonTabs[0]?.key ?? "all");

  React.useEffect(() => {
    if (!amazonTabs.find((tab) => tab.key === activeAmazonTab)) {
      setActiveAmazonTab(amazonTabs[0]?.key ?? "all");
    }
  }, [amazonTabs, activeAmazonTab]);

  const amazonCounts = amazonProducts.reduce<Record<string, number>>((acc, product) => {
    if (product.collection) {
      const key = slugify(product.collection);
      acc[key] = (acc[key] || 0) + 1;
    }
    return acc;
  }, {});

  const activeCollectionLabel = amazonTabs.find((tab) => tab.key === activeAmazonTab)?.label;
  const filteredAmazonProducts =
    activeAmazonTab === "all" || !activeCollectionLabel
      ? amazonProducts
      : amazonProducts.filter((product) => product.collection === activeCollectionLabel);

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

  const getStorePanelId = React.useCallback((tabKey: string) => {
    if (tabKey === "amazon") return "brads-amazon-picks";
    return `store-panel-${tabKey}`;
  }, []);

  const handlePrimaryTabsKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      const currentIndex = storeTabs.findIndex((tab) => tab.key === activeStoreTab);
      if (currentIndex === -1 || storeTabs.length === 0) return;

      let nextIndex = currentIndex;
      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % storeTabs.length;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + storeTabs.length) % storeTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = storeTabs.length - 1;

      const nextTabKey = storeTabs[nextIndex]?.key;
      if (!nextTabKey) return;
      setActiveStoreTab(nextTabKey);
      requestAnimationFrame(() => {
        document.getElementById(`store-tab-${nextTabKey}`)?.focus();
      });
    },
    [storeTabs, activeStoreTab],
  );

  return (
    <div className="store-shell">
      <StoreHero amazonAnchorId="brads-amazon-picks" />

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
          <StorePrimaryTabs
            tabs={storeTabs}
            activeTab={activeStoreTab}
            getPanelId={getStorePanelId}
            onTabChange={setActiveStoreTab}
            onTabKeyDown={handlePrimaryTabsKeyDown}
          />

          <FeaturedSection products={featuredProducts} getGoUrl={getGoUrl} />

          <section
            id="store-panel-direct"
            role="tabpanel"
            aria-labelledby="store-tab-direct"
            aria-hidden={activeStoreTab !== "direct"}
            hidden={activeStoreTab !== "direct"}
            tabIndex={0}
            className="store-section"
          >
              <h2 className="store-section-title">Digital downloads</h2>
              <p className="store-section-description">
                Instant digital downloads sold directly by Bradley Matera.
              </p>
              {directProducts.length > 0 ? (
                <ProductGrid items={directProducts} getGoUrl={getGoUrl} />
              ) : (
                <div className="store-empty">
                  No direct downloads yet. New digital releases are coming soon.
                </div>
              )}
          </section>

          {amazonProducts.length > 0 && (
            <section
              id="brads-amazon-picks"
              role="tabpanel"
              aria-labelledby="store-tab-amazon"
              aria-hidden={activeStoreTab !== "amazon"}
              hidden={activeStoreTab !== "amazon"}
              tabIndex={0}
              className="store-section"
            >
              <h2 className="store-section-title">Brad&apos;s Amazon Picks</h2>
              <p className="store-section-description">
                Hand-picked Amazon gear I actually recommend. Checkout happens on Amazon, and using these links supports my work at no extra cost.
              </p>
              <AmazonCollectionTabs
                tabs={amazonTabs}
                counts={amazonCounts}
                totalCount={amazonProducts.length}
                activeTab={activeAmazonTab}
                onChange={setActiveAmazonTab}
              />
              <ProductGrid items={filteredAmazonProducts} getGoUrl={getGoUrl} />
            </section>
          )}
          <ComparisonSection
            visible={activeStoreTab === "amazon"}
            items={comparisonItems}
            getGoUrl={getGoUrl}
          />

          {partnerProducts.length > 0 && (
            <section
              id="store-panel-partner"
              role="tabpanel"
              aria-labelledby="store-tab-partner"
              aria-hidden={activeStoreTab !== "partner"}
              hidden={activeStoreTab !== "partner"}
              tabIndex={0}
              className="store-section"
            >
              <h2 className="store-section-title">Partner picks</h2>
              <p className="store-section-description">
                Affiliate products from trusted partner stores.
              </p>
              <ProductGrid items={partnerProducts} getGoUrl={getGoUrl} />
            </section>
          )}
        </div>
      )}
    </div>
  );
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
