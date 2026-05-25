import React from 'react';
import { Mail, Phone, MapPin, Clock, Compass } from 'lucide-react';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (hash) => {
    window.location.hash = hash;
  };

  return (
    <footer className={styles.footer}>
      
      {/* Wave Separator SVG */}
      <div className={styles.waveContainer}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.wavePath}></path>
        </svg>
      </div>

      <div className={`container ${styles.footerGrid}`}>
        
        {/* Info Column */}
        <div className={styles.infoCol}>
          <div className={styles.logo}>
            <span className={styles.logoPlanet}>🪐</span>
            <span className={styles.logoText}>Kingdom of Learning</span>
          </div>
          <p className={styles.tagline}>
            A premium early childhood learning center in New Delhi dedicated to providing safe, activity-based play-way education for young minds.
          </p>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#3b5998' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#e1306c' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#ff0000' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z"/><polyline points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linksCol}>
          <h3 className={styles.title}>Quick Links</h3>
          <ul className={styles.linksList}>
            <li><button onClick={() => handleQuickLink('#home')}>Home</button></li>
            <li><button onClick={() => handleQuickLink('#about')}>About Us</button></li>
            <li><button onClick={() => handleQuickLink('#programs')}>Our Programs</button></li>
            <li><button onClick={() => handleQuickLink('#activities')}>Activities</button></li>
            <li><button onClick={() => handleQuickLink('#gallery')}>Photo Gallery</button></li>
            <li><button onClick={() => handleQuickLink('#contact')}>Enrollments</button></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className={styles.contactCol}>
          <h3 className={styles.title}>Get In Touch</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin className={styles.iconGreen} size={20} />
              <span>190-A, G/F Shahpur Jat, New Delhi - 110049</span>
            </li>
            <li>
              <Phone className={styles.iconYellow} size={20} />
              <span>+91 9667708285</span>
            </li>
            <li>
              <Mail className={styles.iconPurple} size={20} />
              <span>admin@kingdomoflearning.com</span>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div className={styles.hoursCol}>
          <h3 className={styles.title}>School Timings</h3>
          <div className={styles.hoursBox}>
            <Clock className={styles.iconOrange} size={20} />
            <div>
              <p className={styles.days}>Toddcare Hours</p>
              <p className={styles.time}>Mon - Fri: 09:00 AM - 12:00 PM</p>
            </div>
          </div>
          <div className={styles.hoursBox}>
            <Compass className={styles.iconBlue} size={20} />
            <div>
              <p className={styles.days}>Nursery & KG Hours</p>
              <p className={styles.time}>Mon - Fri: 09:00 AM - 01:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>© {currentYear} Kingdom of Learning Pre School. All Rights Reserved. Client Presentation Demo.</p>
          <p className={styles.credits}>Warmth • Creativity • Trust</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
