import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Users, BookOpen, Heart, ArrowRight } from 'lucide-react';
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
      <div className={styles.heroOverlay} />
      
      {/* Subtle sun flare glow */}
      <div className={styles.sunFlare} />
      
      {/* Floating particles */}
      <div className={styles.floatingContainer}>
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: '25%', left: '8%', width: '10px', height: '10px', opacity: 0.18 }}
        />
        <motion.div 
          className={styles.goldParticle} 
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ top: '65%', left: '30%', width: '14px', height: '14px', opacity: 0.15 }}
        />
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
            <span className={styles.underlineRelative}>
              Learns, Grows &
              <svg className={styles.brushUnderline} viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 14C80 7 180 4 295 10" stroke="#C8B39A" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span> <span className={styles.highlight} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontWeight: 'inherit' }}>Shines</span>
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
              <span>Explore Classes</span>
              <ArrowRight size={16} />
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
                <BookOpen size={20} />
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
