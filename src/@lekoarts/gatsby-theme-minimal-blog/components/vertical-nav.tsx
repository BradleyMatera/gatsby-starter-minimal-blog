import * as React from "react";
import { Link } from "gatsby";
import { BrandLogo, ThemeToggle } from "../../../site/components";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "../../../site/icons";

type NavItem = { title: string; slug: string };
type VerticalNavProps = { nav: NavItem[] };

const secondaryLinks: NavItem[] = [
  { title: "Website demos", slug: "/demos/" },
  { title: "Service areas", slug: "/service-areas/" },
  { title: "Projects", slug: "/projects/" },
  { title: "Blog", slug: "/blog/" },
  { title: "Store", slug: "/store/" },
  { title: "Support", slug: "/support/" },
];

const VerticalNav = ({ nav }: VerticalNavProps) => {
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const primaryLinks = ["/services", "/work", "/pricing", "/about"].map((slug) =>
    nav.find((item) => item.slug.replace(/\/$/, "") === slug) || { title: slug.slice(1), slug }
  );
  const links = [...primaryLinks, { title: "Recruiter hub", slug: "/recruiter/" }];

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-brand" aria-label="Matera Digital — Home">
          <BrandLogo variant="mark" alt="" />
          <span>Matera Digital<small>by Bradley Matera</small></span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {links.map((item) => (
            <Link key={item.slug} to={item.slug} activeClassName="is-current" partiallyActive>
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <ThemeToggle />
          <Link className="site-header__contact" to="/contact/">Contact <ArrowRightIcon size={18} /></Link>
          <button ref={triggerRef} className="site-menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="site-mobile-menu" onClick={() => setOpen(true)}>
            <MenuIcon size={24} />
          </button>
        </div>
      </div>
      <dialog ref={dialogRef} id="site-mobile-menu" className="site-menu" aria-labelledby="site-menu-title" onCancel={close} onClose={() => { setOpen(false); triggerRef.current?.focus(); }}>
        <div className="site-menu__top">
          <h2 id="site-menu-title">Explore Matera Digital</h2>
          <button type="button" onClick={close} aria-label="Close menu"><CloseIcon size={24} /></button>
        </div>
        <nav aria-label="Mobile navigation" className="site-menu__primary">
          {[...links, { title: "Contact", slug: "/contact/" }].map((item) => (
            <Link key={item.slug} to={item.slug} activeClassName="is-current" partiallyActive onClick={close}>{item.title}<ArrowRightIcon size={22} /></Link>
          ))}
        </nav>
        <nav className="site-menu__secondary" aria-label="More pages">
          {secondaryLinks.map((item) => <Link key={item.slug} to={item.slug} onClick={close}>{item.title}</Link>)}
        </nav>
        <div className="site-menu__contact">
          <a href="mailto:bradmatera@gmail.com">bradmatera@gmail.com</a>
          <a href="tel:+16083135373">(608) 313-5373</a>
        </div>
      </dialog>
    </header>
  );
};

export default VerticalNav;
