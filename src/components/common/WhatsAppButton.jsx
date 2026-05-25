import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.scss';

const WhatsAppButton = () => {
  const handleClick = () => {
    // Standard mock WhatsApp redirect for preschool inquiry
    window.open("https://wa.me/1234567890?text=Hello!%20I%20am%20interested%20in%20admissions%20at%20Kingdom%20Of%20Planet%20School.", "_blank");
  };

  return (
    <motion.button 
      className={styles.floatButton}
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Inquire on WhatsApp"
    >
      <div className={styles.pulseRing} />
      <MessageCircle size={28} className={styles.icon} />
      <span className={styles.tooltip}>Admission Enquiry</span>
    </motion.button>
  );
};

export default WhatsAppButton;
