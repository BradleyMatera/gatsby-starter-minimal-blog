import * as React from "react";
import { useReducedMotion } from "../utils/useReducedMotion";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQAccordionProps = {
  items: FAQItem[];
  title?: string;
  eyebrow?: string;
  id?: string;
};

const FAQAccordion = ({ items, title, eyebrow, id }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(index);
    }
    if (event.key === "Escape" && openIndex === index) {
      setOpenIndex(null);
    }
  };

  return (
    <section id={id} className="faq-accordion section-shell reveal-card is-revealed">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      <div className="faq-accordion__list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={index} className="faq-accordion__item">
              <h3 className="faq-accordion__heading">
                <button
                  id={buttonId}
                  className="faq-accordion__button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="button"
                >
                  <span className="faq-accordion__question">{item.question}</span>
                  <span className="faq-accordion__icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                className="faq-accordion__panel"
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                style={
                  isOpen
                    ? undefined
                    : reducedMotion
                    ? { display: "none" }
                    : { display: "none" }
                }
              >
                <div className="faq-accordion__answer">{item.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
