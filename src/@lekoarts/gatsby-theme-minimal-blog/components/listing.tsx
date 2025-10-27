/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import BlogCard from "../../../components/blog/BlogCard";

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
  sx?: Record<string, unknown>;
};

const Listing = ({ posts, className = "", showTags = true, id, sx }: ListingProps) => (
  <section className={className} id={id} sx={sx}>
    <div className="grid-two" sx={{ gap: `clamp(1.5rem, 2.5vw, 2.5rem)` }}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} showTags={showTags} />
      ))}
    </div>
  </section>
);

export default Listing;
