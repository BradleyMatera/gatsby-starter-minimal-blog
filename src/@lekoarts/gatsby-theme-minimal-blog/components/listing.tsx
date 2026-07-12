/** @jsx jsx */
// Gatsby theme shadow helper: delegates actual card rendering to src/features/blog.
import { jsx, type ThemeUIStyleObject } from "theme-ui";
import * as React from "react";
import { BlogCard } from "../../../features/blog/components";

type ListingProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  className?: string;
  showTags?: boolean;
  id?: string;
  sx?: ThemeUIStyleObject;
};

const Listing = ({ posts, className = "", showTags = true, id, sx }: ListingProps) => (
  <section className={className} id={id} sx={sx}>
    <div className={`grid-two u-section-gap ${className ? `${className}__inner` : ""}`}>
      {posts.map((post, index) => (
        <BlogCard key={post.slug} post={post} showTags={showTags} featured={index === 0} />
      ))}
    </div>
  </section>
);

export default Listing;
