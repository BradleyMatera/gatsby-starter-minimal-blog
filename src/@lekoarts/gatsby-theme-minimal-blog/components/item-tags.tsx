import * as React from "react";
import { Link } from "gatsby";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";

type TagsProps = {
  tags: {
    name: string;
    slug: string;
  }[];
};

const ItemTags = ({ tags }: TagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-list" aria-label="Post tags">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          className="tag-badge"
          to={replaceSlashes(`/${basePath}/${tagsPath}/${tag.slug}`)}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
};

export default ItemTags;
