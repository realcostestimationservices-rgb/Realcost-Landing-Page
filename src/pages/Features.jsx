import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';

const features = [
  { accent: 'var(--grd-blue)', title: 'Digital Takeoff Canvas', body: 'Upload PDF drawing sets and navigate every page on a digital canvas. Place symbols manually or let the platform detect matching symbols. Multi-page projects supported with full page navigation.', img: '/images/features/take_off.png' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', title: 'Symbol Auto-Count', body: 'Draw a rectangle around any reference symbol — a light fixture, outlet, or device. The platform instantly finds and counts all matching assemblies across every drawing page.', img: '/images/features/blueprint.png' },
  { accent: 'linear-gradient(90deg,var(--red),var(--red2))', title: 'Bid Page', body: 'Your bid auto-calculates from takeoff counts. Material cost, labour hours, overhead percentage, markup, and a project duration calculator — all in one view.', img: '/images/features/bid_page.png' },
  { accent: 'var(--grd-acc)', title: 'Canadian City-Based Pricing', body: 'Material rates auto-adjust to regional pricing for your city — Quebec, Ottawa, Toronto, Montreal, Calgary, Vancouver, and more.', img: '/images/misc/project.png' },
  { accent: 'linear-gradient(90deg,#0891B2,#06B6D4)', title: 'Supplier RFQs', body: 'Send requests for quotation to your material distributors directly from the Bid Page. Compare supplier quotes side-by-side and apply the best price instantly.', img: '/images/home/benefits_3.png' },
  { accent: 'linear-gradient(90deg,#5B21B6,#7C3AED)', title: 'Quote Letter Generator', body: 'One click generates a professional branded PDF or Word quote letter from your bid — ready to submit to your client immediately.', img: '/images/features/quote_letter.png' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', title: 'Estimate Graph & Analytics', body: 'Visual breakdown chart of your estimate showing material, labour, overhead, and markup proportions. Understand your bid at a glance.', img: '/images/home/benefits_2.png' },
  { accent: 'linear-gradient(90deg,var(--sap),var(--sap2))', title: 'Team & Role Management', body: 'Owner and estimator roles. Assign projects to team members, track progress, and manage subscriptions — all from one account dashboard.', img: '/images/home/benefits_1.png' },
];

const chips = ['Digital Takeoff Canvas', 'Auto-Count', 'Bid Page', 'Canadian City Pricing', 'Supplier RFQs', 'Quote Letter Generator', 'Estimate Graph', 'Team Management'];

const Features = ({ onNavigate }) => {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/features/our_features_white.png'})`, backgroundSize: 'cover', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}></div>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'linear-gradient(105deg,rgba(10,20,40,.52) 0%,rgba(10,20,40,.32) 34%,transparent 62%)' }} />
        <div className="hero-glow" />
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
                <span key={i} className={`ph-chip ${c.includes('Quote Letter Generator') ? 'ph-chip-accent' : ''}`}>{c}</span>
              ))}
            </motion.div>
            <motion.div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">Open the App →</motion.a>
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
                  <div className="cf-card-top">
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
              <span style={{ background: 'var(--grd-acc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Cost</span>
            </div>
          </Reveal>
          <div className="wcr-rows">
            {[
              { n: '01', title: 'Digital-First Workflow', highlight: false, img: '/images/features/take_off.png',        desc: "We built our platform around how Canadian estimators actually work — drawings, counts, bids and quotes in one continuous flow." },
              { n: '02', title: 'Expert-Built Formulas',  highlight: true,  img: '/images/misc/built_by_estimators.png', desc: 'Every formula and assembly was designed by a panel of top electrical estimators — not engineers guessing at your workflow.' },
              { n: '03', title: 'Contractor-First Support', highlight: false, img: '/images/misc/request_demo.png',       desc: 'We prioritize contractor needs, so every feature and support interaction is built around helping you win your next bid.' },
              { n: '04', title: 'City-Wide Pricing Network', highlight: false, img: '/images/features/bid_page.png',       desc: 'Real-time, regionally adjusted material pricing across every major Canadian market — no manual lookups.' },
              { n: '05', title: 'Built for Every Trade', highlight: false, img: '/images/trades/commercial.png',          desc: 'Electrical, mechanical, plumbing, fire alarm and more — one platform covers every trade on your job.' },
              { n: '06', title: 'Fast, Reliable Delivery', highlight: false, img: '/images/features/quote_letter.png',     desc: 'A streamlined workflow means your team estimates and quotes faster, without compromising accuracy.' },
            ].map(({ n, title, highlight, desc, img }, i) => (
              <Reveal key={n} className={`wcr-row ${i % 2 === 1 ? 'wcr-row-rev' : ''}`}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="wcr-media">
                  <img src={process.env.PUBLIC_URL + img} alt={title} loading="lazy" />
                </div>
                <div className="wcr-card">
                  <div className="wcr-num" style={{ color: highlight ? 'var(--acc)' : 'var(--sap)' }}>{n}</div>
                  <div className="wcr-ttl" style={{ color: highlight ? 'var(--acc)' : 'var(--txt)' }}>{title}</div>
                  <div className="wcr-divider" style={{ background: highlight ? 'var(--grd-acc)' : 'var(--grd-prim)' }} />
                  <p className="wcr-desc">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <Reveal style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.2px', marginBottom: '14px' }}>See it all live in the app.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '440px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>14-day free trial. Every feature, no card required.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">Open the App →</motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-inv" onClick={() => onNavigate('pricing')}>View pricing</motion.button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Features;
