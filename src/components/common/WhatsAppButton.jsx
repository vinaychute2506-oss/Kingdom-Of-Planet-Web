import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { trackEvent } from '../../services/analytics';
import { submitForm } from '../../services/api';
import styles from './WhatsAppButton.module.scss';

const WhatsAppButton = () => {
  const { schoolInfo } = useCMS();
  
  const handleClick = () => {
    const rawPhone = schoolInfo.whatsapp || schoolInfo.phone || '+919667708285';
    // Sanitize number by stripping any space, plus, or dashes
    const cleanPhone = rawPhone.replace(/\D/g, '');
    
    // Log click conversion in Google Analytics
    trackEvent('click', 'WhatsApp', 'Floating Action Widget');
    
    // Asynchronously log micro-conversion inside the Google Sheet
    submitForm({ formType: 'analytics', metric: 'WhatsAppClick' })
      .catch((err) => console.warn('[Analytics] WhatsApp click sheet logging failed:', err));
    
    window.open(`https://wa.me/${cleanPhone}?text=Hello!%20I%20am%20interested%20in%20admission.`, "_blank");
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

