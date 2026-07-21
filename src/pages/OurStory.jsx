import React, { useState, useRef, useEffect } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import '../styles/pages/our-story.css';
import { LOGIN_URL } from '../config';

function CountUp({ value, suffix = '', duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString('en-US')),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const milestones = [
  { year: '2010', label: 'Founded', desc: 'Real Cost Estimating Inc. was established at 1200 Bloor Street West, Toronto — a team of experienced electrical estimators serving contractors across Canada.' },
  { year: '2013', label: 'First 100 Clients', desc: 'Reached 100 electrical contractors served, building a reputation for accurate, affordable estimates on commercial and institutional projects.' },
  { year: '2017', label: 'Nationwide Reach', desc: 'Expanded to serve contractors in Vancouver, Calgary, Edmonton, Ottawa and Montreal — delivering city-specific pricing across all major Canadian markets.' },
  { year: '2023', label: 'Software Launch', desc: 'Real Cost evolved from a service firm into a full SaaS platform — putting 15 years of job-winning formulas and assemblies directly in the hands of contractors.' },
  { year: '2026', label: '500+ Contractors', desc: 'Over 500 electrical contractors now use Real Cost to run faster, more accurate estimates — with 8,000+ projects estimated and 1,000+ projects won.' },
];


const sectors = [
  { img: '/images/trades/commercial.png' },
  { img: '/images/trades/residential.png' },
  { img: '/images/trades/institutional.png' },
  { img: '/images/trades/industrial.png' },
];

const IconUsers = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCrane = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="21" x2="6" y2="4" />
    <line x1="3" y1="21" x2="9" y2="21" />
    <line x1="6" y1="4" x2="22" y2="4" />
    <line x1="6" y1="4" x2="2" y2="8" />
    <line x1="6" y1="8" x2="10" y2="4" />
    <line x1="18" y1="4" x2="18" y2="10" />
    <path d="M18 10l-2 3h4z" />
  </svg>
);

const IconHardHat = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21a9 9 0 0 1 18 0" />
    <path d="M12 3a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5z" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="12" y1="9" x2="12" y2="6" />
  </svg>
);

const IconTrophy = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 5H4a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4" />
    <path d="M17 5h3a1 1 0 0 1 1 1v1a4 4 0 0 1-4 4" />
  </svg>
);

const IconTrending = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 17 9 11 13 15 21 6" />
    <polyline points="14 6 21 6 21 13" />
  </svg>
);

const SLIDE_DURATION = 4000;

