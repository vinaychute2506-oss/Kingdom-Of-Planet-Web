import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import styles from './StickyEnrollMobile.module.scss';

const StickyEnrollMobile = ({ currentHash }) => {
  // Hide sticky enroll bar if user is already on the contact page or admissions page
  const isFormPage = currentHash === '#contact' || currentHash === '#admissions';

  const handleClick = () => {
    window.location.hash = '#admissions';
  };

  return (
    <AnimatePresence>
      {!isFormPage && (
        <motion.div 
          className={styles.stickyContainer}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        >
          <button className={styles.ctaButton} onClick={handleClick}>
            <Calendar size={18} className={styles.icon} />
            <span>Enroll Now for 2026-27</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyEnrollMobile;
