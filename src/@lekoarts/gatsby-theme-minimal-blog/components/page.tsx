/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Heading } from "theme-ui"
import Layout from "./layout"
import Seo from "./seo"
import { buildProfessionalServiceSchema, localBreadcrumb, serviceAreaDescription } from "../../../site/seo/local-seo"

export type MBPageProps = {
  page: {
    title: string
    slug: string
    excerpt: string
  } | null
}

const Page: React.FC<React.PropsWithChildren<PageProps<MBPageProps>>> = ({ data: { page }, children }) => {
  // Handle case where page data might be null
  if (!page) {
    return (
      <Layout>
        <Heading as="h1" variant="styles.h1">
          Page Not Found
        </Heading>
        <section className="u-page-content">{children}</section>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading as="h1" variant="styles.h1">
        {page.title}
      </Heading>
      <section className="u-page-content">{children}</section>
    </Layout>
  )
}

export default Page

export const Head: HeadFC<MBPageProps> = ({ data: { page } }) => {
  if (!page) {
    return <Seo title="Page Not Found" description="" />
  }

  const noindexPaths = new Set(["/contact/success", "/contact/success/"])
  const normalizedSlug = page.slug.endsWith("/") ? page.slug : `${page.slug}/`
  const pageOverrides: Record<
    string,
    {
      seoTitle?: string
      seoDescription: string
      breadcrumbs?: Array<{ name: string; path?: string; url?: string }>
      structuredData?: Record<string, unknown> | Record<string, unknown>[]
    }
  > = {
    "/about/": {
      seoTitle: "About Bradley Matera, Web Developer in Northwest Illinois",
      seoDescription:
        "Background, training, GitHub activity, and project work from Bradley Matera, a web developer serving Durand, Davis, and nearby Northwest Illinois communities.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "About", path: "/about/" }],
      structuredData: buildProfessionalServiceSchema({
        path: "/about/",
        serviceName: "Web development background and capabilities",
        description:
          "Background, education, and development experience from Bradley Matera, a web developer serving Durand, Davis, and nearby Northwest Illinois communities.",
      }),
    },
    "/projects/": {
      seoTitle: "Web Development Projects and Case Studies in Northwest Illinois",
      seoDescription:
        "Case studies, shipped projects, and proof of work from Bradley Matera, a web developer serving Durand, Davis, and nearby Northwest Illinois communities.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Projects", path: "/projects/" }],
      structuredData: buildProfessionalServiceSchema({
        path: "/projects/",
        serviceName: "Web development case studies and project examples",
        description:
          "Project case studies, shipped demos, and proof of work from Bradley Matera for Durand, Davis, and nearby Northwest Illinois communities.",
      }),
    },
    "/contact/": {
      seoTitle: "Contact Bradley Matera, Web Developer in Durand and Northwest Illinois",
      seoDescription:
        "Contact Bradley Matera about website builds, front-end work, or full-stack web projects in Durand, Davis, and nearby Northwest Illinois communities.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }],
      structuredData: buildProfessionalServiceSchema({
        path: "/contact/",
        serviceName: "Web development contact and project inquiries",
        description:
          "Contact Bradley Matera for website builds, UI improvements, and full-stack web projects in Durand, Davis, and nearby Northwest Illinois communities.",
      }),
    },
    "/support/": {
      seoTitle: "Website Support and Web Development Help in Northwest Illinois",
      seoDescription:
        "Support options, troubleshooting help, and web development assistance from Bradley Matera for Durand, Davis, and nearby Northwest Illinois communities.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Support", path: "/support/" }],
      structuredData: buildProfessionalServiceSchema({
        path: "/support/",
        serviceName: "Website support and troubleshooting",
        description:
          "Website support, cleanup, and troubleshooting help from Bradley Matera for Durand, Davis, and nearby Northwest Illinois communities.",
      }),
    },
    "/roles/": {
      seoTitle: "Engineering Role Practice: Cloud, DevOps, Backend, Full-Stack, AI",
      seoDescription:
        "Transparent breakdown of the engineering roles Bradley Matera is actively practicing through projects, experiments, and documented limitations.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }],
    },
    "/contributions/": {
      seoTitle: "Open Source and Public Contribution Work",
      seoDescription:
        "Public GitHub contribution history, open-source work, and collaboration examples from Bradley Matera.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Contributions", path: "/contributions/" }],
    },
    "/open-source-contributions/": {
      seoTitle: "Open-Source Contribution Case Studies",
      seoDescription:
        "Case studies and contribution notes covering public GitHub work, pull requests, and collaboration examples from Bradley Matera.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Open-Source Contributions", path: "/open-source-contributions/" }],
    },
  }

  const override = pageOverrides[normalizedSlug]

  return (
    <Seo
      title={override?.seoTitle || page.title}
      description={override?.seoDescription || page.excerpt || serviceAreaDescription}
      pathname={page.slug}
      robots={noindexPaths.has(page.slug) ? "noindex,nofollow" : "index,follow"}
      breadcrumbs={override?.breadcrumbs}
      structuredData={override?.structuredData}
    />
  )
}
