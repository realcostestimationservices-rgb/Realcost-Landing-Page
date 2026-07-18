import React from 'react';
import { Reveal, RevealGroup } from '../ui/Reveal';
import '../../styles/components/footer.css';
import { APP_URL } from '../../config';

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 .18h3a2 2 0 0 1 2 1.72c.13 1 .37 1.98.72 2.91a2 2 0 0 1-.45 2.11L7.09 8a16 16 0 0 0 9 9l1.08-1.18a2 2 0 0 1 2.11-.45c.93.35 1.91.59 2.91.72A2 2 0 0 1 22 18v-1.08z"/>
  </svg>
);
const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
);
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const Footer = ({ onNavigate }) => {
  return (
    <footer className="rc-footer">

      <RevealGroup className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', padding: '52px 80px', maxWidth: '1440px', margin: '0 auto' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src={process.env.PUBLIC_URL + '/images/brand/logo.png'} width="36" height="36" alt="Real Cost" style={{ borderRadius: '8px', objectFit: 'contain', flexShrink: '0', background: '#fff', padding: '5px', boxShadow: '0 2px 10px rgba(0,0,0,.22)' }} />
            <div><div style={{ fontSize: '11px', fontWeight: '800', color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase' }}>Real Cost <sup style={{ fontSize: '0.90em', fontWeight: '500', color: '#fff' }}>®</sup></div><div style={{ fontSize: '9px', fontWeight: '300', color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase' }}>Estimation Platform</div></div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(200,210,240,.38)', lineHeight: '1.82', maxWidth: '240px', fontWeight: '300' }}>Digital estimation platform for trade contractors across Canada. Upload drawings, count symbols, build your bid, send your quote.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener" title="Instagram" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(225,48,108,.28)'; e.currentTarget.style.borderColor = 'rgba(225,48,108,.45)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.11)'; }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,.65)" stroke="none" /></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" title="X / Twitter" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.16)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.28)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.11)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.65)"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" title="Facebook" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(24,119,242,.30)'; e.currentTarget.style.borderColor = 'rgba(24,119,242,.50)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.11)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.65)"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /></svg>
            </a>
            <a href="https://wa.me/16476778399" target="_blank" rel="noopener" title="WhatsApp" style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .18s', textDecoration: 'none' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37,211,102,.25)'; e.currentTarget.style.borderColor = 'rgba(37,211,102,.45)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.11)'; }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,.65)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
            </a>
          </div>
        </div>
        <div><div className="f-lbl">Platform</div><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('features')}>Features</button><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('pricing')}>Pricing</button><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('demo')}>Request Demo</button></div>
        <div><div className="f-lbl">Company</div><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('our-story')}>Our Story</button><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('faq')}>FAQ</button><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('our-story', '#careers')}>Careers</button><button className="f-lnk" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left' }} onClick={() => onNavigate('contact')}>Contact Us</button></div>
        <div>
          <div className="f-lbl">Contact</div>
          <a className="f-lnk f-contact" href="tel:6476778399"><IconPhone />(647) 677-8399</a>
          <a className="f-lnk f-contact" href="https://mail.google.com/mail/?view=cm&fs=1&to=info@realcostestimating.ca" target="_blank" rel="noopener noreferrer"><IconMail />info@realcostestimating.ca</a>
          <div className="f-lnk f-contact" style={{ cursor: 'default' }}><IconPin />1200 Bloor Street West, Toronto</div>
        </div>
      </RevealGroup>
      <Reveal as="div" className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 80px', borderTop: '1px solid rgba(96,165,250,.12)', maxWidth: '1440px', margin: '0 auto', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ fontSize: '12px', color: 'rgba(200,210,240,.28)', fontWeight: '300' }}>© 2023 Real Cost Estimating Inc. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '28px' }}>
          <a href={`${APP_URL}termsandconditions`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'rgba(200,210,240,.28)', textDecoration: 'none' }}>Privacy policy & Terms of use</a>
        </div>
      </Reveal>
    </footer>
  );
};

export default Footer;
