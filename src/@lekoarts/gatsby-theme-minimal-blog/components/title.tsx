import * as React from "react";
import joinClasses from "../../../utils/joinClasses";

type TitleProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  kicker?: string;
  children?: React.ReactNode;
};

const Title = ({ text, as: HeadingTag = "h2", className, kicker, children }: TitleProps) => (
  <div className={joinClasses("section-header-inline", className)}>
    <div>
      {kicker ? <span className="eyebrow">{kicker}</span> : null}
      <HeadingTag className="section-title" style={{ marginBottom: 0 }}>
        {text}
      </HeadingTag>
    </div>
    {children ? <div className="hero-actions">{children}</div> : null}
  </div>
);

export default Title;
