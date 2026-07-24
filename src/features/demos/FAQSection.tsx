import * as React from "react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, title = "Frequently Asked Questions" }) => (
  <section className="demo-section demo-section--alt">
    <div className="demo-section__inner">
      <h2 className="demo-section__title">{title}</h2>
      <div className="demo-faq">
        {faqs.map((f, i) => (
          <div key={i} className="demo-faq__item">
            <h3 className="demo-faq__question">{f.q}</h3>
            <p className="demo-faq__answer">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
