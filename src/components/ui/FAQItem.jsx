import React from 'react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={onToggle}>
      <div className="faq-q">
        <span className="faq-qt">{question}</span>
        <div className={`faq-icon ${isOpen ? 'open' : ''}`}>{isOpen ? '−' : '+'}</div>
      </div>
      <div className={`faq-a ${isOpen ? 'open' : ''}`}>{answer}</div>
    </div>
  );
};

export default FAQItem;
