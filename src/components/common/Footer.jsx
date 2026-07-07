import React from 'react';
import { Mail, Phone, MapPin, Clock, Compass } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { FALLBACK_IMAGES } from '../../config/cms';
import styles from './Footer.module.scss';

const Footer = () => {
  const { schoolInfo, refreshing, forceRefresh } = useCMS();
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

      {/* Parent Trust Row */}
      <div className={styles.trustRow}>
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Safe Campus</span>
            <span className={styles.trustSub}>100% CCTV & Secure Premises</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Qualified Educators</span>
            <span className={styles.trustSub}>Early Childhood Certified</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Small Batch Learning</span>
            <span className={styles.trustSub}>Personalized Attention</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustTitle}>Creative Growth</span>
            <span className={styles.trustSub}>Explore. Imagine. Grow.</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.footerGrid}`}>
        
        {/* Info Column */}
        <div className={styles.infoCol}>
          <a href="#home" className={styles.logo}>
            <img 
              src={FALLBACK_IMAGES.logo} 
              alt={schoolInfo.schoolName} 
              className={styles.logoImg} 
              onError={(e) => { e.target.src = FALLBACK_IMAGES.logo; }}
            />
          </a>
          <p className={styles.tagline}>
            A premium early childhood learning center in New Delhi dedicated to providing safe, nurturing and activity-based environment that prepares every child for a bright future.
          </p>
          <div className={styles.socials}>
            <a href={schoolInfo.facebookUrl || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#3b5998' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={schoolInfo.instagramUrl || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#e1306c' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={schoolInfo.youtubeUrl || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ '--hover-color': '#ff0000' }}>
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
            <li><button onClick={() => handleQuickLink('#programs')}>Programs</button></li>
            <li><button onClick={() => handleQuickLink('#activities')}>Activities</button></li>
            <li><button onClick={() => handleQuickLink('#gallery')}>Gallery</button></li>
            <li><button onClick={() => handleQuickLink('#contact')}>Contact</button></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className={styles.contactCol}>
          <h3 className={styles.title}>Get In Touch</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={20} />
              <span>{schoolInfo.address || "190-A, G/F Shahpur Jat, New Delhi - 110049"}</span>
            </li>
            <li>
              <Phone size={20} />
              <span>{schoolInfo.phone || "+91 9667708285"}</span>
            </li>
            <li style={{ alignItems: 'flex-start' }}>
              <Mail size={20} style={{ marginTop: '2px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span>{schoolInfo.email || "kingdom.of.learning.pre.school@gmail.com"}</span>
                <span>{schoolInfo.altEmail || "admin@kingdomoflearning.com"}</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div className={styles.hoursCol}>
          <h3 className={styles.title}>School Timings</h3>
          <div className={styles.hoursBox}>
            <Clock size={20} />
            <div>
              <p className={styles.days}>Toddlers Hours</p>
              <p className={styles.time}>{schoolInfo.toddcareTimings || "Mon – Fri: 09:00 AM – 12:00 PM"}</p>
            </div>
          </div>
          <div className={styles.hoursBox}>
            <Compass size={20} />
            <div>
              <p className={styles.days}>Nursery & KG Hours</p>
              <p className={styles.time}>{schoolInfo.nurseryKGTimings || "Mon – Fri: 09:00 AM – 12:00 PM"}</p>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>© {currentYear} Kingdom of Learning Pre School. All Rights Reserved.</p>
          <p className={styles.credits}>Warmth • Creativity • Trust</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

