/** @jsx jsx */
import { jsx, Heading } from "theme-ui";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import Layout from "./layout";
import ItemTags from "./item-tags";
import Seo from "./seo";
import PostFooter from "./post-footer";
import BlogAccent from "../../../components/BlogAccent";
import { Section } from "../../../components/ui";

export type MBPostProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    tags?: {
      name: string;
      slug: string;
    }[];
    description?: string;
    canonicalUrl?: string;
    excerpt: string;
    timeToRead?: number;
    banner?: {
      childImageSharp: {
        resize: {
          src: string;
        };
      };
    };
  };
};

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type HouseAd = {
  id: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  theme: "amazon" | "direct" | "portal";
};

const inferPostTopic = (post: MBPostProps["post"]) => {
  const haystack = [
    post.title,
    post.description || "",
    post.excerpt || "",
    ...(post.tags?.map((tag) => tag.name) || []),
  ]
    .join(" ")
    .toLowerCase();

  if (
    /aws|azure|gcp|cloud|devops|docker|kubernetes|ci\/cd|pipeline|terraform|serverless/.test(
      haystack,
    )
  ) {
    return "cloud";
  }
  if (/ai|llm|automation|agent|prompt|copilot|chatgpt/.test(haystack)) return "ai";
  if (/react|javascript|typescript|frontend|gatsby|ui|css|webgpu/.test(haystack)) {
    return "frontend";
  }
  if (/security|jwt|auth|oauth|cognito|identity/.test(haystack)) return "security";
  return "general";
};

