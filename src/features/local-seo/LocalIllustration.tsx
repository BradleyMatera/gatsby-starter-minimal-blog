import * as React from "react";
import type { LocalIllustrationKind } from "./city-visuals";

type LocalIllustrationProps = {
  kind: LocalIllustrationKind;
  caption?: string;
  className?: string;
};

const LocalIllustration = ({ kind, caption, className = "" }: LocalIllustrationProps) => {
  const figure = React.useRef<HTMLElement>(null);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    const element = figure.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figure} className={`local-illustration local-illustration--${kind} ${className}`} data-entered={entered}>
      <div className="local-illustration__frame">
        <img src={`/package-images/local-${kind}-studio.svg`} alt="" loading="lazy" width={1200} height={800} />
        <span className="local-illustration__rule" aria-hidden="true" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default LocalIllustration;
