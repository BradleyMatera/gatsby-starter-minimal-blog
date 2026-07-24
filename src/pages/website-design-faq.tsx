import * as React from "react";
import type { HeadFC } from "gatsby";
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import { Card, Link, Section, FAQAccordion } from "../ui";

const pathname = "/website-design-faq/";
const pageTitle = "Website Design FAQ — Cost, Timeline, Ownership | Bradley Matera";
const pageDescription =
  "Answers to common questions about small business website design in Northwest Illinois. How much it costs, how long it takes, who owns the site, maintenance, WordPress, local SEO, and more.";

const faqs = [
  {
    q: "How much does a small-business website cost?",
    a: "A one-page Starter Presence site starts at $447. A five-page Local Growth site starts at $797. A ten-page Lead Engine site starts at $1,497. All prices are flat-rate, agreed before the project starts, with no hidden fees. Monthly hosting and support starts at $37/month. You can see full pricing on the pricing page.",
  },
  {
    q: "How long does a website take?",
    a: "A one-page site typically takes 1-2 weeks. A five-page site takes 2-3 weeks. A ten-page site takes 3-4 weeks. These timelines assume you provide content and feedback promptly. Rush builds are possible — ask if you have a deadline.",
  },
  {
    q: "Will I own my website?",
    a: "Yes. You own the code, content, domain, and hosting. Everything is registered in your name. If you ever want to move to another developer, I help you migrate at no extra charge. No vendor lock-in, no proprietary platform.",
  },
  {
    q: "Do I need monthly maintenance?",
    a: "Not required, but recommended. Websites need security updates, backups, and uptime monitoring. Essential Care is $37/month and covers updates, backups, and security checks. Growth Care at $67/month adds content changes and monthly reporting. Search Care at $97/month adds content optimization and local visibility work. You can cancel anytime.",
  },
  {
    q: "Can you fix my existing site?",
    a: "Yes. I charge $65/hour for individual fixes with a one-hour minimum. Most small repairs are done within 24-48 hours. For sites with multiple issues, a $597 full refresh may be more cost-effective. I will tell you honestly which makes more sense for your situation.",
  },
  {
    q: "Do you work with WordPress?",
    a: "Yes. I can build, repair, and maintain WordPress sites. I also build static sites using Gatsby, which are faster and more secure than WordPress for many small businesses. The right choice depends on how often you update content and whether you need a CMS. I will recommend the best platform for your needs, not the one that locks you in.",
  },
  {
    q: "Can you help with Google Business Profile?",
    a: "Yes. Google Business Profile setup and optimization is included in the Local Growth and Lead Engine packages. I help you claim or create your profile, complete every section, add photos, set service areas, and align it with your website. This is one of the highest-impact local SEO steps for a small business.",
  },
  {
    q: "Can you guarantee first place on Google?",
    a: "No. No one can guarantee a specific ranking on Google. Anyone who promises that is not being honest. What I can do is build a fast, accessible, well-structured website with proper local SEO foundations, schema markup, and content that targets the right searches. This gives you the best chance of ranking well, but rankings depend on many factors including competition, your business profile, and Google's algorithm changes.",
  },
  {
    q: "Do you write the content?",
    a: "I help you write and organize content. For the Starter package, you provide the text and I structure it. For Local Growth and Lead Engine, I collaborate with you on original copy that targets your local market. I do not publish unedited AI-generated content. Good content comes from knowing your business, and you know it better than anyone.",
  },
  {
    q: "What happens after launch?",
    a: "I submit your sitemap to Google Search Console and Bing Webmaster Tools, verify indexation, and run a post-launch check. The Lead Engine package includes a 30-day post-launch measurement review where we look at traffic, form submissions, and search performance. For all packages, I am available for questions and fixes after launch.",
  },
  {
    q: "What areas do you serve?",
    a: "I serve Durand, Davis, Rockford, Freeport, Loves Park, Machesney Park, Belvidere, Byron, Oregon, Beloit WI, and Janesville WI. I work remotely with clients anywhere, but my local focus is Northwest Illinois and nearby Southern Wisconsin. If you are outside this area, ask — I may still be able to help.",
  },
  {
    q: "Why choose a solo developer instead of an agency?",
    a: "You work directly with the person building your site. No account managers, no handoffs, no agency overhead. You see the price before the project starts. You own the finished work. You get faster turnaround because there is no approval chain. The trade-off is that I do not offer services I cannot personally deliver, so the scope is focused on what a small business actually needs.",
  },
];

const FAQPage = () => (
  <Layout>
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumbs__item" aria-current="page">
          FAQ
        </li>
      </ol>
    </nav>

    <Section
      eyebrow="FAQ"
      titleAs="h1"
      title={
        <>
          <strong>Website design</strong> frequently asked questions
        </>
      }
      description={
        <>
          <p className="direct-answer">
            <strong>How much does a small business website cost in Northwest Illinois?</strong> A one-page site starts at $447, a five-page site at $797, and a ten-page site at $1,497. You own the finished site, work directly with Bradley Matera, and there is no long-term contract. Below are answers to the most common questions from local business owners.
          </p>
        </>
      }
      actions={
        <>
          <Link data-variant="primary" to="/contact/">
            Get a free website plan
          </Link>
          <Link data-variant="ghost" to="/pricing/">
            See full pricing
          </Link>
        </>
      }
    >
      <div className="grid-three">
        <Card variant="outline">
          <h2 className="feature-card__title">Packages from $447</h2>
          <p className="feature-card__body">Flat-rate pricing, no hidden fees, no agency overhead.</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">You own everything</h2>
          <p className="feature-card__body">Code, content, domain, and hosting are all yours.</p>
        </Card>
        <Card variant="outline">
          <h2 className="feature-card__title">No long-term contract</h2>
          <p className="feature-card__body">Care plans are month-to-month. Cancel anytime.</p>
        </Card>
      </div>
    </Section>

    <FAQAccordion
      eyebrow="Questions"
      title="Common questions from local business owners"
      items={faqs.map((faq) => ({
        question: faq.q,
        answer: faq.a,
      }))}
    />

    <Section
      eyebrow="Still have questions?"
      title="Get a free website plan"
      description={
        <p>
          Call (608) 313-5373 or send a message through the contact page. I will answer your questions honestly and tell you whether I am the right fit for your project.
        </p>
      }
    >
      <div className="card-actions">
        <Link data-variant="primary" to="/contact/">Contact me</Link>
        <a href="tel:+16083135373" data-variant="ghost" className="link">
          (608) 313-5373
        </a>
        <Link data-variant="ghost" to="/pricing/">See pricing</Link>
        <Link data-variant="ghost" to="/services/">View services</Link>
      </div>
    </Section>
  </Layout>
);

export default FAQPage;

export const Head: HeadFC = () => {
  const site = useSiteMetadata();
  const pageUrl = `${site.siteUrl}${pathname}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.siteUrl },
        { "@type": "ListItem", position: 2, name: "FAQ", item: pageUrl },
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
