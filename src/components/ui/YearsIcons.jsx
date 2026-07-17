import React from 'react';

/* 15 Years Anniversary Icon Set
   Light variant: #FFFBE0 (cream) + gold text (#EEC630)
   Dark variant: #050300 (near black) + gold accents (#DAB228) */

export const YearsIcons = {
  /* Trophy - Achievement & Excellence */
  Trophy: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M12 32c0 2.2 2.2 4 4.8 4h14.4c2.6 0 4.8-1.8 4.8-4v-2H12v2z"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 20v12M10 18h28M14 14c0-2.2 1.8-4 4-4h4v10h-8c-2.2 0-4-1.8-4-4V14zM30 14c0-2.2-1.8-4-4-4h-4v10h8c2.2 0 4-1.8 4-4V14z"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="14" r="2" fill={strokeColor} />
      </svg>
    );
  },

  /* Star - Premium & Excellence */
  Star: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const fillColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M24 10l3.5 9h9.5l-7.7 5.6 2.9 8.9-7.7-5.6-7.7 5.6 2.9-8.9-7.7-5.6h9.5l3.5-9z"
              fill={fillColor} />
      </svg>
    );
  },

  /* Checkmark - Success & Reliability */
  Check: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M16 24l6 6 12-12"
              fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  },

  /* Handshake - Partnership & Trust */
  Handshake: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M10 28c0 2.2 1.8 4 4 4h6v-8h-10v4zM34 28c0 2.2-1.8 4-4 4h-6v-8h10v4z"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24l4 4 8-8"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="16" r="2" fill={strokeColor} />
        <circle cx="34" cy="16" r="2" fill={strokeColor} />
      </svg>
    );
  },

  /* Growth Arrow - Progress & Expansion */
  Growth: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M12 32v-8M20 28v-4M28 24v-8M36 20v-8"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24l24-12M28 12l8-8v8h-8"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  },

  /* Clock - Time & Longevity */
  Clock: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <circle cx="24" cy="24" r="11" fill="none" stroke={strokeColor} strokeWidth="1.5"/>
        <line x1="24" y1="14" x2="24" y2="24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="24" x2="30" y2="24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="2" fill={strokeColor} />
      </svg>
    );
  },

  /* Shield - Security & Protection */
  Shield: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const strokeColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M24 10L14 14v8c0 6.6 10 12 10 12s10-5.4 10-12v-8l-10-4z"
              fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="2" fill={strokeColor} />
      </svg>
    );
  },

  /* Ribbon/Badge - Milestone */
  Ribbon: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const fillColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M12 18l6 12-6 6v-18zM36 18l-6 12 6 6v-18z" fill={fillColor} opacity="0.5"/>
        <circle cx="24" cy="20" r="6" fill={fillColor} />
        <path d="M18 32l6 4 6-4" fill="none" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  },

  /* Lightning - Energy & Power */
  Lightning: ({ variant = 'dark', size = 48 }) => {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#050300' : '#FFFBE0';
    const fillColor = isDark ? '#DAB228' : '#EEC630';

    return (
      <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="12" fill={bgColor} />
        <path d="M24 10l-8 14h6l8 14-6-20h-6l6-8z" fill={fillColor} />
      </svg>
    );
  },
};

/* YearsIconGrid Component - Display icon set with variants */
export const YearsIconGrid = () => {
  const icons = [
    { name: 'Trophy', component: YearsIcons.Trophy },
    { name: 'Star', component: YearsIcons.Star },
    { name: 'Check', component: YearsIcons.Check },
    { name: 'Handshake', component: YearsIcons.Handshake },
    { name: 'Growth', component: YearsIcons.Growth },
    { name: 'Clock', component: YearsIcons.Clock },
    { name: 'Shield', component: YearsIcons.Shield },
    { name: 'Ribbon', component: YearsIcons.Ribbon },
    { name: 'Lightning', component: YearsIcons.Lightning },
  ];

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '32px' }}>15 Years Anniversary Icon Set</h2>

      {/* Dark Variant */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '14px', fontWeight: '600', color: '#6B7489', textTransform: 'uppercase', letterSpacing: '1px' }}>Dark Variant (Premium Black)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '20px' }}>
          {icons.map(({ name, component: Component }) => (
            <div key={`dark-${name}`} style={{ textAlign: 'center' }}>
              <Component variant="dark" size={64} />
              <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: '500', color: '#1F2937' }}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Light Variant */}
      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '14px', fontWeight: '600', color: '#6B7489', textTransform: 'uppercase', letterSpacing: '1px' }}>Light Variant (Cream)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '20px', padding: '24px', backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
          {icons.map(({ name, component: Component }) => (
            <div key={`light-${name}`} style={{ textAlign: 'center' }}>
              <Component variant="light" size={64} />
              <div style={{ marginTop: '12px', fontSize: '12px', fontWeight: '500', color: '#1F2937' }}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Reference */}
      <div style={{ marginTop: '60px', padding: '24px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>Color Reference</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Dark Variant</strong>
              <div style={{ fontSize: '12px', color: '#6B7489', marginTop: '4px' }}>Background: #050300 (Near Black)</div>
              <div style={{ fontSize: '12px', color: '#6B7489' }}>Accent: #DAB228 (Gold)</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#050300', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#DAB228', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '12px' }}>
              <strong>Light Variant</strong>
              <div style={{ fontSize: '12px', color: '#6B7489', marginTop: '4px' }}>Background: #FFFBE0 (Cream)</div>
              <div style={{ fontSize: '12px', color: '#6B7489' }}>Accent: #EEC630 (Bright Gold)</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#FFFBE0', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#EEC630', borderRadius: '8px', border: '1px solid #e5e7eb' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearsIcons;
