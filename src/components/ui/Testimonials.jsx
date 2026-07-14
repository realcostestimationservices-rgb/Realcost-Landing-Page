import React, { useState, useEffect, useRef, useCallback } from 'react';

const testimonials = [
  {
    stars: '★★★★★',
    quote: '"I upload the PDF, draw a box around a fixture, and Real Cost finds every single one across the whole drawing set. What used to take half a day is done in 20 minutes."',
    initials: 'JM',
    name: 'James M.',
    company: 'JM Electrical — Toronto, ON',
    badge: '10× faster',
    badgeColor: 'var(--blue-50)',
    badgeTextColor: 'var(--blue-700)'
  },
  {
    stars: '★★★★★',
    quote: '"The Canadian city-based pricing — L1/L2/L3 for Ottawa, Toronto, Montreal — is exactly what was missing from every other tool. We do our own estimates now instead of outsourcing."',
    initials: 'SR',
    name: 'Sarah R.',
    company: 'Apex Electric — Ottawa, ON',
    badge: 'Self-sufficient',
    badgeColor: 'rgba(45,107,228,.15)',
    badgeTextColor: 'var(--blue)',
    dark: true
  },
  {
    stars: '★★★★★',
    quote: '"The bid page builds itself once takeoff is done. I click one button and a branded quote letter is ready to email. Our whole estimating process went from days to hours."',
    initials: 'DK',
    name: 'David K.',
    company: 'Volt Pro — Montreal, QC',
    badge: 'Days → Hours',
    badgeColor: 'var(--blue-50)',
    badgeTextColor: 'var(--blue-600)'
  },
  {
    stars: '★★★★★',
    quote: '"Saved us roughly 40 hours a month. We run all our electrical and fire alarm estimates right inside Real Cost — one platform for the whole team."',
    initials: 'MT',
    name: 'Michael T.',
    company: 'Bright Spark — Vancouver, BC',
    badge: '40h saved/mo',
    badgeColor: 'var(--blue-50)',
    badgeTextColor: '#1D4ED8'
  },
  {
    stars: '★★★★★',
    quote: '"Best ROI on any software we subscribe to. Real Cost pays for itself on the very first estimate — our team is faster, our bids are more accurate, and we win more work."',
    initials: 'KL',
    name: 'Karen L.',
    company: 'PowerPath — Calgary, AB',
    badge: 'Best ROI',
    badgeColor: 'rgba(176,48,48,.12)',
    badgeTextColor: 'var(--red)',
    dark: true
  },
  {
    stars: '★★★★★',
    quote: '"We can now do accurate estimates for every trade in-house. The supplier RFQ feature lets us compare material prices before locking the bid — that alone covers the subscription cost."',
    initials: 'RH',
    name: 'Robert H.',
    company: 'Elite Wiring — Edmonton, AB',
    badge: 'More trades',
    badgeColor: 'var(--blue-50)',
    badgeTextColor: 'var(--blue-700)'
  },
  {
    stars: '★★★★★',
    quote: '"The quote letter output looks completely professional — our clients have no idea it was generated in seconds. The branding and format is exactly what a serious contractor should send."',
    initials: 'PS',
    name: 'Priya S.',
    company: 'Horizon Electrical — Mississauga, ON',
    badge: 'Pro quotes',
    badgeColor: 'var(--blue-50)',
    badgeTextColor: 'var(--blue-600)',
    dark: true
  }
];

const GAP = 20;
const total = testimonials.length;

