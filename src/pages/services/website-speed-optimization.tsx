import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section } from "../../ui";

const pathname = "/services/website-speed-optimization/";
const pageTitle = "Website Speed Optimization and Core Web Vitals | Bradley Matera";
const pageDescription =
  "Website speed optimization for small businesses. Improve LCP, INP, and CLS scores. Faster load times, better search rankings, more conversions. $65/hour.";

const speedIssues = [
  "Largest Contentful Paint above 2.5 seconds",
  "Images that load slowly or shift the layout when they appear",
  "Render-blocking JavaScript and CSS files",
  "Fonts that cause text to flash or reflow",
  "Third-party scripts slowing down interaction",
  "Server response times above 600 milliseconds",
  "Unoptimized images serving full-resolution files to mobile devices",
  "Cumulative Layout Shift from ads, embeds, or un-sized media",
  "Slow interaction response (INP above 200 milliseconds)",
  "Heavy WordPress plugins adding unnecessary JavaScript",
];

const faqs = [
  {
    q: "How much does speed optimization cost?",
    a: "I charge $65/hour for targeted fixes, or a flat project rate for full optimization. Most small business sites need 3-6 hours of work to get Core Web Vitals into the green range. I will give you a clear scope and cost estimate before starting.",
  },
  {
    q: "What are Core Web Vitals?",
    a: (
      <>
        <a href="https://web.dev/articles/vitals">Core Web Vitals</a> are Google's three key speed metrics: LCP (Largest Contentful Paint) measures how fast the main content loads — target 2.5 seconds or less. INP (Interaction to Next Paint) measures how fast the page responds to clicks — target 200 milliseconds or less. CLS (Cumulative Layout Shift) measures visual stability — target 0.1 or less. Google uses these as ranking signals.
      </>
    ),
    text: "Core Web Vitals are Google's three key speed metrics: LCP (Largest Contentful Paint) measures how fast the main content loads — target 2.5 seconds or less. INP (Interaction to Next Paint) measures how fast the page responds to clicks — target 200 milliseconds or less. CLS (Cumulative Layout Shift) measures visual stability — target 0.1 or less. Google uses these as ranking signals.",
  },
  {
    q: "Will speed optimization improve my search rankings?",
    a: (
      <>
        Speed is a <a href="https://developers.google.com/search/docs/appearance/page-experience">confirmed ranking factor</a>, but it is one of many. If your site is very slow, fixing it can produce a noticeable improvement. If your site is already reasonably fast, the ranking impact may be small. The bigger benefit is usually user experience — faster sites convert better and have lower bounce rates.
      </>
    ),
    text: "Speed is a confirmed ranking factor, but it is one of many. If your site is very slow, fixing it can produce a noticeable improvement. If your site is already reasonably fast, the ranking impact may be small. The bigger benefit is usually user experience — faster sites convert better and have lower bounce rates.",
  },
  {
    q: "Can you optimize a WordPress site?",
    a: "Yes. I optimize WordPress sites by reducing plugin bloat, implementing caching, lazy-loading images, deferring non-critical scripts, and optimizing the database. For some sites, migrating from WordPress to a static site like Gatsby produces the biggest speed improvement. I will tell you honestly which approach makes sense.",
  },
];

const WebsiteSpeedPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="/services/">Services</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          Speed Optimization
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="Performance"
      titleAs="h1"
      title={
        <>
          <strong>Website Speed</strong> Optimization
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>What is website speed optimization?</strong> Making your website load faster and respond more quickly to user interactions. I improve Core Web Vitals (LCP, INP, CLS), optimize images, reduce JavaScript, and eliminate render-blocking resources. $65/hour or flat-rate project pricing. Faster sites rank better and convert more visitors.
          </p>
        </>
      }
      actions={
        <>
          <a href="tel:+16083135373" data-variant="ghost" className="link">
            (608) 313-5373
          </a>
          <Link data-variant="primary" to="/contact/">
            Free consultation
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/speed-lcp.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">LCP under 2.5s</h2>
            <p className="pkg-card__desc">
              Largest Contentful Paint measures how fast your main content appears. I optimize images, fonts, and server response to hit the green range.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/speed-inp.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">INP under 200ms</h2>
            <p className="pkg-card__desc">
              Interaction to Next Paint measures how fast your page responds to clicks. I reduce JavaScript execution time and defer non-critical scripts.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/speed-cls.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h2 className="pkg-card__title">CLS under 0.1</h2>
            <p className="pkg-card__desc">
              Cumulative Layout Shift measures visual stability. I reserve space for images, ads, and embeds so content does not jump as the page loads.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Common problems"
      title="What slows down your website"
      description={
        <p>
          These are the most common speed issues I fix. If your site feels slow, it probably has one or more of these problems.
        </p>
      }
    >
      <Card variant="outline">
        <ul className="feature-list">
          {speedIssues.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </Section>

    <Section
      eyebrow="How it works"
      title="From slow to fast"
    >
      <div className="grid-three">
        <div className="pkg-card">
          <img src="/package-images/step-1-diagnose.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">1. Audit</h3>
            <p className="pkg-card__desc">
              I test your site with Lighthouse, PageSpeed Insights, and real-device testing on a throttled mobile connection. You get a report showing exactly what is slow and why.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/step-2-build.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">2. Optimize</h3>
            <p className="pkg-card__desc">
              I fix the issues in priority order — biggest impact first. Images get compressed and served in WebP/AVIF. JavaScript gets deferred or removed. Fonts get preloaded or self-hosted.
            </p>
          </div>
        </div>
        <div className="pkg-card">
          <img src="/package-images/step-3-launch.svg" alt="" className="pkg-card__bg" loading="lazy" />
          <div className="pkg-card__body">
            <h3 className="pkg-card__title">3. Verify</h3>
            <p className="pkg-card__desc">
              I re-test on the same throttled connection and show you before-and-after numbers. Core Web Vitals are checked against real field data, not just lab scores.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="What I do"
      title="Specific optimizations I perform"
    >
      <div className="grid-two">
        <Card variant="outline">
          <h3 className="feature-card__title">Images</h3>
          <p className="feature-card__body">
            Convert to AVIF/WebP, compress without quality loss, set intrinsic dimensions, lazy-load below-the-fold images, and serve responsive sizes.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">JavaScript</h3>
          <p className="feature-card__body">
            Remove unused scripts, defer non-critical JavaScript, eliminate render-blocking, and reduce bundle size. For WordPress, audit and remove unnecessary plugins.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">CSS</h3>
          <p className="feature-card__body">
            Inline critical CSS, defer non-critical styles, remove unused selectors, and minify the final output.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Fonts</h3>
          <p className="feature-card__body">
            Self-host fonts, preload critical font files, use font-display swap, and subset to only the characters your site uses.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Server and caching</h3>
          <p className="feature-card__body">
            Configure CDN caching, set proper Cache-Control headers, enable compression (Brotli or Gzip), and optimize server response times.
          </p>
        </Card>
        <Card variant="outline">
          <h3 className="feature-card__title">Layout stability</h3>
          <p className="feature-card__body">
            Reserve space for images, videos, ads, and embeds using aspect-ratio CSS. Eliminate content shifts that hurt CLS and frustrate users.
          </p>
        </Card>
      </div>
    </Section>

    <Section
      eyebrow="Compare"
      title="Which option fits your business?"
      description={
        <p>
          Three ways to speed up your site — from a standalone audit to a complete optimization.
        </p>
      }
    >
      <div style={{ overflowX: "auto" }} tabIndex={0} role="region" aria-label="Website speed optimization comparison table">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Audit only — $197</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Audit + fixes — $65/hr</th>
              <th style={{ textAlign: "left", padding: "0.75rem", fontWeight: 600 }}>Full optimization — $497+</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Core Web Vitals audit</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>LCP optimization</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>CLS fixes</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>INP optimization</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Image optimization</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>CSS/JS minification</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Lazy loading</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Font optimization</td>
              <td style={{ padding: "0.75rem" }}>—</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td style={{ padding: "0.75rem" }}>Before/after report</td>
              <td style={{ padding: "0.75rem" }}>Audit report only</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
              <td style={{ padding: "0.75rem" }}>Yes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <Section
      eyebrow="FAQ"
      title="Common questions about speed optimization"
    >
      <div className="grid-three">
        {faqs.map((faq) => (
          <Card key={faq.q} variant="outline">
            <h3 className="feature-card__title">{faq.q}</h3>
            <p className="feature-card__body">{faq.a}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section
      eyebrow="Ready to start?"
      title="Get a free speed assessment"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. Tell me your website URL and I will run a free initial speed check and tell you what I can improve.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
      </div>
    </Section>
    <div className="attribution-block" style={{ maxWidth: "42rem", margin: "2rem auto", padding: "1rem 1.5rem", fontSize: "0.875rem", opacity: 0.7, borderTop: "1px solid var(--color-border)" }}>
      <p>
        <strong>By Bradley Matera</strong> — web developer in Durand, Illinois, serving Northwest Illinois and Southern Wisconsin. <Link to="/about/">About</Link> · <Link to="/contact/">Contact</Link> · <Link to="/pricing/">Pricing</Link>
      </p>
      <p style={{ marginTop: "0.5rem" }}>
        Last updated: July 2026. Prices and services subject to change — see <Link to="/terms/">terms of service</Link>.
      </p>
    </div>
  </Layout>
);

export default WebsiteSpeedPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Website Speed Optimization",
      url: pageUrl,
      description: pageDescription,
      serviceType: [
        "Core Web Vitals optimization",
        "LCP optimization",
        "INP optimization",
        "CLS optimization",
        "Image optimization",
        "JavaScript optimization",
        "Performance auditing",
      ],
      provider: {
        "@type": "Person",
        name: "Bradley Matera",
        url: site.siteUrl,
        telephone: "+16083135373",
      },
      areaServed: [
        { "@type": "City", name: "Durand, Illinois" },
        { "@type": "City", name: "Rockford, Illinois" },
        { "@type": "City", name: "Freeport, Illinois" },
        { "@type": "City", name: "Beloit, Wisconsin" },
        { "@type": "AdministrativeArea", name: "Northwest Illinois" },
      ],
      offers: {
        "@type": "Offer",
        name: "Speed Optimization — $65/hour",
        price: "65",
        priceCurrency: "USD",
        description: "Hourly speed optimization with a one-hour minimum. Most sites need 3-6 hours for full Core Web Vitals improvement.",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.text ?? faq.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.siteUrl}/services/` },
        { "@type": "ListItem", position: 3, name: "Speed Optimization", item: pageUrl },
      ],
    },
  ];
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pathname}
      />
      {structuredData.map((sd) => (
        <script key={sd["@type"]} type="application/ld+json">
          {JSON.stringify(sd)}
        </script>
      ))}
    </>
  );
};
