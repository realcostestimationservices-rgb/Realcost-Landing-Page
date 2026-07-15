import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQItem from '../components/ui/FAQItem';

const faqGroups = [
  {
    cat: 'Getting Started',
    items: [
      { q: 'Is Real Cost 100% cloud-based?', a: 'Yes. Real Cost is fully cloud-based — there is nothing to install or maintain. Unlike on-premises software, you can access your estimates from any location with an internet connection, allowing your team to collaborate in real time from the office, the field, or anywhere else.' },
      { q: 'Who is Real Cost designed for?', a: 'Real Cost is built exclusively for electrical contractors. Every feature — from the digital takeoff canvas to Canadian city-based pricing to the quote letter generator — is purpose-built for the way electrical estimators actually work.' },
      { q: 'Can I arrange a demo?', a: 'Yes, of course! Book a demo call with our product team and we will walk you through the full platform live. We can also help you determine which plan is right for your business. Click "Request Demo" in the navigation to get started.' },
      { q: 'How do I start using Real Cost?', a: 'Open the app and start your 14-day free trial — no credit card required. Upload a PDF drawing set, create a project, and your team can begin estimating right away. Most users are quoting their first job within minutes.' },
      { q: 'Can I upload PDF drawings and take off quantities directly?', a: 'Yes. Real Cost lets you upload PDF drawing sets and work directly on them in the app, so you can measure, price, and build your estimate in one place without switching between tools.' },
      { q: 'How long does it take to implement RealCost?', a: 'RealCost is designed for a fast and straightforward setup. Most customers can be up and running within a few days, depending on project requirements and data migration needs. Our team guides you through onboarding, account setup, and training to ensure a smooth transition with minimal disruption to your estimating workflow.' },
      { q: "I'm not great with technology. Can I still use this?", a: "Yes. If you can use WhatsApp, you can use this. It's designed for contractors, not tech experts. Most users can create their first estimate within minutes." },
      { q: 'Do I have to enter all my materials manually?', a: 'No. You can import your material lists, labor rates, and supplier pricing, or our team can help set everything up for you to get started quickly.' },
      { q: "What's the first step?", a: "Start with a free, no-obligation demo. We'll walk you through RealCost's estimating, takeoff, and project management features, answer your questions, and help determine the best setup for your business. You can explore the platform and see how it fits your workflow before making any commitment." },
      { q: 'Do I need training to use Real Cost?', a: 'No. Real Cost is designed to be intuitive for electrical estimators, but we also provide onboarding support and product guidance to help your team get comfortable quickly.' },
    ],
  },
  {
    cat: 'Why Real Cost',
    items: [
      { q: 'Why should I choose Real Cost?', a: 'Real Cost brings over 15 years of electrical estimation expertise directly into the platform. Our job-winning formulas and pre-built assemblies are the same ones used by the number one electrical estimation company in Canada. You get proven, field-tested tools — not generic software adapted from other industries.' },
      { q: 'How does Real Cost differ from other estimating software?', a: 'Real Cost was built by electrical estimators who experienced the frustrations of other software first-hand — the unnecessary complexity, hidden fees, and pricing models that punish growing teams. We designed Real Cost specifically to fix those problems: a clean workflow, transparent per-user pricing, and features that match how Canadian electrical contractors actually bid jobs.' },
      { q: 'Can you add extra assemblies based on our requirements?', a: 'Yes. If your team needs additional assemblies or custom estimating components, we can help tailor them to fit your workflow and project requirements. We will review your needs and confirm the best way to support them.' },
      { q: 'If we suggest a useful modification or improvement, can it be considered?', a: 'Yes. We welcome practical ideas and feature suggestions from our users. If a suggestion could improve the platform for your team, we are happy to review it and discuss whether it can be implemented.' },
      { q: 'How do I know Real Cost is the right choice for me?', a: 'Our pricing page shows exactly which features are included in each plan so you can match it to your business needs. Our product experts can also help you choose the right plan based on your team size and growth stage. Book a demo call to get the conversation started — no pressure, just answers.' },
      { q: 'Can Real Cost help my team work faster?', a: 'Yes. By simplifying takeoffs, pricing, and quoting in one platform, Real Cost helps estimators reduce manual work and move from drawings to quotes more efficiently.' },
      { q: "I'm already using another estimating software. Can I switch?", a: "Absolutely — and we have a plan specifically for contractors switching from other software. We'll help you get set up and running quickly so there's no disruption to your estimating workflow. Call us today at (647) 677-8399 and we'll walk you through it." },
    ],
  },
  {
    cat: 'Security & Data',
    items: [
      { q: 'Is my data safe?', a: 'Yes. Real Cost uses industry-standard encryption for all data in transit and at rest. Your estimates, drawings, and pricing data are stored securely in the cloud, backed up automatically, and never shared with third parties. You own your data at all times.' },
      { q: 'Who can see my pricing and estimate details?', a: 'Only you and the team members you explicitly invite. Your job details, material pricing, labour rates, and profit margins are completely private. We never share, sell, or access your data. Everything is encrypted and backed up daily.' },
      { q: 'Who can see my pricing and project details?', a: 'Only authorized users within your account can access your data. All project information, pricing, and estimates are securely stored, encrypted, and protected. We never share your data with third parties.' },
    ],
  },
  {
    cat: 'Billing & Trial',
    items: [
      { q: 'How does the 14-day free trial work?', a: "After signing up, you'll start a 14-day free trial with unrestricted access to all of RealCost's features. A free demonstration with a RealCost Trade Expert is available at any stage during the trial. Enter your billing details to continue using RealCost beyond the trial period." },
      { q: 'How long is the free trial?', a: '14 days with full access to all platform features. Your project data is always kept safe regardless of plan status.' },
      { q: 'Is there any commitment?', a: "RealCost allows you to pay-as-you-go and you're free to end your subscription whenever you like. We don't subject you to any lock-in contracts or hidden fees." },
      { q: 'What payment methods are accepted?', a: 'Visa, Mastercard, and major debit cards via Stripe. All transactions are encrypted and processed securely.' },
      { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time, and we will make sure you understand what happens to your account and project data before your plan changes.' },
      { q: 'How do I get support?', a: 'Call us at (647) 677-8399, email care@realcost.ca, or use the live chat on this site. Subscribers receive priority support with same-day response for urgent issues, plus access to video tutorials and onboarding guides.' },
    ],
  },
];

const IconCalendarCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" /><path d="M3 9.5h18M8 2.5v4M16 2.5v4M8.5 15l2.4 2.4 4.6-4.8" />
  </svg>
);
const IconCardOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19M6 14.5h3" /><path d="M3.5 20.5 20.5 3.5" />
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6" /><path d="M8.2 14.2 6.5 22l5.5-3.3L17.5 22l-1.7-7.8" />
  </svg>
);
const IconHeadset = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" /><path d="M20 13v4a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2Z" /><path d="M18 19a4 4 0 0 1-4 3h-2" />
  </svg>
);