const getVisible = () => {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 960) return 2;
  return 3;
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisible);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const timerRef = useRef(null);

  const maxIndex = total - visibleCount;

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisible());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(Math.max(0, maxIndex));
  }, [visibleCount, maxIndex, currentIndex]);

  const cardWidth = useCallback(() => {
    const w = wrapRef.current;
    return w ? (w.offsetWidth - (visibleCount - 1) * GAP) / visibleCount : 0;
  }, [visibleCount]);

  const updateTrack = useCallback((animate = true) => {
    const track = trackRef.current;
    if (!track) return;
    const cw = cardWidth();
    track.style.transition = animate ? 'transform .5s cubic-bezier(.25,.46,.45,.94)' : 'none';
    track.style.transform = `translateX(-${currentIndex * (cw + GAP)}px)`;
  }, [currentIndex, cardWidth]);

  const slideTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  const slide = useCallback((dir) => {
    setCurrentIndex(prev => Math.max(0, Math.min(prev + dir, maxIndex)));
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4500);
  }, [maxIndex]);

  const resetAuto = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 4500);
  }, [maxIndex]);

  useEffect(() => {
    updateTrack(false);
    resetAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [updateTrack, resetAuto]);

  useEffect(() => {
    updateTrack(true);
  }, [currentIndex, updateTrack]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMouseDown = (e) => {
      setIsDragging(true);
      setDragMoved(false);
      setDragStartX(e.clientX);
      wrap.style.cursor = 'grabbing';
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      if (Math.abs(e.clientX - dragStartX) > 6) setDragMoved(true);
    };
    const onMouseUp = (e) => {
      if (!isDragging) return;
      setIsDragging(false);
      wrap.style.cursor = 'grab';
      if (!dragMoved) return;
      const diff = e.clientX - dragStartX;
      if (diff < -50) slide(1);
      else if (diff > 50) slide(-1);
    };
    const onTouchStart = (e) => { setDragStartX(e.touches[0].clientX); };
    const onTouchEnd = (e) => {
      const diff = e.changedTouches[0].clientX - dragStartX;
      if (diff < -50) slide(1);
      else if (diff > 50) slide(-1);
    };

    wrap.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    wrap.addEventListener('touchstart', onTouchStart, { passive: true });
    wrap.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      wrap.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, dragStartX, dragMoved, slide]);

  return (
    <div className="testimonials-section">
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '44px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div className="sec-h2">Contractors Love Realcost</div>
          <p className="sec-sub" style={{ maxWidth: '380px', marginTop: '8px' }}>Don't take our word for it — hear from real users.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => slide(-1)} style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fff', border: '1.5px solid #DCE2F0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#0F2557', transition: 'all .2s', boxShadow: '0 2px 8px rgba(15,37,87,.08)' }}>‹</button>
          <button onClick={() => slide(1)} style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg,#0F2557 0%,#1E3A7B 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', transition: 'all .2s', boxShadow: '0 4px 16px rgba(15,37,87,.28)' }}>›</button>
        </div>
      </div>
      <div ref={wrapRef} style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none' }}>
        <div ref={trackRef} style={{ display: 'flex', gap: `${GAP}px`, willChange: 'transform' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`tcard ${t.dark ? 'tcard-dark' : ''}`}
              style={{ flex: `0 0 calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`, minWidth: '0' }}
            >
              <div>
                <div className="tc-stars">{t.stars}</div>
                <p className="tc-q">{t.quote}</p>
              </div>
              <div className="tc-foot">
                <div className="tc-av" style={{ background: t.badgeColor || 'var(--blight)', color: t.badgeTextColor || 'var(--blue)' }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--txt)' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: '#8A92A6' }}>{t.company}</div>
                </div>
                {t.badge && (
                  <span style={{ background: t.badgeColor || 'var(--blue-50)', color: t.badgeTextColor || 'var(--blue-700)', borderRadius: '20px', padding: '4px 10px', fontSize: '10px', fontWeight: '500', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                    {t.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', marginTop: '28px', alignItems: 'center' }}>
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            onClick={() => { slideTo(i); resetAuto(); }}
            style={{
              height: '8px',
              borderRadius: '9px',
              cursor: 'pointer',
              transition: 'all .3s',
              background: i === currentIndex ? '#0F2557' : 'rgba(15,37,87,.18)',
              width: i === currentIndex ? '22px' : '8px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
