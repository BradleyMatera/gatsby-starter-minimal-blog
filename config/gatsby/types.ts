export interface PostTag {
  name: string;
  slug: string;
}

export interface PostNode {
  slug: string;
  title: string;
  defer: boolean;
  date: string;
  excerpt: string;
  contentFilePath: string;
  html: string;
  timeToRead: number;
  wordCount: number;
  tags: Array<PostTag>;
  banner: unknown;
  description: string;
  canonicalUrl: string;
}

export interface AllPostQueryResult {
  nodes: Array<PostNode>;
}

export interface SiteMetadataShape {
  siteTitle: string;
  siteTitleAlt: string;
  siteHeadline: string;
  siteUrl: string;
  siteDescription: string;
  siteImage: string;
  siteLanguage: string;
  author: string;
}
