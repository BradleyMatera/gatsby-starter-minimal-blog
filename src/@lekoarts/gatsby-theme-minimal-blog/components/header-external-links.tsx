import * as React from "react";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "../../../components/visuals/icons";

const iconMap: Record<string, JSX.Element> = {
  GitHub: <GitHubIcon size={20} />,
  LinkedIn: <LinkedInIcon size={20} />,
  Twitter: <TwitterIcon size={20} />,
  YouTube: (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-1-2.8-.2-7-.2-7-.2h-.1s-4.2 0-7 .2c-.5.1-1.3.2-2 1-.6.6-.8 2.1-.8 2.1S2 9 2 10.7v1.5c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.8.2 6.8.2 6.8.2s4.2 0 7-.2c.5-.1 1.3-.1 2-1 .6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.5c0-1.7-.2-3.5-.2-3.5zM10 14.5v-5l4.8 2.5z"
      />
    </svg>
  ),
};

const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig();

  if (!externalLinks || externalLinks.length === 0) {
    return null;
  }

  return (
    <>
      {externalLinks.map((link) => {
        const icon = iconMap[link.name] ?? (
          <span aria-hidden="true" className="brand__subtitle">
            {link.name.charAt(0)}
          </span>
        );
        return (
          <a
            key={link.url}
            className="social-link"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icon}
            <span className="sr-only">{link.name}</span>
          </a>
        );
      })}
    </>
  );
};

export default HeaderExternalLinks;
