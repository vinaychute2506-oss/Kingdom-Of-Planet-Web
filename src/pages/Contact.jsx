import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { submitForm } from '../services/api';
import { trackEvent } from '../services/analytics';
import SectionTitle from '../components/common/SectionTitle';
import styles from './Contact.module.scss';

const Contact = () => {
  const { schoolInfo } = useCMS();

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    message: '',
    honeypot: '', // bot protection honeypot
  });

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  // Cooldown countdown loop
  useEffect(() => {
    let interval = null;
    if (cooldown && cooldownSeconds > 0) {
      interval = setInterval(() => {
        setCooldownSeconds((prev) => prev - 1);
      }, 1000);
    } else if (cooldownSeconds === 0) {
      setCooldown(false);
    }
    return () => clearInterval(interval);
  }, [cooldown, cooldownSeconds]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null); // Clear previous errors

    if (cooldown) {
      setErrorMsg(`Rate-limiting protection: Please wait ${cooldownSeconds}s before sending another message.`);
      return;
    }

    // Bot detection honey trap
    if (formData.honeypot) {
      console.warn("Spam-bot trigger intercepted!");
      setShowModal(true);
      return;
    }

    if (!formData.parentName || !formData.phone || !formData.message) {
      setErrorMsg("Required inputs missing! Please fill in your name, contact phone number, and message context.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitForm({
        formType: 'contact',
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      });

      if (response && response.status === 'success') {
        trackEvent('submit', 'Inquiry', 'Contact Form Success');
        setShowModal(true);
        setCooldown(true);
        setCooldownSeconds(10); // 10-second spam protection lock
      } else {
        throw new Error(response?.message || 'Server responded with an unexpected error status.');
      }
    } catch (err) {
      // Enhanced diagnostic logging for network/CORS failures
      console.error('[Forms Dispatch Failure] Diagnostics Details:', {
        exception: err.message,
        payloadPreserved: formData,
        apiUrlTargeted: import.meta.env.VITE_CMS_API
      });
      setErrorMsg("Message dispatch failed due to an API connection error. We have preserved your inputs. Please check your network and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMsg(null);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      message: '',
      honeypot: '',
    });
  };

  return (
    <div className={styles.contactPage}>
      
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Admissions
          </motion.h1>
          <p>Get in touch with Mrs. Komal Singh and our administrative team to schedule your visitation.</p>
        </div>
      </section>

      {/* Main split grid */}
      <section className="section">
        <div className="container">
          
          <div className={styles.splitGrid}>
            
            {/* Left Column: Inquiry Form */}
            <div className={styles.formPanel}>
              <SectionTitle 
                tag="Write to Us"
                title="Send a Direct Message"
                highlightWord="Direct"
                align="left"
                subtitle="Have any specific queries about early development milestones, fees, seat slots, or child support? We are here to help."
              />

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                
                {/* Bot-protection Honeypot field (hidden from view) */}
                <input 
                  type="text" 
                  name="honeypot" 
                  value={formData.honeypot} 
                  onChange={handleChange} 
                  style={{ display: 'none' }} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div 
                      className={styles.errorNotice}
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertTriangle size={18} className={styles.errorIcon} />
                      <span>{errorMsg}</span>
                      <button type="button" className={styles.errorClose} onClick={() => setErrorMsg(null)}>×</button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={styles.formGroup}>
                  <label htmlFor="parentName">Parent's Full Name *</label>
                  <input 
                    type="text" 
                    id="parentName" 
                    name="parentName" 
                    placeholder="Enter parent's full name" 
                    value={formData.parentName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter 10-digit number" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="parent@email.com" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Enter your questions or child guidelines here..." 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <motion.button 
                  type="submit" 
                  className={styles.sendBtn}
                  disabled={submitting || cooldown}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} strokeWidth={1.5} />
                  )}
                  <span>
                    {submitting 
                      ? "Dispatching Message..." 
                      : cooldown 
                        ? `Locked (${cooldownSeconds}s)` 
                        : "Send Direct Message"}
                  </span>
                </motion.button>
              </form>
            </div>

            {/* Right Column: Contact Details & Real Google Map */}
            <div className={styles.detailsPanel}>
              
              {/* Real Google Maps embed centering on Shahpur Jat */}
              <div className={styles.mapCard}>
                <iframe 
                  src={schoolInfo.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kingdom of Learning Location Map"
                />
              </div>

              {/* Quick Contacts details */}
              <div className={styles.detailsGrid}>
                
                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>School Location</h4>
                    <p>{schoolInfo.address}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>Admissions Hotline</h4>
                    <p>{schoolInfo.phone}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>Professional Email</h4>
                    <p>{schoolInfo.email}<br />{schoolInfo.altEmail}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Clock size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>School Timings</h4>
                    <p>
                      <strong>Toddcare:</strong> {schoolInfo.toddcareTimings}<br />
                      <strong>Nursery/KG:</strong> {schoolInfo.nurseryKGTimings}
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className={styles.modalCard}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalSuccessBox}>
                <CheckCircle size={40} strokeWidth={1.5} />
              </div>
              <h3 className={styles.mTitle}>Message Dispatched!</h3>
              <p className={styles.mText}>
                Dear <strong>{formData.parentName}</strong>, your message was successfully sent.
              </p>
              <p className={styles.mSubtext}>
                We will contact you at <strong>{formData.phone}</strong> or send details to <strong>{schoolInfo.altEmail}</strong> shortly.
              </p>
              <button className={styles.mBtn} onClick={handleCloseModal}>
                Dismiss Panel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contact;
