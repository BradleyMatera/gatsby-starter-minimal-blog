/* eslint-disable @typescript-eslint/no-var-requires */
const { json } = require("./_response");
const { loadDotEnvIfPresent } = require("./_env");

const TOPIC_COPY = {
  cloud: [
    {
      title: "Cloud engineering toolkits",
      body: "Recommended infrastructure and productivity offers for cloud builders.",
      cta: "Open sponsored offer",
    },
    {
      title: "DevOps speed boosters",
      body: "Tools and services promoted for faster CI/CD and release workflows.",
      cta: "See promoted tools",
    },
    {
      title: "Automation partner offers",
      body: "Sponsored tools aimed at reducing repetitive operational work.",
      cta: "Explore partner offers",
    },
  ],
  ai: [
    {
      title: "AI workflow offers",
      body: "Sponsored services and tools for prompt ops and AI-assisted work.",
      cta: "View sponsored deals",
    },
    {
      title: "Creator stack promotions",
      body: "Ads selected for creators shipping video, content, and AI projects.",
      cta: "Check partner offers",
    },
    {
      title: "Productivity ad picks",
      body: "Sponsored links focused on speed, content, and automation workflows.",
      cta: "Open this offer",
    },
  ],
  frontend: [
    {
      title: "Frontend builder offers",
      body: "Sponsored products and services relevant to UI engineering workflows.",
      cta: "See ad offer",
    },
    {
      title: "Web dev productivity deals",
      body: "Promoted tools for faster shipping, testing, and release operations.",
      cta: "Open sponsor page",
    },
    {
      title: "Design-to-code promotions",
      body: "Partner links intended for builders focused on quality UI delivery.",
      cta: "Explore promoted tools",
    },
  ],
  security: [
    {
      title: "Security-focused sponsors",
      body: "Sponsored offers with emphasis on safer and cleaner workflows.",
      cta: "Open security offer",
    },
    {
      title: "Operational hardening deals",
      body: "Promoted tools for reducing risk during release and maintenance cycles.",
      cta: "See sponsored options",
    },
    {
      title: "Account protection offers",
      body: "Partner promotions around access control and account safety practices.",
      cta: "Review partner deal",
    },
  ],
  general: [
    {
      title: "Trending sponsored offers",
      body: "Adsterra partner promotions aligned to developer and creator audiences.",
      cta: "Open promoted link",
    },
    {
      title: "Popular partner deals",
      body: "Sponsored links selected to improve click-through performance on this blog.",
      cta: "See this offer",
    },
    {
      title: "Featured ad placement",
      body: "Relevant sponsored destination for readers who want tools and resources.",
      cta: "Visit sponsor",
    },
  ],
};

const normalizeTopic = (topic) => {
  const normalized = String(topic || "general").toLowerCase();
  if (TOPIC_COPY[normalized]) return normalized;
  return "general";
};

