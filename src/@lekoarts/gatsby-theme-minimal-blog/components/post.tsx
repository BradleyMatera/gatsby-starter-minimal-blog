/** @jsx jsx */
/** @jsxFrag React.Fragment */
// Gatsby theme shadow file for blog post pages.
import { jsx, Heading } from "theme-ui";
import { Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import Layout from "./layout";
import ItemTags from "./item-tags";
import Seo from "./seo";
import PostFooter from "./post-footer";
import BlogAccent from "../../../site/accents/BlogAccent";
import { Section } from "../../../ui";

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
  category: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  theme: "project" | "amazon" | "direct" | "portal";
  image?: string;
  topics?: string[];
};

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

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

const inferReadDifficulty = (timeToRead?: number) => {
  if (typeof timeToRead !== "number") return null;
  if (timeToRead <= 6) return "Beginner";
  if (timeToRead <= 11) return "Intermediate";
  return "Advanced";
};

const allHouseAds: HouseAd[] = [
  // Projects & experiments
  {
    id: "project-projecthub",
    label: "Live project",
    category: "Project",
    title: "ProjectHub — Color system builder",
    body: "Pick a base color and generate a complete palette with live UI component previews.",
    cta: "Explore ProjectHub",
    href: "https://bradleymatera.github.io/ProjectHub/",
    theme: "project",
    image: "/assets/visuals/ads/projecthub-ad-1200x628.png",
    topics: ["frontend", "ai", "cloud", "general"],
  },
  {
    id: "project-color-system",
    label: "CodePen demo",
    category: "Demo",
    title: "Color System Preview Tool",
    body: "Interactive palette generator with real-time preview and copy-ready values.",
    cta: "View on CodePen",
    href: "https://codepen.io/student-account-bradley-matera/pen/bNNdzgv",
    theme: "project",
    image: "/assets/visuals/ads/color-system-preview-ad-1200x628.png",
    topics: ["frontend", "general"],
  },
  {
    id: "project-pokedex",
    label: "Live project",
    category: "Project",
    title: "Interactive Pokédex",
    body: "A playful, interactive Pokédex experiment with clean data fetching and UI details.",
    cta: "Open Pokédex",
    href: "https://bradleymatera.github.io/Interactive-Pokedex/",
    theme: "project",
    image: "/assets/visuals/ads/interactive-pokedex-ad-1200x628.png",
    topics: ["frontend", "ai", "general"],
  },
  {
    id: "project-myspace",
    label: "CodePen demo",
    category: "Demo",
    title: "Retro MySpace-style profile",
    body: "Nostalgic profile layout with neon styling, Top 8 friends, bulletins, and comments.",
    cta: "View on CodePen",
    href: "https://codepen.io/student-account-bradley-matera/pen/WbbvPKY",
    theme: "project",
    image: "/assets/visuals/ads/squirtle-myspace-ad-1200x628.png",
    topics: ["frontend", "general"],
  },
  {
    id: "project-animalsounds",
    label: "Live project",
    category: "Project",
    title: "AnimalSounds — Wildlife soundboard",
    body: "Curated animal calls, adaptive theming, and accessible playback interactions.",
    cta: "Play soundboard",
    href: "https://bradleymatera.github.io/AnimalSounds/",
    theme: "project",
    image: "/assets/visuals/ads/animal-sounds-ad-1200x628.png",
    topics: ["frontend", "security", "general"],
  },
  {
    id: "project-node-secrets",
    label: "Live tutorial",
    category: "Tutorial",
    title: "Safer secrets in Node.js",
    body: "Interactive guide covering hardcoded secrets, .env files, and cloud secret handling.",
    cta: "Start the tutorial",
    href: "https://bradleymatera.github.io/EthicsFrontEndDemo/",
    theme: "project",
    image: "/assets/visuals/ads/node-secrets-guide-ad-1200x628.png",
    topics: ["security", "cloud", "general"],
  },
  {
    id: "project-cheesemath",
    label: "Live project",
    category: "Project",
    title: "CheeseMath — Advanced calculator suite",
    body: "Arithmetic, string operations, regex analysis, and secure card-number handling in one app.",
    cta: "Try CheeseMath",
    href: "https://bradleymatera.github.io/CheeseMath-Jest-Tests/",
    theme: "project",
    image: "/assets/visuals/ads/cheesemath-ad-1200x628.png",
    topics: ["frontend", "security", "cloud", "general"],
  },

  // Gear & store picks
  {
    id: "store-cloud",
    label: "Amazon picks",
    category: "Gear",
    title: "Cloud-ready desk setup",
    body: "Networking, audio, and workflow gear that supports long build-and-debug sessions.",
    cta: "See cloud gear",
    href: "/store/#brads-amazon-picks",
    theme: "amazon",
    topics: ["cloud", "general"],
  },
  {
    id: "store-ai",
    label: "Amazon picks",
    category: "Gear",
    title: "AI build station",
    body: "Mic, lighting, input, and productivity gear for recording and shipping faster.",
    cta: "Browse AI gear",
    href: "/store/#brads-amazon-picks",
    theme: "amazon",
    topics: ["ai", "general"],
  },
  {
    id: "store-frontend",
    label: "Amazon picks",
    category: "Gear",
    title: "Frontend dev ergonomics",
    body: "Keyboard, mouse, and audio picks selected for long frontend sessions.",
    cta: "Shop dev gear",
    href: "/store/#brads-amazon-picks",
    theme: "amazon",
    topics: ["frontend", "general"],
  },
  {
    id: "store-security",
    label: "Amazon picks",
    category: "Gear",
    title: "Secure workflow gear",
    body: "Reliable hardware picks for focused engineering and fewer workflow bottlenecks.",
    cta: "View trusted gear",
    href: "/store/#brads-amazon-picks",
    theme: "amazon",
    topics: ["security", "general"],
  },

  // Direct downloads & templates
  {
    id: "download-release",
    label: "Template",
    category: "Download",
    title: "Release checklist pack",
    body: "Incident, deploy, and handoff templates built for repeatable delivery.",
    cta: "Get templates",
    href: "/store/",
    theme: "direct",
    topics: ["cloud", "security", "general"],
  },
  {
    id: "download-prompts",
    label: "Template",
    category: "Download",
    title: "Prompt + review templates",
    body: "Structured docs for prompt testing, risk logging, and output QA.",
    cta: "View AI assets",
    href: "/store/",
    theme: "direct",
    topics: ["ai", "general"],
  },
  {
    id: "download-ui",
    label: "Template",
    category: "Download",
    title: "UI handoff playbook",
    body: "Practical checklists for handoff, polish, and release readiness.",
    cta: "See playbooks",
    href: "/store/",
    theme: "direct",
    topics: ["frontend", "general"],
  },
  {
    id: "download-auth",
    label: "Template",
    category: "Download",
    title: "Auth & security checklist",
    body: "Templates for validation, rollout notes, and post-release verification.",
    cta: "Get security pack",
    href: "/store/",
    theme: "direct",
    topics: ["security", "general"],
  },

  // Portal & account
  {
    id: "portal-download",
    label: "Account",
    category: "Portal",
    title: "Re-download your files",
    body: "Sign in and pull your latest receipts and digital files instantly.",
    cta: "Open portal",
    href: "/purchases/",
    theme: "portal",
    topics: ["cloud", "ai", "frontend", "security", "general"],
  },
  {
    id: "portal-receipts",
    label: "Account",
    category: "Portal",
    title: "Access receipts & history",
    body: "Quick access to your downloadable assets and receipts in one place.",
    cta: "View history",
    href: "/purchases/",
    theme: "portal",
    topics: ["cloud", "ai", "frontend", "security", "general"],
  },

  // Services
  {
    id: "service-webdev",
    label: "Hire me",
    category: "Service",
    title: "Northwest Illinois web development",
    body: "Custom sites, Gatsby builds, and full-stack help for local businesses.",
    cta: "Learn more",
    href: "/web-developer-durand-davis-illinois/",
    theme: "direct",
    topics: ["frontend", "cloud", "general"],
  },
  {
    id: "service-website-help",
    label: "Hire me",
    category: "Service",
    title: "Website help & support",
    body: "Updates, fixes, hosting guidance, and ongoing support for existing sites.",
    cta: "Get help",
    href: "/website-help-northwest-illinois/",
    theme: "direct",
    topics: ["frontend", "security", "general"],
  },
  {
    id: "service-recruiter",
    label: "Recruiter",
    category: "Service",
    title: "Chat with my recruiter agent",
    body: "Ask questions about my experience, skills, and availability instantly.",
    cta: "Talk to agent",
    href: "/recruiter/",
    theme: "direct",
    topics: ["ai", "cloud", "frontend", "security", "general"],
  },
];

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const seededShuffle = <T,>(items: readonly T[], seed: number): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.abs((seed * (i + 1) + i * 31) % (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const scoreAd = (ad: HouseAd, topic: string): number => {
  if (ad.topics?.includes(topic)) return 3;
  if (ad.topics?.includes("general")) return 1;
  return 0;
};

const buildHouseAds = (post: MBPostProps["post"]): HouseAd[] => {
  const topic = inferPostTopic(post);
  const seed = hashString(post.slug);

  const scored = allHouseAds.map((ad) => ({ ad, score: scoreAd(ad, topic) }));
  const relevant = scored.filter((s) => s.score === 3);
  const general = scored.filter((s) => s.score === 1);
  const fallback = scored.filter((s) => s.score === 0);

  const shuffledRelevant = seededShuffle(relevant, seed).map((s) => s.ad);
  const shuffledGeneral = seededShuffle(general, seed + 1).map((s) => s.ad);
  const shuffledFallback = seededShuffle(fallback, seed + 2).map((s) => s.ad);

  // 3 topic-relevant, 1 general, 1 wildcard — different per post because of the slug seed
  return [...shuffledRelevant.slice(0, 3), ...shuffledGeneral.slice(0, 1), ...shuffledFallback.slice(0, 1)].slice(0, 5);
};

const Post: React.FC<React.PropsWithChildren<PageProps<MBPostProps>>> = ({ data, children }) => {
  const post = data?.post;
  const [tocItems, setTocItems] = React.useState<TocItem[]>([]);
  const houseAds = React.useMemo(() => (post ? buildHouseAds(post) : []), [post]);
  const readDifficulty = React.useMemo(() => inferReadDifficulty(post?.timeToRead), [post?.timeToRead]);
  const activeAds = React.useMemo(() => houseAds.slice(0, 5), [houseAds]);
  const articleOutline = React.useMemo(
    () => tocItems.filter((item) => item.level === 2).slice(0, 6),
    [tocItems],
  );

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
      <Layout className="layout--post">
        <Section className="post-entry" disableReveal>
          <article className="surface-card">
            <header className="post-entry__header">
              <span className="eyebrow">Blog post</span>
              <Heading as="h1" className="section-title u-mb-0">
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
    <Layout className="layout--post">
      <Section className="post-entry" disableReveal>
        <div className="blog-search-accent">
          <BlogAccent />
        </div>
        <article className="surface-card" itemScope itemType="http://schema.org/Article">
          <header className="post-entry__header">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link to="/blog/">Blog</Link>
                </li>
                <li className="breadcrumbs__item" aria-current="page">
                  {post.title}
                </li>
              </ol>
            </nav>
            <span className="eyebrow">Blog post</span>
            <Heading as="h1" className="section-title u-mb-0" itemProp="headline">
              {post.title}
            </Heading>
            <div className="post-meta">
              <span>
                <time dateTime={post.date} itemProp="datePublished">
                  {post.date}
                </time>
              </span>
              {typeof post.timeToRead === "number" ? <span>{post.timeToRead} min read</span> : null}
              {readDifficulty ? <span>{readDifficulty}</span> : null}
              {post.tags ? <ItemTags tags={post.tags} /> : null}
            </div>
          </header>

          <div className="post-layout post-layout--no-left-ads">
            <section className="post-content" itemProp="articleBody">
              {articleOutline.length > 0 ? (
                <section className="article-outline" aria-label="What this article covers">
                  <p className="article-outline__title">In this article</p>
                  <ol className="article-outline__list">
                    {articleOutline.map((item) => (
                      <li key={`outline-${item.id}`}>
                        <a href={`#${item.id}`}>{item.text}</a>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
              {children}
            </section>
            <aside className="post-rail">
              {tocItems.length > 1 ? (
                <div className="toc" aria-label="Table of contents">
                  <p className="toc__title">On this page</p>
                  <nav>
                    <ul className="toc__list">
                      {tocItems.map((item) => (
                        <li
                          key={item.id}
                          className={item.level === 3 ? "toc__item--nested" : undefined}
                        >
                          <a href={`#${item.id}`}>{item.text}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ) : null}
              <div className="sponsored-panel" aria-label="Promoted links">
                <div className="sponsored-panel__header">
                  <span className="sponsored-panel__icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </span>
                  <p className="sponsored-panel__heading">Brad's picks & projects</p>
                </div>
                <p className="sponsored-panel__subhead">Hand-picked gear, downloads, and live experiments.</p>
                <div className="house-ads house-ads--right">
                  {activeAds.map((ad: HouseAd) => (
                    <a
                      key={ad.id}
                      className={`house-ad house-ad--${ad.theme}`}
                      href={ad.href}
                      target={isExternalHref(ad.href) ? "_blank" : undefined}
                      rel={isExternalHref(ad.href) ? "sponsored noopener noreferrer" : undefined}
                    >
                      {ad.image ? (
                        <img
                          className="house-ad__image"
                          src={ad.image}
                          alt={ad.title}
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="314"
                        />
                      ) : null}
                      <span className="house-ad__category">{ad.category}</span>
                      <span className="house-ad__title">{ad.title}</span>
                      <span className="house-ad__body">{ad.body}</span>
                      <span className="house-ad__cta">
                        {ad.cta}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
                <a className="sponsored-panel__footer" href="/store/">
                  Browse all picks, tools, and downloads
                </a>
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
  const publishedTime = (() => {
    const parsed = new Date(post.date);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  })();
  const articleTags = post.tags?.map((tag) => tag.name).filter((tag): tag is string => Boolean(tag));
  const imageUrl = post.banner?.childImageSharp?.resize?.src;
  const canonicalUrl = post.canonicalUrl || `https://bradleymatera.dev${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.excerpt,
    image: imageUrl ? `https://bradleymatera.dev${imageUrl}` : undefined,
    url: canonicalUrl,
    datePublished: publishedTime,
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: articleTags?.join(", "),
    articleSection: post.tags?.[0]?.name,
  };

  return (
    <>
      <Seo
        title={post.title}
        description={post.description ? post.description : post.excerpt}
        image={imageUrl}
        pathname={post.slug}
        canonicalUrl={post.canonicalUrl}
        ogType="article"
        article={{
          publishedTime,
          tags: articleTags,
        }}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: post.title, path: post.slug },
        ]}
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
};
