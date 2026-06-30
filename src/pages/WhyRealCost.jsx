import React from 'react';
import '../styles/pages/why-real-cost.css';


const perks = [
  { title: 'City-Wise Pricing',        desc: 'Real-time connectivity to material price updates — auto-adjusted for your city across Canada.' },
  { title: 'Flexible Labour Factors',  desc: 'Instantly switch between easy, difficult, and most difficult work conditions without recalculating.' },
  { title: 'Premium Features',         desc: "Features you couldn't find in any competitor software — built by estimators who know the trade." },
  { title: 'Supplier RFQs in Clicks',  desc: "Request supplier material prices in a few clicks and compare quotes side-by-side on your bid page." },
  { title: 'Work From Anywhere',       desc: 'Cloud-based application — access your projects and estimates from any device, anytime.' },
  { title: 'Canada-Based Support',     desc: 'Canada-based support you can count on — real people, real help, whenever you need it.' },
  { title: 'Free Software Updates',    desc: 'Every platform update is included at no extra cost. You always have access to the latest.' },
  { title: 'Expert Service & Support', desc: 'Backed by a team with deep industry expertise — ongoing support to keep your estimating sharp.' },
  { title: '14-Day Free Trial',        desc: 'Try every feature for 14 days, free. No credit card required. Cancel anytime.' },
];

const checkItems = [
  { t: 'Premium Experience',     d: 'Every detail is crafted for a professional, polished estimating experience.' },
  { t: 'Hassle-Free Process',    d: 'From upload to quote letter — smooth and intuitive, no unnecessary steps.' },
  { t: 'Expert Ongoing Support', d: 'Canada-based team ready to help — real people who know estimation.' },
  { t: 'Free Software Updates',  d: 'The platform evolves continuously. Every update ships at no extra cost.' },
];

