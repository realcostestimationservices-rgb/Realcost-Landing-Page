import React, { useState, useRef, useEffect } from 'react';
import '../styles/pages/our-story.css';

const milestones = [
  { year: '2010', label: 'Founded', desc: 'Real Cost Estimating Inc. was established in Toronto, ON — a team of experienced electrical estimators serving contractors across Canada.' },
  { year: '2013', label: 'First 100 Clients', desc: 'Reached 100 electrical contractors served, building a reputation for accurate, affordable estimates on commercial and institutional projects.' },
  { year: '2017', label: 'Nationwide Reach', desc: 'Expanded to serve contractors in Vancouver, Calgary, Edmonton, Ottawa and Montreal — delivering city-specific pricing across all major Canadian markets.' },
  { year: '2021', label: 'Software Launch', desc: 'Real Cost evolved from a service firm into a full SaaS platform — putting 15 years of job-winning formulas and assemblies directly in the hands of contractors.' },
  { year: '2024', label: '500+ Contractors', desc: 'Over 500 electrical contractors now use Real Cost to run faster, more accurate estimates — with 8,000+ projects estimated and 1,000+ projects won.' },
];


const sectors = [
  { img: '/images/trades/commercial.png' },
  { img: '/images/trades/residential.png' },
  { img: '/images/trades/institutional.png' },
  { img: '/images/trades/industrial.png' },
];

const SLIDE_DURATION = 4000;

