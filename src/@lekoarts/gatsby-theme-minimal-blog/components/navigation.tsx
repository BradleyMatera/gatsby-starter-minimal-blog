import * as React from "react";
import { Link } from "gatsby";
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
  isVisible?: boolean;
  onNavigate?: () => void;
  isCollapsible?: boolean;
};

const Navigation = ({
  nav,
  roleLinks = [],
  isVisible = true,
  onNavigate,
  isCollapsible = false,
}: NavigationProps) => {
  const { basePath } = useMinimalBlogConfig();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (!isVisible) {
      setDropdownOpen(false);
    }
  }, [isVisible]);

  if (!nav || nav.length === 0) {
    return null;
  }

  const handleNavigate = () => {
    onNavigate?.();
    setDropdownOpen(false);
  };

  const ariaHidden = isCollapsible && !isVisible ? 'true' : undefined;

  return (
    <nav aria-label="Primary" aria-hidden={ariaHidden}>
      <ul className="primary-nav" data-visible={isVisible}>
        {nav.map((item) => {
          const isRolesItem = item.slug === `/roles`;

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
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {item.title}
                  <span aria-hidden="true">▼</span>
                </button>
                <ul className="nav-dropdown__menu" data-open={dropdownOpen}>
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
      </ul>
    </nav>
  );
};

export default Navigation;