const stats = [
  { val: '14 Days',  label: 'Free trial, full access', ico: <IconCalendarCheck />, tone: 'accent' },
  { val: 'No Card',  label: 'Required to start',       ico: <IconCardOff />,       tone: 'navy' },
  { val: 'Same Day', label: 'Support response',        ico: <IconHeadset />,       tone: 'navy' },
];

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" />
  </svg>
);

const tabs = ['All', ...faqGroups.map(g => g.cat)];
const totalFaqs = faqGroups.reduce((n, g) => n + g.items.length, 0);

const FAQ = ({ onNavigate }) => {
  const [openKey, setOpenKey] = useState(null);
  const [activeCat, setActiveCat] = useState('All');
  const [query, setQuery] = useState('');

  const term = query.trim().toLowerCase();
  const matches = item =>
    !term || item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term);

  const visibleGroups = faqGroups
    .filter(g => activeCat === 'All' || g.cat === activeCat)
    .map(g => ({ ...g, items: g.items.filter(matches) }))
    .filter(g => g.items.length > 0);

  const resultCount = visibleGroups.reduce((n, g) => n + g.items.length, 0);

  const tabCount = cat =>
    cat === 'All'
      ? faqGroups.reduce((n, g) => n + g.items.filter(matches).length, 0)
      : faqGroups.find(g => g.cat === cat).items.filter(matches).length;

  const reset = () => { setOpenKey(null); };

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/our_bg.png'})` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(105deg,rgba(10,20,40,.52) 0%,rgba(10,20,40,.32) 34%,transparent 62%)' }} />
        <div className="hero-glow" />
        <div className="cxl" style={{ textAlign: 'left' }}>
          <motion.div
            style={{ maxWidth: '600px' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pg-badge">FAQ</div>
            <div className="ph-title">Frequently Asked<br />Questions</div>
            <p className="sec-sub" style={{ margin: '0 0 32px' }}>
              Everything you need to know about Real Cost — from getting started to billing, security, and why we're different.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">Start Free Trial →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('contact')}>Contact us</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="faq-stats-band">
        <div className="cxl">
          <div className="faq-stats-grid">
            {stats.map(({ val, label, ico, tone }, i) => (
              <motion.div
                key={val}
                className={`faq-stat ${tone}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="faq-stat-ico">{ico}</div>
                <div className="faq-stat-txt">
                  <div className="faq-stat-val">{val}</div>
                  <div className="faq-stat-label">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ Body ── */}
      <section style={{ background: '#F8F9FC', padding: '80px 0 100px' }}>
        <div className="cxl" style={{ maxWidth: '880px' }}>

          {/* Section heading */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.18em', color: '#2563EB', marginBottom: '12px' }}>
              Common Questions
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#112646', letterSpacing: '-1px', margin: '0 0 14px' }}>
              Got questions? We've got answers.
            </h2>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.7', margin: 0, fontWeight: '300' }}>
              Search all {totalFaqs} questions, or filter by topic.
            </p>
          </div>

          {/* Search + category filter */}
          <div className="faq-toolbar">
            <div className="faq-search">
              <IconSearch />
              <input
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); reset(); }}
                placeholder="Search questions…"
                aria-label="Search frequently asked questions"
              />
              {query && (
                <button type="button" className="faq-search-clear" onClick={() => { setQuery(''); reset(); }} aria-label="Clear search">
                  ×
                </button>
              )}
            </div>
            <div className="faq-tabs" role="tablist">
              {tabs.map(cat => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === cat}
                  className={`faq-tab ${activeCat === cat ? 'active' : ''}`}
                  onClick={() => { setActiveCat(cat); reset(); }}
                >
                  {cat}
                  <span className="faq-tab-n">{tabCount(cat)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accordion — grouped by category */}
          {resultCount === 0 ? (
            <div className="faq-empty">
              <div className="faq-empty-t">No questions match “{query}”.</div>
              <div className="faq-empty-s">
                Try a different keyword, or{' '}
                <button type="button" onClick={() => onNavigate('contact')}>ask us directly</button>.
              </div>
            </div>
          ) : (
            visibleGroups.map(group => (
              <div className="faq-group" key={group.cat}>
                <div className="faq-cat">
                  <span>{group.cat}</span>
                  <span className="faq-cat-n">{group.items.length}</span>
                </div>
                <div className="faq-list">
                  {group.items.map((item, i) => (
                    <FAQItem
                      key={item.q}
                      index={i + 1}
                      question={item.q}
                      answer={item.a}
                      isOpen={openKey === item.q}
                      onToggle={() => setOpenKey(prev => (prev === item.q ? null : item.q))}
                    />
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Still have questions inline card */}
          <div style={{ marginTop: '48px', background: '#fff', border: '1px solid #E4E9F2', borderRadius: '16px', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', boxShadow: '0 2px 12px rgba(15,37,87,.06)' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#112646', marginBottom: '6px' }}>Still have questions?</div>
              <div style={{ fontSize: '13px', color: '#888', fontWeight: '300' }}>Our team responds the same day on business days — no bots, no queues.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('contact')} style={{ padding: '11px 24px', borderRadius: '10px', border: 'none', background: '#112646', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Contact us →
              </motion.button>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="tel:6476778399" style={{ padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #E0E6F0', background: '#fff', color: '#112646', fontSize: '13px', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                (647) 677-8399
              </motion.a>
            </div>
          </div>

        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#0B1629', padding: '80px 0' }}>
        <div className="cxl" style={{ textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.18em', color: '#2563EB', marginBottom: '16px' }}>
              Premium support included
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', letterSpacing: '-1px', marginBottom: '14px' }}>
              Ready to start estimating smarter?
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.50)', maxWidth: '400px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
              14-day free trial. Every feature included. No credit card required.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">Start Free Trial →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('contact')}>Talk to us</motion.button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
