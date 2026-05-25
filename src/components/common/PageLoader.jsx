import React from 'react';
import { motion } from 'framer-motion';
import styles from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <motion.div 
      className={styles.loaderOverlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        document.body.style.overflow = "unset";
      }}
    >
      <div className={styles.loaderContent}>
        {/* Animated Planets & School Mascot Ring */}
        <div className={styles.logoContainer}>
          <motion.div 
            className={styles.mascotRing}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.div 
            className={styles.mascotDot}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            🏫
          </motion.div>
        </div>

        {/* Text Fade and Bounce */}
        <motion.h2 
          className={styles.title}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          Kingdom Of Planet School
        </motion.h2>
        <p className={styles.subtitle}>Where Learning Feels Like Play...</p>
      </div>
    </motion.div>
  );
};

export default PageLoader;