const WhyRealCost = ({ onNavigate }) => {
  return (
    <div className="page-enter">

      {/* ── Page Hero ── */}
      <section className="wrc-hero-section" style={{
        background: 'linear-gradient(145deg,#0E1E3A 0%,#142E56 30%,#1A3A72 62%,#1E4480 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* hero bg image */}
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/hero_whyrealcost.png'})` }}></div>
        {/* dot grid */}
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(255,255,255,.026) 1px,transparent 1px)', backgroundSize:'32px 32px' }} />
        {/* gold blob top-left */}
        <div style={{ position:'absolute', top:'-120px', left:'-140px', width:'560px', height:'560px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.13) 0%,transparent 65%)', pointerEvents:'none', zIndex:0 }} />
        {/* indigo blob bottom-right */}
        <div style={{ position:'absolute', bottom:'-100px', right:'-120px', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle,rgba(79,70,229,.16) 0%,transparent 65%)', pointerEvents:'none', zIndex:0 }} />
        {/* blue haze center-right */}
        <div style={{ position:'absolute', top:'25%', right:'8%', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle,rgba(45,107,228,.09) 0%,transparent 60%)', pointerEvents:'none', zIndex:0 }} />
        {/* gold top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'2.5px', background:'linear-gradient(90deg,transparent 0%,rgba(201,168,76,.5) 25%,rgba(228,199,120,.92) 50%,rgba(201,168,76,.5) 75%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />

        <div className="cxl" style={{ position:'relative', zIndex:1 }}>
          {/* badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(201,168,76,.13)', border:'1px solid rgba(201,168,76,.30)', color:'#E4C778', fontSize:'10px', fontWeight:'700', padding:'5px 15px', borderRadius:'24px', letterSpacing:'.10em', textTransform:'uppercase', marginBottom:'16px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#E4C778', boxShadow:'0 0 8px rgba(228,199,120,.7)', display:'inline-block', animation:'blink 2.4s ease-in-out infinite' }} />
            ⚡ Why Real Cost?
          </div>

          {/* heading */}
          <h1 className="wrc-hero-h1" style={{ fontWeight:'800', color:'#fff', lineHeight:'1.08', maxWidth:'720px', margin:'0 auto 16px' }}>
            Take Your Electrical Contracting<br />Business to the{' '}
            <em style={{ fontStyle:'normal', background:'linear-gradient(125deg,#C9A84C 0%,#F0D98A 55%,#DFC06A 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Next Level</em>
          </h1>

          {/* subtitle */}
          <p style={{ fontSize:'15px', color:'rgba(210,220,248,.62)', lineHeight:'1.80', maxWidth:'540px', margin:'0 auto 26px', fontWeight:'300' }}>
            Canada's{' '}
            <strong style={{ color:'rgba(240,217,138,.85)', fontWeight:'500' }}>leading electrical estimation company</strong>
            {' '}— trusted by 500+ contractors, built on 15+ years of job-winning formulas.
          </p>

          {/* CTAs */}
          <div className="wrc-hero-ctas" style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap', marginBottom:'44px' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Start Free Trial</a>
            <button className="btn-ghost" onClick={() => onNavigate('demo')}>📅 Request Demo</button>
          </div>

          {/* scrolling feature ticker */}
          <div className="wrc-ticker-wrap">
            <div className="wrc-ticker-fade-l" style={{ position:'absolute', left:0, top:0, bottom:0, width:'100px', background:'linear-gradient(90deg,#0E1E3A 0%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />
            <div className="wrc-ticker-fade-r" style={{ position:'absolute', right:0, top:0, bottom:0, width:'100px', background:'linear-gradient(270deg,#0E1E3A 0%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />
            <div style={{ display:'flex', gap:'10px', animation:'ticker 32s linear infinite', width:'max-content' }}>
              {[...perks, ...perks].map(({ title }, i) => (
                <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:'9px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.09)', borderRadius:'8px', padding:'9px 18px', flexShrink:0 }}>
                  <span style={{ fontSize:'10px', color:'#C9A84C', lineHeight:1 }}>✦</span>
                  <span style={{ fontSize:'12.5px', fontWeight:'500', color:'rgba(210,220,248,.68)', letterSpacing:'.01em', whiteSpace:'nowrap' }}>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── 15 Years + Image ── */}
      <section className="sec-light">
        <div className="cxl">
          <div className="wrc-2col">
            <div>
              <div className="sec-eyebrow">Our Expertise</div>
              <div className="sec-h2">15 Years of Job-Winning<br />Formulas & Assemblies</div>
              <p className="sec-sub" style={{ marginBottom: '20px' }}>
                Real Cost Estimating Inc is a name trusted by electrical contractors across Canada. Choose our expertise and experience of over <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>15 years</strong> and make use of job-winning formulas and assemblies refined over thousands of real projects.
              </p>
              <p className="sec-sub" style={{ marginBottom: '32px' }}>
                Tailored for electrical contractors with quality and care — bringing you nothing but the best through <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>technology & innovation</strong>.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Get Started</a>
                <button className="btn-ghost" style={{ background: 'rgba(17,38,70,.07)', color: 'var(--sap)', border: '1px solid rgba(17,38,70,.18)', backdropFilter: 'none' }} onClick={() => onNavigate('pricing')}>See Pricing</button>
              </div>
            </div>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(17,38,70,.16), 0 0 0 1px rgba(17,38,70,.07)' }}>
              <img src={process.env.PUBLIC_URL + '/images/about/why_realcost.png'} alt="Why Real Cost" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ marginBottom: '36px' }}>
            <div className="sec-eyebrow">What You Get</div>
            <div className="sec-h2">Why Choose Real Cost?</div>
          </div>
          <div className="wrc-perks-inner" style={{ background: 'var(--blight)', borderRadius: '22px', border: '1px solid rgba(17,38,70,.07)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-prim)' }} />
            <div className="wrc-perks-grid">
              {perks.map(({ title, desc }, i) => (
                <div key={title} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#fff', flexShrink: 0, letterSpacing: '.5px', boxShadow: '0 4px 14px rgba(79,70,229,.28)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ paddingTop: '2px', fontSize: '13.5px', lineHeight: '1.75', color: '#6B7489' }}>
                    <strong style={{ color: 'var(--txt)', fontWeight: '700', display: 'block', marginBottom: '3px', fontSize: '14px' }}>{title}</strong>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Collage ── */}
      <section className="wrc-section-collage" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(17,38,70,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(197,160,71,.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="cxl">
          <div className="wrc-2col-wide">

            {/* Left: photo collage */}
            <div className="wrc-collage-wrap">
              <div style={{ position: 'absolute', left: '-16px', top: '32px', width: '56%', height: '56%', borderRadius: '20px', background: 'linear-gradient(135deg,rgba(79,70,229,.13),rgba(197,160,71,.10))', zIndex: 0 }} />
              <div style={{ position: 'absolute', right: '-12px', bottom: '28px', width: '44%', height: '38%', borderRadius: '16px', background: 'linear-gradient(135deg,rgba(197,160,71,.10),rgba(79,70,229,.07))', zIndex: 0 }} />
              <div style={{ position: 'absolute', right: 0, top: 0, width: '68%', height: '62%', borderRadius: '16px', overflow: 'hidden', zIndex: 1, boxShadow: '0 20px 56px rgba(17,38,70,.18), 0 0 0 1px rgba(17,38,70,.06)' }}>
                <img src={process.env.PUBLIC_URL + '/images/about/2nd.png'} alt="Team working" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', left: 0, top: '60px', width: '52%', height: '52%', borderRadius: '16px', overflow: 'hidden', zIndex: 2, boxShadow: '0 24px 60px rgba(17,38,70,.24), 0 0 0 1px rgba(17,38,70,.06)' }}>
                <img src={process.env.PUBLIC_URL + '/images/about/1st_colash.png'} alt="Electrical team" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', right: '4%', bottom: 0, width: '60%', height: '42%', borderRadius: '16px', overflow: 'hidden', zIndex: 3, boxShadow: '0 24px 60px rgba(17,38,70,.24), 0 0 0 1px rgba(17,38,70,.06)' }}>
                <img src={process.env.PUBLIC_URL + '/images/about/2nd_colash.png'} alt="Contractors" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ position: 'absolute', left: '2%', bottom: '12px', zIndex: 4, background: '#fff', borderRadius: '14px', padding: '12px 18px', boxShadow: '0 8px 28px rgba(17,38,70,.18)', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(17,38,70,.07)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>⚡</div>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-.5px', lineHeight: 1 }}>500+</div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '2px' }}>Contractors Served</div>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div>
              <div className="sec-eyebrow">Our Story</div>
              <div className="sec-h2">Bringing You Nothing<br />But the Best!</div>
              <p className="sec-sub" style={{ marginBottom: '20px' }}>
                Real Cost Estimating Inc was founded with one mission — give electrical contractors a platform that actually works the way they do. Every feature, formula, and workflow was shaped by real field experience.
              </p>
              <p className="sec-sub" style={{ marginBottom: '36px' }}>
                Making a difference through <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>technology & innovation</strong> — so your team can focus on winning bids, not wrestling with software.
              </p>
              <div style={{ display: 'flex', gap: '0', borderTop: '1px solid rgba(17,38,70,.08)', marginTop: '4px' }}>
                {[
                  { n: '15+',    l: 'Years Experience' },
                  { n: '1,000+', l: 'Projects Won' },
                  { n: '10x',    l: 'Client ROI' },
                ].map(({ n, l }, i) => (
                  <div key={l} style={{ paddingTop: '20px', paddingRight: '28px', paddingLeft: i > 0 ? '28px' : 0, borderLeft: i > 0 ? '1px solid rgba(17,38,70,.08)' : 'none' }}>
                    <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '5px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Made by estimators ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div className="wrc-2col">

            <div style={{ background: 'linear-gradient(135deg,rgba(17,38,70,.05),rgba(197,160,71,.09))', borderRadius: '22px', padding: '48px 40px', border: '1px solid rgba(17,38,70,.09)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-gold)' }} />
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gold2)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '14px' }}>Built By Estimators, For Estimators</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--txt)', letterSpacing: '-.8px', lineHeight: '1.2', marginBottom: '16px' }}>
                Made by Canada's most successful electrical estimators
              </div>
              <p className="sec-sub" style={{ marginBottom: 0 }}>
                Every formula, assembly, and workflow in Real Cost was designed by a panel of the country's top electrical estimators — not by software engineers guessing at your workflow.
              </p>
            </div>

            <div>
              <div className="sec-eyebrow">Making A Difference Through Technology & Innovation</div>
              <div className="sec-h2" style={{ marginBottom: '28px' }}>Proudly Serving<br />Esteemed Titans</div>
              {checkItems.map(({ t, d }) => (
                <div key={t} style={{ display: 'flex', gap: '14px', marginBottom: '22px', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', flexShrink: 0, marginTop: '2px', boxShadow: '0 3px 10px rgba(79,70,229,.28)' }}>✓</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--txt)', marginBottom: '4px' }}>{t}</div>
                    <div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <div className="cta-band">
        <div className="wrc-cta-pad">
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(228,199,120,.75)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '14px' }}>
            Bringing You Nothing But The Best
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#fff', letterSpacing: '-1.5px', marginBottom: '14px', lineHeight: '1.15' }}>
            Real Cost Estimation is<br />the Solution for You
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
            Making a difference through technology & innovation — 14-day free trial, no credit card required.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Start Free Trial</a>
            <button className="btn-ol-inv" onClick={() => onNavigate('contact')}>Talk to Us</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WhyRealCost;
