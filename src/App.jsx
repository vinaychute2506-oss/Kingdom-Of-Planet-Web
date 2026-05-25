import React, { useState, useEffect } from 'react';
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

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [loading, setLoading] = useState(true);

  // Monitor location hash shifts to run dynamic state routing
  useEffect(() => {
    const handleHashChange = () => {
      // Default to #home if hash is empty
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
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* 1. Playful Introductory preloader screen */}
      <PageLoader />

      {/* Main shell layout wrapper */}
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* 2. Sticky navigation header */}
        <Navbar currentHash={currentHash} />

        {/* 3. Rendered central page view */}
        <main className="main-content" style={{ flexGrow: 1, paddingBottom: '40px' }}>
          {renderActivePage()}
        </main>

        {/* 4. Playful footer details */}
        <Footer />

        {/* 5. Global floats widgets */}
        <WhatsAppButton />
        <StickyEnrollMobile currentHash={currentHash} />

      </div>
    </>
  );
}

export default App;
