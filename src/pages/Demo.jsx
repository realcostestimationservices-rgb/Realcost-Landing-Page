import React, { useState, useMemo } from 'react';

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  const [selectedDate, setSelectedDate] = useState(null);
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
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="page-enter">
      <section className="page-hero" style={{ minHeight: '640px' }}>
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/misc/request_demo.png'})` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(105deg,rgba(10,20,40,.96) 0%,rgba(15,37,87,.92) 40%,rgba(15,37,87,.45) 65%,transparent 100%)' }} />
        <div className="cxl" style={{ textAlign: 'left' }}>
          <div style={{ maxWidth: '560px' }}>
            <div className="pg-badge">Schedule a demo</div>
            <div className="ph-title">See Real Cost live.<br />No pressure.</div>
            <p className="sec-sub" style={{ margin: '0 0 32px' }}>A 30-minute walkthrough tailored to your trade — live takeoff, Canadian pricing, and quote generation on real drawings.</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span className="ph-chip">📅 30-minute session</span>
              <span className="ph-chip">🎯 Tailored to your trade</span>
              <span className="ph-chip">✓ No commitment</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-prim" onClick={scrollToBooking}>Book your demo now →</button>
              <a href="tel:6476778399" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>📞 Prefer to call?</a>
            </div>
          </div>
        </div>
      </section>

      <div className="demo-perks-bar" style={{ background: '#fff', borderBottom: '1px solid var(--bdl)', padding: '22px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
          {[
            { bg: 'var(--blight)', ico: '⏱', t: '30 minutes', s: 'Focused walkthrough' },
            { bg: '#E6F7EE', ico: '✅', t: 'No commitment', s: 'Zero pressure, zero obligation' },
            { bg: 'var(--rlight)', ico: '🎯', t: 'Tailored to you', s: 'We use your trade, your drawings' },
            { bg: 'var(--blight)', ico: '🆓', t: 'Free trial included', s: '14 days full access after demo' },
            { bg: '#FDF6E3', ico: '⭐', t: '4.6/5 Capterra', s: 'Rated by electrical contractors' },
          ].map((it, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{it.ico}</div>
                <div><div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)' }}>{it.t}</div><div style={{ fontSize: '12px', color: '#8A92A6', fontWeight: '300' }}>{it.s}</div></div>
              </div>
              {i < arr.length - 1 && <div style={{ width: '1px', height: '36px', background: 'var(--bdl)' }}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className="sec-grey" id="demo-booking">
        <div className="cxl">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px' }}>
            <div>
              <div className="rc-form">
                {/* step indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--grd-blue)', color: '#fff', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0', boxShadow: '0 3px 10px rgba(45,107,228,.35)' }}>1</div>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)' }}>Your details</span>
                  <div style={{ flex: '1', height: '2px', background: 'var(--bdl)', borderRadius: '2px', position: 'relative' }}><div style={{ position: 'absolute', left: '0', top: '0', height: '100%', width: step !== 1 ? '100%' : '0%', background: 'var(--grd-blue)', borderRadius: '2px', transition: 'width .4s' }}></div></div>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step !== 1 ? 'var(--grd-blue)' : '#F0F3FA', border: step !== 1 ? 'none' : '1.5px solid var(--bdl)', color: step !== 1 ? '#fff' : '#A0AABB', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0', transition: 'all .3s' }}>2</div>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: step !== 1 ? 'var(--txt)' : '#A0AABB', transition: 'color .3s' }}>Pick date &amp; time</span>
                </div>

                {/* step 1 */}
                {step === 1 && (
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: '700', color: 'var(--txt)', marginBottom: '22px' }}>Tell us about yourself</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                      <div><label className="flabel">First name *</label><input className="finput" placeholder="John" value={form.fname} onChange={setField('fname')} /></div>
                      <div><label className="flabel">Last name *</label><input className="finput" placeholder="Smith" value={form.lname} onChange={setField('lname')} /></div>
                    </div>
                    <div style={{ marginBottom: '14px' }}><label className="flabel">Work email *</label><input className="finput" type="email" placeholder="john@company.com" value={form.email} onChange={setField('email')} /></div>
                    <div style={{ marginBottom: '14px' }}><label className="flabel">Company name *</label><input className="finput" placeholder="ABC Electrical Ltd." value={form.company} onChange={setField('company')} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                      <div><label className="flabel">Phone number</label><input className="finput" placeholder="(647) 000-0000" value={form.phone} onChange={setField('phone')} /></div>
                      <div><label className="flabel">Trade / sector *</label><select className="finput" value={form.trade} onChange={setField('trade')}><option value="">Select your trade</option><option>Electrical</option><option>Mechanical / HVAC</option><option>Plumbing</option><option>General contractor</option><option>Engineer / Architect</option></select></div>
                    </div>
                    <div style={{ marginBottom: '28px' }}><label className="flabel">What are you hoping to achieve? (optional)</label><select className="finput" value={form.goal} onChange={setField('goal')}><option value="">Select goal</option><option>Speed up my takeoff process</option><option>Reduce estimation errors</option><option>Get Canadian city-based pricing</option><option>Replace my current estimating tool</option><option>Just exploring options</option></select></div>
                    <button className="btn-form" onClick={() => setStep(2)} disabled={!step1Valid} style={{ opacity: step1Valid ? 1 : 0.4 }}>Continue to scheduling →</button>
                  </div>
                )}

                {/* step 2 */}
                {step === 2 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px' }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '17px', fontWeight: '700', color: 'var(--txt)' }}>Pick a date &amp; time</div>
                      <button onClick={() => setStep(1)} style={{ fontSize: '13px', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>← Back</button>
                    </div>
                    <div style={{ background: '#F8FAFE', border: '1px solid var(--bdl)', borderRadius: '14px', padding: '20px', marginBottom: '18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <button onClick={prevMonth} style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fff', border: '1px solid var(--bdl)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt)' }}>‹</button>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)' }}>{MONTH_NAMES[viewMonth]} {viewYear}</div>
                        <button onClick={nextMonth} style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fff', border: '1px solid var(--bdl)', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt)' }}>›</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px', marginBottom: '6px' }}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                          <div key={i} style={{ fontSize: '11px', fontWeight: '500', color: '#A0AABB', textAlign: 'center', padding: '4px' }}>{d}</div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
                        {calendarCells.map((day, i) => {
                          if (day === null) return <div key={i}></div>;
                          const past = isPast(day);
                          const active = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === viewMonth && selectedDate.getFullYear() === viewYear;
                          return (
                            <button key={i} onClick={() => pickDate(day)} disabled={past}
                              style={{
                                aspectRatio: '1', borderRadius: '8px', border: '1px solid ' + (active ? 'transparent' : 'var(--bdl)'),
                                background: active ? 'var(--grd-blue)' : '#fff', color: active ? '#fff' : (past ? '#C7CDD9' : 'var(--txt)'),
                                fontSize: '13px', fontWeight: active ? '700' : '400', cursor: past ? 'not-allowed' : 'pointer', opacity: past ? 0.5 : 1,
                              }}>{day}</button>
                          );
                        })}
                      </div>
                    </div>
                    {selectedDate && (
                      <div style={{ marginBottom: '18px' }}>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)', marginBottom: '10px' }}>Available times</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                          {TIME_SLOTS.map((slot) => {
                            const active = selectedTime === slot;
                            return (
                              <button key={slot} onClick={() => setSelectedTime(slot)}
                                style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid ' + (active ? 'transparent' : 'var(--bdl)'), background: active ? 'var(--grd-blue)' : '#fff', color: active ? '#fff' : 'var(--txt)', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{slot}</button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {selectedDate && selectedTime && (
                      <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.2)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--blue)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '.07em' }}>Your demo is scheduled for</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '16px', fontWeight: '700', color: 'var(--txt)' }}>{confirmText}</div>
                        <div style={{ fontSize: '12px', color: '#8A92A6', marginTop: '3px', fontWeight: '300' }}>Duration: 30 minutes · Video call or phone</div>
                      </div>
                    )}
                    <button className="btn-form" onClick={() => setStep('success')} disabled={!selectedDate || !selectedTime} style={{ opacity: selectedDate && selectedTime ? 1 : 0.4 }}>Confirm my demo →</button>
                  </div>
                )}

                {/* success */}
                {step === 'success' && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '52px', marginBottom: '18px' }}>🎉</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '24px', fontWeight: '800', color: 'var(--txt)', marginBottom: '9px' }}>You're booked!</div>
                    <div style={{ fontSize: '15px', color: '#6B7489', maxWidth: '360px', margin: '0 auto 22px', lineHeight: '1.8', fontWeight: '300' }}>Thanks {form.fname}! Your demo is confirmed for {confirmText}. We've sent the details to {form.email}.</div>
                    <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.18)', borderRadius: '12px', padding: '18px', maxWidth: '350px', margin: '0 auto 24px', textAlign: 'left' }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--blue)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.08em' }}>What happens next</div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginBottom: '9px' }}><span style={{ color: '#1A6B45', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>Confirmation email sent to your inbox</span></div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginBottom: '9px' }}><span style={{ color: '#1A6B45', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>Calendar invite with video call link</span></div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}><span style={{ color: '#1A6B45', fontSize: '14px', flexShrink: '0' }}>✓</span><span style={{ fontSize: '13px', color: 'var(--txt)', fontWeight: '300' }}>14-day free trial activated immediately</span></div>
                    </div>
                    <button onClick={resetDemo} className="btn-ol-blue">Book another demo</button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="rc-form" style={{ marginBottom: '18px', padding: '26px' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '20px' }}>What we'll cover in 30 minutes</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {[
                    { bg: 'var(--blight)', ico: '🗺', t: 'Live digital takeoff', s: 'AI auto-count and manual symbol placement on real drawings.' },
                    { bg: '#E6F7EE', ico: '📍', t: 'Canadian city pricing', s: 'See how L1/L2/L3 regional pricing works for your city — live on screen.' },
                    { bg: 'var(--rlight)', ico: '📋', t: 'Bid page to quote letter', s: 'Full workflow from estimate complete to branded PDF quote in under 2 minutes.' },
                    { bg: 'var(--blight)', ico: '👥', t: 'Team roles & management', s: 'Owner and sub-estimator accounts, task assignment, and subscription management.' },
                  ].map((it, i, arr) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid #F0F3FA' : 'none' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: '0' }}>{it.ico}</div>
                      <div><div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)', marginBottom: '3px' }}>{it.t}</div><div style={{ fontSize: '12px', color: '#6B7489', lineHeight: '1.65', fontWeight: '300' }}>{it.s}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.16)', borderRadius: '16px', padding: '22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                {[
                  { n: '500+', l: 'Contractors', c: 'var(--blue)' },
                  { n: '4.6/5', l: 'Capterra', c: 'var(--blue)' },
                  { n: '30 min', l: 'Walkthrough', c: 'var(--gold)' },
                  { n: 'Free', l: 'No card required', c: 'var(--gold)' },
                ].map((it, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid var(--bdl)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '24px', fontWeight: '700', color: it.c }}>{it.n}</div>
                    <div style={{ fontSize: '10px', color: '#8A92A6', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>{it.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--blight)', border: '1px solid rgba(45,107,228,.18)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)', marginBottom: '5px' }}>Prefer to talk first?</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '15px', fontWeight: '700', color: 'var(--txt)', marginBottom: '3px' }}>📞 (647) 677-8399</div>
                <div style={{ fontSize: '12px', color: '#8A92A6', fontWeight: '300' }}>Mon–Fri 9:00 AM – 6:00 PM ET · Ontario, Canada</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;
