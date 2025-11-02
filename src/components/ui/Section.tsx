import * as React from "react";
import cx from "../../utils/cx";
import { useScrollReveal } from "../home/useScrollReveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  titleAs?: keyof JSX.IntrinsicElements;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const Section = ({
  id,
  eyebrow,
  title,
  description,
  titleAs: TitleTag = "h2",
  actions,
  className,
  children,
}: SectionProps) => {
  const { ref, revealed } = useScrollReveal(0);
  let descriptionMarkup: React.ReactNode = null;

  if (description) {
    descriptionMarkup = description;
  }

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cx("section-shell", className)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s cubic-bezier(.22,.9,.2,1), transform 0.7s cubic-bezier(.22,.9,.2,1)",
      }}
    >
      {(eyebrow || title || description || actions) && (
        <header className="section-shell__header">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? <TitleTag className="section-title">{title}</TitleTag> : null}
          {descriptionMarkup}
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </header>
      )}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section;
