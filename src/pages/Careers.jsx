import React from 'react';

const perks = [
  { accent: 'var(--grd-prim)', bg: 'var(--ind-light)', ico: '🌎', title: 'Remote-first', body: 'Work from anywhere in Canada. We care about output, not hours at a desk — flexible schedules around the work that matters.' },
  { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)', bg: '#E6F7EE', ico: '📈', title: 'Real ownership', body: 'Small team, big impact. Ship features used by trade contractors across the country and see your work in production every week.' },
  { accent: 'linear-gradient(90deg,#0891B2,#06B6D4)', bg: '#E0F7FA', ico: '🏥', title: 'Health & benefits', body: 'Comprehensive health, dental, and vision coverage for you and your family, plus a wellness stipend.' },
  { accent: 'var(--grd-gold)', bg: '#FDF6E3', ico: '🌴', title: 'Generous time off', body: 'Paid vacation, statutory holidays, and the flexibility to take the time you need to recharge.' },
  { accent: 'linear-gradient(90deg,#5B21B6,#7C3AED)', bg: '#F5F3FF', ico: '🎓', title: 'Learning budget', body: 'Annual budget for courses, conferences, and books. We invest in your growth as much as the product.' },
  { accent: 'var(--grd-prim-soft)', bg: 'var(--ind-light)', ico: '💜', title: 'Equity for everyone', body: 'Every full-time team member shares in our success with meaningful equity in the company.' },
];

const openings = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', type: 'Full-time · Remote (Canada)', desc: 'Build core estimating features end-to-end — takeoff canvas, auto-count, and the bid page — across React and Node.' },
  { title: 'Product Designer', dept: 'Design', type: 'Full-time · Remote (Canada)', desc: 'Own the product experience for trade estimators, from research and flows to polished, shippable UI.' },
  { title: 'Customer Success Manager', dept: 'Customer Success', type: 'Full-time · Toronto, ON', desc: 'Onboard contractors, run demos, and make sure every customer gets value from Real Cost in their first week.' },
  { title: 'Estimating Specialist (Trades)', dept: 'Product', type: 'Full-time · Remote (Canada)', desc: 'Bring real electrical/mechanical estimating expertise to shape pricing data, workflows, and templates.' },
];

const chips = ['🌎 Remote-first', '💜 Equity for all', '🏥 Full benefits', '📈 Real ownership'];

const Careers = ({ onNavigate }) => {
  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + ''})` }}></div>
        <div className="cxl">
          <div className="pg-badge">Careers</div>
          <div className="ph-title">Build the future of<br />construction estimating.</div>
          <p className="sec-sub" style={{ maxWidth: '560px', margin: '0 auto 44px' }}>We're a small, remote-first team helping trade contractors across Canada win more work. Join us and ship software that contractors use every day.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            {chips.map((c, i) => (
              <span key={i} className={`ph-chip ${c.includes('Equity') ? 'ph-chip-gold' : ''}`}>{c}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-prim" onClick={() => { const el = document.getElementById('open-roles'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>View open roles ↓</button>
            <button className="btn-ghost" onClick={() => onNavigate('contact')}>Get in touch</button>
          </div>
        </div>
      </section>

      {/* Why work here */}
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Why Real Cost</div>
            <div className="sec-h2">A team that builds things that matter</div>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>We work hard, ship fast, and look after each other.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {perks.map((p, i) => (
              <div key={i} className="feat-card" style={{ '--card-accent': p.accent }}>
                <div className="card-ico" style={{ background: p.bg }}>{p.ico}</div>
                <div className="card-ttl">{p.title}</div>
                <div className="card-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="sec-light" id="open-roles">
        <div className="cxl" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Open positions</div>
            <div className="sec-h2">Find your role</div>
            <p className="sec-sub" style={{ maxWidth: '460px', margin: '0 auto' }}>Don't see a perfect fit? We always want to meet great people — email us anyway.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {openings.map((job, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.82)', border: '1px solid rgba(220,226,240,.9)', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
                <div style={{ flex: '1', minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '17px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.3px' }}>{job.title}</span>
                    <span style={{ background: 'var(--ind-light)', color: 'var(--ind)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '14px' }}>{job.dept}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8A92A6', fontWeight: '500', marginBottom: '8px' }}>{job.type}</div>
                  <div style={{ fontSize: '13.5px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300', maxWidth: '560px' }}>{job.desc}</div>
                </div>
                <a
                  className="btn-prim"
                  href={`mailto:careers@realcostestimating.ca?subject=${encodeURIComponent('Application: ' + job.title)}`}
                  style={{ flexShrink: '0' }}
                >
                  Apply →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.2px', marginBottom: '14px' }}>Don't see your role?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>We're always looking for talented people. Send us your resume and tell us how you'd help contractors estimate smarter.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="mailto:careers@realcostestimating.ca?subject=General%20Application">✉️ Email careers@realcostestimating.ca</a>
            <button className="btn-ol-inv" onClick={() => onNavigate('contact')}>Contact us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
