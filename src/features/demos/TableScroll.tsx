import * as React from "react";
import "./table-scroll.css";

const TableScroll: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  const id = React.useId();
  const viewport = React.useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = React.useState(false);
  React.useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const measure = () => setOverflow(node.scrollWidth > node.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (node.firstElementChild) observer.observe(node.firstElementChild);
    return () => observer.disconnect();
  }, []);
  return <div className="table-scroll">
    {overflow && <div className="table-scroll__controls" role="group" aria-label={`${label} horizontal scroll`}><span>More columns are available.</span><button type="button" aria-controls={id} onClick={() => viewport.current?.scrollBy({ left: -280 })}>Scroll left</button><button type="button" aria-controls={id} onClick={() => viewport.current?.scrollBy({ left: 280 })}>Scroll right</button></div>}
    <div ref={viewport} id={id} role="region" aria-label={label} className="table-scroll__viewport">{children}</div>
  </div>;
};

export default TableScroll;
