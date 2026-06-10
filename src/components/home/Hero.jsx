import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { FALLBACK_IMAGES } from '../../config/cms';
import styles from './Hero.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "tween", duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }
  }
};

const Hero = () => {
  const { schoolInfo } = useCMS();

  const handleProgramsClick = () => {
    window.location.hash = '#programs';
  };

  const handleVisitClick = () => {
    window.location.hash = '#contact';
  };

  return (
    <section className={styles.heroSection}>
      {/* Cinematic Luxury Background Video */}
      <video 
        className={styles.bgVideo} 
        src={FALLBACK_IMAGES.heroVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
      />
      <div className={styles.videoOverlay} />
      
      {/* Subtle sun flare glow */}
      <div className={styles.sunFlare} />

      {/* Elegant floating outlines & particles */}
      <div className={styles.floatingContainer}>
        {/* Particle 1 */}
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '25%', left: '10%', width: '10px', height: '10px' }}
        />
        {/* Particle 2 */}
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ top: '65%', left: '40%', width: '14px', height: '14px' }}
        />
        {/* Particle 3 */}
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ top: '15%', left: '85%', width: '8px', height: '8px' }}
        />
        {/* Floating leaf outline */}
        <motion.div 
          className={styles.floatingLeaf} 
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '45%', left: '5%', width: '30px', height: '30px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#541221" strokeWidth="1" opacity="0.12">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 0c0 4-2 8-5 10m5-10c0 4 2 8 5 10" />
          </svg>
        </motion.div>
        {/* Floating book outline */}
        <motion.div 
          className={styles.floatingBook} 
          animate={{ y: [0, -20, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ top: '20%', left: '48%', width: '28px', height: '28px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#C8B39A" strokeWidth="1" opacity="0.15">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V2.5A2.5 2.5 0 0 1 6.5 0H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
          </svg>
        </motion.div>
      </div>

      <div className={`container ${styles.heroGrid}`}>
        
        {/* Left Content Column */}
        <motion.div 
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className={styles.heroLogoBranding}
            variants={itemVariants}
          >
            <img 
              src={FALLBACK_IMAGES.logo} 
              alt={schoolInfo.schoolName} 
              className={styles.heroLogoImg} 
              onError={(e) => { e.target.src = FALLBACK_IMAGES.logo; }}
            />
          </motion.div>

          <motion.div 
            className={styles.welcomeTag}
            variants={itemVariants}
          >
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>A Kingdom Where Learning Comes Alive</span>
          </motion.div>

          <motion.h1 
            className={styles.heading}
            variants={itemVariants}
          >
            Where Every Child <br />
            Learns, Grows & <span className={styles.highlight}>Shines</span>
          </motion.h1>

          <motion.p 
            className={styles.tagline}
            variants={itemVariants}
          >
            A nurturing preschool environment designed to inspire confidence, creativity, joyful learning, and holistic development.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            className={styles.actions}
            variants={itemVariants}
          >
            <button className={styles.primaryBtn} onClick={handleProgramsClick}>
              Explore Classes
            </button>
            <button className={styles.secondaryBtn} onClick={handleVisitClick}>
              <Calendar size={16} />
              <span>Campus Tour</span>
            </button>
          </motion.div>

          {/* Metrics Row */}
          <motion.div 
            className={styles.metricsGrid}
            variants={itemVariants}
          >
            <div className={styles.metricCard}>
              <h3 className={styles.number}>12+</h3>
              <p className={styles.label}>Years Legacy</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.number}>15+</h3>
              <p className={styles.label}>Certified Guides</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.number}>100%</h3>
              <p className={styles.label}>Attention</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Illustration Column (Asymmetric Rounded Arches) */}
        <div className={styles.heroIllustration}>
          {/* Custom Gold/Beige Botanical Leaf Branch Outline SVG */}
          <div className={styles.botanicalStem}>
            <svg viewBox="0 0 100 100" fill="none" stroke="#C8B39A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 95C50 80 48 55 52 40C54 30 58 10 58 10" />
              <path d="M50 72C50 72 32 68 28 62C24 56 27 52 34 57C41 62 48 67 48 67" />
              <path d="M51 57C51 57 66 52 70 45C74 38 69 35 63 42C57 49 52 54 52 54" />
              <path d="M52 42C52 42 36 36 32 28C28 20 31 16 38 23C45 30 50 38 50 38" />
              <path d="M52 28C52 28 64 21 66 13C68 5 63 4 58 11C53 18 52 24 52 24" />
            </svg>
          </div>

          <div className={styles.collageContainer}>
            {/* Left Staggered Arch */}
            <motion.div 
              className={`${styles.collageCard} ${styles.photoLeft}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className={styles.photoImgWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400" 
                  alt="Creative child laughing and painting" 
                  onError={(e) => { e.target.src = FALLBACK_IMAGES.activity; }}
                />
              </div>
              <div className={styles.photoCaption}>
                <h4>Laughing Circle</h4>
                <p>Play Hour</p>
              </div>
            </motion.div>

            {/* Right Staggered Arch */}
            <motion.div 
              className={`${styles.collageCard} ${styles.photoRight}`}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className={styles.photoImgWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=400" 
                  alt="Classroom reading and peer interaction" 
                  onError={(e) => { e.target.src = FALLBACK_IMAGES.classroom; }}
                />
              </div>
              <div className={styles.photoCaption}>
                <h4>Creative Nest</h4>
                <p>Learning Moment</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

