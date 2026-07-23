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
        "Engineering role practice pages covering cloud, DevOps, backend, full-stack, and AI automation — each with case studies, verified skills, and honest scope notes.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }],
    },
    "/roles/ai-automation-engineer/": {
      seoTitle: "AI & Automation Engineer | Bradley Matera — Portfolio",
      seoDescription:
        "AI and automation engineering practice — LLM integrations, agent workflows, and grounded AI projects with free-tier providers, safety checks, and honest limitations.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }, { name: "AI & Automation Engineer", path: "/roles/ai-automation-engineer/" }],
    },
    "/roles/backend-engineer/": {
      seoTitle: "Backend Engineer | Bradley Matera — Portfolio",
      seoDescription:
        "Backend engineering practice — Express APIs, FastAPI experiments, JWT auth, MongoDB, with honest notes on what is production-ready versus experimental.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }, { name: "Backend Engineer", path: "/roles/backend-engineer/" }],
    },
    "/roles/cloud-engineer/": {
      seoTitle: "Cloud Engineer | Bradley Matera — Portfolio",
      seoDescription:
        "Cloud engineering practice — AWS architecture, free-tier cost management, infrastructure-as-code, and verified deployment patterns from real project work.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }, { name: "Cloud Engineer", path: "/roles/cloud-engineer/" }],
    },
    "/roles/devops-engineer/": {
      seoTitle: "DevOps Engineer | Bradley Matera — Portfolio",
      seoDescription:
        "DevOps engineering practice — GitHub Actions CI, Docker containerization, deployment pipelines, and small orchestration labs with exact steps and verification checks.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }, { name: "DevOps Engineer", path: "/roles/devops-engineer/" }],
    },
    "/roles/full-stack-engineer/": {
      seoTitle: "Full-Stack Engineer | Bradley Matera — Portfolio",
      seoDescription:
        "Full-stack engineering practice with React front ends, Express APIs, MongoDB, deployment pipelines, and real case studies showing the full stack from UI to database.",
      breadcrumbs: [{ name: "Home", path: "/" }, { name: "Roles", path: "/roles/" }, { name: "Full-Stack Engineer", path: "/roles/full-stack-engineer/" }],
    },
    "/contributions/": {
      seoTitle: "Open Source and Public Contribution Work",
      seoDescription:
        "Open-source and public contribution work by Bradley Matera — documentation fixes, issue reports, and community project involvement from Northwest Illinois.",
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
