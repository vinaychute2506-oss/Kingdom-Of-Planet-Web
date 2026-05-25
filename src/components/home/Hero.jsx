import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Star } from 'lucide-react';
import styles from './Hero.module.scss';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 }
  }
};

const Hero = () => {
  const handleProgramsClick = () => {
    window.location.hash = '#programs';
  };

  const handleVisitClick = () => {
    window.location.hash = '#contact';
  };

  return (
    <section className={styles.heroSection}>
      {/* Absolute decorative background blobs */}
      <div className={`${styles.blobBg} ${styles.blobYellow} animate-pulse-slow`} />
      <div className={`${styles.blobBg} ${styles.blobPurple} animate-float`} />
      <div className={`${styles.blobBg} ${styles.blobBlue} animate-pulse-slow`} />

      <div className={`container ${styles.heroGrid}`}>
        
        {/* Left Content Column (With Staggered Variant Entrances) */}
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
            <Sparkles size={16} className={styles.sparkleIcon} />
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
              <Calendar size={18} />
              <span>Book a Campus Tour</span>
            </button>
          </motion.div>

          {/* Metrics Row */}
          <motion.div 
            className={styles.metricsGrid}
            variants={itemVariants}
          >
            <div className={styles.metricCard}>
              <h3 className={styles.number} style={{ color: '#D4AF37' }}>12+</h3>
              <p className={styles.label}>Years of Legacy</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.number} style={{ color: '#6B1D2F' }}>15+</h3>
              <p className={styles.label}>Certified Guides</p>
            </div>
            <div className={styles.metricCard}>
              <h3 className={styles.number} style={{ color: '#E67E22' }}>100%</h3>
              <p className={styles.label}>Personal Attention</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Illustration Column */}
        <div className={styles.heroIllustration}>
          <motion.div 
            className={styles.illustrationWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Elegant Floating preschool objects */}
            <div className={`${styles.floatElement} ${styles.pencil} animate-float`}>🎨</div>
            <div className={`${styles.floatElement} ${styles.book} animate-float`} style={{ animationDelay: '1.5s' }}>📖</div>
            <div className={`${styles.floatElement} ${styles.planet} animate-float`} style={{ animationDelay: '3s' }}>🪐</div>
            <div className={`${styles.floatElement} ${styles.globe} animate-float`} style={{ animationDelay: '0.8s' }}>👑</div>
            <div className={`${styles.floatElement} ${styles.star} animate-float`} style={{ animationDelay: '2.2s' }}><Star size={24} fill="#D4AF37" color="#D4AF37" /></div>

            {/* Custom Interactive Avatar Characters */}
            <div className={styles.characterContainer}>
              {/* Cute Mascot Girl */}
              <div className={styles.mascotCard} style={{ backgroundColor: '#FAF6EE', border: '2px solid #D4AF37' }}>
                <span className={styles.avatarEmoji}>👑👧</span>
                <span className={styles.mascotLabel} style={{ backgroundColor: '#6B1D2F' }}>Joyful Play</span>
              </div>
              {/* Cute Mascot Boy */}
              <div className={styles.mascotCard} style={{ backgroundColor: '#FAF6EE', border: '2px solid #D4AF37' }}>
                <span className={styles.avatarEmoji}>👑👦</span>
                <span className={styles.mascotLabel} style={{ backgroundColor: '#D4AF37' }}>Creative Mind</span>
              </div>
            </div>

            {/* Central Playful Desk */}
            <div className={styles.playgroundDesk} style={{ backgroundColor: '#6B1D2F', borderColor: '#D4AF37' }}>
              <span className={styles.deskToys} style={{ color: '#FFFDD0' }}>📚🧸🧩🎨</span>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