const OurStory = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused]           = useState(false);
  const [openJob, setOpenJob]         = useState(null);
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
      <section className="page-hero os-hero">
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/about/our_bg.png'})` }}></div>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'linear-gradient(105deg,rgba(10,20,40,.48) 0%,rgba(10,20,40,.30) 34%,transparent 62%)' }} />
        <div className="hero-glow" />
        <div className="cxl" style={{ textAlign:'left' }}>
          <motion.div
            style={{ maxWidth:'580px' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pg-badge">Your Estimating Partner</div>
            <div className="ph-title">15 Years of Winning Bids.<br />Now in Your Hands.</div>
            <p style={{ fontSize:'15px', color:'rgba(191,219,254,.85)', fontWeight:'600', letterSpacing:'.01em', margin:'0 0 14px' }}>
              Trusted Name in the Electrical Estimating Industry
            </p>
            <p className="sec-sub" style={{ margin:'0 0 40px' }}>
              Real Cost Estimating Inc. started as a team of estimators helping contractors win work.
              Today, that expertise is built into a platform trusted by 500+ contractors across Canada.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Try Free for 14 Days</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('demo')}>Request Demo</motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <Reveal as="section" className="os-stats-sec">
        <div className="cxl">
          <RevealGroup className="os-stats-grid">
            {[
              { v: 1000, s: '+', l: 'Projects Won',       ico: <IconTrophy />,   color: 'var(--gold)' },
              { v: 8000, s: '+', l: 'Projects Estimated', ico: <IconCrane />,    color: 'var(--gold3)' },
              { v: 500,  s: '+', l: 'Contractors Served', ico: <IconUsers />,    color: 'var(--gold)' },
              { v: 10,   s: 'x', l: 'Client ROI',         ico: <IconTrending />, color: 'var(--gold3)' },
              { v: 15,   s: '+', l: 'Years Experience',   ico: <IconHardHat />,  color: 'var(--gold)' },
            ].map(({ v, s, l, ico, color }) => (
              <div key={l} className="os-stat">
                <div className="os-stat-ico" style={{ color }}>{ico}</div>
                <div className="os-stat-txt">
                  <div className="os-stat-num">
                    <CountUp value={v} suffix={s} />
                  </div>
                  <div className="os-stat-label">{l}</div>
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Reveal>

      {/* ── Who We Are ── */}
      <section className="sec-light">
        <div className="cxl">
          <div className="os-2col">
            <Reveal>
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
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Get Started</motion.a>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" style={{ background: 'rgba(17,38,70,.07)', color: 'var(--sap)', border: '1px solid rgba(17,38,70,.18)', backdropFilter: 'none' }} onClick={() => onNavigate('contact')}>Contact Us</motion.button>
              </div>
            </Reveal>

            {/* Right: scroll peek slider */}
            <Reveal
              className="os-coverflow-wrap"
              delay={0.1}
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

            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Works Like You Do ── */}
      <section className="os-worklike">
        <div className="cxl">
          <div className="os-2col">
            <Reveal>
              <div className="sec-eyebrow accent">Built By Estimators</div>
              <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-1.2px', lineHeight: '1.16', marginBottom: '20px' }}>
                Finally, Software That<br />Works Like You Do
              </h2>
              <p style={{ fontSize: '15px', color: 'rgba(17,38,70,.78)', lineHeight: '1.85', fontWeight: '400', marginBottom: '32px', maxWidth: '480px' }}>
                We're not some Silicon Valley startup. We're electrical estimators who got tired of overpriced, overcomplicated software. So we built exactly what we needed — and nothing we didn't.
              </p>
              <div className="os-worklike-checks">
                {[
                  'Run takeoffs and build bids from your laptops',
                  'Auto-count symbols instead of counting by hand',
                  'Canadian city-based pricing built in — no manual lookups',
                  'Generate a branded quote letter in one click',
                  'No lock-in contracts — cancel anytime',
                ].map((point) => (
                  <div key={point} className="os-worklike-check">
                    <div className="os-worklike-check-ico">✓</div>
                    <div className="os-worklike-check-txt">{point}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="os-sink-wrap" initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="os-sink-glow" />
              <img className="os-sink-img" src={process.env.PUBLIC_URL + '/images/misc/built_by_estimators.png'} alt="Built by estimators, for estimators" />
              <div className="os-sink-shade" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Our Legacy / Software Solutions ── */}
      <section className="sec-grey">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Our Legacy</div>
            <div className="sec-h2">From Estimation Services<br />to Software Solutions</div>
            <p className="sec-sub">
              What began as an estimating firm evolved into Canada's most trusted electrical estimation platform — putting 15 years of refined formulas directly into contractors' hands.
            </p>
          </Reveal>

          {/* Timeline */}
          <motion.div
            className="os-timeline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
          >
            <div className="os-timeline-line" />
            {milestones.map(({ year, label, desc }, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={year}
                  className={`os-milestone ${isLeft ? 'os-milestone-left' : 'os-milestone-right'}`}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  <div className="os-milestone-card">
                    <div className="os-ms-year">{year}</div>
                    <div className="os-ms-label">{label}</div>
                    <div className="os-ms-desc">{desc}</div>
                  </div>
                  <div className="os-milestone-dot" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* ── About the team quote ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div className="os-2col">
            <Reveal style={{ background: 'linear-gradient(135deg,#0E1E3A 0%,#1A3A72 100%)', borderRadius: '24px', padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-acc)' }} />
              <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ fontSize: '38px', marginBottom: '18px', lineHeight: 1, color: '#fff' }}>"</div>
              <p style={{ fontSize: '17px', fontWeight: '400', color: 'rgba(220,230,255,.88)', lineHeight: '1.78', marginBottom: '28px', fontStyle: 'italic' }}>
                We built Real Cost because we lived the problem ourselves. Estimating took too long, cost too much, and the tools available weren't made for Canadian contractors. We changed that.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,.22)' }}>
                  <img src={process.env.PUBLIC_URL + '/images/brand/logo.png'} alt="Real Cost" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Founding Team</div>
                  <div style={{ fontSize: '12px', color: 'rgba(210,220,255,.55)', marginTop: '2px' }}>Real Cost Estimating Inc. — 1200 Bloor Street West, Toronto</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── History & The Idea ── */}
      <section className="sec-light">
        <div className="cxl">
          <Reveal className="os-history-card">
            <div className="os-history-panel">
              <div>
                <h3 className="os-history-h">History</h3>
                <p className="os-history-p">
                  Founded in 2010 by a small team of electrical estimators, Real Cost Estimating Inc. set out to fix the slow, spreadsheet-driven way electrical bids got built. We saw an opportunity to bring speed and accuracy to an industry still doing takeoffs by hand — and built a platform that has since powered over 500 electrical contractors across Canada. From a local estimating firm to a trusted national SaaS platform, our mission has stayed the same: help contractors bid faster, win more, and build with confidence.
                </p>
              </div>
              <div style={{ marginTop: '34px' }}>
                <h3 className="os-history-h">The Idea</h3>
                <p className="os-history-p">
                  Electrical contractors face constant pressure — tight deadlines, thin margins, manual takeoffs, and pricing that shifts from city to city. Real Cost is built to solve exactly these problems, packing 15 years of job-winning formulas into one platform that keeps you in control and bidding with confidence.
                </p>
              </div>
            </div>
            <div className="os-history-imgwrap">
              <div className="os-history-frame" />
              <img className="os-history-img" src={process.env.PUBLIC_URL + '/images/about/1st_colash.png'} alt="Real Cost estimating workspace" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Careers ── */}
      <section className="sec-grey" id="careers">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Careers</div>
            <div className="sec-h2">Come! Work<br />
              <span style={{ background: 'var(--grd-prim)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With Real Cost</span>
            </div>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>We're a small, hybrid team helping trade contractors across Canada win more work. Ship software that estimators use every day.</p>
          </Reveal>

          {/* Open roles */}
          <Reveal style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Open positions</div>
          </Reveal>
          <RevealGroup style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '900px', margin: '0 auto 36px' }}>
            {[
              { title: 'Senior Electrical Estimators Sales Executives', dept: 'Sales',           type: 'Full-time · Hybrid (Toronto)', summary: 'Drive growth by connecting electrical contractors to Real Cost — combining deep estimating expertise with consultative sales.', details: ['Build relationships with electrical contractors and develop new business opportunities.', 'Use your estimating background to position Real Cost as the solution to their estimation challenges.', 'Manage the sales cycle from discovery through implementation and onboarding.'] },
              { title: 'Senior Estimating Specialist',   dept: 'Estimating',       type: 'Full-time · Hybrid (Toronto)',   summary: 'Bring deep electrical estimating expertise to shape pricing data, assemblies, and estimating workflows.', details: ['Use your estimating experience to refine formulas, assemblies, and templates.', 'Help shape pricing logic and estimating feature requirements for the platform.', 'Mentor estimators and review bids for accuracy and completeness.'] },
            ].map((job, i) => {
              const isOpen = openJob === i;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, boxShadow: '0 10px 24px rgba(15,37,87,.08)' }}
                  style={{ background: 'rgba(255,255,255,.85)', border: '1px solid rgba(220,226,240,.9)', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', cursor: 'pointer' }}
                  onClick={() => setOpenJob(isOpen ? null : i)}
                >
                  <div style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '17px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.3px' }}>{job.title}</span>
                      <span style={{ background: 'var(--ind-light)', color: 'var(--ind)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '14px' }}>{job.dept}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#8A92A6', fontWeight: '500', marginBottom: '8px' }}>{job.type}</div>
                    <div style={{ fontSize: '13.5px', color: '#6B7489', lineHeight: '1.7', fontWeight: '300', maxWidth: '560px' }}>{job.summary}</div>
                    {isOpen && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(220,226,240,.8)' }}>
                        <div style={{ fontSize: '13px',  fontWeight: '600', color: 'var(--txt)', marginBottom: '8px' }}>Job Description</div>
                        <ul style={{ margin: 0, paddingLeft: '18px', color: '#6B7489', fontSize: '13px', lineHeight: '1.7' }}>
                          {job.details.map(detail => <li key={detail}>{detail}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--sap)' }}>{isOpen ? 'Hide details' : 'View details'}</span>
                    <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={`https://mail.google.com/mail/?view=cm&fs=1&to=hr@realcost.com&su=${encodeURIComponent('Application: ' + job.title)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ flexShrink: 0 }}>
                      Apply →
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </RevealGroup>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#8A92A6', fontWeight: '400' }}>
            Don't see your role?{' '}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hr@realcost.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sap)', fontWeight: '600', textDecoration: 'none' }}>
              Email us anyway →
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <div className="cta-band">
        <Reveal className="wrc-cta-pad" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(147,197,253,.75)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '14px' }}>
            15 Years of Expertise. Now in Your Hands.
          </div>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', letterSpacing: '-1.3px', marginBottom: '14px', lineHeight: '1.15' }}>
            Join 500+ Contractors<br />Who Trust Real Cost
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
            14-day free trial. No credit card required. Start estimating smarter today.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Start Free Trial</motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ol-inv" onClick={() => onNavigate('contact')}>Talk to Us</motion.button>
          </div>
        </Reveal>
      </div>

    </div>
  );
};

export default OurStory;
