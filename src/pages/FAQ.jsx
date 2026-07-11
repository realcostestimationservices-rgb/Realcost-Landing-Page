import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FAQItem from '../components/ui/FAQItem';
import { Reveal, RevealGroup } from '../components/ui/Reveal';

const faqGroups = [
  {
    cat: 'Getting Started',
    icon: '🚀',
    items: [
      { q: 'Is Real Cost 100% cloud-based?', a: 'Yes. Real Cost is fully cloud-based — there is nothing to install or maintain. Unlike on-premises software, you can access your estimates from any location with an internet connection, allowing your team to collaborate in real time from the office, the field, or anywhere else.' },
      { q: 'Who is Real Cost designed for?', a: 'Real Cost is built exclusively for electrical contractors. Every feature — from the digital takeoff canvas to Canadian city-based pricing to the quote letter generator — is purpose-built for the way electrical estimators actually work.' },
      { q: 'Can I arrange a demo?', a: 'Yes, of course! Book a demo call with our product team and we will walk you through the full platform live. We can also help you determine which plan is right for your business. Click "Request Demo" in the navigation to get started.' },
      { q: 'How do I start using Real Cost?', a: 'Open the app and start your 14-day free trial — no credit card required. Upload a PDF drawing set, create a project, and your team can begin estimating right away. Most users are quoting their first job within minutes.' },
    ],
  },
  {
    cat: 'Why Real Cost',
    icon: '⭐',
    items: [
      { q: 'Why should I choose Real Cost?', a: 'Real Cost brings over 15 years of electrical estimation expertise directly into the platform. Our job-winning formulas and pre-built assemblies are the same ones used by the number one electrical estimation company in Canada. You get proven, field-tested tools — not generic software adapted from other industries.' },
      { q: 'How does Real Cost differ from other estimating software?', a: 'Real Cost was built by electrical estimators who experienced the frustrations of other software first-hand — the unnecessary complexity, hidden fees, and pricing models that punish growing teams. We designed Real Cost specifically to fix those problems: a clean workflow, transparent per-user pricing, and features that match how Canadian electrical contractors actually bid jobs.' },
      { q: 'How do I know Real Cost is the right choice for me?', a: 'Our pricing page shows exactly which features are included in each plan so you can match it to your business needs. Our product experts can also help you choose the right plan based on your team size and growth stage. Book a demo call to get the conversation started — no pressure, just answers.' },
      { q: "I'm already using another estimating software. Can I switch?", a: "Absolutely — and we have a plan specifically for contractors switching from other software. We'll help you get set up and running quickly so there's no disruption to your estimating workflow. Call us today at (647) 677-8399 and we'll walk you through it." },
    ],
  },
  {
    cat: 'Security & Data',
    icon: '🔒',
    items: [
      { q: 'Is my data safe?', a: 'Yes. Real Cost uses industry-standard encryption for all data in transit and at rest. Your estimates, drawings, and pricing data are stored securely in the cloud, backed up automatically, and never shared with third parties. You own your data at all times.' },
      { q: 'Who can see my pricing and estimate details?', a: 'Only you and the team members you explicitly invite. Your job details, material pricing, labour rates, and profit margins are completely private. We never share, sell, or access your data. Everything is encrypted and backed up daily.' },
    ],
  },
  {
    cat: 'Billing & Trial',
    icon: '💳',
    items: [
      { q: 'How does the free trial work?', a: "Sign up and you're in. You get full access to every feature for 14 days — completely free. No payment details required, no catches. If Real Cost is not the right fit, just don't continue. Your data remains accessible for 30 days after the trial ends." },
      { q: 'How long is the free trial?', a: '14 days with full access to all platform features. After the trial, subscribe monthly at $10/user/month or annually at $80/user/year (save 33%). Your project data is always kept safe regardless of plan status.' },
      { q: 'What payment methods are accepted?', a: 'Visa, Mastercard, and major debit cards via Stripe. All transactions are encrypted and processed securely.' },
      { q: 'How do I get support?', a: 'Call us at (647) 677-8399, email care@realcost.ca, or use the live chat on this site. Subscribers receive priority support with same-day response for urgent issues, plus access to video tutorials and onboarding guides.' },
    ],
  },
];

const stats = [
  { val: '14 Days', label: 'Free trial, full access' },
  { val: 'No Card', label: 'Required to start' },
  { val: '15+ Yrs', label: 'Estimation expertise' },
  { val: 'Same Day', label: 'Support response' },
];

