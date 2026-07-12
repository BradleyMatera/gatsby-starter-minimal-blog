import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
import useSiteMetadata from "../@lekoarts/gatsby-theme-minimal-blog/hooks/use-site-metadata";
import {
  RecruiterLayout,
  RecruiterHero,
  WhyThisExists,
  ResourceLibrary,
  ExperienceTimeline,
  ProjectExplorer,
  SkillsExplorer,
  AWSSection,
  CertificationsWall,
  TechnicalWriting,
  LeadershipSection,
  InterviewResources,
  RecruiterFAQ,
  ContactCTA,
  PrivacyBanner,
  RolesExplorer,
  ContributionsShowcase,
} from "../features/recruiter/components";
import "../styles/recruiter.css";

const RecruiterPage = () => {
  return (
    <RecruiterLayout>
      <RecruiterHero />
      <PrivacyBanner />
      <WhyThisExists />
      <RolesExplorer />
      <ContributionsShowcase />
      <ResourceLibrary />
      <ExperienceTimeline />
      <ProjectExplorer />
      <SkillsExplorer />
      <AWSSection />
      <CertificationsWall />
      <TechnicalWriting />
      <RecruiterFAQ />
      <LeadershipSection />
      <ContactCTA />
      <InterviewResources />
    </RecruiterLayout>
  );
};

export default RecruiterPage;

export const Head: HeadFC = () => {
  const { siteUrl } = useSiteMetadata();
  return (
    <Seo
      title="Recruiter Hub | Bradley Matera — Junior Software Engineer"
      description="Everything a recruiter needs. Resume, projects, certifications, experience timeline, and interview resources — all in one curated experience designed for hiring teams."
      pathname="/recruiter/"
    >
      <link rel="canonical" href={`${siteUrl}/recruiter/`} />
      <meta name="robots" content="index, follow" />
    </Seo>
  );
};
