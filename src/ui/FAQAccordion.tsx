import * as React from "react";
type FAQItem = { question: string; answer: React.ReactNode };
type FAQAccordionProps = { items: FAQItem[]; title?: string; eyebrow?: string; id?: string };
const FAQAccordion = ({ items, title, eyebrow, id }: FAQAccordionProps) => (
  <section id={id} className="faq-accordion">
    {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
    {title ? <h2 className="section-title">{title}</h2> : null}
    <div className="faq-accordion__list">
      {items.map(item => <details className="faq-accordion__item" key={item.question}>
        <summary className="faq-accordion__button"><span className="faq-accordion__question">{item.question}</span><span className="faq-accordion__icon" aria-hidden="true">+</span></summary>
        <div className="faq-accordion__answer">{item.answer}</div>
      </details>)}
    </div>
  </section>
);
export default FAQAccordion;
