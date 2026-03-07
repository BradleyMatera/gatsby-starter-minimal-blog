import * as React from "react";

type SkillCategoryProps = {
  icon: JSX.Element;
  title: string;
  children: React.ReactNode;
};

const SkillCategory = ({ icon, title, children }: SkillCategoryProps) => (
  <div className="skill-category">
    <div className="skill-category__glyph" aria-hidden="true">
      {icon}
    </div>
    <div>
      <h3 className="skill-category__title">{title}</h3>
      <div className="skill-category__content">{children}</div>
    </div>
  </div>
);

export default SkillCategory;
