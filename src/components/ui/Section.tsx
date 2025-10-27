import * as React from "react";
import cx from "../../utils/cx";

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
  let descriptionMarkup: React.ReactNode = null;

  if (description) {
    descriptionMarkup = description;
  }

  return (
    <section id={id} className={cx("section-shell", className)}>
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
