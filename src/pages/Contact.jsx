import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';

const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
);
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 .18h3a2 2 0 0 1 2 1.72c.13 1 .37 1.98.72 2.91a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 9 9l1.08-1.18a2 2 0 0 1 2.11-.45c.93.35 1.91.59 2.91.72A2 2 0 0 1 22 18v-1.08z"/>
  </svg>
);

const contactItems = [
  { Icon: IconPin,   lines: ['1200 Bloor Street West, Toronto, Ontario'] },
  { Icon: IconMail,  lines: ['care@realcostestimating.ca'] },
  { Icon: IconPhone, lines: ['(647) 677-8399', 'Mon–Fri 9:00 AM – 6:00 PM ET'] },
];

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1.5px solid rgba(255,255,255,0.45)',
  padding: '14px 0',
  fontSize: '14px',
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
  letterSpacing: '.01em',
};

const Contact = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="page-enter">

      {/* ── Top Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/contact/contact_hero.png'})` }} />
        <div className="contact-hero-overlay" />
        <div className="hero-glow" />
        <div className="cxl contact-hero-inner">

          {/* Left — copy */}
          <motion.div
            className="contact-hero-left"
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="contact-hero-title">Let's Build Something<br />Great Together</h1>
            <p className="contact-hero-desc">
              Whether you have questions, need a demo, or want to start your free trial — our team is here for you. Reach out anytime.
            </p>
            <motion.div className="contact-hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="contact-hero-btn-prim" href="#contact-form">
                Send us a message
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="contact-hero-btn-ghost" href="tel:6476778399">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 .18h3a2 2 0 0 1 2 1.72c.13 1 .37 1.98.72 2.91a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 9 9l1.08-1.18a2 2 0 0 1 2.11-.45c.93.35 1.91.59 2.91.72A2 2 0 0 1 22 18v-1.08z"/>
                </svg>
                (647) 677-8399
              </motion.a>
            </motion.div>
            <div className="contact-hero-trust">
              <span>✓ Free 14-day trial</span>
              <span>✓ No credit card</span>
              <span>✓ Same-day response</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section id="contact-form" style={{ background: '#F4F5F7', padding: '100px 0 120px' }}>
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

            {/* Left — info */}
            <Reveal>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '-.8px', marginBottom: '16px' }}>
                Have Any Questions?
              </h2>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.78', marginBottom: '44px', fontWeight: '300', maxWidth: '380px' }}>
                We eagerly await your queries and have a team of enthusiastic customer care executives ready to answer them promptly. So, bring it on!
              </p>
              <RevealGroup style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {contactItems.map(({ Icon, lines }) => (
                  <div key={lines[0]} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid #112646', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#112646' }}>
                      <Icon />
                    </div>
                    <div style={{ paddingTop: '10px' }}>
                      {lines.map(l => (
                        <div key={l} style={{ fontSize: '14px', color: '#112646', fontWeight: '500', lineHeight: '1.7' }}>{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </RevealGroup>
            </Reveal>

            {/* Right — navy form card */}
            <Reveal delay={0.1} initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
              {!submitted ? (
                <form onSubmit={handleSubmit} style={{ background: '#112646', borderRadius: '20px 20px 80px 20px', padding: '44px 40px 48px', boxShadow: '0 16px 56px rgba(10,20,60,.28)' }}>
                  <motion.input whileFocus={{ scale: 1.01 }} name="name" value={form.name} onChange={handleChange} placeholder="Enter Your Name *" required style={inputStyle} />
                  <motion.input whileFocus={{ scale: 1.01 }} name="email" value={form.email} onChange={handleChange} type="email" placeholder="Enter Your Email *" required style={{ ...inputStyle, marginTop: '4px' }} />
                  <motion.input whileFocus={{ scale: 1.01 }} name="phone" value={form.phone} onChange={handleChange} placeholder="Enter Your Contact Number *" required style={{ ...inputStyle, marginTop: '4px' }} />
                  <motion.textarea whileFocus={{ scale: 1.01 }} name="message" value={form.message} onChange={handleChange} placeholder="Enter Your Message *" required rows={4} style={{ ...inputStyle, marginTop: '4px', resize: 'none', display: 'block' }} />
                  <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} type="submit" style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: '50px', padding: '14px 48px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,.18)', transition: 'all .2s', letterSpacing: '.02em' }}>
                      Send Message
                    </motion.button>
                  </div>
                </form>
              ) : (
                <div style={{ background: '#112646', borderRadius: '20px 20px 80px 20px', padding: '64px 40px', boxShadow: '0 16px 56px rgba(10,20,60,.28)', textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>Message Sent!</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.70)', marginBottom: '28px', fontWeight: '300' }}>Thank you! Our team will get back to you within 24 hours.</div>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setSubmitted(false)} style={{ background: '#2563EB', color: '#fff', border: 'none', borderRadius: '50px', padding: '12px 36px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                    Send Another Message
                  </motion.button>
                </div>
              )}
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA Hero ── */}
      <section className="contact-hero" style={{ minHeight: 'unset' }}>
        <div className="contact-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/misc/bg_our.png'})` }} />
        <div className="contact-hero-overlay" />
        <Reveal className="cxl" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
          <div className="contact-hero-eyebrow">Global Quality Without Any Compromise</div>
          <h2 className="contact-hero-title">Ready to get started?</h2>
          <p className="contact-hero-desc">
            Join estimators across Canada using Real Cost to win more bids.
            Start your free trial today — no credit card, no commitment.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="contact-hero-btn" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Contact;
