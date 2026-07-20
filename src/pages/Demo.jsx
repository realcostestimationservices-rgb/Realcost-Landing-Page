import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import '../styles/pages/demo.css';

const TIME_SLOTS = ['9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm', '4:00 pm'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const DEMO_DURATION = '30 minutes';

const scrollToBooking = () => {
  const el = document.getElementById('demo-booking');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Demo = () => {
  const [step, setStep] = useState(1); // 1, 2, or 'success'
  const [form, setForm] = useState({ fname: '', lname: '', email: '', company: '', phone: '', trade: '', goal: '' });

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);

  const step1Valid = form.fname && form.lname && form.email && form.company && form.trade;

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  const isPast = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < t;
  };

  const prevMonth = () => {
    setViewMonth((m) => (m === 0 ? 11 : m - 1));
    if (viewMonth === 0) setViewYear((y) => y - 1);
  };
  const nextMonth = () => {
    setViewMonth((m) => (m === 11 ? 0 : m + 1));
    if (viewMonth === 11) setViewYear((y) => y + 1);
  };

  const pickDate = (day) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime(null);
  };

  const confirmText = selectedDate && selectedTime
    ? `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()} at ${selectedTime}`
    : '';

  const resetDemo = () => {
    setStep(1);
    setForm({ fname: '', lname: '', email: '', company: '', phone: '', trade: '', goal: '' });
    setSelectedDate(today);
    setSelectedTime(null);
  };

  const dateHeading = selectedDate
    ? `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    : 'a date';

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/misc/request_demo.png'})` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(105deg,rgba(10,20,40,.52) 0%,rgba(10,20,40,.32) 34%,transparent 62%)' }} />
        <div className="hero-glow" />
        <div className="cxl" style={{ textAlign: 'left' }}>
          <motion.div
            style={{ maxWidth: '560px' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pg-badge">Schedule a demo</div>
            <div className="ph-title">See Real Cost live.<br />No pressure.</div>
            <p className="sec-sub" style={{ margin: '0 0 32px' }}>A 30-minute walkthrough tailored to your trade — live takeoff, Canadian pricing, and quote generation on real drawings.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span className="ph-chip">30-minute session</span>
              <span className="ph-chip">Tailored to your trade</span>
              <span className="ph-chip">No commitment</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" onClick={scrollToBooking}>Book your demo now →</motion.button>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} href="tel:6476778399" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Prefer to call?</motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Reveal as="div" className="demo-perks-bar" style={{ background: '#fff', borderBottom: '1px solid var(--bdl)', padding: '22px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
          {[
            { t: '30 minutes', s: 'Focused walkthrough' },
            { t: 'No commitment', s: 'Zero pressure, zero obligation' },
            { t: 'Tailored to you', s: 'We use your trade, your drawings' },
            { t: 'Free trial included', s: '14 days full access after demo' },
          ].map((it, i, arr) => (
            <React.Fragment key={i}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)' }}>{it.t}</div>
                <div style={{ fontSize: '12px', color: '#8A92A6', fontWeight: '300' }}>{it.s}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '36px', background: 'var(--bdl)' }}></div>}
            </React.Fragment>
          ))}
        </div>
      </Reveal>

      <section className="sec-grey" id="demo-booking">
        <div className="cxl">
          <div className="demo-book-grid">
            <Reveal initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="rc-shell">
                {/* step 1 — pick date & time */}
                {step === 1 && (
                  <div className="rc-schedule">
                    <div className="rc-schedule-cal">
                      <div className="rc-schedule-brand">
                        <img src={process.env.PUBLIC_URL + '/images/brand/logo.png'} alt="Real Cost" />
                        <div className="rc-schedule-brand-word">
                          <span>Real Cost</span>
                          <span>Estimation Platform</span>
                        </div>
                      </div>
                      <div className="rc-schedule-month">
                        <button onClick={prevMonth} aria-label="Previous month">‹</button>
                        <span>{MONTH_NAMES[viewMonth]} {viewYear}</span>
                        <button onClick={nextMonth} aria-label="Next month">›</button>
                      </div>
                      <div className="rc-schedule-week">
                        {WEEKDAYS.map((d) => <div key={d}>{d}</div>)}
                      </div>
                      <div className="rc-schedule-days">
                        {calendarCells.map((day, i) => {
                          if (day === null) return <div key={i} />;
                          const past = isPast(day);
                          const active = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear;
                          return (
                            <button key={i} onClick={() => pickDate(day)} disabled={past} className={`rc-day ${active ? 'active' : ''} ${past ? 'past' : ''}`}>{day}</button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="rc-schedule-side">
                      <div className="rc-schedule-block">
                        <div className="rc-schedule-label">Meeting location</div>
                        <div className="rc-schedule-value">Video call (Zoom link provided)</div>
                      </div>

                      <div className="rc-schedule-block rc-schedule-times-block">
                        <div className="rc-schedule-label">What time works best?</div>
                        <div className="rc-schedule-sub">Showing times for {dateHeading}</div>
                        <div className="rc-schedule-tz">Eastern Time — Toronto, Canada</div>
                        <div className="rc-schedule-slots">
                          {TIME_SLOTS.map((slot) => (
                            <button key={slot} className={`rc-slot ${selectedTime === slot ? 'active' : ''}`} onClick={() => setSelectedTime(slot)} disabled={!selectedDate}>{slot}</button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && selectedTime && (
                        <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.2)', borderRadius: '10px', padding: '14px 16px', marginTop: '4px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--blue)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.07em' }}>Selected</div>
                          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)' }}>{confirmText}</div>
                          <div style={{ fontSize: '12px', color: '#8A92A6', marginTop: '2px', fontWeight: '300' }}>Duration: {DEMO_DURATION} · Video call</div>
                        </div>
                      )}

                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-form" onClick={() => setStep(2)} disabled={!selectedDate || !selectedTime} style={{ opacity: selectedDate && selectedTime ? 1 : 0.4, marginTop: '6px' }}>Continue to your details →</motion.button>
                    </div>
                  </div>
                )}

                {/* step 2 — your details */}
                {step === 2 && (
                  <div className="rc-shell-body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: '700', color: 'var(--txt)' }}>Tell us about yourself</div>
                      <button onClick={() => setStep(1)} style={{ fontSize: '13px', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>← Back</button>
                    </div>
                    {selectedDate && selectedTime && (
                      <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.2)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--blue)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '.07em' }}>Your demo is scheduled for</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '16px', fontWeight: '700', color: 'var(--txt)' }}>{confirmText}</div>
                        <div style={{ fontSize: '12px', color: '#8A92A6', marginTop: '3px', fontWeight: '300' }}>Duration: {DEMO_DURATION} · Video call</div>
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                      <div><label className="flabel">First name *</label><input className="finput" placeholder="John" value={form.fname} onChange={setField('fname')} /></div>
                      <div><label className="flabel">Last name *</label><input className="finput" placeholder="Smith" value={form.lname} onChange={setField('lname')} /></div>
                    </div>
                    <div style={{ marginBottom: '14px' }}><label className="flabel">Work email *</label><input className="finput" type="email" placeholder="john@company.com" value={form.email} onChange={setField('email')} /></div>
                    <div style={{ marginBottom: '14px' }}><label className="flabel">Company name *</label><input className="finput" placeholder="ABC Electrical Ltd." value={form.company} onChange={setField('company')} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                      <div><label className="flabel">Phone number</label><input className="finput" placeholder="(647) 000-0000" value={form.phone} onChange={setField('phone')} /></div>
                      <div><label className="flabel">Project sector *</label><select className="finput" value={form.trade} onChange={setField('trade')}><option value="">Select your sector</option><option>Commercial</option><option>Residential</option><option>Institutional</option><option>Industrial</option></select></div>
                    </div>
                    <div style={{ marginBottom: '28px' }}><label className="flabel">What are you hoping to achieve? (optional)</label><select className="finput" value={form.goal} onChange={setField('goal')}><option value="">Select goal</option><option>Speed up my takeoff process</option><option>Reduce estimation errors</option><option>Get Canadian city-based pricing</option><option>Replace my current estimating tool</option><option>Just exploring options</option></select></div>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-form" onClick={() => setStep('success')} disabled={!step1Valid} style={{ opacity: step1Valid ? 1 : 0.4 }}>Confirm my demo →</motion.button>
                  </div>
                )}

                {/* success */}
                {step === 'success' && (
                  <div className="rc-shell-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '24px', fontWeight: '800', color: 'var(--txt)', marginBottom: '9px' }}>You're booked!</div>
                    <div style={{ fontSize: '15px', color: '#6B7489', maxWidth: '360px', margin: '0 auto 22px', lineHeight: '1.8', fontWeight: '300' }}>Thanks {form.fname}! Your demo is confirmed for {confirmText}. We've sent the details to {form.email}.</div>
                    <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.18)', borderRadius: '12px', padding: '18px', maxWidth: '350px', margin: '0 auto 24px', textAlign: 'left' }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--blue)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em' }}>What happens next</div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginBottom: '9px' }}><span style={{ color: 'var(--blue-700)', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>Confirmation email sent to your inbox</span></div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginBottom: '9px' }}><span style={{ color: 'var(--blue-700)', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>Calendar invite with video call link</span></div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}><span style={{ color: 'var(--blue-700)', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>14-day free trial activated immediately</span></div>
                    </div>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={resetDemo} className="btn-ol-blue">Book another demo</motion.button>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1} initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="rc-form" style={{ marginBottom: '18px', padding: '26px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '20px' }}>What we'll cover in 30 minutes</div>
                <RevealGroup style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { t: 'Live digital takeoff', s: 'Automatic auto-count and manual symbol placement on real drawings.' },
                    { t: 'Canadian city pricing', s: 'See how L1/L2/L3 regional pricing works for your city — live on screen.' },
                    { t: 'Bid page to quote letter', s: 'Full workflow from estimate complete to branded PDF quote in under 2 minutes.' },
                    { t: 'Team roles & management', s: 'Owner and sub-estimator accounts, task assignment, and subscription management.' },
                  ].map((it, i, arr) => (
                    <div key={i} style={{ padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid #F0F3FA' : 'none' }}>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)', marginBottom: '3px' }}>{it.t}</div>
                      <div style={{ fontSize: '12px', color: '#6B7489', lineHeight: '1.65', fontWeight: '300' }}>{it.s}</div>
                    </div>
                  ))}
                </RevealGroup>
              </div>
              <RevealGroup className="demo-stat-grid">
                {[
                  { n: '500+', l: 'Contractors', c: 'var(--blue)' },
                  { n: '30 min', l: 'Walkthrough', c: 'var(--acc)' },
                  { n: 'Free', l: 'No card required', c: 'var(--acc)' },
                ].map((it, i) => (
                  <div key={i} className="demo-stat-card">
                    <div className="demo-stat-n" style={{ color: it.c }}>{it.n}</div>
                    <div className="demo-stat-l">{it.l}</div>
                  </div>
                ))}
              </RevealGroup>
              <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.18)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)', marginBottom: '5px' }}>Prefer to talk first?</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '3px' }}>(647) 677-8399</div>
                <div style={{ fontSize: '12px', color: '#8A92A6', fontWeight: '300' }}>Mon–Fri 9:00 AM – 6:00 PM ET · Ontario, Canada</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
