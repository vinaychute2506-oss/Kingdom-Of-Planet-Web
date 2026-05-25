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

        {/* Right Illustration Column (Collage of premium children photos) */}
        <div className={styles.heroIllustration}>
          <div className={styles.collageContainer}>
            {/* Polaroid 1 (Left slightly staggered) */}
            <motion.div 
              className={`${styles.collageCard} ${styles.photoLeft}`}
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.03, y: -15, zIndex: 10 }}
            >
              <div className={styles.photoImgWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500" 
                  alt="Creative watercolors painting" 
                />
              </div>
              <div className={styles.photoCaption}>
                <h4>Creative Painting Circle</h4>
                <p>Experiential Learn Hour, 2026</p>
              </div>
            </motion.div>

            {/* Polaroid 2 (Right slightly staggered) */}
            <motion.div 
              className={`${styles.collageCard} ${styles.photoRight}`}
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: 5, zIndex: 10 }}
            >
              <div className={styles.photoImgWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500" 
                  alt="Phonics story library time" 
                />
              </div>
              <div className={styles.photoCaption}>
                <h4>Storytelling & Reading Nest</h4>
                <p>Nursery Fun Hours, 2026</p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
