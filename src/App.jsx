import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PageLoader from './components/common/PageLoader';
import WhatsAppButton from './components/common/WhatsAppButton';
import StickyEnrollMobile from './components/common/StickyEnrollMobile';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admissions from './pages/Admissions';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll coordinate metrics for top progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor location hash shifts to run dynamic state routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);
      
      // Smoothly scroll window viewport back to the top on transition
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Set a timeout to clear the introductory loading overlay screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  // Determine active view to render based on URL hash state
  const renderActivePage = () => {
    switch (currentHash) {
      case '#home':
        return <Home />;
      case '#about':
        return <About />;
      case '#programs':
        return <Programs />;
      case '#activities':
        return <Activities />;
      case '#gallery':
        return <Gallery />;
      case '#contact':
        return <Contact />;
      case '#admissions':
        return <Admissions />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* 1. Playful Shimmering preloader screen */}
      <PageLoader />

      {/* 2. Thin top Scroll Progress Indicator in Wine/Gold */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: `${scrollProgress}%`, 
          height: '3px', 
          background: '#541221', 
          zIndex: 99999, 
          transition: 'width 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }} 
      />

      {/* Main shell layout wrapper */}
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* 3. Sticky glassmorphism header */}
        <Navbar currentHash={currentHash} />

        {/* 4. Cinematic Page Transition Overlay */}
        <main className="main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHash}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 5. Luxury footer details */}
        <Footer />

        {/* 6. Global floating support widgets */}
        <WhatsAppButton />
        <StickyEnrollMobile currentHash={currentHash} />

      </div>
    </>
  );
}

export default App;
