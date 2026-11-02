import * as React from "react";

const DemoNavigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const button = React.useRef<HTMLButtonElement>(null);
  const container = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); button.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!container.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <div ref={container} className="demo-navigation">
    <button ref={button} className="demo-navigation__toggle" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{open ? "Close menu" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <div id={id} className={`flagship-nav__links${open ? " is-open" : ""}`}>{React.Children.map(children, (child) => React.isValidElement<{ onClick?: React.MouseEventHandler }>(child) && child.type === "a" ? React.cloneElement(child, { onClick: (event: React.MouseEvent) => { child.props.onClick?.(event); setOpen(false); } }) : child)}</div>
  </div>;
};

export default DemoNavigation;
