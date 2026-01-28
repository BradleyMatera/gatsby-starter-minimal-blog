import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import joinClasses from "../../../utils/joinClasses";

type NavigationItem = {
  title: string;
  slug: string;
};

type NavigationProps = {
  nav: NavigationItem[];
  roleLinks?: NavigationItem[];
  themeLinks?: NavigationItem[]; // Added for theme filtering
  isVisible?: boolean;
  onNavigate?: () => void;
  isCollapsible?: boolean;
};

const Navigation = ({
  nav,
  roleLinks = [],
  themeLinks = [], // Added
  isVisible = true,
  onNavigate,
  isCollapsible = false,
}: NavigationProps) => {
  if (!nav || nav.length === 0) {
    return null;
  }

  const { basePath } = useMinimalBlogConfig();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = React.useState(false); // Added for themes
  const dropdownRef = React.useRef<HTMLLIElement>(null);
  const themeDropdownRef = React.useRef<HTMLLIElement>(null); // Added

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (!isVisible) {
      setDropdownOpen(false);
      setThemeDropdownOpen(false);
    }
  }, [isVisible]);

  const ariaHidden = isCollapsible && !isVisible ? 'true' : undefined;
  const ariaHiddenValue = ariaHidden ? 'true' : undefined; // Omit if not true

  // Fix ARIA attributes to be strings
  type SearchResult = {
    title: string;
    slug: string;
    excerpt?: string | null;
    type: "post" | "page" | "project" | "role";
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const searchRef = React.useRef<HTMLLIElement>(null);

  const data = useStaticQuery(graphql`
    query SearchContent {
      allPost(sort: { date: DESC }) {
        nodes {
          title
          slug
          excerpt
          tags {
            name
          }
        }
      }
      allPage {
        nodes {
          title
          slug
          excerpt
        }
      }
    }
  `);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const searchLower = query.toLowerCase();
    type PostNode = {
      title: string;
      slug: string;
      excerpt?: string | null;
      tags?: Array<{ name: string }> | null;
    };

    const hiddenPostSlugs = new Set([
      "/making-triangle-webgpu-demo-match-reality",
      "/making-triangle-webgpu-demo-match-reality/",
      "/rebuilt-webgpu-triangle-demo",
      "/rebuilt-webgpu-triangle-demo/",
    ]);
    const posts = (data.allPost.nodes as PostNode[]).filter((post) =>
      !hiddenPostSlugs.has(post.slug) &&
      (post.title.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.tags?.some((tag) => tag.name.toLowerCase().includes(searchLower)))
    );

    type PageNode = {
      title: string;
      slug: string;
      excerpt?: string | null;
    };

    const pages = (data.allPage.nodes as PageNode[]).filter((page) =>
      page.title.toLowerCase().includes(searchLower) ||
      page.excerpt?.toLowerCase().includes(searchLower)
    );

    const results: SearchResult[] = [
      ...posts.map((post) => ({ ...post, type: "post" as const })),
      ...pages.map((page) => ({
        ...page,
        type: page.slug.includes("/projects/")
          ? ("project" as const)
          : page.slug.includes("/roles/")
          ? ("role" as const)
          : ("page" as const),
      })),
    ].slice(0, 8);

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    onNavigate?.();
  };

  const handleNavigate = () => {
    onNavigate?.();
    setDropdownOpen(false);
  };

  return (
    <nav role="navigation" aria-label="Primary" {...(ariaHiddenValue ? { 'aria-hidden': ariaHiddenValue } : {})}>
      <ul className="primary-nav" data-visible={isVisible}>
        {nav.map((item) => {
          const isRolesItem = item.slug === `/roles`;
          const isThemesItem = item.slug === `/themes`; // Added for themes

          if (isRolesItem && roleLinks.length > 0) {
            return (
              <li
                key={item.slug}
                className={joinClasses("nav-dropdown", dropdownOpen && "nav-dropdown--open")}
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="nav-dropdown__button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? "true" : "false"}
                  aria-controls="roles-menu"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {item.title}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul id="roles-menu" className="nav-dropdown__menu" data-open={dropdownOpen}>
                  {roleLinks.map((role) => (
                    <li key={role.slug}>
                      <Link
                        to={role.slug}
                        className="nav-dropdown__link"
                        activeClassName="is-active"
                        onClick={handleNavigate}
                      >
                        {role.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          if (isThemesItem && themeLinks.length > 0) {
            return (
              <li
                key={item.slug}
                className={joinClasses("nav-dropdown", themeDropdownOpen && "nav-dropdown--open")}
                ref={themeDropdownRef}
              >
                <button
                  type="button"
                  className="nav-dropdown__button"
                  aria-haspopup="true"
                  aria-expanded={themeDropdownOpen ? "true" : "false"}
                  aria-controls="themes-menu"
                  onClick={() => setThemeDropdownOpen((open) => !open)}
                >
                  {item.title}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul id="themes-menu" className="nav-dropdown__menu" data-open={themeDropdownOpen}>
                  {themeLinks.map((theme) => (
                    <li key={theme.slug}>
                      <Link
                        to={theme.slug}
                        className="nav-dropdown__link"
                        activeClassName="is-active"
                        onClick={handleNavigate}
                      >
                        {theme.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          const destination = replaceSlashes(`/${basePath}/${item.slug}`);

          return (
            <li key={item.slug}>
              <Link
                to={destination}
                className="primary-nav__link"
                activeClassName="is-active"
                onClick={handleNavigate}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
        {/* Added search input */}
        <li className="nav-search" ref={searchRef}>
          <input 
            type="search" 
            placeholder="Search..." 
            aria-label="Search site" 
            className="nav-search__input"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="search-results">
              <ul role="listbox" aria-label="Search results">
                {searchResults.map((result) => (
                  <li key={result.slug} role="option" aria-selected="false">
                    <Link 
                      to={result.slug} 
                      onClick={handleSearchResultClick}
                      className="search-result-item"
                    >
                      <span className="search-result-title">{result.title}</span>
                      <span className="search-result-type">{result.type}</span>
                      {result.excerpt && (
                        <span className="search-result-excerpt">
                          {result.excerpt.slice(0, 100)}...
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
