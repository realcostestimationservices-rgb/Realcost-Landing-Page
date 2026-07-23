import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Testimonials from '../components/ui/Testimonials';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import CountUp from '../components/ui/CountUp';
import '../styles/pages/home.css';
import { LOGIN_URL } from '../config';

/* Slide + copy travel on the same easing so they read as one moving surface. */
const SLIDE_EASE = { duration: 0.95, ease: [0.65, 0, 0.35, 1] };

/* Hero carousel slides. The copy (badge / headline / sub) swaps per slide; the
   15-year badge and the CTA buttons stay put across all three. */
const HERO_SLIDES = [
  {
    slug: 'intro',
    image: '/images/home/Home.png',
    mobileImage: '/images/home/home_1_mobile.png',
    badge: 'Professional Electrical Estimating Software',
    title: <>Tired of overpriced,<br />over-complicated software?<br /><em>Your wait is over.</em></>,
    sub: <>Switch to <strong>Real Cost</strong> for a premium estimating experience — upload your drawings, count symbols, build your bid, and generate a quote letter, all in one place.</>,
  },
  {
    slug: 'takeoff',
    image: '/images/home/home_2.png',
    mobileImage: '/images/home/home_2_mobile.png',
    badge: 'Digital takeoff & symbol auto-count',
    title: <>Stop counting symbols<br />by hand.<br /><em>Let the Software do it.</em></>,
    sub: <>Box-select a single symbol and <strong>Real Cost</strong> finds every match across every page of your drawing set — in seconds, not evenings.</>,
  },
  {
    slug: 'bid',
    image: '/images/home/home_3.png',
    mobileImage: '/images/home/home_3_mobile.png',
    badge: 'Bid page & one-click quote letter',
    title: <>From drawings to a<br />branded quote.<br /><em>In four steps.</em></>,
    sub: <>Material, labour, overhead and markup — calculated on your bid page, then sent out as a <strong>professional PDF quote letter</strong>.</>,
  },
];


const MONITOR_TABS = [
  { label: 'Take Off',       image: '/images/home/take_off_how_it_works.png',            alt: 'Digital takeoff canvas' },
  { label: 'Estimating',     image: '/images/home/estimating_take_off_how_it_works.png', alt: 'Estimating' },
  { label: 'Gen Materials',  image: '/images/home/mat_list_take_off_how_it_works.png',   alt: 'Generated materials list' },
  { label: 'Bid Page',       image: '/images/home/bid_take_off_how_it_works.png',        alt: 'Bid page' },
  { label: 'Quote Letter',   image: '/images/home/quote_how_it_works.png',               alt: 'Branded PDF quote letter' },
  { label: 'Estimate Graph', image: '/images/home/graph_take_off_how_it_works.png',      alt: 'Estimate graph' },
];