const buildHouseAds = (post: MBPostProps["post"]): HouseAd[] => {
  const topic = inferPostTopic(post);

  const contextualByTopic: Record<string, HouseAd[]> = {
    cloud: [
      {
        id: "cloud-amazon",
        label: "Cloud setup picks",
        title: "Build a cloud-ready desk",
        body: "Networking, audio, and workflow gear that supports long build-and-debug sessions.",
        cta: "See cloud-friendly picks",
        href: "/store/#brads-amazon-picks",
        theme: "amazon",
      },
      {
        id: "cloud-direct",
        label: "Operator templates",
        title: "Use the release checklist pack",
        body: "Incident, deploy, and handoff templates built for repeatable delivery.",
        cta: "Get direct downloads",
        href: "/store/",
        theme: "direct",
      },
      {
        id: "cloud-portal",
        label: "Purchase access",
        title: "Need a re-download?",
        body: "Sign in and pull your latest receipts and digital files instantly.",
        cta: "Open customer portal",
        href: "/purchases/",
        theme: "portal",
      },
    ],
    ai: [
      {
        id: "ai-amazon",
        label: "Creator workflow",
        title: "Upgrade your AI build station",
        body: "Mic, lighting, input, and productivity gear for recording and shipping faster.",
        cta: "Browse AI workflow picks",
        href: "/store/#brads-amazon-picks",
        theme: "amazon",
      },
      {
        id: "ai-direct",
        label: "Prompt operations",
        title: "Download prompt + review templates",
        body: "Structured docs for prompt testing, risk logging, and output QA.",
        cta: "View direct assets",
        href: "/store/",
        theme: "direct",
      },
      {
        id: "ai-portal",
        label: "Access your files",
        title: "Already bought an asset?",
        body: "Use your portal to retrieve downloads and receipts without support tickets.",
        cta: "Go to portal",
        href: "/purchases/",
        theme: "portal",
      },
    ],
    frontend: [
      {
        id: "frontend-amazon",
        label: "Dev ergonomics",
        title: "Improve your coding setup",
        body: "Keyboard, mouse, and audio picks selected for long frontend sessions.",
        cta: "Shop Brad's picks",
        href: "/store/#brads-amazon-picks",
        theme: "amazon",
      },
      {
        id: "frontend-direct",
        label: "UI delivery",
        title: "Get implementation playbooks",
        body: "Practical checklists for handoff, polish, and release readiness.",
        cta: "See direct downloads",
        href: "/store/",
        theme: "direct",
      },
      {
        id: "frontend-portal",
        label: "Order history",
        title: "Re-open your purchase library",
        body: "Quick access to your downloadable assets and receipts in one place.",
        cta: "Open your portal",
        href: "/purchases/",
        theme: "portal",
      },
    ],
    security: [
      {
        id: "security-amazon",
        label: "Secure workflow gear",
        title: "Harden your daily setup",
        body: "Reliable hardware picks for focused engineering and fewer workflow bottlenecks.",
        cta: "View trusted picks",
        href: "/store/#brads-amazon-picks",
        theme: "amazon",
      },
      {
        id: "security-direct",
        label: "Security docs",
        title: "Use auth and release checklists",
        body: "Templates for validation, rollout notes, and post-release verification.",
        cta: "Get the download pack",
        href: "/store/",
        theme: "direct",
      },
      {
        id: "security-portal",
        label: "Customer access",
        title: "Need your asset again?",
        body: "Retrieve purchases, receipts, and digital downloads through your portal.",
        cta: "Access your portal",
        href: "/purchases/",
        theme: "portal",
      },
    ],
    general: [
      {
        id: "general-amazon",
        label: "Tech picks",
        title: "Brad's highest-converting gear picks",
        body: "Curated products with clear value for builders, streamers, and creators.",
        cta: "Explore Amazon picks",
        href: "/store/#brads-amazon-picks",
        theme: "amazon",
      },
      {
        id: "general-direct",
        label: "Digital assets",
        title: "Download practical templates",
        body: "Get direct files you can use for projects, delivery, and operations.",
        cta: "Browse direct downloads",
        href: "/store/",
        theme: "direct",
      },
      {
        id: "general-portal",
        label: "Account access",
        title: "Manage your purchases",
        body: "View receipts and re-download files from the customer portal anytime.",
        cta: "Open customer portal",
        href: "/purchases/",
        theme: "portal",
      },
    ],
  };

  const evergreen: HouseAd[] = [
    {
      id: "evergreen-amazon",
      label: "No extra cost",
      title: "Support the site through Amazon links",
      body: "If you're buying anyway, using these links helps fund more technical writeups.",
      cta: "See recommended products",
      href: "/store/#brads-amazon-picks",
      theme: "amazon",
    },
    {
      id: "evergreen-direct",
      label: "Instant delivery",
      title: "Get direct assets immediately",
      body: "Checkout once, then access files instantly from success page and portal.",
      cta: "View asset catalog",
      href: "/store/",
      theme: "direct",
    },
    {
      id: "evergreen-portal",
      label: "Self-serve support",
      title: "Skip support delays",
      body: "The portal gives you direct order history and download access 24/7.",
      cta: "Open your order portal",
      href: "/purchases/",
      theme: "portal",
    },
  ];

  const contextual = contextualByTopic[topic] || contextualByTopic.general;
  return [...contextual, ...evergreen];
};

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data, children }) => {
  const post = data?.post;
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);
  const houseAds = React.useMemo(() => (post ? buildHouseAds(post) : []), [post]);
  const leftAds = houseAds.slice(0, 3);
  const rightAds = houseAds.slice(3);

  React.useEffect(() => {
    if (!post || typeof window === "undefined") return;
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("#site-main h2, #site-main h3"));
    const mapped = headings
      .filter((heading) => heading.id)
      .map((heading) => ({
        id: heading.id,
        text: heading.innerText,
        level: heading.tagName === "H3" ? 3 : 2,
      }));
    setTocItems(mapped);
  }, [post]);

  if (!post) {
    return (
      <Layout>
        <Section className="post-entry" disableReveal>
          <article className="surface-card">
            <header sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span className="eyebrow">Blog post</span>
              <Heading as="h1" className="section-title" sx={{ mb: 0 }}>
                Post not found
              </Heading>
            </header>
            <p>Sorry, this post could not be loaded. Please check the URL.</p>
          </article>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section className="post-entry" disableReveal>
        <div className="blog-search-accent">
          <BlogAccent />
        </div>
        <article className="surface-card" itemScope itemType="http://schema.org/Article">
          <header sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span className="eyebrow">Blog post</span>
            <Heading as="h1" className="section-title" sx={{ mb: 0 }} itemProp="headline">
              {post.title}
            </Heading>
            <div className="post-meta">
              <span>
                <time dateTime={post.date} itemProp="datePublished">
                  {post.date}
                </time>
              </span>
              {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
              {post.tags ? <ItemTags tags={post.tags} /> : null}
            </div>
          </header>

          <div className="post-layout">
            <aside className="house-ads house-ads--left" aria-label="Promoted links">
              {leftAds.map((ad) => (
                <a key={ad.id} className={`house-ad house-ad--${ad.theme}`} href={ad.href}>
                  <span className="house-ad__eyebrow">{ad.label}</span>
                  <span className="house-ad__title">{ad.title}</span>
                  <span className="house-ad__body">{ad.body}</span>
                  <span className="house-ad__cta">{ad.cta}</span>
                </a>
              ))}
            </aside>
            <section className="post-content" itemProp="articleBody">
              {children}
            </section>
            <aside className="post-rail">
              {tocItems.length > 1 ? (
                <div className="toc" aria-label="Table of contents">
                  <p className="toc__title">On this page</p>
                  <nav>
                    <ul className="toc__list">
                      {tocItems.map((item) => (
                        <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : 0 }}>
                          <a href={`#${item.id}`}>{item.text}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ) : null}
              <div className="house-ads house-ads--right" aria-label="Promoted links">
                {rightAds.map((ad) => (
                  <a key={ad.id} className={`house-ad house-ad--${ad.theme}`} href={ad.href}>
                    <span className="house-ad__eyebrow">{ad.label}</span>
                    <span className="house-ad__title">{ad.title}</span>
                    <span className="house-ad__body">{ad.body}</span>
                    <span className="house-ad__cta">{ad.cta}</span>
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <PostFooter post={post} />
        </article>
      </Section>
    </Layout>
  );
};

export default Post;

export const Head: HeadFC<MBPostProps> = ({ data }) => {
  const post = data?.post;
  if (!post) {
    return <Seo title="Post not found" description="This post could not be loaded." />;
  }
  return (
    <Seo
      title={post.title}
      description={post.description ? post.description : post.excerpt}
      image={post.banner ? post.banner?.childImageSharp?.resize?.src : undefined}
      pathname={post.slug}
      canonicalUrl={post.canonicalUrl}
    />
  );
};
