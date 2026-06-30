import React, { useState } from 'react';

const partners = [
  {
    name: 'FAJR Industries',
    tagline: 'Global Quality Without Any Compromise',
    desc: 'Scale your business with world-class polymer manufacturing and export expertise.',
    href: 'https://fajrindustries.com/contactus.php',
    cta: 'Get Quote',
  },
  {
    name: 'LBH SFG',
    tagline: 'Better Floors. Better Results.',
    desc: 'Trusted flooring solutions partner — connect with their team directly.',
    href: 'https://lbhsfg.com/contact-us.php',
    cta: 'Contact Us',
  },
];

const socials = [
  {
    name: 'Instagram', href: 'https://instagram.com',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>),
  },
  {
    name: 'Facebook', href: 'https://facebook.com',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /></svg>),
  },
  {
    name: 'LinkedIn', href: 'https://linkedin.com',
    icon: (<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>),
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/why_realcost.png'})` }}></div>
        <div className="cxl">
          <div className="pg-badge">🤝 Contact Us</div>
          <div className="ph-title">Connect with us!</div>
          <p className="sec-sub" style={{ maxWidth: '500px', margin: '0 auto' }}>Reach out anytime. Our team in Toronto, Ontario is happy to walk you through the platform, answer questions, or help you get started.</p>
        </div>
      </section>
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '56px' }}>
            <div>
              <div className="sec-eyebrow">Reach out anytime</div>
              <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.5px', marginBottom: '28px' }}>Contact information</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                <div className="cm-card"><div className="cm-ico" style={{ background: 'var(--rlight)' }}>📞</div><div><div style={{ fontSize: '12px', fontWeight: '500', color: '#8A92A6', marginBottom: '3px' }}>Phone</div><div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--txt)', marginBottom: '3px' }}>(647) 677-8399</div><div style={{ fontSize: '12px', color: 'var(--sap)', fontWeight: '500' }}>Call or WhatsApp · Mon–Fri 9AM–6PM ET</div></div></div>
                <div className="cm-card"><div className="cm-ico">✉️</div><div><div style={{ fontSize: '12px', fontWeight: '500', color: '#8A92A6', marginBottom: '3px' }}>Email</div><div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--txt)', marginBottom: '3px' }}>care@realcost.ca</div><div style={{ fontSize: '12px', color: 'var(--sap)', fontWeight: '500' }}>Questions, demos, billing — we respond same day</div></div></div>
              </div>

              {/* Connect Us — social links */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.1em', color: '#8A92A6', marginBottom: '14px' }}>Connect with us</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: '#fff', border: '1px solid var(--bdl)', borderRadius: '10px', padding: '10px 16px', textDecoration: 'none', color: 'var(--sap)', fontSize: '13px', fontWeight: '600', transition: 'all .2s', boxShadow: '0 2px 8px rgba(15,37,87,.06)' }}>
                      <span style={{ color: 'var(--ind)', display: 'inline-flex' }}>{s.icon}</span>{s.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="map-card">
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(200,155,60,.8)', marginBottom: '10px' }}>📍 Based in</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '5px' }}>Toronto, Ontario</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', lineHeight: '1.78', fontWeight: '300' }}>Real Cost Estimating Inc.<br />Toronto, Ontario, Canada</div>
                </div>
              </div>
            </div>
            <div>
              {!submitted ? (
                <form className="rc-form" onSubmit={handleSubmit}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--txt)', marginBottom: '26px' }}>Have any questions?</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div><label className="flabel">First name</label><input className="finput" placeholder="John" /></div>
                    <div><label className="flabel">Last name</label><input className="finput" placeholder="Smith" /></div>
                  </div>
                  <div style={{ marginBottom: '14px' }}><label className="flabel">Work email</label><input className="finput" type="email" placeholder="john@company.com" /></div>
                  <div style={{ marginBottom: '14px' }}><label className="flabel">Company name</label><input className="finput" placeholder="ABC Electrical Ltd." /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div><label className="flabel">Your trade</label><select className="finput"><option value="">Select trade</option><option>Electrical</option><option>Mechanical / HVAC</option><option>Plumbing</option><option>Fire Alarm</option><option>General contractor</option><option>Multi-trade</option></select></div>
                    <div><label className="flabel">I want to</label><select className="finput"><option value="">Select</option><option>Start a free trial</option><option>Get a platform demo</option><option>Ask a billing question</option><option>Get technical support</option></select></div>
                  </div>
                  <div style={{ marginBottom: '28px' }}><label className="flabel">Message (optional)</label><textarea className="finput" rows="4" placeholder="Any questions or context about your team..." style={{ resize: 'none' }}></textarea></div>
                  <button type="submit" className="btn-form">Send message →</button>
                  <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '12px', color: '#A0AABB' }}>We respond within 24 hours on business days.</div>
                </form>
              ) : (
                <div className="rc-form">
                  <div style={{ fontSize: '48px', marginBottom: '18px', textAlign: 'center' }}>✅</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--txt)', marginBottom: '9px', textAlign: 'center' }}>Message sent!</div>
                  <div style={{ fontSize: '15px', color: '#6B7489', maxWidth: '320px', margin: '0 auto 24px', lineHeight: '1.8', textAlign: 'center', fontWeight: '300' }}>Thank you! Our team will get back to you within 24 hours.</div>
                  <div style={{ textAlign: 'center' }}><button className="btn-ol-blue" onClick={() => setSubmitted(false)}>Send another message</button></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partner contacts */}
      <section className="sec-white" style={{ padding: '72px 0' }}>
        <div className="cxl">
          <div className="sec-eyebrow">Reach out anytime</div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.5px', marginBottom: '36px' }}>Our partners</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {partners.map((p) => (
              <div key={p.name} style={{ background: 'var(--sap)', borderRadius: '16px', padding: '32px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.55)' }}>{p.tagline}</div>
                <div style={{ fontSize: '22px', fontWeight: '700' }}>{p.name}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)', lineHeight: '1.7', flex: 1 }}>{p.desc}</div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '10px', padding: '10px 20px', textDecoration: 'none', color: '#fff', fontSize: '13px', fontWeight: '600', width: 'fit-content', transition: 'all .2s' }}
                >
                  {p.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
