import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import cx from "../../../utils/cx";

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
  const ariaExpanded = (open: boolean) => open ? 'true' : 'false';

  if (!nav || nav.length === 0) {
    return null;
  }

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
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
    const posts = data.allPost.nodes.filter((post: any) => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt?.toLowerCase().includes(searchLower) ||
      post.tags?.some((tag: any) => tag.name.toLowerCase().includes(searchLower))
    );

    const pages = data.allPage.nodes.filter((page: any) =>
      page.title.toLowerCase().includes(searchLower) ||
      page.excerpt?.toLowerCase().includes(searchLower)
    );

    const results = [
      ...posts.map((p: any) => ({ ...p, type: 'post' })),
      ...pages.map((p: any) => ({ 
        ...p, 
        type: p.slug.includes('/projects/') ? 'project' : 
              p.slug.includes('/roles/') ? 'role' : 'page' 
      }))
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
                className={cx("nav-dropdown", dropdownOpen && "nav-dropdown--open")}
                ref={dropdownRef}
              >
                <button
                  type="button"
                  className="nav-dropdown__button"
                  aria-haspopup="menu"
                  aria-expanded={ariaExpanded(dropdownOpen)}
                  aria-controls="roles-menu"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {item.title}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul id="roles-menu" role="menu" className="nav-dropdown__menu" data-open={dropdownOpen}>
                  {roleLinks.map((role) => (
                    <li key={role.slug} role="presentation">
                      <Link
                        to={role.slug}
                        role="menuitem"
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
                className={cx("nav-dropdown", themeDropdownOpen && "nav-dropdown--open")}
                ref={themeDropdownRef}
              >
                <button
                  type="button"
                  className="nav-dropdown__button"
                  aria-haspopup="menu"
                  aria-expanded={ariaExpanded(themeDropdownOpen)}
                  aria-controls="themes-menu"
                  onClick={() => setThemeDropdownOpen((open) => !open)}
                >
                  {item.title}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul id="themes-menu" role="menu" className="nav-dropdown__menu" data-open={themeDropdownOpen}>
                  {themeLinks.map((theme) => (
                    <li key={theme.slug} role="presentation">
                      <Link
                        to={theme.slug}
                        role="menuitem"
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
                {searchResults.map((result: any) => (
                  <li key={result.slug} role="option">
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
