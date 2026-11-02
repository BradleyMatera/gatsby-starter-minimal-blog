import * as React from "react";
import type { HeadFC } from "gatsby";
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo";
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
import { ShopifySpotlight } from "../features/shopify";

const RecruiterPage = () => {
  return (
    <RecruiterLayout>
      <TrackableSection id="hero"><RecruiterHero /></TrackableSection>
      <TrackableSection id="projects"><ProjectExplorer /></TrackableSection>
      <TrackableSection id="skills"><SkillsExplorer /></TrackableSection>
      <TrackableSection id="roles"><RolesExplorer /></TrackableSection>
      <TrackableSection id="experience"><ExperienceTimeline /></TrackableSection>
      <TrackableSection id="aws"><AWSSection /></TrackableSection>
      <TrackableSection id="contributions"><ContributionsShowcase /></TrackableSection>
      <TrackableSection id="leadership"><LeadershipSection /></TrackableSection>
      <TrackableSection id="resources"><ResourceLibrary /></TrackableSection>
      <ShopifySpotlight context={{ path: "/recruiter/", intent: "interview-audio", title: "Interview audio equipment" }} placement="recruiter-resources" variant="compact" limit={2} />
      <TrackableSection id="interview"><InterviewResources /></TrackableSection>
      <TrackableSection id="certifications"><CertificationsWall /></TrackableSection>
      <TrackableSection id="writing"><TechnicalWriting /></TrackableSection>
      <TrackableSection id="why"><PrivacyBanner /><WhyThisExists /></TrackableSection>
      <TrackableSection id="faq"><RecruiterFAQ /></TrackableSection>
      <TrackableSection id="contact"><ContactCTA /></TrackableSection>
    </RecruiterLayout>
  );
};

export default RecruiterPage;

export const Head: HeadFC = () => {
  return (
    <Seo
      title="Recruiter Hub | Bradley Matera — Developer"
      description="A recruiter-focused view of Bradley Matera's background, finished work, experiments, certifications, and interview resources, with clear context around AI-assisted development."
      pathname="/recruiter/"
    />
  );
};