const FAQ = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCat, setActiveCat] = useState(faqGroups[0].cat);

  const activeGroup = faqGroups.find(g => g.cat === activeCat);

  const handleCat = (cat) => {
    setActiveCat(cat);
    setOpenIndex(null);
  };

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/our_bg.png'})` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(105deg,rgba(10,20,40,.97) 0%,rgba(15,37,87,.93) 45%,rgba(15,37,87,.55) 70%,transparent 100%)' }} />
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
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Start Free Trial →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('contact')}>Contact us</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E8EEF8' }}>
        <div className="cxl">
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {stats.map(({ val, label }, i) => (
              <div key={i} style={{ padding: '26px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid #E8EEF8' : 'none' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#112646', letterSpacing: '-.4px', marginBottom: '3px' }}>{val}</div>
                <div style={{ fontSize: '12px', color: '#999', fontWeight: '400' }}>{label}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* ── FAQ Body ── */}
      <section style={{ background: '#F8F9FC', padding: '80px 0 100px' }}>
        <div className="cxl" style={{ maxWidth: '860px' }}>

          {/* Section heading */}
          <Reveal style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.18em', color: '#C5A047', marginBottom: '12px' }}>
              Common Questions
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#112646', letterSpacing: '-1px', margin: '0 0 14px' }}>
              Got questions? We've got answers.
            </h2>
            <p style={{ fontSize: '15px', color: '#888', lineHeight: '1.7', margin: 0, fontWeight: '300' }}>
              Browse by category or scroll through all questions below.
            </p>
          </Reveal>

          {/* Category tabs */}
          <Reveal delay={0.05} style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {faqGroups.map(g => (
              <button
                key={g.cat}
                onClick={() => handleCat(g.cat)}
                style={{
                  padding: '10px 20px', borderRadius: '50px', border: '1.5px solid',
                  borderColor: activeCat === g.cat ? '#112646' : '#E0E6F0',
                  background: activeCat === g.cat ? '#112646' : '#fff',
                  color: activeCat === g.cat ? '#fff' : '#555',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                  transition: 'all .18s', display: 'flex', alignItems: 'center', gap: '6px',
                  boxShadow: activeCat === g.cat ? '0 4px 14px rgba(17,38,70,.22)' : 'none',
                }}
              >
                <span>{g.icon}</span>
                <span>{g.cat}</span>
                <span style={{
                  fontSize: '11px', fontWeight: '700', padding: '1px 7px', borderRadius: '20px',
                  background: activeCat === g.cat ? 'rgba(255,255,255,.2)' : '#F0F3FA',
                  color: activeCat === g.cat ? '#fff' : '#888',
                }}>
                  {g.items.length}
                </span>
              </button>
            ))}
          </Reveal>

          {/* Active category label */}
          <Reveal delay={0.05} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #E4E9F2' }}>
            <span style={{ fontSize: '18px' }}>{activeGroup.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#112646', textTransform: 'uppercase', letterSpacing: '.1em' }}>{activeGroup.cat}</span>
            <span style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>{activeGroup.items.length} questions</span>
          </Reveal>

          {/* Accordion */}
          <RevealGroup>
            {activeGroup.items.map((item, i) => (
              <FAQItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
              />
            ))}
          </RevealGroup>

          {/* Still have questions inline card */}
          <Reveal style={{ marginTop: '48px', background: '#fff', border: '1px solid #E4E9F2', borderRadius: '16px', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', boxShadow: '0 2px 12px rgba(15,37,87,.06)' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#112646', marginBottom: '6px' }}>Still have questions?</div>
              <div style={{ fontSize: '13px', color: '#888', fontWeight: '300' }}>Our team responds the same day on business days — no bots, no queues.</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('contact')} style={{ padding: '11px 24px', borderRadius: '10px', border: 'none', background: '#112646', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Contact us →
              </motion.button>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="tel:6476778399" style={{ padding: '11px 20px', borderRadius: '10px', border: '1.5px solid #E0E6F0', background: '#fff', color: '#112646', fontSize: '13px', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                📞 (647) 677-8399
              </motion.a>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#0B1629', padding: '80px 0' }}>
        <div className="cxl" style={{ textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.18em', color: '#C5A047', marginBottom: '16px' }}>
              Premium support included
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', letterSpacing: '-1px', marginBottom: '14px' }}>
              Ready to start estimating smarter?
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.50)', maxWidth: '400px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
              14-day free trial. Every feature included. No credit card required.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Start Free Trial →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('contact')}>Talk to us</motion.button>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default FAQ;
