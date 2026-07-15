import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/components/nav.css';

const Nav = ({ currentPage, onNavigate, lightHero }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [currentPage]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const pages = [
    { id: 'home',           label: 'Home' },
    { id: 'why-real-cost',  label: 'Why Real Cost' },
    { id: 'our-story',      label: 'Our Story' },
    { id: 'features',       label: 'Our Features' },
    { id: 'pricing',        label: 'Pricing' },
    { id: 'faq',            label: 'FAQ' },
{ id: 'contact',        label: 'Contact Us' },
  ];

  const navigate = useNavigate();
  const handleNav = (id) => {
    if (onNavigate) onNavigate(id);
    else navigate('/' + id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`rc-nav ${scrolled ? 'scrolled' : ''} ${lightHero && !scrolled ? 'light-hero' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="nav-brand" onClick={() => handleNav('home')}>
          <img
            src={process.env.PUBLIC_URL + '/images/brand/logo.png'}
            width="36"
            height="36"
            alt="Real Cost"
            style={{ borderRadius: '8px', objectFit: 'contain', flexShrink: '0', background: '#fff', padding: '5px', boxShadow: '0 2px 10px rgba(0,0,0,.22)' }}
          />
          <div className="nav-brand-wordmark">
            <span>REAL COST</span>
            <span>Estimation Platform</span>
          </div>
        </div>

        {/* Desktop pill */}
        <div className="nav-pill">
          <div className="nav-links">
            {pages.map(p => (
              <button
                key={p.id}
                className={`nl ${currentPage === p.id ? 'active' : ''}`}
                onClick={() => handleNav(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => handleNav('demo')}>
            Request Demo
          </button>
        </div>

        {/* Hamburger — shown via CSS at ≤768px */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-drawer"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="nav-drawer-inner"
              onClick={e => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="nav-drawer-brand">
                <img src={process.env.PUBLIC_URL + '/images/brand/logo.png'} width="28" height="28" alt="Real Cost"
                  style={{ borderRadius: '6px', objectFit: 'contain', flexShrink: 0, background: '#fff', padding: '4px', boxShadow: '0 2px 8px rgba(0,0,0,.18)' }} />
                <span>Real Cost</span>
              </div>
              <nav className="nav-drawer-links">
                {pages.map((p, i) => (
                  <motion.button
                    key={p.id}
                    className={`nav-drawer-link ${currentPage === p.id ? 'active' : ''}`}
                    onClick={() => handleNav(p.id)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + i * 0.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {p.label}
                  </motion.button>
                ))}
              </nav>
              <motion.button
                className="btn-prim"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                onClick={() => handleNav('demo')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Request Demo
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
