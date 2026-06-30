import React, { useState, useEffect } from 'react';
import '../styles/pages/pricing.css';

const APP_URL = 'https://d3jt1vpskh0hbe.cloudfront.net/';

const FEATURE_CARDS = [
  { icon: '📐', title: 'Unlimited Projects', desc: 'Create and manage as many estimation projects as you need.' },
  { icon: '🎓', title: 'Free Training', desc: 'One-on-one demo with a qualified Trade Expert at any time.' },
  { icon: '🔄', title: 'No Lock-in', desc: 'Pay-as-you-go with no contracts. Cancel anytime, no questions.' },
  { icon: '👥', title: 'Concurrent Licensing', desc: 'Your whole team works from a single shared licence.' },
];

const FAQ_ITEMS = [
  {
    q: 'Is there any commitment?',
    a: "RealCost allows you to pay-as-you-go and you're free to end your subscription whenever you like. We don't subject you to any lock-in contracts or hidden fees.",
  },
  {
    q: 'How does the 14-day free trial work?',
    a: "After signing up, you'll start a 14-day free trial with unrestricted access to all of RealCost's features. A free demonstration with a RealCost Trade Expert is available at any stage during the trial. Enter your billing details to continue using RealCost beyond the trial period.",
  },
];

const PLAN_FEATURES_FREE = [
  '10 documents included',
  'All core features unlocked',
  'Free Trade Expert demo',
  'No credit card required',
];

const PLAN_FEATURES_PRO = [
  'Unlimited Projects and Plans',
  'Free Training & Support',
  'No Contracts · Pay-as-you-go',
  'Concurrent Licensing',
];

function fmt(p) {
  const n = parseFloat(p);
  if (n === 0) return 'Free';
  return `$${Math.round(n)}`;
}

const CACHE_KEY = 'rc_plans_v1';
const CACHE_TTL = 60 * 60 * 1000;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { plans, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return plans;
  } catch { return null; }
}
function writeCache(plans) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ plans, ts: Date.now() })); } catch {}
}

