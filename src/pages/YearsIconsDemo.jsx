import React from 'react';
import { YearsIcons, YearsIconGrid } from '../components/ui/YearsIcons';

const YearsIconsDemo = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '12px', color: '#050300' }}>
            15 Years Anniversary Icons
          </h1>
          <p style={{ fontSize: '18px', color: '#6B7489', maxWidth: '600px', margin: '0 auto' }}>
            Premium icon set with dark and light variants. Perfect for milestone celebrations and brand consistency.
          </p>
        </div>

        {/* Icon Grid Showcase */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '40px', marginBottom: '60px', boxShadow: '0 4px 12px rgba(15,37,87,0.08)' }}>
          <YearsIconGrid />
        </div>

        {/* Integration Examples */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', color: '#050300' }}>Usage Examples</h2>

          {/* Example 1: Dark Background */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1F2937' }}>Example 1: Dark Background Section</h3>
            <div style={{ backgroundColor: '#0F2557', color: 'white', padding: '48px', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
                <YearsIcons.Trophy variant="light" size={56} />
                <YearsIcons.Star variant="light" size={56} />
                <YearsIcons.Check variant="light" size={56} />
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>15 Years of Excellence</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto' }}>
                Leading the industry with innovation, trust, and uncompromising quality since 2010.
              </p>
            </div>
          </div>

          {/* Example 2: Light Background */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1F2937' }}>Example 2: Light Background with Features</h3>
            <div style={{ backgroundColor: '#fff', padding: '48px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15,37,87,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                {[
                  { icon: YearsIcons.Shield, title: 'Reliable', desc: '15 years of proven stability and security' },
                  { icon: YearsIcons.Growth, title: 'Growing', desc: 'Continuously expanding and improving' },
                  { icon: YearsIcons.Handshake, title: 'Trusted', desc: 'By 500+ contractors globally' }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <Icon variant="dark" size={56} />
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1F2937' }}>{title}</h4>
                    <p style={{ fontSize: '14px', color: '#6B7489', lineHeight: '1.6' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example 3: Timeline/Milestone */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1F2937' }}>Example 3: Milestone Timeline</h3>
            <div style={{ backgroundColor: '#fff', padding: '48px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15,37,87,0.08)' }}>
              <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ position: 'absolute', left: '40px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(180deg, rgba(218,178,40,0.3), rgba(218,178,40,0.1))' }} />

                {[
                  { year: '2010', icon: YearsIcons.Ribbon, text: 'Founded' },
                  { year: '2015', icon: YearsIcons.Growth, text: 'Reached 500 customers' },
                  { year: '2020', icon: YearsIcons.Trophy, text: 'Industry Leader' },
                  { year: '2025', icon: YearsIcons.Star, text: '15 Years Strong' }
                ].map(({ year, icon: Icon, text }, idx) => (
                  <div key={year} style={{ display: 'flex', gap: '24px', marginBottom: idx !== 3 ? '32px' : '0', position: 'relative' }}>
                    <div style={{ flexShrink: 0, width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon variant="dark" size={56} />
                    </div>
                    <div style={{ paddingTop: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#DAB228', marginBottom: '4px' }}>{year}</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Example 4: Stats Section */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1F2937' }}>Example 4: Stats/Achievements</h3>
            <div style={{ backgroundColor: '#FFFBE0', padding: '48px', borderRadius: '14px', border: '2px solid #EEC630' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', textAlign: 'center' }}>
                {[
                  { icon: YearsIcons.Clock, number: '15', label: 'Years Active' },
                  { icon: YearsIcons.Trophy, number: '500+', label: 'Happy Clients' },
                  { icon: YearsIcons.Check, number: '99.9%', label: 'Uptime' },
                  { icon: YearsIcons.Star, number: '4.6★', label: 'Avg. Rating' }
                ].map(({ icon: Icon, number, label }) => (
                  <div key={label}>
                    <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                      <Icon variant="light" size={48} />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#D09C18', marginBottom: '4px' }}>{number}</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#8A6000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code Reference */}
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15,37,87,0.08)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#050300' }}>Code Examples</h2>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Import & Usage</h3>
            <pre style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '13px', fontFamily: 'monospace', color: '#1F2937' }}>
{`import { YearsIcons } from '../components/ui/YearsIcons';

// Dark variant (default)
<YearsIcons.Trophy variant="dark" size={48} />

// Light variant
<YearsIcons.Star variant="light" size={64} />

// Different sizes
<YearsIcons.Check variant="dark" size={32} />
<YearsIcons.Check variant="dark" size={48} />
<YearsIcons.Check variant="dark" size={64} />`}
            </pre>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Icons</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              {['Trophy', 'Star', 'Check', 'Handshake', 'Growth', 'Clock', 'Shield', 'Ribbon', 'Lightning'].map(name => (
                <code key={name} style={{ backgroundColor: '#f3f4f6', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#1F2937', fontWeight: '500' }}>YearsIcons.{name}</code>
              ))}
            </div>
          </div>
        </div>

        {/* Color Reference */}
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(15,37,87,0.08)', marginTop: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px', color: '#050300' }}>Color Palette</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dark Variant</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#050300', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#DAB228', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7489', marginBottom: '4px' }}>Background: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#050300</code></div>
                <div style={{ fontSize: '12px', color: '#6B7489' }}>Accent: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#DAB228</code></div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Light Variant</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#FFFBE0', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
                  <div style={{ flex: 1, height: '60px', backgroundColor: '#EEC630', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7489', marginBottom: '4px' }}>Background: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#FFFBE0</code></div>
                <div style={{ fontSize: '12px', color: '#6B7489' }}>Accent: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#EEC630</code></div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1F2937', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gold Gradient</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ height: '60px', background: 'linear-gradient(135deg, #F8E860 0%, #D09C18 50%, #8A6000 100%)', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '12px' }}></div>
                <div style={{ fontSize: '12px', color: '#6B7489', marginBottom: '4px' }}>Start: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#F8E860</code></div>
                <div style={{ fontSize: '12px', color: '#6B7489', marginBottom: '4px' }}>Mid: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#D09C18</code></div>
                <div style={{ fontSize: '12px', color: '#6B7489' }}>End: <code style={{ backgroundColor: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>#8A6000</code></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearsIconsDemo;
