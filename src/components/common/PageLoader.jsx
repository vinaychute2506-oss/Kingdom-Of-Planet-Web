import React from 'react';
import { motion } from 'framer-motion';
import styles from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <motion.div 
      className={styles.loaderOverlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: "easeInOut" }}
      onAnimationComplete={() => {
        document.body.style.overflow = "unset";
      }}
    >
      <div className={styles.loaderContent}>
        {/* Soft elegant shimmer fade logo container */}
        <motion.div 
          className={styles.logoWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: [0, 0.7, 0.9, 1],
            scale: [0.95, 1, 0.99, 1] 
          }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        >
          <img src="/logo.png" alt="Kingdom of Learning Pre School Crest" className={styles.logoImg} />
        </motion.div>

        {/* Elegant typography, matching Serif style */}
        <motion.div
          className={styles.textWrapper}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
        >
          <div className={styles.divider} />
          <p className={styles.tagline}>A Kingdom Where Learning Comes Alive</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
