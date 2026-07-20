import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealGroup } from '../components/ui/Reveal';
import '../styles/pages/pricing.css';
import { LOGIN_URL, API_BASE_URL } from '../config';

const FEATURE_CARDS = [
  { title: 'Unlimited Projects', desc: 'Create and manage as many estimation projects as you need.' },
  { title: 'Free Training', desc: 'One-on-one demo with a qualified Trade Expert at any time.' },
  { title: 'No Lock-in', desc: 'Pay-as-you-go with no contracts. Cancel anytime, no questions.' },
  { title: 'Concurrent Licensing', desc: 'Your whole team works from a single shared licence.' },
];

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoneyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M8 3h8l-2 4H10L8 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6 7h12l1.5 12a2 2 0 01-2 2.2H6.5A2 2 0 014.5 19L6 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="14" r="2.6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M12 12.4v3.2M11 13.2h2M11 14.8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 9h16" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    {[13, 16.5].map((cy) =>
      [8, 12, 16].map((cx) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1" fill="currentColor" />)
    )}
  </svg>
);

const STREAMLINE_ITEMS = [
  {
    icon: <ClockIcon />,
    title: 'Save Time',
    desc: 'The database of hundreds of common templates reduces the time spent creating schedules and quotes from days to minutes.',
  },
  {
    icon: <MoneyIcon />,
    title: 'Save Money',
    desc: 'Accurate, upfront information enables instant budgeting to make sure time and money are only spent on realistic projects and processes.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Save Stress',
    desc: 'Clear, transparent prices ensure that expectations are managed appropriately and disputes are a thing of the past.',
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
    <circle cx="9" cy="9" r="9" fill={light ? 'rgba(147,186,251,.22)' : '#EFF5FF'} />
    <path d="M5 9l2.8 2.8 5-5" stroke={light ? '#93BAFB' : '#1D5FD8'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
    fetch(`${API_BASE_URL}/api/user/content/subscription-plans/`)
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
  // Every plan for the selected billing cycle — each renders as its own card.
  const cyclePlans = plans.filter((p) => p.type === cycle);

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
      <section className="page-hero">
        <div className="page-hero-accent" />
        <div className="page-hero-bg" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/pricing/pricing.png'})` }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(105deg,rgba(10,20,40,.52) 0%,rgba(10,20,40,.32) 34%,transparent 62%)' }} />
        <div className="hero-glow" />
        <div className="cxl" style={{ textAlign: 'left' }}>
          <motion.div
            style={{ maxWidth: '560px' }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="pg-badge" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.15 }}>Simple Pricing</motion.div>
            <div className="ph-title">Start free for {trialDays} days.<br />Subscribe when ready.</div>
            <p className="sec-sub" style={{ margin: '0 0 32px' }}>
              Every feature unlocked from day one. No credit card, no commitment, no surprises.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span className="ph-chip">✓ No credit card required</span>
              <span className="ph-chip">✓ Cancel anytime</span>
              <span className="ph-chip">✓ Free trade expert demo</span>
            </div>
            <motion.div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.4 }}>
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">Start Free Trial →</motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" onClick={() => onNavigate('contact')}>Talk to sales</motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Streamline ── */}
      <section className="pr-streamline-section">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center' }}>
            <div className="sec-h2">Simple Software That Saves You Time, Money &amp; Stress</div>
          </Reveal>
          <RevealGroup className="pr-streamline-grid">
            {STREAMLINE_ITEMS.map((item, i) => (
              <div key={i} className="pr-streamline-item">
                <div className="pr-streamline-icon">{item.icon}</div>
                <div className="pr-streamline-title">{item.title}</div>
                <div className="pr-streamline-desc">{item.desc}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section style={{ padding: '34px 0 28px' }}>
        <div className="cxl" style={{ textAlign: 'center' }}>
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Best Value for Price</div>
          <h2 className="pr-tagline-heading">
            <span className="pr-tagline-brand">Real Cost</span> — A name you can rely on.
          </h2>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="pr-plans-section">
        <div className="cxl">

          {/* Toggle */}
          {hasYearly && hasMonthly && (
            <Reveal className="pr-toggle-wrap">
              <div className="pr-toggle">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`pr-toggle-btn${cycle === 'monthly' ? ' active' : ''}`}
                  onClick={() => setCycle('monthly')}
                >
                  Monthly
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`pr-toggle-btn${cycle === 'yearly' ? ' active' : ''}`}
                  onClick={() => setCycle('yearly')}
                >
                  Yearly
                  {savingPct > 0 && (
                    <span className="pr-toggle-save">Save {savingPct}%</span>
                  )}
                </motion.button>
              </div>
            </Reveal>
          )}

          {loading && <div className="pr-loading">Loading plans…</div>}
          {error && <div className="pr-error">{error}</div>}

          {!loading && !error && (
            <RevealGroup className="pr-cards">

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
                    <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="pr-cta-outline" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                      {trialPlan.button_text}
                    </motion.a>
                  </div>
                </div>
              )}

              {/* ── One card per plan in the selected cycle ── */}
              {cyclePlans.map((plan) => {
                const featured = !!plan.make_recommended;
                const planDiscount = plan.discount_enabled && !!plan.discount_price;
                const displayPrice = planDiscount ? plan.discount_price : plan.price;
                return (
                  <div key={plan.id ?? plan.title} className={`pr-card${featured ? ' pr-card-featured' : ''}`}>
                    <div className="pr-card-top">
                      {featured && (
                        <div className="pr-most-popular">Most Popular</div>
                      )}
                      <div className="pr-plan-label">
                        {cycle === 'yearly' ? 'Yearly Plan' : 'Monthly Plan'}
                      </div>
                      <div className="pr-plan-name">{plan.title}</div>
                      <div className="pr-plan-desc">{plan.description}</div>
                      <div className="pr-price-block">
                        {planDiscount && (
                          <span className="pr-price-original">{fmt(plan.price)}</span>
                        )}
                        <span className="pr-price">{fmt(displayPrice)}</span>
                        <span className="pr-price-period">/{plan.duration_unit}</span>
                      </div>
                      <div className="pr-price-seat">per seat · billed {cycle}</div>
                      {planDiscount && plan.discount_text && (
                        <div className="pr-discount-tag">{plan.discount_text}</div>
                      )}
                    </div>
                    <div className="pr-card-bottom">
                      <ul className="pr-features">
                        {PLAN_FEATURES_PRO.map((f, i) => (
                          <li key={i} className="pr-feature-item"><Check />{f}</li>
                        ))}
                      </ul>
                      <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className={featured ? 'pr-cta-primary' : 'pr-cta-outline'} href={APP_URL} target="_blank" rel="noopener noreferrer">
                        {plan.button_text}
                      </motion.a>
                      {featured && (
                        <p className="pr-cta-note">{trialDays}-day free trial included · no card needed</p>
                      )}
                    </div>
                  </div>
                );
              })}

            </RevealGroup>
          )}

        </div>
      </section>

      {/* ── What's included ── */}
      <section className="pr-features-section">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>What's included</div>
            <div className="sec-h2">Everything you need to win more bids</div>
            <p className="sec-sub" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Every plan — free or paid — gets the full feature set from day one.
            </p>
          </Reveal>
          <RevealGroup className="pr-features-grid">
            {FEATURE_CARDS.map((fc, i) => (
              <div key={i} className="pr-feature-card">
                <div className="pr-feature-title">{fc.title}</div>
                <div className="pr-feature-desc">{fc.desc}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="pr-trust-section">
        <div className="cxl">
          <Reveal style={{ textAlign: 'center' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Trusted by contractors</div>
            <div className="sec-h2">Real Cost supports your team at every step</div>
            <p className="sec-sub" style={{ maxWidth: '540px', margin: '0 auto' }}>
              The platform is built around trade workflows with practical support, trusted delivery, and service that keeps your next bid on track.
            </p>
          </Reveal>
          <RevealGroup className="pr-trust-grid">
            {[
              { title: 'Professional Team', desc: 'Real Cost’s expert support team understands trade estimating and helps you stay accurate and on schedule.' },
              { title: 'Trusted by Clients', desc: 'Contractors across Canada rely on Real Cost for consistent estimates and competitive bids.' },
              { title: 'Customer Support', desc: 'Get fast, practical help with implementation, training, and troubleshooting whenever your team needs it.' },
            ].map((item, i) => (
              <div key={i} className="pr-trust-card">
                <div className="pr-trust-title">{item.title}</div>
                <div className="pr-trust-desc">{item.desc}</div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="pr-bottom-cta">
        <div className="cxl">
          <Reveal>
            <div className="pr-bottom-cta-title">Ready to estimate smarter?</div>
            <p className="pr-bottom-cta-sub">
              Join estimators across Canada already using RealCost to win more bids.
            </p>
            <div className="pr-bottom-cta-btns">
              <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-prim" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Start your free trial
              </motion.a>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-ghost" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.2)' }} onClick={() => onNavigate('contact')}>
                Talk to us first
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Pricing;
