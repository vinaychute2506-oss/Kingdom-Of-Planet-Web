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
          
          {/* Custom Royal Crest Logo */}
          <a href="#home" className={styles.logo}>
            <img src="/logo.png" alt="Kingdom of Learning Pre School" className={styles.logoImg} />
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
