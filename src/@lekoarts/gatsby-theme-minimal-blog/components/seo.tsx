import * as React from "react";
import { withPrefix } from "gatsby";
import useSiteMetadata from "../hooks/use-site-metadata";

type SEOProps = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
  canonicalUrl?: string;
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: Array<{
    name: string;
    path?: string;
    url?: string;
  }>;
};

const Seo = ({
  title = ``,
  description = ``,
  pathname = ``,
  image = ``,
  children = null,
  canonicalUrl = ``,
  ogType = "website",
  article,
  structuredData,
  breadcrumbs,
}: SEOProps) => {
  const site = useSiteMetadata();

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    author,
    siteLanguage,
  } = site;

  const seo = {
    title: title ? `${title} | ${siteTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  };
  const canonical = canonicalUrl || seo.url;

  const personStructuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bradley Matera",
    url: siteUrl,
    sameAs: [
      "https://www.linkedin.com/in/bradmatera",
      "https://github.com/BradleyMatera",
      "https://www.youtube.com/@bradmatera",
    ],
    description: seo.description,
  };
  const articleStructuredData: Record<string, unknown> | null =
    ogType === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title || defaultTitle,
          description: seo.description,
          image: [seo.image],
          mainEntityOfPage: canonical,
          author: {
            "@type": "Person",
            name: "Bradley Matera",
            url: siteUrl,
          },
          publisher: {
            "@type": "Person",
            name: "Bradley Matera",
            url: siteUrl,
          },
          ...(article?.publishedTime ? { datePublished: article.publishedTime } : {}),
          ...(article?.modifiedTime || article?.publishedTime
            ? { dateModified: article?.modifiedTime || article?.publishedTime }
            : {}),
          ...(article?.section ? { articleSection: article.section } : {}),
          ...(article?.tags?.length ? { keywords: article.tags.join(", ") } : {}),
        }
      : null;
  const customStructuredData = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];
  const structuredDataNodes = [
    personStructuredData,
    ...(articleStructuredData ? [articleStructuredData] : []),
    ...(breadcrumbs && breadcrumbs.length > 1
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.url || (crumb.path ? `${siteUrl}${crumb.path}` : canonical),
            })),
          },
        ]
      : []),
    ...customStructuredData,
  ];

  return (
    <>
      <html lang={siteLanguage} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteTitle} />
      {ogType === "article" && article?.publishedTime ? (
        <meta property="article:published_time" content={article.publishedTime} />
      ) : null}
      {ogType === "article" && article?.modifiedTime ? (
        <meta property="article:modified_time" content={article.modifiedTime} />
      ) : null}
      {ogType === "article" && article?.section ? (
        <meta property="article:section" content={article.section} />
      ) : null}
      {ogType === "article" && article?.tags?.length
        ? article.tags.map((tag) => <meta key={`article-tag-${tag}`} property="article:tag" content={tag} />)
        : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:site" content={author} />
      <meta name="robots" content="index,follow" />
      <link rel="icon" type="image/png" sizes="32x32" href={withPrefix(`/favicon-32x32-32x32.png`)} />
      <link rel="icon" type="image/png" sizes="16x16" href={withPrefix(`/favicon-16x16-16x16.png`)} />
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix(`/apple-touch-icon-180x180.png`)} />
      <link rel="alternate" type="application/rss+xml" title={`${siteTitle} RSS Feed`} href={withPrefix(`/rss.xml`)} />
      <link rel="canonical" href={canonical} />
      {structuredDataNodes.map((node, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(node)}
        </script>
      ))}
      {children}
    </>
  );
};

export default Seo;
