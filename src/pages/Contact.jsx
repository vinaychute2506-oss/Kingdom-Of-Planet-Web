import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import styles from './Contact.module.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) {
      alert("Please fill in Parent Name and Phone number to submit message!");
      return;
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      message: ''
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} strokeWidth={1.5} />
                  <span>Send Direct Message</span>
                </motion.button>
              </form>
            </div>

            {/* Right Column: Contact Details & Real Google Map */}
            <div className={styles.detailsPanel}>
              
              {/* Real Google Maps embed centering on Shahpur Jat */}
              <div className={styles.mapCard}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14015.460458428588!2d77.2066373!3d28.5738096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd00318029c7%3A0x444d32a9a463a56!2sShahpur%20Jat%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1716482937512!5m2!1sen!2sin" 
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
                    <p>190-A, G/F Shahpur Jat, New Delhi - 110049</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>Admissions Hotline</h4>
                    <p>+91 9667708285</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>Professional Email</h4>
                    <p>admin@kingdomoflearning.com<br />singh.komal.tvf@gmail.com</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.iconCircle}>
                    <Clock size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4>School Timings</h4>
                    <p><strong>Toddcare:</strong> Mon - Fri 9:00 AM - 12:00 PM<br /><strong>Nursery/KG:</strong> Mon - Fri 9:00 AM - 1:00 PM</p>
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
                We will contact you at <strong>{formData.phone}</strong> or send details to <strong>singh.komal.tvf@gmail.com</strong> shortly.
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