const Home = ({ onNavigate }) => {
  const [tab2, setTab2] = useState(0);
  const [lightbox, setLightbox] = useState(null); // index of the tab being previewed, or null
  const [currentStep, setCurrentStep] = useState(0);
  const monitorRef2 = useRef(null);
  const monitorPausedRef = useRef(false); // hover pause — a ref so it can never wedge a re-render
  const lightboxOpenRef = useRef(false); // preview pause — kept out of the autoplay deps

  const N = HERO_SLIDES.length;
  const [pos, setPos] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const pausedRef = useRef(false); // hover pause — a ref so it can never wedge a re-render
  const touchX = useRef(null);

  const nextSlide = () => setPos((p) => (p >= N ? 1 : p + 1));
  const prevSlide = () => setPos((p) => (p - 1 + N) % N);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer;
    const step = () => {
      if (!pausedRef.current && !document.hidden) setPos((p) => p + 1);
      timer = setTimeout(step, 6000);
    };
    timer = setTimeout(step, 6000);
    return () => clearTimeout(timer);
  }, []);

  /* When pos reaches the appended clone, let the slide animation play, then jump
     back to the real first slide with no transition — so 3 → 1 reads as one
     continuous leftward move. */
  useEffect(() => {
    if (pos < N) return;
    const t = setTimeout(() => { setSnapping(true); setPos(0); }, 1000);
    return () => clearTimeout(t);
  }, [pos, N]);
  useEffect(() => {
    if (!snapping) return;
    const r = requestAnimationFrame(() => setSnapping(false));
    return () => cancelAnimationFrame(r);
  }, [snapping]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? nextSlide : prevSlide)();
    touchX.current = null;
  };

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

  /* Monitor autoplay: step through the tabs every 2s and wrap back to the first.
     Keyed on tab2 so the dwell restarts whenever the panel changes — clicking a
     tab therefore gets a full 2s rather than being cut short by a tick already in
     flight. While paused it reschedules without advancing, so autoplay resumes on
     mouse-out instead of dying on the first skipped tick. */
  useEffect(() => {
    let timer;
    const step = () => {
      if (monitorPausedRef.current || lightboxOpenRef.current || document.hidden) {
        timer = setTimeout(step, 2000);
        return;
      }
      setTab2((i) => (i + 1) % MONITOR_TABS.length);
    };
    timer = setTimeout(step, 2000);
    return () => clearTimeout(timer);
  }, [tab2]);

  /* Image preview: opening the lightbox parks autoplay on the tab you clicked, so
     you come back to the same panel instead of one that moved on behind the overlay. */
  const openPreview = (i) => {
    lightboxOpenRef.current = true;
    setTab2(i);
    setLightbox(i);
  };
  const closePreview = () => {
    lightboxOpenRef.current = false;
    setLightbox(null);
  };

  /* Esc closes the preview; arrows step between screenshots without leaving it.
     Body scroll is locked while it's open so the page doesn't drift underneath. */
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closePreview();
      else if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % MONITOR_TABS.length);
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + MONITOR_TABS.length) % MONITOR_TABS.length);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  /* Steps autoplay: cycle through the 4 steps every 3s */
  useEffect(() => {
    let timer;
    const step = () => {
      setCurrentStep((i) => (i + 1) % 4);
    };
    timer = setTimeout(step, 3000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="page-enter">
      {/* ════════ HERO ════════ */}
      <section
        className="hero"
        aria-roledescription="carousel"
        aria-label="Real Cost highlights"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Background track: the three images sit side by side and the whole
            strip slides, so a slide change reads as a horizontal swipe. */}
        <motion.div
          className="hero-bg-track"
          animate={{ x: `-${pos * 100}%` }}
          transition={snapping ? { duration: 0 } : SLIDE_EASE}
        >
          {[...HERO_SLIDES, HERO_SLIDES[0]].map((s, i) => {
            const imageUrl = isMobile && s.mobileImage ? s.mobileImage : s.image;
            return (
              <div className="hero-bg-slide" key={i}>
                <img
                  className={`hero-slide-img hero-slide-${s.slug}${i === pos ? ' is-active' : ''}`}
                  src={process.env.PUBLIC_URL + imageUrl}
                  alt=""
                  aria-hidden="true"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}
        </motion.div>
        <div className="hero-tint"></div>
        {/* A scrim behind the copy column on every slide — the art is bright
            right where the headline sits. It stops well short of the middle of
            the frame, so the photo itself stays clear. */}
        <div className="hero-copy-scrim" aria-hidden="true"></div>
        <div className={`hero-inner ${pos === 1 ? 'hero-inner-right' : ''}`}>
          {/* Fade-only entrance (no transform): a transform here would make
              .hero-left the containing block for the absolutely-positioned
              .years-badge, so the badge would sit inside this column mid-
              animation and then snap to the right when the transform drops.
              Keeping it transform-free anchors the badge to .hero-inner
              throughout, so it simply drops in from the top. */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Copy track: slides in lockstep with the background, so the words
                travel with their image. The window is as tall as the tallest of
                the three, so the badge and buttons below never move. */}
            <div className="hero-copy-window">
              <motion.div
                className="hero-copy-track"
                animate={{ x: `-${pos * 100}%` }}
                transition={snapping ? { duration: 0 } : SLIDE_EASE}
              >
                {[...HERO_SLIDES, HERO_SLIDES[0]].map((s, i) => (
                  <div className={`hero-copy${i === pos ? ' is-active' : ''}`} key={i} aria-hidden={i !== pos}>
                    <div className="hero-badge"><div className="badge-dot"></div>{s.badge}</div>
                    <h1 className="hero-h1">{s.title}</h1>
                    <p className="hero-sub">{s.sub}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* 15-year badge — sits in the flow between the copy and the buttons
                on mobile; absolutely positioned bottom-right on desktop (see
                .years-badge in home.css) */}
            <motion.div
              className="years-badge"
              initial={{ opacity: 0, y: -110, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* inner wrapper keeps a gentle idle float once the badge has
                  dropped in from the top */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
              <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gR" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#FFE7DC"/>
                    <stop offset="50%"  stopColor="#E0A08C"/>
                    <stop offset="100%" stopColor="#9C5A47"/>
                  </linearGradient>
                  <radialGradient id="gF" cx="38%" cy="30%" r="68%">
                    <stop offset="0%"   stopColor="#16305C"/>
                    <stop offset="100%" stopColor="#0A1428"/>
                  </radialGradient>
                  <linearGradient id="gN" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#FFF5F0"/>
                    <stop offset="45%"  stopColor="#F3C3AE"/>
                    <stop offset="100%" stopColor="#C8836B"/>
                  </linearGradient>
                  <path id="tp" d="M 24,80 A 56,56 0 0,1 136,80"/>
                  <path id="bp" d="M 24,80 A 56,56 0 0,0 136,80"/>
                </defs>

                {/* ── Ring 1: outer glow ── */}
                <circle cx="80" cy="80" r="78" fill="none" stroke="rgba(224,160,140,0.14)" strokeWidth="1.5"/>
                {/* ── Ring 2: dashed accent ── */}
                <circle cx="80" cy="80" r="74" fill="none" stroke="rgba(224,160,140,0.55)" strokeWidth="1.1" strokeDasharray="2.5 4"/>
                {/* ── Ring 3: solid rose-gold border ── */}
                <circle cx="80" cy="80" r="70" fill="none" stroke="url(#gR)" strokeWidth="2.8"/>
                {/* ── Fill ── */}
                <circle cx="80" cy="80" r="67" fill="url(#gF)"/>
                {/* ── Ring 4: inner hairline ── */}
                <circle cx="80" cy="80" r="61" fill="none" stroke="rgba(243,195,174,0.30)" strokeWidth="0.7"/>

                {/* ── Clock markers ── */}
                <line x1="80" y1="5"   x2="80" y2="14"  stroke="rgba(224,160,140,0.78)" strokeWidth="2"   strokeLinecap="round"/>
                <line x1="80" y1="146" x2="80" y2="155" stroke="rgba(224,160,140,0.78)" strokeWidth="2"   strokeLinecap="round"/>
                <line x1="5"  y1="80"  x2="14" y2="80"  stroke="rgba(224,160,140,0.45)" strokeWidth="1.4" strokeLinecap="round"/>
                <line x1="146" y1="80" x2="155" y2="80" stroke="rgba(224,160,140,0.45)" strokeWidth="1.4" strokeLinecap="round"/>

                {/* ── Corner dots at 45° ── */}
                <circle cx="80" cy="80" r="70" fill="none"
                  stroke="rgba(224,160,140,0.0)" strokeWidth="0"/>
                <circle cx="130" cy="30" r="2"  fill="rgba(224,160,140,0.48)"/>
                <circle cx="30"  cy="30" r="2"  fill="rgba(224,160,140,0.48)"/>
                <circle cx="130" cy="130" r="2" fill="rgba(224,160,140,0.48)"/>
                <circle cx="30"  cy="130" r="2" fill="rgba(224,160,140,0.48)"/>

                {/* ── Top arc: REAL COST ── */}
                <text fontSize="8" fontWeight="700" letterSpacing="5" fill="rgba(243,195,174,0.94)" fontFamily="Plus Jakarta Sans,sans-serif">
                  <textPath href="#tp" startOffset="50%" textAnchor="middle" dy="13">REAL COST</textPath>
                </text>

                {/* ── Bottom arc: SINCE 2010 ── */}
                <text fontSize="8" fontWeight="700" letterSpacing="4" fill="rgba(224,160,140,0.88)" fontFamily="Plus Jakarta Sans,sans-serif">
                  <textPath href="#bp" startOffset="50%" textAnchor="middle" dy="-5">SINCE  2010</textPath>
                </text>

                {/* ── Divider rules ── */}
                <line x1="42" y1="50" x2="118" y2="50" stroke="rgba(224,160,140,0.40)" strokeWidth="0.8"/>
                <line x1="42" y1="108" x2="118" y2="108" stroke="rgba(224,160,140,0.40)" strokeWidth="0.8"/>

                {/* ── "15" ── */}
                <text x="80" y="93" textAnchor="middle" fontSize="52" fontWeight="900" fill="url(#gN)" letterSpacing="-2" fontFamily="Plus Jakarta Sans,sans-serif">15</text>

                {/* ── "YEARS" ── */}
                <text x="80" y="106" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="rgba(243,195,174,0.82)" letterSpacing="5.5" fontFamily="Plus Jakarta Sans,sans-serif">YEARS</text>

                {/* ── Three stars ── */}
                <text x="80" y="121" textAnchor="middle" fontSize="9" fill="rgba(224,160,140,0.58)" letterSpacing="7" fontFamily="Plus Jakarta Sans,sans-serif">★ ★ ★</text>
              </svg>
              </motion.div>
            </motion.div>

            <motion.div className="hero-btns" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Switch to Real Cost now</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('demo')}>Request Demo</motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Smart Software / Download Brochure */}
      <section className="sec-light">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <Reveal>
              <div className="sec-eyebrow">Smart estimating software</div>
              <div className="sec-h2" style={{ marginBottom: '16px' }}>Smart Software for<br />Accurate Estimating</div>
              <p className="sec-sub" style={{ marginBottom: '28px', maxWidth: '440px' }}>
                We build user-focused estimating software that aligns with your business goals — upload drawings, auto-count symbols, build your bid, and send a branded quote letter, all in one place.
              </p>
              <div className="ph-stat-row hb-stat-row">
                <div className="ph-stat"><div className="ph-stat-n"><CountUp end={15} suffix="+" /></div><div className="ph-stat-l">Years Experience</div></div>
                <div className="ph-stat"><div className="ph-stat-n"><CountUp end={500} suffix="+" /></div><div className="ph-stat-l">Contractors Served</div></div>
                <div className="ph-stat"><div className="ph-stat-n"><CountUp end={9} /></div><div className="ph-stat-l">Trades Supported</div></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={process.env.PUBLIC_URL + '/downloads/RealCost_brochure.pdf'} download>
                  Download Brochure
                </motion.a>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-blue" onClick={() => onNavigate('demo')}>
                  See it in action
                </motion.button>
              </div>
            </Reveal>
            <Reveal delay={0.1} initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="hb-image-col">
                <div className="hb-accent" aria-hidden="true" />
                <div className="hb-image-card">
                  <img src={process.env.PUBLIC_URL + '/images/misc/brochure.png'} alt="Real Cost brochure" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What is Real Cost */}
      <section className="sec-tint">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
            <Reveal>
              <div className="sec-eyebrow">What is Real Cost?</div>
              <div className="sec-h2">Built for Electrical<br />Contractors in Canada</div>
              <p className="sec-sub" style={{ marginBottom: '20px' }}>Real Cost is a <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>digital estimation platform</strong> built for electrical contractors. Upload your PDF drawings, automatically count symbols, build out a full bid page, and generate a branded quote letter — all without leaving the software.</p>
              <p className="sec-sub" style={{ marginBottom: '32px' }}>Built specifically for electrical contractors, Real Cost gives your team the tools to produce accurate estimates faster than any spreadsheet or manual process.</p>
            </Reveal>
            <RevealGroup style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} delay={0.1}>
              {[
                { image: '/images/home/upload_pdf.png', title: 'Upload PDF Drawings', desc: 'Multi-page blueprint sets. Navigate every page on a digital canvas inside the software.' },
                { image: '/images/home/auto_count.png', title: 'Symbol Auto-Count', desc: 'Draw a box around a symbol — the platform finds all matches across every page instantly.' },
                { image: '/images/home/bid.png', title: 'Build Your Bid', desc: 'Material, labour, overhead, markup, duration — all calculated on your bid page.' },
                { image: '/images/home/quote.png', title: 'One-Click Quote Letter', desc: 'Generate a professional branded PDF quote letter ready to send to your client.' },
              ].map(({ image, title, desc }) => (
                <div className="why-card" key={title}>
                  <div className="why-ico">
                    <img src={process.env.PUBLIC_URL + image} alt="" aria-hidden="true" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '7px' }}>{title}</div>
                  <div style={{ fontSize: '13px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300' }}>{desc}</div>
                </div>
              ))}
            </RevealGroup>
          </div>

          {/* YouTube demo */}
          <Reveal delay={0.15} style={{ marginTop: '52px', maxWidth: '860px', margin: '52px auto 0' }}>
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

          </Reveal>
        </div>
      </section>

      {/* Benefits section */}
      <section className="sec-light">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 42px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Benefits of job estimating software</div>
            <div className="sec-h2">Give your estimating process a major upgrade</div>
            <p className="sec-sub" style={{ margin: '0 auto', maxWidth: '720px' }}>
              Goodbye guesswork. Hello improved business operations. Upgrade the way your teams tackle projects with estimating software that delivers improved accuracy, saves time, and brings your teams and customers together in a single place.
            </p>
          </Reveal>
          <RevealGroup className="home-benefit-grid" style={{ gap: '18px' }}>
            {[
              { img: '/images/home/benefits_1.png', title: 'Bring your teams together', copy: 'Centralised communication and task tracking keeps everyone connected and aligned.' },
              { img: '/images/home/benefits_2.png', title: 'Forecast projects accurately', copy: 'Create precise estimates to anticipate costs, timelines, and resources.' },
              { img: '/images/home/benefits_3.png', title: 'Save time and resources', copy: 'Reduce manual work and ensure the right people and materials are on every job.' },
              { img: '/images/home/benefits_4.png', title: 'Improve customer experience', copy: 'Deliver quotes faster and keep customers informed, building trust and meeting expectations.' },
            ].map((item) => (
              <div key={item.title} className="home-benefit-card">
                <img className="home-benefit-image" src={process.env.PUBLIC_URL + item.img} alt={item.title} loading="lazy" />
                <div className="home-benefit-content">
                  <div className="home-benefit-title">{item.title}</div>
                  <div className="home-benefit-desc">{item.copy}</div>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How it works */}
      <section className="sec-tint">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr', gap: '52px', alignItems: 'center' }}>
            {/* Left: monitor canvas */}
            <Reveal className="monitor-3d-wrap" y={0} style={{ opacity: 0 }} initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}>
              
              <div
                ref={monitorRef2}
                className="monitor monitor-3d"
                onMouseEnter={() => { monitorPausedRef.current = true; }}
                onMouseLeave={() => { monitorPausedRef.current = false; }}
              >
                <div className="mon-tabs">
                  {MONITOR_TABS.map(({ label }, i) => (
                    <button key={label} className={`mt ${tab2 === i ? 'on' : ''}`} onClick={() => setTab2(i)}>{label}</button>
                  ))}
                </div>
                <div className="mon-stage">
                  {MONITOR_TABS.map(({ label, image, alt }, i) => (
                    <div key={label} className={`mon-panel${tab2 === i ? ' on' : ''}`} aria-hidden={tab2 !== i}>
                      <button
                        type="button"
                        className="mon-shot"
                        onClick={() => openPreview(i)}
                        tabIndex={tab2 === i ? 0 : -1}
                        aria-label={`View ${label} full size`}
                      >
                        <img src={process.env.PUBLIC_URL + image} alt={alt} />
                        <span className="mon-zoom">Click to enlarge</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Name of the screenshot currently on the monitor */}
              <div className="mon-caption">{MONITOR_TABS[tab2].label}</div>
            </Reveal>

            {/* Right: heading + timeline steps */}
            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="sec-eyebrow">How it works</div>
              <div className="sec-h2" style={{ fontSize: '34px', marginBottom: '10px' }}>From drawings<br />to quote in 4 steps</div>
              <p className="sec-sub" style={{ marginBottom: '36px' }}>Your whole estimation workflow — in one software.</p>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '30px', bottom: '30px', width: '1.5px', background: 'linear-gradient(to bottom, rgba(17,38,70,.15), rgba(96,165,250,.4), rgba(17,38,70,.08))', borderRadius: '2px' }} />
                {[
                  { n: '1', label: 'Upload Drawings',      desc: 'Upload your PDF plan set. Every page renders on a navigable digital takeoff canvas.', accent: false },
                  { n: '2', label: 'Takeoff & Estimating', desc: 'Box-select any symbol to auto-count every match, then material, labour, overhead and markup are calculated as you go.', accent: false },
                  { n: '3', label: 'Build Your Bid',       desc: 'Assemble your bid page with pricing, totals and project duration ready to review.', accent: false },
                  { n: '4', label: 'Send Quote Letter',    desc: 'One click generates a branded PDF quote letter ready to submit to your client.', accent: true },
                ].map(({ n, label, desc, accent }) => (
                  <div key={n} style={{ display: 'flex', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', background: accent ? 'var(--grd-acc)' : 'var(--grd-sap)', color: '#fff', border: accent ? '1.5px solid rgba(96,165,250,.5)' : '1.5px solid rgba(45,80,137,.25)', boxShadow: '0 3px 10px rgba(15,37,87,.20)' }}>
                      {n}
                    </div>
                    <div style={{ paddingTop: '3px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--txt)', marginBottom: '5px', letterSpacing: '-0.2px' }}>{label}</div>
                      <div style={{ fontSize: '12.5px', color: '#6B7489', lineHeight: '1.72', fontWeight: '300' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* How-it-works image preview */}
      {lightbox !== null && (
        <div className="mon-lb" role="dialog" aria-modal="true" aria-label={MONITOR_TABS[lightbox].label} onClick={closePreview}>
          <div className="mon-lb-box" onClick={(e) => e.stopPropagation()}>
            <div className="mon-lb-bar">
              <span className="mon-lb-name">{MONITOR_TABS[lightbox].label}</span>
              <span className="mon-lb-count">{lightbox + 1} / {MONITOR_TABS.length}</span>
              <button type="button" className="mon-lb-x" onClick={closePreview} aria-label="Close preview">×</button>
            </div>
            <img
              className="mon-lb-img"
              src={process.env.PUBLIC_URL + MONITOR_TABS[lightbox].image}
              alt={MONITOR_TABS[lightbox].alt}
            />
            <button
              type="button"
              className="mon-lb-nav prev"
              aria-label="Previous image"
              onClick={() => setLightbox((i) => (i - 1 + MONITOR_TABS.length) % MONITOR_TABS.length)}
            >‹</button>
            <button
              type="button"
              className="mon-lb-nav next"
              aria-label="Next image"
              onClick={() => setLightbox((i) => (i + 1) % MONITOR_TABS.length)}
            >›</button>
          </div>
        </div>
      )}

      {/* Features preview */}
      <section className="sec-light" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="cxl home-featp">
          <div className="home-featp-head">
            <div className="sec-eyebrow">Platform features</div>
            <div className="sec-h2">Everything you need to win bids.</div>
            <p className="sec-sub" style={{ maxWidth: '420px', margin: 0 }}>Built specifically for trade estimators in Canada.</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-blue home-featp-cta" onClick={() => onNavigate('features')}>View all features →</motion.button>
          <RevealGroup className="home-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {[
              {
                bg: 'rgba(79,70,229,.15)', title: 'Digital Takeoff Canvas',  desc: 'Navigate multi-page PDF drawings on screen. Place symbols manually or let the software do it.',
                img: '/images/features/take_off.png',
              },
              {
                bg: 'rgba(14,165,233,.14)',  title: 'Symbol Auto-Count',       desc: 'Box-select a reference symbol and the platform matches it across every drawing page in seconds.',
                img: '/images/features/autocount.png',
              },
              {
                bg: 'rgba(155, 194, 241, 0.15)',  title: 'Canadian City Pricing',   desc: 'Regional pricing for Ontario ,Toronto, Ottawa, Montreal, Calgary, Vancouver and more.',
                img: '/images/features/canada-map.webp', fit: true,
              },

            ].map(({ bg, title, desc, img, fit }) => (
              <motion.div key={title} className="home-featp-card" style={{ background: '#fff', border: '1px solid #E8EEF8', borderRadius: '18px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 6px rgba(15,37,87,.05)', height: '100%' }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15,37,87,.10)', borderColor: 'rgba(96,165,250,.35)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <div className={`home-featp-card-img${fit ? ' is-fit' : ''}`} style={{
                  background: bg,
                  backgroundImage: `url(${process.env.PUBLIC_URL}${img})`,
                  backgroundSize: fit ? 'contain' : 'cover',
                  backgroundPosition: fit ? 'center' : 'center top',
                  backgroundRepeat: 'no-repeat'
                }}>
                </div>
                <div style={{ padding: '22px 26px 26px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: '600', color: 'var(--txt)', marginBottom: '8px', letterSpacing: '-.2px' }}>{title}</div>
                  <div style={{ fontSize: '12.5px', color: '#6B7489', lineHeight: '1.76', fontWeight: '300' }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Project coverage */}
      <section className="sec-tint">
        <div className="cxl">
          <div className="hm-coverage-grid" style={{ display: 'grid', gap: '64px', alignItems: 'center' }}>
            <Reveal initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="sec-eyebrow">Project coverage</div>
              <div className="sec-h2">
                Estimate Any Electrical<br />
                Project
              </div>
              <p className="sec-sub" style={{ fontSize: '16px', fontWeight: '500', color: 'var(--sap)', marginBottom: '32px' }}>
                Any project size, any voltage type, Real Cost can help.
              </p>
              <div className="hm-coverage-list" style={{ display: 'grid', gap: '20px 28px' }}>
                {[
                  'Commercial Estimating',
                  'High Voltage Estimating',
                  'Industrial Estimating',
                  'Medium Voltage Estimating',
                  'Low Voltage Estimating',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '800', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '14.5px', fontWeight: '500', color: 'var(--txt)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Illustration */}
            <Reveal initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={process.env.PUBLIC_URL + '/images/misc/project.png'} alt="Electrical project estimating" style={{ width: '100%', maxWidth: '340px', height: 'auto', display: 'block' }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="sec-tint">
        <div className="cxl">
          <Reveal><Testimonials /></Reveal>
        </div>
      </section>

      {/* Trust bar */}
      <Reveal as="section" style={{ padding: '36px 0', background: '#FAFBFE' }}>
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
              <div style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
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
              <div style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
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
              <div style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: '700', marginBottom: '2px' }}>★★★★½</div>
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
      </Reveal>

      {/* CTA Band */}
      <div className="cta-band">
        <Reveal style={{ position: 'relative', zIndex: 1, padding: '0 80px' }}>
          <div className="accent-divider"></div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#fff', letterSpacing: '-1.3px', marginBottom: '14px' }}>Ready to do faster estimates?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.78', fontWeight: '300' }}>14-day free trial. No credit card required. Your whole team can be estimating digitally today.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Start free trial</motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-inv" onClick={() => onNavigate('contact')}>Talk to us</motion.button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Home;
