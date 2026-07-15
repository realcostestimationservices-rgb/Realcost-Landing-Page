import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import ScrollTop from './components/ui/ScrollTop';
import useScrollRestoration from './hooks/useScrollRestoration';

const Home = React.lazy(() => import('./pages/Home'));
const Demo = React.lazy(() => import('./pages/Demo'));
const Features = React.lazy(() => import('./pages/Features'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const Contact = React.lazy(() => import('./pages/Contact'));
const WhyRealCost = React.lazy(() => import('./pages/WhyRealCost'));
const OurStory = React.lazy(() => import('./pages/OurStory'));

function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onDone(), 2400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`splash${fading ? ' fade-out' : ''}`}>
      <div className="splash-loader">
        <div className="splash-spinner" />
        <div className="splash-inner">
          <img
            src={process.env.PUBLIC_URL + '/images/brand/start-logo.png'}
            alt="Real Cost Estimating"
            className="splash-logo"
          />
        </div>
      </div>
      {/* <div className="splash-tagline">Digital Estimation Platform</div> */}
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useScrollRestoration();

  const handleNavigate = (page, hash = '') => {
    navigate('/' + page + hash);
  };

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const duration = 1400;
    let frame = 0;
    let attempts = 0;

    const smoothScrollTo = (targetY) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;
        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          frame = window.requestAnimationFrame(step);
        }
      };

      frame = window.requestAnimationFrame(step);
    };

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 90;
        smoothScrollTo(top);
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        window.setTimeout(tryScroll, 150);
      }
    };

    const timer = window.setTimeout(tryScroll, 650);

    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash]);

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <div className="App">
        <Nav
          currentPage={location.pathname.replace('/', '') || 'home'}
          onNavigate={handleNavigate}
          lightHero={false}
        />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<Home onNavigate={handleNavigate} />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/demo" element={<Demo onNavigate={handleNavigate} />} />
            <Route path="/features" element={<Features onNavigate={handleNavigate} />} />
            <Route path="/pricing" element={<Pricing onNavigate={handleNavigate} />} />
            <Route path="/faq" element={<FAQ onNavigate={handleNavigate} />} />
            <Route path="/careers" element={<Navigate to="/our-story" />} />
            <Route path="/contact" element={<Contact onNavigate={handleNavigate} />} />
            <Route path="/why-real-cost" element={<WhyRealCost onNavigate={handleNavigate} />} />
            <Route path="/our-story" element={<OurStory onNavigate={handleNavigate} />} />
          </Routes>
        </Suspense>
        <Footer onNavigate={handleNavigate} />
        <Chatbot />
        <ScrollTop />
      </div>
    </>
  );
}

export default App;