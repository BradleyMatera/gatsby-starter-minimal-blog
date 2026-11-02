import * as React from "react";
import { ShopifySpotlight } from "../../features/shopify";
import { excludedPromotionPath, STORE_ORIGIN } from "../../features/shopify/catalog-core";

export const ShopPromotionBanner = () => (
  <div className="premium-store-link">
    <span>Also from Matera Digital</span>
    <a href={`${STORE_ORIGIN}/`}>Explore the shop <span aria-hidden="true">↗</span></a>
    <span>Tech, workspace essentials & everyday finds</span>
  </div>
);

const SiteShopPromotion = ({ layoutClass = "" }: { layoutClass?: string }) => {
  const [page, setPage] = React.useState<{ path: string; title: string; description: string } | null>(null);
  React.useEffect(() => {
    const update = () => setPage({ path: window.location.pathname.replace(/\/$/, "") || "/", title: document.querySelector("main h1")?.textContent || "", description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || "" });
    update();
    window.addEventListener("gatsby-route-update", update);
    return () => window.removeEventListener("gatsby-route-update", update);
  }, []);
  if (!page || layoutClass.includes("editorial-post") || layoutClass.includes("editorial-policy") || excludedPromotionPath(page.path) || page.path === "/recruiter") return null;
  const hasInlinePlacement = ["/", "/pricing", "/about"].includes(page.path);
  return <ShopifySpotlight context={{ path: page.path, title: page.title, description: page.description }} placement="page-end" offset={hasInlinePlacement ? 3 : 0} limit={2} variant="compact" />;
};

export default SiteShopPromotion;
