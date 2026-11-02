import * as React from "react";
import { CATALOG_TTL_MS, MERCHANT_NAME, STORE_ORIGIN, catalogContextKey, getPromotionTopic, loadPromotionCatalog, productDestination, rankProducts, resolveDestination, type ShopifyCatalog, type ShopifyContext } from "./catalog-core";
import "./shopify.css";

const cached = new Map<string, { catalog: ShopifyCatalog; expiresAt: number }>();
const pending = new Map<string, Promise<ShopifyCatalog>>();

const loadCatalog = (key: string) => {
  const existing = cached.get(key);
  if (existing && Date.now() < existing.expiresAt) return Promise.resolve(existing.catalog);
  if (!pending.has(key)) pending.set(key, loadPromotionCatalog(fetch, JSON.parse(key)).then((catalog) => {
    if (cached.size >= 40) cached.delete(cached.keys().next().value as string);
    cached.set(key, { catalog, expiresAt: Date.now() + 30000 });
    return catalog;
  }).catch(() => {
    cached.delete(key);
    throw new Error("catalog_unavailable");
  }).finally(() => { pending.delete(key); }));
  return pending.get(key)!;
};

export type ShopifySpotlightProps = {
  context?: ShopifyContext;
  variant?: "compact" | "section" | "inline";
  limit?: number;
  offset?: number;
  placement?: string;
};

const ShopifySpotlight = ({ context = {}, variant = "section", limit = 3, offset = 0, placement = "page" }: ShopifySpotlightProps) => {
  const [catalog, setCatalog] = React.useState<ShopifyCatalog | null>(null);
  const [opening, setOpening] = React.useState("");
  const headingId = React.useId();
  const contextKey = catalogContextKey(context);
  const topic = getPromotionTopic(context);
  const topicId = topic?.id;
  React.useEffect(() => {
    let active = true;
    setCatalog(null);
    if (!topicId) return;
    const refresh = () => {
      if (document.visibilityState === "hidden") return;
      loadCatalog(contextKey).then((result) => { if (active) setCatalog(result); }).catch(() => { if (active) setCatalog(null); });
    };
    refresh();
    const interval = window.setInterval(refresh, CATALOG_TTL_MS);
    document.addEventListener("visibilitychange", refresh);
    return () => { active = false; window.clearInterval(interval); document.removeEventListener("visibilitychange", refresh); };
  }, [contextKey, topicId]);

  const products = React.useMemo(() => rankProducts(catalog?.products || [], context, 12).slice(Math.max(0, offset), Math.max(0, offset) + Math.max(1, Math.min(3, limit))), [catalog, context, limit, offset]);
  if (!products.length) return null;

  const openProduct = async (event: React.MouseEvent<HTMLAnchorElement>, handle: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (catalog?.source === "site") {
      window.location.assign(`/.netlify/functions/shopify-outbound?handle=${encodeURIComponent(handle)}`);
      return;
    }
    if (opening) return;
    setOpening(handle);
    const destination = await resolveDestination(handle);
    window.location.assign(destination);
  };

  return (
    <aside className={`shopify-spotlight shopify-spotlight--${variant}`} aria-labelledby={headingId} data-shopify-placement={placement} data-shopify-topic={topicId}>
      <header className="shopify-spotlight__header">
        <div>
          <p className="shopify-spotlight__label">Shop promotion · Merchant: {MERCHANT_NAME}</p>
          <h2 id={headingId}>{topic?.label}</h2>
          <p className="shopify-spotlight__context">{topic?.explanation}</p>
        </div>
        <a className="shopify-spotlight__browse" href={catalog?.source === "direct" ? `${STORE_ORIGIN}/` : "/.netlify/functions/shopify-outbound"} rel="sponsored noopener noreferrer" onClick={(event) => {
          if (catalog?.source !== "site" || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          window.location.assign("/.netlify/functions/shopify-outbound");
        }}>Browse the shop <span aria-hidden="true">↗</span></a>
      </header>
      <div className="shopify-spotlight__products">
        {products.map((product) => {
          const variantPrice = product.selectedOrFirstAvailableVariant.price;
          const price = new Intl.NumberFormat("en-US", { style: "currency", currency: variantPrice.currencyCode }).format(Number(variantPrice.amount));
          return (
            <article className="shopify-product" key={product.id}>
              <div className="shopify-product__image"><img src={product.featuredImage.url} alt={product.featuredImage.altText} width={product.featuredImage.width} height={product.featuredImage.height} loading="lazy" decoding="async" /></div>
              <div className="shopify-product__body">
                {product.productType && !/^\d+$/.test(product.productType) ? <p className="shopify-product__type">{product.productType}</p> : null}
                <h3>{product.title}</h3>
                <p className="shopify-product__price">{price} <span>{variantPrice.currencyCode}</span></p>
                <p className="shopify-product__option">Price for an available option.</p>
                <a className="shopify-product__link" href={catalog?.source === "direct" ? productDestination(product) || `${STORE_ORIGIN}/` : `/.netlify/functions/shopify-outbound?handle=${encodeURIComponent(product.handle)}`} rel="sponsored noopener noreferrer" onClick={(event) => { void openProduct(event, product.handle); }} aria-label={`View ${product.title} in the shop`}>
                  {opening === product.handle ? "Checking availability…" : "View in shop"} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <p className="shopify-spotlight__note">Availability and prices can change. Options, shipping, and checkout are handled in the shop.</p>
      <span className="sr-only" role="status">{opening ? "Checking current product availability" : ""}</span>
    </aside>
  );
};

export default ShopifySpotlight;
