import * as React from "react";
import cx from "../../../utils/cx";

type TitleProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  kicker?: string;
  children?: React.ReactNode;
};

const Title = ({ text, as: HeadingTag = "h2", className, kicker, children }: TitleProps) => (
  <div className={cx("section-header-inline", className)}>
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
