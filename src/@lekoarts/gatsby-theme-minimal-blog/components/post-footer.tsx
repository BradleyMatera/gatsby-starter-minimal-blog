import * as React from "react";
import { Link } from "gatsby";
import type { MBPostProps } from "./post";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";

const PostFooter = ({ post }: MBPostProps) => {
  const { basePath, blogPath, navigation } = useMinimalBlogConfig();
  const blogRoot = replaceSlashes(`/${basePath}/${blogPath}`);
  const projectsPath = navigation.find((item) => item.slug === "/projects")?.slug ?? "/projects";

  return (
    <footer className="post-footer-nav">
      <div>
        <h2 className="feature-card__title">Keep exploring</h2>
        <div className="card-actions">
          <Link data-variant="primary" to={blogRoot}>
            Back to blog
          </Link>
          <Link data-variant="ghost" to={replaceSlashes(`/${basePath}/${projectsPath}`)}>
            View projects
          </Link>
        </div>
      </div>
      <div>
        <p className="feature-card__body" style={{ marginBottom: "0.75rem" }}>
          Have thoughts about “{post.title}”? I’d love to hear them—reach out on LinkedIn or open a discussion on GitHub.
        </p>
        <div className="card-actions">
          <a
            data-variant="ghost"
            href="https://www.linkedin.com/in/bradmatera"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </a>
          <a
            data-variant="ghost"
            href="https://github.com/BradleyMatera"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub discussions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PostFooter;
