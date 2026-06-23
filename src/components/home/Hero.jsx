import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Users, GraduationCap, Heart } from 'lucide-react';
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
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '25%', left: '10%', width: '10px', height: '10px', opacity: 0.18 }}
        />
        {/* Particle 2 */}
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ top: '65%', left: '40%', width: '14px', height: '14px', opacity: 0.15 }}
        />
        {/* Particle 3 */}
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ top: '15%', left: '85%', width: '8px', height: '8px', opacity: 0.2 }}
        />
        {/* Floating leaf outline */}
        <motion.div 
          className={styles.floatingLeaf} 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '45%', left: '5%', width: '30px', height: '30px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#541221" strokeWidth="1" opacity="0.10">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 0c0 4-2 8-5 10m5-10c0 4 2 8 5 10" />
          </svg>
        </motion.div>
        {/* Floating book outline */}
        <motion.div 
          className={styles.floatingBook} 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ top: '20%', left: '48%', width: '28px', height: '28px' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#C8B39A" strokeWidth="1" opacity="0.12">
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
            className={styles.welcomeTag}
            variants={itemVariants}
          >
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>A KINGDOM WHERE LEARNING COMES ALIVE</span>
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
              <div className={styles.metricIconBox}>
                <Users size={20} />
              </div>
              <div className={styles.metricText}>
                <h3 className={styles.number}>12+</h3>
                <p className={styles.label}>Years Legacy</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <GraduationCap size={20} />
              </div>
              <div className={styles.metricText}>
                <h3 className={styles.number}>15+</h3>
                <p className={styles.label}>Certified Guides</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIconBox}>
                <Heart size={20} />
              </div>
              <div className={styles.metricText}>
                <h3 className={styles.number}>100%</h3>
                <p className={styles.label}>Attention</p>
              </div>
            </div>
          </motion.div>
        </motion.div>



      </div>
    </section>
  );
};

export default Hero;
