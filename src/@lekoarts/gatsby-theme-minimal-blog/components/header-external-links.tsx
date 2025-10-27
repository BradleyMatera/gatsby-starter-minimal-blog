import * as React from "react";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";

const iconMap: Record<string, JSX.Element> = {
  GitHub: (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 00-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34a2.65 2.65 0 00-1.1-1.45c-.9-.62.07-.61.07-.61a2.11 2.11 0 011.54 1.04 2.14 2.14 0 002.93.83 2.14 2.14 0 01.64-1.35c-2.22-.25-4.55-1.11-4.55-4.93a3.86 3.86 0 011-2.65 3.59 3.59 0 01.1-2.61s.84-.27 2.75 1a9.42 9.42 0 015 0c1.91-1.29 2.75-1 2.75-1a3.59 3.59 0 01.1 2.61 3.86 3.86 0 011 2.65c0 3.83-2.34 4.68-4.57 4.92a2.39 2.39 0 01.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0012 2z"
      />
    </svg>
  ),
  LinkedIn: (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.56c0-1.33 0-3.04-1.85-3.04s-2.13 1.44-2.13 2.94v5.66H9.34V9h3.41v1.56h.05a3.75 3.75 0 013.38-1.85c3.62 0 4.29 2.38 4.29 5.47v6.27zM5.34 7.43a2.07 2.07 0 112.07-2.07 2.07 2.07 0 01-2.07 2.07zM7.13 20.45H3.56V9h3.57z"
      />
    </svg>
  ),
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
