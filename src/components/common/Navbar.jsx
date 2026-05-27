import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap } from 'lucide-react';
import styles from './Navbar.module.scss';

const Navbar = ({ currentHash }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on hash transition
  useEffect(() => {
    setIsOpen(false);
  }, [currentHash]);

  // Handle header background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', hash: '#home' },
    { name: 'About Us', hash: '#about' },
    { name: 'Programs', hash: '#programs' },
    { name: 'Activities', hash: '#activities' },
    { name: 'Gallery', hash: '#gallery' },
    { name: 'Contact', hash: '#contact' },
  ];

  const handleEnrollClick = () => {
    window.location.hash = '#contact';
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navbarContainer}`}>
          
          {/* Custom Crown + Book + Star Crest Logo */}
          <a href="#home" className={styles.logo}>
            <div className={styles.logoCrest}>
              <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Open Book in Wine */}
                <path d="M15 70C25 70 35 65 50 72C65 65 75 70 85 70V28C75 28 65 24 50 30C35 24 25 28 15 28V70Z" fill="#6B1D2F" stroke="#D4AF37" strokeWidth="3" />
                <path d="M50 30V72" stroke="#D4AF37" strokeWidth="3" />
                {/* Elegant Crown in Gold */}
                <path d="M30 52L40 56L50 44L60 56L70 52L66 64H34L30 52Z" fill="#D4AF37" stroke="#6B1D2F" strokeWidth="1.5" />
                {/* Sparkling Star in Gold */}
                <path d="M50 10L53 18L61 18L55 23L57 31L50 26L43 31L45 23L39 18L47 18L50 10Z" fill="#D4AF37" />
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.wordPlanet}>Kingdom of Learning</span>
              <span className={styles.wordSchool}>Pre School</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = currentHash === link.hash || (currentHash === '' && link.hash === '#home');
              return (
                <a 
                  key={link.hash} 
                  href={link.hash} 
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeIndicator" 
                      className={styles.indicator} 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Enrollment */}
          <div className={styles.headerActions}>
            <motion.button 
              className={styles.enrollBtn} 
              onClick={handleEnrollClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap size={18} />
              <span>Admissions</span>
            </motion.button>

            {/* Mobile hamburger */}
            <button 
              className={styles.mobileMenuToggle} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileNavContainer}>
              {navLinks.map((link, idx) => {
                const isActive = currentHash === link.hash || (currentHash === '' && link.hash === '#home');
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.hash}
                    href={link.hash}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                  >
                    {navLinks.name}
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className={styles.mobileEnrollBtn}
                onClick={handleEnrollClick}
              >
                Admissions
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
