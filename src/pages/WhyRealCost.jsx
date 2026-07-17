import React from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import CountUp from '../components/ui/CountUp';
import '../styles/pages/why-real-cost.css';
import { LOGIN_URL } from '../config';


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
      }}>
        {/* hero bg image */}
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/misc/whyrealcost.png'})`, zIndex: -1, position: 'absolute', inset: 0 }}></div>
        {/* directional overlay */}
        <div style={{ position:'absolute', inset:0, zIndex:-1, pointerEvents:'none', background:'linear-gradient(105deg,rgba(10,20,40,.48) 0%,rgba(10,20,40,.30) 34%,transparent 62%)' }} />
        <div className="hero-glow" style={{ zIndex: -1 }} />
        {/* dot grid */}
        <div style={{ position:'absolute', inset:0, zIndex:-1, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(255,255,255,.026) 1px,transparent 1px)', backgroundSize:'32px 32px' }} />
        {/* blue top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'2.5px', background:'linear-gradient(90deg,transparent 0%,rgba(96,165,250,.5) 25%,rgba(147,197,253,.92) 50%,rgba(96,165,250,.5) 75%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />

        <div className="cxl" style={{ position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'620px' }}>
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
          {/* badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }} style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(10,20,40,.68)', border:'1px solid rgba(147,197,253,.50)', color:'#E6F0FF', fontSize:'10px', fontWeight:'700', padding:'5px 15px', borderRadius:'24px', letterSpacing:'.10em', textTransform:'uppercase', marginBottom:'16px', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#93C5FD', boxShadow:'0 0 8px rgba(147,197,253,.7)', display:'inline-block', animation:'blink 2.4s ease-in-out infinite' }} />
            Why Real Cost?
          </motion.div>

          {/* heading */}
          <h1 className="wrc-hero-h1" style={{ fontWeight:'800', color:'#fff', lineHeight:'1.08', margin:'0 0 16px', textShadow:'0 1px 3px rgba(5,10,22,.75), 0 4px 28px rgba(5,10,22,.65)' }}>
            Take Your Electrical Contracting<br />Business to the{' '}
            <em style={{ fontStyle:'normal', color:'#fff' }}>Next Level</em>
          </h1>

          {/* subtitle */}
          <p style={{ fontSize:'15px', color:'rgba(240,244,255,.95)', lineHeight:'1.80', margin:'0 0 26px', fontWeight:'400', textShadow:'0 1px 3px rgba(5,10,22,.80), 0 2px 20px rgba(5,10,22,.65)' }}>
            Canada's{' '}
            <strong style={{ color:'#fff', fontWeight:'500' }}>leading electrical estimation company</strong>
            {' '}— trusted by 500+ contractors, built on 15+ years of job-winning formulas.
          </p>

          {/* CTAs */}
          <motion.div className="wrc-hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Start Free Trial</motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('demo')}>Request Demo</motion.button>
          </motion.div>
          </motion.div>
          </div>

          {/* scrolling feature ticker */}
          <div className="wrc-ticker-wrap">
            <div className="wrc-ticker-fade-l" style={{ position:'absolute', left:0, top:0, bottom:0, width:'100px', background:'linear-gradient(90deg,#0E1E3A 0%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />
            <div className="wrc-ticker-fade-r" style={{ position:'absolute', right:0, top:0, bottom:0, width:'100px', background:'linear-gradient(270deg,#0E1E3A 0%,transparent 100%)', zIndex:2, pointerEvents:'none' }} />
            <div style={{ display:'flex', gap:'10px', animation:'ticker 32s linear infinite', width:'max-content' }}>
              {[...perks, ...perks].map(({ title }, i) => (
                <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:'9px', background:'rgba(255,255,255,.14)', border:'1px solid rgba(255,255,255,.25)', borderRadius:'8px', padding:'9px 18px', flexShrink:0 }}>
                  <span style={{ fontSize:'10px', color:'#93C5FD', lineHeight:1 }}>✦</span>
                  <span style={{ fontSize:'12.5px', fontWeight:'600', color:'rgba(255,255,255,.92)', letterSpacing:'.01em', whiteSpace:'nowrap' }}>{title}</span>
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
            <Reveal initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="sec-eyebrow">Our Expertise</div>
              <div className="sec-h2">15 Years of Job-Winning<br />Formulas & Assemblies</div>
              <p className="sec-sub" style={{ marginBottom: '20px' }}>
                Real Cost Estimating Inc is a name trusted by electrical contractors across Canada. Choose our expertise and experience of over <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>15 years</strong> and make use of job-winning formulas and assemblies refined over thousands of real projects.
              </p>
              <p className="sec-sub" style={{ marginBottom: '32px' }}>
                Tailored for electrical contractors with quality and care — bringing you nothing but the best through <strong style={{ color: 'var(--txt)', fontWeight: '600' }}>technology & innovation</strong>.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Get Started</motion.a>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" style={{ background: 'rgba(17,38,70,.07)', color: 'var(--sap)', border: '1px solid rgba(17,38,70,.18)', backdropFilter: 'none' }} onClick={() => onNavigate('pricing')}>See Pricing</motion.button>
              </div>
            </Reveal>
            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 28px 72px rgba(17,38,70,.16), 0 0 0 1px rgba(17,38,70,.07)' }}>
              <img src={process.env.PUBLIC_URL + '/images/about/why_realcost.png'} alt="Why Real Cost" style={{ width: '100%', display: 'block' }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="sec-grey">
        <div className="cxl">
          <Reveal>
            <div style={{ marginBottom: '36px' }}>
              <div className="sec-eyebrow">What You Get</div>
              <div className="sec-h2">Why Choose Real Cost?</div>
            </div>
          </Reveal>
          <div className="wrc-perks-inner" style={{ background: 'var(--blight)', borderRadius: '22px', border: '1px solid rgba(17,38,70,.07)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-prim)' }} />
            <RevealGroup className="wrc-perks-grid">
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
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Collage ── */}
      <section className="wrc-section-collage" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(17,38,70,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div className="cxl">
          <div className="wrc-2col-wide">

            {/* Left: photo collage */}
            <Reveal as="div" className="wrc-collage-wrap" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div style={{ position: 'absolute', left: '-14px', top: '32px', width: '56%', height: '56%', borderRadius: '20px', background: 'linear-gradient(135deg,rgba(79,70,229,.13),rgba(96,165,250,.10))', zIndex: 0 }} />
              <div style={{ position: 'absolute', right: '-14px', bottom: '28px', width: '44%', height: '38%', borderRadius: '16px', background: 'linear-gradient(135deg,rgba(96,165,250,.10),rgba(79,70,229,.07))', zIndex: 0 }} />
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
                <div>
                  <div style={{ fontSize: '17px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-.5px', lineHeight: 1 }}><CountUp end={500} suffix="+" /></div>
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.07em', marginTop: '2px' }}>Contractors Served</div>
                </div>
              </div>
            </Reveal>

            {/* Right: text */}
            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
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
                  { v: 15,   s: '+', l: 'Years Experience' },
                  { v: 1000, s: '+', l: 'Projects Won' },
                  { v: 10,   s: 'x', l: 'Client ROI' },
                ].map(({ v, s, l }, i) => (
                  <div key={l} style={{ paddingTop: '20px', paddingRight: '28px', paddingLeft: i > 0 ? '28px' : 0, borderLeft: i > 0 ? '1px solid rgba(17,38,70,.08)' : 'none' }}>
                    <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--sap)', letterSpacing: '-1px', lineHeight: 1 }}><CountUp end={v} suffix={s} /></div>
                    <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#8A92A6', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '5px' }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Made by estimators ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div className="wrc-2col">

            <Reveal initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} style={{ background: 'linear-gradient(135deg,rgba(17,38,70,.05),rgba(96,165,250,.09))', borderRadius: '22px', padding: '48px 40px', border: '1px solid rgba(17,38,70,.09)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-acc)' }} />
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--acc)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '14px' }}>Built By Estimators, For Estimators</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--txt)', letterSpacing: '-.8px', lineHeight: '1.2', marginBottom: '16px' }}>
                Made by Canada's most successful electrical estimators
              </div>
              <p className="sec-sub" style={{ marginBottom: 0 }}>
                Every formula, assembly, and workflow in Real Cost was designed by a panel of the country's top electrical estimators — not by software engineers guessing at your workflow.
              </p>
            </Reveal>

            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
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
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="sec-light">
        <div className="cxl">
          <div className="wrc-2col" style={{ alignItems: 'center', gap: '64px' }}>
            {/* Left: text */}
            <Reveal initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="wrc-mv-badge">Our Mission</div>
              <div className="sec-h2" style={{ marginBottom: '20px' }}>
                Supporting the Growth of<br />Electrical Contractors
              </div>
              <p className="sec-sub" style={{ marginBottom: '20px', fontSize: '15px', lineHeight: '1.88' }}>
                Real Cost's mission is to support the growth of electrical contractors in Canada by providing a premium quality software that enhances their ability to bid with confidence. We strive to deliver excellence through prompt service, professional guidance, and strong relationships.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Premium quality software built for electrical contractors',
                  'Bid with confidence on every project',
                  'Prompt service and professional guidance',
                  'Strong, lasting client relationships',
                ].map((pt) => (
                  <div key={pt} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--grd-prim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', flexShrink: 0, marginTop: '2px', fontWeight: '800' }}>✓</div>
                    <div style={{ fontSize: '13.5px', color: 'var(--txt)', lineHeight: '1.65', fontWeight: '400' }}>{pt}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: image */}
            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(15,37,87,.13)', width: '100%', aspectRatio: '4/3' }}>
              <img
                src={process.env.PUBLIC_URL + '/images/misc/mission.png'}
                alt="Our Mission"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="sec-grey">
        <div className="cxl">
          <div className="wrc-2col" style={{ alignItems: 'center', gap: '64px' }}>
            {/* Left on desktop, below the text on mobile (see .wrc-vision-media) */}
            <Reveal className="wrc-vision-media" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(15,37,87,.13)', width: '100%', aspectRatio: '4/3' }}>
              <img
                src={process.env.PUBLIC_URL + '/images/misc/vision.png'}
                alt="Our Vision"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Reveal>

            {/* Right: text */}
            <Reveal initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="wrc-mv-badge accent">Our Vision</div>
              <div className="sec-h2" style={{ marginBottom: '20px' }}>
                Canada's Most Trusted<br />Software Solution
              </div>
              <p className="sec-sub" style={{ marginBottom: '18px', fontSize: '15px', lineHeight: '1.88' }}>
                To become Canada's most trusted and reliable software solution for electrical contractors — setting the benchmark for excellence and reliability in the industry.
              </p>
              <p className="sec-sub" style={{ marginBottom: '28px', fontSize: '15px', lineHeight: '1.88' }}>
                We aim to elevate industry standards by offering reliable products, transparent service, and a customer-first experience across the country.
              </p>
              <RevealGroup style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'Reliable Products',      desc: 'Tested and proven solutions trusted by 500+ contractors.' },
                  { label: 'Transparent Service',    desc: 'No surprises — clear pricing and honest communication.' },
                  { label: 'Customer-First',          desc: 'Every decision starts with what is best for our clients.' },
                  { label: 'Industry Benchmark',      desc: 'Setting the standard for excellence in Canada.' },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ background: '#fff', border: '1px solid rgba(220,226,240,.9)', borderRadius: '14px', padding: '18px 16px' }}>
                    <div style={{ width: '28px', height: '3px', background: 'var(--grd-acc)', borderRadius: '2px', marginBottom: '12px' }} />
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--txt)', marginBottom: '5px' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: '#8A92A6', lineHeight: '1.6', fontWeight: '300' }}>{desc}</div>
                  </div>
                ))}
              </RevealGroup>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quality We Provide ── */}
      <section className="sec-light">
        <div className="cxl">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 52px' }}>
              <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Quality We Provide</div>
              <div className="sec-h2">Quality at the Heart<br />of Everything We Do</div>
              <p className="sec-sub">
                Every product we offer is sourced and tested for performance, ensuring long-lasting solutions for electrical contractors in Canada. Quality is not just a standard — it is our promise.
              </p>
            </div>
          </Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[
              { label: 'Tested Performance',     desc: 'Every product and formula is validated against thousands of real-world projects before it reaches your hands.' },
              { label: 'Long-Lasting Solutions',  desc: 'Built to withstand the demands of the trade — reliable, consistent, and continuously refined.' },
              { label: 'Canadian Standard',       desc: 'Designed specifically for the Canadian electrical market with city-wise pricing and local compliance in mind.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ background: '#fff', border: '1px solid rgba(220,226,240,.85)', borderRadius: '18px', padding: '32px 28px', boxShadow: '0 4px 24px rgba(15,37,87,.06)', height: '100%' }}>
                <div style={{ width: '36px', height: '4px', background: 'var(--grd-acc)', borderRadius: '2px', marginBottom: '20px' }} />
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--txt)', marginBottom: '10px', letterSpacing: '-.3px' }}>{label}</div>
                <div style={{ fontSize: '13.5px', color: '#6B7489', lineHeight: '1.78', fontWeight: '300' }}>{desc}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Our Philosophy ── */}
      <section className="sec-grey">
        <div className="cxl">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 52px' }}>
              <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Our Philosophy</div>
              <div className="sec-h2">Building Trust Through<br />Consistency & Integrity</div>
              <p className="sec-sub">
                Our philosophy revolves around understanding customer needs and offering dependable solutions that contribute to long-term satisfaction and sustainable development across Canada.
              </p>
            </div>
          </Reveal>
          <RevealGroup style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                label: 'Quality',
                body: 'We maintain the highest standards in every service we provide, ensuring flawless execution and reliable business solutions for electrical contractors.',
              },
              {
                label: 'Integrity',
                body: 'Our actions are guided by honesty, transparency, and ethical practices — building trust with every client we serve, every day.',
              },
            ].map(({ label, body }) => (
              <div key={label} style={{ background: 'linear-gradient(135deg,#0E1E3A 0%,#1A3A72 100%)', borderRadius: '22px', padding: '44px 40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grd-acc)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(96,165,250,.10) 0%,transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ fontSize: '26px', fontWeight: '800', color: '#fff', letterSpacing: '-.6px', marginBottom: '16px' }}>{label}</div>
                <p style={{ fontSize: '14px', color: 'rgba(210,220,248,.72)', lineHeight: '1.82', fontWeight: '300', margin: 0 }}>{body}</p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── CTA band ── */}
      <div className="cta-band">
        <Reveal as="div" className="wrc-cta-pad">
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(147,197,253,.75)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '14px' }}>
            Bringing You Nothing But The Best
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#fff', letterSpacing: '-1.5px', marginBottom: '14px', lineHeight: '1.15' }}>
            Real Cost Estimation is<br />the Solution for You
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(220,228,248,.65)', maxWidth: '460px', margin: '0 auto 36px', lineHeight: '1.78', fontWeight: '300' }}>
            Making a difference through technology & innovation — 14-day free trial, no credit card required.
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

export default WhyRealCost;