const OurStory = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused]           = useState(false);
  const timerRef    = useRef(null);
  const trackRef    = useRef(null);
  const dragRef     = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const progScroll  = useRef(false);

  const scrollToSlide = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.os-cf-card');
    const card  = cards[i];
    if (!card) return;
    progScroll.current = true;
    const left = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
    track.scrollTo({ left, behavior: 'smooth' });
    setTimeout(() => { progScroll.current = false; }, 700);
  };

  const restartTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide(i => (i === sectors.length - 1 ? 0 : i + 1));
    }, SLIDE_DURATION);
  };

  const goTo = (i) => { setActiveSlide(i); restartTimer(); };

  useEffect(() => {
    if (!paused) restartTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => { scrollToSlide(activeSlide); }, [activeSlide]);

  const onScroll = () => {
    if (progScroll.current) return;
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('.os-cf-card'));
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0, minDist = Infinity;
    cards.forEach((c, i) => {
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== activeSlide) setActiveSlide(closest);
  };

  const onMouseDown = (e) => {
    const track = trackRef.current;
    dragRef.current = { active: true, startX: e.clientX, scrollLeft: track.scrollLeft };
    track.style.scrollBehavior = 'auto';
    setPaused(true);
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    trackRef.current.scrollLeft = dragRef.current.scrollLeft + (dragRef.current.startX - e.clientX);
  };
  const onMouseUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (trackRef.current) trackRef.current.style.scrollBehavior = 'smooth';
    setPaused(false);
  };

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="page-hero" style={{ minHeight: '640px' }}>
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/our_bg.png'})` }}></div>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'linear-gradient(105deg,rgba(10,20,40,.88) 0%,rgba(15,37,87,.72) 42%,rgba(15,37,87,.28) 75%,transparent 100%)' }} />
        <div className="cxl" style={{ textAlign:'left' }}>
          <div style={{ maxWidth:'580px' }}>
            <div className="pg-badge">Our Story</div>
            <div className="ph-title">15 Years of Winning Bids.<br />Now in Your Hands.</div>
            <p className="sec-sub" style={{ margin:'0 0 40px' }}>
              Real Cost Estimating Inc. started as a team of estimators helping contractors win work.
              Today, that expertise is built into a platform trusted by 500+ contractors across Canada.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Try Free for 14 Days</a>
              <button className="btn-ghost" onClick={() => onNavigate('demo')}>📅 Request Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(220,226,240,.7)', borderBottom: '1px solid rgba(220,226,240,.7)', padding: 0 }}>
        <div className="cxl">
          <div className="os-stats-grid">
            {[
              { n: '1,000+', l: 'Projects Won' },
              { n: '8,000+', l: 'Projects Estimated' },
              { n: '500+',   l: 'Contractors Served' },
              { n: '10x',    l: 'Client ROI' },
              { n: '15+',    l: 'Years Experience' },
            ].map(({ n, l }, i, arr) => (
              <div key={l} style={{ textAlign: 'center', padding: '30px 16px', borderRight: i < arr.length - 1 ? '1px solid rgba(220,226,240,.7)' : 'none' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-1.5px', marginBottom: '5px' }}>{n}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.08em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="sec-light">
        <div className="cxl">
          <div className="os-2col">
            <div>
              <div className="sec-eyebrow">Who We Are</div>
              <div className="sec-h2">Canada's Leading Electrical<br />Estimation Company</div>
              <p className="sec-sub" style={{ marginBottom: '18px' }}>
                Real Cost Estimating Inc. is the leading electrical estimation company in Canada — providing electrical contractors, general contractors, engineers, architects, and end users with reliable electrical construction estimates.
              </p>
              <p className="sec-sub" style={{ marginBottom: '18px' }}>
                We are a dedicated team of electrical estimators who have been working with electrical contractors for over <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>15 years</strong>.
              </p>
              <p className="sec-sub" style={{ marginBottom: '32px' }}>
                We prepare accurate and affordable electrical estimates for <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>commercial, residential, institutional and industrial</strong> projects — including homes, refurbished buildings, schools, banking institutions, hospitals, and industrial establishments.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Get Started</a>
                <button className="btn-ghost" style={{ background: 'rgba(17,38,70,.07)', color: 'var(--sap)', border: '1px solid rgba(17,38,70,.18)', backdropFilter: 'none' }} onClick={() => onNavigate('contact')}>Contact Us</button>
              </div>
            </div>

            {/* Right: scroll peek slider */}
            <div
              className="os-coverflow-wrap"
              style={{ '--slide-dur': `${SLIDE_DURATION}ms` }}
            >
              <div
                className="os-scroll-track"
                ref={trackRef}
                onScroll={onScroll}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                <div className="os-scroll-spacer" />
                {sectors.map((s, i) => (
                  <div
                    key={s.label}
                    className={`os-cf-card ${activeSlide === i ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + s.img})` }}
                    onClick={() => activeSlide !== i && goTo(i)}
                  >
                    {activeSlide === i && (
                      <div className="os-cf-text">
                        <div className="os-cf-ico">{s.ico}</div>
                        <div className="os-cf-label">{s.label}</div>
                        <div className="os-cf-sub">{s.sub}</div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="os-scroll-spacer" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Our Legacy / Software Solutions ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Our Legacy</div>
            <div className="sec-h2">From Estimation Services<br />to Software Solutions</div>
            <p className="sec-sub">
              What began as an estimating firm evolved into Canada's most trusted electrical estimation platform — putting 15 years of refined formulas directly into contractors' hands.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, rgba(17,38,70,.08), rgba(197,160,71,.5), rgba(17,38,70,.08))', transform: 'translateX(-50%)' }} />
            {milestones.map(({ year, label, desc }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={year} className={`os-milestone ${isLeft ? 'os-milestone-left' : 'os-milestone-right'}`}>
                  <div className="os-milestone-card">
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '4px' }}>{year}</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '7px' }}>{label}</div>
                    <div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.75', fontWeight: '300' }}>{desc}</div>
                  </div>
                  <div className="os-milestone-dot" />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ── About the team quote ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div className="os-2col">
            <div style={{ background: 'linear-gradient(135deg,#0E1E3A 0%,#1A3A72 100%)', borderRadius: '24px', padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-gold)' }} />
              <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(197,160,71,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ fontSize: '38px', marginBottom: '18px', lineHeight: 1 }}>"</div>
              <p style={{ fontSize: '17px', fontWeight: '400', color: 'rgba(220,230,255,.88)', lineHeight: '1.78', marginBottom: '28px', fontStyle: 'italic' }}>
                We built Real Cost because we lived the problem ourselves. Estimating took too long, cost too much, and the tools available weren't made for Canadian contractors. We changed that.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--grd-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#0A1428', flexShrink: 0 }}>RC</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Founding Team</div>
                  <div style={{ fontSize: '12px', color: 'rgba(210,220,255,.55)', marginTop: '2px' }}>Real Cost Estimating Inc. — Toronto, ON</div>
                </div>
              </div>
            </div>

            <div>
              <div className="sec-eyebrow">Making a Difference</div>
              <div className="sec-h2" style={{ marginBottom: '20px' }}>Technology &amp;<br />Innovation at our Core</div>
              <p className="sec-sub" style={{ marginBottom: '16px' }}>
                Real Cost Estimating Inc. was founded with one mission — give electrical contractors a platform that actually works the way they do. Every feature, formula, and workflow was shaped by real field experience.
              </p>
              <p className="sec-sub" style={{ marginBottom: '28px' }}>
                Our team continues to refine and update the platform based on feedback from active estimators — so the software grows with the industry.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Formulas refined across 8,000+ real projects',
                  'Serving contractors in every major Canadian city',
                  'Continuous updates included at no extra cost',
                  'Canada-based support from people who know the trade',
                ].map((point) => (
                  <div key={point} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff', flexShrink: 0, marginTop: '1px', boxShadow: '0 2px 8px rgba(79,70,229,.25)' }}>✓</div>
                    <div style={{ fontSize: '13.5px', color: 'var(--txt)', lineHeight: '1.65', fontWeight: '400' }}>{point}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Careers ── */}
      <section className="sec-grey" id="careers">
        <div className="cxl">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Join Our Team</div>
            <div className="sec-h2">Work With People Who Built the Industry</div>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>We're a small, remote-first team helping trade contractors across Canada win more work. Ship software that estimators use every day.</p>
          </div>

          {/* Perks */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px', marginBottom: '64px' }}>
            {[
              { accent: 'var(--grd-prim)',                              bg: 'var(--ind-light)', ico: '🌎', title: 'Remote-first',      body: 'Work from anywhere in Canada. We care about output, not hours at a desk — flexible schedules around the work that matters.' },
              { accent: 'linear-gradient(90deg,#1A6B45,#2E8A5A)',       bg: '#E6F7EE',         ico: '📈', title: 'Real ownership',    body: 'Small team, big impact. Ship features used by trade contractors across the country and see your work in production every week.' },
              { accent: 'linear-gradient(90deg,#0891B2,#06B6D4)',       bg: '#E0F7FA',         ico: '🏥', title: 'Health & benefits', body: 'Comprehensive health, dental, and vision coverage for you and your family, plus a wellness stipend.' },
              { accent: 'var(--grd-gold)',                              bg: '#FDF6E3',         ico: '🌴', title: 'Generous time off', body: 'Paid vacation, statutory holidays, and the flexibility to take the time you need to recharge.' },
              { accent: 'linear-gradient(90deg,#5B21B6,#7C3AED)',       bg: '#F5F3FF',         ico: '🎓', title: 'Learning budget',   body: 'Annual budget for courses, conferences, and books. We invest in your growth as much as the product.' },
              { accent: 'var(--grd-prim)',                              bg: 'var(--ind-light)', ico: '💜', title: 'Equity for everyone', body: 'Every full-time team member shares in our success with meaningful equity in the company.' },
            ].map((p, i) => (
              <div key={i} className="feat-card" style={{ '--card-accent': p.accent }}>
                <div className="card-ico" style={{ background: p.bg }}>{p.ico}</div>
                <div className="card-ttl">{p.title}</div>
                <div className="card-body">{p.body}</div>
              </div>
            ))}
          </div>

          {/* Open roles */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Open positions</div>
            <div className="sec-h2">Find your role</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px', margin: '0 auto 36px' }}>
            {[
              { title: 'Senior Full-Stack Engineer',    dept: 'Engineering',      type: 'Full-time · Remote (Canada)',   desc: 'Build core estimating features end-to-end — takeoff canvas, auto-count, and the bid page — across React and Node.' },
              { title: 'Product Designer',              dept: 'Design',           type: 'Full-time · Remote (Canada)',   desc: 'Own the product experience for trade estimators, from research and flows to polished, shippable UI.' },
              { title: 'Customer Success Manager',      dept: 'Customer Success', type: 'Full-time · Toronto, ON',       desc: 'Onboard contractors, run demos, and make sure every customer gets value from Real Cost in their first week.' },
              { title: 'Estimating Specialist (Trades)', dept: 'Product',         type: 'Full-time · Remote (Canada)',   desc: 'Bring real electrical/mechanical estimating expertise to shape pricing data, workflows, and templates.' },
            ].map((job, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.85)', border: '1px solid rgba(220,226,240,.9)', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '17px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.3px' }}>{job.title}</span>
                    <span style={{ background: 'var(--ind-light)', color: 'var(--ind)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '14px' }}>{job.dept}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8A92A6', fontWeight: '500', marginBottom: '8px' }}>{job.type}</div>
                  <div style={{ fontSize: '13.5px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300', maxWidth: '560px' }}>{job.desc}</div>
                </div>
                <a className="btn-prim" href={`mailto:careers@realcostestimating.ca?subject=${encodeURIComponent('Application: ' + job.title)}`} style={{ flexShrink: 0 }}>
                  Apply →
                </a>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#8A92A6', fontWeight: '400' }}>
            Don't see your role?{' '}
            <a href="mailto:careers@realcostestimating.ca" style={{ color: 'var(--sap)', fontWeight: '600', textDecoration: 'none' }}>
              Email us anyway →
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <div className="cta-band">
        <div className="wrc-cta-pad" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(228,199,120,.75)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '14px' }}>
            15 Years of Expertise. Now in Your Hands.
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.3px', marginBottom: '14px', lineHeight: '1.15' }}>
            Join 500+ Contractors<br />Who Trust Real Cost
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
            14-day free trial. No credit card required. Start estimating smarter today.
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

export default OurStory;
