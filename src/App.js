import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import ScrollTop from './components/ui/ScrollTop';

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
      <div className="splash-card">
        <img
          src={process.env.PUBLIC_URL + '/images/brand/start-logo.png'}
          alt="Real Cost Estimating"
          className="splash-logo"
        />
      </div>
      <div className="splash-tagline">Digital Estimation Platform</div>
      <div className="splash-bar">
        <div className="splash-bar-fill" />
      </div>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (page) => {
    navigate('/' + page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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