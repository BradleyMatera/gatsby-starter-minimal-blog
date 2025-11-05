import * as React from "react";
import cx from "../../utils/cx";
import { useScrollReveal } from "../home/useScrollReveal";

type SectionProps = {
  id?: string;
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  titleAs?: keyof JSX.IntrinsicElements;
  actions?: React.ReactNode;
  className?: string;
  disableReveal?: boolean;
  revealDelay?: number;
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
  disableReveal = false,
  revealDelay = 0,
  children,
}: SectionProps) => {
  const { ref, revealed } = useScrollReveal(revealDelay);
  const isVisible = disableReveal || revealed;
  const sectionClassName = cx(
    "section-shell",
    disableReveal ? undefined : "reveal-card",
    className,
    isVisible ? "is-revealed" : undefined
  );
  let descriptionMarkup: React.ReactNode = null;

  if (description) {
    descriptionMarkup = description;
  }

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={sectionClassName}
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
