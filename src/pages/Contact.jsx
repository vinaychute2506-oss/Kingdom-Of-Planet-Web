import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle, Loader2, AlertTriangle, Shield, Heart } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { submitForm } from '../services/api';
import { trackEvent } from '../services/analytics';
import SectionDivider from '../components/common/SectionDivider';
import styles from './Contact.module.scss';

const Contact = () => {
  const { schoolInfo } = useCMS();

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    message: '',
    honeypot: '', // bot protection
  });

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

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
    setErrorMsg(null);

    if (cooldown) {
      setErrorMsg(`Rate-limiting protection: Please wait ${cooldownSeconds}s before sending another message.`);
      return;
    }

    if (formData.honeypot) {
      setShowModal(true);
      return;
    }

    if (!formData.parentName || !formData.phone || !formData.message) {
      setErrorMsg("Required fields missing! Please enter your name, phone, and message.");
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
        setCooldownSeconds(10);
      } else {
        throw new Error(response?.message || 'Unexpected response status.');
      }
    } catch (err) {
      setErrorMsg("Connection error: We preserved your inputs. Please check your network and try again.");
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
        <div 
          className="section-bg-watermark" 
          style={{ 
            backgroundImage: `url('/classroom-bg.webp')`,
            opacity: 0.12
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.headerDecor}>
            <span className={styles.decorLeaf}>🌿</span>
            <span className={styles.decorTag}>WE'D LOVE TO HEAR FROM YOU</span>
            <span className={styles.decorLeaf}>🌿</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Admissions
          </motion.h1>
          <div className={styles.heartLine}>
            <Heart size={14} className={styles.heartIcon} />
          </div>
          <p>Get in touch with Mrs. Komal Singh and our administrative team to schedule your visitation.</p>
        </div>
      </section>

      {/* Main Form & Location Section */}
      <section className="section" style={{ backgroundColor: '#FAF6EE', paddingTop: '56px', paddingBottom: '64px' }}>
        <div className="container">
          
          <div className={styles.contactGrid}>
            
            {/* Left: Inquiry Form Panel */}
            <div className={styles.formPanel}>
              
              <div className={styles.formHeader}>
                <span className={styles.writeTag}>WRITE TO US</span>
                <h2>Send a <span className={styles.italicHighlight}>Direct</span> Message</h2>
                
                {/* Hand-drawn sketches simulation on the right */}
                <div className={styles.sketchDecors}>
                  <div className={styles.sketchHeart}>❤️</div>
                  <div className={styles.sketchPencil}>✏️</div>
                  <div className={styles.sketchBook}>📖</div>
                </div>

                <p className={styles.formSubtitle}>
                  Have any specific queries about early development milestones, fees, seat slots, or child support? We are here to help.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.contactForm}>
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
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertTriangle size={16} className={styles.errorIcon} />
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
                    rows="4" 
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
                    <Send size={16} />
                  )}
                  <span>
                    {submitting 
                      ? "Dispatching Message..." 
                      : cooldown 
                        ? `Locked (${cooldownSeconds}s)` 
                        : "Send Direct Message"}
                  </span>
                </motion.button>

                <div className={styles.infoSafeLine}>
                  <Shield size={14} className={styles.shieldIcon} />
                  <span>Your information is safe with us and will never be shared.</span>
                </div>

              </form>
            </div>

            {/* Right: Map & Details Panel */}
            <div className={styles.detailsPanel}>
              
              {/* Map embed */}
              <div className={styles.mapCard}>
                <div className={styles.mapOverlayLink}>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.mapBtn} aria-label="Open school location in Google Maps">
                    Open in Maps ↗
                  </a>
                </div>
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

              {/* Detail Cards */}
              <div className={styles.detailCardsStack}>
                
                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <MapPin size={18} strokeWidth={1.8} />
                  </div>
                  <div className={styles.detailText}>
                    <h4>School Location</h4>
                    <p>{schoolInfo.address}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Phone size={18} strokeWidth={1.8} />
                  </div>
                  <div className={styles.detailText}>
                    <h4>Admissions Hotline</h4>
                    <p>{schoolInfo.phone}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Mail size={18} strokeWidth={1.8} />
                  </div>
                  <div className={styles.detailText}>
                    <h4>Professional Email</h4>
                    <p>{schoolInfo.email}<br />{schoolInfo.altEmail}</p>
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
                <CheckCircle size={36} strokeWidth={1.5} />
              </div>
              <h3 className={styles.mTitle}>Message Dispatched!</h3>
              <p className={styles.mText}>
                Dear <strong>{formData.parentName}</strong>, your message was successfully sent.
              </p>
              <p className={styles.mSubtext}>
                We will contact you at <strong>{formData.phone}</strong> shortly.
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
