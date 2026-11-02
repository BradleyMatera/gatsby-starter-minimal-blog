import * as React from "react";
import BrandArtwork from "../../../site/components/BrandArtwork";
import type { BrandArtworkVariant } from "../../../site/components/BrandArtwork";
import { projectMedia } from "../../projects/projectMedia";
import { getArticleCover } from "../article-covers";

type TopicImage = { src: string; alt: string };

const articleProjects: Record<string, string> = {
  "/interactive-pokedex": "/projects/interactive-pokedex/",
  "/projecthub-embeddable-ai-recruiter-free-tiers": "/projects/projecthub/",
  "/webgpu-getting-started": "/projects/triangle-shader-lab/",
  "/rebuilt-webgpu-triangle-demo": "/projects/triangle-shader-lab/",
  "/making-triangle-webgpu-demo-match-reality": "/projects/triangle-shader-lab/",
  "/obj-parser": "/projects/obj-parser/",
  "/exploring-zig-efficient-parsing": "/projects/obj-parser/",
};

const cityImages: Record<string, TopicImage> = {
  "/website-design-rockford-il": { src: "/city-images/rockford.jpg", alt: "Historic downtown architecture in Rockford, Illinois" },
  "/website-design-loves-park-illinois": { src: "/city-images/loves-park.jpg", alt: "Shorewood Park in Loves Park, Illinois" },
  "/website-design-belvidere-illinois": { src: "/city-images/belvidere.jpg", alt: "Belvidere, Illinois" },
  "/website-design-dekalb-illinois": { src: "/city-images/dekalb.jpg", alt: "Aerial view of DeKalb, Illinois" },
  "/website-design-sycamore-illinois": { src: "/city-images/sycamore.jpg", alt: "Downtown Sycamore, Illinois" },
  "/website-design-sterling-illinois": { src: "/city-images/sterling.jpg", alt: "Sterling, Illinois" },
  "/website-design-dixon-illinois": { src: "/city-images/dixon.jpg", alt: "Dixon, Illinois" },
  "/website-design-monroe-wisconsin": { src: "/city-images/monroe-wi.jpg", alt: "Monroe, Wisconsin" },
};

export const topicImage = (slug: string, context: string): TopicImage | undefined => {
  const path = `/${slug.replace(/^\/+|\/+$/g, "")}`;
  const project = projectMedia[articleProjects[path]];
  if (project?.src) return { src: project.src, alt: project.alt };
  if (cityImages[path]) return cityImages[path];
  if (/\b(career|combat medic|job search|job hunting)\b/i.test(context)) {
    return { src: "/career-timeline.webp", alt: "Illustrated career path connecting medical service, cloud work, education and engineering" };
  }
  return undefined;
};

export const topicArtwork = (context: string, title = ""): BrandArtworkVariant => {
  if (title && title !== context) {
    const titleArtwork = topicArtwork(title);
    if (titleArtwork !== "web-design-studio") return titleArtwork;
  }
  if (/\b(security|authentication|cognito|jwt|tokens?|secrets?)\b/i.test(context)) return "editorial-security";
  if (/\b(ai|gpt|llm|machine learning|artificial intelligence|agents?)\b/i.test(context)) return "editorial-ai";
  if (/\b(aws|azure|cloud|docker|containers?|containerization|serverless|devops|orchestration|deployment|hosting)\b/i.test(context)) return "editorial-cloud";
  if (/\b(accessibility|accessible|wcag|ada)\b/i.test(context)) return "accessible-interface";
  if (/\b(performance|core web vitals|speed|loading)\b/i.test(context)) return "performance-engine";
  if (/\b(redesign|migrate|migration|teardown|renovation)\b/i.test(context)) return "site-renovation";
  if (/\b(repair|debugging|stuck|haunted|hostage|troubleshooting)\b/i.test(context)) return "website-repair";
  if (/\b(maintenance|monitoring|backups?)\b/i.test(context)) return "care-monitoring";
  if (/\b(pricing|costs?|budget|freelancer|agency)\b/i.test(context)) return "pricing-toolkit";
  if (/\b(seo|local citations|google business|direction requests|service.area|landing pages|rankings)\b/i.test(context)) return "local-discovery";
  if (/\b(open.source|contributions?|pull requests?|code review)\b/i.test(context)) return "engineering-craft";
  if (/\b(school|university|certifications?|learning|learn by doing)\b/i.test(context)) return "about-workshop";
  if (/\b(process|planning|case studies|checklist|schedule)\b/i.test(context)) return "process-blueprint";
  if (/\b(zig|webgpu|testing|parser|code|coding|javascript|typescript|systems?|api|react|software|stack|github|projects?)\b/i.test(context)) return "editorial-development";
  return "web-design-studio";
};

type TopicArtworkProps = {
  context: string;
  title?: string;
  slug?: string;
  image?: string;
  imageAlt?: string;
  eager?: boolean;
};

const TopicArtwork = ({ context, title = "", slug = "", image, imageAlt = "", eager = false }: TopicArtworkProps) => {
  const cover = getArticleCover(slug);
  if (cover) {
    return (
      <picture className="brand-artwork topic-artwork article-cover" data-artwork={slug}>
        <source srcSet={cover.mobile} type="image/webp" media={eager ? "(max-width: 700px)" : undefined} />
        <img src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading={eager ? "eager" : "lazy"} decoding="async" />
      </picture>
    );
  }
  const selectedImage = image ? { src: image, alt: imageAlt } : topicImage(slug, title || context);
  if (selectedImage) {
    return (
      <picture className="brand-artwork topic-artwork" data-artwork="article-image">
        <img src={selectedImage.src} alt={selectedImage.alt} width="1440" height="960" loading={eager ? "eager" : "lazy"} decoding="async" />
      </picture>
    );
  }
  return <BrandArtwork variant={topicArtwork(context, title)} className="topic-artwork" eager={eager} />;
};

export default TopicArtwork;
