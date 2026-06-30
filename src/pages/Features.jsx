import React from 'react';

const features = [
  { accent: 'var(--grd-blue)', bg: 'var(--blight)', ico: '🗺', title: 'Digital Takeoff Canvas', body: 'Upload PDF drawing sets and navigate every page on a digital canvas. Place symbols manually or let the platform detect matching symbols. Multi-page projects supported with full page navigation.' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', bg: '#E6F7EE', ico: '🔍', title: 'Symbol Auto-Count', body: 'Draw a rectangle around any reference symbol — a light fixture, outlet, or device. The platform instantly finds and counts all matching assemblies across every drawing page.' },
  { accent: 'linear-gradient(90deg,var(--red),var(--red2))', bg: 'var(--rlight)', ico: '💰', title: 'Bid Page', body: 'Your bid auto-calculates from takeoff counts. Material cost, labour hours, overhead percentage, markup, and a project duration calculator — all in one view.' },
  { accent: 'var(--grd-gold)', bg: '#FDF6E3', ico: '📍', title: 'Canadian City-Based Pricing', body: 'Material rates auto-adjust to L1/L2/L3 regional tiers for your city — Quebec, Ottawa, Toronto, Montreal, Calgary, Vancouver, and more.' },
  { accent: 'linear-gradient(90deg,#0891B2,#06B6D4)', bg: '#E0F7FA', ico: '🚚', title: 'Supplier RFQs', body: 'Send requests for quotation to your material distributors directly from the Bid Page. Compare supplier quotes side-by-side and apply the best price instantly.' },
  { accent: 'linear-gradient(90deg,#5B21B6,#7C3AED)', bg: '#F5F3FF', ico: '📋', title: 'Quote Letter Generator', body: 'One click generates a professional branded PDF or Word quote letter from your bid — ready to submit to your client immediately.' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', bg: '#E6F7EE', ico: '📊', title: 'Estimate Graph & Analytics', body: 'Visual breakdown chart of your estimate showing material, labour, overhead, and markup proportions. Understand your bid at a glance.' },
  { accent: 'linear-gradient(90deg,var(--sap),var(--sap2))', bg: 'var(--blight)', ico: '👥', title: 'Team & Role Management', body: 'Owner and estimator roles. Assign projects to team members, track progress, and manage subscriptions — all from one account dashboard.' },
  { accent: 'var(--grd-gold)', bg: '#FDF6E3', ico: '🏗', title: 'Multi-Trade Support', body: 'One platform for all your trades — electrical, mechanical, plumbing, fire alarm, voice & data, security, AV, and heat tracing all supported.' },
];

const chips = ['🗺 Digital Takeoff Canvas', '🔍 Auto-Count', '💰 Bid Page', '📍 Canadian City Pricing', '🚚 Supplier RFQs', '📋 Quote Letter Generator', '📊 Estimate Graph', '👥 Team Management'];

const Features = ({ onNavigate }) => {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + ''})` }}></div>
        <div className="cxl">
          <div className="pg-badge">Platform Features</div>
          <div className="ph-title">Every tool your estimating<br />team needs.</div>
          <p className="sec-sub" style={{ maxWidth: '560px', margin: '0 auto 44px' }}>From PDF upload to branded quote letter — Real Cost handles your full estimation workflow in one digital platform.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            {chips.map((c, i) => (
              <span key={i} className={`ph-chip ${c.includes('Quote Letter Generator') ? 'ph-chip-gold' : ''}`}>{c}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Open the App →</a>
            <button className="btn-ghost" onClick={() => onNavigate('pricing')}>See pricing</button>
          </div>
        </div>
      </section>
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Core features</div>
            <div className="sec-h2">Built for how estimators actually work</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {features.map((f, i) => (
              <div key={i} className="feat-card" style={{ '--card-accent': f.accent }}>
                <div className="card-ico" style={{ background: f.bg }}>{f.ico}</div>
                <div className="card-ttl">{f.title}</div>
                <div className="card-body">{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="cta-band">
        <div style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.2px', marginBottom: '14px' }}>See it all live in the app.</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '440px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>14-day free trial. Every feature, no card required.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Open the App →</a>
            <button className="btn-ol-inv" onClick={() => onNavigate('pricing')}>View pricing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
