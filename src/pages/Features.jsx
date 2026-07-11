import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';

const features = [
  { accent: 'var(--grd-blue)', bg: 'var(--blight)', ico: '🗺', title: 'Digital Takeoff Canvas', body: 'Upload PDF drawing sets and navigate every page on a digital canvas. Place symbols manually or let the platform detect matching symbols. Multi-page projects supported with full page navigation.', img: '/images/features/take_off.png' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', bg: '#E6F7EE', ico: '🔍', title: 'Symbol Auto-Count', body: 'Draw a rectangle around any reference symbol — a light fixture, outlet, or device. The platform instantly finds and counts all matching assemblies across every drawing page.', img: '/images/features/blueprint.png' },
  { accent: 'linear-gradient(90deg,var(--red),var(--red2))', bg: 'var(--rlight)', ico: '💰', title: 'Bid Page', body: 'Your bid auto-calculates from takeoff counts. Material cost, labour hours, overhead percentage, markup, and a project duration calculator — all in one view.', img: '/images/features/bid_page.png' },
  { accent: 'var(--grd-gold)', bg: '#FDF6E3', ico: '📍', title: 'Canadian City-Based Pricing', body: 'Material rates auto-adjust to L1/L2/L3 regional tiers for your city — Quebec, Ottawa, Toronto, Montreal, Calgary, Vancouver, and more.', img: '/images/misc/project.png' },
  { accent: 'linear-gradient(90deg,#0891B2,#06B6D4)', bg: '#E0F7FA', ico: '🚚', title: 'Supplier RFQs', body: 'Send requests for quotation to your material distributors directly from the Bid Page. Compare supplier quotes side-by-side and apply the best price instantly.', img: '/images/home/benefits_3.png' },
  { accent: 'linear-gradient(90deg,#5B21B6,#7C3AED)', bg: '#F5F3FF', ico: '📋', title: 'Quote Letter Generator', body: 'One click generates a professional branded PDF or Word quote letter from your bid — ready to submit to your client immediately.', img: '/images/features/quote_letter.png' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', bg: '#E6F7EE', ico: '📊', title: 'Estimate Graph & Analytics', body: 'Visual breakdown chart of your estimate showing material, labour, overhead, and markup proportions. Understand your bid at a glance.', img: '/images/home/benefits_2.png' },
  { accent: 'linear-gradient(90deg,var(--sap),var(--sap2))', bg: 'var(--blight)', ico: '👥', title: 'Team & Role Management', body: 'Owner and estimator roles. Assign projects to team members, track progress, and manage subscriptions — all from one account dashboard.', img: '/images/home/benefits_1.png' },
  { accent: 'var(--grd-gold)', bg: '#FDF6E3', ico: '🏗', title: 'Multi-Trade Support', body: 'One platform for all your trades — electrical, mechanical, plumbing, fire alarm, voice & data, security, AV, and heat tracing all supported.', img: '/images/trades/mechanical.jpg' },
];

const chips = ['🗺 Digital Takeoff Canvas', '🔍 Auto-Count', '💰 Bid Page', '📍 Canadian City Pricing', '🚚 Supplier RFQs', '📋 Quote Letter Generator', '📊 Estimate Graph', '👥 Team Management'];

const Features = ({ onNavigate }) => {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/features/our_features_white.png'})`, backgroundSize: 'cover', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}></div>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'linear-gradient(105deg,rgba(10,20,40,.95) 0%,rgba(15,37,87,.90) 38%,rgba(15,37,87,.40) 60%,transparent 75%)' }} />
        <div className="cxl" style={{ textAlign:'left' }}>
          <motion.div
            style={{ maxWidth:'580px' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="pg-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>Platform Features</motion.div>
            <div className="ph-title">Every tool your estimating<br />team needs.</div>
            <p className="sec-sub" style={{ margin:'0 0 36px' }}>From PDF upload to branded quote letter — Real Cost handles your full estimation workflow in one digital platform.</p>
            <motion.div className="fh-chip-row" style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '20px' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.3 }}>
              {chips.map((c, i) => (
                <span key={i} className={`ph-chip ${c.includes('Quote Letter Generator') ? 'ph-chip-gold' : ''}`}>{c}</span>
              ))}
            </motion.div>
            <motion.div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Open the App →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('pricing')}>See pricing</motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="sec-grey">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Core features</div>
            <div className="sec-h2">Built for how estimators actually work</div>
          </Reveal>
          <div className="cf-rows">
            {features.map((f, i) => (
              <Reveal key={i} className={`cf-row ${i % 2 === 1 ? 'cf-row-rev' : ''}`}>
                <div className="cf-frame">
                  <div className="cf-frame-glow" style={{ background: f.accent }} />
                  <div className="cf-frame-inner">
                    <img className="cf-frame-img" src={process.env.PUBLIC_URL + f.img} alt={f.title} loading="lazy" />
                  </div>
                </div>
                <div className="cf-card" style={{ '--card-accent': f.accent }}>
                  <div className="cf-card-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="cf-card-top">
                    <div className="cf-card-ico" style={{ background: f.bg }}>{f.ico}</div>
                    <div className="cf-card-eyebrow">Core feature</div>
                  </div>
                  <div className="cf-card-ttl">{f.title}</div>
                  <div className="cf-card-divider" />
                  <div className="cf-card-body">{f.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* From Blueprint to Bid */}
      <section className="sec-light">
        <div className="cxl">
          <Reveal style={{ margin: '0 auto', maxWidth: '1180px' }}>
            <div className="bp-bid-grid">
              <div className="bp-bid-copy">
                <div className="sec-eyebrow">From Blueprint to Bid</div>
                <div className="sec-h2" style={{ marginBottom: '18px' }}>One workflow for every electrical estimate.</div>
                <p className="sec-sub" style={{ maxWidth: '620px', marginBottom: '28px' }}>
                  Real Cost brings your entire estimating process into one connected experience — digital takeoff, automated counts, regional pricing, bid calculations, and client-ready quote letters.
                </p>
                <div className="bp-bid-list">
                  {[
                    'Run a digital takeoff on PDF drawings and keep every count linked to your bid.',
                    'Auto-calculate material, labour, overhead, markup and project duration as you estimate.',
                    'Switch between L1/L2/L3 city rates instantly so your proposal matches the local market.',
                    'Review your bid and send a branded quote letter to clients with one click.',
                  ].map((item) => (
                    <div key={item} className="bp-bid-point">
                      <div className="bp-bid-point-icon">✓</div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-prim" onClick={() => onNavigate('demo')} style={{ marginTop: '16px' }}>
                  See how Real Cost works
                </motion.button>
              </div>
              <div className="bp-bid-image">
                <img src={process.env.PUBLIC_URL + '/images/features/blueprint.png'} alt="Real Cost estimate workflow from blueprint to bid" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Real Cost — numbered grid */}
      <section className="sec-grey">
        <div className="cxl">
          <Reveal style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '38px', fontWeight: '800', color: 'var(--txt)', letterSpacing: '-1.2px', lineHeight: '1.15' }}>
              Why Choose<br />
              <span style={{ background: 'var(--grd-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Cost</span>
            </div>
          </Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px 44px' }}>
            {[
              { n: '01', title: 'Digital-First Workflow', highlight: false, desc: "We built our platform around how Canadian estimators actually work — drawings, counts, bids and quotes in one continuous flow." },
              { n: '02', title: 'Expert-Built Formulas',  highlight: true,  desc: 'Every formula and assembly was designed by a panel of top electrical estimators — not engineers guessing at your workflow.' },
              { n: '03', title: 'Contractor-First Support', highlight: false, desc: 'We prioritize contractor needs, so every feature and support interaction is built around helping you win your next bid.' },
              { n: '04', title: 'City-Wide Pricing Network', highlight: false, desc: 'Real-time, regionally adjusted material pricing across every major Canadian market — no manual lookups.' },
              { n: '05', title: 'Built for Every Trade', highlight: false, desc: 'Electrical, mechanical, plumbing, fire alarm and more — one platform covers every trade on your job.' },
              { n: '06', title: 'Fast, Reliable Delivery', highlight: false, desc: 'A streamlined workflow means your team estimates and quotes faster, without compromising accuracy.' },
            ].map(({ n, title, highlight, desc }) => (
              <div key={n} style={{ borderTop: '1px solid rgba(17,38,70,.12)', paddingTop: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: highlight ? 'var(--gold)' : 'var(--sap)', letterSpacing: '.04em', marginBottom: '14px' }}>{n}</div>
                <div style={{ fontSize: '15.5px', fontWeight: '700', color: highlight ? 'var(--gold)' : 'var(--txt)', marginBottom: '10px', letterSpacing: '-.2px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.75', fontWeight: '300' }}>{desc}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div className="cta-band">
        <Reveal style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.2px', marginBottom: '14px' }}>See it all live in the app.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '440px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>14-day free trial. Every feature, no card required.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Open the App →</motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-inv" onClick={() => onNavigate('pricing')}>View pricing</motion.button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Features;
