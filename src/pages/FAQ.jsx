import React, { useState } from 'react';
import FAQItem from '../components/ui/FAQItem';

const faqGroups = [
  {
    cat: 'Getting started',
    items: [
      { q: 'What is Real Cost and who is it for?', a: "Real Cost is a digital estimation platform for trade contractors. It lets your team upload PDF drawings, count symbols, build a full bid, and generate a professional quote letter — all without spreadsheets or outsourcing. It's designed for electrical, mechanical, plumbing, fire alarm, and other trade contractors across Canada." },
      { q: 'How do I start using Real Cost?', a: 'Open the app at the link on this page. Start your 14-day free trial — no credit card required. Upload a PDF drawing set, create a project, and your team can begin estimating immediately.' },
      { q: 'What file types can I upload?', a: 'You can upload multi-page PDF drawing sets. The platform renders each page on a navigable digital takeoff canvas. Most standard architectural and engineering drawing exports work directly.' },
      { q: 'Which trades are supported?', a: 'Real Cost supports electrical, mechanical/HVAC, plumbing, fire alarm, voice & data, security systems, audio/visual, heat tracing, and mechanical control. More trades are added regularly.' },
    ],
  },
  {
    cat: 'Features & platform',
    items: [
      { q: 'How does symbol auto-count work?', a: 'Draw a rectangle around any reference symbol on a drawing — a light fixture, outlet, smoke detector, etc. The platform uses pattern matching to find and count all identical symbols across every page of the project drawings, instantly.' },
      { q: 'What is the Bid Page?', a: 'The Bid Page is where your estimate comes together. Once takeoff is done, it auto-calculates material costs, labour hours, overhead percentage, markup, and project duration for different crew sizes. All figures update live as you make changes.' },
      { q: 'What is Canadian city-based pricing?', a: "Material rates in Real Cost automatically adjust based on your city's regional pricing tier. L1, L2, and L3 tiers cover cities including Quebec, Ottawa, Toronto, Montreal, Calgary, and Vancouver. This ensures your estimates reflect local market costs without manual adjustments." },
      { q: 'How does the quote letter generator work?', a: 'Once your bid is complete, one click generates a professional branded PDF or Word quote letter ready to send to your client. It includes all project details, scope summary, and your total bid price in a clean, professional format.' },
      { q: 'Can my whole team use it?', a: 'Yes. Real Cost supports team accounts with owner and estimator roles. As the owner you can assign projects to sub-estimators, track their progress, and manage the team subscription from one dashboard. Each user is billed at $10/month or $80/year.' },
    ],
  },
  {
    cat: 'Billing & support',
    items: [
      { q: 'How long is the free trial?', a: 'The free trial is 14 days with full access to all platform features — no credit card required. At the end of the trial you can subscribe monthly ($10/user/month) or annually ($80/user/year, save 33%). Your data is always safe.' },
      { q: 'What payment methods are accepted?', a: 'Visa, Mastercard, and major debit cards via Stripe. All transactions are encrypted and secure.' },
      { q: 'How do I get support?', a: 'Phone support at (647) 677-8399, email at info@realcostestimating.ca, and live chat on this site. Subscribers get access to video tutorials and priority support with same-day response for urgent issues.' },
    ],
  },
];

// flatten for stable open-index keys
const flatItems = faqGroups.flatMap((g) => g.items);

const FAQ = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + ''})` }}></div>
        <div className="cxl">
          <div className="pg-badge">FAQ</div>
          <div className="ph-title">Frequently asked questions</div>
          <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto 44px' }}>Everything you need to know about the Real Cost estimation platform.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            <span className="ph-chip">🚀 Getting started</span>
            <span className="ph-chip">🔍 Features &amp; platform</span>
            <span className="ph-chip">💳 Billing &amp; support</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Open the App →</a>
            <button className="btn-ghost" onClick={() => onNavigate('contact')}>Still have questions?</button>
          </div>
        </div>
      </section>
      <section className="sec-grey">
        <div className="cxl" style={{ maxWidth: '860px' }}>
          {faqGroups.map((group) => (
            <React.Fragment key={group.cat}>
              <div className="faq-cat">{group.cat}</div>
              {group.items.map((item) => {
                const idx = flatItems.indexOf(item);
                return (
                  <FAQItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === idx}
                    onToggle={() => toggle(idx)}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="sec-light">
        <div className="cxl" style={{ textAlign: 'center' }}>
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Still have questions?</div>
          <div className="sec-h2">We're happy to walk you through it.</div>
          <p className="sec-sub" style={{ maxWidth: '420px', margin: '0 auto 32px' }}>Our team responds within hours on business days.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-prim" onClick={() => onNavigate('contact')}>Contact us →</button>
            <a href="tel:6476778399" className="btn-ol-blue">📞 (647) 677-8399</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
