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
  TrackableSection,
} from "../features/recruiter/components";
import "../styles/recruiter.css";

const RecruiterPage = () => {
  return (
    <RecruiterLayout>
      <TrackableSection id="hero"><RecruiterHero /></TrackableSection>
      <TrackableSection id="why"><PrivacyBanner /><WhyThisExists /></TrackableSection>
      <TrackableSection id="roles"><RolesExplorer /></TrackableSection>
      <TrackableSection id="contributions"><ContributionsShowcase /></TrackableSection>
      <TrackableSection id="resources"><ResourceLibrary /></TrackableSection>
      <TrackableSection id="experience"><ExperienceTimeline /></TrackableSection>
      <TrackableSection id="projects"><ProjectExplorer /></TrackableSection>
      <TrackableSection id="skills"><SkillsExplorer /></TrackableSection>
      <TrackableSection id="aws"><AWSSection /></TrackableSection>
      <TrackableSection id="certifications"><CertificationsWall /></TrackableSection>
      <TrackableSection id="writing"><TechnicalWriting /></TrackableSection>
      <TrackableSection id="faq"><RecruiterFAQ /></TrackableSection>
      <TrackableSection id="leadership"><LeadershipSection /></TrackableSection>
      <TrackableSection id="contact"><ContactCTA /></TrackableSection>
      <TrackableSection id="interview"><InterviewResources /></TrackableSection>
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
