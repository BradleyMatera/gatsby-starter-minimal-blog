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
};

const Seo = ({
  title = ``,
  description = ``,
  pathname = ``,
  image = ``,
  children = null,
  canonicalUrl = ``,
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bradley Matera',
    url: siteUrl,
    sameAs: [
      'https://www.linkedin.com/in/bradmatera',
      'https://github.com/BradleyMatera',
      'https://www.youtube.com/@bradmatera',
    ],
    description: seo.description,
  };

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
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
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
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      {children}
    </>
  );
};

export default Seo;
