import React, { useState, useEffect } from 'react';
import '../styles/pages/pricing.css';

const included = [
  'Digital takeoff canvas (PDF upload)',
  'Symbol auto-count',
  'Full bid page & calculator',
  'Canadian city-based pricing (L1/L2/L3)',
  'Supplier RFQ management',
  'One-click quote letter (PDF / Word)',
  'Estimate graph & analytics',
  'Team & role management',
  'All 9+ trades supported',
  'Email & phone support',
];

const APP_URL = 'https://d3jt1vpskh0hbe.cloudfront.net/';

const PlanCard = ({ plan }) => {
  const {
    display_name,
    description,
    button_text,
    price,
    make_recommended,
    duration_value,
    duration_unit,
    document_limit_type,
    document_limit,
    discount_enabled,
    discount_price,
    discount_text,
    type,
  } = plan;

  const formatPrice = (p) => {
    const n = parseFloat(p);
    if (n === 0) return 'Free';
    return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;
  };

  const durationLabel = type === 'free_trial'
    ? `${duration_value}-day free trial`
    : `per ${duration_unit}`;

  return (
    <div
      className={`feat-card${make_recommended ? ' pricing-featured' : ''}`}
      style={{
        textAlign: 'center',
        padding: '40px',
        ...(!make_recommended && { '--card-accent': 'linear-gradient(90deg,var(--bdl),var(--bdl))' }),
      }}
    >
      {make_recommended && (
        <div style={{ background: 'var(--blight)', color: 'var(--blue)', fontSize: '11px', fontWeight: '600', padding: '5px 14px', borderRadius: '16px', display: 'inline-block', marginBottom: '16px', letterSpacing: '.04em' }}>
          RECOMMENDED
        </div>
      )}

      <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '.1em', color: '#8A92A6', marginBottom: '20px' }}>
        {display_name}
      </div>

      {discount_enabled && discount_price ? (
        <>
          <div style={{ fontSize: '20px', color: '#A0AABB', textDecoration: 'line-through', marginBottom: '2px' }}>
            {formatPrice(price)}
          </div>
          <div style={{ fontSize: '52px', fontWeight: '800', color: 'var(--txt)', letterSpacing: '-2px', marginBottom: '6px' }}>
            {formatPrice(discount_price)}
          </div>
          <div style={{ fontSize: '12px', background: 'rgba(26,107,69,.1)', color: '#1A6B45', padding: '3px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '6px' }}>
            {discount_text}
          </div>
        </>
      ) : (
        <div style={{ fontSize: '52px', fontWeight: '800', color: 'var(--txt)', letterSpacing: '-2px', marginBottom: '6px' }}>
          {formatPrice(price)}
        </div>
      )}

      <div style={{ fontSize: '15px', color: '#8A92A6', marginBottom: description ? '14px' : '24px' }}>
        {durationLabel}
      </div>

      {description && (
        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px', minHeight: '36px' }}>
          {description}
        </div>
      )}

      <div style={{ fontSize: '13px', color: '#374151', marginBottom: '24px' }}>
        {document_limit_type === 'unlimited'
          ? 'Unlimited documents'
          : `Up to ${document_limit} document${document_limit !== 1 ? 's' : ''}`}
      </div>

      <a
        className={make_recommended ? 'btn-prim' : 'btn-ol-blue'}
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {button_text}
      </a>
    </div>
  );
};

const PLANS_CACHE_KEY = 'rc_plans_v1';
const PLANS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

function readPlanCache() {
  try {
    const raw = localStorage.getItem(PLANS_CACHE_KEY);
    if (!raw) return null;
    const { plans, ts } = JSON.parse(raw);
    if (Date.now() - ts > PLANS_CACHE_TTL) {
      localStorage.removeItem(PLANS_CACHE_KEY);
      return null;
    }
    return plans;
  } catch {
    return null;
  }
}

function writePlanCache(plans) {
  try {
    localStorage.setItem(PLANS_CACHE_KEY, JSON.stringify({ plans, ts: Date.now() }));
  } catch {}
}

const Pricing = ({ onNavigate }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = readPlanCache();
    if (cached) {
      setPlans(cached);
      setLoading(false);
      return;
    }

    fetch('https://api.mybids.us/api/user/content/subscription-plans/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const active = data.subscription_plan_details.filter(
            (p) => p.is_enabled && p.is_available && !p.is_expired
          );
          writePlanCache(active);
          setPlans(active);
        } else {
          setError('Failed to load plans.');
        }
      })
      .catch(() => setError('Failed to load plans.'))
      .finally(() => setLoading(false));
  }, []);

  const trialPlan = plans.find((p) => p.type === 'free_trial');

  return (
    <div className="page-enter">
      <section className="page-hero">
        <div className="page-hero-accent"></div>
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/features/quote_letter.png'})` }}></div>
        <div className="cxl">
          <div className="pg-badge">Pricing</div>
          <div className="ph-title">Simple, honest pricing.</div>
          <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto 44px' }}>
            All features included in every plan. No add-ons, no lock-in, no surprises.
            {trialPlan && ' Start with a free trial — no credit card required.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a className="btn-prim" href={APP_URL} target="_blank" rel="noopener noreferrer">
              🚀 {trialPlan ? `${trialPlan.button_text} →` : 'Get started →'}
            </a>
            <button className="btn-ghost" onClick={() => onNavigate('contact')}>Any questions? Talk to us</button>
          </div>
        </div>
      </section>

      <section className="sec-grey">
        <div className="cxl">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Choose your plan</div>
            <div className="sec-h2">Pick the plan that works for you</div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#8A92A6', fontSize: '15px' }}>
              Loading plans…
            </div>
          )}

          {error && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#EF4444', fontSize: '15px' }}>
              {error}
            </div>
          )}

          {!loading && !error && plans.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: plans.length <= 2 ? 'repeat(2,1fr)' : 'repeat(auto-fit,minmax(240px,1fr))',
              gap: '24px',
              maxWidth: plans.length <= 2 ? '760px' : '1100px',
              margin: '0 auto 56px',
            }}>
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          )}

          <div style={{ background: 'rgba(255,255,255,.82)', border: '1px solid rgba(220,226,240,.9)', borderRadius: '18px', padding: '40px', maxWidth: '760px', margin: '0 auto', backdropFilter: 'blur(8px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>What's included</div>
              <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--txt)', letterSpacing: '-.5px' }}>Every feature. Every plan.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {included.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#1A6B45', fontSize: '16px', flexShrink: '0' }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
