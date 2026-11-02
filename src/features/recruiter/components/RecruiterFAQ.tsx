import * as React from "react";

/* --------------------------------------------------------------------------
   Recruiter FAQ — Answers to every common recruiter question.
   -------------------------------------------------------------------------- */

type FAQ = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: FAQ[] = [
  {
    question: "Can you relocate?",
    answer:
      "I am open to relocation for the right role, especially for positions in the Midwest, Pacific Northwest, or remote-first companies. I am based in Davis, Illinois and can work remotely from anywhere with reliable internet.",
  },
  {
    question: "What are your salary expectations?",
    answer:
      "Competitive for the role and location. I prioritize growth opportunities, interesting problems, and team culture alongside compensation. Happy to discuss specifics in a conversation.",
  },
  {
    question: "Remote, hybrid, or on-site?",
    answer:
      "I thrive in remote and hybrid environments. My AWS internship was remote, and my freelance work is entirely remote. I am also open to hybrid arrangements with occasional on-site collaboration.",
  },
  {
    question: "How much AWS experience do you have?",
    answer:
      "AWS Solutions Architect Associate certified (July 2025) and AWS Certified AI Practitioner (August 2025). During my AWS internship, I worked with Lambda, DynamoDB, S3, Amplify, and CloudFront. The support rotations were guided training environments with no customer data.",
  },
  {
    question: "Tell me about your military background.",
    answer:
      "I served as a Healthcare Specialist in the U.S. Army from June 2011 to April 2014. I provided medical support in training environments and combat zones. That experience taught me calm under pressure, attention to detail, adaptability, and reliability.",
  },
  {
    question: "What is your education?",
    answer:
      "Bachelor of Science in Web Development from Full Sail University, graduated October 30, 2025. The program covered JavaScript, React, Node.js, SQL, and project-based development. I also hold two AWS certifications and two freeCodeCamp certifications.",
  },
  {
    question: "What is your availability?",
    answer:
      "I can start immediately for freelance and contract work. For full-time roles, I am typically available within 2-3 weeks notice depending on current commitments.",
  },
  {
    question: "What is your primary tech stack?",
    answer:
      "JavaScript, React, TypeScript, Node.js, HTML, and CSS. I also work with SQL, AWS services (Lambda, DynamoDB, S3, Amplify), Docker Compose for local development, GitHub for version control, and AI-assisted tools for debugging and learning.",
  },
  {
    question: "Do you have leadership experience?",
    answer:
      "My Army experience as a Healthcare Specialist involved responsibility and teamwork in high-stakes situations. At Mason County Kitten Rescue, I trained new volunteers. At CIRIS Ethical AI, I improved onboarding docs and contributed code in a tracked, transparent way.",
  },
  {
    question: "Are you open to contract or freelance work?",
    answer:
      "Absolutely. My CIRIS Ethical AI work was freelance, and I am open to both short-term engagements and long-term contracts alongside full-time opportunities.",
  },
];

const RecruiterFAQ: React.FC = () => (
  <section id="recruiter-faq" className="recruiter-section" aria-labelledby="recruiter-faq-heading">
    <div className="recruiter-section__header"><span className="recruiter-section__eyebrow">FAQ</span><h2 id="recruiter-faq-heading" className="recruiter-section__title">Recruiter <span className="recruiter-title-accent">Questions</span>, Answered</h2><p className="recruiter-section__subtitle">Every common question, answered upfront. No need to email back and forth.</p></div>
    <div className="recruiter-faq-list">{FAQS.map((faq) => <details key={faq.question} className="recruiter-details recruiter-faq__item"><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
  </section>
);

export default RecruiterFAQ;
