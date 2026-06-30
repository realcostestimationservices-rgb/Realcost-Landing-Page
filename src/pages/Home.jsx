import React, { useState, useEffect, useRef } from 'react';
import Testimonials from '../components/ui/Testimonials';
import '../styles/pages/home.css';

const Home = ({ onNavigate }) => {
  const [tab2, setTab2] = useState(0);
  const monitorRef2 = useRef(null);

  useEffect(() => {
    const el = monitorRef2.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page-enter">
      {/* ════════ HERO ════════ */}
      <section className="hero">
        <img className="hero-video" src={process.env.PUBLIC_URL + '/images/features/Home.png'} alt="" aria-hidden="true" style={{ objectFit: 'cover' }} />
        <div className="hero-overlay"></div>
        <div className="hero-tint"></div>
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-badge"><div className="badge-dot"></div>⚡ Professional Electrical Estimating Software</div>
            <h1 className="hero-h1">Tired of overpriced,<br />over-complicated software?<br /><em>Your wait is over.</em></h1>
            <p className="hero-sub">Switch to <strong>Real Cost</strong> for a premium estimating experience — upload your drawings, count symbols, build your bid, and generate a quote letter, all in one place.</p>
            <div className="hero-btns">
              <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Switch to Real Cost now</a>
              <button className="btn-ghost" onClick={() => onNavigate('demo')}>📅 Request Demo</button>
            </div>
          </div>
        </div>

        {/* 15-year badge */}
        <div className="years-badge">
          <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gR" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#F8E860"/>
                <stop offset="50%"  stopColor="#D09C18"/>
                <stop offset="100%" stopColor="#8A6000"/>
              </linearGradient>
              <radialGradient id="gF" cx="38%" cy="30%" r="68%">
                <stop offset="0%"   stopColor="#1E1400"/>
                <stop offset="100%" stopColor="#050300"/>
              </radialGradient>
              <linearGradient id="gN" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#FFFBE0"/>
                <stop offset="45%"  stopColor="#F2CA28"/>
                <stop offset="100%" stopColor="#A87010"/>
              </linearGradient>
              <path id="tp" d="M 24,80 A 56,56 0 0,1 136,80"/>
              <path id="bp" d="M 24,80 A 56,56 0 0,0 136,80"/>
            </defs>

            {/* ── Ring 1: outer glow ── */}
            <circle cx="80" cy="80" r="78" fill="none" stroke="rgba(218,178,40,0.13)" strokeWidth="1.5"/>
            {/* ── Ring 2: dashed accent ── */}
            <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(218,178,40,0.55)" strokeWidth="1.1" strokeDasharray="2.5 4"/>
            {/* ── Ring 3: solid gold border ── */}
            <circle cx="80" cy="80" r="70" fill="none" stroke="url(#gR)" strokeWidth="2.8"/>
            {/* ── Fill ── */}
            <circle cx="80" cy="80" r="67" fill="url(#gF)"/>
            {/* ── Ring 4: inner hairline ── */}
            <circle cx="80" cy="80" r="61" fill="none" stroke="rgba(218,178,40,0.28)" strokeWidth="0.7"/>

            {/* ── Clock markers ── */}
            <line x1="80" y1="5"   x2="80" y2="14"  stroke="rgba(218,178,40,0.75)" strokeWidth="2"   strokeLinecap="round"/>
            <line x1="80" y1="146" x2="80" y2="155" stroke="rgba(218,178,40,0.75)" strokeWidth="2"   strokeLinecap="round"/>
            <line x1="5"  y1="80"  x2="14" y2="80"  stroke="rgba(218,178,40,0.42)" strokeWidth="1.4" strokeLinecap="round"/>
            <line x1="146" y1="80" x2="155" y2="80" stroke="rgba(218,178,40,0.42)" strokeWidth="1.4" strokeLinecap="round"/>

            {/* ── Corner dots at 45° ── */}
            <circle cx="80" cy="80" r="70" fill="none"
              stroke="rgba(218,178,40,0.0)" strokeWidth="0"/>
            <circle cx="130" cy="30" r="2"  fill="rgba(218,178,40,0.45)"/>
            <circle cx="30"  cy="30" r="2"  fill="rgba(218,178,40,0.45)"/>
            <circle cx="130" cy="130" r="2" fill="rgba(218,178,40,0.45)"/>
            <circle cx="30"  cy="130" r="2" fill="rgba(218,178,40,0.45)"/>

            {/* ── Top arc: REAL COST ── */}
            <text fontSize="8" fontWeight="700" letterSpacing="5" fill="rgba(238,198,48,0.92)" fontFamily="Plus Jakarta Sans,sans-serif">
              <textPath href="#tp" startOffset="50%" textAnchor="middle" dy="13">REAL COST</textPath>
            </text>

            {/* ── Bottom arc: SINCE 2010 ── */}
            <text fontSize="8" fontWeight="700" letterSpacing="4" fill="rgba(218,178,40,0.85)" fontFamily="Plus Jakarta Sans,sans-serif">
              <textPath href="#bp" startOffset="50%" textAnchor="middle" dy="-5">SINCE  2010</textPath>
            </text>

            {/* ── Divider rules ── */}
            <line x1="42" y1="50" x2="118" y2="50" stroke="rgba(218,178,40,0.38)" strokeWidth="0.8"/>
            <line x1="42" y1="108" x2="118" y2="108" stroke="rgba(218,178,40,0.38)" strokeWidth="0.8"/>

            {/* ── "15" ── */}
            <text x="80" y="93" textAnchor="middle" fontSize="52" fontWeight="900" fill="url(#gN)" letterSpacing="-2" fontFamily="Plus Jakarta Sans,sans-serif">15</text>

            {/* ── "YEARS" ── */}
            <text x="80" y="106" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="rgba(238,198,48,0.80)" letterSpacing="5.5" fontFamily="Plus Jakarta Sans,sans-serif">YEARS</text>

            {/* ── Three stars ── */}
            <text x="80" y="121" textAnchor="middle" fontSize="9" fill="rgba(218,178,40,0.55)" letterSpacing="7" fontFamily="Plus Jakarta Sans,sans-serif">★ ★ ★</text>
          </svg>
        </div>
      </section>

      {/* What is Real Cost */}
      <section className="sec-light">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
            <div>
              <div className="sec-eyebrow">What is Real Cost?</div>
              <div className="sec-h2">Your team does the estimates.<br />Real Cost makes it fast.</div>
              <p className="sec-sub" style={{ marginBottom: '20px' }}>Real Cost is a <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>digital estimation platform</strong> built for trade contractors. Upload your PDF drawings, automatically count symbols, build out a full bid page, and generate a branded quote letter — all without leaving the app.</p>
              <p className="sec-sub" style={{ marginBottom: '32px' }}>Whether you do electrical, mechanical, plumbing, fire alarm, or data — Real Cost gives your team the tools to produce accurate estimates faster than any spreadsheet or manual process.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="why-card"><div className="why-ico">📁</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '7px' }}>Upload PDF Drawings</div><div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>Multi-page blueprint sets. Navigate every page on a digital canvas inside the app.</div></div>
              <div className="why-card"><div className="why-ico">🔍</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '7px' }}>Symbol Auto-Count</div><div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>Draw a box around a symbol — the platform finds all matches across every page instantly.</div></div>
              <div className="why-card"><div className="why-ico">💰</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '7px' }}>Build Your Bid</div><div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>Material, labour, overhead, markup, duration — all calculated on your bid page.</div></div>
              <div className="why-card"><div className="why-ico">📋</div><div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '7px' }}>One-Click Quote Letter</div><div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>Generate a professional branded PDF quote letter ready to send to your client.</div></div>
            </div>
          </div>

          {/* YouTube demo */}
          <div style={{ marginTop: '52px', maxWidth: '860px', margin: '52px auto 0' }}>
            <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '22px' }}>Watch it in action</div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '14px', overflow: 'hidden', boxShadow: '0 28px 64px rgba(0,0,0,.22)', border: '1px solid rgba(15,37,87,.10)' }}>
              <iframe
                src="https://www.youtube.com/embed/qVM4iK-MxU0"
                title="Real Cost Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ padding: '36px 0', background: '#fff', borderTop: '1px solid rgba(220,226,240,.7)', borderBottom: '1px solid rgba(220,226,240,.7)' }}>
        <div className="cxl">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>

            {/* Capterra */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <svg width="90" height="22" viewBox="0 0 90 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="22" rx="5" fill="#FF9D28"/>
                  <polygon points="11,3 13.5,8.5 19.5,9 15,13 16.5,19 11,16 5.5,19 7,13 2.5,9 8.5,8.5" fill="#fff"/>
                  <text x="27" y="15.5" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#FF9D28">Capterra</text>
                </svg>
              </div>
              <div style={{ fontSize: '12px', color: '#FF9D28', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--txt)' }}>4.6 / 5</div>
            </div>

            <div style={{ width: '1px', height: '48px', background: 'rgba(15,37,87,.09)' }} />

            {/* GetApp */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <svg width="76" height="22" viewBox="0 0 76 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="22" rx="5" fill="#00B388"/>
                  <text x="5" y="16" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="900" fill="#fff">G</text>
                  <text x="27" y="15.5" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#00B388">GetApp</text>
                </svg>
              </div>
              <div style={{ fontSize: '12px', color: '#00B388', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--txt)' }}>4.6 / 5</div>
            </div>

            <div style={{ width: '1px', height: '48px', background: 'rgba(15,37,87,.09)' }} />

            {/* Software Advice */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <svg width="110" height="22" viewBox="0 0 110 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="22" rx="5" fill="#0B3A5D"/>
                  <text x="4" y="16" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="900" fill="#fff">SA</text>
                  <text x="27" y="15.5" fontFamily="Arial,sans-serif" fontSize="11.5" fontWeight="700" fill="#0B3A5D">Software Advice</text>
                </svg>
              </div>
              <div style={{ fontSize: '12px', color: '#0B3A5D', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--txt)' }}>4.6 / 5</div>
            </div>

            <div style={{ width: '1px', height: '48px', background: 'rgba(15,37,87,.09)' }} />

            {/* SOC 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L2 5.5V13c0 6.1 4.7 11.4 11 12 6.3-.6 11-5.9 11-12V5.5L13 1z" fill="var(--sap)"/>
                  <path d="M8 13l3.5 3.5 6.5-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--sap)', fontWeight: '700', marginBottom: '2px' }}>SOC 2 READY</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--txt)' }}>Enterprise</div>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: '52px', alignItems: 'center' }}>
            {/* Left: monitor canvas */}
            <div className="monitor-3d-wrap">
              <div ref={monitorRef2} className="monitor monitor-3d">
                <div className="mon-bar">
                  <div className="wdot" style={{ background: '#FF5F57' }}></div>
                  <div className="wdot" style={{ background: '#FFBD2E' }}></div>
                  <div className="wdot" style={{ background: '#28C840' }}></div>
                  <div className="mon-url">d3jt1vpskh0hbe.cloudfront.net / project / estimate</div>
                </div>
                <div className="mon-tabs">
                  <button className={`mt ${tab2 === 0 ? 'on' : ''}`} onClick={() => setTab2(0)}>🗺 Takeoff Canvas</button>
                  <button className={`mt ${tab2 === 1 ? 'on' : ''}`} onClick={() => setTab2(1)}>💰 Bid Page</button>
                  <button className={`mt ${tab2 === 2 ? 'on' : ''}`} onClick={() => setTab2(2)}>📄 Quote Letter</button>
                </div>
                <div style={{ display: tab2 === 0 ? 'block' : 'none', background: '#F2F4FC' }}>
                  <img src={process.env.PUBLIC_URL + '/images/features/take_off.png'} alt="Digital takeoff canvas" style={{ width: '100%', display: 'block' }} />
                </div>
                <div style={{ display: tab2 === 1 ? 'block' : 'none', background: '#F2F4FC' }}>
                  <img src={process.env.PUBLIC_URL + '/images/features/bid_page.png'} alt="Bid page" style={{ width: '100%', display: 'block' }} />
                </div>
                <div style={{ display: tab2 === 2 ? 'block' : 'none', background: '#F2F4FC' }}>
                  <img src={process.env.PUBLIC_URL + '/images/features/quote_letter.png'} alt="Quote letter" style={{ width: '100%', display: 'block' }} />
                </div>
              </div>
            </div>

            {/* Right: heading + timeline steps */}
            <div>
              <div className="sec-eyebrow">How it works</div>
              <div className="sec-h2" style={{ fontSize: '34px', marginBottom: '10px' }}>From drawings<br />to quote in 4 steps</div>
              <p className="sec-sub" style={{ marginBottom: '36px' }}>Your whole estimation workflow — in one app.</p>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '30px', bottom: '30px', width: '1.5px', background: 'linear-gradient(to bottom, rgba(17,38,70,.15), rgba(201,168,76,.4), rgba(17,38,70,.08))', borderRadius: '2px' }} />
                {[
                  { n: '1', label: 'Upload Drawings',    desc: 'Upload your PDF plan set. Every page renders on a navigable digital takeoff canvas.', gold: false },
                  { n: '2', label: 'Symbol Auto-Count',  desc: 'Draw a box around any symbol — the platform finds all matches across every page instantly.', gold: false },
                  { n: '3', label: 'Build Your Bid',     desc: 'Material, labour, overhead, markup and duration auto-calculated on your bid page.', gold: false },
                  { n: '4', label: 'Send Quote Letter',  desc: 'One click generates a branded PDF quote letter ready to submit to your client.', gold: true },
                ].map(({ n, label, desc, gold }) => (
                  <div key={n} style={{ display: 'flex', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', background: gold ? 'var(--grd-gold)' : 'var(--grd-sap)', color: gold ? '#0A1428' : '#fff', border: gold ? '1.5px solid rgba(201,168,76,.5)' : '1.5px solid rgba(45,80,137,.25)', boxShadow: '0 3px 10px rgba(15,37,87,.20)' }}>
                      {n}
                    </div>
                    <div style={{ paddingTop: '3px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '5px', letterSpacing: '-0.2px' }}>{label}</div>
                      <div style={{ fontSize: '12.5px', color: '#6B7489', lineHeight: '1.72', fontWeight: '300' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features preview */}
      <section className="sec-light" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="cxl">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div className="sec-eyebrow">Platform features</div>
              <div className="sec-h2">Everything you need to win bids.</div>
              <p className="sec-sub" style={{ maxWidth: '420px', margin: 0 }}>Built specifically for trade estimators in Canada.</p>
            </div>
            <button className="btn-ol-blue" onClick={() => onNavigate('features')}>View all features →</button>
          </div>
          <div className="home-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {[
              { ico: '🗺', accent: 'linear-gradient(90deg,#4F46E5,#7C5CE6)', bg: 'rgba(79,70,229,.15)', title: 'Digital Takeoff Canvas',  desc: 'Navigate multi-page PDF drawings on screen. Place symbols manually or let the app do it.' },
              { ico: '🔍', accent: 'linear-gradient(90deg,#0EA5E9,#38BDF8)', bg: 'rgba(14,165,233,.14)',  title: 'Symbol Auto-Count',       desc: 'Box-select a reference symbol and the platform matches it across every drawing page in seconds.' },
              { ico: '📍', accent: 'linear-gradient(90deg,#C5A047,#E4C778)', bg: 'rgba(197,160,71,.15)',  title: 'Canadian City Pricing',   desc: 'L1/L2/L3 tiers for Toronto, Ottawa, Montreal, Calgary, Vancouver and more.' },
              { ico: '🚚', accent: 'linear-gradient(90deg,#10B981,#34D399)', bg: 'rgba(16,185,129,.13)',  title: 'Supplier RFQs',           desc: 'Send quote requests to distributors and compare prices side-by-side in the bid page.' },
              { ico: '📊', accent: 'linear-gradient(90deg,#F59E0B,#FCD34D)', bg: 'rgba(245,158,11,.13)',  title: 'Estimate Graph',          desc: 'Visual breakdown of your bid — material, labour, overhead, and markup at a glance.' },
              { ico: '👥', accent: 'linear-gradient(90deg,#8B5CF6,#A78BFA)', bg: 'rgba(139,92,246,.14)',  title: 'Team Management',         desc: 'Owner and estimator roles. Assign projects, track progress, manage your subscription.' },
            ].map(({ ico, accent, bg, title, desc }) => (
              <div key={title} style={{ background: '#fff', border: '1px solid #E8EEF8', borderRadius: '18px', padding: '28px 26px', position: 'relative', overflow: 'hidden', transition: 'all .28s', boxShadow: '0 1px 6px rgba(15,37,87,.05)' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 20px 40px rgba(15,37,87,.10)'; e.currentTarget.style.borderColor='rgba(201,168,76,.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 6px rgba(15,37,87,.05)'; e.currentTarget.style.borderColor='#E8EEF8'; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px', background: accent, borderRadius: '18px 18px 0 0' }} />
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '18px', border: '1px solid rgba(15,37,87,.06)' }}>{ico}</div>
                <div style={{ fontSize: '14.5px', fontWeight: '600', color: 'var(--txt)', marginBottom: '8px', letterSpacing: '-.2px' }}>{title}</div>
                <div style={{ fontSize: '12.5px', color: '#6B7489', lineHeight: '1.76', fontWeight: '300' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trades — premium horizontal cards */}
      <section className="sec-grey">
        <div className="cxl">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Supported trades</div>
            <div className="sec-h2">Built for every trade on the job.</div>
            <p className="sec-sub" style={{ maxWidth: '440px', margin: '0 auto' }}>Real Cost works for all major construction trades — not just electrical.</p>
          </div>
          <div className="home-trades-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { ico: '⚡', bg: 'rgba(245,158,11,.10)', border: 'rgba(245,158,11,.22)', title: 'Electrical',         desc: 'Lighting, branch wiring, distribution, panels, feeders.',  img: process.env.PUBLIC_URL + '/images/trades/electrical.jpg' },
              { ico: '🌡', bg: 'rgba(14,165,233,.10)',  border: 'rgba(14,165,233,.22)',  title: 'Mechanical / HVAC', desc: 'Ductwork, equipment, piping, ventilation systems.',          img: process.env.PUBLIC_URL + '/images/trades/mechanical.jpg' },
              { ico: '🔧', bg: 'rgba(16,185,129,.10)', border: 'rgba(16,185,129,.22)', title: 'Plumbing',          desc: 'Fixtures, piping, drainage, water supply systems.',          img: process.env.PUBLIC_URL + '/images/trades/plumbing.jpg' },
            ].map(({ ico, bg, border, title, desc, img }) => (
              <div key={title} style={{ background: '#fff', border: '1px solid #E8EEF8', borderRadius: '20px', overflow: 'hidden', transition: 'all .22s', boxShadow: '0 2px 8px rgba(15,37,87,.06)' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 24px 48px rgba(15,37,87,.12)'; e.currentTarget.style.borderColor=border; }}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 2px 8px rgba(15,37,87,.06)'; e.currentTarget.style.borderColor='#E8EEF8'; }}>
                <img src={img} alt={title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{ico}</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.3px' }}>{title}</div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.78', fontWeight: '300' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="sec-light">
        <div className="cxl">
          <Testimonials />
        </div>
      </section>

      {/* CTA Band */}
      <div className="cta-band">
        <div style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <div className="gold-divider"></div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#fff', letterSpacing: '-1.3px', marginBottom: '14px' }}>Ready to do faster estimates?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.78', fontWeight: '300' }}>14-day free trial. No credit card required. Your whole team can be estimating digitally today.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href="https://d3jt1vpskh0hbe.cloudfront.net/" target="_blank" rel="noopener noreferrer">🚀 Start free trial</a>
            <button className="btn-ol-inv" onClick={() => onNavigate('contact')}>📞 Talk to us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
