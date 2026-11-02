import * as React from "react";
import ResponsiveFilters from "./ResponsiveFilters";

type Heading = { id: string; text: string; level: number };

const ReadingLayout = ({ children, pageKey, className = "" }: React.PropsWithChildren<{ pageKey: string; className?: string }>) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = React.useState<Heading[]>([]);

  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const used = new Set<string>();
    const items = Array.from(content.querySelectorAll<HTMLHeadingElement>("h2, h3"))
      .filter((heading) => !heading.closest(".project-card, .project-collection, .editorial-figure, .post-footer-nav, .shopify-spotlight"))
      .map((heading, index) => {
        const section = heading.closest<HTMLElement>("section[id]");
        const text = heading.textContent?.trim() || "";
        let id = heading.id || (heading.tagName === "H2" ? section?.id : undefined);
        if (!id) {
          const base = `section-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || index}`;
          id = base;
          let suffix = 2;
          while (document.getElementById(id) || used.has(id)) id = `${base}-${suffix++}`;
          heading.id = id;
        }
        used.add(id);
        return { id, text, level: heading.tagName === "H3" ? 3 : 2 };
      }).filter((item) => item.text);
    setHeadings(content.querySelector(".inpage-nav") ? [] : items);
    const tables = Array.from(content.querySelectorAll<HTMLTableElement>("table"));
    const wrappers = tables.filter((table) => !table.parentElement?.classList.contains("editorial-table-scroll")).map((table) => {
      const wrapper = document.createElement("div");
      wrapper.className = "editorial-table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", table.caption?.textContent || "Scrollable table");
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      return wrapper;
    });
    const imageLinks = Array.from(content.querySelectorAll<HTMLImageElement>("img[alt]"))
      .filter((image) => image.alt && !image.closest("a, [aria-hidden='true'], .editorial-figure, .project-card") && (image.width >= 300 || Number(image.getAttribute("width")) >= 300))
      .map((image) => {
        const link = document.createElement("a");
        link.href = image.currentSrc || image.src;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "editorial-image-link";
        link.textContent = "View full-size image";
        link.setAttribute("aria-label", `View full-size image: ${image.alt}`);
        const target = image.closest("picture") || image;
        target.parentNode?.insertBefore(link, target.nextSibling);
        return link;
      });
    return () => {
      wrappers.forEach((wrapper) => wrapper.replaceWith(...Array.from(wrapper.childNodes)));
      imageLinks.forEach((link) => link.remove());
    };
  }, [pageKey]);

  return (
    <div className={`editorial-reading ${className}`}>
      {headings.length > 1 ? (
        <aside className="editorial-reading__contents">
          <ResponsiveFilters label="On this page" initiallyCollapsed={pageKey === "/about/"}>
            <nav aria-label="Table of contents">
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? "editorial-reading__nested" : undefined}>
                    <a href={`#${heading.id}`} onClick={() => {
                      const target = document.getElementById(heading.id);
                      if (target) {
                        target.tabIndex = -1;
                        target.focus({ preventScroll: true });
                      }
                    }}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </ResponsiveFilters>
        </aside>
      ) : null}
      <div ref={contentRef} className="editorial-reading__body">{children}</div>
    </div>
  );
};

export default ReadingLayout;