const Check = ({ light }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill={light ? 'rgba(165,166,246,.2)' : '#EEEFFE'} />
    <path d="M5 9l2.8 2.8 5-5" stroke={light ? '#A5A6F6' : '#5A5BE6'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Pricing = ({ onNavigate }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cycle, setCycle] = useState('monthly');

  useEffect(() => {
    const cached = readCache();
    if (cached) { setPlans(cached); setLoading(false); return; }
    fetch('https://api.mybids.us/api/user/content/subscription-plans/')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const active = data.subscription_plan_details.filter(
            (p) => p.is_enabled && p.is_available && !p.is_expired
          );
          writeCache(active);
          setPlans(active);
        } else {
          setError('Failed to load plans.');
        }
      })
      .catch(() => setError('Failed to load plans.'))
      .finally(() => setLoading(false));
  }, []);

  const trialPlan = plans.find((p) => p.type === 'free_trial');
  const yearlyPlan = plans.find((p) => p.type === 'yearly');
  const monthlyPlan =
    plans.find((p) => p.type === 'monthly' && p.make_recommended) ||
    plans.find((p) => p.type === 'monthly');

  const trialDays = trialPlan?.duration_value ?? 14;

  const hasYearly = !!yearlyPlan;
  const hasMonthly = !!monthlyPlan;
  const activePlan = cycle === 'yearly' ? yearlyPlan : monthlyPlan;

  const activeDisplayPrice =
    activePlan?.discount_enabled && activePlan.discount_price
      ? activePlan.discount_price
      : activePlan?.price;

  const hasDiscount = activePlan?.discount_enabled && !!activePlan?.discount_price;

  // Compute yearly saving % vs monthly
  const mPrice = monthlyPlan
    ? parseFloat(monthlyPlan.discount_enabled && monthlyPlan.discount_price ? monthlyPlan.discount_price : monthlyPlan.price)
    : 0;
  const yPrice = yearlyPlan
    ? parseFloat(yearlyPlan.discount_enabled && yearlyPlan.discount_price ? yearlyPlan.discount_price : yearlyPlan.price)
    : 0;
  const savingPct = mPrice > 0 && yPrice > 0 ? Math.round((1 - yPrice / 12 / mPrice) * 100) : 0;

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="pr-hero">
        <div className="cxl">
          <div className="pr-hero-eyebrow">Simple Pricing</div>
          <h1 className="pr-hero-title">
            Start free for <span>{trialDays} days.</span><br />Subscribe when you're ready.
          </h1>
          <p className="pr-hero-sub">
            Every feature unlocked from day one. No credit card, no commitment,
            no surprises.
          </p>
          <div className="pr-trust-row">
            <span>No credit card required</span>
            <span>Cancel anytime</span>
            <span>Free trade expert demo</span>
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="pr-plans-section">
        <div className="cxl">

          {/* Toggle */}
          {hasYearly && hasMonthly && (
            <div className="pr-toggle-wrap">
              <div className="pr-toggle">
                <button
                  className={`pr-toggle-btn${cycle === 'monthly' ? ' active' : ''}`}
                  onClick={() => setCycle('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`pr-toggle-btn${cycle === 'yearly' ? ' active' : ''}`}
                  onClick={() => setCycle('yearly')}
                >
                  Yearly
                  {savingPct > 0 && (
                    <span className="pr-toggle-save">Save {savingPct}%</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {loading && <div className="pr-loading">Loading plans…</div>}
          {error && <div className="pr-error">{error}</div>}

          {!loading && !error && (
            <div className="pr-cards">

              {/* ── Free Trial card ── */}
              {trialPlan && (
                <div className="pr-card">
                  <div className="pr-card-top">
                    <div className="pr-plan-label">Free Trial</div>
                    <div className="pr-plan-name">{trialPlan.display_name}</div>
                    <div className="pr-plan-desc">{trialPlan.description}</div>
                    <div className="pr-price-block">
                      <span className="pr-price">Free</span>
                      <span className="pr-price-period">/{trialPlan.duration_value} days</span>
                    </div>
                    <div className="pr-price-seat">No credit card needed</div>
                  </div>
                  <div className="pr-card-bottom">
                    <ul className="pr-features">
                      {PLAN_FEATURES_FREE.map((f, i) => (
                        <li key={i} className="pr-feature-item"><Check />{f}</li>
                      ))}
                    </ul>
                    <a className="pr-cta-outline" href={APP_URL} target="_blank" rel="noopener noreferrer">
                      {trialPlan.button_text}
                    </a>
                  </div>
                </div>
              )}

              {/* ── Pro / featured card ── */}
              {activePlan && (
                <div className="pr-card pr-card-featured">
                  <div className="pr-card-top">
                    {activePlan.make_recommended && (
                      <div className="pr-most-popular">Most Popular</div>
                    )}
                    <div className="pr-plan-label">
                      {cycle === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'}
                    </div>
                    <div className="pr-plan-name">{activePlan.title}</div>
                    <div className="pr-plan-desc">{activePlan.description}</div>
                    <div className="pr-price-block">
                      {hasDiscount && (
                        <span className="pr-price-original">{fmt(activePlan.price)}</span>
                      )}
                      <span className="pr-price">{fmt(activeDisplayPrice)}</span>
                      <span className="pr-price-period">/{activePlan.duration_unit}</span>
                    </div>
                    <div className="pr-price-seat">per seat · billed {cycle}</div>
                    {hasDiscount && activePlan.discount_text && (
                      <div className="pr-discount-tag">{activePlan.discount_text}</div>
                    )}
                  </div>
                  <div className="pr-card-bottom">
                    <ul className="pr-features">
                      {PLAN_FEATURES_PRO.map((f, i) => (
                        <li key={i} className="pr-feature-item"><Check />{f}</li>
                      ))}
                    </ul>
                    <a className="pr-cta-primary" href={APP_URL} target="_blank" rel="noopener noreferrer">
                      {activePlan.button_text}
                    </a>
                    <p className="pr-cta-note">{trialDays}-day free trial included · no card needed</p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* ── What's included ── */}
      <section className="pr-features-section">
        <div className="cxl">
          <div style={{ textAlign: 'center' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>What's included</div>
            <div className="sec-h2">Everything you need to win more bids</div>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Every plan — free or paid — gets the full feature set from day one.
            </p>
          </div>
          <div className="pr-features-grid">
            {FEATURE_CARDS.map((fc, i) => (
              <div key={i} className="pr-feature-card">
                <div className="pr-feature-icon">{fc.icon}</div>
                <div className="pr-feature-title">{fc.title}</div>
                <div className="pr-feature-desc">{fc.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pr-faq-section">
        <div className="cxl">
          <div style={{ textAlign: 'center' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
            <div className="sec-h2">Common questions</div>
          </div>
          <div className="pr-faq-grid">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="pr-faq-item">
                <div className="pr-faq-q">{item.q}</div>
                <div className="pr-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pr-bottom-cta">
        <div className="cxl">
          <div className="pr-bottom-cta-title">Ready to estimate smarter?</div>
          <p className="pr-bottom-cta-sub">
            Join estimators across Canada already using RealCost to win more bids.
          </p>
          <div className="pr-bottom-cta-btns">
            <a className="btn-prim" href={APP_URL} target="_blank" rel="noopener noreferrer">
              🚀 Start your free trial
            </a>
            <button className="btn-ghost" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)' }} onClick={() => onNavigate('contact')}>
              Talk to us first
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;
