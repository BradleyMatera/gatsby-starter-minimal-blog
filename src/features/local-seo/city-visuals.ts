export type CityVisualKind = "visit" | "supplier" | "service" | "catalog" | "appointment" | "home" | "refresh";
export type LocalIllustrationKind = CityVisualKind | "search" | "collaboration" | "launch";

export const CITY_VISUALS: Record<string, CityVisualKind> = {
  "web-developer-amboy-illinois": "visit",
  "web-developer-ashton-illinois": "supplier",
  "web-developer-beloit-wisconsin": "service",
  "web-developer-belvidere-illinois": "supplier",
  "web-developer-brodhead-wisconsin": "catalog",
  "web-developer-byron-illinois": "appointment",
  "web-developer-cherry-valley-illinois": "visit",
  "web-developer-clinton-wisconsin": "supplier",
  "web-developer-dekalb-illinois": "appointment",
  "web-developer-dixon-illinois": "appointment",
  "web-developer-durand-davis-illinois": "home",
  "web-developer-edgerton-wisconsin": "visit",
  "web-developer-evansville-wisconsin": "refresh",
  "web-developer-forreston-illinois": "service",
  "web-developer-freeport-illinois": "supplier",
  "web-developer-janesville-wisconsin": "catalog",
  "web-developer-loves-park-illinois": "refresh",
  "web-developer-machesney-park-illinois": "service",
  "web-developer-milton-wisconsin": "visit",
  "web-developer-monroe-wisconsin": "catalog",
  "web-developer-mount-morris-illinois": "visit",
  "web-developer-oregon-illinois": "supplier",
  "web-developer-pecatonica-illinois": "service",
  "web-developer-polo-illinois": "catalog",
  "web-developer-rochelle-illinois": "supplier",
  "web-developer-rock-falls-illinois": "refresh",
  "web-developer-rockford-illinois": "home",
  "web-developer-rockton-illinois": "visit",
  "web-developer-roscoe-illinois": "appointment",
  "web-developer-south-beloit-illinois": "service",
  "web-developer-sterling-illinois": "supplier",
  "web-developer-sycamore-illinois": "appointment",
  "web-developer-winnebago-illinois": "service"
};

export const getCityArtProfile = (slug: string) => {
  const industry = CITY_VISUALS[slug] || "service";
  const wisconsin = slug.endsWith("wisconsin");
  return {
    industry,
    design: (industry === "refresh" ? "home" : industry) as LocalIllustrationKind,
    region: wisconsin ? "wisconsin" : "illinois",
    process: (wisconsin ? "collaboration" : "launch") as LocalIllustrationKind,
  };
};