const withTracking = (href, placement, slug) => {
  try {
    const url = new URL(href);
    if (placement) url.searchParams.set("placement_sub_id", placement);
    if (slug) url.searchParams.set("site_sub_id", slug.replace(/\//g, "").slice(0, 80));
    return url.toString();
  } catch (error) {
    return href;
  }
};

const buildAds = ({ smartlinkUrl, topic, slug }) => {
  const copy = TOPIC_COPY[normalizeTopic(topic)];

  return Array.from({ length: 6 }, (_, idx) => {
    const slotGroup = idx < 3 ? "left" : "right";
    const slotPos = (idx % 3) + 1;
    const slotName = `blog_${slotGroup}_${slotPos}`;
    const content = copy[idx % copy.length];

    return {
      id: `adsterra-${slotName}`,
      label: "Sponsored",
      title: content.title,
      body: content.body,
      cta: content.cta,
      href: withTracking(smartlinkUrl, slotName, slug),
      theme: "network",
    };
  });
};

const buildPlacements = () => {
  const bannerKey = process.env.ADSTERRA_BANNER_160X600_KEY || "";
  const banner300x250Key = process.env.ADSTERRA_BANNER_300X250_KEY || "";
  const bannerHost = process.env.ADSTERRA_BANNER_160X600_HOST || "https://www.highperformanceformat.com";
  const popunderScriptUrl = process.env.ADSTERRA_POPUNDER_SCRIPT_URL || "";
  const socialBarScriptUrl = process.env.ADSTERRA_SOCIAL_BAR_SCRIPT_URL || "";
  const nativeBannerScriptUrl = process.env.ADSTERRA_NATIVE_BANNER_SCRIPT_URL || "";
  const nativeBannerContainerId = process.env.ADSTERRA_NATIVE_BANNER_CONTAINER_ID || "";
  const bannerEnabled = String(process.env.ADSTERRA_ENABLE_BANNER || "true").toLowerCase() !== "false";
  const banner300x250Enabled =
    String(process.env.ADSTERRA_ENABLE_BANNER_300X250 || "true").toLowerCase() !== "false";
  const nativeBannerEnabled =
    String(process.env.ADSTERRA_ENABLE_NATIVE_BANNER || "true").toLowerCase() !== "false";
  const popunderEnabled = String(process.env.ADSTERRA_ENABLE_POPUNDER || "false").toLowerCase() === "true";
  const socialBarEnabled = String(process.env.ADSTERRA_ENABLE_SOCIAL_BAR || "false").toLowerCase() === "true";

  return {
    banner_160x600: bannerEnabled && bannerKey
      ? {
          enabled: true,
          key: bannerKey,
          width: 160,
          height: 600,
          invoke_src: `${bannerHost.replace(/\/$/, "")}/${bannerKey}/invoke.js`,
        }
      : { enabled: false },
    banner_300x250: banner300x250Enabled && banner300x250Key
      ? {
          enabled: true,
          key: banner300x250Key,
          width: 300,
          height: 250,
          invoke_src: `${bannerHost.replace(/\/$/, "")}/${banner300x250Key}/invoke.js`,
        }
      : { enabled: false },
    native_banner: nativeBannerEnabled && nativeBannerScriptUrl && nativeBannerContainerId
      ? {
          enabled: true,
          script_src: nativeBannerScriptUrl,
          container_id: nativeBannerContainerId,
        }
      : { enabled: false },
    popunder: popunderEnabled && popunderScriptUrl
      ? {
          enabled: true,
          script_src: popunderScriptUrl,
        }
      : { enabled: false },
    social_bar: socialBarEnabled && socialBarScriptUrl
      ? {
          enabled: true,
          script_src: socialBarScriptUrl,
        }
      : { enabled: false },
  };
};

exports.handler = async (event) => {
  loadDotEnvIfPresent();

  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return json(405, { error: "method_not_allowed", message: "Use GET." });
  }

  const smartlinkUrl =
    process.env.ADSTERRA_SMARTLINK_URL ||
    process.env.ADSTERRA_DIRECT_LINK_URL ||
    process.env.GATSBY_ADSTERRA_SMARTLINK_URL ||
    "";
  const smartlinkCardsEnabled =
    String(process.env.ADSTERRA_ENABLE_SMARTLINK_CARDS || "false").toLowerCase() === "true";
  const tokenConfigured = Boolean(process.env.ADSTERRA_API_KEY || process.env.ADSTERRA_API_TOKEN);
  const topic = event.queryStringParameters?.topic || "general";
  const slug = event.queryStringParameters?.slug || "";
  const placements = buildPlacements();
  const hasAnyPlacement = Object.values(placements).some((placement) => placement?.enabled);
  const ads =
    smartlinkCardsEnabled && smartlinkUrl ? buildAds({ smartlinkUrl, topic, slug }) : [];

  return json(200, {
    provider: "adsterra",
    configured: hasAnyPlacement || ads.length > 0,
    token_configured: tokenConfigured,
    smartlink_cards_enabled: smartlinkCardsEnabled,
    ads,
    placements,
  });
};
